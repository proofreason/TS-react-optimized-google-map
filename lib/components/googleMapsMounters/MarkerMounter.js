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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var MapMounterContext_1 = __importDefault(require("../../context/MapMounterContext"));
var MarkerClustererContext_1 = require("../../context/MarkerClustererContext");
var ObjectMounterContext_1 = require("../../context/ObjectMounterContext");
var MounterCleanup_1 = require("../../lib/MounterCleanup");
var Optimization_1 = require("../../lib/Optimization");
var React = __importStar(require("react"));
var WithMarkerMounterCleanup_1 = __importDefault(require("./HOC/WithMarkerMounterCleanup"));
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
        var clustererMarkers = __spreadArrays(clusterer.getMarkers());
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
    setContextState(__assign(__assign({}, constextState), { addObject: addMarker(mountedMarkers, markersDidChangeFlag, clustererContext.clusterer), removeObject: removeMarker(mountedMarkers, markersDidChangeFlag) }));
};
var useUpdateMarkers = function (mutableMarkers, markersDidChangeFlag, reallyMountedMarkers, mapContext, mounterContext, clustererContext, instanceMarkers, onUpdateStart) {
    var markersDidChange = markersDidChangeFlag[0], setMarkersDidCange = markersDidChangeFlag[1];
    var mounterContextState = mounterContext[0];
    useEffect(function () {
        var mountedMarkers = reallyMountedMarkers[0], setMountedMarkersObject = reallyMountedMarkers[1];
        if (!markersDidChange ||
            !mounterContextState.addObject ||
            !mounterContextState.removeObject) {
            return;
        }
        onUpdateStart === null || onUpdateStart === void 0 ? void 0 : onUpdateStart(mountedMarkers.markers);
        var clusterer = clustererContext.clusterer;
        removeMarkersMarkedToBeRemoved(mutableMarkers, clusterer, mapContext.map);
        addMarkersToMap(mutableMarkers, clusterer, mapContext.map);
        clusterer && clusterer.repaint();
        var newMarkers = __spreadArrays(mutableMarkers);
        // we need to do this because addMarkersToMap adds them immediatly so cleanup needs to know that
        // which markers are actually mounted
        instanceMarkers.current = newMarkers;
        setMountedMarkersObject({ markers: newMarkers, initialStateWasAltered: true });
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
    var currentProps = __assign(__assign({}, DEFAULT_MARKER_ARRAY_PROPS), props);
    var children = currentProps.children, displayOnlyInFov = currentProps.displayOnlyInFov, instanceMarkers = currentProps.instanceMarkers;
    var mountedMarkersState = useState({
        markers: [],
        initialStateWasAltered: false,
    });
    var markersChangedFlag = useState(false);
    var mapContext = useContext(MapMounterContext_1.default)[0];
    var clustererContext = useContext(MarkerClustererContext_1.MarkerClustererContext)[0];
    var mountedMarkers = mountedMarkersState[0];
    var context = useState({
        stateObject: { isUnmounted: false, objects: [] },
        map: mapContext.map,
        addObject: undefined,
        removeObject: undefined,
    });
    var contextState = context[0];
    var map = mapContext.map;
    Optimization_1.useHideOutOfFovMarkers(mountedMarkers.markers, map, props.onMountedMarkersUpdateStart, function () {
        if (clustererContext.clusterer && mountedMarkers) {
            clustererContext.clusterer.repaint();
        }
        props.onMountedMarkersUpdateFinish &&
            props.onMountedMarkersUpdateFinish(mountedMarkers.markers);
    }, displayOnlyInFov);
    useUpdateContext(context, markersChangedFlag, clustererContext);
    useUpdateMarkers(contextState.stateObject.objects, markersChangedFlag, mountedMarkersState, mapContext, context, clustererContext, instanceMarkers, props.onMountedMarkersUpdateStart);
    useEffect(function () {
        if (!mountedMarkers.initialStateWasAltered) {
            return;
        }
        props.onMountedMarkersUpdateFinish &&
            props.onMountedMarkersUpdateFinish(mountedMarkers.markers);
    }, [mountedMarkers]);
    if (!mapContext) {
        throw Error('No map to mount to found. Did you place MarkerMounter in MapMounter?');
    }
    return (React.createElement(ObjectMounterContext_1.MarkerMounterContext.Provider, { value: context }, children));
};
exports.default = WithMarkerMounterCleanup_1.default(MarkerMounter);
//# sourceMappingURL=MarkerMounter.js.map