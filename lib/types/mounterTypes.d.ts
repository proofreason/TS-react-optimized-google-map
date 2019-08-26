/// <reference types="googlemaps" />
/// <reference types="react" />
declare type MarkerEventNames = google.maps.MarkerMouseEventNames;
declare type MountedMarkersState = [MarkerTypeOverwrite[], React.Dispatch<MarkerTypeOverwrite[]>];
declare type ChangedMarkersStateFlag = [boolean, React.Dispatch<React.SetStateAction<boolean>>];
interface MarkerTypeOverwrite extends google.maps.Marker {
    id: number;
    isToBeRemoved: boolean;
}
export { MarkerEventNames, MountedMarkersState, ChangedMarkersStateFlag, MarkerTypeOverwrite };
