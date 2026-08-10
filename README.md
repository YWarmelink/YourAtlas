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
11 of the 13 expeditions (2026-07): 27 new standalone companion routes exist alongside the
originals, reusing the exact same countries/days/budgets/content — the originals themselves are
completely untouched and still exist in full (see `CHANGELOG.md` for the full list of new
routes). Only **Central European Grand Roadtrip 🚗** and **British Isles & Celtic Coast
Expedition 🍀** were deliberately left unsplit (self-driven-from-NL loops, decided not to break
up). Not yet built: the technical Module Library work described in that analysis (metadata
fields, "possible standalone trips" UI, compatible/incompatible-blocks scoring) — for now the new
routes are just added as plain routes, the same way the original 13 are.

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

See [`ROADMAP.md`](ROADMAP.md) for planned work and direction, and `CLAUDE.md` for smaller cosmetic gaps (map highlighting, dropdown lag) that are accepted as-is rather than open work.

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
