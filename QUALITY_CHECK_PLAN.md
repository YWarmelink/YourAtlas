# Route Builder — Quality Check Plan

Status (2026-10-29, end of day): **Step 1, 2a, 2c, 2d, 2e + leftovers DONE and live; 2b at 3 of 9 batches.** See "Next steps" at the bottom. Started right after Phase 4 of `ROUTE_BUILDER_BUDGET_PLAN.md`
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
- 2026-10-29: **Step 2a + 2c + 2d done in code** (Youri chose 2a, 2c, 2d; 2b only explained). One fix set,
  `RB_QUALITY_2026_10_*` + `rbMigrateQuality202610Fixes()`, Sheet: `scripts/fix_route_texts_in_sheet.js quality` (41 routes):
  - 2a: East Asia & Pacific ending (builder override `RB_EAST_ASIA_PACIFIC_END`), 3 Dominica notes no longer start with a quote.
    C1 turned out to be explained (notes quote older/standard rates; budgets sit at the "My plan" rate of the right variant),
    so the audit was tuned instead of rewording ~200 notes.
  - 2c: 2 Sonnet agents, 39 web searches, ≈173k agent tokens. 27 statements: 13 changed, 9 still true (wording refreshed),
    5 unclear (kept). 11 visa extras corrected (TJ, ZW, SR, GA, ST, LK); see VISA_VACCINATION_RESEARCH.md.
  - 2d: Uzbekistan & Tajikistan and Southern Cone stop order, Thailand/Sydney/California/West Coast wording (migration only;
    the shared source text is right for the expeditions).
  - Faeröer 🐑 / IJsland ❄️: Sheet-only leftovers (already in RB_REMOVED_ROUTE_IDS); `scripts/delete_removed_routes_from_sheet.js`.
- 2026-10-29: Youri chose **option D** for the next session: 2b (all estimated fares) + a new **2e** = web-verify the
  country daily rates (backpacker/standard/comfort in `data/cost_reference/daily_rates_by_country.csv`) for all 105
  countries resting on own knowledge / low confidence (€282k of the €554k ground budget), then re-run the
  "My plan" budgets (`scripts/r2d_style_budgets.js` logic) where a rate moves >15%, review, Sheet push on OK.
  Countries first (they change budgets everywhere), then fares. Estimated 1.1-1.3M tokens over 1-2 sessions.
  Small leftovers to fold in: Ballina flight (~€80, Sydney/Byron) and the ~€60 Southern Cone backtrack still in its
  costs; the 5 unclear statements; Moldova + Transnistria route now goes against red advice (rethink?); Pan-American
  Grand Tour has the same Iquique→San Pedro backtrack inside the expedition.

## Option D — batch tracker (resume here)

Run in small batches so a session can stop between any two. State lives in files, not in chat.

**2e — country daily rates** (118 rows = every row not web-checked or low confidence; variants included):
`planning/quality/step2e/` → `BRIEF.md` (fixed agent brief), `batches.json` (8 batches, `status` todo/done),
`input_N.json`, and per finished batch `result_N.json` + `REVIEW_N.md`. One Sonnet agent per batch, writes only
its own result files. Resume: launch the batches whose `result_N.json` is missing.
After all 8: merge into the CSV (`replace`/`adjusted` rows only) → `build_daily_rates_reference.js` →
re-run My plan budgets where a rate moved >15% → review → Sheet push on Youri's OK → commit + push.

**2b — estimated fares**: not split yet (after 2e).

**Leftovers** (one small me-only batch, after 2e): Ballina ~€80 + Southern Cone ~€60 cost fixes, Pan-American
Iquique→San Pedro backtrack, 5 unclear statements (Lima airport, Öresund ID checks, Rail Baltica, UK ETA
Jersey/IoM), unpriced tours (Milford Sound, whale swims, DMZ, Wadi Rum, ...). Moldova + Transnistria = Youri's call.

