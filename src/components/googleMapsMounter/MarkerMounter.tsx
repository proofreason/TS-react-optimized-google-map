import { MarkerProps, useAddListenersToMarker } from '@components/Marker';
import AsyncMarkerArrayContext, { AsyncMarkerArrayContextType } from '@context/AsyncMounterContext';
import MapMounterContext, { MapMounterContextProps } from '@context/MapMounterContext';
import {
    MarkerClustererContext,
    MarkerClustererContextProps,
    MarkerClustererContextType,
} from '@context/MarkerClustererContext';
import { MarkerMounterContext, MarkerMounterContextType } from '@context/ObjectMounterContext';
import { mutableRemoveMarkersFrom } from '@lib/MounterCleanup';
import { useHideOutOfFovMarkers } from '@lib/Optimization';
import { MustExtendProps } from '@src_types/mounterCleanupTypes';
import {
    MountedMarkersState,
    ChangedMarkersStateFlag,
    MarkerTypeOverwrite,
} from '@src_types/mounterTypes';
import * as React from 'react';
import WithMarkerMounterCleanup from './HOC/WithMarkerMounterCleanup';
const { useState, useContext, useEffect } = React;

interface MarkerMounterProps extends MustExtendProps {
    children?: React.ReactNode;
    batchSize?: number;
    displayOnlyInFov?: boolean;
    onMountedMarkersChange?: (markers: google.maps.Marker[]) => void;
}

const DEFAULT_MARKER_ARRAY_PROPS: MarkerMounterProps = {
    instanceMarkers: null,
    batchSize: 50,
    displayOnlyInFov: false,
};

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

const removeMarkersMarkedToBeRemoved = (
    markers: MarkerTypeOverwrite[],
    clusterer: MarkerClusterer,
    map: google.maps.Map,
) => {
    const markersToRemove = markers.filter((marker) => marker.isToBeRemoved);
    mutableRemoveMarkersFrom(markersToRemove, clusterer, markers);
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

const useUpdateMarkers = (
    markersDidChangeFlag: ChangedMarkersStateFlag,
    reallyMountedMarkers: MountedMarkersState,
    mapContext: MapMounterContextProps,
    clustererContext: MarkerClustererContextProps,
) => {
    const [markersDidCange, setMarkersDidCange] = markersDidChangeFlag;
    useEffect(() => {
        const [mountedMarkers, setMountedMarkers] = reallyMountedMarkers;
        if (!markersDidCange) {
            return;
        }
        const { clusterer } = clustererContext;
        removeMarkersMarkedToBeRemoved(mountedMarkers, clusterer, mapContext.map);
        addMarkersToMap(mountedMarkers, clusterer, mapContext.map);
        clusterer && clusterer.repaint();
        const newMarkers = [...mountedMarkers];
        setMountedMarkers(newMarkers);
        setMarkersDidCange(false);
        return;
    }, [markersDidCange]);
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
        constextState.stateObject.isUnmounted = false;
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

const MarkerMounter = (props: MarkerMounterProps = DEFAULT_MARKER_ARRAY_PROPS) => {
    const currentProps = { ...DEFAULT_MARKER_ARRAY_PROPS, ...props };
    const { children, displayOnlyInFov, instanceMarkers } = currentProps;
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
    const [markersHaveChanged] = markersChangedFlag;

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
    useUpdateContext(markersChangedFlag, reallyMountedMarkers, context, clustererContext);
    useUpdateMarkers(markersChangedFlag, reallyMountedMarkers, mapContext, clustererContext);

    if (!mapContext) {
        console.error('No map to mount to found. Did you place MarkerMounter in MapMounter?');
        return null;
    }

    if (markersChangedFlag) {
        instanceMarkers.current = mountedMarkers;
    }

    props.onMountedMarkersChange && props.onMountedMarkersChange(mountedMarkers);
    return (
        <MarkerMounterContext.Provider value={context}>{children}</MarkerMounterContext.Provider>
    );
};

export default WithMarkerMounterCleanup(MarkerMounter);
