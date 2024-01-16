(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};

    MyApp.MarkerManager = class MarkerManager {
        constructor(gaChannel, mapBoth) {

            this.markerRecommendTimeManager = new MyApp.MarkerRecommendTimeManager(gaChannel, mapBoth);
            this.markerRecommendDistanceManager = new MyApp.MarkerRecommendDistanceManager(gaChannel, mapBoth);

            this.markerRecommendKazanManager = new MyApp.MarkerRecommendKazanManager(gaChannel, mapBoth);
            this.markerRecommendWaterfallManager = new MyApp.MarkerRecommendWaterfallManager(gaChannel, mapBoth);
            this.markerRecommendKofunManager = new MyApp.MarkerRecommendKofunManager(gaChannel, mapBoth);

            this.markerRecommend100MeizanManager = new MyApp.MarkerRecommend100MeizanManager(gaChannel, mapBoth);
            this.markerRecommendDamLakeManager = new MyApp.MarkerRecommendDamLakeManager(gaChannel, mapBoth);
        }

        async init() {
            await this._initAll();
        }

        async _initAll() {
            var promiseList = [];

            promiseList.push(this.markerRecommendTimeManager.init());
            promiseList.push(this.markerRecommendDistanceManager.init());

            promiseList.push(this.markerRecommendKazanManager.init());
            promiseList.push(this.markerRecommendWaterfallManager.init());
            promiseList.push(this.markerRecommendKofunManager.init());

            promiseList.push(this.markerRecommend100MeizanManager.init());
            promiseList.push(this.markerRecommendDamLakeManager.init());

            await Promise.all(promiseList);
        }

    };

}(this));
