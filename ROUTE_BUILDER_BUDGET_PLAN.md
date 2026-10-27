# Route Builder — Full-Cost Budget Plan

Status: **Phases 0-3 DONE, Phase 4 started (2026-10-27)**: data model + Sheet plumbing, UI,
the Asia Grand Tour pilot (live in the Sheet). Phase 4 = backfill all routes in batches; method
and progress under Phase 4 below. Started after the long-haul buffer budget fix (see `CHANGELOG.md`).

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

**Built 2026-10-27** (see `CHANGELOG.md`). Labels: the tiers are Budget / **Standard** / Comfort
(Standard = the workbook's "Basis"). Optional extras are never in the total (the workbook's
"Meenemen = Nee"); an optional item you do plan to do is entered as non-optional. A country
counts as "costed" once onward transport (not needed on the last one), local transport and the
extras list (each with a price) are filled in, 0 and "no extras" included.

Original plan:

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

**Done 2026-10-27** (see `CHANGELOG.md`). Standard €30,789 vs the workbook's Basis €33,556; the
€2,767 gap is exactly the items the app leaves out by design (+4% price factor, vaccinations/
gear/SIM, bank fees). The tier multipliers land close to the workbook's per-line tiers (Budget
€20,929, Comfort €50,432 here). The data model needed no changes. Lessons for Phase 4:
- Add a batch as entries in `RB_ROUTE_COSTS` (block order + country code per entry), run
  `node scripts/push_route_costs_to_sheet.js` (dry run), then `--push`. The migration picks up
  new route ids by itself; no new flag per batch.
- The published CSV can flip between old and new versions for a few minutes after a write, so
  only trust a check that has settled (the push script polls).
- A full-route upsert (`grand_trip`) rebuilds the route from whatever the CSV shows. Never run
  one on a route whose cost push isn't visible yet, or it blanks the costs.
- The workbook's "optional but included" items (Huangshan summit night, ryokan) are entered as
  non-optional; "optional" in the app means "not in the total".

Original plan:

Fill one route completely from the Excel prototype (Vervoer + Extra's tabs, 33 legs, 27
extras). Check that the app total matches the Excel's Basis column. Adjust the data model
where it doesn't fit before the bulk backfill starts.

### Phase 4 — Backfill all routes (batches)

**Started 2026-10-27. Method decided with Youri: the most accurate source per cost, not one
source for everything.** Amounts are per person, travelling solo (car costs are not split),
one-way, 2026 prices, Standard level. Every batch follows these rules:

