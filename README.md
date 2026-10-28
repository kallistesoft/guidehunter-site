# GuideHunter website

The promotional website of the GuideHunter app (Android, [kallistesoft/guidehunter-android](https://github.com/kallistesoft/guidehunter-android)):
what the app does, for hunters and anglers looking for a guide, and for guides who want to be on the map. Built to
be found on search engines: one page per species (29, the app's list), one per province, tips articles, FAQ, in French (`/`) and English (`/en/`). It also
holds the app's privacy policy and account deletion pages, which Google Play asks for.

Live at https://guides.kallistesoft.ca, deployed to the GoDaddy hosting on every push to `main`.

## Build

Plain Node 22, no dependencies:

    node tools/build.mjs   # writes site/
    node tools/check.mjs   # dead links, titles, descriptions, hreflang, JSON-LD
    cd site && python3 -m http.server 8765

| File | What |
|---|---|
| `tools/config.mjs` | **The app's name**, the domain, the Google Play link (null: "coming soon" and a "tell me" email), the contact |
| `tools/copy.mjs` | The site's own words (FR/EN): home, hubs, become a guide, privacy, account deletion, and the species list with their URLs |
| `data/species-*.json` | The species pages, one object per species, `fr` and `en` (every `species-*.json` file is read; ids match `SPECIES` in copy.mjs and the app's `Species` enum) |
| `data/provinces.json` | The province pages, with the species each one is known for (linked both ways) |
| `data/articles.json` | The tips articles and the app FAQ |
| `data/BRIEF.md` | The rules the content follows (what the app does and doesn't do, no invented facts, Québec French) |
| `assets/` | `site.css` (the app's theme: palette from `core/designsystem` Color.kt, Barlow fonts), `site.js` (theme toggle, menu), logo, fonts, share images |
| `tools/htaccess` | Copied to `site/.htaccess`: 404 page, caching |

Write the app's name as `{app}` in any content: it comes from `config.app`.

## Renaming the app

1. Change `app` in `tools/config.mjs` (and `origin` if the domain changes).
2. Redraw the share images and the touch icon, which show the name:
   `npm i --no-save puppeteer-core && node tools/images.mjs` (uses the installed Chrome), and commit the PNGs.
3. Update the logo in `assets/icon.svg` and `assets/pin.svg` if it changes (`design/generator/logo.py` in the app repo).

## At launch

Set `playUrl` in `tools/config.mjs`: every "Coming soon / Tell me" button becomes the Google Play link, and the
structured data gets the download URL.

Fonts: Barlow and Barlow Condensed by Jeremy Tribby, SIL Open Font License 1.1, subset to Latin as WOFF2.
