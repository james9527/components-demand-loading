const path = require('path')
const utils = require('./utils')
const config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const px2remOpts = {
  rootValue: 75,
  unitPrecision: 5,
}

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.less'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'icons': resolve('src/assets'),
    }
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        // include: [resolve('src/components'), resolve('node_modules/webpack-dev-server/client')]
        include: [resolve('src/components')]
      }, {
        test: /\.css$/,
        // loaders: ['style-loader', 'css-loader'],
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader'
        ],
      }, {
        test: /\.less$/,
        use: [
          // 'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          },
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer'),
                require('postcss-plugin-px2rem')(px2remOpts)
              ]
            }
          }
        ]
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
        // options: {
        //   limit: 10240,
        //   name: path.posix.join('static', '[name]_[hash:6].[ext]')
        // }
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}