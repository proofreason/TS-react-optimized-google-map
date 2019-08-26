import { MarkerClustererContextProps } from "../../../context/MarkerClustererContext";
import { InstanceMarkers, MustExtendProps } from "../../../types/mounterCleanupTypes";
import * as React from 'react';
declare const WithMarkerMounterCleanup: <T extends MustExtendProps>(WrappedComponent: React.ComponentType<T>) => {
    new (props: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">>>): {
        context: [MarkerClustererContextProps, React.Dispatch<React.SetStateAction<MarkerClustererContextProps>>];
        instanceMarkers: InstanceMarkers;
        componentWillUnmount(): void;
        render(): JSX.Element;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">>>) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
        forceUpdate(callBack?: () => void): void;
        readonly props: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">>> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">>>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">>>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">>>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">>>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">>>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">>>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">>>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">>, context?: any): {
        context: [MarkerClustererContextProps, React.Dispatch<React.SetStateAction<MarkerClustererContextProps>>];
        instanceMarkers: InstanceMarkers;
        componentWillUnmount(): void;
        render(): JSX.Element;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">>>) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
        forceUpdate(callBack?: () => void): void;
        readonly props: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">>> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">>>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">>>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">>>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">>>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">>>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">>>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<T, import("utility-types").SetDifference<keyof T, "instanceMarkers">>>, nextState: Readonly<{}>, nextContext: any): void;
    };
    contextType: React.Context<[MarkerClustererContextProps, React.Dispatch<React.SetStateAction<MarkerClustererContextProps>>]>;
};
export default WithMarkerMounterCleanup;
