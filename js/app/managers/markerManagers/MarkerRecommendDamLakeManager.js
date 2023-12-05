(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};

    MyApp.MarkerRecommendDamLakeManager = class MarkerRecommendDamLakeManager {
        constructor(gaChannel, mapBoth) {
            var layerName = 'recommend_damlake';
            var url = 'geojson/01_recommend_places/damlake.geojson';
            var contentCallback = MarkerRecommendDamLakeManager._buildMarkerPopupContent;
            this.coreManager = new MyApp.MarkerRecommendCoreManager(gaChannel, mapBoth, layerName, url, contentCallback);
        }

        async init() {
            this.coreManager.init();
        }

        static _buildMarkerPopupContent(properties) {
            var content = `
<table class="damlake-table">
    <tbody>
        <tr>
            <th>番号</th>
            <td>${properties.num}</td>
        </tr>
        <tr>
            <th>ダム湖</th>
            <td>${properties.lakeName}</td>
        </tr>
        <tr>
            <th>ダム</th>
            <td>${properties.damName}</td>
        </tr>
        <tr>
            <th>着手年/竣工年</th>
            <td>${properties.year}</td>
        </tr>
        <tr>
            <th>水系</th>
            <td>${properties.system}</td>
        </tr>
        <tr>
            <th>河川</th>
            <td>${properties.river}</td>
        </tr>
        <tr>
            <th>都道府県</th>
            <td>${properties.todofuken}</td>
        </tr>
        <tr>
            <th class="damlake-desc-caption">備考</th>
            <td class="damlake-desc-content">${properties.desc}</td>
        </tr>
        <tr>
            <th>変更前画像</th>
            <td>${properties.before}</td>
        </tr>
        <tr>
            <th>変更後画像</th>
            <td>${properties.after}</td>
        </tr>
    </tbody>
</table>
`;
            return content;
        }

    };

}(this));
