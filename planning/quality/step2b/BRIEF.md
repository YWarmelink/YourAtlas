# Step 2b brief — verify estimated flight fares (QUALITY_CHECK_PLAN.md)

You verify ~20 one-way economy fares that Route Builder routes still use as estimates. Today is
2026-10-29. Traveller: Youri, solo, from Amsterdam (AMS), economy, 1 checked bag not required, books ~2-3
months ahead, flexible on dates within a month, cheapest sensible routing (max 2 stops, no 20h+ layovers,
no separate-ticket self-transfers unless that's the normal way, e.g. a domestic hop).

## Input

`planning/quality/step2b/input_<N>.json`: one object per leg: `id`, `leg` (e.g. "Ushuaia-AMS",
"AMS-Christchurch"), `eur_total` (what it weighs across routes) and `uses[]`: each route that uses it, with
`field` (`flight_in_cost` = AMS → first airport, `flight_out_cost` = last airport → AMS), the current `cost`
and the original `note` (routing assumptions). Some legs include a domestic hop in the note (e.g. "AMS-Santiago
+ domestic to Calama"): price the whole thing the note describes. If two input legs are the same airport and
direction, give them the same fare. Do NOT read any other repo file; edit nothing except your two output files.

## What to do per leg

1. 2-4 searches. Good sources: Google Flights / Kayak / Skyscanner / momondo result snippets with dated
   prices, airline fare pages (KLM, TAP, Turkish, Qatar, Emirates, LATAM, Air NZ, ...), recent fare-tracker
   pages. **One-way** fares only: when a source only gives return fares, a one-way long-haul is usually
   ~55-70% of the return on full-service carriers, say so and lower the confidence.
   **Season (from batch 3 on):** each use has a `travel_month` (the month that flight is flown: the
   route's `best_starting_month` for `flight_in_cost`, start + `route_days` for `flight_out_cost`). Price the
   fare for that month: look for month-specific quotes ("cheapest month", "fares in July", Google Flights
   price-graph snippets) and adjust for high/low season (e.g. Christmas/New Year, European summer holidays
   July-August, local peak seasons). If uses of one leg fall in different seasons and the fares differ >15%,
   report a fare per month in `by_month` (e.g. `{ "July": 950, "November": 780 }`) and put the most common
   one in `eur_one_way`. Say in `note` how seasonal the fare is.
2. Use a typical fare for that booking window, not a promo floor ("from €X") and not a last-minute peak.
   When sources give a range, take the lower-middle of the realistic range. Convert to EUR (USD ≈ 1.12/EUR).
3. `confidence`: high (dated one-way quotes from 2+ sources agree), medium (one solid one-way quote or a clear
   range), low (derived from return fares / indirect).

## Output (write ONLY these files)

`planning/quality/step2b/result_<N>.json`:
```json
[ { "id": "L1", "leg": "Ushuaia-AMS", "airport_code": "USH", "direction": "back", "eur_one_way": 980,
    "routing": "Aerolíneas USH-AEP + KLM/Air Europa via EZE-MAD", "confidence": "medium",
    "sources": ["https://..."], "note": "one line: what the sources said" } ]
```
`direction`: `out` (AMS → X) or `back` (X → AMS). `planning/quality/step2b/REVIEW_<N>.md`: a table (id, leg,
current cost(s) → verified, % change, confidence) and anything unsure. Check the JSON parses and has every
input id. Final message: counts, the biggest moves, total current vs verified € across `uses`, search count.
