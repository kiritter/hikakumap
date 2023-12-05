(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};

    MyApp.MapManager = class MapManager {
        constructor(configMap, currentCacheType) {
            this.configMap = configMap;
            this.isCacheTypeOldEdition = MyApp.PermanentCacheStatusRepo.isCacheTypeOldEdition(currentCacheType);
            this.isCacheTypeFull = MyApp.PermanentCacheStatusRepo.isCacheTypeFull(currentCacheType);
        }

        init() {
            var mapLeft = this.createMapLeft('map-left');
            var mapRight = this.createMapRight('map-right');
            this._changeLeafletLinkWithTargetBlank(mapLeft);
            this._changeLeafletLinkWithTargetBlank(mapRight);
            return {mapLeft: mapLeft, mapRight: mapRight};
        }

        _changeLeafletLinkWithTargetBlank(map) {
            var containerEl = map.getContainer();
            var anchorElList = containerEl.querySelectorAll('.leaflet-control-container .leaflet-control-attribution a');
            var leafletAnchor = anchorElList[0];
            leafletAnchor.setAttribute('target', '_blank');
        }

        createMapLeft(mapId) {
            var baseMaps = {};
            var overlayMaps = {};
            var defaultSelectedLayers = [];
        
            this.addLayersTo(this.configMap.LayerConfigTable, this.configMap.MapLeftBaseList, baseMaps, defaultSelectedLayers)
            this.addLayersTo(this.configMap.LayerConfigTable, this.configMap.MapLeftOverlayList, overlayMaps, defaultSelectedLayers)
        
            var options = {
                collapsed: false,
                position: 'topleft'
            };
            
            var isZoomCtrl = false;
            var isAttributionControl = false;
            var map = this.createMap(mapId, defaultSelectedLayers, baseMaps, overlayMaps, options, isZoomCtrl, isAttributionControl);
        
            L.control.zoom({
                position: 'topright'
            }).addTo(map);

            L.control.attribution({
                position: 'bottomleft'
            }).addTo(map);
        
            return map;
        }
        
        createMapRight(mapId) {
            var baseMaps = {};
            var overlayMaps = {};
            var defaultSelectedLayers = [];
        
            this.addLayersTo(this.configMap.LayerConfigTable, this.configMap.MapRightBaseList, baseMaps, defaultSelectedLayers)
            this.addLayersTo(this.configMap.LayerConfigTable, this.configMap.MapRightOverlayList, overlayMaps, defaultSelectedLayers)
        
            var options = {
                collapsed: false,
                position: 'topright'
            };
        
            var isZoomCtrl = true;
            var isAttributionControl = true;
            var map = this.createMap(mapId, defaultSelectedLayers, baseMaps, overlayMaps, options, isZoomCtrl, isAttributionControl)
            return map;
        }
        
        addLayersTo(table, list, maps, defaultSelectedLayers) {
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var obj = list[i];
                var layerConfig = table[obj.name];
                var layer = this.createLayer(layerConfig);
                maps[layerConfig.caption] = layer;
                if (obj.selected) {
                    defaultSelectedLayers.push(layer);
                }
            }
        }

        createLayer(layerConfig) {
            var funcionByType = {};
            funcionByType[MyApp.configMap.TileType.Empty] = this.createLayerForEmpty.bind(this);
            funcionByType[MyApp.configMap.TileType.Standard] = this.createLayerForStandard.bind(this);
            funcionByType[MyApp.configMap.TileType.Colorized] = this.createLayerForColorized.bind(this);
            funcionByType[MyApp.configMap.TileType.OldEdition] = this.createLayerForOldEditionMap.bind(this);
            funcionByType[MyApp.configMap.TileType.MyZxy] = this.createLayerForMyZxy.bind(this);

            var actualTileType = (layerConfig.tileType) ? layerConfig.tileType : MyApp.configMap.TileType.Standard;
            var layer = funcionByType[actualTileType](layerConfig);
            return layer;
        }
        createLayerForEmpty(layerConfig) {
            var layer = L.gridLayer(layerConfig.options);
            return layer;
        }
        createLayerForMyZxy(layerConfig) {
            var layer = L.gridLayer.myZxy(layerConfig.options);
            return layer;
        }
        createLayerForStandard(layerConfig) {
            var layer;
            if (this.isCacheTypeFull) {
                layer = L.gridLayer.tileCanvas.cache(layerConfig.options);
            }else{
                var url = layerConfig.options.myTileUrl;
                layer = L.tileLayer(url, layerConfig.options);
            }
            return layer;
        }
        createLayerForOldEditionMap(layerConfig) {
            var layer;
            if (this.isCacheTypeOldEdition || this.isCacheTypeFull) {
                layer = L.gridLayer.oldEditionMap.cache(layerConfig.options);
            }else{
                layer = L.gridLayer.oldEditionMap(layerConfig.options);
            }
            return layer;
        }
        createLayerForColorized(layerConfig) {
            var layer;
            if (this.isCacheTypeFull) {
                layer = L.tileLayer.colorizr.cache(layerConfig.url, layerConfig.options);
            }else{
                layer = L.tileLayer.colorizr(layerConfig.url, layerConfig.options);
            }
            return layer;
        }

        createMap(mapId, defaultSelectedLayers, baseMaps, overlayMaps, options, isZoomCtrl, isAttributionControl) {
            var zoomMinMax = MyApp.UtilMap.getZoomLevelMinMax();
            var initialZoomLevel = zoomMinMax.minZoom;
            var initialCenter = MyApp.UtilMap.getInitialCenter();
            var limitMapBounds = MyApp.UtilMap.getLimitMapBounds();

            var map = L.map(mapId, {
                maxBoundsViscosity: 1.0,
                center: initialCenter,
                zoom: initialZoomLevel,
                minZoom: initialZoomLevel,
                maxZoom: zoomMinMax.maxZoom,
                layers: defaultSelectedLayers,
                zoomControl: isZoomCtrl,
                attributionControl: isAttributionControl
            });
        
            var layerControl = L.control.layers.withClose(baseMaps, overlayMaps, options).addTo(map);


            this.showCurrentZoomLevel(initialZoomLevel);

            var self = this;
            map.on('zoomend', function(event) {
                var currentValue = event.target.getZoom();
                self.showCurrentZoomLevel(currentValue);
            });


            return map;
        }
        
        showCurrentZoomLevel(currentValue) {
            var zoomLevelEl = document.querySelector('.js-current-zoom-level');
            zoomLevelEl.innerText = currentValue;
        }
        
        forceEnableControlLayerRadioCheck() {
            var radioCheckElList = document.querySelectorAll('.leaflet-control-layers .leaflet-control-layers-list .leaflet-control-layers-overlays .leaflet-control-layers-selector');
            radioCheckElList.forEach(function(el) {
                el.disabled = false;
            });
        }

    };

}(this));
