'use strict';

require('babel-polyfill');

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const assetsPath = path.resolve(__dirname, '../static/dist');
const host = (process.env.HOST || 'localhost');
const port = parseInt(process.env.PORT, 10) + 1 || 3001;

const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin =
  new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

const babelrc = fs.readFileSync('./.babelrc');
let babelrcObject = {};

try {
  babelrcObject = JSON.parse(babelrc);
} catch (err) {
  console.error('==>    Error: Error parsing your .babelrc');
  console.error(err);
}

const babelrcObjectDevelopment = babelrcObject.env &&
  babelrcObject.env.development || {};
const babelLoaderQuery = Object.assign({},
  babelrcObject,
  babelrcObjectDevelopment);
delete babelLoaderQuery.env;

babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
if (babelLoaderQuery.plugins.indexOf('react-transform') < 0) {
  babelLoaderQuery.plugins.push('react-transform');
}

babelLoaderQuery.extra = babelLoaderQuery.extra || {};
if (!babelLoaderQuery.extra['react-transform']) {
  babelLoaderQuery.extra['react-transform'] = {};
}
if (!babelLoaderQuery.extra['react-transform'].transforms) {
  babelLoaderQuery.extra['react-transform'].transforms = [];
}

babelLoaderQuery.extra['react-transform'].transforms.push({
  transform: 'react-transform-hmr',
  imports: ['react'],
  locals: ['module']
});

module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [ './src/client.js' ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://' + host + ':' + port + '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel?' + JSON.stringify(babelLoaderQuery), 'eslint-loader']
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.less$/,
        loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=' +
          '[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version' +
          '!less?outputStyle=expanded&sourceMap'
      },
      {
        test: /\.scss$/,
        loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=' +
          '[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version' +
          '!sass?outputStyle=expanded&sourceMap'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader?limit=10240'
      }
    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js']
  },
  plugins: [
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
    }),
    webpackIsomorphicToolsPlugin.development()
  ]
};
