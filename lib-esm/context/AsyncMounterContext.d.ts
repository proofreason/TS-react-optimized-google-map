/// <reference types="googlemaps" />
import { MarkerProps } from "../components/Marker";
import * as React from 'react';
import { ObjectMounterContextProps, ObjectProps } from './ObjectMounterContext';
declare type AsyncMounterContextProps<ObjectPropsType, ReturnType> = ObjectMounterContextProps<ObjectPropsType, Promise<ReturnType>>;
declare type AsyncMarkerMounterProps = AsyncMounterContextProps<MarkerProps, google.maps.Marker>;
declare type AsyncMarkerArrayContextType = [AsyncMarkerMounterProps, React.Dispatch<React.SetStateAction<AsyncMarkerMounterProps>>];
declare const AsyncMarkerArrayContext: React.Context<[ObjectMounterContextProps<MarkerProps, Promise<google.maps.Marker>>, React.Dispatch<React.SetStateAction<ObjectMounterContextProps<MarkerProps, Promise<google.maps.Marker>>>>]>;
declare const asyncMounterReady: (asyncMounterContext: ObjectMounterContextProps<any, Promise<any>>) => (id: number) => boolean;
declare const useAddToAsyncMounter: <ObjectTypeProps extends ObjectProps, PromiseWithGoogleMarker>(asyncMounterContext: ObjectMounterContextProps<ObjectTypeProps, Promise<PromiseWithGoogleMarker>>, props: ObjectTypeProps) => any;
export default AsyncMarkerArrayContext;
export { AsyncMarkerArrayContextType, AsyncMarkerMounterProps, AsyncMounterContextProps, useAddToAsyncMounter, asyncMounterReady, };
