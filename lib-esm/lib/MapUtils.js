var forceRefreshMap = function (map) {
    var currentZoom = map.getZoom();
    map.setZoom(currentZoom + 1);
    map.setZoom(currentZoom);
};
export { forceRefreshMap };
//# sourceMappingURL=MapUtils.js.map