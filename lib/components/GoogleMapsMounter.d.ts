/// <reference types="googlemaps" />
import * as React from 'react';
interface GoogleMapsMounterProps extends google.maps.MapOptions {
    children?: React.ReactNode;
    mapWrapper?: JSX.Element;
    withMounter?: boolean;
    getMountedMarkers?: (markers: google.maps.Marker[]) => void;
}
declare const GoogleMapsMounter: React.MemoExoticComponent<(props?: GoogleMapsMounterProps) => JSX.Element>;
export default GoogleMapsMounter;
