interface MarkerListener {
    eventName: google.maps.MarkerMouseEventNames;
    listener: MarkerListenerFunction;
}

type MarkerListenerFunction = (marker: google.maps.Marker, event: MouseEvent) => void;

export { MarkerListener, MarkerListenerFunction };
