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
var addMarker = function (mountedMarkers, _a, clusterer) {
    var markersDidChange = _a[0], setMarkersDidCange = _a[1];
    return function (markerProps, id) {
        if (mountedMarkers[id] && !mountedMarkers[id].isToBeRemoved) {
            console.warn("tried to add marker with id " + id + "\n            to MarkerMounter. Marker with this id already exists,\n            if you want to replace it, remove it first.");
            return null;
        }
        if (mountedMarkers[id]) {
            MounterCleanup_1.mutableRemoveMarkersFrom([mountedMarkers[id]], clusterer, mountedMarkers);
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
var removeMarker = function (mountedMarkers, _a) {
    var markersDidChange = _a[0], setMarkersDidCange = _a[1];
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
var filterAlreadyPresentIn = function (markers, inArray) {
    return markers.filter(function (marker) {
        return !markerIsIn(marker, inArray);
    });
};
var markerIsIn = function (marker, inArray) {
    return inArray.find(function (inMarker) { return inMarker.id === marker.id; });
};
var addMarkersToMap = function (markers, clusterer, map) {
    if (clusterer) {
        var clustererMarkers = clusterer.getMarkers().slice();
        var toAddMarkers = filterAlreadyPresentIn(markers, clustererMarkers);
        clusterer.addMarkers(toAddMarkers, true);
        return;
    }
    markers.map(function (marker) {
        if (marker.getMap() === map) {
            return marker;
        }
        marker.setMap(map);
        return marker;
    });
};
var updateContext = function (mountedMarkers, markersDidChangeFlag, mounterContext, clustererContext) {
    var constextState = mounterContext[0], setContextState = mounterContext[1];
    constextState.stateObject.isUnmounted = false;
    setContextState(__assign({}, constextState, { addObject: addMarker(mountedMarkers, markersDidChangeFlag, clustererContext.clusterer), removeObject: removeMarker(mountedMarkers, markersDidChangeFlag) }));
};
var useUpdateMarkers = function (mutableMarkers, markersDidChangeFlag, reallyMountedMarkers, mapContext, mounterContext, clustererContext) {
    var markersDidChange = markersDidChangeFlag[0], setMarkersDidCange = markersDidChangeFlag[1];
    var mounterContextState = mounterContext[0];
    useEffect(function () {
        var mountedMarkers = reallyMountedMarkers[0], setMountedMarkers = reallyMountedMarkers[1];
        if (!markersDidChange ||
            !mounterContextState.addObject ||
            !mounterContextState.removeObject) {
            return;
        }
        var clusterer = clustererContext.clusterer;
        removeMarkersMarkedToBeRemoved(mutableMarkers, clusterer, mapContext.map);
        addMarkersToMap(mutableMarkers, clusterer, mapContext.map);
        clusterer && clusterer.repaint();
        var newMarkers = mutableMarkers.slice();
        setMountedMarkers(newMarkers);
        setMarkersDidCange(false);
    }, [markersDidChange, mounterContextState]);
};
var useUpdateContext = function (context, markersDidChangeFlag, clustererContext) {
    useEffect(function () {
        var constextState = context[0], setContextState = context[1];
        constextState.stateObject.isUnmounted = false;
        updateContext(constextState.stateObject.objects, markersDidChangeFlag, context, clustererContext);
        return function () { return (constextState.stateObject.isUnmounted = true); };
    }, []);
};
var MarkerMounter = function (props) {
    if (props === void 0) { props = DEFAULT_MARKER_ARRAY_PROPS; }
    var currentProps = __assign({}, DEFAULT_MARKER_ARRAY_PROPS, props);
    var children = currentProps.children, displayOnlyInFov = currentProps.displayOnlyInFov, instanceMarkers = currentProps.instanceMarkers;
    var mountedMarkersState = useState([]);
    var markersChangedFlag = useState(false);
    var _a = useContext(MapMounterContext_1.default), mapContext = _a[0], setMapContext = _a[1];
    var _b = useContext(MarkerClustererContext_1.MarkerClustererContext), clustererContext = _b[0], setClustererContext = _b[1];
    var mountedMarkers = mountedMarkersState[0], setMountedMarkers = mountedMarkersState[1];
    var markersHaveChanged = markersChangedFlag[0];
    var context = useState({
        stateObject: { isUnmounted: false, objects: [] },
        map: mapContext.map,
        addObject: undefined,
        removeObject: undefined,
    });
    var contextState = context[0];
    var map = mapContext.map;
    Optimization_1.useHideOutOfFovMarkers(mountedMarkers, map, function () {
        if (clustererContext.clusterer && mountedMarkers) {
            clustererContext.clusterer.repaint();
        }
        props.onMountedMarkersChange && props.onMountedMarkersChange(mountedMarkers);
    }, displayOnlyInFov);
    useUpdateContext(context, markersChangedFlag, clustererContext);
    useUpdateMarkers(contextState.stateObject.objects, markersChangedFlag, mountedMarkersState, mapContext, context, clustererContext);
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