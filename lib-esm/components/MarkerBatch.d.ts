import * as React from 'react';
import { MarkerProps } from './Marker';
declare type ChildrenType = React.ComponentElement<MarkerProps, null>[];
interface MarkerBatchProps {
    children: ChildrenType;
}
declare const MarkerBatch: ({ children }: MarkerBatchProps) => JSX.Element;
export default MarkerBatch;
