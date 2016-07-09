/**
 * Created by glenn on 29/02/16.
 */

import { resolve } from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default (env) => {
  const prodEnabled = env && env.prod;

  return {
    devtool  : prodEnabled ? 'source-map' : 'eval',
    resolve  : {
      modules   : [resolve(__dirname, 'src'), 'node_modules'],
      extensions: ['', '.js', '.css', '.html', '.json'],
      alias     : {
        'kendo-ui-core-css': 'kendo-ui-core/css/web',
        'kendo-ui-core-js' : 'kendo-ui-core/js',
      },
    },
    entry    : {
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
    output   : {
      path      : resolve(__dirname, 'dist'),
      filename  : '[name].js',
      publicPath: '/',
    },
    plugins  : [
      ...(prodEnabled ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false,
          },
        }),
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug   : false,
        }),
      ] : [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
      ]),

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
    module   : {
      loaders: [
        {
          test   : /\.js$/,
          include: [
            resolve(__dirname, 'src'),
          ],
          exclude: [
            resolve(__dirname, 'src/vendor'),
          ],
          loader : 'babel',
          query  : {
            presets: ['es2015-webpack', 'stage-2'],
            plugins: ['transform-runtime'],
          },
        },
        {
          include: [
            resolve(__dirname, 'node_modules/bootstrap/dist/js/umd'),
            resolve(__dirname, 'node_modules/kendo-ui-core/js'),
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
            resolve(__dirname, 'src'),
          ],
          loader : 'html',
        },
        {
          test   : /\.json$/,
          include: [
            resolve(__dirname, 'src'),
          ],
          loader : 'json',
        },
      ],
    },
    devServer: {
      contentBase       : 'dist/',
      noInfo            : true,
      historyApiFallback: true,
    },
  };
};
