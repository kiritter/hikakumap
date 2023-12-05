(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};

    MyApp.ClickManager = class ClickManager {
        constructor(mapBoth, globalState, myChannel, distanceCircleFactory, oldEditionMapIdRepo) {
            this.mapLeft = mapBoth.mapLeft;
            this.mapRight = mapBoth.mapRight;
            this.globalState = globalState;
            this.myChannel = myChannel;
            this.distanceCircleFactory = distanceCircleFactory;
            this.oldEditionMapIdRepo = oldEditionMapIdRepo;

            this.coreLeft = new MyApp.ClickManagerCore(mapBoth.mapLeft, 'left', myChannel, distanceCircleFactory, oldEditionMapIdRepo);
            this.coreRight = new MyApp.ClickManagerCore(mapBoth.mapRight, 'right', myChannel, distanceCircleFactory, oldEditionMapIdRepo);
        }

        init() {
            this.coreLeft.init();
            this.coreRight.init();
            this.settingMyChannelForCore(this.myChannel);
        }

        settingMyChannelForCore(myChannel) {
            var self = this;
            var topicNameLeft = this.coreLeft.getTopicName();
            myChannel.subscribe(topicNameLeft, function(topicName, options) {
                if (self.globalState.mapMode === self.globalState.const.MAP_MODE_STANDARD) {
                    var selectedLatLng = options.selectedLatLng;
                    self.coreRight.showLatLngInfoAndCircles(selectedLatLng);
                }
            });
            var topicNameRight = this.coreRight.getTopicName();
            myChannel.subscribe(topicNameRight, function(topicName, options) {
                if (self.globalState.mapMode === self.globalState.const.MAP_MODE_STANDARD) {
                    var selectedLatLng = options.selectedLatLng;
                    self.coreLeft.showLatLngInfoAndCircles(selectedLatLng);
                }
            });
        }


        getCoreLeft() {
            return this.coreLeft;
        }
        getCurrentLatlngLeft() {
            return this.coreLeft.getCurrentLatlng();
        }

        getCoreRight() {
            return this.coreRight;
        }
        getCurrentLatlngRight() {
            return this.coreRight.getCurrentLatlng();
        }

        showLatLngInfoAndCircles(dcLatLngLeft, dcLatLngRight) {
            this.coreLeft.showLatLngInfoAndCircles(dcLatLngLeft);
            this.coreRight.showLatLngInfoAndCircles(dcLatLngRight);
        }

    };

}(this));
