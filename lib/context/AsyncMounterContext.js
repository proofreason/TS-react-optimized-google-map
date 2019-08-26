"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var useEffect = React.useEffect;
var AsyncMarkerArrayContext = React.createContext([
    {
        addObject: null,
        removeObject: null,
        map: null,
        stateObject: { isUnmounted: false, objects: [] },
    },
    null,
]);
var asyncMounterReady = function (asyncMounterContext) {
    return asyncMounterContext.map && asyncMounterContext.addObject && asyncMounterContext.removeObject;
};
exports.asyncMounterReady = asyncMounterReady;
var useAddToAsyncMounter = function (asyncMounterContext, props) {
    // todo set on async load
    var _a = React.useState(null), marker = _a[0], setMarker = _a[1];
    useEffect(function () {
        asyncMounterContext
            .addObject(props, props.id)
            .then(setMarker)
            .catch(function (error) { return console.error("Async object adding filed with: " + error + " "); });
        return function () { return asyncMounterContext.removeObject(props.id); };
    }, []);
    return marker;
};
exports.useAddToAsyncMounter = useAddToAsyncMounter;
exports.default = AsyncMarkerArrayContext;
//# sourceMappingURL=AsyncMounterContext.js.map