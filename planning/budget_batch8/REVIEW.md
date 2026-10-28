# Phase 4 batch 8: France & Benelux 2/2 (12 routes), 2026-10-28

## (a) Totals per route (EUR per person, solo, one-way items)

| Route | Days | Ground today | There & back | Transport | Local | Extras | Added | All-in | Added % |
|---|---|---|---|---|---|---|---|---|---|
| french-atlantic-coast-la-rochelle-to-biarritz-12-days | 12 | 864 | 468 | 0 | 0 | 172 | 640 | 1504 | 74% |
| loire-valley-castles-6-days | 6 | 432 | 297 | 0 | 0 | 108 | 405 | 837 | 94% |
| monaco-cote-dazur-4-days | 4 | 361 | 200 | 6 | 21 | 30 | 257 | 618 | 71% |
| monaco-nice-provence-5-days | 5 | 433 | 200 | 6 | 6 | 279 | 491 | 924 | 113% |
| monaco-monte-carlo-2-days | 2 | 208 | 200 | 6 | 6 | 30 | 242 | 450 | 116% |
| normandy-5-days | 5 | 360 | 332 | 0 | 0 | 209 | 541 | 901 | 150% |
| paris-4-days | 4 | 288 | 160 | 0 | 0 | 53 | 213 | 501 | 74% |
| provence-6-days | 6 | 432 | 515 | 0 | 0 | 105 | 620 | 1052 | 144% |
| south-of-france-provence-to-cote-dazur-9-days | 9 | 648 | 623 | 0 | 0 | 189 | 812 | 1460 | 125% |
| luxembourg-4-days | 4 | 316 | 100 | 0 | 0 | 32 | 132 | 448 | 42% |
| luxembourg-ardennes-4-days | 4 | 340 | 97 | 0 | 0 | 60 | 157 | 497 | 46% |
| south-netherlands-belgian-ardennes-luxembourg-5-days | 5 | 393 | 86 | 0 | 0 | 40 | 126 | 519 | 32% |

New airport rows: NCE out 110 / back 90 (`flights_batch8.csv`, 2 searches). Nothing else new for the CSV.

## (b) Decisions for Youri

**Own-car drives NL to destination (no rental; "there & back" = fuel + tolls).**
Formula: 7 L/100 km, fuel NL 2.391 / BE 1.989 / FR 2.229 / LU 1.788 EUR/l; FR tolls = 60% of km x 9/100 km; BE/LU/NL free.
Country split of the drive is my estimate (NL 80 km + BE 190 km, rest in the destination country).
- Atlantic Coast: in 970 km (notes), out 1420 km (input). The notes say "~250-300 total tolls round trip" but the formula gives ~125 (in 38 + out 62 + route 25). If the notes are right (Paris/Bordeaux A10 is dearer than 9/100 km), add ~125-175.
- Loire: 620 km in / 650 km out, tolls 52 each way (notes 45-60 midpoint). Input km (780/740) are straight-line and too high; notes win.
- Normandy: in ~700 km (notes: Amsterdam-Bayeux 697), out ~880 km is MY estimate (notes give none, input says 790). Out tolls 45 assumed equal to in. If out is only 790 km, subtract ~15.
- Provence: 1090 km in (notes), tolls 80 (notes 70-90); out 1180 km est from Arles, tolls 85.
- South of France: in 1150 km/tolls 100 (notes 90-110); out ~1410 km est, tolls 128 = Nice-Avignon 27.5 + 100. Total tolls 255, inside the notes' 250-300.
- Luxembourg routes: fuel only (no tolls). Input km used. Cheap fuel in LU would lower it a bit if tanked there.

**Rental (the only one): Monaco + Nice + Provence.** 3 rental days (Provence days 3-5, pickup Nice) x 48 (CSV; notes 40-60/day agree) + fuel ~500 km (78) + tolls 27 = 249; returns to Nice, no drop fee. Not in the daily rate (carInDailyRate false). Notes say the Nice-Provence-Nice tolls are only ~15-25; I used the formula (27). If a 4th rental day is needed (pickup the evening before), +48.

**Other calls**
- Paris: no flight; "there & back" = Thalys/Eurostar 80 each way (notes: from 35, often 55-135; 80 is my "booked ahead" estimate). 95 (midpoint) would add 30.
- Normandy D-Day guided tour: notes list 93 (half day) / 168 (full day); I took the midpoint 131 as a non-optional extra. With an own car it is arguably redundant: dropping it cuts Normandy added from 541 to 410 (+114% instead of +150%).
- Monaco routes: casino entry 20 and Oceanographic Museum 10 added (notes name both; museum "check 2026 price"). Train Nice-Monaco 6 each way (4-8 midpoint) as `transport` out and `local` back. Monaco 4-day: 15 local for Eze/Villefranche/Menton/Cannes rail/bus hops (est, no price in notes).
- Parking: Bordeaux 3 days x 25 (75) and Nice 3 days x 29.5 (89), both from the notes' garage prices; assumes the hotel has no free parking. Remove if you stay somewhere with parking.
- Loire castles: 60 (notes 50-70 for 3-4 castles). Combi-pass saving ignored.
- Luxembourg + Ardennes: Bastogne museum 22 + parking 7.50 from the notes. Vianden castle 12 taken from the sister route's price. Vianden cable car not priced anywhere, left out. Valkenburg Fluweelengrot not priced in notes, left out.
- Provence: Gordes 4 + Les Baux ~5 parking (9), Carrieres des Lumieres 17, Camargue trip 33 (midpoints).

## (c) Data problems in the route text (not fixed)
- `luxembourg-ardennes-4-days`: input km_by_country says LU 140 and no BE, but block 0 is Bastogne (BE). Block 0 code is BE, so the code is fine, the distance split is off.
- `monaco-monte-carlo-2-days` and `monaco-nice-provence-5-days`: the Nice block is coded FR with the Monaco block coded MC; nights in Nice vs Monaco in "days" is as given (1d/1d).
- Input km_back_to_nl for Normandy (790) and Loire/Provence use straight line x 1.3 and understate real driving (Normandy ~880, Arles ~1180). Atlantic Coast notes (~970 km in) conflict with input (1040).
- `provence-6-days` and `south-of-france...` mention "hill-village parking"/"Nice garage parking" only as prices, so they are added as `other` extras on my assumption above.
- Atlantic Coast notes: "~250-300 total tolls" disagrees with the per-km formula (see above).
