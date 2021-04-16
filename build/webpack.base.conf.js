// 'use strict'
const path = require('path')
const config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const px2remOpts = {
  rootValue: 100,
  unitPrecision: 5,
  minPixelValue: 2
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
  optimization: {
    minimizer: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          warnings: false,
          compress: {
            drop_console: false,
            drop_debugger: true
          },
          mangle: true, // 默认为false
          module: false,
          toplevel: false,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
        }
      })
    ],
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
          MiniCssExtractPlugin.loader,
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
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer'),
                require('postcss-plugin-px2rem')(px2remOpts)
              ]
            }
          },
          // {
          //   loader: 'px2rem-loader',
          //   options: {
          //     remUnit: 100,
          //     remPrecision: 8
          //   }
          // },
          'less-loader'
        ]
      }, 
      {
        test: /\.(jp?eg|png|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240,
            name: path.posix.join('static', '[name].[ext]')
          }
        }]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true
          }
        }],
      },
      canPrint: true
    })
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}