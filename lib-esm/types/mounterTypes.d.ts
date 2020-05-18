/// <reference types="googlemaps" />
/// <reference types="react" />
declare type MarkerEventNames = google.maps.MarkerMouseEventNames;
declare type MountedMarkersStateObject = {
    markers: MarkerTypeOverwrite[];
    initialStateWasAltered: boolean;
};
declare type MountedMarkersState = [MountedMarkersStateObject, React.Dispatch<MountedMarkersStateObject>];
declare type ChangedMarkersStateFlag = [boolean, React.Dispatch<React.SetStateAction<boolean>>];
interface MarkerTypeOverwrite extends google.maps.Marker {
    id: number;
    isToBeRemoved: boolean;
}
export { MarkerEventNames, MountedMarkersState, ChangedMarkersStateFlag, MarkerTypeOverwrite, MountedMarkersStateObject, };
