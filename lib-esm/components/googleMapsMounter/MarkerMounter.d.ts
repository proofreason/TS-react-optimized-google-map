/// <reference types="googlemaps" />
import { MarkerClustererContextType } from "../../context/MarkerClustererContext";
import { MustExtendProps } from "../../types/mounterCleanupTypes";
import * as React from 'react';
interface MarkerMounterProps extends MustExtendProps {
    children?: React.ReactNode;
    batchSize?: number;
    displayOnlyInFov?: boolean;
    onMountedMarkersChange?: (markers: google.maps.Marker[]) => void;
}
declare const _default: {
    new (props: Readonly<Pick<MarkerMounterProps, "children" | "onMountedMarkersChange" | "displayOnlyInFov" | "batchSize"> & import("../../types/mounterCleanupTypes").ReturnComponentMustProps>): {
        context: MarkerClustererContextType;
        instanceMarkers: import("../../types/mounterCleanupTypes").InstanceMarkers;
        componentWillUnmount(): void;
        render(): JSX.Element;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<MarkerMounterProps, "children" | "onMountedMarkersChange" | "displayOnlyInFov" | "batchSize"> & import("../../types/mounterCleanupTypes").ReturnComponentMustProps>) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<Pick<MarkerMounterProps, "children" | "onMountedMarkersChange" | "displayOnlyInFov" | "batchSize"> & import("../../types/mounterCleanupTypes").ReturnComponentMustProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<MarkerMounterProps, "children" | "onMountedMarkersChange" | "displayOnlyInFov" | "batchSize"> & import("../../types/mounterCleanupTypes").ReturnComponentMustProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<MarkerMounterProps, "children" | "onMountedMarkersChange" | "displayOnlyInFov" | "batchSize"> & import("../../types/mounterCleanupTypes").ReturnComponentMustProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<MarkerMounterProps, "children" | "onMountedMarkersChange" | "displayOnlyInFov" | "batchSize"> & import("../../types/mounterCleanupTypes").ReturnComponentMustProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<MarkerMounterProps, "children" | "onMountedMarkersChange" | "displayOnlyInFov" | "batchSize"> & import("../../types/mounterCleanupTypes").ReturnComponentMustProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<MarkerMounterProps, "children" | "onMountedMarkersChange" | "displayOnlyInFov" | "batchSize"> & import("../../types/mounterCleanupTypes").ReturnComponentMustProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<MarkerMounterProps, "children" | "onMountedMarkersChange" | "displayOnlyInFov" | "batchSize"> & import("../../types/mounterCleanupTypes").ReturnComponentMustProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<MarkerMounterProps, "children" | "onMountedMarkersChange" | "displayOnlyInFov" | "batchSize"> & import("../../types/mounterCleanupTypes").ReturnComponentMustProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: Pick<MarkerMounterProps, "children" | "onMountedMarkersChange" | "displayOnlyInFov" | "batchSize"> & import("../../types/mounterCleanupTypes").ReturnComponentMustProps, context?: any): {
        context: MarkerClustererContextType;
        instanceMarkers: import("../../types/mounterCleanupTypes").InstanceMarkers;
        componentWillUnmount(): void;
        render(): JSX.Element;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<MarkerMounterProps, "children" | "onMountedMarkersChange" | "displayOnlyInFov" | "batchSize"> & import("../../types/mounterCleanupTypes").ReturnComponentMustProps>) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<Pick<MarkerMounterProps, "children" | "onMountedMarkersChange" | "displayOnlyInFov" | "batchSize"> & import("../../types/mounterCleanupTypes").ReturnComponentMustProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<MarkerMounterProps, "children" | "onMountedMarkersChange" | "displayOnlyInFov" | "batchSize"> & import("../../types/mounterCleanupTypes").ReturnComponentMustProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<MarkerMounterProps, "children" | "onMountedMarkersChange" | "displayOnlyInFov" | "batchSize"> & import("../../types/mounterCleanupTypes").ReturnComponentMustProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<MarkerMounterProps, "children" | "onMountedMarkersChange" | "displayOnlyInFov" | "batchSize"> & import("../../types/mounterCleanupTypes").ReturnComponentMustProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<MarkerMounterProps, "children" | "onMountedMarkersChange" | "displayOnlyInFov" | "batchSize"> & import("../../types/mounterCleanupTypes").ReturnComponentMustProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<MarkerMounterProps, "children" | "onMountedMarkersChange" | "displayOnlyInFov" | "batchSize"> & import("../../types/mounterCleanupTypes").ReturnComponentMustProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<MarkerMounterProps, "children" | "onMountedMarkersChange" | "displayOnlyInFov" | "batchSize"> & import("../../types/mounterCleanupTypes").ReturnComponentMustProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<MarkerMounterProps, "children" | "onMountedMarkersChange" | "displayOnlyInFov" | "batchSize"> & import("../../types/mounterCleanupTypes").ReturnComponentMustProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    contextType: React.Context<MarkerClustererContextType>;
};
export default _default;
