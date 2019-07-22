import * as React from 'react';
interface MapControllProps {
    children?: React.ReactNode;
    className?: string;
    position: number;
    offsets?: ControllsOffsets;
    containerStyle?: React.CSSProperties;
}
interface ControllsOffsets {
    bottomOffset?: number;
    topOffset?: number;
    leftOffset?: number;
    rightOffset?: number;
}
declare const MapControll: (props?: MapControllProps) => React.ReactPortal;
export { ControllsOffsets, MapControllProps };
export default MapControll;
