(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};

    MyApp.WidthMeterLineCoreManager = class WidthMeterLineCoreManager extends MyApp.LineCoreManager {


        _createPolyline(latlngList, appliedPathOption) {
            var widthAsMeter = appliedPathOption.weight;
            appliedPathOption['corridor'] = widthAsMeter;
            delete appliedPathOption.weight;
            var polyline = L.corridor(latlngList, appliedPathOption);
            return polyline;
        }

    };

}(this));
