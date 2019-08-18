import { MarkerMounterContext } from "../context/ObjectMounterContext";
import { addListenersToMarker } from "../lib/MapUtils";
import * as React from 'react';
var Children = React.Children, useContext = React.useContext, useState = React.useState;
var removeDeprecated = function (markersProps, listeners, mounterContext) {
    var mounter = mounterContext[0];
    markersProps.map(function (markerProps) {
        mounter.removeObject(markerProps.id);
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
var MarkerBatch = function (_a) {
    var children = _a.children;
    var mounterContext = useContext(MarkerMounterContext);
    var _b = useState([]), prevMarkerProps = _b[0], setPrevMarkerProps = _b[1];
    var _c = useState([]), prevListeners = _c[0], setPrevListeners = _c[1];
    var _d = useState([]), markersChildren = _d[0], setMarkersChildren = _d[1];
    React.useEffect(function () {
        if (!mounterContext) {
            return;
        }
        removeDeprecated(prevMarkerProps, prevListeners, mounterContext);
        setPrevMarkerProps([]);
        setPrevListeners([]);
        if (!children) {
            return;
        }
        var _a = getPropertiesFromChildren(children), markerProps = _a[0], markerListenerFncs = _a[1], newChildren = _a[2];
        var _b = addMarkersToMounter(markerProps, markerListenerFncs, mounterContext), markers = _b[0], listeners = _b[1];
        setMarkersChildren(newChildren);
        setPrevMarkerProps(markerProps);
        setPrevListeners(listeners);
    }, [children]);
    return React.createElement(React.Fragment, null, markersChildren);
};
export default MarkerBatch;
//# sourceMappingURL=MarkerBatch.js.map