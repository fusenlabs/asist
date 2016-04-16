// webpack.config.js
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = ({
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './app/index.js',
    './app/styles/styles.scss'
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/dist/',
    libraryTarget: 'umd',
  },
  resolve: {
    alias: {
      'appConfig': './env/devel-config.js'
    },
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=react']
      },
      {
        test: /\.scss/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css!sass'
        )
      },
      {
          test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$/,
          loader: 'file'
      }
    ],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('style.css', {
      allChunks: true
    })
  ],
  watch: true,
  devtool: 'source-map',
});
