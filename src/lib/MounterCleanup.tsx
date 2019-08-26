import { MarkerTypeOverwrite } from '@src_types/mounterTypes';

const mutableRemoveMarkersFrom = (
    markersToRemove: MarkerTypeOverwrite[],
    clusterer: MarkerClusterer,
    removeFrom?: MarkerTypeOverwrite[],
) => {
    if (clusterer) {
        clusterer.removeMarkers(markersToRemove, true);
    }
    markersToRemove.map((markerToRemove) => {
        google.maps.event.clearInstanceListeners(markerToRemove);
        markerToRemove.setMap(null);
        removeFrom
            ? // tslint:disable-next-line
              delete removeFrom[markerToRemove.id]
            : // tslint:disable-next-line
              delete markersToRemove[markerToRemove.id];
    });
};

export { mutableRemoveMarkersFrom };
