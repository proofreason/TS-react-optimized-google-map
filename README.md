# Typescript React optimized google maps
## About

This is a **typescript** native, **react google maps wrapper** library aimed at performance, while maintaining 
react principles.

### The problem

This library is supposed to tackle the problem of bad perormance of js google map, when used
with react.

The performance is probably bad because the need to check many components for updates when working with
large number of markers.

This library aims at minimizing the amount of render and update cycles for markers while trying to 
maintain the "react way".

### Disclaimer

This library is evolving very slowly now and is aimed at resolving issues I/we are having right now, so it is in no way a finnished production ready product and is subject to many changes to the API and the way it works as a library.

Use at your own risk.

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


## Documentation 

TODO: Will be present soon

### Basic how it all works (if you need to go to the code)

Most component use context to mount themselves to a map.
So they don't need to be direct chilren of the mounter components, but they need a component that allows them to mount in their context (above in the tree).
Example of context distributing component is **GoogleMapsMounter**, which distributes the reference to the mounted map.

Components working with optimized components like **MarkerMounter** or **MarkerClusterer** distribute their own context aswell so components like **Marker** use these contexts to register themselves at these contexts and the given **mounter** then takes care of mounting and unmounting the components. Markers are updating through direct reference to their mounted js object in the **Marker component**.

Every optimized object like **Marker must have ID provided** to ensure it is the same marker and speed up the update.

## Basic Examples

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

## Where is project used

This library is used in few comercial projects, but we cannot lost them here.
Maybe we will add some examples in the future.