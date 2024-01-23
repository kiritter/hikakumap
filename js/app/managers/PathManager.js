(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};

    MyApp.PathManager = class PathManager {
        constructor(gaChannel, mapBoth, globalState, myChannel) {
            this.mapLeft = mapBoth.mapLeft;
            this.globalState = globalState;
            this.myChannel = myChannel;

            this.pathAshidagawa1Manager = new MyApp.EachWidthMeterPathManager(mapBoth, globalState, 'recommend_time', 'geojson/02_recommend_paths/path_ashidagawa_1_main.geojson');
            this.pathAshidagawa2Manager = new MyApp.EachWidthMeterPathManager(mapBoth, globalState, 'recommend_time', 'geojson/02_recommend_paths/path_ashidagawa_2_sub.geojson');
            this.pathAshidagawaShorelineManager = new MyApp.EachPathManager(mapBoth, globalState, 'recommend_time', 'geojson/02_recommend_paths/path_ashidagawa_shoreline.geojson');

            this.pathKamogataOurai1Manager = new MyApp.EachPathManager(mapBoth, globalState, 'recommend_time', 'geojson/02_recommend_paths/path_kamogata_ourai_1_north.geojson');
            this.pathKamogataOurai2Manager = new MyApp.EachPathManager(mapBoth, globalState, 'recommend_time', 'geojson/02_recommend_paths/path_kamogata_ourai_2_south.geojson');
            this.pathOnomichiKaidoManager = new MyApp.EachPathManager(mapBoth, globalState, 'recommend_time', 'geojson/02_recommend_paths/path_onomichi_kaido.geojson');
            this.pathSaigokuKaidoManager = new MyApp.EachPathManager(mapBoth, globalState, 'recommend_time', 'geojson/02_recommend_paths/path_saigoku_kaido.geojson');
            this.pathTomotsuOuraiManager = new MyApp.EachPathManager(mapBoth, globalState, 'recommend_time', 'geojson/02_recommend_paths/path_tomotsu_ourai.geojson');

            this.fukuyamaTooltipPointManager = new MyApp.FukuyamaTooltipPointManager(mapBoth);
        }

        async init() {
            await this._initAll();


            this.settingMyChannel(this.myChannel);
        }

        async _initAll() {
            var promiseList = [];

            promiseList.push(this.pathAshidagawa1Manager.init());
            promiseList.push(this.pathAshidagawa2Manager.init());
            promiseList.push(this.pathAshidagawaShorelineManager.init());

            promiseList.push(this.pathKamogataOurai1Manager.init());
            promiseList.push(this.pathKamogataOurai2Manager.init());
            promiseList.push(this.pathOnomichiKaidoManager.init());
            promiseList.push(this.pathSaigokuKaidoManager.init());
            promiseList.push(this.pathTomotsuOuraiManager.init());

            promiseList.push(this.fukuyamaTooltipPointManager.init());

            await Promise.all(promiseList);
        }

        settingMyChannel(myChannel) {
        }

    };

}(this));
