# Step 2e brief — web-verify country daily rates (QUALITY_CHECK_PLAN.md)

You check the three daily-rate levels of ~15 countries in `data/cost_reference/daily_rates_by_country.csv`
against current (2026) web sources. Today is 2026-10-29. The traveller is Youri: solo, Dutch, backpacker
style. These rates drive the ground budget of every route block, so accuracy matters more than speed.

## Input

`planning/quality/step2e/input_<N>.json`: one object per row: `code`, `country`, `variant` (a sub-region or
trip style with its own row, e.g. "Patagonia", "safari (...)", "big cities (NYC/SF)"; empty = whole country),
`blocks` (how many route blocks use the country = how much it matters), and the current `backpacker`,
`standard`, `comfort` levels, each `{ total, accommodation, food, local_transport, activities }` in EUR per
day for ONE solo traveller, plus the existing `notes`/`levels_notes`.

Do NOT read the CSV, `js/` files or other repo files; everything you need is in the input. Edit no repo file
except your own two output files.

## Level definitions (all exclude intercity transport, car rental, multi-day tours/safaris, big park fees, visas)

- **backpacker**: dorm bed (or the cheapest private room where there are no hostels), cheap eats / street
  food / supermarket, public transport in town, mostly free sights.
- **standard**: own private room in a simple 2-3* hotel/guesthouse, local restaurants, city transport,
  typical paid sights.
- **comfort**: 3-4* hotel, sit-down restaurants, taxis, paid sights + an occasional day tour.
- **variant rows**: same three levels, but for that region/style. Safari variants: lodge/tented camp +
  game drives + park fees ARE included (that's the point of the row). Resort island (Maldives): resort
  stay. Bhutan tour package: the mandatory daily package + SDF.
- `total` = accommodation + food + local_transport + activities. Round each part to whole euros.

## What to do per row

1. Search (2-4 searches, more for rows with many `blocks`). Good sources: hostelworld/hostelz dorm prices,
   budgetyourtrip / "cost of travel 2026" guides with a per-day breakdown, Numbeo meal & transport prices,
   Booking/official tourism price pages, recent backpacker blogs (2025-2026). Prefer sources that give a
   real number for this country. Convert to EUR at today's rate (USD ≈ 1.12 per EUR) and round.
   **At least 2 searches per row.** Modelled "cost calculator" sites (amigosim, gotripzi,
   travelcostcalculator, travelwithhello and similar AI-generated totals) run high and don't count as a
   source on their own: only mark a row `adjusted` when real observed prices (a hostel's dorm price, a
   menu/meal price, a Numbeo item, a dated blog with receipts) support the move. For safari variants,
   average over mid-range camps, not one park's rack rates.
2. Average over the places routes usually visit (capital + main tourist spots) across the year, not peak
   high-season only (unless the variant is a peak variant).
3. Verdict per row: `confirmed` (every level total within ±15% of the current one), `adjusted` (at least one
   total moves >15%), or `unclear` (no usable source; keep current values).
4. For `adjusted`, give all three levels with all four parts. For `confirmed`, still give the values you
   found (they may move ≤15%; the merge keeps the current numbers then, unless you mark `"replace": true`
   because a part breakdown was clearly wrong).
5. Sanity rules: backpacker < standard < comfort; a hostel-less country can have backpacker close to
   standard; don't let a single luxury/peak source push a level up.

## Output (write ONLY these files)

`planning/quality/step2e/result_<N>.json`:
```json
[ { "code": "BE", "variant": "", "verdict": "adjusted", "replace": false,
    "backpacker": { "total": 68, "accommodation": 35, "food": 20, "local_transport": 6, "activities": 7 },
    "standard":   { "total": 110, ... }, "comfort": { "total": 190, ... },
    "confidence": "medium", "sources": ["https://..."],
    "note": "one line: what the sources said (e.g. 'dorm €30-40 Brussels/Bruges, cheap meal €15')" } ]
```
`confidence`: high (several recent sources with real numbers agree), medium (one solid source or a clear
range), low (indirect/old). `variant` copied exactly from the input.

`planning/quality/step2e/REVIEW_<N>.md`: a short table (code, variant, old bp/std/cf totals → new, verdict,
one-line reason) and anything you were unsure about.

Before finishing, check the JSON parses (`node -e "require('./planning/quality/step2e/result_<N>.json')"`),
has one entry per input row, and every total equals the sum of its four parts. Final message: counts per
verdict, the biggest changes, and how many web searches you made.
