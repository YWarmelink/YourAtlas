// ---- Phase 4 batch 4: Italy, San Marino & Malta part 3/3, extracted 2026-10-28, approved by Youri (planning/budget_batch4/REVIEW.md) ----
// Fares: flights_from_ams.csv + flights_batch4.csv. Car: data/cost_reference/car_costs_by_country.csv (7 L/100 km, IT 2.016 EUR/l, EUR 45/day, tolls 8/100 km on ~60% of km).

  'gt_seed_sicily-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Palermo one way (flights_batch4.csv; open-jaw per notes)
    flight_out_cost: 140,  // Catania-AMS one way (reuse CTA)
    blocks: [
      { code: 'IT', transport: 0, local: 0, extras: [] },  // car in the daily rate (~EUR 110/day incl. rental + fuel): nothing added
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', local: 0, extras: [] },
    ],
  },

  'gt_seed_sicily-aeolian-islands-3-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Catania (reuse CTA)
    flight_out_cost: 140,  // Catania-AMS (reuse CTA, est)
    blocks: [
      { code: 'IT', transport: 6, local: 30, extras: [] },   // local: bus Catania airport-Milazzo ~14 (est, no car: notes say cars not allowed on islands) + hydrofoil Milazzo-Lipari ~16 (est); transport: Lipari-Vulcano ~6 (est)
      { code: 'IT', transport: 18, local: 0, extras: [] },   // Vulcano-Stromboli hydrofoil ~18 (est)
      { code: 'IT', local: 42, extras: [] },                 // Stromboli-Milazzo hydrofoil ~28 (est) + bus Milazzo-Catania airport ~14 (est). Mandatory Stromboli guide not priced: notes name no price and say it is inside the daily budget
    ],
  },

  'gt_seed_sicily-malta-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Catania (reuse CTA)
    flight_out_cost: 120,  // Malta-AMS (reuse MLA)
    blocks: [
      { code: 'IT', transport: 55, local: 0, extras: [] },   // flight Catania-Malta: notes say Ryanair EUR 18-35 promo; batch 2's typical estimate EUR 55 reused (est). Car in the daily rate: nothing added
      { code: 'MT', local: 0, extras: [] },                  // Malta by bus, in the daily budget
    ],
  },

  'gt_seed_sicily-southern-italy-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Naples (reuse NAP)
    flight_out_cost: 120,  // Palermo-AMS (flights_batch4.csv; route ends Palermo/Cefalu)
    blocks: [
      { code: 'IT', transport: 0, local: 0, extras: [         // Naples/Salerno day 1 without a car
        rbExtra('Car: rental 11 days (from day 2, Naples to Palermo) × €45 + one-way drop Naples→Palermo ≈€100 (est, mainland-to-island, flagged) + Villa San Giovanni-Messina car ferry ≈€35 (est) + fuel ≈1190 km + tolls (60% of km × €8/100 km)', 855, 'transport'),
      ] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', local: 0, extras: [] },
    ],
  },

  'gt_seed_sicily-east-4-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Catania
    flight_out_cost: 140,  // Catania-AMS (est)
    blocks: [
      { code: 'IT', transport: 0, local: 0, extras: [         // Catania days 1-2 on foot/bus, car from leaving Catania
        rbExtra('Car: rental 3 days (Taormina/Etna/Syracuse loop, back to Catania airport) × €45 + fuel ≈250 km (190 route + Syracuse-airport return) + tolls (60% of km × €8/100 km)', 182, 'transport'),
      ] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', local: 0, extras: [] },
    ],
  },

  'gt_seed_sicily-roadtrip-7-10-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Palermo
    flight_out_cost: 140,  // Catania-AMS
    blocks: [
      { code: 'IT', transport: 0, local: 0, extras: [         // Palermo 2 days without a car (ZTL)
        rbExtra('Car: rental 7 days (after Palermo, loop to Catania) × €45 + one-way drop Palermo→Catania ≈€60 (est, flagged) + fuel ≈580 km + tolls (60% of km × €8/100 km)', 485, 'transport'),
      ] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', local: 0, extras: [] },
    ],
  },

  'gt_seed_sicily-west-4-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Palermo
    flight_out_cost: 120,  // Palermo-AMS
    blocks: [
      { code: 'IT', transport: 0, local: 0, extras: [         // Palermo/Monreale by bus, car from leaving Palermo
        rbExtra('Car: rental 3 days (Trapani/Erice/Segesta, back to Palermo airport) × €45 + fuel ≈200 km (130 route + return to airport) + tolls (60% of km × €8/100 km)', 173, 'transport'),
      ] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', local: 0, extras: [] },
    ],
  },

  'gt_seed_tuscany-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Florence
    flight_out_cost: 130,  // Florence-AMS
    blocks: [
      { code: 'IT', transport: 0, local: 0, extras: [         // notes: fly AMS-FLR + rental car "for the whole week" (not a drive from NL)
        rbExtra('Car: rental 6 days (whole stay per notes, Florence pickup/drop) × €45 + fuel ≈260 km + tolls (60% of km × €8/100 km)', 319, 'transport'),
      ] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'IT', local: 0, extras: [] },
    ],
  },

  'gt_seed_vatican-city-day-visit-within-a-rome-stay-1-day': {
    checked: '2026-10-28',
    flight_in_cost: 0,     // add-on day inside a Rome stay (notes): the flight belongs to the Rome route
    flight_out_cost: 0,    // same
    blocks: [
      { code: 'IT', local: 0, extras: [] },                  // metro/bus in the daily budget; Scavi/dome add-ons (~60-90) explicitly NOT part of this day
    ],
  },

  'gt_seed_venice-dolomites-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 90,    // AMS-Venice (flights_batch4.csv, est from back fare)
    flight_out_cost: 80,   // Venice-AMS
    blocks: [
      { code: 'IT', transport: 0, local: 0, extras: [         // Venice 2 days without a car
        rbExtra('Car: rental 3 days (Venice→Dolomites→Venice airport) × €45 + fuel ≈380 km (notes: ~150 km each way + local) + tolls (60% of km × €8/100 km)', 207, 'transport'),
      ] },
      { code: 'IT', local: 0, extras: [] },
    ],
  },

  'gt_seed_malta-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Malta (flights_batch4.csv)
    flight_out_cost: 120,  // Malta-AMS (reuse MLA)
    blocks: [
      { code: 'MT', local: 0, extras: [] },                  // notes mention no car: island by bus, in the daily budget; Hypogeum ticket has no price in notes
    ],
  },

  'gt_seed_malta-gozo-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Malta
    flight_out_cost: 120,  // Malta-AMS
    blocks: [
      { code: 'MT', local: 0, extras: [
        rbExtra('Gozo ferry Cirkewwa-Mgarr (foot passenger return ≈€5, est: Gozo Channel ~4.65)', 5, 'transport'),
      ] },
    ],
  },

  'gt_seed_san-marino-day-visit-1-day': {
    checked: '2026-10-28',
    flight_in_cost: 0,     // add-on day from an Adriatic coast stay (notes): flight belongs to that stay
    flight_out_cost: 0,    // same
    blocks: [
      { code: 'SM', local: 0, extras: [] },                  // notes: Rimini bus ~EUR 7, tower ~10-15, lunch are inside the stated ~EUR 40-60 day budget
    ],
  },
