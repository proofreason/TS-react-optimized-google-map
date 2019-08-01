import AsyncMarkerArrayContext, {
    useAddToAsyncMounter,
    asyncMounterReady,
} from '@context/AsyncMounterContext';
import {
    useAddToObjectMounter,
    MarkerMounterContext,
    objectMounterReady,
} from '@context/ObjectMounterContext';
import { addListenersToMarker } from '@lib/MapUtils';
import { MarkerListenerFunction, MarkerListener } from '@src_types/mapTypes';
import * as React from 'react';

const { useContext, useEffect } = React;

interface Optimizations {
    listenersChanged?: boolean;
}

interface MarkerProps {
    [index: string]: any;
    children?: React.ReactNode;
    id: number;
    optimizations?: Optimizations;
    onClick?: MarkerListenerFunction;
    onMouseEnter?: MarkerListenerFunction;
    onMouseOut?: MarkerListenerFunction;
    markerOptions: google.maps.MarkerOptions;
}

const noMounterFound = () => {
    console.error(
        'No map found to mount marker to. Did you wrap it with ObjectMounter or AsyncMounter?',
    );
    return false;
};

const useAddMarkerToMap = (props: MarkerProps): google.maps.Marker => {
    const [asyncMarkerArrayContext] = useContext(AsyncMarkerArrayContext);
    const [markerArrayContext] = useContext(MarkerMounterContext);

    if (objectMounterReady(markerArrayContext)) {
        return useAddToObjectMounter(markerArrayContext, props);
    }

    noMounterFound();
};

const useAddListenersToMarker = (
    marker: google.maps.Marker,
    listeners: MarkerListener[],
    changFlagged: boolean = null,
) => {
    const activeListeners: google.maps.MapsEventListener[] = [];
    const markerValid = marker !== null || undefined;
    const toWatch = changFlagged === null ? [markerValid, listeners] : [markerValid, changFlagged];
    useEffect(() => {
        if (markerValid) {
            activeListeners.concat(addListenersToMarker(listeners, marker));
        }
        return () => {
            activeListeners.map((listener) => {
                listener.remove();
            });
        };
    }, toWatch);
};

const useUpdateOnPropsChange = (
    markerOptions: google.maps.MarkerOptions,
    marker: google.maps.Marker,
) => {
    useEffect(() => {
        if (marker) {
            marker.setOptions(markerOptions);
        }
    }, [markerOptions, marker]);
};

const Marker = (props: MarkerProps) => {
    return (
        <MarkerInner {...props} key={props.id}>
            {props.children}
        </MarkerInner>
    );
};

// change of id will generate new key and unmount the old one -> new id === new marker
const MarkerInner = (props: MarkerProps) => {
    const addedMarker = useAddMarkerToMap(props);
    // this also handles the removal of listeners
    useAddListenersToMarker(
        addedMarker,
        [
            { eventName: 'click', listener: props.onClick },
            { eventName: 'mouseover', listener: props.onMouseEnter },
            { eventName: 'mouseout', listener: props.onMouseOut },
        ],
        props.optimizations && props.optimizations.listenersChanged,
    );
    useUpdateOnPropsChange(props.markerOptions, addedMarker);
    return <>{props.children}</>;
};

export default Marker;

export { MarkerProps, useAddListenersToMarker };
