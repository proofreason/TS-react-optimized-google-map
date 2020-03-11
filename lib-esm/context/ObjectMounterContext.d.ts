/// <reference types="googlemaps" />
import { MarkerProps } from "../components/Marker";
import * as React from 'react';
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
declare type MarkerMounterContextProps = ObjectMounterContextProps<MarkerProps, google.maps.Marker>;
declare type MarkerMounterContextType = [MarkerMounterContextProps, React.Dispatch<React.SetStateAction<MarkerMounterContextProps>>];
declare const MarkerMounterContext: React.Context<MarkerMounterContextType>;
declare const objectMounterReady: (loaderContext: ObjectMounterContextProps<any, any>) => (id: number) => boolean;
declare const useAddToObjectMounter: <ObjectTypeProps extends ObjectProps, GoogleMapsObjectType>(objectMounterContext: ObjectMounterContextProps<ObjectTypeProps, GoogleMapsObjectType>, props: ObjectTypeProps) => any;
export { ObjectMounterContextProps, ObjectProps, MarkerMounterContextProps, MarkerMounterContextType, MarkerMounterContext, useAddToObjectMounter, objectMounterReady, };
