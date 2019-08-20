import * as React from 'react';
var useEffect = React.useEffect;
var MarkerMounterContext = React.createContext([
    { addObject: null, removeObject: null, map: null, stateObject: { isUnmounted: false } },
    null,
]);
var objectMounterReady = function (loaderContext) {
    return loaderContext.map && loaderContext.addObject && loaderContext.removeObject;
};
var useAddToObjectMounter = function (objectMounterContext, props) {
    var _a = React.useState(null), marker = _a[0], setMarker = _a[1];
    useEffect(function () {
        setMarker(objectMounterContext.addObject(props, props.id));
        return function () {
            var isUnmounted = objectMounterContext.stateObject.isUnmounted;
            !isUnmounted && objectMounterContext.removeObject(props.id);
        };
    }, []);
    return marker;
};
export { MarkerMounterContext, useAddToObjectMounter, objectMounterReady, };
//# sourceMappingURL=ObjectMounterContext.js.map