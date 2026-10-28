# Phase 4 batch 19: British Isles (23 routes), 2026-10-28

## (a) Totals per route (EUR per person, solo)

| Route | Days | Ground today | There & back | Transport | Local | Extras | Added | All-in | Added % |
|---|---|---|---|---|---|---|---|---|---|
| Channel Islands, Brittany & Normandy/Opal Coast & Belgium 🥖 | 28 | 2228 | 150 | 90 | 0 | 1723 | 1963 | 4191 | 88% |
| Cotswolds + Bath + Southwest England (5-7 days) 🛁 | 6 | 540 | 200 | 0 | 0 | 442 | 642 | 1182 | 119% |
| Edinburgh (3-4 days) 🏰 | 4 | 360 | 220 | 0 | 10 | 45 | 275 | 635 | 76% |
| England + Wales + Northern Ireland Roadtrip (10-14 days) 🛣️ | 12 | 1060 | 471 | 0 | 0 | 330 | 801 | 1861 | 76% |
| England, Wales & Isle of Man 🎩 | 38 | 3174 | 185 | 90 | 0 | 2237 | 2512 | 5686 | 79% |
| Highlands + Isle of Skye (7-10 days) 🏔️ | 9 | 855 | 300 | 0 | 0 | 568 | 868 | 1723 | 102% |
| London (3-4 days) 🎡 | 4 | 380 | 200 | 0 | 0 | 23 | 223 | 603 | 59% |
| Northern Ireland (5-7 days) 🌉 | 6 | 510 | 200 | 0 | 0 | 353 | 553 | 1063 | 108% |
| Orkney + Shetland (5-7 days) ⚓ | 6 | 498 | 360 | 0 | 95 | 317 | 772 | 1270 | 155% |
| Outer Hebrides (Lewis + Harris) (5-7 days) 🏖️ | 6 | 558 | 300 | 0 | 0 | 579 | 879 | 1437 | 158% |
| Scotland & Northern Ireland 🥃 | 27 | 2241 | 210 | 0 | 0 | 1630 | 1840 | 4081 | 82% |
| Scotland Extended (10-14 days) 🏴 | 12 | 1020 | 220 | 0 | 0 | 857 | 1077 | 2097 | 106% |
| Scotland Roadtrip (7-10 days) 🚙 | 9 | 810 | 220 | 0 | 0 | 540 | 760 | 1570 | 94% |
| Scottish Highlands (5-7 days) 🦌 | 6 | 528 | 300 | 0 | 0 | 396 | 696 | 1224 | 132% |
| Wales (Snowdonia + Coast) (5-7 days) 🐉 | 6 | 510 | 200 | 0 | 0 | 503 | 703 | 1213 | 138% |
| Dublin (3-4 days) 🍺 | 4 | 352 | 180 | 0 | 25 | 61 | 266 | 618 | 76% |
| Ireland ☘️ | 22 | 2002 | 190 | 0 | 0 | 1440 | 1630 | 3632 | 81% |
| Ireland Complete (10-14 days) 🌈 | 12 | 1020 | 180 | 0 | 0 | 869 | 1049 | 2069 | 103% |
| Ireland Roadtrip (7-10 days) 🚗 | 9 | 747 | 190 | 0 | 0 | 663 | 853 | 1600 | 114% |
| West Ireland (5-7 days) 🌊 | 6 | 468 | 200 | 0 | 0 | 366 | 566 | 1034 | 121% |
| Wild Atlantic Way (7-10 days) 🌅 | 9 | 747 | 190 | 0 | 0 | 757 | 947 | 1694 | 127% |
| Isle of Man (3-4 days) 🏝️ | 4 | 400 | 340 | 0 | 0 | 275 | 615 | 1015 | 154% |
| Jersey + Guernsey (Channel Islands) (4-5 days) 🏝️ | 5 | 575 | 280 | 60 | 0 | 23 | 363 | 938 | 63% |

## (b) Decisions for Youri

**Method.** All 23 routes have `carInDailyRate: false`, so every driven route got ONE "Car:" extra on its first car block (£1 = €1.17, ETA ~£20 = €23 once per UK/IM/JE/GG route, none for IE). Web searches: 4 (London, Edinburgh, Dublin, Inverness; they returned floors/snapshots). All other fares are estimates (low confidence in flights_batch19.csv).

**Biggest call: the straight-line km are too low.** input.json km (straight line x1.3 between anchor points) badly under-counts loop routes. I overrode them with realistic loop km and say so in each extra label ("my estimate, calc N too low"): Highlands+Skye 650 (calc 370), Scottish Highlands 500 (270), Scotland Roadtrip 800 (430), Scotland Extended 1,600 (1,050; notes give NC500 = 516 miles), Hebrides 450 (150), Wales 800 (320), Ireland 1,700 (840), Ireland Complete 1,600 (1,030), Ireland Roadtrip 1,000 (650), West Ireland 400 (200), Wild Atlantic Way 1,500 (700). Fuel is only about €0.14/km, so if wrong the swing is ~€30-€100 per route. Routes taken at calc km: Cotswolds 590, NI 130, Scotland+NI 1,210 (probably still low, real ~1,800, +€90), England/Wales/IoM 2,490.

