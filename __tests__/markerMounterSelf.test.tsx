import { getMarkerMockText } from '@components/__mocks__/Marker';
import MarkerMounter from '@components/googleMapsMounters/MarkerMounter';
import Marker, { MarkerProps } from '@components/Marker';
import MapMounterContext, { MapMounterContextType } from '@context/MapMounterContext';
import { getRandomLocations } from '@develop_lib/markerUtils';
import { MarkerTypeOverwrite } from '@src_types/mounterTypes';
import { render, cleanup, RenderResult } from '@testing-library/react';
import React from 'react';
import { createMapObject, createMapContextMock } from '../src/context/__mocks__/MapMounterContext';
jest.mock('@components/Marker');

// This test tests if MarkerMounter manages its states correctly (it does not test adding to google object);
describe('MarkerMounter Marker mounting self test', () => {
    let mapMock: google.maps.Map = null;
    let mapContextMock: MapMounterContextType;
    let mountedMarkers: google.maps.Marker[];
    const testPosition = getRandomLocations(1)[0];

    // Never do this kind of thing in real code. This is just to minimize redundant code in tests.
    const getMountedMarkersOnChangeFinish = (markers: google.maps.Marker[]) => {
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

    // This is really important since we are using the output of this to veryfy the other tests
    test('Marker mounter notifies about marker change correctly', async () => {
        const testingMarkerId = 5;
        const markerProps: MarkerProps = {
            id: testingMarkerId,
            markerOptions: { position: testPosition },
        };

        let notifiedOnStartMarkers: google.maps.Marker[] = [];
        let notifiedOnFinishMarkers: google.maps.Marker[] = [];

        const updateNotifiedOnStartMarkers = (markers: google.maps.Marker[]) => {
            notifiedOnStartMarkers = markers;
        };

        const updateNotifiedOnFinishMarkers = (markers: google.maps.Marker[]) => {
            notifiedOnFinishMarkers = markers;
        };

        const renderResult = renderMarkerMounterWith(
            <Marker {...markerProps} />,
            updateNotifiedOnStartMarkers,
            updateNotifiedOnFinishMarkers,
        );
        const { rerender } = renderResult;

        expect(notifiedOnStartMarkers).toHaveLength(0);
        expect(notifiedOnFinishMarkers).toHaveLength(testingMarkerId + 1);

        rerender(
            getMarkerMounterWith(
                undefined,
                updateNotifiedOnStartMarkers,
                updateNotifiedOnFinishMarkers,
            ),
        );

        expect(notifiedOnStartMarkers).toHaveLength(testingMarkerId + 1);
        const onlySetFinishMarkers = notifiedOnFinishMarkers.filter(Boolean);
        expect(onlySetFinishMarkers).toHaveLength(0);
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

        rerender(<MarkerMounter onMountedMarkersUpdateFinish={getMountedMarkersOnChangeFinish} />);

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
        rerender(<MarkerMounter onMountedMarkersUpdateFinish={getMountedMarkersOnChangeFinish} />);
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

    const getMarkerMounterWith = (
        children?: JSX.Element,
        onMarkersChangeStart?: (markers: google.maps.Marker[]) => void,
        // Never do this kind of thing in real code. This is just to minimize redundant code in tests.
        onMarkersChangeFinish: (
            markers: google.maps.Marker[],
        ) => void = getMountedMarkersOnChangeFinish,
    ) => (
        <MarkerMounter
            onMountedMarkersUpdateStart={onMarkersChangeStart}
            onMountedMarkersUpdateFinish={onMarkersChangeFinish}
        >
            {children}
        </MarkerMounter>
    );

    const renderMarkerMounterWith = (
        children?: JSX.Element,
        onMarkersChangeStart?: (markers: google.maps.Marker[]) => void,
        // Never do this kind of thing in real code. This is just to minimize redundant code in tests.
        onMarkersChangeFinish: (
            markers: google.maps.Marker[],
        ) => void = getMountedMarkersOnChangeFinish,
    ) => render(getMarkerMounterWith(children, onMarkersChangeStart, onMarkersChangeFinish));

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
