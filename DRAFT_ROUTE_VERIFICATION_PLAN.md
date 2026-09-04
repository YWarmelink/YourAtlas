# Draft Route Verification — Plan

Status: **in progress.** Tier 2 and Tier 3 both fully done (2026-09-04, see `CHANGELOG.md`) — 31 of
the original 35 Draft routes are now `Verified`. Only Tier 1 remains: 4 solo US/Hawaii/Florida
routes needing full research from scratch (not a consistency-check). Came out of a 2026-09-02
scoping conversation about README's old "show Draft vs Research Verified" open item — see that
conversation's conclusion below for why the scope changed from what README originally speculated.

Pick this back up by pointing Claude Code at this file, or just say "let's continue the draft
route verification work."

## Why

`TRIP_DATABASE.csv`'s `Verification Status` field has 35 routes still marked **Draft** out of 447
total (412 are `Verified`, 0 are `Needs Review`). Draft means "exists, never had a
WebSearch-backed price/visa/advisory check" — these routes are live in the app (34 of 35 have `In
Route Builder? = Yes`) but their numbers could be stale first-pass guesses.

**Scope correction from README's original framing**: README speculated this might become a
per-field diff view ("which specific fields were WebSearch-checked vs. still a guess"). That's not
buildable from current data — `Verification Status` is one flag per whole trip, not tracked
per-field. Building real field-level tracking would mean redesigning the schema and re-tagging a
meaningful chunk of 447 rows — a much bigger project than what this actually needs. **Decision
(2026-09-02): stay with the existing per-trip flag.** The real gap isn't visibility of *which
field* — it's that the 35 Draft routes are hard to find (buried behind the filter panel, no card
badge) and nobody's worked through them as a checklist.

## Decision: what "verifying" a Draft route actually means

The 35 Draft routes are two structurally different kinds of work — **classify effort by kind, not
by treating all 35 as equal-sized tasks**:

### Tier 1 — full research from scratch (4 routes, heaviest per-route)
Solo single-country routes that never got a `route-price-checker` pass at all. Nothing to reuse —
full daily-cost + visa + advisory research needed, same depth as any brand-new route:
- **US Northeast 🗽** (12d)
- **US Southwest 🏜️** (12d)
- **Hawaii 🐢** (14d)
- **Florida 🐊** (10d)

### Tier 2 — light consistency-check (24 routes, lightest per-route)

**Done (2026-09-04), see `CHANGELOG.md`.** Both batches complete, all 24 flipped to `Verified`:
- **Two-country batch (12)**: Grossglockner as a duplicate-of-an-already-verified-route (no
  research needed), the other 11 via a real consistency-check, 4 with corrections applied.
- **Three-country batch (12)**: 5 confirmed with no changes, 7 with corrections applied — notably
  resolving two long-standing "not confirmed as of this writing" notes about Austria's
  border-control regime toward Hungary/Slovenia (now confirmed active, through at least
  2026-09-15), and firming up Italy + Slovenia + Croatia's Croatia-mine-free claim into a dated
  fact.

Original candidate list below kept for reference — next up: Tier 3 (7 medium mega-combos).

2-3 country combination roadtrips from `EUROPA_TRIP_IDEAS.md` batch 15. **Every individual country
in these is already `Verified` elsewhere in the CSV/route data** — the combination itself just
was never separately checked. Work here is *not* re-researching each country: it's confirming the
combo-specific stuff — does the day-split per country still make sense, does the budget total add
up from the already-verified per-country daily rates, is the border crossing/overland link between
those specific countries actually straightforward, has either country's advisory changed since it
was last checked. Much cheaper than Tier 1 per route:
- Northern Portugal + Galicia (7-10d) · Porto + Northern Spain (10-14d) · Portugal + Andalusia
  (10-14d) · Portugal + Spain Roadtrip (14d) · Portugal + Spain: Porto to Madrid (12d) · Slovenia +
  Croatian Istria (7-10d) · Croatia + Bosnia via Split (7-10d) · Bosnia + Montenegro + Budva
  (7-10d) · Austria + Slovenia via Grossglockner (7-10d) · Andorra + Spanish Pyrenees: Grand
  Circuit (9d) · French + Spanish Pyrenees (9d) · Norway + Sweden: Fjords & Capitals (12d)
  *(12 two-country routes)*
- Slovenia + Croatia + Bosnia (10-14d) · Slovenia + Croatia + Montenegro Coast (10-14d) · Adriatic
  Roadtrip (14d) · Hungary + Austria + Slovenia (7-10d) · Poland + Slovakia + Hungary (10-14d) ·
  Czechia + Austria + Hungary (10-14d) · Germany + Austria + Italy (10-14d) · Germany + Austria +
  Slovenia (10-14d) · Austria + Slovenia + Croatia (10-14d) · Italy + Slovenia + Croatia (10-14d) ·
  France + Switzerland + Italy (10-14d) · Denmark + Sweden + Norway Overland (12d)
  *(12 three-country routes)*

### Tier 3 — medium, mega-combos (7 routes, heavier than Tier 2, lighter than Tier 1)

**Done (2026-09-04), see `CHANGELOG.md`.** All 7 flipped to `Verified` — 6 checked together, Grand
European Roadtrip checked separately as its own batch (it's the biggest, 9 countries). Two
safety/timing-relevant findings worth knowing about before actually booking either route: Kosovo's
Mitrovica/KFOR situation is actively escalating (not settled) as of early September 2026, and
Greece has a fresh extreme fire-danger spell forecast for 3-9 September 2026 even though the acute
wildfire emergency from late July/early August has eased. Original candidate list below kept for
reference — next up: Tier 1 (4 solo research jobs).

Same "components already verified" starting point as Tier 2, but 4-9 countries each means more
border-crossings and route-logic to sanity-check, and budget totals that are easier to get subtly
wrong when stacking that many legs:
- Grand Balkan Roadtrip (14d, 4 countries)
- Balkan Roadtrip: Serbia + North Macedonia + Albania + Kosovo (14d, 4 countries)
- Southern Europe Highlights Roadtrip (14d, 4 countries)
- Alpine Roadtrip (14d, 5 countries)
- Northern Europe Baltic Ferry Roadtrip (14d, 6 countries)
- Central Europe Roadtrip (14d, 6 countries)
- Grand European Roadtrip (14-21d, 9 countries) — the biggest, treat as its own batch

**Rough effort read**: Tier 1's 4 routes are likely the most expensive per-route (no shortcuts),
Tier 2's 24 are the cheapest per-route by a wide margin (mostly a lookup + sanity-check job, not
fresh research), Tier 3's 7 sit in between. Don't assume "35 routes" is a uniform-sized backlog —
it's closer to "4 real research jobs + 24 quick checks + 7 medium checks."

## Workflow (reuses existing tools, nothing new to build for this part)

Per route or small batch, same discipline as every other content workstream in this repo (see
`CLAUDE.md`'s "Model selection for delegated subagents" and the `route-builder-content` skill):
1. Delegate to the `route-price-checker` agent (already exists, read-only, Sonnet) — for Tier 1
   give it the country cold; for Tier 2/3 also point it at the existing per-country data already
   verified elsewhere so it confirms/corrects against that instead of researching from zero.
2. Apply findings via the `route-builder-content` skill — update the route's content in
   `routeBuilderContent.js` if numbers changed, write an `rbMigrateX()` if the route's already
   seeded (per `CLAUDE.md`'s migration rule).
3. Flip `Verification Status` from `Draft` to `Verified` and bump `Last Verified (date)` in
   `TRIP_DATABASE.csv` for that row.
4. `node --check` on any touched JS file, commit (ask before pushing), report real token cost,
   ask before starting the next batch — small batches, not all 35 at once.

**Suggested batch order**: Tier 2 first (cheapest, builds momentum, 24 routes probably still wants
2-4 sub-batches), then Tier 3 (7 routes, maybe 2 sub-batches), then Tier 1 last (4 routes, but each
one is a real research job — do these individually or in a small pair).

## Separate, smaller piece: make Draft routes easier to find in the app

Not core to the verification work above, but the other half of what prompted this — right now a
Draft route looks identical to a Verified one everywhere except behind the filter panel. Cheap
follow-up, can be done independently of (before, during, or after) the batches above:
- A small "⚠️ N routes not yet verified" indicator on the Route Builder list page that
  jumps straight into the existing `Verification Status = Draft` filter (the filter itself already
  exists — `RB_TAXONOMY_FILTERS`'s `STATUS` axis in `routeBuilderUI.js`, no new filter needed).
- Optionally, a small badge on the route card itself (`rbBuildRouteCard()` in
  `routeBuilderUI.js`) next to the existing Budget/Trip Type/Best Time chips.

## What's next

1. Decide batch order/pace when picking this up (suggested order above, but Youri's call as
   always).
2. Work through Tier 2 → Tier 3 → Tier 1 in small batches per the workflow above.
3. Optionally build the "easier to find" UI piece at any point — it's independent of the
   verification work itself.
