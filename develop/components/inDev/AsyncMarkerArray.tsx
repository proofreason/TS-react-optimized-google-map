import { MarkerProps } from '@components/Marker';
import AsyncMarkerArrayContext, { AsyncMarkerArrayContextType } from '@context/AsyncMounterContext';
import MapMounterContext from '@context/MapMounterContext';
import * as React from 'react';
const { useState, useContext } = React;

interface MarkerArrayProps {
    children?: React.ReactNode;
    batchSize?: number;
}

const DEFAULT_MARKER_ARRAY_PROPS: MarkerArrayProps = {
    batchSize: 500,
};

const markersToMountObservers: ({ notify: () => void })[] = [];
const markersToMount: google.maps.Marker[] = [];
const mountedMarkers: google.maps.Marker[] = [];
let forceMount: NodeJS.Timeout = null;
const timeoutBeforeForceMount = 100;

const addMarker = (map: google.maps.Map, batchSize: number) => (
    marker: MarkerProps,
    id: number,
) => {
    forceMount && clearTimeout(forceMount);
    if (markersToMount[id]) {
        console.warn(
            `tried to add marker with id ${id}
            to MarkerArray. Marker with this id already exists,
             if you want to replace it, remove it first.`,
        );
        return new Promise<google.maps.Marker>((resolve) => resolve(null));
    }
    const newMarker = new google.maps.Marker(marker);
    markersToMount[id] = newMarker;
    const MarkerMount = new Promise<google.maps.Marker>((resolve, reject) => {
        markersToMountObservers.push({ notify: () => resolve(newMarker) });
    });
    const markersCount = markersToMount.reduce((total) => total + 1, 0);
    const executeMount = () => {
        mountMarkers(markersToMount, map)
            .then(() => {
                markersToMountObservers.map((observer) => {
                    observer.notify();
                });
            })
            .catch((error) => console.error(`Failed mounting async markers with ${error}`));
        markersToMount.length = 0;
    };
    if (markersCount === batchSize) {
        executeMount();
    }
    forceMount = setTimeout(() => {
        executeMount();
    }, timeoutBeforeForceMount);
    return MarkerMount;
};

const mountMarkers = async (markers: google.maps.Marker[], map: google.maps.Map) => {
    markers.map((marker) => {
        marker.setMap(map);
    });
    mountedMarkers.concat(markers);
    return markers;
};

const removeMarker = (id: number) => {
    if (!markersToMount[id] && !mountedMarkers[id]) {
        console.warn(
            `tried to remove marker with id ${id}
            from MarkerArray. Marker with this id does not exists.`,
        );
        return false;
    }
    if (markersToMount[id]) {
        markersToMount[id].setMap(null);
        markersToMount.splice(id, 1);
        return true;
    }
    if (mountedMarkers[id]) {
        mountedMarkers[id].setMap(null);
        mountedMarkers.splice(id, 1);
        return true;
    }
};

const AsyncMarkerArray = (props: MarkerArrayProps = DEFAULT_MARKER_ARRAY_PROPS) => {
    const currentProps = { ...DEFAULT_MARKER_ARRAY_PROPS, ...props };
    const { children, batchSize } = currentProps;
    const [mapContext, setMapContext] = useContext(MapMounterContext);
    const { map } = mapContext;
    if (!mapContext) {
        console.error('No map to mount to found. Did you place MarkerArry in MapMounter?');
        return null;
    }
    const context: AsyncMarkerArrayContextType = useState({
        map: mapContext.map,
        addObject: addMarker(mapContext.map, batchSize),
        removeObject: removeMarker,
        stateObject: { isUnmounted: false },
    });
    return (
        <AsyncMarkerArrayContext.Provider value={context}>
            {children}
        </AsyncMarkerArrayContext.Provider>
    );
};

export default AsyncMarkerArray;
