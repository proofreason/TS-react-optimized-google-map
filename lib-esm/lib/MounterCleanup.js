var mutableRemoveMarkersFrom = function (markersToRemove, clusterer, removeFrom) {
    if (clusterer) {
        clusterer.removeMarkers(markersToRemove, true);
    }
    markersToRemove.map(function (markerToRemove) {
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
//# sourceMappingURL=MounterCleanup.js.map