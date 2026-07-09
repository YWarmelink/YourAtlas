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
- Two predefined routes — **Eurasia Grand Tour** and **Pan-American Grand Tour**
  (from a ChatGPT brainstorm) — are seeded once on first load. See "Needs attention"
  below.

Everything above lives in `localStorage` (`atlas_grand_trips`,
`atlas_route_blocks_library`) — see [`ROUTE_BUILDER_SYNC.md`](ROUTE_BUILDER_SYNC.md)
for the plan to move it into the Google Sheet.

## Needs attention next time

- **Never opened in a real browser yet** — built and syntax-checked, but not
  click-tested end to end. Worth a pass through the actual UI before trusting it
  with real planning data.
- **Sheet sync still not started** — routes don't follow you across devices/browsers
  yet (see `ROUTE_BUILDER_SYNC.md` for the full plan: new sheet tabs, Apps Script
  changes, client code).
- **The two seeded expeditions need real numbers** — Eurasia Grand Tour and
  Pan-American Grand Tour have their countries/regions filled in, but no days or
  budget per country (not specified in the original brainstorm prompt).
- **Some seeded blocks overlap with data that already exists** — worth
  cross-checking before treating them as final:
  - "Balkans" (Eurasia Grand Tour) is identical to the existing "Balkan Loop" trip
    already in your Trips sheet.
  - "Maritime Southeast Asia" (Eurasia Grand Tour) includes Malaysia, Brunei and
    Singapore, already marked "visited" in your Countries sheet.
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
