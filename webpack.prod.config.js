/**
 * Created by glenn on 29/02/16.
 */

const join              = require('path').join;
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  resolve: {
    root      : [
      join(__dirname, 'src'),
    ],
    alias     : {
      'kendo-ui-core-css': 'kendo-ui-core/css/web',
      'kendo-ui-core-js' : 'kendo-ui-core/js',
    },
    extensions: ['', '.js', '.css', '.html', '.json'],
  },
  entry  : {
    vendor: [
      'bootstrap-loader',
      'font-awesome-loader!./font-awesome.config.js',
      'lodash',
      'jquery',
      'angular',
      'kendo-ui-core-css/kendo.common-bootstrap.core',
      'kendo-ui-core-css/kendo.bootstrap',
      //'kendo-ui-core-js/kendo.window',
      'kendo-ui-core-js/kendo.ui.core',
    ],
    app   : [
      'babel-polyfill',
      './src/app.js',
    ],
  },
  output : {
    path      : join(__dirname, 'dist'),
    filename  : '[name].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon : './src/favicon.ico',
      filename: 'index.html',
    }),

    new ExtractTextPlugin('[name].css'),

    new webpack.ProvidePlugin({
      'window.Tether': 'tether',
    }),
  ],
  module : {
    loaders: [
      {
        test   : /\.js$/,
        include: [
          join(__dirname, 'src'),
        ],
        exclude: [
          join(__dirname, 'src/vendor'),
        ],
        loader : 'babel',
        query  : {
          presets: ['es2015', 'stage-2'],
          plugins: ['transform-runtime'],
        },
      },
      {
        include: [
          join(__dirname, 'node_modules/bootstrap/dist/js/umd'),
          join(__dirname, 'node_modules/kendo-ui-core/js'),
        ],
        loader : 'imports?jQuery=jquery',
      },
      {
        test  : /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
      },
      // the url-loader uses DataUrls.
      // the file-loader emits files.
      {
        test  : /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
        // loader: "url?limit=10000"
        loader: 'url',
      },
      {
        test  : /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file',
      },
      {
        test  : /\.(png|gif|jpg)$/,
        loader: 'url?limit=8192',
      },
      {
        test   : /\.html$/,
        include: [
          join(__dirname, 'src'),
        ],
        loader : 'html',
      },
      {
        test   : /\.json$/,
        include: [
          join(__dirname, 'src'),
        ],
        loader : 'json',
      },
    ],
  },
};
