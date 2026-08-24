# Changelog

History of fixes, corrections and content builds for YourAtlas. Newest first. For current architecture/conventions see [`CLAUDE.md`](CLAUDE.md); for current feature status see [`README.md`](README.md).

## Route naming history

Three rounds of renames/overhauls, all applied retroactively by one-time migrations in `js/pages/routeBuilder.js` so they also land on routes already seeded into a browser, without touching any fields already hand-edited (except the third, which is a deliberate wholesale content replacement, not a field patch):

- `rbMigrateExpeditionRenames()` — "Middle East & Africa Expedition" became **Africa Grand Tour**, with Jordan and Oman moved out to **Ancient Civilizations Expedition** (which already had its own Jordan/Oman entries), so that route is purely African countries plus Egypt as the historical/geographic gateway — Egypt still appears in both since it fits both themes. "Arctic Circle Expedition" and "Himalaya & India Expedition" were renamed to "Nordic Arctic Expedition" and "India & Himalaya Expedition" (country lists unchanged for both).
- `rbMigrateExpeditionEmojiNames()` — added the emoji suffix to all eight then-existing routes, and renamed "Ancient Civilizations Expedition" to "North Africa & Middle East Expedition 🏜️" for a name that says which region it actually covers (same seven countries: Morocco, Tunisia, Egypt, Jordan, Oman, UAE, Cyprus).
- `rbMigrateAncientToMediterranean()` — replaces that same route entirely with **Mediterranean Civilizations Expedition 🏛️**, a much larger 18-leg route from Andalusia to Qatar. Unlike the two renames above, this isn't a field patch: the country list, region grouping and every block's content are all new, so the migration removes the old route and inserts the new one wholesale.

## Recently fixed

- **ROUTE_SIMILARITY_REVIEW.md: review-order plan drawn up, not yet acted on (2026-08-24)** — with
  Phase 2 complete and all 48 pairs logged, Youri asked for the 48 findings ranked from least to
  most similar so he can work through them starting with the safest "probably no action needed"
  cases before reaching the real keep-vs-merge decisions. Ranked by re-reading every pair's existing
  "how similar?" note (no new comparison work done, no route touched) into 6 bands:
  - **Band 1 — genuine gaps / confirmed distinct**: #41 (French+Spanish Pyrenees, no existing
    coverage), #7 (Ireland Complete vs Ireland 22d), #8 (Scotland Extended vs Scotland & N.
    Ireland), #22 (Slovenia+Croatian Istria vs Slovenia+N.Croatia, different Croatian region), #43
    (Norway+Sweden Fjords&Capitals vs Sweden+Norway, no shared stops).
  - **Band 2 — confirmed different despite a similar title**: #30 (Hungary+Austria+Slovenia), #33
    (Central Europe Roadtrip 14d vs the 45-70d flagship), #38 (France+Switzerland+Italy), #39
    (Alpine Roadtrip, 5 countries), #42 (Portugal+Spain: Porto to Madrid), #44 (Denmark+Sweden+
    Norway Overland), #9 (Northern Ireland, Belfast+Causeway), #10 (England+Wales+NI Roadtrip).
  - **Band 3 — real but partial overlap, distinct purpose/shape**: #13 (Crete Roadtrip), #18
    (N.Portugal+Galicia), #20 (Portugal+Andalusia), #21 (Portugal+Spain Roadtrip 14d), #25
    (Slovenia+Croatia+Bosnia), #27 (Grand Balkan Roadtrip), #28 (Adriatic Roadtrip), #34
    (Germany+Austria+Italy), #45 (N.Europe Baltic Ferry Roadtrip), #46 (Balkan Roadtrip:
    Serbia+NMac+Albania+Kosovo), #47 (Southern Europe Highlights Roadtrip), #2 (Corsica+South of
    France), #5 (Faroe Islands).
  - **Band 4 — meaningfully close, worth a real look**: #15 (Cyclades Island Hopping), #19
    (Porto+Northern Spain), #23 (Croatia+Bosnia via Split), #26 (Slovenia+Croatia+Montenegro
    Coast), #31 (Poland+Slovakia+Hungary), #32 (Czechia+Austria+Hungary), #36
    (Austria+Slovenia+Croatia).
  - **Band 5 — high overlap / heavy direct content reuse**: #1 (Malta 4d vs 5d), #6 (Iceland Ring
    Road — plus a whole 5-route Iceland cluster worth reviewing together), #14 (Cyclades vs Greek
    Islands: Paros/Naxos/Santorini), #16 (Jersey+Guernsey), #17 (Isle of Man), #24
    (Bosnia+Montenegro+Budva), #35 (Germany+Austria+Slovenia), #37 (Italy+Slovenia+Croatia), #48
    (Grand European Roadtrip — the file's own "strongest 3-way overlap" call-out).
  - **Band 6 — near-total duplicates, review last (the real keep-vs-merge decisions)**: #3 (Cyprus
    6d vs 5d), #4 (Svalbard), #11 (Sardinia Roadtrip vs Sardinia 9d), #12 (Sicily Roadtrip vs
    Sicily 9d), #29 (Austria+Slovenia via Grossglockner), #40 (Andorra+Spanish Pyrenees: Grand
    Circuit) — the file's own text already flags all six of these as its closest/most-redundant
    pairs.
  **Nothing merged, deleted, or renamed** — Youri will work through this list at his own pace in a
  future session; this entry exists so the ranking survives even if `ROUTE_SIMILARITY_REVIEW.md`
  itself gets edited/reorganized once decisions start getting made.

- **Europa Trip Ideas: all 15 batches of `EUROPA_TRIP_IDEAS.md` complete (2026-08)** — Youri's raw list of realistic European trips (long weekend to ~3 weeks) grew from ~230 items to ~300 (micro-states, Cyprus/Malta/Moldova/Kosovo/Corsica/Turkey's European part, a new "Europese eilanden" category) to a final 319 across three extension rounds. Batches 1-8 (Benelux, Duitsland, Oostenrijk+Zwitserland, Frankrijk, Italië, micro-states & small islands, Iberië, Balkan-cluster) each got 2-3 parallel WebSearch research agents before writing (standard practice from batch 2 on), surfacing real corrections: the Bayeux Tapestry is on loan to the British Museum from Sept 2026, unviewable in Bayeux itself; the Croatia-Bosnia Neum coastal corridor now bypasses the old double-border-crossing via the Pelješac bridge (open since July 2022); the EU's Entry/Exit System (EES, fully live since 10 April 2026) adds real biometric-registration wait times at Balkan borders, worst at Croatia-Montenegro (Karasovići, 2-5h in July/Aug); Kosovo items are deliberately combined only with North Macedonia/Albania/Montenegro, never Serbia, since Serbia doesn't recognize Kosovo border crossings. Batches 9-11 (Centraal/Oost-Europa, Oost-Mediterraan, Noord-Europa): Romania and Bulgaria became fully Schengen (land borders included) on 1 January 2025; Bulgaria adopted the euro on 1 January 2026; the Moldova+Transnistria item carries its own red Dutch travel advisory (stricter than Moldova proper), handled with an explicit mitigation (day-trip only, no overnight, check insurance) rather than a rubber-stamped inclusion; Gellért thermal bath in Budapest is closed for renovation (Oct 2025-~2028, items route through Széchenyi instead); Auschwitz-Birkenau requires online-only booking since March 2026; Greece carries a yellow Dutch advisory since Aug 2026 for active wildfires (70+ simultaneous, incl. Crete and the Athens region); Cyprus is EU-but-not-Schengen and rental cars from the Republic side usually can't cross into Northern Cyprus without separate Turkish border insurance; Hagia Sophia's upper gallery closes 5x/day for prayer as a working mosque again. Batches 12-15 (Britse eilanden, Baltische staten, 🏝️ Europese eilanden, combinatiesecties): the UK ETA fee rose £16→£20 (~€23-24) on 8 April 2026 and applies to Northern Ireland even when crossing overland from the Republic (Ireland itself needs no ETA at all — Common Travel Area is separate from Schengen); Skye is bridge-connected (free since Dec 2004) while Orkney/Shetland/Outer Hebrides genuinely need a ferry; the UK ETA was extended to cover Jersey/Guernsey/Isle of Man from 23 April 2026; Condor Ferries rebranded (Jersey route → DFDS, Guernsey route → Brittany Ferries, March 2025); Santorini tightened its 2025-2026 cruise-passenger cap; a stale intro note claiming Crete was already covered under the Griekenland batch turned out wrong on inspection, so the batch-14 "Kreta roadtrip" item fills a real gap rather than duplicating one. **Decided: these become Route Builder routes, not Trips entries** (per `ROADMAP.md`'s "commitment, not scale" rule for the Trips↔Route Builder split) — conversion into real `rbBuildXRoute()` code is tracked separately under the Route Builder English-content workstream (see README, Phase 2).

- **Route Builder English content: Phase 2 batches 1-13 done, 255/319 EUROPA_TRIP_IDEAS.md items
  converted to real `rbBuildXRoute()` code (2026-08)** — see README's "Phase 2" section for current
  status/next-batch pointer; this entry is the detailed batch-by-batch history moved out of the
  README to keep it a short resumable pointer, same pattern as Phase 1's history below.
  **Batches and real token costs**: #1 Benelux 6 routes, #2 Germany 12, #3 Austria+Switzerland 12,
  #4 France 11, #5 Italy 16 (costs not captured, session ended before README was updated); #6
  micro-states & small islands 20 routes/147,117 tokens; #7a Spain 15/108,931, #7b Andorra+Portugal
  11/118,767; #8a Croatia+Slovenia 13/121,168, #8b Bosnia+Montenegro+Albania 16/106,696, #8c
  Serbia+N.Macedonia+Kosovo 16/114,723 (batch 8's 45-item "Balkan-cluster" split into 3
  geography-based sub-batches instead of the originally planned 2 halves, once the real item count
  came in higher than expected); #9a Romania+Bulgaria+Moldova 15/98,036, #9b Hungary+Czechia
  10/94,799, #9c Slovakia+Poland 10/91,616 (batch 9's 35-item "Centraal/Oost-Europa" also 3-way
  split); #10 Greece+Cyprus+Turkey 17/129,664 (done as one single batch); #11a Norway+Sweden
  15/129,909, #11b Denmark+Finland 10/102,262, #11c Faroe Islands+Iceland 7/99,848 (batch 11's
  32-item "Noord-Europa" also 3-way split); #12a Ireland+Scotland 12/132,091, #12b England+Wales+
  Northern Ireland 5/98,723 (batch 12's 17-item "Britse eilanden" split in 2); #13 Baltic States 6
  routes/76,446. All real per-item costs land at or under the original 9,000-16,000/item estimate
  except batch 12b, whose ~19,745/item cost came specifically from resolving 3 simultaneous
  collisions, not wasted exploration.
  **Real name-collision pattern, recurring across batches 6/10/11/12**: several EUROPA_TRIP_IDEAS.md
  items cover the same destination as an existing Route Builder expedition-family splitroute, but as
  a deliberately shorter/more realistic "Trip Ideas" version rather than a duplicate. Every time this
  happened, the fix was the same: a distinct function name (never reusing the existing route's own
  function name), and an explicit note in the new route's own text cross-referencing the existing
  route as "the epic/longer version, this is the shorter realistic version, not a duplicate" — the
  pre-existing route itself is never touched. Confirmed instances: batch 6's "Malta (4 days)" vs. the
  Mediterranean Civilizations family's "Malta ⚔️"; "Corsica + South of France (9 days)" vs. "Corsica &
  Southern France ⛵"; batch 10's "Cyprus (6 days)" (`rbBuildCyprusClassicRoute`) vs. "Cyprus 🕊️"
  (`rbBuildCyprusRoute`); batch 11's cluster against the **Nordic Arctic Expedition ❄️** family, which
  already had standalone splitroutes for Svalbard, Faroe Islands AND Iceland — new
  "Svalbard (Longyearbyen) (6 days)" (`rbBuildSvalbardShortRoute`), "Faroe Islands (6 days)"
  (`rbBuildFaroeIslandsShortRoute`), and "Iceland Ring Road (12 days)" (`rbBuildIcelandRingRoadRoute`)
  all needed this treatment; batch 12's cluster against the **British Isles & Celtic Coast** family,
  where all three of its splitroutes collided at once — `rbBuildIrelandRoute` ("Ireland ☘️"),
  `rbBuildScotlandNorthernIrelandRoute` ("Scotland & Northern Ireland 🥃"), and
  `rbBuildEnglandWalesIoMRoute` ("England, Wales & Isle of Man 🎩") — against new items "Ireland
  Complete (10-14 days)", "Scotland Extended (10-14 days)", "Northern Ireland (Belfast + Giant's
  Causeway) (5-7 days)", and the England+Wales+NI roadtrip item. No Phase 2 batch has ever needed an
  `rbMigrateX()` migration — every route is brand new, so there's nothing pre-existing to patch.
  **Cross-batch coordinate consistency** was maintained deliberately by having each new batch grep
  for destinations a prior batch already coordinate-established and reuse those exact lat/lng values
  rather than re-deriving them — e.g. batch 8c reused batch 8b's Sarajevo/Kotor/Tirana/Berat
  coordinates, batch 9c reused batch 9b's Budapest/Eger/Krakow/Wrocław coordinates, batch 11b reused
  batch 11a's South Sweden (Skåne) coordinates, batch 12b reused batch 12a's/the existing family's
  Belfast and Giant's Causeway coordinates, batch 13 reused batch 9c's Warsaw/Gdańsk coordinates.
  **Real safety/political nuances preserved intact, not softened, across several batches**: Kosovo's
  routes (batch 8c) carry the practical Serbia-then-Kosovo border-entry order rule (Serbia doesn't
  recognize Kosovo border crossings as official, which is why no item ever combines the two);
  Moldova + Transnistria (batch 9a) carries the full red-vs-yellow Dutch travel-advisory distinction
  with its concrete day-trip-only mitigation advice; batch 10's Northern Cyprus crossing item carries
  the full car-rental/insurance/non-recognition nuance; batch 11c's Iceland routes carry the real,
  currently-active Reykjanes Peninsula volcanic-activity yellow-advisory note.
  **Verification ritual for every (sub-)batch**: `node --check` on all three touched Route Builder
  files, a `grep -o "^function [A-Za-z0-9_]*"` dedup pass to catch any accidental duplicate function
  name (a silent last-wins bug plain syntax checking can't catch), and a CSV diff line-count check
  (should be exactly 2× the row count, confirming only the intended rows/column changed) — done by
  the orchestrating session itself after each subagent's report, before trusting it and updating the
  README.

- **Route Builder English content: Phase 2 batch 14 done, 🏝️ Europese eilanden, 30 items
  (2026-08-21)** — split into 5 geography-based sub-batches: #14a Madeira+Azores (5 routes,
  86,544 tokens, no collisions), #14b Canary Islands+Balearics (10 routes, 86,625 tokens, no
  collisions, reused batch 7a's Mallorca coordinates), #14c Sicily+Sardinia (7 routes, 107,406
  tokens), #14d Greek islands (6 routes, 108,731 tokens), #14e Channel Islands+Isle of Man (2
  routes, 84,445 tokens) — 473,751 tokens total for 30 items (~15,792/item, the priciest batch
  yet, driven by real collision-resolution work across three of the five sub-batches).
  **This batch surfaced the first same-Phase-2-workstream duplicates, not just Phase-1-family
  ones**: batch 14c's "Sardinia Roadtrip"/"Sicily Roadtrip" nearly duplicate the 9-day Sicily/
  Sardinia loops Phase 2's own earlier Italy batch (#5) already built; batch 14d's two Cyclades
  routes nearly duplicate an earlier Phase 2 Greek-islands combo route. Also found real Phase-1
  collisions: batch 14d's "Crete Roadtrip" vs. the Mediterranean Civilizations family's
  "Greece & Crete 🫒" (which already covers Crete, just bundled with mainland Greece); batch 14e's
  Jersey+Guernsey vs. the British Isles & Celtic Coast family's "Channel Islands, Brittany &
  Normandy/Opal Coast & Belgium 🥖" (whose first two legs ARE Guernsey→Jersey); batch 14e's Isle
  of Man vs. that same family's "England, Wales & Isle of Man 🎩" (whose Isle of Man leg turned out
  to be substantial — 4 days covering Douglas/Peel/Snaefell — not the "brief stop" first assumed).
  **Per Youri's explicit instruction (2026-08-21), none of these were merged or deleted** — every
  one got the same treatment as prior batches (distinct function name + an explicit
  cross-reference note, pre-existing route untouched) and is logged in
  [`ROUTE_SIMILARITY_REVIEW.md`](ROUTE_SIMILARITY_REVIEW.md) for Youri to review once all 319
  items are built, rather than deciding case-by-case mid-build.

