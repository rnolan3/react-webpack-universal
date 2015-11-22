import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';

import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';

const target = document.getElementById('app');

render(<Router history={ createBrowserHistory() }>{ routes }</Router>, target);
