var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { MarkerClustererContext, } from "../../../context/MarkerClustererContext";
import { mutableRemoveMarkersFrom } from "../../../lib/MounterCleanup";
import * as React from 'react';
var removeAllMarkers = function (reallyMountedMarkers, clustererContext) {
    var clusterer = clustererContext.clusterer;
    var mountedMarkers = reallyMountedMarkers[0];
    mutableRemoveMarkersFrom(mountedMarkers, clusterer);
};
var WithMarkerMounterCleanup = function (WrappedComponent) {
    var _a;
    return _a = /** @class */ (function (_super) {
            __extends(MarkerMounterWithCleanup, _super);
            function MarkerMounterWithCleanup() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.instanceMarkers = { current: [] };
                return _this;
            }
            MarkerMounterWithCleanup.prototype.componentWillUnmount = function () {
                var clustererContext = this.context[0];
                removeAllMarkers([this.instanceMarkers.current, undefined], clustererContext);
                this.instanceMarkers &&
                    clustererContext.clusterer &&
                    clustererContext.clusterer.repaint();
            };
            MarkerMounterWithCleanup.prototype.render = function () {
                var otherProps = __rest(this.props, []);
                return (React.createElement(React.Fragment, null,
                    React.createElement(WrappedComponent, __assign({ instanceMarkers: this.instanceMarkers }, otherProps))));
            };
            return MarkerMounterWithCleanup;
        }(React.Component)),
        _a.contextType = MarkerClustererContext,
        _a;
};
export default WithMarkerMounterCleanup;
//# sourceMappingURL=WithMarkerMounterCleanup.js.map