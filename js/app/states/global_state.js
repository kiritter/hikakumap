(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};

    MyApp.globalState = {
        hasIndexedDbApi: false,
        mapMode: 1,
        seaSurfaceHeight: 4,
    };

    MyApp.globalState.const = {
        MAP_MODE_STANDARD: 1,
        MAP_MODE_ISOLATED: 2,
    };

}(this));
