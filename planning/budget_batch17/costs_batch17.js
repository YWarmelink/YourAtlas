// ---- Phase 4 batch 17: Nordics 1/2, extracted 2026-10-28, approved by Youri (planning/budget_batch17/REVIEW.md) ----
// Fares: flights_from_ams.csv + flights_batch17.csv (no WebSearch this run: all new fares are estimates). Car: data/cost_reference/car_costs_by_country.csv (7 L/100 km). NOK at ~11.5/EUR.

  'gt_seed_copenhagen-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 90,    // AMS-CPH one way (KLM/SAS/Transavia/easyJet typical 70-110; est)
    flight_out_cost: 90,   // CPH-AMS (same; est)
    blocks: [
      { code: 'DK', local: 0, extras: [] },   // on foot/metro/bike; Copenhagen Card not priced in notes
    ],
  },

  'gt_seed_copenhagen-zealand-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 90,    // AMS-CPH (as above)
    flight_out_cost: 90,
    blocks: [
      { code: 'DK', local: 38, extras: [   // train returns Roskilde ~21 + Humlebaek ~17 (DSB zone fares, est)
        rbExtra('Car: rental 1 day (Møns Klint day trip) × €55 + fuel ≈250 km (km_in_route)', 101, 'transport'),
      ] },
    ],
  },

  'gt_seed_denmark-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 90,
    flight_out_cost: 90,   // fly home from Copenhagen (notes alternative: Billund)
    blocks: [
      { code: 'DK', local: 93, extras: [] },  // CPH-Odense train ~25 + Odense-Billund train/bus ~20 + Billund-Aarhus bus ~13 + Aarhus-CPH train ~35 (DSB/Flixbus, est)
    ],
  },

  'gt_seed_denmark-south-sweden-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 90,
    flight_out_cost: 90,   // fly home from Copenhagen (train from Malmö)
    blocks: [
      { code: 'DK', transport: 13, local: 38, extras: [] },   // Öresund train CPH-Malmö ~13 (est); local = Roskilde + Humlebaek train returns (est)
      { code: 'SE', local: 13, extras: [    // Öresund train Malmö-CPH airport ~13 (est)
        rbExtra('Car: rental 4 days (Skåne, picked up in Malmö) × €55 + fuel ≈200 km (SE share of km_in_route); no Öresund bridge toll', 243, 'transport'),
      ] },
    ],
  },

  'gt_seed_aland-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 135,   // AMS-Stockholm ARN ~100 (est) + Viking Line/Tallink ferry Stockholm-Mariehamn foot passenger ~35 (est)
    flight_out_cost: 135,  // same way back (notes: ferry onward to Stockholm)
    blocks: [
      { code: 'FI', local: 0, extras: [] },  // cycling; bike hire assumed in the ground budget
    ],
  },

  'gt_seed_finland-roadtrip-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 150,   // AMS-HEL (flights_from_ams.csv)
    flight_out_cost: 190,  // Rovaniemi-AMS one way, usually 1 stop via HEL/CPH (est)
    blocks: [
      { code: 'FI', local: 0, extras: [
        rbExtra('Car: rental 10 days (Turku onward, not the 2 Helsinki days) × €55 + fuel ≈1120 km + one-way drop Rovaniemi ≈€120 (est); no tolls', 852, 'transport'),
      ] },
    ],
  },

  'gt_seed_finnish-lapland-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 190,   // AMS-Rovaniemi one way (est; Transavia seasonal direct, else 1 stop)
    flight_out_cost: 190,
    blocks: [
      { code: 'FI', local: 0, extras: [
        rbExtra('Car: rental 6 days (Rovaniemi-Levi/Ylläs-back, winter tyres in rate) × €55 + fuel ≈240 km (km_in_route, likely low)', 369, 'transport'),
        rbExtra('One husky/aurora/snowmobile activity (notes: €80-150 each, midpoint)', 115, 'tour', true),
      ] },
    ],
  },

  'gt_seed_helsinki-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 150,   // AMS-HEL (flights_from_ams.csv)
    flight_out_cost: 150,  // HEL-AMS (est = out)
    blocks: [
      { code: 'FI', local: 0, extras: [] },  // Suomenlinna ferry included in HSL ticket (notes)
    ],
  },

  'gt_seed_helsinki-lake-district-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 150,
    flight_out_cost: 150,
    blocks: [
      { code: 'FI', local: 0, extras: [
        rbExtra('Car: rental 4 days (after 2 Helsinki days) × €55 + fuel ≈430 km (km_in_route); returns to Helsinki, no drop fee', 290, 'transport'),
      ] },
    ],
  },

  'gt_seed_south-finland-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 150,
    flight_out_cost: 150,
    blocks: [
      { code: 'FI', local: 66, extras: [   // VR/bus: Helsinki-Porvoo return ~14, Helsinki-Turku ~18, Turku-Tampere ~16, Tampere-Helsinki ~18 (est)
        rbExtra('Turku Castle entry (notes: €10-14, midpoint)', 12, 'activity'),
        rbExtra('Turku Cathedral entry (notes: €10-14, midpoint)', 12, 'activity'),
      ] },
    ],
  },

  'gt_seed_faroe-islands-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 280,   // AMS-Vágar via CPH (AMS-CPH ~90 + Atlantic Airways CPH-FAE ~190; est, low)
    flight_out_cost: 280,
    blocks: [
      { code: 'FO', local: 0, extras: [
        rbExtra('Car: rental 5 days × €110 (FO file rate, highest in Europe) + fuel ≈120 km + sub-sea tunnel tolls ≈€27 (est)', 594, 'transport'),
      ] },
    ],
  },

  'gt_seed_greenland': {
    checked: '2026-10-28',
    flight_in_cost: 575,   // AMS-KEF-Nuuk: notes ±€900-1,400 return, midpoint 1,150 halved (no one-way given)
    flight_out_cost: 650,  // Ilulissat-AMS: reused flights_from_ams.csv row JAV back (notes imply ~390: see REVIEW)
    blocks: [
      { code: 'GL', local: 0, extras: [] },    // Air Greenland domestic flights are IN the daily rate (R2d kept this block for that; orchestrator call 2026-10-28, the agent had €300); boat trips (Eqi) have no price in notes
    ],
  },

  'gt_seed_faroe-islands-iceland-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 280,   // AMS-Vágar via CPH (est, as Faroe 6 days)
    flight_out_cost: 120,  // KEF-AMS (flights_batch17.csv, est)
    blocks: [
      { code: 'FO', transport: 270, local: 0, extras: [   // FAE-CPH-KEF flights ~270 (est, low): Norröna combo needs ~10 days and lands in Seyðisfjörður, so flights priced
        rbExtra('Car: Faroe rental 2 days × €110 + fuel ≈30 km', 224, 'transport'),
      ] },
      { code: 'IS', local: 27, extras: [   // Flybus KEF-Reykjavik one way (est)
        rbExtra('Car: Iceland rental 4 days × €80 + fuel ≈300 km (Golden Circle + Blue Lagoon; km_in_route 1280 includes the FO-IS leg)', 363, 'transport'),
        rbExtra('Blue Lagoon entry (sibling route notes: from €65-75, midpoint 70 × 1.25, flagged "from")', 88, 'activity'),
      ] },
    ],
  },

  'gt_seed_iceland-extended-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-KEF one way (est)
    flight_out_cost: 120,
    blocks: [
      { code: 'IS', local: 0, extras: [
        rbExtra('Car: rental 13 days × €80 (2WD, Westfjords option) + fuel ≈2300 km (Ring Road 1,332 + Westfjords ≈900 + airport) + Vaðlaheiði tunnel ≈€10 (est)', 1377, 'transport'),
      ] },
    ],
  },

  'gt_seed_iceland-ring-road-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,
    flight_out_cost: 120,
    blocks: [
      { code: 'IS', local: 0, extras: [
        rbExtra('Car: rental 11 days × €80 + fuel ≈1400 km (notes: Ring Road 1,332 km + airport) + Vaðlaheiði tunnel ≈€10 (est)', 1089, 'transport'),
      ] },
    ],
  },

  'gt_seed_iceland-south-coast-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,
    flight_out_cost: 120,
    blocks: [
      { code: 'IS', local: 27, extras: [   // Flybus KEF-Reykjavik one way (est)
        rbExtra('Car: rental 7 days × €80 + fuel ≈1100 km (Golden Circle 230 + Reykjavík-Höfn 457 out and back; km_in_route 560 is one-way)', 716, 'transport'),
      ] },
    ],
  },

  'gt_seed_reykjavik-golden-circle-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,
    flight_out_cost: 120,
    blocks: [
      { code: 'IS', local: 27, extras: [   // Flybus KEF-Reykjavik one way (est)
        rbExtra('Car: rental 3 days × €80 + fuel ≈280 km (km_in_route)', 280, 'transport'),
        rbExtra('Blue Lagoon entry (notes: from €65-75, midpoint 70 × 1.25, flagged "from")', 88, 'activity'),
      ] },
    ],
  },

  'gt_seed_south-iceland-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,
    flight_out_cost: 120,
    blocks: [
      { code: 'IS', local: 27, extras: [   // Flybus KEF-Reykjavik one way (est)
        rbExtra('Car: rental 4 days × €80 + fuel ≈560 km (Golden Circle loop 230 + Reykjavík-Vík and back 330; km_in_route 290 is one-way)', 400, 'transport'),
      ] },
    ],
  },

  'gt_seed_bergen-alesund-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-BGO one way (KLM/SAS/Norwegian typical; est)
    flight_out_cost: 130,  // Ålesund-AMS one way (est)
    blocks: [
      { code: 'NO', local: 0, extras: [
        rbExtra('Car: rental 10 days (after 2 Bergen days) × €75 + one-way drop Bergen-Ålesund ≈€200 (est) + fuel ≈900 km (incl. Atlantic Ocean Road; km_in_route 570 too low) + AutoPASS tolls and ≈3 car ferries ≈€150 (est)', 1276, 'transport'),
      ] },
    ],
  },

  'gt_seed_bergen-fjords-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,
    flight_out_cost: 120,
    blocks: [
      { code: 'NO', local: 110, extras: [   // Bergen-Voss train ~18, Voss-Gudvangen bus ~14, Nærøyfjord cruise Gudvangen-Flåm ~50, Myrdal-Bergen train ~28 (est)
        rbExtra('Flåm Railway one way (notes: NOK 570 at 11.5 NOK/EUR)', 50, 'transport'),
      ] },
    ],
  },

  'gt_seed_fjord-norway-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,
    flight_out_cost: 130,  // fly home from Ålesund (notes: Bergen or Ålesund)
    blocks: [
      { code: 'NO', local: 0, extras: [
        rbExtra('Car: rental 8 days (after 1 Bergen day) × €75 + one-way drop Bergen-Ålesund ≈€200 (est) + fuel ≈770 km (km_in_route) + AutoPASS tolls and car ferries ≈€120 (est)', 1070, 'transport'),
        rbExtra('Trolltunga parking 1 day (notes: NOK 330)', 29, 'park_fee', true),
        rbExtra('Preikestolen P1 parking (notes: NOK 250/day)', 22, 'park_fee', true),
      ] },
    ],
  },
