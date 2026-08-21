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
  rbSeedCentralAsiaFurtherSplitRoutes();
  rbSeedComboBatch7();
  rbSeedDolomitesNorthItalyRoute();
  rbSeedUSLooseTrips();
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
  rbBindEvents();

  try {
    const countries = await dataService.getCountriesVisited();
    rbCountryOptions = countries
      .filter(c => c.country_code && c.country_name)
      .map(c => ({ code: c.country_code, name: c.country_name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (_) {
    rbCountryOptions = [];
  }

  document.getElementById('rbLoading').hidden = true;
  rbShowList();

  const openId = getURLParam('open');
  if (openId && rbRoutes.some(r => r.id === openId)) {
    rbCurrentId = openId;
    rbShowEditor();
  }
});
