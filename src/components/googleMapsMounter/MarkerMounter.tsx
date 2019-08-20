import { MarkerProps, useAddListenersToMarker } from '@components/Marker';
import AsyncMarkerArrayContext, { AsyncMarkerArrayContextType } from '@context/AsyncMounterContext';
import MapMounterContext, { MapMounterContextProps } from '@context/MapMounterContext';
import {
    MarkerClustererContext,
    MarkerClustererContextProps,
} from '@context/MarkerClustererContext';
import { MarkerMounterContext, MarkerMounterContextType } from '@context/ObjectMounterContext';
import { useHideOutOfFovMarkers } from '@lib/Optimization';
import * as React from 'react';
const { useState, useContext, useEffect } = React;

interface MarkerArrayProps {
    children?: React.ReactNode;
    batchSize?: number;
    displayOnlyInFov?: boolean;
    onMountedMarkersChange?: (markers: google.maps.Marker[]) => void;
}

const DEFAULT_MARKER_ARRAY_PROPS: MarkerArrayProps = {
    batchSize: 50,
    displayOnlyInFov: false,
};

type MarkerEventNames = google.maps.MarkerMouseEventNames;

type MountedMarkersState = [MarkerTypeOverwrite[], React.Dispatch<MarkerTypeOverwrite[]>];

type ChangedMarkersStateFlag = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

interface MarkerTypeOverwrite extends google.maps.Marker {
    id: number;
    isToBeRemoved: boolean;
}

const addMarker = (
    [mountedMarkers, setMountedMarkers]: MountedMarkersState,
    [markersDidChange, setMarkersDidCange]: ChangedMarkersStateFlag,
    clusterer: MarkerClusterer,
) => (markerProps: MarkerProps, id: number) => {
    if (mountedMarkers[id] && !mountedMarkers[id].isToBeRemoved) {
        console.warn(
            `tried to add marker with id ${id}
            to MarkerMounter. Marker with this id already exists,
            if you want to replace it, remove it first.`,
        );
        return null;
    }
    if (mountedMarkers[id]) {
        clusterer && clusterer.removeMarker(mountedMarkers[id], true);
        mountedMarkers[id].setMap(null);
    }
    const newMarker = new google.maps.Marker(markerProps.markerOptions) as MarkerTypeOverwrite;
    newMarker.isToBeRemoved = false;
    newMarker.id = id;
    mountedMarkers[id] = newMarker;
    // Careful not to call this too many times to prevent slow down
    !markersDidChange && setMarkersDidCange(true);
    return mountedMarkers[id];
};

const removeMarker = (
    [mountedMarkers, setMountedMarkers]: MountedMarkersState,
    [markersDidChange, setMarkersDidCange]: ChangedMarkersStateFlag,
) => (id: number) => {
    if (!mountedMarkers[id]) {
        console.warn(
            `tried to remove marker with id ${id}
            from MarkerMounter. Marker with this id does not exists.`,
        );
        return false;
    }
    mountedMarkers[id].isToBeRemoved = true;
    !markersDidChange && setMarkersDidCange(true);
    return true;
};

const removeMarkersFromMutable = (
    markersToRemove: MarkerTypeOverwrite[],
    clusterer: MarkerClusterer,
    removeFrom?: MarkerTypeOverwrite[],
) => {
    if (clusterer) {
        clusterer.removeMarkers(markersToRemove, true);
        // TODO: can return here?
    }
    markersToRemove.map((markerToRemove) => {
        markerToRemove.setMap(null);
        removeFrom
            ? // tslint:disable-next-line
              delete removeFrom[markerToRemove.id]
            : // tslint:disable-next-line
              delete markersToRemove[markerToRemove.id];
    });
};

const removeMarkersMarkedToBeRemoved = (
    markers: MarkerTypeOverwrite[],
    clusterer: MarkerClusterer,
    map: google.maps.Map,
) => {
    const markersToRemove = markers.filter((marker) => marker.isToBeRemoved);
    removeMarkersFromMutable(markersToRemove, clusterer, markers);
};

const addMarkersToMap = (
    markers: MarkerTypeOverwrite[],
    clusterer: MarkerClusterer,
    map: google.maps.Map,
) => {
    if (clusterer) {
        clusterer.addMarkers(markers, true);
    } else {
        markers.map((marker) => {
            if (marker.getMap() === map) {
                return marker;
            }
            marker.setMap(map);
            return marker;
        });
    }
};

