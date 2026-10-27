# Review c2 (Nordic Arctic, North America Grand Traverse, Oceania Grand Expedition)

FX assumed: USD 1.1188, CAD 1.60, AUD 1.65, NZD 1.95, NOK 11.5, SEK 11, DKK 7.46, FJD 2.55 per EUR. Non-optional totals from `chk_c2.js`. Almost every number below is `est` (the notes carry very few prices); the flag count is therefore listed per route.

## 1. gt_seed_nordic-arctic-expedition
Total costs: **EUR 4,293** (flights 800 + transport 1,665 + local 455 + extras 1,373); on top of block budgets 13,950. 6 optional extras (not in total). ~26 flagged items (nearly all est).

**Car in the daily rate?** Per stretch:
- Finland, Sweden: NO car. Notes only mention an optional own car; travel_style is train/bus. Rates 150/d, 158/d.
- Norway: NO car (judgment, weakest call). Evidence: 150/d is no higher than Finland, while Norway is the pricier country; travel_style "Train/bus in Scandinavia". Counter-evidence: the note "avoids the ~540 km drive back" implies a car for Lofoten/Senja/North Cape. If Youri wants a car: 15d x 75 + fuel ~2,000 km x 0.07 x 2.79 (~390) + one-way fee is about EUR 1,500, replacing local 285.
- Iceland: YES, in the rate. Quote: "Price verified (2026-07), correct (incl. rental car, virtually essential)"; 200/d. Fuel assumed included.
- Faroe Islands: NO car in the rate (judgment). 239/d is barely above a public-transport traveller; a 110/d rental would not fit. Notes imply a car (parking at Saksun/Trælanípa), so I added 4 rental days (EUR 535 incl. fuel+tunnels). Flagged.
- Svalbard, Denmark, Greenland: no car.

| Item | Value | Why flagged |
|---|---|---|
| Greenland domestic Nuuk-Ilulissat flight | local 0 | JUDGMENT: note says "domestic flights (Air Greenland) are a structural cost... including the Nuuk-Ilulissat flight itself" and rate is 372/d, so I treated it as in the rate. If not, add ~EUR 470. |
| Ilulissat-AMS 650 | flight_out | est: ILU-KEF ~500 + KEF-AMS ~150, no through fare |
| FI transport 130, local 145 | est | bus/train fares |
| SE local 25, transport 40, LKAB tour 55, ICEHOTEL 365 32 | est | SEK at 11 |
| NO transport 295 (HVG-TOS Wideroe 130 + TOS-LYR 165), local 285, cable cars 30/37, North Cape 29 | est | NOK at 11.5 |
| SJ transport 300 (LYR-OSL-CPH), Pyramiden boat 170 | est | Pyramiden trip is the only priced-ish tour; tours may partly be in the 225/d rate |
| DK transport 200, Tivoli 21 | est | |
| FO transport 250, car 535, Vestmanna 67, Sørvágsvatn 27 (from notes ~DKK 200), Saksun 10 | est / car | car = est rental 110/d CSV |
| IS transport 450, glacier hike 90 | est | Silfra 150 and whale watching 95 optional |
| GL Eqi boat 270 | est | Disko Bay boat 135 optional |
| Aurora Sky Station (Abisko) | omitted | dark-season only, route is summer |

## 2. gt_seed_north-america-grand-traverse
Total costs: **EUR 2,732** (flights 780 + transport 495 + local 110 + extras 1,347); block budgets 12,825. 0 optional. ~22 flagged items.

**Car in the daily rate?**
- Blocks 0 (Nova Scotia, car 1), 2 (Rockies, car 2), 4 (Seattle-SF, car 3): YES. Route notes: "cars + fuel solo EUR 2,500-3,500 ... The 6 block budgets ... follow this breakdown". Daily rates 150 / 200 / 200 vs ~110-130 public-transport in Canada.
- Block 1 (Quebec-Toronto): no car (trains), 167/d.
- Block 3 (Vancouver): no car, 175/d.
- Block 5 (SF, Yosemite, Sequoia): NO car in the rate (judgment): text says "No new rental car needed — day trips or a short rental period suffice" but the route-logic note has a 270 mi drive back from Sequoia, car 3 was returned in SF. I added 7 rental days (EUR 397).
- DOUBLE-COUNT RISK: the same notes' breakdown (flights 900-1,500 + cars + accommodation...) sums to the 10,000 of the block budgets, so flights/domestic flights may ALSO be inside the budgets. I added them per brief (flights EUR 780, Halifax-Quebec 230, Toronto-Calgary 220); Youri to decide.

| Item | Value | Why flagged |
|---|---|---|
| One-way drop fee Calgary-Vancouver | 200 | est (CSV CAD 150-500+); route text says "no one-way fees" which is wrong, car is picked up in Calgary and dropped in Vancouver |
| One-way drop fee Seattle-SF | 270 | est USD ~300 (CSV USD 100-500+); same text problem |
| Block 5 car 397 | 7 d x 45 + fuel ~1,075 km x 0.07 x 1.09 | est rental/judgment |
| ESTA 36 | USD 40.27 per route notes | VISA file still says $21 (outdated) |
| eTA 4.70 | per route notes (CAD 7 / 1.6 ~4.40) | converted |
| Discovery Pass 47 | CAD 75 | converted; one pass covers all Canadian parks |
| America the Beautiful pass 72 | USD 80 | converted |
| Flights Halifax-Quebec 230, Toronto-Calgary 220, Via Rail 110, Amtrak 45 | est | |
| Rockies tours 56/65/60, Niagara 50, Capilano 44, Alcatraz 40 | est | all unpriced in notes |
| flight_in 400 (YHZ) | low confidence | sources USD 200-500+ |

