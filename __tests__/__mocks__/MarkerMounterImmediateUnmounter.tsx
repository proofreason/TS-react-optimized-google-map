import MarkerMounter from '@components/googleMapsMounter/MarkerMounter';
import MapMounterContext, { MapMounterContextType } from '@context/MapMounterContext';
import { MarkerTypeOverwrite } from 'lib/types/mounterTypes';
import React, { useState, useEffect, useRef } from 'react';
// tslint:disable: jsx-no-lambda

interface MarkerMounterImmediateUnmounterProps {
    children: React.ReactNode;
    mapContextValue: MapMounterContextType;
}

export const MarkerMounterImmediateUnmounter = ({
    children,
    mapContextValue,
}: MarkerMounterImmediateUnmounterProps) => {
    const [immediateUnmounter, setImmediateUnmounter] = useState(false);

    if (immediateUnmounter) {
        return <></>;
    }
    return (
        <MapMounterContext.Provider value={mapContextValue}>
            <MarkerMounter
                onMountedMarkersChange={(mountedMarkers) =>
                    mountedMarkers.length > 0 && setImmediateUnmounter(true)
                }
            >
                <>{children}</>
            </MarkerMounter>
        </MapMounterContext.Provider>
    );
};
