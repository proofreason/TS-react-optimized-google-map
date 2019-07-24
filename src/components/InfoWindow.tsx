import MapMounterContext from '@context/MapMounterContext';
import InfoBox from 'google-maps-infobox/types';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
const { useEffect, useContext, useState } = React;

interface InfoWindowProps extends google.maps.InfoWindowOptions {
    open: boolean;
    children?: JSX.Element;
}

const openWindowOnPosition = (
    infoWindow: google.maps.InfoWindow,
    map: google.maps.Map,
    position: google.maps.LatLng | google.maps.LatLngLiteral,
) => {
    infoWindow.open(map);
    infoWindow.setPosition(position);
};

const InfoWindow = (props: InfoWindowProps) => {
    const [infoWindow, setInfoWindow] = useState(null);
    const [mapContext, setMapContext] = useContext(MapMounterContext);
    const { open, position, children, ...windowProps } = props;
    const { map } = mapContext;
    useEffect(() => {
        setInfoWindow(new google.maps.InfoWindow(windowProps));
    }, []);

    useEffect(() => {
        if (infoWindow) {
            infoWindow.setContent(renderToString(children));
            open ? openWindowOnPosition(infoWindow, map, position) : infoWindow.close();
        }
    }, [open, infoWindow]);

    useEffect(() => {
        if (infoWindow) {
            infoWindow.setOptions(windowProps);
        }
    }, [props, infoWindow]);

    return <></>;
};

export default InfoWindow;
