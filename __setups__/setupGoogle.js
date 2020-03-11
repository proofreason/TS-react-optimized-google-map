markerPoolMock = [];
google ={
    maps:{
        OverlayView: class{
            setMap(){};
        },
        test: {},
        event:{
            clearInstanceListeners(objects){},
            addListener(){},
            removeListener(){},
        },
        Marker:class{
            setOptions(){};
            getMap(){};
            setMap(map){
                // be careful of restrictions to mocked map element
                if (map){
                    markerPoolMock.push(this);
                    return;
                }
                const markerIndex = markerPoolMock.indexOf(this);
                if (markerIndex !== -1){
                    delete markerPoolMock[markerIndex];
                    markerPoolMock = markerPoolMock.filter(Boolean);
                }
            };
            getDraggable(){return false};
        },
        Map:class{ setTilt(){}; fitBounds(){}},
        LatLngBounds:class{},
        places:{
            Autocomplete: class {},
            AutocompleteService:class{},
            PlacesServiceStatus: {
                INVALID_REQUEST: 'INVALID_REQUEST',
                NOT_FOUND: 'NOT_FOUND',
                OK: 'OK',
                OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
                REQUEST_DENIED: 'REQUEST_DENIED',
                UNKNOWN_ERROR: 'UNKNOWN_ERROR',
                ZERO_RESULTS: 'ZERO_RESULTS',
            },
            PlacesAutocomplete:{
                INVALID_REQUEST: 'INVALID_REQUEST',
                NOT_FOUND: 'NOT_FOUND',
                OK: 'OK',
                OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
                REQUEST_DENIED: 'REQUEST_DENIED',
                UNKNOWN_ERROR: 'UNKNOWN_ERROR',
                ZERO_RESULTS: 'ZERO_RESULTS',
            }
        },

        MarkerClusterer:class{},
        Geocoder:class{},
    }
};