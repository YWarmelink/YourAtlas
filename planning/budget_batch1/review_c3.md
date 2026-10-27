# Review c3 (own-car routes)

## gt_seed_central-european-grand-roadtrip: total EUR 2,060 (non-optional)
**Car in the daily rate? NO (heuristic flag was wrong).** travel_style: "Fuel, tolls/vignettes and parking are shared per car ... and are NOT included in the per-country amounts"; daily rate is EUR 120/day = 70 accommodation + 35 food + 15 activities. So fuel, tolls AND parking are all extra; nothing is double counted.
| Item | Value | Flag |
|---|---|---|
| Total driving 9,050 km (notes) minus NL-in 620 and out 700 = 7,730 km inside | fuel 1,049 + tolls 305 = 1,354 on first block | km split by country: known legs by origin block, remainder by days. Fuel = km x 0.07 x country price |
| Drive in NL-Strasbourg ~620 km at ~2.2/L | 95 | est (distance not in notes) |
| Drive out Dresden-NL ~700 km (notes) | 107 | German fuel price |
| Tolls: CH 43.28, AT 12.80 + Grossglockner 38, SI 16, HU 15.10, SK 8.10, CZ 9.44, IT 8/100 km (~1,430 motorway km), HR/RS per-km | 305 | est (IT/HR motorway km assumed); matches notes ~335 |
| AT leg to Cortina ~330 km | - | est, notes give no km |
| Parking | 505 | notes figure (EUR 505), not in brief's sources but notes explicit; remove if you treat parking as in the daily rate |
Notes' own car total was ~1,950; mine 1,950+ (fuel prices of Oct 2026 are higher).

## gt_seed_british-isles-celtic-coast-expedition: total EUR 3,138 (non-optional; ferries+transport 1,115)
**Car in the daily rate? NO.** travel_style: "Fuel, toll/parking and the six car ferries are shared per car ... and are NOT included in the per-country amounts"; rate is EUR 90/day base (before per-leg corrections), no rental. Isle of Man: foot passenger, local TT car hire (~EUR 85) is already inside that block's budget (EUR 480).
| Item | Value | Flag |
|---|---|---|
| Distance: notes only say 9,000-10,000 km | used 9,500; 8,950 inside after NL-Calais 400 and Ghent-NL 150 | est (midpoint, flagged); no script run |
| Fuel 1,312 + tolls 77 (Dartford 4, UK misc 16 est, Ireland 30 est, FR ~300 motorway km x 0.09) | 1,389 | est. NOTE: notes claim fuel/toll/parking 2,800-3,200 total; mine is ~1,840 incl. parking: notes appear high (or assume heavier consumption) |
| Parking | 450 | est (notes name Mont Saint-Michel 9.80/day, Lille 16/day, Bruges 5.5-16/day, Cotswolds 1-14 GBP but no total) |
| Flight_in = drive NL-Calais 400 km fuel 59 + Calais/Dover car+driver ferry 105 | 164 | ferry = midpoint of notes' 60-150 (car+2p) |
| Block3 Lake District -> IM foot passenger | 50 | est (no price in notes) |
| Block4 IM -> back foot passenger | 50 | est |
| IM local (Manx railways/buses) | 20 | est |
| Cairnryan-Belfast car+driver | 200 | midpoint 150-250 |
| Block9 IE -> GG: Rosslare-Fishguard 200 (150-250) + Poole-Guernsey Condor 275 (150-400) | 475 | midpoints; weather-dependent |
| Guernsey-Jersey inter-island car ferry | 90 | est (notes give no price) |
| Jersey-Saint-Malo | 150 | midpoint 100-200 |
| UK ETA GBP 20 / 0.8382 | 24 | converted; VISA doc: ~GBP 20; notes say ~EUR 23 |
| Jersey War Tunnels GBP 21 | 25 | converted |
| Carnac 6, MSM abbey 16 + Omaha 8 | 6 / 24 | from notes |
| Edinburgh HES Explorer Pass GBP 44 | 52 | converted, optional (notes present it as a tip) |
Total ferries in plan ~1,075 vs notes' "five car ferries ~1,400-1,600 incl. local car hire".

## Route-text problems noticed
- Both travel_style texts say the per-country amounts are "above"; fine. Central notes total 9,050 km far exceeds sum of listed legs (~5,300 km + NL legs) - rest presumably local sightseeing driving, unverified.
- British notes: the car-cost total 4,200-4,800 uses "six car ferries" in style but "five" in notes; the Heysham-Douglas ferry sits in the table at car fare though visited as foot passenger.
- British: Rosslare-Fishguard then drive to Poole (~430 km) is not in any km figure; Guernsey->Jersey car ferry price missing.
- British Ghent->NL leg says ~150 km; Ghent/Bruges end (blocks text) fine. Notes: UK fuel ~EUR 1.73/L petrol, but current table says 2.09 EUR/L.
