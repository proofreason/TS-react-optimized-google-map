import * as React from 'react';

interface MapMounterContextProps {
    map: google.maps.Map;
}

type MapMounterContextType = [
    MapMounterContextProps,
    React.Dispatch<React.SetStateAction<MapMounterContextProps>>,
];

const MapMounterContext = React.createContext<MapMounterContextType>([{ map: null }, null]);

export default MapMounterContext;

export { MapMounterContextType, MapMounterContextProps };