- **Route Builder English content: Phase 2 batch 15 done — 319/319 items complete, Phase 2
  finished (2026-08-24)** — the final batch, "combinatiesecties" (combination routes), covering
  three sections at the end of `EUROPA_TRIP_IDEAS.md`: Iberia combinations, Balkan combinations,
  and the 20-item "Grote Europese combinaties" (Grand European combinations). Of the source
  document's 34 combo items, 3 turned out to already be built in earlier batches (Croatia+Bosnia+
  Montenegro, Czechia+Austria, and Prague+Poland all pre-existed under slightly different framing)
  and were skipped, leaving 31 real items — split into 6 geography-based sub-batches: **#15a**
  Iberia combinations (4 routes, 114,240 tokens), **#15b** Balkan combinations (7 routes, 133,827
  tokens), **#15c** Central-Europe cluster (5 routes, 141,135 tokens), **#15d** Alps/Italy cluster
  (6 routes, 203,539 tokens, the priciest sub-batch), **#15e** Pyrenees/Nordic cluster (6 routes,
  167,968 tokens), **#15f** Grand/South cluster (3 routes, 191,610 tokens) — **952,319 tokens
  total for 31 items (~30,720/item), roughly double batch 14's already-elevated per-item rate**,
  confirming the README's own advance prediction that a "combinations" batch would carry the
  highest collision-check burden in the whole workstream: combo routes by nature re-touch content
  from many earlier batches, and several items required reading a large pre-existing function in
  full before writing a single line.
  **The closest near-duplicates found across the entire Phase 2 workstream turned up here**: the
  new "Austria + Slovenia via Grossglockner" (15c) and "Andorra + Spanish Pyrenees: Grand Circuit"
  (15e) each matched an existing pre-Phase-2 route almost stop-for-stop, identical day/budget
  splits included. Also newly confirmed: the new "Central Europe Roadtrip (14 days)" (15c) and
  "Grand European Roadtrip (14-21 days)" (15f) are both compressed subsets of the pre-Phase-2
  flagship **Central European Grand Roadtrip 🚗** (45-70 days, 14 countries) — same relationship
  pattern as the earlier `rbBuildIsleOfManRoute`/`rbBuildEnglandWalesIoMRoute` pair, just split
  along two different geographic axes (15c's version goes Berlin→Prague→Krakow→Bratislava→Vienna→
  Budapest by train; 15f's goes Germany→Austria→Switzerland→Italy→Slovenia→Croatia→Hungary→
  Czechia by car), with only Prague and Budapest actually shared between the two new routes
  themselves. Conversely, some superficially similar existing titles turned out to be genuine
  gaps on closer inspection — "Sweden + Norway" (15e) is real new content since the existing
  `rbBuildSwedenNorwayRoute` is actually a Lapland/Arctic trip with no Oslo/Bergen/fjords at all,
  and no pre-existing Chamonix route existed anywhere in the repo before 15d's France+Switzerland+
  Italy route. **Per Youri's 2026-08-21 instruction, none of these were merged or deleted** — same
  treatment as every prior batch (distinct function name + explicit cross-reference note,
  pre-existing route untouched), logged as entries #18-48 in `ROUTE_SIMILARITY_REVIEW.md`, which
  now closes out with a note that all of Phase 2 is done and the accumulated findings are ready
  for Youri's review at his own pace. `TRIP_DATABASE.csv` confirms 0 remaining "No" rows in the
  "In Route Builder?" column — every one of the 319 `EUROPA_TRIP_IDEAS.md` items is now a real
  Route Builder route. **Next workstream: Phase 3** — making the Trip Taxonomy's 29 fields and
  450 tagged rows filterable in the app UI (see README's "Phase 3" section).

- **Europa Trip Ideas: third content addition processed, checklist closed out (2026-08)** — Youri supplied a broad region checklist (West-/Noord-/Centraal-/Zuid-Europa, Balkan, microstaten, Turkije, bijzondere eilanden); almost everything on it already existed, and the genuinely new regions were converted to the "X dagen — route" format and filed under their existing country/section: Engeland/Wales/Noord-Ierland (new section, batch 12), Zweeds Lapland (Zweden, batch 11), Faeröer (new section, batch 11, alongside the existing aspirational Route Builder splitroute), Moravië (Tsjechië, batch 9), Campanië/Puglia (Italië, batch 5), Galicië/Asturië+Cantabrië/Gibraltar (Spanje, batch 7), Centraal-Portugal (Portugal, batch 7), Egeïsche kust (Turkije, batch 10), Svalbard (Noorwegen, batch 11), Åland (Finland, batch 11), Shetland/Orkney/Buiten-Hebriden (Schotland, batch 12), Isle of Man/Jersey & Guernsey (new subsection under 🏝️ Europese eilanden, batch 14). Oekraïne/Belarus/Europees Rusland deliberately not added, on Youri's own instruction. De Egeïsche-kust exception sharpened the list's own inclusion rule for future edge cases: not strictly "Europa, geografisch" but "dichtbij, geschikt voor city trip/~1 week, geen dure/lange vlucht voor zo'n korte periode."

- **Trip Taxonomy: Groep 3 tagging complete, 450 rows total in `TRIP_DATABASE.csv` (2026-08-18)** — all 21 planned sub-batches of `EUROPA_TRIP_IDEAS.md`'s 319 items tagged, closing out Fase 2 (Groep 1: 13 Grand Trips, Groep 2: 118 splitroutes, Groep 3: 319 items, reusing `EUROPA_TRIP_IDEAS.md`'s own 15 named batches with the 6 largest split into two halves each). Total cost 4,270,377 tokens across 43 tagging batches run over several sessions specifically to avoid burning a whole session's budget in one pass (Groep 1+2: 2,059,921 tokens for 131 items, ~15,725/item; Groep 3: 2,210,456 tokens for 319 items, ~6,930/item — less than half Groep 2's rate, confirming plain-markdown source content tags cheaper than diving into `routeBuilder.js`'s 9000+ line source). Per-batch cost table:

  | # | Batch (from EUROPA_TRIP_IDEAS.md) | Real item count | Tokens |
  |---|---|---|---|
  | 1 | Benelux (pilot) | 6 | 65,217 |
  | 2 | Duitsland | 12 | 86,991 |
  | 3 | Oostenrijk + Zwitserland | 12 | 88,367 |
  | 4 | Frankrijk | 11 | 100,209 |
  | 5 | Italië | 16 | 117,839 |
  | 6 | Micro-staten & kleine eilanden | 20 | 134,667 |
  | 7a+7b | Iberië (Spanje+Andorra+Portugal) | 26 | 109,952 + 115,127 |
  | 8a+8b | Balkan-cluster | **45** (planned 44) | 110,735 + 118,753 |
  | 9a+9b | Centraal/Oost-Europa | 35 | 109,964 + 88,819 |
  | 10 | Oost-Mediterraan | **17** (planned ~18) | 115,908 |
  | 11a+11b | Noord-Europa | 32 | 125,576 + 108,285 |
  | 12 | Britse eilanden | 17 | 95,294 |
  | 13 | Baltische staten | 6 | 74,538 |
  | 14a+14b | 🏝️ Europese eilanden | 30 | 102,701 + 108,253 |
  | 15a+15b | Combinatiesecties | **34** (planned 33) | 117,054 + 116,207 |

  **Lesson reinforced repeatedly: never trust a pre-stated item count** — the doc's own "batch-indeling" summary was wrong three separate times (Balkan-cluster 44→45, Oost-Mediterraan 18→17, Combinatiesecties 33→34); every sub-batch prompt now explicitly tells the tagging agent to grep/count the actual bullets itself. Workflow per batch: delegate to a subagent that reads `TRIP_TAXONOMY.md` for the schema plus the relevant `EUROPA_TRIP_IDEAS.md` section, outputs raw CSV lines only (no header/commentary, English throughout, `&` not `&amp;`, no "€" prefix on the Budget €/day column), append to `TRIP_DATABASE.csv`, commit locally, report token cost, ask before the next sub-batch.

- **Trip Taxonomy: real findings surfaced during Groep 3 tagging (2026-08)** — not just mechanical tagging, a few genuine safety/regulatory checks came out of reading the source closely. Moldova + Transnistria tagged Advisory Level = Red / Border Complexity = Complex (Russian troops, war-adjacent tension) — the one genuinely active-conflict-adjacent item in all of Groep 3. Cyprus confirmed EU-but-not-Schengen; Northern Cyprus crossings tagged Complex. Kosovo's items never combine with Serbia in the source (deliberate design), tagged Simple non-Schengen throughout, no invented complication. UK/Ireland items tagged non-Schengen with the post-Brexit ETA requirement. Switzerland/Norway/Iceland items got Budget Level €€€€ overrides where their real per-day ranges warranted it, rather than force-fit to the blanket ≤105→€€/≥110→€€€ heuristic used for the rest of Europe. The "Grote Europese combinaties" subsection (last ~17 items) got `Verification Status = Draft` rather than `Verified`, since its own footer admits the WebSearch budget ran out and it reused prior verified country data instead. Several Combinatiesecties items are deliberate near-duplicates of already-tagged combos (e.g. "Bosnia + Croatia + Montenegro" tagged a third time) — flagged during tagging, not treated as errors, since `EUROPA_TRIP_IDEAS.md` itself repeats these combos across sections.

- **Route Builder English translation, batches 1-6 (all dict-based families) done (2026-08)** — pilot batch (Central European Grand Roadtrip, chosen for zero splitroutes as the cleanest first test) cost 138,985 tokens for one 14-leg route, well above the original 400-600K blind estimate for the whole 13-batch job — recalibrated total based on this real data point: ~2.5-3.5M tokens for all 13 batches. Batch 2 (Eurasia, 27 countries + 3 splitroutes): 229,111 tokens. Batch 3 (Patagonia & Antarctica, 3 countries + 2 splitroutes): 203,954. Batch 4 (India & Himalaya, 3 countries + 3 splitroutes): 194,573. Batch 5 (Nordic Arctic, 8 countries + 5 splitroutes): 200,428 — all four pure dict-based families landed in a tight 195K-230K token band regardless of country/splitroute count. Batch 6 (Pan-American Grand Tour, 15 countries + 4 splitroutes + 8 reused standalones, 13 routes total, the biggest route count of any batch to that point): ~280,000 tokens, above the pure dict-based band as expected since each of the 8 standalone consumers needed its own wrapper-level translation (entry note, travel_style, climate_summary, description, notes) even though none needed a rename — Costa Rica 🦥, Colombia ☕, Peru 🦙, Ecuador 🐢, Guatemala 🦜, Panama 🚢, Bolivia 🧂, Nicaragua 🌅 already had English names. Also notably fewer standalones than the ~15 originally estimated for this family — the real count, found by grepping every `rbContentFor('Pan-American Grand Tour 🌎', ...)` call site, was 8.

- **Route Builder English translation, batch 7 (Africa Grand Tour) done (2026-08)** — 18 countries + 4 splitroutes + 15 standalone consumers (20 routes total, the biggest route count of any translation batch so far), ~330,000 tokens. Of the 15 standalones, 8 needed a rename (Egypt ← Egypte, Namibia ← Namibië, South Africa ← Zuid-Afrika, Kenya ← Kenia, Madagascar ← Madagaskar, Ethiopia ← Ethiopië, South Africa & Mountain Kingdoms ← Zuid-Afrika & Bergkoninkrijkjes, Victoria Falls & Kalahari Loop ← Victoria Falls & Kalahari-lus) and 7 already had English names (Tanzania 🦁, Botswana 🐘, Rwanda 🦍, Mauritius 🦤, Zimbabwe 🐆, Mozambique 🐋, Zambia & Malawi 💦) but still needed wrapper-level translation. All 4 splitroutes were renamed (Southern Africa Safari Loop ← Zuidelijk Afrika Safari-lus, African Islands ← Afrikaanse Eilanden, East Africa Safari Classic ← Oost-Afrika Safari Classic, Horn of Africa & Egypt ← Hoorn van Afrika & Egypte); the Grand Trip's own name was already English. Confirmed the migration-collision fix pattern one more time (5 for 5 dict-based families hit it): `rbMigrateAfricaGrandTourRouteLogicOverhaul()`'s `routeNames` array was widened to `[oldName, newName]` pairs for the four split companions, its note-append guard widened to also recognize the English phrase alongside the Dutch one; the 15 standalone consumers needed no migration widening of their own (no route-logic-overhaul or price-verification migration exists for any of them, a clean no-op, same pattern batch 6 found).

