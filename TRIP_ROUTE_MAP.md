# Trips — Route Map Plan

Status: **live (2026-09) for one trip.** The `TripDestinations` Sheet tab now exists, is published
as CSV, and is wired into `js/config/users.js` — the pilot trip turned out to be **SEA2024
(Vietnam/Cambodia/Thailand)**, not South Korea as originally planned (Youri picked SEA2024 first
since he had real, already-traveled destinations to source coordinates for). 12 destinations filled
in (Hanoi through Bangkok, including the two Hanoi return-stops as separate rows since the route
genuinely revisits it). South Korea still has zero `TripDestinations` rows and needs its own
adjustments first (see "What's next" below) before it gets the same treatment.
Follow-up on the roadmap's "Rethink the Trips ↔ Route Builder split" item (see `ROADMAP.md`).

Pick this back up by pointing Claude Code at this file, or just say "let's continue the Trips route map."

## Why

Decided direction (2026-08): the detailed per-destination route map ("🔍 Gedetailleerd" mode,
already live in Route Builder — see `ROUTE_LOGIC_REVIEW.md`) should be available for actual
**Trips** (made or concretely planned), not just Route Builder's aspirational expeditions. The
old "Trips = small vacations / Route Builder = big expeditions" split is being dropped in favor
of "commitment, not scale" — see `ROADMAP.md`'s "Under consideration" section.

Trips currently has **zero geographic coordinates anywhere** — not on the Trips sheet, not on
TripItems. Route Builder's map only works because its 13 expeditions got coordinates by hand
during the route-logic-review. Trips needs the same manual treatment, but as an ongoing habit
per new trip rather than a one-time migration (Trips keeps growing; Route Builder's 13 were a
fixed, closed set).

## Data model — mirrors Route Builder on purpose

Route Builder's shape: a route has `blocks` (one per country), each block has `destinations`
(name, notes, lat, lng). For a future "graduate a Route Builder expedition into a real Trip"
flow (see `ROADMAP.md`'s open question 2) to be a straight copy instead of a rebuild, Trips'
destination shape needs to hold the same fields, just flattened into rows keyed by `trip_id`
instead of nested in a `blocks` array.

**New Sheet tab: `TripDestinations`** — one row per stop:

| trip_id | order | country | country_code | name | lat | lng | notes |
|---|---|---|---|---|---|---|---|

- `trip_id` — joins to the existing `Trips` tab (same key `getTripById` already uses).
- `order` — integer, position along the route. Sheet row order isn't reliable once someone
  edits it by hand, so this is explicit, same reasoning as Route Builder's block array order.
- `country` / `country_code` — carried on every row (denormalized on purpose — a Route Builder
  block's country would get copied onto each of its destination rows during a future
  graduation copy, there's no separate "block" row here).
- `name`, `lat`, `lng`, `notes` — same fields as a Route Builder `destination` object
  (`js/pages/routeBuilderContent.js`'s `rbBuildBlock`), same meaning.

## What's done (code side, no Sheet needed)

- `dataService.getTripDestinations(tripId)` added to `js/data/dataService.js`.
- `trip_destinations` data source added to `js/config/users.js` — currently `type: 'json'`
  pointing straight at `data/youri/trip_destinations.json` (an empty `[]` for now), since there's
  no published Sheet CSV yet.
- `js/utils/routeMap.js` — a fresh, shared Leaflet route-line drawer (dashed line through an
  ordered list of `{lat, lng}` stops, Utrecht home marker, numbered stop markers). Deliberately
  a **new, standalone file, not extracted from Route Builder's existing
  `rbRenderRouteLine`/`rbRenderDetailedRouteLine`** — that code has been through the full
  13-expedition route-logic-review audit, and refactoring already-verified code without a way
  to visually re-check it (no browser was available while building this) is a needless risk.
  Route Builder can migrate to this shared util later, as its own careful, separately-verified
  step — not bundled into this change.
- `js/pages/tripDetail.js` — fetches `dataService.getTripDestinations(trip.trip_id)` alongside
  the trip's items/notes, and renders a "Route Map" section via `renderMap()` **only when a
  trip has ≥2 destinations with valid coordinates** (most trips, right now, have zero — showing
  an empty map on every trip page would be noise, not signal). No mode toggle like Route
  Builder's "🌍 Landen / 📍 Routelijn / 🔍 Gedetailleerd" — Trips only has one flat destination
  list (no per-country "block" grouping the way Route Builder does), so there's only one
  relevant view.
- Shared CSS for this (`.atlas-map-*` classes) lives in `css/components.css`, not duplicated
  per-page — same classes routeMap.js's markup expects.
- **Still not visually confirmed in a real browser** (2026-09: no browser automation tool was
  available in this session either, and Youri hadn't checked it live as of this writing) — the
  full data path was traced by hand instead (`getTripDestinations('SEA2024')` correctly filters/
  sorts/parses all 12 rows as valid floats, `trip.html` loads Leaflet/topojson/`routeMap.js` in the
  right order before `tripDetail.js`, and all three functions `tripDetail.js` calls
  (`atlasGetWorldGeoJSON`/`atlasEnsureMiniMap`/`atlasRenderRouteLine`) exist in `routeMap.js` with
  matching names) — a strong code-level signal but not a substitute for actually looking at it.
  **Next session: confirm the Route Map section actually renders on SEA2024's trip page** before
  treating this as fully done.
- **Sheet-editing gotcha hit while filling this in**: pasting lat/lng values into Google Sheets
  under a Dutch locale can silently mangle them — "21.0285" got reinterpreted as "210.285" (period
  read as a thousands separator) until the lat/lng columns were explicitly set to **Format → Number
  → Plain text** before pasting. Worth doing that pre-emptively for any future numeric-coordinate
  paste into this Sheet (South Korea's turn included).
- **A per-country colored-map view (matching Route Builder's "🌍 Landen" mode) was considered and
  deliberately skipped** (2026-09) — `TripDestinations` rows do carry `country_code`, so it would be
  technically buildable, but Youri's Map page already shows sitewide country-visited coloring;
  repeating that per-trip would be redundant with what the route-line view uniquely offers (the
  actual journey shape/order for that one trip). Not ruled out forever, just not worth building now.

## What's next

1. **South Korea** — still the originally-planned second pilot, needs its own trip-detail
   adjustments sorted out first (details TBD, per the original plan), then the same
   `TripDestinations` treatment SEA2024 just got.
2. **Confirm SEA2024's Route Map actually renders** (see the browser-verification gap above) —
   the very next thing to check, before assuming this feature works end-to-end.
3. **Route Builder → shared util migration** (later, separate step, not blocking) — once there's
   a browser available to verify, move Route Builder's own map drawing onto
   `js/utils/routeMap.js` too, retiring its private copy of the same logic. Verify Route
   Builder's map still renders identically before/after — that's the whole point of waiting on
   this until it can actually be checked.
