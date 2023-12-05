(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};

    MyApp.MarkerRecommendKazanManager = class MarkerRecommendKazanManager {
        constructor(gaChannel, mapBoth) {
            var layerName = 'recommend_kazan';
            var url = 'geojson/01_recommend_places/kazan.geojson';
            this.coreManager = new MyApp.MarkerRecommendCoreManager(gaChannel, mapBoth, layerName, url);
        }

        async init() {
            this.coreManager.init();
        }
    };

}(this));
