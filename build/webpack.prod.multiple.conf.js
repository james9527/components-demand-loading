// 'use strict'
const path = require('path')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = require('../config/prod.env')

// 整理入口
const components = require('../components.json')
const entrys = {}
Object.keys(components).forEach(item => {
  entrys[item] = components[item]
})

const webpackConfig = merge(baseWebpackConfig, {
  mode: env.NODE_ENV,
  entry: entrys,
  output: {
    path: config.build.assetsRoot,
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    library: 'compsLibraryName',
    libraryTarget: 'commonjs2'
  },
  performance: {
    hints: false
  },
  stats: 'none',
  optimization: {
    minimize: false
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env.NODE_ENV
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      // sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    new MiniCssExtractPlugin({
      filename: '/theme/[name].css',
      chunkFilename: '/theme/[id].css'
    })
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
