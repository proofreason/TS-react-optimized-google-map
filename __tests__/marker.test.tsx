import Marker from '@components/Marker';
import { MapMounterContextType } from '@context/MapMounterContext';
import { MarkerMounterContextType, MarkerMounterContext } from '@context/ObjectMounterContext';
import { getRandomLocations } from '@develop_lib/markerUtils';
import { shallow, mount, render } from 'enzyme';
import React from 'react';
import { createMapObject, createMapContextMock } from './__mocks__/contexts/mapMounterMock';
import { createMarkerMounterContext } from './__mocks__/contexts/markerMounterMock';

describe('Marker self tests', () => {
    let mapMock: google.maps.Map = null;
    let mapContextMock: MapMounterContextType;
    let markerMounterContextMock: MarkerMounterContextType;

    beforeEach(() => {
        mapMock = createMapObject();
        mapContextMock = createMapContextMock(mapMock);
        markerMounterContextMock = createMarkerMounterContext(mapMock);
    });

    it('Marker adds and removes itself correctly from mounter', () => {
        const testingMarkerId = 0;
        const testPosition = getRandomLocations(1)[0];
        const [markerMounterContextState] = markerMounterContextMock;

        const { objects } = markerMounterContextState.stateObject;
        expect(objects.length).toEqual(0);

        const wrapper = mount(
            <MarkerMounterContext.Provider value={markerMounterContextMock}>
                <Marker id={testingMarkerId} markerOptions={{ position: testPosition }} />
            </MarkerMounterContext.Provider>,
        );

        expect(objects.length).toEqual(1);

        wrapper.unmount();

        expect(objects[0]).toEqual(undefined);
    });
});
