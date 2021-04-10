const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const px2remOpts = {
  rootValue: 75,
  unitPrecision: 5,
}

module.exports = {
  mode: 'production',
  // entry: {
  //   app: ['./src/index.js']
  // },
  entry: './src/index.js',
  output: {
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/dist/',
    // filename: 'mCmsComponents.min.js',
    filename: 'main.js',
    chunkFilename: '[id].js',
    libraryExport: 'default',
    library: 'mCmsComponents',
    libraryTarget: 'commonjs2'
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
          // options: {
          //   publicPath: (resourcePath, context) => {
          //     return path.relative(path.dirname(resourcePath), context) + '/styles/';
          //   },
          // }
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
      test: /\.(jp?eg|png|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: path.posix.join('static', '[name]_[hash:6].[ext]')
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
    new MiniCssExtractPlugin({
      filename: '/theme/main.css',
      // chunkFilename: '[id].css'
    })
  ]
}
