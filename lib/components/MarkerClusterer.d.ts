/// <reference types="googlemaps" />
/// <reference types="markerclustererplus" />
import * as React from 'react';
interface OptimizedClustererProps<MarkerType extends google.maps.Marker = google.maps.Marker> {
    children?: React.ReactNode;
    clusteringSettings?: ClusteringSettings<MarkerType>;
    onMountedMarkersUpdateFinish?: (markers: google.maps.Marker[]) => void;
    onMountedMarkersUpdateStart?: (markers: google.maps.Marker[]) => void;
}
/**
 * Functions cannot be changed after inicialization for now!
 */
interface ClusteringSettings<MarkerType extends google.maps.Marker = google.maps.Marker> extends MarkerClustererOptions {
    onClickExtender?: (cluster: Cluster) => void;
    customOnClickFunction?: (cluster: Cluster) => void;
}
declare const OptimizedMarkerClusterer: (props: OptimizedClustererProps<google.maps.Marker>) => JSX.Element;
export default OptimizedMarkerClusterer;
export { OptimizedClustererProps, ClusteringSettings };
