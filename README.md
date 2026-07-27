# Youri's Travel Atlas

**Live website:** [https://ywarmelink.github.io/YourAtlas/](https://ywarmelink.github.io/YourAtlas/)

A personal travel dashboard built with vanilla HTML, CSS and JavaScript. Part of the YourIntineryPlan ecosystem.

## Pages

| Page | URL |
|------|-----|
| Home | [/](https://ywarmelink.github.io/YourAtlas/) |
| All Trips | [/trips.html](https://ywarmelink.github.io/YourAtlas/trips.html) |
| Route Builder | [/route-builder.html](https://ywarmelink.github.io/YourAtlas/route-builder.html) |
| Countries | [/countries.html](https://ywarmelink.github.io/YourAtlas/countries.html) |
| Map | [/map.html](https://ywarmelink.github.io/YourAtlas/map.html) |

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
- **Block Library**: save a route as a reusable, named group of countries; insert it
  into any other route later (as an independent copy — editing one never affects the
  other), or merge 2+ saved blocks into a new combined block.
- Thirteen predefined routes, each with an emoji suffix as its final name — **Eurasia
  Grand Tour 🌏**, **Pan-American Grand Tour 🌎**, **Africa Grand Tour 🌍**,
  **Mediterranean Civilizations Expedition 🏛️**, **Nordic Arctic Expedition ❄️**,
  **Patagonia & Antarctica Expedition 🧊**, **India & Himalaya Expedition 🏔️**,
  **North America Grand Traverse 🌎**, **Oceania Grand Expedition 🌊**,
  **Caribbean & Amazon Expedition 🌴**, **West & Central Africa Expedition 🌍**,
  **Central European Grand Roadtrip 🚗**, and **British Isles & Celtic Coast
  Expedition 🍀** — are seeded once on first load, each gated by its own
  `localStorage` flag so adding a new one later still seeds it into existing
  browsers. All thirteen now have real content — no more backbone-only routes.
  Central European Grand Roadtrip and British Isles & Celtic Coast Expedition are
  the two self-driven (mostly no-flight) expeditions: fuel/tolls/parking (and, for
  British Isles, the six car-ferry crossings) are shared per car and tracked once in
  their route notes rather than folded into each leg's per-person budget, so those
  per-country budget figures stay comparable to every other expedition. Eurasia/Pan-American/North
  America/Mediterranean Civilizations are seeded with countries pre-grouped into
  regions; Patagonia & Antarctica and India & Himalaya are seeded **flat, with zero
  regions** on purpose (only 3 legs each — too few to benefit from grouping). Every
  other route now has per-country days, an estimated budget, a Destinations list and a
  Transport-to-next note.
  Eurasia/Pan-American/Africa/Nordic Arctic/Patagonia & Antarctica/India & Himalaya
  source this from `RB_EXPEDITION_CONTENT` in `js/pages/routeBuilder.js` — a one-time
  `rbPatchExpeditionContent()` patch fills these in for anyone who already had the
  routes seeded before this content existed, without touching fields you've since
  edited yourself. North America Grand Traverse, Mediterranean Civilizations
  Expedition, Oceania Grand Expedition, Caribbean & Amazon Expedition, West &
  Central Africa Expedition, Central European Grand Roadtrip and British Isles &
  Celtic Coast Expedition are each seeded directly in their own function instead
  (`rbSeedNorthAmericaExpedition()` / `rbBuildMediterraneanExpeditionRoute()` /
  `rbBuildOceaniaExpeditionRoute()` / `rbBuildCaribbeanAmazonExpeditionRoute()` /
  `rbBuildWestCentralAfricaExpeditionRoute()` / `rbBuildCentralEuropeRoadtripRoute()` /
  `rbBuildBritishIslesExpeditionRoute()`) — the first three (plus Central European
  Grand Roadtrip and British Isles & Celtic Coast Expedition) because each revisits
  a country across multiple separate legs (Canada/US six times; Italy four times,
  France and Greece twice each; Australia seven times, New Zealand twice; Central
  European Grand Roadtrip repeats Germany, Italy and Czechia; British Isles & Celtic
  Coast Expedition repeats the United Kingdom six times and Ireland twice) — a shape
  `RB_EXPEDITION_CONTENT` (keyed one-entry-per-country-code per route) can't hold.
  Caribbean & Amazon Expedition and West & Central Africa Expedition don't repeat
  any country, but were seeded this way too since each replaced a previously-named
  or empty backbone-only route (see below).
- **Three rounds of renames/overhauls**, all applied retroactively by one-time
  migrations in `js/pages/routeBuilder.js` so they also land on routes already seeded
  into a browser, without touching any fields you'd already edited yourself (except
  the third, which is a deliberate wholesale content replacement, not a field patch):
  - `rbMigrateExpeditionRenames()` — "Middle East & Africa Expedition" became
    **Africa Grand Tour**, with Jordan and Oman moved out to **Ancient Civilizations
    Expedition** (which already had its own Jordan/Oman entries), so that route is
    purely African countries plus Egypt as the historical/geographic gateway — Egypt
    still appears in both since it fits both themes. "Arctic Circle Expedition" and
    "Himalaya & India Expedition" were renamed to "Nordic Arctic Expedition" and
    "India & Himalaya Expedition" (country lists unchanged for both).
  - `rbMigrateExpeditionEmojiNames()` — added the emoji suffix to all eight
    then-existing routes, and renamed "Ancient Civilizations Expedition" to
    "North Africa & Middle East Expedition 🏜️" for a name that says which region
    it actually covers (same seven countries: Morocco, Tunisia, Egypt, Jordan, Oman,
    UAE, Cyprus).
  - `rbMigrateAncientToMediterranean()` — replaces that same route entirely with
    **Mediterranean Civilizations Expedition 🏛️**, a much larger 18-leg route from
    Andalusia to Qatar (see below). Unlike the two renames above, this isn't a field
    patch: the country list, region grouping and every block's content are all new,
    so the migration removes the old route and inserts the new one wholesale.

Everything above lives in `localStorage` (`atlas_grand_trips`,
`atlas_route_blocks_library`) — see [`ROUTE_BUILDER_SYNC.md`](ROUTE_BUILDER_SYNC.md)
for the plan to move it into the Google Sheet.

## Recently fixed

- **Africa Grand Tour 🌍 reordered south-to-north (2026-07)** — the route's climate_summary
  had long claimed East Africa's and Southern Africa's dry seasons were "opposite," making
  the seasonal trade-off unfixable without cutting the country order down. Web research
  (at Youri's request, to look at improving it) found this false: East Africa's dry season
  (June-October) and Southern Africa's dry season (May-October) largely overlap — the real
  problem was sequencing, since the old order only reached Southern Africa in November,
  already past the shared window. Fix: reversed to a south-to-north sweep via
  `rbBuildAfricaGrandTourRoute()`/`rbMigrateAfricaGrandTourReorder()` — South Africa/
  Lesotho/Eswatini open the trip (June, their true dry season), then Southern Africa's loop
  (July-October, its actual peak), then the Islands, then East Africa (November-January —
  not the absolute peak, but a recognized strong window: short rains plus the southern
  Serengeti's calving season), ending with a new "Hoorn van Afrika & Egypte" finale
  (February-March). Research also surfaced a second, previously undocumented bug: Ethiopia's
  main rains (kiremt) fall exactly June-September — the old route had bundled Ethiopia into
  that same window assuming it was dry season. Ethiopia now lands in its own good window
  (October-March, peak December-February) at the end of the trip instead. All 18 countries
  and every country's days/budget are unchanged — same 288 days, €29,225 total — only the
  order, region grouping and transport_to_next directions changed (a few new border
  crossings were needed; the Angola-Zambia crossing is flagged as less-traveled and worth
  extra pre-trip verification). Algeria/Lebanon/Israel (in the unrelated Mediterranean
  Civilizations Expedition) stay deliberately excluded, unchanged.
- **British Isles & Celtic Coast Expedition 🍀 built (2026-07)** — the thirteenth
  expedition, designed from a ChatGPT brainstorm Youri brought in, then reviewed and
  adjusted in a Q&A session. Self-driven from the Netherlands, same style as Central
  European Grand Roadtrip: England (South England, Cornwall, Wales, North England,
  Scotland, Northern Ireland — six United Kingdom legs), Isle of Man, Ireland (West,
  South & East), Guernsey, Jersey, France (Brittany, Normandy, Opal Coast & Lille) and
  Belgium — fifteen legs across five regions. Two route-order corrections came out of
  real ferry-geography research: Isle of Man moved from its own stop to a detour
  nested inside the North England leg (Heysham, its only year-round car-ferry port,
  sits on the route between North Wales and the Lake District anyway), and Ireland is
  driven north-to-south, exiting via Rosslare-Fishguard/Pembroke instead of
  backtracking to Dublin-Holyhead. Isle of Man itself is visited as a foot passenger
  with a one-day local car rental just for the TT Mountain Road, rather than paying for
  a round-trip car ferry — Youri's own idea, confirmed after discussion. Recommended
  start: June (ahead of Scotland's July-August midge peak, while France/the Channel
  Islands still get the last dry autumn window before their wet November). 86 days
  minimum / 115 days ideal, €10,350 per-person ground costs (Realistisch tier) plus
  ≈€4,200–4,800 shared car/ferry costs. Known cosmetic gap: Isle of Man, Jersey and
  Guernsey aren't in the World map view's topojson lookup (`js/utils/isoCountries.js`)
  so those three blocks won't highlight there — same kind of limitation as the existing
  "country dropdown depends on the live Countries sheet" note below.
- **Route Builder stuck on "Loading your country list…" on the live site** — the
  country data loaded fine, but `css/base.css` had `.loading-spinner { display: flex }`,
  which beats the browser's default `[hidden] { display: none }` even after JS sets
  `el.hidden = true`. Fixed with a global `[hidden] { display: none !important; }`
  rule in `css/base.css`. This also silently fixes the same latent issue for
  `.rb-calendar-panel` / `.rb-map-panel` (both toggle `.hidden` too and both had an
  explicit `display: grid`/`flex`).
- **Full time-realism audit, applied (2026-07)** — every country/leg across all eight
  content-bearing expeditions was checked against a slow, backpacker-style travel pace
  (enough time to actually experience a place, not just arrive/see the highlight/leave)
  and corrected via `rbMigrateTimeAuditCorrections()` in `js/pages/routeBuilder.js`
  (runs once, forces the corrected `days` onto already-seeded routes — a regular
  content patch wouldn't have touched non-empty-but-wrong values). No countries were
  added, removed or reordered. Biggest corrections: Eurasia Grand Tour 🌏 (200→344 days
  — China 12→28, Turkey 12→24, Philippines 10→21, Indonesia 12→21 were the most
  underestimated), Patagonia & Antarctica Expedition 🧊 (37→53 — both Chile and
  Argentina underestimated how weather-dependent Patagonian trekking is), Africa Grand
  Tour 🌍 (247→277), India & Himalaya Expedition 🏔️ (50→59), Nordic Arctic Expedition
  ❄️ (53→68), North America Grand Traverse 🌎 (54→69), Mediterranean Civilizations
  Expedition 🏛️ (138→147 — Rome and the Turkey/Anatolia leg were the weak spots).
  Pan-American Grand Tour 🌎 was already the best-paced route (274→286, and two legs —
  Chile-north/Argentina-north — were actually shortened, the only "too long" findings
  in the whole audit).
- **Region-level Season/Budget filled in** — Eurasia Grand Tour's 11 regions and
  Pan-American Grand Tour's 10 regions now each have a Season and Budget (the budget is
  the sum of that region's countries), reasoned from the route's overall
  best-starting-month so the whole multi-region sequence stays climate-coherent leg to
  leg instead of just having one single best-starting-month for the entire route.
- **Route-level Travel Style / Best Starting Month / Climate Summary filled in for all
  eight** — Eurasia Grand Tour, Africa Grand Tour, Nordic Arctic Expedition, Patagonia
  & Antarctica Expedition and India & Himalaya Expedition had none of these set at all;
  Pan-American Grand Tour had a Best Starting Month but no Travel Style/Climate
  Summary. All eight now have a reasoned climate_summary comparing start-month
  scenarios, in the same style as the pre-existing Mediterranean/North America ones.
  Africa Grand Tour's was, at the time, an acknowledged, unresolved trade-off: keeping
  the then-current country order (Egypt → ... → Eswatini) meant no single start month
  put both East Africa and Southern Africa in their dry season at the same time. This
  was later found to be based on a false premise and fixed by reordering the route —
  see "Africa Grand Tour reordered south-to-north" below.
- **Eurasia Grand Tour's country list changed (2026-07)** — at your explicit request:
  Turkmenistan and Myanmar removed (hard to visit/not realistic for this travel
  style), East Timor added right after Indonesia (reachable via the Kupang/Batugade
  land border), and Singapore moved from the middle of Maritime Southeast Asia to the
  very last block of the whole expedition as a deliberate finale. New totals: 27
  countries (was 28), 336 days, €20,000.
- **Oceania Grand Expedition 🌊 built (2026-07)** — no longer backbone-only. Designed
  in a Q&A session (route, countries, Pacific island groups, Australia/New Zealand
  breakdown, travel time, budget, transport, season) and built the same way as
  Mediterranean/North America: 14 legs across 4 regions (Pacific Opener: Fiji, Vanuatu,
  Samoa, Tonga, Cook Islands; Tropisch Australië and Gematigd Australië: Australia
  across 7 legs; Nieuw-Zeeland Finale: New Zealand across 2 legs). Days use the
  "ideal" tempo tier; budgets are the midpoint between Budget Backpacker and Comfort
  Backpacker (your own chosen travel style). 183 days total, €14,780 ground costs.
  French Polynesia, New Caledonia, Palau, the Solomon Islands, Micronesia, Kiribati
  and Papua New Guinea were deliberately left out — see the route's own notes for why.
- **Caribbean & Amazon Expedition 🌴 built (2026-07)** — no longer backbone-only, and
  renamed from "Caribbean Expedition 🏝️". Designed in a Q&A session from a
  ChatGPT-brainstormed country list, built the same way as Oceania: 10 legs across 4
  regions (Grote Antillen: Cuba, Jamaica; Nederlandse Caraïben: Curaçao, Bonaire;
  Kleine Antillen: Guadeloupe, Dominica, Saint Lucia, Grenada; Suriname & Amazone:
  Suriname, Brazil). Days use the "ideal" tempo tier; budgets are the midpoint
  between the Goedkoop and Normaal backpacker tiers from the design discussion (your
  own chosen travel style). 97 days total, €6,955 ground costs. One change from the
  original brainstorm order: the Dutch ABC islands moved to right after Jamaica
  instead of after the Lesser Antilles, since they sit far west of both the Lesser
  Antilles and Suriname — the original order would have meant backtracking west then
  east again.
- **West & Central Africa Expedition 🌍 built (2026-07)** — no longer backbone-only,
  and the last of the eleven routes to get real content. Designed in a Q&A session
  from a ChatGPT-brainstormed country list, built the same way as Oceania/Caribbean &
  Amazon: 10 legs across 4 regions (Kaapverdische Eilanden: Cape Verde; Senegambia:
  Senegal, Gambia; Golf van Guinee: Ivory Coast, Ghana, Togo, Benin; Centraal-Afrika &
  Eilanden: Cameroon, São Tomé & Príncipe, Gabon). Days use the "ideal" tempo tier;
  budgets are the midpoint between the Goedkoop and Realistisch tiers from the design
  discussion. 93 days total, €5,160 ground costs. Two changes made after reviewing the
  design: Taï National Park dropped from Ivory Coast (remote, costs 3-4 extra days for
  content available elsewhere), and Cameroon's content shifted from Mount
  Cameroon/Limbe (Southwest Region — an active conflict zone since 2016, the
  "Anglophone Crisis") to Douala/Kribi/Yaoundé in the stable Francophone regions.
  Angola was deliberately left out of this route — see below.
- **Angola added to Africa Grand Tour 🌍 (2026-07)** — originally part of the West &
  Central Africa brainstorm, but moved here instead via `rbMigrateAngolaIntoAfricaGrandTour()`:
  it borders Namibia (real overland crossing at Oshikango/Santa Clara), already the
  last country in that route's "Southern Africa" region, rather than being an isolated
  flight-only endpoint on the West Africa route. Inserted right after Namibia — at the
  time, followed by a flight from Luanda to Cape Town/Johannesburg to rejoin the South
  Africa Finale, since the whole "Southern Africa" region fell in the rainy season by
  this route's then-current June-start design. Both the flight-onward routing and the
  seasonal mismatch were superseded by the south-to-north reorder — see "Africa Grand
  Tour reordered south-to-north" above; Angola now continues overland to Zambia
  instead. New totals at the time of this addition: 18 countries (was 17),
  288 days (was 277), €29,225 (was €27,725).

- **Bahrain added to Mediterranean Civilizations Expedition 🏛️ (2026-07)** — inserted
  between Oman and Qatar via `rbMigrateBahrainIntoMediterraneanExpedition()`, closing
  the candidate-addition noted since that route was first built. 3 days, €350
  (Qal'at al-Bahrein/Dilmun civilisation, Bahrain National Museum, Al Fateh Grand
  Mosque, Tree of Life). New totals: 150 days (was 147), €2,500 for the "Egypte & het
  Arabisch Schiereiland" region (was €2,150).
- **Ferry winter-schedule caveat researched (2026-07)** — the generic "check actual
  timetables" warning on Malta-Sicily/Piraeus-Heraklion/Corsica-Marseille (Mediterranean
  Civilizations Expedition) was replaced with actual findings: Malta-Sicily (Virtu
  Ferries, Pozzallo-Valletta) is the genuine risk — fewer winter departures and
  weather-cancellation risk. Piraeus-Heraklion and the Corsica crossing (Corsica
  Ferries) both run near-daily, year-round with multiple operators — lower risk than
  assumed, though on Corsica, Toulon/Bastia sail far more often than Marseille/Ajaccio.
- **Central European Grand Roadtrip 🚗 built (2026-07)** — the twelfth expedition,
  and the first designed as a self-driven car trip from the Netherlands (no flights).
  Designed in a Q&A session from Youri's own route brief, covering four regions:
  Alpenlanden (France, Germany, Switzerland, Liechtenstein, Austria), Dolomieten &
  Noord-Italië (Italy across six separate legs — Dolomites, Milan, Turin, Cinque
  Terre, Tuscany, Venice — plus San Marino), Balkan (Slovenia, Croatia, Serbia,
  Hungary) and Midden-Europa (Slovakia, Czechia across two legs — Brno, then
  Prague — Poland, Germany again for the return leg). 70 days ideal (45 minimum),
  €8,400 per-person ground costs (Realistisch tier, same €120/day rate as every
  other expedition) plus €1,950 shared car costs (fuel/tolls/parking) — car costs
  are tracked once in the route notes rather than folded into each leg's budget, so
  per-country figures stay comparable to every other expedition. Two route-order
  fixes made during design, both to avoid crossing the same longitude band twice:
  Switzerland/Liechtenstein moved before Austria (saves ≈370 km and keeps the
  Grossglockner→Lienz→Dolomites link intact), and Milan/Turin/Cinque Terre merged
  into the existing Tuscany/San Marino dip after the Dolomites rather than placed
  before Austria as first proposed (avoids two separate southward detours in favor
  of one combined Northern-Italy loop). Recommended start: begin June.

## Needs attention next time

- **Sheet sync still not started** — routes don't follow you across devices/browsers
  yet (see `ROUTE_BUILDER_SYNC.md` for the full plan: new sheet tabs, Apps Script
  changes, client code). **Next concrete step**: in the Google Sheet, add 4 new tabs
  (`GrandTrips`, `GrandTripRegions`, `GrandTripBlocks`, `GrandTripDestinations` — exact
  columns in `ROUTE_BUILDER_SYNC.md`) and publish each to the web as CSV. Once that's
  done, paste the current Apps Script `doPost` code into a Claude Code conversation so
  it can add a branch for `GrandTrip*` payloads without breaking the existing
  country-status sync from the map.
- **Budgets rescaled, but still not researched bookings (2026-07)** — every
  per-country/per-leg budget across all eight content-bearing expeditions (plus the
  Eurasia/Pan-American region sums) has been rescaled proportionally to the
  time-realism audit's corrected day counts (same daily rate, so more days =
  proportionally more budget), via `rbMigrateBudgetAndRegionCorrections()` in
  `js/pages/routeBuilder.js`. That fixes internal consistency (days vs. budget), not
  accuracy — none of it has been checked against real prices, current border/visa
  rules, or your own travel preferences. Treat it as a refined draft to edit, not a
  plan to book.
  - The Antarctica leg's budget (Patagonia & Antarctica Expedition) reflects a real
    expedition-cruise price point, not backpacker-style estimates like the rest, and
    was deliberately left unscaled (its days didn't change either).
  - Several Nordic Arctic Expedition legs (Svalbard, Faroe Islands, Iceland,
    Greenland) are flight-only hops, not one continuous overland route — the
    Transport-to-next notes call this out per leg.
- **Eurasia Grand Tour is a genuinely long expedition (~11-12 months) even after the
  time-realism audit** — its own climate_summary lays out a start-in-April sequence
  where nearly every leg lands in its best season, but 11-12 months aaneengesloten is
  a lot even for slow travel. Worth considering splitting it into two separate
  expeditions (West-Eurasia through Central Asia, and East Asia/Southeast Asia through
  Indonesia) rather than one continuous year.
- **Africa Grand Tour and Nordic Arctic Expedition are now region-grouped too
  (2026-07)** — Nordic Arctic's 7 countries are grouped into 2 regions (Scandinavia,
  North Atlantic Islands), each with their own season/budget, matching the
  Eurasia/Pan-American pattern. Africa Grand Tour was originally grouped into 4
  regions this same way (Northeast & East Africa, Islands, Southern Africa, South
  Africa Finale); it now has 5 after the south-to-north reorder — see "Africa Grand
  Tour reordered south-to-north" above. Patagonia & Antarctica and India & Himalaya
  were deliberately left flat — only 3 legs each, too few to benefit from grouping.
- **North Africa & Middle East Expedition 🏜️ replaced by Mediterranean Civilizations
  Expedition 🏛️** — the old flat 7-country route (Morocco, Tunisia, Egypt, Jordan,
  Oman, UAE, Cyprus) is gone, replaced by an 18-leg, 13-country route from Andalusia
  to Qatar (Spain, Morocco, Tunisia, Malta, Sicily, South Italy, Rome, Sardinia,
  Corsica, South France, Greece, Crete, Cyprus, Turkey, Egypt, Jordan, Oman, Qatar —
  UAE dropped, Qatar added as the earlier brainstorm proposed). Bahrain has since been
  added (see "Recently fixed" above). Algeria and Lebanon/Israel were considered and
  deliberately left out (see the route notes for why) and remain open candidates to
  revisit later.
- **Some seeded blocks overlap with data that already exists — accepted, not a bug
  (decided 2026-07)**: Route Builder expeditions are epic/aspirational trips, while the
  Trips sheet is realistic, plannable vacations — different enough purposes that
  overlap between them (shared countries, or a region that resembles an existing trip)
  is fine as-is. No dedup or Block-Library conversion planned for these. Worth
  revisiting only if/when Youri wants to think through the Route Builder vs. Trips
  distinction more deliberately (not urgent, no date set):
  - "Balkans" (Eurasia Grand Tour) is identical to the existing "Balkan Loop" trip
    already in your Trips sheet.
  - "Maritime Southeast Asia" (Eurasia Grand Tour) includes Malaysia, Brunei and
    Singapore, already marked "visited" in your Countries sheet.
  - South Africa (Africa Grand Tour), Canada and the United States (North America
    Grand Traverse) are already marked "visited" in your Countries sheet — reflects
    prior, different trips there.
  - 8 of the 13 countries in Mediterranean Civilizations Expedition are already
    marked "visited" in your Countries sheet — Spain, France, Greece, Italy, Malta,
    Morocco, Cyprus and Turkey. Only Tunisia, Egypt, Jordan, Oman, Bahrain and Qatar
    are new. Egypt also appears in Africa Grand Tour (fine, expeditions can share
    countries; Jordan and Oman used to be shared the same way until they were moved
    fully into what's now Mediterranean Civilizations Expedition).
- **Region grouping only holds together while contiguous** — a Regional Block is
  just a label on whichever countries currently sit next to each other in the
  sequence. Moving one country out of the middle of a region (↑/↓) splits that
  region into two visually separate groups with the same name. Not a bug, just a
  simplification worth remembering.
- **Country dropdown depends on the live Countries sheet** — a country not yet in
  that sheet still works fine in a block (name/flag are stored directly on the
  block), but its dropdown will show as unselected until the sheet catches up.
  Cosmetic only.
- **Isle of Man, Jersey and Guernsey don't highlight on the World map view** — a
  related, separate gap: `js/utils/isoCountries.js`'s `ISO_NUM` lookup (used by
  `rbRenderMap()`/`rbGetWorldGeoJSON()`) covers ISO 3166-1 sovereign-state codes from
  the world-atlas topojson dataset, which doesn't include these three British Crown
  Dependencies. Their British Isles & Celtic Coast Expedition 🍀 blocks work fine
  everywhere else (day/budget/notes/destinations, calendar view); they just won't
  light up on the World map. Cosmetic only.

## Future plans

- **Route-line map view, not just per-country highlighting** — Youri wants a way to
  see a route drawn as an actual path/line (start→finish, following the real
  sequence of stops), rather than the current World map view which just highlights
  whichever countries appear in the route with no sense of order or the specific
  places within a country. This is a good fit for **Central European Grand Roadtrip**
  in particular, since its whole point is a driving loop through specific cities
  (Straatsburg → Neuschwanstein → Luzern → ... ), not a set of countries. Feasible:
  Route Builder already uses Leaflet for its World map view
  (`rbRenderMap()`/`rbGetWorldGeoJSON()` in `js/pages/routeBuilder.js`), and Leaflet
  supports drawing a polyline between coordinates directly (`L.polyline([[lat,lng], ...])`)
  plus markers for each stop. The main new work would be: (1) storing a lat/lng per
  Destination (or per country block, as a fallback) instead of just a name, and (2) a
  new map mode that draws the ordered path through those coordinates rather than
  filling whole countries. Worth prototyping on this roadtrip route first since it
  already has a clear point-to-point shape.

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
