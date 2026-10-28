// ---- Phase 4 batch 9: Alps & Germany 1/2, extracted 2026-10-28, approved by Youri (planning/budget_batch9/REVIEW.md) ----
// Fares: flights_from_ams.csv (INN) + flights_batch9.csv (ZRH). Car: data/cost_reference/car_costs_by_country.csv (7 L/100 km).
// Own-car drive NL<->route = fuel (km x 0.07 x price per country, DE 2.179 / AT 1.817 / CH 2.33 / SI 1.751 / LI 2.10) + section tolls on the way. Vignettes are counted once in the in-route "Car:" extra.
// CHF -> EUR x1.082 (CH vignette CHF40 = EUR43.28).

  'gt_seed_austria-slovenia-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 144,   // own car NL->Salzburg ~960 km: DE ~850 km x0.07x2.179 = 130 + AT ~110 km x0.07x1.817 = 14 (est split)
    flight_out_cost: 210,  // own car Bled->NL ~1240 km: SI 60 + AT 380 + DE 800 km fuel = 178; Karawanken 9 + Tauern 15 + Katschberg 7.50 tolls
    blocks: [
      { code: 'AT', transport: 0, local: 0, extras: [
        rbExtra('Car: fuel ≈350 km (AT 220, SI 120) = 43 + tolls: A10 Tauern 15 + Katschberg 7.50, Karawanken 9, AT 10-day vignette 12.80, SI e-vignette 16 (own car)', 103, 'transport'),
      ] },
      { code: 'SI', local: 0, extras: [] },
    ],
  },

  'gt_seed_austria-alpine-roadtrip-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 125,   // own car NL->Vorarlberg ~830 km: DE ~780 x0.07x2.179 = 119 + AT ~50 km = 6 (est split)
    flight_out_cost: 144,  // own car Salzburg->NL ~960 km: DE ~880 = 134 + AT ~80 = 10
    blocks: [
      { code: 'AT', transport: 0, local: 0, extras: [
        rbExtra('Car: fuel ≈480 km AT = 61 + Arlberg tunnel 13 + AT 10-day vignette 12.80 (own car)', 87, 'transport'),
      ] },
      { code: 'AT', transport: 0, local: 0, extras: [] },
      { code: 'AT', transport: 0, local: 0, extras: [
        rbExtra('Grossglockner High Alpine Road toll, car day ticket (route notes €46.50)', 46.5, 'park_fee'),
      ] },
      { code: 'AT', local: 0, extras: [] },
    ],
  },

  'gt_seed_austrian-alps-zell-am-see-kaprun-pinzgau-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 149,   // own car NL->Zell am See ~990 km: DE ~900 x0.07x2.179 = 137 + AT ~90 km = 11
    flight_out_cost: 149,  // same back
    blocks: [
      { code: 'AT', local: 0, extras: [
        rbExtra('Car: fuel ≈20 km AT = 2.50 + AT 10-day vignette 12.80 (own car)', 15, 'transport'),
        rbExtra('Kitzsteinhorn cable car return (route notes ~€50-55, midpoint)', 52.5, 'activity'),
      ] },
    ],
  },

  'gt_seed_liechtenstein-austria-switzerland-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Zurich one way (KLM/Swiss direct; WebSearch 2026-10-28: floors $103-141, nonstop typical higher; est)
    flight_out_cost: 100,  // Innsbruck-AMS one way (flights_from_ams.csv, Transavia seasonal)
    blocks: [
      { code: 'LI', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 5 days (Zurich pickup -> Innsbruck drop) × €70 = 350 + one-way cross-border drop ≈€120 (est) + fuel ≈370 km (Zurich-Vaduz ~120 CH, LI 20, AT 230) = 52 + CH vignette 43.28 + AT 10-day vignette 12.80 + Arlberg tunnel 13', 591, 'transport'),
      ] },
      { code: 'AT', local: 0, extras: [] },
    ],
  },

  'gt_seed_salzburg-berchtesgaden-hallstatt-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 144,   // own car NL->Salzburg ~960 km: DE ~850 = 130 + AT ~110 = 14
    flight_out_cost: 155,  // own car Hallstatt->NL ~1030 km: AT ~100 + DE ~930 km fuel
    blocks: [
      { code: 'AT', transport: 0, local: 0, extras: [
        rbExtra('Car: fuel ≈100 km (AT 60, DE 40) = 14 + AT 10-day vignette 12.80 (own car)', 27, 'transport'),
      ] },
      { code: 'DE', transport: 0, local: 0, extras: [
        rbExtra('Königssee boat to St. Bartholomä, return (route notes €16.90; the round trip is the only way, so not halved)', 16.9, 'tour'),
      ] },
      { code: 'AT', local: 0, extras: [
        rbExtra('Hallstatt Skywalk / salt mine cable car (route notes ~€29)', 29, 'activity'),
      ] },
    ],
  },

  'gt_seed_salzburg-grossglockner-tyrol-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 144,   // own car NL->Salzburg ~960 km: DE ~850 = 130 + AT ~110 = 14
    flight_out_cost: 137,  // own car Innsbruck->NL ~910 km: DE ~850 = 130 + AT ~60 = 8
    blocks: [
      { code: 'AT', transport: 0, local: 0, extras: [
        rbExtra('Car: fuel ≈290 km AT = 37 + Felbertauern toll 13.50 + AT 10-day vignette 12.80 (own car)', 63, 'transport'),
        rbExtra('Grossglockner High Alpine Road toll, car day ticket (route notes €46.50)', 46.5, 'park_fee'),
      ] },
      { code: 'AT', local: 0, extras: [] },
    ],
  },

  'gt_seed_salzburg-surroundings-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 144,   // own car NL->Salzburg ~960 km: DE ~850 = 130 + AT ~110 = 14
    flight_out_cost: 145,  // own car Salzburg->NL ~970 km: DE ~880 = 134 + AT ~90 = 11
    blocks: [
      { code: 'AT', local: 0, extras: [
        rbExtra('Car: fuel ≈140 km AT = 18 + AT 10-day vignette 12.80 (own car)', 31, 'transport'),
      ] },
    ],
  },

  'gt_seed_tyrol-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 137,   // own car NL->Innsbruck ~910 km: DE ~850 = 130 + AT ~60 = 8
    flight_out_cost: 143,  // own car Innsbruck->NL ~950 km: DE ~880 = 134 + AT ~70 = 9
    blocks: [
      { code: 'AT', local: 0, extras: [
        rbExtra('Car: fuel ≈120 km AT = 15 + AT 10-day vignette 12.80 (own car)', 28, 'transport'),
        rbExtra('Zillertal / Olperer suspension bridge cable car (notes: €15-30 each, midpoint)', 22.5, 'activity'),
        rbExtra('Achensee boat trip (notes: €15-30 each, midpoint)', 22.5, 'activity'),
      ] },
    ],
  },

  'gt_seed_interlaken-lauterbrunnen-grindelwald-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 127,   // own car NL->Interlaken ~820 km: DE ~620 x0.07x2.179 = 95 + CH ~200 km x0.07x2.33 = 33 (est split)
    flight_out_cost: 128,  // same back, ~830 km
    blocks: [
      { code: 'CH', transport: 0, local: 0, extras: [
        rbExtra('Car: fuel ≈50 km CH = 8 + CH vignette CHF40 = 43.28 (own car)', 51, 'transport'),
      ] },
      { code: 'CH', transport: 0, local: 0, extras: [] },
      { code: 'CH', local: 0, extras: [
        rbExtra('Jungfraujoch return Interlaken-Jungfraujoch CHF261.20 + CHF10 seat reservation = €293 (notes call it skippable; return fare, no one-way price)', 293, 'tour', true),
      ] },
    ],
  },

  'gt_seed_liechtenstein-swiss-alps-3-days': {
    checked: '2026-10-28',
    flight_in_cost: 128,   // own car NL->Vaduz ~830 km: DE ~720 = 110 + CH ~110 = 18
    flight_out_cost: 123,  // own car ~800 km: DE ~750 = 114 + CH ~50 = 8
    blocks: [
      { code: 'LI', transport: 0, local: 0, extras: [
        rbExtra('Car: fuel ≈70 km CH = 11 + CH vignette CHF40 = 43.28 (own car)', 55, 'transport'),
      ] },
      { code: 'CH', local: 0, extras: [] },
    ],
  },

  'gt_seed_swiss-alps-zermatt-matterhorn-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 141,   // own car NL->Taesch ~910 km: DE ~690 = 105 + CH ~220 = 36 (est split)
    flight_out_cost: 140,  // ~900 km back
    blocks: [
      { code: 'CH', local: 0, extras: [
        rbExtra('Car: fuel ≈50 km CH = 8 + CH vignette CHF40 = 43.28 (own car)', 51, 'transport'),
        rbExtra('Täsch parking 6 days × CHF15 (notes CHF13.50-16.50/day, midpoint) × 1.082', 97, 'other'),
        rbExtra('Gornergrat cogwheel railway return (notes CHF80-96, midpoint CHF88; notes say pick one of Gornergrat / Glacier Paradise)', 95, 'activity'),
      ] },
    ],
  },

  'gt_seed_switzerland-northern-italy-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 133,   // own car NL->Chur ~860 km: DE ~680 = 104 + CH ~180 = 29 (est split)
    flight_out_cost: 147,  // own car Ticino->NL ~950 km: CH ~160 = 26 + DE ~790 = 121
    blocks: [
      { code: 'CH', transport: 36, local: 0, extras: [   // regional train St. Moritz-Tirano ~CHF33 (est; the notes name no price)
        rbExtra('Car: fuel ≈270 km (CH 90, IT 180) = 40 + Italian autostrada tolls 60% × 180 km × €8/100 km = 9 + CH vignette CHF40 = 43.28 (own car)', 92, 'transport'),
      ] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'CH', local: 0, extras: [] },
    ],
  },

  'gt_seed_switzerland-alpine-roadtrip-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 116,   // own car NL->Zurich ~750 km: DE ~630 = 96 + CH ~120 = 20 (est split)
    flight_out_cost: 133,  // own car Chur->NL ~860 km: CH ~150 = 25 + DE ~710 = 108
    blocks: [
      { code: 'CH', transport: 0, local: 0, extras: [
        rbExtra('Car: fuel ≈520 km CH = 85 + CH vignette CHF40 = 43.28 (own car)', 128, 'transport'),
      ] },
      { code: 'CH', transport: 0, local: 0, extras: [] },
      { code: 'CH', transport: 0, local: 0, extras: [] },
      { code: 'CH', transport: 0, local: 0, extras: [] },
      { code: 'CH', transport: 0, local: 0, extras: [] },
      { code: 'CH', local: 0, extras: [] },
    ],
  },
