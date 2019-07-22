/// <reference types="react" />
/// <reference types="googlemaps" />
interface InfoWindowProps extends google.maps.InfoWindowOptions {
    open: boolean;
    children?: JSX.Element;
}
declare const InfoWindow: (props: InfoWindowProps) => JSX.Element;
export default InfoWindow;
