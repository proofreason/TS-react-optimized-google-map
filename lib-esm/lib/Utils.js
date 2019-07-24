var MOUNTING_POINTS;
(function (MOUNTING_POINTS) {
    MOUNTING_POINTS["head"] = "head";
    MOUNTING_POINTS["body"] = "body";
})(MOUNTING_POINTS || (MOUNTING_POINTS = {}));
var googleMapsLoaded = function () {
    return typeof google === 'object' && typeof google.maps === 'object';
};
var getOwnKeysOfObject = function (boject) {
    return Object.keys(boject).filter(function (key) { return boject.hasOwnProperty(key); });
};
var loadScript = function (src, id, async, defer, mountingPoint) {
    if (async === void 0) { async = true; }
    if (defer === void 0) { defer = true; }
    if (mountingPoint === void 0) { mountingPoint = MOUNTING_POINTS.body; }
    return new Promise(function (resolve, reject) {
        var tag = document.createElement('script');
        tag.async = async;
        tag.defer = defer;
        tag.onload = resolve;
        tag.onerror = reject;
        tag.src = src;
        tag.id = id;
        var body = document.getElementsByTagName(mountingPoint)[0];
        body && body.appendChild(tag);
    });
};
var elementExists = function (id) {
    return document.getElementById(id) !== null || undefined;
};
var removeElement = function (id) {
    var element = document.getElementById(id);
    element && element.remove();
};
export { loadScript, googleMapsLoaded, getOwnKeysOfObject, elementExists, removeElement };
//# sourceMappingURL=Utils.js.map