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
var MapMounterContext_1 = __importDefault(require("../context/MapMounterContext"));
var MarkerClustererContext_1 = require("../context/MarkerClustererContext");
var markerclusterer_1 = __importDefault(require("marker-clusterer-plus/src/markerclusterer"));
var React = __importStar(require("react"));
var MarkerMounter_1 = __importDefault(require("./googleMapsMounter/MarkerMounter"));
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
    var children = props.children, clusteringSettings = props.clusteringSettings, onMountedMarkersUpdateFinish = props.onMountedMarkersUpdateFinish, onMountedMarkersUpdateStart = props.onMountedMarkersUpdateStart;
    var context = React.useState({ clusterer: null });
    var contextState = context[0], setContextState = context[1];
    var mapMounterContext = React.useContext(MapMounterContext_1.default)[0];
    var currentProps = __assign(__assign({}, defaultClustererOptions), clusteringSettings);
    React.useEffect(function () {
        var clusterer = new markerclusterer_1.default(mapMounterContext.map, [], currentProps);
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
                onClickExtender && onClickExtender(cluster);
                customOnClickFunction(cluster);
            };
            var customClusterClick_1 = addListenerToClusterer(clickWithExtender);
            return function () { return google.maps.event.removeListener(customClusterClick_1); };
        }
        var clusterClick = addListenerToClusterer(handleClusterClick);
        return function () { return google.maps.event.removeListener(clusterClick); };
    }, [contextState.clusterer]);
    var handleClusterClick = function (cluster) {
        if (props.clusteringSettings) {
            var onClickExtender = props.clusteringSettings.onClickExtender;
            onClickExtender && currentProps.onClickExtender(cluster);
        }
        var ClusterMap = cluster.getMap();
        var padding = 100;
        if (ClusterMap.getZoom() <= contextState.clusterer.getMaxZoom()) {
            ClusterMap.fitBounds(cluster.getBounds(), padding);
            if (ClusterMap.getZoom() > contextState.clusterer.getMaxZoom()) {
                ClusterMap.setZoom(contextState.clusterer.getMaxZoom());
            }
        }
    };
    return (contextState.clusterer && (React.createElement(MarkerClustererContext_1.MarkerClustererContext.Provider, { value: context },
        React.createElement(MarkerMounter_1.default, { onMountedMarkersUpdateFinish: onMountedMarkersUpdateFinish, onMountedMarkersUpdateStart: onMountedMarkersUpdateStart }, children))));
};
exports.default = OptimizedMarkerClusterer;
//# sourceMappingURL=MarkerClusterer.js.map