// ---- Phase 4 batch 22: Africa, extracted 2026-10-29, approved by Youri (planning/budget_batch22/REVIEW.md) ----

  'gt_seed_botswana': {
    checked: '2026-10-29',
    flight_in_cost: 800,   // AMS-Kasane one way via Johannesburg (notes return ±€900-1,300; typical one-way; est)
    flight_out_cost: 750,  // Maun-AMS via Johannesburg (Maun-JNB ~€170 + KLM JNB-AMS ~€580; est)
    blocks: [
      { code: 'BW', local: 25, extras: [
        rbExtra('Chobe entrance 2 days × €19 (BWP 270/day per notes; days assumed)', 38, 'park_fee'),
        rbExtra('Car: 4x4 rental 12 days (from Maun, after Kasane/Chobe by bus + game drives) × €150 + fuel ≈920 km × 7 L/100 × €1.19 + border road tax/insurance ≈€30 (est)', 1907, 'transport'),
      ] },  // Kasane-Maun bus ~€25 (est); car from Maun on
    ],
  },

  'gt_seed_cape-verde': {
    checked: '2026-10-29',
    flight_in_cost: 250,   // AMS-São Vicente one way (reuse VXE row, flights_from_ams.csv)
    flight_out_cost: 240,  // Praia-AMS via Lisbon (TAP ~€240; est)
    blocks: [
      { code: 'CV', local: 195, extras: [
        rbExtra('EASE registration incl. airport security fee (file ~€35; notes ~€30 fee, one charge)', 35, 'visa'),
      ] },  // Santo Antão ferry return ~€20 + Mindelo-Praia ~€55 + Praia-Fogo ~€60 + Fogo-Praia ~€60 (Binter, est)
    ],
  },

  'gt_seed_egypt': {
    checked: '2026-10-29',
    flight_in_cost: 180,   // AMS-Cairo (reuse CAI out)
    flight_out_cost: 230,  // Cairo-AMS (reuse CAI back)
    blocks: [
      { code: 'EG', local: 130, extras: [
        rbExtra('Nile tourist-class cruise Luxor-Aswan, 3-4 nights all-in (notes €320-550, midpoint)', 435, 'tour'),
        rbExtra('Egypt e-visa ($25-30 per notes; file $25-45)', 25, 'visa'),
      ] },  // Cairo-Dahab bus ~20, Dahab-Luxor bus/ferry via Hurghada ~45, Aswan-Cairo sleeper ~55 + Cairo-Alexandria train ~8 (all est)
    ],
  },

  'gt_seed_horn-of-africa-egypt': {
    checked: '2026-10-29',
    flight_in_cost: 450,   // AMS-Addis Ababa direct Ethiopian (notes return ±€500-700; typical one-way; est)
    flight_out_cost: 230,  // Cairo-AMS (reuse CAI back)
    blocks: [
      { code: 'ET', transport: 250, local: 750, extras: [
        rbExtra('Danakil Depression 3-day guided tour (escort/permits incl., notes ~€430)', 430, 'tour'),
        rbExtra('Simien Mountains trekking: park/scout/guide/mule 3-4 days (notes ~€175)', 175, 'park_fee'),
        rbExtra('Ethiopia e-visa ($62 per file, 30 days)', 55, 'visa'),
      ] },  // domestic flights Addis-Lalibela-Gondar ~€400 (notes) + Addis-Mekele return for Danakil ~€180 (est) + Addis-Arba Minch/Jinka return ~€170 (est)
      { code: 'EG', local: 130, extras: [
        rbExtra('Nile tourist-class cruise Luxor-Aswan, 3-4 nights all-in (notes €320-550, midpoint)', 435, 'tour'),
        rbExtra('Egypt e-visa ($25-30 per notes; file $25-45)', 25, 'visa'),
      ] },  // Cairo-Dahab bus ~20, Dahab-Luxor bus/ferry via Hurghada ~45, Aswan-Cairo sleeper ~55 + Cairo-Alexandria train ~8 (all est)
    ],
  },

  'gt_seed_ethiopia': {
    checked: '2026-10-29',
    flight_in_cost: 450,   // AMS-Addis Ababa one way with a connection (notes return ±€700-900; est)
    flight_out_cost: 450,  // Addis Ababa-AMS one way, 1 connection (est)
    blocks: [
      { code: 'ET', local: 750, extras: [
        rbExtra('Danakil Depression 3-day guided tour (escort/permits incl., notes ~€430)', 430, 'tour'),
        rbExtra('Simien Mountains trekking: park/scout/guide/mule 3-4 days (notes ~€175)', 175, 'park_fee'),
        rbExtra('Ethiopia e-visa ($62 per file, 30 days)', 55, 'visa'),
      ] },  // domestic flights Addis-Lalibela-Gondar ~€400 (notes) + Addis-Mekele return for Danakil ~€180 (est) + Addis-Arba Minch/Jinka return ~€170 (est)
    ],
  },

  'gt_seed_gabon': {
    checked: '2026-10-29',
    flight_in_cost: 700,   // AMS-Libreville (reuse LBV back 700; est)
    flight_out_cost: 700,  // Libreville-AMS (reuse LBV back)
    blocks: [
      { code: 'GA', local: 0, extras: [
        rbExtra('Gabon e-visa (fee not in files; est)', 90, 'visa'),
      ] },  // Loango logistics in the rate (inDailyRate); Pongara boat ~45 min, not priced
    ],
  },

  'gt_seed_ghana': {
    checked: '2026-10-29',
    flight_in_cost: 450,   // AMS-Accra direct KLM (notes return ±€700-1,100; typical one-way; est)
    flight_out_cost: 420,  // Accra-AMS direct KLM (est)
    blocks: [
      { code: 'GH', local: 30, extras: [
        rbExtra('Ghana e-visa ($260 per VISA_VACCINATION_RESEARCH; notes say $60-150, see REVIEW)', 230, 'visa'),
      ] },  // STC/tro-tro Accra-Cape Coast-Kakum-Volta (est)
    ],
  },

  'gt_seed_kenya': {
    checked: '2026-10-29',
    flight_in_cost: 480,   // AMS-Nairobi direct KLM (notes return ±€700-1,100; est)
    flight_out_cost: 450,  // Nairobi-AMS direct KLM (est)
    blocks: [
      { code: 'KE', local: 150, extras: [
        rbExtra('Kenya eTA (notes $51)', 45, 'visa'),
      ] },  // matatu/shuttles Nairobi-Mara/Nakuru/Amboseli return ~€110, SGR Nairobi-Mombasa return ~€30, Nanyuki bus ~€10 (est)
    ],
  },

  'gt_seed_morocco': {
    checked: '2026-10-29',
    flight_in_cost: 120,   // AMS-Tangier (Transavia/Ryanair, est); notes say Marrakech but route starts in Tangier
    flight_out_cost: 120,  // Marrakech-AMS direct Transavia/easyJet (notes return ±€100-280; est)
    blocks: [
      { code: 'MA', local: 50, extras: [] },  // buses Tangier-Chefchaouen ~7, -Fes ~9, taxi Volubilis ~15, train Fes-Marrakech ~20 (est)
    ],
  },

  'gt_seed_african-islands': {
    checked: '2026-10-29',
    flight_in_cost: 650,   // AMS-Antananarivo 1 stop (notes return ±€650-1,100; est)
    flight_out_cost: 600,  // Mauritius-AMS one way, 1 stop (notes return ±€600-1,500; est)
    blocks: [
      { code: 'MG', transport: 180, local: 450, extras: [
        rbExtra('4x4 + driver Tana-Andasibe and Tana-Isalo, ~€400-500 together (notes, midpoint)', 450, 'transport'),
        rbExtra('Madagascar e-visa 30 days (notes ~€34)', 34, 'visa'),
      ] },  // Tana-Nosy Be return flight ~€230 (notes €210-250) + Tana-Morondava return flight ~€220 (est); Isalo/Andasibe by 4x4+driver is the extra
      { code: 'MU', local: 20, extras: [
        rbExtra('Île aux Cerfs organised day tour boat+lunch (notes €50-70, midpoint)', 60, 'tour'),
      ] },  // public buses/taxis (est); no car (route text never mentions one)
    ],
  },

  'gt_seed_madagascar': {
    checked: '2026-10-29',
    flight_in_cost: 650,   // AMS-Antananarivo 1 stop (est)
    flight_out_cost: 650,  // Antananarivo-AMS 1 stop (est)
    blocks: [
      { code: 'MG', local: 450, extras: [
        rbExtra('4x4 + driver Tana-Andasibe and Tana-Isalo, ~€400-500 together (notes, midpoint)', 450, 'transport'),
        rbExtra('Madagascar e-visa 30 days (notes ~€34)', 34, 'visa'),
      ] },  // Tana-Nosy Be return flight ~€230 (notes €210-250) + Tana-Morondava return flight ~€220 (est); Isalo/Andasibe by 4x4+driver is the extra
    ],
  },

  'gt_seed_mauritius': {
    checked: '2026-10-29',
    flight_in_cost: 600,   // AMS-Mauritius 1 stop (notes return ±€600-1,500; est)
    flight_out_cost: 600,  // Mauritius-AMS 1 stop (est)
    blocks: [
      { code: 'MU', local: 20, extras: [
        rbExtra('Île aux Cerfs organised day tour boat+lunch (notes €50-70, midpoint)', 60, 'tour'),
      ] },  // public buses/taxis (est); no car (route text never mentions one)
    ],
  },

  'gt_seed_mozambique': {
    checked: '2026-10-29',
    flight_in_cost: 600,   // AMS-Maputo via Doha (notes return ±€610-900; est)
    flight_out_cost: 600,  // Maputo-AMS via Doha (the Nampula-Maputo flight is in local)
    blocks: [
      { code: 'MZ', local: 375, extras: [
        rbExtra('Bazaruto Archipelago boat trip (notes €80-140, midpoint)', 110, 'tour'),
        rbExtra('Mozambique eTA (notes ~€10)', 10, 'visa'),
      ] },  // 2 domestic LAM flights (Vilankulo/Inhambane-Nampula, Nampula-Maputo) ~€350 (notes €300-400) + chapa Maputo-Inhambane-Vilankulo ~€25 (est)
    ],
  },

  'gt_seed_victoria-falls-kalahari-loop': {
    checked: '2026-10-29',
    flight_in_cost: 600,   // AMS-Maputo via Lisbon TAP (notes return ±€750-1,200; est)
    flight_out_cost: 750,  // Maun-AMS via Johannesburg (est)
    blocks: [
      { code: 'MZ', transport: 60, local: 375, extras: [
        rbExtra('Bazaruto Archipelago boat trip (notes €80-140, midpoint)', 110, 'tour'),
        rbExtra('Mozambique eTA (notes ~€10)', 10, 'visa'),
      ] },  // 2 domestic LAM flights (Vilankulo/Inhambane-Nampula, Nampula-Maputo) ~€350 (notes €300-400) + chapa Maputo-Inhambane-Vilankulo ~€25 (est)
      { code: 'ZW', transport: 30, local: 40, extras: [
        rbExtra('Mana Pools mandatory guided walking/canoe safari 3-4 days all-in (notes €1,300-1,650, midpoint)', 1475, 'tour'),
        rbExtra('Victoria Falls entry, Zimbabwe side (notes ~€46)', 46, 'park_fee'),
        rbExtra('Hwange NP entrance 2 days × €22 (notes ~€22/day; days assumed)', 44, 'park_fee'),
        rbExtra('Zimbabwe visa on arrival/e-visa ($30 per notes)', 27, 'visa'),
      ] },  // buses Harare-Masvingo-Bulawayo-Victoria Falls ~€40 (est); no car (route text never mentions one, rental restricted)
      { code: 'BW', local: 25, extras: [
        rbExtra('Chobe entrance 2 days × €19 (BWP 270/day per notes; days assumed)', 38, 'park_fee'),
        rbExtra('Car: 4x4 rental 12 days (from Maun, after Kasane/Chobe by bus + game drives) × €150 + fuel ≈920 km × 7 L/100 × €1.19 + border road tax/insurance ≈€30 (est)', 1907, 'transport'),
      ] },  // Kasane-Maun bus ~€25 (est); car from Maun on
    ],
  },

  'gt_seed_namibia': {
    checked: '2026-10-29',
    flight_in_cost: 650,   // AMS-Windhoek, 1 connection (notes return ±€700-1,200; est)
    flight_out_cost: 620,  // Windhoek-AMS, 1 connection (est)
    blocks: [
      { code: 'NA', local: 0, extras: [
        rbExtra('Etosha park fees 3 days × (NAD 280 p.p. + NAD 60 car) ≈ €17/day (notes; days assumed)', 50, 'park_fee'),
        rbExtra('Sossusvlei/Namib-Naukluft 2 days × (NAD 150 + 50) ≈ €10/day (notes)', 20, 'park_fee'),
        rbExtra('Fish River Canyon NAD 160 + 50 (notes)', 10, 'park_fee'),
      ] },  // 4x4 in the daily rate (inDailyRate)
    ],
  },

  'gt_seed_rwanda': {
    checked: '2026-10-29',
    flight_in_cost: 500,   // AMS-Kigali direct KLM (notes return ±€800-1,000; est)
    flight_out_cost: 470,  // Kigali-AMS direct KLM (est)
    blocks: [
      { code: 'RW', local: 35, extras: [
        rbExtra('Rwanda visa on arrival/e-visa ($50)', 45, 'visa'),
      ] },  // minibuses Kigali-Musanze-Karongi-Nyungwe-Kigali (est)
    ],
  },

  'gt_seed_seychelles': {
    checked: '2026-10-29',
    flight_in_cost: 600,   // AMS-Mahé 1 stop (notes return ±€680-900; est)
    flight_out_cost: 580,  // Mahé-AMS 1 stop (est)
    blocks: [
      { code: 'SC', local: 140, extras: [
        rbExtra('Seychelles Travel Authorization (notes ~€10)', 10, 'visa'),
      ] },  // full 3-island ferry loop €130-150 (notes, midpoint)
    ],
  },

  'gt_seed_sao-tome-principe': {
    checked: '2026-10-29',
    flight_in_cost: 550,   // AMS-São Tomé via Lisbon TAP (notes return ±€700-2,500; est)
    flight_out_cost: 550,  // São Tomé-AMS via Lisbon (est)
    blocks: [
      { code: 'ST', local: 200, extras: [] },  // São Tomé-Príncipe return flight ~€200 (est; not in notes). No visa under 15 days (notes)
    ],
  },

  'gt_seed_east-africa-safari-classic': {
    checked: '2026-10-29',
    flight_in_cost: 600,   // AMS-Kilimanjaro direct KLM (notes return ±€1,050-1,500; est)
    flight_out_cost: 450,  // Nairobi-AMS direct KLM (est)
    blocks: [
      { code: 'TZ', transport: 55, local: 130, extras: [
        rbExtra('Tanzania e-visa ($50 per notes)', 45, 'visa'),
      ] },  // Kilimanjaro-Zanzibar flight ~€90 (notes: direct, several daily) + Zanzibar-Dar ferry ~€35 + Arusha-Moshi bus ~€5 (est)
      { code: 'RW', transport: 18, local: 35, extras: [
        rbExtra('Rwanda visa on arrival/e-visa ($50)', 45, 'visa'),
      ] },  // minibuses Kigali-Musanze-Karongi-Nyungwe-Kigali (est)
      { code: 'UG', transport: 35, local: 120, extras: [
        rbExtra('Uganda e-visa ($50 per file)', 45, 'visa'),
      ] },  // shuttles/minibuses Kampala-Bwindi-QENP-Kibale-Murchison-Kampala-Jinja (est); permits in the rate
      { code: 'KE', local: 150, extras: [
        rbExtra('Kenya eTA (notes $51)', 45, 'visa'),
      ] },  // matatu/shuttles Nairobi-Mara/Nakuru/Amboseli return ~€110, SGR Nairobi-Mombasa return ~€30, Nanyuki bus ~€10 (est)
    ],
  },

  'gt_seed_tanzania': {
    checked: '2026-10-29',
    flight_in_cost: 600,   // AMS-Kilimanjaro direct KLM (est)
    flight_out_cost: 600,  // Dar es Salaam-AMS 1 stop (route ends in Dar; est)
    blocks: [
      { code: 'TZ', local: 130, extras: [
        rbExtra('Tanzania e-visa ($50 per notes)', 45, 'visa'),
      ] },  // Kilimanjaro-Zanzibar flight ~€90 (notes: direct, several daily) + Zanzibar-Dar ferry ~€35 + Arusha-Moshi bus ~€5 (est)
    ],
  },

  'gt_seed_south-africa-mountain-kingdoms': {
    checked: '2026-10-29',
    flight_in_cost: 620,   // AMS-Cape Town (reuse CPT out)
    flight_out_cost: 680,  // Manzini-AMS: Airlink Eswatini-JNB ~€120 (est) + KLM JNB-AMS ~€560 (est)
    blocks: [
      { code: 'ZA', transport: 15, local: 0, extras: [] },  // car + park levies in the daily rate (carInDailyRate true)
      { code: 'LS', transport: 35, local: 40, extras: [
        rbExtra('Sani Pass guided 4x4 day tour from Durban (notes ~R3,845)', 185, 'tour'),
      ] },  // minibus taxis Maseru-Malealea-Roma-Semonkong-Sani (est)
      { code: 'SZ', local: 20, extras: [
        rbExtra('Hlane Royal NP guided game drive, 1 × €30 (notes €25-35/activity)', 30, 'activity'),
      ] },  // kombis (est)
    ],
  },

  'gt_seed_south-africa': {
    checked: '2026-10-29',
    flight_in_cost: 620,   // AMS-Cape Town (reuse CPT out)
    flight_out_cost: 560,  // Johannesburg-AMS direct KLM (notes: back via CT or JNB; route ends near JNB; est)
    blocks: [
      { code: 'ZA', local: 0, extras: [] },  // car + park levies in the daily rate (carInDailyRate true)
    ],
  },

  'gt_seed_southern-africa-safari-loop': {
    checked: '2026-10-29',
    flight_in_cost: 620,   // AMS-Cape Town (reuse CPT out)
    flight_out_cost: 600,  // Lilongwe-AMS 1 connection (notes return €600-1,250; est)
    blocks: [
      { code: 'ZA', transport: 15, local: 0, extras: [] },  // car + park levies in the daily rate (carInDailyRate true)
      { code: 'LS', transport: 35, local: 40, extras: [
        rbExtra('Sani Pass guided 4x4 day tour from Durban (notes ~R3,845)', 185, 'tour'),
      ] },  // minibus taxis Maseru-Malealea-Roma-Semonkong-Sani (est)
      { code: 'SZ', transport: 25, local: 20, extras: [
        rbExtra('Hlane Royal NP guided game drive, 1 × €30 (notes €25-35/activity)', 30, 'activity'),
      ] },  // kombis (est)
      { code: 'MZ', transport: 60, local: 375, extras: [
        rbExtra('Bazaruto Archipelago boat trip (notes €80-140, midpoint)', 110, 'tour'),
        rbExtra('Mozambique eTA (notes ~€10)', 10, 'visa'),
      ] },  // 2 domestic LAM flights (Vilankulo/Inhambane-Nampula, Nampula-Maputo) ~€350 (notes €300-400) + chapa Maputo-Inhambane-Vilankulo ~€25 (est)
      { code: 'ZW', transport: 30, local: 40, extras: [
        rbExtra('Mana Pools mandatory guided walking/canoe safari 3-4 days all-in (notes €1,300-1,650, midpoint)', 1475, 'tour'),
        rbExtra('Victoria Falls entry, Zimbabwe side (notes ~€46)', 46, 'park_fee'),
        rbExtra('Hwange NP entrance 2 days × €22 (notes ~€22/day; days assumed)', 44, 'park_fee'),
        rbExtra('Zimbabwe visa on arrival/e-visa ($30 per notes)', 27, 'visa'),
      ] },  // buses Harare-Masvingo-Bulawayo-Victoria Falls ~€40 (est); no car (route text never mentions one, rental restricted)
      { code: 'BW', transport: 60, local: 25, extras: [
        rbExtra('Chobe entrance 2 days × €19 (BWP 270/day per notes; days assumed)', 38, 'park_fee'),
        rbExtra('Car: 4x4 rental 12 days (from Maun, after Kasane/Chobe by bus + game drives) × €150 + fuel ≈920 km × 7 L/100 × €1.19 + border road tax/insurance ≈€30 (est)', 1907, 'transport'),
      ] },  // Kasane-Maun bus ~€25 (est); car from Maun on
      { code: 'NA', transport: 50, local: 0, extras: [
        rbExtra('Etosha park fees 3 days × (NAD 280 p.p. + NAD 60 car) ≈ €17/day (notes; days assumed)', 50, 'park_fee'),
        rbExtra('Sossusvlei/Namib-Naukluft 2 days × (NAD 150 + 50) ≈ €10/day (notes)', 20, 'park_fee'),
        rbExtra('Fish River Canyon NAD 160 + 50 (notes)', 10, 'park_fee'),
      ] },  // 4x4 in the daily rate (inDailyRate)
      { code: 'AO', transport: 150, local: 180, extras: [] },  // Lubango-Luanda return flight ~€180 (est; notes: Luanda is flight-only); car/driver in the rate
      { code: 'ZM', transport: 30, local: 0, extras: [
        rbExtra('Car: 4x4 rental 12 days (Lusaka-Lower Zambezi-Livingstone-South Luangwa) × €150 + fuel ≈1760 km × 7 L/100 × €1.41 + COMESA/road tax ≈€35 (est) + one-way drop Mfuwe/Chipata ≈€150 (est)', 2159, 'transport'),
        rbExtra('Local guide Zambezi town 2 days × €30 (notes €20-40/day, "recommended")', 60, 'tour', true),
      ] },  // car covers it (extra on this block); Zambia visa-free per file
      { code: 'MW', local: 45, extras: [
        rbExtra('Mount Mulanje mandatory guide 2 days × €20 (notes €15-25/day; days assumed)', 40, 'park_fee'),
        rbExtra('Malawi visa ($75 per file; notes say ~€45 e-visa)', 65, 'visa'),
      ] },  // shuttles/minibuses Lilongwe-Cape Maclear-Liwonde-Zomba-Mulanje (est); Liwonde fee in the rate (notes)
    ],
  },

  'gt_seed_zambia-malawi': {
    checked: '2026-10-29',
    flight_in_cost: 600,   // AMS-Lusaka 1 connection (notes return ±€600-1,250; est)
    flight_out_cost: 600,  // Lilongwe-AMS 1 connection (est)
    blocks: [
      { code: 'ZM', transport: 30, local: 0, extras: [
        rbExtra('Car: 4x4 rental 12 days (Lusaka-Lower Zambezi-Livingstone-South Luangwa) × €150 + fuel ≈1760 km × 7 L/100 × €1.41 + COMESA/road tax ≈€35 (est) + one-way drop Mfuwe/Chipata ≈€150 (est)', 2159, 'transport'),
        rbExtra('Local guide Zambezi town 2 days × €30 (notes €20-40/day, "recommended")', 60, 'tour', true),
      ] },  // car covers it (extra on this block); Zambia visa-free per file
      { code: 'MW', local: 45, extras: [
        rbExtra('Mount Mulanje mandatory guide 2 days × €20 (notes €15-25/day; days assumed)', 40, 'park_fee'),
        rbExtra('Malawi visa ($75 per file; notes say ~€45 e-visa)', 65, 'visa'),
      ] },  // shuttles/minibuses Lilongwe-Cape Maclear-Liwonde-Zomba-Mulanje (est); Liwonde fee in the rate (notes)
    ],
  },

  'gt_seed_zimbabwe': {
    checked: '2026-10-29',
    flight_in_cost: 650,   // AMS-Harare via Addis (notes return ±€700-1,000; est)
    flight_out_cost: 600,  // Victoria Falls-AMS via Addis (est)
    blocks: [
      { code: 'ZW', local: 40, extras: [
        rbExtra('Mana Pools mandatory guided walking/canoe safari 3-4 days all-in (notes €1,300-1,650, midpoint)', 1475, 'tour'),
        rbExtra('Victoria Falls entry, Zimbabwe side (notes ~€46)', 46, 'park_fee'),
        rbExtra('Hwange NP entrance 2 days × €22 (notes ~€22/day; days assumed)', 44, 'park_fee'),
        rbExtra('Zimbabwe visa on arrival/e-visa ($30 per notes)', 27, 'visa'),
      ] },  // buses Harare-Masvingo-Bulawayo-Victoria Falls ~€40 (est); no car (route text never mentions one, rental restricted)
    ],
  },
