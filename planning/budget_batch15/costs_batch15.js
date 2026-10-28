// ---- Phase 4 batch 15: Central & Eastern Europe 1/2, extracted 2026-10-28, approved by Youri (planning/budget_batch15/REVIEW.md) ----
// NOT yet in RB_ROUTE_COSTS: waiting for Youri's review (REVIEW.md). Entries go in as-is once approved/edited.
// Fares: flights_from_ams.csv + flights_batch15.csv. Car: data/cost_reference/car_costs_by_country.csv (7 L/100 km). All EU/Schengen: no visas.

  'gt_seed_bulgaria-greece-sofia-to-meteora-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Sofia one way (Skyscanner floor USD 98, Expedia USD 150-169, Lufthansa USD 198; typical between)
    flight_out_cost: 140,  // Thessaloniki-AMS (flights_from_ams.csv)
    blocks: [
      { code: 'BG', transport: 25, local: 20, extras: [] },   // Plovdiv-Thessaloniki via Kulata bus (est 25); local: Sofia-Plovdiv bus/train ~8 + Rila Monastery day-trip bus ~12 (est)
      { code: 'GR', local: 30, extras: [] },                  // Thessaloniki-Kalabaka-Thessaloniki train ~15 each way (est, notes: optionally back via Thessaloniki)
    ],
  },

  'gt_seed_bulgaria-romania-black-sea-coast-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Sofia (as above)
    flight_out_cost: 130,  // Bucharest-AMS one way (est, Wizz/Tarom/KLM typical)
    blocks: [
      { code: 'BG', transport: 28, local: 34, extras: [] },   // Varna-Bucharest bus via Ruse ~28 (est); local: Sofia-Plovdiv ~8, Plovdiv-Varna bus ~22, Varna-Golden Sands/Sunny Beach ~4 (est)
      { code: 'RO', local: 0, extras: [] },
    ],
  },

  'gt_seed_bulgaria-roadtrip-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Sofia
    flight_out_cost: 130,  // Sofia-AMS (est, mirror of out)
    blocks: [
      { code: 'BG', local: 0, extras: [] },                   // carInDailyRate true: car already in the budget, nothing added
    ],
  },

  'gt_seed_sofia-plovdiv-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,
    flight_out_cost: 130,
    blocks: [
      { code: 'BG', local: 28, extras: [                       // Sofia-Plovdiv-Sofia train 2 x ~8 (est) + Rila bus return ~12 (est); route text says train, not car
        rbExtra('Rila Monastery museums combo ticket (notes ~€12)', 12, 'activity'),
      ] },
    ],
  },

  'gt_seed_sofia-rila-monastery-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,
    flight_out_cost: 130,
    blocks: [
      { code: 'BG', local: 0, extras: [
        rbExtra('Car: rental 1 day (Rila day trip) × €30 + fuel ≈160 km + 1-day vignette €5.30 (could be a ~€12 bus instead)', 53, 'transport'),
        rbExtra('Rila Monastery museums combo ticket (notes ~€12)', 12, 'activity'),
      ] },
    ],
  },

  'gt_seed_central-europe-roadtrip-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,   // AMS-Berlin one way (est, easyJet/KLM/Eurowings typical)
    flight_out_cost: 100,  // Budapest-AMS one way (est from out fare; Expedia USD 91 floor)
    blocks: [
      { code: 'DE', transport: 30, local: 0, extras: [] },     // Berlin-Prague train/bus (est)
      { code: 'CZ', transport: 30, local: 0, extras: [] },     // Prague-Krakow RegioJet/Flix (est)
      { code: 'PL', transport: 35, local: 10, extras: [] },    // Krakow-Bratislava bus/train (est); local: Krakow-Auschwitz bus return ~10 (est)
      { code: 'SK', transport: 14, local: 0, extras: [] },     // Bratislava-Vienna train (est)
      { code: 'AT', transport: 25, local: 0, extras: [] },     // Vienna-Budapest Railjet advance fare (est)
      { code: 'HU', local: 0, extras: [] },
    ],
  },

  'gt_seed_czechia-austria-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,   // AMS-Prague one way (Trip.com easyJet EUR 74, Skyscanner EUR 97, KLM 102-149; typical)
    flight_out_cost: 110,  // Vienna-AMS (est, Austrian/KLM/Transavia)
    blocks: [
      { code: 'CZ', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 5 days (pickup leaving Prague, drop Vienna) × €35 + one-way cross-border drop ≈€100 (est) + fuel ≈660 km (CZ 180, AT 480) + vignettes CZ 9.44 + AT 12.80', 382, 'transport'),
      ] },
      { code: 'AT', local: 0, extras: [] },
    ],
  },

  'gt_seed_czechia-austria-hungary-10-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,   // AMS-Prague
    flight_out_cost: 100,  // Budapest-AMS
    blocks: [
      { code: 'CZ', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 3 days (Krumlov leg, Prague to Vienna) × €35 + one-way cross-border drop ≈€100 (est) + fuel ≈400 km + vignettes CZ 9.44 + AT 12.80', 279, 'transport'),
      ] },
      { code: 'AT', transport: 25, local: 0, extras: [] },     // Vienna-Budapest train (est)
      { code: 'HU', local: 0, extras: [] },
    ],
  },

  'gt_seed_czechia-roadtrip-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,
    flight_out_cost: 100,  // Prague-AMS
    blocks: [
      { code: 'CZ', local: 0, extras: [] },                    // carInDailyRate true: nothing added
    ],
  },

  'gt_seed_moravia-brno-wine-region-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,   // AMS-Prague
    flight_out_cost: 100,
    blocks: [
      { code: 'CZ', local: 20, extras: [                       // Prague-Brno-Prague RegioJet train/bus 2 x ~10 (est)
        rbExtra('Car: rental 3 days (Brno base, wine region) × €35 + fuel ≈110 km + 1-day vignette €9.44 (bike alternative)', 129, 'transport'),
      ] },
    ],
  },

  'gt_seed_prague-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,
    flight_out_cost: 100,
    blocks: [
      { code: 'CZ', local: 0, extras: [
        rbExtra('Prague Castle basic ticket 450 CZK (notes ~€18)', 18, 'activity'),
      ] },
    ],
  },

  'gt_seed_prague-bohemia-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,
    flight_out_cost: 100,
    blocks: [
      { code: 'CZ', local: 24, extras: [] },                    // Prague-Cesky Krumlov-Prague RegioJet ~12 each way (est); Karlovy Vary stopover left out (optional)
    ],
  },

  'gt_seed_baltic-states-roadtrip-10-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Tallinn one way (Skyscanner EUR 66 floor, Expedia USD 167, Kayak USD 150, LOT USD 234; typical)
    flight_out_cost: 130,  // Vilnius-AMS (est)
    blocks: [
      { code: 'EE', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 11 days (from day 3 after Tallinn) × €35 + one-way drop Tallinn-Vilnius ≈€100 (est) + Virtsu-Kuivastu car ferry both ways ≈€48 (est) + fuel ≈1460 km (EE 400, LV 420, LT 640), no tolls', 732, 'transport'),
      ] },
      { code: 'LV', transport: 0, local: 0, extras: [] },
      { code: 'LT', local: 0, extras: [
        rbExtra('Neringa/Nida car eco-toll: €50 (20 Jun-20 Aug) or €10 otherwise, midpoint (notes)', 30, 'park_fee'),
      ] },
    ],
  },

  'gt_seed_estonia-5-7-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Tallinn
    flight_out_cost: 130,  // Tallinn-AMS
    blocks: [
      { code: 'EE', local: 36, extras: [] },                   // Tallinn-Kuressaare Lux Express bus incl. ferry ~18 each way (est); public, no car
    ],
  },

  'gt_seed_tallinn-riga-vilnius-7-10-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Tallinn
    flight_out_cost: 130,  // Vilnius-AMS
    blocks: [
      { code: 'EE', transport: 18, local: 0, extras: [] },     // Lux Express Tallinn-Riga (notes: $11-60 per leg; est 18)
      { code: 'LV', transport: 18, local: 0, extras: [] },     // Lux Express Riga-Vilnius (est 18)
      { code: 'LT', local: 0, extras: [] },
    ],
  },

  'gt_seed_budapest-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Budapest (Skyscanner EUR 87 floor, Expedia USD 167, Lufthansa USD 193; typical)
    flight_out_cost: 100,  // Budapest-AMS (Expedia USD 91 floor; est)
    blocks: [
      { code: 'HU', local: 0, extras: [
        rbExtra('Szechenyi Thermal Baths admission (notes ~€13-35, midpoint)', 24, 'activity'),
      ] },
    ],
  },

  'gt_seed_budapest-eger-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,
    flight_out_cost: 100,
    blocks: [
      { code: 'HU', local: 22, extras: [] },                   // Budapest-Eger-Budapest train ~9 each way (est) + Szentendre HEV return ~4
    ],
  },

  'gt_seed_hungary-slovenia-croatia-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Budapest
    flight_out_cost: 140,  // Zagreb-AMS (flights_from_ams.csv)
    blocks: [
      { code: 'HU', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 7 days (from day 3 after Budapest) × €35 + one-way drop Budapest-Zagreb ≈€120 (est) + fuel ≈1230 km (HU 140, SI 420, HR 670) + tolls HR 60% × €7.5/100 km + vignettes SI €16, HU €15.10', 580, 'transport'),
      ] },
      { code: 'SI', transport: 0, local: 0, extras: [] },
      { code: 'HR', local: 0, extras: [] },
    ],
  },

  'gt_seed_hungary-roadtrip-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,
    flight_out_cost: 100,
    blocks: [
      { code: 'HU', local: 0, extras: [
        rbExtra('Car: rental 4 days (from day 3 after Budapest) × €35 + fuel ≈630 km + HU vignette €15.10', 233, 'transport'),
      ] },
    ],
  },

  'gt_seed_slovakia-hungary-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Bratislava one way (est, few direct flights; Vienna/Budapest alternative)
    flight_out_cost: 100,  // Budapest-AMS
    blocks: [
      { code: 'SK', transport: 15, local: 14, extras: [] },    // Bratislava-Budapest train (notes: every 2h, 2h25; est 15); local: Gyor day-trip train return (est)
      { code: 'HU', local: 18, extras: [] },                   // Budapest-Eger-Budapest train ~9 each way (est)
    ],
  },

  'gt_seed_lithuania-5-7-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Vilnius one way (est, airBaltic/Ryanair/Wizz)
    flight_out_cost: 130,
    blocks: [
      { code: 'LT', local: 59, extras: [                       // Trakai ~5 return, Vilnius-Kaunas ~8, Kaunas-Klaipeda ~14, Klaipeda-Nida incl. passenger ferry ~7, Nida-Vilnius bus ~25 (all est)
        rbExtra('Trakai Castle ticket (notes €12 May-Sep)', 12, 'activity'),
      ] },
    ],
  },

  'gt_seed_latvia-5-7-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Riga one way (est)
    flight_out_cost: 120,
    blocks: [
      { code: 'LV', local: 17, extras: [                       // Riga-Sigulda train ~2.5 x2, Riga-Rundale bus ~5 x2, Turaida local ~2 (est); public, no car
        rbExtra('Rundale Palace + garden combined ticket (notes €17)', 17, 'activity'),
        rbExtra('Sigulda cable car / bobsled (notes ~€9-14, 2021 prices, midpoint)', 12, 'activity'),
      ] },
    ],
  },
