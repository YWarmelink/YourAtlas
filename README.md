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

## Europa Trip Ideas (nieuw, 2026-08 — alle 15 batches klaar, het hele document is af)

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

**Status: all 15 batches done — the entire document is finished** (batches 11-15 done in a
non-sequential order picked directly by Youri each time: 13, 12, 11, 14, then 15 to close it out)
— Benelux (6), Duitsland (12), Oostenrijk + Zwitserland (12), Frankrijk (11), Italië (16),
micro-staten & kleine eilanden (20), Iberië (26), Balkan-cluster (44: Kroatië/Slovenië/Bosnië/
Montenegro/Albanië/Servië/Noord-Macedonië/Kosovo), Centraal/Oost-Europa (35: Roemenië/Bulgarije/
Moldavië/Hongarije/Tsjechië/Slowakije/Polen), Oost-Mediterraan (18: Griekenland/Cyprus/Turkije),
Noord-Europa (32: Noorwegen/Zweden/Denemarken/Finland/Faeröer/IJsland), Britse eilanden (17:
Ierland/Schotland/Engeland/Wales/Noord-Ierland), Baltische staten (6: Estland/Letland/Litouwen),
🏝️ Europese eilanden (30: Madeira/Azoren/Canarische Eilanden/Balearen/Italiaanse eilanden/Griekse
eilanden/Kanaaleilanden+Isle of Man), combinatiesecties (33: Iberië-combo/Balkan-combo/Grote
Europese combinaties). Route/dagen/budget/seizoen/vervoer per trip. Benelux was written from
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
Sophia's upper gallery closes ~30-45min five times a day for prayer as a functioning mosque again;
Baltische staten (batch 13, done out of turn since it's the smallest remaining batch): none of the
suggested routes actually cross a non-Schengen border — the region's real geopolitical friction
points (Narva/Russia, the Latvia-Belarus border strip, Lithuania's Belarus/Kaliningrad-adjacent
zones, the Suwałki Gap's visible NATO buildup) all sit outside every proposed itinerary, so they're
noted as context rather than route changes; Britse eilanden (batch 12, also done out of turn):
the UK ETA fee rose from £16 to £20 (~€23-24) on 8 April 2026 and applies to Northern Ireland even
when crossing overland from the Republic of Ireland (no border checkpoint, but the requirement is
still legally in force); Ireland itself needs no ETA at all (EU free movement, Common Travel Area
is separate from Schengen); Skye is bridge-connected (free since Dec 2004, no ferry needed) while
Orkney/Shetland/Outer Hebrides genuinely need one (NorthLink, Pentland Ferries, or CalMac
respectively) — several near-duplicate Ireland and Scotland items again each got an explicit
differentiating angle rather than the same trip padded to different lengths;
🏝️ Europese eilanden (batch 14): the Canary Islands and Åland-style "outside the EU tax zone"
pattern showed up again here too — the Canaries sit outside the EU VAT area (own IGIC tax); real
recent regulatory finds folded in include the UK ETA extending to cover Jersey/Guernsey/Isle of
Man as of 23 April 2026 (one ETA now covers the whole Common Travel Area's Crown Dependencies),
Condor Ferries rebranding (Jersey route now DFDS, Guernsey route now Brittany Ferries, as of March
2025), and Santorini's 2025-2026 cruise-passenger cap tightening; a stale intro note claiming
"Kreta already covered under Griekenland (batch 10)" turned out to be wrong on inspection — Crete
never actually got its own item there, so the batch 14 "Kreta roadtrip" item fills a real gap
rather than duplicating one). Proposed batch order (see the bottom of that file for the full
reasoning per cluster, updated after the 2026-08 extension): (1) ~~Benelux~~ **done**, (2)
~~Duitsland~~ **done**, (3) ~~Oostenrijk + Zwitserland~~ **done**, (4) ~~Frankrijk~~ **done**, (5)
~~Italië~~ **done**, (6) ~~Micro-staten & kleine eilanden~~ **done** (Liechtenstein/San Marino/
Vaticaanstad/Monaco/Corsica/Malta), (7) ~~Iberië: Spanje + Portugal + Andorra~~ **done**, (8)
~~Balkan-cluster (Kroatië/Slovenië/Bosnië/Montenegro/Albanië/Servië/Noord-Macedonië/Kosovo)~~
**done**, (9) ~~Centraal/Oost-Europa (Roemenië/Bulgarije/
Hongarije/Tsjechië/Slowakije/Polen/Moldavië)~~ **done**, (10) ~~Oost-Mediterraan (Griekenland/
Cyprus/Turkije-Europees + Egeïsche kust)~~ **done**, (11) ~~Noord-Europa (Noorwegen/Zweden/
Denemarken/Finland/IJsland/Faeröer)~~ **done**,
(12) ~~Britse eilanden (Engeland/Wales/Noord-Ierland/Ierland/Schotland)~~ **done**, (13)
~~Baltische staten~~ **done**, (14) ~~🏝️ Europese eilanden (Madeira/Azoren/Canarische Eilanden/
Balearen/Kanaaleilanden/Isle of Man/gedetailleerdere Italiaanse+Griekse eilanden)~~ **done**, (15)
~~de combinatiesecties onderin het bestand~~ **done** (bewust laatst gedaan, want die hergebruiken
de losse-landen-batches). **Alle 15 batches zijn nu klaar** — batches 12, 13, 14 en 15 zijn buiten
de oorspronkelijke volgorde om gedaan, telkens Youri's eigen keuze.

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

**All batches done — nothing left in this checklist.** The next step for Route Builder specifically
is the still-not-started conversion of each worked-out item into a real `rbBuildXRoute()` in
`routeBuilder.js` (see the intro above) — likely done in one focused pass whenever Youri wants to
pick that up, not per item.

## Trip Taxonomy (nieuw, 2026-08 — 29-veld classificatiesysteem, Fase 2 + Groep 3 100% klaar)

See [`TRIP_TAXONOMY.md`](TRIP_TAXONOMY.md) for the full field/vocabulary spec (Fase 1 design, approved
by Youri as-is — all 29 fields kept, nothing cut) and [`TRIP_DATABASE.csv`](TRIP_DATABASE.csv) for the
tagged data (Fase 2). Goal: one consistent 29-field row per trip across the whole app (Route Builder's
13 Grand Trips + their splitroutes, and `EUROPA_TRIP_IDEAS.md`'s items), usable for
filtering/comparing/a future route optimizer. English throughout in the CSV (country names, months,
advisory notes — even though the source Dutch route notes get translated), multi-value fields
semicolon-separated within a quoted cell, "—" for not-applicable.

**Status: ALL of Fase 2 is now 100% done and pushed to origin (2026-08-18).** Groep 1 (13 Grand
Trips) + Groep 2 (118 splitroutes) + Groep 3 (319 `EUROPA_TRIP_IDEAS.md` items, all 21 planned
sub-batches complete) — **450 rows total in `TRIP_DATABASE.csv`**. Every trip in the app/planning
docs now has a consistent 29-field tag row.
Total cost: 4,270,377 tokens across 43 tagging batches run over several sessions specifically to
avoid burning a whole session's budget in one pass (Groep 1+2: 2,059,921 for 131 items at
~15,725/item; Groep 3: 2,210,456 for 319 items at **~6,930/item — less than half Groep 2's rate**,
confirming the hypothesis that plain-markdown source content tags cheaper than diving into
`routeBuilder.js`'s 9000+ line source).

**Groep 3 — done, `EUROPA_TRIP_IDEAS.md`'s 319 items (not ~320 as originally estimated) across 21
sub-batches, reusing that document's own 15 named batches** (see the "Europa Trip Ideas" section
above), splitting the 6 largest (26+ items) into two halves each so no single tagging batch got too
big:

| # | Batch (from EUROPA_TRIP_IDEAS.md) | Real item count | Tokens |
|---|---|---|---|
| 1 | Benelux (pilot) | 6 | 65,217 |
| 2 | Duitsland | 12 | 86,991 |
| 3 | Oostenrijk + Zwitserland | 12 | 88,367 |
| 4 | Frankrijk | 11 | 100,209 |
| 5 | Italië | 16 | 117,839 |
| 6 | Micro-staten & kleine eilanden | 20 | 134,667 |
| 7a+7b | Iberië (Spanje+Andorra+Portugal) | 26 | 109,952 + 115,127 |
| 8a+8b | Balkan-cluster | **45** (planned 44) | 110,735 + 118,753 |
| 9a+9b | Centraal/Oost-Europa | 35 | 109,964 + 88,819 |
| 10 | Oost-Mediterraan | **17** (planned ~18) | 115,908 |
| 11a+11b | Noord-Europa | 32 | 125,576 + 108,285 |
| 12 | Britse eilanden | 17 | 95,294 |
| 13 | Baltische staten | 6 | 74,538 |
| 14a+14b | 🏝️ Europese eilanden | 30 | 102,701 + 108,253 |
| 15a+15b | Combinatiesecties | **34** (planned 33) | 117,054 + 116,207 |

**Lesson reinforced repeatedly: never trust a pre-stated item count.** The doc's own "batch-indeling"
summary was wrong three separate times (Balkan-cluster 44→45, Oost-Mediterraan 18→17,
Combinatiesecties 33→34) — every sub-batch prompt now explicitly tells the tagging agent to
grep/count the actual bullets itself rather than trust the plan's number, and to tag every real item
found even if that means one sub-batch runs slightly over its "half" split.

**Real findings surfaced during tagging** (not just mechanical tagging — a few genuine
safety/regulatory checks came out of reading the source closely): Moldova + Transnistria item tagged
Advisory Level = Red / Border Complexity = Complex (Russian troops, war-adjacent tension) — the one
genuinely active-conflict-adjacent item in all of Groep 3. Cyprus confirmed EU-but-not-Schengen;
Northern Cyprus crossings tagged Complex. Kosovo's items never combine with Serbia in the source
(deliberate design), tagged Simple non-Schengen throughout, no invented complication. UK/Ireland
items tagged non-Schengen with the post-Brexit ETA requirement. Switzerland/Norway/Iceland items
got Budget Level €€€€ overrides where their real per-day ranges warranted it, rather than force-fit
to the blanket ≤105→€€/≥110→€€€ heuristic used for the rest of Europe. The "Grote Europese
combinaties" subsection (last ~17 items) got `Verification Status = Draft` rather than `Verified`,
since its own footer admits the WebSearch budget ran out and it reused prior verified country data
instead. Several Combinatiesecties items are deliberate near-duplicates of already-tagged combos
(e.g. "Bosnia + Croatia + Montenegro" tagged a third time) — flagged during tagging, not treated as
errors, since `EUROPA_TRIP_IDEAS.md` itself repeats these combos across sections.

**Workflow per batch** (same as Groep 1/2, held for all 21 sub-batches): delegate to a subagent that
reads `TRIP_TAXONOMY.md` for the schema + the relevant `EUROPA_TRIP_IDEAS.md` batch section, outputs
raw CSV lines only (no header, no commentary, English throughout, `&` not `&amp;`, no "€" prefix on
the Budget €/day column), append to `TRIP_DATABASE.csv`, commit locally, report the token cost, then
ask before starting the next sub-batch.

**Separate, not-yet-started step: making this data actually visible/usable in the app itself.**
Right now `TRIP_TAXONOMY.md` and `TRIP_DATABASE.csv` are just files sitting in the repo — visible on
GitHub if you open them, but **no code anywhere in `js/` or any `.html` page reads or references
either file** (confirmed by grepping the whole codebase, 2026-08-17). There is no filter UI built on
these 29 fields, no page that displays a trip's tags, and no wiring between this CSV and the existing
`dataService.js`/Google-Sheet data layer that powers the rest of the app. Collecting the taxonomy
data (Fase 1+2, in progress) and making it live/usable in the UI (an entirely separate future
implementation step — likely a new page or filter component that reads `TRIP_DATABASE.csv` the way
`dataService.js` reads the Sheet) are two distinct pieces of work; only the first has started. No
plan/estimate exists yet for the second — not started, wait for Youri to raise it.

## Route Builder: English content + EUROPA_TRIP_IDEAS conversion + Taxonomy UI (2026-08, 3-phase plan)

Three dependent workstreams, in this order. Started 2026-08-18. Resume here after a break — this
section is written to be picked back up cleanly without re-deriving the plan.

**Why this order**: Phase 2 writes 319 new routes in English from day one — doing that before Phase 1
finishes would leave Route Builder mixed-language during the transition. Phase 3 (a filter UI over
`TRIP_DATABASE.csv`) is far more useful once ~450 routes actually exist in the app than it is over
today's 131, so it comes last.

### Phase 1 — translate all 131 existing routes (13 Grand Trips + 118 splitroutes) from Dutch to English

The rest of the app (page chrome, buttons, the Trips-sheet data) is already English — only Route
Builder's route content (names, `notes`, `travel_style`, `climate_summary`, `description`,
`transport_to_next`, destination names) is Dutch, left over from when Route Builder was originally
built. Facts/figures/reasoning stay exactly the same — text translation only, never a content change.

**Two structurally different route types, per `CLAUDE.md`'s architecture note**:
- **Dict-based families** (Eurasia, Pan-American, Patagonia & Antarctica, India & Himalaya, Nordic
  Arctic, Africa Grand Tour) — splitroutes pull shared content via `rbContentFor()` from one
  `RB_EXPEDITION_CONTENT` dict. Translating the dict once cascades to every splitroute automatically;
  only each splitroute's own short wrapper text (flight-in note, "split off from X" note) needs
  separate translation.
- **Hand-authored families** (Mediterranean Civilizations, Central European Grand Roadtrip, British
  Isles, Caribbean & Amazon, West & Central Africa, Oceania, North America) — every splitroute
  duplicates its own full content (see `rbBuildMaltaRoute()` vs. `rbBuildCostaRicaRoute()` for the
  contrast). Each one needs individual translation — no free cascade.

**Critical rule for every batch** (see `CLAUDE.md`): these are all already-seeded routes. Translating
the source alone does nothing for an already-loaded browser — every batch needs its own new
`rbMigrateXEnglish()` function behind a fresh flag, following whichever pattern (wholesale-replace vs.
field-patch) that route's own prior migrations already used.

**Status — 4 of 13 batches done.** Pilot batch (Central European Grand Roadtrip, chosen specifically
because it has zero splitroutes — cleanest possible first test) cost **138,985 tokens** for one
14-leg, no-splitroute route. That's well above the original 400-600K blind estimate for the whole
job — recalibrated total based on this real data point: **~2.5-3.5M tokens for all 13 batches**,
since several remaining families (Mediterranean, Africa Grand Tour, Pan-American) carry many more
standalone routes than this pilot did. Batch 2 (Eurasia, the first dict-based family — 27 countries
+ 3 splitroutes) cost **229,111 tokens**; batch 3 (Patagonia & Antarctica, 3 countries + 2
splitroutes) cost **203,954 tokens**; batch 4 (India & Himalaya, 3 countries + 3 splitroutes) cost
**194,573 tokens** — all in line with the recalibrated range.

**Recurring lesson across batches 2, 3 and 4 — now confirmed every dict-based batch so far**: several
*older* migrations pattern-match on Dutch substrings (e.g. `'Instap:'`, `'Time check (2026-07)'`,
`'Follow-up (2026-07)'`, each route's own overhaul-note marker) to detect "have I already applied
this note?" — once that text is translated to English, those older guards need widening too, or
they'll double-append stale Dutch text onto a freshly-translated route. Check for this explicitly in
every remaining batch — it has hit 100% of batches with a prior route-logic-overhaul migration so far.

| # | Family | Type | Splitroutes | Status | Tokens |
|---|---|---|---|---|---|
| 1 | Eurasia Grand Tour | dict-based | 3 | **done** | **229,111** |
| 2 | Patagonia & Antarctica | dict-based | 2 | **done** | **203,954** |
| 3 | India & Himalaya | dict-based | 3 | **done** | **194,573** |
| 4 | Nordic Arctic | dict-based | 5 | not started | — |
| 5 | Pan-American Grand Tour + reused standalones | dict-based | 4 + ~15 | not started | — |
| 6 | Africa Grand Tour + reused standalones | dict-based | 4 + ~20 | not started | — |
| 7 | Mediterranean Civilizations + standalones | hand-authored | 6 + ~14 | not started | — |
| 8 | **Central European Grand Roadtrip** | hand-authored | 0 | **done (pilot)** | **138,985** |
| 9 | British Isles & Celtic Coast | hand-authored | 4 | not started | — |
| 10 | Caribbean & Amazon | hand-authored | 2 | not started | — |
| 11 | West & Central Africa | hand-authored | 2 | not started | — |
| 12 | Oceania + standalones | hand-authored | 4 + 7 | not started | — |
| 13 | North America + standalones | hand-authored | 3 + 6 | not started | — |

**Workflow per batch**: delegate to a `general-purpose` subagent — read `CLAUDE.md`'s migration rule
first, find the family's build function(s), translate every Dutch text field (never touch
days/budget/lat/lng/country codes), grep the whole file for any other reference to the old name,
write the new migration + flag + wire it into the init call sequence, run `node --check
js/pages/routeBuilder.js` to catch syntax errors before committing, commit locally (ask before
pushing), report the real token cost, then ask before starting the next batch.

### Phase 2 — convert `EUROPA_TRIP_IDEAS.md`'s 319 tagged items into real `rbBuildXRoute()` code

Not started — waits on Phase 1 finishing so every new route is written in English against an
already-all-English Route Builder, no translation step needed for these (author directly in
English from `EUROPA_TRIP_IDEAS.md`'s Dutch source content, don't machine-translate the doc text).

Chosen approach (2026-08-18 decision): **full hand-authored, same depth as the 131 existing
routes** — real per-destination coordinates (so the "🔍 Gedetailleerd" map view works on every new
route, not just a subset) and full narrative notes per leg, not a thinner data-driven auto-generated
version. Reuses the exact 21 sub-batch structure already proven for Trip Taxonomy's Groep 3 tagging
(same 15 named clusters from `EUROPA_TRIP_IDEAS.md`, same 6 split into two halves) — see the "Trip
Taxonomy" section above for that batch table; same batches apply here, now for code instead of tags.

**Estimated cost**: ~9,000-16,000 tokens/item × 319 items ≈ **3-5M tokens total** — based on the
`rbBuildJordanRoute()` example (fresh single-country build with real coordinates, no shared content
to reuse, since these are new destinations never coded before). Not yet piloted for this specific
task — run a small first batch (Baltische staten or Benelux, 6 items) to get a real number before
trusting this estimate, same discipline as every other batch-cost estimate in this project.

**Per item**: read `EUROPA_TRIP_IDEAS.md`'s Dutch source (already has route/budget/season/webcheck
detail, no fresh research needed), write an `rbBuildXRoute()` with real per-destination coordinates
and English notes, seed it (no migration needed — brand new, never previously seeded), flip
`TRIP_DATABASE.csv`'s "In Route Builder?" from No to Yes for that row so the taxonomy stays in sync,
`node --check` before commit.

### Phase 3 — make the Trip Taxonomy filters visible in the app UI

Not started, not designed. `TRIP_TAXONOMY.md`'s 29 fields and `TRIP_DATABASE.csv`'s tagged rows
(450, soon 450+ once Phase 2 lands) currently aren't read by any code in `js/` or any `.html` page —
no filter UI, no page that displays a trip's tags. Comes after Phase 2 specifically because a filter
UI is far more valuable once most of Route Builder's content is actually searchable/filterable by
these fields, rather than just today's 131 hand-built routes. Revisit design (new page vs. filter
component bolted onto the existing Route Builder list, how it reads the CSV the way `dataService.js`
reads the Sheet) once Phase 2 is substantially done.

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
