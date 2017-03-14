// webpack.config.js
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = ({
  entry: [
    './app/index.js',
    './app/styles/styles.scss'
  ],
  output: {
    path: './public/dist/',
    filename: 'bundle.js',
    libraryTarget: 'umd',
  },
  resolve: {
    alias: {
      appConfig: path.resolve(__dirname) + '/env/prod-config.js',
    },
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: ['babel'],
        query: {
          presets: ['es2015', 'react'],
        }
      },
      {
        test: /\.scss/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?minimize!sass'
        )
      },
      {
          test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$/,
          loader: 'file'
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('style.css', {
      allChunks: true
    }),
    new webpack.ProvidePlugin({
        'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
        'Map': 'core-js/fn/map',
        'Symbol': 'core-js/fn/symbol',
        'Promise': 'core-js/fn/promise',
        'Object.assign': 'core-js/fn/object/assign'
    })
  ],
  watch: false,
  devtool: 'source-map',
});
