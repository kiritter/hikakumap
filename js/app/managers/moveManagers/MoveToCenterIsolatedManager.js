(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};

    MyApp.MoveToCenterIsolatedManager = class MoveToCenterIsolatedManager {
        constructor(gaChannel, mapBoth, clickManager, switchMapModeManager) {
            this.gaChannel = gaChannel;
            this.mapLeft = mapBoth.mapLeft;
            this.mapRight = mapBoth.mapRight;
            this.clickManager = clickManager;
            this.switchMapModeManager = switchMapModeManager;
        }

        init() {
            this._settingBtn();
        }

        _settingBtn() {
            var areaRootEl = document.querySelector('.js-move-to-center-isolated-area');
            var btnEl = areaRootEl.querySelector('.js-move-to-center-btn');
            var self = this;
            btnEl.addEventListener('click', function() {
                var currentLatlngLeft = self.clickManager.getCurrentLatlngLeft();
                var currentLatlngRight = self.clickManager.getCurrentLatlngRight();

                if (currentLatlngLeft && currentLatlngRight) {
                }else{
                    return;
                }

                var zoom = self.mapLeft.getZoom();

                var withMinZoomControl = true;
                self.switchMapModeManager.syncIsolatedModeWithUnsync(zoom, currentLatlngLeft, currentLatlngRight, withMinZoomControl);

                self.gaChannel.publish('movetocenter_isolated');
            }, false);
        }

    };

}(this));
