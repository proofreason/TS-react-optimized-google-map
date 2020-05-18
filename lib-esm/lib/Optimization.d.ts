/// <reference types="googlemaps" />
import { MarkerProps } from "../components/Marker";
import * as React from 'react';
declare const useMarkerCache: (markerProps: MarkerProps[]) => any[];
declare const updateMarkerCache: (markersCache: [React.ComponentElement<MarkerProps, null>[], React.Dispatch<React.ComponentElement<MarkerProps, null>[]>], id: number, props: MarkerProps, immutable?: boolean, forceUpdate?: boolean) => void;
declare const useHideOutOfFovMarkers: (markers: google.maps.Marker[], map: google.maps.Map<Element>, onStart?: (markers: google.maps.Marker[]) => void, onFinish?: (markers: google.maps.Marker[]) => void, active?: boolean) => void;
export { useMarkerCache, updateMarkerCache, useHideOutOfFovMarkers };
