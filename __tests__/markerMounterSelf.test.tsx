import { getMarkerMockText } from '@components/__mocks__/Marker';
import MarkerMounter from '@components/googleMapsMounter/MarkerMounter';
import Marker, { MarkerProps } from '@components/Marker';
import MapMounterContext, { MapMounterContextType } from '@context/MapMounterContext';
import { getRandomLocations } from '@develop_lib/markerUtils';
import { render, cleanup, RenderResult } from '@testing-library/react';
import { MarkerTypeOverwrite } from 'lib/types/mounterTypes';
import React from 'react';
import { createMapObject, createMapContextMock } from '../src/context/__mocks__/MapMounterContext';
jest.mock('@components/Marker');

// This test tests if MarkerMounter manages its states correctly (it does not test adding to google object);
describe('MarkerMounter Marker mounting self test', () => {
    let mapMock: google.maps.Map = null;
    let mapContextMock: MapMounterContextType;
    let mountedMarkers: google.maps.Marker[];
    const testPosition = getRandomLocations(1)[0];

    const getMountedMarkers = (markers: google.maps.Marker[]) => {
        mountedMarkers = markers;
    };

    beforeEach(() => {
        mountedMarkers = [];
        mapMock = createMapObject();
        mapContextMock = createMapContextMock(mapMock);
    });

    afterEach(() => {
        cleanup();
    });

    test('Marker mounter adds marker correctly', async () => {
        const testingMarkerId = 5;
        const markerProps: MarkerProps = {
            id: testingMarkerId,
            markerOptions: { position: testPosition },
        };

        expect(mountedMarkers).toHaveLength(0);

        const renderResult = renderMarkerMounterWith(<Marker {...markerProps} />);

        expect(mountedMarkers).toHaveLength(testingMarkerId + 1);
        await testIfMarkerWithIdIsMounted(markerProps, renderResult);
        const onlySetMarkers = mountedMarkers.filter(Boolean);
        expect(onlySetMarkers).toHaveLength(1);
    });

    test('Marker mounter removes marker correctly', async () => {
        const testingMarkerId = 6;
        const markerProps: MarkerProps = {
            id: testingMarkerId,
            markerOptions: { position: testPosition },
        };
        const renderResult = renderMarkerMounterWith(<Marker {...markerProps} />);
        const { rerender } = renderResult;

        rerender(<MarkerMounter onMountedMarkersChange={getMountedMarkers} />);

        expect(mountedMarkers).toHaveLength(testingMarkerId + 1);
        await testIfMarkerWithIdIsUnmounted(markerProps, renderResult);
        const onlySetMarkers = mountedMarkers.filter(Boolean);
        expect(onlySetMarkers).toHaveLength(0);
    });

    test('Marker mounter adds multiple markers correctly', async () => {
        const testingMarkerId = 5;
        const secondTestingMarkerId = 2;
        const markerProps: MarkerProps = {
            id: testingMarkerId,
            markerOptions: { position: testPosition },
        };
        const secondMarkerProps: MarkerProps = {
            id: secondTestingMarkerId,
            markerOptions: { position: testPosition },
        };

        expect(mountedMarkers).toHaveLength(0);

        const renderResult = renderMarkerMounterWith(
            <>
                <Marker {...markerProps} />
                <Marker {...secondMarkerProps} />
            </>,
        );

        expect(mountedMarkers).toHaveLength(testingMarkerId + 1);

        await testIfMarkerWithIdIsMounted(markerProps, renderResult);
        await testIfMarkerWithIdIsMounted(secondMarkerProps, renderResult);
        const onlySetMarkers = mountedMarkers.filter(Boolean);
        expect(onlySetMarkers).toHaveLength(2);
    });

    test('Marker mounter removes multiple markers correctly', async () => {
        const testingMarkerId = 5;
        const secondTestingMarkerId = 7;
        const markerProps: MarkerProps = {
            id: testingMarkerId,
            markerOptions: { position: testPosition },
        };
        const secondMarkerProps: MarkerProps = {
            id: secondTestingMarkerId,
            markerOptions: { position: testPosition },
        };
        const consoleWarn = jest.spyOn(console, 'warn');

        const renderResult = renderMarkerMounterWith(
            <>
                <Marker {...markerProps} />
                <Marker {...secondMarkerProps} />
                <Marker {...secondMarkerProps} />
            </>,
        );
        const { rerender } = renderResult;

        rerender(getMarkerMounterWith());

        expect(consoleWarn).toBeCalledTimes(1);
        expect(mountedMarkers).toHaveLength(secondTestingMarkerId + 1);

        await testIfMarkerWithIdIsUnmounted(markerProps, renderResult);
        await testIfMarkerWithIdIsUnmounted(secondMarkerProps, renderResult);
        const onlySetMarkers = mountedMarkers.filter(Boolean);
        expect(onlySetMarkers).toHaveLength(0);
    });

    test('Marker mounter can mount and unmount markers in sequence', async () => {
        const testingMarkerId = 5;
        const markerProps: MarkerProps = {
            id: testingMarkerId,
            markerOptions: { position: testPosition },
        };
        const secondMarkerProps: MarkerProps = {
            id: testingMarkerId - 1,
            markerOptions: { position: testPosition },
        };

        expect(mountedMarkers).toHaveLength(0);

        const renderResult = renderMarkerMounterWith(<Marker {...markerProps} />);
        const { rerender } = renderResult;

        rerender(getMarkerMounterWith());
        rerender(getMarkerMounterWith(<Marker {...secondMarkerProps} />));

        await testIfMarkerWithIdIsMounted(secondMarkerProps, renderResult);
        const onlySetMarkers = mountedMarkers.filter(Boolean);
        expect(onlySetMarkers).toHaveLength(1);
        rerender(<MarkerMounter onMountedMarkersChange={getMountedMarkers} />);
        await testIfMarkerWithIdIsUnmounted(markerProps, renderResult);
        const onlySetMarkersAfterUnmount = mountedMarkers.filter(Boolean);
        expect(onlySetMarkersAfterUnmount).toHaveLength(0);
    });

    test('Marker mounter unmounts correctly', async () => {
        const testingMarkerId = 5;
        const markerProps: MarkerProps = {
            id: testingMarkerId,
            markerOptions: { position: testPosition },
        };
        const secondMarkerProps: MarkerProps = {
            id: testingMarkerId - 1,
            markerOptions: { position: testPosition },
        };

        const renderResult = renderMarkerMounterWith(
            <>
                <Marker {...markerProps} />
                <Marker {...secondMarkerProps} />
            </>,
        );
        const { rerender, unmount } = renderResult;

        unmount();

        const onlyValidMarkers = mountedMarkers.filter(Boolean);
        expect(onlyValidMarkers).toHaveLength(0);
        await testIfMarkerWithIdIsUnmounted(markerProps, renderResult);
        await testIfMarkerWithIdIsUnmounted(secondMarkerProps, renderResult);
    });

    const getMarkerMounterWith = (children?: JSX.Element) => (
        <MarkerMounter onMountedMarkersChange={getMountedMarkers}>{children}</MarkerMounter>
    );

    const renderMarkerMounterWith = (children?: JSX.Element) =>
        render(getMarkerMounterWith(children));

    const testIfMarkerWithIdIsMounted = async (
        markerProps: MarkerProps,
        renderResult: RenderResult,
    ) => {
        await renderResult.findByText(getMarkerMockText(markerProps));
        expect(mountedMarkers[markerProps.id]).toBeDefined();
        const addedMarker = mountedMarkers[markerProps.id] as MarkerTypeOverwrite;
        expect(addedMarker.id).toBe(markerProps.id);
        expect(addedMarker.isToBeRemoved).toEqual(false);
    };

    const testIfMarkerWithIdIsUnmounted = async (
        markerProps: MarkerProps,
        renderResult: RenderResult,
    ) => {
        expect(renderResult.queryByText(getMarkerMockText(markerProps))).toBeNull();
        expect(mountedMarkers[markerProps.id]).toBeUndefined();
    };
});
