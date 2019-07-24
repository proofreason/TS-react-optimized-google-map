import MapMounterContext from '@context/MapMounterContext';
import { googleMapsLoaded } from '@lib/Utils';
import * as React from 'react';
import MarkerArray from './googleMapsMounter/MarkerArray';
const { useEffect, useState } = React;

interface GoogleMapsMounterProps extends google.maps.MapOptions {
    children?: React.ReactNode;
    mapWrapper?: JSX.Element;
    withMounter?: boolean;
    getMountedMarkers?: (markers: google.maps.Marker[]) => void;
}

interface MapInitSettings extends google.maps.MapOptions {
    mapWrapperId: string;
}

const DEFAULT_WRAPPER_ID = 'google-maps-wrapper';

const DEFAULT_PROPS: GoogleMapsMounterProps = {
    mapWrapper: <div id={DEFAULT_WRAPPER_ID} style={{ width: '100%', height: '100%' }} />,
    withMounter: true,
    zoom: 7,
};

const useGoogleMap = (mapSettings: MapInitSettings): google.maps.Map => {
    const [map, setMap] = useState(null);
    if (!googleMapsLoaded()) {
        console.error('Map mounter used before google object init -> Aborting init');
        return null;
    }
    useEffect(() => {
        const wrapperElement = document.getElementById(mapSettings.mapWrapperId);
        if (wrapperElement) {
            setMap(new google.maps.Map(wrapperElement, mapSettings));
        } else {
            console.error(
                'Map wrapper was not found. Make sure you provided unique id for the element',
            );
        }
    }, []);
    return map;
};

const GoogleMapsMounter = React.memo((props: GoogleMapsMounterProps = DEFAULT_PROPS) => {
    const currentProps = { ...DEFAULT_PROPS, ...props };
    const { children, mapWrapper, getMountedMarkers } = currentProps;
    const context = React.useState({ map: null });
    const [contextState, setContext] = context;
    const map: google.maps.Map = useGoogleMap({
        ...currentProps,
        mapWrapperId: mapWrapper.props.id,
    });
    map && !contextState.map && setContext({ map });
    return (
        <MapMounterContext.Provider value={context}>
            <div className={'react-map-content-wrapper'}>
                {mapWrapper}
                {contextState.map &&
                    (props.withMounter ? (
                        <MarkerArray onMountedMarkersChange={getMountedMarkers} key={0}>
                            <div className="react-map-added-content">{children}</div>
                        </MarkerArray>
                    ) : (
                        <div className="react-map-added-content">{children}</div>
                    ))}
            </div>
        </MapMounterContext.Provider>
    );
});

export default GoogleMapsMounter;
