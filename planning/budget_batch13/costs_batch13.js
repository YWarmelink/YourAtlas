// ---- Phase 4 batch 13: Adriatic & Western Balkans 3/3, extracted 2026-10-28, approved by Youri (planning/budget_batch13/REVIEW.md) ----
// Fares: flights_from_ams.csv + flights_batch13.csv. Car: data/cost_reference/car_costs_by_country.csv (7 L/100 km).

  'gt_seed_serbia-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Belgrade (flights_from_ams.csv BEG out)
    flight_out_cost: 130,  // Belgrade-AMS (flights_from_ams.csv BEG back)
    blocks: [
      { code: 'RS', local: 35, extras: [] },  // public transport (no car in text): Belgrade-Novi Sad train ~5, Novi Sad-Zlatibor bus ~14, Zlatibor/Mokra Gora hop ~3, Zlatibor-Belgrade bus ~11, airport bus ~2 (est)
    ],
  },

  'gt_seed_serbia-bosnia-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Belgrade (flights_from_ams.csv)
    flight_out_cost: 220,  // Sarajevo-AMS (flights_from_ams.csv SJJ back)
    blocks: [
      { code: 'RS', transport: 30, local: 16, extras: [   // transport: rafting operator transfer Tara-Sarajevo (est); local: Belgrade-Zlatibor bus ~11 + Zlatibor-Perucac ~5 (est)
        rbExtra('Tara/Drina rafting, 1 day (notes: ~€60/day; stop is 2 days, only one rafting day assumed)', 60, 'tour'),
      ] },
      { code: 'BA', local: 10, extras: [] },        // Sarajevo-Mostar train/bus ~8, Mostar-Blagaj ~2 (est)
    ],
  },

  'gt_seed_serbia-roadtrip-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Belgrade (flights_from_ams.csv)
    flight_out_cost: 130,  // Belgrade-AMS (flights_from_ams.csv)
    blocks: [
      { code: 'RS', local: 0, extras: [
        rbExtra('Car: rental 7 days (from Belgrade after the city days) × €35 + fuel ≈600 km + tolls (60% of km × €4/100 km)', 334, 'transport'),
      ] },
    ],
  },

  'gt_seed_germany-austria-slovenia-10-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 127,   // own car NL-Munich ≈830 km × 0.07 × €2.179 (DE, no tolls)
    flight_out_cost: 220,  // own car Slovenia-NL ≈1240 km: fuel ≈179 (SI 100/AT 300/DE 840 km) + Karawanken 9 + Tauern/Katschberg 22.5 + AT 1-day vignette 9.60 (est)
    blocks: [
      { code: 'DE', transport: 0, local: 0, extras: [
        rbExtra('Car: own car fuel ≈720 km (AT 370, SI 340) + A10 Tauern/Katschberg 22.5 + Karawanken 9 + AT 10-day vignette 12.80 + SI e-vignette 16', 149, 'transport'),
      ] },
      { code: 'AT', transport: 0, local: 0, extras: [] },
      { code: 'AT', transport: 0, local: 0, extras: [] },
      { code: 'SI', transport: 0, local: 0, extras: [] },
      { code: 'SI', local: 0, extras: [] },
    ],
  },

  'gt_seed_hungary-austria-slovenia-7-10-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Budapest (flights_batch13.csv, WebSearch 2026-10-28)
    flight_out_cost: 120,  // Ljubljana-AMS (flights_from_ams.csv LJU back)
    blocks: [
      { code: 'HU', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 7 days (from Budapest after 2 city days) × €35 + one-way cross-border drop Ljubljana ≈€100 (est) + fuel ≈630 km (notes 250 + 380) + HU vignette 15.10 + AT 12.80 + SI 16', 468, 'transport'),
      ] },
      { code: 'AT', transport: 0, local: 0, extras: [] },
      { code: 'SI', local: 0, extras: [] },
    ],
  },

  'gt_seed_julian-alps-soca-valley-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Ljubljana (flights_from_ams.csv)
    flight_out_cost: 120,  // Ljubljana-AMS (flights_from_ams.csv)
    blocks: [
      { code: 'SI', local: 0, extras: [
        rbExtra('Car: rental 6 days × €45 + fuel ≈250 km (60 in route + airport legs, est) + SI e-vignette 16', 317, 'transport'),
        rbExtra('Vogel cable car (notes: €20-25 return, midpoint)', 22.5, 'activity'),
        rbExtra('Rafting/canyoning, 1 activity (notes: €50-80 per activity, midpoint)', 65, 'activity'),
      ] },
    ],
  },

  'gt_seed_ljubljana-lake-bled-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Ljubljana (flights_from_ams.csv)
    flight_out_cost: 120,  // Ljubljana-AMS (flights_from_ams.csv)
    blocks: [
      { code: 'SI', local: 16, extras: [   // public transport (no car in text): Ljubljana-Bled bus ~8 + airport bus ~4 each way (est)
        rbExtra('Pletna boat to Bled island (notes: €20 return, cash)', 20, 'activity'),
        rbExtra('Bled Castle (notes: €19)', 19, 'activity'),
        rbExtra('Vintgar Gorge (notes: €15)', 15, 'park_fee'),
      ] },
    ],
  },

  'gt_seed_slovenia-croatia-bosnia-10-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Ljubljana (flights_from_ams.csv)
    flight_out_cost: 110,  // Dubrovnik-AMS (flights_from_ams.csv DBV back)
    blocks: [
      { code: 'SI', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 10 days (from Ljubljana after the city days) × €45 + one-way drop Dubrovnik and Bosnia cross-border fee ≈€170 (est) + fuel ≈1160 km (860 + Sarajevo-Dubrovnik ≈300) + tolls (SI vignette 16; 60% of HR km × €7.5/100; 60% of BA km × €4/100)', 821, 'transport'),
      ] },
      { code: 'HR', transport: 0, local: 0, extras: [] },
      { code: 'BA', local: 0, extras: [] },
    ],
  },

  'gt_seed_slovenia-italy-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Ljubljana (flights_from_ams.csv)
    flight_out_cost: 80,   // Venice-AMS (flights_from_ams.csv VCE back)
    blocks: [
      { code: 'SI', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 7 days (from Ljubljana after 2 city days) × €45 + one-way drop Venice ≈€80 (est) + fuel ≈500 km + tolls (SI vignette 16; 60% of IT km × €8/100)', 493, 'transport'),
      ] },
      { code: 'IT', local: 0, extras: [] },
    ],
  },

  'gt_seed_slovenia-northern-croatia-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Ljubljana (flights_from_ams.csv)
    flight_out_cost: 140,  // Zagreb-AMS (flights_from_ams.csv ZAG back)
    blocks: [
      { code: 'SI', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 7 days (from Ljubljana after 2 city days) × €45 + one-way drop Zagreb ≈€80 (est) + fuel ≈410 km + tolls (SI vignette 16; 60% of HR km × €7.5/100)', 478, 'transport'),
      ] },
      { code: 'HR', local: 0, extras: [] },
    ],
  },

  'gt_seed_slovenia-alpine-loop-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Ljubljana (flights_from_ams.csv)
    flight_out_cost: 120,  // Ljubljana-AMS (flights_from_ams.csv)
    blocks: [
      { code: 'SI', local: 0, extras: [
        rbExtra('Car: rental 5 days (after the Ljubljana day) × €45 + fuel ≈300 km (loop + airport legs, est) + SI e-vignette 16', 278, 'transport'),
        rbExtra('Rafting/canyoning, 1 activity (notes: €50-80 per activity, midpoint)', 65, 'activity'),
      ] },
    ],
  },

  'gt_seed_slovenia-roadtrip-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Ljubljana (flights_from_ams.csv)
    flight_out_cost: 120,  // Ljubljana-AMS (flights_from_ams.csv)
    blocks: [
      { code: 'SI', local: 0, extras: [
        rbExtra('Car: rental 7 days (after 2 city days) × €45 + fuel ≈450 km (loop incl. coast, est) + SI e-vignette 16', 386, 'transport'),
      ] },
    ],
  },

  'gt_seed_kosovo-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Pristina (flights_from_ams.csv)
    flight_out_cost: 110,  // Pristina-AMS (flights_from_ams.csv)
    blocks: [
      { code: 'XK', local: 22, extras: [] },  // public transport (no car in text): Pristina-Prizren bus ~4.5, Prizren-Peja ~8, Peja-Pristina ~5, airport bus ~3 (est); notes name no tour prices
    ],
  },

  'gt_seed_kosovo-albania-north-macedonia-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Pristina (flights_from_ams.csv)
    flight_out_cost: 130,  // Skopje-AMS (flights_from_ams.csv SKP back)
    blocks: [
      { code: 'XK', transport: 8, local: 17, extras: [] },   // Prizren-Kukes minibus ~8 (est); Pristina-Peja 4.5, Peja-Prizren 8, airport bus 3 (est)
      { code: 'AL', transport: 16, local: 23, extras: [] },  // Tirana-Ohrid bus ~16 (est); Kukes-Shkoder ~10, Shkoder-Tirana ~5, Tirana-Berat ~6, return/airport ~2 (est)
      { code: 'MK', local: 14, extras: [] },                 // Ohrid-Skopje bus ~9 + Skopje airport shuttle ~5 (est)
    ],
  },

  'gt_seed_kosovo-montenegro-albania-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Pristina (flights_from_ams.csv)
    flight_out_cost: 100,  // Tirana-AMS (flights_from_ams.csv TIA back)
    blocks: [
      { code: 'XK', transport: 35, local: 13, extras: [] },  // Peja-Plav/Gusinje-Zabljak shared taxi/minibus chain (est, low confidence); Prizren-Peja ~8 + airport bus ~5 (est)
      { code: 'ME', transport: 18, local: 0, extras: [] },   // Zabljak-Podgorica bus ~10 + Podgorica-Shkoder ~8 (est)
      { code: 'AL', local: 8, extras: [] },                  // Shkoder-Tirana ~5 + airport bus ~3 (est)
    ],
  },

  'gt_seed_kosovo-north-macedonia-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Pristina (flights_from_ams.csv)
    flight_out_cost: 130,  // Skopje-AMS (flights_from_ams.csv)
    blocks: [
      { code: 'XK', transport: 8, local: 8, extras: [] },  // Prizren-Skopje bus ~8; Pristina-Prizren ~4.5 + airport bus ~3 (est)
      { code: 'MK', local: 22, extras: [] },               // Skopje-Ohrid-Skopje bus 2 × ~9 + airport shuttle ~4 (est)
    ],
  },

  'gt_seed_kosovo-north-macedonia-albania-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Pristina (flights_from_ams.csv)
    flight_out_cost: 100,  // Tirana-AMS (flights_from_ams.csv)
    blocks: [
      { code: 'XK', transport: 8, local: 8, extras: [] },   // Pristina/Prizren-Skopje bus ~8; Pristina-Prizren ~4.5 + airport bus ~3 (est)
      { code: 'MK', transport: 16, local: 9, extras: [] },  // Ohrid-Tirana bus ~16; Skopje-Ohrid bus ~9 (est)
      { code: 'AL', local: 3, extras: [] },                 // Tirana airport bus (est)
    ],
  },
