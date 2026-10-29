// ---- Phase 4 batch 23: Caribbean, Amazon & Pan-American, extracted 2026-10-29, approved by Youri (planning/budget_batch23/REVIEW.md) ----
// NOT yet in RB_ROUTE_COSTS: waiting for Youri's review. 0 web searches: every new airport fare is an estimate
// (one-way typical ~55-60% of the "return" ranges in the route notes, cross-checked with flights_from_ams.csv rows).
// No car in this batch (all routes public transport; Costa Rica's rental is "optional" in its own text).
// Intercity local/transport figures are estimates from typical bus/shuttle/ferry fares ("(est)").

  'gt_seed_bolivia': {
    checked: '2026-10-29',
    flight_in_cost: 600,   // AMS-La Paz one way via Madrid/Bogota (notes: 700-1300 return; est, low)
    flight_out_cost: 580,  // La Paz-AMS one way (est, low)
    blocks: [
      { code: 'BO', local: 55, extras: [   // Copacabana-La Paz 4, La Paz-Uyuni night bus 20, Uyuni-Potosi 8, Potosi-Sucre 4, Sucre-La Paz night bus 18 (est)
        rbExtra('Uyuni Salt Flat 3-day jeep tour (notes: ~€140-180 all-in, midpoint)', 160, 'tour'),
      ] },
    ],
  },

  'gt_seed_northern-brazil': {
    checked: '2026-10-29',
    flight_in_cost: 480,   // AMS-Belem via Lisbon (TAP); notes 650-950 return (est, low)
    flight_out_cost: 480,  // Fortaleza-AMS (reuse flights_from_ams.csv FOR back)
    blocks: [
      { code: 'BR', local: 115, extras: [] },  // Belem-Marajo ferry 2x8, Belem-Sao Luis night bus 30, Sao Luis-Barreirinhas 10, Barreirinhas-Jericoacoara 4x4 transfer 40, Jeri-Fortaleza 20 (est)
    ],
  },

  'gt_seed_southern-cone-brazil-finale': {
    checked: '2026-10-29',
    flight_in_cost: 520,   // AMS-Santiago (KLM) + domestic to Calama; notes 800-900 return incl. domestic (est, low)
    flight_out_cost: 650,  // Rio-AMS (reuse flights_from_ams.csv GIG back)
    blocks: [
      { code: 'CL', transport: 75, local: 35, extras: [] },   // Iquique-Calama-San Pedro ~30 + San Pedro-Salta via Paso de Jama ~45 (est); local: San Pedro-Antofagasta 12, Antofagasta-Iquique 22 (est)
      { code: 'AR', transport: 220, local: 65, extras: [] },  // flight Salta-Buenos Aires-Foz do Iguacu (Aerolineas/GOL ~USD 200-280, est); local Quebrada buses Salta-Cafayate-Purmamarca-Tilcara-Humahuaca-Salta (est)
      { code: 'BR', local: 125, extras: [] },                // Foz-Curitiba 22, Ilha do Mel bus+boat 10, Floripa 25, Sao Paulo 35, Paraty 20, Rio 15 (est)
    ],
  },

  'gt_seed_suriname-northern-brazil': {
    checked: '2026-10-29',
    flight_in_cost: 750,   // AMS-Paramaribo KLM direct; notes 1100-1800 return (est)
    flight_out_cost: 480,  // Fortaleza-AMS (reuse FOR back)
    blocks: [
      { code: 'SR', transport: 420, local: 30, extras: [   // flight Paramaribo-Belem, scarce connection (est, low); local: Atjoni/Brownsberg minibus+boat shuttles (est)
        rbExtra('Suriname ICF entry form fee (amount not in notes/research; est)', 25, 'visa'),
      ] },
      { code: 'BR', local: 115, extras: [] },   // as Northern Brazil
    ],
  },

  'gt_seed_andes-grand-traverse': {
    checked: '2026-10-29',
    flight_in_cost: 460,   // AMS-Cartagena 1 stop; notes 650-900 return (est, low)
    flight_out_cost: 580,  // La Paz-AMS (est, low); route ends in Bolivia, Potosi-La Paz night bus is in BO local
    blocks: [
      { code: 'CO', transport: 45, local: 135, extras: [] },  // San Agustin-Pasto-Ipiales-Quito bus ~45 (est); local: Cartagena-Santa Marta 12, Tayrona 3, Santa Marta-Medellin flight 65, Medellin-Salento 15, Salento-Bogota 20, Bogota-San Agustin 22 (est)
      { code: 'EC', transport: 18, local: 434, extras: [] },  // Guayaquil-Tumbes-Mancora buses (est). local: Otavalo/Mindo/Banos/Cuenca/Guayaquil buses ~44 + Galapagos return flights Guayaquil-Galapagos ~390 (est; NOT in the rate, which only has park fee + tour)
      { code: 'PE', transport: 12, local: 135, extras: [   // Puno-Copacabana bus (est); local buses Mancora-Huaraz 45, Lima 11+12, Ica-Arequipa 22, Arequipa-Cusco 24, Cusco-Puno 12, Sacred Valley 8 (est)
        rbExtra('Machu Picchu: train + entrance (notes ~€150-250, midpoint)', 200, 'tour'),
      ] },
      { code: 'BO', local: 55, extras: [
        rbExtra('Uyuni Salt Flat 3-day jeep tour (notes ~€140-180, midpoint)', 160, 'tour'),
      ] },
    ],
  },

  'gt_seed_colombia': {
    checked: '2026-10-29',
    flight_in_cost: 460,   // AMS-Cartagena (as Andes; est, low)
    flight_out_cost: 450,  // Bogota-AMS one way (est, low)
    blocks: [
      { code: 'CO', local: 157, extras: [] },  // as Andes CO 135 + San Agustin-Bogota bus 22 back to the airport (est)
    ],
  },

  'gt_seed_central-america-loop': {
    checked: '2026-10-29',
    flight_in_cost: 500,   // AMS-Guatemala City, 1-2 stops; notes 600-900 return (est, low)
    flight_out_cost: 450,  // Panama City-AMS KLM direct (est). Route ends Panama City, NOT the San Blas sailboat to Cartagena in the last block's text
    blocks: [
      { code: 'GT', transport: 22, local: 80, extras: [] },   // Flores-San Ignacio shuttle (est); Xela-Atitlan-Antigua-Guatemala City-Semuc-Flores shuttles (est)
      { code: 'BZ', transport: 70, local: 20, extras: [] },   // ferry Placencia/Dangriga-Puerto Cortes (est, no price in notes); local buses only: the island water taxis are in the €72/day rate (notes: 2026-07 correction)
      { code: 'HN', transport: 32, local: 125, extras: [] },  // Tegucigalpa-San Salvador bus (est); local: Copan 15, Yojoa 12, La Ceiba 12, Roatan ferry return 2x32, Tegucigalpa 22 (est)
      { code: 'SV', transport: 42, local: 35, extras: [] },   // Ticabus San Salvador-Leon (est); chicken buses (est)
      { code: 'NI', transport: 40, local: 40, extras: [] },   // Ticabus Managua-San Jose (est); local buses + Ometepe ferry (est)
      { code: 'CR', transport: 33, local: 150, extras: [     // Puerto Viejo-Bocas shuttle+boat (est)
        rbExtra('National park entrances: 3 parks at ~$15-22 (notes), ~€17 each', 50, 'park_fee'),
      ] },
      { code: 'PA', local: 55, extras: [] },   // Bocas-Boquete 25, Boquete-Panama City 24 (est); San Blas tour not priced (no price in notes)
    ],
  },

  'gt_seed_costa-rica': {
    checked: '2026-10-29',
    flight_in_cost: 470,   // AMS-San Jose KLM direct; notes 730-850 return (est)
    flight_out_cost: 450,  // San Jose-AMS (est)
    blocks: [
      { code: 'CR', local: 182, extras: [   // SJO-Liberia 14, buses/shuttles 150, Puerto Viejo-SJO 18 (est). No rental car: route text says buses, rental optional
        rbExtra('National park entrances: 3 parks at ~$15-22 (notes), ~€17 each', 50, 'park_fee'),
      ] },
    ],
  },

  'gt_seed_caribbean-islands-hop': {
    checked: '2026-10-29',
    flight_in_cost: 520,   // AMS-Havana (reuse flights_from_ams.csv HAV out)
    flight_out_cost: 600,  // Grenada-AMS 1 stop (est, low)
    blocks: [
      { code: 'CU', transport: 300, local: 80, extras: [   // flight Havana-Kingston via Panama/Miami (est); Viazul buses Havana-Vinales-Cienfuegos-Trinidad-Havana (est)
        rbExtra('Cuba e-Visa (notes ~$50)', 45, 'visa'),
      ] },
      { code: 'JM', transport: 320, local: 45, extras: [] },  // flight Kingston-Curacao via Panama/Miami (est); Knutsford Express + route taxis (est)
      { code: 'CW', transport: 95, local: 0, extras: [] },    // flight Curacao-Bonaire (est, ~USD 100)
      { code: 'BQ', transport: 450, local: 0, extras: [      // flight Bonaire-Guadeloupe via Aruba/Panama/San Juan (est, low)
        rbExtra('Bonaire entry tax (notes ~€70 p.p.)', 70, 'other'),
      ] },
      { code: 'GP', transport: 65, local: 30, extras: [] },  // L'Express des Iles ferry to Dominica (est); Les Saintes ferry return (est)
      { code: 'DM', transport: 90, local: 0, extras: [       // L'Express des Iles Roseau-Castries (est)
        rbExtra('Boiling Lake mandatory guide (notes ~€55-70, midpoint)', 63, 'tour'),
      ] },
      { code: 'LC', transport: 180, local: 0, extras: [] },  // flight St Lucia-Grenada (est)
      { code: 'GD', local: 0, extras: [] },
    ],
  },

  'gt_seed_cuba': {
    checked: '2026-10-29',
    flight_in_cost: 520,   // Havana out (reuse HAV out)
    flight_out_cost: 500,  // Havana-AMS (est)
    blocks: [
      { code: 'CU', local: 80, extras: [
        rbExtra('Cuba e-Visa (notes ~$50)', 45, 'visa'),
      ] },
    ],
  },

  'gt_seed_abc-islands': {
    checked: '2026-10-29',
    flight_in_cost: 450,   // AMS-Aruba KLM direct; notes 740-820 return (est)
    flight_out_cost: 515,  // Curacao-AMS 420 (est) + Bonaire-Curacao hop 95 (route text: fly back via Curacao)
    blocks: [
      { code: 'AW', transport: 96, local: 0, extras: [   // flight Aruba-Curacao ~$100-115 (notes, midpoint)
        rbExtra('Aruba ED Card sustainability fee ($20, notes)', 18, 'other'),
      ] },
      { code: 'CW', transport: 95, local: 0, extras: [] },   // flight Curacao-Bonaire (est)
      { code: 'BQ', local: 0, extras: [
        rbExtra('Bonaire entry tax (notes ~€70 p.p.)', 70, 'other'),
      ] },
    ],
  },

  'gt_seed_curacao-bonaire': {
    checked: '2026-10-29',
    flight_in_cost: 440,   // AMS-Curacao KLM direct; notes 650-750 return (est)
    flight_out_cost: 515,  // Curacao-AMS 420 (est) + Bonaire-Curacao hop 95
    blocks: [
      { code: 'CW', transport: 95, local: 0, extras: [] },
      { code: 'BQ', local: 0, extras: [
        rbExtra('Bonaire entry tax (notes ~€70 p.p.)', 70, 'other'),
      ] },
    ],
  },

  'gt_seed_guadeloupe-dominica': {
    checked: '2026-10-29',
    flight_in_cost: 420,   // AMS-Pointe-a-Pitre via Paris; notes 650-1700 return (est)
    flight_out_cost: 650,  // Dominica-AMS 1-2 stops (est, low)
    blocks: [
      { code: 'GP', transport: 65, local: 30, extras: [] },  // L'Express des Iles ferry (est); Les Saintes ferry return (est)
      { code: 'DM', local: 0, extras: [
        rbExtra('Boiling Lake mandatory guide (notes ~€55-70, midpoint)', 63, 'tour'),
      ] },
    ],
  },

  'gt_seed_ecuador': {
    checked: '2026-10-29',
    flight_in_cost: 520,   // AMS-Quito via Madrid; notes 800-1000 return (est)
    flight_out_cost: 500,  // Quito-AMS (est)
    blocks: [
      { code: 'EC', local: 434, extras: [] },  // buses ~44 + Galapagos return flights ~390 (est; the rate holds only park fee + tour); Galapagos-Quito flight on the way back
    ],
  },

  'gt_seed_guatemala': {
    checked: '2026-10-29',
    flight_in_cost: 500,   // AMS-Guatemala City, stopover; notes 700-1300 return (est)
    flight_out_cost: 480,  // Guatemala City-AMS (est)
    blocks: [
      { code: 'GT', local: 135, extras: [] },  // shuttles 80 + Flores-Guatemala City flight/bus 55 (est)
    ],
  },

  'gt_seed_jamaica': {
    checked: '2026-10-29',
    flight_in_cost: 480,   // AMS-Kingston with stopover; notes 750-900 return (est)
    flight_out_cost: 460,  // Kingston-AMS (est)
    blocks: [
      { code: 'JM', local: 45, extras: [] },
    ],
  },

  'gt_seed_saint-lucia-grenada': {
    checked: '2026-10-29',
    flight_in_cost: 500,   // AMS-St Lucia (UVF) via US; notes 700-1000 return (est, low)
    flight_out_cost: 600,  // Grenada-AMS 1 stop (est, low)
    blocks: [
      { code: 'LC', transport: 180, local: 0, extras: [] },  // regional flight St Lucia-Grenada (est)
      { code: 'GD', local: 0, extras: [] },
    ],
  },

  'gt_seed_mexico': {
    checked: '2026-10-29',
    flight_in_cost: 550,   // Mexico City out (reuse MEX out)
    flight_out_cost: 450,  // Cancun-AMS (est); route ends Bacalar, bus to Cancun in local
    blocks: [
      { code: 'MX', local: 152, extras: [] },  // ADO buses CDMX-Oaxaca 22, Oaxaca-San Cristobal 30, -Palenque 14, -Merida 30, -Tulum 22, -Bacalar 12, Bacalar-Cancun 22 (est)
    ],
  },

  'gt_seed_nicaragua': {
    checked: '2026-10-29',
    flight_in_cost: 430,   // AMS-Managua via Panama City (Copa); notes 520-900 return (est)
    flight_out_cost: 430,
    blocks: [
      { code: 'NI', local: 40, extras: [] },
    ],
  },

  'gt_seed_panama': {
    checked: '2026-10-29',
    flight_in_cost: 450,   // AMS-Panama City KLM direct; notes 700-900 return (est)
    flight_out_cost: 450,
    blocks: [
      { code: 'PA', local: 55, extras: [] },  // San Blas boat tour not priced (no price in notes)
    ],
  },

  'gt_seed_peru': {
    checked: '2026-10-29',
    flight_in_cost: 500,   // AMS-Lima KLM direct; notes 800-950 return (est)
    flight_out_cost: 480,
    blocks: [
      { code: 'PE', local: 205, extras: [   // buses 135 (as Andes) + domestic flight Juliaca-Lima ~70 (est)
        rbExtra('Machu Picchu: train + entrance (notes ~€150-250, midpoint)', 200, 'tour'),
      ] },
    ],
  },

  'gt_seed_suriname': {
    checked: '2026-10-29',
    flight_in_cost: 750,   // AMS-Paramaribo KLM direct; notes 1100-1800 return (est)
    flight_out_cost: 700,
    blocks: [
      { code: 'SR', local: 30, extras: [
        rbExtra('Suriname ICF entry form fee (amount not in notes/research; est)', 25, 'visa'),
      ] },
    ],
  },
