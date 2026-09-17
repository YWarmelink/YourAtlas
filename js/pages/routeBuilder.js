/**
 * Route Builder — Init: the DOMContentLoaded orchestration sequence (seed calls, then migration
 * calls, in their exact original order — this order is load-bearing, see CLAUDE.md).
 * Loads fourth/last of 4 files — after Core, Content and UI have all defined their functions.
 * Split out 2026-08 for context-efficiency reasons — no logic changes, pure relocation.
 */

document.addEventListener('DOMContentLoaded', async () => {
  rbRoutes = rbLoad();
  rbLibrary = rbLoadLibrary();
  rbSeedPredefinedExpeditions();
  rbSeedMEAExpedition();
  rbSeedAncientCivilizationsExpedition();
  rbSeedArcticCircleExpedition();
  rbSeedPatagoniaAntarcticaExpedition();
  rbSeedHimalayaIndiaExpedition();
  rbSeedNorthAmericaExpedition();
  rbSeedOceaniaExpedition();
  rbSeedCaribbeanExpedition();
  rbSeedWestCentralAfricaExpedition();
  rbSeedCentralEuropeRoadtripExpedition();
  rbSeedBritishIslesExpedition();
  rbSeedEurasiaSplitExpeditions();
  rbSeedPanAmericanSplitExpeditions();
  rbSeedAfricaSplitExpeditions();
  rbSeedMediterraneanSplitExpeditions();
  rbSeedNordicArcticSplitExpeditions();
  rbSeedPatagoniaSplitExpeditions();
  rbSeedHimalayaSplitExpeditions();
  rbSeedNorthAmericaSplitExpeditions();
  rbSeedOceaniaSplitExpeditions();
  rbSeedCaribbeanSplitExpeditions();
  rbSeedWestCentralAfricaSplitExpeditions();
  rbSeedStandaloneCountryRoutes();
  rbSeedStandaloneCountryRoutesBatch2();
  rbSeedStandaloneCountryRoutesBatch3();
  rbSeedStandaloneCountryRoutesBatch4();
  rbSeedStandaloneCountryRoutesBatch5();
  rbSeedStandaloneCountryRoutesBatch6();
  rbSeedStandaloneCountryRoutesBatch7();
  rbSeedStandaloneCountryRoutesBatch8();
  rbSeedStandaloneCountryRoutesBatch9();
  rbSeedCentralAsiaFurtherSplitRoutes();
  rbSeedComboBatch7();
  rbSeedDolomitesNorthItalyRoute();
  rbSeedUSLooseTrips();
  rbSeedTripsSheetWishlistReplacements();
  rbSeedEuropaBeneluxRoutes();
  rbSeedEuropaGermanyRoutes();
  rbSeedEuropaAustriaSwitzerlandRoutes();
  rbSeedEuropaFranceRoutes();
  rbSeedEuropaItalyRoutes();
  rbSeedEuropaMicrostatesRoutes();
  rbSeedEuropaSpainRoutes();
  rbSeedEuropaAndorraPortugalRoutes();
  rbSeedEuropaCroatiaSloveniaRoutes();
  rbSeedEuropaBosniaMontenegroAlbaniaRoutes();
  rbSeedEuropaSerbiaNorthMacedoniaKosovoRoutes();
  rbSeedEuropaRomaniaBulgariaMoldovaRoutes();
  rbSeedEuropaHungaryCzechiaRoutes();
  rbSeedEuropaSlovakiaPolandRoutes();
  rbSeedEuropaGreeceCyprusTurkeyRoutes();
  rbSeedEuropaNorwaySwedenRoutes();
  rbSeedEuropaDenmarkFinlandRoutes();
  rbSeedEuropaFaroeIcelandRoutes();
  rbSeedEuropaIrelandScotlandRoutes();
  rbSeedEuropaEnglandWalesNorthernIrelandRoutes();
  rbSeedEuropaBalticStatesRoutes();
  rbSeedEuropaMadeiraAzoresRoutes();
  rbSeedEuropaCanaryBalearicRoutes();
  rbSeedEuropaSicilySardiniaRoutes();
  rbSeedEuropaGreekIslandsRoutes();
  rbSeedEuropaChannelIslandsIoMRoutes();
  rbSeedEuropaComboIberiaRoutes();
  rbSeedEuropaComboBalkanRoutes();
  rbSeedEuropaComboCentralRoutes();
  rbSeedEuropaComboAlpsRoutes();
  rbSeedEuropaComboNordicPyreneesRoutes();
  rbSeedEuropaComboGrandRoutes();
  rbMigrateLonghaulBuffer();
  rbMigrateExpeditionRenames();
  rbMigrateExpeditionEmojiNames();
  rbMigrateAncientToMediterranean();
  rbPatchExpeditionContent();
  rbMigrateTimeAuditCorrections();
  rbMigrateBudgetAndRegionCorrections();
  rbMigrateEurasiaCountryChanges();
  rbMigrateOceaniaExpeditionBuild();
  rbMigrateCaribbeanAmazonBuild();
  rbMigrateWestCentralAfricaBuild();
  rbMigrateAngolaIntoAfricaGrandTour();
  rbMigrateBahrainIntoMediterraneanExpedition();
  rbMigrateAfricaGrandTourReorder();
  rbMigratePriceVerificationRound1();
  rbMigratePriceVerificationRound2();
  rbMigratePriceVerificationRound3();
  rbMigrateRouteLineCoords();
  rbMigrateRouteLineCoordsRound2();
  rbMigrateEurasiaRouteOverhaul();
  rbMigratePatagoniaRouteLogicOverhaul();
  rbMigrateHimalayaRouteLogicOverhaul();
  rbMigrateNordicArcticRouteLogicOverhaul();
  rbMigrateCaribbeanAmazonRouteLogicOverhaul();
  rbMigrateCentralEuropeRouteLogicOverhaul();
  rbMigrateCentralEuropeanRoadtripEnglish();
  rbMigrateEurasiaFamilyEnglish();
  rbMigratePatagoniaAntarcticaEnglish();
  rbMigrateIndiaHimalayaEnglish();
  rbMigrateNordicArcticEnglish();
  rbMigrateBritishIslesRouteLogicOverhaul();
  rbMigrateNorthAmericaRouteLogicOverhaul();
  rbMigrateAlaskaAddition();
  rbMigrateWestCentralAfricaRouteLogicOverhaul();
  rbMigrateOceaniaRouteLogicOverhaul();
  rbMigratePanAmericanRouteLogicOverhaul();
  rbMigratePanAmericanFamilyEnglish();
  rbMigrateMediterraneanRouteLogicOverhaul();
  rbMigrateAfricaGrandTourRouteLogicOverhaul();
  rbMigrateAfricaGrandTourFamilyEnglish();
  rbMigrateSplitRouteEntryNotes();
  rbMigrateReplaceKazakhstanTajikistanCombo();
  rbMigrateMediterraneanFamilyEnglish();
  rbMigrateCaribbeanAmazonFamilyEnglish();
  rbMigrateBritishIslesFamilyEnglish();
  rbMigrateWestCentralAfricaFamilyEnglish();
  rbMigrateNorthAmericaFamilyEnglish();
  rbMigrateOceaniaFamilyEnglish();
  rbMigrateFaroeHikingDestination();
  rbMigrateRemoveSimilarityReviewDuplicates();
  rbMigrateStandaloneCountryRoutesEnglish();
  rbMigrateDraftVerificationTier2Batch1();
  rbMigrateDraftVerificationTier2Batch2();
  rbMigrateDraftVerificationTier3();
  rbMigrateDraftVerificationTier1();
  rbMigrateDutchAuditStandaloneEnglish();
  rbMigrateFixNepalEntryNotesRegression();
  rbMigrateJordanDestinationNotes();
  rbMigrateJordanDestinationNotesShared();
  rbMigrateEurasiaDestinationNotes();
  rbMigrateAfricaDestinationNotes();
  rbMigrateMediterraneanDestinationNotes();
  rbMigratePanAmericanDestinationNotes();
  rbMigrateOceaniaDestinationNotes();
  rbMigrateCaribbeanAmazonDestinationNotes();
  rbMigrateBritishIslesDestinationNotes();
  rbMigrateWestCentralAfricaDestinationNotes();
  rbMigrateAustriaSloveniaCroatiaDestinationNotes();
  rbMigratePatagoniaAntarcticaDestinationNotes();
  rbMigrateNorthAmericaDestinationNotes();
  rbMigrateCroatiaMontenegroBosniaDestinationNotes();
  rbMigrateNordicBalticDestinationNotes();
  rbMigrateCentralEuropeanRoadtripDestinationNotes();
  rbMigrateNordicArcticDestinationNotes();
  rbMigrateCycladesDestinationNotes();
  rbMigrateSicilyRoadtripDestinationNotes();
  rbMigrateIndiaHimalayaDestinationNotes();
  rbMigrateCzechiaAustriaHungaryDestinationNotes();
  rbMigrateGermanyAustriaItalyDestinationNotes();
  rbMigrateGrandBalkanRoadtripDestinationNotes();
  rbMigrateAzoresDestinationNotes();
  rbMigrateBalearicDestinationNotes();
  rbMigrateItalyRoadtripDestinationNotes();

  // Must run after every migration above (needs route.name fully settled) and before the
  // Sheet merge below (needs route.id already deterministic) — see its own doc comment.
  rbMigrateDeterministicSeedIds();

  // Sheet as source of truth once reachable, localStorage as offline fallback — same
  // resilience pattern map.js uses. A route already synced to the Sheet overrides its
  // seeded/migrated localStorage version; a route not yet in the Sheet (nothing's been
  // pushed there yet, or it's brand new) just stays as-is. See ROUTE_BUILDER_SYNC.md.
  try {
    const sheetRoutes = await dataService.getGrandTripsFull();
    if (sheetRoutes.length) {
      const sheetIds = new Set(sheetRoutes.map(r => r.id));
      const localOnly = rbRoutes.filter(r => !sheetIds.has(r.id));
      rbRoutes = [...sheetRoutes, ...localOnly];
      rbSave();

      // Auto-push routes that only exist locally — freshly seeded via a new
      // rbBuild*Route()/rbSeed*() added to routeBuilderContent.js (rbSave() with no id, used
      // by every seed function, only writes localStorage, it never pushes) or a local edit
      // that never made it up. Safe to repeat on every load: rbPushGrandTripToSheet upserts by
      // the route's deterministic id (rbMigrateDeterministicSeedIds has already run by this
      // point), and once a route round-trips through the Sheet it'll show up in sheetIds next
      // load and stop being pushed here. See ROUTE_BUILDER_SYNC.md and the
      // scripts/sync_new_routes_to_sheet.js one-off tool for pushing a batch immediately
      // instead of waiting for a browser to load this page.
      localOnly.forEach(route => rbPushGrandTripToSheet(route));
    }
  } catch (_) {
    // Sheet unreachable — keep the seeded/migrated localStorage state as-is.
  }

  rbBindEvents();

  try {
    const countries = await dataService.getCountriesVisited();
    rbCountryOptions = countries
      .filter(c => c.country_code && c.country_name)
      .map(c => ({ code: c.country_code, name: c.country_name }))
      .sort((a, b) => a.name.localeCompare(b.name));
    rbCountryDetails = {};
    countries.forEach(c => { if (c.country_code) rbCountryDetails[c.country_code] = c; });
  } catch (_) {
    rbCountryOptions = [];
    rbCountryDetails = {};
  }

  await rbLoadTaxonomy();
  rbInitFilterPanel();

  document.getElementById('rbLoading').hidden = true;
  rbShowList();

  const openId = getURLParam('open');
  if (openId && rbRoutes.some(r => r.id === openId)) {
    rbCurrentId = openId;
    rbShowEditor();
  }
});
