# Route Builder — Quality Check Plan

Status: **Step 1 DONE (2026-10-29), Step 2 waiting for Youri's OK.** Started right after Phase 4 of `ROUTE_BUILDER_BUDGET_PLAN.md`
completed (all 452 routes have full costs). Phase 4 showed why this is needed: the pricing agents spotted
~25 text inconsistencies as a side effect, used ~140 fares estimated without a web search, and found
conflicts between sources (visa file vs route notes, stale €/day in notes).

Two steps: **Step 1 = data quality** (cheap, scripted, finds problems), **Step 2 = content quality**
(agents with web search, fixes the problems Step 1 ranks highest). Step 2 only starts on Youri's OK,
and every Sheet write needs his OK, as always.

## Step 1 — Data quality audit (scripted, no agents)

One re-runnable script, `scripts/quality_audit.js`, writes `planning/quality/REPORT.md` (human summary,
counts and top items per check) and `planning/quality/findings.json` (every finding, machine-readable,
the input for Step 2). It loads the app exactly like `simulate_route_builder.js` (fresh-browser state)
and the live Sheet via `dataService.getGrandTripsFull()` like `push_route_costs_to_sheet.js`.

| # | Check | Flags | Severity |
|---|---|---|---|
| A1 | Route endings | "End of this route" in a block that isn't the last one; a last block whose transport text doesn't end the route | high |
| A2 | Structure | days ≤ 0, missing budget, block without destinations, destination without coordinates, same country twice in a row | high |
| B1 | Daily budget vs reference | budget/day below 0.8 × backpacker or above 1.5 × standard for that country (R2d "keep" blocks reported separately, not as errors) | medium |
| B2 | Cost completeness | blocks/routes the app itself counts as incomplete or stale (`rbRouteCosts`), missing flight in/out | high |
| B3 | Fare outliers | one-way flights below €60 or above €2,000; flight in vs out differing by more than 2× | medium |
| B4 | Visa consistency | the same country's visa priced differently across routes; countries the visa file says need a paid visa/e-visa but a route has no visa extra | medium |
| B5 | Estimated fares by weight | fares marked est/low in `RB_ROUTE_COSTS` comments and `flights_from_ams.csv`, ranked by € (the to-verify list for Step 2) | info |
| C1 | €/day in notes vs budget | notes quoting a €/day ("€105/day", "→€175/day") that differs more than 25% from the block's budget/day | medium |
| C2 | Stale dated statements | dated warnings/closures/temporary measures ("until", "suspended", "state of emergency", "temporarily", "from <month> 2026") whose date is already past (today: 2026-10-29) | medium |
| C3 | Leftover Dutch text | reuses the existing Dutch-text audit tool in `scripts/` | low |
| D1 | Sheet vs code parity | per route: block count, country order, days, budget, transport/notes text and cost fields differ between the live Sheet and a fresh code seed | high |

Not in Step 1 (needs judgment or the web, so it's Step 2): whether a fare or price is *right*, whether a
fact is still *true*, whether a route's order is *sensible*.

Estimated cost: ~60-100k tokens, one session, no agents. Output: findings counts per check + top items.

## Step 2 — Content quality (agents with web search, targeted)

Input: `planning/quality/findings.json`. Same rhythm as Phase 4: per round a fixed brief + one Sonnet
agent per batch writing only into its own folder, then my check, a review for Youri, and the Sheet push
on his OK. Order by value per token:

1. **2a — Fixes without research (me, no agents).** A1/C1 text contradictions, D1 parity drift (decide per
   case which side wins: the Sheet holds hand edits, so it wins unless the code has a newer fix), small
   structural errors. Shipped as a `RB_QUALITY_TEXT_FIXES` list + `rbMigrateQualityRouteFixes()` (same
   pattern as the Phase 4 text fixes) + `scripts/fix_route_texts_in_sheet.js quality`. ~50-100k.
2. **2b — Fare verification (agents, web search).** The B5 list, highest € first: verify one-way fares
   from AMS for the airports that carry most of the estimated money (likely ~60-80 airports, ~15 per
   agent). Result: `flights_from_ams.csv` rows upgraded to medium/high confidence. Where a verified fare
   differs >15% from what a route uses, the route's `flight_in_cost`/`flight_out_cost` is overwritten.
   That needs a small new overwrite path (`rbApplyRouteCosts` only fills empty fields): a
   `RB_ROUTE_COST_CORRECTIONS` list + migration + `--overwrite` option on `push_route_costs_to_sheet.js`.
   ~4-5 agents × ~120k ≈ 500-600k.
3. **2c — Fact freshness + visa conflicts (agents, web search).** C2 stale statements and B4 visa
   conflicts, grouped by region: is it still true, what replaces it. Output: text fixes + visa extra
   corrections + `VISA_VACCINATION_RESEARCH.md` updates. Size depends on Step 1 counts; estimated
   2-3 agents ≈ 300k.
4. **2d — Route-logic leftovers (me + maybe 1 agent).** The issues the Phase 4 agents reported but I left
   (Uzbekistan & Tajikistan order, Byron/Sydney order, Southern Cone Iquique backtrack, Máncora-Huaraz,
   entry-flight time conflicts, Hawaii rental days) plus anything B1 flags as a structural outlier.
   ~100-150k.

Each sub-step: review for Youri (what changed, totals before/after, real tokens) → his OK → Sheet push
→ verify live → CHANGELOG + commit + push. Youri chooses which sub-steps to run and how many agents at once.

Total Step 2 if all sub-steps run: roughly 1-1.2M tokens; 2a alone is cheap and could go first.

## Progress log

- 2026-10-29: plan written; Step 1 started.
- 2026-10-29: **Step 1 DONE.** `scripts/quality_audit.js` built, tuned for false positives (road-trip/day-visit
  endings, near-home routes whose "flight" fields hold fuel/train costs, free eVisitor/ETA authorisations,
  visas already in an R2d-kept rate, internal "Time check (2026-07)" notes, Dutch place-name hits), run
  against code + live Sheet. Outcome (`planning/quality/REPORT.md`):
  - **Clean:** structure (A2), cost completeness (B2) and Dutch text (C3) have 0 findings; Sheet ↔ code
    parity is exact apart from 3 notes where the Sheet dropped a leading quote, plus 2 Sheet-only routes
    with Dutch names (Faeröer 🐑, IJsland ❄️ — hand-made or left over, Youri to decide).
  - **To fix in 2a:** 1 route ending (East Asia & Pacific ends with "flight Taipei-Hanoi"), 20 unique
    notes quoting a €/day that contradicts the budget (C1 medium; 162 more just quote the pre-R2d
    standard level — harmless, could be reworded in bulk), the 3 dropped quotes.
  - **To research in 2c:** 27 unique stale forward-looking statements (C2 medium: Bolivia state of
    emergency, Poipet border, DRC/Ebola border, Amhara advisory, Kīlauea, temporary VAT/works dates, …)
    and 9 visa conflicts (7 countries priced differently across routes: TJ, ID, ZW, IN, SR, ST, GA; São
    Tomé and Sri Lanka possibly free for NL now).
  - **To verify in 2b:** 220 flight legs (€105k) still rest on estimates; `flights_from_ams.csv` has
    107 medium vs 255 low rows. Fixed directly: 2 CSV rows (ZRH/MUC back) were missing their confidence.
  - Real cost of Step 1: ≈90k tokens (no agents).
