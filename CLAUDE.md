# YourAtlas — CLAUDE.md

Personal travel dashboard. Vanilla HTML/CSS/JS, no build tools, no framework. Hosted on GitHub Pages. Part of the YourIntineryPlan ecosystem (sibling project: `youridealtravel`, a different app with its own CLAUDE.md).

For current feature status see [`README.md`](README.md). For history of fixes/corrections see [`CHANGELOG.md`](CHANGELOG.md). For the Route Builder content workflow, see the `route-builder-content` skill and `route-price-checker` agent in `.claude/`. For which model to use when delegating work to a subagent, see "Model selection for delegated subagents" below.

## File roles

```
js/config/users.js      ← User configuration (multi-user ready)
js/data/dataService.js  ← Single data abstraction layer
js/data/csvParser.js    ← CSV parser
js/utils/                ← Shared helpers (flags, dates, ISO country codes)
js/components/          ← Navbar + footer
js/pages/               ← Per-page logic — one file per page, except Route Builder (see below)
data/youri/             ← Fallback JSON, used when the live Google Sheet is unreachable
```

One `.html` file per screen (`index`, `trips`, `route-builder`, `countries`, `map`, `itinerary`, `notes`, `trip`, `404`).

## Data flow

Live data is pulled from a public Google Sheets spreadsheet (CSV) via `dataService.js`. Falls back to the JSON snapshots in `data/youri/` if the sheet is unreachable.

**Route Builder is the exception**: its expeditions live entirely in `localStorage` (`atlas_grand_trips`, `atlas_route_blocks_library`) — not synced to the Sheet yet. See `ROUTE_BUILDER_SYNC.md` for the concrete plan to change that (new sheet tabs, Apps Script changes, client code).

## Route Builder architecture

Route Builder is split across **4 files**, loaded in this order via `route-builder.html`'s
`<script>` tags (split 2026-08 for context-efficiency reasons — pure reorganization, verified
behaviorally identical to the old single file via an automated equivalence harness; no logic
changed):
- **`js/pages/routeBuilderCore.js`** — global state, config/flags, tiny cross-cutting helpers
  (`rbLoad`/`rbSave`, ID generators, etc). Loads first.
- **`js/pages/routeBuilderContent.js`** — `RB_EXPEDITION_CONTENT`, every `rbBuild*Route()`,
  `rbSeed*()` and `rbMigrate*()` function. **This is the only file Route Builder content work
  (translations, new routes, corrections) needs to touch.**
- **`js/pages/routeBuilderUI.js`** — all rendering/event-binding code (list, editor, calendar,
  map views). Reads only `rbRoutes` (already seeded/migrated), never touches
  `RB_EXPEDITION_CONTENT` directly.
- **`js/pages/routeBuilder.js`** (kept small, ~100 lines) — just the `DOMContentLoaded`
  orchestration: the seed calls then the migration calls, in their exact original,
  load-bearing order. The single most order-sensitive piece in Route Builder — review this file
  in isolation before touching migration call order.

Two ways a route's content is sourced, in `routeBuilderContent.js`:
- **`RB_EXPEDITION_CONTENT`** — a flat content object, used when no country repeats across legs
- **a dedicated `rbBuildXRoute()` function** — used once a country appears more than once across separate legs (e.g. Canada/US six times, Italy four times) — a shape `RB_EXPEDITION_CONTENT` can't hold

Every route seeds into `localStorage` once, gated by its own flag, on first load — so adding a new route later still seeds it into existing browsers.

