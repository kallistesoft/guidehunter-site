// Builds the static site into site/: node tools/build.mjs
// Pages come from tools/copy.mjs (site pages) and data/*.json (species pages, articles, FAQ).

import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { config } from './config.mjs';
import { readdirSync } from 'node:fs';
import { LANGS, LOCALE, PATHS, SPECIES, T, HOME, HUBS, GUIDES, TIPS, FAQ_PAGE, PRIVACY, DELETION, PROVINCES_PAGE } from './copy.mjs';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'site');
const json = (f) => JSON.parse(readFileSync(join(ROOT, 'data', f), 'utf8'));

const speciesText = Object.fromEntries(readdirSync(join(ROOT, 'data')).filter((f) => /^species-.*\.json$/.test(f)).flatMap(json).map((s) => [s.id, s]));
const provinces = json('provinces.json');
const { articles, faq: appFaq } = json('articles.json');

// ---------------------------------------------------------------------------------------------------------------
// Text helpers

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fill = (s, lang) => String(s)
  .replaceAll('{app}', config.app)
  .replaceAll('{contact}', config.contact)
  .replaceAll('{deletion}', PATHS.deletion[lang])
  // French spacing: keep « », : and $ with their word, so a line never starts with them.
  .replace(/« /g, '«\u00a0').replace(/ »/g, '\u00a0»').replace(/ :/g, '\u00a0:').replace(/(\d) \$/g, '$1\u00a0$$');
// Plain text for attributes and JSON-LD.
const text = (s, lang) => fill(s, lang).replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[(.+?)\]\((.+?)\)/g, '$1');
// Inline HTML: escapes, then **bold**, [link](url) and the contact address as a mailto link.
const inline = (s, lang) => esc(fill(s, lang))
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
  .replaceAll(esc(config.contact), `<a href="mailto:${config.contact}">${config.contact}</a>`);

const mailto = (subject, lang) => `mailto:${config.contact}?subject=${encodeURIComponent(text(subject, lang))}`;

// ---------------------------------------------------------------------------------------------------------------
// Pages: each has a key shared by its translations, so the language switch and hreflang find each other.

const pages = [];
const page = (key, lang, path, render) => pages.push({ key, lang, path, render });
const pathOf = (key, lang) => pages.find((p) => p.key === key && p.lang === lang)?.path;
const speciesPath = (sp, lang) => (sp.d === 'hunting' ? PATHS.hunting : PATHS.fishing)[lang] + sp[lang][0] + '/';
const articlePath = (a, lang) => PATHS.tips[lang] + a[lang].slug + '/';
const provincePath = (pr, lang) => PATHS.provinces[lang] + pr.id + '/';
const provinceChip = (pr, lang) => `<a class="chip" href="${provincePath(pr, lang)}">${esc(pr[lang].name)}</a>`;

let assetVersion = '';

// ---------------------------------------------------------------------------------------------------------------
// Pieces

const icon = {
  sun: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></svg>',
  moon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>',
  menu: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  play: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M4.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l.1.1 9.3-9.3v-.2L4.7 2.2l-.1.1Z"/><path fill="currentColor" opacity=".75" d="m17.1 15.6-3.1-3.1v-.2l3.1-3.1.1.1 3.7 2.1c1 .6 1 1.6 0 2.2l-3.7 2.1-.1-.1Z"/><path fill="currentColor" opacity=".55" d="M17.2 15.5 14 12.3l-9.4 9.4c.3.4.9.4 1.6 0l11-6.2"/><path fill="currentColor" opacity=".9" d="M17.2 9.1 6.2 2.9c-.7-.4-1.3-.3-1.6 0L14 12.3l3.2-3.2Z"/></svg>',
};

const PIN = readFileSync(join(ROOT, 'assets/pin.svg'), 'utf8').replace('<svg ', '<svg aria-hidden="true" class="logo-pin" ');

// A small map pin in the app's colours (hunt orange, fish teal, both gold).
const dot = (kind) => `<span class="dot dot-${kind}" aria-hidden="true"></span>`;

