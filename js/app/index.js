async function initMyApp(global) {
    MyApp.UtilMobileDetector.init(global.matchMedia);

    var gaChannel = new MyApp.Ga4Channel();
    var gaRepo = new MyApp.Ga4Repo(gaChannel, global);
    gaRepo.doSubscription();

    var myChannel = new MyApp.MyChannel();

    MyApp.AdvancedDialogManager.settingPopupBodyHtml();
    var permanentCacheStatusRepo = new MyApp.PermanentCacheStatusRepo(MyApp.globalState);
    var permanentCacheManager = new MyApp.PermanentCacheManager(gaChannel, MyApp.globalState, permanentCacheStatusRepo, global.navigator, global.location);
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

    var pathManager = new MyApp.PathManager(gaChannel, mapBoth, MyApp.globalState, myChannel);
    pathManager.init();
    var markerManager = new MyApp.MarkerManager(gaChannel, mapBoth);
    markerManager.init();

    var prefBorderManager = new MyApp.PrefectureBorderManager(mapBoth, MyApp.globalState, myChannel);
    prefBorderManager.init();

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

    mapBoth.mapLeft.fire('overlayadd');
    mapBoth.mapRight.fire('overlayadd');
}

initMyApp(this);
