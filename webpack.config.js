/**
 * Created by glenn on 29.02.16.
 * Last updated on 29.10.17.
 */

const { resolve } = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

const config = {
  entry: {
    vendor: [
      'bootstrap-loader',
      'lodash',
      'jquery',
    ],
    polyfills: [
      'babel-polyfill',
    ],
    app: './src/app.js',
  },
  output: {
    filename: ifProd('[name].[chunkhash].js', '[name].js'),
    path: resolve(__dirname, 'assets'),
    publicPath: '/',
  },
  module: {
    rules: [
      // Bootstrap 4
      {
        test: /bootstrap\/dist\/js\/umd\//,
        use: 'imports-loader?jQuery=jquery',
      },
      {
        test: /\.js$/,
        include: [
          resolve(__dirname, 'src'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['transform-runtime', 'babel-plugin-transform-object-rest-spread'],
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ use: 'css-loader' }),
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'url-loader?limit=8192',
      },
      {
        test: /\.(woff2?|svg)$/,
        use: 'url-loader?limit=10000',
      },
      {
        test: /\.(ttf|eot)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    // Code Splitting - CSS
    new ExtractTextPlugin(ifProd('[name].[chunkhash].css', '[name].css')),

    // Code Splitting - Libraries
    new webpack.optimize.CommonsChunkPlugin({
      names: [
        'polyfills',
        'vendor',
        'manifest',
      ],
    }),

    // Caching
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      favicon: './src/favicon.ico',
    }),
    new InlineManifestWebpackPlugin(),

    /**
     *
     * @see https://github.com/shakacode/bootstrap-loader#bootstrap-4-internal-dependency-solution
     */
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tether: 'tether',
      'window.Tether': 'tether',
      Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
      Button: 'exports-loader?Button!bootstrap/js/dist/button',
      Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
      Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
      Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
      Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
      Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
      Popper: ['popper.js', 'default'],
      Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
      Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
      Tooltip: 'exports-loader?Tooltip!bootstrap/js/dist/tooltip',
      Util: 'exports-loader?Util!bootstrap/js/dist/util',
    }),

    ...ifProd(
      [
        // Building for Production
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
      ],
      [
        new webpack.NoEmitOnErrorsPlugin(),

        // HMR
        new webpack.HotModuleReplacementPlugin(),
      ]
    ),
  ],
  devtool: ifProd('source-map', 'eval'),
  resolve: {
    modules: [
      'node_modules',
      resolve(__dirname, 'src'),
    ],
  },
  devServer: {
    contentBase: resolve(__dirname, 'assets'),
    compress: true,
    noInfo: true,
    historyApiFallback: true,
    hot: true,
    https: true,
  },
};

function ifProd(prodStuff, devStuff) {
  return (process.env.NODE_ENV === 'production') ? prodStuff : devStuff;
}

module.exports = config;
