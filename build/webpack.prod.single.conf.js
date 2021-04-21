const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const px2remOpts = {
  rootValue: 100,
  unitPrecision: 5,
  minPixelValue: 2
}

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/dist/',
    filename: 'index.js',
    chunkFilename: '[id].js',
    libraryExport: 'default',
    library: 'compsLibraryName',
    libraryTarget: 'commonjs2'
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
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
    }, {
      test: /\.css$/,
      // loaders: ['style-loader', 'css-loader'],
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
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
            esModule: false,
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
    }, {
      test: /\.(jp?eg|png|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: path.posix.join('static', '[name].[ext]')
        }
      }]
    }, {
      test: /\.vue$/,
      loader: 'vue-loader'
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
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
  ]
}
