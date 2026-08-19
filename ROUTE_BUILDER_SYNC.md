# Route Builder — Google Sheet Sync Plan

Status: **not started**. The Route Builder (`route-builder.html`) currently stores
everything in `localStorage` only — per browser, per device. Nothing syncs between
your laptop and your phone yet. This doc is the plan for when you're ready to fix that.

Pick this back up by pasting this file's content into a Claude Code conversation in
this repo, or just say "let's finish the Route Builder sheet sync" and point Claude
at this file.

**Note (2026-08): `js/pages/routeBuilder.js` is now 4 files** (`routeBuilderCore.js`,
`routeBuilderContent.js`, `routeBuilderUI.js`, `routeBuilder.js` — see `CLAUDE.md`'s
"Route Builder architecture"). This plan predates that split — file references below
may need mapping to the right one of the 4 (e.g. `rbLoad`/state merging → Core, the
on-load merge sequence → `routeBuilder.js`'s orchestration block).

## Why localStorage isn't enough

`localStorage` is tied to one browser + one device (and even to `file://` vs the live
`https://ywarmelink.github.io/...` URL — those are two separate storage buckets).
To see the same routes on your phone and laptop, the data has to live somewhere
both can reach: the Google Sheet, same as `trips`, `countries`, etc.

## How the rest of the site already does this

- **Reading**: each sheet tab (Trips, TripItems, TripNotes, Countries) is published
  to the web as CSV (`File → Share → Publish to web` in Google Sheets). The site
  fetches that CSV URL via `dataService` (`js/data/dataService.js`), configured per
  data source in `js/config/users.js`.
- **Writing**: only the map (`map.html` / `js/pages/map.js`) writes back. It POSTs to
  a **Google Apps Script Web App** bound to the sheet:
  ```js
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/.../exec';
  fetch(APPS_SCRIPT_URL, {
    method: 'POST', mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ country_code: code, status }),
  });
  ```
  The Apps Script project itself (the `doPost(e)` function that actually writes the
  row) lives only in the Google Sheet's Apps Script editor — it is **not** checked
  into this repo. Nobody currently has a copy of that script outside Google.

## Block Library (added after this doc was first written)

The Route Builder now also has a **Block Library** (`js/pages/routeBuilder.js`,
`atlas_route_blocks_library` in `localStorage`): reusable, named groups of country
blocks. Save a whole route as a block, insert a saved block into any route (as
independent copies — editing one never affects the other), or select 2+ saved
blocks and merge them into a new combined block. Decision made: **copies, not
live-linked** — simpler, no propagation/conflict logic needed for a personal tool.

This needs the same sheet treatment as routes:

**`BlockLibrary`** tab — one row per saved block:

| library_id | name | created_at |
|---|---|---|

**`BlockLibraryItems`** tab — one row per country in a saved block:

| item_id | library_id | order | country_code | country_name | days | budget | notes |
|---|---|---|---|---|---|---|---|

Same shape as `GrandTripBlocks` below, just keyed to `library_id` instead of
`grand_trip_id`. Client-side: `getBlockLibrary()` in `dataService.js`, merge with
`localStorage` the same way as routes.

## Expedition model (added after "Block Library" above)

Route Builder grew a fair bit past the original shape — it's now closer to what a
ChatGPT brainstorm called "Expeditions": `Route → Region → Country → Destination`.
Current in-browser shape (`js/pages/routeBuilder.js`):

```js
{
  id, name, status,           // status: Idea / Planning / Active / Completed
  start_date, description, travel_style, climate_summary, best_starting_month, notes,
  regions: [
    { id, name, season, budget, notes, collapsed }
  ],
  blocks: [
    {
      id, country, country_code, region_id,   // region_id → regions[].id, or '' if ungrouped
      days, budget, notes,
      destinations: [{ id, name, notes }]
    }
  ]
}
```

Regions are a **rendering-level grouping only** — day-range math (`rbComputeRanges`)
still walks the flat `blocks` array in order, completely ignoring `region_id`. A
region just labels a *contiguous run* of blocks that happen to share the same
`region_id`; there's no separate "region order". Keep that invariant if this becomes
sheet-backed — don't introduce a second source of truth for ordering.

Two **predefined routes are seeded once** on first load (`rbSeedPredefinedExpeditions`,
guarded by the `atlas_grand_trips_seeded_v1` localStorage flag so it never re-runs):
"Eurasia Grand Tour" and "Pan-American Grand Tour", both from a ChatGPT brainstorm,
with regions + countries filled in but `days`/`budget` intentionally left blank.
When sheet-sync gets built, these need pushing up too — don't just wire the schema
and leave them stuck in localStorage-only.

The world map highlight (`rbRenderMap` in `routeBuilder.js`) needs **no sheet
changes** — it's a pure client-side feature reusing `js/utils/isoCountries.js` and
the same world-atlas topojson the main map uses, just to color the current route's
countries. Nothing to sync there.

## The plan for Route Builder

### 1. New sheet tabs (mirrors the Trips / TripItems split, extended for regions + destinations)

**`GrandTrips`** — one row per big route:

| grand_trip_id | name | status | start_date | description | travel_style | climate_summary | best_starting_month | notes | created_at |
|---|---|---|---|---|---|---|---|---|---|

**`GrandTripRegions`** — one row per region group, linked by `grand_trip_id`:

| region_id | grand_trip_id | order | name | season | budget | notes | collapsed |
|---|---|---|---|---|---|---|---|

**`GrandTripBlocks`** — one row per country block, linked by `grand_trip_id` and optionally `region_id`:

| block_id | grand_trip_id | region_id | order | country_code | country_name | days | budget | notes |
|---|---|---|---|---|---|---|---|---|

**`GrandTripDestinations`** — one row per destination, linked by `block_id`:

| destination_id | block_id | order | name | notes |
|---|---|---|---|---|

`order` on `GrandTripBlocks` = the block's index within the route's flat `blocks`
array (0, 1, 2, …) — that's what drives the day-range math. `region_id` on a block
is just a label; it must never be used to derive ordering (see note above).

### 2. Publish both tabs as CSV

Same steps as the existing tabs: open the tab → `File → Share → Publish to web` →
choose the tab → CSV → publish. Grab the resulting URL (it'll have a `gid=` matching
that tab) and the `output=csv` link — same pattern already used for `trips`,
`trip_items`, `trip_notes`, `countries` in `js/config/users.js`.

### 3. Extend the Apps Script (don't replace it blindly)

The existing script already handles `{ country_code, status }` POSTs for the map.
**Before touching it**, open the sheet → `Extensions → Apps Script`, copy the current
code, and hand it to Claude so it can add a new branch (e.g. dispatch on a `type`
field: `{ type: 'country_status', ... }` vs `{ type: 'grand_trip', ... }`) without
risking the existing country sync. Guessing at the current `doPost` blind is how that
breaks.

The new branch needs to, on receiving a route payload:
- Upsert the `GrandTrips` row for that `grand_trip_id` (create or update all its fields).
- Delete all existing `GrandTripRegions`, `GrandTripBlocks`, and `GrandTripDestinations`
  rows for that `grand_trip_id` and re-insert the current regions/blocks/destinations
  in order. (Simplest correct approach — routes are small, full-replace avoids
  diffing logic across four related tabs.)
- Handle a delete-route case too (remove the `GrandTrips` row + everything linked to it).

### 4. Client-side changes needed once the above exists

- `js/config/users.js` — add `grand_trips` and `grand_trip_blocks` entries to
  `dataSources` (same `{ type: 'google_sheets_csv', url, fallback }` shape as the
  others), with fallback JSON files under `data/youri/`.
- `js/data/dataService.js` — add `getGrandTrips()` / `getGrandTripBlocks(id)`, or a
  combined `getRoutes()` that joins them (mirrors `getTrips()` / `getTripItems()`).
- `js/pages/routeBuilder.js` — on load, merge sheet data with `localStorage` (sheet
  as source of truth once reachable, `localStorage` as offline fallback — same
  resilience pattern `map.js` uses with `_local` overrides). On every change, still
  save to `localStorage` immediately (instant, offline-safe) *and* fire a
  fire-and-forget POST to the Apps Script endpoint (same `mode: 'no-cors'` pattern
  as `pushToSheet` in `map.js`).

### 5. Don't lose what's already in localStorage

Whenever this actually gets built, add a one-time migration: read whatever's in
`localStorage` under the `atlas_grand_trips` key and push it to the sheet once,
so routes built during the localStorage-only phase aren't lost. A simple
"Export routes as JSON" button (copy to clipboard) would also be a cheap safety net
to add *now*, before sync exists, in case `localStorage` ever gets cleared.

## What NOT to do

- Don't guess at the existing Apps Script's `doPost` structure and paste a full
  replacement without seeing the current code first — that's how the country-status
  sync on the map breaks.
- Don't build the sheet-writing client code before the sheet tabs + Apps Script
  branch actually exist and their real URLs are known — there's nothing to point it
  at yet.
