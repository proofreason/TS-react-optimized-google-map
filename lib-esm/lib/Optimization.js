var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import Marker from "../components/Marker";
import * as React from 'react';
import { getOwnKeysOfObject } from './Utils';
var useState = React.useState, useEffect = React.useEffect;
var useMarkerCache = function (markerProps) {
    var _a = useState(null), markerCache = _a[0], setMarkerCache = _a[1];
    !markerCache &&
        markerProps &&
        setMarkerCache(markerProps.map(function (props, index) { return React.createElement(Marker, __assign({ key: props.id }, props)); }));
    return [markerCache, setMarkerCache];
};
// this can be further opimized
var updateMarkerCache = function (markersCache, id, props, immutable, forceUpdate) {
    if (immutable === void 0) { immutable = true; }
    if (forceUpdate === void 0) { forceUpdate = false; }
    var markersArray = markersCache[0], setMarkerArray = markersCache[1];
    if (markersArray[id]) {
        var toCompare_1 = props.markerOptions;
        var toCompareOld_1 = markersArray[id].props.markerOptions;
        var ownKeysOld = getOwnKeysOfObject(toCompareOld_1);
        var ownKeysNew = getOwnKeysOfObject(toCompare_1);
        var newHasSamePropsAsOld = ownKeysOld.every(function (key) { return toCompare_1.hasOwnProperty(key) && toCompare_1[key] === toCompareOld_1[key]; });
        var oldHasSamePropsAsNew = ownKeysNew.every(function (key) { return toCompareOld_1.hasOwnProperty(key) && toCompare_1[key] === toCompareOld_1[key]; });
        if (newHasSamePropsAsOld && oldHasSamePropsAsNew && !forceUpdate) {
            return;
        }
    }
    markersArray[id] && (markersArray[id] = React.createElement(Marker, __assign({ key: props.id }, props)));
    if (!immutable) {
        return;
    }
    var markerArrayCopy = markersArray.slice();
    setMarkerArray(markerArrayCopy);
};
var hideOutOfFovMarkers = function (markers, map) {
    var bounds = map.getBounds();
    if (!bounds) {
        return;
    }
    return markers.map(function (marker) {
        marker.setVisible(false);
        if (bounds.contains(marker.getPosition())) {
            marker.setVisible(true);
        }
        return marker;
    });
};
var useHideOutOfFovMarkers = function (markers, map, callback, active) {
    if (active === void 0) { active = true; }
    var realodOnChange = function () {
        hideOutOfFovMarkers(markers, map);
        callback && callback();
    };
    useEffect(function () {
        active && realodOnChange();
        var listener = active &&
            map.addListener('idle', function () {
                realodOnChange();
            });
        return function () { return listener && listener.remove(); };
    }, [markers, active]);
};
export { useMarkerCache, updateMarkerCache, useHideOutOfFovMarkers };
//# sourceMappingURL=Optimization.js.map