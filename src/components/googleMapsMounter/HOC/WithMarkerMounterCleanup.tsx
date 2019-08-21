import {
    MarkerClustererContextType,
    MarkerClustererContextProps,
    MarkerClustererContext,
} from '@context/MarkerClustererContext';
import { mutableRemoveMarkersFrom } from '@lib/MounterCleanup';
import { InstanceMarkers, MustExtendProps } from '@src_types/mounterCleanupTypes';
import { MarkerTypeOverwrite, MountedMarkersState } from '@src_types/mounterTypes';
import * as React from 'react';
import { Subtract } from 'utility-types';

const removeAllMarkers = (
    reallyMountedMarkers: MountedMarkersState,
    clustererContext: MarkerClustererContextProps,
) => {
    const { clusterer } = clustererContext;
    const [mountedMarkers] = reallyMountedMarkers;
    mutableRemoveMarkersFrom(mountedMarkers, clusterer);
};

const WithMarkerMounterCleanup = <T extends MustExtendProps>(
    WrappedComponent: React.ComponentType<T>,
) => {
    type ContextType = React.Context<MarkerClustererContextType>;
    type ReturnComponentPropsType = Subtract<T, MustExtendProps>;
    return class MarkerMounterWithCleanup extends React.Component<ReturnComponentPropsType> {
        static contextType: ContextType = MarkerClustererContext;
        context: React.ContextType<ContextType>;
        instanceMarkers: InstanceMarkers = { current: [] };

        componentWillUnmount() {
            const [clustererContext] = this.context;
            removeAllMarkers([this.instanceMarkers.current, undefined], clustererContext);
            this.instanceMarkers &&
                clustererContext.clusterer &&
                clustererContext.clusterer.repaint();
        }

        render() {
            const { ...otherProps } = this.props;
            return (
                <>
                    <WrappedComponent
                        instanceMarkers={this.instanceMarkers}
                        {...(otherProps as T)}
                    />
                </>
            );
        }
    };
};

export default WithMarkerMounterCleanup;
