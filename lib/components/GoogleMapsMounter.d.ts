/// <reference types="googlemaps" />
import * as React from 'react';
interface GoogleMapsMounterProps extends google.maps.MapOptions {
    children?: React.ReactNode;
    mapElement?: JSX.Element;
    withMounter?: boolean;
    mapWrapperStyle?: React.CSSProperties;
    getMountedMarkers?: (markers: google.maps.Marker[]) => void;
}
declare const GoogleMapsMounter: React.MemoExoticComponent<(props?: GoogleMapsMounterProps) => JSX.Element>;
export default GoogleMapsMounter;
