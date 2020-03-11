import Marker, { MarkerProps } from '@components/Marker';
import { createMapObject, createMapContextMock } from '@context/__mocks__/MapMounterContext';
import { MapMounterContextType } from '@context/MapMounterContext';
import { getRandomLocations } from '@develop_lib/markerUtils';
import { MarkerTypeOverwrite } from '@src_types/mounterTypes';
import { cleanup, render } from '@testing-library/react';
import React from 'react';
import OptimizedMarkerClusterer from '@components/MarkerClusterer';

jest.mock('@components/Marker');
declare let markerPoolMock: MarkerTypeOverwrite[];

// This test tests if MarkerMounter manages google object state correctly
describe('MarkerMounter Marker mounting google object test', () => {
    let mapMock: google.maps.Map = null;
    let mapContextMock: MapMounterContextType;
    const testPosition = getRandomLocations(1)[0];

    beforeEach(() => {
        markerPoolMock = [];
        mapMock = createMapObject();
        mapContextMock = createMapContextMock(mapMock);
    });

    afterEach(() => {
        cleanup();
    });

    test('Marker clusterer adds google marker correctly', async () => {
        const testingMarkerId = 3;
        const markerProps: MarkerProps = {
            id: testingMarkerId,
            markerOptions: { position: testPosition },
        };

        expect(markerPoolMock).toHaveLength(0);

        const renderResult = renderMarkerClustererWith(<Marker {...markerProps} />);

        expect(markerPoolMock).toHaveLength(1);
    });

    const getMarkerClustererWith = (children?: JSX.Element) => (
        <OptimizedMarkerClusterer>{children}</OptimizedMarkerClusterer>
    );

    const renderMarkerClustererWith = (children: JSX.Element) =>
        render(getMarkerClustererWith(children));
});
