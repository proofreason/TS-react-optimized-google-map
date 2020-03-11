import Marker, { MarkerProps } from '@components/Marker';
import OptimizedMarkerClusterer from '@components/MarkerClusterer';
import { createMapObject, createMapContextMock } from '@context/__mocks__/MapMounterContext';
import { MapMounterContextType } from '@context/MapMounterContext';
import { getRandomLocations } from '@develop_lib/markerUtils';
import { MarkerTypeOverwrite } from '@src_types/mounterTypes';
import { cleanup, render } from '@testing-library/react';
import React from 'react';

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

    const updateMarkerPool = (markers: MarkerTypeOverwrite[]) => {
        markerPoolMock = markers;
    };

    test('Marker clusterer adds google marker correctly', async () => {
        const testingMarkerId = 3;
        const markerProps: MarkerProps = {
            id: testingMarkerId,
            markerOptions: { position: testPosition },
        };

        expect(markerPoolMock).toHaveLength(0);

        const renderResult = renderMarkerClustererWith(
            <Marker {...markerProps} />,
            updateMarkerPool,
        );

        expect(markerPoolMock).toHaveLength(testingMarkerId + 1);
        const onlyNotEmptyMarkersArray = markerPoolMock.filter(Boolean);
        expect(onlyNotEmptyMarkersArray).toHaveLength(1);
    });

    test('Marker clusterer removes google marker correctly', async () => {
        const testingMarkerId = 3;
        const markerProps: MarkerProps = {
            id: testingMarkerId,
            markerOptions: { position: testPosition },
        };

        expect(markerPoolMock).toHaveLength(0);

        renderMarkerClustererWith(<Marker {...markerProps} />, updateMarkerPool);

        const renderResult = renderMarkerClustererWith(undefined, updateMarkerPool);

        const onlyNotEmptyMarkersArray = markerPoolMock.filter(Boolean);
        expect(onlyNotEmptyMarkersArray).toHaveLength(0);
    });

    const getMarkerClustererWith = (
        children?: JSX.Element,
        onMountedMarkersChange?: (markers: MarkerTypeOverwrite[]) => void,
    ) => (
        <OptimizedMarkerClusterer onMountedMarkersChange={onMountedMarkersChange}>
            {children}
        </OptimizedMarkerClusterer>
    );

    const renderMarkerClustererWith = (
        children: JSX.Element,
        onMountedMarkersChange?: (markers: MarkerTypeOverwrite[]) => void,
    ) => render(getMarkerClustererWith(children, onMountedMarkersChange));
});
