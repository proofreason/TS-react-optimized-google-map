import { MarkerClustererContextType } from "../../../context/MarkerClustererContext";
import { InstanceMarkers, MustExtendProps, ReturnComponentMustProps } from "../../../types/mounterCleanupTypes";
import * as React from 'react';
declare const WithMarkerMounterCleanup: <T extends MustExtendProps>(WrappedComponent: React.ComponentType<T>) => {
    new (props: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">> & ReturnComponentMustProps>): {
        context: MarkerClustererContextType;
        instanceMarkers: InstanceMarkers;
        componentWillUnmount(): void;
        render(): JSX.Element;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">> & ReturnComponentMustProps>) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">> & ReturnComponentMustProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">> & ReturnComponentMustProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">> & ReturnComponentMustProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">> & ReturnComponentMustProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">> & ReturnComponentMustProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">> & ReturnComponentMustProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">> & ReturnComponentMustProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">> & ReturnComponentMustProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">> & ReturnComponentMustProps, context?: any): {
        context: MarkerClustererContextType;
        instanceMarkers: InstanceMarkers;
        componentWillUnmount(): void;
        render(): JSX.Element;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">> & ReturnComponentMustProps>) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">> & ReturnComponentMustProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">> & ReturnComponentMustProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">> & ReturnComponentMustProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">> & ReturnComponentMustProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">> & ReturnComponentMustProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">> & ReturnComponentMustProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">> & ReturnComponentMustProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">> & ReturnComponentMustProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    contextType: React.Context<MarkerClustererContextType>;
};
export default WithMarkerMounterCleanup;
