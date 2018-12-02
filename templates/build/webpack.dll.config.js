const path    = require('path');
const webpack = require('webpack');
module.exports = {
  entry: {
      vendor: ['react', 'react-dom', 'react-router', 'react-router-dom', 'mobx', 'mobx-react', 'react-loadable']
  },
  output: {
    path: path.resolve(__dirname, '../dist/dll'),
    filename: '[name].js',
    library: '[name]_library'
  },
  plugins: [
      new webpack.DllPlugin({
          name: '[name]_library',
          path: path.resolve(__dirname, '../dist/dll', 'manifest.json'),
          context: __dirname
      })
  ]
};