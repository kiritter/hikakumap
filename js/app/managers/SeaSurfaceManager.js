(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};

    MyApp.SeaSurfaceManager = class SeaSurfaceManager {
        constructor(gaChannel, mapBoth, globalState) {
            this.gaChannel = gaChannel;
            this.mapLeft = mapBoth.mapLeft;
            this.mapRight = mapBoth.mapRight;
            this.globalState = globalState;
        }

        init() {
            this._settingInitialPosition();
            this._addEventListenersToMap();
            this._settingInput();
            this._settingBtn();
        }

        _settingInitialPosition() {
            var leftCtrlLayerEl = document.querySelector('#map-left .leaflet-control-layers');
            var bottom = leftCtrlLayerEl.getBoundingClientRect().bottom;
            var selfEl = document.querySelector('.js-sea-surface-area');
            var margin = 20;
            selfEl.style.top = (bottom + margin) + 'px';
        }

        _addEventListenersToMap() {
            var self = this;
            this.mapLeft.on('overlayadd', function(layersControlEvent) {
                self._overlayaddCore();
            });
            this.mapLeft.on('overlayremove', function(layersControlEvent) {
                self._overlayremoveCore();
            });
            this.mapRight.on('overlayadd', function(layersControlEvent) {
                self._overlayaddCore();
            });
            this.mapRight.on('overlayremove', function(layersControlEvent) {
                self._overlayremoveCore();
            });
        }

        _overlayaddCore() {
            var layerLeft = MyApp.UtilMap.findLayerByNameInActiveLayers(this.mapLeft, 'dem5a');
            var layerRight = MyApp.UtilMap.findLayerByNameInActiveLayers(this.mapRight, 'dem5a');
            if ((layerLeft && layerRight) || (!layerLeft && layerRight) || (layerLeft && !layerRight)) {
                this._showSeaSurfaceArea();
            }else{
            }
        }
        _overlayremoveCore() {
            var layerLeft = MyApp.UtilMap.findLayerByNameInActiveLayers(this.mapLeft, 'dem5a');
            var layerRight = MyApp.UtilMap.findLayerByNameInActiveLayers(this.mapRight, 'dem5a');
            if ((layerLeft && layerRight) || (!layerLeft && layerRight) || (layerLeft && !layerRight)) {
            }else{
                this._hideSeaSurfaceArea();
            }
        }

        _showSeaSurfaceArea() {
            var area = document.querySelector('.js-sea-surface-area');
            area.style.display = 'block';
        }
        _hideSeaSurfaceArea() {
            var area = document.querySelector('.js-sea-surface-area');
            area.style.display = 'none';
        }

        _settingInput() {
            this._settingInputCore();
        }
        
        _settingInputCore() {
            var inputEl = document.querySelector('.js-sea-surface-input');
            inputEl.value = this.globalState.seaSurfaceHeight;
        }

        setSeaSurfaceHeight(seaSurfaceHeight) {
            this.globalState.seaSurfaceHeight = seaSurfaceHeight;
            this._settingInputCore();
        }
        
        getSeaSurfaceHeight() {
            return this.globalState.seaSurfaceHeight;
        }

        _settingBtn() {
            var btnEl = document.querySelector('.js-sea-surface-btn');
            var self = this;
            btnEl.addEventListener('click', function() {
                var inputEl = document.querySelector('.js-sea-surface-input');
                var strValue = inputEl.value;
                var urlValidator = new MyApp.UrlValidator();
                var isValid = urlValidator.isValidHeightCore(strValue);
                if (isValid === false) {
                    alert('1から30までの整数を指定してください。');
                    return;
                }
                var intValue = parseInt(strValue, 10) || 0;
                self.globalState.seaSurfaceHeight = intValue;
                var layerDem5aLeft = MyApp.UtilMap.findLayerByNameInActiveLayers(self.mapLeft, 'dem5a');
                var layerDem5aRight = MyApp.UtilMap.findLayerByNameInActiveLayers(self.mapRight, 'dem5a');
                if (layerDem5aLeft || layerDem5aRight) {
                }else{
                    alert('【縄文海進イメージ】を選択している状態でのみ使えます。');
                    return;
                }
                if (layerDem5aLeft) {
                    layerDem5aLeft.redraw();
                }
                if (layerDem5aRight) {
                    layerDem5aRight.redraw();
                }
                self.gaChannel.publish('sea_surface_redraw');
            }, false);
        }
    };

}(this));
