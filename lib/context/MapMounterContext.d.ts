/// <reference types="googlemaps" />
import * as React from 'react';
interface MapMounterContextProps {
    map: google.maps.Map;
}
declare type MapMounterContextType = [MapMounterContextProps, React.Dispatch<React.SetStateAction<MapMounterContextProps>>];
declare const MapMounterContext: React.Context<MapMounterContextType>;
export default MapMounterContext;
export { MapMounterContextType, MapMounterContextProps };
