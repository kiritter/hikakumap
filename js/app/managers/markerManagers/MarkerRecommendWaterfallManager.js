(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};

    MyApp.MarkerRecommendWaterfallManager = class MarkerRecommendWaterfallManager {
        constructor(gaChannel, mapBoth) {
            var layerName = 'recommend_waterfall';
            var url = 'geojson/01_recommend_places/waterfall.geojson';
            this.coreManager = new MyApp.MarkerRecommendCoreManager(gaChannel, mapBoth, layerName, url);
        }

        async init() {
            this.coreManager.init();
        }
    };

}(this));
