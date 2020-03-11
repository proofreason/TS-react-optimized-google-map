/// <reference types="googlemaps" />
import { MarkerListener } from "../types/mapTypes";
declare const forceRefreshMap: (map: google.maps.Map<Element>) => void;
declare const addListenersToMarker: (listeners: MarkerListener[], marker: google.maps.Marker) => google.maps.MapsEventListener[];
export { forceRefreshMap, addListenersToMarker };
