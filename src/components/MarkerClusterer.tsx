import MapMounterContext from '@context/MapMounterContext';
import {
    MarkerClustererContext,
    MarkerClustererContextType,
} from '@context/MarkerClustererContext';
import MarkerClusterer from 'marker-clusterer-plus/src/markerclusterer';
import * as React from 'react';
import MarkerMounter from './googleMapsMounters/MarkerMounter';

interface OptimizedMarkerClustererState {
    context: MarkerClustererContextType;
}

interface OptimizedClustererProps<MarkerType extends google.maps.Marker = google.maps.Marker> {
    children?: React.ReactNode;
    clusteringSettings?: ClusteringSettings<MarkerType>;
    onMountedMarkersUpdateFinish?: (markers: google.maps.Marker[]) => void;
    onMountedMarkersUpdateStart?: (markers: google.maps.Marker[]) => void;
}

/**
 * Functions cannot be changed after inicialization for now!
 */
interface ClusteringSettings<MarkerType extends google.maps.Marker = google.maps.Marker>
    extends MarkerClustererOptions {
    onClickExtender?: (cluster: Cluster) => void;
    customOnClickFunction?: (cluster: Cluster) => void;
}

const INITIAL_STATE: OptimizedMarkerClustererState = {
    context: [{ clusterer: null }, null],
};

const BUILDINGS_VISIBLE_TRESHOLD_ZOOM = 15;

/**
 * If zoomOnClick is enabled, the default clusterer behavior will be used
 * no custom function will be registered for onClick even onClickExtenderWillNotWork
 */
const defaultClustererOptions: ClusteringSettings = {
    maxZoom: BUILDINGS_VISIBLE_TRESHOLD_ZOOM,
    averageCenter: true,
    zoomOnClick: false,
    ignoreHidden: true,
    gridSize: 50,
};

const OptimizedMarkerClusterer = (props: OptimizedClustererProps) => {
    const {
        children,
        clusteringSettings,
        onMountedMarkersUpdateFinish,
        onMountedMarkersUpdateStart,
    } = props;
    const context: MarkerClustererContextType = React.useState({ clusterer: null });
    const [contextState, setContextState] = context;
    const [mapMounterContext] = React.useContext(MapMounterContext);
    const currentProps = { ...defaultClustererOptions, ...clusteringSettings };
    React.useEffect(() => {
        const clusterer = new MarkerClusterer(mapMounterContext.map, [], currentProps);
        setContextState({ clusterer });
    }, []);

    const addListenerToClusterer = (
        toCall: (cluster: Cluster) => void,
        action = 'clusterclick',
    ) => {
        const { addListener } = google.maps.event;
        return addListener(contextState.clusterer, action, toCall);
    };

    React.useEffect(() => {
        const { customOnClickFunction, onClickExtender, zoomOnClick } = currentProps;
        if (!contextState.clusterer || zoomOnClick === true) {
            return;
        }
        if (customOnClickFunction) {
            const clickWithExtender = (cluster: Cluster) => {
                onClickExtender && onClickExtender(cluster);
                customOnClickFunction(cluster);
            };
            const customClusterClick = addListenerToClusterer(clickWithExtender);
            return () => google.maps.event.removeListener(customClusterClick);
        }
        const clusterClick = addListenerToClusterer(handleClusterClick);
        return () => google.maps.event.removeListener(clusterClick);
    }, [contextState.clusterer]);

    const handleClusterClick = (cluster: Cluster) => {
        if (props.clusteringSettings) {
            const { onClickExtender } = props.clusteringSettings;
            onClickExtender && currentProps.onClickExtender(cluster);
        }
        const ClusterMap = cluster.getMap();
        const padding = 100;
        if (ClusterMap.getZoom() <= contextState.clusterer.getMaxZoom()) {
            ClusterMap.fitBounds(cluster.getBounds(), padding);
            if (ClusterMap.getZoom() > contextState.clusterer.getMaxZoom()) {
                ClusterMap.setZoom(contextState.clusterer.getMaxZoom());
            }
        }
    };

    return (
        contextState.clusterer && (
            <MarkerClustererContext.Provider value={context}>
                <MarkerMounter
                    onMountedMarkersUpdateFinish={onMountedMarkersUpdateFinish}
                    onMountedMarkersUpdateStart={onMountedMarkersUpdateStart}
                >
                    {children}
                </MarkerMounter>
            </MarkerClustererContext.Provider>
        )
    );
};

export default OptimizedMarkerClusterer;

export { OptimizedClustererProps, ClusteringSettings };