**Car calls (rental days, in rate or not: never in rate):**
- England+Wales+NI (own_car, notes say bring own car via Harwich): treated as own car. Getting there = fuel to Hook of Holland + Stena EUR 66 (notes) + car supplement ~60 (my estimate; EUR 66 is likely a foot-passenger fare). Getting back 335 = Belfast-Cairnryan with car ~100 + drive to Harwich + HoH ferry. Holyhead-Dublin priced with the car (97). If the notes mean 66 for car+driver, in drops by 60.
- England, Wales & IoM (own_car by keyword, text says hire in London): rental 35 days (not the first 3 London days), 1,750 + one-way drop Newcastle ~100 (est) + fuel 364. IoM block: the one-day local hire is already in the block budget, nothing added; the main car stays parked at Heysham but is still paid (cheaper: return and re-rent, saves maybe 150).
- Scotland & Northern Ireland (own_car by keyword, text says hire in Edinburgh): rental 24 days (22 Scotland minus 3 Edinburgh days + 5 Belfast) + Cairnryan-Belfast with car ~130 (est) + one-way drop Belfast ~100 (est, rental firms often refuse or charge more for GB-NI). Total 1,607.
- Channel Islands/Brittany/Belgium (own_car by keyword, text says flight to Guernsey + hire in Saint-Malo): rental 23 days to the Amsterdam drop, one-way cross-border fee ~200 (est, could be 150-350), so flight_out = 0 (car drives home) and the 340 km BE/NL are in the car extra. Ferries Guernsey-Jersey 35 and Jersey-Saint-Malo 55 are estimates (notes give no price).
- Ireland (own_car by keyword, text says hire in Dublin): rental 22 days, drop Cork ~80 (est). Own car from NL would instead need a Hook of Holland-Harwich + Irish Sea trip; not priced.
- Orkney+Shetland: no rental car on the NorthLink ferry assumed; local hire on the islands 5 days x 50 + 300 km. Ferries Aberdeen-Kirkwall 50 and Kirkwall-Lerwick 45 in `local` (my estimates; notes give none). Return flight 230 (two tickets) is low confidence; an overnight ferry back to Aberdeen is the cheaper alternative.
- Hebrides: CalMac Uig-Tarbert (80) and Stornoway-Ullapool (110) with car are estimates, in the car extra. Flies in/out of Inverness.
- London 4d: keyword said rental, but nothing in the notes needs a car, so I added none (only flights + ETA). Jersey+Guernsey 5d: same, no car added (small islands, buses); if you want one, +4 days x EUR 65 + fuel is ~EUR 280.
- Isle of Man 4d: car 4 x 60 + 80 km (the notes say drive to Castletown/Peel); the island has good buses and historic railways, so could be 0. Flights 170 each way = AMS-MAN + MAN-IOM (est).
- Ireland Roadtrip: out of Shannon with drop ~60 (est). Wild Atlantic Way: in Dublin, out Cork, drop ~80, km includes Dublin-Donegal ~270. Ireland Complete: UK ETA added as `optional` (NI side trip is optional).
- Snowdon Mountain Railway: notes give "return train tickets ~GBP 45-62"; I read that as the Snowdon railway return, took the midpoint (63) and did not halve it. If it means a mainline train instead, remove it.
- Other notes prices used: Roman Baths 33, Edinburgh Castle 22, Giants Causeway GBP 9 = 11 (NI + England/Wales/NI), Book of Kells 23, Guinness 38, Cliffs of Moher 11. Nothing else was invented. Edinburgh Stirling train (10) and Dublin Glendalough bus (25) are `local` estimates.

## (c) Data problems in the route text (reported, not fixed)
- Several routes still say "Condor Ferries" (Channel Islands/Brittany block 0 and 1) while Jersey+Guernsey notes say Condor stopped in March 2025; the Guernsey note says "via Brittany Ferries", the Jersey note says "via DFDS" (contradictory with each other).
- Mode is a keyword guess that clashes with the text for 5 routes (own_car vs text "hire a car"/flight in): Channel Islands, England/Wales/IoM, Scotland+NI, Ireland, and England+Wales+NI is the only true own car. London and Jersey+Guernsey have no car in the notes at all.
- Highlands+Skye notes say "As the Highlands route above"; Isle of Man 3-4d and Jersey+Guernsey notes flag overlap with the Expedition-split routes (known, left in).
- Ireland Roadtrip and West Ireland say "Budget ~EUR 70-90/day including a rental car", but carInDailyRate is false (R2d lowered the budgets), so the car is added here, as the brief requires.
- England+Wales+NI: notes say "Hook of Holland-Harwich ~EUR 66" without saying whether that is the car fare. Wales route notes: "return train tickets ~GBP 45-62" is ambiguous (see above).
