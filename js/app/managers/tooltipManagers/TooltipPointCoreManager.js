(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};

    MyApp.TooltipPointCoreManager = class TooltipPointCoreManager {
        constructor(mapBoth, layerName, url, contentCallback) {
            this.mapLeft = mapBoth.mapLeft;
            this.mapRight = mapBoth.mapRight;
            this.layerGroupLeft = L.layerGroup();
            this.layerGroupRight = L.layerGroup();
            this.layerName = layerName;
            this.url = url;
            this.contentCallback = contentCallback;
            var isAsyncPublish = true;
            this.myChannel = new MyApp.MyChannel(isAsyncPublish);
        }

        async init() {
            this.addEventListenersToMap();
            this.settingZoomEvent();

            var placeGeoJson = await this.findRecommendPlaceData();
            this.settingMarkers(placeGeoJson);
        }

        addEventListenersToMap() {
            var self = this;
            this.mapLeft.on('overlayadd', function(layersControlEvent) {
                var targetLayer = MyApp.UtilMap.findLayerByNameInActiveLayers(self.mapLeft, self.layerName);
                if (targetLayer) {
                    if (self.mapLeft.hasLayer(self.layerGroupLeft) === false) {
                        self.layerGroupLeft.addTo(self.mapLeft);
                        self.layerGroupRight.addTo(self.mapRight);
                    }
                }else{
                }
            });
            this.mapLeft.on('overlayremove', function(layersControlEvent) {
                var targetLayer = MyApp.UtilMap.findLayerByNameInActiveLayers(self.mapLeft, self.layerName);
                if (targetLayer) {
                }else{
                    if (self.mapLeft.hasLayer(self.layerGroupLeft)) {
                        self.layerGroupLeft.removeFrom(self.mapLeft);
                        self.layerGroupRight.removeFrom(self.mapRight);
                    }
                }
            });
        }

        settingZoomEvent() {
            var self = this;
            this.mapLeft.on('zoomend', function(event) {
                var targetLayer = MyApp.UtilMap.findLayerByNameInActiveLayers(self.mapLeft, self.layerName);
                if (targetLayer) {
                    if (self.mapLeft.hasLayer(self.layerGroupLeft)) {
                        var currentZoom = event.target.getZoom();
                        self._publishAtZoomEnd(currentZoom);
                    }
                }
            });
        }

        _publishAtZoomEnd(currentZoom) {
            var topicName = 'zoomEnd';
            var options = {
                currentZoom: currentZoom,
            };
            this.myChannel.publish(topicName, options);
        }

        async findRecommendPlaceData() {
            var res = await fetch(this.url);
            return res.json();
        }

        settingMarkers(geoJson) {
            var tooltipFunc = this._createTooltipContentFunc();

            var self = this;
            var options = {
                filter: (feature) => {
                    return (feature.geometry.type === 'Point' && feature.properties.subType === 'Location') ? true : false;
                },
                onEachFeature: (feature, layer) => {
                    if (feature.properties.zIndexOffset) {
                        layer.setZIndexOffset(feature.properties.zIndexOffset);
                    }

                    var tooltipOptions = {
                        direction: feature.properties['tooltipDirection'],
                        className: feature.properties['tooltipClassName'],
                        permanent: true,
                    };
                    layer.bindTooltip(tooltipFunc, tooltipOptions);

                    layer.on('add', function(event) {
                        var currentZoom = self.mapLeft.getZoom();
                        var geZoom = (feature.properties.tooltipGeZoom) ? feature.properties.tooltipGeZoom : 0;
                        if (currentZoom >= geZoom) {
                            if (layer.isTooltipOpen() === false) {
                                layer.openTooltip();
                            }
                        }else{
                            if (layer.isTooltipOpen()) {
                                layer.closeTooltip();
                            }
                        }
                    });

                    var topicName = 'zoomEnd';
                    self.myChannel.subscribe(topicName, function(topicName, options) {
                        var currentZoom = options.currentZoom;
                        var geZoom = (feature.properties.tooltipGeZoom) ? feature.properties.tooltipGeZoom : 0;
                        if (currentZoom >= geZoom) {
                            if (layer.isTooltipOpen() === false) {
                                layer.openTooltip();
                            }
                        }else{
                            if (layer.isTooltipOpen()) {
                                layer.closeTooltip();
                            }
                        }
                    });
                },
                pointToLayer: (geoJsonPoint, latlng) => {
                    return L.circleMarker(latlng, {
                        radius: 1,
                        color: '#000',
                    });
                },
            };

            this._createMarkerCore(geoJson, options);
        }

        _createTooltipContentFunc() {
            var self = this;
            return (layer) => {
                var content;
                if (self.contentCallback) {
                    content = self.contentCallback(layer.feature.properties);
                }else{
                    throw new Error('未対応');
                }
                return content;
            };
        }

        _createMarkerCore(geoJson, options) {
            var markers = L.geoJSON(geoJson, options);
            this.layerGroupLeft.addLayer(markers);
            var markers2 = L.geoJSON(geoJson, options);
            this.layerGroupRight.addLayer(markers2);
        }

    };

}(this));
