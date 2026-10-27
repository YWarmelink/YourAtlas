# R2: daily-rate check, review

Done 2026-10-27. Reference table: `data/cost_reference/daily_rates_by_country.csv` (152 countries +
23 variants; 4 Sonnet agents, first from knowledge, then a web check of the ~60 countries that
drive most blocks). Definition (same for every country): one solo traveller, Standard level, own
private room (no dorm), local restaurants, city transport, typical sights; **excluding** intercity
transport, car, multi-day tours/safaris, big park fees and visas (those are the new cost fields).
Full per-block list: `comparison.md` (`node scripts/compare_daily_rates.js`). **Nothing has been
changed in routes or the Sheet.**

## Result

1,087 blocks checked. **714 (66%) are within ±25%** of the reference. 373 are off, on 196 routes:

| | Blocks | € if set to the reference |
|---|---|---|
| Below the reference (underbudgeted) | 316 | +€97,535 |
|   of which more than 40% below | 112 | +€47,055 |
| Above the reference | 57 | −€31,784 |
|   of which more than 40% above | 26 | −€21,219 |

All ground budgets together: €703,452. Reference confidence of the flagged blocks: 333 medium, 40 low, none high.

## Patterns

1. **Asia is fine.** The pilot-calibrated Asian rates (TH, VN, KH, LA, ID, PH, IN) almost all fall
   within ±25%, which suggests the reference definition matches the workbook's "Standard".
2. **Western Europe, the UK, Australia, the US and Switzerland are systematically under** (IT 32 blocks, GR 26, ES 19,
   GB 19, AU 18, CH 11, US 10). These blocks read like hostel/dorm or shared-room rates,
   while the reference assumes an own room for a solo traveller. Italy's median (120) matches;
   the low ones are mostly short regional routes (Sicily, Puglia) at €55-90/day.
3. **Latin America is under by 35-55%** (PE, BO, GT, NI, CR, PA, CO): the app has €23-36/day, which
   is a dorm-backpacker level, not a solo private room.
4. **The "above" blocks are mostly explainable**: safari countries (KE, TZ, BW, ZM, RW) whose
   rate mixes town days with safari days (it lands between the base and the safari variant), Mauritius/Seychelles
   (resort level), Greenland (inter-town transport inside the rate), Bhutan (SDF package),
   Malaysia Borneo (tours inside the rate). Those mostly shouldn't be lowered; the safari
   share can move to `extras` later.
5. **Kosovo, Serbia, Albania, Montenegro under by 25-35%**: small amounts (€10-20/day).

## Decision for Youri

The core question: **is "Standard" an own private room?** (The workbook's Basis was, and Asia agrees.)
- **A. Yes, raise the underbudgeted blocks to the reference** (+€97.5k across 316 blocks). Leave
  the "above" blocks alone unless they are clearly wrong (Malaysia Borneo €193/day, Czech €130 in
  the Central European roadtrip, Liechtenstein/Austria/Switzerland €180).
- **B. Only the big gaps:** fix the 112 blocks that are >40% below (+€47k), leave the 25-40% ones.
- **C. Hostel level is intended for the cheap routes:** add a "budget backpacker" variant per country instead
  and only fix blocks that fit neither.

Recommendation: **B first**. Those 112 are hard to defend at any level (e.g. Peru €30/day, Costa Rica €48/day
with an own room). Re-run the comparison afterwards, and decide on the 25-40% group once the
reference has more "high" rows. Any change goes through a migration + Sheet push, scaling `budget` only (never `days`).
