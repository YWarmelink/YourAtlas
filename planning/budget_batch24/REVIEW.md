# Phase 4 batch 24: North America & Oceania 1/2 (12 routes), extracted 2026-10-29

Files: `costs_batch24.js`, `flights_batch24.csv` (16 new airport rows, all low-confidence estimates:
no WebSearch was run this batch; fares are halved return ranges from the route notes, adjusted
up to "typical"). Car: `car_costs_by_country.csv` (AU 55/day, NZ 60, CA 50).
Extras: none for tours/park fees, because none of these routes' notes name a price (see section 2, item 1).

## (a) Totals (EUR per person, one-way fares, solo)

| Route | Days | Ground today | There & back | Transport | Local | Extras | Added | All-in | Added % |
|---|---|---|---|---|---|---|---|---|---|
| Cairns & Great Barrier Reef | 23 | 1,978 | 2,100 | 0 | 285 | 251 | 2,636 | 4,614 | 133% |
| Sydney/Byron & Great Ocean Road | 24 | 2,100 | 1,750 | 0 | 140 | 971 | 2,861 | 4,961 | 136% |
| Tasmania | 14 | 1,204 | 2,200 | 0 | 0 | 570 | 2,770 | 3,974 | 230% |
| Temperate/Southern Australia | 43 | 3,731 | 1,750 | 210 | 220 | 1,812 | 3,992 | 7,723 | 107% |
| Tropical/Outback Australia | 56 | 4,816 | 1,850 | 520 | 285 | 3,174 | 5,829 | 10,645 | 121% |
| Eastern Canada | 18 | 1,710 | 780 | 170 | 140 | 386 | 1,476 | 3,186 | 86% |
| Western Canada: Rockies & Vancouver | 32 | 4,895 | 1,100 | 625 | 70 | 251 | 2,046 | 6,941 | 42% |
| Fiji & Vanuatu | 27 | 1,429 | 2,450 | 280 | 1,095 | 0 | 3,825 | 5,254 | 268% |
| Fiji | 16 | 816 | 1,900 | 0 | 595 | 0 | 2,495 | 3,311 | 306% |
| Pacific Islands | 49 | 3,291 | 2,900 | 1,730 | 855 | 0 | 5,485 | 8,776 | 167% |
| New Zealand | 35 | 2,821 | 2,300 | 55 | 0 | 2,696 | 5,051 | 7,872 | 179% |
| New Zealand North Island | 16 | 1,280 | 2,300 | 0 | 0 | 1,116 | 3,416 | 4,696 | 267% |

## (b) Decisions for Youri

Car calls (all rental; `carInDailyRate` is false everywhere except Western Canada block 1):

| Route | Call | Evidence | If wrong |
|---|---|---|---|
| Cairns & GBR | car only 4 days for Cairns/Daintree (≈300 km, €251); Whitsundays/Fraser by Greyhound (local 165) | notes: "camper/rental car for the coast", but 1,800 km straight-line coast distance; a car for the whole route would be 23 × 55 + fuel ≈1,500 | +€1,000 if you drive the whole coast |
| Sydney/Byron & GOR | car 12 days Sydney→Melbourne + Great Ocean Road/Grampians (≈1,580 km) + drop fee €150 (est); Byron by bus/flight (local 140) | notes: "Car overland via the coast or Hume Highway to Melbourne" | one-way fee Sydney→Melbourne can be AUD 200-500 |
| Tasmania | car 9 of 14 days (Overland Track walk ≈6 days + buffer without car), 730 km, returned in Hobart | Overland Track permit already in the daily rate (notes) | +€275 for 14 days |
| Temperate/Southern | 3 separate rentals: Syd→Melb 12 d (€971), Tasmania 9 d (€570), Adelaide 4 d (€271); Melbourne→Hobart and Hobart→Adelaide as flights (90/120) | notes: ferry or flight to Tasmania; Hobart-Adelaide direct flight | Spirit of Tasmania with the car would replace the flight + second rental |
| Tropical/Outback | as batch 1 (Youri 2026-10-27): compact car Perth-Broome 18 d (batch 1 used 20) + Broome-Darwin flight; Darwin-Alice 14 d; Cairns 4 d | batch 1 review | a 4x4 Perth-Darwin was ≈€4,630 |
| Eastern Canada | car 6 days for Halifax/Cape Breton (≈900 km); trains/buses between the four eastern cities | notes: "no long car ride ... train connections" | +€150 if you'd rent in Quebec too |
| Western Canada | block 1 car IN the rate (flag true): only a one-way drop fee €155 (est CAD 250) | `inDailyRate` says "drop fee only as extra"; notes say "no one-way or border fees" (contradiction, see (c)) | drop €155 if the fee is really free |
| Western Canada, Alaska | NO car in Alaska: Alaska Railroad Anchorage-Denali (160), Denali-Anchorage-Seward (225), shuttle bus | notes offer "rental car OR Alaska Railroad"; Youri's level = train | a car would be ≈ 10 days × 45 + fuel ≈ €600 |
| New Zealand (South+North) | South: 21 d × 60 + 2,000 km + drop €60 = €1,580; North: 14 d + 1,210 km + drop €55 = €1,053 (as batch 1 style) | notes: ferry Picton-Wellington, "continuing overland" | one car straight through is not possible (ferry), so two rentals |
| NZ North Island | 14 of 16 days (2 arrival buffer days without car), €1,053 | CLAUDE.md buffer policy | +€120 for 16 days |

