/**
 * Route Builder — Core: state, config, migration/seed flags, shared cross-cutting helpers.
 * Loads first of 4 files (see routeBuilderContent.js, routeBuilderUI.js, routeBuilder.js).
 * Split out 2026-08 for context-efficiency reasons — no logic changes, pure relocation.
 */

const RB_STORAGE_KEY = 'atlas_grand_trips';
const RB_LIBRARY_KEY = 'atlas_route_blocks_library';
const RB_SEED_FLAG_KEY = 'atlas_grand_trips_seeded_v1';
const RB_SEED_FLAG_KEY_MEA = 'atlas_grand_trips_seeded_mea_v1';
const RB_SEED_FLAG_KEY_ANCIENT = 'atlas_grand_trips_seeded_ancient_v1';
const RB_SEED_FLAG_KEY_ARCTIC = 'atlas_grand_trips_seeded_arctic_v1';
const RB_SEED_FLAG_KEY_PATAGONIA = 'atlas_grand_trips_seeded_patagonia_v1';
const RB_SEED_FLAG_KEY_HIMALAYA = 'atlas_grand_trips_seeded_himalaya_v1';
const RB_SEED_FLAG_KEY_NORTHAMERICA = 'atlas_grand_trips_seeded_northamerica_v1';
const RB_SEED_FLAG_KEY_OCEANIA = 'atlas_grand_trips_seeded_oceania_v1';
const RB_SEED_FLAG_KEY_CARIBBEAN = 'atlas_grand_trips_seeded_caribbean_v1';
const RB_SEED_FLAG_KEY_WCAFRICA = 'atlas_grand_trips_seeded_wcafrica_v1';
const RB_SEED_FLAG_KEY_CEROADTRIP = 'atlas_grand_trips_seeded_ceroadtrip_v1';
const RB_SEED_FLAG_KEY_BRITISHISLES = 'atlas_grand_trips_seeded_britishisles_v1';
const RB_SEED_FLAG_KEY_EURASIA_SPLIT = 'atlas_grand_trips_seeded_eurasia_split_v1';
const RB_SEED_FLAG_KEY_PANAM_SPLIT = 'atlas_grand_trips_seeded_panam_split_v1';
const RB_SEED_FLAG_KEY_AFRICA_SPLIT = 'atlas_grand_trips_seeded_africa_split_v1';
const RB_SEED_FLAG_KEY_MEDITERRANEAN_SPLIT = 'atlas_grand_trips_seeded_mediterranean_split_v1';
const RB_SEED_FLAG_KEY_NORDIC_ARCTIC_SPLIT = 'atlas_grand_trips_seeded_nordic_arctic_split_v1';
const RB_SEED_FLAG_KEY_PATAGONIA_SPLIT = 'atlas_grand_trips_seeded_patagonia_split_v1';
const RB_SEED_FLAG_KEY_HIMALAYA_SPLIT = 'atlas_grand_trips_seeded_himalaya_split_v1';
const RB_SEED_FLAG_KEY_NORTHAMERICA_SPLIT = 'atlas_grand_trips_seeded_northamerica_split_v1';
const RB_SEED_FLAG_KEY_OCEANIA_SPLIT = 'atlas_grand_trips_seeded_oceania_split_v1';
const RB_SEED_FLAG_KEY_CARIBBEAN_SPLIT = 'atlas_grand_trips_seeded_caribbean_split_v1';
const RB_SEED_FLAG_KEY_WCAFRICA_SPLIT = 'atlas_grand_trips_seeded_wcafrica_split_v1';
const RB_MIGRATE_FLAG_2026_07 = 'atlas_grand_trips_migrate_2026_07_v1';
const RB_MIGRATE_FLAG_2026_07_EMOJI = 'atlas_grand_trips_migrate_2026_07_emoji_v1';
const RB_MIGRATE_FLAG_2026_07_MEDITERRANEAN = 'atlas_grand_trips_migrate_2026_07_mediterranean_v1';
const RB_CONTENT_PATCH_FLAG = 'atlas_grand_trips_content_patch_v1';
const RB_MIGRATE_FLAG_2026_07_TIMEAUDIT = 'atlas_grand_trips_migrate_2026_07_timeaudit_v1';
const RB_MIGRATE_FLAG_2026_07_BUDGET_REGIONS = 'atlas_grand_trips_migrate_2026_07_budget_regions_v1';
const RB_MIGRATE_FLAG_2026_07_EURASIA_COUNTRIES = 'atlas_grand_trips_migrate_2026_07_eurasia_countries_v1';
const RB_MIGRATE_FLAG_2026_07_OCEANIA_BUILD = 'atlas_grand_trips_migrate_2026_07_oceania_build_v1';
const RB_MIGRATE_FLAG_2026_07_CARIBBEAN_AMAZON_BUILD = 'atlas_grand_trips_migrate_2026_07_caribbean_amazon_build_v1';
const RB_MIGRATE_FLAG_2026_07_WCAFRICA_BUILD = 'atlas_grand_trips_migrate_2026_07_wcafrica_build_v1';
const RB_MIGRATE_FLAG_2026_07_ANGOLA_ADDITION = 'atlas_grand_trips_migrate_2026_07_angola_addition_v1';
const RB_MIGRATE_FLAG_2026_07_BAHRAIN_ADDITION = 'atlas_grand_trips_migrate_2026_07_bahrain_addition_v1';
const RB_MIGRATE_FLAG_2026_07_AFRICA_REORDER = 'atlas_grand_trips_migrate_2026_07_africa_reorder_v1';
const RB_MIGRATE_FLAG_2026_07_PRICE_VERIFICATION_ROUND1 = 'atlas_grand_trips_migrate_2026_07_price_verification_round1_v1';
const RB_MIGRATE_FLAG_2026_07_PRICE_VERIFICATION_ROUND2 = 'atlas_grand_trips_migrate_2026_07_price_verification_round2_v1';
const RB_MIGRATE_FLAG_2026_07_PRICE_VERIFICATION_ROUND3 = 'atlas_grand_trips_migrate_2026_07_price_verification_round3_v1';
const RB_MIGRATE_FLAG_2026_07_ROUTE_LINE_COORDS = 'atlas_grand_trips_migrate_2026_07_route_line_coords_v1';
const RB_MIGRATE_FLAG_2026_07_ROUTE_LINE_COORDS_ROUND2 = 'atlas_grand_trips_migrate_2026_07_route_line_coords_round2_v1';
const RB_MIGRATE_FLAG_2026_08_EURASIA_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_eurasia_overhaul_v2';
const RB_MIGRATE_FLAG_2026_08_PATAGONIA_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_patagonia_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_HIMALAYA_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_himalaya_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_NORDIC_ARCTIC_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_nordic_arctic_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_CARIBBEAN_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_caribbean_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_CENTRAL_EUROPE_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_central_europe_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_BRITISH_ISLES_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_british_isles_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_NORTH_AMERICA_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_north_america_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_WEST_CENTRAL_AFRICA_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_west_central_africa_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_OCEANIA_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_oceania_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_PANAMERICAN_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_panamerican_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_MEDITERRANEAN_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_mediterranean_overhaul_v2';
const RB_MIGRATE_FLAG_2026_08_AFRICA_OVERHAUL = 'atlas_grand_trips_migrate_2026_08_africa_overhaul_v1';
const RB_MIGRATE_FLAG_2026_08_SPLIT_ENTRY_NOTES = 'atlas_grand_trips_migrate_2026_08_split_entry_notes_v1';
const RB_MIGRATE_FLAG_2026_08_UZ_TJ_SWAP = 'atlas_grand_trips_migrate_2026_08_uz_tj_swap_v1';
const RB_SEED_FLAG_KEY_STANDALONE_COUNTRIES = 'atlas_grand_trips_seeded_standalone_countries_v1';
const RB_SEED_FLAG_KEY_STANDALONE_COUNTRIES_BATCH2 = 'atlas_grand_trips_seeded_standalone_countries_batch2_v1';
const RB_MIGRATE_FLAG_2026_08_LONGHAUL_BUFFER = 'atlas_grand_trips_migrate_2026_08_longhaul_buffer_v1';
const RB_SEED_FLAG_KEY_STANDALONE_COUNTRIES_BATCH3 = 'atlas_grand_trips_seeded_standalone_countries_batch3_v1';
const RB_SEED_FLAG_KEY_STANDALONE_COUNTRIES_BATCH4 = 'atlas_grand_trips_seeded_standalone_countries_batch4_v1';
const RB_SEED_FLAG_KEY_STANDALONE_COUNTRIES_BATCH5 = 'atlas_grand_trips_seeded_standalone_countries_batch5_v1';
const RB_SEED_FLAG_KEY_STANDALONE_COUNTRIES_BATCH6 = 'atlas_grand_trips_seeded_standalone_countries_batch6_v1';
const RB_SEED_FLAG_KEY_STANDALONE_COUNTRIES_BATCH7 = 'atlas_grand_trips_seeded_standalone_countries_batch7_v1';
const RB_SEED_FLAG_KEY_STANDALONE_COUNTRIES_BATCH8 = 'atlas_grand_trips_seeded_standalone_countries_batch8_v1';
const RB_SEED_FLAG_KEY_STANDALONE_COUNTRIES_BATCH9 = 'atlas_grand_trips_seeded_standalone_countries_batch9_v1';
const RB_SEED_FLAG_KEY_CENTRAL_ASIA_FURTHER_SPLIT = 'atlas_grand_trips_seeded_central_asia_further_split_v1';
const RB_SEED_FLAG_KEY_COMBO_BATCH7 = 'atlas_grand_trips_seeded_combo_batch7_v1';
const RB_SEED_FLAG_KEY_DOLOMITES_NORTH_ITALY = 'atlas_grand_trips_seeded_dolomites_north_italy_v1';
const RB_SEED_FLAG_KEY_US_LOOSE_TRIPS = 'atlas_grand_trips_seeded_us_loose_trips_v1';
const RB_SEED_FLAG_KEY_TRIPS_WISHLIST_REPLACEMENTS = 'atlas_grand_trips_seeded_trips_wishlist_replacements_v1';
const RB_MIGRATE_FLAG_2026_08_ALASKA_ADDITION = 'atlas_grand_trips_migrate_2026_08_alaska_addition_v1';
const RB_MIGRATE_FLAG_2026_08_CENTRAL_EUROPEAN_ENGLISH = 'atlas_grand_trips_migrate_2026_08_central_european_english_v1';
const RB_MIGRATE_FLAG_2026_08_EURASIA_ENGLISH = 'atlas_grand_trips_migrate_2026_08_eurasia_english_v1';
const RB_MIGRATE_FLAG_2026_08_PATAGONIA_ANTARCTICA_ENGLISH = 'atlas_grand_trips_migrate_2026_08_patagonia_antarctica_english_v1';
const RB_MIGRATE_FLAG_2026_08_INDIA_HIMALAYA_ENGLISH = 'atlas_grand_trips_migrate_2026_08_india_himalaya_english_v1';
const RB_MIGRATE_FLAG_2026_08_NORDIC_ARCTIC_ENGLISH = 'atlas_grand_trips_migrate_2026_08_nordic_arctic_english_v1';
const RB_MIGRATE_FLAG_2026_08_PANAMERICAN_ENGLISH = 'atlas_grand_trips_migrate_2026_08_panamerican_english_v1';
const RB_MIGRATE_FLAG_2026_08_AFRICA_GRAND_TOUR_ENGLISH = 'atlas_grand_trips_migrate_2026_08_africa_grand_tour_english_v1';
const RB_MIGRATE_FLAG_2026_08_MEDITERRANEAN_ENGLISH = 'atlas_grand_trips_migrate_2026_08_mediterranean_english_v1';
const RB_MIGRATE_FLAG_2026_08_CARIBBEAN_AMAZON_ENGLISH = 'atlas_grand_trips_migrate_2026_08_caribbean_amazon_english_v1';
const RB_MIGRATE_FLAG_2026_08_BRITISH_ISLES_ENGLISH = 'atlas_grand_trips_migrate_2026_08_british_isles_english_v1';
const RB_MIGRATE_FLAG_2026_08_WEST_CENTRAL_AFRICA_ENGLISH = 'atlas_grand_trips_migrate_2026_08_west_central_africa_english_v1';
const RB_MIGRATE_FLAG_2026_08_NORTH_AMERICA_ENGLISH = 'atlas_grand_trips_migrate_2026_08_north_america_english_v1';
const RB_MIGRATE_FLAG_2026_08_OCEANIA_ENGLISH = 'atlas_grand_trips_migrate_2026_08_oceania_english_v1';
const RB_SEED_FLAG_KEY_EUROPA_BENELUX = 'atlas_grand_trips_seeded_europa_benelux_v1';
const RB_MIGRATE_FLAG_2026_08_FAROE_HIKING_DEST = 'atlas_grand_trips_migrate_2026_08_faroe_hiking_dest_v1';
const RB_SEED_FLAG_KEY_EUROPA_GERMANY = 'atlas_grand_trips_seeded_europa_germany_v1';
const RB_SEED_FLAG_KEY_EUROPA_AUSTRIA_SWITZERLAND = 'atlas_grand_trips_seeded_europa_austria_switzerland_v1';
const RB_SEED_FLAG_KEY_EUROPA_FRANCE = 'atlas_grand_trips_seeded_europa_france_v1';
const RB_SEED_FLAG_KEY_EUROPA_ITALY = 'atlas_grand_trips_seeded_europa_italy_v1';
const RB_SEED_FLAG_KEY_EUROPA_MICROSTATES = 'atlas_grand_trips_seeded_europa_microstates_v1';
const RB_SEED_FLAG_KEY_EUROPA_SPAIN = 'atlas_grand_trips_seeded_europa_spain_v1';
const RB_SEED_FLAG_KEY_EUROPA_ANDORRA_PORTUGAL = 'atlas_grand_trips_seeded_europa_andorra_portugal_v1';
const RB_SEED_FLAG_KEY_EUROPA_CROATIA_SLOVENIA = 'atlas_grand_trips_seeded_europa_croatia_slovenia_v1';
const RB_SEED_FLAG_KEY_EUROPA_BOSNIA_MONTENEGRO_ALBANIA = 'atlas_grand_trips_seeded_europa_bosnia_montenegro_albania_v1';
const RB_SEED_FLAG_KEY_EUROPA_SERBIA_NMACEDONIA_KOSOVO = 'atlas_grand_trips_seeded_europa_serbia_nmacedonia_kosovo_v1';
const RB_SEED_FLAG_KEY_EUROPA_ROMANIA_BULGARIA_MOLDOVA = 'atlas_grand_trips_seeded_europa_romania_bulgaria_moldova_v1';
const RB_SEED_FLAG_KEY_EUROPA_HUNGARY_CZECHIA = 'atlas_grand_trips_seeded_europa_hungary_czechia_v1';
const RB_SEED_FLAG_KEY_EUROPA_SLOVAKIA_POLAND = 'atlas_grand_trips_seeded_europa_slovakia_poland_v1';
const RB_SEED_FLAG_KEY_EUROPA_GREECE_CYPRUS_TURKEY = 'atlas_grand_trips_seeded_europa_greece_cyprus_turkey_v1';
const RB_SEED_FLAG_KEY_EUROPA_NORWAY_SWEDEN = 'atlas_grand_trips_seeded_europa_norway_sweden_v1';
const RB_SEED_FLAG_KEY_EUROPA_DENMARK_FINLAND = 'atlas_grand_trips_seeded_europa_denmark_finland_v1';
const RB_SEED_FLAG_KEY_EUROPA_FAROE_ICELAND = 'atlas_grand_trips_seeded_europa_faroe_iceland_v1';
const RB_SEED_FLAG_KEY_EUROPA_IRELAND_SCOTLAND = 'atlas_grand_trips_seeded_europa_ireland_scotland_v1';
const RB_SEED_FLAG_KEY_EUROPA_ENGLAND_WALES_NIRELAND = 'atlas_grand_trips_seeded_europa_england_wales_nireland_v1';
const RB_SEED_FLAG_KEY_EUROPA_BALTIC_STATES = 'atlas_grand_trips_seeded_europa_baltic_states_v1';
const RB_SEED_FLAG_KEY_EUROPA_MADEIRA_AZORES = 'atlas_grand_trips_seeded_europa_madeira_azores_v1';
const RB_SEED_FLAG_KEY_EUROPA_CANARY_BALEARIC = 'atlas_grand_trips_seeded_europa_canary_balearic_v1';
const RB_SEED_FLAG_KEY_EUROPA_SICILY_SARDINIA = 'atlas_grand_trips_seeded_europa_sicily_sardinia_v1';
const RB_SEED_FLAG_KEY_EUROPA_GREEK_ISLANDS = 'atlas_grand_trips_seeded_europa_greek_islands_v1';
const RB_SEED_FLAG_KEY_EUROPA_CHANNEL_ISLANDS_IOM = 'atlas_grand_trips_seeded_europa_channel_islands_iom_v1';
const RB_SEED_FLAG_KEY_EUROPA_COMBO_IBERIA = 'atlas_grand_trips_seeded_europa_combo_iberia_v1';
const RB_SEED_FLAG_KEY_EUROPA_COMBO_BALKAN = 'atlas_grand_trips_seeded_europa_combo_balkan_v1';
const RB_SEED_FLAG_KEY_EUROPA_COMBO_CENTRAL = 'atlas_grand_trips_seeded_europa_combo_central_v1';
const RB_SEED_FLAG_KEY_EUROPA_COMBO_ALPS = 'atlas_grand_trips_seeded_europa_combo_alps_v1';
const RB_SEED_FLAG_KEY_EUROPA_COMBO_NORDIC_PYRENEES = 'atlas_grand_trips_seeded_europa_combo_nordic_pyrenees_v1';
const RB_SEED_FLAG_KEY_EUROPA_COMBO_GRAND = 'atlas_grand_trips_seeded_europa_combo_grand_v1';
const RB_SEED_FLAG_KEY_EAST_SE_ASIA_GRAND = 'atlas_grand_trips_seeded_east_se_asia_grand_v1';
const RB_MIGRATE_FLAG_2026_08_SIMILARITY_REVIEW_CLEANUP = 'atlas_grand_trips_migrate_2026_08_similarity_review_cleanup_v1';
const RB_MIGRATE_FLAG_2026_08_STANDALONE_COUNTRIES_ENGLISH = 'atlas_grand_trips_migrate_2026_08_standalone_countries_english_v1';
const RB_MIGRATE_FLAG_2026_09_DRAFT_VERIFICATION_TIER2_BATCH1 = 'atlas_grand_trips_migrate_2026_09_draft_verification_tier2_batch1_v1';
const RB_MIGRATE_FLAG_2026_09_DRAFT_VERIFICATION_TIER2_BATCH2 = 'atlas_grand_trips_migrate_2026_09_draft_verification_tier2_batch2_v1';
const RB_MIGRATE_FLAG_2026_09_DRAFT_VERIFICATION_TIER3 = 'atlas_grand_trips_migrate_2026_09_draft_verification_tier3_v1';
const RB_MIGRATE_FLAG_2026_09_DRAFT_VERIFICATION_TIER1 = 'atlas_grand_trips_migrate_2026_09_draft_verification_tier1_v1';
const RB_MIGRATE_FLAG_2026_09_DUTCH_AUDIT_STANDALONE_ENGLISH = 'atlas_grand_trips_migrate_2026_09_dutch_audit_standalone_english_v1';
const RB_MIGRATE_FLAG_2026_09_FIX_NEPAL_ENTRY_NOTES_REGRESSION = 'atlas_grand_trips_migrate_2026_09_fix_nepal_entry_notes_regression_v1';
const RB_MIGRATE_FLAG_2026_09_JORDAN_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_jordan_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_JORDAN_DESTINATION_NOTES_SHARED = 'atlas_grand_trips_migrate_2026_09_jordan_destination_notes_shared_v1';
const RB_MIGRATE_FLAG_2026_09_EURASIA_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_eurasia_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_AFRICA_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_africa_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_MEDITERRANEAN_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_mediterranean_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_PANAM_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_panam_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_OCEANIA_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_oceania_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_CARIBBEAN_AMAZON_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_caribbean_amazon_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_BRITISH_ISLES_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_british_isles_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_WEST_CENTRAL_AFRICA_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_west_central_africa_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_AUSTRIA_SLOVENIA_CROATIA_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_austria_slovenia_croatia_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_PATAGONIA_ANTARCTICA_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_patagonia_antarctica_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_NORTH_AMERICA_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_north_america_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_CROATIA_MONTENEGRO_BOSNIA_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_croatia_montenegro_bosnia_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_NORDIC_BALTIC_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_nordic_baltic_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_CENTRAL_EUROPEAN_ROADTRIP_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_central_european_roadtrip_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_NORDIC_ARCTIC_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_nordic_arctic_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_CYCLADES_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_cyclades_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_SICILY_ROADTRIP_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_sicily_roadtrip_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_INDIA_HIMALAYA_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_india_himalaya_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_CZECHIA_AUSTRIA_HUNGARY_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_czechia_austria_hungary_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_GERMANY_AUSTRIA_ITALY_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_germany_austria_italy_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_GRAND_BALKAN_ROADTRIP_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_grand_balkan_roadtrip_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_AZORES_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_azores_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_BALEARIC_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_balearic_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_ITALY_ROADTRIP_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_italy_roadtrip_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_ROME_TUSCANY_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_rome_tuscany_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_SICILY_SOUTHERN_ITALY_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_sicily_southern_italy_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_PORTUGAL_ANDALUSIA_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_portugal_andalusia_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_SWITZERLAND_ALPINE_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_switzerland_alpine_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_FRANCE_SWITZERLAND_ITALY_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_france_switzerland_italy_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_SERBIA_MONTENEGRO_BOSNIA_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_serbia_montenegro_bosnia_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_FAROE_ICELAND_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_faroe_iceland_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_MADEIRA_PORTO_SANTO_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_madeira_porto_santo_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_CANARY_ISLANDS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_canary_islands_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_DELHI_DESTINATION_NOTE = 'atlas_grand_trips_migrate_2026_09_delhi_destination_note_v1';
const RB_MIGRATE_FLAG_2026_09_BAVARIA_BERLIN_DRESDEN_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_bavaria_berlin_dresden_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_KOSOVO_ALBANIA_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_kosovo_albania_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_ITALY_SLOVENIA_CROATIA_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_italy_slovenia_croatia_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_LUXEMBOURG_BENELUX_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_luxembourg_benelux_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_SAN_MARINO_EMILIA_ROMAGNA_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_san_marino_emilia_romagna_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_ALBANIA_CLUSTER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_albania_cluster_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_NORTH_MACEDONIA_KOSOVO_GREECE_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_north_macedonia_kosovo_greece_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_PERU_BOLIVIA_ANDES_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_peru_bolivia_andes_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_MALAYSIA_BORNEO_BRUNEI_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_malaysia_borneo_brunei_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_DOLOMITES_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_dolomites_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_PORTO_NORTHERN_SPAIN_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_porto_northern_spain_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_NORTHERN_SPAIN_ROADTRIP_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_northern_spain_roadtrip_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_LISBON_SINTRA_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_lisbon_sintra_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_MINHO_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_minho_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_ROME_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_rome_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_PORTO_CITY_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_porto_city_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_ALGARVE_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_algarve_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_CENTRAL_PORTUGAL_DOURO_ALENTEJO_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_central_portugal_douro_alentejo_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_ICELAND_CLUSTER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_iceland_cluster_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_US_NORTHEAST_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_us_northeast_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_US_SOUTHWEST_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_us_southwest_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_HAWAII_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_hawaii_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_FLORIDA_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_florida_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_SICILY_MALTA_CLUSTER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_sicily_malta_cluster_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_CORSICA_CLUSTER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_corsica_cluster_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_COTE_DAZUR_CLUSTER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_cote_dazur_cluster_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_ANDORRA_PYRENEES_CLUSTER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_andorra_pyrenees_cluster_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_MONACO_COTE_DAZUR_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_monaco_cote_dazur_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_MONACO_PROVENCE_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_monaco_provence_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_PROVENCE_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_provence_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_CORSICA_SARDINIA_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_corsica_sardinia_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_SARDINIA_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_sardinia_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_ROME_VATICAN_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_rome_vatican_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_MALTA_GOZO_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_malta_gozo_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_CENTRAL_PORTUGAL_SERRA_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_central_portugal_serra_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_ATHENS_PELOPONNESE_CLUSTER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_athens_peloponnese_cluster_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_NORTHERN_GREECE_CLUSTER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_northern_greece_cluster_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_ROMANIA_CLUSTER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_romania_cluster_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_BULGARIA_CLUSTER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_bulgaria_cluster_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_MOLDOVA_CLUSTER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_moldova_cluster_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_SCOTLAND_CLUSTER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_scotland_cluster_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_ICELAND_LEFTOVERS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_iceland_leftovers_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_IRELAND_CLUSTER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_ireland_cluster_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_IRELAND_COMBOS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_ireland_combos_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_MONACO_MONTE_CARLO_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_monaco_monte_carlo_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_ANDALUSIA_ROADTRIP_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_andalusia_roadtrip_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_CATALONIA_PYRENEES_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_catalonia_pyrenees_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_ENGLAND_WALES_NI_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_england_wales_ni_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_GALICIA_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_galicia_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_GIBRALTAR_ANDALUSIA_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_gibraltar_andalusia_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_ALSACE_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_alsace_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_PUGLIA_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_puglia_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_SPAIN_NORTH_CENTRAL_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_spain_north_central_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_SPAIN_EAST_SOUTH_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_spain_east_south_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_MONTENEGRO_ROADTRIP_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_montenegro_roadtrip_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_CYPRUS_ROADTRIP_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_cyprus_roadtrip_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_NORWAY_CLUSTER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_norway_cluster_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_ANDORRA_ARIEGE_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_andorra_ariege_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_DENMARK_SWEDEN_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_denmark_sweden_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_TENERIFE_GOMERA_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_tenerife_gomera_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_ISLE_OF_MAN_EXTRAS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_isle_of_man_extras_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_NORWAY_LEFTOVERS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_norway_leftovers_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_ASTURIAS_CANTABRIA_LEFTOVER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_asturias_cantabria_leftover_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_FRENCH_SPANISH_PYRENEES_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_french_spanish_pyrenees_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_SRI_LANKA_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_sri_lanka_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_PAPUA_NEW_GUINEA_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_papua_new_guinea_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_LOIRE_VALLEY_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_loire_valley_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_CAMPANIA_AMALFI_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_campania_amalfi_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_PROVENCE_COTE_DAZUR_LEFTOVER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_provence_cote_dazur_leftover_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_PORTUGAL_SPAIN_LEFTOVER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_portugal_spain_leftover_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_RHINE_MOSELLE_CLUSTER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_rhine_moselle_cluster_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_GRAND_EUROPEAN_ROADTRIP_LEFTOVER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_grand_european_roadtrip_leftover_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_BALTIC_STATES_ROADTRIP_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_baltic_states_roadtrip_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_FLORENCE_TUSCANY_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_florence_tuscany_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_VENICE_DOLOMITES_LEFTOVER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_venice_dolomites_leftover_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_ADRIATIC_ROADTRIP_LEFTOVER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_adriatic_roadtrip_leftover_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_PARIS_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_paris_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_FRENCH_ALPS_PROVENCE_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_french_alps_provence_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_WESTERN_CANADA_ALASKA_LEFTOVER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_western_canada_alaska_leftover_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_AUSTRIA_ALPINE_CLUSTER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_austria_alpine_cluster_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_NORMANDY_ATLANTIC_COAST_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_normandy_atlantic_coast_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_NORTHERN_ITALY_LAKES_LEFTOVER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_northern_italy_lakes_leftover_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_SPAIN_ANDORRA_CLUSTER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_spain_andorra_cluster_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_BALKAN_ALPINE_CLUSTER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_balkan_alpine_cluster_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_NORDIC_UK_CLUSTER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_nordic_uk_cluster_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_WEST_EUROPE_SMALL_ROUTES_CLUSTER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_west_europe_small_routes_cluster_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_EAST_EUROPE_CLUSTER_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_east_europe_cluster_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_MEDITERRANEAN_NORDIC_UK_CLUSTER2_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_mediterranean_nordic_uk_cluster2_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_MIXED_EUROPE_CLUSTER3_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_mixed_europe_cluster3_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_ALPINE_ADRIATIC_CLUSTER4_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_alpine_adriatic_cluster4_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_EUROPE_MIXED_CLUSTER5_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_europe_mixed_cluster5_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_SOLO_NATIONS_CLUSTER1_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_solo_nations_cluster1_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_EUROPE_TAIL_CLUSTER6_DESTINATION_NOTES = 'atlas_grand_trips_migrate_2026_09_europe_tail_cluster6_destination_notes_v1';
const RB_MIGRATE_FLAG_2026_09_DETERMINISTIC_SEED_IDS = 'atlas_grand_trips_migrate_2026_09_deterministic_seed_ids_v1';
const RB_MIGRATE_FLAG_2026_10_LONGHAUL_BUFFER_BUDGETS = 'atlas_grand_trips_migrate_2026_10_longhaul_buffer_budgets_v1';
const RB_MIGRATE_FLAG_2026_10_KUPANG_DILI = 'atlas_grand_trips_migrate_2026_10_kupang_dili_v1';
const RB_MIGRATE_FLAG_2026_10_STYLE_BUDGETS = 'atlas_grand_trips_migrate_2026_10_style_budgets_v1';
const RB_MIGRATE_FLAG_2026_10_BATCH3_ROUTE_FIXES = 'atlas_grand_trips_migrate_2026_10_batch3_route_fixes_v1';
const RB_MIGRATE_FLAG_2026_10_BATCH4_ROUTE_FIXES = 'atlas_grand_trips_migrate_2026_10_batch4_route_fixes_v1';
const RB_MIGRATE_FLAG_2026_10_BATCH56_ROUTE_FIXES = 'atlas_grand_trips_migrate_2026_10_batch56_route_fixes_v1';
const RB_MIGRATE_FLAG_2026_10_BATCH78_ROUTE_FIXES = 'atlas_grand_trips_migrate_2026_10_batch78_route_fixes_v1';
const RB_MIGRATE_FLAG_2026_10_BATCH912_ROUTE_FIXES = 'atlas_grand_trips_migrate_2026_10_batch912_route_fixes_v1';
const RB_MIGRATE_FLAG_2026_10_BATCH1320_ROUTE_FIXES = 'atlas_grand_trips_migrate_2026_10_batch1320_route_fixes_v1';
const RB_MIGRATE_FLAG_2026_10_BATCH2126_ROUTE_FIXES = 'atlas_grand_trips_migrate_2026_10_batch2126_route_fixes_v1';
const RB_MIGRATE_FLAG_2026_10_QUALITY_FIXES = 'atlas_grand_trips_migrate_2026_10_quality_fixes_v1';
const RB_MIGRATE_FLAG_2026_10_QUALITY_FIXES_B = 'atlas_grand_trips_migrate_2026_10_quality_fixes_b_v1';
const RB_MIGRATE_FLAG_2026_10_QUALITY_2B_FARES = 'atlas_grand_trips_migrate_2026_10_quality_2b_fares_v1';
// Route ids whose RB_ROUTE_COSTS entry rbMigrateApplyRouteCosts() has already applied (a list, so
// each later backfill batch still applies once to its own routes).
const RB_ROUTE_COSTS_APPLIED_KEY = 'atlas_grand_trips_route_costs_applied_v1';
const RB_BLOCK_COLORS =['#0ea5e9', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444', '#6366f1', '#f97316', '#14b8a6'];
const RB_HOME_LATLNG = [52.0907, 5.1214]; // Utrecht, NL — every expedition's implicit start/end point
const RB_WORLD_TOPOJSON_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

let rbRoutes = [];
let rbCurrentId = null;
let rbCountryOptions = []; // [{ code, name }] — pulled from the same sheet that drives the map
let rbCountryDetails = {}; // country_code -> full sheet row (visa_requirement etc.), same fetch as rbCountryOptions
let rbLibrary = [];        // [{ id, name, blocks: [{country, country_code, days, budget, notes}], created_at }]
let rbSelectedLibIds = new Set();

// ---- Trip Taxonomy (TRIP_DATABASE.csv) — see TRIP_TAXONOMY.md for the 29-field schema ----
// Powers the tag-based filter panel on the route list (README's Phase 3). A static repo file,
// not a Sheet source, so it's fetched directly rather than through dataService.
const RB_TAXONOMY_CSV_URL = 'TRIP_DATABASE.csv';
let rbTaxonomyByName = {}; // rbTaxonomyKey(trip name) -> parsed CSV row
let rbTaxonomyLoaded = false;

/**
 * Join key for matching a live route's `name` against TRIP_DATABASE.csv's `Trip Name` column.
 * A large share of the CSV's `trip_name` values were tagged before their route's trailing emoji
 * was added when it got built (e.g. CSV "Ardennes (3 days)" vs. the live route's "Ardennes (3
 * days) 🦌") — stripping the trailing emoji from both sides before comparing is what makes the
 * join actually work for those. Checked for collisions across all 447 CSV rows: none.
 */
function rbTaxonomyKey(name) {
  // \p{Extended_Pictographic} covers most emoji but not flag emoji (two \p{Regional_Indicator}
  // codepoints, e.g. 🇭🇷), which need their own class.
  return (name || '').replace(/[\s\u{FE0F}\u{200D}\p{Extended_Pictographic}\p{Regional_Indicator}]+$/gu, '').trim();
}

async function rbLoadTaxonomy() {
  try {
    const res = await fetch(RB_TAXONOMY_CSV_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = parseCSV(await res.text());
    const byName = {};
    rows.forEach(row => { if (row.trip_name) byName[rbTaxonomyKey(row.trip_name)] = row; });
    rbTaxonomyByName = byName;
    rbTaxonomyLoaded = true;
  } catch (err) {
    console.warn('[RouteBuilder] Trip Taxonomy CSV failed to load — tag filters disabled.', err);
    rbTaxonomyByName = {};
    rbTaxonomyLoaded = false;
  }
}


/** Flag emoji from an ISO alpha-2 code — works for any country, not just a curated list. */
function rbFlagFromCode(code) {
  if (!code || code.length !== 2) return '🏳️';
  const points = code.toUpperCase().split('').map(c => 127397 + c.charCodeAt(0));
  return String.fromCodePoint(...points);
}

function rbFlagFor(block) {
  if (block.country_code) return rbFlagFromCode(block.country_code);
  return getTripFlag({ trip_name: block.country, country_region: block.country });
}

// ---- storage ----

function rbLoad() {
  try {
    const raw = localStorage.getItem(RB_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

/**
 * Saves rbRoutes to localStorage (always). Pass the id of the one route that actually
 * changed to also fire a fire-and-forget sync push for it (upsert if still present in
 * rbRoutes, delete if not) — see ROUTE_BUILDER_SYNC.md. Omit it for bulk operations that
 * touch many/all routes at once (seeding, migrations) — those never push; the seeded
 * content already lives identically in source across every browser, so there's nothing
 * to sync, and pushing all ~442 routes on every fresh page load would spam the endpoint.
 */
function rbSave(changedId) {
  try { localStorage.setItem(RB_STORAGE_KEY, JSON.stringify(rbRoutes)); } catch (_) {}
  if (!changedId) return;
  const route = rbRoutes.find(r => r.id === changedId);
  if (route) rbPushGrandTripToSheet(route);
  else rbDeleteGrandTripFromSheet(changedId);
}

// ---- Google Sheet sync (see ROUTE_BUILDER_SYNC.md) ----

const RB_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzfvEBxhAUEGfxXU-jRvdE5R1oBNXWPJzP27l20-VPwZlTdij1UeoG4BrkRoi9TWT9p/exec';

/**
 * Flattens one route into the { grand_trip, regions, blocks, destinations } shape the
 * Apps Script's `grand_trip` upsert branch expects — 1:1 with the GrandTrips/
 * GrandTripRegions/GrandTripBlocks/GrandTripDestinations sheet tabs. Shared by the
 * single-route push below and the bulk "Export JSON" button in routeBuilderUI.js, so the
 * field mapping only lives in one place.
 */
/**
 * Full-cost budget fields (ROUTE_BUILDER_BUDGET_PLAN.md). A block's `budget` stays the ground
 * cost (daily rate × days) at Youri's own planning level — the "My plan" tier, NOT a reference
 * level (see RB_COST_TIERS); these hold everything the daily rate doesn't cover, also at "My plan".
 *
 * Empty means "not estimated yet" and is kept distinct from 0 ("estimated, costs nothing"):
 * numbers are '' when empty, lists/objects are null.
 *
 * Block:
 *   transport_cost        number  getting from this block to the next one
 *   transport_cost_to     string  country_code of the block transport_cost was priced to, so a
 *                                 reordered route can flag a cost that no longer matches
 *   local_transport_cost  number  intercity travel within the country (domestic flights, long trains)
 *   extras                array   [{ label, cost, category, optional }], category from RB_EXTRA_CATEGORIES
 *   costs_checked         string  "YYYY-MM-DD" the cost fields were last verified
 * Route:
 *   flight_in_cost / flight_out_cost  number  getting there from / back to NL, by whatever mode the
 *                                 route uses (flight, train, or the own-car drive to the first stop) —
 *                                 named after the common case, kept to avoid renaming Sheet columns
 *   trip_costs            object  per-route overrides for the computed trip-wide items,
 *                                 { insurance_per_month, buffer_pct }; null = global defaults
 *
 * The Sheet stores lists/objects as a JSON string in one cell (read back via parseSheetJSON()).
 */
const RB_BLOCK_COST_FIELDS = ['transport_cost', 'transport_cost_to', 'local_transport_cost', 'extras', 'costs_checked'];
const RB_ROUTE_COST_FIELDS = ['flight_in_cost', 'flight_out_cost', 'trip_costs'];
const RB_EXTRA_CATEGORIES = ['activity', 'tour', 'park_fee', 'visa', 'transport', 'other'];

const rbSheetJSON = v => (v === null || v === undefined || v === '') ? '' : JSON.stringify(v);

// Sheet row values for a block's / route's cost fields (shared by the upsert payload and the
// bulk-update scripts, so the two can't drift).
function rbBlockCostCells(b) {
  return {
    transport_cost: b.transport_cost ?? '', transport_cost_to: b.transport_cost_to || '',
    local_transport_cost: b.local_transport_cost ?? '', extras: rbSheetJSON(b.extras),
    costs_checked: b.costs_checked || '',
  };
}

function rbRouteCostCells(route) {
  return {
    flight_in_cost: route.flight_in_cost ?? '', flight_out_cost: route.flight_out_cost ?? '',
    trip_costs: rbSheetJSON(route.trip_costs),
  };
}

// Deep copy of a block's cost fields, for the Block Library save/insert copies.
function rbCopyBlockCosts(b) {
  const out = {};
  RB_BLOCK_COST_FIELDS.forEach(f => { if (b[f] !== undefined) out[f] = b[f] && typeof b[f] === 'object' ? JSON.parse(JSON.stringify(b[f])) : b[f]; });
  return out;
}

/**
 * Budget tiers are computed, never stored. "My plan" is the stored amounts as-is (Youri's own
 * planning level, which R2 found sits between backpacker and standard). The three reference tiers
 * compute ground costs absolutely, as the country's reference rate (RB_DAILY_RATES, generated from
 * data/cost_reference/daily_rates_by_country.csv) × days, not as a ratio of the stored budget.
 * `ref` names the rate column; a block without a reference row falls back to budget × `ground`.
 * The other cost types (transport, flights, extras, ...) have no reference table yet and always
 * use the multipliers: the tier totals per cost type from the Asia budget workbook
 * (planning/Wereldreis_Oost-ZO-Azie_Begroting.xlsx, Standard = "Basis"), e.g. ground
 * €12.7k / €19.4k / €32.7k → 0.65 / 1 / 1.7. Exceptions (R2d, 2026-10-28): a visa costs the same
 * at every level, and a backpacker books the same economy flight (no promo-fare discount).
 */
const RB_COST_TIERS = {
  mine:       { label: 'My plan',    ref: null,         ground: 1,    transport: 1,    flights: 1,   extras: 1,   visas: 1,   insurance: 1 },
  backpacker: { label: 'Backpacker', ref: 'backpacker', ground: 0.65, transport: 0.75, flights: 1,   extras: 0.7, visas: 1,   insurance: 0.7 },
  standard:   { label: 'Standard',   ref: 'standard',   ground: 1,    transport: 1,    flights: 1,   extras: 1,   visas: 1,   insurance: 1 },
  comfort:    { label: 'Comfort',    ref: 'comfort',    ground: 1.7,  transport: 1.5,  flights: 1.4, extras: 1.6, visas: 1,   insurance: 1.5 },
};

// Variants that are a PLACE, recognised from the block's destination names rather than its rate.
// The block gets a blend by the share of its destinations in that place: Kenya with 3 of 6 stops in
// game parks is half safari, half base rate; a block with none never gets the variant (a Chile
// block without Patagonia stops can't drift into the Patagonia row because its budget is high).
// Gorilla/chimp trekking parks aren't in the safari list: their permits are separate extras.
const RB_DAILY_RATE_PLACE_VARIANTS = {
  'Borneo (Sabah/Sarawak)': /Borneo|Sabah|Sarawak|Kuching|Kinabalu|Mulu|Kinabatangan|Sepilok|Semporna|Sipadan|Bako|Miri|Sandakan|Danum/i,
  'Patagonia': /Patagoni|Torres del Paine|Puerto Natales|Punta Arenas|El Calafate|El Chalt[eé]n|Fitz ?Roy|Perito Moreno|Ushuaia|Tierra del Fuego|Carretera Austral|Coyhaique|Ays[eé]n|Pumal[ií]n|Queulat|Cerro Castillo|R[ií]o Tranquilo|Marble Caves|Futaleuf[uú]|Caleta Tortel|Cochrane|Puerto Madryn|Pen[ií]nsula Vald[eé]s/i,
  'Galápagos': /Gal[aá]pagos|Isabela|San Crist[oó]bal Island|Santa Cruz Island|Puerto Ayora/i,
  'Cyclades islands peak': /Cyclades|Santorini|Mykonos|Naxos|Paros|Milos|\bIos\b|Folegandros|Sifnos|Tinos|Syros|Amorgos/i,
  'safari (lodge/tented camp + game drives + park fees)': /safari|game drive|Maa?sai Mara|Amboseli|Tsavo|Samburu|Lake Nakuru|Ol Pejeta|Serengeti|Ngorongoro|Tarangire|Lake Manyara|Ruaha|Selous|Nyerere|Kruger|Sabi Sand|Hluhluwe|iMfolozi|Pilanesberg|Addo|Madikwe|Etosha|Chobe|Okavango|Moremi|Savuti|Makgadikgadi|Kalahari|Nxai|Hwange|Mana Pools|Matobo|Gonarezhou|Luangwa|Lower Zambezi|Kafue|Liuwa|Liwonde|Majete|Nyika|Gorongosa|Niassa|Akagera|Queen Elizabeth|Murchison|Kidepo|Lake Mburo/i,
};

/** The reference row for a block. Place variants (above): a blend of the base and variant row by
 *  the share of the block's destinations in that place. Otherwise, of the base row and the other
 *  variants (big city, peak coast, ...), the one whose My-plan rate the budget already matches (±3%),
 *  else the one whose standard rate is closest to the block's own
 *  daily rate. A block without a budget gets the base row. Null = no row for the country.
 *  scripts/compare_daily_rates.js and scripts/r2d_style_budgets.js use this same pick. */
function rbDailyRateRow(b) {
  const rows = typeof RB_DAILY_RATES !== 'undefined' ? RB_DAILY_RATES[b.country_code] : null;
  if (!rows || !rows.length) return null;
  const pool = rows.filter(x => !RB_DAILY_RATE_PLACE_VARIANTS[x.variant]);
  const base = pool.find(x => !x.variant) || pool[0] || rows[0];
  const names = (b.destinations || []).map(d => d && d.name).filter(Boolean);
  let place = null, share = 0;
  rows.forEach(x => {
    const re = RB_DAILY_RATE_PLACE_VARIANTS[x.variant];
    const w = re && names.length ? names.filter(n => re.test(n)).length / names.length : 0;
    if (w > share) { place = x; share = w; }
  });
  if (place) {
    if (share === 1) return place;
    const mix = k => base[k] + (place[k] - base[k]) * share;
    return { variant: `${Math.round(share * 100)}% ${place.variant}`, backpacker: mix('backpacker'), standard: mix('standard'), comfort: mix('comfort') };
  }
  const days = parseInt(b.days) || 0, budget = rbCostNum(b.budget);
  if (!days || budget === null || pool.length < 2) return base;
  const rate = budget / days;
  // A budget already set to a row's My-plan rate (R2d moved big-city/peak-coast blocks to their
  // variant's style rate) belongs to that row; without this, a re-run matched them to the base row.
  const settled = pool.find(x => Math.abs(rbMyStyleDailyRate(x) - rate) <= 0.03 * rate);
  if (settled) return settled;
  return pool.reduce((a, x) => Math.abs(x.standard - rate) < Math.abs(a.standard - rate) ? x : a);
}

/**
 * Youri's own travel style as a daily rate ("My plan", decided 2026-10-28): mostly dorms, now and
 * then a private room, more often where rooms are cheap. So backpacker + a share of the step up to
 * standard: 40% in cheap countries (standard < €60/day), 30% in the middle, 20% in expensive ones
 * (> €100/day). The target a block's `budget` / days should sit near; new routes are priced at it.
 */
function rbMyStyleDailyRate(row) {
  const share = row.standard < 60 ? 0.4 : row.standard <= 100 ? 0.3 : 0.2;
  return row.backpacker + share * (row.standard - row.backpacker);
}

// Trip-wide estimates, overridable per route via route.trip_costs. Insurance only counts for trips
// longer than a regular annual travel policy covers (Dutch policies: 60-180 days per trip) — a
// shorter trip needs no separate policy. Set insurance_per_month on a route to force it.
const RB_TRIP_COST_DEFAULTS = { insurance_per_month: 100, insurance_min_days: 60, buffer_pct: 10 };

const rbCostNum = v => (v === '' || v === null || v === undefined || isNaN(v)) ? null : Number(v);

/** A block counts as costed once transport onward (not needed on the last block), local transport
 *  and the extras list (each with a price) have all been estimated — 0 / [] count, empty doesn't. */
function rbBlockCostsComplete(b, isLast) {
  return (isLast || rbCostNum(b.transport_cost) !== null)
    && rbCostNum(b.local_transport_cost) !== null
    && Array.isArray(b.extras) && b.extras.every(x => rbCostNum(x.cost) !== null);
}

/** transport_cost was priced to a country that's no longer the next block (route reordered). */
function rbTransportCostStale(blocks, i) {
  const b = blocks[i], next = blocks[i + 1];
  return !!(next && b.transport_cost_to && rbCostNum(b.transport_cost) !== null && next.country_code !== b.transport_cost_to);
}

/**
 * Full-cost breakdown of a route at one tier. `rows` are already at that tier (ground costs
 * already include the tier: reference rate × days, see RB_COST_TIERS); `optional` sums extras
 * marked optional, which are never in the total (the workbook's "Meenemen = Nee"). `hasCosts` is
 * false while nothing beyond the ground budget has been entered — callers then show the ground
 * total alone rather than a mostly-empty "all-in" one. `fallbackBlocks` counts blocks a reference
 * tier had to estimate from the stored budget (no reference row for the country).
 */
function rbRouteCosts(route, tierKey = 'mine') {
  const t = RB_COST_TIERS[tierKey] || RB_COST_TIERS.mine;
  const blocks = route.blocks || [];
  const days = blocks.reduce((s, b) => s + (parseInt(b.days) || 0), 0);
  let ground = 0, transport = 0, extras = 0, visas = 0, optional = 0, incomplete = 0, stale = 0, fallback = 0, hasCosts = false;

  blocks.forEach((b, i) => {
    const refRow = t.ref ? rbDailyRateRow(b) : null;
    const blockDays = parseInt(b.days) || 0;
    if (refRow && blockDays) ground += refRow[t.ref] * blockDays;
    else {
      if (t.ref && rbCostNum(b.budget)) fallback++;
      ground += (rbCostNum(b.budget) || 0) * t.ground;
    }
    transport += (rbCostNum(b.transport_cost) || 0) + (rbCostNum(b.local_transport_cost) || 0);
    (b.extras || []).forEach(x => {
      const c = rbCostNum(x.cost) || 0;
      if (x.optional) optional += c;
      else if (x.category === 'visa') visas += c;
      else if (x.category === 'transport') transport += c;  // e.g. a route's whole-trip car costs
      else extras += c;
    });
    if (!rbBlockCostsComplete(b, i === blocks.length - 1)) incomplete++;
    if (rbTransportCostStale(blocks, i)) stale++;
    if (rbCostNum(b.transport_cost) !== null || rbCostNum(b.local_transport_cost) !== null || Array.isArray(b.extras)) hasCosts = true;
  });

  const flightIn = rbCostNum(route.flight_in_cost), flightOut = rbCostNum(route.flight_out_cost);
  if (flightIn !== null || flightOut !== null) hasCosts = true;
  const tc = route.trip_costs || {};
  const perMonth = rbCostNum(tc.insurance_per_month) ??
    (days > RB_TRIP_COST_DEFAULTS.insurance_min_days ? RB_TRIP_COST_DEFAULTS.insurance_per_month : 0);
  const bufferPct = rbCostNum(tc.buffer_pct) ?? RB_TRIP_COST_DEFAULTS.buffer_pct;

  const rows = {
    ground,
    transport: transport * t.transport,
    flights: ((flightIn || 0) + (flightOut || 0)) * t.flights,
    extras: extras * t.extras,
    visas: visas * t.visas,
    insurance: Math.ceil(days / 30.4) * perMonth * t.insurance,
  };
  const subtotal = Object.values(rows).reduce((s, v) => s + v, 0);
  const buffer = subtotal * bufferPct / 100;
  const total = subtotal + buffer;

  return {
    tier: tierKey, days, rows, subtotal, bufferPct, buffer, total,
    perDay: days ? total / days : 0, optional: optional * t.extras,
    blockCount: blocks.length, incompleteBlocks: incomplete, staleTransport: stale, fallbackBlocks: fallback,
    flightsMissing: flightIn === null || flightOut === null, hasCosts,
    complete: incomplete === 0 && stale === 0 && flightIn !== null && flightOut !== null,
  };
}

function rbBuildGrandTripPayload(route) {
  const grand_trip = {
    grand_trip_id: route.id, name: route.name, status: route.status, start_date: route.start_date,
    description: route.description, travel_style: route.travel_style, climate_summary: route.climate_summary,
    best_starting_month: route.best_starting_month, notes: route.notes, created_at: route.created_at,
    ...rbRouteCostCells(route),
  };

  const regions = (route.regions || []).map((reg, i) => ({
    region_id: reg.id, grand_trip_id: route.id, order: i, name: reg.name,
    season: reg.season, budget: reg.budget, notes: reg.notes, collapsed: !!reg.collapsed,
  }));

  const blocks = (route.blocks || []).map((b, i) => ({
    block_id: b.id, grand_trip_id: route.id, region_id: b.region_id || '', order: i,
    country_code: b.country_code, country_name: b.country, days: b.days, budget: b.budget,
    notes: b.notes, transport_to_next: b.transport_to_next || '',
    lat: b.lat ?? '', lng: b.lng ?? '',
    ...rbBlockCostCells(b),
  }));

  const destinations = (route.blocks || []).flatMap(b => (b.destinations || []).map((d, i) => ({
    destination_id: d.id, block_id: b.id, order: i, name: d.name, notes: d.notes || '',
    country_code: b.country_code || '', country: b.country || '',
    lat: d.lat ?? '', lng: d.lng ?? '',
  })));

  return { grand_trip, regions, blocks, destinations };
}

/**
 * Routes that must never come back, filtered from both localStorage and the Sheet on every load.
 * rbMigrateRemoveSimilarityReviewDuplicates() only matched the English names, so browsers still
 * holding the pre-translation Dutch-named copies auto-pushed them into the Sheet (2026-10).
 */
const RB_REMOVED_ROUTE_IDS = new Set([
  'gt_seed_faeroer', // Faeröer 🐑 — superseded by Faroe Islands (6 days) 🐦
  'gt_seed_ijsland', // IJsland ❄️ — superseded by Iceland Ring Road (12 days) 🛣️
  'gt_test_cost_roundtrip', // scripts/verify_cost_fields_roundtrip.js --live test route, never shown
  'gt_seed_moldova-transnistria-6-days', // Moldova + Transnistria (6 days) 🍇 — Transnistria red in the Dutch advice; Youri dropped it 2026-10-29, Moldova (5 days) 🍷 covers the rest
]);

/**
 * Copies lat/lng from each local route onto its Sheet version wherever the Sheet has none.
 * Routes synced before the Sheet had lat/lng columns came back coordinate-less and wiped
 * every map view on load. Coordinates aren't editable in the UI, so the local value is
 * never stale. Blocks match by position + country_code, destinations by name within that
 * block (block/destination ids differ per browser, see handleDestinationsBulkUpdate).
 */
function rbKeepLocalCoords(sheetRoutes, localRoutes) {
  const hasCoord = o => typeof o.lat === 'number' && typeof o.lng === 'number';
  const localById = new Map(localRoutes.map(r => [r.id, r]));
  sheetRoutes.forEach(route => {
    const local = localById.get(route.id);
    if (!local) return;
    (route.blocks || []).forEach((block, i) => {
      const lb = (local.blocks || [])[i];
      if (!lb || lb.country_code !== block.country_code) return;
      if (!hasCoord(block) && hasCoord(lb)) { block.lat = lb.lat; block.lng = lb.lng; }
      const localDests = new Map((lb.destinations || []).filter(hasCoord).map(d => [d.name, d]));
      (block.destinations || []).forEach(d => {
        const ld = localDests.get(d.name);
        if (!hasCoord(d) && ld) { d.lat = ld.lat; d.lng = ld.lng; }
      });
    });
  });
}

function rbPushGrandTripToSheet(route) {
  if (!RB_APPS_SCRIPT_URL) return;
  const payload = { type: 'grand_trip', ...rbBuildGrandTripPayload(route) };
  fetch(RB_APPS_SCRIPT_URL, {
    method: 'POST', mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(payload),
  }).catch(() => {}); // offline/unreachable — localStorage already has the change, sync catches up next time it succeeds
}

function rbDeleteGrandTripFromSheet(grandTripId) {
  if (!RB_APPS_SCRIPT_URL) return;
  fetch(RB_APPS_SCRIPT_URL, {
    method: 'POST', mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ type: 'grand_trip_delete', grand_trip_id: grandTripId }),
  }).catch(() => {});
}

function rbLoadLibrary() {
  try {
    const raw = localStorage.getItem(RB_LIBRARY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

function rbSaveLibrary() {
  try { localStorage.setItem(RB_LIBRARY_KEY, JSON.stringify(rbLibrary)); } catch (_) {}
}

function rbGetCurrent() {
  return rbRoutes.find(r => r.id === rbCurrentId) || null;
}

function rbNewLibId() {
  return 'lib_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
}

function rbNewRegionId() {
  return 'rg_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
}

function rbNewDestId() {
  return 'dest_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
}

function rbNewBlockId() {
  return 'blk_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
}

/**
 * Deterministic id for a seeded (built-in) route, derived from its name — every browser
 * that seeds the same named route (identical content everywhere, from source) converges on
 * the same id, so the Google Sheet sync can recognize "this is the same route" across
 * devices instead of duplicating it. rbBuildSeedRoute()/rbBuildFlatSeedRoute() still assign
 * a throwaway random id at seed time (harmless — see rbMigrateDeterministicSeedIds() in
 * routeBuilderContent.js, which overwrites it with this one, once, after every seed/rename/
 * translation migration has settled route.name to its final value). NOT used for routes
 * made via the "New Route" button — those keep their own unique 'gt_' + Date.now() id, since
 * no other browser needs to converge on a user's own custom route.
 */
function rbSeedRouteId(name) {
  const slug = (name || '')
    .normalize('NFKD').replace(/[^\x00-\x7F]/g, '') // strip accent marks left after NFKD decomposition (and any other non-ASCII, e.g. emoji)
    .replace(/[^\w\s-]/g, '') // strip remaining punctuation (&, parens, apostrophes, ...)
    .trim().toLowerCase().replace(/\s+/g, '-')
    .slice(0, 60);
  return 'gt_seed_' + (slug || 'unnamed');
}

