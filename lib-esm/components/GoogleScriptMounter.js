var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { loadScript } from "../lib/Utils";
import * as React from 'react';
var useEffect = React.useEffect;
var SCRIPT_ID = 'optimized-google-maps-script';
var DEFUALT_PROPS = {
    scriptUrl: null,
};
var alreadyMounted = false;
var useGoogleScript = function (_a) {
    var scriptUrl = _a.scriptUrl, onScriptLoad = _a.onScriptLoad;
    var _b = React.useState(false), scriptLoaded = _b[0], setScriptLoaded = _b[1];
    useEffect(function () {
        alreadyMounted && onScriptLoad && onScriptLoad();
        !alreadyMounted &&
            loadScript(scriptUrl, SCRIPT_ID)
                .then(function () {
                setScriptLoaded(true);
                onScriptLoad && onScriptLoad();
            })
                .catch(function (error) { return console.error("error during script load: " + error); });
        alreadyMounted = true;
    }, []);
    return scriptLoaded;
};
var GoogleScriptMounter = function (props) {
    if (props === void 0) { props = DEFUALT_PROPS; }
    var currentProps = __assign({}, DEFUALT_PROPS, props);
    var scriptUrl = currentProps.scriptUrl, onScriptLoad = currentProps.onScriptLoad, children = currentProps.children;
    useGoogleScript({ scriptUrl: scriptUrl, onScriptLoad: onScriptLoad });
    return React.createElement(React.Fragment, null, children);
};
export { SCRIPT_ID };
export default GoogleScriptMounter;
//# sourceMappingURL=GoogleScriptMounter.js.map