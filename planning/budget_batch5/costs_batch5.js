// ---- Phase 4 batch 5: Iberia 1/2 (Spain, Andorra, Gibraltar), extracted 2026-10-28, approved by Youri (planning/budget_batch5/REVIEW.md) ----
// NOT yet in RB_ROUTE_COSTS: waiting for Youri's review. Fares: flights_from_ams.csv + flights_batch5.csv.
// Car: data/cost_reference/car_costs_by_country.csv (7 L/100 km; ES fuel 1.78, rental 40/day, tolls 9/100 km; FR 2.229/48/9; AD 1.60).

  'gt_seed_andorra-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Barcelona one way (see flights_batch5.csv)
    flight_out_cost: 110,  // Barcelona-AMS one way (same)
    blocks: [
      { code: 'AD', local: 66, extras: [] },  // Alsa/Novatel bus BCN-Andorra ~33 each way (est); NO car: 4 days in a tiny country, notes list bus as an option
    ],
  },

  'gt_seed_andorra-french-pyrenees-ariege-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 150,   // AMS-Toulouse one way (KLM direct; Expedia IE EUR 129 floor, Omio GBP 203-269; typical ~150)
    flight_out_cost: 150,  // Toulouse-AMS one way (same)
    blocks: [
      { code: 'AD', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 6 days (Toulouse pickup/return) × €48 + fuel ≈450 km (TLS-Andorra-Ax loop-TLS; 420 km FR × €2.229, 30 km AD × €1.60) + tolls A66/Envalira tunnel ≈€15 (est)', 372, 'transport'),
      ] },
      { code: 'FR', local: 0, extras: [] },
    ],
  },

  'gt_seed_andalusia-roadtrip-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Malaga one way (flights_from_ams.csv)
    flight_out_cost: 110,  // Malaga-AMS one way (same)
    blocks: [
      { code: 'ES', local: 0, extras: [
        rbExtra('Car: rental 9 days × €40 + fuel ≈1,040 km (notes, circular loop) × 0.07 × €1.78 + tolls €0 (notes: mostly toll-free)', 490, 'transport'),
      ] },
    ],
  },

  'gt_seed_andalusia-seville-granada-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Malaga one way (Seville has no direct NL flight per notes)
    flight_out_cost: 110,  // Malaga-AMS one way
    blocks: [
      { code: 'ES', local: 62, extras: [] },  // Malaga-Seville train ~25 + Seville-Granada bus ~25 + Granada-Malaga bus ~12 (est)
    ],
  },

  'gt_seed_andorra-spanish-pyrenees-grand-circuit-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Barcelona one way
    flight_out_cost: 110,  // Barcelona-AMS one way
    blocks: [
      { code: 'AD', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 9 days (Barcelona) × €40 + fuel ≈900 km (BCN-Andorra-La Seu-Cerdanya-Vielha-Aiguestortes-Ripoll-BCN, own estimate; input km 430 is straight-line) × 0.07 × €1.78 + Cadi tunnel/AP tolls ≈€25 (est)', 497, 'transport'),
      ] },
      { code: 'ES', local: 0, extras: [
        rbExtra('Aiguestortes taxi/4x4 shuttle from Boi or Espot (mandatory; price not in notes, est €8 each way pp)', 16, 'transport'),
      ] },
    ],
  },

  'gt_seed_asturias-cantabria-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Bilbao one way
    flight_out_cost: 140,  // Oviedo/Asturias-AMS one way (KLM/Vueling; Expedia floor USD 127, typical higher)
    blocks: [
      { code: 'ES', local: 0, extras: [
        rbExtra('Car: rental 6 days × €40 + one-way drop Bilbao→Oviedo ≈€60 (est) + fuel ≈400 km (Bilbao-Santander-Picos-Oviedo) + tolls ≈€5 (est)', 355, 'transport'),
      ] },
    ],
  },

  'gt_seed_balearic-islands-7-10-days': {
    checked: '2026-10-28',
    flight_in_cost: 115,   // AMS-Palma one way
    flight_out_cost: 110,  // Ibiza-AMS one way
    blocks: [
      { code: 'ES', transport: 50, local: 0, extras: [] },  // ferry Palma-Ciutadella/Mahon (est ~€50)
      { code: 'ES', transport: 70, local: 0, extras: [] },  // Menorca-Ibiza: no direct ferry; Vueling/Binter flight (est)
      { code: 'ES', local: 0, extras: [
        rbExtra('Formentera day trip by ferry from Ibiza (notes: ~€40-60 return)', 50, 'tour', true),
      ] },
    ],
  },

  'gt_seed_barcelona-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Barcelona one way
    flight_out_cost: 110,
    blocks: [
      { code: 'ES', local: 0, extras: [] },  // city-only, notes: no car needed (keyword mode "rental" is wrong)
    ],
  },

  'gt_seed_basque-country-san-sebastian-bilbao-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Bilbao one way
    flight_out_cost: 110,
    blocks: [
      { code: 'ES', local: 30, extras: [] },  // buses Bilbao-San Sebastian ~10 each way + coastal bus hops (Hondarribia, Getaria) ≈10 (est)
    ],
  },

  'gt_seed_canary-islands-10-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Tenerife South one way
    flight_out_cost: 120,  // Fuerteventura-AMS one way (est from Canary fares; not searched)
    blocks: [
      { code: 'ES', transport: 45, local: 10, extras: [   // Binter Tenerife-Gran Canaria (est ~45; order is TF,GC,ACE,FUE)
        rbExtra('Teide cable car (notes: ~€40 return; kept whole, you ride up and down)', 40, 'activity'),
      ] },
      { code: 'ES', transport: 55, local: 10, extras: [] },  // Binter Gran Canaria-Lanzarote (est)
      { code: 'ES', transport: 27, local: 5, extras: [] },   // ferry Playa Blanca-Corralejo foot passenger (est)
      { code: 'ES', local: 5, extras: [] },
    ],
  },

  'gt_seed_catalonia-pyrenees-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Barcelona one way
    flight_out_cost: 110,
    blocks: [
      { code: 'ES', local: 0, extras: [
        rbExtra('Car: rental 7 of 9 days (after 2 Barcelona city days) × €40 + fuel ≈600 km × 0.07 × €1.78 + tolls (60% of km × €9/100 km)', 387, 'transport'),
      ] },
    ],
  },

  'gt_seed_galicia-santiago-de-compostela-coast-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Santiago de Compostela one way (seasonal direct; Expedia USD 128-150 floors, typical higher)
    flight_out_cost: 140,
    blocks: [
      { code: 'ES', local: 45, extras: [] },  // buses Santiago-Pontevedra/O Grove/Vigo (+A Coruña) (est); Cies ferry not priced in notes
    ],
  },

  'gt_seed_gibraltar-andalusia-costa-del-sol-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Malaga one way
    flight_out_cost: 110,
    blocks: [
      { code: 'ES', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 4 days × €40 + fuel ≈400 km (Malaga-La Linea 132 km each way + Marbella/Ronda) × 0.07 × €1.78 + AP-7 tolls ≈€15 (est)', 225, 'transport'),
      ] },
      { code: 'GI', local: 0, extras: [] },  // on foot; car stays in La Linea
    ],
  },

  'gt_seed_gran-canaria-5-7-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Gran Canaria one way
    flight_out_cost: 120,
    blocks: [
      { code: 'ES', local: 20, extras: [] },  // guagua Las Palmas-Maspalomas-Tejeda (est)
    ],
  },

  'gt_seed_gran-canaria-tenerife-7-10-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Gran Canaria one way
    flight_out_cost: 120,  // Tenerife South-AMS one way
    blocks: [
      { code: 'ES', transport: 45, local: 10, extras: [] },  // Binter flight (or Fred Olsen ferry ~50) (est)
      { code: 'ES', local: 10, extras: [
        rbExtra('Teide cable car (notes: ~€40 return; kept whole)', 40, 'activity'),
      ] },
    ],
  },

  'gt_seed_ibiza-4-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Ibiza one way (seasonal)
    flight_out_cost: 110,
    blocks: [
      { code: 'ES', local: 10, extras: [] },  // bus Ibiza Town-Sant Joan/Portinatx (est)
    ],
  },

  'gt_seed_lanzarote-fuerteventura-5-7-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Lanzarote one way
    flight_out_cost: 120,  // Fuerteventura-AMS one way (est)
    blocks: [
      { code: 'ES', transport: 27, local: 5, extras: [] },  // ferry Playa Blanca-Corralejo foot passenger (est); Timanfaya tour not priced in notes
      { code: 'ES', local: 5, extras: [] },
    ],
  },

  'gt_seed_madrid-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Madrid one way
    flight_out_cost: 130,
    blocks: [
      { code: 'ES', local: 26, extras: [          // AVE Segovia €12-14 (notes, midpoint 13) × there and back
        rbExtra('Paseo del Arte combined ticket (Prado, Reina Sofia, Thyssen; notes ~€32)', 32, 'activity'),
      ] },
    ],
  },

  'gt_seed_mallorca-menorca-7-10-days': {
    checked: '2026-10-28',
    flight_in_cost: 115,   // AMS-Palma one way
    flight_out_cost: 140,  // Menorca-AMS direct (seasonal, Transavia; Momondo EUR 140-149)
    blocks: [
      { code: 'ES', transport: 50, local: 0, extras: [   // ferry Palma-Ciutadella (est ~€50)
        rbExtra('Car: Mallorca rental 4 days × €40 + fuel ≈150 km (Tramuntana loop) × 0.07 × €1.78', 179, 'transport'),
      ] },
      { code: 'ES', local: 20, extras: [] },  // buses Mahon-Ciutadella etc. (est); no Menorca car priced (notes mention car for Mallorca only)
    ],
  },

  'gt_seed_mallorca-serra-de-tramuntana-loop-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 115,   // AMS-Palma one way
    flight_out_cost: 115,
    blocks: [
      { code: 'ES', local: 0, extras: [
        rbExtra('Car: rental 6 days × €40 + fuel ≈300 km (Tramuntana, Formentor, east coast; input 100 km is straight-line) × 0.07 × €1.78', 277, 'transport'),
      ] },
    ],
  },

  'gt_seed_menorca-4-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 140,   // AMS-Menorca (direct seasonal, or via Palma/BCN; Momondo EUR 140-149)
    flight_out_cost: 140,
    blocks: [
      { code: 'ES', local: 0, extras: [
        rbExtra('Car: rental 5 days × €40 (island rentals often pricier, est) + fuel ≈150 km × 0.07 × €1.78', 219, 'transport'),
      ] },
    ],
  },

  'gt_seed_northern-spain-roadtrip-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Bilbao one way
    flight_out_cost: 140,  // Santiago de Compostela-AMS one way
    blocks: [
      { code: 'ES', local: 0, extras: [
        rbExtra('Car: rental 12 days × €40 + one-way drop Bilbao→Santiago ≈€100 (est, notes confirm a fee) + fuel ≈1,050 km (880 km input + San Sebastian detour) × 0.07 × €1.78 + AP-8/AP-1 tolls ≈€20 (est)', 731, 'transport'),
      ] },
    ],
  },

  'gt_seed_northern-spain-basque-interior-rioja-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Bilbao one way
    flight_out_cost: 110,
    blocks: [
      { code: 'ES', local: 0, extras: [
        rbExtra('Car: rental 9 days × €40 + fuel ≈600 km (480 km input + Bilbao-San Sebastian leg) × 0.07 × €1.78 + AP-8/AP-68/AP-15 tolls ≈€25 (est)', 460, 'transport'),
      ] },
    ],
  },

  'gt_seed_porto-northern-spain-10-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 105,   // AMS-Porto one way (Expedia IE EUR 83, Skyscanner floor EUR 69, typical higher)
    flight_out_cost: 110,  // Bilbao-AMS one way
    blocks: [
      { code: 'PT', transport: 25, local: 20, extras: [] },  // Porto-Santiago bus ~€25 (est) instead of a cross-border car; local: Porto-Guimaraes/Braga/Viana trains+buses (est)
      { code: 'ES', local: 0, extras: [
        rbExtra('Car: rental 8 days from Santiago × €40 + one-way drop Santiago→Bilbao ≈€100 (est) + fuel ≈1,010 km (input) × 0.07 × €1.78 + tolls ≈€20 (est)', 566, 'transport'),
      ] },
    ],
  },