| Batch | Rows | Status | Agent tokens |
|---|---|---|---|
| 2e-1 | AD BE BG CY CZ DK EE FI FO GG GI HU IE IM IS | done (11 confirmed, 4 adjusted: BG CY EE GI; 16 searches) | 84,113 |
| 2e-2 | JE LI LT LU LV MC MD MK MT NL PL RO RS SK SM | done (14 confirmed, 1 adjusted: MD; 15 searches) | 77,423 |
| 2e-3 | XK AE BH BN BT BT/tour MN MV MV/resort OM QA TJ TL AO BJ | done (10 confirmed, 5 adjusted: BT/tour BJ BH XK MV/resort; 16 searches) | 79,467 |
| 2e-4 | CI CM CV ET GA GH GM LS MG MU MW MW/safari MZ MZ/safari RW | done (5 confirmed, 10 adjusted, mostly aggregator sources; MZ/safari flagged; 12 searches) | 83,962 |
| 2e-5 | RW/safari SC SN ST SZ TG TN UG/safari ZA/safari ZM ZM/safari ZW ZW/safari AR AR/Patagonia | done (10 confirmed, 5 adjusted: ST ZM/safari ZW/safari TG SN, all low; 38 searches) | 112,962 |
| 2e-6 | AW BO BQ BR BZ CA CL CL/Patagonia CO CR CU CW DM EC EC/Galápagos | done (13 confirmed, 2 adjusted: BO CU; 28 searches) | 101,043 |
| 2e-7 | GD GP GT GY HN JM LC MX NI PA PE SR SV US US/big | done (14 confirmed, 1 adjusted: GT; 28 searches) | 107,756 |
| 2e-8 | UY AU CK FJ NZ PG PW TO VU WS GL SJ AQ | done (10 confirmed, 3 adjusted: CK PW VU; 34 searches) | 116,963 |
| 2e-4b | re-check of batch 4's 10 adjusted rows (CI CM CV GA GH GM LS MW/safari MZ MZ/safari) | done (8 confirmed = batch-4 proposals rejected, 2 adjusted: GH MZ/safari 215/430; 21 searches) | 95,064 |
**2e status (2026-10-29):** all batches done incl. re-checks 4b (Africa) and 9r (BG+BJ: proposals rejected, 59,015 tokens); 118 rows checked, 21 adjusted, merged into the CSV + reference. My plan effect: 9 blocks (BO 6, ST 3) = +€1,035, applied as `RB_QUALITY_2026_10B_BUDGETS` (option-D fix set, `rbMigrateQuality202610bFixes()`, Sheet: `fix_route_texts_in_sheet.js qualityb`). Leftovers in the same set: Southern Cone CL costs 75/35→45/37, Sydney/Byron Ballina (local 140→80, car 971→1,050), Pan-American Iquique→San Pedro text + €30; tour prices + 5 statements via `planning/quality/leftovers/` (1 agent).

**Option D status 2026-10-29 (end of session): 2e + leftovers DONE, live in the Sheet (25 routes, verified), pushed.**
Agent tokens: 2e round 1 324,965 + round 2 533,788 + BG/BJ re-check 59,015 + leftovers 94,945 ≈ 1.01M.
Still open: S1 (Öresund ID checks), S3/S4 (UK ETA start date for Jersey/IoM), S5 (Lima: emergency + single terminal; Cusco
"no direct international flight" looks doubtful): the agent's web-search budget ran out, so unchecked. Moldova + Transnistria (red
advice) = Youri's call. **NEXT: 2b (estimated fares) — only on Youri's go.**

**2b — fare batches (one agent at a time, Youri confirms each):** `planning/quality/step2b/` → `BRIEF.md`, `batches.json`
(9 batches of ~20 legs, highest € first: 30.0k / 17.3k / 12.6k / 11.0k / 9.7k / 9.0k / 7.6k / 3.3k / 0.7k), `input_N.json`.
Per batch: agent writes `result_N.json` → `node scripts/apply_step2b_fares.js N` (dry) → `--write` (adds rows to
`RB_QUALITY_2B_FARES` for moves >15% + updates flights_from_ams.csv) → simulate → `fix_route_texts_in_sheet.js fares --push`
→ commit + push. Resume = first batch without a result file.

