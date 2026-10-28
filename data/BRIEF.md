# Content brief (for writers)

The site promotes a free Android app (iOS later) that is a **map of hunting and fishing guides and outfitters**
(pourvoiries), "like Airbnb for hunting and fishing trips". Made in Québec, for all of Canada, bilingual (FR/EN). Write for a Canada-wide audience: examples from several provinces, never as if the reader were in Québec (Québec stays one strong region among others). Audience: people
who search the web for a guided hunt or fishing trip and have nobody to show them the way (a city person, a new hunter,
a visitor from France or the US who wants a black bear hunt in Québec).

How the app works (state only this, never invent features):
- Map of guides, a pin per guide: orange = hunting, teal = fishing, gold = both. Filters: hunting / fishing, then a
  species. With the user's approximate location (stays on the phone) each guide shows how far away it is.
- A guide's offer: title, what's included, region, species, price per person "from" (or on request), how long a
  trip lasts (half day to weeks) and its departure dates (or "Dates on request"); the next departure shows, the others
  under "Other dates", and the date the user picks goes into their email to the guide.
- Map filters also include the dates the user is free: only trips that fit entirely within them show. Offers whose
  one-time dates are over leave the map.
- The guide's name, phone, email and website show after a short optional video ad. No account, no fee for users.
- Guides list themselves for free: sign in with Google, a profile, as many offers as they like, each in five steps
  (the trip, species, where, when, price and send); dates are added one by one or weekly, on those dates only or every
  year; every offer is reviewed by us before it goes on the map.
- The app is NOT on Google Play yet (coming soon). Never claim numbers of guides, reviews, bookings or payments
  (none of these exist). Never invent prices, seasons dates, bag limits, licence fees or laws.

Write the app's name as the literal token `{app}` (it will be renamed later).

Species the app knows (id: EN / FR):
hunting: black-bear: Black bear / Ours noir · moose: Moose / Orignal · white-tailed-deer: White-tailed deer / Cerf de
Virginie (chevreuil) · caribou: Caribou / Caribou · wild-turkey: Wild turkey / Dindon sauvage · waterfowl: Ducks and
geese / Canards et oies · upland-birds: Grouse and upland birds / Gélinottes et petit gibier à plumes · predators:
Wolf and coyote / Loup et coyote
fishing: walleye: Walleye / Doré · northern-pike: Northern pike / Grand brochet · brook-trout: Brook trout / Omble de
fontaine (truite mouchetée) · lake-trout: Lake trout / Touladi · atlantic-salmon: Atlantic salmon / Saumon atlantique
· smallmouth-bass: Smallmouth bass / Achigan à petite bouche · muskellunge: Muskellunge / Maskinongé · ice-fishing:
Ice fishing / Pêche blanche
hunting (new): elk: Elk / Wapiti · mule-deer: Mule deer / Cerf mulet · pronghorn: Pronghorn / Antilope d'Amérique ·
bighorn-sheep: Bighorn sheep / Mouflon d'Amérique · mountain-goat: Mountain goat / Chèvre de montagne · pheasant:
Pheasant / Faisan · sharp-tailed-grouse: Sharp-tailed grouse / Tétras à queue fine
fishing (new): largemouth-bass: Largemouth bass / Achigan à grande bouche · rainbow-trout: Rainbow trout / Truite arc-en-ciel ·
pacific-salmon: Pacific salmon / Saumon du Pacifique · arctic-char: Arctic char / Omble chevalier · sturgeon: Sturgeon /
Esturgeon · yellow-perch: Yellow perch / Perchaude

## Rules

- Genuinely useful pages, written for a person, not for keywords: what a guided trip for this species looks like,
  why a guide helps, what's usually included, how to choose a guide, what to ask before booking, what to bring.
  A search engine must see a real, specific page, not a template with the species name swapped.
- Facts must be safe: general, well-known knowledge only. Where rules matter (licences, seasons, firearm/hunter
  certificates, non-resident rules, outfitter requirements for non-residents, fishing permits, catch limits) say that
  they vary by province and year and the reader must check the official regulations, and the guide can help. No
  numbers you aren't certain of. Caribou: hunting is closed or heavily restricted in much of Canada (Québec closed
  sport hunting of caribou); say so carefully and that guides offer it only where it is legal.
- French is **Québec French**, written natively (not a translation): « vous », pourvoirie, courriel, doré, touladi,
  chevreuil, moucheur, pêche blanche, permis, « en fin de semaine ». English is Canadian English (colour, licence).
- Plain, warm, confident tone. Short paragraphs (2–4 sentences). No exclamation marks, no emoji, no "unleash",
  "ultimate", "adventure of a lifetime", no fake testimonials.
- Mention `{app}` naturally once or twice per page (how it helps find a guide for that species), not more.

Output: valid JSON (UTF-8, no comments), exactly in the shape asked. Check it parses (`node -e
"JSON.parse(require('fs').readFileSync('FILE','utf8'))"`).