function storeButtons(lang, { secondary } = {}) {
  const t = T[lang];
  const play = config.playUrl
    ? `<a class="btn btn-primary" href="${config.playUrl}">${icon.play}<span>${t.playBadge}</span></a>`
    : `<a class="btn btn-primary" href="${mailto(t.notifySubject, lang)}">${icon.play}<span><small>${t.soon}</small>${t.notify}</span></a>`;
  return `<div class="ctas">${play}${secondary ? `<a class="btn btn-ghost" href="${secondary.href}">${esc(secondary.label)}</a>` : ''}</div>`;
}

function header(lang, key) {
  const t = T[lang];
  const other = lang === 'fr' ? 'en' : 'fr';
  const nav = ['hunting', 'fishing', 'provinces', 'guides', 'tips', 'faq']
    .map((k) => {
      const href = PATHS[k][lang];
      const current = key === k || key.startsWith(k + ':');
      return `<a href="${href}"${current ? ' aria-current="page"' : ''}>${t.nav[k]}</a>`;
    }).join('');
  return `<a class="skip" href="#main">${t.skip}</a>
<header class="top">
  <div class="wrap top-in">
    <a class="brand" href="${PATHS.home[lang]}">${PIN}<span>${config.app}</span></a>
    <nav class="nav" id="nav" aria-label="${t.menu}">${nav}</nav>
    <div class="tools">
      <a class="lang" href="${pathOf(key, other)}" hreflang="${LOCALE[other]}" lang="${LOCALE[other]}" aria-label="${t.otherLangLabel}">${other.toUpperCase()}</a>
      <button class="icon-btn theme" type="button" aria-label="${t.theme}"><span class="i-sun">${icon.sun}</span><span class="i-moon">${icon.moon}</span></button>
      <a class="btn btn-primary btn-sm get" href="${config.playUrl ?? '#get'}">${t.getApp}</a>
      <button class="icon-btn menu" type="button" aria-expanded="false" aria-controls="nav" aria-label="${t.menu}">${icon.menu}</button>
    </div>
  </div>
</header>`;
}

function footer(lang) {
  const t = T[lang];
  const hunt = SPECIES.filter((s) => s.d === 'hunting').map((s) => `<li><a href="${speciesPath(s, lang)}">${s[lang][1]}</a></li>`).join('');
  const fish = SPECIES.filter((s) => s.d === 'fishing').map((s) => `<li><a href="${speciesPath(s, lang)}">${s[lang][1]}</a></li>`).join('');
  return `<footer class="foot">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <a class="brand" href="${PATHS.home[lang]}">${PIN}<span>${config.app}</span></a>
        <p>${t.footer.tagline}</p>
        ${storeButtons(lang)}
      </div>
      <div><h2><a href="${PATHS.hunting[lang]}">${T[lang].nav.hunting}</a></h2><ul>${hunt}</ul></div>
      <div><h2><a href="${PATHS.fishing[lang]}">${T[lang].nav.fishing}</a></h2><ul>${fish}</ul></div>
      <div>
        <h2><a href="${PATHS.provinces[lang]}">${t.nav.provinces}</a></h2>
        <ul>${provinces.map((pr) => `<li><a href="${provincePath(pr, lang)}">${esc(pr[lang].name)}</a></li>`).join('')}</ul>
        <h2>${t.footer.app}</h2>
        <ul>
          <li><a href="${PATHS.guides[lang]}">${t.nav.guides}</a></li>
          <li><a href="${PATHS.tips[lang]}">${t.nav.tips}</a></li>
          <li><a href="${PATHS.faq[lang]}">${t.nav.faq}</a></li>
          <li><a href="mailto:${config.contact}">${config.contact}</a></li>
        </ul>
        <h2>${t.footer.legal}</h2>
        <ul>
          <li><a href="${PATHS.privacy[lang]}">${text(PRIVACY[lang].h1, lang)}</a></li>
          <li><a href="${PATHS.deletion[lang]}">${text(DELETION[lang].h1, lang)}</a></li>
        </ul>
      </div>
    </div>
    <p class="fine">${inline(t.footer.disclaimer, lang)}</p>
    <p class="fine">© 2026 · ${t.footer.by} <a href="${config.studio.url}">${config.studio.name}</a></p>
  </div>
</footer>`;
}

