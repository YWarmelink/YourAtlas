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
- Eleven predefined routes, each with an emoji suffix as its final name — **Eurasia
  Grand Tour 🌏**, **Pan-American Grand Tour 🌎**, **Africa Grand Tour 🌍**,
  **North Africa & Middle East Expedition 🏜️**, **Nordic Arctic Expedition ❄️**,
  **Patagonia & Antarctica Expedition 🧊**, **India & Himalaya Expedition 🏔️**,
  **North America Grand Traverse 🌎**, **Oceania Grand Expedition 🌊**,
  **Caribbean Expedition 🏝️**, and **West & Central Africa Expedition 🌍** — are
  seeded once on first load, each gated by its own `localStorage` flag so adding a new
  one later still seeds it into existing browsers. Eurasia/Pan-American/North America
  are seeded with countries pre-grouped into regions; Africa/North Africa & Middle
  East/Nordic Arctic/Patagonia & Antarctica/India & Himalaya are seeded **flat, with
  zero regions** — group their countries into your own blocks via the region dropdown
  whenever you're ready to plan it for real. Oceania/Caribbean/West & Central Africa
  are **backbone-only**: name and emoji, zero country blocks, seeded that way on
  purpose since the countries/islands for those three haven't been decided yet — add
  blocks yourself once they are. The other eight now have per-country days, an
  estimated budget, a Destinations list and a Transport-to-next note.
  Eurasia/Pan-American/Africa/North Africa & Middle East/Nordic Arctic/Patagonia &
  Antarctica/India & Himalaya source this from `RB_EXPEDITION_CONTENT` in
  `js/pages/routeBuilder.js` — a one-time `rbPatchExpeditionContent()` patch fills
  these in for anyone who already had the routes seeded before this content existed,
  without touching fields you've since edited yourself. North America Grand Traverse
  is seeded directly in its own `rbSeedNorthAmericaExpedition()` function instead,
  since it revisits Canada and the US across six separate legs rather than having one
  entry per country — a shape `RB_EXPEDITION_CONTENT` (keyed one-entry-per-country-code
  per route) can't hold.
- **Two rounds of renames**, both applied retroactively by one-time migrations in
  `js/pages/routeBuilder.js` so they also land on routes already seeded into a
  browser, without touching any fields you'd already edited yourself:
  - `rbMigrateExpeditionRenames()` — "Middle East & Africa Expedition" became
    **Africa Grand Tour**, with Jordan and Oman moved out to **Ancient Civilizations
    Expedition** (which already had its own Jordan/Oman entries), so that route is
    purely African countries plus Egypt as the historical/geographic gateway — Egypt
    still appears in both since it fits both themes. "Arctic Circle Expedition" and
    "Himalaya & India Expedition" were renamed to "Nordic Arctic Expedition" and
    "India & Himalaya Expedition" (country lists unchanged for both).
  - `rbMigrateExpeditionEmojiNames()` — added the emoji suffix to all eight
    then-existing routes, and renamed "Ancient Civilizations Expedition" to
    **North Africa & Middle East Expedition 🏜️** for a name that says which region
    it actually covers (same seven countries: Morocco, Tunisia, Egypt, Jordan, Oman,
    UAE, Cyprus).

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
- **Days/budget/destinations/transport are estimates, not researched bookings** —
  the eight content-bearing expeditions (all except the three backbone-only ones:
  Oceania, Caribbean, West & Central Africa) have realistic-sounding per-country days,
  budgets (EUR), destination lists and transport notes (drafted country-by-country),
  but none of it has been checked against real prices, current border/visa rules, or
  your own travel preferences. Treat it as a first draft to edit, not a plan to book.
  - The Antarctica leg's budget (Patagonia & Antarctica Expedition) reflects a real
    expedition-cruise price point, not backpacker-style estimates like the rest.
  - Several Nordic Arctic Expedition legs (Svalbard, Faroe Islands, Iceland,
    Greenland) are flight-only hops, not one continuous overland route — the
    Transport-to-next notes call this out per leg.
- **Region-level Season/Budget still empty** — Eurasia Grand Tour and Pan-American
  Grand Tour have regions (Balkans, Caucasus, Central Asia, etc.) but the Season and
  Budget fields on each region are still blank; only the per-country fields were filled.
- **Route-level Travel Style / Best Starting Month / Climate Summary mostly empty** —
  only Pan-American Grand Tour and North America Grand Traverse have these set. The
  other six content-bearing expeditions don't have a Travel Style, Best Starting Month
  or Climate Summary yet (the three backbone-only ones don't have anything yet, by
  design — they're waiting on a country list first).
- **Three backbone-only expeditions still need their country list** — Oceania Grand
  Expedition 🌊, Caribbean Expedition 🏝️ and West & Central Africa Expedition 🌍 exist
  as named, empty routes with zero country blocks. Add blocks via the country dropdown
  (Oceania may need custom entries for smaller Pacific island nations not yet in the
  Countries sheet) once you've decided which countries/islands each should cover —
  same process used to flesh out North America Grand Traverse.
- **North Africa & Middle East Expedition 🏜️ still needs an update** — a later
  brainstorm round proposed adding Bahrain and Qatar to this route (currently just
  Morocco, Tunisia, Egypt, Jordan, Oman, UAE, Cyprus), logically between the UAE and
  Cyprus. Not yet added — still needs confirming and then the same per-country
  days/budget/destinations/transport treatment as the rest of the route.
- **Some seeded blocks overlap with data that already exists** — worth
  cross-checking before treating them as final:
  - "Balkans" (Eurasia Grand Tour) is identical to the existing "Balkan Loop" trip
    already in your Trips sheet.
  - "Maritime Southeast Asia" (Eurasia Grand Tour) includes Malaysia, Brunei and
    Singapore, already marked "visited" in your Countries sheet.
  - South Africa (Africa Grand Tour) is already marked "visited" in
    your Countries sheet — the local fallback data has no other overlap for this
    expedition's 17 countries, but worth double-checking the live sheet too.
  - Canada and the United States (North America Grand Traverse) are both already
    marked "visited" in your Countries sheet — that just reflects a prior, different
    trip there, so it doesn't mean this specific route is redundant, but worth
    keeping in mind.
  - Morocco, the UAE and Cyprus (North Africa & Middle East Expedition) are already
    marked "visited" in your Countries sheet — Egypt also appears in Africa Grand
    Tour (fine, expeditions can share countries; Jordan and Oman used to be shared
    the same way until they were moved fully into North Africa & Middle East
    Expedition).
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
