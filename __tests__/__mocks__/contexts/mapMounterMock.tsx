import { MapMounterContextType } from '@context/MapMounterContext';
import { googleMapsLoaded } from '@lib/Utils';
import React, { useRef, LegacyRef } from 'react';

const createMapObject = (mapElement?: Element, options?: google.maps.MapOptions) => {
    let virtualElementRef: HTMLDivElement = null;
    if (!googleMapsLoaded()) {
        throw Error('Map object can not be created before google script is loaded');
    }
    const setupVirtualElementRef = (reference: HTMLDivElement) => (virtualElementRef = reference);
    const virtualElement = <div ref={setupVirtualElementRef} />;
    return new google.maps.Map(mapElement || virtualElementRef, { ...options });
};

const createMapContextMock = (map: google.maps.Map): MapMounterContextType => [
    { map },
    () => {
        // don't alter the state of mocked context
    },
];

export { createMapContextMock, createMapObject };
