(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};

    MyApp.MoveToCenterStandardManager = class MoveToCenterStandardManager {
        constructor(gaChannel, mapBoth, clickManager) {
            this.gaChannel = gaChannel;
            this.mapLeft = mapBoth.mapLeft;
            this.clickManager = clickManager;
        }

        init() {
            this._settingBtn();
        }

        _settingBtn() {
            var areaRootEl = document.querySelector('.js-move-to-center-standard-area');
            var btnEl = areaRootEl.querySelector('.js-move-to-center-btn');
            var self = this;
            btnEl.addEventListener('click', function() {
                var currentLatlng = self.clickManager.getCurrentLatlngLeft();
                if (currentLatlng) {
                    var zoom = self.mapLeft.getZoom();
                    var options = {
                    };
                    self.mapLeft.flyTo(currentLatlng, zoom, options);
                    self.gaChannel.publish('movetocenter_standard');
                }
            }, false);
        }

    };

}(this));
