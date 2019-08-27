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
import MapMounterContext from "../context/MapMounterContext";
import { MarkerClustererContext, } from "../context/MarkerClustererContext";
import * as MarkerClusterer from 'marker-clusterer-plus/src/markerclusterer';
import * as React from 'react';
import MarkerMounter from './googleMapsMounter/MarkerMounter';
var INITIAL_STATE = {
    context: [{ clusterer: null }, null],
};
var BUILDINGS_VISIBLE_TRESHOLD_ZOOM = 15;
/**
 * If zoomOnClick is enabled, the default clusterer behavior will be used
 * no custom function will be registered for onClick even onClickExtenderWillNotWork
 */
var defaultClustererOptions = {
    maxZoom: BUILDINGS_VISIBLE_TRESHOLD_ZOOM,
    averageCenter: true,
    zoomOnClick: false,
    ignoreHidden: true,
    gridSize: 50,
};
var OptimizedMarkerClusterer = function (props) {
    var children = props.children, clusteringSettings = props.clusteringSettings, onMountedMarkersChange = props.onMountedMarkersChange;
    var context = React.useState({ clusterer: null });
    var contextState = context[0], setContextState = context[1];
    var _a = React.useContext(MapMounterContext), mapMounterContext = _a[0], setMapMounterContext = _a[1];
    var allMakers = contextState.clusterer ? contextState.clusterer.getMarkers() : [];
    var currentProps = __assign({}, defaultClustererOptions, clusteringSettings);
    React.useEffect(function () {
        var clusterer = new MarkerClusterer(mapMounterContext.map, [], currentProps);
        setContextState({ clusterer: clusterer });
    }, []);
    var addListenerToClusterer = function (toCall, action) {
        if (action === void 0) { action = 'clusterclick'; }
        var addListener = google.maps.event.addListener;
        return addListener(contextState.clusterer, action, toCall);
    };
    React.useEffect(function () {
        var customOnClickFunction = currentProps.customOnClickFunction, onClickExtender = currentProps.onClickExtender, zoomOnClick = currentProps.zoomOnClick;
        if (!contextState.clusterer || zoomOnClick === true) {
            return;
        }
        if (customOnClickFunction) {
            var clickWithExtender = function (cluster) {
                onClickExtender(cluster);
                customOnClickFunction(cluster);
            };
            var customClusterClick_1 = addListenerToClusterer(clickWithExtender);
            return function () { return google.maps.event.removeListener(customClusterClick_1); };
        }
        var clusterClick = addListenerToClusterer(handleClusterClick);
        return function () { return google.maps.event.removeListener(clusterClick); };
    }, [contextState.clusterer]);
    var handleClusterClick = function (cluster) {
        var onClickExtender = props.clusteringSettings.onClickExtender;
        onClickExtender && currentProps.onClickExtender(cluster);
        var ClusterMap = cluster.getMap();
        var padding = 100;
        if (ClusterMap.getZoom() <= contextState.clusterer.getMaxZoom()) {
            ClusterMap.fitBounds(cluster.getBounds(), padding);
            if (ClusterMap.getZoom() > contextState.clusterer.getMaxZoom()) {
                ClusterMap.setZoom(contextState.clusterer.getMaxZoom());
            }
        }
    };
    var getMountedMarkersAndRefresh = function (markers) {
        onMountedMarkersChange && onMountedMarkersChange(markers);
    };
    return (contextState.clusterer && (React.createElement(MarkerClustererContext.Provider, { value: context },
        React.createElement(MarkerMounter, { onMountedMarkersChange: getMountedMarkersAndRefresh }, children))));
};
export default OptimizedMarkerClusterer;
//# sourceMappingURL=MarkerClusterer.js.map