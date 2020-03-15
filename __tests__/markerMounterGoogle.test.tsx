import { getMarkerMockText } from '@components/__mocks__/Marker';
import MarkerMounter from '@components/googleMapsMounter/MarkerMounter';
import Marker, { MarkerProps } from '@components/Marker';
import MapMounterContext, { MapMounterContextType } from '@context/MapMounterContext';
import { getRandomLocations } from '@develop_lib/markerUtils';
import { render, cleanup, RenderResult } from '@testing-library/react';
import { MarkerTypeOverwrite } from 'lib/types/mounterTypes';
import React, { Children } from 'react';
import { createMapObject, createMapContextMock } from '../src/context/__mocks__/MapMounterContext';
import { MarkerMounterImmediateUnmounter } from './__mocks__/MarkerMounterImmediateUnmounter';
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

    test('Marker mounter adds google marker correctly', async () => {
        const testingMarkerId = 3;
        const markerProps: MarkerProps = {
            id: testingMarkerId,
            markerOptions: { position: testPosition },
        };

        expect(markerPoolMock).toHaveLength(0);

        const renderResult = renderMarkerMounterWith(<Marker {...markerProps} />);

        expect(markerPoolMock).toHaveLength(1);
        testGoogleMarkerExists(markerProps);
    });

    test('Marker mounter removes google marker correctly', async () => {
        const testingMarkerId = 2;
        const markerProps: MarkerProps = {
            id: testingMarkerId,
            markerOptions: { position: testPosition },
        };

        const renderResult = renderMarkerMounterWith(<Marker {...markerProps} />);

        const { rerender } = renderResult;

        expect(markerPoolMock).toHaveLength(1);

        rerender(getMarkerMounterWith());

        expect(markerPoolMock).toHaveLength(0);
        testGoogleMarkerDoesNotExist(markerProps);
    });

    test('Marker mounter adds multiple google markers correctly', async () => {
        const testingMarkerId = 5;
        const markerProps: MarkerProps = {
            id: testingMarkerId,
            markerOptions: { position: testPosition },
        };
        const secondMarkerProps: MarkerProps = {
            id: testingMarkerId - 3,
            markerOptions: { position: testPosition },
        };

        expect(markerPoolMock).toHaveLength(0);

        const renderResult = renderMarkerMounterWith(
            <>
                <Marker {...markerProps} />
                <Marker {...secondMarkerProps} />
            </>,
        );

        expect(markerPoolMock).toHaveLength(2);
        testGoogleMarkerExists(markerProps);
        testGoogleMarkerExists(secondMarkerProps);
    });

    test('Marker mounter removes multiple google markers correctly', async () => {
        const testingMarkerId = 7;
        const markerProps: MarkerProps = {
            id: testingMarkerId,
            markerOptions: { position: testPosition },
        };
        const secondMarkerProps: MarkerProps = {
            id: testingMarkerId + 3,
            markerOptions: { position: testPosition },
        };

        const renderResult = renderMarkerMounterWith(
            <>
                <Marker {...markerProps} />
                <Marker {...secondMarkerProps} />
            </>,
        );

        const { rerender } = renderResult;

        expect(markerPoolMock).toHaveLength(2);

        rerender(getMarkerMounterWith());

        expect(markerPoolMock).toHaveLength(0);
        testGoogleMarkerDoesNotExist(markerProps);
        testGoogleMarkerDoesNotExist(secondMarkerProps);
    });

    test('Marker mounter mounts and unmounts google markers in sequence correctly', async () => {
        const testingMarkerId = 7;
        const markerProps: MarkerProps = {
            id: testingMarkerId,
            markerOptions: { position: testPosition },
        };
        const secondMarkerProps: MarkerProps = {
            id: testingMarkerId + 3,
            markerOptions: { position: testPosition },
        };

        const renderResult = renderMarkerMounterWith(
            <>
                <Marker {...markerProps} />
                <Marker {...secondMarkerProps} />
            </>,
        );

        const { rerender } = renderResult;

        expect(markerPoolMock).toHaveLength(2);

        rerender(getMarkerMounterWith());

        expect(markerPoolMock).toHaveLength(0);
        testGoogleMarkerDoesNotExist(markerProps);
        testGoogleMarkerDoesNotExist(secondMarkerProps);

        rerender(
            getMarkerMounterWith(
                <>
                    <Marker {...secondMarkerProps} />
                </>,
            ),
        );

        expect(markerPoolMock).toHaveLength(1);
        testGoogleMarkerExists(secondMarkerProps);

        rerender(getMarkerMounterWith());

        expect(markerPoolMock).toHaveLength(0);
        testGoogleMarkerDoesNotExist(markerProps);
        testGoogleMarkerDoesNotExist(secondMarkerProps);

        rerender(
            getMarkerMounterWith(
                <>
                    <Marker {...markerProps} />
                    <Marker {...secondMarkerProps} />
                </>,
            ),
        );

        expect(markerPoolMock).toHaveLength(2);
        testGoogleMarkerExists(markerProps);
        testGoogleMarkerExists(secondMarkerProps);
    });

    test('Marker mounter unmounts google markers correctly when unmounting', async () => {
        const testingMarkerId = 7;
        const markerProps: MarkerProps = {
            id: testingMarkerId,
            markerOptions: { position: testPosition },
        };
        const secondMarkerProps: MarkerProps = {
            id: testingMarkerId + 3,
            markerOptions: { position: testPosition },
        };

        const renderResult = renderMarkerMounterWith(
            <>
                <Marker {...secondMarkerProps} />
                <Marker {...markerProps} />
            </>,
        );

        const { rerender, unmount } = renderResult;

        expect(markerPoolMock).toHaveLength(2);

        unmount();

        expect(markerPoolMock).toHaveLength(0);
        testGoogleMarkerDoesNotExist(markerProps);
        testGoogleMarkerDoesNotExist(secondMarkerProps);
    });

    test('Marker mounter unmounts google markers correctly when immediate unmounting', async () => {
        const testingMarkerId = 7;
        const markerProps: MarkerProps = {
            id: testingMarkerId,
            markerOptions: { position: testPosition },
        };
        const secondMarkerProps: MarkerProps = {
            id: testingMarkerId + 3,
            markerOptions: { position: testPosition },
        };

        const renderResult = render(
            <MarkerMounterImmediateUnmounter mapContextValue={mapContextMock}>
                <Marker {...secondMarkerProps} />
                <Marker {...markerProps} />
            </MarkerMounterImmediateUnmounter>,
        );

        expect(markerPoolMock).toHaveLength(0);
        testGoogleMarkerDoesNotExist(markerProps);
        testGoogleMarkerDoesNotExist(secondMarkerProps);
    });

    const getMarkerMounterWith = (children?: JSX.Element) => (
        <MapMounterContext.Provider value={mapContextMock}>
            <MarkerMounter>{children}</MarkerMounter>
        </MapMounterContext.Provider>
    );

    const renderMarkerMounterWith = (children: JSX.Element) =>
        render(getMarkerMounterWith(children));

    const testGoogleMarkerExists = (markerProps: MarkerProps) => {
        const foundMarker = markerPoolMock.find((currMarker) => currMarker.id === markerProps.id);
        expect(foundMarker).toBeDefined();
    };

    const testGoogleMarkerDoesNotExist = (markerProps: MarkerProps) => {
        const foundMarker = markerPoolMock.find((currMarker) => currMarker.id === markerProps.id);
        expect(foundMarker).toBeUndefined();
    };
});
