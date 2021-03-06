var path = require('path')
var utils = require('./utils')
var config = require('../config')
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/index.jsx'
  },
  output: {
    path: process.env.NODE_ENV === 'production'?config.build.assetsRoot:config.test.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : (process.env.NODE_ENV === 'testing'?config.test.assetsPublicPath:config.dev.assetsPublicPath)
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js|.jsx$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {test: /\.css$/, loader: ExtractTextPlugin.extract({
        use: 'css-loader',
        fallback : 'style-loader'
      })},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract({
          use: 'css-loader!sass-loader',
          fallback : 'style-loader'
      })},
    ]
  }
}
