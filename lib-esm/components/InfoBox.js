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
var useEffect = React.useEffect, useContext = React.useContext, useState = React.useState;
import { renderToString } from 'react-dom/server';
var openWindowOnPosition = function (infoBox, map, position) {
    infoBox.open(map, null);
    infoBox.setPosition(position);
};
var InfoBox = function (props) {
    var _a = useState(null), infoBox = _a[0], setInfoBox = _a[1];
    var _b = useContext(MapMounterContext), mapContext = _b[0], setMapContext = _b[1];
    var open = props.open, position = props.position, children = props.children, boxProps = __rest(props, ["open", "position", "children"]);
    var map = mapContext.map;
    useEffect(function () {
        // TODO: figure out a better way!! This is due to loading google script
        var InfoBoxLib = require('google-maps-infobox');
        var infoBoxRef = new InfoBoxLib.default(boxProps);
        setInfoBox(infoBoxRef);
        return function () {
            infoBoxRef && infoBoxRef.close();
        };
    }, []);
    useEffect(function () {
        if (infoBox) {
            infoBox.setContent(renderToString(children));
            open ? openWindowOnPosition(infoBox, map, position) : infoBox.close();
        }
    }, [open, infoBox]);
    useEffect(function () {
        if (infoBox) {
            infoBox.setOptions(boxProps);
        }
    }, [props, infoBox]);
    return React.createElement(React.Fragment, null);
};
export default InfoBox;
//# sourceMappingURL=InfoBox.js.map