const webpack = require('webpack')
const path = require('path')
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin')

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
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom'
    }
  },
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