function layout(p, { title, description, body, ld = [], ogType = 'website' }) {
  const { lang, key, path } = p;
  const t = fill(title, lang);
  const d = text(description, lang);
  const alt = LANGS.map((l) => `<link rel="alternate" hreflang="${LOCALE[l]}" href="${config.origin}${pathOf(key, l)}">`).join('\n');
  const xDefault = pathOf(key, 'fr') ? `<link rel="alternate" hreflang="x-default" href="${config.origin}${pathOf(key, 'fr')}">` : '';
  const scripts = ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`).join('\n');
  const v = `?v=${assetVersion}`;
  return `<!doctype html>
<html lang="${LOCALE[lang]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t)}</title>
<meta name="description" content="${esc(d)}">
<link rel="canonical" href="${config.origin}${path}">
${alt}
${xDefault}
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${esc(config.app)}">
<meta property="og:title" content="${esc(t)}">
<meta property="og:description" content="${esc(d)}">
<meta property="og:url" content="${config.origin}${path}">
<meta property="og:image" content="${config.origin}/assets/og-${lang}.png">
<meta property="og:locale" content="${LOCALE[lang].replace('-', '_')}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0E1611" media="(prefers-color-scheme: dark)">
<meta name="theme-color" content="#F5F2EA" media="(prefers-color-scheme: light)">
<link rel="icon" href="/assets/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/barlow_regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/barlow_condensed_bold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/site.css${v}">
<script>try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
<script src="/assets/site.js${v}" defer></script>
${scripts}
</head>
<body>
${header(lang, key)}
<main id="main">
${body}
</main>
${footer(lang)}
</body>
</html>
`;
}

const crumbs = (lang, trail) => {
  const all = [[T[lang].breadcrumbHome, PATHS.home[lang]], ...trail];
  const html = `<nav class="crumbs" aria-label="Breadcrumb"><ol>${all.map(([n, h], i) => i === all.length - 1
    ? `<li aria-current="page">${esc(n)}</li>` : `<li><a href="${h}">${esc(n)}</a></li>`).join('')}</ol></nav>`;
  const ld = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: all.map(([n, h], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: config.origin + h })) };
  return { html, ld };
};

const faqLd = (lang, items) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: text(q, lang), acceptedAnswer: { '@type': 'Answer', text: text(a, lang) } })),
});

const faqList = (lang, items) => `<div class="faq">${items.map(([q, a]) =>
  `<details><summary>${inline(q, lang)}</summary><p>${inline(a, lang)}</p></details>`).join('')}</div>`;

// A section from the content files: { h, p?: [], list?: [], steps?: [[title, body]] }
function section(lang, s) {
  let h = `<h2>${inline(s.h, lang)}</h2>`;
  for (const para of s.p ?? []) h += `<p>${inline(para, lang)}</p>`;
  if (s.list) h += `<ul class="ticks">${s.list.map((li) => `<li>${inline(li, lang)}</li>`).join('')}</ul>`;
  if (s.steps) h += `<ol class="steps">${s.steps.map(([a, b]) => `<li><strong>${inline(a, lang)}</strong><span>${inline(b, lang)}</span></li>`).join('')}</ol>`;
  return `<section>${h}</section>`;
}

const appLd = (lang) => ({
  '@context': 'https://schema.org', '@type': 'MobileApplication',
  name: config.app, operatingSystem: 'Android', applicationCategory: 'TravelApplication',
  description: text(HOME[lang].description, lang), inLanguage: ['fr-CA', 'en-CA'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'CAD' },
  publisher: { '@type': 'Organization', name: config.studio.name, url: config.studio.url },
  ...(config.playUrl ? { downloadUrl: config.playUrl } : {}),
});

const speciesCard = (sp, lang) => {
  const st = speciesText[sp.id]?.[lang];
  return `<a class="sp-card" href="${speciesPath(sp, lang)}">${dot(sp.d === 'hunting' ? 'hunt' : 'fish')}<span class="sp-name">${sp[lang][1]}</span>${st ? `<span class="sp-lead">${inline(st.lead, lang)}</span>` : ''}</a>`;
};
const speciesChip = (sp, lang) => `<a class="chip" href="${speciesPath(sp, lang)}">${dot(sp.d === 'hunting' ? 'hunt' : 'fish')}${sp[lang][1]}</a>`;

const articleCard = (a, lang) => `<a class="art-card" href="${articlePath(a, lang)}"><span class="art-title">${inline(a[lang].h1, lang)}</span><span class="art-lead">${inline(a[lang].lead, lang)}</span><span class="more">${T[lang].readMore} ${icon.arrow}</span></a>`;

// The phone in the hero: the app's map screen, drawn in HTML (sample guides, labelled as such).
function phone(lang) {
  const c = HOME[lang].phone;
  const pins = [[22, 30, 'hunt'], [58, 22, 'fish'], [40, 48, 'both'], [72, 44, 'hunt'], [30, 64, 'fish'], [64, 66, 'fish']];
  return `<div class="phone" aria-hidden="true">
  <div class="screen">
    <div class="ph-bar"><span class="ph-loc"></span><b>${config.app}</b><span class="ph-plus">+</span></div>
    <div class="ph-chips"><span class="on">${c.all}</span><span>${c.hunt}</span><span>${c.fish}</span></div>
    <div class="ph-map">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="ph-land"><path d="M0 0h100v100H0z" class="land"/><path d="M8 18c10-6 22 2 18 12s-16 6-20-2 0-8 2-10Z" class="water"/><path d="M60 8c14-2 30 6 26 16s-22 8-28 2-6-16 2-18Z" class="water"/><path d="M44 56c8-4 18 0 16 8s-12 10-18 6-4-12 2-14Z" class="water"/><path d="M0 84c20-8 40 4 60-2s30-10 40-4v22H0Z" class="water"/><path d="M-2 40C20 46 38 34 56 38S88 50 102 46" class="river"/></svg>
      ${pins.map(([x, y, k]) => `<span class="ph-pin pin-${k}" style="left:${x}%;top:${y}%"></span>`).join('')}
      <span class="ph-count">${c.count}</span>
    </div>
    <div class="ph-cards">
      <div class="ph-card">${dot('hunt')}<div><b>${c.card1[0]}</b><small>${c.card1[1]}</small><em>${c.card1[2]}</em></div></div>
      <div class="ph-card">${dot('fish')}<div><b>${c.card2[0]}</b><small>${c.card2[1]}</small><em>${c.card2[2]}</em></div></div>
    </div>
    <div class="ph-cta">${c.contact}</div>
  </div>
  <span class="ph-note">${c.sample}</span>
</div>`;
}

// ---------------------------------------------------------------------------------------------------------------
// Page definitions

for (const lang of LANGS) {
  const t = T[lang];

  // Home
  page('home', lang, PATHS.home[lang], (p) => {
    const h = HOME[lang];
    const hunting = SPECIES.filter((s) => s.d === 'hunting');
    const fishing = SPECIES.filter((s) => s.d === 'fishing');
    const faq = appFaq[lang].slice(0, 4).map((f) => [f.q, f.a]);
    const body = `
<section class="hero">
  <div class="wrap hero-in">
    <div class="hero-text">
      <p class="eyebrow">${inline(h.eyebrow, lang)}</p>
      <h1>${inline(h.h1, lang)}</h1>
      <p class="lead">${inline(h.lead, lang)}</p>
      ${storeButtons(lang, { secondary: { href: PATHS.guides[lang], label: h.secondary } })}
      <p class="small">${t.free}</p>
    </div>
    ${phone(lang)}
  </div>
</section>
<section class="band">
  <div class="wrap">
    <h2 class="center">${inline(h.whoTitle, lang)}</h2>
    <div class="grid3">${h.who.map(([a, b]) => `<div class="card"><h3>${inline(a, lang)}</h3><p>${inline(b, lang)}</p></div>`).join('')}</div>
  </div>
</section>
<section class="wrap block" id="how">
  <h2 class="center">${inline(h.howTitle, lang)}</h2>
  <ol class="how">${h.how.map(([a, b], i) => `<li><span class="num">${i + 1}</span><h3>${inline(a, lang)}</h3><p>${inline(b, lang)}</p></li>`).join('')}</ol>
  <p class="legend">${dot('hunt')} ${t.nav.hunting} ${dot('fish')} ${t.nav.fishing} ${dot('both')} ${lang === 'fr' ? 'Les deux' : 'Both'}</p>
</section>
<section class="band">
  <div class="wrap">
    <h2 class="center">${inline(h.speciesTitle, lang)}</h2>
    <p class="center sub">${inline(h.speciesLead, lang)}</p>
    <div class="two">
      <div><h3><a href="${PATHS.hunting[lang]}">${t.nav.hunting}</a></h3><div class="chips">${hunting.map((s) => speciesChip(s, lang)).join('')}</div></div>
      <div><h3><a href="${PATHS.fishing[lang]}">${t.nav.fishing}</a></h3><div class="chips">${fishing.map((s) => speciesChip(s, lang)).join('')}</div></div>
    </div>
  </div>
</section>
<section class="wrap block">
  <h2 class="center">${inline(h.provincesTitle, lang)}</h2>
  <p class="center sub">${inline(h.provincesLead, lang)}</p>
  <div class="chips center-chips">${provinces.map((pr) => provinceChip(pr, lang)).join('')}</div>
</section>
<section class="wrap block">
  <div class="guides-band">
    <div>
      <h2>${inline(h.guidesTitle, lang)}</h2>
      <p>${inline(h.guidesBody, lang)}</p>
      <a class="btn btn-primary" href="${PATHS.guides[lang]}">${h.guidesCta} ${icon.arrow}</a>
    </div>
    <ul class="ticks">${h.guidesPoints.map((x) => `<li>${inline(x, lang)}</li>`).join('')}</ul>
  </div>
</section>
<section class="wrap block">
  <h2 class="center">${inline(h.tipsTitle, lang)}</h2>
  <div class="grid3 arts">${articles.slice(0, 3).map((a) => articleCard(a, lang)).join('')}</div>
</section>
<section class="band">
  <div class="wrap narrow">
    <h2 class="center">${inline(h.faqTitle, lang)}</h2>
    ${faqList(lang, faq)}
    <p class="center"><a class="link-more" href="${PATHS.faq[lang]}">${t.allFaq} ${icon.arrow}</a></p>
  </div>
</section>
<section class="wrap block end" id="get">
  ${PIN}
  <h2>${inline(h.endTitle, lang)}</h2>
  <p>${inline(config.playUrl ? h.lead : h.endBody, lang)}</p>
  ${storeButtons(lang)}
</section>`;
    return layout(p, { title: h.title, description: h.description, body, ld: [appLd(lang), faqLd(lang, faq), { '@context': 'https://schema.org', '@type': 'WebSite', name: config.app, url: config.origin + PATHS.home[lang], inLanguage: LOCALE[lang] }] });
  });

  // Hubs and species
  for (const d of ['hunting', 'fishing']) {
    page(d, lang, PATHS[d][lang], (p) => {
      const h = HUBS[d][lang];
      const c = crumbs(lang, [[t.nav[d], PATHS[d][lang]]]);
      const body = `<div class="wrap page">
${c.html}
<header class="page-head"><h1>${inline(h.h1, lang)}</h1><p class="lead">${inline(h.lead, lang)}</p></header>
<h2>${inline(h.listTitle, lang)}</h2>
<div class="sp-grid">${SPECIES.filter((s) => s.d === d).map((s) => speciesCard(s, lang)).join('')}</div>
<div class="prose">${h.body.map((x) => `<p>${inline(x, lang)}</p>`).join('')}</div>
<h2>${t.readTips}</h2>
<div class="grid3 arts">${articles.slice(0, 3).map((a) => articleCard(a, lang)).join('')}</div>
</div>`;
      return layout(p, { title: `${h.title} · ${config.app}`, description: h.description, body, ld: [c.ld] });
    });

    for (const sp of SPECIES.filter((s) => s.d === d)) {
      page(`${d}:${sp.id}`, lang, speciesPath(sp, lang), (p) => {
        const st = speciesText[sp.id][lang];
        const name = sp[lang][1];
        const c = crumbs(lang, [[t.nav[d], PATHS[d][lang]], [name, speciesPath(sp, lang)]]);
        const faq = st.faq.map((f) => [f.q, f.a]);
        const others = SPECIES.filter((s) => s.d === d && s.id !== sp.id);
        const where = provinces.filter((pr) => pr.species.includes(sp.id));
        const body = `<div class="wrap page">
${c.html}
<div class="with-aside">
  <article class="prose">
    <header class="page-head"><p class="eyebrow">${dot(d === 'hunting' ? 'hunt' : 'fish')} ${t.nav[d]}</p><h1>${inline(st.h1, lang)}</h1><p class="lead">${inline(st.lead, lang)}</p></header>
    ${st.sections.map((s) => section(lang, s)).join('')}
    <section><h2>${t.faqTitle}</h2>${faqList(lang, faq)}</section>
  </article>
  <aside class="aside">
    <div class="app-card">
      <div class="app-card-head">${PIN}<b>${esc(t.findGuideFor(name, d))}</b></div>
      <p>${inline(t.appCardBody(name), lang)}</p>
      ${storeButtons(lang)}
    </div>
  </aside>
</div>
${where.length ? `<h2>${lang === 'fr' ? 'Où au Canada' : 'Where in Canada'}</h2>
<div class="chips">${where.map((pr) => provinceChip(pr, lang)).join('')}</div>` : ''}
<h2>${t.seeAlso}</h2>
<div class="chips">${others.map((s) => speciesChip(s, lang)).join('')}</div>
<h2>${t.readTips}</h2>
<div class="grid3 arts">${articles.slice(0, 3).map((a) => articleCard(a, lang)).join('')}</div>
</div>`;
        return layout(p, { title: `${st.title} · ${config.app}`, description: st.description, body, ld: [c.ld, faqLd(lang, faq)], ogType: 'article' });
      });
    }
  }

  // Provinces
  page('provinces', lang, PATHS.provinces[lang], (p) => {
    const h = PROVINCES_PAGE[lang];
    const c = crumbs(lang, [[t.nav.provinces, PATHS.provinces[lang]]]);
    const cards = provinces.map((pr) => `<a class="sp-card" href="${provincePath(pr, lang)}">${dot('both')}<span class="sp-name">${esc(pr[lang].name)}</span><span class="sp-lead">${inline(pr[lang].lead, lang)}</span></a>`).join('');
    const body = `<div class="wrap page">${c.html}
<header class="page-head"><h1>${inline(h.h1, lang)}</h1><p class="lead">${inline(h.lead, lang)}</p></header>
<div class="sp-grid">${cards}</div></div>`;
    return layout(p, { title: `${h.title} · ${config.app}`, description: h.description, body, ld: [c.ld] });
  });
  for (const pr of provinces) {
    page(`provinces:${pr.id}`, lang, provincePath(pr, lang), (p) => {
      const h = PROVINCES_PAGE[lang];
      const pt = pr[lang];
      const c = crumbs(lang, [[t.nav.provinces, PATHS.provinces[lang]], [pt.name, provincePath(pr, lang)]]);
      const faq = pt.faq.map((f) => [f.q, f.a]);
      const known = pr.species.map((id) => SPECIES.find((s) => s.id === id)).filter(Boolean);
      const others = provinces.filter((x) => x.id !== pr.id);
      const body = `<div class="wrap page">
${c.html}
<div class="with-aside">
  <article class="prose">
    <header class="page-head"><p class="eyebrow">${dot('both')} ${esc(pt.name)}</p><h1>${inline(pt.h1, lang)}</h1><p class="lead">${inline(pt.lead, lang)}</p></header>
    ${pt.sections.map((s) => section(lang, s)).join('')}
    <section><h2>${t.faqTitle}</h2>${faqList(lang, faq)}</section>
  </article>
  <aside class="aside">
    <div class="app-card">
      <div class="app-card-head">${PIN}<b>${esc(h.speciesTitle)}</b></div>
      <div class="chips">${known.map((s) => speciesChip(s, lang)).join('')}</div>
      ${storeButtons(lang)}
    </div>
  </aside>
</div>
<h2>${t.nav.provinces}</h2>
<div class="chips">${others.map((x) => provinceChip(x, lang)).join('')}</div>
</div>`;
      return layout(p, { title: `${pt.title} · ${config.app}`, description: pt.description, body, ld: [c.ld, faqLd(lang, faq)], ogType: 'article' });
    });
  }

  // Become a guide
  page('guides', lang, PATHS.guides[lang], (p) => {
    const g = GUIDES[lang];
    const c = crumbs(lang, [[t.nav.guides, PATHS.guides[lang]]]);
    const ctas = config.playUrl ? storeButtons(lang) : `<div class="ctas"><a class="btn btn-primary" href="${mailto(g.earlySubject, lang)}">${esc(g.early)} ${icon.arrow}</a></div>`;
    const body = `<div class="wrap page">
${c.html}
<div class="with-aside">
  <article class="prose">
    <header class="page-head"><h1>${inline(g.h1, lang)}</h1><p class="lead">${inline(g.lead, lang)}</p>${ctas}</header>
    ${g.sections.map((s) => section(lang, s)).join('')}
    <section><h2>${t.faqTitle}</h2>${faqList(lang, g.faq)}</section>
  </article>
  <aside class="aside"><div class="app-card"><div class="app-card-head">${PIN}<b>${esc(t.nav.guides)}</b></div><ul class="ticks">${HOME[lang].guidesPoints.map((x) => `<li>${inline(x, lang)}</li>`).join('')}</ul>${ctas}</div></aside>
</div>
</div>`;
    return layout(p, { title: `${g.title} · ${config.app}`, description: g.description, body, ld: [c.ld, faqLd(lang, g.faq)] });
  });

  // Tips and articles
  page('tips', lang, PATHS.tips[lang], (p) => {
    const h = TIPS[lang];
    const c = crumbs(lang, [[t.nav.tips, PATHS.tips[lang]]]);
    const body = `<div class="wrap page">${c.html}
<header class="page-head"><h1>${inline(h.h1, lang)}</h1><p class="lead">${inline(h.lead, lang)}</p></header>
<div class="grid3 arts">${articles.map((a) => articleCard(a, lang)).join('')}</div></div>`;
    return layout(p, { title: `${h.title} · ${config.app}`, description: h.description, body, ld: [c.ld] });
  });
  for (const a of articles) {
    page(`tips:${a.id}`, lang, articlePath(a, lang), (p) => {
      const at = a[lang];
      const c = crumbs(lang, [[t.nav.tips, PATHS.tips[lang]], [text(at.h1, lang), articlePath(a, lang)]]);
      const others = articles.filter((x) => x.id !== a.id).slice(0, 3);
      const body = `<div class="wrap page">${c.html}
<div class="with-aside">
  <article class="prose">
    <header class="page-head"><h1>${inline(at.h1, lang)}</h1><p class="lead">${inline(at.lead, lang)}</p></header>
    ${at.sections.map((s) => section(lang, s)).join('')}
  </article>
  <aside class="aside"><div class="app-card"><div class="app-card-head">${PIN}<b>${config.app}</b></div><p>${inline(HOME[lang].lead, lang)}</p>${storeButtons(lang)}</div></aside>
</div>
<h2>${t.nav.tips}</h2>
<div class="grid3 arts">${others.map((x) => articleCard(x, lang)).join('')}</div>
</div>`;
      const ld = { '@context': 'https://schema.org', '@type': 'Article', headline: text(at.h1, lang), description: text(at.description, lang), inLanguage: LOCALE[lang], datePublished: '2026-10-27', author: { '@type': 'Organization', name: config.studio.name }, publisher: { '@type': 'Organization', name: config.studio.name }, mainEntityOfPage: config.origin + articlePath(a, lang) };
      return layout(p, { title: `${at.title} · ${config.app}`, description: at.description, body, ld: [c.ld, ld], ogType: 'article' });
    });
  }

  // FAQ
  page('faq', lang, PATHS.faq[lang], (p) => {
    const h = FAQ_PAGE[lang];
    const c = crumbs(lang, [[t.nav.faq, PATHS.faq[lang]]]);
    const items = [...appFaq[lang].map((f) => [f.q, f.a]), ...GUIDES[lang].faq];
    const body = `<div class="wrap page narrow">${c.html}
<header class="page-head"><h1>${inline(h.h1, lang)}</h1><p class="lead">${inline(h.lead, lang)}</p></header>
${faqList(lang, items)}</div>`;
    return layout(p, { title: h.title, description: h.description, body, ld: [c.ld, faqLd(lang, items)] });
  });

  // Legal
  for (const [key, L] of [['privacy', PRIVACY], ['deletion', DELETION]]) {
    page(key, lang, PATHS[key][lang], (p) => {
      const h = L[lang];
      const c = crumbs(lang, [[text(h.h1, lang), PATHS[key][lang]]]);
      const body = `<div class="wrap page narrow prose">${c.html}
<header class="page-head"><h1>${inline(h.h1, lang)}</h1>${h.updated ? `<p class="small">${h.updated}</p>` : ''}</header>
${h.sections.map((s) => section(lang, s)).join('')}</div>`;
      return layout(p, { title: h.title, description: h.description, body, ld: [c.ld] });
    });
  }
}

// ---------------------------------------------------------------------------------------------------------------
// Write

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync(join(ROOT, 'assets'), join(OUT, 'assets'), { recursive: true, filter: (f) => !f.endsWith('.ttf') });
assetVersion = createHash('sha1').update(readFileSync(join(ROOT, 'assets/site.css'))).update(readFileSync(join(ROOT, 'assets/site.js'))).digest('hex').slice(0, 8);

const write = (path, html) => {
  const file = join(OUT, path.endsWith('/') ? path + 'index.html' : path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
};
for (const p of pages) write(p.path, p.render(p));

// 404: one bilingual page, served by .htaccess for any missing path.
{
  const fr = T.fr.notFound, en = T.en.notFound;
  const p = { lang: 'fr', key: 'home', path: '/404.html' };
  const body = `<div class="wrap page narrow center nf">${PIN}<h1>${fr.h1}</h1><p>${fr.p}</p><p><a class="btn btn-primary" href="/">${fr.back}</a></p>
<p lang="en-CA" class="small">${en.p} <a href="/en/">${en.back}</a></p></div>`;
  write('/404.html', layout(p, { title: `${fr.title} · ${config.app}`, description: fr.p, body }).replace('<meta name="description"', '<meta name="robots" content="noindex">\n<meta name="description"'));
}

write('/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${config.origin}/sitemap.xml\n`);
write('/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map((p) => `<url><loc>${config.origin}${p.path}</loc>${LANGS.map((l) => `<xhtml:link rel="alternate" hreflang="${LOCALE[l]}" href="${config.origin}${pathOf(p.key, l)}"/>`).join('')}</url>`).join('\n')}
</urlset>
`);
write('/.htaccess', readFileSync(join(ROOT, 'tools/htaccess'), 'utf8'));

console.log(`${pages.length} pages written to site/`);
