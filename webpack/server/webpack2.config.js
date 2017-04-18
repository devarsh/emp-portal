const path = require('path');
const webpack = require('webpack');

/*Exported env variables and other variables wrapped in a config object */
/*This object will be passed around */
const allConfig = require('./config.js')

const babelOptions = {
  babelrc: false,
  presets: ["stage-2"],
  plugins: [],
}
const jsLoader = {
  test: /\.js$|\.jsx$/,
  use: [{
    loader: 'babel-loader',
    options: babelOptions
  }],
  exclude: /node_modules/
}
if (allConfig.enableEslint) {
  jsLoader.use.push({
    loader: 'eslint-loader',
    options: {
      /*formatter: require("eslint-friendly-formatter"),*/
    }
  })
}

var config = {
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  },
  entry : './app',
  output : {
    path : allConfig.distPath,
    publicPath: "/",
    filename:'[name].js',
  },
  devtool: 'eval',
  context: allConfig.srcPath,
  target: 'node',
  resolve: {
    modules: [path.join(allConfig.basePath, 'node_modules')],
    enforceExtension: false,
    extensions: [".js"],
  },
  module: {
    rules : [jsLoader,
    {
      test: /\.txt|\.pem$/,
      use: 'raw-loader'
    }]
  }
}

module.exports = config
