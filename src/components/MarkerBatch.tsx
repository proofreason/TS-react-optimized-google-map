import { MarkerMounterContext, MarkerMounterContextType } from '@context/ObjectMounterContext';
import { addListenersToMarker } from '@lib/MapUtils';
import { MarkerListener } from '../types/mapTypes';
import * as React from 'react';
import Marker, { MarkerProps } from './Marker';
const { Children, useContext, useState } = React;

interface MarkerBatchProps {
    children: React.ComponentElement<MarkerProps, null>;
}

const removeDeprecated = (
    markersProps: MarkerProps[],
    listeners: google.maps.MapsEventListener[],
    mounterContext: MarkerMounterContextType,
) => {
    const [mounter] = mounterContext;
    markersProps.map((markerProps) => {
        mounter.removeObject(markerProps.id);
    });
    listeners.map((listener) => {
        listener.remove();
    });
};

const addMarkersToMounter = (
    markersProps: MarkerProps[],
    markerListenerFncs: MarkerListener[][],
    mounterContext: MarkerMounterContextType,
): [google.maps.Marker[], google.maps.MapsEventListener[]] => {
    const [mounter] = mounterContext;
    const listeners: google.maps.MapsEventListener[] = [];
    const markers = markersProps.map((markerProps) => {
        const marker = mounter.addObject(markerProps, markerProps.id);
        listeners.concat(addListenersToMarker(markerListenerFncs[markerProps.id], marker));
        return marker;
    });
    return [markers, listeners];
};

const getPropertiesFromChildren = (
    children: React.ComponentElement<MarkerProps, null>,
): [MarkerProps[], MarkerListener[][], React.ReactNode[]] => {
    const markerProps: MarkerProps[] = [];
    const markerListenerFncs: MarkerListener[][] = [];
    const markersChildren: React.ReactNode[] = [];
    Children.map(children, (child) => {
        const { onClick, onMouseEnter, onMouseOut, id, children: markerChildren } = child.props;
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

const MarkerBatch = ({ children }: MarkerBatchProps) => {
    const mounterContext = useContext(MarkerMounterContext);
    const [prevMarkerProps, setPrevMarkerProps]: [
        MarkerProps[],
        React.SetStateAction<React.Dispatch<MarkerProps[]>>,
    ] = useState([]);
    const [prevListeners, setPrevListeners]: [
        google.maps.MapsEventListener[],
        React.SetStateAction<React.Dispatch<google.maps.MapsEventListener[]>>,
    ] = useState([]);
    const [markersChildren, setMarkersChildren] = useState([]);

    React.useEffect(() => {
        if (!mounterContext) {
            return;
        }
        removeDeprecated(prevMarkerProps, prevListeners, mounterContext);
        setPrevMarkerProps([]);
        setPrevListeners([]);
        if (!children) {
            return;
        }
        const [markerProps, markerListenerFncs, newChildren] = getPropertiesFromChildren(children);
        const [markers, listeners] = addMarkersToMounter(
            markerProps,
            markerListenerFncs,
            mounterContext,
        );
        setMarkersChildren(newChildren);
        setPrevMarkerProps(markerProps);
        setPrevListeners(listeners);
    }, [children]);

    return <>{markersChildren}</>;
};

export default MarkerBatch;
