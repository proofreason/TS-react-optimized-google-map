import { MarkerProps } from '@components/Marker';
import { MarkerMounterContextProps, MarkerMounterContextType } from '@context/ObjectMounterContext';

const createMarkerMounterContext = (map: google.maps.Map): MarkerMounterContextType => {
    const addObject = (objectProps: MarkerProps, id: number) => {
        const [contextState] = context;
        const newMarker = new google.maps.Marker(objectProps.markerOptions);
        contextState.stateObject.objects[id] = newMarker;
        return newMarker;
    };
    const removeObject = (id: number) => {
        const [contextState] = context;
        if (!contextState.stateObject.objects[id]) {
            return false;
        }
        // tslint:disable-next-line: no-dynamic-delete
        delete contextState.stateObject.objects[id];
        return true;
    };
    const context: MarkerMounterContextType = [
        {
            stateObject: { isUnmounted: false, objects: [] },
            map,
            addObject,
            removeObject,
        },
        (newState: MarkerMounterContextProps) => {
            context[0] = { ...context[0], ...newState };
        },
    ];
    return context;
};

export { createMarkerMounterContext };
