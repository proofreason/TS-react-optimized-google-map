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
var MapMounterContext_1 = require("../context/MapMounterContext");
var MarkerClustererContext_1 = require("../context/MarkerClustererContext");
var MarkerClusterer = require("marker-clusterer-plus/src/markerclusterer");
var React = require("react");
var MarkerMounter_1 = require("./googleMapsMounter/MarkerMounter");
var INITIAL_STATE = {
    context: [{ clusterer: null }, null],
};
var BUILDINGS_VISIBLE_TRESHOLD_ZOOM = 15;
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
    var _a = React.useContext(MapMounterContext_1.default), mapMounterContext = _a[0], setMapMounterContext = _a[1];
    var allMakers = contextState.clusterer ? contextState.clusterer.getMarkers() : [];
    React.useEffect(function () {
        var clusterer = new MarkerClusterer(mapMounterContext.map, [], __assign({}, defaultClustererOptions, clusteringSettings));
        setContextState({ clusterer: clusterer });
    }, []);
    React.useEffect(function () {
        if (contextState.clusterer) {
            var clusterClick_1 = google.maps.event.addListener(contextState.clusterer, 'clusterclick', handleClusterClick);
            return function () { return google.maps.event.removeListener(clusterClick_1); };
        }
    }, [contextState.clusterer]);
    var handleClusterClick = function (cluster) {
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
        // TODO: remove if everything works contextState.clusterer.repaint();
    };
    return (contextState.clusterer && (React.createElement(MarkerClustererContext_1.MarkerClustererContext.Provider, { value: context },
        React.createElement(MarkerMounter_1.default, { onMountedMarkersChange: getMountedMarkersAndRefresh }, children))));
};
exports.default = OptimizedMarkerClusterer;
//# sourceMappingURL=MarkerClusterer.js.map