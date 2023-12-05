(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};

    MyApp.InitialSetViewManager = class InitialSetViewManager {
        constructor(gaChannel, mapBoth, globalState, urlQueryParamRepo, seaSurfaceManager, switchMapModeManager, clickManager) {
            this.gaChannel = gaChannel;
            this.mapBoth = mapBoth;
            this.mapLeft = mapBoth.mapLeft;
            this.mapRight = mapBoth.mapRight;
            this.globalState = globalState;
            this.urlQueryParamRepo = urlQueryParamRepo;
            this.seaSurfaceManager = seaSurfaceManager;
            this.switchMapModeManager = switchMapModeManager;
            this.clickManager = clickManager;
        }

        createWith(urlQueryParamRepo) {
            var created = new InitialSetViewManager(this.gaChannel, this.mapBoth, this.globalState, urlQueryParamRepo, this.seaSurfaceManager, this.switchMapModeManager, this.clickManager);
            return created;
        }

        init(isRecommendShow) {
            if (this.urlQueryParamRepo.hasAnyQueryParams() === false) {
                return;
            }

            var urlNormalizer = new MyApp.UrlNormalizer();
            this.urlQueryParamRepo = urlNormalizer.normalize(this.urlQueryParamRepo);

            var urlValidator = new MyApp.UrlValidator();
            var isValid = urlValidator.isValid(this.urlQueryParamRepo);
            if (isValid === false) {
                console.warn('URLが正しくありません');
                if (isRecommendShow) {
                }else{
                    this.gaChannel.publish('view_with_query_params_invalid');
                }
                return;
            }

            if (isRecommendShow) {
            }else{
                this.gaChannel.publish('view_with_query_params');
            }

            var shouldMapModeIsolated = this._shouldMapModeIsolated();

            this.settingSeaSurfaceHeight();
            this.settingLayer();
            this.settingMap(shouldMapModeIsolated);
            this.settingMapDragHandler();
            this.settingDistanceMarker(shouldMapModeIsolated);
        }

        _shouldMapModeIsolated() {
            var rlat = this.urlQueryParamRepo.getQueryValueBy('rlat');
            var rlng = this.urlQueryParamRepo.getQueryValueBy('rlng');
            if (rlat && rlng) {
                return true;
            }
            return false;
        }

        settingSeaSurfaceHeight() {
            var seaSurfaceHeight = this.urlQueryParamRepo.getQueryValueBy('height');
            if (seaSurfaceHeight) {
                this.seaSurfaceManager.setSeaSurfaceHeight(seaSurfaceHeight);
            }
        }

        settingLayer() {
            this._setAllLayerOff('.js-map-left-wrap');
            this._setAllLayerOff('.js-map-right-wrap');
            this._setTargetLayerOn('left', '.js-map-left-wrap');
            this._setTargetLayerOn('right', '.js-map-right-wrap');
        }
        _setAllLayerOff(mapWrapClassName) {
            var overlaysArea = document.querySelector(`${mapWrapClassName} .leaflet-control-layers .leaflet-control-layers-overlays`);
            var targetList = overlaysArea.querySelectorAll(`input[type="checkbox"]`);
            targetList.forEach(function(target) {
                if (target.checked) {
                    target.click();
                }
            });
        }
        _setTargetLayerOn(mapQueryName, mapWrapClassName) {
            var layerNames = this.urlQueryParamRepo.getQueryValueBy(mapQueryName);
            if (Array.isArray(layerNames) === false) {
                layerNames = [layerNames];
            }
            var overlaysArea = document.querySelector(`${mapWrapClassName} .leaflet-control-layers .leaflet-control-layers-overlays`);
            layerNames.forEach(function(layerName) {
                var target = overlaysArea.querySelector(`input[type="checkbox"][data-layer-name="${layerName}"]`);
                if (target) {
                    if (target.checked === false) {
                        target.click();
                    }
                }
            });
        }

        settingMap(shouldMapModeIsolated) {
            var zoom = this.urlQueryParamRepo.getQueryValueBy('z');

            var lat = this.urlQueryParamRepo.getQueryValueBy('lat');
            var lng = this.urlQueryParamRepo.getQueryValueBy('lng');
            var centerLeft = L.latLng(lat, lng);

            if (shouldMapModeIsolated === false) {
                this._setViewForStandard(zoom, centerLeft);

            }else{
                var rlat = this.urlQueryParamRepo.getQueryValueBy('rlat');
                var rlng = this.urlQueryParamRepo.getQueryValueBy('rlng');
                var centerRight = L.latLng(rlat, rlng);
                this._setViewForIsolated(zoom, centerLeft, centerRight);
            }
        }

        _setViewForStandard(zoom, centerLeft) {
            if (this.globalState.mapMode === this.globalState.const.MAP_MODE_ISOLATED) {
                this.switchMapModeManager.setMapMode(this.globalState.const.MAP_MODE_STANDARD);
                this.switchMapModeManager.unsync();
                this.switchMapModeManager.sync();
            }

            var options = {
                animate: false,
                duration: 0.25,
            };
            this.mapLeft.setView(centerLeft, zoom, options);

        }

        _setViewForIsolated(zoom, centerLeft, centerRight) {
            if (this.globalState.mapMode === this.globalState.const.MAP_MODE_STANDARD) {
                this.switchMapModeManager.setMapMode(this.globalState.const.MAP_MODE_ISOLATED);
            }


            var withMinZoomControl = false;
            this.switchMapModeManager.syncIsolatedModeWithUnsync(zoom, centerLeft, centerRight, withMinZoomControl);
        }

        settingMapDragHandler() {
            var movingTargetSelector = MyApp.MapDragHandler.getMovingTargetSelector();
            var movingTargetEl = document.querySelector(movingTargetSelector);

            var dragHandleSelector = MyApp.MapDragHandler.getDragHandleSelector();
            var dragHandleEl = document.querySelector(dragHandleSelector);
            var parentEl = dragHandleEl.parentElement;
            var parentWidth = parentEl.getBoundingClientRect().width;
            dragHandleEl.style.left = ((parentWidth / 2) - (8 / 2)) + 'px';

            movingTargetEl.style.width = (parentWidth / 2) + 'px';
        }

        settingDistanceMarker(shouldMapModeIsolated) {
            var dclat = this.urlQueryParamRepo.getQueryValueBy('dclat');
            var dclng = this.urlQueryParamRepo.getQueryValueBy('dclng');
            if (dclat && dclng) {
            }else{
                return;
            }
            var dclatLng = L.latLng(dclat, dclng);

            if (shouldMapModeIsolated === false) {
                this.clickManager.showLatLngInfoAndCircles(dclatLng, dclatLng);

            }else{
                var rdclat = this.urlQueryParamRepo.getQueryValueBy('rdclat');
                var rdclng = this.urlQueryParamRepo.getQueryValueBy('rdclng');
                if (rdclat && rdclng) {
                }else{
                    return;
                }
                var rdclatLng = L.latLng(rdclat, rdclng);
                this.clickManager.showLatLngInfoAndCircles(dclatLng, rdclatLng);
            }
        }

    };

}(this));
