"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var MapMounterContext_1 = require("../../context/MapMounterContext");
var MarkerClustererContext_1 = require("../../context/MarkerClustererContext");
var ObjectMounterContext_1 = require("../../context/ObjectMounterContext");
var MounterCleanup_1 = require("../../lib/MounterCleanup");
var Optimization_1 = require("../../lib/Optimization");
var React = require("react");
var WithMarkerMounterCleanup_1 = require("./HOC/WithMarkerMounterCleanup");
var useState = React.useState, useContext = React.useContext, useEffect = React.useEffect;
var DEFAULT_MARKER_ARRAY_PROPS = {
    instanceMarkers: null,
    batchSize: 50,
    displayOnlyInFov: false,
};
var addMarker = function (_a, _b, clusterer) {
    var mountedMarkers = _a[0], setMountedMarkers = _a[1];
    var markersDidChange = _b[0], setMarkersDidCange = _b[1];
    return function (markerProps, id) {
        if (mountedMarkers[id] && !mountedMarkers[id].isToBeRemoved) {
            console.warn("tried to add marker with id " + id + "\n            to MarkerMounter. Marker with this id already exists,\n            if you want to replace it, remove it first.");
            return null;
        }
        if (mountedMarkers[id]) {
            clusterer && clusterer.removeMarker(mountedMarkers[id], true);
            mountedMarkers[id].setMap(null);
        }
        var newMarker = new google.maps.Marker(markerProps.markerOptions);
        newMarker.isToBeRemoved = false;
        newMarker.id = id;
        mountedMarkers[id] = newMarker;
        // Careful not to call this too many times to prevent slow down
        !markersDidChange && setMarkersDidCange(true);
        return mountedMarkers[id];
    };
};
var removeMarker = function (_a, _b) {
    var mountedMarkers = _a[0], setMountedMarkers = _a[1];
    var markersDidChange = _b[0], setMarkersDidCange = _b[1];
    return function (id) {
        if (!mountedMarkers[id]) {
            console.warn("tried to remove marker with id " + id + "\n            from MarkerMounter. Marker with this id does not exists.");
            return false;
        }
        mountedMarkers[id].isToBeRemoved = true;
        !markersDidChange && setMarkersDidCange(true);
        return true;
    };
};
var removeMarkersMarkedToBeRemoved = function (markers, clusterer, map) {
    var markersToRemove = markers.filter(function (marker) { return marker.isToBeRemoved; });
    MounterCleanup_1.mutableRemoveMarkersFrom(markersToRemove, clusterer, markers);
};
var addMarkersToMap = function (markers, clusterer, map) {
    if (clusterer) {
        clusterer.addMarkers(markers, true);
    }
    else {
        markers.map(function (marker) {
            if (marker.getMap() === map) {
                return marker;
            }
            marker.setMap(map);
            return marker;
        });
    }
};
var useUpdateMarkers = function (markersDidChangeFlag, reallyMountedMarkers, mapContext, clustererContext) {
    var markersDidCange = markersDidChangeFlag[0], setMarkersDidCange = markersDidChangeFlag[1];
    useEffect(function () {
        var mountedMarkers = reallyMountedMarkers[0], setMountedMarkers = reallyMountedMarkers[1];
        if (!markersDidCange) {
            return;
        }
        var clusterer = clustererContext.clusterer;
        removeMarkersMarkedToBeRemoved(mountedMarkers, clusterer, mapContext.map);
        addMarkersToMap(mountedMarkers, clusterer, mapContext.map);
        clusterer && clusterer.repaint();
        var newMarkers = mountedMarkers.slice();
        setMountedMarkers(newMarkers);
        setMarkersDidCange(false);
        return;
    }, [markersDidCange]);
};
var useUpdateContext = function (markersChangedFlag, reallyMountedMarkers, mounterContext, clustererContext) {
    var mountedMarkers = reallyMountedMarkers[0];
    useEffect(function () {
        var constextState = mounterContext[0], setContextState = mounterContext[1];
        constextState.stateObject.isUnmounted = false;
        setContextState(__assign({}, constextState, { addObject: addMarker(reallyMountedMarkers, markersChangedFlag, clustererContext.clusterer), removeObject: removeMarker(reallyMountedMarkers, markersChangedFlag) }));
        return function () {
            constextState.stateObject.isUnmounted = true;
        };
    }, [mountedMarkers]);
};
var MarkerMounter = function (props) {
    if (props === void 0) { props = DEFAULT_MARKER_ARRAY_PROPS; }
    var currentProps = __assign({}, DEFAULT_MARKER_ARRAY_PROPS, props);
    var children = currentProps.children, displayOnlyInFov = currentProps.displayOnlyInFov, instanceMarkers = currentProps.instanceMarkers;
    var reallyMountedMarkers = useState([]);
    var markersChangedFlag = useState(false);
    var _a = useContext(MapMounterContext_1.default), mapContext = _a[0], setMapContext = _a[1];
    var _b = useContext(MarkerClustererContext_1.MarkerClustererContext), clustererContext = _b[0], setClustererContext = _b[1];
    var context = useState({
        stateObject: { isUnmounted: false },
        map: mapContext.map,
        addObject: addMarker(reallyMountedMarkers, markersChangedFlag, clustererContext.clusterer),
        removeObject: removeMarker(reallyMountedMarkers, markersChangedFlag),
    });
    var map = mapContext.map;
    var mountedMarkers = reallyMountedMarkers[0], setMountedMarkers = reallyMountedMarkers[1];
    var markersHaveChanged = markersChangedFlag[0];
    Optimization_1.useHideOutOfFovMarkers(mountedMarkers, map, function () {
        if (clustererContext.clusterer && mountedMarkers) {
            clustererContext.clusterer.repaint();
        }
        props.onMountedMarkersChange && props.onMountedMarkersChange(mountedMarkers);
    }, displayOnlyInFov);
    useUpdateContext(markersChangedFlag, reallyMountedMarkers, context, clustererContext);
    useUpdateMarkers(markersChangedFlag, reallyMountedMarkers, mapContext, clustererContext);
    if (!mapContext) {
        console.error('No map to mount to found. Did you place MarkerMounter in MapMounter?');
        return null;
    }
    if (markersChangedFlag) {
        instanceMarkers.current = mountedMarkers;
    }
    props.onMountedMarkersChange && props.onMountedMarkersChange(mountedMarkers);
    return (React.createElement(ObjectMounterContext_1.MarkerMounterContext.Provider, { value: context }, children));
};
exports.default = WithMarkerMounterCleanup_1.default(MarkerMounter);
//# sourceMappingURL=MarkerMounter.js.map