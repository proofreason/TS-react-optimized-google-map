"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../lib/Utils");
var React = __importStar(require("react"));
var useEffect = React.useEffect;
var SCRIPT_ID = 'optimized-google-maps-script';
exports.SCRIPT_ID = SCRIPT_ID;
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
            Utils_1.loadScript(scriptUrl, SCRIPT_ID)
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
    var currentProps = __assign(__assign({}, DEFUALT_PROPS), props);
    var scriptUrl = currentProps.scriptUrl, onScriptLoad = currentProps.onScriptLoad, children = currentProps.children;
    useGoogleScript({ scriptUrl: scriptUrl, onScriptLoad: onScriptLoad });
    return React.createElement(React.Fragment, null, children);
};
exports.default = GoogleScriptMounter;
//# sourceMappingURL=GoogleScriptMounter.js.map