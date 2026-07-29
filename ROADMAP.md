# Roadmap

Where this project is headed. For what already works, see `README.md`. For history, see `CHANGELOG.md`. For architecture/gotchas, see `CLAUDE.md`.

**Timing note (2026-07):** the bigger items below (youridealtravel merge, backend migration, multi-user, flight scraping) aren't expected to happen on a near-term evenings/weekends cadence — Youri's plan is to build these during a future sabbatical's pause periods (see "Sabbatical trip + personal project tracker page" below). Don't read urgency into how big this list is.

## Next up

- **Route Builder → Google Sheet sync** — routes currently only live in `localStorage`, so they don't follow Youri across devices/browsers. Full plan already written in `ROUTE_BUILDER_SYNC.md`. Next concrete step: add 4 new tabs (`GrandTrips`, `GrandTripRegions`, `GrandTripBlocks`, `GrandTripDestinations`) to the Google Sheet, publish each as CSV, then extend the Apps Script `doPost` for `GrandTrip*` payloads.

## Planned features

Agreed direction (2026-07 brainstorm), not yet designed or scheduled:

- **Visa/passport tracker** — visa info is already researched (by hand and via the `route-price-checker` agent) but currently just buried in free-text `notes` per country block. Turn it into a structured per-country field: visa type needed, obtained yes/no, expiry date — so it's an actionable checklist, not prose you have to re-read.
- **Universal search across trips/expeditions/notes** — with 13 expeditions full of long `notes` fields, plus the Trips sheet, "where was that tip about X" is already a real problem. Client-side text search over data that's already loaded (no new data source needed).
- **Visited-countries progress/badges** — gamify the existing Countries/Map tracker: % of world visited, continent-completion badges. Presentation over data that already exists.
- **Bucket-list counter across Route Builder expeditions** — a simple "X countries done, Y to go" tally across all 13 expeditions combined. Aggregation over existing data, no new fields.
- **Yearly travel recap** — a "wrapped"-style end-of-year summary (countries visited, km traveled, money spent, top trip), pulling from Trips + Countries + Route Builder together. Natural home is here since it spans all three, rather than in youridealtravel.

## Under consideration

- **Split Eurasia Grand Tour 🌏 into two expeditions** — it's ~11-12 months even after the time-realism audit. Candidate split: West-Eurasia through Central Asia, and East Asia/Southeast Asia through Indonesia. Not started, no date set.
- **Route-line map view precision** — currently one anchor coordinate per leg (straight segments, not real roads). Possible upgrades: per-destination coordinates for more accurate shapes, and/or a routing API for real-road paths. Not started.

## Long-term / someday

- **"Sabbatical" — its own new page** (2026-07, idea + name decided, not designed) — for Youri himself: stop working for a long period, travel extensively (year-trip scale, lots of countries), with built-in pause/build periods where he works on his own projects (this roadmap's items, and possibly others beyond just these two apps) and his portfolio/career strategy. Deliberately kept separate from the other two travel concepts already in the app, not folded into either:
  - **Trips** = realistic vacations, already taken or concretely planned
  - **Route Builder (Expeditions)** = aspirational, months-long bucket-list routes — pure travel fantasy, no career/build strategy attached
  - **Sabbatical** = the odd one out: travel is the format, but the actual subject is Youri's career/portfolio strategy — what to build, in what order, during which pause blocks. Don't let this page turn into a third flavor of "trip" — it needs its own building blocks (project/portfolio items, not just country legs), even where it borrows Route Builder's long-multi-stop-journey structure.
  - Not designed yet — revisit when actually ready to plan the sabbatical for real, not before.

- **Fold `youridealtravel` into YourAtlas as its ranking-engine mode** (decided direction, 2026-07 brainstorm — not yet designed or started):
  - **Goal is functional integration, not just a shared dataset** — the two apps should end up actually using each other's logic, not just reading the same Sheet.
  - **YourAtlas is the umbrella** — it already is the broader dashboard concept (Trips/Countries/Map/Route Builder); youridealtravel's budget/style/season trip-ranking engine becomes an additional mode inside it, not a rename or a from-scratch new identity.
  - **Sequencing: after the Route Builder Sheet-sync is done**, not alongside it — finish that as standalone work first, then pick this up seriously (both touch the Sheet schema, easier to design once rather than twice, but the sync shouldn't wait on the merge decision).
  - **Candidate integrations floated in the brainstorm, none decided yet** — deliberately left open rather than picked now:
    - Applying the ranking engine's season/budget fit-scoring (`countrySeasonScore`/`calcBudgetScore`) to Route Builder's country blocks
    - One shared traveler profile (budget, travel-style weights, season preference) instead of each part keeping its own settings
    - One shared "visited" status, sourced from YourAtlas' Countries/Map tracker, that the ranking engine reads instead of tracking it separately
  - Revisit this whole section properly once the sync work is done — don't start designing the merge itself before then.

- **Live flight-price scraping**, replacing the static low/mid/high season estimates in FLIGHTS with real current prices. Real value (estimates go stale, actual fares swing a lot), but a genuinely bigger step than it sounds: scraping needs to run somewhere other than the user's browser (a scheduled job, not client-side JS — CORS and rate-limits rule that out), and flight-search sites change their markup and sometimes prohibit scraping in their ToS, so it'd need real, ongoing maintenance rather than a one-time build. Depends on the backend-migration item below existing first, since there's nowhere to run a scheduled scraper without one.

- **Move off Google Sheets to a real backend** (2026-07 brainstorm, floated not decided) — instead of the Sheet-as-database model both apps use today, a real API + database. What this would actually unlock: somewhere to run the flight-price scraper above on a schedule, real multi-user support (auth + per-user data, instead of one shared Sheet), more complex queries than a Sheet formula can do. What it costs: this is the single biggest lift on this whole roadmap — real hosting instead of free GitHub Pages, an actual database schema migrated from the current Sheet tabs, a real API server to build and keep running, and losing today's biggest advantage: anyone (i.e. Youri) can fix a data row directly in the Sheet with zero deploy. Worth noting: Youri already has this exact stack (Python/FastAPI + Postgres via Prisma) built out for Hienfeld's VCC projects — if this is ever picked up for real, that's a ready-made pattern to copy rather than designing one from scratch. Not scheduled — needs its own dedicated design discussion before any work starts, likely after the youridealtravel merge above, since merging first means only migrating one combined schema instead of two.

  - **Multi-user profiles, once this backend exists** (2026-07 brainstorm): `js/config/users.js` already anticipates this — one config keyed by user id, each with their own data sources, plus a comment ("Future: read userId from localStorage / URL / auth token") that already flagged real auth as the next step. That was the lightweight "one Sheet per person" version; a real backend replaces it with one database and a `user_id` on trips/countries/preferences, with the reference catalog (COUNTRIES/FLIGHTS) staying shared/global rather than per-user.
    - **Start closed**: Youri creates profiles directly, no public sign-up. But don't design the user model so narrowly that open registration becomes a rewrite later — keep the door open for that as a v2, just don't build the sign-up flow now.
    - **Collaborative trips are fully co-edited** — both people on a shared trip can change anything, no owner/viewer split. For a small, trusted user base this doesn't need real conflict-resolution machinery — simple last-write-wins is probably good enough; only revisit if it actually causes problems in practice.
    - Migration note: Youri's current data becomes the first real user record, not a redesign from scratch.
