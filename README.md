# Youri's Travel Atlas

**Live website:** [https://ywarmelink.github.io/YourAtlas/](https://ywarmelink.github.io/YourAtlas/)

A personal travel dashboard built with vanilla HTML, CSS and JavaScript. Part of the YourIntineryPlan ecosystem.

> See [`CLAUDE.md`](CLAUDE.md) for architecture, file roles, known gotchas, and the persistent development/model-selection rules Claude Code follows in this repo. See [`CHANGELOG.md`](CHANGELOG.md) for the full history of fixes, corrections and content builds.

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
  `js/pages/routeBuilderUI.js`. A third mode ("🔍 Gedetailleerd") draws through every
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

## Europa Trip Ideas (done — all 15 batches complete)

See [`EUROPA_TRIP_IDEAS.md`](EUROPA_TRIP_IDEAS.md) — ~319 realistic European trip ideas (long
weekend to ~3 weeks), organized by country/region, WebSearch-verified from batch 2 onward.
Different scale than Route Builder's grand expeditions — this is the "reëel en slim te maken"
realistic-trip tier, not aspirational epics.

**Decided (2026-08): these become Route Builder routes, not Trips entries** — per `ROADMAP.md`'s
already-decided "commitment, not scale" rule for the Trips↔Route Builder split (no booking
commitment yet = Route Builder). They'll land under the existing Europe continent group in Route
Builder's list view automatically.

**Status: all 15 batches done, the entire document is finished.** Full batch-by-batch history
(regions covered, WebSearch findings, specific safety/regulatory notes) is in
[`CHANGELOG.md`](CHANGELOG.md)'s "Recently fixed" section.

Not yet done: converting each worked-out item into a real `rbBuildXRoute()` in
`routeBuilderContent.js` — tracked as Phase 2 of the Route Builder workstream below.

## Trip Taxonomy (Fase 2 done, Phase 3 UI not started)

See [`TRIP_TAXONOMY.md`](TRIP_TAXONOMY.md) for the 29-field schema (Fase 1, approved by Youri
as-is) and [`TRIP_DATABASE.csv`](TRIP_DATABASE.csv) for the tagged data — or
[`TRIP_OVERVIEW.md`](TRIP_OVERVIEW.md) for a lightweight, auto-generated name-only index of all
450 trips grouped by family/country, if the full CSV is more detail than you need. Goal: one consistent
29-field row per trip across Route Builder's 13 Grand Trips + splitroutes and
`EUROPA_TRIP_IDEAS.md`'s items, usable for filtering/comparing/a future route optimizer. English
throughout, multi-value fields semicolon-separated within a quoted cell, "—" for not-applicable.

**Status: all of Fase 2 done and pushed to origin (2026-08-18) — 450 rows total** in
`TRIP_DATABASE.csv` (Groep 1: 13 Grand Trips, Groep 2: 118 splitroutes, Groep 3: 319
`EUROPA_TRIP_IDEAS.md` items across 21 sub-batches). Total cost 4,270,377 tokens across 43 tagging
batches. Full per-batch cost table and specific findings (Moldova/Transnistria, Cyprus,
Kosovo-Serbia, Switzerland/Norway/Iceland budget overrides, etc.) are in
[`CHANGELOG.md`](CHANGELOG.md)'s "Recently fixed" section.

**Not yet started: Phase 3, making this data visible/usable in the app UI.** No code in `js/` or
any `.html` page currently reads either file (confirmed by grepping the whole codebase, 2026-08-17)
— no filter UI, no page that displays a trip's tags. See Phase 3 under the Route Builder workstream
below.

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

**Status — 10 of 13 batches done.** All 5 dict-based families (#1-6, translated via the shared
`RB_EXPEDITION_CONTENT` dict cascade) are done, plus three hand-authored families (#7, Mediterranean
Civilizations; #9, British Isles & Celtic Coast; #10, Caribbean & Amazon) and the pilot batch (#8,
Central European Grand Roadtrip — chosen for having zero splitroutes, the cleanest possible first
test). Token costs are in the table below: the four pure dict-based families landed in a tight
195K-230K token band regardless of country/splitroute count; batches with reused standalone
consumers cost noticeably more (batch 6: ~280K for 8 standalones, batch 7: ~330K for 15) since each
standalone needs its own wrapper-level translation even without a rename; hand-authored families
without standalones cost similarly per-route (batch 8: ~315K for 18 routes) since there's no
dict-cascade discount — every route needs independent translation. Batch 10 (Caribbean & Amazon)
came out smaller (~200K for 10 routes) than Mediterranean's 18-route batch 7, consistent with most
of its standalones being short 1-2-country routes rather than Mediterranean's larger
multi-destination legs. Batch 9 (British Isles & Celtic Coast) came out smaller still (~170K for
just 5 routes) — the smallest hand-authored batch so far, and the first hand-authored family this
project where the table's original splitroute count ("4") turned out to be exactly right, with zero
reused standalones to discover.
Recalibrated estimate for all 13 batches: **~2.5-3.5M tokens total** (well above the original
400-600K blind guess). Full per-batch detail — specific renames, and the migration-collision fixes
found in every dict-based batch (5 of 5, 100% hit rate) — is in [`CHANGELOG.md`](CHANGELOG.md)'s
"Recently fixed" section.

| # | Family | Type | Splitroutes | Status | Tokens |
|---|---|---|---|---|---|
| 1 | Eurasia Grand Tour | dict-based | 3 | **done** | **229,111** |
| 2 | Patagonia & Antarctica | dict-based | 2 | **done** | **203,954** |
| 3 | India & Himalaya | dict-based | 3 | **done** | **194,573** |
| 4 | Nordic Arctic | dict-based | 5 | **done** | **200,428** |
| 5 | Pan-American Grand Tour + reused standalones | dict-based | 4 + 8 | **done** | **~280,000** |
| 6 | Africa Grand Tour + reused standalones | dict-based | 4 + 15 | **done** | **~330,000** |
| 7 | Mediterranean Civilizations + standalones | hand-authored | 6 + 11 | **done** | **~315,000** |
| 8 | **Central European Grand Roadtrip** | hand-authored | 0 | **done (pilot)** | **138,985** |
| 9 | British Isles & Celtic Coast | hand-authored | 4 | **done** | **~170,000** |
| 10 | Caribbean & Amazon + standalones | hand-authored | 2 + 7 | **done** | **~200,000** |
| 11 | West & Central Africa | hand-authored | 2 | not started | — |
| 12 | Oceania + standalones | hand-authored | 4 + 7 | not started | — |
| 13 | North America + standalones | hand-authored | 3 + 6 | not started | — |

Batch 10's "2 + 7" splitroute count corrects the row's original estimate of just "2 splitroutes" —
same as Pan-American's and Africa's row turning out to have more reused standalone consumers than
first assumed once actually checked. The two 2026-07 split companions (Caraïbische Eilanden-hop 🏝️ →
**Caribbean Islands Hop 🏝️**, Suriname & Noord-Brazilië 🌴 → **Suriname & Northern Brazil 🌴**) plus
seven single-/dual-country standalones split off from those in later 2026-08 batches (Cuba 🎷,
Curaçao & Bonaire 🤿, Suriname 🛶, Jamaica 🎵, Guadeloupe & Dominica 🍃, Saint Lucia & Grenada 🌰,
Noord-Brazilië 🪁 → **Northern Brazil 🪁**) all needed translation — none of them were documented in
this table's original "2 splitroutes" estimate.

**Workflow per batch**: delegate to a `general-purpose` subagent — read `CLAUDE.md`'s migration rule
first, find the family's build function(s), translate every Dutch text field (never touch
days/budget/lat/lng/country codes), grep the whole file for any other reference to the old name,
**explicitly check every migration touching this route/its splitroutes for the Dutch-substring
guard-collision issue (100% hit rate across every dict-based batch so far — see `CHANGELOG.md` for
the history), treat it as mandatory, not optional**, write the new migration + flag + wire it into
the init call sequence (in `routeBuilder.js`), run
`node --check` on `routeBuilderContent.js` (and `routeBuilder.js` if the call sequence changed) to
catch syntax errors before committing, commit locally (ask before pushing), report the real token
cost, then ask before starting the next batch.

