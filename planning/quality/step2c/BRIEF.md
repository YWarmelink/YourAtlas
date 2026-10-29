# Step 2c brief — stale facts + visa conflicts (QUALITY_CHECK_PLAN.md)

You check time-bound statements in YourAtlas Route Builder texts whose date has passed, using web
search, and (group "world" only) visa fees that are priced inconsistently across routes. Today is
2026-10-29. The traveller is Youri: Dutch passport, solo backpacker.

## Input

`planning/quality/step2c/input_<group>.json`:
- `stale[]`: `{ id, text, places[] }`. `text` is one exact sentence as it appears in the app; `places`
  says which routes/blocks/fields carry it (shared texts appear in several routes — you fix it once).
- `visas[]` (world only): one message per conflict, e.g. "TJ: visa priced differently across 4 routes:
  €18 / €63", or "ST: visa file says ... but the route has no visa extra". Background:
  `VISA_VACCINATION_RESEARCH.md` (grep the country code row; don't read the whole file).

Do NOT read `js/pages/routeBuilderContent.js` — everything you need is in the input. Do not edit any
repo file except your own output files.

## What to do per stale statement

1. Search (1-3 searches; prefer official sources: government/park/operator sites, Dutch
   travel advisory nederlandwereldwijd.nl, then reputable news). Find the situation **as of Oct 2026**.
2. Verdict:
   - `still-true` — the statement still holds; you may still refresh its wording (e.g. "currently (August 2026)" → "as of October 2026").
   - `changed` — the situation moved on (border reopened, emergency ended, works finished, new price).
   - `expired` — it only described a temporary/past window and is no longer useful at all (remove it).
   - `unclear` — no reliable source found; keep the original.
3. `replacement`: the full new sentence(s) to put in place of `text`, in the same style and length
   (English, practical, traveller-facing, keep any "⚠️" prefix if it's still a warning). Date what you
   checked, e.g. "(checked 2026-10)". Use `""` for `expired`. For `unclear`, repeat `text` unchanged.
   Never invent facts: if you only half-confirmed something, say so in the sentence ("reported", "check
   before travel").
4. Keep apostrophes as plain `'` and don't add line breaks.

## What to do per visa conflict (world only)

Find the current requirement and total fee for a **Dutch passport, tourism, ~2-4 weeks**: visa-free /
free authorisation / e-visa / visa on arrival, and the fee in EUR (convert at today's rate, round to whole
euros). Note the official portal. One entry per country code.

## Output (write ONLY these files)

`planning/quality/step2c/result_<group>.json`:
```json
{
  "stale": [ { "id": "S1", "verdict": "changed", "replacement": "...", "sources": ["https://..."], "note": "one line why" } ],
  "visas": [ { "country": "TJ", "requirement": "e-visa", "fee_eur": 46, "includes": "e-visa USD 50 (+ GBAO permit USD 20 if the Pamirs)", "sources": ["https://..."], "note": "" } ]
}
```
`planning/quality/step2c/REVIEW_<group>.md`: a short table (id, route, verdict, one-line change), the
visa table (world), and anything you were unsure about.

Before finishing, check your JSON parses (`node -e "require('./planning/quality/step2c/result_<group>.json')"`)
and has one entry per input id. Report in your final message: counts per verdict, the 3-5 most important
changes, and how many web searches you made.
