// ---- Phase 4 batch 18: Nordics (2/2), extracted 2026-10-28, approved by Youri (planning/budget_batch18/REVIEW.md) ----
// NOT yet in RB_ROUTE_COSTS: waiting for Youri's review. NOK ~11.7/EUR. Fares: flights_from_ams.csv + flights_batch18.csv.
// Car: data/cost_reference/car_costs_by_country.csv (7 L/100 km). Visas: none (Schengen; Svalbard visa-free).

  'gt_seed_norway-sweden-fjords-capitals-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 150,   // AMS-Oslo one way (Kayak 132-154, airBaltic from 177; WebSearch 2026-10-28)
    flight_out_cost: 110,  // Stockholm-AMS one way (Expedia from 108, KLM/Norwegian; est)
    blocks: [
      // transport: Flam/Myrdal-Oslo train ~50 (est) + Oslo-Gothenburg train/bus ~45 (est, advance).
      // local: Oslo-Bergen train ~60 (advance fare, est) + Bergen-Voss-Gudvangen-Flam bus/Naeroyfjord boat ~80 (est)
      { code: 'NO', transport: 95, local: 140, extras: [
        rbExtra('Flam Railway Flam-Myrdal one way (notes: 510 NOK high season)', 44, 'transport'),
      ] },
      { code: 'SE', local: 35, extras: [] },                       // Gothenburg-Stockholm train ~35 (SJ advance, est)
    ],
  },

  'gt_seed_norway-roadtrip-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 150,   // AMS-Oslo (as above)
    flight_out_cost: 130,  // Oslo-AMS one way (airBaltic from 117, typical higher; est)
    blocks: [
      { code: 'NO', local: 0, extras: [
        rbExtra('Car: rental 12 days × €75 (whole trip per notes) + fuel ≈1370 km + AutoPASS tolls & fjord ferries ≈€180 (est; Geiranger-Hellesylt etc)', 1348, 'transport'),
      ] },
    ],
  },

  'gt_seed_oslo-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 150,   // AMS-Oslo (as above)
    flight_out_cost: 130,  // Oslo-AMS (as above)
    blocks: [
      { code: 'NO', local: 0, extras: [] },                        // notes: no car needed, city + day trip by ferry/train (in the ground budget)
    ],
  },

  'gt_seed_scandinavia-overland': {
    checked: '2026-10-28',
    flight_in_cost: 150,   // AMS-Helsinki one way (flights_from_ams.csv HEL)
    flight_out_cost: 160,  // Tromso-AMS one way (Expedia floors USD 50-65, ratepunk median ~USD 188; typical est)
    blocks: [
      // transport: Rovaniemi-Kiruna bus/train via Tornio-Haparanda-Boden (8-9.5h, est)
      // local: Helsinki-Rovaniemi train ~45 + Rovaniemi-Inari bus ~45 + Inari-Rovaniemi bus ~45 (VR/Lapin Linjat, est)
      { code: 'FI', transport: 70, local: 135, extras: [] },
      { code: 'SE', transport: 35, local: 0, extras: [] },         // Kiruna-Narvik train (est ~SEK 400)
      // Narvik-Svolvaer bus 35 + Svolvaer-Senja bus/ferry 70 + Senja-Tromso bus 30 + Tromso-Alta-Nordkapp bus 130 (55+75) + Honningsvag-Tromso flight (Wideroe) 150 (all est)
      { code: 'NO', local: 415, extras: [] },
    ],
  },

  'gt_seed_south-central-norway-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 150,   // AMS-Oslo (as above)
    flight_out_cost: 130,  // Oslo-AMS (as above)
    blocks: [
      { code: 'NO', local: 0, extras: [
        rbExtra('Car: rental 12 days × €75 (Oslo days without car) + fuel ≈1470 km (input estimate; real loop likely longer) + AutoPASS tolls & ferries ≈€200 (est)', 1387, 'transport'),
      ] },
    ],
  },

  'gt_seed_south-norway-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 150,   // AMS-Oslo (as above)
    flight_out_cost: 130,  // Oslo-AMS (as above)
    blocks: [
      { code: 'NO', local: 0, extras: [] },                        // carInDailyRate true: no car added
    ],
  },

  'gt_seed_svalbard-longyearbyen-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 290,   // AMS-Oslo ~150 + Oslo-Longyearbyen ~140 (Expedia from USD 78-133, SAS from USD 159; est, low confidence)
    flight_out_cost: 290,  // Longyearbyen-Oslo-AMS (mirror; est)
    blocks: [
      { code: 'NO', local: 0, extras: [
        rbExtra('Longyearbyen day tours: 2 × 2250 NOK (notes: 1500-3000 NOK/day, 2024-25 level; ground budget is only ~€110/day)', 385, 'tour'),
      ] },
    ],
  },

  'gt_seed_denmark-sweden-norway-overland-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 90,    // AMS-Copenhagen one way (Expedia/Momondo USD 82-98; easyJet/Norwegian; est)
    flight_out_cost: 130,  // Oslo-AMS (as above)
    blocks: [
      { code: 'DK', transport: 12, local: 0, extras: [] },        // Copenhagen-Malmo train over the Oresund (~DKK 90, est)
      { code: 'SE', transport: 40, local: 35, extras: [] },       // transport Gothenburg-Oslo train/bus ~40 (est); local Malmo-Gothenburg train ~35 (advance, est)
      { code: 'NO', local: 0, extras: [] },
    ],
  },

  'gt_seed_northern-europe-baltic-ferry-roadtrip-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 90,    // AMS-Copenhagen (as above)
    flight_out_cost: 150,  // Vilnius-AMS one way (airBaltic direct; sources USD 95-230, median ~USD 206; est)
    blocks: [
      { code: 'DK', transport: 50, local: 0, extras: [] },        // Copenhagen-Malmo-Stockholm trains (~SEK 450-600 advance, est)
      { code: 'SE', transport: 80, local: 0, extras: [] },        // overnight ferry Stockholm-Helsinki, 2-berth cabin per person (Viking/Tallink, est)
      { code: 'FI', transport: 30, local: 0, extras: [] },        // Helsinki-Tallinn ferry (est ~25-40)
      { code: 'EE', transport: 15, local: 0, extras: [] },        // Lux Express Tallinn-Riga (est 10-20)
      { code: 'LV', transport: 12, local: 0, extras: [] },        // Lux Express Riga-Vilnius (est)
      { code: 'LT', local: 0, extras: [] },
    ],
  },

  'gt_seed_south-sweden-skane-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 103,   // AMS-Copenhagen ~90 + Kastrup-Malmo train ~13 (no real AMS-Malmo flights; est)
    flight_out_cost: 103,  // mirror
    blocks: [
      // local: Malmo-Lund-Malmo train (Skanetrafiken, est)
      { code: 'SE', local: 10, extras: [
        rbExtra('Car: rental 6 days × €55 (Malmo + Lund days without car) + fuel ≈300 km (own estimate, input says 180) at 1.64 €/l; no tolls', 364, 'transport'),
      ] },
    ],
  },

  'gt_seed_stockholm-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Stockholm (Expedia from 108, Skyscanner 57 floor, KLM higher; est typical)
    flight_out_cost: 110,
    blocks: [
      { code: 'SE', local: 0, extras: [] },
    ],
  },

  'gt_seed_stockholm-surroundings-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Stockholm (as above)
    flight_out_cost: 110,
    blocks: [
      // local: Uppsala return train ~22 + Sigtuna commuter train/bus ~8 (SJ/SL, est)
      { code: 'SE', local: 30, extras: [
        rbExtra('Stockholm archipelago boat day (Vaxholm) (notes: €30-50 on archipelago-boat days)', 40, 'activity'),
      ] },
    ],
  },

  'gt_seed_sweden-norway-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Stockholm (as above)
    flight_out_cost: 250,  // Evenes (Narvik/Harstad)-Oslo-AMS one way (est, low confidence; no usable fare found)
    blocks: [
      // local: Stockholm-Kiruna night train ~85 (SJ advance, est)
      { code: 'SE', transport: 0, local: 85, extras: [
        rbExtra('Car: from Kiruna, rental 7 days × €65 (SE 55/NO 75 avg) + cross-border one-way drop at Evenes ≈€150 (est) + fuel ≈780 km (Kiruna-Abisko-Narvik-Lofoten-Evenes) + AutoPASS ≈€25', 750, 'transport'),
      ] },
      { code: 'NO', local: 0, extras: [] },
    ],
  },

  'gt_seed_sweden-roadtrip-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Stockholm (as above)
    flight_out_cost: 110,
    blocks: [
      { code: 'SE', local: 0, extras: [] },                        // carInDailyRate true: no car added
    ],
  },

  'gt_seed_swedish-lapland-kiruna-abisko-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 200,   // AMS-Kiruna one way via Stockholm (SAS GBP 141-162 / USD 188-224; WebSearch 2026-10-28)
    flight_out_cost: 200,  // Kiruna-AMS (mirror)
    blocks: [
      { code: 'SE', local: 24, extras: [] },                       // Kiruna-Abisko-Kiruna train/bus 2 x ~12 (est)
    ],
  },

  'gt_seed_swedish-lapland-northern-lights-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 200,   // AMS-Kiruna (as above)
    flight_out_cost: 200,
    blocks: [
      // local: Kiruna-Abisko-Kiruna train/bus 2 x ~12 (est)
      { code: 'SE', local: 24, extras: [
        rbExtra('Dog sledding / snowmobile excursion #1 (notes: €150-250 each, midpoint)', 200, 'tour'),
        rbExtra('Excursion #2 (snowmobile or dog sledding; notes: €150-250 each, midpoint)', 200, 'tour'),
      ] },
    ],
  },
