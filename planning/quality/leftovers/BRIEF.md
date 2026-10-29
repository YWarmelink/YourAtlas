# Leftovers brief — unpriced signature tours + 5 unclear statements (QUALITY_CHECK_PLAN.md)

Today is 2026-10-29. The traveller is Youri: Dutch passport, solo backpacker (cheapest decent option,
group/shared tours over private ones). Input: `planning/quality/leftovers/input.json`. Do NOT read any
`js/` file or other repo files; edit nothing except your two output files.

## Part 1 — tours (`tours[]`)

Each entry is one route block whose notes/destinations name a signature paid activity (`tours`, e.g.
"Milford Sound", "Gorilla") that has no priced extra yet. `sentences` are the lines that mention it,
`existing_extras` what is already priced on that block (some may cover it under another label, e.g.
"Gorilla permit" or "Uyuni tour", or a park entry already in a combined pass).

Per entry decide:
- **Is it really on this route?** Skip (`add: false`) when the sentence says it's NOT done, is only a
  comparison/mention ("unlike Milford Sound..."), is in a different country, or is already covered by an
  existing extra (say which). If the activity is free/self-guided (e.g. a free park, a walk), `add: false`.
- **Mandatory or optional?** `optional: false` when the block's plan clearly does it (it's the point of the
  stop, or a guide/permit is required); `optional: true` for "possible"/"if you want" activities.
- **Price** for one person, backpacker-level standard option (shared boat/day tour/permit), in EUR, whole
  euros, from a 2026 operator or official page (1-2 searches per distinct activity; reuse a price across
  entries naming the same activity, e.g. Milford Sound twice). Include mandatory park/entry fees the tour
  doesn't include. Gorilla permits: Rwanda USD 1,500, Uganda USD 800 (verify 2026).
- `category`: `tour` (tours, boat trips, dives), `entry` (park/site tickets, permits).
- `label`: short, like existing extras: "Milford Sound day cruise (shared coach+boat from Te Anau, ~NZD 120)".

## Part 2 — statements (`stale[]`)

Five statements a previous check couldn't confirm (`previous_note` says why). Same rules as before: find the
situation as of Oct 2026 from official sources (gov.uk, nederlandwereldwijd.nl, operators, airport sites,
railbaltica.org). Verdict `still-true` / `changed` / `expired` / `unclear`, and a full `replacement` in the
same style and length, dated "(checked 2026-10)" (for `unclear`, repeat `text` unchanged). Never invent facts.

## Output

`planning/quality/leftovers/result.json`:
```json
{ "tours": [ { "id": "T1", "add": true, "label": "...", "cost": 65, "category": "tour", "optional": false,
               "covers": "Milford Sound", "sources": ["https://..."], "note": "one line" } ],
  "stale": [ { "id": "S1", "verdict": "changed", "replacement": "...", "sources": ["https://..."], "note": "" } ] }
```
An entry with several `tours` can return several objects with the same `id` (one per activity added).
`planning/quality/leftovers/REVIEW.md`: a short table per part. Check the JSON parses and every input id
appears. Final message: counts, total € added (mandatory vs optional), search count.