**Resume point (updated after every batch — read this first when picking Phase 1 back up)**: 10 of 13
done — **all 5 dict-based families complete, plus three hand-authored families (Mediterranean
Civilizations, #7; British Isles & Celtic Coast, #9; Caribbean & Amazon, #10)**. Batches have been
picked out of table order each time (pilot was #8, then #1→#2→#3→#4→#5→#6→#7→#10→#9) — don't assume
sequential order, just ask which family next. Only 3 hand-authored families are left (#11-13 — no
dict-cascade discount, but individually smaller scope each). Caribbean & Amazon (#10) turned out to
carry the reused-standalones wrinkle (7 standalones, not documented in the table's original "2
splitroutes" estimate — see the note under the table), but British Isles (#9) turned out to be the
first hand-authored family with none of that wrinkle — its table estimate of "4" splitroutes was
exactly right, confirmed via recon before translating. Don't assume the remaining families (#11-13)
are free of the standalones wrinkle either without actually checking. No blocker either way.

### Phase 2 — convert `EUROPA_TRIP_IDEAS.md`'s 319 tagged items into real `rbBuildXRoute()` code

Not started — waits on Phase 1 finishing so every new route is written in English against an
already-all-English Route Builder, no translation step needed for these (author directly in
English from `EUROPA_TRIP_IDEAS.md`'s Dutch source content, don't machine-translate the doc text).

Chosen approach (2026-08-18 decision): **full hand-authored, same depth as the 131 existing
routes** — real per-destination coordinates (so the "🔍 Gedetailleerd" map view works on every new
route, not just a subset) and full narrative notes per leg, not a thinner data-driven auto-generated
version. Reuses the exact 21 sub-batch structure already proven for Trip Taxonomy's Groep 3 tagging
(same 15 named clusters from `EUROPA_TRIP_IDEAS.md`, same 6 split into two halves) — see
`CHANGELOG.md`'s "Recently fixed" section for that batch table; same batches apply here, now for
code instead of tags.

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
