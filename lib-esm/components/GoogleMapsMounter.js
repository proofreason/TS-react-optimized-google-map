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
import { googleMapsLoaded } from "../lib/Utils";
import * as React from 'react';
import MarkerMounter from './googleMapsMounters/MarkerMounter';
var useEffect = React.useEffect, useState = React.useState;
var DEFAULT_ELEMENT_ID = 'google-maps-element';
var DEFAULT_PROPS = {
    mapElement: React.createElement("div", { id: DEFAULT_ELEMENT_ID, style: { width: '100%', height: '100%' } }),
    withMounter: true,
    zoom: 7,
};
var useGoogleMap = function (mapSettings) {
    var _a = useState(null), map = _a[0], setMap = _a[1];
    if (!googleMapsLoaded()) {
        console.error('Map mounter used before google object init -> Aborting init');
        return null;
    }
    useEffect(function () {
        var mapElement = document.getElementById(mapSettings.mapElementId);
        if (mapElement) {
            setMap(new google.maps.Map(mapElement, mapSettings));
        }
        else {
            console.error('Map element was not found. Make sure you provided unique id for the element');
        }
    }, []);
    return map;
};
var GoogleMapsMounter = React.memo(function (props) {
    if (props === void 0) { props = DEFAULT_PROPS; }
    var currentProps = __assign(__assign({}, DEFAULT_PROPS), props);
    var children = currentProps.children, mapElement = currentProps.mapElement, getMountedMarkers = currentProps.getMountedMarkers, mapWrapperStyle = currentProps.mapWrapperStyle;
    var context = React.useState({ map: null });
    var contextState = context[0], setContext = context[1];
    var map = useGoogleMap(__assign(__assign({}, currentProps), { mapElementId: mapElement.props.id }));
    map && !contextState.map && setContext({ map: map });
    return (React.createElement(MapMounterContext.Provider, { value: context },
        React.createElement("div", { className: 'react-map-content-wrapper', style: mapWrapperStyle },
            mapElement,
            contextState.map &&
                (props.withMounter ? (React.createElement(MarkerMounter, { onMountedMarkersUpdateFinish: getMountedMarkers, key: 0 },
                    React.createElement("div", { className: "react-map-added-content" }, children))) : (React.createElement("div", { className: "react-map-added-content" }, children))))));
});
export default GoogleMapsMounter;
//# sourceMappingURL=GoogleMapsMounter.js.map