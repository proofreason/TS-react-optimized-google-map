/// <reference types="googlemaps" />
import * as React from 'react';
interface MarkerArrayProps {
    children?: React.ReactNode;
    batchSize?: number;
    displayOnlyInFov?: boolean;
    onMountedMarkersChange?: (markers: google.maps.Marker[]) => void;
}
declare const MarkerArray: (props?: MarkerArrayProps) => JSX.Element;
export default MarkerArray;
