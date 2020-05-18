import MapMounterContext, { MapMounterContextType } from '@context/MapMounterContext';
import { googleMapsLoaded } from '@lib/Utils';
import * as React from 'react';
import MarkerMounter from './googleMapsMounter/MarkerMounter';
const { useEffect, useState } = React;

interface GoogleMapsMounterProps extends google.maps.MapOptions {
    children?: React.ReactNode;
    mapElement?: JSX.Element;
    withMounter?: boolean;
    mapWrapperStyle?: React.CSSProperties;
    getMountedMarkers?: (markers: google.maps.Marker[]) => void;
}

interface MapInitSettings extends google.maps.MapOptions {
    mapElementId: string;
}

const DEFAULT_ELEMENT_ID = 'google-maps-element';

const DEFAULT_PROPS: GoogleMapsMounterProps = {
    mapElement: <div id={DEFAULT_ELEMENT_ID} style={{ width: '100%', height: '100%' }} />,
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
        const mapElement = document.getElementById(mapSettings.mapElementId);
        if (mapElement) {
            setMap(new google.maps.Map(mapElement, mapSettings));
        } else {
            console.error(
                'Map element was not found. Make sure you provided unique id for the element',
            );
        }
    }, []);
    return map;
};

const GoogleMapsMounter = React.memo((props: GoogleMapsMounterProps = DEFAULT_PROPS) => {
    const currentProps = { ...DEFAULT_PROPS, ...props };
    const { children, mapElement, getMountedMarkers, mapWrapperStyle } = currentProps;
    const context: MapMounterContextType = React.useState({ map: null });
    const [contextState, setContext] = context;
    const map: google.maps.Map = useGoogleMap({
        ...currentProps,
        mapElementId: mapElement.props.id,
    });
    map && !contextState.map && setContext({ map });
    return (
        <MapMounterContext.Provider value={context}>
            <div className={'react-map-content-wrapper'} style={mapWrapperStyle}>
                {mapElement}
                {contextState.map &&
                    (props.withMounter ? (
                        <MarkerMounter onMountedMarkersUpdateFinish={getMountedMarkers} key={0}>
                            <div className="react-map-added-content">{children}</div>
                        </MarkerMounter>
                    ) : (
                        <div className="react-map-added-content">{children}</div>
                    ))}
            </div>
        </MapMounterContext.Provider>
    );
});

export default GoogleMapsMounter;
