const path = require('path');
/*Exported env variables and other variables wrapped in a config object */
/*This object will be passed around */
const allConfig = require('./config.js')

console.log(`===============BUILD FOR PRODUCTION ${allConfig.isProd==true ? 'YES' : 'NO'}===============`)

/*import Loaders */
const getLoaders = require('./loaders.js')
/*import Plugins */
const getPlugins = require('./plugins.js')

/*config holder*/
let config = {}

/*Common webpack config between prod & Development*/

const commonConfig = {
  context: allConfig.srcPath,
  devServer: {
    hot: allConfig.enableHotLoadingInDev,
    contentBase: allConfig.distPath,
    publicPath: '/',
    port: `${allConfig.port}`,
    compress: false,
    headers: {
      "X-Powered-By": "DEVA"
    },
    historyApiFallback: true
  },
  resolve: {
    modules: [path.join(allConfig.basePath, 'node_modules')],
    alias: {
      actions: path.resolve(allConfig.srcPath,'./app/actions'),
      assets : path.resolve(allConfig.srcPath,'./app/app_assets'),
      components : path.resolve(allConfig.srcPath,'./app/components'),
      constants: path.resolve(allConfig.srcPath,'./app/constants'),
      reducers: path.resolve(allConfig.srcPath,'./app/reducers'),
      utils: path.resolve(allConfig.srcPath,'./app/utils')
    },
    enforceExtension: false,
    extensions: [".js", ".jsx"],
  },
  module: {
    rules : getLoaders(allConfig),
  },
  plugins: getPlugins(allConfig),
}

/* Production config */
const prodConfig = {
  entry : {
    index:['./index',`bootstrap-loader/lib/bootstrap.loader?configFilePath=${path.join(allConfig.basePath,'./',allConfig.bootstrapLoaderConf)}!bootstrap-loader/no-op.js`],
    vendor: ['react','react-dom'],
  },
  output : {
    path : allConfig.distPath,
    publicPath: "/",
    filename:'[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
}

/* Development config */
const devConfig = {
  entry : [
    `webpack-dev-server/client?http://${allConfig.host}:${allConfig.port}`,
    `bootstrap-loader/lib/bootstrap.loader?configFilePath=${path.join(allConfig.basePath,'./',allConfig.bootstrapLoaderConf)}!bootstrap-loader/no-op.js`,
    './index',
  ],
  output : {
    path : allConfig.distPath,
    publicPath: "/",
    filename:'[name].js',
  },
  devtool: 'eval',
}

if (allConfig.enableHotLoadingInDev && !allConfig.isProd) {
  let allEntry = devConfig.entry
  allEntry = Array.prototype.concat([
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server'
    ],allEntry)
  devConfig.entry = allEntry
}

/*Final Config */

if(!allConfig.isProd) {
  config = Object.assign(commonConfig, devConfig)
}
else {
  config = Object.assign(commonConfig, prodConfig)
}

module.exports = config;
