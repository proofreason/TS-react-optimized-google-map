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
import * as React from 'react';
var withContex = function (WrappedComponent, selector) {
    return function (props) {
        var selectedContextProps = selector();
        return React.createElement(WrappedComponent, __assign({ context: selectedContextProps }, props));
    };
};
export default withContex;
//# sourceMappingURL=WithSelectedContext.js.map