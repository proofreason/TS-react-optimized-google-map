import Marker, { MarkerProps } from '@components/Marker';
import * as React from 'react';
import { getOwnKeysOfObject } from './Utils';
const { useState, useEffect } = React;

const useMarkerCache = (markerProps: MarkerProps[]) => {
    const [markerCache, setMarkerCache] = useState(null);
    !markerCache &&
        markerProps &&
        setMarkerCache(markerProps.map((props, index) => <Marker key={props.id} {...props} />));
    return [markerCache, setMarkerCache];
};

// this can be further opimized
const updateMarkerCache = (
    markersCache: [JSX.Element[], React.Dispatch<JSX.Element[]>],
    id: number,
    props: MarkerProps,
    immutable = true,
    forceUpdate = false,
) => {
    const [markersArray, setMarkerArray] = markersCache;

    if (markersArray[id]) {
        const { onClick, onMouseEnter, onMouseOut, optimizations, ...toCompare } = props;
        const {
            onClick: ra,
            onMouseEnter: rb,
            onMouseOut: rc,
            optimizations: rd,
            // tslint:disable-next-line
            ...toCompareOld
        } = markersArray[id].props;

        const ownKeysOld = getOwnKeysOfObject(toCompareOld);
        const ownKeysNew = getOwnKeysOfObject(toCompare);

        const newHasSamePropsAsOld = ownKeysOld.every(
            (key) => toCompare.hasOwnProperty(key) && toCompare[key] === toCompareOld[key],
        );
        const oldHasSamePropsAsNew = ownKeysNew.every(
            (key) => toCompareOld.hasOwnProperty(key) && toCompare[key] === toCompareOld[key],
        );
        if (newHasSamePropsAsOld && oldHasSamePropsAsNew && !forceUpdate) {
            return;
        }
    }
    markersArray[id] && (markersArray[id] = <Marker key={props.id} {...props} />);
    if (!immutable) {
        return;
    }
    const markerArrayCopy = [...markersArray];
    setMarkerArray(markerArrayCopy);
};

const hideOutOfFovMarkers = (markers: google.maps.Marker[], map: google.maps.Map) => {
    const bounds = map.getBounds();
    if (!bounds) {
        return;
    }
    return markers.map((marker) => {
        marker.setVisible(false);
        if (bounds.contains(marker.getPosition())) {
            marker.setVisible(true);
        }
        return marker;
    });
};

const useHideOutOfFovMarkers = (
    markers: google.maps.Marker[],
    map: google.maps.Map,
    callback?: () => void,
) => {
    const realodOnChange = () => {
        hideOutOfFovMarkers(markers, map);
        callback && callback();
    };
    useEffect(() => {
        realodOnChange();
        const listener = map.addListener('idle', () => {
            realodOnChange();
        });
        return () => listener.remove();
    }, [markers]);
};

export { useMarkerCache, updateMarkerCache, useHideOutOfFovMarkers };
