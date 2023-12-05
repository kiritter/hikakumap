(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};

    MyApp.SwitchMapModeManager = class SwitchMapModeManager {
        constructor(mapBoth, globalState) {
            this.mapLeft = mapBoth.mapLeft;
            this.mapRight = mapBoth.mapRight;
            this.globalState = globalState;

            this._myIsolatedCenterAtSyncCircleLeft;
            this._myIsolatedCenterAtSyncCircleRight;
        }

        init() {
            this._settingInitialPosition();
            this._settingInitialSelected();
            this._settingChangeRadioEvent();
            this._settingSyncState();
        }

        _settingInitialPosition() {
            var rightCtrlLayerEl = document.querySelector('#map-right .leaflet-control-layers');
            var bottom = rightCtrlLayerEl.getBoundingClientRect().bottom;
            var selfEl = document.querySelector('.js-switch-mapmode-root-area');
            var margin = 20;
            selfEl.style.top = (bottom + margin) + 'px';
        }

        _settingInitialSelected() {
            var radioEllist = document.querySelectorAll('input[name="js-switch-mapmode-radio-group"]');
            var len = radioEllist.length;
            var strValue = String(this.globalState.mapMode);
            for (var i = 0; i < len; i++) {
                if (radioEllist[i].value === strValue) {
                    radioEllist[i].checked = true;
                    this._changeLabelColor(radioEllist[i], strValue);
                    break;
                }
            }
        }

        _settingChangeRadioEvent() {
            var self = this;
            var radioEllist = document.querySelectorAll('input[name="js-switch-mapmode-radio-group"]');
            var len = radioEllist.length;
            for (var i = 0; i < len; i++) {
                radioEllist[i].addEventListener('change', function(e) {
                    var radioEl = e.target;
                    var strValue = e.target.value;
                    self._changeLabelColor(radioEl, strValue);
                    self._changeGlobalState(strValue);
                    self._settingSyncState();
                }, false);
            }
        }

        _changeLabelColor(radioEl, strValue) {
            var labelEllist = document.querySelectorAll('.switch-mapmode-radio-lbl');
            var len = labelEllist.length;
            for (var i = 0; i < len; i++) {
                labelEllist[i].classList.remove('switch-mapmode-radio-lbl-standard');
                labelEllist[i].classList.remove('switch-mapmode-radio-lbl-isolated');
            }
            var labelEl = radioEl.parentElement;
            if (strValue === String(MyApp.globalState.const.MAP_MODE_STANDARD)) {
                labelEl.classList.add('switch-mapmode-radio-lbl-standard');
                this._showStandardArea();
            }else{
                labelEl.classList.add('switch-mapmode-radio-lbl-isolated');
                this._showisolatedArea();
            }
        }
        _showStandardArea() {
            var area1 = document.querySelector('.js-move-to-center-standard-area');
            area1.style.display = 'block';
            var area2 = document.querySelector('.js-move-to-center-isolated-area');
            area2.style.display = 'none';
            var area3 = document.querySelector('.js-latlng-info-area-right');
            area3.style.display = 'none';
        }
        _showisolatedArea() {
            var area1 = document.querySelector('.js-move-to-center-standard-area');
            area1.style.display = 'none';
            var area2 = document.querySelector('.js-move-to-center-isolated-area');
            area2.style.display = 'block';
            var area3 = document.querySelector('.js-latlng-info-area-right');
            area3.style.display = 'block';
        }

        _changeGlobalState(strValue) {
            var intValue = parseInt(strValue, 10) || 1;
            this.globalState.mapMode = intValue;
        }

        _settingSyncState() {
            if (this.globalState.mapMode === MyApp.globalState.const.MAP_MODE_STANDARD) {
                this.unsync();
                this.sync();
            }else{
            }
        }

        setMapMode(mapModeStrValue) {
            this._changeGlobalState(mapModeStrValue);
            this._settingInitialSelected();
        }
        
        unsync() {
            this._removeCenterAtSyncCircle();

            this.mapLeft.unsync(this.mapRight);
            this.mapRight.unsync(this.mapLeft);
        }

        sync() {
            this.mapLeft.sync(this.mapRight);
            this.mapRight.sync(this.mapLeft);
        }

        syncIsolatedModeWithUnsync(zoom, centerLeft, centerRight, withMinZoomControl) {
            this.unsync();

            if (withMinZoomControl) {
                if (zoom < 10) {
                    zoom = 10;
                }
            }

            var options = {
                animate: false,
                duration: 0.1,
                noMoveStart: true,
            };
            this.mapLeft.setView(centerLeft, zoom, options);
            this.mapRight.setView(centerRight, zoom, options);

            this.mapLeft._myIsolatedCenterAtSync = centerLeft;
            this.mapRight._myIsolatedCenterAtSync = centerRight;

            this._addCenterAtSyncCircle(centerLeft, centerRight);

            var self = this;
            var timerId = setTimeout(function() {
                clearTimeout(timerId);
                self._syncIsolatedModeCore();
            }, 300);
        }
        
        _syncIsolatedModeCore() {
            var self = this;
            var optionsLeft = {
                offsetFn: function(center, zoom, refMap, tgtMap) {
                    var centerDiff = self._calcCenterDiff(refMap, tgtMap, zoom);
                    var pt = refMap.project(center, zoom).add([centerDiff.diffX, centerDiff.diffY]);
                    return refMap.unproject(pt, zoom);
                }
            };
            this.mapLeft.sync(this.mapRight, optionsLeft);

            var optionsRight = {
                offsetFn: function(center, zoom, refMap, tgtMap) {
                    var centerDiff = self._calcCenterDiff(tgtMap, refMap, zoom);
                    var pt = refMap.project(center, zoom).add([centerDiff.diffX * -1, centerDiff.diffY * -1]);
                    return refMap.unproject(pt, zoom);
                }
            };
            this.mapRight.sync(this.mapLeft, optionsRight);
        }

        _calcCenterDiff(mapLeft, mapRight, zoom) {
            var leftCenter = mapLeft._myIsolatedCenterAtSync;
            var rightCenter = mapRight._myIsolatedCenterAtSync;
            var leftCenterPoint = mapLeft.project(leftCenter, zoom);
            var rightCenterPoint = mapLeft.project(rightCenter, zoom);
            var diffX = rightCenterPoint.x - leftCenterPoint.x;
            var diffY = rightCenterPoint.y - leftCenterPoint.y;
            return {diffX: diffX, diffY: diffY};
        }

        _addCenterAtSyncCircle(centerLeft, centerRight) {
            var options = {
                radius: 50,
                weight: 5,
                color: '#F0F',
                fill: false,
            };
            this._myIsolatedCenterAtSyncCircleLeft = L.circle(centerLeft, options);
            this.mapLeft.addLayer(this._myIsolatedCenterAtSyncCircleLeft);
            this._myIsolatedCenterAtSyncCircleRight = L.circle(centerRight, options);
            this.mapRight.addLayer(this._myIsolatedCenterAtSyncCircleRight);
        }
        _removeCenterAtSyncCircle() {
            if (this._myIsolatedCenterAtSyncCircleLeft) {
                this.mapLeft.removeLayer(this._myIsolatedCenterAtSyncCircleLeft);
            }
            if (this._myIsolatedCenterAtSyncCircleRight) {
                this.mapRight.removeLayer(this._myIsolatedCenterAtSyncCircleRight);
            }
        }

    };

}(this));
