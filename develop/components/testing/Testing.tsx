import GoogleMapsMounter from '@components/GoogleMapsMounter';
import MarkerMounter from '@components/googleMapsMounters/MarkerMounter';
import GoogleScriptMounter from '@components/GoogleScriptMounter';
import InfoBox from '@components/InfoBox';
import MapControll from '@components/MapControll';
import Marker from '@components/Marker';
import MarkerBatch from '@components/MarkerBatch';
import OptimizedMarkerClusterer from '@components/MarkerClusterer';
import MapMounterContext from '@context/MapMounterContext';
import { CZECH_REPUBLIC_LAT, CZECH_REPUBLIC_LONG } from '@develop_lib/constants';
import { getRandomLocations } from '@develop_lib/markerUtils';
import * as React from 'react';
import MarkerDeployer from './MarkerDeployer';
const { useState } = React;

type MapInitializerProps = {};

const GOOGLE_API_URL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
const prevAndSelectedId: number[] = [null];
const prevSelectedId: number = null;

const MapInitializer = () => {
    const [isScriptLoaded, setScriptLoaded] = useState(false);
    const [displayMarkers, setDisplayMarkers] = useState(true);
    const [mapMounterContext, setMapMounterContex] = React.useContext(MapMounterContext);

    const setScriptIsLoaded = () => setScriptLoaded(true);

    const mapWrapper = <div id={'map-mounter'} style={{ width: '800px', height: '500px' }} />;

    const toggleDisplayMarkers = () => {
        displayMarkers ? setDisplayMarkers(false) : setDisplayMarkers(true);
    };
    const testPosition = getRandomLocations(1)[0];
    const testingMarkerId = 11;

    return (
        <GoogleScriptMounter key={0} scriptUrl={GOOGLE_API_URL} onScriptLoad={setScriptIsLoaded}>
            <div>Script is {isScriptLoaded ? 'loaded' : 'not loaded'}</div>
            {isScriptLoaded && (
                <GoogleMapsMounter
                    key={0}
                    mapElement={mapWrapper}
                    center={{ lat: CZECH_REPUBLIC_LAT, lng: CZECH_REPUBLIC_LONG }}
                >
                    <MarkerDeployer display={displayMarkers} />

                    <MapControll
                        position={google.maps.ControlPosition.LEFT_CENTER}
                        offsets={{ topOffset: 25 }}
                    >
                        <div onClick={toggleDisplayMarkers} style={{ background: 'red' }}>
                            Remove markers
                        </div>
                    </MapControll>
                </GoogleMapsMounter>
            )}
        </GoogleScriptMounter>
    );
};

export default MapInitializer;
