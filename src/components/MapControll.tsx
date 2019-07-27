import MapMounterContext from '@context/MapMounterContext';
import { string, element, object, oneOfType, array } from 'prop-types';
import * as React from 'react';
import { createPortal } from 'react-dom';
const { useContext, useState } = React;

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

interface ControllReservedSpace {
    heigh: string;
    width: string;
}

const defaultProps: MapControllProps = {
    children: [] as React.ReactNode[],
    className: '',
    position: 0,
};

const MapControll = (props: MapControllProps = defaultProps) => {
    const [controlDiv, setControlDiv] = useState(null);
    const [divIndex, setDivIndex] = useState(null);
    const [controllLoaded, setControllLoaded] = useState(false);
    const [mapContex, setMapContext] = useContext(MapMounterContext);
    const { map } = mapContex;
    const { offsets, className, containerStyle } = props;

    const updateStyles = () => {
        let styles = {};
        if (offsets) {
            styles = { ...styles, ...getOffsetStyles() };
        }
        if (containerStyle) {
            styles = { ...styles, ...containerStyle };
        }
        Object.assign(controlDiv.style, styles);
    };

    React.useEffect(() => {
        setControlDiv(document.createElement('div'));
        const index = map.controls[props.position].getLength();
        setDivIndex(index);

        return () => {
            map.controls[props.position].removeAt(index);
        };
    }, []);

    React.useEffect(() => {
        if (controlDiv && divIndex !== (null || undefined)) {
            map.controls[props.position].push(controlDiv);
            updateStyles();
            setControllLoaded(true);
        }
    }, [controlDiv, divIndex]);

    React.useEffect(() => {
        if (controlDiv && (divIndex !== null || undefined)) {
            updateStyles();
        }
    }, [offsets, containerStyle]);

    const getOffsetStyles = () => {
        const {
            offsets: { bottomOffset, topOffset, leftOffset, rightOffset },
        } = props;
        return {
            marginBottom: `${bottomOffset ? bottomOffset : 0}px`,
            marginTop: `${topOffset ? topOffset : 0}px`,
            marginLeft: `${leftOffset ? leftOffset : 0}px`,
            marginRight: `${rightOffset ? rightOffset : 0}px`,
        };
    };

    className && controlDiv.classList.add(className);
    return controllLoaded && controlDiv && createPortal(props.children, controlDiv);
};

export { ControllsOffsets, MapControllProps };

export default MapControll;