- **Route Builder English translation, batch 8 (Mediterranean Civilizations) done — first hand-authored family (2026-08)** — 13 countries + 6 splitroutes + 11 standalone consumers (18 routes total, the biggest route count of any translation batch so far), ~315,000 tokens. This family's content lives inline in `rbBuildXRoute()` functions (Italy/France/Greece repeat across legs) rather than a shared `RB_EXPEDITION_CONTENT` dict, so there's no dict-cascade discount — every one of the 18 routes needed independent translation, though content was kept consistent across the duplicated Italy/Greece/Egypt/Oman/Bahrein text shared between the Grand Trip and its splitroutes. Of the 11 standalones, 8 needed a rename (Morocco 🕌 ← Marokko, Sicily 🌋 ← Sicilië, Jordan 🏺 ← Jordanië, Spain 💃 ← Spanje, Greece & Crete 🫒 ← Griekenland & Kreta, Rome & Surroundings 🍕 ← Rome & omgeving, Sardinia 🗿 ← Sardinië, Gulf States Trio 🛢️ ← Golfstaten-trio) and 3 needed only wrapper-text translation (Cyprus 🕊️, Malta ⚔️, Tunisia 🧿 — only Tunesië's name actually changed). All 6 splitroutes were renamed (Iberia & Morocco/Tunisia 🏰, Malta & Italy 🏛️, Corsica & Southern France ⛵, Greece & Cyprus 🏺, Anatolia 🕌, Egypt & Arabian Peninsula 🐪). **Broke the collision-fix streak** — the first batch where no existing migration needed widening, because this family's migrations use a structurally different mechanism: `rbMigratePriceVerificationRound1`, `rbMigrateRouteLineCoordsRound2`, `rbMigrateMediterraneanRouteLogicOverhaul`, `rbMigrateBahrainIntoMediterraneanExpedition`, and `rbMigrateSplitRouteEntryNotes` are pure name-based wholesale-replace lookups (`rbRoutes.findIndex(r => r.name === name)`, no-op if not found) that all run before the translation migration in `rbInit()`'s call order, so on a fresh browser they simply find nothing and no-op harmlessly instead of stranding a fix. One asterisk: `rbMigrateLonghaulBuffer`'s `'Jordanië 🏺'` lookup wasn't widened to the new name, but harmlessly, since the correct day count (10d) is already baked into the translated source. The family's own translation migration (`rbMigrateMediterraneanFamilyEnglish()`) is itself a wholesale-replace — an 18-entry `[oldName, newName, buildFn]` lookup table, same idiom as `rbMigrateAfricaGrandTourFamilyEnglish` — since Italy/France/Greece repeating across legs makes country_code-based block matching impossible here.

- **Route Builder English translation: migration-collision lesson recurring across every dict-based batch (2026-08, 5 of 5 — 100% hit rate)** — older migrations (especially each route's own route-logic-overhaul migration) pattern-match on Dutch substrings (e.g. `'Instap:'`, `'Time check (2026-07)'`, `'Follow-up (2026-07)'`, an overhaul-note marker) to detect "have I already applied this note?" — once translated to English, those older guards need widening too, or they double-append stale text. Batch 5 found this even applies when a splitroute's name is identical in Dutch and English (Nordic Arctic's Svalbard 🐻‍❄️): an older migration can still find the route by name but then fail its Dutch-substring content check, so "the name never changed" doesn't mean "no collision risk" — every route's guards need checking regardless. Batch 6 confirmed the reused-standalones case is a clean no-op, not a new collision class, since standalone consumers have no route-logic-overhaul/price-verification migration of their own — only `rbMigratePanAmericanRouteLogicOverhaul()`'s guard and route-name lookup array needed widening, for the two renamed splitroutes (Midden-Amerika Loop 🌋 → Central America Loop 🌋, Zuidelijke Kegel & Brazilië-finale 🧉 → Southern Cone & Brazil Finale 🧉). This is now a standing mandatory check for every future translation batch (see README's Phase 1 "Workflow per batch," and `CLAUDE.md`'s migration rule).

- **Negende batch: vier losse VS/Hawaii-tripjes + Alaska bij Vancouver (2026-08)** — na een audit
  die vier hele regio's (Noordoost, Zuidwesten, Alaska, Hawaii) miste in Route Builder, wilde Youri
  expliciet géén grote samengevoegde uitbreiding van North America Grand Traverse 🌎 (die blijft
  ongewijzigd bestaan) — in plaats daarvan losse, op zichzelf staande trips, want de stukken liggen
  sowieso ver uit elkaar. Elk apart onderzocht via een WebSearch-backed research-agent (route/dagen/
  budget/seizoen/transport/veiligheid) vóór het bouwen: **US Oostkust 🗽** (DC-Philadelphia-New York-
  Boston via de Northeast Corridor-trein, 12d/€1.365), **US Zuidwesten 🏜️** (Las Vegas-Zion-Bryce-
  Antelope Canyon-Monument Valley-Grand Canyon-Sedona-Phoenix, one-way huurauto, 12d/€1.500),
  **Hawaii 🐢** (Oahu-Maui-Kauai, 14d/€2.240, Big Island bewust niet meegenomen) en **Florida 🐊**
  (Miami-Everglades-Key Largo-Key West, 10d/€1.360, Orlando/pretparken en het noorden van Florida
  bewust weggelaten — Youri's eigen toevoeging, "een beetje apart als omgeving").
  **Alaska** kreeg geen eigen standalone route, maar is toegevoegd áán de bestaande
  **West-Canada: Rockies & Vancouver 🏔️** (Youri's expliciete keuze: Vancouver-Anchorage is al de
  natuurlijke vluchtverbinding) — Anchorage/Denali NP/Seward-Kenai Fjords als nieuwe derde regio,
  10d/€1.600 erbij (route-totaal 22→32 dagen, €4.275→€5.875 grondkosten). Alle vier de losse trips en
  de Alaska-toevoeging getest met een Node-smoketest (dagen/budget-totalen bevestigd, migratie
  idempotent bevestigd — twee keer draaien voegt Alaska niet dubbel toe).

- **Achtste batch: Dolomieten & Noord-Italië 🚡 (2026-08)** — de sterkste van de twee fly-in-
  reframes die in `ROUTE_BUILDER_MODULES.md` bij Central European Grand Roadtrip 🚗 stonden (de
  andere, Balkan-as-flyto, is Medium-beoordeeld en nog niet gebouwd). Zelfde 7-etappe lus als het
  bronblok (Dolomieten → Milaan → Turijn → Cinque Terre → Toscane → San Marino → Venetië),
  ongewijzigd qua land/dagen/budget (19 dagen, €2.385) — alleen instap/uitstap aangepast van
  "eigen auto vanuit Nederland" naar "vlucht Amsterdam-Venetië, huurauto, dezelfde lus, terug naar
  Venetië voor de thuisvlucht" (de bestaande San Marino-Venetië-rit uit de brontekst wordt nu het
  sluitstuk van de lus i.p.v. een tussenstop op weg naar de Balkan). Visum/reisadvies hergebruikt
  uit de al geverifieerde brontekst (Italië/San Marino visumvrij, Schengen, reisadvies groen).
  Central European Grand Roadtrip 🚗 zelf blijft ongewijzigd bestaan. Getest met een Node-
  smoketest (19 dagen/€2.385 bevestigd, syntax-check van het volledige bestand geslaagd).

- **"Kazachstan & Tadzjikistan" vervangen door "Oezbekistan & Tadzjikistan" (2026-08)** — Youri's
  eigen correctie: Kazachstan en Tadzjikistan grenzen niet aan elkaar (die route moest vliegen
  Almaty-Dushanbe, over Kirgizië/Oezbekistan heen), terwijl Oezbekistan en Tadzjikistan wél een
  grens delen (Samarkand/Panjakent, grensovergang Jartepa/Sarazm) — een logischere, volledig
  overland te doen combinatie, en dat was eigenlijk de bedoeling van deze verder-opsplitsing.
  Nieuwe route: **Oezbekistan & Tadzjikistan 🌄** (25d: UZ 11d + TJ 14d). Omdat de oude route deze
  sessie al in de browser was geseed, was een source-rename niet genoeg — een eenmalige migratie
  (`rbMigrateReplaceKazakhstanTajikistanCombo()`) verwijdert de oude route en zet de nieuwe erin,
  precies één keer, ook voor browsers die de oude versie al hadden geladen. Getest in twee
  scenario's: een verse browser (krijgt direct de juiste route) en een browser die de oude route
  al had (migratie verwijdert 'm en zet de nieuwe erin, geen duplicaten).

- **Combi-batch 7 (2026-08, Claude's keuze uit de resterende Sterk/Medium-combinaties in
  ROUTE_BUILDER_MODULES.md)** — tien nieuwe routes, waarvan vier voor het eerst in deze app een
  car-loop-expeditie herkaderen als "vlieg + huur lokaal een auto"-trip (de analyse noemde dit
  expliciet haalbaar voor British Isles, in tegenstelling tot Central European Grand Roadtrip 🚗
  dat de analyse afraadde te splitsen): **Engeland, Wales & Isle of Man 🎩** (38d), **Schotland &
  Noord-Ierland 🥃** (27d), **Ierland ☘️** (22d) en **Kanaaleilanden, Bretagne & Normandië/
  Opaalkust & België 🥖** (28d) — alle vier uit British Isles & Celtic Coast Expedition 🍀, met
  dezelfde etappe-inhoud/ferries, alleen instap/uitstap aangepast (de laatste route eindigt met
  een one-way huurauto-drop-off in Amsterdam i.p.v. zelf terugrijden). Daarnaast: **Balkan 🐺**
  (35d, uit Eurasia Grand Tour 🌏's West-Eurazië Overland 🐫 — dagental bijgewerkt naar de actuele
  35d, niet de 45d uit de oudere 2026-07-analyse), **Malta ⚔️** (5d) en **Tunesië 🧿** (8d incl.
  buffer) uit Mediterranean Civilizations Expedition 🏛️, **Zuid-Afrika & Bergkoninkrijkjes 👑**
  (35d, ZA+LS+SZ) en **Victoria Falls & Kalahari-lus 🦏** (50d, MZ+ZW+BW) uit Africa Grand Tour 🌍
  (naast, niet in plaats van, de al bestaande losse Zuid-Afrika/Mozambique/Zimbabwe/Botswana-
  routes), en **Noord-Brazilië 🪁** (14d) uit Caribbean & Amazon Expedition 🌴. Getest met een Node-
  smoketest: British Isles & Celtic Coast Expedition 🍀, Eurasia Grand Tour 🌏, West-Eurazië
  Overland 🐫, Mediterranean Civilizations Expedition 🏛️, Malta & Italië 🏛️, Iberia & Marokko/
  Tunesië 🏰, Africa Grand Tour 🌍, Zuidelijk Afrika Safari-lus 🦁 en de vier al bestaande losse
  Afrika-/Suriname-routes allemaal onaangetast bevestigd.

- **Centraal-Azië 🐎 verder opgesplitst (2026-08)** — actie op de eigen aantekening bij die route
  ("een genuine kandidaat om verder te splitsen, net als de 13 grote expedities"): **Kazachstan &
  Kirgizië ⛺** (20d, overland Almaty-Bishkek) en **Kazachstan & Tadzjikistan 🌄** (22d, gevlogen
  Almaty-Dushanbe — de twee landen grenzen niet aan elkaar, Kirgizië/Oezbekistan liggen ertussen).
  Kirgizië 🐴 en Oezbekistan 🐪 hadden al een eigen route (batch 4), dus deze twee combi's dekken de
  twee resterende landcodes (KZ, TJ). Vlucht-/visumresearch 2026-08: Kirgizië-visumtekst
  gecorrigeerd naar "30 dagen visumvrij binnen elke periode van 60 dagen" (niet plat "60 dagen"
  zoals eerder losjes genoteerd); Tadzjikistan-route flagt expliciet dat de Almaty-Dushanbe-vlucht
  los geboekt is (geen doorcheck) en dat het e-visa/GBAO-permit ruim vooraf (5-10 werkdagen)
  geregeld moet worden. Getest met een Node-smoketest: Eurasia Grand Tour 🌏, West-Eurazië
  Overland 🐫, Centraal-Azië 🐎 (de 4-landen-combinatie blijft gewoon bestaan), Kirgizië 🐴 en
  Oezbekistan 🐪 allemaal onaangetast bevestigd.

- **Zesde batch standalone single-country routes (2026-08, de resterende 15 kandidaten — alles wat
  over was uit de ~63-kandidatenlijst)** — vervolg op batch 1-5 hierboven, en daarmee de laatste
  batch van deze modularisatie-reeks: **Bolivia 🧂** (17d, uit Andes Grand Traverse 🦙),
  **Nicaragua 🌅** (15d, uit Midden-Amerika Loop 🌋), **Mozambique 🐋** (20d, uit Zuidelijk Afrika
  Safari-lus 🦁), **Zambia & Malawi 💦** (30d, uit Zuidelijk Afrika Safari-lus 🦁), **Ethiopië ⛪**
  (20d, uit Hoorn van Afrika & Egypte 🏺), **Sardinië 🗿** (6d, uit Malta & Italië 🏛️), **Cyprus 🕊️**
  (5d, uit Griekenland & Cyprus 🏺), **Golfstaten-trio 🛢️** (13d, uit Egypte & Arabisch
  Schiereiland 🐪), **Maleisië 🦋** (10d, uit Zuidoost-Azië Grand Loop 🛕, bewust alleen het
  schiereiland zonder Borneo), **Saint Lucia & Grenada 🌰** (14d, uit Caraïbische Eilanden-hop 🏝️),
  **Kaapverdië 🎶** (13d, uit West-Afrika Overland 🥁), **Senegambia 🦩** (19d, uit West-Afrika
  Overland 🥁), **Gabon 🏕️** (11d incl. buffer, uit Centraal-Afrika & Eilanden 🦛), **São Tomé &
  Príncipe 🍫** (11d incl. buffer, uit Centraal-Afrika & Eilanden 🦛) en **Pacific Northwest 🦫**
  (15d, uit VS Westkust Roadtrip 🌉). Zelfde patroon als de vorige vijf batches: land(en)/dagen/
  budget/bestemmingen hergebruikt, eigen "Instap: vlucht Amsterdam-…"-opener + correcte
  thuisreis-eindnotitie (2026-08 vlucht-/visum-/reisadvies-research per land). Twee routes kregen
  de langeafstandsvlucht-buffer uit `CLAUDE.md` toegepast (Gabon, São Tomé & Príncipe, beide 9→11d,
  korte reis + overstapvlucht). Bolivia's dagental is het gecorrigeerde 17d (niet het oudere 21d
  uit de eerste modularisatie-analyse) — Santa Cruz kwam al eerder (2026-08-fix) te vervallen.
  ⚠️ **Twee routes met een zware reisadvies-kanttekening, letterlijk overgenomen uit hun
  parent-expeditie, niet nieuw verzonnen**: Ethiopië (Amhara/Afar op ROOD — Lalibela, Simien
  Mountains, Gondar, Danakil Depressie, live herbevestigd 2026-08, geen verbetering) en
  Golfstaten-trio (Bahrein op ROOD, geen Nederlandse ambassade, Qatar oranje — regionaal
  Iran-Israël/VS-conflict, live herbevestigd 2026-08). Beide blijven staan, met een prominente
  waarschuwing i.p.v. weglaten — zelfde afweging als de parent-expedities al hadden gemaakt
  (Route Builder is de aspirational/someday-laag). Getest met een Node-smoketest incl.
  isolatie-checks (7 parent-expedities plus 12 bestaande split-routes met overlappende landen/
  regio's — allemaal onaangetast bevestigd, exacte dagentotalen ongewijzigd). Met deze batch zijn
  alle kandidaten uit `ROUTE_BUILDER_MODULES.md` gebouwd — 63 standalone routes in totaal over zes
  batches.

- **Vijfde batch standalone single-country routes (2026-08, Youri's top-10 uit de resterende
  ~25-kandidatenlijst na batch 4)** — vervolg op batch 1-4 hierboven: **Mongolië 🦅** (12d incl.
  buffer, uit Oost-Azië & Stille Oceaan 🗻), **Vietnam & Cambodja 🛺** (29d, uit Zuidoost-Azië
  Grand Loop 🛕), **Rome & omgeving 🍕** (13d, uit Malta & Italië 🏛️), **Guatemala 🦜** (16d, uit
  Midden-Amerika Loop 🌋), **Panama 🚢** (15d, uit Midden-Amerika Loop 🌋), **Ghana 🥥** (15d, uit
  West-Afrika Overland 🥁), **Tasmanië 🐾** (14d incl. buffer, uit Gematigd/Zuidelijk Australië 🍇),
  **Nieuw-Zeeland Noordereiland 🌿** (16d incl. buffer, uit Nieuw-Zeeland 🥝), **Fiji & Vanuatu 🐚**
  (27d incl. buffer op de Vanuatu-etappe, uit Pacific-eilanden 🌺) en **Guadeloupe & Dominica 🍃**
  (15d, uit Caraïbische Eilanden-hop 🏝️). Zelfde patroon als de vorige vier batches:
  land(en)/dagen/budget/bestemmingen hergebruikt, eigen "Instap: vlucht Amsterdam-…"-opener +
  correcte thuisreis-eindnotitie (2026-08 vlucht-/visum-/reisadvies-research per land). Vier
  routes kregen de langeafstandsvlucht-buffer uit `CLAUDE.md` toegepast — Mongolië (korte reis +
  overstapvlucht) en drie Oceanië/Pacific-routes (Tasmanië, Nieuw-Zeeland Noordereiland,
  Fiji & Vanuatu) die alle drie over de 24-uursdrempel kwamen ongeacht triplengte. Vietnam &
  Cambodja en Fiji & Vanuatu splitsen verder bestaande combinatieroutes (Zuidoost-Azië Grand
  Loop 🛕 resp. Pacific-eilanden 🌺) op in kleinere tweelanden-tweeluiken, zonder de rest van die
  routes aan te raken. Getest met een Node-smoketest incl. isolatie-checks (7 parent-expedities
  plus 11 bestaande split-routes met overlappende landen/regio's — allemaal onaangetast bevestigd,
  exacte dagentotalen ongewijzigd).

- **Vierde batch standalone single-country routes (2026-08, Claude's aanbevolen top-10 uit de
  resterende ~28-kandidatenlijst)** — vervolg op batch 1-3 hierboven: **Spanje 💃** (10d, uit
  Iberia & Marokko/Tunesië 🏰), **Rwanda 🦍** (10d, uit Oost-Afrika Safari Classic 🦒),
  **Mauritius 🦤** (9d incl. buffer, uit Afrikaanse Eilanden 🏝️), **Argentijns Patagonië 🥩**
  (18d, uit Patagonië Overland 🏔️), **Chileens Patagonië 🥾** (24d, uit Patagonië Overland 🏔️),
  **Griekenland & Kreta 🫒** (19d, uit Griekenland & Cyprus 🏺), **Oezbekistan 🐪** (11d, uit
  West-Eurazië Overland 🐫), **Kirgizië 🐴** (12d, uit West-Eurazië Overland 🐫), **Zimbabwe 🐆**
  (14d, uit Zuidelijk Afrika Safari-lus 🦁) en **Sydney/Byron & Great Ocean Road 🦘** (24d incl.
  buffer, uit Gematigd/Zuidelijk Australië 🍇). Zelfde patroon als de vorige drie batches:
  land(en)/dagen/budget/bestemmingen hergebruikt, eigen "Instap: vlucht Amsterdam-…"-opener +
  correcte thuisreis-eindnotitie (2026-08 vlucht-/visum-/reisadvies-research per land). Twee
  routes kregen de langeafstandsvlucht-buffer uit `CLAUDE.md` toegepast: Mauritius (7→9d, korte
  reis + verplichte overstap) en Sydney/Byron & Great Ocean Road (12→14d op de eerste etappe,
  24-25 uur reistijd met overstap, ook al is de reis zelf al lang — de tweede triggervoorwaarde
  van het beleid). Argentijns/Chileens Patagonië splitsen "Patagonië Overland 🏔️" (zelf al een
  combinatieroute uit de 2026-07 modularisatie) verder op in de twee losse landen waaruit die
  route bestaat — dezelfde soort verdere-opsplitsing als Centraal-Azië 🐎 in batch 3, maar dan
  wel doorgevoerd. Bewust buiten deze batch gelaten: het Golfstaten-trio en Ethiopië
  (reisadvies-gevoelig op het moment van bouwen), Cyprus/Sardinië (5-6d, te kort om als losse
  Major Trip te verkopen) en Bolivia/Panama/Nicaragua/Guatemala (dunner volgens
  `ROUTE_BUILDER_MODULES.md`). Getest met een Node-smoketest incl. isolatie-checks (alle 5
  parent-expedities plus 8 bestaande split-routes met overlappende landen — Patagonië
  Overland/Antarctica-cruise, Griekenland & Cyprus, Gematigd/Zuidelijk Australië, Oost-Afrika
  Safari Classic, Afrikaanse Eilanden, Zuidelijk Afrika Safari-lus, West-Eurazië Overland, Iberia
  & Marokko/Tunesië — allemaal onaangetast bevestigd, exacte dagentotalen ongewijzigd).

- **Derde batch standalone single-country routes (2026-08, Youri's tweede top-10)** — vervolg op
  batch 1 en 2 hierboven: **Thailand 🛕** (18d, uit Zuidoost-Azië Grand Loop 🛕), **Tanzania 🦁**
  (24d, uit Africa Grand Tour 🌍), **Botswana 🐘** (16d, uit Africa Grand Tour), **Ecuador 🐢**
  (24d, uit Pan-American Grand Tour 🌎), **Centraal-Azië 🐎** (Kazachstan/Kirgizië/Tadzjikistan/
  Oezbekistan samen, ~45d, uit West-Eurazië Overland 🐫), **Cairns & Great Barrier Reef 🐠** (23d
  incl. langeafstandsvlucht-buffer, uit Tropisch/Outback Australië 🐊), **Californië 🌲** (14d, uit
  VS Westkust Roadtrip 🌉), **Jamaica 🎵** (12d, uit Caraïbische Eilanden-hop 🏝️), **Fiji 🌊** (16d
  incl. buffer, uit Pacific-eilanden 🌺) en **Filipijnen 🏖️** (21d, uit Zuidoost-Azië Grand Loop).
  Zelfde patroon als de vorige twee batches: land(en)/dagen/budget/bestemmingen hergebruikt, eigen
  "Instap: vlucht Amsterdam-…"-opener + correcte thuisreis-eindnotitie (2026-08 vluchtprijs-
  research). Twee routes kregen meteen de langeafstandsvlucht-buffer uit `CLAUDE.md` toegepast
  (Cairns & Great Barrier Reef, Fiji — beide 24-30 uur reistijd met meerdere overstappen, ook al
  is de reis zelf niet kort). Toegepast via `rbSeedStandaloneCountryRoutesBatch3()`. Genoteerd in
  `README.md`: Centraal-Azië is met ~45 dagen/4 landen de grootste van alle 28 standalone-routes
  tot nu toe — een kandidaat om later verder op te splitsen, net als eerder met de grote
  expedities is gedaan. Getest met een Node-smoketest incl. isolatie-checks (parent-expedities,
  `RB_EXPEDITION_CONTENT` en bestaande split-routes met dezelfde landen — Oost-Afrika Safari
  Classic, Tropisch/Outback Australië, Pacific-eilanden — allemaal onaangetast bevestigd).

- **Langeafstandsvlucht-buffer voor 2 van de 18 standalone landen-routes (2026-08)** — Youri
  vroeg zich af of de dagaantallen van de nieuwe losse landen-routes (hierboven en hieronder) nog
  wel kloppen nu je er speciaal een vlucht vanuit Nederland voor pakt, in plaats van dat het land
  een tussenstop was in een grotere reis. Antwoord: grotendeels wel (routes die al als "Sterk"
  waren aangemerkt waren vaak al royaal bemeten), maar niet overal. Beleid vastgelegd in
  `CLAUDE.md` ("long-haul flight buffer policy"): +2 dagen alleen bij een korte reis (~≤10 dagen)
  mét overstapvlucht, of een uitzonderlijk lange/meerdere-overstappen-vlucht (24+ uur), nooit
  zomaar overal. Toegepast op **Jordanië 🏺** (8→10 dagen) en **Nieuw-Zeeland Zuidereiland 🏔️**
  (21→23 dagen). Budget is een dagtarief, geen reistotaal, dus alleen `days` aangepast, geen
  budgetwijziging nodig. De overige 16 routes bewust ongewijzigd gelaten (Marokko/Sicilië: korte
  directe vlucht, geen bufferprobleem; de rest: reis al lang genoeg om de vluchttijd op te vangen).
  Toegepast via `rbMigrateLonghaulBuffer()`. Getest met een Node-smoketest (verse seed én migratie
  op gesimuleerde oude data).

- **Tweede batch standalone single-country routes (2026-08, Youri's eigen top-10)** — vervolg op
  de eerste batch hieronder, nu Youri's eigen keuze uit de resterende ~27 kandidaten uit
  `ROUTE_BUILDER_MODULES.md`: **Japan & Taiwan 🗻** (28d samen, uit Oost-Azië & Stille Oceaan 🗻),
  **Zuid-Afrika 🦓** (24d, uit Africa Grand Tour 🌍), **Kenia 🦒** (18d, uit Africa Grand Tour),
  **Vietnam 🛵** (17d, uit Zuidoost-Azië Grand Loop 🛕), **Nieuw-Zeeland Zuidereiland 🏔️** (21d,
  uit Nieuw-Zeeland 🥝), **Kaukasus 🍷** (Georgië/Armenië/Azerbeidzjan samen, 28d, uit West-Eurazië
  Overland 🐫), **Marokko 🕌** (10d, uit Iberia & Marokko/Tunesië 🏰), **Madagaskar 🦎** (24d, uit
  Afrikaanse Eilanden 🏝️ — Mauritius blijft daar nog wel naast staan), **Sicilië 🌋** (10d, uit
  Malta & Italië 🏛️) en **Jordanië 🏺** (8d, uit Egypte & Arabisch Schiereiland 🐪). Zelfde patroon:
  land/dagen/budget/bestemmingen ongewijzigd hergebruikt, eigen "Instap: vlucht Amsterdam-…"-
  opener + correcte thuisreis-eindnotitie (2026-08 vluchtprijs-research). Toegepast via
  `rbSeedStandaloneCountryRoutesBatch2()`. Getest met een Node-smoketest incl. isolatie-checks
  (parent-expedities en `RB_EXPEDITION_CONTENT` niet aangetast, bestaande split-routes die
  dezelfde landen gebruiken — Zuidelijk Afrika Safari-lus, Oost-Afrika Safari Classic — ook niet).
  **Openstaande vraag, nog niet opgelost:** de dagaantallen waren oorspronkelijk bedacht voor een
  etappe *binnen* een grotere meerlanden-expeditie, niet voor een losse vlucht-heen-en-terug-trip
  — of dat nog steeds klopt zodra je niet verder reist, staat als open vraag in `README.md`,
  expliciet gevlagd bij **Jordanië 🏺** (8 dagen — een lange vlucht neemt relatief meer van een
  weekje weg dan van een langere reis).

- **Eerste batch standalone single-country routes (2026-08)** — `ROUTE_BUILDER_MODULES.md`
  noemde ~35 individuele landen binnen de gecombineerde split-routes als sterk genoeg om alleen
  te staan ("Sterk"), maar alleen de gecombineerde versies waren ooit echt gebouwd. Op Youri's
  verzoek de 8 duidelijkste kandidaten nu gebouwd als eigen route: **Costa Rica 🦥** (21d, uit
  Pan-American Grand Tour 🌎), **Colombia ☕** (35d, uit Pan-American), **Peru 🦙** (35d, uit
  Pan-American), **Egypte 🏺** (21d, uit Africa Grand Tour 🌍's versie — een andere, langere versie
  dan Mediterranean Civilizations Expedition 🏛️'s "Egypte & Arabisch Schiereiland 🐪", beide
  bestaan naast elkaar), **Cuba 🎷** (18d, uit Caraïbische Eilanden-hop 🏝️), **Namibië 🏜️** (20d,
  uit Africa Grand Tour), **Curaçao & Bonaire 🤿** (13d samen, uit Caraïbische Eilanden-hop) en
  **Suriname 🛶** (11d, uit Suriname & Noord-Brazilië 🌴). Elke route hergebruikt de bestaande
  landcontent (dagen/budget/bestemmingen/notities) ongewijzigd en kreeg een eigen "Instap: vlucht
  Amsterdam-…"-opener + een echte thuisreis-eindnotitie (zelfde onderzoek/patroon als de
  instap-fix hieronder) — behalve Egypte, waar de bestaande eindnotitie al correct was (Egypte is
  al de laatste etappe van zijn bronroute). Toegepast via `rbSeedStandaloneCountryRoutes()` — geen
  migratie nodig, dit zijn nieuwe routes, geen wijzigingen aan bestaande. De overige ~27
  kandidaten staan genoteerd in `README.md` voor een volgende batch.

- **Bugfix: alle 38 losse split-routes misten een "vlucht vanuit Nederland"-instap (2026-08)** —
  Youri vroeg een analyse van de 38 standalone companion-routes die eerder uit de 11 gesplitste
  grote expedities zijn gebouwd (zie `ROUTE_BUILDER_MODULES.md`), omdat sommige er "een week"
  aanvoelden en de instaplogica niet klopte. Bevinding: op één na (Oost-Canada 🍁, die toevallig
  ook het echte startblok van de ouder-expeditie is) had **geen van de 38** een vermelding hoe je
  er vanuit Nederland komt — elke eerste etappe droeg nog de mid-tour-tekst van toen dat land een
  tussenstop was in de grote expeditie, nooit een instappunt. Voor elke route is nu een
  "Instap: vlucht Amsterdam-…"-zin toegevoegd aan de eerste etappe, met een realistische
  vluchtprijsindicatie getimed op de al vastgelegde beste periode van die route (webonderzoek
  2026-08, momentopname — geen live prijzen). Daarnaast twee losse content-bugs gefixt: **Noord-India 🕌**
  en **Nepal 🏔️** hadden een `transport_to_next` die nog naar een land verwees dat niet in die
  standalone route zit (India→Nepal, Nepal→Bhutan) — nu een echte terugvlucht naar Nederland.
  **Groenland 🧊** eindigde met "einde van de expeditie — vlucht terug naar Reykjavik", zinloos als
  losse reis — nu een correcte thuisreis (Ilulissat→Reykjavik/Kopenhagen→Amsterdam).
  Toegepast via `rbMigrateSplitRouteEntryNotes()`. Bewust **niet** aangepast: Svalbard 🐻‍❄️ (4 dagen)
  en Faeröer 🐑 (7 dagen) blijven bewust kort, op Youri's verzoek — net als Corsica & Zuid-Frankrijk
  ⛵ (11 dagen, die dit al zelf meldde) en Antarctica-cruise 🐧/Bhutan 🐉 (cruise- resp.
  vergunning-gebonden). Ook bewust niet aangepakt: of elk individueel "Sterk"-land uit de
  modularisatie-analyse (Colombia, Peru, Egypte alleen, Madagaskar, Cuba, …) een eigen route
  verdient — dat blijft voor nu een open vraag, geen bug.

- **Bugfix: Eurasia Grand Tour 🌏 miste per-bestemming coördinaten voor 9 van de 27 landen (2026-08)**
  — gevonden doordat Youri opmerkte dat Bosnië & Herzegovina niet meekwam op de "Gedetailleerd"-
  kaartweergave. Oorzaak: `rbApplyEurasiaOverhaulToRoute()` (de route-logic-review-migratie) syncte
  alleen de 18 landcodes die in die ronde ook een inhoudelijke wijziging kregen — maar alle 27 landen
  kregen in diezelfde ronde per-bestemming coördinaten. Bosnië, Montenegro, Noord-Macedonië,
  Kirgizië, Tadzjikistan, Mongolië, Japan, Singapore en Oost-Timor stonden niet in die lijst, dus hun
  coördinaten bereikten nooit een browser die de migratie al eerder had gedraaid — exact dezelfde
  migration-gap-valkuil als eerder in dit project, dit keer verstopt **in** de migratie zelf in plaats
  van een ontbrekende migratie. Fix: de sync-lijst uitgebreid naar alle 27 landcodes, migratievlag
  opgehoogd (v1→v2). Gecontroleerd of dezelfde fout ook in Patagonia/Himalaya/Nordic Arctic's
  vergelijkbare migraties zat — daar dekten de lijsten al alle landen van die routes, geen probleem.
- **Africa Grand Tour 🌍 routelogica-herziening (2026-08)** — dertiende en laatste expeditie uit de
  `ROUTE_LOGIC_REVIEW.md`-playbook. Negen landen met een echte herordening, meer dan bij elke andere
  route in de reeks. **Zuid-Afrika**: Kruger stond vóór Johannesburg, terwijl de route Addo-Kruger
  dwars door Johannesburg loopt — nu Addo→Johannesburg→Kruger, scheelt ≈465 km. **Lesotho**:
  "Sani Pass/Thaba-Bosiu" stond als één bestemming samengevoegd terwijl ze ≈335 km uit elkaar liggen
  — nu apart, Sani Pass als laatste stop. **Mozambique**: de etappe kwam binnen bij Maputo maar begon
  met Ilha de Moçambique (≈2.000+ km verderop) — nu Maputo eerst, zuid-naar-noord naar Zimbabwe toe.
  **Zimbabwe**: doorkruiste het land minstens twee keer diagonaal — nu één lus vanaf de instap.
  **Namibië** (grootste vondst van de hele playbook): Fish River Canyon stond als laatste stop
  (uiterste zuiden) terwijl de Angola-grens in het uiterste noorden ligt — de oude volgorde kostte
  ≈2.490 km pure heen-en-terug-omweg; nu bespaart de nieuwe volgorde ≈1.355 km (≈35%). **Angola**:
  Luanda stond eerst, ≈900-1.000 km van de rest van de bestemmingen — nu de zuidelijke cluster eerst.
  **Zambia**: de zuidelijke lus komt nu vóór South Luangwa (oost, dicht bij de Malawi-grens).
  **Madagaskar**: Isalo stond ná Morondava, verbonden door een ruig onverhard traject — nu bereikt
  via de goede RN7 vanaf Tana. **Tanzania**: Kilimanjaro stond ná Zanzibar (onnodige terugvlucht) —
  nu ervoor. **Oeganda**: kwam binnen vanuit Rwanda vlak bij Bwindi maar begon aan de andere kant van
  het land — nu Bwindi meteen bij binnenkomst. **Kenia**: Mount Kenya stond vóór Mombasa — nu als
  laatste, aansluitend op de Ethiopië-grens. **Ethiopië**: de terugvlucht Omo Valley-Addis Abeba stond
  nergens vermeld — nu expliciet toegevoegd. Bevestigd zonder wijziging: Eswatini, Botswana.
  Coördinaten per bestemming toegevoegd aan alle 18 landen. Toegepast via
  `rbMigrateAfricaGrandTourRouteLogicOverhaul()`/`rbApplyAfricaGrandTourOverhaulToRoute()` —
  field-patch + destination-sync via de gedeelde `RB_EXPEDITION_CONTENT`-tabel, toegepast op de
  hoofdroute en alle vier split-companions (Zuidelijk Afrika Safari-lus 🦁, Afrikaanse Eilanden 🏝️,
  Oost-Afrika Safari Classic 🦒, Hoorn van Afrika & Egypte 🏺). **Hiermee zijn alle 13 originele
  expedities uit `ROUTE_LOGIC_REVIEW.md` klaar.**
- **Mediterranean Civilizations Expedition 🏛️ routelogica-herziening (2026-08)** — twaalfde
  expeditie uit de `ROUTE_LOGIC_REVIEW.md`-playbook, grootste route van de hele playbook (18
  etappes/13 landen). Vijf fixes, drie herordeningen en twee onvermelde-terugrit-teksten.
  **Sicilië**: Taormina→Syracuse→Agrigento→Etna kruiste het eiland twee keer (≈195 km vermijdbare
  omweg) — nu Agrigento eerst, dan een doorlopende oostkust-lus Syracuse→Taormina→Etna→Messina.
  **Griekenland-vasteland**: Athene→Delphi→Olympia→Meteora→Peloponnesos wisselde drie keer tussen
  noord (Delphi/Meteora) en zuid (Olympia/Peloponnesos), terwijl de Piraeus-ferry vlak bij Athene
  ligt — nu Athene→Peloponnesos/Olympia (zuid-lus)→Delphi→Meteora (noord-lus, eindigend met de
  terugrit naar Piraeus). **Turkije**: de etappe eindigde in Cappadocië (≈730 km van Istanbul)
  terwijl de vlucht naar Caïro vanuit Istanbul vertrekt — geen Cappadocië-luchthaven heeft een
  directe Caïro-verbinding, dus een binnenlandse terugvlucht is nu expliciet toegevoegd.
  **Egypte**: de ferry naar Jordanië vertrekt vanuit Nuweiba (Sinaï) — vanaf Abu Simbel (uiterste
  zuiden) is dat een terugreis van de hele Nijl-corridor (≈850+450 km), nu expliciet benoemd.
  **Oman**: Wahiba Sands naar de vlucht in Muscat (≈200 km/3u) was eerder verzwegen, nu expliciet
  benoemd. Bevestigd zonder wijziging: Spanje/Marokko, de Sardinië-Corsica-overgang, en Jordanië's
  Dode Zee-positie (ligt al vrijwel exact op de terugweg Wadi Rum-Amman). Coördinaten per bestemming
  toegevoegd aan alle 19 etappes (op Youri's verzoek, na de eerste versie van deze herziening) voor de
  "Gedetailleerd"-kaartweergave. Toegepast via `rbMigrateMediterraneanRouteLogicOverhaul()` —
  wholesale-replace, zelfde patroon als deze route's eerdere migraties, uitgebreid naar alle zes
  split-companions (Iberia & Marokko/Tunesië 🏰, Malta & Italië 🏛️, Corsica & Zuid-Frankrijk ⛵,
  Griekenland & Cyprus 🏺, Anatolië 🕌, Egypte & Arabisch Schiereiland 🐪).
- **Pan-American Grand Tour 🌎 routelogica-herziening (2026-08)** — elfde expeditie uit de
  `ROUTE_LOGIC_REVIEW.md`-playbook, grootste route in deze ronde (15 landen). Vier fixes.
  **Mexico**: San Cristóbal de las Casas stond na Bacalar — een ≈700 km/10u terugrit langs Palenque,
  grond die de reis al had bezocht. Nu tussen Oaxaca en Palenque (de standaard "Ruta Maya"-volgorde).
  **Belize-Honduras-ferry**: de tekst "via Livingston, Guatemala" bleek onjuist — de daadwerkelijke
  veerdiensten (Placencia/Dangriga-Puerto Cortés) varen rechtstreeks. **Honduras**: Tegucigalpa stond
  vóór La Ceiba/Roatán (noordkust), terwijl de grensovergang naar El Salvador juist zuidelijk ligt via
  Tegucigalpa — nu noordkust eerst, Tegucigalpa als laatste. **Bolivia**: Santa Cruz (oostelijk
  laagland) geschrapt — Youri's eigen keuze na een gerichte vraag — het lag ≈638 km van Potosí met
  daarna ≈850 km terug richting Uyuni/Chili nodig, een dead-end. De bestaande transport-tekst ("via de
  Uyuni-zoutvlaktetour") ging zelf al uit van vertrek vanuit Uyuni, niet Santa Cruz — een verzwegen
  aanwijzing die er al was. Dagen/budget evenredig verlaagd (21→17 dagen, €425→€344). Bevestigd zonder
  wijziging: Guatemala's interne volgorde, Colombia's Medellín-Salento-Bogotá-San Agustín, en Ecuador's
  Otavalo/Mindo-structuur (normale hub-en-spoke, geen zigzag). Coördinaten per bestemming toegevoegd
  aan alle 15 landen. Toegepast via `rbMigratePanAmericanRouteLogicOverhaul()`/
  `rbApplyPanAmericanOverhaulToRoute()` — field-patch + destination-sync via de gedeelde
  `RB_EXPEDITION_CONTENT`-tabel, zelfde patroon als Eurasia's migratie, toegepast op de hoofdroute en
  alle vier split-companions (Mexico 🌵, Midden-Amerika Loop 🌋, Andes Grand Traverse 🦙, Zuidelijke
  Kegel & Brazilië-finale 🧉).
- **Oceania Grand Expedition 🌊 routelogica-herziening (2026-08)** — tiende expeditie uit de
  `ROUTE_LOGIC_REVIEW.md`-playbook. Drie fixes. **Pacific-eilanden**: de oude volgorde (Fiji→Vanuatu→
  Samoa→Tonga→Cook Islands) sprong van Fiji naar Vanuatu (west), dan terug oostwaarts voorbij Fiji
  naar Samoa, dan weer terug naar Tonga (dat dichter bij Fiji ligt dan Samoa) — een dubbele omweg via
  de Fiji-hub, die twee bestaande transportnotities zelf al impliceerden ("meestal met overstap via
  Fiji"). Nu Vanuatu→Fiji→Tonga→Samoa→Cook Islands: monotoon oostwaarts, Fiji maar één keer
  gepasseerd. **Tasmanië-Adelaide**: de aanname "meestal met overstap in Melbourne" bleek onjuist —
  Hobart-Adelaide is een dagelijkse directe vlucht; de volgorde zelf was al optimaal, alleen de tekst
  is gecorrigeerd. **Nieuw-Zeeland Zuidereiland**: de oude volgorde eindigde bij Dunedin (ver zuiden)
  terwijl de Picton-ferry in het uiterste noorden ligt — een onvermelde terugrit van ≈692 km die het
  Christchurch-Kaikoura-traject een tweede keer zou berijden. Nu Christchurch→Franz Josef→Queenstown→
  Milford Sound→Dunedin (zuid-lus eerst), dan Kaikoura→Abel Tasman→Picton als één doorlopende
  noordwaartse rit. Youri had Nieuw-Zeeland/Sydney al eerder bezocht maar wil ze nog een keer doen —
  geen cuts. Coördinaten per bestemming toegevoegd aan alle 14 etappes. Landen/dagen/budget
  ongewijzigd. Toegepast via `rbMigrateOceaniaRouteLogicOverhaul()` — wholesale-replace, uitgebreid
  naar de vier split-companions (Pacific-eilanden 🌺, Tropisch/Outback Australië 🐊, Gematigd/
  Zuidelijk Australië 🍇, Nieuw-Zeeland 🥝) die dit keer voor het eerst een eigen migratie nodig
  hadden, net als North America's en West & Central Africa's companions hiervoor.
- **West & Central Africa Expedition 🌍 routelogica-herziening (2026-08)** — negende expeditie uit de
  `ROUTE_LOGIC_REVIEW.md`-playbook. Vier fixes, geen daarvan een landvolgorde-probleem — allemaal
  volgorde-fouten binnen een land, of een onvermelde verbinding. **Kaapverdië**: "Vlucht Praia/
  Sal-Dakar" verzweeg dat Fogo (waar de etappe eindigt) geen brede internationale verbindingen heeft —
  alle vluchten gaan via Praia, nu expliciet benoemd. **Senegal**: Dakar→Saint-Louis(noord)→
  Sine-Saloum(zuid)→Lompoul(noord) kruiste de Dakar-corridor drie keer (≈850+ km vermijdbare omweg) —
  nu Dakar→Gorée→Lompoul→Saint-Louis (beide noordelijke stops samen)→Sine-Saloum (zuid, al vlak bij
  Gambia). **Ghana**: de Elubo-grensovergang vanuit Ivoorkust ligt vlak bij Cape Coast/Elmina, niet bij
  Accra — de oude volgorde backtrackte ≈330 km; nu Cape Coast/Elmina/Kakum→Accra→Volta-regio (vlak bij
  de Aflao-grensovergang naar Togo). **Benin**: Abomey stond als laatste stop (≈135 km landinwaarts)
  terwijl de vlucht vanuit Cotonou vertrekt — nu Abomey eerst, dan Ouidah/Ganvié (beide vlak bij
  Cotonou). Twee kleinere fixes in Centraal-Afrika: **Kameroen** eindigde bij Yaoundé (≈240 km terug
  naar Douala, het enige gateway naar São Tomé) — nu Douala→Yaoundé→Kribi (≈175 km terug, korter, nu
  expliciet benoemd). **Gabon**'s naamloze "regenwoud"-bestemming ingevuld als Pongara National Park
  (vlak bij Libreville). Coördinaten per bestemming toegevoegd aan alle 10 landen. Landen/dagen/budget
  ongewijzigd. Toegepast via `rbMigrateWestCentralAfricaRouteLogicOverhaul()` — wholesale-replace,
  uitgebreid naar de twee split-companions (West-Afrika Overland 🥁, Centraal-Afrika & Eilanden 🦛) die
  dit keer voor het eerst een eigen migratie nodig hadden, net als North America's drie companions
  hiervoor.
- **North America Grand Traverse 🌎 routelogica-herziening (2026-08)** — achtste expeditie uit de
  `ROUTE_LOGIC_REVIEW.md`-playbook. Twee etappes bleken bij verificatie al optimaal (Atlantic Canada's
  Halifax-hub-en-spoke-volgorde en de Canadian Rockies' Yoho-omweg/Mount Robson-Whistler-traject) —
  expliciet gecheckt in plaats van aangenomen. Twee echte fixes gevonden: **Pacific Northwest** had
  een oost-west-zigzag (Seattle→Olympic NP→Mount Rainier→Oregon Coast, drie keer de regio gekruist
  omdat er geen brug over Puget Sound loopt) — nu Seattle→Mount Rainier→Olympic NP (Hurricane Ridge
  dan Hoh Rainforest)→zuidwaarts via de US-101, wat de duurste verbinding (Hoh-Rainier, ≈238 mijl)
  vervangt door de kortere Rainier-Port Angeles (≈174 mijl), scheelt ≈60+ mijl/1,5 uur. **California
  Finale**: de terugrit van Sequoia & Kings Canyon naar San Francisco (≈270 mijl/≈5 uur) stond nergens
  vermeld, alleen "einde van de expeditie" — nu expliciet benoemd als eigen reisdag; Fresno (FAT) ligt
  dichterbij maar heeft geen directe vlucht naar Amsterdam, dus SFO blijft de juiste keuze. Zelfde twee
  fixes ook toegepast op de standalone companion-route VS Westkust Roadtrip 🌉. Coördinaten per
  bestemming toegevoegd aan alle 6 hoofdetappes en de 3 split-companions (Oost-Canada 🍁, West-Canada:
  Rockies & Vancouver 🏔️, VS Westkust Roadtrip 🌉). Landen/dagen/budget ongewijzigd. Toegepast via
  `rbMigrateNorthAmericaRouteLogicOverhaul()` — wholesale-replace, zelfde patroon als deze route's
  eerdere migraties (prijsverificatie-ronde 1, routelijn-coördinaten-ronde 2), nu ook uitgebreid naar
  de drie split-companions die dit keer voor het eerst een eigen migratie nodig hadden.
- **British Isles & Celtic Coast Expedition 🍀 routelogica-herziening (2026-08)** — zevende expeditie
  uit de `ROUTE_LOGIC_REVIEW.md`-playbook, tweede zelf-rijdende lus. Grootste vondst: het 2026-07-
  ontwerp had Isle of Man al terecht "genest" in de Noord-Engeland-etappe, maar op het verkeerde punt
  — ná Bamburgh (bij de Schotse grens) in plaats van bij het Lake District (vlak naast Heysham, de
  enige jaarronde ferryhaven). Dat betekende een rit helemaal terug naar Heysham (≈250 km) en daarna
  weer noordwaarts naar Edinburgh (≈264 km) — twee keer dezelfde noord-zuid-corridor gekruist.
  Opgelost door de oude "Noord-Engeland"-etappe (9 dagen, €965) te splitsen in een Lake District-
  etappe (met de Isle of Man-zijsprong) en een Yorkshire & Northumberland-etappe die rechtstreeks naar
  Edinburgh doorrijdt (≈124 km via de A1) — United Kingdom komt hierdoor nu zeven keer voor i.p.v.
  zes. Twee kleinere fixes erbij: **Schotlands Highlands-volgorde** had een oost-west-zigzag
  (Skye→Loch Ness→Applecross→NC500) — nu Skye→Applecross→NC500 (bewust beperkt tot Ullapool, niet
  doorgetrokken naar Durness/John o'Groats) →Loch Ness/Inverness, met een rechtstreekse ≈400 km-rit
  naar Cairnryan. **Ierlands afsluitende "Dublin (kort)"-stop** is geschrapt (Youri's eigen keuze) —
  Kilkenny-Dublin-Rosslare kostte ≈190 km meer dan rechtstreeks Kilkenny-Rosslare, voor een stop die
  toch al kort bedoeld was. Bevestigd zonder wijziging: Wales' volgorde, de Bretagne-rondgang (leek
  een zigzag, bleek een correcte rondgang om Finistère) en Normandië's volgorde. Kleinere correcties:
  Quiberon-Mont Saint-Michel was ≈100 km genoteerd, is in werkelijkheid ≈240 km; Gent/Brugge
  omgedraaid naar Brugge→Gent (bespaart ≈25-40 km, geen omweg van huis vandaan meer). Alle 16 etappes
  kregen per-bestemming coördinaten. Landen/dagen ongewijzigd (86/115 dagen); grondkosten
  €13.245→€13.195. Toegepast via `rbMigrateBritishIslesRouteLogicOverhaul()` — dezelfde
  wholesale-replace-migratie die deze route al twee keer eerder gebruikte (prijsverificatie-ronde 3,
  routelijn-coördinaten-ronde 2), niet een veldpatch. Geen split-companions (auto-roadtrips blijven
  ongesplitst, zie `ROUTE_BUILDER_MODULES.md`).
- **Central European Grand Roadtrip 🚗 routelogica-herziening (2026-08)** — zesde expeditie uit de
  `ROUTE_LOGIC_REVIEW.md`-playbook, en de eerste zelf-rijdende lus. Geen landvolgorde-fouten
  gevonden — de lus (Elzas→Alpenlanden→Dolomieten/Noord-Italië→Balkan→Midden-Europa→NL) is één
  doorlopende rit zonder onnodige kruisingen. Wel vijf kleinere fixes (search-bevestigd, echte
  rijafstanden opgezocht i.p.v. hemelsbreed geschat): (1) drie `transport_to_next`-afstanden waren te
  laag ingeschat — Straatsburg-Garmisch ≈300→415 km, Vaduz-Innsbruck ≈120→150 km, Turijn-Cinque Terre
  ≈185→260 km; (2) Hoge Tatra-Brno bijgesteld van ≈300 naar ≈335 km; (3) de rit van Boheems Paradijs
  (Turnov, bij Praag) naar Wrocław loopt nu rechtstreeks door in plaats van eerst terug naar Praag —
  scheelt ≈80 km, Turnov ligt al op de route; (4) **Servië's Tara National Park** stond als laatste
  stop vóór Boedapest, maar Tara-Boedapest is in werkelijkheid ≈520 km (niet de genoteerde ≈320 km) —
  zo'n 6-7 uur extra rijden vanuit een uithoek van het land. Opgelost door Tara NP als dagtrip/
  retourtje vanuit Belgrado te doen, waarna de reis via Novi Sad gewoon naar Boedapest vervolgt; (5)
  **Kroatië's landmijn-waarschuwing** bij Plitvice verwijderd — het land is sinds maart 2026 officieel
  landmijnvrij verklaard. Persoonlijke-voorkeur-check: Youri had al veel van deze route eerder gezien
  maar wilde voor déze trip niets inkorten ("moet langs de mooiste stukken gaan") — geen cuts. Alle 14
  etappes kregen per-bestemming coördinaten voor de "Gedetailleerd"-kaartweergave. Landen/dagen/
  grondkosten-totaal ongewijzigd: 45/70 dagen, €8.030 p.p. Toegepast via
  `rbMigrateCentralEuropeRouteLogicOverhaul()` — deze route is hand-authored (Italië komt 6x voor,
  Duitsland en Tsjechië elk 2x), dus geblokken zijn gematcht op land-code + eerste bestemmingsnaam
  i.p.v. alleen land-code. Geen split-companions om ook bij te werken (auto-roadtrips blijven
  ongesplitst, zie `ROUTE_BUILDER_MODULES.md`).
- **Caribbean & Amazon Expedition 🌴 routelogica-herziening (2026-08)** — vijfde expeditie uit de
  `ROUTE_LOGIC_REVIEW.md`-playbook. Twee kleine, losse geografische fixes (search-bevestigd),
  vergelijkbaar met Nordic Arctic's meerdere-kleine-fixes-patroon: **Cuba** — Viñales-vallei stond
  als laatste stop, wat een dubbele omweg gaf (voorbij Cienfuegos naar Trinidad rijden, terug naar
  Cienfuegos, dan een 4,5u oversteek naar Viñales vlak bij Havana, waar je toch weer voor de vlucht
  naartoe moet); nu Havana-Viñales-Cienfuegos-Trinidad, met de terugreis naar Havana expliciet
  benoemd (Havana bevestigd als enige realistische internationale gateway — Santiago de Cuba zou de
  omweg verergeren). **Jamaica** — Blue Mountains stond als losse heen-en-terugtrip vlak na Kingston
  (de kustweg naar Ocho Rios loopt daar niet doorheen); nu Kingston-Ocho Rios-Port Antonio-Blue
  Mountains, met de Hardwar Gap-bergroute als natuurlijke terugweg naar Kingston. Cuba's reisadvies/
  visumtekst ook bijgewerkt: nog steeds oranje (bevestigd geldig, zesde landelijke stroomstoring op 2
  augustus 2026), en de papieren tourist card is sinds 1 juli 2025 vervangen door een e-Visa (~$50).
  Persoonlijke-voorkeur-check: Youri had nog geen van de 10 landen bezocht, geen cuts nodig. Alle
  bestemmingen kregen coördinaten voor de "Gedetailleerd"-kaartweergave. Landen/dagen/budget-totaal
  ongewijzigd: 97 dagen, €7.450. Toegepast via `rbMigrateCaribbeanAmazonRouteLogicOverhaul()` op de
  hoofdexpeditie en beide 2026-07 split-routes (Caraïbische Eilanden-hop 🏝️, Suriname & Noord-Brazilië
  🌴) — deze route heeft geen gedeelde `RB_EXPEDITION_CONTENT`-tabel (hand-authored), dus de migratie
  patcht de velden direct in plaats van via een content-lookup.
- **Nordic Arctic Expedition ❄️ routelogica-herziening (2026-08)** — vierde expeditie uit de
  `ROUTE_LOGIC_REVIEW.md`-playbook. Vier geografische/praktische fixes, allemaal search-bevestigd:
  (1) Finland-Zweden's `transport_to_next` verzweeg dat er van Inari/Lemmenjoki geen directe
  bus/trein naar Zweden bestaat — je moet terug naar Rovaniemi, en zelfs Rovaniemi-Kiruna is met
  OV zelf al een omweg via de kust (8-9,5u) — nu expliciet benoemd, met een huurauto-alternatief via
  Kaaresuvanto/Karesuando (~6-7u); (2) Noorwegen eindigde op Noordkaap terwijl de Svalbard-vlucht
  vanuit Tromsø vertrekt — nu een korte vlucht Honningsvåg-Tromsø (Widerøe) i.p.v. 540km terugrijden;
  (3) IJslands Ring Road-volgorde had een zigzag (Snæfellsnes stond tussen Jökulsårlón en Akureyri in
  i.p.v. als laatste stop vóór Reykjavik); (4) Groenlands instap/uitstap liep verkeerd — nu instap
  Nuuk (jaarrond direct vanuit Reykjavik) en uitstap Ilulissat (seizoensgebonden directe vlucht
  terug, geen omweg via Nuuk meer). Daarnaast twee wensen van Youri: **Denemarken (Kopenhagen)
  toegevoegd** tussen Svalbard en de Faeröer (3 dagen/€450, nog niet bezocht) — praktisch omdat dit
  toch al de vluchtovergang richting de Faeröer was; **Svalbard ingekort** van een meerdaagse gegidste
  bootexpeditie naar alleen Longyearbyen zelf met 1-2 dagtours (8 dagen/€3.725 → 4 dagen/€900). Alle
  bestemmingen kregen coördinaten voor de "Gedetailleerd"-kaartweergave. Nieuw totaal: 8 landen (was
  7), 67 dagen (was 68), €13.950 (was €16.325). Toegepast via
  `rbMigrateNordicArcticRouteLogicOverhaul()` op de hoofdexpeditie en alle vijf 2026-07 split-routes
  (Scandinavië Overland 🚂, Svalbard 🐻‍❄️, Faeröer 🐑, IJsland ❄️, Groenland 🧊) — veldpatch plus één
  nieuw blok (Denemarken, alleen in de hoofdexpeditie).
- **India & Himalaya Expedition 🏔️ routelogica-herziening (2026-08)** — derde expeditie uit de
  `ROUTE_LOGIC_REVIEW.md`-playbook. Anders dan Eurasia/Patagonia: geen geografische fouten gevonden.
  Delhi als hub met twee losse etappes (Rajasthan zuidwest, Punjab/Himachal noord) en Bhutans
  terugkeer naar Paro voor Tiger's Nest bleken allebei al de standaard/optimale aanpak — bevestigd
  via onderzoek, geen bug. Wel ingekort op Youri's verzoek (persoonlijke-voorkeur-check, stap 2 van
  de playbook): Agra/Taj Mahal, Amritsar/Gouden Tempel en Dharamshala/McLeod Ganj geschrapt uit
  India — allemaal al eerder bezocht. Delhi blijft als verplicht aankomstpunt maar zonder extra
  bezienswaardigheden; Udaipur-Manali nu rechtstreeks (geen tussenstop in Amritsar/Dharamshala meer
  nodig). India's dagen/budget meegeschaald (30→22 dagen, €1.275→€935); expeditietotaal 51 dagen,
  €4.470 (was 59 dagen/€4.810). Bhutans Bumthang-uitstap nu genoteerd als vlucht Paro-Bumthang i.p.v.
  de lange terugrit over de weg (Youri's voorkeur). Praktische updates uit onderzoek: Nepal's TIMS-
  kaart wordt in de praktijk niet meer gecontroleerd op Annapurna-paden en TAAN heeft de eis van
  minimaal 2 trekkers per groep geschrapt (22 maart 2026); Bhutan heft sinds 1 januari 2026 een
  nieuwe 5% GST op toeristische diensten; een reisadvies-update voor de Punjab-grensregio
  (explosieve incidenten bij Amritsar/Jalandhar, 5 mei 2026) is toegevoegd, ook al is Amritsar zelf
  nu uit de route. Alle bestemmingen kregen coördinaten voor de "Gedetailleerd"-kaartweergave.
  Toegepast via `rbMigrateHimalayaRouteLogicOverhaul()` op de hoofdexpeditie en alle drie de 2026-07
  split-routes (Noord-India 🕌, Nepal 🏔️, Bhutan 🐉) — pure veldpatch, geen blocks toegevoegd/
  verplaatst (in tegenstelling tot Patagonia's migratie).
- **Patagonia & Antarctica Expedition 🧊 routelogica-herziening (2026-08)** — tweede expeditie uit de
  `ROUTE_LOGIC_REVIEW.md`-playbook. Grootste vondst: er is geen wegverbinding tussen het einde van de
  Carretera Austral (Cochrane/Villa O'Higgins) en Puerto Natales — de vlucht die dit vroeger
  overbrugde (Balmaceda-Punta Arenas) is sinds oktober 2025 gestaakt. Route van 3 naar 5 etappes
  uitgebreid: Chili-Noord (Puerto Montt → Carretera Austral → Puerto Río Tranquilo) → Argentinië-
  Calafate/El Chaltén → Chili-Zuid (Torres del Paine/Puerto Natales/Punta Arenas) → Argentinië-
  Vuurland (Ushuaia) → Antarctica-cruise, zodat de landvolgorde de echte grensovergangen volgt
  (overland via Chile Chico-Los Antiguos en de Cancha Carrera-grensovergang, i.p.v. de eerdere
  impliciete "gat" in de route). Dit maakt ook de eerdere Punta Arenas-Puerto Natales-terugreis
  overbodig: vanaf Punta Arenas gaat de reis nu direct verder naar Vuurland via de veerboot over de
  Straat van Magellaan. Cerro Castillo en Puerto Río Tranquilo van volgorde gewisseld (stonden
  geografisch omgekeerd t.o.v. de Carretera Austral); Chiloé Island en Puerto Montt idem (Puerto
  Montt is het echte vertrekpunt, Chiloé een dagtrip vandaar). Nieuw gevonden: Argentinië vereist
  sinds juli 2025 bewijs van reis-/zorgverzekering bij binnenkomst. Alle bestemmingen kregen
  coördinaten voor de "Gedetailleerd"-kaartweergave. Landen/dagen/budget-totaal ongewijzigd: 53
  dagen, €15.075 — alleen opgesplitst in 5 etappes. Toegepast via
  `rbMigratePatagoniaRouteLogicOverhaul()` op zowel de hoofdexpeditie als de 2026-07 split-route
  Patagonië Overland 🏔️ (deelt dezelfde `RB_EXPEDITION_CONTENT`); Antarctica-cruise 🐧 ongewijzigd
  (bevat alleen het AQ-blok).
- **Eurasia Grand Tour 🌏 routelogica-herziening (2026-08)** — tot nu toe waren alleen prijzen/visa/
  reisadvies per land geverifieerd, nooit of de etappes daadwerkelijk op elkaar aansluiten. Elke
  transport_to_next gecontroleerd tegen de vorige/volgende bestemming en de volgorde binnen elk
  land op geografische logica. Grootste vondst: de Vietnam→Laos→Cambodja→Thailand-volgorde liet
  Vietnam eindigen in Ho Chi Minh City (uiterste zuiden) om vervolgens "terug" te bussen naar
  Vientiane via Hanoi (uiterste noorden) — 1700 km onnodige backtrack. Landvolgorde omgedraaid naar
  **Vietnam → Cambodja → Laos → Thailand**, via de klassieke Mekongdelta-oversteek (HCMC-Phnom Penh)
  en de Huay Xai-Chiang Khong-grens — lost meteen ook Thailands eigen volgorde op (Chiang Mai nu
  eerst i.p.v. Bangkok). Kazachstan eindigde bij Nur-Sultan/Astana terwijl de bus naar Kirgizië
  vanuit Almaty vertrekt (1200 km uit de weg) — Astana op Youri's verzoek geschrapt, Kazachstan is
  nu een aaneengesloten zuidelijke lus. Verder heringedeeld of met een expliciete terugreis-notitie
  gecorrigeerd: Kroatië (nu alleen Dubrovnik, ook al bezocht elders), Albanië (Korçë toegevoegd,
  directe grensovergang naar Noord-Macedonië i.p.v. terug via Tirana), Turkije (Efeze/Pamukkale/
  Antalya voor Cappadocië/Ankara gegroepeerd), Georgië, Armenië (Dilijan nu laatste stop, dicht bij
  de Georgische grens), Azerbeidzjan, Oezbekistan (Samarkand eerst i.p.v. Tasjkent), Taiwan
  (Kaohsiung-Taipei terugreis benoemd), Maleisië (Langkawi eerst i.p.v. Kuala Lumpur).
  Losstaand, op Youri's verzoek: Xinjiang (Ürümqi/Kasjgar) volledig uit China geschrapt
  (sociaalpolitieke reden) en vervangen door Zhangjiajie en Guilin/Yangshuo, naast Xi'an en Chengdu
  die al op de route stonden — binnenkomst in China nu via een rechtstreekse vlucht Tasjkent-Xi'an
  i.p.v. Tasjkent-Ürümqi. Vietnam herzien: Ha Giang Loop toegevoegd, Hue/Hoi An/Da Nang geschrapt
  (al bezocht), Da Lat en Phu Quoc als uitstapjes vanuit Ho Chi Minh City. Thailand-Maleisië nu per
  boot (de internationale veerboot Koh Lipe-Langkawi, alleen half oktober-mei) i.p.v. over land.
  Maleisië uitgebreid met een Borneo-etappe (Sarawak → Brunei → Sabah, de bekende "Borneo Overland
  Trail") tussen het schiereiland en Brunei in — Maleisië komt hierdoor twee keer voor in de route,
  hetzelfde patroon als Canada/Italië elders in de app. Filipijnen omgezet van vaste basis Manila
  naar een rondreis met een meerdaagse bootexpeditie El Nido-Coron. Indonesië met Sumatra
  (Bukit Lawang, Lake Toba, Bukittinggi) i.p.v. het al bezochte Java/Bali, Gili/Lombok/Komodo
  ongewijzigd. Nieuw totaal: 27 landen, ~338 dagen, ~€19.850 (was 336 dagen/€19.974).
  Toegepast via `rbMigrateEurasiaRouteOverhaul()` op zowel Eurasia Grand Tour zelf als de drie
  2026-07 split-routes (West-Eurazië Overland 🐫, Oost-Azië & Stille Oceaan 🗻, Zuidoost-Azië Grand
  Loop 🛕) — die delen dezelfde `RB_EXPEDITION_CONTENT`, maar hun blocks werden bij het seeden
  bevroren in `localStorage`, dezelfde migratie-valkuil als hieronder bij "Ten more expeditions
  split into standalone companions", nu structureel meegenomen in de migratie zelf.
- **Ten more expeditions split into standalone companions (2026-07)** — continuing the modularization
  analysis in `ROUTE_BUILDER_MODULES.md`, now built for every remaining expedition except the two
  self-driven-from-NL loops (Central European Grand Roadtrip, British Isles — decided to stay
  unsplit, see `ROADMAP.md`). 24 new routes total: **Pan-American Grand Tour 🌎** → Mexico 🌵,
  Midden-Amerika Loop 🌋, Andes Grand Traverse 🦙, Zuidelijke Kegel & Brazilië-finale 🧉;
  **Africa Grand Tour 🌍** → Zuidelijk Afrika Safari-lus 🦁, Afrikaanse Eilanden 🏝️, Oost-Afrika
  Safari Classic 🦒, Hoorn van Afrika & Egypte 🏺; **Mediterranean Civilizations Expedition 🏛️**
  → Iberia & Marokko/Tunesië 🏰, Malta & Italië 🏛️, Corsica & Zuid-Frankrijk ⛵, Griekenland &
  Cyprus 🏺, Anatolië 🕌, Egypte & Arabisch Schiereiland 🐪; **Nordic Arctic Expedition ❄️** → five
  fully independent routes (Scandinavië Overland 🚂, Svalbard 🐻‍❄️, Faeröer 🐑, IJsland ❄️,
  Groenland 🧊 — not grouped into a Major Trip, since the route's own notes already call the four
  islands "stuk voor stuk losse vluchtsprongen"); **Patagonia & Antarctica Expedition 🧊** →
  Patagonië Overland 🏔️, Antarctica-cruise 🐧; **India & Himalaya Expedition 🏔️** → Noord-India 🕌,
  Nepal 🏔️, Bhutan 🐉; **North America Grand Traverse 🌎** → Oost-Canada 🍁, West-Canada: Rockies &
  Vancouver 🏔️, VS Westkust Roadtrip 🌉; **Oceania Grand Expedition 🌊** → Pacific-eilanden 🌺,
  Tropisch/Outback Australië 🐊, Gematigd/Zuidelijk Australië 🍇, Nieuw-Zeeland 🥝 (Australia split
  by climate zone across two routes, the same "same country, different block" pattern already used
  for Chile/Argentina); **Caribbean & Amazon Expedition 🌴** → Caraïbische Eilanden-hop 🏝️,
  Suriname & Noord-Brazilië 🌴 (built despite that route's own notes arguing against a split — the
  modularization analysis deliberately disagreed, see its own reasoning); **West & Central Africa
  Expedition 🌍** → West-Afrika Overland 🥁, Centraal-Afrika & Eilanden 🦛.
  Same method as the Eurasia split below: every new route is built via its own
  `rbSeedXSplitExpeditions()` function (one new `localStorage` flag each) that pushes routes built
  by dedicated `rbBuildXRoute()` functions, reusing countries/days/budgets/order/content verbatim
  either via `rbContentFor()` (for the six routes with a shared `RB_EXPEDITION_CONTENT` entry) or
  copied inline (for the five hand-authored routes where a country repeats across legs — Italy,
  France, Canada, the US, Australia, New Zealand). All 13 original expeditions are completely
  untouched and still exist in full. Verified with a Node smoke test simulating the full real
  `DOMContentLoaded` boot sequence (all seed + migration functions in their real order, on a
  fresh `localStorage`): 51 total routes, zero duplicate names, zero malformed blocks, and every
  split's countries/days/budgets sum to exactly its original's totals in the same order.
- **Eurasia Grand Tour 🌏 split into three standalone expeditions (2026-07)** — first concrete
  build out of the modularization analysis in `ROUTE_BUILDER_MODULES.md`: **West-Eurazië Overland
  🐫** (Balkans → Turkey → Caucasus → Central Asia, 146 days, €8,159), **Oost-Azië & Stille Oceaan
  🗻** (China → Mongolia → Japan → Taiwan, 66 days, €5,725) and **Zuidoost-Azië Grand Loop 🛕**
  (Mainland SEA → Maritime SEA → Indonesia & East Timor → Singapore, 124 days, €6,090), built via
  `rbBuildWestEurasiaOverlandRoute()` / `rbBuildEastAsiaPacificRoute()` /
  `rbBuildSoutheastAsiaGrandLoopRoute()`, seeded once by `rbSeedEurasiaSplitExpeditions()`. All
  three reuse the exact same countries, days, budgets, order and per-country content as the
  original — via `rbContentFor('Eurasia Grand Tour 🌏', ...)`, same as the original route's own
  builder function — nothing was re-verified or re-priced, this is a pure regrouping. Together the
  three sum to exactly the original's 27 countries / 336 days / €19,974, in the same order
  (verified with a Node smoke test). **Eurasia Grand Tour 🌏 itself is untouched** and still exists
  as its own full 11-12 month expedition alongside these three — this was itself the route's own
  suggestion, quoted in its `notes`: *"Overweeg desondanks om deze route ooit te knippen in twee
  losse expedities..."* (split into three here instead of two, since Oost-Azië and Zuidoost-Azië
  turned out distinct enough — different climate window, no overland link between them — to stand
  on their own too). The other 12 expeditions' proposed splits from the same analysis are not yet
  built; see `ROADMAP.md`.
- **Price/visa/travel-advisory verification, route 13 — the last one (2026-07)** — British Isles &
  Celtic Coast Expedition 🍀. All 15 legs checked; the route's flat €90/day rate (same
  simplification Central European Grand Roadtrip originally used) needed correcting on 13 of them,
  mostly +11% to +39% — only Wales and the Opal Coast/Lille leg were already close. Biggest
  increases: Cornwall (summer premium), both Ireland legs (Ireland is now the EU's second most
  expensive country), the Channel Islands, and the Scottish Highlands/Skye leg (Skye itself runs
  far above the rest of the Highlands). New total €13,245 ground costs, was €10,350, 115 days
  unchanged. ⚠️ New since the route was built: a UK ETA (€23/person) has been mandatory for Dutch/EU
  visitors since April 2025, and as of April 2026 also covers the later Isle of Man/Jersey/Guernsey
  ferry hops under the same authorisation. Also found: the Bayeux Tapestry is closed for renovation
  until ~October 2027 (Bayeux's leg destinations updated accordingly), and Edinburgh's Fringe
  Festival (7–31 Aug 2026) can triple accommodation prices if a real start date lands the Scotland
  leg's Edinburgh nights inside that window. Details in each leg's own notes.
- **Price/visa/travel-advisory verification, route 12 (2026-07)** — Africa Grand Tour 🌍 (all
  18 countries checked; 10 needed budget corrections — Namibia the biggest, €100→€200/day, since
  it lost visa-free status for Dutch passports in April 2025 and needs a 4x4 rental for nearly the
  whole route; Lesotho, Zimbabwe's base rate, Mauritius and Zambia confirmed accurate; Madagascar's
  daily rate actually went down, €78→€69, with its real extra costs — the Nosy Be flight, 4x4
  transfers — broken out as separate notes instead. New total €33,095, was €29,225, 288 days
  unchanged). ⚠️ Live finding: Lalibela, Gondar, the Simien Mountains and the Danakil Depression are
  currently **red** ("do not travel") on the Dutch advisory over the Amhara conflict and Afar
  border instability — flagged directly on Ethiopia's block and kept in the route as-is (Youri's
  call), but re-check nederlandwereldwijd.nl before any real booking. Also clarified Rwanda's "Lake
  Kivu" stop means Kibuye/Karongi, not Rubavu (which faces M23-held Goma), and flagged a temporary
  DRC-border closure (Ebola) plus a nearby 2025 ADF-linked attack near Uganda's Queen Elizabeth
  NP/Bwindi corridor. Details in each country's own notes.
- **Price/visa/travel-advisory verification, routes 10-11 (2026-07)** — North America
  Grand Traverse 🌎 (all 6 legs confirmed accurate; refactored into its own
  `rbBuildNorthAmericaRoute()` to fix the same migration gap described below) and
  Oceania Grand Expedition 🌊 (9 of 14 legs corrected — mostly specialist activity
  costs that a flat day-rate missed: Tonga's whale-swim tour, Vanuatu/Fiji inter-island
  flights, Australia's remote regions — Kimberley, Uluru, Great Barrier Reef, Tasmania,
  Kangaroo Island — and New Zealand's South Island — Milford Sound, glaciers, Great
  Walks. New total €17,943, was €14,780). Details in each route's own notes.
- **Price/visa/travel-advisory verification, routes 8-9, plus a critical migration
  fix (2026-07)** — Nordic Arctic Expedition ❄️ (all 7 confirmed accurate — this is
  deliberately the most expensive route in the app) and Pan-American Grand Tour 🌎
  (5 of 15 legs corrected: Belize, Colombia, Ecuador — Galápagos park/tour costs
  weren't covered at all, the biggest single gap found this session — Chile-north,
  Brazil-south). **More importantly**: every correction made this session (9 routes)
  was only landing in source code, not reaching Youri's already-seeded browser data,
  since each route's seed function is gated by a flag that already fired for him.
  Fixed by refactoring the remaining inline-built routes into their own
  `rbBuildXRoute()` functions and adding `rbMigratePriceVerificationRound1()`, a
  one-time migration that wholesale-replaces all 9 affected routes so the
  corrections actually reach the live app.
- **Price/visa/travel-advisory verification, routes 6-7 (2026-07)** — Caribbean &
  Amazon Expedition 🌴 (Jamaica, Bonaire, Dominica corrected upward — €7,450 total,
  was €6,955) and West & Central Africa Expedition 🌍 (all 10 countries confirmed
  accurate, no budget changes; Gabon flagged as the tightest/riskiest budget due to
  Loango logistics). Details in each route's own notes.
- **Price/visa/travel-advisory verification, routes 4-5 (2026-07)** — Patagonia &
  Antarctica Expedition 🧊 (Chile/Argentina/Antarctica all confirmed accurate, no
  changes) and India & Himalaya Expedition 🏔️ (Nepal corrected €47.60→€60/day —
  mandatory Annapurna guide/porter/permits weren't covered; India and Bhutan confirmed
  accurate). Details in each route's own notes in the app (kept brief here going
  forward — see "Needs attention next time" in the README for what's still open).
- **Central European Grand Roadtrip 🚗 price/visa/travel-advisory verification
  (2026-07)** — third route verified. This route previously used a flat €120/day rate
  for all 14 countries (deliberately, at the time) — the check found that doesn't hold
  up per-country: Switzerland (€120→€200/day) and Liechtenstein (€120→€165/day) were
  badly underbudgeted (Switzerland is one of the most expensive countries in Europe),
  while Croatia (€120→€85), Serbia (€120→€60, the most extreme correction — less than
  half), Hungary (€120→€90), Slovakia (€120→€80), Czechia's Brno leg (€120→€85), Poland
  (€120→€65) and Germany's Dresden leg (€120→€95) were all overbudgeted. Czechia's
  Prague leg went the other way (€120→€130 — Prague has gotten notably pricier).
  France (Alsace), Germany (Bavaria), Austria, the Dolomites/Milan/Tuscany/San Marino
  legs and Slovenia stayed within 15% of €120 and are unchanged. New total: €8,030
  ground costs (was €8,400) — the increases and decreases mostly offset. Also
  corrected a car-cost assumption: Austria only needs a 10-day highway vignette
  (€12.80) for a trip this length, not the €106.80 annual one the route had assumed.
  Added notes flagging Serbia's ongoing protest movement (Belgrade/Novi Sad, since
  late 2024) and Croatia's landmine zones near Plitvice (stay on marked paths).
- **Eurasia Grand Tour 🌏 price/visa/travel-advisory verification (2026-07)** — second
  route verified (after the Mediterranean pilot), all 27 countries checked the same
  way. Days unchanged everywhere; budget corrections: North Macedonia (€46.40→€37/day,
  was the cheapest country in the region but overbudgeted), Mongolia (€57.50→€65/day,
  the Gobi jeep tour is a real separate cost pulling the average up), Brunei
  (€100→€120/day, Ulu Temburong NP requires a mandatory guide/tour), Singapore
  (€150→€125/day, still realistic for this travel style but €150 carried more margin
  than needed). The other 23 countries were already accurate. Also added `notes` for
  several countries flagging real separate costs not covered by the daily rate
  (Tajikistan's Pamir Highway jeep, Mongolia's Gobi tour, Indonesia's Komodo boat
  trips, Timor-Leste's Jaco Island 4x4) and border-safety specifics (Armenia's
  Azerbaijan-border roads, Cambodia/Thailand's border zones). Fixed a real gap in
  `rbContentFor()`: it builds blocks for the 6 `RB_EXPEDITION_CONTENT`-sourced routes
  (Eurasia, Pan-American, Africa, Nordic Arctic, Patagonia & Antarctica, India &
  Himalaya) but was silently dropping any `notes` field — added `notes: c.notes` to
  its return value so future notes on any of those routes actually reach the app.
  - **⚠️ Live finding**: the Cambodia–Thailand land border (Poipet) is currently
    **closed** due to their border conflict (ceasefire holding since late 2025, but
    the crossing itself hasn't reopened) — Cambodia's transport-to-next now says to
    fly Siem Reap/Phnom Penh→Bangkok instead of taking the bus, dated and marked as a
    snapshot to re-check on nederlandwereldwijd.nl before relying on it.
- **Mediterranean Civilizations Expedition 🏛️ price/visa/travel-advisory verification
  (2026-07)** — pilot run for verifying real-world data across all 13 expeditions (the
  rest are still open, see "Needs attention next time" in the README). All 13 countries checked via
  web research against current prices (recalibrated to Youri's actual travel style —
  between budget- and comfort-backpacker, not the bare-minimum floor), visa rules and
  the Dutch government's official travel advisory (nederlandwereldwijd.nl). Days are
  unchanged everywhere; budgets corrected where the research disagreed: Malta
  (€100→€75/day, was too high), Sardinia (€83→€100/day, island premium was
  underestimated), Corsica (€90→€95/day, few hostels so a budget hotel is often
  needed), mainland Greece (€58→€70/day, Delphi/Meteora/Peloponnese have few hostels
  and KTEL intercity buses got ~10% pricier), Egypt (€46→€56/day, to cover major-site
  entrance fees not otherwise budgeted), Oman (€85.70→€110/day, Jebel Shams/Wahiba
  Sands need a rental car/tour, no public transport), Bahrain (€116.70→€100/day) and
  Qatar (€133.30→€105/day, both were overbudgeted for what's actually available).
  Spain, Morocco, Tunisia, Sicily, Naples, Rome, Provence, Crete, Cyprus, Turkey and
  Jordan were already accurate. New route/region totals reflect these changes; see the
  route's own notes for the full breakdown, including visa specifics per country and a
  Jordan Pass tip.
  - **⚠️ Live finding, not just a data correction**: research surfaced an active
    regional Iran-US/Israel conflict (as of July 2026) with strikes on Jordan, Oman,
    Qatar and Bahrain. Bahrain's Dutch travel advisory is currently **red (do not
    travel)**; Jordan and Qatar are orange country-wide; Oman is orange only for
    Musandam/Duqm/Salalah/Sohar (this route's Muscat/Nizwa/Jebel Shams/Wahiba Sands
    area is yellow). A pause in strikes was reported in mid/late July, so this may
    already have changed — treat it as a dated snapshot, not a fixed fact, and verify
    on nederlandwereldwijd.nl yourself before any real travel. Flagged directly on the
    Jordan/Oman/Bahrain/Qatar blocks in the app (⚠️ in their notes) as well as in the
    route's own notes, not just here.
- **Africa Grand Tour 🌍 reordered south-to-north (2026-07)** — the route's climate_summary
  had long claimed East Africa's and Southern Africa's dry seasons were "opposite," making
  the seasonal trade-off unfixable without cutting the country order down. Web research
  (at Youri's request, to look at improving it) found this false: East Africa's dry season
  (June-October) and Southern Africa's dry season (May-October) largely overlap — the real
  problem was sequencing, since the old order only reached Southern Africa in November,
  already past the shared window. Fix: reversed to a south-to-north sweep via
  `rbBuildAfricaGrandTourRoute()`/`rbMigrateAfricaGrandTourReorder()` — South Africa/
  Lesotho/Eswatini open the trip (June, their true dry season), then Southern Africa's loop
  (July-October, its actual peak), then the Islands, then East Africa (November-January —
  not the absolute peak, but a recognized strong window: short rains plus the southern
  Serengeti's calving season), ending with a new "Hoorn van Afrika & Egypte" finale
  (February-March). Research also surfaced a second, previously undocumented bug: Ethiopia's
  main rains (kiremt) fall exactly June-September — the old route had bundled Ethiopia into
  that same window assuming it was dry season. Ethiopia now lands in its own good window
  (October-March, peak December-February) at the end of the trip instead. All 18 countries
  and every country's days/budget are unchanged — same 288 days, €29,225 total — only the
  order, region grouping and transport_to_next directions changed (a few new border
  crossings were needed; the Angola-Zambia crossing is flagged as less-traveled and worth
  extra pre-trip verification). Algeria/Lebanon/Israel (in the unrelated Mediterranean
  Civilizations Expedition) stay deliberately excluded, unchanged.
- **British Isles & Celtic Coast Expedition 🍀 built (2026-07)** — the thirteenth
  expedition, designed from a ChatGPT brainstorm Youri brought in, then reviewed and
  adjusted in a Q&A session. Self-driven from the Netherlands, same style as Central
  European Grand Roadtrip: England (South England, Cornwall, Wales, North England,
  Scotland, Northern Ireland — six United Kingdom legs), Isle of Man, Ireland (West,
  South & East), Guernsey, Jersey, France (Brittany, Normandy, Opal Coast & Lille) and
  Belgium — fifteen legs across five regions. Two route-order corrections came out of
  real ferry-geography research: Isle of Man moved from its own stop to a detour
  nested inside the North England leg (Heysham, its only year-round car-ferry port,
  sits on the route between North Wales and the Lake District anyway), and Ireland is
  driven north-to-south, exiting via Rosslare-Fishguard/Pembroke instead of
  backtracking to Dublin-Holyhead. Isle of Man itself is visited as a foot passenger
  with a one-day local car rental just for the TT Mountain Road, rather than paying for
  a round-trip car ferry — Youri's own idea, confirmed after discussion. Recommended
  start: June (ahead of Scotland's July-August midge peak, while France/the Channel
  Islands still get the last dry autumn window before their wet November). 86 days
  minimum / 115 days ideal, €13,245 per-person ground costs (after the 2026-07
  price/visa/advisory verification pass, was €10,350 — see above) plus
  ≈€4,200–4,800 shared car/ferry costs. Known cosmetic gap: Isle of Man, Jersey and
  Guernsey aren't in the World map view's topojson lookup (`js/utils/isoCountries.js`)
  so those three blocks won't highlight there — same kind of limitation as the existing
  "country dropdown depends on the live Countries sheet" note in CLAUDE.md.
- **Route Builder stuck on "Loading your country list…" on the live site** — the
  country data loaded fine, but `css/base.css` had `.loading-spinner { display: flex }`,
  which beats the browser's default `[hidden] { display: none }` even after JS sets
  `el.hidden = true`. Fixed with a global `[hidden] { display: none !important; }`
  rule in `css/base.css`. This also silently fixes the same latent issue for
  `.rb-calendar-panel` / `.rb-map-panel` (both toggle `.hidden` too and both had an
  explicit `display: grid`/`flex`).
- **Full time-realism audit, applied (2026-07)** — every country/leg across all eight
  content-bearing expeditions was checked against a slow, backpacker-style travel pace
  (enough time to actually experience a place, not just arrive/see the highlight/leave)
  and corrected via `rbMigrateTimeAuditCorrections()` in `js/pages/routeBuilder.js`
  (runs once, forces the corrected `days` onto already-seeded routes — a regular
  content patch wouldn't have touched non-empty-but-wrong values). No countries were
  added, removed or reordered. Biggest corrections: Eurasia Grand Tour 🌏 (200→344 days
  — China 12→28, Turkey 12→24, Philippines 10→21, Indonesia 12→21 were the most
  underestimated), Patagonia & Antarctica Expedition 🧊 (37→53 — both Chile and
  Argentina underestimated how weather-dependent Patagonian trekking is), Africa Grand
  Tour 🌍 (247→277), India & Himalaya Expedition 🏔️ (50→59), Nordic Arctic Expedition
  ❄️ (53→68), North America Grand Traverse 🌎 (54→69), Mediterranean Civilizations
  Expedition 🏛️ (138→147 — Rome and the Turkey/Anatolia leg were the weak spots).
  Pan-American Grand Tour 🌎 was already the best-paced route (274→286, and two legs —
  Chile-north/Argentina-north — were actually shortened, the only "too long" findings
  in the whole audit).
- **Region-level Season/Budget filled in** — Eurasia Grand Tour's 11 regions and
  Pan-American Grand Tour's 10 regions now each have a Season and Budget (the budget is
  the sum of that region's countries), reasoned from the route's overall
  best-starting-month so the whole multi-region sequence stays climate-coherent leg to
  leg instead of just having one single best-starting-month for the entire route.
- **Route-level Travel Style / Best Starting Month / Climate Summary filled in for all
  eight** — Eurasia Grand Tour, Africa Grand Tour, Nordic Arctic Expedition, Patagonia
  & Antarctica Expedition and India & Himalaya Expedition had none of these set at all;
  Pan-American Grand Tour had a Best Starting Month but no Travel Style/Climate
  Summary. All eight now have a reasoned climate_summary comparing start-month
  scenarios, in the same style as the pre-existing Mediterranean/North America ones.
  Africa Grand Tour's was, at the time, an acknowledged, unresolved trade-off: keeping
  the then-current country order (Egypt → ... → Eswatini) meant no single start month
  put both East Africa and Southern Africa in their dry season at the same time. This
  was later found to be based on a false premise and fixed by reordering the route —
  see "Africa Grand Tour reordered south-to-north" above.
- **Eurasia Grand Tour's country list changed (2026-07)** — at Youri's explicit request:
  Turkmenistan and Myanmar removed (hard to visit/not realistic for this travel
  style), East Timor added right after Indonesia (reachable via the Kupang/Batugade
  land border), and Singapore moved from the middle of Maritime Southeast Asia to the
  very last block of the whole expedition as a deliberate finale. New totals: 27
  countries (was 28), 336 days, €20,000.
- **Oceania Grand Expedition 🌊 built (2026-07)** — no longer backbone-only. Designed
  in a Q&A session (route, countries, Pacific island groups, Australia/New Zealand
  breakdown, travel time, budget, transport, season) and built the same way as
  Mediterranean/North America: 14 legs across 4 regions (Pacific Opener: Fiji, Vanuatu,
  Samoa, Tonga, Cook Islands; Tropisch Australië and Gematigd Australië: Australia
  across 7 legs; Nieuw-Zeeland Finale: New Zealand across 2 legs). Days use the
  "ideal" tempo tier; budgets are the midpoint between Budget Backpacker and Comfort
  Backpacker (Youri's own chosen travel style). 183 days total, €14,780 ground costs.
  French Polynesia, New Caledonia, Palau, the Solomon Islands, Micronesia, Kiribati
  and Papua New Guinea were deliberately left out — see the route's own notes for why.
- **Caribbean & Amazon Expedition 🌴 built (2026-07)** — no longer backbone-only, and
  renamed from "Caribbean Expedition 🏝️". Designed in a Q&A session from a
  ChatGPT-brainstormed country list, built the same way as Oceania: 10 legs across 4
  regions (Grote Antillen: Cuba, Jamaica; Nederlandse Caraïben: Curaçao, Bonaire;
  Kleine Antillen: Guadeloupe, Dominica, Saint Lucia, Grenada; Suriname & Amazone:
  Suriname, Brazil). Days use the "ideal" tempo tier; budgets are the midpoint
  between the Goedkoop and Normaal backpacker tiers from the design discussion (Youri's
  own chosen travel style). 97 days total, €6,955 ground costs. One change from the
  original brainstorm order: the Dutch ABC islands moved to right after Jamaica
  instead of after the Lesser Antilles, since they sit far west of both the Lesser
  Antilles and Suriname — the original order would have meant backtracking west then
  east again.
- **West & Central Africa Expedition 🌍 built (2026-07)** — no longer backbone-only,
  and the last of the eleven routes to get real content. Designed in a Q&A session
  from a ChatGPT-brainstormed country list, built the same way as Oceania/Caribbean &
  Amazon: 10 legs across 4 regions (Kaapverdische Eilanden: Cape Verde; Senegambia:
  Senegal, Gambia; Golf van Guinee: Ivory Coast, Ghana, Togo, Benin; Centraal-Afrika &
  Eilanden: Cameroon, São Tomé & Príncipe, Gabon). Days use the "ideal" tempo tier;
  budgets are the midpoint between the Goedkoop and Realistisch tiers from the design
  discussion. 93 days total, €5,160 ground costs. Two changes made after reviewing the
  design: Taï National Park dropped from Ivory Coast (remote, costs 3-4 extra days for
  content available elsewhere), and Cameroon's content shifted from Mount
  Cameroon/Limbe (Southwest Region — an active conflict zone since 2016, the
  "Anglophone Crisis") to Douala/Kribi/Yaoundé in the stable Francophone regions.
  Angola was deliberately left out of this route — see below.
- **Angola added to Africa Grand Tour 🌍 (2026-07)** — originally part of the West &
  Central Africa brainstorm, but moved here instead via `rbMigrateAngolaIntoAfricaGrandTour()`:
  it borders Namibia (real overland crossing at Oshikango/Santa Clara), already the
  last country in that route's "Southern Africa" region, rather than being an isolated
  flight-only endpoint on the West Africa route. Inserted right after Namibia — at the
  time, followed by a flight from Luanda to Cape Town/Johannesburg to rejoin the South
  Africa Finale, since the whole "Southern Africa" region fell in the rainy season by
  this route's then-current June-start design. Both the flight-onward routing and the
  seasonal mismatch were superseded by the south-to-north reorder — see "Africa Grand
  Tour reordered south-to-north" above; Angola now continues overland to Zambia
  instead. New totals at the time of this addition: 18 countries (was 17),
  288 days (was 277), €29,225 (was €27,725).
- **Bahrain added to Mediterranean Civilizations Expedition 🏛️ (2026-07)** — inserted
  between Oman and Qatar via `rbMigrateBahrainIntoMediterraneanExpedition()`, closing
  the candidate-addition noted since that route was first built. 3 days, €350
  (Qal'at al-Bahrein/Dilmun civilisation, Bahrain National Museum, Al Fateh Grand
  Mosque, Tree of Life). New totals: 150 days (was 147), €2,500 for the "Egypte & het
  Arabisch Schiereiland" region (was €2,150).
- **Ferry winter-schedule caveat researched (2026-07)** — the generic "check actual
  timetables" warning on Malta-Sicily/Piraeus-Heraklion/Corsica-Marseille (Mediterranean
  Civilizations Expedition) was replaced with actual findings: Malta-Sicily (Virtu
  Ferries, Pozzallo-Valletta) is the genuine risk — fewer winter departures and
  weather-cancellation risk. Piraeus-Heraklion and the Corsica crossing (Corsica
  Ferries) both run near-daily, year-round with multiple operators — lower risk than
  assumed, though on Corsica, Toulon/Bastia sail far more often than Marseille/Ajaccio.
- **Central European Grand Roadtrip 🚗 built (2026-07)** — the twelfth expedition,
  and the first designed as a self-driven car trip from the Netherlands (no flights).
  Designed in a Q&A session from Youri's own route brief, covering four regions:
  Alpenlanden (France, Germany, Switzerland, Liechtenstein, Austria), Dolomieten &
  Noord-Italië (Italy across six separate legs — Dolomites, Milan, Turin, Cinque
  Terre, Tuscany, Venice — plus San Marino), Balkan (Slovenia, Croatia, Serbia,
  Hungary) and Midden-Europa (Slovakia, Czechia across two legs — Brno, then
  Prague — Poland, Germany again for the return leg). 70 days ideal (45 minimum),
  €8,400 per-person ground costs (Realistisch tier, same €120/day rate as every
  other expedition) plus €1,950 shared car costs (fuel/tolls/parking) — car costs
  are tracked once in the route notes rather than folded into each leg's budget, so
  per-country figures stay comparable to every other expedition. Two route-order
  fixes made during design, both to avoid crossing the same longitude band twice:
  Switzerland/Liechtenstein moved before Austria (saves ≈370 km and keeps the
  Grossglockner→Lienz→Dolomites link intact), and Milan/Turin/Cinque Terre merged
  into the existing Tuscany/San Marino dip after the Dolomites rather than placed
  before Austria as first proposed (avoids two separate southward detours in favor
  of one combined Northern-Italy loop). Recommended start: begin June.
