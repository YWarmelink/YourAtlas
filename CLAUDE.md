# YourAtlas — CLAUDE.md

Personal travel dashboard. Vanilla HTML/CSS/JS, no build tools, no framework. Hosted on GitHub Pages. Part of the YourIntineryPlan ecosystem (sibling project: `youridealtravel`, a different app with its own CLAUDE.md).

For current feature status see [`README.md`](README.md). For history of fixes/corrections see [`CHANGELOG.md`](CHANGELOG.md). For the Route Builder content workflow, see the `route-builder-content` skill and `route-price-checker` agent in `.claude/`.

## File roles

```
js/config/users.js      ← User configuration (multi-user ready)
js/data/dataService.js  ← Single data abstraction layer
js/data/csvParser.js    ← CSV parser
js/utils/                ← Shared helpers (flags, dates, ISO country codes)
js/components/          ← Navbar + footer
js/pages/               ← Per-page logic — one file per page (routeBuilder.js is the largest)
data/youri/             ← Fallback JSON, used when the live Google Sheet is unreachable
```

One `.html` file per screen (`index`, `trips`, `route-builder`, `countries`, `map`, `itinerary`, `notes`, `trip`, `404`).

## Data flow

Live data is pulled from a public Google Sheets spreadsheet (CSV) via `dataService.js`. Falls back to the JSON snapshots in `data/youri/` if the sheet is unreachable.

**Route Builder is the exception**: its expeditions live entirely in `localStorage` (`atlas_grand_trips`, `atlas_route_blocks_library`) — not synced to the Sheet yet. See `ROUTE_BUILDER_SYNC.md` for the concrete plan to change that (new sheet tabs, Apps Script changes, client code).

## Route Builder architecture

Two ways a route's content is sourced, in `js/pages/routeBuilder.js`:
- **`RB_EXPEDITION_CONTENT`** — a flat content object, used when no country repeats across legs
- **a dedicated `rbBuildXRoute()` function** — used once a country appears more than once across separate legs (e.g. Canada/US six times, Italy four times) — a shape `RB_EXPEDITION_CONTENT` can't hold

Every route seeds into `localStorage` once, gated by its own flag, on first load — so adding a new route later still seeds it into existing browsers.

**The critical rule**: editing `RB_EXPEDITION_CONTENT` or a `rbBuildXRoute()` function only reaches browsers that haven't seeded that route yet. Any correction to an *already-seeded* route needs a one-time `rbMigrateX()` function too, that patches only the changed fields (never a blind overwrite, unless the change is a deliberate wholesale content replacement — see `CHANGELOG.md`'s Mediterranean Civilizations Expedition entry for that exception). This bit Youri once already — see the "critical migration fix" entry in `CHANGELOG.md` — 9 routes' corrections landed in source but not in his already-seeded browser data until a migration was added. The full procedure lives in the `route-builder-content` skill.

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
