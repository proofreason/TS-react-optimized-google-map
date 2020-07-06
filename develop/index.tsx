import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TestingMapInitializer from './components/testing/Testing';
import { MOUNTING_POINT } from './lib/constants';

if (MOUNTING_POINT) {
    ReactDOM.render(<TestingMapInitializer />, MOUNTING_POINT);
}
