// Checks the built site (run after build.mjs): every internal link and asset exists, every page has a unique
// title and description of a sensible length, hreflang pairs point to real pages, no {app} token is left.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const OUT = new URL('../site', import.meta.url).pathname;
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); });
walk(OUT);

const errors = [];
const titles = new Map();
const descriptions = new Map();
const exists = (url) => {
  const path = decodeURIComponent(url.split(/[?#]/)[0]);
  return existsSync(join(OUT, path.endsWith('/') ? path + 'index.html' : path));
};

for (const f of files) {
  const rel = f.slice(OUT.length);
  const html = readFileSync(f, 'utf8');
  if (/\{(app|contact|deletion)\}/.test(html)) errors.push(`${rel}: unreplaced token`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="(.*?)">/)?.[1];
  if (!title) errors.push(`${rel}: no title`);
  if (rel !== '/404.html' && (!desc || desc.length < 70 || desc.length > 175)) errors.push(`${rel}: description length ${desc?.length}`);
  if (rel !== '/404.html') {
    if (titles.has(title)) errors.push(`${rel}: same title as ${titles.get(title)}`);
    if (descriptions.has(desc)) errors.push(`${rel}: same description as ${descriptions.get(desc)}`);
    titles.set(title, rel); descriptions.set(desc, rel);
    if ((html.match(/<h1[ >]/g) ?? []).length !== 1) errors.push(`${rel}: needs exactly one h1`);
  }
  for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) if (!exists(url)) errors.push(`${rel}: broken link ${url}`);
  for (const [, url] of html.matchAll(/hreflang="[^"]+" href="https:\/\/[^/]+(\/[^"]*)"/g)) if (!exists(url)) errors.push(`${rel}: broken hreflang ${url}`);
  for (const [, url] of html.matchAll(/url\(([^)]+)\)/g)) if (!url.startsWith('data:') && !exists('/assets/' + url)) errors.push(`${rel}: missing ${url}`);
  for (const [, j] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)) {
    try { JSON.parse(j); } catch { errors.push(`${rel}: invalid JSON-LD`); }
  }
}
const css = readFileSync(join(OUT, 'assets/site.css'), 'utf8');
for (const [, url] of css.matchAll(/url\(([^)"']+)\)/g)) if (!url.startsWith('data:') && !exists('/assets/' + url)) errors.push(`site.css: missing ${url}`);

if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`${files.length} pages checked, no problems`);
