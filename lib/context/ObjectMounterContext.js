"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var useEffect = React.useEffect;
var MarkerMounterContext = React.createContext([
    {
        addObject: null,
        removeObject: null,
        map: null,
        stateObject: { isUnmounted: false, objects: [] },
    },
    null,
]);
exports.MarkerMounterContext = MarkerMounterContext;
var objectMounterReady = function (loaderContext) {
    return loaderContext.map && loaderContext.addObject && loaderContext.removeObject;
};
exports.objectMounterReady = objectMounterReady;
var useAddToObjectMounter = function (objectMounterContext, props) {
    var _a = React.useState(null), marker = _a[0], setMarker = _a[1];
    useEffect(function () {
        if (!objectMounterContext ||
            !objectMounterContext.addObject ||
            !objectMounterContext.removeObject) {
            return;
        }
        setMarker(objectMounterContext.addObject(props, props.id));
        return function () {
            var isUnmounted = objectMounterContext.stateObject.isUnmounted;
            !isUnmounted && objectMounterContext.removeObject(props.id);
        };
    }, [objectMounterContext]);
    return marker;
};
exports.useAddToObjectMounter = useAddToObjectMounter;
//# sourceMappingURL=ObjectMounterContext.js.map