# Phase 4 batch 6: Iberia 2/2 (22 routes), extracted 2026-10-28

Per person, solo, one-way, 2026 euros. "There & back" = flight_in + flight_out. Added = there & back + transport + local + extras.

## (a) Totals

| Route | Days | Ground today | There & back | Transport | Local | Extras | Added | All-in | Added % |
|---|---|---|---|---|---|---|---|---|---|
| Spain: East to South (12) | 12 | 732 | 220 | 0 | 0 | 659 | 879 | 1611 | 120% |
| Spain: North to Central (12) | 12 | 732 | 220 | 0 | 70 | 0 | 290 | 1022 | 40% |
| Tenerife (5-7) | 6 | 390 | 250 | 0 | 0 | 229 | 479 | 869 | 123% |
| Tenerife + La Gomera (7-10) | 9 | 540 | 250 | 38 | 93 | 40 | 421 | 961 | 78% |
| Valencia + Costa Blanca (6) | 6 | 366 | 190 | 0 | 0 | 260 | 450 | 816 | 123% |
| Algarve (6) | 6 | 372 | 230 | 0 | 0 | 252 | 482 | 854 | 130% |
| Azores Island Hopping (10-14) | 12 | 744 | 350 | 160 | 52 | 0 | 562 | 1306 | 76% |
| Azores: Sao Miguel + Terceira (7-10) | 9 | 558 | 350 | 80 | 0 | 330 | 760 | 1318 | 136% |
| Central Portugal: Coimbra + Serra da Estrela (6) | 6 | 372 | 220 | 0 | 0 | 325 | 545 | 917 | 147% |
| Lisbon + Sintra (5) | 5 | 310 | 215 | 0 | 20 | 0 | 235 | 545 | 76% |
| Madeira (5-7) | 6 | 372 | 250 | 0 | 0 | 164 | 414 | 786 | 111% |
| Madeira + Porto Santo (7-10) | 9 | 558 | 250 | 30 | 30 | 164 | 474 | 1032 | 85% |
| Northern Portugal + Galicia (7-10) | 9 | 554 | 230 | 0 | 38 | 434 | 702 | 1256 | 127% |
| Northern Portugal: Minho (6) | 6 | 372 | 220 | 0 | 17 | 152 | 389 | 761 | 105% |
| Porto (4) | 4 | 248 | 220 | 0 | 25 | 0 | 245 | 493 | 99% |
| Porto + Douro + Lisbon (9) | 9 | 558 | 205 | 0 | 0 | 333 | 538 | 1096 | 96% |
| Portugal + Andalusia (10-14) | 12 | 739 | 220 | 0 | 10 | 631 | 861 | 1600 | 117% |
| Portugal + Spain Roadtrip (14) | 14 | 863 | 210 | 0 | 0 | 893 | 1103 | 1966 | 128% |
| Portugal + Spain: Porto to Madrid (12) | 12 | 740 | 210 | 0 | 40 | 625 | 875 | 1615 | 118% |
| Portugal Roadtrip (12) | 12 | 744 | 210 | 0 | 0 | 752 | 962 | 1706 | 129% |
| Portugal: North to South (9) | 9 | 558 | 210 | 0 | 0 | 494 | 704 | 1262 | 126% |
| Sao Miguel (Azores) (5-7) | 6 | 372 | 290 | 0 | 0 | 182 | 472 | 844 | 127% |

## (b) Decisions for Youri

No route states whether the car is in the daily rate (`carInDailyRate` false everywhere), so every car is added as a "Car:" extra on the first block. If a car is in fact already in a route's rate, delete that extra. Rental €40/day, fuel 7 L/100 km (ES €0.125/km, PT €0.147/km), all from `car_costs_by_country.csv`.

