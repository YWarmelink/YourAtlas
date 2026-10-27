# Review p1 (totals from chk_p1.js, non-optional only)

## gt_seed_eurasia-grand-tour: EUR 9,101 (flights 700, transport 2,485, local 3,016, extras 2,900; optional 1,220 excluded)
Not a car route. Reused from pilot (same days/content assumed, pilot blocks' days not available to me, please verify): JP, TW, VN, KH, LA, MY peninsula/Sarawak/Sabah, BN, PH, TL, MN local+Gobi tour, SG.

| Item | Value | Flag |
|---|---|---|
| Flight in AMS-SJJ | 230 | est, typical (floors USD 145-255, Air Serbia promo 134 ignored) |
| Flight out SIN-AMS | 470 | pilot |
| BA, HR, ME, AL, MK, TR, GE, AM, KZ, KG transport + local | see file | est (no prices in notes; GE Mestia ~17 each way is from notes) |
| MK transport flight Skopje-Istanbul | 110 | est |
| TR balloon | 170 optional | est, notes only list it as a sight |
| AM transport Yerevan-Tbilisi-Baku | 40 | est; Tbilisi-Baku train/bus availability unverified |
| AZ transport flight Baku-Almaty | 200 | est |
| AZ visa USD 23 | 21 | converted at 1.1188 |
| TJ GBAO permit USD 20 | 18 | converted; research says visa-free + permit USD 20, but route notes say e-visa+GBAO ~USD 70 total. Judgment: used research (visa-free <=30 days); real cost may be ~USD 50 higher |
| TJ Pamir shared 4x4 | 250 | est from notes (shared taxi USD 30-40 pp per leg; private 4x4 USD 150-400/day, shared) |
| UZ transport flight Tashkent-Xi'an | 280 | est (>300 threshold not exceeded, not searched) |
| UZ local | 110 | est |
| CN transport train Beijing-UB | 135 | est (~USD 150) |
| CN visa | 0 | research: visa-free through 31 Dec 2026. Pilot had 150 (diverges; if exemption lapses add ~150) |
| CN entrance tickets | 150 | pilot 200 minus Huangshan (not in this route); est |
| MN transport flight UB-Tokyo | 350 | searched (KE USD 347, MIAT 252, typical higher) |
| MN Gobi tour | 700 | pilot reused; notes imply USD 80-120/day x ~6 = ~540 |
| TH transport Koh Lipe-Langkawi | 30 | est; TH local 170 reused from pilot though route differs (Chiang Mai first, no Khao Sok so no extra) |
| KH/LA visas 30/35 | pilot | research says USD 36/35 (EUR 32/31) |
| BN Ulu Temburong | 120 | pilot (notes 115-150) |
| Kinabalu climb 300 optional, Sipadan 200 optional | | notes give ranges (250-350, 150-250), treated as optional |
| PH El Nido-Coron | 265 | pilot reused; notes say 160-220 |
| ID local 280, transport 45 | | est (Sumatra-Lombok flight via Jakarta, Labuan Bajo-Kupang flight, buses) |
| ID visa | 30 | single e-VOA USD 33 (no extension needed for 21 days), pilot had 53 incl. extension |
| ID Bukit Lawang 120, Komodo 200 | | pilot; Rinjani 200 optional pilot |

## gt_seed_india-himalaya-expedition: EUR 3,194 (flights 1,550, transport 432, local 220, extras 992; optional 166 excluded)
| Item | Value | Flag |
|---|---|---|
| Flight in AMS-DEL | 650 | est, sources inconsistent (KLM 842+, Expedia floor USD 834, others lower) |
| Flight out PBH-AMS | 900 | est (Paro-Delhi + DEL-AMS) |
| IN transport 30, local 170 | | est |
| IN e-visa | 36 | est: research only gives 1-year USD 40; 30-day fee not stated |
| Jaisalmer camel safari | 45 | est |
| Rohtang permit INR 550 | 6 optional | ~INR 95/EUR rate used |
| NP transport flight KTM-Paro | 402 | from notes (USD 400-500 -> 450) |
| NP visa | 45 | research USD 50 converted |
| NP Chitwan fee 40 (NPR 2,000 x 3 days, ~NPR 150/EUR), safari 50, Durbar fees 25 | | est/converted |
| NP trekking permits/guide | 0 | notes say already in EUR 60/day |
| BT SDF USD 100 x 8 nights | 715 | converted. JUDGMENT/DOUBLE COUNT RISK: the BT notes say SDF is "already absorbed" in the EUR 284/day rate; brief said SDF is an extra. Included as instructed; if the note is right, subtract 715 |
| BT visa USD 40 | 36 | converted |
| BT mandatory tour | 0 | not added: guide/car/hotels/meals assumed in the daily budget (EUR 284/day) |
| BT Paro-Bumthang flight | 160 optional | est, notes say standard option but it is a side trip |
| BT 5% GST | not added | |

## gt_seed_patagonia-antarctica-expedition: EUR 2,840 (flights 1,900, transport 210, local 285, extras 445; optional 9,770 excluded)
| Item | Value | Flag |
|---|---|---|
| Flight in AMS-PMC | 800 | est (only a return fare, EUR 841 floor, found) |
| Flight out USH-AMS | 1,100 | est (one-way floors USD 1,595-1,682) |
| Antarctica cruise | 9,500 optional (NOT counted) | JUDGMENT, needs your call: you said "extra, priced from the notes", but the AQ block budget EUR 9,500 IS the cruise price (notes: "reflects a real expedition-cruise price", "price verified"). Counting it again would double it. Recorded as optional:true so it is visible but not in the total. If you do want it as an extra, set budget to 0 on AQ or accept +9,500 |
| CL1 transport (Chile Chico-Los Antiguos-Calafate) 100, local 160 | | est |
| AR1 transport Calafate-Torres del Paine 45, local 70 | | est |
| CL2 transport Punta Arenas-Ushuaia incl. Magellan ferry 65, local 55 | | est |
| Marble Caves 25, Cerro Castillo 10, Perito Moreno entry 30, TdP park entry 45, Isla Magdalena 55, TdP NP 25, Beagle 55 | | est |
| W trek refugio surcharge | 200 | est from notes (refugios USD 100-150/night), judgment |
| Optional: Queulat boat 25, ice trek 190, End of the World train 55 | | est |
| AR2 transport to AQ | 0 | cruise covers boarding |

## Route-text problems noticed
- Eurasia: notes mention Vietnam Hanoi-HCMC flight (EUR 40-60) as an extra but it is not in this plan's costs beyond pilot local 210 (assumed inside it); Hue/Hoi An cut but Da Nang flight reference remains in some text.
- Eurasia Tajikistan: notes say GBAO permit +/-$20 added to e-visa (total ~$70), research says visa-free <=30 days; inconsistent.
- Eurasia: Armenia to Baku "overland plus short flight" is vague; Armenia-Azerbaijan border closed, so Baku is reached via Tbilisi, and Tbilisi-Baku passenger rail has been suspended at times, verify.
- Eurasia China: visa-free exemption only runs to 31 Dec 2026, route likely later; same for Mongolia (Jan 2027). Thailand visa-free cut to 30 days from 2026-09-15 per research file while route text says "may be shortened to 30" (outdated, already in effect) and TH block is 18 days (ok).
- Eurasia Brunei note says Ulu Temburong day trip; Kinabalu/Sipadan "extra costs" presented as destinations.
- India: description says "Delhi ... not sightseeing" fine; Bhutan note says SDF absorbed in daily rate, conflicts with brief.
- Patagonia: AR1 block "El Chaltén" described with Calafate; transport text says Chile Chico-Los Antiguos then Ruta 40 to Calafate, which is ~ 560 km of Ruta 40 and 10+ hours; Los Antiguos-Calafate buses are infrequent. Also Patagonia flights: Ushuaia flights are the only option out; AQ transport_to_next says "flight back from Ushuaia" (the cruise returns to Ushuaia).
