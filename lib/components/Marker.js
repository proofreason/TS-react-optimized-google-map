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
var ObjectMounterContext_1 = require("../context/ObjectMounterContext");
var MapUtils_1 = require("../lib/MapUtils");
var React = require("react");
var useContext = React.useContext, useEffect = React.useEffect;
var noMounterFound = function () {
    console.error('No map found to mount marker to. Did you wrap it with ObjectMounter or AsyncMounter?');
    return false;
};
var useAddMarkerToMap = function (props) {
    var markerArrayContext = useContext(ObjectMounterContext_1.MarkerMounterContext)[0];
    if (!markerArrayContext) {
        noMounterFound();
    }
    return ObjectMounterContext_1.useAddToObjectMounter(markerArrayContext, props);
};
var useAddListenersToMarker = function (marker, listeners, changFlagged) {
    if (changFlagged === void 0) { changFlagged = null; }
    var markerArrayContext = useContext(ObjectMounterContext_1.MarkerMounterContext)[0];
    var activeListeners = [];
    var markerValid = marker !== null || undefined;
    useEffect(function () {
        if (markerValid && markerArrayContext.addObject && markerArrayContext.removeObject) {
            activeListeners.concat(MapUtils_1.addListenersToMarker(listeners, marker));
        }
        return function () {
            activeListeners.map(function (listener) {
                listener.remove();
            });
        };
    }, [markerValid, changFlagged, markerArrayContext]);
};
exports.useAddListenersToMarker = useAddListenersToMarker;
var useUpdateOnPropsChange = function (markerOptions, marker) {
    useEffect(function () {
        if (marker) {
            marker.setOptions(markerOptions);
        }
    }, [markerOptions, marker]);
};
var Marker = function (props) {
    return (React.createElement(MarkerInner, __assign({}, props, { key: props.id }), props.children));
};
// change of id will generate new key and unmount the old one -> new id === new marker
var MarkerInner = function (props) {
    var addedMarker = useAddMarkerToMap(props);
    // this also handles the removal of listeners
    useAddListenersToMarker(addedMarker, [
        { eventName: 'click', listener: props.onClick },
        { eventName: 'mouseover', listener: props.onMouseEnter },
        { eventName: 'mouseout', listener: props.onMouseOut },
    ], props.optimizations && props.optimizations.listenersChanged);
    useUpdateOnPropsChange(props.markerOptions, addedMarker);
    return React.createElement(React.Fragment, null, props.children);
};
exports.default = Marker;
//# sourceMappingURL=Marker.js.map