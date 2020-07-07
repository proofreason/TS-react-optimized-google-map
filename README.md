# Typescript React optimized google maps
## About

This is a **typescript** native, **react google maps wrapper** library aimed at performance, while maintaining 
react principles.

### Disclaimer

> This library is evolving very slowly now and is aimed at resolving issues I/we are having right now, so it is in no way a finnished product and is possibly subject to changes to the API and the way it works as a library. 
> It is being used for stacionary marker display in production environments but we cannot guarantee reliability.

> Use at your own risk.


## Documentation 

TODO: Will be present soon, although most can be deduced from types.

### Get map with markers in 3 steps

I highly encourage you to look into a basic JS google maps api before using any library so you can understand its concepts better. We will not be documenting google maps api in this project.

*We will asume you have your API setup in `google console`.*
*You can use **Basic Examples** section to setup components we are mentioning*

1. First you need to mount **google script** so your global **google** object gets loaded. This can be done with our **`GoogleScriptMounter`** component.
1. Second you need your **google map** which you need to mount somewhere. This can be done by mounting our **`GoogleMapsMounter`**. This will load the map into the `mapElement`.
1. Then you want to add something to your map. We will add a **marker** using our **`Marker`** component.

From **`develop/examples/SimpleExample`**
```jsx
    import { GoogleScriptMounter, GoogleMapsMounter, Marker } from '@proofreason/ts-react-optimized-google-map';

    const [isScriptLoaded, setScriptLoaded] = useState(false);
    const setScriptIsLoaded = () => setScriptLoaded(true);

    const mapWrapper = <div id={'map-mounter'} style={{ width: '800px', height: '500px' }} />;
    <GoogleScriptMounter scriptUrl={GOOGLE_API_URL} onScriptLoad={setScriptIsLoaded}>
            {isScriptLoaded && (
                <GoogleMapsMounter
                    mapElement={mapWrapper}
                    center={{ lat: NARNIA_REPUBLIC_LAT, lng: NARNIA_REPUBLIC_LONG }}
                    withMounter={true}
                >
                    <Marker
                        key={1}
                        id={1}
                        markerOptions={{
                            // google maps marker options
                            position: testPosition,
                            optimized: true,
                        }}
                    />
                </GoogleMapsMounter>
            )}
        </GoogleScriptMounter>
```
And that is it, **you should see your marker at the given position.**

**There is one catch** which is `withMounter={true}`. When this option is true, the `GoogleMapsMounter` will automatically include default `MarkerMounter` as its child so `Marker` components can mount. If you want `MarkerMounter` with custom option you just need to add one above your `Marker` components. But it must be under `GoogleMapsMounter` so it can get its context for the `map`.

## Basic Examples

You can find example files at **`develop/examples/SimpleExample`** and **`develop/examples/Example`**

### Google script Mounter

```jsx
    <GoogleScriptMounter scriptUrl={GOOGLE_API_URL} onScriptLoad={setScriptIsLoaded}>
        ...
    </GoogleScriptMounter>
```

### Google Maps Mounter with Map Controll
```jsx
    const mapWrapper = <div id={'map-mounter'} style={{ width: '800px', height: '500px' }} />;
    <GoogleMapsMounter
        mapElement={mapWrapper}
        center={{ lat: NARNIA_REPUBLIC_LAT, lng: NARNIA_REPUBLIC_LONG }}
        withMounter={true}
    >
        <MapControll
            position={google.maps.ControlPosition.TOP_CENTER}
            offsets={{ topOffset: 30 }}
            containerStyle={{ width: '100%', pointerEvents: 'none' }}
        >
            <div>My custom controll</div>
        </MapControll>
        ...
    </GoogleMapsMounter>
```

### Marker clusterer

```jsx
    <MarkerClusterer
        onMountedMarkersUpdateStart={onUpdate}
        onMountedMarkersUpdateFinish={onUpdateFinish}
        clusteringSettings={{
            // extended markerclustererplus options
            onClickExtender: extendOurZoomOnClick,
            ignoreHidden: true,
            gridSize: 90,
            maxZoom: 5,
            averageCenter: true,
            zoomOnClick: false,
            calculator: calculateNumberInTheMiddleOfMarker,
        }}
    >
        ...
    </MarkerClusterer>
```

### Marker mounter
```jsx
    <MarkerMounter
        onMountedMarkersUpdateStart={onUpdate}
        onMountedMarkersUpdateFinish={onUpdateFinish}
        displayOnlyInFov={false}
    >
        ...
    </MarkerMounter>
```

### Marker with Info Box
```jsx
    <Marker
        key={id}
        id={id}
        onMouseEnter={mouseIsOverMarker}
        onMouseOut={mouseIsNotOverMarker}
        onClick={onMarkerMouseClick}
        markerOptions={{
            // google maps marker options
            position,
            optimized: true,
            icon,
            label,
            city: address.city,
        }}
        optimizations={{ listenersChanged: false //Can assume no listeners changed }}
    >
        <InfoBox
            position={new google.maps.LatLng(position.lat(), position.lng())}
            open={isOpen}
            {...{
                closeBoxURL: ``,
                enableEventPropagation: true,
                disableAutoPan: true,
                pixelOffset: new google.maps.Size(widthOffset, heightOffset),
                alignBottom: true,
                boxStyle: {
                    padding: '10px',
                    overflow: 'hidden',
                    width: '250px',
                    marginLeft: '-125px',
                    textAlign: 'center',
                },
            }}
        >
            <div>
                <div>{text}</div>
                <div>{subText}</div>
            </div>
        </InfoBox>
    </Marker>
```

## Contribution

We are not quite yet ready for contributions of code from outside and don't have the resources
to manage contributions.
But if you find something you would like to implement or improve feel free to start a PR.

Also feel free to report any issues.

## Implemented functionality

### Optimized

- **Stacionary markers** - Marker id is required for optimized updates
    - Marker loading
    - Marker updating
    - Marker rendering
- Movable markers? - never tested thogh possibly functional

### Basic implementation

- **Safe google script loading**
- **Marker clustering**
- Info Box
- Info Window
- **Map controll**

## To be done in near future (optimized or basic)

- Marker spiderify - basic implementation might be present soon
- Polygons - polygon drawing will be implemented in near future (level of optimization will be yet determined)
- Marker Batching and Component Deconstruction - Experimental feature ready, to be improved soon. 
    - Makrer components will be deconstructed to pure **JS google objects and updates will be handled with a single component** over a batch of JS objects removing the React overhead. 

### The problem
Bad perormance of js google map, when used with react.

- performance is probably bad because the need to check many components for updates when working with
**large number of markers** or other components.

This library aims at minimizing the amount of render and update cycles for markers while trying to 
maintain the "react way".

### How it all works in the code (if you need to go to the code)

#### Unoptimized components

- Most component use context to mount themselves to a map.
So they don't need to be direct chilren of the mounter components, but they need a component that allows them to mount in their context (above in the tree).

- Example of context distributing component is **`GoogleMapsMounter`**, which distributes the reference to the **mounted map** via its context.

#### Optimized components
- Components like **`MarkerMounter`** or **`MarkerClusterer`** distribute their own context aswell **`Marker`** components use these contexts to register themselves at these contexts and the given **mounter** then takes care of mounting and unmounting the components. 

- Markers are updating through direct reference to their mounted js object in the **Marker component**.

Every optimized object like **Marker must have ID provided** to ensure it is the same marker and speed up the update.

## Where is project used

This library is used in few comercial projects, but we cannot lost them here.
Maybe we will add some examples in the future.