Other judgment calls:
1. **No tour/park extras at all.** The brief says only add what the notes price, and none of these 12 routes' notes name a price. Likely undercounted (batch 1 estimated them): Mount Yasur tour (~100), Coolidge dives (~120), whale swim Tonga (~200), Kenai Fjords boat tour (~150-200), Denali is handled (shuttle 55, est), Milford Sound cruise (~65), Kaikoura whale watching (~87), Great Barrier Reef day trip (~150), Fraser Island tour (~300), Whitsundays sailing (~300), Alaska glacier/boat trips. Add ~€300-900 per route if you want them.
2. **Fiji/Vanuatu local transport.** Only Pacific Islands marks domestic flights as "in the rate" (VU, CK). Fiji & Vanuatu and Fiji have no such flag and ≈€51-55/day budgets, so I added batch-1 `local` values (VU 500, FJ 595: Yasawa Flyer, Mamanuca ferry, Taveuni flights). If those are in the rate, subtract €1,095 (F&V) / €595 (Fiji).
3. **Flights are the biggest lever.** 16 new fares are estimates (low confidence). Fiji/Pacific/NZ routes have 150-300% added mostly due to the €2,000-2,900 long-haul there & back.
4. **Visas**: AU eVisitor free (0); NZ NZeTA+IVL €63 (as batch 1); CA eTA €5; US ESTA €36 (VISA file says $21, still outdated); FJ/VU/TO/WS/CK visa-free. NZeTA for the Auckland transit on the Rarotonga flight home was not added.
5. **Cairns-ending routes** (Cairns, Tropical): the route text sends you home from Cairns even though Fraser Island is the southern end, so I added a ~€120 flight back north on `local`. Flying home from Brisbane would save ~€120 and a backtrack.

## (c) Data problems in the route text (reported, not fixed)

- **Western Canada**: `transport_to_next` of block 1 says the rental car returned in Vancouver has "no one-way or border fees"; Calgary→Vancouver is normally a one-way rental with a fee. Also `inDailyRate` says drop fee only as extra.
- **Western Canada**: Mount Robson and Whistler are on block 1 but the route text has Whistler→Vancouver as the last drive; Calgary→Banff→Jasper→Robson→Whistler→Vancouver order is fine, but block 2 (Vancouver) goes by flight to Anchorage while the notes still call it "optional shorter version".
- **Cairns & GBR, Tropical/Outback block 3**: ends with a flight home from Cairns, but the stop order Cairns→Daintree→GBR→Whitsundays→Fraser ends 1,600 km south of Cairns (backtrack).
- **Temperate/Southern block 0** notes: Byron Bay is listed before Sydney (entry flight lands in Sydney), a 770 km backtrack in the stop order; same in Sydney/Byron.
- **Fiji & Vanuatu**: block 0 notes say "ending in Fiji" for the multi-city fare; block 0's `transport_to_next` is the Vila-Nadi flight, so the "return" fare estimate is Nadi-AMS only (used 950).
- **Pacific Islands vs Fiji & Vanuatu**: same Vanuatu stay priced at €95/day (11 d, 1,045) in one and €55/day (13 d, 715) in the other, with the domestic flights "in the rate" only in the first. Inconsistent rates.
- **Tasmania**: block notes still mention "€105/day" correction, but block budget is now ≈€86/day (R2d lowered).
- Several `notes` still mention old pre-R2d daily-rate corrections (e.g. "€110/day") that no longer match the budgets.
