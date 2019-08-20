import * as React from 'react';
import { MarkerProps } from './Marker';
interface MarkerBatchProps {
    children: React.ComponentElement<MarkerProps, null>[];
}
declare const MarkerBatch: ({ children }: MarkerBatchProps) => JSX.Element;
export default MarkerBatch;