**The critical rule**: editing `RB_EXPEDITION_CONTENT` or a `rbBuildXRoute()` function only reaches browsers that haven't seeded that route yet. Any correction to an *already-seeded* route needs a one-time `rbMigrateX()` function too (added to `routeBuilderContent.js`, called from `routeBuilder.js`'s orchestration block), that patches only the changed fields (never a blind overwrite, unless the change is a deliberate wholesale content replacement — see `CHANGELOG.md`'s Mediterranean Civilizations Expedition entry for that exception). This bit Youri once already — see the "critical migration fix" entry in `CHANGELOG.md` — 9 routes' corrections landed in source but not in his already-seeded browser data until a migration was added. The full procedure lives in the `route-builder-content` skill.

**Trip Taxonomy tag filters** (2026-08, see `CHANGELOG.md`'s "Phase 3 shipped" entry): the route list reads `TRIP_DATABASE.csv` directly (`rbLoadTaxonomy()` in Core, fetched client-side — it's a static repo file, not a Sheet source, so it bypasses `dataService.js`) and joins each row to its route by name via `rbTaxonomyKey()`, which strips trailing emoji before comparing — a real join-key mismatch, not a defensive nicety, since a lot of the CSV's names were tagged before their route's emoji existed. `RB_TAXONOMY_FILTERS` in `routeBuilderUI.js` defines the 17 filter dropdowns; ~22 built routes still don't join (old un-translated Dutch route names, plus a handful of CSV-vs-route day-count drift) — see the CHANGELOG entry before assuming every route is filterable.

## Standalone single-country routes — long-haul flight buffer policy

Since 2026-08, some of Route Builder's expeditions have standalone single-country companion
routes split off them (see `ROUTE_BUILDER_MODULES.md` for the candidate list, `CHANGELOG.md` for
what's been built so far). Their `days`/`budget` are reused unchanged from the parent expedition
— but that count was calibrated for a leg *inside* a bigger multi-country tour (arriving overland
from a neighbour, continuing on afterwards), not for a standalone flight-in-from-NL-and-back trip.

**The policy**: leave `days` unchanged by default (that's the whole point of reusing verified
data) — only add a **+2 day buffer** when a route's round-trip flight time is large relative to
its own trip length, specifically when either:
- the trip itself is short (roughly ≤10 days) **and** the flight has a connection (not direct), or
- the flight itself is unusually long/multi-stop (roughly 24+ hours total), regardless of trip length.

A direct or short flight (e.g. Marokko/Sicilië, ~3-4h direct) doesn't need this even at 10 days —
there's no meaningful dead time to buffer against. Applied so far: **Jordanië 🏺** (8→10 days —
short trip + a connecting flight) and **Nieuw-Zeeland Zuidereiland 🏔️** (21→23 days — 27-38h with
multiple stops, even though the trip itself is already reasonably long). Considered and left
unchanged: Suriname 🛶 (11d, but a direct 9h20 flight, no connection dead-time), Vietnam 🛵/Cuba 🎷
(17-18d with one connection each — long enough to absorb it), Namibië 🏜️ (20d despite no direct
flight — already generous). Budget is a **daily rate**, not a trip total, so bumping `days` alone
is correct — no budget math needed. Apply the same 2-day-buffer check to any future single-country
route before shipping it, rather than always defaulting to leaving it as-is.

## Model selection for delegated subagents

This governs which model to pass when *delegating* work to a subagent (the Agent/Task tool's
`model` option, or an agent file's own `model:` frontmatter — see `.claude/agents/route-price-checker.md`,
already pinned to `model: sonnet`). It does not change the model running the main conversation —
that's the user's own choice.

**Default rule: use the cheapest model that can reliably complete the delegated task. Escalate to
Sonnet on any real uncertainty. Never trade correctness, consistency, or maintainability for token
savings.**

**Use Sonnet (the default for nearly all delegated work in this repo) for:**
- Any Route Builder content batch — Dutch→English translation, Trip Taxonomy tagging, route-logic
  review, price/visa/travel-advisory verification. **These look mechanical but this repo's own
  history says otherwise**: every batch of this kind run so far (7 translation batches, 43 tagging
  batches, 13 route-logic/price-verification passes — see `CHANGELOG.md` and `README.md`'s batch
  logs) has surfaced real judgment calls — migration-guard collisions needing cross-file reasoning,
  budget-tier overrides for outlier countries (Switzerland/Norway/Iceland), live safety/advisory
  findings, wrong pre-stated item counts, ambiguous "is this name already English?" calls. Treat
  "translate/tag this batch" as Sonnet-tier by default — don't downgrade it just because the
  surface task sounds like rote translation or classification.
- Architecture decisions, route-building/route-optimization logic, anything involving geography,
  seasonality, travel time, budget, trip duration, region synergy, or destination compatibility.
- Multi-file reasoning, non-trivial debugging, or any change requiring the migration-collision
  check above.
- WebSearch-backed research (`route-price-checker` already reflects this).

**Haiku is appropriate only for a narrow slice of genuinely mechanical sub-steps** — usually nested
*inside* a larger Sonnet-run batch, not as the whole batch:
- Running/reporting a fixed, no-interpretation-needed check (`node --check`, a grep for a known
  fixed list of leftover-Dutch markers).
- Applying an already-fully-specified, unambiguous edit list a Sonnet pass already produced (i.e.
  executing a given list, not deciding what belongs on it).
- Low-stakes formatting/renaming where a wrong guess is cheap to spot and fix.

**Escalation rule**: if there's meaningful doubt whether Haiku can do it reliably, use Sonnet — do
not treat this policy as license to reach for Sonnet on every trivial thing either. The goal is
quality + correctness + consistency + efficiency together, not minimizing tokens or always using
the strongest model.

**Splitting a large batch by model is fine, but only once a sub-step is actually shown to be
fully-specified and low-judgment**: Sonnet designs the approach/migration shape, Haiku executes the
confirmed-mechanical remainder, Sonnet validates and handles edge cases. Don't assume a step
qualifies for that split just because it superficially resembles "repetitive execution" — the
Route Builder batches above are the recurring counterexample.

## Context efficiency

Goal: **minimum sufficient context, not minimum possible context.** Never skip context a task
genuinely needs — but don't default to reading whole files "just in case" either. This repo has a
few files large enough that a blind full read is wasteful:

- **`js/pages/routeBuilderContent.js` (800KB+/9,000+ lines) — never `Read` it whole.** Grep for
  the target route's name or `rbBuild*Route`/`rbMigrate*` function first, then read only that
  function's line range (`offset`/`limit`). This is true for both editing one route and for any
  subagent you delegate route work to — hand it the exact function names/line numbers you already
  found instead of letting it rediscover the file from scratch. Route Builder content work never
  needs `routeBuilderUI.js` or `routeBuilderCore.js` — those are engine/UI, not route content (see
  "Route Builder architecture" above).
- **`EUROPA_TRIP_IDEAS.md` (2,800+ lines) and `TRIP_DATABASE.csv` (450+ rows) — read the relevant
  section/rows, not the whole file.** Both are organized by named country/batch sections — grep
  for the section heading or row you need.
- **`CHANGELOG.md` and `README.md`** — grep for the relevant `##`/`###` heading before reading the
  whole file. `README.md` in particular carries deep historical batch-by-batch narrative for
  several finished/in-progress workstreams (Europa Trip Ideas, Trip Taxonomy, Route Builder
  English conversion) that a task about something else doesn't need.
- **One route at a time, by default.** Working on a specific expedition/route doesn't require
  inspecting every other route — load another route only for an explicitly-needed reason
  (dedup, regional comparison, a shared-content-dict cascade check). Don't reload a route's
  content you've already read earlier in the same task.
- **Engine development vs. using the engine are different scopes.** Changing how routes are
  built/rendered (shared helpers like `rbBuildSeedRoute`, `rbContentFor`, the migration mechanism
  itself) may genuinely need broader context. Building or editing one route's content doesn't —
  load that route's own function(s) plus whichever shared dict entry it pulls from, nothing more.
- This complements, not replaces, "Model selection for delegated subagents" above — using Sonnet
  for a task is never a substitute for reading only what that task needs.

## Known gotchas / design decisions

- **`[hidden]` needs `!important` in `css/base.css`** — some panels (`.loading-spinner`, `.rb-calendar-panel`, `.rb-map-panel`) have explicit `display: flex`/`grid` rules that beat the browser's default `[hidden] { display: none }` when JS sets `el.hidden = true`. Fixed with a global `[hidden] { display: none !important; }` rule — don't remove it or re-introduce a plain `display:` override on a togglable panel without checking this.
- **Regional Blocks only hold together while contiguous** — a Regional Block is just a label on whichever countries currently sit next to each other in the sequence. Moving one country out of the middle (↑/↓) splits that region into two visually separate groups with the same name. Not a bug.
- **Country dropdown depends on the live Countries sheet** — a country not yet in that sheet still works fine in a Route Builder block (name/flag are stored directly on the block), but its dropdown shows as unselected until the sheet catches up. Cosmetic only.
- **Isle of Man, Jersey and Guernsey don't highlight on the World map view** — `js/utils/isoCountries.js`'s `ISO_NUM` lookup covers ISO 3166-1 sovereign-state codes from the world-atlas topojson dataset, which doesn't include these three British Crown Dependencies. Everything else about their blocks works fine. Cosmetic only.
- **Route-line map view** draws one anchor coordinate per leg (`block.lat`/`lng`), not per destination — multi-city legs collapse to a single point, and the line is straight segments, not real roads. Deliberate simplification, not a bug; see README's "Future plans" for the potential upgrade path.
- **Route Builder vs. Trips sheet overlap is accepted, not deduped** — Route Builder expeditions are epic/aspirational trips, the Trips sheet holds realistic plannable vacations; some countries/regions legitimately appear in both and that's fine as-is.

## Conventions

- Fictitious/personal data only where relevant — this is Youri's own personal travel data, not shared/multi-tenant (though `js/config/users.js` is structured to allow more users later)
- No `fetch()` to anything except the published Google Sheet CSV endpoint and (for Route Builder, once wired up) the Apps Script endpoint described in `ROUTE_BUILDER_SYNC.md`
- No frameworks, no build step, no TypeScript — stays double-click/GitHub-Pages-deployable
