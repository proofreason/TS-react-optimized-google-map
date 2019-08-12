/// <reference types="googlemaps" />
import { MarkerProps } from "../components/Marker";
import * as React from 'react';
declare const useMarkerCache: (markerProps: MarkerProps[]) => any[];
declare const updateMarkerCache: (markersCache: [JSX.Element[], React.Dispatch<JSX.Element[]>], id: number, props: MarkerProps, immutable?: boolean, forceUpdate?: boolean) => void;
declare const useHideOutOfFovMarkers: (markers: google.maps.Marker[], map: google.maps.Map, callback?: () => void) => void;
export { useMarkerCache, updateMarkerCache, useHideOutOfFovMarkers };
