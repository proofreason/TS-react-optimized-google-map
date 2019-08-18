import { LatLngPosition, getRandomLocations } from '@develop_lib/markerUtils';
import { useMarkerCache, updateMarkerCache } from '@lib/Optimization';
import * as React from 'react';
const { useState } = React;
import MarkerMounter from '@components/googleMapsMounter/MarkerMounter';
import Marker, { MarkerProps } from '@components/Marker';
import MarkerBatch from '@components/MarkerBatch';
import MapMounterContext from '@context/MapMounterContext';
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
                optimizations: { listenersChanged: false },
                markerOptions: {
                    position: location,
                    draggable: false,
                    optimized: true,
                    visible: true,
                    icon: index === selectedId ? MarkerIconSelected : MarkerIcon,
                },
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
            id: selectedId,
            optimizations: { listenersChanged: false },
            markerOptions: {
                icon: MarkerIconSelected,
                position: locations[selectedId],
            },
        });
    }

    if (markerCache && prevSelectedId) {
        updateMarkerCache([markerCache, setMarkerCache], prevSelectedId, {
            onClick: setSelected(prevSelectedId),
            id: prevSelectedId,
            optimizations: { listenersChanged: false },
            markerOptions: {
                icon: MarkerIcon,
                position: locations[prevSelectedId],
            },
        });
    }

    React.useEffect(() => {
        if (markerCache && false) {
            props.map((prop) => {
                updateMarkerCache([markerCache, setMarkerCache], prop.id, {
                    ...prop,
                    markerOptions: {
                        visible: display && displayMarkers,
                    },
                });
            });
        }
    }, [display]);

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
    return <MarkerBatch>{display && displayMarkers && markerCache}</MarkerBatch>;
};

export default MarkerDeployer;
