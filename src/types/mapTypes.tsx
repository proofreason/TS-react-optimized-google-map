interface MarkerListener {
    eventName: google.maps.MarkerMouseEventNames;
    listener: MarkerListenerFunction;
}

type MarkerListenerFunction = (marker: google.maps.Marker, event: google.maps.MouseEvent) => void;

export { MarkerListener, MarkerListenerFunction };
