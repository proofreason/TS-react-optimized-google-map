import { MarkerListener } from '@src_types/mapTypes';

const forceRefreshMap = (map: google.maps.Map) => {
    const currentZoom = map.getZoom();
    map.setZoom(currentZoom + 1);
    map.setZoom(currentZoom);
};

const addListenersToMarker = (listeners: MarkerListener[], marker: google.maps.Marker) => {
    const markerValid = marker !== null || undefined;
    if (!markerValid) {
        return;
    }
    const activeListeners: google.maps.MapsEventListener[] = [];
    listeners.map(({ eventName, listener }) => {
        if (!listener) {
            return null;
        }
        const enhancedListener = (event: google.maps.MouseEvent) => {
            listener(marker, event);
        };
        const addedListener = marker.addListener(eventName, enhancedListener);
        activeListeners.push(addedListener);
    });
    return activeListeners;
};

export { forceRefreshMap, addListenersToMarker };
