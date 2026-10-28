# Phase 4 batch 18: Nordics (2/2), 16 routes, priced 2026-10-28

Per person, solo, one-way parts, 2026 euros. "There & back" = flight in + flight out. Files: `costs_batch18.js`, `flights_batch18.csv` (12 new airport rows). 8 web searches; most fares are aggregator snapshots, so the Nordic fares are medium/low confidence.

## (a) Totals

| Route | Days | Ground today | There & back | Transport | Local | Extras | Added | All-in | Added % |
|---|---|---|---|---|---|---|---|---|---|
| Norway + Sweden: Fjords & Capitals (12d) | 12 | 1195 | 260 | 95 | 175 | 44 | 574 | 1769 | +48% |
| Norway Roadtrip (12d) | 12 | 1320 | 280 | 0 | 0 | 1348 | 1628 | 2948 | +123% |
| Oslo (5d) | 5 | 625 | 280 | 0 | 0 | 0 | 280 | 905 | +45% |
| Scandinavia Overland | 29 | 2800 | 310 | 105 | 550 | 0 | 965 | 3765 | +34% |
| South & Central Norway (14d) | 14 | 1540 | 280 | 0 | 0 | 1387 | 1667 | 3207 | +108% |
| South Norway (9d) | 9 | 1215 | 280 | 0 | 0 | 0 | 280 | 1495 | +23% |
| Svalbard (Longyearbyen) (6d) | 6 | 660 | 580 | 0 | 0 | 385 | 965 | 1625 | +146% |
| Denmark + Sweden + Norway Overland (12d) | 12 | 1153 | 220 | 52 | 35 | 0 | 307 | 1460 | +27% |
| Northern Europe Baltic Ferry (14d) | 14 | 995 | 240 | 187 | 0 | 0 | 427 | 1422 | +43% |
| South Sweden (Skane) (9d) | 9 | 855 | 206 | 0 | 10 | 364 | 580 | 1435 | +68% |
| Stockholm (4d) | 4 | 340 | 220 | 0 | 0 | 0 | 220 | 560 | +65% |
| Stockholm + Surroundings (6d) | 6 | 510 | 220 | 0 | 30 | 40 | 290 | 800 | +57% |
| Sweden + Norway (12d) | 12 | 1145 | 360 | 0 | 85 | 750 | 1195 | 2340 | +104% |
| Sweden Roadtrip (9d) | 9 | 945 | 220 | 0 | 0 | 0 | 220 | 1165 | +23% |
| Swedish Lapland Kiruna + Abisko (6d) | 6 | 510 | 400 | 0 | 24 | 0 | 424 | 934 | +83% |
| Swedish Lapland + Northern Lights (9d) | 9 | 765 | 400 | 0 | 24 | 400 | 824 | 1589 | +108% |

## (b) Decisions for Youri

Car calls (rental rate NO 75, SE 55 per day; fuel NO 2.79, SE 1.64 per litre):
- **Norway Roadtrip**: flag false, car added. 12 rental days (notes: "whole trip"), 1370 km (input estimate), tolls + fjord ferries 180 (est). = 1348. If wrong: the km figure is a straight-line x1.3 guess; a real Oslo-Bergen-Geiranger-Trondheim-Rondane loop is ~2000 km (+~€120 fuel).
- **South & Central Norway**: flag false, car added. 12 days (2 Oslo days without car), 1470 km input figure, tolls/ferries 200 (est) = 1387. Same km caveat (real loop to Trondheim ~1900 km, +~€85). Assumed the car ends in Oslo; no drop fee. Ending in Trondheim would add a drop fee.
- **Sweden + Norway**: flag false, car added from Kiruna. Train Stockholm-Kiruna 85 (local), car 7 days x 65 + cross-border one-way drop at Evenes ~150 (est, flagged) + ~780 km fuel (own route estimate; the input's 1580 km mostly counts the train leg) + tolls 25 = 750. Biggest single judgment: if you would drive from Stockholm, add ~€300 fuel/days.
- **South Sweden (Skane)**: flag false, car added. 6 days x 55 (Malmo + Lund days car-free) + ~300 km fuel (input says 180, too low for Ystad-Kivik loop) = 364. The notes say car at 35-50/day; the reference rate is 55.
- **South Norway** and **Sweden Roadtrip**: flag true, nothing added for the car.
- **Oslo (5d)**: input says rental, but the notes say no car needed: treated as public transport, no car.
- **Scandinavia Overland**: input says rental, but the route text is train/bus. Treated as public (local 550: Helsinki-Rovaniemi-Inari trains/buses; Narvik-Lofoten-Senja-Tromso-Nordkapp buses; Honningsvag-Tromso flight 150). With a rental car (notes mention Inari-Kiruna by car) the cost would be much higher (about 25 days).

Other calls:
- **Flights**: Svalbard 290 each way (AMS-OSL + OSL-LYR, two tickets, low confidence); Evenes back 250 (no fare found, est); Skane flies via Copenhagen + train 13 (no real AMS-Malmo flights); Kiruna 200 each way via Stockholm.
- **Svalbard tours**: 2 days x 2250 NOK (midpoint of 1500-3000) = 385. Notes say "1-2 day tours"; with 1 tour it is -€192. The ground budget (~€110/day) is well under the notes' "€160-220/day", so tours are not in it.
- **Lapland 9d**: 2 excursions x 200 (notes: €150-250 each, no count given; dog sledding + snowmobiling named). Lapland 6d: no priced excursions in notes, so none added (Icehotel night is in the ground budget). Optional Nikkaluokta day trip not priced.
- **Norway+Sweden fjords**: the Flam Railway 510 NOK one-way = 44 (priced in the notes); other train/boat prices are estimates (advance fares).
- **Baltic ferry**: overnight cabin Stockholm-Helsinki 80 per person (summer prices could be 100+).
- Most local/transport legs have no price in the notes and are "(est)" in the JS comments.

## (c) Data problems in route text (not fixed)
- **Scandinavia Overland** last block: `transport_to_next` describes a flight Honningsvag-Tromso then Tromso-Longyearbyen, but it is the last block and Svalbard is not among its destinations. Priced only Honningsvag-Tromso, then home from Tromso.
- **Scandinavia Overland** block 0 text says the entry flight is AMS-Helsinki "from 150-280 return"; fare used is the one-way table value.
- **Oslo (5d)** and **Scandinavia Overland**: mode keyword says rental, text says otherwise (see above).
- **Northern Europe Baltic Ferry Roadtrip**: name says roadtrip, but the route is entirely train/ferry/bus (no car).
- **Sweden + Norway** (12d) shares the name of "Norway + Sweden: Fjords & Capitals" but is a different route; not a duplicate.
- Several notes mention pre-R2d daily budgets ("~€140/day") that no longer match the block budgets; ignored as per the brief.
