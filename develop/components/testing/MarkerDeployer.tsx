import { LatLngPosition, getRandomLocations } from '@develop_lib/markerUtils';
import { useMarkerCache, updateMarkerCache } from '@lib/Optimization';
import * as React from 'react';
const { useState } = React;
import Marker from '@components/Marker';
import MapMounterContext from '@context/MapMounterContext';
import { MarkerProps } from 'lib';
import * as MarkerIconSelected from './img/marker-black.svg';
import * as MarkerIcon from './img/marker-yellow.svg';

const prevAndSelectedId: number[] = [null];
let prevSelectedId: number = null;

interface MarkerDeployerProps {
    display: boolean;
}

const MarkerDeployer = ({ display }: MarkerDeployerProps) => {
    const [selectedId, setSelectedId] = useState(null);
    const [mountedMarkers, setMountedMarkers] = useState([]);
    const [locations, setLocations]: [
        LatLngPosition[],
        React.Dispatch<LatLngPosition[]>,
    ] = useState(null);
    const [mapMounterContext, setMapMounterContex] = React.useContext(MapMounterContext);
    const [displayMarkers, setDisplayMarkers] = useState(true);
    const numOfLocations = 5000;
    if (!locations) {
        setLocations(getRandomLocations(numOfLocations));
    }
    const setSelected = (id: number) => () => {
        prevSelectedId = prevAndSelectedId.shift();
        prevAndSelectedId.push(id);
        setSelectedId(id);
    };

    const setDirectSelect = (currentId: number) => (marker: google.maps.Marker) => {
        prevSelectedId = prevAndSelectedId.shift();
        prevAndSelectedId.push(currentId);
        mountedMarkers[prevSelectedId] && mountedMarkers[prevSelectedId].setOpacity(1);
        setSelectedId(currentId);
        marker.setOpacity(0);
    };

    const props =
        locations &&
        locations.map(
            (location, index): MarkerProps => ({
                onClick: setSelected(index),
                key: index,
                id: index,
                icon: index === selectedId ? MarkerIconSelected : MarkerIcon,
                position: location,
                visible: true,
                optimizations: { listenersChanged: false },
                optimized: true,
                draggable: false,
            }),
        );

    const uncachedMarkers =
        props &&
        props.map((markerProps, index) => {
            return <Marker id={index} key={index} {...markerProps} />;
        });

    const [markerCache, setMarkerCache] = useMarkerCache(props);

    if (markerCache && selectedId) {
        updateMarkerCache([markerCache, setMarkerCache], selectedId, {
            onClick: setSelected(selectedId),
            icon: MarkerIconSelected,
            id: selectedId,
            position: locations[selectedId],
            optimizations: { listenersChanged: false },
        });
    }

    if (markerCache && prevSelectedId) {
        updateMarkerCache([markerCache, setMarkerCache], prevSelectedId, {
            onClick: setSelected(prevSelectedId),
            icon: MarkerIcon,
            id: prevSelectedId,
            position: locations[prevSelectedId],
            optimizations: { listenersChanged: false },
        });
    }

    const toggleDisplayMarkers = () => {
        displayMarkers ? setDisplayMarkers(false) : setDisplayMarkers(true);
    };

    React.useEffect(() => {
        const breakingPoint = 8;
        if (mapMounterContext.map) {
            const listener = mapMounterContext.map.addListener('idle', () => {
                if (mapMounterContext.map.getZoom() === breakingPoint) {
                    // toggleDisplayMarkers();
                }
            });
            return () => listener.remove();
        }
    }, [mapMounterContext.map, displayMarkers]);
    return <>{displayMarkers && markerCache}</>;
};

export default MarkerDeployer;
