(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};

    MyApp.MarkerRecommendKofunManager = class MarkerRecommendKofunManager {
        constructor(gaChannel, mapBoth) {
            var layerName = 'recommend_kofun';
            var url = 'geojson/01_recommend_places/kofun.geojson';
            this.coreManager = new MyApp.MarkerRecommendCoreManager(gaChannel, mapBoth, layerName, url);
        }

        async init() {
            this.coreManager.init();
        }
    };

}(this));
