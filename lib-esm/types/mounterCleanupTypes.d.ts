import { MarkerTypeOverwrite } from './mounterTypes';
declare type InstanceMarkers = {
    current: MarkerTypeOverwrite[];
};
interface MustExtendProps {
    instanceMarkers: InstanceMarkers;
}
export { InstanceMarkers, MustExtendProps };
