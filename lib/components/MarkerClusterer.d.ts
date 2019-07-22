/// <reference types="googlemaps" />
/// <reference types="markerclustererplus" />
import * as React from 'react';
interface SpiderifiChildrenProps {
    children?: React.ReactNode;
    clusteringSettings?: ClusteringSettings;
    onMountedMarkersChange?: (marksers: google.maps.Marker[]) => void;
}
interface ClusteringSettings extends MarkerClustererOptions {
    onClickExtender?: (outageCount?: number, shouldGaRegister?: boolean) => void;
}
declare const OptimizedMarkerClusterer: (props: SpiderifiChildrenProps) => JSX.Element;
export default OptimizedMarkerClusterer;
export { SpiderifiChildrenProps };
