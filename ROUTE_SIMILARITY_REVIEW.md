# Route similarity review — decide after all Phase 2 batches are built

Youri's instruction (2026-08-21): keep building all Phase 2 routes, but track every case where a
new `EUROPA_TRIP_IDEAS.md`-derived route covers essentially the same destination/scope as an
existing pre-Phase-2 expedition-family splitroute. Don't resolve/merge/delete anything now — just
list them here with enough detail (function names, day/budget counts, line numbers) to review once
all 319 items are done, then decide per pair: keep both, delete one, merge, or rename.

Current safety-net in place for every pair below: the new route always has a **different function
name** and a note cross-referencing the existing one as "shorter realistic version, not a
duplicate" — nothing has been deleted or merged, this file is the decision log for later.

## How to look one up

`grep -n "^function <name>" js/pages/routeBuilderContent.js` — gives the line number, then read
from there.

## Confirmed pairs so far (batches 1-13)

| # | New route (Phase 2) | Existing route (pre-Phase-2 family) | How similar? |
|---|---|---|---|
| 1 | **Malta (4 days) 🌅** — `rbBuildMaltaFourDaysRoute` (batch 6) | **Malta ⚔️** — `rbBuildMaltaRoute`, Mediterranean Civilizations split, 5 days/€375 | Same island, same "just Malta" scope, nearly identical length (4 vs 5 days). **Worth a close look** — one of the closer pairs on this list. |
| 2 | **Corsica + South of France (9 days) 🛳️** — `rbBuildCorsicaSouthOfFranceNineDaysRoute` (batch 6) | **Corsica & Southern France ⛵** — `rbBuildCorsicaSouthFranceRoute`, 11 days total (5d Corsica: Bonifacio/Ajaccio/Bavella + 6d Provence: Marseille/Arles/Nîmes/Pont du Gard), one-way | Same two-region combo (Corsica → South of France), similar length (9 vs 11 days). Check whether the new one's itinerary is genuinely different enough (different Corsica towns / different Provence stops) or just a shorter re-tread. |
| 3 | **Cyprus (6 days) 🏝️** — `rbBuildCyprusClassicRoute` (batch 10) | **Cyprus 🕊️** — `rbBuildCyprusRoute`, Mediterranean Civilizations split, 5 days/€400 | Same country, near-identical length (6 vs 5 days). **Closest pair on this list** — almost certainly worth consolidating into one, or clearly differentiating what each one is *for* (e.g. one keeps Northern Cyprus, one doesn't). |
| 4 | **Svalbard (Longyearbyen) (6 days) 🌌** — `rbBuildSvalbardShortRoute` (batch 11a) | **Svalbard 🐻‍❄️** — `rbBuildSvalbardRoute`, Nordic Arctic Expedition split — note: this one was *already* shortened at Youri's own request from an 8-day/€3,725 expedition-boat trip down to a 4-day/€900 "Longyearbyen + 1-2 day tours" version | Both are now the "short realistic Longyearbyen" concept — the subagent's assumption that the existing route was still the "epic" version turned out to be wrong, it had already been shortened once before. **Likely the most redundant pair on this list — same idea built twice.** |
| 5 | **Faroe Islands (6 days) 🐦** — `rbBuildFaroeIslandsShortRoute` (batch 11c) | **Faroe Islands 🐑** — `rbBuildFaroeIslandsRoute`, Nordic Arctic Expedition split, days carried over unchanged from the original expedition split (not obviously "epic" — worth checking its actual day count directly) | Same island group. Check the existing route's actual scope before assuming it's meaningfully longer/different — same caveat as Svalbard above. |
| 6 | **Iceland Ring Road (12 days) 🛣️** — `rbBuildIcelandRingRoadRoute` (batch 11c) | **Iceland ❄️** — `rbBuildIcelandRoute`, Nordic Arctic Expedition split, described as "one of the most-booked standalone trips in the world" — days carried over unchanged from the original expedition split | Same country, similar full-loop concept (Golden Circle + south coast + Vatnajökull + Snæfellsnes by rental car). Also relevant: batch 11c added 4 *more* Iceland routes (Reykjavík + Golden Circle, South Iceland, Iceland South Coast, Iceland Extended) that are shorter subsets of this same Ring Road concept — worth reviewing the whole Iceland cluster (5 new + 1 existing = 6 Iceland routes total) together, not just this one pair. |
| 7 | **Ireland Complete (10-14 days) 🌈** — `rbBuildIrelandCompleteRoute` (batch 12a) | **Ireland ☘️** — `rbBuildIrelandRoute`, British Isles & Celtic Coast split, 22 days total (Donegal/Connemara/Galway/Cliffs of Moher/Wild Atlantic Way/Dingle/Ring of Kerry/Killarney/Cork/Kilkenny) | Same country, but existing is roughly double the length — probably the least redundant pair on this list, likely fine to keep both (a realistic 2-week trip vs. a full month-long expedition leg). |
| 8 | **Scotland Extended (10-14 days) 🏴** — `rbBuildScotlandExtendedRoute` (batch 12a) | **Scotland & Northern Ireland 🥃** — `rbBuildScotlandNorthernIrelandRoute`, British Isles & Celtic Coast split, 22+ days total across multiple legs (Edinburgh/Cairngorms/Glencoe/Glenfinnan/Skye/Applecross/partial NC500/Loch Ness + Belfast/Giant's Causeway) | Similar situation to #7 — existing route covers meaningfully more ground (Scotland *and* Northern Ireland combined) and is much longer. Probably fine to keep both. |
| 9 | **Northern Ireland (Belfast + Giant's Causeway) (5-7 days) 🌉** — `rbBuildNorthernIrelandRoute` (batch 12b) | The Northern Ireland *leg* of **Scotland & Northern Ireland 🥃** — `rbBuildScotlandNorthernIrelandRoute` (5 days/~£/€510 for that leg specifically) | Near-identical scope (Belfast + Giant's Causeway) and near-identical length (5-7 vs 5 days) — but the existing one is only a *leg* of a bigger route, not its own standalone Northern Ireland trip. **Worth checking whether a standalone Northern Ireland route is actually missing today** (i.e. this new one might be filling a real gap, not duplicating). |
| 10 | **England + Wales + Northern Ireland Roadtrip (10-14 days) 🛣️** — `rbBuildEnglandWalesNorthernIrelandRoadtripRoute` (batch 12b) | **England, Wales & Isle of Man 🎩** — `rbBuildEnglandWalesIoMRoute`, British Isles & Celtic Coast split, 10+ days across multiple legs (Kent/London/Cotswolds/Bath/Jurassic Coast → Cornwall → Pembrokeshire/Brecon Beacons/Snowdonia/Conwy → Lake District+Isle of Man → Yorkshire/Northumberland) — **and** overlaps again with the Northern Ireland leg of `rbBuildScotlandNorthernIrelandRoute` (see #9) | Double overlap: shares England+Wales content with one existing route and Northern Ireland content with another. The existing England/Wales/IoM route is much bigger in scope (adds Isle of Man, Lake District, Yorkshire, Northumberland) — probably fine to keep both, but flagging since it's the only new route that touches two different pre-existing routes at once. |

## Confirmed pairs, batch 14 (islands)

| # | New route (Phase 2) | Existing route | How similar? |
|---|---|---|---|
| 11 | **Sardinia Roadtrip (7-10 days) 🏝️** — `rbBuildSardiniaRoadtripRoute` (batch 14c) | **Sardinia (9 days) ⛵** — `rbBuildSardiniaNineDaysRoute`, a Phase 2 batch 5 (Italy) route: Olbia/Costa Smeralda → Cala Gonone/Golfo di Orosei → Barumini/Cagliari → west coast/Alghero | **Same-workstream duplicate, not a Phase-1-family collision** — this is the first pair where BOTH routes came from Phase 2 itself (batch 5 built one, batch 14 built a near-identical second one at almost the same length: 7-10 vs 9 days). Also worth checking against **Sardinia 🗿** (`rbBuildSardiniaRoute`, a Mediterranean Civilizations split, 6+ days). **Probably the strongest case on this whole list for actually merging/deleting one.** |
| 12 | **Sicily Roadtrip (7-10 days) 🏝️** — `rbBuildSicilyRoadtripRoute` (batch 14c) | **Sicily (9 days) 🍋** — `rbBuildSicilyNineDaysRoute`, a Phase 2 batch 5 (Italy) route: Palermo → Cefalù → Agrigento/Valle dei Templi → (continues east) | Same situation as #11 — same-workstream near-duplicate (7-10 vs 9 days, overlapping stops: Palermo, Agrigento, Etna/Taormina, Syracuse appear in both). Also worth checking against **Sicily 🌋** (`rbBuildSicilyRoute`, Mediterranean Civilizations, 10 days) and **Sicily + Southern Italy (12 days) 🍊** (`rbBuildSicilySouthernItalyRoute`, batch 5). **Same "probably merge" flag as #11.** |
| 13 | **Crete Roadtrip (7-10 days)** — batch 14d, not yet built as of this writing | **Greece & Crete 🫒** — `rbBuildGreeceCreteRoute`, Mediterranean Civilizations split, 19 days total (12d mainland Greece + 7d Crete: Heraklion/Knossos/Chania/Samaria Gorge/Elafonisi) | Real overlap on the Crete leg specifically (Heraklion, Knossos, Chania, Samaria Gorge all shared) — but the existing route bundles Crete with 12 days of mainland Greece, it's not a standalone Crete trip. `EUROPA_TRIP_IDEAS.md`'s own intro note claims Crete "never got its own item" in the taxonomy source, which is true for that document, but doesn't account for this pre-existing Route Builder splitroute. Will confirm resolution once batch 14d is actually built. |

## Batches not yet checked

Batch 14 (🏝️ Europese eilanden — Madeira/Azores/Canary Islands/Balearics/Isle of Man/Jersey &
Guernsey) is starting next and has a known risk: Isle of Man/Jersey/Guernsey may already appear in
the British Isles & Celtic Coast family's "Channel Islands/Brittany/Normandy/Opal Coast/Belgium"
splitroute — will be added here if confirmed. Batches 15-21 not yet started.
