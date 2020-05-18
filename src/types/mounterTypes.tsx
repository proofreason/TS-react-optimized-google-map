type MarkerEventNames = google.maps.MarkerMouseEventNames;

type MountedMarkersStateObject = {
    markers: MarkerTypeOverwrite[];
    initialStateWasAltered: boolean;
};

type MountedMarkersState = [MountedMarkersStateObject, React.Dispatch<MountedMarkersStateObject>];

type ChangedMarkersStateFlag = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

interface MarkerTypeOverwrite extends google.maps.Marker {
    id: number;
    isToBeRemoved: boolean;
}

export {
    MarkerEventNames,
    MountedMarkersState,
    ChangedMarkersStateFlag,
    MarkerTypeOverwrite,
    MountedMarkersStateObject,
};