| Cost | Source |
|---|---|
| Specific legs (ferry, night train, bus) | the route's own notes — researched for that exact leg |
| Tours, park fees, boat trips | the route's own notes |
| Visas (Dutch passport) | `VISA_VACCINATION_RESEARCH.md`, one value per country for every route |
| Getting there & back (flights) | `data/cost_reference/flights_from_ams.csv`: typical one-way economy fare booked 2-3 months ahead — NOT the "from €X" promo fares in the notes (systematically too low). Airports are added as batches need them. |
| Car: distance | the route's notes when they give km, otherwise calculated from the destination coordinates × a road factor |
| Car: fuel, tolls/vignettes, rental | `data/cost_reference/car_costs_by_country.csv` (7 L/100 km × that country's fuel price) |

Normalisation rules for prices taken from notes: a range → its midpoint; "from €X" with no upper
bound → €X × 1.25 and flagged for review; other currencies → € at the rate recorded in the
reference file; return prices → halved only when a one-way price isn't available.

Car routes:
- **Car already in the daily rate** (e.g. Sicily, "~€110/day, rental car + fuel included"): add
  nothing for the car. Only 25 of 282 car routes state this either way, so each batch judges the
  rest and lists its call per route for Youri to review. That's the main double-counting risk.
- **Own car from NL**: "getting there / back" = the drive from and to NL (fuel + tolls). All
  driving within the route = one `transport` extra ("Car: fuel ≈N km + tolls/vignettes") on the
  first block. Legs between blocks get €0 unless they're a ferry/flight.
- **Fly + rental car**: flights as usual. Rental + fuel (if not in the daily rate) = one `transport`
  extra on the first block. The legs driven get €0.

Order: reference tables first (car costs, then flight fares as needed), then the route batches:
Grand Expeditions first, then standalone routes by family. Use `scripts/route_cost_inventory.js`
to scope each batch (mode, getting-there text, the "car in budget" hint per route). Each batch:
Sonnet extraction → an edit list for Youri → `RB_ROUTE_COSTS` entries →
`scripts/push_route_costs_to_sheet.js` (needs Youri's OK) → progress line below.

Progress:
- [x] Code: "Getting there & back" label; `transport` extras count under Transport
- [x] Inventory script (453 routes: 55 own car, 227 rental, 171 public transport)
- [x] Distance fallback: `scripts/route_distances.js` (coordinates × road factor 1.3; Central
  European Grand Roadtrip 8,660 km vs 9,050 km in its notes, -4%)
- [x] R1a car costs, Europe (48 countries, 2026-10-27, ~85k tokens): fuel from the EU Oil
  Bulletin / GlobalPetrolPrices (high confidence for EU countries); vignettes sourced.
  **Rental €/day and per-100 km toll rates are calibrated estimates, not quotes**, and 17 small or
  non-EU countries are low confidence. A later spot-check of rental prices in the most-used car
  countries (IT, FR, ES, HR, SI, AT) would tighten the fly + rental routes.
- [x] R1b car costs, rest of the world (37 countries, 2026-10-27, 69k tokens): 0 high / 15 medium /
  22 low confidence. Rental €/day are knowledge-based estimates (4x4 safari countries ±30%). The
  notes carry the rules that matter: southern-African cross-border letters + one-way fees, rentals
  barred from MZ (partly ZW), car-with-driver countries (AO/MG/ET/RW/EG/LK).
- [x] Inventory fix: "NOT included" was matching "included" (3 routes misflagged)
- [ ] Route batches
  - [x] **Batch 1: the 13 Grand Expeditions** (174 blocks), extracted 2026-10-27, 596k tokens,
    reviewed by Youri (`planning/budget_batch1/REVIEW.md`): Oceania compact car Perth-Broome + flight
    Broome-Darwin instead of a 4x4 to Darwin; ZA/LS/SZ car stays "in the rate" until R2; Eurasia's
    reused pilot `local` values scaled down to its shorter stays; North America's flights stay
    separate fields and its block budgets stay as they are (the "budgets include flights" note
    refers to the old region budgets; block 1 would drop to €71/day incl. a car otherwise). In
    `RB_ROUTE_COSTS`, fares in `data/cost_reference/flights_from_ams.csv`, dry run clean (174
    blocks, 13 routes). **Pushed to the Sheet 2026-10-27 (Youri's OK), verified.**
- [ ] **R2 daily-rate check** (after batch 1 is applied, before the standalone batches; agreed with
  Youri 2026-10-27). Ground budgets are ~70% of the all-in total, and the ~440 standalone routes
  reuse their parent's rates, so check them once per country, not per route:
  1. `data/cost_reference/daily_rates_by_country.csv`: Standard €/day per country (accommodation +
     food + city transport + typical activities), with a fixed written rule for what is in/out
     (car, park fees, intercity transport), using batch 1's review calls as the definition. Sonnet +
     WebSearch, 4-5 batches, ~250-350k tokens.
  2. A script compares every block's budget/days with the table and flags > ±25% (fixed exceptions
     for expensive stretches: Antarctica, Patagonia, safaris, Bhutan SDF).
  3. Youri reviews the outliers → `rbMigrate*()` + Sheet push (scale `budget`, never `days`).
  - Prep done 2026-10-27: `scripts/daily_rate_spread.js` → `planning/r2_daily_rates/current_spread.md`
    (152 countries / 1,087 blocks: 119 already within 1.5× between routes, 22 at 1.5-2×, 11 at ≥2×,
    e.g. MY, AR, IT, GR, CL, TR, US, ES, HR). Some spread is real (Patagonia vs northern Argentina,
    Sabah vs Peninsular Malaysia, roadtrip rates incl. car), so the research table needs a region
    column for those countries.
  - Research done 2026-10-27 (~264k tokens): `data/cost_reference/daily_rates_by_country.csv`
    (152 countries + 23 variants), `scripts/compare_daily_rates.js`, review in
    `planning/r2_daily_rates/REVIEW.md`: 714/1,087 blocks within ±25%; 316 below (+€97.5k if
    raised), 57 above.
  - **Decided by Youri 2026-10-27:** he travels as a backpacker, so the own-room "Standard" reference
    is not his level, and the 316 "too low" blocks are mostly fine for him. Instead, three
    levels per country, so the app works for other travel styles too:
    - [x] **R2b research:** add `backpacker_eur_per_day` (dorm or cheapest private room, cheap local food,
      public transport, mostly free sights) and `comfort_eur_per_day` (3-4* hotel, sit-down
      restaurants, taxis, paid tours/sights) to `daily_rates_by_country.csv`, each with its own
      four-part split. The existing column stays as Standard. Name the countries that must be
      web-checked IN the brief (the R2 agents skipped searches until sent back). ~150-200k tokens.
      **Done 2026-10-27** (243k tokens): backpacker + comfort columns (each with a four-part split) for all 175
      rows of `daily_rates_by_country.csv`; 112 medium / 63 low confidence; the 42 must-search countries web-checked
      (mostly Hostelz dorm budgets + 2026 cost guides, set leaner than Hostelz's nightlife allowance).
      Backpacker ≈ 0.49× Standard (0.35-0.80), Comfort ≈ 1.67× (1.29-2.12). backpacker < standard < comfort holds on every row.
      **Finding for R2c/R2d:** only **3 of 1,087 blocks** are below the backpacker level (−10%), and 35 are
      more than 25% above Standard. So the current budgets mostly sit BETWEEN backpacker and Standard: they are not
      backpacker level. Declaring the stored `budget` "backpacker" and multiplying by the country's
      Standard/backpacker ratio (~2×) would therefore inflate the other tiers. Better for R2c: show the stored
      budget as **"My plan"**, and compute Backpacker / Standard / Comfort as **absolute** reference
      rates × days per block (variant chosen as in compare_daily_rates.js), not as ratios of the stored budget.
    - [ ] **R2c app** (NEXT; the approach was updated by the finding above: "My plan" + absolute reference tiers; the original text follows): the tier toggle uses each country's own ratios from the table instead of the
      global multipliers (fallback: the global ones for a country/variant without a row). Rename
      the tier "Budget" to "Backpacker". The stored block `budget` = **backpacker level** (Youri's
      planning level). Label it as such in the UI, and document it in `RB_BLOCK_COST_FIELDS` and
      CLAUDE.md.
    - [ ] **R2d corrections:** re-run `compare_daily_rates.js` against the backpacker column. Raise
      blocks that are below backpacker level; review blocks far above Standard (safari days, Borneo,
      resorts). Youri reviews the list, then a migration + Sheet push (`budget` only, never `days`).
    - Then the standalone route batches, which automatically fit all three levels.
  - [ ] Standalone routes by family (after R2b-R2d)

Original plan:

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
