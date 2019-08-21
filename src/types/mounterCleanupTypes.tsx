import { MarkerTypeOverwrite } from './mounterTypes';

type InstanceMarkers = { current: MarkerTypeOverwrite[] };

interface MustExtendProps {
    instanceMarkers: InstanceMarkers;
}

export { InstanceMarkers, MustExtendProps };
