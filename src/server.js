/* eslint no-console: 0 */
import Express from 'express';
import RedBox from 'redbox-react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import React from 'react';
import Html from './helpers/html';

import path from 'path';
import http from 'http';
import config from './config';
import compression from 'compression';
import routes from './routes';

const app = new Express();
const server = new http.Server(app);

app.use(compression());
// app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(Express.static(path.join(__dirname, '..', 'static')));
app.get('*', (req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  try {
    match({ routes, location: req.url }, (err, redirect, props) => {
      if (err) {
        res.status(500).send(err.message);
      } else if (redirect) {
        res.redirect(redirect.pathname + redirect.search);
      } else if (props) {
        const assets = webpackIsomorphicTools.assets();
        const component = <RoutingContext {...props } />;

        res.send('<!doctype html>\n' + renderToString(<Html
            assets={ assets }
            component={ component }/>));
      } else {
        res.status(404).send('Not found');
      }
    });
  } catch (e) {
    if (__DEVELOPMENT__) {
      res.send('<!doctype html>\n' + renderToString(<RedBox error={e} />));
    }
  }
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.',
      config.app.title,
      config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.',
      config.host,
      config.port);
  });
} else {
  console.error('==>   ERROR: No PORT environment variable has been specified');
}
