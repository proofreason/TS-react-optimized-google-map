import MapMounterContext from '@context/MapMounterContext';
import {
    MarkerClustererContext,
    MarkerClustererContextType,
} from '@context/MarkerClustererContext';
import * as MarkerClusterer from 'marker-clusterer-plus/src/markerclusterer';
import * as React from 'react';
import MarkerArray from './googleMapsMounter/MarkerArray';

interface OptimizedMarkerClustererState {
    context: MarkerClustererContextType;
}

interface OptimizedClustererProps<MarkerType extends google.maps.Marker = google.maps.Marker> {
    children?: React.ReactNode;
    clusteringSettings?: ClusteringSettings<MarkerType>;
    onMountedMarkersChange?: (marksers: MarkerType[]) => void;
}

interface ClusteringSettings<MarkerType extends google.maps.Marker = google.maps.Marker>
    extends MarkerClustererOptions {
    onClickExtender?: (markersUnderCluster?: MarkerType[]) => void;
}

const INITIAL_STATE: OptimizedMarkerClustererState = {
    context: [{ clusterer: null }, null],
};

const BUILDINGS_VISIBLE_TRESHOLD_ZOOM = 15;

const defaultClustererOptions: ClusteringSettings = {
    maxZoom: BUILDINGS_VISIBLE_TRESHOLD_ZOOM,
    averageCenter: true,
    zoomOnClick: false,
    ignoreHidden: true,
    gridSize: 50,
};

const OptimizedMarkerClusterer = (props: OptimizedClustererProps) => {
    const { children, clusteringSettings, onMountedMarkersChange } = props;
    const context: MarkerClustererContextType = React.useState({ clusterer: null });
    const [contextState, setContextState] = context;
    const [mapMounterContext, setMapMounterContext] = React.useContext(MapMounterContext);
    const allMakers = contextState.clusterer ? contextState.clusterer.getMarkers() : [];
    React.useEffect(() => {
        const clusterer = new MarkerClusterer(mapMounterContext.map, [], {
            ...defaultClustererOptions,
            ...clusteringSettings,
        });
        setContextState({ clusterer });
    }, []);

    React.useEffect(() => {
        if (contextState.clusterer) {
            const clusterClick = google.maps.event.addListener(
                contextState.clusterer,
                'clusterclick',
                handleClusterClick,
            );
            return () => google.maps.event.removeListener(clusterClick);
        }
    }, [contextState.clusterer]);

    const handleClusterClick = (cluster: Cluster) => {
        const { onClickExtender } = props.clusteringSettings;
        onClickExtender(cluster.getMarkers());
        const ClusterMap = cluster.getMap();
        const padding = 100;
        if (ClusterMap.getZoom() <= contextState.clusterer.getMaxZoom()) {
            ClusterMap.fitBounds(cluster.getBounds(), padding);
            if (ClusterMap.getZoom() > contextState.clusterer.getMaxZoom()) {
                ClusterMap.setZoom(contextState.clusterer.getMaxZoom());
            }
        }
    };

    const getMountedMarkersAndRefresh = (markers: google.maps.Marker[]) => {
        onMountedMarkersChange && onMountedMarkersChange(markers);
        contextState.clusterer.repaint();
    };

    return (
        contextState.clusterer && (
            <MarkerClustererContext.Provider value={context}>
                <MarkerArray onMountedMarkersChange={getMountedMarkersAndRefresh}>
                    {children}
                </MarkerArray>
            </MarkerClustererContext.Provider>
        )
    );
};

export default OptimizedMarkerClusterer;

export { OptimizedClustererProps, ClusteringSettings };
