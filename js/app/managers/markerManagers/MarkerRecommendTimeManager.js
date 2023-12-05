(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};

    MyApp.MarkerRecommendTimeManager = class MarkerRecommendTimeManager {
        constructor(gaChannel, mapBoth) {
            var layerName = 'recommend_time';
            var url = 'geojson/01_recommend_places/time.geojson';
            this.coreManager = new MyApp.MarkerRecommendCoreManager(gaChannel, mapBoth, layerName, url);
        }

        async init() {
            this.coreManager.init();
        }
    };

}(this));
