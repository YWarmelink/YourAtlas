// ---- Phase 4 batch 6: Iberia 2/2 (Spain/Portugal/islands), extracted 2026-10-28, approved by Youri (planning/budget_batch6/REVIEW.md) ----
// Fares: data/cost_reference/flights_from_ams.csv + planning/budget_batch6/flights_batch6.csv. Car: data/cost_reference/car_costs_by_country.csv
// (7 L/100 km: ES 1.78 EUR/l = 0.125/km, PT 2.099 EUR/l = 0.147/km; rental EUR 40/day both; tolls: PT A1 Porto-Lisbon ~24, A2 Lisbon-Algarve ~22, A22 ~5-10; Spanish autovias mostly free).

  'gt_seed_spain-east-to-south-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Barcelona one way (flights_batch6.csv)
    flight_out_cost: 110,  // Malaga-AMS one way (flights_from_ams.csv AGP out, reused)
    blocks: [
      { code: 'ES', local: 0, extras: [
        rbExtra('Car: rental 10 days (from Tarragona, Barcelona days car-free) × €40 + one-way drop Malaga ≈€100 (est) + fuel ≈1230 km × 0.125 + tolls ≈€6 (AP-7 free, notes: short stretch S of Cartagena)', 659, 'transport'),
      ] },
    ],
  },

  'gt_seed_spain-north-to-central-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Bilbao one way (flights_batch6.csv)
    flight_out_cost: 110,  // Madrid-AMS one way (flights_batch6.csv)
    blocks: [
      { code: 'ES', local: 70, extras: [] },  // no car in the notes (train emoji, linear route): public transport, est: San Sebastian-Vitoria bus ~10, Vitoria-Burgos bus ~13, Burgos-Madrid train/bus ~22, Toledo + Segovia day trips by train ~26
    ],
  },

  'gt_seed_tenerife-5-7-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Tenerife South one way (flights_batch6.csv)
    flight_out_cost: 120,  // Tenerife South-AMS one way (flights_batch6.csv)
    blocks: [
      { code: 'ES', local: 0, extras: [
        rbExtra('Car: rental 4 days (Anaga + Teide days) × €40 + fuel ≈230 km × 0.125 (no tolls)', 189, 'transport'),
        rbExtra('Teide cable car (return)', 40, 'activity'),  // notes: ~€40 return; summit permit free
      ] },
    ],
  },

  'gt_seed_tenerife-la-gomera-7-10-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Tenerife South (as above)
    flight_out_cost: 120,  // Tenerife South-AMS (as above)
    blocks: [
      { code: 'ES', transport: 38, local: 30, extras: [  // ferry Los Cristianos-San Sebastian ~38 (Fred Olsen/Armas, est, no price in notes); Titsa buses airport/Santa Cruz/Teide (est)
        rbExtra('Teide cable car (return)', 40, 'activity'),  // notes ~€40 return
      ] },
      { code: 'ES', local: 63, extras: [] },  // return ferry San Sebastian-Los Cristianos ~38 (est) + La Gomera buses to Valle Gran Rey/Agulo ~25 (est)
    ],
  },

  'gt_seed_valencia-costa-blanca-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,   // AMS-Valencia one way (flights_batch6.csv)
    flight_out_cost: 90,   // Valencia-AMS one way (flights_batch6.csv)
    blocks: [
      { code: 'ES', local: 0, extras: [
        rbExtra('Car: rental 4 days (after Valencia city days) × €40 + fuel ≈720 km × 0.125 + tolls ≈€10 (AP-7 Valencia-Alicante largely free, est); loop back to Valencia, no drop fee', 260, 'transport'),
      ] },
    ],
  },

  'gt_seed_algarve-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 120,   // AMS-Faro one way (flights_batch6.csv)
    flight_out_cost: 110,  // Faro-AMS one way (flights_batch6.csv)
    blocks: [
      { code: 'PT', local: 0, extras: [
        rbExtra('Car: rental 5 days × €40 + fuel ≈300 km × 0.147 + A22 tolls ≈€8 (est)', 252, 'transport'),
      ] },
    ],
  },

  'gt_seed_azores-island-hopping-10-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 150,   // AMS-Ponta Delgada one way (flights_batch6.csv)
    flight_out_cost: 200,  // Horta-Lisbon-AMS (HOR-LIS ~90 + LIS-AMS ~105; est, low confidence)
    blocks: [
      { code: 'PT', transport: 80, local: 30, extras: [] },  // Azores Airlines PDL-Terceira (notes ~60-100 -> 80); Sao Miguel buses/shuttles Furnas + Sete Cidades (est)
      { code: 'PT', transport: 80, local: 10, extras: [] },  // Terceira-Faial inter-island flight (notes' 150-250 total for 2-3 hops -> 80 each); Terceira local bus (est)
      { code: 'PT', local: 12, extras: [] },                  // Faial-Pico ferry return ~12 (est). Pico climb needs guide/permit, price not in notes: not added
    ],
  },

  'gt_seed_azores-sao-miguel-terceira-7-10-days': {
    checked: '2026-10-28',
    flight_in_cost: 150,   // AMS-Ponta Delgada one way (flights_batch6.csv)
    flight_out_cost: 200,  // Terceira-Lisbon-AMS or via Ponta Delgada (domestic ~80 + AMS ~140; est, low)
    blocks: [
      { code: 'PT', transport: 80, local: 0, extras: [   // PDL-Terceira flight (notes ~60-100 -> 80)
        rbExtra('Car: rental 4 days Sao Miguel + 3 days Terceira (2 rentals) × €40 + fuel ≈340 km × 0.147 (no tolls)', 330, 'transport'),
      ] },
      { code: 'PT', local: 0, extras: [] },
    ],
  },

  'gt_seed_central-portugal-coimbra-serra-da-estrela-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,   // AMS-Porto one way (flights_batch6.csv)
    flight_out_cost: 120,  // Porto-AMS one way (flights_batch6.csv)
    blocks: [
      { code: 'PT', local: 0, extras: [
        rbExtra('Car: rental 6 days × €40 + fuel ≈430 km (190 in route + Porto-Coimbra and back) × 0.147 + A1 tolls Porto-Coimbra both ways ≈€22 (est)', 325, 'transport'),
      ] },
    ],
  },

  'gt_seed_lisbon-sintra-5-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Lisbon one way (flights_batch6.csv)
    flight_out_cost: 105,  // Lisbon-AMS one way (flights_batch6.csv)
    blocks: [
      { code: 'PT', local: 20, extras: [] },  // trains Sintra + Cascais return ~2.4/2.3 each way, Sintra/Cabo da Roca buses (est)
    ],
  },

  'gt_seed_madeira-5-7-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Funchal one way (flights_batch6.csv)
    flight_out_cost: 120,  // Funchal-AMS one way (flights_batch6.csv)
    blocks: [
      { code: 'PT', local: 0, extras: [
        rbExtra('Car: rental 3 days (north-coast loop) × €40 + fuel ≈170 km × 0.147 (loop estimated; notes name the loop, input km 80 too low) + tolls ~0', 145, 'transport'),
        rbExtra('Monte cable car (return)', 19, 'activity'),  // notes: €12.50 one-way / €19 return
      ] },
    ],
  },

  'gt_seed_madeira-porto-santo-7-10-days': {
    checked: '2026-10-28',
    flight_in_cost: 130,   // AMS-Funchal (as above)
    flight_out_cost: 120,  // Funchal-AMS (as above)
    blocks: [
      { code: 'PT', transport: 30, local: 0, extras: [   // Lobo Marinho ferry Funchal-Porto Santo ~30 one way (est; notes give no price)
        rbExtra('Car: rental 3 days (north-coast loop) × €40 + fuel ≈170 km × 0.147', 145, 'transport'),
        rbExtra('Monte cable car (return)', 19, 'activity'),  // notes: €12.50 one-way / €19 return
      ] },
      { code: 'PT', local: 30, extras: [] },  // return ferry Porto Santo-Funchal ~30 (est)
    ],
  },

  'gt_seed_northern-portugal-galicia-7-10-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,   // AMS-Porto one way (flights_batch6.csv)
    flight_out_cost: 130,  // Santiago de Compostela-AMS one way (flights_batch6.csv)
    blocks: [
      { code: 'PT', transport: 0, local: 38, extras: [   // trains Porto-Guimaraes/Braga return ~13 + Douro train to Pinhao return ~25 (est)
        rbExtra('Car: rental 6 days (after Porto days) × €40 + one-way drop Santiago (cross-border) ≈€90 (est) + fuel 280 km PT × 0.147 + 280 km ES × 0.125 + tolls ≈€28 (A28/A3 + AP-9, est)', 434, 'transport'),
      ] },
      { code: 'ES', local: 0, extras: [] },
    ],
  },

  'gt_seed_northern-portugal-minho-6-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,   // AMS-Porto one way (flights_batch6.csv)
    flight_out_cost: 120,  // Porto-AMS one way (flights_batch6.csv)
    blocks: [
      { code: 'PT', local: 17, extras: [   // trains Porto-Guimaraes + Porto-Braga ~3.25 each way (est)
        rbExtra('Car: rental 3 days (Viana do Castelo / Ponte de Lima / Minho) × €40 + fuel ≈160 km × 0.147 + A28 tolls ≈€8 (est)', 152, 'transport'),
      ] },
    ],
  },

  'gt_seed_porto-4-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,   // AMS-Porto one way (flights_batch6.csv)
    flight_out_cost: 120,  // Porto-AMS one way (flights_batch6.csv)
    blocks: [
      { code: 'PT', local: 25, extras: [] },  // Douro day trip by train Porto-Pinhao/Regua return (est ~25)
    ],
  },

  'gt_seed_porto-douro-lisbon-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,   // AMS-Porto one way (flights_batch6.csv)
    flight_out_cost: 105,  // Lisbon-AMS one way (flights_batch6.csv)
    blocks: [
      { code: 'PT', local: 0, extras: [
        rbExtra('Car: rental 4 days (Porto-Douro-Lisbon) × €40 + one-way drop Lisbon ≈€60 (est) + fuel ≈600 km × 0.147 + tolls ≈€25 (A4/A25/A1, est)', 333, 'transport'),
      ] },
    ],
  },

  'gt_seed_portugal-andalusia-10-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 110,   // AMS-Lisbon one way (flights_batch6.csv)
    flight_out_cost: 110,  // Malaga-AMS one way (AGP; Granada is ~1h30 from Malaga; flights_batch6.csv back row)
    blocks: [
      { code: 'PT', transport: 0, local: 10, extras: [   // Lisbon-Sintra trains (est)
        rbExtra('Car: rental 8 days (from Lisbon to the Algarve onwards) × €40 + one-way drop Malaga/Granada (cross-border) ≈€120 (est) + fuel 460 km PT × 0.147 + 670 km ES × 0.125 + tolls ≈€40 (A2/A22 + A-49, est; Spanish autovias free)', 631, 'transport'),
      ] },
      { code: 'ES', local: 0, extras: [] },
    ],
  },

  'gt_seed_portugal-spain-roadtrip-14-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,   // AMS-Porto one way (flights_batch6.csv)
    flight_out_cost: 110,  // Malaga-AMS one way (AGP)
    blocks: [
      { code: 'PT', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 12 days (after 2 Porto days) × €40 + one-way drop Malaga/Granada (cross-border) ≈€120 (est) + fuel 940 km PT × 0.147 + 640 km ES × 0.125 + tolls ≈€75 (A1/A2/A22 + A-49, est)', 893, 'transport'),
      ] },
      { code: 'ES', local: 0, extras: [] },
    ],
  },

  'gt_seed_portugal-spain-porto-to-madrid-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,   // AMS-Porto one way (flights_batch6.csv)
    flight_out_cost: 110,  // Madrid-AMS one way (flights_batch6.csv)
    blocks: [
      { code: 'PT', transport: 0, local: 0, extras: [
        rbExtra('Car: rental 8 days (Porto to Seville, car dropped in Seville) × €40 + one-way drop Seville (cross-border) ≈€120 (est) + fuel 640 km PT × 0.147 + 220 km ES × 0.125 + tolls ≈€64 (A1/A2/A22 + A-49, est)', 625, 'transport'),
      ] },
      { code: 'ES', local: 40, extras: [] },  // AVE Seville-Madrid ~40 booked ahead (est; notes: ~2h30, realistic alternative)
    ],
  },

  'gt_seed_portugal-roadtrip-12-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,   // AMS-Porto one way (flights_batch6.csv)
    flight_out_cost: 110,  // Faro-AMS one way (flights_batch6.csv)
    blocks: [
      { code: 'PT', local: 0, extras: [
        rbExtra('Car: rental 11 days × €40 + one-way drop Faro ≈€70 (est) + fuel ≈1200 km × 0.147 + tolls ≈€66 (A1/A2/A22 etc, est)', 752, 'transport'),
      ] },
    ],
  },

  'gt_seed_portugal-north-to-south-9-days': {
    checked: '2026-10-28',
    flight_in_cost: 100,   // AMS-Porto one way (flights_batch6.csv)
    flight_out_cost: 110,  // Faro-AMS one way (flights_batch6.csv)
    blocks: [
      { code: 'PT', local: 0, extras: [
        rbExtra('Car: rental 7 days (after 2 Porto days) × €40 + one-way drop Faro ≈€70 (est) + fuel ≈670 km × 0.147 + tolls ≈€46 (A1 ~€24 per notes + A2 ~€22, est)', 494, 'transport'),
      ] },
    ],
  },

  'gt_seed_sao-miguel-azores-5-7-days': {
    checked: '2026-10-28',
    flight_in_cost: 150,   // AMS-Ponta Delgada one way (flights_batch6.csv)
    flight_out_cost: 140,  // Ponta Delgada-AMS one way (flights_batch6.csv)
    blocks: [
      { code: 'PT', local: 0, extras: [
        rbExtra('Car: rental 4 days (Sete Cidades / Furnas / Lagoa do Fogo) × €40 + fuel ≈150 km × 0.147 (input km 90 too low for round trips from the base; no tolls)', 182, 'transport'),
      ] },
    ],
  },
