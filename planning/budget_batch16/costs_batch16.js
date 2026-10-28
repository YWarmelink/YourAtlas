// ---- Phase 4 batch 16: Central & Eastern Europe 2/2, extracted 2026-10-28, approved by Youri (planning/budget_batch16/REVIEW.md) ----
// NOT yet in RB_ROUTE_COSTS: waiting for Youri's review. Fares: flights_from_ams.csv + flights_batch16.csv.
// Car: data/cost_reference/car_costs_by_country.csv (7 L/100 km). Public-transport prices are estimates ("est") unless the notes name them.

  'gt_seed_moldova-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Chisinau one way (Skyscanner floor 87, Expedia 107, Kayak USD 112-126; typical above floors; WebSearch 2026-10-28)
    flight_out_cost: 120,  // Chisinau-AMS one way (Expedia USD 130; est)
    blocks: [
      { code: 'MD', local: 10, extras: [   // marshrutka Chisinau-Orheiul Vechi return, Cricova/Comrat minibus hops (est)
        rbExtra('Cricova standalone wine cellar tour (notes: ~$95-110, midpoint $102 ≈ €94)', 94, 'tour'),
        rbExtra('Orheiul Vechi entry (notes: 20 MDL)', 1, 'activity'),
      ] },
    ],
  },

  'gt_seed_moldova-transnistria-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // as Moldova 5 days
    flight_out_cost: 120,
    blocks: [
      { code: 'MD', local: 10, extras: [] },   // marshrutka to Orheiul Vechi, Tiraspol/Bender day trip bus ~€5 return (est); Transnistria day-trip cost (notes €15-20) assumed already in the €220 ground budget
    ],
  },

  'gt_seed_baltics-poland-10-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Tallinn one way (airBaltic/KLM; Skyscanner floor 66, Expedia USD 167, Kayak USD 150; typical above floor)
    flight_out_cost: 100,  // Warsaw-AMS one way (KLM/LOT; Expedia EUR 98 floor, Ratepunk USD 135-237; est)
    blocks: [
      { code: 'EE', transport: 15, local: 0, extras: [] },  // Lux Express Tallinn-Riga ~€15 (est)
      { code: 'LV', transport: 15, local: 0, extras: [] },  // Lux Express Riga-Vilnius ~€15 (est)
      { code: 'LT', transport: 25, local: 0, extras: [] },  // bus Vilnius-Warsaw (Lux Express/FlixBus, ~€25 est); no car: notes say capitals by bus, car only "or train"
      { code: 'PL', local: 15, extras: [] },               // Warsaw-Masurian Lakes-Gdansk trains/buses (est; 0 if Warsaw only)
    ],
  },

  'gt_seed_krakow-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Krakow one way (Trip.com USD 110 floor, Expedia GBP 94, Ratepunk USD 226-340; typical)
    flight_out_cost: 110,  // Krakow-AMS one way (est from out fare)
    blocks: [
      { code: 'PL', local: 0, extras: [] },   // everything walkable
    ],
  },

  'gt_seed_krakow-auschwitz-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // as Krakow 4 days
    flight_out_cost: 110,
    blocks: [
      { code: 'PL', local: 7, extras: [   // bus Krakow-Oswiecim ~€3.5 each way (est)
        rbExtra('Auschwitz-Birkenau English guided tour 3.5h (notes: ~150 PLN ≈ €35)', 35, 'tour'),
      ] },
    ],
  },

  'gt_seed_krakow-tatra-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,
    flight_out_cost: 110,
    blocks: [
      { code: 'PL', local: 15, extras: [   // Krakow-Zakopane bus €4.50 x2 (from Slovakia-Poland notes) + Zakopane-Morskie Oko minibus ~€3 x2 (est)
        rbExtra('Tatra National Park entry, 1 day (notes: 9-10 PLN/day ≈ €2)', 2, 'park_fee'),
      ] },
    ],
  },

  'gt_seed_poland-slovakia-hungary-10-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Krakow
    flight_out_cost: 100,  // Budapest-AMS one way (Expedia USD 83-103, Kayak GBP 93; est)
    blocks: [
      { code: 'PL', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 7 days (Krakow after the city days, drop Budapest) × €33 + one-way cross-border drop ≈€150 (est, flagged) + fuel ≈840 km + vignettes SK €8.10 + HU €15.10 + PL tolls ≈€5', 514, 'transport'),
      ] },
      { code: 'SK', transport: 0, local: 0, extras: [] },
      { code: 'HU', local: 0, extras: [] },
    ],
  },

  'gt_seed_poland-roadtrip-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Krakow
    flight_out_cost: 100,  // Warsaw-AMS
    blocks: [
      { code: 'PL', local: 0, extras: [] },   // carInDailyRate true (€585 = €65/day incl. rental car): nothing added for the car
    ],
  },

  'gt_seed_poland-north-to-south-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Gdansk one way (Ryanair/Wizz/KLM-LOT; est, no search)
    flight_out_cost: 110,  // Krakow-AMS
    blocks: [
      { code: 'PL', local: 75, extras: [] },   // by train, not car (notes: "train is a good alternative"): Gdansk-Warsaw ~€25, Warsaw-Wroclaw ~€20, Wroclaw-Krakow ~€15, Malbork/Hel day trips ~€15 (est)
    ],
  },

  'gt_seed_prague-poland-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,   // AMS-Prague one way (easyJet EUR 74 floor, Skyscanner 97, Trip.com avg 105)
    flight_out_cost: 110,  // Krakow-AMS
    blocks: [
      { code: 'CZ', transport: 20, local: 0, extras: [] },  // Prague-Wroclaw train/bus (RegioJet/FlixBus ~€15-25, est)
      { code: 'PL', local: 15, extras: [] },                // Wroclaw-Krakow train ~€15 (est)
    ],
  },

  'gt_seed_slovakia-poland-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Bratislava one way, connecting (Kayak USD 158 cheapest, typical 125-215; est)
    flight_out_cost: 110,  // Krakow-AMS
    blocks: [
      { code: 'SK', transport: 12, local: 20, extras: [] },  // Tatras -> Zakopane bus ~€12 (est); local: train Bratislava-Poprad ~€17 + Tatra tram/rack rail ~€3 (est)
      { code: 'PL', local: 10, extras: [] },                 // Zakopane-Krakow bus €4.50 (notes) + Morskie Oko/local hops (est)
    ],
  },

  'gt_seed_south-poland-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Krakow
    flight_out_cost: 120,  // Wroclaw-AMS (route ends at optional Wroclaw; est)
    blocks: [
      { code: 'PL', local: 33, extras: [   // Wieliczka bus 2, Auschwitz bus 7, Zakopane bus 9 return, Krakow-Wroclaw train 15 (est)
        rbExtra('Wieliczka Salt Mine tourist route (notes: 134-156 PLN ≈ €31-36, midpoint)', 34, 'activity'),
      ] },
    ],
  },

  'gt_seed_bucharest-transylvania-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Bucharest one way (Tarom USD 144, Lufthansa USD 191, Expedia USD 160, Kayak EUR 113; typical)
    flight_out_cost: 120,
    blocks: [
      { code: 'RO', local: 30, extras: [   // train Bucharest-Brasov ~€11 x2 (est) + bus Brasov-Bran / train Sinaia ~€8 (est); no car (notes: train/bus OR car)
        rbExtra('Bran Castle ticket (notes: ~€28-35, midpoint)', 32, 'activity'),
        rbExtra('Peles Castle ticket (notes: ~€10)', 10, 'activity'),
      ] },
    ],
  },

  'gt_seed_moldova-romania-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Chisinau
    flight_out_cost: 120,  // Bucharest-AMS
    blocks: [
      { code: 'MD', transport: 15, local: 6, extras: [      // bus Chisinau-Iasi ~€15 (est); marshrutka to Orheiul Vechi return (est)
        rbExtra('Orheiul Vechi entry (notes: 20 MDL)', 1, 'activity'),
      ] },
      { code: 'RO', local: 40, extras: [] },  // trains Iasi-Sighisoara ~€20, Sighisoara-Brasov ~€6, Brasov-Bucharest ~€11 (est)
    ],
  },

  'gt_seed_romania-bulgaria-transylvania-focus-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Bucharest
    flight_out_cost: 130,  // Sofia-AMS one way (Expedia USD 95-115, Skyscanner floor 59, mostly connecting; est)
    blocks: [
      { code: 'RO', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 10 days (Bucharest days excluded) × €33 + one-way drop Bucharest->Sofia ≈€150 (est, flagged) + green card ≈€60 (notes) + fuel ≈1180 km + vignettes RO €4.11 + BG €5.30', 692, 'transport'),
      ] },
      { code: 'BG', local: 0, extras: [] },
    ],
  },

  'gt_seed_romania-moldova-extended-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Bucharest
    flight_out_cost: 120,  // Chisinau-AMS
    blocks: [
      { code: 'RO', transport: 15, local: 60, extras: [] },   // bus Iasi-Chisinau ~€15 (est); trains Bucharest-Brasov 11, Brasov-Sighisoara 9, Sighisoara-Sibiu 8, Sibiu-Iasi long train/bus ~€30 (est)
      { code: 'MD', local: 6, extras: [
        rbExtra('Orheiul Vechi entry (notes: 20 MDL)', 1, 'activity'),
      ] },
    ],
  },

  'gt_seed_romania-roadtrip-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,
    flight_out_cost: 120,
    blocks: [
      { code: 'RO', local: 0, extras: [] },   // carInDailyRate true (€765 = €85/day incl. rental + fuel): nothing added for the car
    ],
  },

  'gt_seed_romania-extended-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,
    flight_out_cost: 120,
    blocks: [
      { code: 'RO', local: 0, extras: [
        rbExtra('Car: rental 10 days (Bucharest days excluded; notes recommend a car for Maramures) × €33 + fuel ≈1350 km + Rovinieta €4.11', 513, 'transport'),
      ] },
    ],
  },

  'gt_seed_transylvania-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,
    flight_out_cost: 120,
    blocks: [
      { code: 'RO', local: 53, extras: [] },   // trains/buses Bucharest-Brasov 11, Bran/Peles day trip 10, Brasov-Sighisoara 9, Sighisoara-Sibiu 8, Sibiu-Bucharest bus 15 (est); no car (notes)
    ],
  },

  'gt_seed_transylvania-carpathian-mountains-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,
    flight_out_cost: 120,
    blocks: [
      { code: 'RO', local: 65, extras: [] },   // as Transylvania 6 days (53) + bus to Zarnesti/Bucegi trailheads ~€12 (est); no car: Transfagarasan only optional/"useful" (notes)
    ],
  },

  'gt_seed_bratislava-high-tatras-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Bratislava connecting (Kayak USD 158 cheapest, typical USD 125-215; est)
    flight_out_cost: 130,  // Bratislava-AMS (est)
    blocks: [
      { code: 'SK', local: 40, extras: [   // train Bratislava-Poprad ~€17 each way + Tatra tram/rack rail ~€6 (est)
        rbExtra('Lomnicky stit cable car (notes: ~€89, optional)', 89, 'activity', true),
      ] },
    ],
  },

  'gt_seed_slovakia-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,
    flight_out_cost: 130,   // loop back to Bratislava (no AMS flights from Kosice assumed)
    blocks: [
      { code: 'SK', local: 55, extras: [] },  // Bratislava-Banska Stiavnica ~€12, ->Poprad ~€14, ->Kosice ~€10, Kosice-Bratislava ~€20 (est); no car (train/rental both named; train picked)
    ],
  },
