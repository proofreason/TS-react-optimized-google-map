/// <reference types="googlemaps" />
import { MarkerProps } from "../components/Marker";
import * as React from 'react';
interface ObjectProps {
    id: number;
}
interface ObjectMounterContextProps<ObjectPropsType, ReturnType> {
    map: google.maps.Map;
    addObject: (object: ObjectPropsType, id: number) => ReturnType;
    removeObject: (id: number) => boolean;
}
declare type MarkerArrayContextProps = ObjectMounterContextProps<MarkerProps, google.maps.Marker>;
declare type MarkerArrayContextType = [MarkerArrayContextProps, React.Dispatch<React.SetStateAction<MarkerArrayContextProps>>];
declare const MarkerArrayContext: React.Context<[ObjectMounterContextProps<MarkerProps, google.maps.Marker>, React.Dispatch<React.SetStateAction<ObjectMounterContextProps<MarkerProps, google.maps.Marker>>>]>;
declare const objectMounterReady: (loaderContext: ObjectMounterContextProps<any, any>) => (id: number) => boolean;
declare const useAddToObjectMounter: <ObjectTypeProps extends ObjectProps, GoogleMapsObjectType>(objectMounterContext: ObjectMounterContextProps<ObjectTypeProps, GoogleMapsObjectType>, props: ObjectTypeProps) => any;
export { ObjectMounterContextProps, ObjectProps, MarkerArrayContextProps, MarkerArrayContextType, MarkerArrayContext, useAddToObjectMounter, objectMounterReady, };
