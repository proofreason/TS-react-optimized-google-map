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
import MapMounterContext from "../../context/MapMounterContext";
import { MarkerClustererContext } from "../../context/MarkerClustererContext";
import { MarkerArrayContext } from "../../context/ObjectMounterContext";
import { useHideOutOfFovMarkers } from "../../lib/Optimization";
import * as React from 'react';
var useState = React.useState, useContext = React.useContext;
var DEFAULT_MARKER_ARRAY_PROPS = {
    batchSize: 50,
    displayOnlyInFov: false,
};
var addMarker = function (_a, map, clusterer) {
    var mountedMarkers = _a[0], setMountedMarkers = _a[1];
    return function (markerProps, id) {
        if (mountedMarkers[id]) {
            console.warn("tried to add marker with id " + id + "\n            to MarkerArray. Marker with this id already exists,\n            if you want to replace it, remove it first.");
            return null;
        }
        var newMarker = new google.maps.Marker(markerProps.markerOptions);
        newMarker.isToBeRemoved = false;
        newMarker.id = id;
        mountedMarkers[id] = newMarker;
        return mountedMarkers[id];
    };
};
var removeMarker = function (_a, clusterer) {
    var mountedMarkers = _a[0], setMountedMarkers = _a[1];
    return function (id) {
        if (!mountedMarkers[id]) {
            console.warn("tried to remove marker with id " + id + "\n            from MarkerArray. Marker with this id does not exists.");
            return false;
        }
        if (mountedMarkers[id]) {
            mountedMarkers[id].isToBeRemoved = true;
            return true;
        }
    };
};
var removeMarkersMarkedToBeRemoved = function (markers, clusterer, map) {
    var markersToRemove = markers.filter(function (marker) { return marker.isToBeRemoved; });
    if (clusterer) {
        clusterer.removeMarkers(markersToRemove, true);
    }
    markersToRemove.map(function (markerToRemove) {
        markerToRemove.setMap(null);
        // tslint:disable-next-line
        delete markers[markerToRemove.id];
    });
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
var MarkerArray = function (props) {
    if (props === void 0) { props = DEFAULT_MARKER_ARRAY_PROPS; }
    var currentProps = __assign({}, DEFAULT_MARKER_ARRAY_PROPS, props);
    var children = currentProps.children, displayOnlyInFov = currentProps.displayOnlyInFov;
    var _a = useContext(MapMounterContext), mapContext = _a[0], setMapContext = _a[1];
    var _b = useContext(MarkerClustererContext), clustererContext = _b[0], setClustererContext = _b[1];
    var mountedMarkersState = useState([]);
    var mountedMarkers = mountedMarkersState[0], setMountedMarkers = mountedMarkersState[1];
    var map = mapContext.map;
    if (!mapContext) {
        console.error('No map to mount to found. Did you place MarkerArry in MapMounter?');
        return null;
    }
    displayOnlyInFov &&
        useHideOutOfFovMarkers(mountedMarkers, map, function () {
            if (clustererContext.clusterer && mountedMarkers) {
                clustererContext.clusterer.repaint();
            }
            props.onMountedMarkersChange && props.onMountedMarkersChange(mountedMarkers);
        });
    props.onMountedMarkersChange && props.onMountedMarkersChange(mountedMarkers);
    var context = useState({
        map: mapContext.map,
        addObject: addMarker(mountedMarkersState, mapContext.map, clustererContext.clusterer),
        removeObject: removeMarker(mountedMarkersState, clustererContext.clusterer),
    });
    var constextState = context[0], setContextState = context[1];
    React.useEffect(function () {
        var clusterer = clustererContext.clusterer;
        removeMarkersMarkedToBeRemoved(mountedMarkers, clusterer, map);
        addMarkersToMap(mountedMarkers, clusterer, map);
        setMountedMarkers(mountedMarkers.slice());
    }, [children]);
    React.useEffect(function () {
        setContextState(__assign({}, constextState, { addObject: addMarker(mountedMarkersState, mapContext.map, clustererContext.clusterer), removeObject: removeMarker(mountedMarkersState, clustererContext.clusterer) }));
    }, [mountedMarkers]);
    return React.createElement(MarkerArrayContext.Provider, { value: context }, children);
};
export default MarkerArray;
//# sourceMappingURL=MarkerArray.js.map