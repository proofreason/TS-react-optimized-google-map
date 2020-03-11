import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MapInitializer from './components/testing/Testing';
import { MOUNTING_POINT } from './lib/constants';

if (MOUNTING_POINT) {
    ReactDOM.render(<MapInitializer />, MOUNTING_POINT);
}
