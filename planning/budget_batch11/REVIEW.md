# Phase 4 batch 11: Adriatic & Western Balkans 1/2 (20 routes), 2026-10-28

Figures per person, solo, one-way, EUR. "There & back" = flight_in + flight_out (own-car route: the drive). "Extras" includes the car extra.

## (a) Totals

| Route | Days | Ground today | There & back | Transport | Local | Extras | Added | All-in | Added % |
|---|---|---|---|---|---|---|---|---|---|
| Albania (6) | 6 | 240 | 210 | 0 | 30 | 0 | 240 | 480 | 100% |
| Albania + Montenegro (12) | 12 | 470 | 260 | 0 | 0 | 587 | 847 | 1317 | 180% |
| Albania Roadtrip (9) | 9 | 360 | 210 | 0 | 0 | 0 | 210 | 570 | 58% |
| Albanian Riviera (9) | 9 | 360 | 210 | 0 | 40 | 0 | 250 | 610 | 69% |
| Kosovo + Albania (9) | 9 | 270 | 240 | 12 | 58 | 0 | 310 | 580 | 115% |
| Bosnia + Croatia (9) | 9 | 412 | 230 | 0 | 0 | 414 | 644 | 1056 | 156% |
| Bosnia + Croatia + Montenegro (12) | 12 | 591 | 270 | 0 | 0 | 605 | 875 | 1466 | 148% |
| Bosnia + Montenegro + Budva (7-10) | 9 | 360 | 380 | 0 | 0 | 420 | 800 | 1160 | 222% |
| Bosnia Roadtrip (6) | 6 | 270 | 450 | 0 | 0 | 0 | 450 | 720 | 167% |
| Croatia + Bosnia via Split (7-10) | 9 | 456 | 210 | 0 | 0 | 493 | 703 | 1159 | 154% |
| Montenegro + Bosnia (9) | 9 | 351 | 370 | 0 | 5 | 306 | 681 | 1032 | 194% |
| Sarajevo + Mostar (5) | 5 | 180 | 450 | 0 | 20 | 20.5 | 490.5 | 670.5 | 273% |
| Serbia + Montenegro + Bosnia (12) | 12 | 500 | 290 | 0 | 0 | 668 | 958 | 1458 | 192% |
| Adriatic Roadtrip (14) | 14 | 944 | 280 | 0 | 0 | 954 | 1234 | 2178 | 131% |
| Austria + Slovenia + Croatia (10-14, own car) | 12 | 820 | 462 | 0 | 0 | 164 | 626 | 1446 | 76% |
| Complete Croatia (12) | 12 | 960 | 250 | 0 | 35 | 575 | 860 | 1820 | 90% |
| Croatia + Montenegro + Bosnia (12) | 12 | 644 | 330 | 0 | 20 | 489 | 839 | 1483 | 130% |
| Croatia Coastal Roadtrip (9) | 9 | 720 | 240 | 0 | 35 | 435 | 710 | 1430 | 99% |
| Croatia North to South (9) | 9 | 720 | 250 | 0 | 0 | 476 | 726 | 1446 | 101% |
| Dubrovnik + Surroundings (5) | 5 | 400 | 230 | 0 | 8 | 0 | 238 | 638 | 60% |

Flights: searched TIA, DBV, SPU, ZAG out (4 searches); everything else estimated (low confidence, see flights_batch11.csv).

## (b) Decisions for Youri

Car calls (rental EUR/day from car_costs CSV; fuel 7 L/100 km):
- **Albania Roadtrip: car treated as IN the rate** (EUR 0 added) although input says carInDailyRate=false. Notes say "~EUR 35-45/day including the rental car", budget is EUR 40/day. If wrong: +EUR ~263 (6 days x 33 + ~440 km fuel).
- **Bosnia Roadtrip**: carInDailyRate=true, nothing added (notes say it includes the car).
- **Public transport instead of a car** (notes say "bus/rental car", keyword mode = rental) for Albania 6, Albanian Riviera, Kosovo + Albania, Sarajevo + Mostar (notes name the EUR 10 bus). Albania 6 / Riviera: if a car instead: ~EUR 190 (4-5 days x 33 + fuel) instead of EUR 30-40 local.
- **Rental days start after the first city stay and stop on arrival in a city that needs no car**: Bosnia + Croatia 7 d (after Dubrovnik), Bos+Cro+Mont 9 d, Bos+Mont+Budva 7 d (after Sarajevo), Montenegro + Bosnia 4 d (drop on arrival in Sarajevo, saves ~EUR 120), Serbia+Mont+Bos 10 d (after Belgrade; Sarajevo days idle, a bus there could save ~EUR 100), Croatia+Mont+Bos 7 d (bus Split-Dubrovnik EUR 20 first), Complete Croatia 8 d, Coastal 6 d, North to South 6 d, Adriatic 13 d, Albania + Montenegro 10 d, Croatia + Bosnia via Split 6 d. Each extra/fewer day = EUR 33-48.
- **One-way drop fees are estimates**: EUR 80 domestic HR, EUR 100-120 cross-border (AL/BA/RS/SI to ME or BA, HR to ME/BA). Biggest single uncertainty (EUR 80-120 per route; real fees can be higher).
- **Km**: input km are straight-line x 1.3 and undercount loops. Overridden for Bosnia + Croatia (530 vs 370), Croatia + Bosnia via Split (850 vs 310), Adriatic (1250 vs 920). Others kept (fuel difference only EUR 10-20).
- Bosnia insurance surcharge (EUR 10-15/day in notes) added only on Croatia + Bosnia via Split (EUR 75); other Bosnia car routes' notes do not name it, so it is missing there (~EUR 40-75 each).
- Albania + Montenegro: green card EUR 40 added (notes EUR 30-50).
- **Own car (Austria + Slovenia + Croatia)**: drive in EUR 195 (1170 km), drive back EUR 267 (1510 km from Zadar; assumed the car must come home, route text says "fly home" which is impossible with an own car). Second SI vignette on the way back EUR 16 (est). Plitvice EUR 40 is peak-season price from notes (flagged; ~EUR 20-30 off-season).
- **Rafting (Serbia route)**: notes say ~EUR 60/day for a 2-day stop; 1 day priced (EUR 60). If 2 days: +EUR 60.
- Hvar ferry (Complete Croatia, Coastal): EUR 17 each way is an estimate, not in notes; car parking in Split not priced (notes give none).
- Open-jaw airports: Montenegro end = Podgorica code TGD EUR 150 (Tivat similar). "Split/Dubrovnik" (Bos+Cro+Mont) priced as Dubrovnik. Complete Croatia/North to South/Coastal flown in at Zagreb/Zagreb/Zadar, out Dubrovnik (route text allows reversed; same cost roughly).
- No visas (AL, BA, RS, XK, ME visa-free 90 days for Dutch per VISA_VACCINATION_RESEARCH.md).

## (c) Data problems in route text (not fixed)
- Albania Roadtrip: carInBudgetWording says included, but live block flag carInDailyRate=false (inconsistent).
- Austria + Slovenia + Croatia: "fly home from Zadar or Zagreb" contradicts mode own_car.
- Bosnia Croatia Montenegro 12 / Adriatic / Albania Montenegro: the notes say "Podgorica or Tivat", ambiguous airport.
- Kosovo + Albania notes say "Kukes, Shkoder, Theth" with a 2-day stay in Shkoder + Theth; the Theth minibus only runs in high season (route is flagged May-June/Sept in sibling routes).
- Dubrovnik + Surroundings: optional Kotor day trip has no price; not added (no price in notes).
- input km_in_route undercounts loop routes (see above); consider recomputing.
