(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};
    MyApp.configMap = {};

    MyApp.configMap.TileType = {
        Empty: 1,
        Standard: 2,
        Colorized: 3,
        OldEdition: 4,
        MyZxy: 5,
    };

    MyApp.configMap.MapLeftBaseList = [
        {name: 'osm', selected: true},
    ];
    MyApp.configMap.MapLeftOverlayList = [
        {name: 'old_edition', selected: false},
        {name: 'ort_riku10', selected: false},
        {name: 'ort_USA10', selected: false},
        {name: 'ort_old10', selected: true},
        {name: 'gazo1', selected: false},
        {name: 'gazo2', selected: false},
        {name: 'gazo4', selected: false},
        {name: 'latest', selected: false},
        {name: 'hillshade', selected: false},
        {name: 'dem5a', selected: false},
        {name: 'slope', selected: false},
        {name: 'recommend_time', selected: false},
        {name: 'recommend_distance', selected: false},
        {name: 'recommend_damlake', selected: false},
        {name: 'recommend_kazan', selected: false},
        {name: 'recommend_waterfall', selected: false},
        {name: 'recommend_kofun', selected: false},
        {name: 'recommend_100meizan', selected: false},
    ];

    MyApp.configMap.MapRightBaseList = [
        {name: 'osm', selected: true},
    ];
    MyApp.configMap.MapRightOverlayList = [
        {name: 'old_edition', selected: false},
        {name: 'ort_riku10', selected: false},
        {name: 'ort_USA10', selected: false},
        {name: 'ort_old10', selected: false},
        {name: 'gazo1', selected: true},
        {name: 'gazo2', selected: false},
        {name: 'gazo4', selected: false},
        {name: 'latest', selected: false},
        {name: 'hillshade', selected: false},
        {name: 'dem5a', selected: false},
        {name: 'slope', selected: false},
    ];

    MyApp.configMap.LayerConfigTable = {
        'osm': {
            caption: 'OpenStreetMap',
            options: {
                myTileUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
                minZoom: 5,
                maxZoom: 18,
                maxNativeZoom: 18,
                myLayerName: 'osm',
                myCacheName: 'osm',
                myCacheRepo: MyApp.globalCacheRepo,
            },
        },


        'ort_riku10': {
            caption: '1936-1942年(昭和11-17年) (Zoom:13-18) ※東京/大阪のみ',
            options: {
                myTileUrl: 'https://cyberjapandata.gsi.go.jp/xyz/ort_riku10/{z}/{x}/{y}.png',
                attribution: `<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>`,
                minZoom: 5,
                maxZoom: 18,
                maxNativeZoom: 18,
                myLayerName: 'ort_riku10',
                myCacheName: 'ort_riku10',
                myCacheRepo: MyApp.globalCacheRepo,
            },
        },
        'ort_USA10': {
            caption: '1945-1950年(昭和20-25年) (Zoom:10-17) ※東名阪他主要都市のみ',
            options: {
                myTileUrl: 'https://cyberjapandata.gsi.go.jp/xyz/ort_USA10/{z}/{x}/{y}.png',
                attribution: `<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>`,
                minZoom: 5,
                maxZoom: 18,
                maxNativeZoom: 17,
                myLayerName: 'ort_USA10',
                myCacheName: 'ort_USA10',
                myCacheRepo: MyApp.globalCacheRepo,
            },
        },
        'ort_old10': {
            caption: '1961-1969年(昭和36-44年) (Zoom:10-17)',
            options: {
                myTileUrl: 'https://cyberjapandata.gsi.go.jp/xyz/ort_old10/{z}/{x}/{y}.png',
                attribution: `<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>`,
                minZoom: 5,
                maxZoom: 18,
                maxNativeZoom: 17,
                myLayerName: 'ort_old10',
                myCacheName: 'ort_old10',
                myCacheRepo: MyApp.globalCacheRepo,
            },
        },
        'gazo1': {
            caption: '1974-1978年(昭和49-53年) (Zoom:10-17)',
            options: {
                myTileUrl: 'https://cyberjapandata.gsi.go.jp/xyz/gazo1/{z}/{x}/{y}.jpg',
                attribution: `<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>`,
                minZoom: 10,
                maxZoom: 18,
                maxNativeZoom: 17,
                myLayerName: 'gazo1',
                myCacheName: 'gazo1',
                myCacheRepo: MyApp.globalCacheRepo,
            },
        },
        'gazo2': {
            caption: '1979-1983年(昭和54-58年) (Zoom:10-17) ※太平洋ベルト部のみ',
            options: {
                myTileUrl: 'https://cyberjapandata.gsi.go.jp/xyz/gazo2/{z}/{x}/{y}.jpg',
                attribution: `<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>`,
                minZoom: 10,
                maxZoom: 18,
                maxNativeZoom: 17,
                myLayerName: 'gazo2',
                myCacheName: 'gazo2',
                myCacheRepo: MyApp.globalCacheRepo,
            },
        },
        'gazo4': {
            caption: '1987-1990年(昭和62-平成2年) (Zoom:10-17) ※東京-愛知間/広島/福岡のみ',
            options: {
                myTileUrl: 'https://cyberjapandata.gsi.go.jp/xyz/gazo4/{z}/{x}/{y}.jpg',
                attribution: `<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>`,
                minZoom: 8,
                maxZoom: 18,
                minNativeZoom: 10,
                maxNativeZoom: 17,
                myLayerName: 'gazo4',
                myCacheName: 'gazo4',
                myCacheRepo: MyApp.globalCacheRepo,
            },
        },
        'latest': {
            caption: '最新 (Zoom:5-8,9-13,14-18)',
            options: {
                myTileUrl: 'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
                attribution: `<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>`,
                minZoom: 5,
                maxZoom: 18,
                maxNativeZoom: 18,
                myLayerName: 'latest',
                myCacheName: 'latest',
                myCacheRepo: MyApp.globalCacheRepo,
                addSeparatorToBottom: true,
            },
        },
        'hillshade': {
            caption: '陰影起伏図 (Zoom:5-16)',
            options: {
                myTileUrl: 'https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png',
                attribution: `<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>`,
                minZoom: 5,
                maxZoom: 18,
                maxNativeZoom: 16,
                opacity: 0.5,
                myLayerName: 'hillshade',
                myCacheName: 'hillshade',
                myCacheRepo: MyApp.globalCacheRepo,
                blockDescription: '重ねて表示したいモノを選択してください。（※傾斜量図は単独表示用途）',
                blockDescriptionCssClassName: 'block-description',
            },
        },
        'slope': {
            caption: '傾斜量図 (Zoom:5-15) (黒いほど傾斜が急峻、白いほど緩やか)',
            options: {
                myTileUrl: 'https://cyberjapandata.gsi.go.jp/xyz/slopemap/{z}/{x}/{y}.png',
                attribution: `<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>`,
                minZoom: 5,
                maxZoom: 18,
                maxNativeZoom: 15,
                opacity: 1.0,
                myLayerName: 'slope',
                myCacheName: 'slope',
                myCacheRepo: MyApp.globalCacheRepo,
                addSeparatorToBottom: true,
            },
        },

        'old_edition': {
            caption: '旧版地図(日本版MapWarper[五万分一地形圖]) (Zoom:10-15)',
            tileType: MyApp.configMap.TileType.OldEdition,
            options: {
                myTileUrl: 'https://mapwarper.h-gis.jp/maps/tile/{area_id}/{z}/{x}/{y}.png',
                attribution: `<a href='https://mapwarper.h-gis.jp/about' target='_blank'>日本版MapWarper</a>`,
                minZoom: 10,
                maxZoom: 18,
                maxNativeZoom: 15,
                myLayerName: 'old_edition',
                myCacheName: 'old_edition',
                myCacheRepo: MyApp.globalCacheRepo,
                myOldEditionMapIdLocalRepo: MyApp.oldEditionMapIdLocalRepo,
                myOldEditionMapIdCacheRepo: MyApp.oldEditionMapIdCacheRepo,
                blockDescription: '見たい年代を1つ選択してください。',
                blockDescriptionCssClassName: 'block-description',
            },
        },

        'dem5a': {
            caption: '【縄文海進イメージ】標高(DEM5A) (Zoom:5-15)',
            tileType: MyApp.configMap.TileType.Colorized,
            url: 'https://cyberjapandata.gsi.go.jp/xyz/dem5a_png/{z}/{x}/{y}.png',
            options: {
                attribution: `<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>`,
                minZoom: 5,
                maxZoom: 18,
                maxNativeZoom: 15,
                myLayerName: 'dem5a',
                myCacheName: 'dem5a',
                myCacheRepo: MyApp.globalCacheRepo,
                myStateRepo: MyApp.globalState,
                opacity: 0.7,
                colorize: function(pixel) {
                    var invalidValue = -99999;
                    var h = MyApp.configMapDemFunction.calcHeightForDem(pixel, invalidValue);

                    var this_options = this;
                    var seaSurfaceHeight = this_options.myStateRepo.seaSurfaceHeight;
                    if (MyApp.configMapDemFunction.aboveSeaSurface(h, seaSurfaceHeight, invalidValue)) {
                        return {r: 0, g: 0, b: 0, a: 0};
                    }else{
                        return MyApp.configMapDemFunction.calcSeaColorForDem(h, seaSurfaceHeight);
                    }
                },
            },
        },

        'recommend_time': {
            caption: '「見てみる：時期で比較」に載せた場所',
            tileType: MyApp.configMap.TileType.Empty,
            options: {
                minZoom: 5,
                maxZoom: 18,
                myLayerName: 'recommend_time',
                blockDescription: '場所を表示します。',
                blockDescriptionCssClassName: 'block-description',
            },
        },
        'recommend_distance': {
            caption: '「見てみる：距離で比較」に載せた場所',
            tileType: MyApp.configMap.TileType.Empty,
            options: {
                minZoom: 5,
                maxZoom: 18,
                myLayerName: 'recommend_distance',
            },
        },
        'recommend_kazan': {
            caption: '「見てみる：番外編(火山活動)」に載せた場所',
            tileType: MyApp.configMap.TileType.Empty,
            options: {
                minZoom: 5,
                maxZoom: 18,
                myLayerName: 'recommend_kazan',
            },
        },
        'recommend_waterfall': {
            caption: '「見てみる：番外編(滝)」に載せた場所',
            tileType: MyApp.configMap.TileType.Empty,
            options: {
                minZoom: 5,
                maxZoom: 18,
                myLayerName: 'recommend_waterfall',
            },
        },
        'recommend_kofun': {
            caption: '「見てみる：番外編(前方後円墳)」に載せた場所',
            tileType: MyApp.configMap.TileType.Empty,
            options: {
                minZoom: 5,
                maxZoom: 18,
                myLayerName: 'recommend_kofun',
            },
        },
        'recommend_damlake': {
            caption: '「見てみる：番外編(ダム湖)」に載せた場所（ダム湖百選）',
            tileType: MyApp.configMap.TileType.Empty,
            options: {
                minZoom: 5,
                maxZoom: 18,
                myLayerName: 'recommend_damlake',
            },
        },
        'recommend_100meizan': {
            caption: '日本百名山',
            tileType: MyApp.configMap.TileType.Empty,
            options: {
                minZoom: 5,
                maxZoom: 18,
                myLayerName: 'recommend_100meizan',
                isLastElement: true,
                sourceSummaryUrl: 'html/source_summary.html',
                sourceSummaryText: '地図データの出典情報',
                sourceSummaryNote: '',
                sourceSummaryCssClassName: 'source-summary-link',
            },
        },

    };

}(this));
