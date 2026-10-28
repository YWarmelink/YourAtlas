// ---- Phase 4 batch 7: France & Benelux 1/2, extracted 2026-10-28, approved by Youri (planning/budget_batch7/REVIEW.md) ----
// Fares: flights_from_ams.csv + flights_batch7.csv. Car: data/cost_reference/car_costs_by_country.csv (7 L/100 km).
// Own-car drives NL<->route are in flight_in_cost/flight_out_cost = fuel (km x 0.07 x ~EUR 2.2/l blended NL/BE/DE/LU/FR) + French tolls.

  'gt_seed_ardennes-3-days': {
    checked: '2026-10-28',
    flight_in_cost: 43,    // own car NL-La Roche 280 km x 0.07 x ~2.2; no tolls (BE/NL/LU free)
    flight_out_cost: 39,   // own car back 250 km
    blocks: [
      { code: 'BE', local: 0, extras: [
        rbExtra('Car: own car, fuel ≈160 km in Ardennes (BE 1.989 €/l), no tolls', 22, 'transport'),
        rbExtra('Han-sur-Lesse caves + wildlife park combo ticket (notes: €41.50 p.p., outside daily budget)', 42, 'activity'),
      ] },
    ],
  },

  'gt_seed_belgian-coast-bruges-ghent-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 40,    // train NL-Bruges (NS/Eurostar Amsterdam-Brussels ~30 + SNCB ~10-15; est)
    flight_out_cost: 40,   // train back (same; est)
    blocks: [
      { code: 'BE', local: 25, extras: [] },   // SNCB trains Bruges-Ghent-De Haan/Ostend hops, ~4 x €6-8 (est)
    ],
  },

  'gt_seed_belgium-bruges-ghent-antwerp-ardennes-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 40,    // train NL-Bruges (est as coast route); notes: train for the cities
    flight_out_cost: 43,   // drive back NL from Ardennes in the rental, 280 km x 0.07 x ~2.2 (rental fuel)
    blocks: [
      { code: 'BE', transport: 0, local: 20, extras: [   // SNCB Bruges-Ghent-Antwerp ~3 hops x €6-8 (est)
        rbExtra('Car: rental 2 days (Antwerp -> Dinant/La Roche -> NL) × €50 + fuel ≈190 km Antwerp-Ardennes + one-way drop in NL ≈€60 (est)', 186, 'transport'),
        rbExtra('MAS Antwerp exhibitions (notes: ~€12)', 12, 'activity', true),
      ] },
      { code: 'BE', local: 0, extras: [] },
    ],
  },

  'gt_seed_alpine-roadtrip-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 219,   // own car NL-Chamonix 910 km: fuel ≈134 + French tolls ≈85 (Metz-Dijon-A40; est)
    flight_out_cost: 194,  // own car Ljubljana-NL 1180 km: fuel ≈170 + Karawanken 9 + Tauern 15 (route text says "fly home from Ljubljana": modelled as drive, see REVIEW)
    blocks: [
      { code: 'FR', transport: 0, local: 0, extras: [
        rbExtra('Car: own car fuel ≈890 km (CH 190 km, AT 360, IT 150, SI 190 ≈ €121) + CH vignette 43.28 + AT 10-day vignette 12.80 + Arlberg 13 + Brenner A13 12.50 + IT autostrada ≈7 (60% × 150 km × €8/100) + SI 7-day vignette 16', 226, 'transport'),
      ] },
      { code: 'CH', transport: 0, local: 0, extras: [] },
      { code: 'AT', transport: 0, local: 0, extras: [] },
      { code: 'IT', transport: 0, local: 0, extras: [] },
      { code: 'SI', local: 0, extras: [] },
    ],
  },

  'gt_seed_alsace-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 86,    // own car NL-Strasbourg 560 km, fully toll-free (notes)
    flight_out_cost: 94,   // own car Colmar-NL 610 km, toll-free
    blocks: [
      { code: 'FR', local: 0, extras: [
        rbExtra('Car: own car fuel ≈160 km (FR 2.229 €/l), no tolls', 25, 'transport'),
        rbExtra('Strasbourg astronomical clock (notes: €3)', 3, 'activity'),
        rbExtra('Strasbourg cathedral tower (notes: €8)', 8, 'activity'),
        rbExtra('Haut-Koenigsbourg Castle (notes: ~€10)', 10, 'activity'),
      ] },
    ],
  },

  'gt_seed_brittany-saint-malo-dinan-pink-granite-coast-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 158,   // own car NL-Saint-Malo 830 km: fuel ≈128 + tolls ≈30 (notes €25-35)
    flight_out_cost: 159,  // own car back 840 km: fuel ≈129 + tolls ≈30
    blocks: [
      { code: 'FR', local: 0, extras: [
        rbExtra('Car: own car fuel ≈290 km (FR 2.229 €/l), no tolls (Brittany expressways free)', 45, 'transport'),
        rbExtra('Île de Bréhat / Sept-Îles boat trip (notes: €15-25 p.p.; "Bréhat or Cap Fréhel")', 20, 'tour', true),
      ] },
    ],
  },

  'gt_seed_corsica-sardinia-full-island-loop-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 220,   // AMS-Bastia one way, connecting (WebSearch 2026-10-28; Ebookers floor €202; est)
    flight_out_cost: 120,  // Cagliari-AMS (flights_from_ams.csv, CAG back)
    blocks: [
      { code: 'FR', transport: 40, local: 0, extras: [      // Bonifacio-Santa Teresa foot ferry (as batch 2: Directferries avg €37, AFerry €43-84)
        rbExtra('Car: Corsica rental 6 days × €48 + fuel ≈300 km (my est; input 200 km is straight-line) (no tolls)', 335, 'transport'),
      ] },
      { code: 'IT', local: 0, extras: [
        rbExtra('Car: Sardinia rental 6 days × €45 + fuel ≈400 km + one-way drop Santa Teresa-Cagliari ≈€60 (est)', 386, 'transport'),
      ] },
    ],
  },

  'gt_seed_corsica-south-of-france-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Nice one way (easyJet/KLM; Expedia USD 98 floor; WebSearch 2026-10-28; typical above floor)
    flight_out_cost: 200,  // Figari-AMS one way, 1 stop (reuse FSC out fare as back est; see flights_batch7.csv)
    blocks: [
      { code: 'FR', transport: 45, local: 10, extras: [] },   // overnight ferry Nice-Bastia foot passenger (Omio/AFerry €23-48 typical; est); TER Nice-Antibes-Cannes ~€4 hops (est)
      { code: 'FR', local: 0, extras: [
        rbExtra('Car: Corsica rental 6 days × €48 + fuel ≈300 km + one-way drop Bastia-Figari ≈€60 (est), no tolls', 395, 'transport'),
      ] },
    ],
  },

  'gt_seed_corsica-roadtrip-full-island-loop-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 220,   // AMS-Bastia one way (see batch 7 CSV)
    flight_out_cost: 210,  // Ajaccio-AMS one way, connecting (Expedia USD 243 / Skyscanner; est)
    blocks: [
      { code: 'FR', local: 0, extras: [] },               // car is in the daily rate (carInDailyRate true): nothing added
    ],
  },

  'gt_seed_corsica-south-loop-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 200,   // AMS-Figari (flights_from_ams.csv, FSC out)
    flight_out_cost: 200,  // Figari-AMS, same as out (est; flights_batch7.csv)
    blocks: [
      { code: 'FR', local: 0, extras: [] },               // car in daily rate: nothing added
    ],
  },

  'gt_seed_france-roadtrip-paris-to-the-cote-dazur-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 117,   // own car NL-Paris 530 km: fuel ≈82 + tolls ≈35 (A1/A2 north of Paris; BE free)
    flight_out_cost: 296,  // own car Nice-NL 1230 km: fuel ≈191 + tolls ≈105 (est; route text says "fly back": modelled as drive, see REVIEW)
    blocks: [
      { code: 'FR', transport: 0, local: 0, extras: [
        rbExtra('Car: own car Paris-Nice fuel ≈1060 km (FR 2.229 €/l ≈165) + A6/A7/A8 tolls ≈100 (my est; notes say 150-180)', 265, 'transport'),
      ] },
      { code: 'FR', transport: 0, local: 0, extras: [] },
      { code: 'FR', transport: 0, local: 0, extras: [] },
      { code: 'FR', transport: 0, local: 0, extras: [] },
      { code: 'FR', local: 0, extras: [] },
    ],
  },

  'gt_seed_french-spanish-pyrenees-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 150,   // AMS-Toulouse (flights_from_ams.csv, TLS out)
    flight_out_cost: 150,  // Toulouse-AMS (TLS back)
    blocks: [
      { code: 'FR', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 9 days × €48 + fuel ≈610 km (TLS-Lourdes 160, loop 120, Torla-TLS 330 via Somport) + tolls A64 Toulouse-Tarbes/Pau ≈€30 (est), returned at Toulouse (no drop fee)', 550, 'transport'),
      ] },
      { code: 'ES', local: 0, extras: [] },
    ],
  },

  'gt_seed_french-alps-provence-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 252,   // own car NL-Briançon/Gap 1050 km: fuel ≈162 + tolls ≈90 (notes: total tolls €180-220)
    flight_out_cost: 292,  // own car Avignon-NL 1180 km: fuel ≈182 + tolls ≈110
    blocks: [
      { code: 'FR', transport: 0, local: 0, extras: [
        rbExtra('Car: own car fuel ≈440 km (FR 2.229 €/l), Alps/Route Napoléon toll-free', 69, 'transport'),
      ] },
      { code: 'FR', local: 0, extras: [] },
    ],
  },

  'gt_seed_french-alps-ecrins-national-park-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 252,   // own car NL-Briançon 1050 km: fuel ≈162 + tolls ≈90 (notes €80-100 one way)
    flight_out_cost: 250,  // own car back 1040 km: fuel ≈160 + tolls ≈90
    blocks: [
      { code: 'FR', local: 0, extras: [
        rbExtra('Car: own car fuel ≈40 km local valleys (FR 2.229 €/l)', 6, 'transport'),
      ] },
    ],
  },
