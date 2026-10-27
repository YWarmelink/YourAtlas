# Route Builder — Full-Cost Budget Plan

Status: **Phase 0 decided, Phase 1 DONE (2026-10-27)**: Apps Script redeployed, live
round-trip test passed. Phase 2 (UI) next. Started after the long-haul buffer budget fix (see `CHANGELOG.md`).

## Why

A route's budget today only covers **ground costs**. Each block's `budget` is the leg's total,
which is a daily rate × days, and that rate covers accommodation + food + local transport +
typical activities. The route total is the sum of the blocks. Everything else lives only as
free text in `notes` / `transport_to_next`, or isn't recorded at all:

| Missing from the total | Where it lives now |
|---|---|
| Flights from/to NL | free text in the first block's `notes` ("Entry: flight … from ±€X") |
| Transport between countries | free text in `transport_to_next` |
| Domestic flights / long-distance trains | free text in `notes` |
| Mandatory tours, park fees, boat trips | free text in `notes` ("separate cost") |
| Visas | free text in `notes` |
| Insurance, vaccinations, gear, home costs, buffer | nowhere |

The East & Southeast Asia Grand Tour 🐉 shows how big the gap is: the app says **€18,700**, and
the full-cost Excel model (`planning/Wereldreis_Oost-ZO-Azie_Begroting.xlsx`, built
2026-10-26, prices researched 2026-10) comes to **≈€33,600** at the same travel style, of which ~€15,000 isn't in the app.
That workbook is the working prototype for this plan: its tabs (Per land / Vervoer / Extra's /
Vooraf & vast / Instellingen) map directly onto the data model below.

Current data (simulated live state, 2026-10-26): 453 routes, 1,087 blocks, 123 regions. Every
block has a `budget`. **798 blocks already mention a price in their notes/transport text**, which
is raw material for a semi-automatic backfill. Region budgets are typed in by hand: 111 match
the sum of their blocks, 12 don't (all in North America Grand Traverse 🌎).

## Decisions to make first (Youri)

**Decided 2026-10-27: all five recommendations below, and lists/objects stored as a JSON string
in one cell (no extra tab).**

1. **Extras itemized or as a single number per block?** Itemized (`[{label, cost, category,
   optional}]`) is what the Excel uses and makes optional items toggleable. A single
   `extras_cost` + the existing notes text is much cheaper to backfill for 1,087 blocks.
   *Recommendation: itemized, but the backfill may start with one item per block.*
2. **Budget tiers (Budget/Basis/Comfort) stored or computed?** *Recommendation: compute.* Store
   only Basis, and derive the other two with global multipliers per cost type (as in the Excel's
   Instellingen tab). That way 1 value per field instead of 3.
3. **Where do NL flights go?** A route-level `flight_in` / `flight_out` cost, or a transport
   item on the first/last block. *Recommendation: route-level.* Single-country routes all have
   one, and it's the cost that varies most by departure month.
4. **Trip-wide costs (insurance, vaccinations, gear, home costs, buffer) in the app at all?**
   They depend on the person and the trip length rather than on the route. *Recommendation:*
   the app adds a computed estimate (insurance/month × months, buffer %), and the
   person-specific items (rent, storage) stay in the Excel.
5. **Region budget:** keep it as a free field, or make it the computed sum of its blocks.
   *Recommendation: computed* (removes the 12 mismatches and one source of drift).

## Phases

### Phase 1 — Data model + Sheet plumbing (no UI, no content)

**Built 2026-10-27** (see `CHANGELOG.md`). Final field names: block `transport_cost`,
`transport_cost_to`, `local_transport_cost`, `extras`, `costs_checked`; route `flight_in_cost`,
`flight_out_cost`, `trip_costs` (`{ insurance_per_month, buffer_pct }`) — documented at
`RB_BLOCK_COST_FIELDS` in `routeBuilderCore.js`. Visas go into `extras` with category `visa`.
Tier multipliers and the computed region budget (decisions 2 + 5) are calculations, so they
land in Phase 2. Phase 4 can patch fields with `blocks_bulk_update` / `grand_trips_bulk_update`
instead of full-route upserts.
- [x] Client read/write + Block Library copies
- [x] Apps Script (`GrandTripSync.gs` + `Code.gs`)
- [x] Offline round-trip test
- [x] Youri: paste both `.gs` files, redeploy as a new version
- [x] Live round-trip test (writes + deletes a hidden test route): passed 2026-10-27, real
  routes (455) and block coordinates (1,087) unchanged. The published CSV tabs refresh
  independently, so a read can briefly show a half-updated route; the script polls through that.

