# Phase 4 batch 14: Greece, Cyprus & Turkey (19 routes), 2026-10-28

Per person, solo, one-way fares, 2026 euros. "Ground" = existing block budgets, unchanged. Extras exclude optional items.
No WebSearch was used: every new airport fare (flights_batch14.csv) and every ferry/bus price is an estimate, low confidence.

## (a) Totals

| Route | Days | Ground today | There & back | Transport | Local | Extras | Added | All-in | Added % |
|---|---|---|---|---|---|---|---|---|---|
| cyprus-6-days | 6 | 390 | 320 | 0 | 0 | 240 | 560 | 950 | 144% |
| cyprus-greece-9-days | 9 | 589 | 280 | 75 | 46 | 30 | 431 | 1020 | 73% |
| cyprus-roadtrip-incl-northern-cyprus-9-days | 9 | 1125 | 320 | 0 | 0 | 0 | 320 | 1445 | 28% |
| athens-4-days | 4 | 256 | 230 | 0 | 14 | 30 | 274 | 530 | 107% |
| athens-day-trips-6-days | 6 | 384 | 230 | 0 | 0 | 276 | 506 | 890 | 132% |
| athens-peloponnese-extended-12-days | 12 | 768 | 230 | 0 | 0 | 592 | 822 | 1590 | 107% |
| corfu-5-7-days | 6 | 380 | 290 | 0 | 0 | 186 | 476 | 856 | 125% |
| crete-roadtrip-7-10-days | 9 | 630 | 290 | 0 | 0 | 465 | 755 | 1385 | 120% |
| cyclades-5-7-days | 6 | 410 | 280 | 53 | 40 | 0 | 373 | 783 | 91% |
| cyclades-island-hopping-7-10-days | 9 | 615 | 280 | 95 | 45 | 0 | 420 | 1035 | 68% |
| greece-roadtrip-12-days | 12 | 1380 | 230 | 0 | 0 | 30 | 260 | 1640 | 19% |
| greek-islands-paros-naxos-santorini-9-days | 9 | 1125 | 230 | 0 | 165 | 0 | 395 | 1520 | 35% |
| ionian-islands-5-7-days | 6 | 390 | 320 | 15 | 0 | 298 | 633 | 1023 | 162% |
| northern-greece-9-days | 9 | 576 | 290 | 0 | 0 | 468 | 758 | 1334 | 132% |
| peloponnese-loop-9-days | 9 | 576 | 230 | 0 | 0 | 443 | 673 | 1249 | 117% |
| rhodes-5-7-days | 6 | 380 | 350 | 0 | 0 | 217 | 567 | 947 | 149% |
| southern-europe-highlights-roadtrip-14-days | 14 | 920 | 260 | 280 | 0 | 30 | 570 | 1490 | 62% |
| istanbul-4-days | 4 | 204 | 260 | 0 | 0 | 80 | 340 | 544 | 167% |
| istanbul-thrace-6-days | 6 | 306 | 260 | 0 | 25 | 0 | 285 | 591 | 93% |

## (b) Decisions for Youri

Car calls (all `carInDailyRate` false unless noted; GR rental €45/day, fuel €2.191, tolls 60% of km × €6.5/100 km; CY rental €35/day, no tolls):

| Route | Rental days | km | Car total | If wrong |
|---|---|---|---|---|
| cyprus-6-days | 6 (all) | 240 | 240 | 5 days: -35 |
| athens-day-trips | 3 (Sounion, Delphi, Nafplio day trips; Athens days on foot) | 410 | 214 | Delphi by bus instead: about -50 |
| athens-peloponnese-extended | 9 (after 3 Athens days) | 710 | 542 | each day ±45 |
| corfu | 4 (from leaving Corfu Town) | 40 | 186 | input km (40) looks low, real loop about 100 km: +10 |
| crete | 9 (all, incl. optional Samaria days) | 310 | 465 | input km low (real about 400): +15; 7 days: -90 |
| ionian | 6 (3 per island, separate rentals; ferry priced foot-passenger 15) | 180 | 298 | a car-ferry instead: +40-60 |
| northern-greece | 7 (after 2 Thessaloniki days) | 750 | 459 | ±45/day |
| peloponnese-loop | 7 (after 2 Athens days) | 580 | 427 | notes say rental+fuel "€25-35/day on top" (9 days = 225-315), the reference CSV gives 427: I followed the CSV |
| rhodes | 4 (from leaving Old Town) | 110 | 197 | ±45/day |
| cyprus-roadtrip, greece-roadtrip | car IS in the daily rate (flag true): nothing added | | 0 | |

Other calls:
- **Greek Islands Paros-Naxos-Santorini**: notes say the old €125/day budget includes ferries (€20-70 per leg), but the flag-based model prices them separately (local 165: Athens-Paros 40, Paros-Naxos 17, Naxos-Santorini 38, Santorini-Athens flight 70). Possible double count of about 165 if Youri's R2d budget still contains ferries.
- **Cyprus + Greece flight Larnaca-Athens**: notes "from ~€120 return" gives 120 × 1.25 / 2 = 75 (flagged). A realistic one-way is probably 80-100.
- **Acropolis €30** is only quoted in the Athens-4 notes; other routes that say "see the standalone Athens trip" (Cyprus+Greece, Athens day trips, Extended, Greece Roadtrip, SE Highlights) got the same €30. Remove if not wanted.
- **Istanbul-4**: Hagia Sophia €25 + Topkapi combo €55 taken from the notes (the Topkapi figure looks high). Bosphorus cruise has no price: not added.
- **Istanbul + Thrace**: Edirne day trip bus one-way €10-15, priced as a return (25) in local.
- **Cyclades routes**: the way home goes ferry-to-Piraeus (local on last block) + flight Athens-AMS 110, not a flight from Santorini/Milos.
- **Meteora** monastery entry: 3 monasteries assumed (9). **Epidaurus festival** (optional, midpoint of €10-55 = 33) excluded from totals.
- **Northern Cyprus insurance** (~€20) not added: only needed if the rental firm allows the car across, and the Green Line crossing described is on foot.
- Visas: none (GR, CY, TR visa-free for Dutch passport per VISA_VACCINATION_RESEARCH.md).
- Flights: only SKG back and LIS existed. New rows: ATH, LCA, CFU, CHQ, JTR, EFL, ZTH back, SKG out, RHO, IST (all estimates).

## (c) Data problems in the route text (not fixed)

- **Southern Europe Highlights Roadtrip**: titled and tagged a rental road trip, but every leg between blocks is a bus or flight (Lisbon-Seville bus, Seville-Rome flight, Rome-Athens flight). `distance.km_by_country` (4260 km, incl. IT 2160/GR 1680) is meaningless as driving, so no car was added. Also block 4 (Santorini) is optional yet the return fare is priced from Santorini.
- **Corfu and Crete**: input km (40 and 310) is straight line × 1.3 and underestimates real driving on islands.
- **Cyprus-roadtrip budget notes** still say "including the rental car" and match the flag (true); Corfu/Crete/Rhodes/Ionian notes say "including rental car" or "average" but flag false, so a car was added.
- **Greek Islands 9d** is a single 9-day block covering four places, so ferries can only be attached as `local`, not as per-leg `transport`.
