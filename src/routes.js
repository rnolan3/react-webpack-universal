import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { App } from './containers';

import {
  Home,
  Secondary
} from './components';

export default (
  <Route component={ App } path="/">
    <IndexRoute component={ Home } />
    <Route component={ Secondary } path="secondary" />
  </Route>
);
