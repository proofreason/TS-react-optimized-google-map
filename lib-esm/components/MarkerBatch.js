import { MarkerMounterContext } from "../context/ObjectMounterContext";
import { addListenersToMarker } from "../lib/MapUtils";
import * as React from 'react';
var Children = React.Children, useContext = React.useContext, useState = React.useState, useEffect = React.useEffect;
var removeDeprecated = function (markersProps, listeners, mounterContext) {
    var mounter = mounterContext[0];
    markersProps.map(function (markerProps) {
        var isUnmounted = mounter.stateObject.isUnmounted;
        !isUnmounted && mounter.removeObject(markerProps.id);
    });
    listeners.map(function (listener) {
        listener.remove();
    });
};
var addMarkersToMounter = function (markersProps, markerListenerFncs, mounterContext) {
    var mounter = mounterContext[0];
    var listeners = [];
    var markers = markersProps.map(function (markerProps) {
        var marker = mounter.addObject(markerProps, markerProps.id);
        listeners.concat(addListenersToMarker(markerListenerFncs[markerProps.id], marker));
        return marker;
    });
    return [markers, listeners];
};
var getPropertiesFromChildren = function (children) {
    var markerProps = [];
    var markerListenerFncs = [];
    var markersChildren = [];
    Children.map(children, function (child) {
        var _a = child.props, onClick = _a.onClick, onMouseEnter = _a.onMouseEnter, onMouseOut = _a.onMouseOut, id = _a.id, markerChildren = _a.children;
        markerProps[id] = child.props;
        markerListenerFncs[id] = [
            { eventName: 'click', listener: onClick },
            { eventName: 'mouseover', listener: onMouseEnter },
            { eventName: 'mouseout', listener: onMouseOut },
        ];
        markersChildren.push(markerChildren);
    });
    return [markerProps, markerListenerFncs, markersChildren];
};
var useUpdateFromChildren = function (children, markersChildrenState, prevMarkerPropsState, prevListenersState, mounterContext) {
    var mounterContextState = mounterContext[0];
    useEffect(function () {
        var prevMarkerProps = prevMarkerPropsState[0], setPrevMarkerProps = prevMarkerPropsState[1];
        var prevListeners = prevListenersState[0], setPrevListeners = prevListenersState[1];
        var markersChildren = markersChildrenState[0], setMarkersChildren = markersChildrenState[1];
        if (!children ||
            !mounterContext ||
            !mounterContextState.addObject ||
            !mounterContextState.removeObject) {
            return;
        }
        var _a = getPropertiesFromChildren(children), markerProps = _a[0], markerListenerFncs = _a[1], newChildren = _a[2];
        var _b = addMarkersToMounter(markerProps, markerListenerFncs, mounterContext), markers = _b[0], listeners = _b[1];
        setMarkersChildren(newChildren);
        setPrevMarkerProps(markerProps);
        setPrevListeners(listeners);
        return function () {
            removeDeprecated(markerProps, prevListeners, mounterContext);
        };
    }, [children, mounterContextState]);
};
var MarkerBatch = function (_a) {
    var children = _a.children;
    var mounterContext = useContext(MarkerMounterContext);
    var prevMarkerPropsState = useState([]);
    var prevListenersState = useState([]);
    var childrenState = useState([]);
    var markersChildren = childrenState[0];
    useUpdateFromChildren(children, childrenState, prevMarkerPropsState, prevListenersState, mounterContext);
    return React.createElement(React.Fragment, null, markersChildren);
};
export default MarkerBatch;
//# sourceMappingURL=MarkerBatch.js.map