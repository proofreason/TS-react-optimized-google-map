import Marker from '@components/Marker';
import { MapMounterContextType } from '@context/MapMounterContext';
import { MarkerMounterContextType, MarkerMounterContext } from '@context/ObjectMounterContext';
import { getRandomLocations } from '@develop_lib/markerUtils';
import { render, cleanup } from '@testing-library/react';
import React from 'react';
import { createMapObject, createMapContextMock } from '../src/context/__mocks__/MapMounterContext';
import { createMarkerMounterContext } from '../src/context/__mocks__/ObjectMounterContext';

describe('Marker self tests', () => {
    let mapMock: google.maps.Map = null;
    let mapContextMock: MapMounterContextType;
    let markerMounterContextMock: MarkerMounterContextType;

    beforeEach(() => {
        mapMock = createMapObject();
        mapContextMock = createMapContextMock(mapMock);
        markerMounterContextMock = createMarkerMounterContext(mapMock);
    });

    afterEach(() => {
        cleanup();
    });

    it('Marker adds and removes itself correctly from mounter context', () => {
        const testingMarkerId = 0;
        const testPosition = getRandomLocations(1)[0];
        const [markerMounterContextState] = markerMounterContextMock;

        const { objects } = markerMounterContextState.stateObject;
        expect(objects).toHaveLength(0);
        const addMarkerFncSpy = jest.spyOn(markerMounterContextState, 'addObject');
        const removeMarkerFncSpy = jest.spyOn(markerMounterContextState, 'removeObject');

        const wrapper = render(
            <MarkerMounterContext.Provider value={markerMounterContextMock}>
                <Marker id={testingMarkerId} markerOptions={{ position: testPosition }} />
            </MarkerMounterContext.Provider>,
        );

        expect(addMarkerFncSpy).toBeCalledTimes(1);
        expect(objects).toHaveLength(1);

        wrapper.unmount();

        expect(addMarkerFncSpy).toBeCalledTimes(1);
        expect(removeMarkerFncSpy).toBeCalledTimes(1);
        expect(objects[0]).toBeUndefined();
    });
});
