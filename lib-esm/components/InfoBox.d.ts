/// <reference types="react" />
/// <reference types="googlemaps" />
import { InfoBoxOptions } from 'google-maps-infobox';
interface InfoBoxProps extends InfoBoxOptions {
    open: boolean;
    children?: JSX.Element;
    position: google.maps.LatLng;
}
declare const InfoBox: (props: InfoBoxProps) => JSX.Element;
export default InfoBox;
