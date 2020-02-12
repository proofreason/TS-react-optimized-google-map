import { MarkerProps } from '@components/Marker';
import { MarkerMounterContext } from '@context/ObjectMounterContext';
import React, { useContext, useEffect } from 'react';

const MarkerMock = (props: MarkerProps) => {
    const [mounterContextState] = useContext(MarkerMounterContext);

    useEffect(() => {
        if (!mounterContextState.addObject || !mounterContextState.removeObject) {
            return;
        }
        mounterContextState.addObject(props, props.id);
        return () => mounterContextState.removeObject(props.id);
    }, [props, mounterContextState]);
    return <div />;
};

export default MarkerMock;
