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
import AsyncMarkerArrayContext, { useAddToAsyncMounter, } from "../context/AsyncMounterContext";
import { useAddToObjectMounter, MarkerArrayContext, objectMounterReady, } from "../context/ObjectMounterContext";
import * as React from 'react';
var useContext = React.useContext, useEffect = React.useEffect;
var noMounterFound = function () {
    console.error('No map found to mount marker to. Did you wrap it with ObjectMounter or AsyncMounter?');
    return false;
};
var useAddMarkerToMap = function (props) {
    var asyncMarkerArrayContext = useContext(AsyncMarkerArrayContext)[0];
    var markerArrayContext = useContext(MarkerArrayContext)[0];
    // async loading has preccedence
    if (objectMounterReady(asyncMarkerArrayContext)) {
        return useAddToAsyncMounter(asyncMarkerArrayContext, props);
    }
    if (objectMounterReady(markerArrayContext)) {
        return useAddToObjectMounter(markerArrayContext, props);
    }
    noMounterFound();
};
var useAddListenersToMarker = function (marker, listeners, changFlagged) {
    if (changFlagged === void 0) { changFlagged = null; }
    var activeListeners = [];
    var markerValid = marker !== null || undefined;
    var toWatch = changFlagged === null ? [markerValid, listeners] : [markerValid, changFlagged];
    useEffect(function () {
        if (markerValid) {
            listeners.map(function (_a) {
                var eventName = _a.eventName, listener = _a.listener;
                if (!listener) {
                    return null;
                }
                var enhancedListener = function (event) { return listener(marker, event); };
                // tslint:disable-next-line
                var addedListener = marker.addListener(eventName, enhancedListener);
                activeListeners.push(addedListener);
            });
        }
        return function () {
            activeListeners.map(function (listener) {
                listener.remove();
            });
        };
    }, toWatch);
};
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
export default Marker;
export { useAddListenersToMarker };
//# sourceMappingURL=Marker.js.map