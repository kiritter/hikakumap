async function initMyApp(global) {

    var gaChannel = new MyApp.Ga4Channel();
    var gaRepo = new MyApp.Ga4Repo(gaChannel, global);
    gaRepo.doSubscription();

    var myChannel = new MyApp.MyChannel();

    var permanentCacheStatusRepo = new MyApp.PermanentCacheStatusRepo();
    var permanentCacheManager = new MyApp.PermanentCacheManager(gaChannel, permanentCacheStatusRepo, global.navigator, global.location);
    permanentCacheManager.init();
    var currentCacheType = await permanentCacheManager.findCurrentCacheType();

    var mapManager = new MyApp.MapManager(MyApp.configMap, currentCacheType);
    var mapBoth = mapManager.init();

    var mapDragHandler = new MyApp.MapDragHandler(global);
    mapDragHandler.init();

    var switchMapModeManager = new MyApp.SwitchMapModeManager(mapBoth, MyApp.globalState);
    switchMapModeManager.init();

    var seaSurfaceManager = new MyApp.SeaSurfaceManager(gaChannel, mapBoth, MyApp.globalState);
    seaSurfaceManager.init();

    var urlRepo = new MyApp.UrlRepo(global.location);
    var urlQueryParamRepo = urlRepo.getUrlQueryParamRepo();

    var markerRecommendTimeManager = new MyApp.MarkerRecommendTimeManager(gaChannel, mapBoth);
    markerRecommendTimeManager.init();
    var markerRecommendDistanceManager = new MyApp.MarkerRecommendDistanceManager(gaChannel, mapBoth);
    markerRecommendDistanceManager.init();
    var markerRecommendKazanManager = new MyApp.MarkerRecommendKazanManager(gaChannel, mapBoth);
    markerRecommendKazanManager.init();
    var markerRecommendWaterfallManager = new MyApp.MarkerRecommendWaterfallManager(gaChannel, mapBoth);
    markerRecommendWaterfallManager.init();
    var markerRecommendKofunManager = new MyApp.MarkerRecommendKofunManager(gaChannel, mapBoth);
    markerRecommendKofunManager.init();
    var markerRecommend100MeizanManager = new MyApp.MarkerRecommend100MeizanManager(gaChannel, mapBoth);
    markerRecommend100MeizanManager.init();
    var markerRecommendDamLakeManager = new MyApp.MarkerRecommendDamLakeManager(gaChannel, mapBoth);
    markerRecommendDamLakeManager.init();

    var distanceCircleInfoProvider = new MyApp.DistanceCircleInfoProvider(MyApp.configCircle);
    var distanceCircleFactory = new MyApp.DistanceCircleFactory(distanceCircleInfoProvider);
    var oldEditionMapIdRepo = new MyApp.OldEditionMapIdRepo(currentCacheType);
    var clickManager = new MyApp.ClickManager(mapBoth, MyApp.globalState, myChannel, distanceCircleFactory, oldEditionMapIdRepo);
    clickManager.init();

    var urlCopyManager = new MyApp.UrlCopyManager(gaChannel, mapBoth, MyApp.globalState, urlRepo, seaSurfaceManager, clickManager, global.navigator);
    urlCopyManager.init();

    var moveToCenterStandardManager = new MyApp.MoveToCenterStandardManager(gaChannel, mapBoth, clickManager);
    moveToCenterStandardManager.init();
    var moveToCenterIsolatedManager = new MyApp.MoveToCenterIsolatedManager(gaChannel, mapBoth, clickManager, switchMapModeManager);
    moveToCenterIsolatedManager.init();

    var initialSetViewManager = new MyApp.InitialSetViewManager(gaChannel, mapBoth, MyApp.globalState, urlQueryParamRepo, seaSurfaceManager, switchMapModeManager, clickManager);
    initialSetViewManager.init();

    var recommendDialogManager = new MyApp.RecommendDialogManager(gaChannel, initialSetViewManager);
    recommendDialogManager.init();
    var recommendDialogDragHandler = new MyApp.RecommendDialogDragHandler(global);
    recommendDialogDragHandler.init();

    var advancedDialogManager = new MyApp.AdvancedDialogManager(gaChannel, permanentCacheManager);
    advancedDialogManager.init();
    var advancedDialogDragHandler = new MyApp.AdvancedDialogDragHandler(global);
    advancedDialogDragHandler.init();

    var searchLatLngManager = new MyApp.SearchLatLngManager(gaChannel, mapBoth, MyApp.globalState, myChannel, clickManager);
    searchLatLngManager.init();
}

initMyApp(this);
