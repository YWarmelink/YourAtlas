# Review p2 (Pan-American, Caribbean & Amazon, West & Central Africa)

All three routes are public transport; no car. **Car in the daily rate?** n/a (no rental/own car in any of the three; Bonaire's self-drive loop and Saintes scooter hire are not added, covered by the daily rate).

## gt_seed_pan-american-grand-tour: total EUR 5,409 (flights 1,200 + transport 1,385 + local 1,825 + extras 999; Lost City trek 340 optional, excluded). Ground budget alone 11,085.
| Block | Item | EUR | Flag |
|---|---|---|---|
| all | Intercity bus fares MX, GT, HN, SV, NI, CR, PE, BO, AR, BR (local) | see file | est |
| MX | transport Bacalar-Huehuetenango, local ADO buses | 60 / 140 | est |
| GT | Tikal sunrise tour | 60 | est |
| BZ | ferry Placencia-Puerto Cortes 85; water taxis/buses 120; ATM cave 90; Hol Chan 55; exit fee 22 | | est |
| HN, SV, NI | buses, Copan 17, Nicaragua border fees 16 | | est |
| CR | parks 110 (notes: $15-22 entrance each; assumed 4-5 sites) | 110 | est |
| PA | San Blas sailboat 4-5 days | 540 | est (notes give no price) |
| CO | Tayrona 19; Lost City 340 optional (notes only mention trailhead) | | est |
| EC | Galapagos return flight inside local 400; park+transit $220 = 197 | 435 / 197 | **judgment: notes say the Ecuador budget (1,650) already includes Galapagos park/transit AND a boat/land tour; I added flight + park fee as extras per brief, but this likely double counts ~200. Youri to decide.** |
| PE | Machu Picchu 200 (notes 150-250 midpoint), Boleto 32 | | midpoint / est |
| BO | Uyuni 3-day tour 160 (notes 140-180 midpoint) | 160 | midpoint |
| CL | Jama bus 65, Tatio 45, Valle de la Luna 30, local 60 | | est |
| AR | Salta-Foz flight via BA | 240 | est |
| BR | Iguazu 18, Christ+Sugarloaf 45, local buses 180 | | est |
| flights | MEX 550, GIG 650 | | researched, see flights_p2.csv |

## gt_seed_caribbean-amazon-expedition: total EUR 4,576 (flights 1,000 + transport 2,330 + local 415 + extras 831). Ground budget alone 7,450.
| Block | Item | EUR | Flag |
|---|---|---|---|
| CU | Havana-Kingston flight ~420 + bus 25 | 445 | est (searched: $520-560) |
| CU | e-Visa ~$50 | 45 | converted USD 1.1188 |
| JM | KIN-CUR flight | 450 | searched avg $526 |
| CW | CUR-BON flight | 100 | est |
| BQ | BON-PTP flight | 480 | est (sources 480-700, infrequent route) |
| BQ | entry tax 70 (notes), Marine Park 22, Slagbaai 14 | | notes / est |
| GP, DM | L'Express des Iles legs 70 and 85 | | est |
| DM | Boiling Lake guide 62 | 62 | midpoint of 55-70 |
| LC | LC-GD flight 250; Gros Piton guide 65; Sulphur Springs EC$26 -> 9 (EC$ 3.02/EUR, pegged 2.7/USD) | | est |
| GD | GD-Paramaribo flight 250 | 250 | est (trip.com ~EUR 165-300) |
| SR | PBM-Belem ~$215 -> 200; ICF fee 36 (est $40); Maroon trip 330 (**judgment: notes say tours push the average up above the daily rate; may double count**); Brownsberg 35 | | est |
| BR | local coast legs 140 (incl. Barreirinhas-Jeri 4x4 ~65), Lencois tour 20 | | est |

## gt_seed_west-central-africa-expedition: total EUR 4,510 (flights 950 + transport 1,711 + local 749 + extras 1,100). Ground budget alone 5,160.
| Block | Item | EUR | Flag |
|---|---|---|---|
| CV | Praia-Dakar flight | 240 | est |
| CV | local: 2 Fogo flights (VXE-Fogo, Fogo-Praia) at 85 each (notes ~70-100) + ferry 24 + aluguer 20 | 214 | est / midpoint |
| CV | EASE | 35 | file |
| GM | Banjul-Abidjan flight | 380 | est (not found) |
| CI | e-visa | 73 | file |
| GH | e-visa ~$260 | 232 | converted USD 1.1188 |
| TG | e-visa 15 days 25,000 CFA | 38 | converted (655.957) ; judgment: 15-day tier suffices for 4 days |
| BJ | Cotonou-Douala flight | 400 | searched ($444 / EUR 249 low) |
| BJ | e-visa | 75 | midpoint of 50-100 |
| CM | e-visa | 190 | midpoint of notes 150-230 (looks high versus official fee; verify) |
| CM | Douala-Sao Tome flight 350 est + bus 8 | 358 | est |
| ST | e-visa 40; ST-Libreville flight 280; Principe return flight 160 + taxi | | est |
| GA | e-visa 90 (est); Loango permits/guide/boat 200 + Libreville-Loango return 200 | | est; **judgment: notes warn Loango can cost far more ($100-300+/day) and may double count with the 95/day rate** |
| GA | Pongara boat trip | 45 | est |
| flights | VXE 250 (low confidence), LBV 700 | | see csv |

## Route-text problems noticed
- Pan-American: Chile block order lists Iquique/Antofagasta after San Pedro, which implies a ~1,000 km north-south backtrack not mentioned in transport_to_next. Ecuador's note says Galapagos costs are in the budget, so block text and extras overlap. Honduras note says Roatan ferry route etc fine. Bolivia's destination order puts Uyuni before Sucre/Potosi, while transport_to_next says departure from Uyuni (no Uyuni-last).
- Caribbean: route text says "Havana-Kingston via Panama/Miami"; Miami transit is awkward for Cuba-visited travellers (ESTA ineligibility, see file note on Cuba); prefer Panama. Bonaire/Curacao, Guadeloupe "via Aruba" legs are infrequent; real prices likely higher.
- West-Central Africa: Cape Verde start island is unspecified (I assumed Sao Vicente); Cameroon e-visa "~EUR 150-230" looks inconsistent with the official fee; Ghana visa $260 in file should be reverified.
