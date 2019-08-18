/// <reference types="googlemaps" />
import { MarkerListenerFunction, MarkerListener } from "../types/mapTypes";
import * as React from 'react';
interface Optimizations {
    listenersChanged?: boolean;
}
interface MarkerProps {
    [index: string]: any;
    children?: React.ReactNode;
    id: number;
    optimizations?: Optimizations;
    onClick?: MarkerListenerFunction;
    onMouseEnter?: MarkerListenerFunction;
    onMouseOut?: MarkerListenerFunction;
    markerOptions: google.maps.MarkerOptions;
}
declare const useAddListenersToMarker: (marker: google.maps.Marker, listeners: MarkerListener[], changFlagged?: boolean) => void;
declare const Marker: (props: MarkerProps) => JSX.Element;
export default Marker;
export { MarkerProps, useAddListenersToMarker };
