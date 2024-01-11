(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};

    MyApp.FukuyamaTooltipPointManager = class FukuyamaTooltipPointManager {
        constructor(mapBoth) {
            var layerName = 'recommend_time';
            var url = 'geojson/02_recommend_paths/path_tooltip_point.geojson';
            var contentCallback = FukuyamaTooltipPointManager._buildMarkerPopupContent;
            this.coreManager = new MyApp.TooltipPointCoreManager(mapBoth, layerName, url, contentCallback);
        }

        async init() {
            this.coreManager.init();
        }

        static _buildMarkerPopupContent(properties) {
            var name = properties.tooltipName;
            var content = `
<div>${name}</div>
`;
            return content;
        }

    };

}(this));
