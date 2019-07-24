import * as React from 'react';

interface MarkerClustererContextProps {
    clusterer: MarkerClusterer;
}

type MarkerClustererContextType = [
    MarkerClustererContextProps,
    React.Dispatch<React.SetStateAction<MarkerClustererContextProps>>,
];

const MarkerClustererContext = React.createContext<MarkerClustererContextType>([
    { clusterer: null },
    null,
]);

export { MarkerClustererContext, MarkerClustererContextProps, MarkerClustererContextType };
