var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import MapMounterContext from "../context/MapMounterContext";
import * as React from 'react';
import { renderToString } from 'react-dom/server';
var useEffect = React.useEffect, useContext = React.useContext, useState = React.useState;
var openWindowOnPosition = function (infoWindow, map, position) {
    infoWindow.open(map);
    infoWindow.setPosition(position);
};
var InfoWindow = function (props) {
    var _a = useState(null), infoWindow = _a[0], setInfoWindow = _a[1];
    var _b = useContext(MapMounterContext), mapContext = _b[0], setMapContext = _b[1];
    var open = props.open, position = props.position, children = props.children, windowProps = __rest(props, ["open", "position", "children"]);
    var map = mapContext.map;
    useEffect(function () {
        setInfoWindow(new google.maps.InfoWindow(windowProps));
    }, []);
    useEffect(function () {
        if (infoWindow) {
            infoWindow.setContent(renderToString(children));
            open ? openWindowOnPosition(infoWindow, map, position) : infoWindow.close();
        }
    }, [open, infoWindow]);
    useEffect(function () {
        if (infoWindow) {
            infoWindow.setOptions(windowProps);
        }
    }, [props, infoWindow]);
    return React.createElement(React.Fragment, null);
};
export default InfoWindow;
//# sourceMappingURL=InfoWindow.js.map