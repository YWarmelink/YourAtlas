# Phase 4 batch 25 review: North America & Oceania 2/2 (10 routes, 2026-10-29)

Per person, solo, one-way, 2026 euros. 0 web searches: all new fares are estimates (low confidence); see flights_batch25.csv.

## (a) Totals

| Route | Days | Ground today | There & back | Transport | Local | Extras | Added | All-in | Added % |
|---|---|---|---|---|---|---|---|---|---|
| New Zealand South Island | 23 | 1863 | 2250 | 0 | 0 | 1669 | 3919 | 5782 | 210% |
| Papua New Guinea | 13 | 1014 | 1950 | 0 | 1360 | 1005 | 4315 | 5329 | 426% |
| Palau | 10 | 1000 | 1750 | 0 | 0 | 852 | 2602 | 3602 | 260% |
| California | 14 | 1428 | 830 | 0 | 0 | 382 | 1212 | 2640 | 85% |
| Florida | 10 | 1016 | 740 | 0 | 0 | 413 | 1153 | 2169 | 113% |
| Hawaii | 14 | 1428 | 1550 | 140 | 0 | 853 | 2543 | 3971 | 178% |
| Pacific Northwest | 15 | 1530 | 800 | 0 | 0 | 989 | 1789 | 3319 | 117% |
| US Northeast | 12 | 1219 | 780 | 110 | 0 | 36 | 926 | 2145 | 76% |
| US Southwest | 12 | 1224 | 1120 | 0 | 0 | 1213 | 2333 | 3557 | 191% |
| US West Coast Roadtrip | 29 | 2958 | 800 | 0 | 0 | 1425 | 2225 | 5183 | 75% |

## (b) Decisions for Youri

All US/NZ car routes have `carInDailyRate` = false, so the car is added (US €45/day, fuel €0.0763/km; NZ €60/day, €0.13/km).
I used my own route-based km where the input's straight-line x1.3 clearly understates the drive (it collapses multi-stop loops).

- **NZ South Island**: rental 21 days (23 minus 2 buffer days) x €60 + ~2,700 km (input says 1,770; real loop incl. Milford out-and-back and Kaikoura/Abel Tasman is longer) = €1,611. If the car is only 14 days: -€420. Great Walk/Milford huts and Kaikoura/boat trips not priced (notes give no price). NZeTA+IVL €58.
- **Papua New Guinea (biggest swing)**: 8 domestic hub flights x €170 (notes: €140-200 each) = €1,360, assuming Tufi/Alotau are linked by one boat/land hop (10 flights if not: +€340). Notes also say Sepik charters (€140-280/day) and guided Highlands (€95-235/day) are not in the rate: I assumed 3 + 2 days = €960 total; days are my guess. If Youri skips guided days, -€960.
- **Palau**: dives are "not in the daily rate" per notes (€140-165/day): assumed 5 dive days = €763 (not flagged optional in the notes; if 3 days: -€305). Rock Islands permit US$100 (with Jellyfish Lake) = €89. The US$100 environmental fee is inside the fare, not added.
- **California**: notes contradict (no car needed vs. car back to SF from Sequoia). I assumed 6 rental days for Yosemite+Sequoia, ~1,000 km, SF days car-free = €346. **Park fees not priced**: notes give no price, but per the Southwest notes non-residents pay US$100 surcharge + entry per park from 2026 (Yosemite, Sequoia): the €230 Non-Resident pass would likely apply, +€230. Same gap in West Coast Roadtrip and Pacific Northwest (Olympic, Rainier, Redwood fee parks; Redwoods mostly free). Not added because the notes name no price.
- **Florida**: 7 rental days (blocks 1-3, picked up at the end of the Miami block), ~680 km (input 520), tolls €10 est = €377.
- **Hawaii**: €75/day (est, above the €45 reference) because the notes record 2026 weekly rates of US$1,154-2,015; 5 days Maui + 5 days Kauai, Oahu car-free (TheBus). Inter-island flights €70 each (est, no price in notes). If €45/day instead: -€300. Hā'ena parking/shuttle reservation not priced (no price in notes). Ends at Lihue; fare LIH-AMS via Honolulu.
- **Pacific Northwest and West Coast Roadtrip**: route ends at the Redwoods, car dropped in San Francisco (~5-6 h) with a flagged one-way drop of €200 (US$100-500+). Km ~2,200 (input 1,340 / 2,410). PNW 13 rental days (2 Seattle city days car-free); WCR 15 days (notes say the car is picked up in Seattle) plus a second 6-day SF rental for Yosemite/Sequoia (~1,000 km). If WCR keeps the car continuously instead, the drop fee and 6 days partly vanish (about -€300).
- **US Northeast**: no car. Amtrak Saver fares are my estimates (€35/30/45); notes name no prices.
- **US Southwest**: 12 rental days, ~1,640 km (input 900), drop in Phoenix €180 (notes' placeholder US$150-250), non-resident pass €230 (notes), Antelope tour €72, Navajo entry €21, Red Rock Pass €9 (2 days assumed). Zion/Bryce/GC fees are covered by the pass.
- **Fares**: all new rows (NZ, PG, PW, SFO out, SEA, MIA, HNL, LIH, IAD, BOS, LAS, PHX) are estimates from the notes' return-fare ranges and the existing SFO/AKL rows, flagged low. Worth a real search before the Sheet if Youri cares about the long-haul ones (NZ/PG/PW are the bulk of the added €).
- **Visas**: ESTA US$40.27 = €36 on every US route; NZ €58; PNG €45; Palau none.

## (c) Data problems in the route text (not fixed)

- US Southwest: the Navajo Nation fee note and "17-mile scenic loop" sit on the Monument Valley block, but each block's `transport_to_next` says "to Monument Valley" on the Page block: sequence is consistent, though block 3 has only one destination and 1 day; the Antelope Canyon note is on Page's block as expected.
- California / West Coast block 1: notes say both "no new rental car needed — day trips or a short rental" and "car back to San Francisco": ambiguous about car days.
- Pacific Northwest: `transport_to_next` says return flight "from San Francisco or Portland" while the stops end at the Redwoods (Northern California, ~800 km from Portland); I assumed SF.
- Input `distance` (straight line x1.3) understates every multi-stop drive route (PNW 1,340 vs ~2,200; SW 900 vs ~1,640; Florida 520 vs ~680; NZ 1,770 vs ~2,700).
- Hawaii block 1 notes say a rental car is needed on Maui, while block 0 says a car is "optional" on Oahu only: consistent with my call, but no rental duration is stated.
