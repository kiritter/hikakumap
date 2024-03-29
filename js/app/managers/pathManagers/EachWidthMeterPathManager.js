(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};

    MyApp.EachWidthMeterPathManager = class EachWidthMeterPathManager {
        constructor(mapBoth, globalState, layerName, url) {
            this.mapBoth = mapBoth;
            this.globalState = globalState;
            this.layerName = layerName;

            this.list = [
                {timeRangeType: MyApp.globalState.const.TIME_RANGE_TYPE_YUSHI, url: url},
            ];

            this.coreManagerByKey = this._createCoreManagerMap();
        }

        _createCoreManagerMap() {
            var coreManagerByKey = new Map();
            var self = this;
            this.list.forEach((el) => {
                var coreManager = self._createCoreManager(el.timeRangeType, el.url);
                coreManagerByKey.set(`${el.timeRangeType}`, coreManager);
            });
            return coreManagerByKey;
        }
        _createCoreManager(targetTimeRangeType, targetUrl) {
            var layerName = this.layerName;
            var coreManager = new MyApp.WidthMeterLineCoreManager(this.mapBoth, this.globalState, layerName, targetTimeRangeType, targetUrl);
            return coreManager;
        }

        async init() {
            var promiseList = [];
            for (var [key, coreManager] of this.coreManagerByKey) {
                promiseList.push(coreManager.init());
            }
            await Promise.all(promiseList);
        }

        redraw(selectedTimeRangeType) {
            for (var [key, coreManager] of this.coreManagerByKey) {
                coreManager.clearLayers();
            }

            var currentTimeRangeType = selectedTimeRangeType;
            var targetCoreManager = this.coreManagerByKey.get(`${currentTimeRangeType}`);
            targetCoreManager.redrawLayers();
        }

    };

}(this));
