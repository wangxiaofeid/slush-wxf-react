const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  cache: true,
  output: {
    chunkFilename: 'js/[name].js',
  },
  devServer: {
    inline:true,
    port: config.dev.port,
    contentBase: path.join(__dirname, '../dist'),
    open: true
  },
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new HardSourceWebpackPlugin()
  ]
});