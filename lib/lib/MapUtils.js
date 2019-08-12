"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forceRefreshMap = function (map) {
    var currentZoom = map.getZoom();
    map.setZoom(currentZoom + 1);
    map.setZoom(currentZoom);
};
exports.forceRefreshMap = forceRefreshMap;
//# sourceMappingURL=MapUtils.js.map