Original plan:

The Sheet is the source of truth on load, and any field missing from the GrandTrip* tabs is
**wiped** (the lat/lng incident, see CLAUDE.md gotchas). So the plumbing has to land in full
before any content is added.

- New fields (names indicative):
  - block: `transport_cost` (to the next block), `local_transport_cost` (intercity within the
    country), `extras` (itemized list, see decision 1)
  - route: `flight_in_cost`, `flight_out_cost`, `trip_costs` (settings for the computed
    trip-wide items)
- `rbBuildGrandTripPayload()` (routeBuilderCore.js) + `getGrandTripsFull()` (dataService.js):
  write/read the new columns. Numbers go through `parseSheetNumber()` (decimal-comma locale).
  Lists are stored as a JSON string in one cell, or in a new `GrandTripExtras` tab. *A JSON
  cell is simpler; a tab is cleaner for 1,000+ items.* Decide this in this phase.
- `apps-script/GrandTripSync.gs`: add the columns via `_ensureExtraHeaders()` (and a new tab
  if chosen). **Youri pastes the whole files into the Apps Script editor and redeploys**, as
  with the lat/lng fix.
- Defaults: empty = "not estimated yet" (not 0), so the UI can tell the two apart.
- Verify: round-trip one test route through the Sheet and confirm nothing gets lost
  (`simulate_route_builder.js` + a read via `getGrandTripsFull()`, as
  `scripts/fix_longhaul_buffer_budgets_in_sheet.js` does).

### Phase 2 — UI

- Block editor (`routeBuilderUI.js`): input fields for transport costs and an extras list (+
  add, optional checkbox).
- Route editor: NL flights in/out.
- Overview: a cost breakdown replacing the single "Budget" figure. Show ground / transport /
  flights / extras / visas / trip-wide / buffer, plus the total and the all-in amount per day.
  Add a Budget/Basis/Comfort toggle.
- An indicator "N of M blocks have no transport costs yet", so a partial total is never shown
  as complete.
- Route list cards: show the all-in total (or "ground only" while it's incomplete).
- Browser verification on the live site (headless Chrome with local files swapped in, as in
  the 2026-10-21 fixes).

### Phase 3 — Pilot: East & Southeast Asia Grand Tour 🐉

Fill one route completely from the Excel prototype (Vervoer + Extra's tabs, 33 legs, 27
extras). Check that the app total matches the Excel's Basis column. Adjust the data model
where it doesn't fit before the bulk backfill starts.

### Phase 4 — Backfill all routes (batches)

- Step 1: **extraction.** For the 798 blocks that already mention prices, convert the amounts
  in `notes` / `transport_to_next` into structured fields. Mechanical extraction with
  judgment calls (ranges, $ vs €, return vs one-way). Sonnet per CLAUDE.md model policy, in
  batches per expedition family, with an edit list Youri can review before it's applied.
- Step 2: **research** for blocks without price mentions, using the `route-price-checker`
  agent (extend its output with structured transport/extras fields).
- Order: Grand Expeditions first (biggest totals, shared content via `rbContentFor()`, so
  splits inherit automatically), then standalone routes.
- Every batch: source edit + `rbMigrate*()` + Sheet push (as with the long-haul fix, a Node
  script that patches only the changed fields per route and uses `grand_trip` upserts).
  Track progress in this file.

### Phase 5 — Docs and tooling

- `route-builder-content` skill + `route-price-checker` agent: new routes must fill the new
  fields (no more "separate cost" left only in text).
- CLAUDE.md: describe the cost model in one paragraph (what's in the daily rate, what isn't).
- Optional: an "Export budget" button that produces the same per-country/transport/extras
  breakdown as CSV, as the successor to the hand-built Excel.

## Risks / watch-outs

- **The Sheet merge wipes unknown fields.** Phase 1 must be done and deployed before any
  content (Phase 3+) is added, or the data disappears on the next load.
- **Shared content:** many routes pull blocks from `RB_EXPEDITION_CONTENT` via
  `rbContentFor()`. One edit there reaches only browsers that haven't seeded yet. Migrations
  and the Sheet push must cover every route using that block, including standalone splits.
- **Transport belongs to a pair of blocks, not one country.** If a route is reordered in the
  UI, `transport_cost` to the "next" block becomes wrong. The UI should flag it (e.g. store
  the destination country code with the cost and show a warning when it no longer matches).
- **Price snapshots go stale.** Store a "verified" date per cost field or per block, like the
  existing dated notes.
