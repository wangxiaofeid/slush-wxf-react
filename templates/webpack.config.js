const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require(path.join(__dirname, 'package.json'));
const theme = require(path.join(__dirname, pkg.theme));
const query = {"sourceMap": true, "modifyVars": theme}

const postcssPlugin = [
  require('postcss-nested')(),
  require('pixrem')(),
  require('autoprefixer')({
    browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8']
  }),
  require('postcss-flexibility')(),
  require('postcss-discard-duplicates')()
]

const htdocs = path.join(__dirname, './');
const PATHS = {
  dist: path.join(__dirname, 'dist'),
  dev: path.join(__dirname, 'dev'),
  src: path.join(__dirname, 'src'),
  styles: path.join(__dirname, 'src/styles'),
  images: path.join(__dirname, 'src/images'),
  components: path.join(__dirname, 'src/components'),
  release: path.join(htdocs, 'dist'),
  htdocs: htdocs
};

const common = {
  entry: {
    app: './src/main',
    vendor: ['react', 'react-dom', 'mobx', 'mobx-react', './src/polyfill']
  },
  externals: {
      jquery: 'window.$'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
        styles: PATHS.styles,
        images: PATHS.images,
        components: PATHS.components
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        include: PATHS.src
      }, {
        test: /\.txt$/,
        use: 'raw-loader',
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            minetype: 'application/font-woff'
          }
        }]
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            minetype: 'application/font-woff'
          }
        }]
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            minetype: 'application/octet-stream'
          }
        }]
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader'
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            minetype: 'image/svg+xml'
          }
        }]
      }, {
        test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  }
};

const startConfig = merge(common, {
  cache: true,
  stats: {
    colors: true,
    reasons: true,
    timings: true,
  },
  devtool: 'source-map',
  output: {
    path: PATHS.dist,
    filename: '[name].js?[hash]',
    chunkFilename: '[chunkhash].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return postcssPlugin
              },
              sourceMap: true
            }
          }, {
            loader: 'less-loader',
            options: query
          }],
        })
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return postcssPlugin
              },
              sourceMap: true
            }
          }]
        })
      },
    ]
  },
  devServer: {
    contentBase: PATHS.dev,

    historyApiFallback: true,
    hot: true,
    inline: true,

    stats: 'errors-only',

    host: process.env.HOST,
    port: process.env.PORT
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      __DEV__: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor'],
        filename: '[name].js?[hash]',
    }),
    new ExtractTextPlugin({
      filename: '[name].css?[hash]',
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: pkg.name,
      inject: 'body',
      filename: 'index.html',
      template: 'index.html'
    })
  ]
});

const releaseConfig = merge(common, {
  output: {
    path: PATHS.release,
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      __DEV__: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor'],
        filename: '[name].js',
    }),
    new ExtractTextPlugin({
      filename: "[name].css",
      disable: false,
      allChunks: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return
              },
              sourceMap: true
            }
          }, {
            loader: 'less-loader',
            options: query
          }],
        })
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return postcssPlugin
              },
              sourceMap: true
            }
          }]
        })
      },
    ]
  }
});

const releaseWatchConfig = merge(releaseConfig, {devtool: 'source-map'});

const TARGET = process.env.npm_lifecycle_event;
process.env.NODE_ENV = 'production';
switch(TARGET) {
  case 'release':
    module.exports = releaseConfig;
    break;
  case 'release:watch':
    module.exports = releaseWatchConfig;
    break;
  default:
    process.env.NODE_ENV = 'development';
    module.exports = startConfig;
    break;
}
