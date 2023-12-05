(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};

    MyApp.SearchLatLngManager = class SearchLatLngManager {
        constructor(gaChannel, mapBoth, globalState, myChannel, clickManager) {
            this.globalState = globalState;
            this.myChannel = myChannel;

            this.coreLeft = new MyApp.SearchLatLngManagerCore(gaChannel, mapBoth.mapLeft, 'left', clickManager.getCoreLeft(), myChannel);
            this.coreRight = new MyApp.SearchLatLngManagerCore(gaChannel, mapBoth.mapRight, 'right', clickManager.getCoreRight(), myChannel);
        }

        init() {
            this.coreLeft.init();
            this.coreRight.init();
            this.settingMyChannel(this.myChannel);
        }

        settingMyChannel(myChannel) {
            var self = this;
            var topicNameLeft = this.coreLeft.getTopicName();
            myChannel.subscribe(topicNameLeft, function(topicName, options) {
                var selectedLatLng = options.selectedLatLng;
                if (self.globalState.mapMode === self.globalState.const.MAP_MODE_STANDARD) {
                    self.coreRight.showLatLngInfoAndCircles(selectedLatLng);
                }
            });
            var topicNameRight = this.coreRight.getTopicName();
            myChannel.subscribe(topicNameRight, function(topicName, options) {
                var selectedLatLng = options.selectedLatLng;
                if (self.globalState.mapMode === self.globalState.const.MAP_MODE_STANDARD) {
                    self.coreLeft.showLatLngInfoAndCircles(selectedLatLng);
                }
            });
        }

    };

}(this));
