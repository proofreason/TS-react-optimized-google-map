var forceRefreshMap = function (map) {
    var currentZoom = map.getZoom();
    map.setZoom(currentZoom + 1);
    map.setZoom(currentZoom);
};
var addListenersToMarker = function (listeners, marker) {
    var markerValid = marker !== null || undefined;
    if (!markerValid) {
        return;
    }
    var activeListeners = [];
    listeners.map(function (_a) {
        var eventName = _a.eventName, listener = _a.listener;
        if (!listener) {
            return null;
        }
        var enhancedListener = function (event) { return listener(marker, event); };
        // tslint:disable-next-line
        var addedListener = marker.addListener(eventName, enhancedListener);
        activeListeners.push(addedListener);
    });
    return activeListeners;
};
export { forceRefreshMap, addListenersToMarker };
//# sourceMappingURL=MapUtils.js.map