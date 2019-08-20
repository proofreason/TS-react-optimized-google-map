/// <reference types="googlemaps" />
import { MarkerProps } from "../components/Marker";
import * as React from 'react';
interface ObjectProps {
    id: number;
}
interface UnmountedStateObject {
    isUnmounted: boolean;
}
interface ObjectMounterContextProps<ObjectPropsType, ReturnType> {
    map: google.maps.Map;
    addObject: (object: ObjectPropsType, id: number) => ReturnType;
    removeObject: (id: number) => boolean;
    stateObject: UnmountedStateObject;
}
declare type MarkerMounterContextProps = ObjectMounterContextProps<MarkerProps, google.maps.Marker>;
declare type MarkerMounterContextType = [MarkerMounterContextProps, React.Dispatch<React.SetStateAction<MarkerMounterContextProps>>];
declare const MarkerMounterContext: React.Context<[ObjectMounterContextProps<MarkerProps, google.maps.Marker>, React.Dispatch<React.SetStateAction<ObjectMounterContextProps<MarkerProps, google.maps.Marker>>>]>;
declare const objectMounterReady: (loaderContext: ObjectMounterContextProps<any, any>) => (id: number) => boolean;
declare const useAddToObjectMounter: <ObjectTypeProps extends ObjectProps, GoogleMapsObjectType>(objectMounterContext: ObjectMounterContextProps<ObjectTypeProps, GoogleMapsObjectType>, props: ObjectTypeProps) => any;
export { ObjectMounterContextProps, ObjectProps, MarkerMounterContextProps, MarkerMounterContextType, MarkerMounterContext, useAddToObjectMounter, objectMounterReady, };
