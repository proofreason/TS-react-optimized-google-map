import { MarkerProps, useAddListenersToMarker } from '@components/Marker';
import AsyncMarkerArrayContext, { AsyncMarkerArrayContextType } from '@context/AsyncMounterContext';
import MapMounterContext from '@context/MapMounterContext';
import { MarkerClustererContext } from '@context/MarkerClustererContext';
import { MarkerMounterContext, MarkerMounterContextType } from '@context/ObjectMounterContext';
import { useHideOutOfFovMarkers } from '@lib/Optimization';
import * as React from 'react';
const { useState, useContext } = React;

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

interface MarkerTypeOverwrite extends google.maps.Marker {
    id: number;
    isToBeRemoved: boolean;
}

const addMarker = (
    [mountedMarkers, setMountedMarkers]: MountedMarkersState,
    map: google.maps.Map,
    clusterer: MarkerClusterer,
) => (markerProps: MarkerProps, id: number) => {
    if (mountedMarkers[id] && !mountedMarkers[id].isToBeRemoved) {
        console.warn(
            `tried to add marker with id ${id}
            to MarkerArray. Marker with this id already exists,
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
    return mountedMarkers[id];
};

const removeMarker = (
    [mountedMarkers, setMountedMarkers]: MountedMarkersState,
    clusterer: MarkerClusterer,
) => (id: number) => {
    if (!mountedMarkers[id]) {
        console.warn(
            `tried to remove marker with id ${id}
            from MarkerArray. Marker with this id does not exists.`,
        );
        return false;
    }
    mountedMarkers[id].isToBeRemoved = true;
    return true;
};

const removeMarkersMarkedToBeRemoved = (
    markers: MarkerTypeOverwrite[],
    clusterer: MarkerClusterer,
    map: google.maps.Map,
) => {
    const markersToRemove = markers.filter((marker) => marker.isToBeRemoved);
    if (clusterer) {
        clusterer.removeMarkers(markersToRemove, false);
    }
    markersToRemove.map((markerToRemove) => {
        markerToRemove.setMap(null);
        // tslint:disable-next-line
        delete markers[markerToRemove.id];
    });
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

const MarkerMounter = (props: MarkerArrayProps = DEFAULT_MARKER_ARRAY_PROPS) => {
    const currentProps = { ...DEFAULT_MARKER_ARRAY_PROPS, ...props };
    const { children, displayOnlyInFov } = currentProps;
    const [mapContext, setMapContext] = useContext(MapMounterContext);
    const [clustererContext, setClustererContext] = useContext(MarkerClustererContext);
    const mountedMarkersState: MountedMarkersState = useState([]);
    const [mountedMarkers, setMountedMarkers] = mountedMarkersState;
    const { map } = mapContext;

    if (!mapContext) {
        console.error('No map to mount to found. Did you place MarkerArry in MapMounter?');
        return null;
    }
    displayOnlyInFov &&
        useHideOutOfFovMarkers(mountedMarkers, map, () => {
            if (clustererContext.clusterer && mountedMarkers) {
                clustererContext.clusterer.repaint();
            }
            props.onMountedMarkersChange && props.onMountedMarkersChange(mountedMarkers);
        });
    const context: MarkerMounterContextType = useState({
        map: mapContext.map,
        addObject: addMarker(mountedMarkersState, mapContext.map, clustererContext.clusterer),
        removeObject: removeMarker(mountedMarkersState, clustererContext.clusterer),
    });
    const [constextState, setContextState] = context;
    React.useEffect(() => {
        if (!mountedMarkers) {
            return;
        }
        const { clusterer } = clustererContext;
        removeMarkersMarkedToBeRemoved(mountedMarkers, clusterer, map);
        addMarkersToMap(mountedMarkers, clusterer, map);
        clusterer.repaint();
        setMountedMarkers([...mountedMarkers]);
    }, [children]);

    React.useEffect(() => {
        setContextState({
            ...constextState,
            addObject: addMarker(mountedMarkersState, mapContext.map, clustererContext.clusterer),
            removeObject: removeMarker(mountedMarkersState, clustererContext.clusterer),
        });
    }, [mountedMarkers]);
    props.onMountedMarkersChange && props.onMountedMarkersChange(mountedMarkers);
    return (
        <MarkerMounterContext.Provider value={context}>{children}</MarkerMounterContext.Provider>
    );
};

export default MarkerMounter;
