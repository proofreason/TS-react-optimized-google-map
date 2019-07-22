/// <reference types="markerclustererplus" />
import * as React from 'react';
interface MarkerClustererContextProps {
    clusterer: MarkerClusterer;
}
declare type MarkerClustererContextType = [MarkerClustererContextProps, React.Dispatch<React.SetStateAction<MarkerClustererContextProps>>];
declare const MarkerClustererContext: React.Context<[MarkerClustererContextProps, React.Dispatch<React.SetStateAction<MarkerClustererContextProps>>]>;
export { MarkerClustererContext, MarkerClustererContextProps, MarkerClustererContextType };