const updateMarkers = (
    markersDidCange: boolean,
    reallyMountedMarkers: MountedMarkersState,
    mapContext: MapMounterContextProps,
    clustererContext: MarkerClustererContextProps,
) => {
    if (!markersDidCange) {
        return false;
    }
    const { clusterer } = clustererContext;
    const [mountedMarkers, setMountedMarkers] = reallyMountedMarkers;
    removeMarkersMarkedToBeRemoved(mountedMarkers, clusterer, mapContext.map);
    addMarkersToMap(mountedMarkers, clusterer, mapContext.map);
    clusterer && clusterer.repaint();
    setMountedMarkers([...mountedMarkers]);
    return true;
};

const useUpdateContext = (
    markersChangedFlag: ChangedMarkersStateFlag,
    reallyMountedMarkers: MountedMarkersState,
    mounterContext: MarkerMounterContextType,
    clustererContext: MarkerClustererContextProps,
) => {
    const [mountedMarkers] = reallyMountedMarkers;
    useEffect(() => {
        const [constextState, setContextState] = mounterContext;
        setContextState({
            ...constextState,
            addObject: addMarker(
                reallyMountedMarkers,
                markersChangedFlag,
                clustererContext.clusterer,
            ),
            removeObject: removeMarker(reallyMountedMarkers, markersChangedFlag),
        });
        return () => {
            constextState.stateObject.isUnmounted = true;
        };
    }, [mountedMarkers]);
};

const removeAllMarkers = (
    reallyMountedMarkers: MountedMarkersState,
    clustererContext: MarkerClustererContextProps,
) => {
    const { clusterer } = clustererContext;
    const [mountedMarkers] = reallyMountedMarkers;
    removeMarkersFromMutable(mountedMarkers, clusterer);
};

const useCleanupOnUnmount = (
    reallyMountedMarkers: MountedMarkersState,
    clustererContext: MarkerClustererContextProps,
) => {
    let isUnmounted = false;
    const { clusterer } = clustererContext;
    useEffect(() => {
        return () => {
            isUnmounted = true;
            removeAllMarkers(reallyMountedMarkers, clustererContext);
            clusterer && clusterer.repaint();
        };
    }, []);
    return isUnmounted;
};

const MarkerMounter = (props: MarkerArrayProps = DEFAULT_MARKER_ARRAY_PROPS) => {
    const currentProps = { ...DEFAULT_MARKER_ARRAY_PROPS, ...props };
    const { children, displayOnlyInFov } = currentProps;
    const reallyMountedMarkers: MountedMarkersState = useState([]);
    const markersChangedFlag: ChangedMarkersStateFlag = useState(false);
    const [mapContext, setMapContext] = useContext(MapMounterContext);
    const [clustererContext, setClustererContext] = useContext(MarkerClustererContext);
    const context: MarkerMounterContextType = useState({
        stateObject: { isUnmounted: false },
        map: mapContext.map,
        addObject: addMarker(reallyMountedMarkers, markersChangedFlag, clustererContext.clusterer),
        removeObject: removeMarker(reallyMountedMarkers, markersChangedFlag),
    });
    const { map } = mapContext;
    const [mountedMarkers, setMountedMarkers] = reallyMountedMarkers;
    const [markersDidCange, setMarkersDidCange] = markersChangedFlag;

    useHideOutOfFovMarkers(
        mountedMarkers,
        map,
        () => {
            if (clustererContext.clusterer && mountedMarkers) {
                clustererContext.clusterer.repaint();
            }
            props.onMountedMarkersChange && props.onMountedMarkersChange(mountedMarkers);
        },
        displayOnlyInFov,
    );

    const isUnmounted = useCleanupOnUnmount(reallyMountedMarkers, clustererContext);

    useUpdateContext(markersChangedFlag, reallyMountedMarkers, context, clustererContext);

    if (!mapContext) {
        console.error('No map to mount to found. Did you place MarkerMounter in MapMounter?');
        return null;
    }
    updateMarkers(markersDidCange, reallyMountedMarkers, mapContext, clustererContext);
    markersDidCange && setMarkersDidCange(false);

    props.onMountedMarkersChange && props.onMountedMarkersChange(mountedMarkers);
    return (
        <MarkerMounterContext.Provider value={context}>{children}</MarkerMounterContext.Provider>
    );
};

export default MarkerMounter;
