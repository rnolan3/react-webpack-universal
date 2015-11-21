import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { RoutingContext } from 'react-router';

const target = document.getElementById('app');
const component = (<RoutingContext {...props } />);

ReactDOM.render(component, target);
