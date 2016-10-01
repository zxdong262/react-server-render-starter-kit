const webpack = require('webpack')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const configSys = require('./server/config')
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin')
const pack = require('./package.json')
const today = new Date().toISOString().substr(0, 10) 
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractTextPlugin = new ExtractTextPlugin('css/[name].styles.css')

let config = {
  entry: {
    app: './src/client.js'
  },
  output: {
    path: __dirname + '/public/', //输出文件目录
    filename: 'js/[name].min.js', //输出文件名
    libraryTarget: 'var',
    publicPath: '/'
  },
  watch: true,
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css!stylus')
      },
    ]
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: 'http://localhost:' + configSys.wport }),
    extractTextPlugin
  ],
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    watch: true,
    port: configSys.wport,
    proxy: {
      '*': {
        target: 'http://localhost:' + configSys.port,
        secure: false,
        ws: false,
        bypass: function (req, res, opt) {
          if (
            /(\.json)$/.test(req.path) ||
            /\.bundle\.js/.test(req.path)
          ) {
            console.log('bypass', req.path)
            return req.path
          }
        }
      }
    }
  },
}

if (process.env.NODE_ENV === 'production') {

  config.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'production'"
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
      }
    }),
    new UnminifiedWebpackPlugin(),
    extractTextPlugin,
    new webpack.BannerPlugin(
      `
/**
 * ${pack.name}
 * @version v${pack.version} - ${today}
 * @link ${pack.homepage}
 * @author ${pack.author.name} (${pack.author.email})
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
      `
      , { raw: true })
  ]

  config.devtool = 'source-map'

}


module.exports = config