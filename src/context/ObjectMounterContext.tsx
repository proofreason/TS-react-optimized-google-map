import { MarkerProps } from '@components/Marker';
import * as React from 'react';
const { useEffect } = React;

interface ObjectProps {
    id: number;
}

interface MutableStateObject<ObjectType> {
    isUnmounted: boolean;
    objects: ObjectType[];
}

interface ObjectMounterContextProps<ObjectPropsType, ReturnObjectType> {
    map: google.maps.Map;
    addObject: (object: ObjectPropsType, id: number) => ReturnObjectType;
    removeObject: (id: number) => boolean;
    stateObject: MutableStateObject<ReturnObjectType>;
}

type MarkerMounterContextProps = ObjectMounterContextProps<MarkerProps, google.maps.Marker>;

type MarkerMounterContextType = [
    MarkerMounterContextProps,
    React.Dispatch<React.SetStateAction<MarkerMounterContextProps>>,
];

const MarkerMounterContext = React.createContext<MarkerMounterContextType>([
    {
        addObject: null,
        removeObject: null,
        map: null,
        stateObject: { isUnmounted: false, objects: [] },
    },
    null,
]);

const objectMounterReady = (loaderContext: ObjectMounterContextProps<any, any>) =>
    loaderContext.map && loaderContext.addObject && loaderContext.removeObject;

const useAddToObjectMounter = <ObjectTypeProps extends ObjectProps, GoogleMapsObjectType>(
    objectMounterContext: ObjectMounterContextProps<ObjectTypeProps, GoogleMapsObjectType>,
    props: ObjectTypeProps,
) => {
    const [marker, setMarker] = React.useState(null);
    useEffect(() => {
        if (
            !objectMounterContext ||
            !objectMounterContext.addObject ||
            !objectMounterContext.removeObject
        ) {
            return;
        }
        setMarker(objectMounterContext.addObject(props, props.id));
        return () => {
            const { isUnmounted } = objectMounterContext.stateObject;
            !isUnmounted && objectMounterContext.removeObject(props.id);
        };
    }, [objectMounterContext]);
    return marker;
};

export {
    ObjectMounterContextProps,
    ObjectProps,
    MarkerMounterContextProps,
    MarkerMounterContextType,
    MarkerMounterContext,
    useAddToObjectMounter,
    objectMounterReady,
};
