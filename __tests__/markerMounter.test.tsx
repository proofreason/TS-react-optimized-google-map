import MarkerMounter from '@components/googleMapsMounter/MarkerMounter';
import MapMounterContext, { MapMounterContextType } from '@context/MapMounterContext';
import { getRandomLocations } from '@develop_lib/markerUtils';
import { shallow, mount, render } from 'enzyme';
import React from 'react';
import MarkerMock from './__mocks__/components/MarkerMock';
import { createMapObject, createMapContextMock } from './__mocks__/contexts/mapMounterMock';

describe('Marker mounter self tests', () => {
    let mapMock: google.maps.Map = null;
    let mapContextMock: MapMounterContextType;

    beforeEach(() => {
        mapMock = createMapObject();
        mapContextMock = createMapContextMock(mapMock);
    });

    it('Marker mounter can add marker', () => {
        const testingMarkerId = 0;
        const testPosition = getRandomLocations(1)[0];

        const wrapper = mount(
            <MarkerMounter>
                <MarkerMock id={testingMarkerId} markerOptions={{ position: testPosition }} />
            </MarkerMounter>,
        );
    });
});
