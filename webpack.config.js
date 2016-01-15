// webpack.config.js
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

var locals = {
  paths: ['/'],
};

module.exports = ({
  entry: {
    main: './app/index.js',
    css: './app/styles/styles.scss',
  },
  output: {
    filename: 'boundle.js',
    path: 'dist',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.scss/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          '!css-loader!sass-loader'
        ),
      },
    ],
  },
  plugins: [
    new StaticSiteGeneratorPlugin('main', locals.paths, locals),
    new ExtractTextPlugin('style.css'),
    new webpack.NoErrorsPlugin(),
  ],
  watch: true,
  devtool: 'source-map',
});
