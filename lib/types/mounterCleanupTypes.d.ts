/// <reference types="googlemaps" />
import { MarkerTypeOverwrite } from './mounterTypes';
declare type InstanceMarkers = {
    current: MarkerTypeOverwrite[];
};
interface MustExtendProps {
    instanceMarkers: InstanceMarkers;
}
interface ReturnComponentMustProps {
    onMountedMarkersChange?: (markers: google.maps.Marker[]) => void;
}
export { InstanceMarkers, MustExtendProps, ReturnComponentMustProps };
