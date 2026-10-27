// Draws the share images (assets/og-fr.png, og-en.png, 1200×630) and the Apple touch icon (180×180) with Chrome.
// They show the app's name: run it again after a rename, then commit the PNGs.
//
//   npm i --no-save puppeteer-core && node tools/images.mjs
//
// CHROME can point to another Chrome or Chromium binary.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import puppeteer from 'puppeteer-core';
import { config } from './config.mjs';
import { HOME } from './copy.mjs';

const ROOT = new URL('..', import.meta.url).pathname;
const asset = (f) => join(ROOT, 'assets', f);
const font = (f) => `data:font/woff2;base64,${readFileSync(asset('fonts/' + f)).toString('base64')}`;
const pin = readFileSync(asset('pin.svg'), 'utf8');

const css = `@font-face{font-family:B;font-weight:400;src:url(${font('barlow_regular.woff2')})}
@font-face{font-family:BC;font-weight:700;src:url(${font('barlow_condensed_bold.woff2')})}
body{margin:0}`;

const og = (lang) => {
  const h = HOME[lang];
  const fill = (s) => s.replaceAll('{app}', config.app);
  return `<style>${css}
.c{width:1200px;height:630px;box-sizing:border-box;padding:72px 80px;background:#0E1611;color:#EEF1EA;font-family:B;position:relative;overflow:hidden;
background:radial-gradient(700px 420px at 92% 0%,rgba(242,123,43,.28),transparent 60%),radial-gradient(600px 400px at 0% 100%,rgba(79,179,160,.2),transparent 60%),#0E1611}
.b{display:flex;align-items:center;gap:16px;font:700 54px BC}.b svg{width:52px;height:72px}
h1{font:700 86px/1 BC;margin:56px 0 24px;max-width:900px}p{font-size:30px;color:#A9B5AB;margin:0;max-width:860px}
.e{position:absolute;left:80px;bottom:64px;font-size:24px;letter-spacing:2px;text-transform:uppercase;color:#F7A06A}
.pins{position:absolute;right:70px;top:250px;display:flex;gap:18px;align-items:flex-end}.pins i{display:block;width:34px;height:34px;border-radius:50% 50% 50% 0;transform:rotate(-45deg)}</style>
<div class="c"><div class="b">${pin}<span>${config.app}</span></div><h1>${fill(h.h1)}</h1><p>${fill(h.description).split('. ')[0]}.</p>
<div class="e">${fill(h.eyebrow)}</div><div class="pins"><i style="background:#F27B2B"></i><i style="background:#4FB3A0"></i><i style="background:#E9C25A"></i></div></div>`;
};
const touch = `<style>${css}.t{width:180px;height:180px;background:#1F4229;display:grid;place-items:center}.t svg{width:96px;height:132px}</style><div class="t">${pin}</div>`;

const browser = await puppeteer.launch({ executablePath: process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const shot = async (html, w, h, file) => {
  const p = await browser.newPage();
  await p.setViewport({ width: w, height: h });
  await p.setContent(html, { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: asset(file) });
  await p.close();
};
await shot(og('fr'), 1200, 630, 'og-fr.png');
await shot(og('en'), 1200, 630, 'og-en.png');
await shot(touch, 180, 180, 'apple-touch-icon.png');
await browser.close();
console.log('assets/og-fr.png, og-en.png, apple-touch-icon.png written');
