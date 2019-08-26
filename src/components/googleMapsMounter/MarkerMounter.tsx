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
    mountedMarkers: MarkerTypeOverwrite[],
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
        mutableRemoveMarkersFrom([mountedMarkers[id]], clusterer, mountedMarkers);
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
    mountedMarkers: MarkerTypeOverwrite[],
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

const filterAlreadyPresentIn = (markers: MarkerTypeOverwrite[], inArray: MarkerTypeOverwrite[]) => {
    return markers.filter((marker) => {
        return !markerIsIn(marker, inArray);
    });
};

const markerIsIn = (marker: MarkerTypeOverwrite, inArray: MarkerTypeOverwrite[]) => {
    return inArray.find((inMarker: MarkerTypeOverwrite) => inMarker.id === marker.id);
};

const addMarkersToMap = (
    markers: MarkerTypeOverwrite[],
    clusterer: MarkerClusterer,
    map: google.maps.Map,
) => {
    if (clusterer) {
        const clustererMarkers = [...clusterer.getMarkers()];
        const toAddMarkers = filterAlreadyPresentIn(
            markers,
            clustererMarkers as MarkerTypeOverwrite[],
        );
        clusterer.addMarkers(toAddMarkers, true);
        return;
    }
    markers.map((marker) => {
        if (marker.getMap() === map) {
            return marker;
        }
        marker.setMap(map);
        return marker;
    });
};

const updateContext = (
    mountedMarkers: MarkerTypeOverwrite[],
    markersDidChangeFlag: ChangedMarkersStateFlag,
    mounterContext: MarkerMounterContextType,
    clustererContext: MarkerClustererContextProps,
) => {
    const [constextState, setContextState] = mounterContext;
    constextState.stateObject.isUnmounted = false;
    setContextState({
        ...constextState,
        addObject: addMarker(mountedMarkers, markersDidChangeFlag, clustererContext.clusterer),
        removeObject: removeMarker(mountedMarkers, markersDidChangeFlag),
    });
};

const useUpdateMarkers = (
    mutableMarkers: MarkerTypeOverwrite[],
    markersDidChangeFlag: ChangedMarkersStateFlag,
    reallyMountedMarkers: MountedMarkersState,
    mapContext: MapMounterContextProps,
    mounterContext: MarkerMounterContextType,
    clustererContext: MarkerClustererContextProps,
) => {
    const [markersDidChange, setMarkersDidCange] = markersDidChangeFlag;
    const [mounterContextState] = mounterContext;
    useEffect(() => {
        const [mountedMarkers, setMountedMarkers] = reallyMountedMarkers;
        if (
            !markersDidChange ||
            !mounterContextState.addObject ||
            !mounterContextState.removeObject
        ) {
            return;
        }
        const { clusterer } = clustererContext;
        removeMarkersMarkedToBeRemoved(mutableMarkers, clusterer, mapContext.map);
        addMarkersToMap(mutableMarkers, clusterer, mapContext.map);
        clusterer && clusterer.repaint();
        const newMarkers = [...mutableMarkers];
        setMountedMarkers(newMarkers);
        setMarkersDidCange(false);
    }, [markersDidChange, mounterContextState]);
};

const useUpdateContext = (
    context: MarkerMounterContextType,
    markersDidChangeFlag: ChangedMarkersStateFlag,
    clustererContext: MarkerClustererContextProps,
) => {
    useEffect(() => {
        const [constextState, setContextState] = context;
        constextState.stateObject.isUnmounted = false;
        updateContext(
            constextState.stateObject.objects as MarkerTypeOverwrite[],
            markersDidChangeFlag,
            context,
            clustererContext,
        );
        return () => (constextState.stateObject.isUnmounted = true);
    }, []);
};

const MarkerMounter = (props: MarkerMounterProps = DEFAULT_MARKER_ARRAY_PROPS) => {
    const currentProps = { ...DEFAULT_MARKER_ARRAY_PROPS, ...props };
    const { children, displayOnlyInFov, instanceMarkers } = currentProps;
    const mountedMarkersState: MountedMarkersState = useState([]);
    const markersChangedFlag: ChangedMarkersStateFlag = useState(false);
    const [mapContext, setMapContext] = useContext(MapMounterContext);
    const [clustererContext, setClustererContext] = useContext(MarkerClustererContext);
    const [mountedMarkers, setMountedMarkers] = mountedMarkersState;
    const [markersHaveChanged] = markersChangedFlag;
    const context: MarkerMounterContextType = useState({
        stateObject: { isUnmounted: false, objects: [] },
        map: mapContext.map,
        addObject: undefined,
        removeObject: undefined,
    });
    const [contextState] = context;
    const { map } = mapContext;

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

    useUpdateContext(context, markersChangedFlag, clustererContext);
    useUpdateMarkers(
        contextState.stateObject.objects as MarkerTypeOverwrite[],
        markersChangedFlag,
        mountedMarkersState,
        mapContext,
        context,
        clustererContext,
    );

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
