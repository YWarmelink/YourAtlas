# Trips — Route Map Plan

Status: **data model, plumbing and map UI done (2026-08). Only the Sheet content is missing** —
nothing has coordinates yet, so the map doesn't show up anywhere until that's filled in.
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
- **Not visually verified in a real browser** (none was available this session) — only
  Node-level syntax + logic-with-mocked-Leaflet smoke tests. Worth an actual look once there's
  real coordinate data to render.

## What's next

1. **The Sheet part (Youri, whenever there's time)** — **South Korea** (planned & booked) is the
   pilot trip. It also needs some small adjustments of its own beyond just destinations/
   coordinates — details TBD, sort those out first when starting on it. See `README.md`'s
   "Trips route map" section for the exact Sheet checklist (tab + columns, publish as CSV, fill
   in coordinates, send Claude the CSV URL to wire into `js/config/users.js`).
2. **Route Builder → shared util migration** (later, separate step, not blocking) — once there's
   a browser available to verify, move Route Builder's own map drawing onto
   `js/utils/routeMap.js` too, retiring its private copy of the same logic. Verify Route
   Builder's map still renders identically before/after — that's the whole point of waiting on
   this until it can actually be checked.