Car calls (rental days / km / tolls):
- Spain East to South: 10 days (Barcelona days car-free), 1230 km, tolls only ≈€6 (notes: AP-7 free, short stretch S of Cartagena), one-way drop Malaga ≈€100 (est). If drop is €0-200: ±€100.
- Valencia + Costa Blanca: 4 days, 720 km (input figure includes optional Penscola/Calpe; it is generous), tolls ≈€10, loop back to Valencia, no drop. If 400 km: -€40.
- Algarve: 5 days, 300 km, A22 tolls ≈€8 (est).
- Tenerife: 4 days (Anaga + Teide), 230 km, no tolls. Teide cable car €40 return kept in full (notes name only the return price; you ride both ways).
- Azores Sao Miguel + Terceira: 4 + 3 days (two rentals), 340 km. Azores rental is often higher than €40/day in summer (+€10/day = +€70).
- Sao Miguel: 4 days, 150 km (input 90 km too low for round trips from the base).
- Central Portugal: 6 days from Porto airport, 430 km (190 in route + Porto-Coimbra both ways), A1 ≈€22. Notes allow Porto or Lisbon; I took Porto.
- Madeira (both routes): 3 days north-coast loop, ≈170 km (loop estimated; input 80 km too low), Monte cable car €19 return (notes: €12.50 one-way / €19 return; return is the realistic purchase; one-way would be -€6.50). Mode keyword said "public" but the route text names a rental-car loop, so text wins.
- Northern Portugal + Galicia: 6 days, 280 PT + 280 ES km, tolls ≈€28, cross-border one-way drop Santiago ≈€90 (est). Out via SCQ (seasonal direct, else via Madrid; if reversed, Porto out €120).
- Minho: 3 days, 160 km, A28 ≈€8.
- Porto + Douro + Lisbon: 4 days, 600 km, tolls ≈€25, drop Lisbon ≈€60 (est). The Douro by train (notes' budget option) would be cheaper than the car.
- Portugal + Andalusia: 8 days, 460 PT + 670 ES km, tolls ≈€40 (Spanish autovias free), cross-border drop ≈€120 (est).
- Portugal + Spain Roadtrip: 12 days, 940 PT + 640 ES km, tolls ≈€75, cross-border drop ≈€120 (est).
- Porto to Madrid: car 8 days Porto to Seville (640 PT + 220 ES km, tolls ≈€64), dropped in Seville (≈€120 cross-border), then AVE Seville-Madrid €40 (est) as local. Driving Seville-Madrid instead: +1.5 rental days and ≈€65 fuel, no AVE, so about +€40-85 and a different drop city.
- Portugal Roadtrip: 11 days, 1200 km, tolls ≈€66, drop Faro ≈€70 (est).
- Portugal North to South: 7 days, 670 km, tolls ≈€46 (A1 €24 per the notes + A2 ≈€22), drop Faro ≈€70 (est).

Other judgment calls:
1. **Spain North to Central: no car.** The notes never mention a car (train emoji, linear route), so I priced buses/trains in `local` (€70). If you want a rental: roughly +€550 (10 days, fuel ≈115, a drop fee, tolls minimal) and remove the €70.
2. **Mode overrides.** Tenerife + La Gomera, Lisbon, Porto, Azores Island Hopping have no car text, so public transport (inter-island flights/ferries and buses estimated, ferry prices est: La Gomera ≈€38, Porto Santo ≈€30, Pico ≈€12 return).
3. **Azores flights out** (Horta/Terceira via Lisbon ≈€200) and **inter-island hops** (€80 each, notes: €60-100 and "€150-250 for 2-3 hops") are low confidence. Azores fares are seasonal (Transavia direct only in summer, otherwise via Lisbon, often higher).
4. **Spanish tolls** use an anchored estimate, not the 60%-of-km rule: autovias are free, only AP-7 and AP-9 sections charge. Portuguese tolls are anchored to A1/A2/A22 (the 60% rule would undercount the Porto-Lisbon-Algarve spine).
5. **Cross-border and one-way drop fees** are estimates (no source); each is ±€50.
6. **Fares.** New airports are in `flights_batch6.csv` (11 airports; floors from aggregators, typical set above floors, low confidence for Faro, Ponta Delgada, Madrid, back directions without own search). Return-direction fares marked "estimate" were not searched separately.

## (c) Data problems in the route text (reported, not fixed)

- Input `km_in_route` too low for several car routes: Madeira (80 km for a north-coast loop), Sao Miguel (90 km), Central Portugal (190 km excludes airport-Coimbra drives), Valencia + Costa Blanca (720 km looks high for Valencia-Alicante).
- Azores Island Hopping: blocks sum to 12 days but the title says 10-14; the notes' "€150-250 domestic" is outside the block `budget` as stated.
- Tenerife + La Gomera: "Same Teide-permit caveat" is repeated in block 2 where it does not apply; cable car price counted once, in block 1.
- Portugal + Spain: Porto to Madrid: block 0 `transport_to_next` says "Drive or bus ... to Seville", ambiguous with the car plan.
- Northern Portugal + Galicia: direct AMS-Santiago is seasonal only; text lists Porto as the alternative end airport.
- Madeira + Porto Santo: ferry "usually only runs May-October"; I priced the ferry, not the flight alternative.
- `routeBuilder` mode keywords marked Madeira as "public" even though its text drives a rental loop.
