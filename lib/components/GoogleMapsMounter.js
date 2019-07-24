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
var Utils_1 = require("../lib/Utils");
var React = require("react");
var MarkerArray_1 = require("./googleMapsMounter/MarkerArray");
var useEffect = React.useEffect, useState = React.useState;
var DEFAULT_WRAPPER_ID = 'google-maps-wrapper';
var DEFAULT_PROPS = {
    mapWrapper: React.createElement("div", { id: DEFAULT_WRAPPER_ID, style: { width: '100%', height: '100%' } }),
    withMounter: true,
    zoom: 7,
};
var useGoogleMap = function (mapSettings) {
    var _a = useState(null), map = _a[0], setMap = _a[1];
    if (!Utils_1.googleMapsLoaded()) {
        console.error('Map mounter used before google object init -> Aborting init');
        return null;
    }
    useEffect(function () {
        var wrapperElement = document.getElementById(mapSettings.mapWrapperId);
        if (wrapperElement) {
            setMap(new google.maps.Map(wrapperElement, mapSettings));
        }
        else {
            console.error('Map wrapper was not found. Make sure you provided unique id for the element');
        }
    }, []);
    return map;
};
var GoogleMapsMounter = React.memo(function (props) {
    if (props === void 0) { props = DEFAULT_PROPS; }
    var currentProps = __assign({}, DEFAULT_PROPS, props);
    var children = currentProps.children, mapWrapper = currentProps.mapWrapper, getMountedMarkers = currentProps.getMountedMarkers;
    var context = React.useState({ map: null });
    var contextState = context[0], setContext = context[1];
    var map = useGoogleMap(__assign({}, currentProps, { mapWrapperId: mapWrapper.props.id }));
    map && !contextState.map && setContext({ map: map });
    return (React.createElement(MapMounterContext_1.default.Provider, { value: context },
        React.createElement("div", { className: 'react-map-content-wrapper' },
            mapWrapper,
            contextState.map &&
                (props.withMounter ? (React.createElement(MarkerArray_1.default, { onMountedMarkersChange: getMountedMarkers, key: 0 },
                    React.createElement("div", { className: "react-map-added-content" }, children))) : (React.createElement("div", { className: "react-map-added-content" }, children))))));
});
exports.default = GoogleMapsMounter;
//# sourceMappingURL=GoogleMapsMounter.js.map