import MapMounterContext from '@context/MapMounterContext';
import * as React from 'react';
const { useEffect, useContext, useState } = React;
import { default as InfoBoxObject, InfoBoxOptions } from 'google-maps-infobox';
import { renderToString } from 'react-dom/server';

interface InfoBoxProps extends InfoBoxOptions {
    open: boolean;
    children?: JSX.Element;
    position: google.maps.LatLng;
}

const openWindowOnPosition = (
    infoBox: InfoBoxObject,
    map: google.maps.Map,
    position: google.maps.LatLng,
) => {
    infoBox.open(map, null);
    infoBox.setPosition(position);
};

const InfoBox = (props: InfoBoxProps) => {
    const [infoBox, setInfoBox]: [InfoBoxObject, React.Dispatch<InfoBoxObject>] = useState(null);
    const [mapContext, setMapContext] = useContext(MapMounterContext);
    const { open, position, children, ...boxProps } = props;
    const { map } = mapContext;
    useEffect(() => {
        // TODO: figure out a better way!! This is due to loading google script
        const InfoBoxLib = require('google-maps-infobox');
        const infoBoxRef = new InfoBoxLib.default(boxProps);
        setInfoBox(infoBoxRef);
        return () => {
            infoBoxRef && infoBoxRef.close();
        };
    }, []);

    useEffect(() => {
        if (infoBox) {
            infoBox.setContent(renderToString(children));
            open ? openWindowOnPosition(infoBox, map, position) : infoBox.close();
        }
    }, [open, infoBox]);

    useEffect(() => {
        if (infoBox) {
            infoBox.setOptions(boxProps);
        }
    }, [props, infoBox]);

    return <></>;
};

export default InfoBox;
