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
import * as React from 'react';
import { createPortal } from 'react-dom';
var useContext = React.useContext, useState = React.useState;
var defaultProps = {
    children: [],
    className: '',
    position: 0,
};
var MapControll = function (props) {
    if (props === void 0) { props = defaultProps; }
    var _a = useState(null), controlDiv = _a[0], setControlDiv = _a[1];
    var _b = useState(null), divIndex = _b[0], setDivIndex = _b[1];
    var _c = useState(false), controllLoaded = _c[0], setControllLoaded = _c[1];
    var _d = useContext(MapMounterContext), mapContex = _d[0], setMapContext = _d[1];
    var map = mapContex.map;
    var offsets = props.offsets, className = props.className, containerStyle = props.containerStyle;
    var updateStyles = function () {
        var styles = {};
        if (offsets) {
            styles = __assign({}, styles, getOffsetStyles());
        }
        if (containerStyle) {
            styles = __assign({}, styles, containerStyle);
        }
        Object.assign(controlDiv.style, styles);
    };
    React.useEffect(function () {
        setControlDiv(document.createElement('div'));
        var index = map.controls[props.position].getLength();
        setDivIndex(index);
        return function () {
            map.controls[props.position].removeAt(index);
        };
    }, []);
    React.useEffect(function () {
        if ((controlDiv && divIndex !== null) || undefined) {
            map.controls[props.position].push(controlDiv);
            updateStyles();
            setControllLoaded(true);
        }
    }, [controlDiv, divIndex]);
    React.useEffect(function () {
        if ((controlDiv && divIndex !== null) || undefined) {
            updateStyles();
        }
    }, [offsets, containerStyle]);
    var getOffsetStyles = function () {
        var _a = props.offsets, bottomOffset = _a.bottomOffset, topOffset = _a.topOffset, leftOffset = _a.leftOffset, rightOffset = _a.rightOffset;
        return {
            marginBottom: (bottomOffset ? bottomOffset : 0) + "px",
            marginTop: (topOffset ? topOffset : 0) + "px",
            marginLeft: (leftOffset ? leftOffset : 0) + "px",
            marginRight: (rightOffset ? rightOffset : 0) + "px",
        };
    };
    className && controlDiv.classList.add(className);
    return controllLoaded && controlDiv && createPortal(props.children, controlDiv);
};
export default MapControll;
//# sourceMappingURL=MapControll.js.map