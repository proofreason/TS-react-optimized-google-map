const forceRefreshMap = (map: google.maps.Map) => {
    const currentZoom = map.getZoom();
    map.setZoom(currentZoom + 1);
    map.setZoom(currentZoom);
};

export { forceRefreshMap };
