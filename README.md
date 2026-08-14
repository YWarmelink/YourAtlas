# Youri's Travel Atlas

**Live website:** [https://ywarmelink.github.io/YourAtlas/](https://ywarmelink.github.io/YourAtlas/)

A personal travel dashboard built with vanilla HTML, CSS and JavaScript. Part of the YourIntineryPlan ecosystem.

> See [`CLAUDE.md`](CLAUDE.md) for architecture, file roles and known gotchas. See [`CHANGELOG.md`](CHANGELOG.md) for the full history of fixes, corrections and content builds.

## Pages

| Page | URL |
|------|-----|
| Home | [/](https://ywarmelink.github.io/YourAtlas/) |
| All Trips | [/trips.html](https://ywarmelink.github.io/YourAtlas/trips.html) |
| Route Builder | [/route-builder.html](https://ywarmelink.github.io/YourAtlas/route-builder.html) |
| Countries | [/countries.html](https://ywarmelink.github.io/YourAtlas/countries.html) |
| Map | [/map.html](https://ywarmelink.github.io/YourAtlas/map.html) |
| Search | [/search.html](https://ywarmelink.github.io/YourAtlas/search.html) |

## Data

Live data is pulled from a public Google Sheets spreadsheet (CSV). Fallback JSON files are in `data/youri/` when the sheet is unreachable.

**Route Builder is the exception**: it stores big, multi-country routes in `localStorage`
only (per browser, per device) — it doesn't touch the Google Sheet yet. There's a
concrete plan to change that in [`ROUTE_BUILDER_SYNC.md`](ROUTE_BUILDER_SYNC.md) —
new sheet tabs, Apps Script changes, client code — pick it up whenever you're ready
to make routes sync across devices.

## Route Builder

Plan long, multi-country "expeditions" by stacking country blocks in sequence — for
trips that span months, not weeks. Lives at `route-builder.html`.

- **Country blocks**: country, days, budget, free-form notes, and a "Transport to
  next" field (how you get from this country to the next one in the sequence — flight,
  overland bus, ferry, etc). Day ranges (Day 1–17, Day 18–25, …) compute automatically
  from the sequence — reorder blocks with ↑/↓ and the ranges shift with them.
- **Regional Blocks**: group a contiguous run of country blocks under a collapsible,
  named header with its own season, budget estimate and notes (e.g. "Balkans" = 5
  countries as one unit). Assign a block to a region via the dropdown on that block.
- **Destinations**: an optional free-form list of places (+ notes) per country block —
  this is where the specific cities/sights for that country live (e.g. "Petra",
  "Wadi Rum" under Jordan), separate from the country-level Note field.
- **Expedition details**: Status (Idea / Planning / Active / Completed), Travel
  Style, Best Starting Month, Description, Climate Summary, and route-wide Notes.
- **Calendar view**: set an optional start date to see the route laid out on real
  month grids, colored by country.
- **World map view**: highlights the route's countries on the same Leaflet world map
  `map.html` uses (shared lookup table in `js/utils/isoCountries.js`).
- **Route-line map view**: a second map mode ("📍 Routelijn" next to "🌍 Landen")
  that draws the route as an actual ordered path — a dashed line connecting one anchor
  coordinate per leg, with a numbered, color-coded marker per stop, starting and ending
  at a fixed Utrecht/Netherlands home marker. See `rbRenderRouteLine()` in
  `js/pages/routeBuilder.js`. A third mode ("🔍 Gedetailleerd") draws through every
  per-destination coordinate instead of one anchor per leg — available for any route
  once its destinations carry `lat`/`lng`. All 13 predefined expeditions now have this:
  Eurasia Grand Tour 🌏, Patagonia & Antarctica Expedition 🧊, India & Himalaya
  Expedition 🏔️, Nordic Arctic Expedition ❄️, Caribbean & Amazon Expedition 🌴, Central
  European Grand Roadtrip 🚗, British Isles & Celtic Coast Expedition 🍀, North America
  Grand Traverse 🌎, West & Central Africa Expedition 🌍, Oceania Grand
  Expedition 🌊, Pan-American Grand Tour 🌎, Mediterranean Civilizations
  Expedition 🏛️ and Africa Grand Tour 🌍 — see `ROUTE_LOGIC_REVIEW.md` for the full
  route-logic review history.
- **Block Library**: save a route as a reusable, named group of countries; insert it
  into any other route later (as an independent copy — editing one never affects the
  other), or merge 2+ saved blocks into a new combined block.

Thirteen predefined routes, all with real content and all price/visa/travel-advisory
verified as of 2026-07 (see `CHANGELOG.md` for the verification history):

**Eurasia Grand Tour 🌏**, **Pan-American Grand Tour 🌎**, **Africa Grand Tour 🌍**,
**Mediterranean Civilizations Expedition 🏛️**, **Nordic Arctic Expedition ❄️**,
**Patagonia & Antarctica Expedition 🧊**, **India & Himalaya Expedition 🏔️**,
**North America Grand Traverse 🌎**, **Oceania Grand Expedition 🌊**,
**Caribbean & Amazon Expedition 🌴**, **West & Central Africa Expedition 🌍**,
**Central European Grand Roadtrip 🚗**, and **British Isles & Celtic Coast
Expedition 🍀**.

Everything above lives in `localStorage` (`atlas_grand_trips`,
`atlas_route_blocks_library`) — see [`ROUTE_BUILDER_SYNC.md`](ROUTE_BUILDER_SYNC.md)
for the plan to move it into the Google Sheet.

**Modularizing the 13 expeditions**: a full analysis of which expeditions can split into
smaller, reusable "Major Trip" / "Travel Block" pieces (grounded in the actual route
data, not invented) lives in [`ROUTE_BUILDER_MODULES.md`](ROUTE_BUILDER_MODULES.md). Built for
11 of the 13 expeditions (2026-07): 38 new standalone companion routes exist alongside the
originals, reusing the exact same countries/days/budgets/content — the originals themselves are
completely untouched and still exist in full (see `CHANGELOG.md` for the full list of new
routes). Only **Central European Grand Roadtrip 🚗** and **British Isles & Celtic Coast
Expedition 🍀** were deliberately left unsplit (self-driven-from-NL loops, decided not to break
up). Not yet built: the technical Module Library work described in that analysis (metadata
fields, "possible standalone trips" UI, compatible/incompatible-blocks scoring) — for now the new
routes are just added as plain routes, the same way the original 13 are.

All 38 companion routes' first legs also got a real "flight from the Netherlands" opener + a
correct flight-home ending (2026-08 fix — before this, every one of them except Oost-Canada 🍁
still carried mid-tour waypoint text left over from being a middle leg of the bigger expedition).
See `CHANGELOG.md`'s "alle 38 losse split-routes" entry.

**Standalone single-country routes (in progress, 2026-08)**: `ROUTE_BUILDER_MODULES.md` also
flagged ~35 *individual* countries within those combined routes as strong enough to stand fully
alone ("Sterk") — never built as their own route, only the multi-country groupings were. 75
standalone routes built across six batches plus the Centraal-Azië further-split and combo batch 7
(2026-08) — the full candidate list from that analysis is now done, same reused content +
country-of-origin notes as every other split route, each with its own NL-departure opener and
flight-home ending:
- **Batch 1** ("most obvious", 2026-08): **Costa Rica 🦥**, **Colombia ☕**, **Peru 🦙**,
  **Egypte 🏺**, **Cuba 🎷**, **Namibië 🏜️**, **Curaçao & Bonaire 🤿**, **Suriname 🛶**.
- **Batch 2** (Youri's own top-10, 2026-08): **Japan & Taiwan 🗻**, **Zuid-Afrika 🦓**,
  **Kenia 🦒**, **Vietnam 🛵**, **Nieuw-Zeeland Zuidereiland 🏔️**, **Kaukasus 🍷**,
  **Marokko 🕌**, **Madagaskar 🦎**, **Sicilië 🌋**, **Jordanië 🏺**.
- **Batch 3** (Youri's second top-10, 2026-08): **Thailand 🛕**, **Tanzania 🦁**,
  **Botswana 🐘**, **Ecuador 🐢**, **Centraal-Azië 🐎** (Kazachstan/Kirgizië/Tadzjikistan/
  Oezbekistan samen, ~45d), **Cairns & Great Barrier Reef 🐠**, **Californië 🌲**,
  **Jamaica 🎵**, **Fiji 🌊**, **Filipijnen 🏖️**.
- **Batch 4** (Claude's aanbevolen top-10 uit de resterende kandidatenlijst, 2026-08): **Spanje 💃**,
  **Rwanda 🦍**, **Mauritius 🦤**, **Argentijns Patagonië 🥩**, **Chileens Patagonië 🥾**,
  **Griekenland & Kreta 🫒**, **Oezbekistan 🐪**, **Kirgizië 🐴**, **Zimbabwe 🐆**,
  **Sydney/Byron & Great Ocean Road 🦘**. Bewust nog niet meegenomen: het Golfstaten-trio en
  Ethiopië (reisadvies-gevoelig), Cyprus/Sardinië (te kort, 5-6d) en Bolivia/Panama/Nicaragua/
  Guatemala (dunner als losse Major Trip volgens de analyse) — zie de resterende kandidatenlijst
  hieronder.
- **Batch 5** (Youri's top-10 uit de resterende ~25-kandidatenlijst, 2026-08): **Mongolië 🦅**,
  **Vietnam & Cambodja 🛺**, **Rome & omgeving 🍕**, **Guatemala 🦜**, **Panama 🚢**, **Ghana 🥥**,
  **Tasmanië 🐾**, **Nieuw-Zeeland Noordereiland 🌿**, **Fiji & Vanuatu 🐚** en
  **Guadeloupe & Dominica 🍃**. Voor later bewaard: Bolivia, Nicaragua, Mozambique, Zambia &
  Malawi, Ethiopië, Sardinië, Cyprus, Golfstaten-trio, Maleisië, Saint Lucia & Grenada, Kaapverdië,
  Senegambia, Gabon, São Tomé & Príncipe en Pacific Northwest (15 stuks).
- **Batch 6** (de resterende 15 kandidaten — alles wat over was, 2026-08): **Bolivia 🧂**,
  **Nicaragua 🌅**, **Mozambique 🐋**, **Zambia & Malawi 💦**, **Ethiopië ⛪**, **Sardinië 🗿**,
  **Cyprus 🕊️**, **Golfstaten-trio 🛢️**, **Maleisië 🦋**, **Saint Lucia & Grenada 🌰**,
  **Kaapverdië 🎶**, **Senegambia 🦩**, **Gabon 🏕️**, **São Tomé & Príncipe 🍫** en
  **Pacific Northwest 🦫**. ⚠️ Twee routes hebben een zware reisadvies-kanttekening die letterlijk
  is overgenomen uit hun parent-expeditie: **Ethiopië ⛪** (Amhara/Afar-regio's op ROOD — Lalibela,
  Simien Mountains, Gondar, Danakil Depressie, "reis niet naar gebieden met kleurcode rood",
  óók bij een georganiseerde tour) en **Golfstaten-trio 🛢️** (Bahrein op ROOD, geen Nederlandse
  ambassade, wegens het regionale Iran-Israël/VS-conflict; Qatar oranje). Beide routes blijven
  staan (Route Builder is de aspirational/someday-laag), maar check nederlandwereldwijd.nl grondig
  vlak vóór een eventuele echte reis.

**Long-haul flight buffer (2026-08, see `CLAUDE.md`'s "long-haul flight buffer policy")**: 13 of
the 75 got a +2 day buffer for exposure to their round-trip flight time — **Tunesië 🧿** (6→8d,
short trip + connecting flight) is the latest addition, alongside — **Jordanië 🏺** (8→10d),
**Nieuw-Zeeland Zuidereiland 🏔️** (21→23d), **Cairns & Great Barrier Reef 🐠** (21→23d),
**Fiji 🌊** (14→16d), **Mauritius 🦤** (7→9d), **Sydney/Byron & Great Ocean Road 🦘** (12→14d on
its first leg), **Mongolië 🦅** (10→12d), **Tasmanië 🐾** (12→14d),
**Nieuw-Zeeland Noordereiland 🌿** (14→16d), **Fiji & Vanuatu 🐚** (11→13d on its Vanuatu etappe),
**Gabon 🏕️** (9→11d) and **São Tomé & Príncipe 🍫** (9→11d). The rest were checked against the
same rule and left as-is.

**Centraal-Azië 🐎 further split (2026-08)**: acted on its own note above — **Kazachstan &
Kirgizië ⛺** (20d, overland Almaty-Bishkek) and **Oezbekistan & Tadzjikistan 🌄** (25d, overland
Samarkand/Panjakent — Youri's own correction of an earlier "Kazachstan & Tadzjikistan" attempt,
which had to fly Almaty-Dushanbe since those two don't share a border; Uzbekistan and Tajikistan
do, making this the genuinely logical overland combo) now exist as their own routes alongside the
original 4-country Centraal-Azië 🐎, which is untouched. Kirgizië 🐴 and Oezbekistan 🐪 already had
single-country routes from batch 4.

**Combo batch 7 (2026-08, Claude's picks from the remaining Sterk/Medium combos in
`ROUTE_BUILDER_MODULES.md`)**: ten more built, four of them a first for this app — reframing
pieces of the two self-driven car-loop expeditions as "fly in + rent a car" trips, something the
analysis flagged as viable for British Isles specifically (unlike Central European Grand
Roadtrip 🚗, which it advised against splitting):
- **Engeland, Wales & Isle of Man 🎩** (38d) · **Schotland & Noord-Ierland 🥃** (27d) ·
  **Ierland ☘️** (22d) · **Kanaaleilanden, Bretagne & Normandië/Opaalkust & België 🥖** (28d) — all
  four losgesplitst van British Isles & Celtic Coast Expedition 🍀, same leg content/ferries, only
  entry/exit swapped from "own car from NL" to "fly in, rent a car, fly home" (Channel Islands
  route ends with a one-way rental drop-off in Amsterdam instead of driving back).
- **Balkan 🐺** (35d, from Eurasia Grand Tour 🌏's West-Eurazië Overland 🐫)
- **Malta ⚔️** (5d) and **Tunesië 🧿** (8d incl. buffer) — both from Mediterranean Civilizations
  Expedition 🏛️
- **Zuid-Afrika & Bergkoninkrijkjes 👑** (35d, ZA+LS+SZ) and **Victoria Falls & Kalahari-lus 🦏**
  (50d, MZ+ZW+BW) — both from Africa Grand Tour 🌍's Zuidelijk Afrika Safari-lus 🦁, existing
  alongside the already-built single-country Zuid-Afrika 🦓/Mozambique 🐋/Zimbabwe 🐆/Botswana 🐘
- **Noord-Brazilië 🪁** (14d, from Caribbean & Amazon Expedition 🌴's Suriname & Noord-Brazilië 🌴,
  alongside the existing standalone Suriname 🛶)

**Candidate list status**: all candidates from `ROUTE_BUILDER_MODULES.md`'s analysis have now
been built as standalone routes, plus the Centraal-Azië 🐎 further-split and combo batch 7 above.
Remaining un-split items are all ones the analysis itself rated weaker: Central European Grand
Roadtrip 🚗's Balkan-as-flyto candidate (Medium-rated) and a handful of Sub-tier country/island
pieces (Singapore, Brunei, individual Pacific islands like Tonga/Samoa/Cook Islands). Further
splitting would need a fresh look at that document.

**Batch 8 (2026-08)**: **Dolomieten & Noord-Italië 🚡** (19d, Central European Grand Roadtrip 🚗's
strongest fly-in candidate — Milan/Turin/Cinque Terre/Tuscany/San Marino/Venice loop, entry/exit
changed to fly into Venice/rent a car instead of driving from home).

**World coverage audit (2026-08, see `ROUTE_BUILDER_MODULES.md`'s "Wereldwijde dekking-check")**:
found four entire regions missing from Route Builder that weren't in the modularization analysis
above since they're gaps, not un-split candidates — US Northeast, US Southwest desert, Alaska,
Hawaii — plus Florida, which Youri added himself on top of that list. Youri's explicit call: build
these as **loose standalone trips**, not merged into one bigger North America Grand Traverse 🌎
(which stays unchanged, since it already connects well as one overland arc). **Batch 9**: **US
Oostkust 🗽** (DC-Philadelphia-New York-Boston via train, 12d/€1.365), **US Zuidwesten 🏜️**
(Vegas-Zion-Bryce-Antelope Canyon-Monument Valley-Grand Canyon-Sedona-Phoenix, one-way rental,
12d/€1.500), **Hawaii 🐢** (Oahu-Maui-Kauai, 14d/€2.240, Big Island left out) and **Florida 🐊**
(Miami-Everglades-Keys-Key West, 10d/€1.360, Orlando and North Florida deliberately left out).
**Alaska** instead got added onto the existing **West-Canada: Rockies & Vancouver 🏔️** (Youri's
choice — Vancouver-Anchorage is already the natural flight link), new total 32d/€5.875 (was
22d/€4.275).

## Europa Trip Ideas (nieuw, 2026-08 — batches 1-10 klaar)

See [`EUROPA_TRIP_IDEAS.md`](EUROPA_TRIP_IDEAS.md) — Youri's own big raw list (~230 items, extended
2026-08 with a second batch of additions — micro-states, Cyprus/Malta/Moldavië/Kosovo/Corsica/
Turkey's European part, plus a whole "🏝️ Europese eilanden" category — to ~300 items, then a third
addition of newly-added regions to ~320 items total) of realistic European trips, from long
weekend to ~3 weeks, organized by country/region. Different
scale than Route Builder's grand expeditions — this is the "reëel en slim te maken" realistic-trip
tier, not aspirational epics. **Decided (2026-08): these become Route Builder routes, not Trips
entries** — per `ROADMAP.md`'s already-decided "commitment, not scale" rule for the Trips↔Route
Builder split (no booking commitment yet = Route Builder). They'll land under the existing Europe
continent group in Route Builder's list view automatically. Not yet done: actually writing each
worked-out item into `routeBuilder.js` as a real `rbBuildXRoute()` — that's a separate step, likely
done in one pass once several batches are ready rather than per item.

**Status: batches 1-10 done** — Benelux (6), Duitsland (12), Oostenrijk + Zwitserland (12),
Frankrijk (11), Italië (16), micro-staten & kleine eilanden (20), Iberië (26), Balkan-cluster (44:
Kroatië/Slovenië/Bosnië/Montenegro/Albanië/Servië/Noord-Macedonië/Kosovo), Centraal/Oost-Europa
(35: Roemenië/Bulgarije/Moldavië/Hongarije/Tsjechië/Slowakije/Polen), Oost-Mediterraan (18:
Griekenland/Cyprus/Turkije). Route/dagen/budget/seizoen/vervoer per trip. Benelux was written from
general knowledge then WebSearch-verified afterward;
**standard practice from batch 2 onward**: 2-3 parallel WebSearch-backed research agents (grouped
by sub-region) before writing anything, not after — this caught real route improvements each time
(Duitsland: Rijn+Moezel via Koblenz, Berchtesgaden as a loop-closer; Oostenrijk/Zwitserland:
non-overlapping concrete regions for the vague "[Land] Alpen" items; Frankrijk: Bretagne limited to
the north for time reasons, French Alps became Écrins instead of Chamonix to avoid overlap with
Switzerland, the north-south roadtrip follows the Burgundy-Rhône spine instead of Loire-Dordogne to
avoid a real backtrack — plus a time-sensitive finding, the Bayeux Tapestry isn't viewable in
Bayeux at all in 2026, on loan to the British Museum from Sept 2026; Italië: several items
overlapped heavily with each other — each got an explicit differentiating angle (e.g. "Italië
roadtrip" became car-only/rural/food-focused vs. "Italië: noord → centraal" staying the classic
train-friendly big-city sweep) instead of just being near-duplicates; micro-staten: four of the six
micro-states only existed as neighbor-combo items, so a standalone-only version was added for each
(Liechtenstein/Monaco/San Marino/Vaticaanstad) at Youri's request — honestly flagged where that
standalone framing is marginal, e.g. Vaticaanstad has no hotels/airport of its own so it stays a
Rome day-visit rather than a true standalone destination, and San Marino's own day trip works
best as an add-on from a Rimini/Emilia-Romagna stay rather than a fly-in-fly-out trip; Iberië: the
broader combo items risked re-treading the same regions as each other and as the new standalone
Galicië/Asturië+Cantabrië/Centraal-Portugal items — each combo got a distinct angle instead, e.g.
"Noord-Spanje" became the Basque-inland/wine-country extension while "Noord-Spanje roadtrip" became
the explicit "connector" stringing Baskenland+Asturië+Cantabrië+Galicië together for a 2-week trip;
Andorra's two combo items were split into a French/Ariège side vs. a Spanish/Catalan side instead
of the same region at two lengths; Balkan-cluster: Croatia-Bosnia's Neum coastal corridor is
bypassed on the main route by the Pelješac bridge (open since July 2022) — the old "double border
crossing" assumption is outdated; the EU's Entry/Exit System (EES, fully live since 10 April 2026)
adds real biometric-registration wait times at every Schengen/non-Schengen border in this cluster,
worst at Croatia-Montenegro (Karasovići, 2-5h in July/Aug); Kosovo items were deliberately combined
only with North Macedonia/Albania/Montenegro, never Serbia, since Serbia doesn't recognize Kosovo
border crossings — entering Kosovo without first entering Serbia and then trying to cross into
Serbia can mean refused entry; Centraal/Oost-Europa: Romania and Bulgaria became **fully** Schengen
(land borders included) on 1 January 2025, so the old "border check between them" assumption is
outdated; Bulgaria adopted the euro on 1 January 2026 (BGN prices phased out by 8 August 2026);
Transnistria (the Moldova+Transnistrië item) got its own explicit red Dutch travel advisory,
separate from and stricter than Moldova proper — treated as a real judgment call with a concrete
mitigation (day-trip only, no overnight, check insurance) rather than a rubber-stamped inclusion;
Gellért thermal bath in Budapest is closed for renovation since 1 Oct 2025 until ~2028, so the
Budapest items route through Széchenyi instead; Auschwitz-Birkenau requires online-only booking
since March 2026, no more on-site ticket sales; Oost-Mediterraan: Greece carries a yellow Dutch
advisory since Aug 2026 for active wildfires (70+ simultaneous, incl. Crete and the Athens region)
— not a reason to avoid it, just a standing seasonal caveat; Cyprus is EU but not Schengen, and its
own roadtrip item required a real judgment call on crossing into Northern Cyprus (Green Line
checkpoints are normal for tourists, but rental cars from the Republic side usually can't cross
without separate Turkish border insurance, and NL doesn't recognize the north as a state); Hagia
Sophia's upper gallery closes ~30-45min five times a day for prayer as a functioning mosque again).
Proposed batch order (see the bottom of that file for the full
reasoning per cluster, updated after the 2026-08 extension): (1) ~~Benelux~~ **done**, (2)
~~Duitsland~~ **done**, (3) ~~Oostenrijk + Zwitserland~~ **done**, (4) ~~Frankrijk~~ **done**, (5)
~~Italië~~ **done**, (6) ~~Micro-staten & kleine eilanden~~ **done** (Liechtenstein/San Marino/
Vaticaanstad/Monaco/Corsica/Malta), (7) ~~Iberië: Spanje + Portugal + Andorra~~ **done**, (8)
~~Balkan-cluster (Kroatië/Slovenië/Bosnië/Montenegro/Albanië/Servië/Noord-Macedonië/Kosovo)~~
**done**, (9) ~~Centraal/Oost-Europa (Roemenië/Bulgarije/
Hongarije/Tsjechië/Slowakije/Polen/Moldavië)~~ **done**, (10) ~~Oost-Mediterraan (Griekenland/
Cyprus/Turkije-Europees + Egeïsche kust)~~ **done**, (11) Noord-Europa (Noorwegen/Zweden/Denemarken/Finland/IJsland/Faeröer),
(12) Britse eilanden (Engeland/Wales/Noord-Ierland/Ierland/Schotland), (13) Baltische staten, (14)
🏝️ Europese eilanden (Madeira/Azoren/Canarische Eilanden/Balearen/Kanaaleilanden/Isle of Man/
gedetailleerdere Italiaanse+Griekse eilanden), (15) de combinatiesecties onderin het bestand
(bewust laatst, want die hergebruiken de losse-landen-batches).

**Derde aanvulling (2026-08) — verwerkt**: Youri leverde daarna nog een brede regio-checklist
(West-/Noord-/Centraal-/Zuid-Europa, Balkan, microstaten, Turkije, bijzondere eilanden). Bijna
alles daarop bestond al; de écht nieuwe regio's zijn inmiddels omgezet naar het "X dagen —
route"-format en ingedeeld bij hun bestaande land/sectie (zie `EUROPA_TRIP_IDEAS.md`'s "Extra
regio's"-sectie voor de volledige toewijzing per item): Engeland/Wales/Noord-Ierland (nieuwe
sectie, batch 12), Zweeds Lapland (Zweden, batch 11), Faeröer (nieuwe sectie, batch 11 — de
realistische korte versie, naast de bestaande aspirational Route Builder-splitroute), Moravië
(Tsjechië, batch 9), Campanië/Puglia (Italië, batch 5), Galicië/Asturië+Cantabrië/Gibraltar
(Spanje, batch 7), Centraal-Portugal (Portugal, batch 7), Egeïsche kust (Turkije, batch 10),
Svalbard (Noorwegen, batch 11), Åland (Finland, batch 11), Shetland/Orkney/Buiten-Hebriden
(Schotland, batch 12), Isle of Man/Jersey & Guernsey (nieuwe subsectie onder 🏝️ Europese eilanden,
batch 14). Oekraïne/Belarus/Europees Rusland op Youri's eigen instructie bewust niet toegevoegd.
Bij de Egeïsche-kust-uitzondering werd ook de lijst-regel zelf scherper gemaakt: niet strikt
"Europa, geografisch" maar "dichtbij, geschikt voor city trip/~1 week, geen dure/lange vlucht voor
zo'n korte periode" — dat is de regel voor toekomstige twijfelgevallen.

**Next up: batch 11, Noord-Europa** (Noorwegen/Zweden/Denemarken/Finland/IJsland/Faeröer, 32
items).

## Search

`search.html` — one search box across Trips, Route Builder expeditions (incl. country blocks,
destinations and the Block Library) and trip Notes, client-side over data that's already
loaded. Groups results by source, each result links straight to the right page (Route Builder
results deep-link via `route-builder.html?open=<id>`, opening that expedition's editor
directly). See `js/pages/search.js`.

## Trips route map (in progress)

Trips can now show a "🔍 Gedetailleerd"-style route line too, same idea as Route Builder's —
see [`TRIP_ROUTE_MAP.md`](TRIP_ROUTE_MAP.md) for the full plan. The map code
(`js/utils/routeMap.js`, wired into `trip.html`/`js/pages/tripDetail.js`) is done and only
shows up on a trip once it has ≥2 destinations with coordinates. **Nothing has coordinates
yet** — that needs a new Sheet tab, which is the next action:

**Pilot trip: South Korea** (planned & booked) — first one to get `TripDestinations` rows.

**Reminder for when you start on it:** the South Korea trip itself also needs some small
adjustments beyond just adding destinations/coordinates — exact details still TBD, sort those
out first when you sit down with it, then do the destinations below.

**Youri — next time you're in the Google Sheet:**
1. Add a tab named `TripDestinations` with columns: `trip_id | order | country | country_code | name | lat | lng | notes`.
2. `File → Share → Publish to web` → CSV, same as the other tabs.
3. Fill in rows for the South Korea trip first (coordinates: right-click a spot in Google Maps
   → the lat/lng shows at the top of the context menu, click to copy).
4. Send Claude the published CSV URL — it swaps into `js/config/users.js`'s `trip_destinations`
   source (currently pointed at an empty local JSON fallback as a placeholder).

## Open items

**GitHub Pages/push deploy — investigate a "build failed"-style email (2026-08-13, not yet
diagnosed)**: Youri received an email suggesting a push/deploy failure, but the `git push` itself
(commit `99d75e6`, the micro-staten batch) completed successfully — confirmed via `git log`/`git
push` output. Checked locally: no `.github/workflows`, no `_config.yml`/`.nojekyll`, no stray
`{{`/`{%` (Jekyll/Liquid) syntax in the changed files — so no obvious local cause found yet. Youri
found the actual email and wants to check it himself; revisit with the real error text before
assuming it's benign.

**Route Builder — remaining split candidates** (all rated weaker in `ROUTE_BUILDER_MODULES.md`,
none built yet — everything Sterk/Medium is done as of the combo batch above, except the one item
below marked done):
- ~~**Central European Grand Roadtrip 🚗**'s Dolomieten & Noord-Italië fly-in reframe (19d)~~ —
  **done (2026-08)**, built as **Dolomieten & Noord-Italië 🚡**.
- **Central European Grand Roadtrip 🚗**'s other fly-in reframe: Balkan-as-flyto (16d) — the
  analysis is Medium (not Sterk) on this one (car-loop logic translates less cleanly than it did
  for British Isles), so treat as optional.
- **Sub-tier pieces**: Singapore alleen (Eurasia's Zuidoost-Azië Grand Loop 🛕, 3d — too short to
  sell alone), Brunei alleen (2d, same reason), individual Pacific islands (Tonga, Samoa, Cook
  Islands — each 7-9d, part of Pacific-eilanden 🌺, never flagged as strong standalone candidates
  in the analysis the way Fiji/Vanuatu were).
- **Route Builder Module Library** (technical layer, not content): the content side of the
  modularization is now fully done (75+ standalone/combo routes), but the technical layer described
  in `ROUTE_BUILDER_MODULES.md`'s "Route Builder implementation" section still isn't built —
  `standalone_score`/`season`/`possible_next_blocks` metadata on Block Library items, a "mogelijke
  standalone trips" section per Grand Expedition, and evolving Block Library into an actual Module
  Library. For now every new route above is just a plain route, same as the original 13.

**Route Builder → Google Sheet sync**: still 100% `localStorage`, doesn't follow Youri across
devices/browsers. Next concrete step per `ROUTE_BUILDER_SYNC.md`: add 4 new Sheet tabs
(`GrandTrips`, `GrandTripRegions`, `GrandTripBlocks`, `GrandTripDestinations`), publish each as CSV,
then extend the Apps Script `doPost` for `GrandTrip*` payloads.

**Trips route map — South Korea pilot**: needs Youri's manual Google Sheet work (new
`TripDestinations` tab + coordinates) before the already-built map code will show anything — see
the "Trips route map" section above for the exact steps.

**Trip detail page — look and feel (2026-08 idea, not designed):** Youri wants to revisit how a
trip actually looks when opened (`trip.html`) at some point — no direction decided yet, see
`ROADMAP.md`'s "Planned features" for the placeholder note.

**Everything else**: see [`ROADMAP.md`](ROADMAP.md) for the rest of the planned work and direction
(visa/passport tracker, visited-countries badges, yearly travel recap, the Trips↔Route Builder
rethink, a Sabbatical page, folding in `youridealtravel`, live flight-price scraping, a real
backend) and `CLAUDE.md` for smaller cosmetic gaps (map highlighting, dropdown lag) that are
accepted as-is rather than open work.

## Architecture

```
js/config/users.js      ← User configuration (multi-user ready)
js/data/dataService.js  ← Single data abstraction layer
js/data/csvParser.js    ← CSV parser
js/utils/                ← Shared helpers (flags, dates, ISO country codes)
js/components/          ← Navbar + footer
js/pages/               ← Per-page logic
```

## Repository

[github.com/YWarmelink/YourAtlas](https://github.com/YWarmelink/YourAtlas)
