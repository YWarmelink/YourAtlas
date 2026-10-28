# Brief for a Phase 4 pricing agent (one batch)

You price the costs OUTSIDE the daily budget for the routes of one batch in YourAtlas's Route
Builder (Phase 4 of `ROUTE_BUILDER_BUDGET_PLAN.md`). `N` below is your batch number. Aim for
≈120-130k tokens: don't read big files whole.

## Inputs (read these)
- `planning/budget_batchN/input.json`: the routes with their TRUE live data: mode (public /
  rental / own_car, a keyword guess: the route's own text wins), route text, every block (index,
  country_code, days, budget, notes, transport_to_next, destinations with coords),
  `carInDailyRate` per block, and `distance` (km_in_route, km_from_nl, km_back_to_nl,
  km_by_country: straight line × 1.3; a km figure in the route's own notes wins).
- `ROUTE_BUILDER_BUDGET_PLAN.md`, ONLY the "### Phase 4" section (grep for it, read ~60 lines):
  source rules per cost type and normalisation rules.
- `data/cost_reference/car_costs_by_country.csv` (+ "How to use" in `data/cost_reference/README.md`).
- `data/cost_reference/flights_from_ams.csv`: reuse an airport row if present.
- `VISA_VACCINATION_RESEARCH.md`: only for countries outside Schengen/EU (grep the country).
- `planning/budget_batch2/costs_batch2.js`: the exact output format (first ~60 lines). Do NOT read
  `js/pages/routeBuilderContent.js`; input.json has everything.

## The cost model (what you fill)
Per person, solo traveller (car costs NOT split), one-way, 2026 euros, at Youri's own level:
mostly hostels, cheap public transport where the route uses it. A block's `budget` (ground:
accommodation, food, city transport, small activities) is ALREADY set: never change or re-estimate it.
- `flight_in_cost` / `flight_out_cost`: getting there from NL / back. Fly-in: a typical one-way
  economy fare AMS→first airport / last airport→AMS booked 2-3 months ahead, NOT a "from €X" promo.
  Own car: the drive NL→first stop and last stop→NL = fuel (km × 0.07 × €/l of the countries driven)
  + tolls/vignettes on the way (realistic transit countries; DE motorways free).
- Per block: `transport` = to the next block (omit on the last block): bus/train/ferry/flight
  price; 0 when the route's own car drives it (a car ferry: price it with the car). `local` =
  intercity travel within that country by public transport (domestic flights, long trains/buses);
  **set it on EVERY block, 0 if there's none** (an empty one marks the route incomplete).
- `extras`: `rbExtra(label, cost, category, optional)`, category one of activity, tour, park_fee,
  visa, transport, other. Take tours/fees/boat trips/cable cars/parking from the notes WHEN they
  name a price (range → midpoint; "from €X" → ×1.25, flagged; a return price → halved only if no
  one-way price exists). Don't invent extras the notes don't mention. `optional: true` only when
  the notes call something optional. Every block needs `extras` (`[]` if none).
- CAR: when `carInDailyRate` is false and the route drives (rental or own car), the car is NOT in
  the daily budget → ONE `transport` extra on the FIRST block that uses the car, label starting
  "Car: ..." = rental days × rental €/day (rental only) + fuel for the km driven + tolls
  (distance-toll countries: ≈60% of km on motorway × toll €/100 km; vignette countries: the vignette
  once) + a one-way drop fee only if the route ends elsewhere (estimate, flag it). Rental days =
  the days the notes say a car is needed; state your call per route. City parking as an `other`
  extra only if the notes give a price. When `carInDailyRate` is true: add NOTHING for that car.
  `carInDailyRate` is the ONLY test: a notes text like "~€40/day including the rental car" is older
  than the R2d budgets (lowered to Youri's style), so with the flag false the car IS added.
- Directions in flights_batchN.csv: exactly `out` (AMS→destination) and `back` (destination→AMS).
  `data/cost_reference/flights_from_ams.csv` is read-only (the orchestrator merges your rows); reuse
  any airport row already in it without searching. Other agents may run batches at the same time.
- Visas: Schengen/EU countries need none for a Dutch passport; elsewhere use VISA_VACCINATION_RESEARCH.md.
- `checked: '<today's date>'`.

## Research
WebSearch only for what the files lack: new airport fares (one search per airport+direction,
max ~12 searches) and a specific ferry price the notes don't give. If nothing usable comes back,
estimate, mark "(est)", low confidence. Give every number a short `//` source comment.

## Outputs (write ONLY these, nothing else in the repo; no git)
1. `planning/budget_batchN/costs_batchN.js`: one entry per route keyed by its exact id, same
   shape as batch 2, EVERY block in order with its `code`. First line:
   `// ---- Phase 4 batch N: <group>, extracted <date>, approved by Youri (planning/budget_batchN/REVIEW.md) ----`
2. `planning/budget_batchN/flights_batchN.csv`: only NEW airport rows, same columns as flights_from_ams.csv.
3. `planning/budget_batchN/REVIEW.md`: short and scannable: (a) totals table per route (days,
   ground today, there & back, transport, local, extras, added, all-in, added %); (b) "Decisions for
   Youri": each car call (rental days, km, in rate or not) and other judgment calls, with evidence
   and what changes if wrong; (c) data problems in the route text: report, don't fix.

Before finishing, check the file parses and every route has one entry per block with matching codes:
`node -e "const rbExtra=(l,c,k,o=false)=>({l,c,k,o});const e=eval('({'+require('fs').readFileSync('planning/budget_batchN/costs_batchN.js','utf8')+'})');const i=require('./planning/budget_batchN/input.json');for(const r of i.routes){const x=e[r.id];if(!x||x.blocks.length!==r.blocks.length||x.blocks.some((b,j)=>b.code!==r.blocks[j].country_code||b.local===undefined||!b.extras))console.log('BAD',r.id)}console.log('checked')"`

## Report back (short)
Added € per route, the 3-5 judgment calls that matter most, number of web searches, anything you couldn't price.
