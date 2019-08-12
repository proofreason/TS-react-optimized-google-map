import { MarkerProps } from '@components/Marker';
import * as React from 'react';
const { useEffect } = React;

interface ObjectProps {
    id: number;
}

// TODO: remove any
interface ObjectMounterContextProps<ObjectPropsType, ReturnType> {
    map: google.maps.Map;
    addObject: (object: ObjectPropsType, id: number) => ReturnType;
    removeObject: (id: number) => boolean;
}

type MarkerArrayContextProps = ObjectMounterContextProps<MarkerProps, google.maps.Marker>;

type MarkerArrayContextType = [
    MarkerArrayContextProps,
    React.Dispatch<React.SetStateAction<MarkerArrayContextProps>>,
];

const MarkerArrayContext = React.createContext<MarkerArrayContextType>([
    { addObject: null, removeObject: null, map: null },
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
        setMarker(objectMounterContext.addObject(props, props.id));
        return () => {
            objectMounterContext.removeObject(props.id);
        };
    }, []);
    return marker;
};

export {
    ObjectMounterContextProps,
    ObjectProps,
    MarkerArrayContextProps,
    MarkerArrayContextType,
    MarkerArrayContext,
    useAddToObjectMounter,
    objectMounterReady,
};
