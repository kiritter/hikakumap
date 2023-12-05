(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};

    MyApp.MarkerRecommendDistanceManager = class MarkerRecommendDistanceManager {
        constructor(gaChannel, mapBoth) {
            var layerName = 'recommend_distance';
            var url = 'geojson/01_recommend_places/distance.geojson';
            this.coreManager = new MyApp.MarkerRecommendCoreManager(gaChannel, mapBoth, layerName, url);
        }

        async init() {
            this.coreManager.init();
        }
    };

}(this));
