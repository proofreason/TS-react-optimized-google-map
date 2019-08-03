/// <reference types="googlemaps" />
/// <reference types="markerclustererplus" />
import * as React from 'react';
interface OptimizedClustererProps<MarkerType extends google.maps.Marker = google.maps.Marker> {
    children?: React.ReactNode;
    clusteringSettings?: ClusteringSettings<MarkerType>;
    onMountedMarkersChange?: (marksers: MarkerType[]) => void;
}
interface ClusteringSettings<MarkerType extends google.maps.Marker = google.maps.Marker> extends MarkerClustererOptions {
    onClickExtender?: (markersUnderCluster?: MarkerType[]) => void;
}
declare const OptimizedMarkerClusterer: (props: OptimizedClustererProps<google.maps.Marker>) => JSX.Element;
export default OptimizedMarkerClusterer;
export { OptimizedClustererProps as SpiderifiChildrenProps };