| Batch | € weight | Status | Agent tokens |
|---|---|---|---|
| 2b-1 | 30,040 | done: 16 fares in 13 routes changed (−€2,210; Oceania −25-30%, La Paz +€150-220, Kilimanjaro +€100), live + pushed | 89,207 |
| 2b-2 | 17,340 | done: 10 fares in 9 routes changed (−€890; Australia −25-30%, Guatemala City + Seattle +€80-100), live + pushed | 88,128 |
| 2b-3 | 12,555 | done: 4 fares in 3 routes changed (−€730; Mauritius −€190-220, Anchorage −€130), live + pushed. Web-search budget ran out: 6 legs unverified → `input_3r.json` (re-run first next session) | 79,261 |
| 2b-3r | 6 legs of 2b-3 left unverified (Manzini, Ilulissat, Varanasi-Delhi, Mahé, Dar es Salaam, Lusaka) | todo | |
| 2b-4 | 11,020 | todo | |
| 2b-5 | 9,677 | todo | |
| 2b-6 | 9,030 | todo | |
| 2b-7 | 7,645 | todo | |
| 2b-8 | 3,340 | todo | |
| 2b-9 | 720 | todo | |

**Non-web work done 2026-10-29 (after 2b-3):**
- Quality audit re-run: today's work broke nothing (A1 endings, A2 structure, B2 cost completeness, D1 Sheet parity all clean).
  Fixed a false positive: `simulate_route_builder.js` and `quality_audit.js` now drop `RB_REMOVED_ROUTE_IDS` like the app does.
  Fixed the one new C1 item (Bolivia Uyuni note still quoted €25/day; pushed via `qualityb`).
- The "34 older budget drifts" were NOT drift: 33 were R2d's deliberate big-city / peak-coast / Paris-Riviera variant budgets
  (IT €91, HR €80, FR €100 = the variants' My-plan rates) that `rbDailyRateRow()` re-matched to the base row because it
  compared against the *standard* rate. Fixed: a budget that already equals a row's My-plan rate (±3%) now picks that row
  (this also corrects the app's Backpacker/Standard/Comfort tiers for those blocks). The 34th (Ethiopia €45/day) is R2d's
  own decision, re-keyed in `decisions.json`; `r2d_style_budgets.js` now treats a budget at its decided €/day as settled.
  Result: `r2d_style_budgets.js --plan` = 0 auto changes, 0 undecided. No budgets changed.

## Next steps (resume here)

Rules that hold for all of it: one agent at a time, Youri confirms before each next batch; real tokens reported per batch;
small text errors fixed directly and listed; Sheet pushes + git push after each finished batch.
**Web-search limit:** about 200 searches per session, shared by all agents (it ran out in 2b-3). Plan ~3 web batches per
session and put non-web work at the end of a session, not the start.

1. **2b-3r** (web, ~30-40k): the 6 unverified legs in `planning/quality/step2b/input_3r.json`. Agent writes
   `result_3r.json`; apply with `node scripts/apply_step2b_fares.js 3r` (dry) → `--write` → simulate →
   `node scripts/fix_route_texts_in_sheet.js fares --push` → wait until it reads DONE → commit + push.
2. **2b-4 … 2b-9** (web, ~80-90k each, season-specific brief): same recipe with N = 4..9. ~€41k of estimated fares left;
   batches 8-9 are small (€3.3k / €0.7k) and could run as one agent.
3. **4 unclear statements** (web, ~30k, can ride along with a 2b batch): Öresund ID checks (Denmark + South Sweden #1),
   UK ETA start date covering Jersey/Isle of Man (Jersey + Guernsey #0, Isle of Man #0), Lima state of emergency +
   single terminal + "no direct international flight into Cusco" (Peru + Bolivia #0). Input: the `unclear` entries in
   `planning/quality/leftovers/result.json`; fixes go into a new text-fix list + `fix_route_texts_in_sheet.js`.
   The Eurasia Grand Tour's "dated 2026-08" note (C2 medium) can go in the same agent.
4. **Optional: season re-check of 2b-1 and 2b-2** (web, ~2 × 90k): those 40 legs were priced as year-round averages;
   most routes start in shoulder season, so expect small moves.
5. **Visa leftovers** (web, small): Indonesia priced €29 / €30 / €53 across 3 routes, India €22 / €36 across 2 (B4).
6. ~~No-web work~~ **DONE 2026-10-29**: My-plan line on 202 notes (108 routes, live), British Isles €21 = fuel home (audit tuned),
   Export budget CSV button (Phase 5; clicked in the browser on Eurasia Grand Tour, works).
7. **Close-out:** re-run `node scripts/quality_audit.js`, update CHANGELOG + this plan, mark the quality check done.
