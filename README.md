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

- **Country blocks**: country, days, budget, free-form notes. Day ranges (Day 1–17,
  Day 18–25, …) compute automatically from the sequence — reorder blocks with ↑/↓
  and the ranges shift with them.
- **Regional Blocks**: group a contiguous run of country blocks under a collapsible,
  named header with its own season, budget estimate and notes (e.g. "Balkans" = 5
  countries as one unit). Assign a block to a region via the dropdown on that block.
- **Destinations**: an optional free-form list of places (+ notes) per country block.
- **Expedition details**: Status (Idea / Planning / Active / Completed), Travel
  Style, Best Starting Month, Description, Climate Summary, and route-wide Notes.
- **Calendar view**: set an optional start date to see the route laid out on real
  month grids, colored by country.
- **World map view**: highlights the route's countries on the same Leaflet world map
  `map.html` uses (shared lookup table in `js/utils/isoCountries.js`).
- **Block Library**: save a route as a reusable, named group of countries; insert it
  into any other route later (as an independent copy — editing one never affects the
  other), or merge 2+ saved blocks into a new combined block.
- Three predefined routes — **Eurasia Grand Tour**, **Pan-American Grand Tour**, and
  **Middle East & Africa Expedition** (all from ChatGPT brainstorms) — are seeded
  once on first load, each gated by its own `localStorage` flag so adding a new one
  later still seeds it into existing browsers. See "Needs attention" below.
  Eurasia/Pan-American are seeded with countries pre-grouped into regions; Middle
  East & Africa is seeded **flat, with zero regions** — group its 19 countries into
  your own blocks via the region dropdown whenever you're ready to plan it for real.

Everything above lives in `localStorage` (`atlas_grand_trips`,
`atlas_route_blocks_library`) — see [`ROUTE_BUILDER_SYNC.md`](ROUTE_BUILDER_SYNC.md)
for the plan to move it into the Google Sheet.

## Recently fixed

- **Route Builder stuck on "Loading your country list…" on the live site** — the
  country data loaded fine, but `css/base.css` had `.loading-spinner { display: flex }`,
  which beats the browser's default `[hidden] { display: none }` even after JS sets
  `el.hidden = true`. Fixed with a global `[hidden] { display: none !important; }`
  rule in `css/base.css`. This also silently fixes the same latent issue for
  `.rb-calendar-panel` / `.rb-map-panel` (both toggle `.hidden` too and both had an
  explicit `display: grid`/`flex`).

## Needs attention next time

- **Sheet sync still not started** — routes don't follow you across devices/browsers
  yet (see `ROUTE_BUILDER_SYNC.md` for the full plan: new sheet tabs, Apps Script
  changes, client code). **Next concrete step**: in the Google Sheet, add 4 new tabs
  (`GrandTrips`, `GrandTripRegions`, `GrandTripBlocks`, `GrandTripDestinations` — exact
  columns in `ROUTE_BUILDER_SYNC.md`) and publish each to the web as CSV. Once that's
  done, paste the current Apps Script `doPost` code into a Claude Code conversation so
  it can add a branch for `GrandTrip*` payloads without breaking the existing
  country-status sync from the map.
- **The three seeded expeditions need real numbers** — Eurasia Grand Tour,
  Pan-American Grand Tour and Middle East & Africa Expedition have their countries
  (and, for the first two, regions) filled in, but no days or budget per country
  (not specified in the original brainstorm prompts). Middle East & Africa also
  has no blocks yet at all — that's intentional, see above.
- **Some seeded blocks overlap with data that already exists** — worth
  cross-checking before treating them as final:
  - "Balkans" (Eurasia Grand Tour) is identical to the existing "Balkan Loop" trip
    already in your Trips sheet.
  - "Maritime Southeast Asia" (Eurasia Grand Tour) includes Malaysia, Brunei and
    Singapore, already marked "visited" in your Countries sheet.
  - South Africa (Middle East & Africa Expedition) is already marked "visited" in
    your Countries sheet — the local fallback data has no other overlap for this
    expedition's 19 countries, but worth double-checking the live sheet too.
  - Consider whether these should be pulled in as Block Library items from existing
    trips instead of living as separate, possibly-duplicate data.
- **Region grouping only holds together while contiguous** — a Regional Block is
  just a label on whichever countries currently sit next to each other in the
  sequence. Moving one country out of the middle of a region (↑/↓) splits that
  region into two visually separate groups with the same name. Not a bug, just a
  simplification worth remembering.
- **Country dropdown depends on the live Countries sheet** — a country not yet in
  that sheet still works fine in a block (name/flag are stored directly on the
  block), but its dropdown will show as unselected until the sheet catches up.
  Cosmetic only.

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
