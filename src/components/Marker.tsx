import AsyncMarkerArrayContext, {
    useAddToAsyncMounter,
    asyncMounterReady,
} from '@context/AsyncMounterContext';
import {
    useAddToObjectMounter,
    MarkerArrayContext,
    objectMounterReady,
} from '@context/ObjectMounterContext';
import * as React from 'react';

const { useContext, useEffect } = React;

type MarkerListenerFunction = (marker: google.maps.Marker, event: MouseEvent) => void;

interface Optimizations {
    listenersChanged?: boolean;
}

interface MarkerOptions extends google.maps.MarkerOptions {
    [custom: string]: any;
}

interface MarkerProps {
    [index: string]: any;
    children?: React.ReactNode;
    id: number;
    optimizations?: Optimizations;
    onClick?: MarkerListenerFunction;
    onMouseEnter?: MarkerListenerFunction;
    onMouseOut?: MarkerListenerFunction;
    markerOptions: MarkerOptions;
}

const noMounterFound = () => {
    console.error(
        'No map found to mount marker to. Did you wrap it with ObjectMounter or AsyncMounter?',
    );
    return false;
};

const useAddMarkerToMap = (props: MarkerProps): google.maps.Marker => {
    const [asyncMarkerArrayContext] = useContext(AsyncMarkerArrayContext);
    const [markerArrayContext] = useContext(MarkerArrayContext);

    // async loading has preccedence
    if (objectMounterReady(asyncMarkerArrayContext)) {
        return useAddToAsyncMounter(asyncMarkerArrayContext, props);
    }

    if (objectMounterReady(markerArrayContext)) {
        return useAddToObjectMounter(markerArrayContext, props);
    }

    noMounterFound();
};

interface MarkerListener {
    eventName: google.maps.MarkerMouseEventNames;
    listener: MarkerListenerFunction;
}

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
            listeners.map(({ eventName, listener }) => {
                if (!listener) {
                    return null;
                }
                const enhancedListener = (event: MouseEvent) => listener(marker, event);
                // tslint:disable-next-line
                const addedListener = marker.addListener(eventName, enhancedListener);
                activeListeners.push(addedListener);
            });
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

export { MarkerProps, useAddListenersToMarker, MarkerOptions };
