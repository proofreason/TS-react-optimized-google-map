import { MarkerProps } from '@components/Marker';
import * as React from 'react';
import { ObjectMounterContextProps, ObjectProps } from './ObjectMounterContext';
const { useEffect } = React;

type AsyncMounterContextProps<ObjectPropsType, ReturnType> = ObjectMounterContextProps<
    ObjectPropsType,
    Promise<ReturnType>
>;

type AsyncMarkerMounterProps = AsyncMounterContextProps<MarkerProps, google.maps.Marker>;

// TODO: add callback on marker load and batch load
type AsyncMarkerArrayContextType = [
    AsyncMarkerMounterProps,
    React.Dispatch<React.SetStateAction<AsyncMarkerMounterProps>>,
];

const AsyncMarkerArrayContext = React.createContext<AsyncMarkerArrayContextType>([
    { addObject: null, removeObject: null, map: null },
    null,
]);

const asyncMounterReady = (asyncMounterContext: AsyncMounterContextProps<any, any>) =>
    asyncMounterContext.map && asyncMounterContext.addObject && asyncMounterContext.removeObject;

const useAddToAsyncMounter = <ObjectTypeProps extends ObjectProps, PromiseWithGoogleMarker>(
    asyncMounterContext: AsyncMounterContextProps<ObjectTypeProps, PromiseWithGoogleMarker>,
    props: ObjectTypeProps,
) => {
    // todo set on async load
    const [marker, setMarker] = React.useState(null);
    useEffect(() => {
        asyncMounterContext
            .addObject(props, props.id)
            .then(setMarker)
            .catch((error) => console.error(`Async object adding filed with: ${error} `));
        return () => asyncMounterContext.removeObject(props.id);
    }, []);
    return marker;
};

export default AsyncMarkerArrayContext;

export {
    AsyncMarkerArrayContextType,
    AsyncMarkerMounterProps,
    AsyncMounterContextProps,
    useAddToAsyncMounter,
    asyncMounterReady,
};
