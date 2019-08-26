type MarkerEventNames = google.maps.MarkerMouseEventNames;

type MountedMarkersState = [MarkerTypeOverwrite[], React.Dispatch<MarkerTypeOverwrite[]>];

type ChangedMarkersStateFlag = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

interface MarkerTypeOverwrite extends google.maps.Marker {
    id: number;
    isToBeRemoved: boolean;
}

export { MarkerEventNames, MountedMarkersState, ChangedMarkersStateFlag, MarkerTypeOverwrite };
