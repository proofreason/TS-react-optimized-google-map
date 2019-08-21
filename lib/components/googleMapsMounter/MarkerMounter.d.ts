/// <reference types="googlemaps" />
import { MarkerClustererContextProps } from "../../context/MarkerClustererContext";
import { MustExtendProps } from "../../types/mounterCleanupTypes";
import * as React from 'react';
interface MarkerMounterProps extends MustExtendProps {
    children?: React.ReactNode;
    batchSize?: number;
    displayOnlyInFov?: boolean;
    onMountedMarkersChange?: (markers: google.maps.Marker[]) => void;
}
declare const _default: {
    new (props: Readonly<Pick<MarkerMounterProps, "children" | "displayOnlyInFov" | "batchSize" | "onMountedMarkersChange">>): {
        context: [MarkerClustererContextProps, React.Dispatch<React.SetStateAction<MarkerClustererContextProps>>];
        instanceMarkers: import("../../types/mounterCleanupTypes").InstanceMarkers;
        componentWillUnmount(): void;
        render(): JSX.Element;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<MarkerMounterProps, "children" | "displayOnlyInFov" | "batchSize" | "onMountedMarkersChange">>) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
        forceUpdate(callBack?: () => void): void;
        readonly props: Readonly<Pick<MarkerMounterProps, "children" | "displayOnlyInFov" | "batchSize" | "onMountedMarkersChange">> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<MarkerMounterProps, "children" | "displayOnlyInFov" | "batchSize" | "onMountedMarkersChange">>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<MarkerMounterProps, "children" | "displayOnlyInFov" | "batchSize" | "onMountedMarkersChange">>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<MarkerMounterProps, "children" | "displayOnlyInFov" | "batchSize" | "onMountedMarkersChange">>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<MarkerMounterProps, "children" | "displayOnlyInFov" | "batchSize" | "onMountedMarkersChange">>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<MarkerMounterProps, "children" | "displayOnlyInFov" | "batchSize" | "onMountedMarkersChange">>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<MarkerMounterProps, "children" | "displayOnlyInFov" | "batchSize" | "onMountedMarkersChange">>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<MarkerMounterProps, "children" | "displayOnlyInFov" | "batchSize" | "onMountedMarkersChange">>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: Pick<MarkerMounterProps, "children" | "displayOnlyInFov" | "batchSize" | "onMountedMarkersChange">, context?: any): {
        context: [MarkerClustererContextProps, React.Dispatch<React.SetStateAction<MarkerClustererContextProps>>];
        instanceMarkers: import("../../types/mounterCleanupTypes").InstanceMarkers;
        componentWillUnmount(): void;
        render(): JSX.Element;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<MarkerMounterProps, "children" | "displayOnlyInFov" | "batchSize" | "onMountedMarkersChange">>) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
        forceUpdate(callBack?: () => void): void;
        readonly props: Readonly<Pick<MarkerMounterProps, "children" | "displayOnlyInFov" | "batchSize" | "onMountedMarkersChange">> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<MarkerMounterProps, "children" | "displayOnlyInFov" | "batchSize" | "onMountedMarkersChange">>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<MarkerMounterProps, "children" | "displayOnlyInFov" | "batchSize" | "onMountedMarkersChange">>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<MarkerMounterProps, "children" | "displayOnlyInFov" | "batchSize" | "onMountedMarkersChange">>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<MarkerMounterProps, "children" | "displayOnlyInFov" | "batchSize" | "onMountedMarkersChange">>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<MarkerMounterProps, "children" | "displayOnlyInFov" | "batchSize" | "onMountedMarkersChange">>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<MarkerMounterProps, "children" | "displayOnlyInFov" | "batchSize" | "onMountedMarkersChange">>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<MarkerMounterProps, "children" | "displayOnlyInFov" | "batchSize" | "onMountedMarkersChange">>, nextState: Readonly<{}>, nextContext: any): void;
    };
    contextType: React.Context<[MarkerClustererContextProps, React.Dispatch<React.SetStateAction<MarkerClustererContextProps>>]>;
};
export default _default;
