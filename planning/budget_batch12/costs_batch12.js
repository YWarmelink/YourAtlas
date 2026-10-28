// ---- Phase 4 batch 12: Adriatic & Western Balkans 2/2, extracted 2026-10-28, approved by Youri (planning/budget_batch12/REVIEW.md) ----
// Fares: flights_from_ams.csv + flights_batch12.csv. Car: data/cost_reference/car_costs_by_country.csv (7 L/100 km).
// Non-EU Balkan countries (AL, BA, ME, MK, RS, XK) are visa-free for a Dutch passport (VISA_VACCINATION_RESEARCH.md): no visa extras.

  'gt_seed_grand-balkan-roadtrip-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Ljubljana one way (flights_batch12.csv)
    flight_out_cost: 160,  // Tivat-AMS one way (flights_batch12.csv)
    blocks: [
      { code: 'SI', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 10 days (from Bled, day 3) × €45 + one-way international drop SI→ME ≈€250 (est, many firms ban BA/ME) + fuel ≈1160 km + tolls (SI vignette 16, 60% of km × toll/100 km in HR/BA/ME)', 896, 'transport'),
      ] },
      { code: 'HR', transport: 0, local: 0, extras: [] },
      { code: 'BA', transport: 0, local: 0, extras: [] },
      { code: 'ME', local: 0, extras: [] },
    ],
  },

  'gt_seed_istria-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Pula one way
    flight_out_cost: 110,  // Pula-AMS one way
    blocks: [
      { code: 'HR', local: 0, extras: [
        rbExtra('Car: rental 4 days (Rovinj/Poreč/hill towns) × €48 + fuel ≈250 km (loop from/to Pula, own estimate; input said 100) + tolls (60% × €7.5/100 km); returned at Pula airport, no drop fee', 235, 'transport'),
      ] },
    ],
  },

  'gt_seed_italy-slovenia-croatia-10-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 90,    // AMS-Venice one way (CSV)
    flight_out_cost: 140,  // Zagreb-AMS one way (flights_batch12.csv)
    blocks: [
      { code: 'IT', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 10 days (from Venice, day 3, to Zagreb) × €45 + one-way international drop IT→HR ≈€120 (est) + fuel ≈850 km + tolls (SI vignette 16, HR 60% × €7.5/100 km, Venice-Trieste ≈7 est)', 724, 'transport'),
      ] },
      { code: 'SI', transport: 0, local: 0, extras: [] },
      { code: 'SI', transport: 0, local: 0, extras: [] },
      { code: 'HR', transport: 0, local: 0, extras: [] },
      { code: 'HR', transport: 0, local: 0, extras: [] },
      { code: 'HR', local: 0, extras: [] },
    ],
  },

  'gt_seed_plitvice-zagreb-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 150,   // AMS-Zagreb one way
    flight_out_cost: 140,  // Zagreb-AMS one way
    blocks: [
      { code: 'HR', local: 0, extras: [
        rbExtra('Car: rental 3 days (Zagreb-Plitvice-Zagreb, Rastoke) × €48 + fuel ≈300 km (Zagreb-Plitvice ~130 km each way) + tolls (60% × €7.5/100 km)', 195, 'transport'),
      ] },
    ],
  },

  'gt_seed_slovenia-croatia-montenegro-coast-10-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Ljubljana
    flight_out_cost: 160,  // Tivat-AMS
    blocks: [
      { code: 'SI', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 8 days (from Bled, day 3, to Kotor) × €45 + one-way international drop SI→ME ≈€200 (est) + fuel ≈850 km + tolls (SI vignette 16, 60% of km × toll/100 km in HR/ME)', 717, 'transport'),
      ] },
      { code: 'HR', transport: 0, local: 0, extras: [] },
      { code: 'ME', local: 0, extras: [] },
    ],
  },

  'gt_seed_slovenia-croatian-istria-7-10-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Ljubljana
    flight_out_cost: 110,  // Pula-AMS
    blocks: [
      { code: 'SI', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 7 days (from Bled, day 3, to Pula) × €45 + one-way international drop SI→HR ≈€100 (est) + fuel ≈340 km (own road estimate; input said 290) + tolls (SI vignette 16, HR 60% × €7.5/100 km)', 480, 'transport'),
      ] },
      { code: 'HR', local: 0, extras: [] },
    ],
  },

  'gt_seed_split-islands-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,   // AMS-Split
    flight_out_cost: 100,  // Split-AMS
    blocks: [
      { code: 'HR', local: 38, extras: [] },  // catamaran Split-Hvar 15.5 (notes €6-25 midpoint) + Hvar-Bol ≈12 (est) + Brač-Split ferry ≈10 (est); optional Vis not priced (notes give no price)
    ],
  },

  'gt_seed_kosovo-montenegro-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Pristina
    flight_out_cost: 160,  // Tivat-AMS
    blocks: [
      { code: 'XK', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 8 days × €33 + one-way international drop XK→ME ≈€100 (est, cross-border insurance incl.) + fuel ≈540 km (own road estimate; input said 260) + tolls (ME 60% × €5/100 km, small XK toll est)', 449, 'transport'),
      ] },
      { code: 'ME', local: 0, extras: [] },
    ],
  },

  'gt_seed_kotor-bay-of-kotor-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 170,   // AMS-Tivat
    flight_out_cost: 160,  // Tivat-AMS
    blocks: [
      { code: 'ME', local: 15, extras: [  // Tivat airport-Kotor bus + Kotor-Perast / Herceg Novi buses (est)
        rbExtra('Kotor city walls ticket', 11.5, 'activity'),  // notes: €8-15 midpoint
      ] },
    ],
  },

  'gt_seed_montenegro-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Podgorica
    flight_out_cost: 130,  // Podgorica-AMS
    blocks: [
      { code: 'ME', local: 0, extras: [
        rbExtra('Car: rental 5 days × €40 + fuel ≈480 km (Kotor/Budva/Lovćen/Durmitor/Ostrog loop from Podgorica, own estimate; input said 210) + tolls (60% × €5/100 km); returned at Podgorica, no drop fee', 276, 'transport'),
        rbExtra('National park season pass (5 parks; Durmitor + Lovćen)', 13.5, 'park_fee'),  // notes: €5/day or €13.50 pass
      ] },
    ],
  },

  'gt_seed_montenegro-croatia-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Dubrovnik
    flight_out_cost: 160,  // Tivat-AMS
    blocks: [
      { code: 'HR', transport: 20, local: 0, extras: [] },  // Dubrovnik-Kotor bus (est ~€15-25); no car priced (see REVIEW)
      { code: 'ME', local: 12, extras: [] },                // Kotor-Perast/Budva/Herceg Novi buses + Tivat airport bus (est)
    ],
  },

  'gt_seed_montenegro-roadtrip-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Podgorica
    flight_out_cost: 130,  // Podgorica-AMS
    blocks: [
      { code: 'ME', local: 0, extras: [] },  // car already in the daily rate (~€50-60/day incl. rental car): nothing added
    ],
  },

  'gt_seed_albania-north-macedonia-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Tirana
    flight_out_cost: 130,  // Skopje-AMS
    blocks: [
      { code: 'AL', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 7 days (from Tirana after 2 city days, to Skopje) × €33 + one-way international drop AL→MK ≈€150 (est) + fuel ≈480 km + tolls (MK 60% × €3.5/100 km)', 447, 'transport'),
      ] },
      { code: 'MK', local: 0, extras: [] },
    ],
  },

  'gt_seed_balkan-roadtrip-serbia-north-macedonia-albania-kosovo-14-day': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Belgrade
    flight_out_cost: 130,  // Belgrade-AMS
    blocks: [
      { code: 'RS', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 10 days (from Belgrade day 4 back to Belgrade) × €35 + cross-border permits/insurance for 4 countries ≈€60 (est) + fuel ≈1420 km + tolls (60% × toll/100 km in MK/RS/XK)', 607, 'transport'),
      ] },
      { code: 'MK', transport: 0, local: 0, extras: [] },
      { code: 'MK', transport: 0, local: 0, extras: [] },
      { code: 'AL', transport: 0, local: 0, extras: [] },
      { code: 'XK', transport: 0, local: 0, extras: [] },
      { code: 'RS', local: 0, extras: [] },
    ],
  },

  'gt_seed_north-macedonia-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Skopje
    flight_out_cost: 130,  // Skopje-AMS
    blocks: [
      { code: 'MK', local: 0, extras: [
        rbExtra('Car: rental 4 days (Skopje-Ohrid-Bitola-Skopje) × €30 + fuel ≈410 km (own road estimate; input said 220) + tolls (60% × €3.5/100 km)', 173, 'transport'),
      ] },
    ],
  },

  'gt_seed_north-macedonia-albania-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Skopje
    flight_out_cost: 110,  // Tirana-AMS
    blocks: [
      { code: 'MK', transport: 9.5, local: 10, extras: [] },  // transport: Skopje/Ohrid-Tirana bus €9.50 (notes); local: Skopje-Ohrid bus (est)
      { code: 'AL', local: 10, extras: [] },                  // Tirana-Berat return bus (est)
    ],
  },

  'gt_seed_north-macedonia-greece-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Skopje
    flight_out_cost: 140,  // Thessaloniki-AMS
    blocks: [
      { code: 'MK', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 3 days (Skopje-Ohrid-Thessaloniki) × €30 + one-way international drop MK→GR ≈€120 (est) + fuel ≈380 km + tolls (MK 60% × €3.5/100 km; GR ≈€6.5 per notes €5-8)', 272, 'transport'),
      ] },
      { code: 'GR', local: 0, extras: [] },
    ],
  },

  'gt_seed_skopje-ohrid-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Skopje
    flight_out_cost: 130,  // Skopje-AMS
    blocks: [
      { code: 'MK', local: 0, extras: [
        rbExtra('Car: rental 3 days (Skopje-Ohrid-Skopje, Sveti Naum) × €30 + fuel ≈370 km (return trip counted; input said 180) + tolls (60% × €3.5/100 km)', 138, 'transport'),
      ] },
    ],
  },

  'gt_seed_belgrade-surroundings-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Belgrade
    flight_out_cost: 130,  // Belgrade-AMS
    blocks: [
      { code: 'RS', local: 8, extras: [] },  // Belgrade-Novi Sad train/bus return ≈8 (est; city transport free); Fruška Gora day trip within daily budget
    ],
  },
