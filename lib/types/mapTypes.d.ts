/// <reference types="googlemaps" />
interface MarkerListener {
    eventName: google.maps.MarkerMouseEventNames;
    listener: MarkerListenerFunction;
}
declare type MarkerListenerFunction = (marker: google.maps.Marker, event: google.maps.MouseEvent) => void;
export { MarkerListener, MarkerListenerFunction };
