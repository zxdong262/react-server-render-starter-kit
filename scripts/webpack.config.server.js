const webpack = require('webpack')
const path = require('path')
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin')
const pack = require('../package.json')
const exts = Object.keys(pack.dependencies).concat(Object.keys(pack.devDependencies))
module.exports = exports.default = {
  entry: {
    render: './src/server.js'
  },
  output: {
    path: path.resolve(__dirname, '../server/'), //输出文件目录
    filename: '[name].min.js', //输出文件名
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  watch: true,
  externals: exts,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'production'"
      }
    }),
    new UnminifiedWebpackPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
}