## 3. gt_seed_oceania-grand-expedition
Total costs: **EUR 20,906** (flights 2,600 + transport 3,455 + local 1,997 + extras 12,854, of which cars ~10,000); block budgets 17,943. 8 optional. ~45 flagged items (nearly everything est). Result is dominated by the car/campervan calls below.

**Car in the daily rate?** NO for every stretch. Evidence: the 2026-07 price corrections list what the daily rate did NOT cover (domestic flights, Yasawa Flyer pass, whale tours, Bungle Bungles flights, park permits, ferries) and never a car; rates are an average of "Budget Backpacker" and "Comfort Backpacker" (87-120/d). The travel style says "camper/rental car for roadtrip sections" but no budget mentions it. I rented a compact car (not a campervan, since the rate already pays for accommodation) per stretch:
- WA, Perth-Darwin (block 5): 4x4 21 d, EUR 4,630. HUGE: 4x4 150/d (CSV range 120-180) + fuel 4,700 km + ~EUR 1,000 one-way fee. Cheaper alternative: compact Perth-Broome (~1 week fewer) + flight Broome-Darwin (notes' own alternative), saving ~EUR 2,500+. Gibb River Road itself is 4x4-only.
- NT (block 6): Darwin-Alice car 14 d, EUR 1,397 incl. ~300 one-way fee.
- East coast Cairns-Sydney (blocks 7-8): bus (notes: "Bus or camper", "classic backpacker trail"), no car.
- Sydney-Melbourne: FLIGHT 90 (notes say car overland; 880 km drive = ~EUR 180 fuel+ rental if preferred).
- Melbourne (block 9) 7 d EUR 467; Tasmania (block 10) 6 d EUR 442; Adelaide (block 11) 5 d EUR 393 (KI by passenger ferry+tour, no car).
- NZ South Island: 21 d compact car EUR 1,737 incl. one-way Christchurch-Picton, foot-passenger ferry 55; NZ North Island: 11 d EUR 931 incl. Wellington-Auckland one-way. A campervan (EUR 130-250/d) would cost far more and double-count accommodation.
- Pacific islands: no car (scooters/buses inside the rate); Tongatapu/Efate rentals not added.

| Item | Value | Why flagged |
|---|---|---|
| Flights AMS-VLI 1,500, AKL-AMS 1,100 | low confidence | wide aggregator ranges |
| Pacific hops: VU-FJ 280, FJ-TO 300, TO-WS 450, WS-CK 700, CK-Perth 750 | est | no fares searched; Samoa-CK and CK-Perth are two-ticket via Auckland |
| VU local 500 | est | Vila-Tanna + Vila-Santo return flights (notes: not in rate) |
| FJ local 600 | est | Yasawa Flyer 255 + Mamanuca 45 + Taveuni return flights 295 (notes: not in rate); FJD at 2.55 |
| TO local 260, whale swim 200 (from notes EUR 150-250 midpoint), Ha'apai 180 optional | est/midpoint | |
| CK Aitutaki flight 205, cruise 77 | est | NZD at 1.95 |
| WA tours: whale shark 275, Bungle Bungles flight 240, Rottnest 73 | est | AUD 1.65 |
| NT: Alice-Cairns 280, Kakadu 24 (AUD 40), cruise 60, Uluru 30 (AUD 50) | est / converted | |
| East coast: buses 220+25+70, Whitsundays 325 and K'gari 325 (midpoints of notes' 250-400), GBR 150, Daintree 90 | est/midpoint | |
| Sydney Climb 245 optional; Opera House 30, Scenic World 30 | est | |
| Flights Sydney-Mel 90, Mel-Tas 75, Hobart-Adelaide 100, Adelaide-Christchurch 350 | est | |
| Overland Track permit 135 | midpoint of notes' 120-150 | hut fees not included |
| NZeTA+IVL 63 | from notes (EUR 60-63); VISA file: NZD 23 + 100 | converted |
| NZ: Milford 65, Kaikoura 87, Abel Tasman 40, Rotorua 90, Waitangi 36, Tongariro shuttle 20 | est | optional: Great Walk huts 150, heli-hike 255, bungy 118, Hole in the Rock 67 |
| Vanuatu/Fiji/Tonga/Samoa/CK/AU visas | none | VISA file: visa-free or free eVisitor |

## Route-text problems noticed (not fixed)
- NA: notes say the three rental cars avoid one-way fees, but Calgary-Vancouver and Seattle-SF are both one-way rentals (drop fees apply).
- NA: VISA file still lists ESTA at ~$21 (now $40.27).
- NA: block 5 note "No new rental car needed" contradicts the Sequoia-SF 270 mi drive and car 3 being returned in SF.
- NA: breakdown in route notes (flights + cars + accommodation...) sums to the block budgets, so budgets may include flights (double-count with flight_in/out).
- Nordic: description says "Train/bus" while the Norway transport note assumes a possible 540 km drive; unclear whether a car is intended.
- Nordic: Greenland block says domestic flights are a structural cost of the budget; unclear whether Nuuk-Ilulissat is inside the 3,725.
- Nordic: Aurora Sky Station (Abisko) mentioned for a summer route, only operates in dark season; Tivoli season ends 20 Sep.
- Oceania: Sydney-Melbourne "car overland"; Perth-Darwin one-way rental is exceptionally costly and not mentioned anywhere; daily rates for AU/NZ do not include a car although the travel style says "camper/rental car".
- Oceania notes: Cook Islands - Perth "dry season in Western Australia" planned May-November vs whale shark season Mar-Jul (Ningaloo) and NZ Dec-ish arrival; Overland Track peak season Oct-May.
- Oceania: Total line says "~EUR 3,500-4,000 in flights", my flights + transport (6,055 incl. long-haul) are far higher; check scope.
