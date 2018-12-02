const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    chunkFilename: 'js/[name].[chunkhash:8].js',
  },
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: {
          process: function (css) {
            return require('cssnano').process(css, { /* options */ })
              .then(function (cssnanoResult) {
                return require("autoprefixer").process(cssnanoResult); // Assuming mqpacker is similar to cssnano interface
              });
          },
          canPrint: false
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['js', 'css'], {
      root:     path.resolve(__dirname, '../dist/'),
      verbose:  true,
      dry:      false
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../index.html')
    }),
    new BundleAnalyzerPlugin()
  ]
});