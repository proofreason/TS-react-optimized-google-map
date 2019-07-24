import { CZECH_REPUBLIC_LAT, CZECH_REPUBLIC_LONG } from './constants';

interface LatLngPosition {
    lat: number;
    lng: number;
}

const getRandomLocations = (
    count = 5000,
    span: LatLngPosition = { lat: 1, lng: 2 },
    origin: LatLngPosition = { lat: CZECH_REPUBLIC_LAT, lng: CZECH_REPUBLIC_LONG },
) => {
    let i = 0;
    const locations = [];
    for (i; i < count; i++) {
        const location = {
            lat: origin.lat + getRandomIn(-span.lat, span.lat),
            lng: origin.lng + getRandomIn(-span.lng, span.lng),
        };
        locations.push(location);
    }
    return locations;
};

const getRandomIn = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};

export { getRandomLocations, LatLngPosition };
