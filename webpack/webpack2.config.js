/*Webpack require*/
require('dotenv').config()
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

/*Env variables*/
const isProdEnv = process.env.production;
const _shouldEnableAnalyser = process.env.WEBPACK_ANALYZER_ENABLE;
const shouldEnableAnalyzer = _shouldEnableAnalyser == 'true' ? true : false
const isProd = isProdEnv == 'true' ? true : false
console.log(`===============BUILD FOR PRODUCTION ${isProd==true ? 'YES' : 'NO'}===============`)
const allConfig = {
  host: process.env.WEBPACK_HOST,
  port: process.env.WEBPACK_PORT,
  serviceWorkerVersion: process.env.SERVICEWORKER_VERSION,
  analyzerHost: process.env.WEBPACK_ANALYZER_HOST,
  analyzerPort: process.env.WEBPACK_ANALYZER_PORT,
  shouldEnableAnalyzer: shouldEnableAnalyzer,
  reactDomNode: process.env.REACT_DOM,
  appTitle: process.env.APP_TITLE,
}

/*Paths*/
const basePath = path.resolve(__dirname,'../');
const srcPath = path.resolve(basePath,'./src');
const distPath = path.resolve(basePath,'./dist');

/*config holder*/
let config = {}


/*Plugins for webpack*/
/* Dev mode bundle analyzer to understand and optimize bundles*/
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
/*Generate HTML file*/
const HtmlWebpackPlugin = require('html-webpack-plugin');
/*Extract Css to a new bundler*/
const ExtractTextPlugin = require("extract-text-webpack-plugin");
/*Create chunk for webpack based on file content*/
const WebpackChunkHash = require("webpack-chunk-hash");
/*Uglify js file*/
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
/*Create service worker for webpack*/
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
/*Create service worker for webpack in development mode*/
const SwPrecacheDevWebpackPlugin = require('sw-precache-webpack-dev-plugin');
/*Create a chunk manifest for webpack*/
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
/*const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');*/
/*const CompressionPlugin = require("compression-webpack-plugin");*/
/*const PreloadWebpackPlugin = require('preload-webpack-plugin');*/


/*plugins for webpack*/
function getPlugins() {
  let plugins = [];

  /*common plugins*/
  plugins.push(new HtmlWebpackPlugin({
    template: './index.html',
    inject: true,
    devtools: false,
    title: allConfig.appTitle,
    appMountId: allConfig.reactDomNode,
    minify: {
      removeComments: true,
      collapseWhitespace: false,
    },
    inline: fs.readFileSync(path.join(srcPath,'./swReg.js'), 'utf8'),
    ga: fs.readFileSync(path.join(srcPath,'./ga.js'), 'utf8')
  }))
  plugins.push(new ExtractTextPlugin({
    filename: 'bundle.css',
    disable: false,
    allChunks: true
  }))
  plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': !isProd ? '"development"' : '"production"',
    'process.env.BROWSER': false,
    __DEV__: !isProd,
  }))
  /* Webpack bundler analyzer*/
  if(allConfig.shouldEnableAnalyzer) {
    plugins.push(new BundleAnalyzerPlugin({
      // Can be `server`, `static` or `disabled`.
      // In `server` mode analyzer will start HTTP server to show bundle report.
      // In `static` mode single HTML file with bundle report will be generated.
      // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
      analyzerMode: 'server',
      // Host that will be used in `server` mode to start HTTP server.
      analyzerHost: allConfig.analyzerHost,
      // Port that will be used in `server` mode to start HTTP server.
      analyzerPort: allConfig.analyzerPort,
      // Path to bundle report file that will be generated in `static` mode.
      // Relative to bundles output directory.
      reportFilename: 'report.html',
      // Automatically open report in default browser
      openAnalyzer: true,
      // If `true`, Webpack Stats JSON file will be generated in bundles output directory
      generateStatsFile: false,
      // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
      // Relative to bundles output directory.
      statsFilename: 'stats.json',
      // Options for `stats.toJson()` method.
      // For example you can exclude sources of your modules from stats file with `source: false` option.
      // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
      statsOptions: null,
      // Log level. Can be 'info', 'warn', 'error' or 'silent'.
      logLevel: 'info'
    }))
  }


  if(!isProd) {
    /*for development*/
    plugins.push(new webpack.HotModuleReplacementPlugin())
    plugins.push(new webpack.NamedModulesPlugin())
    plugins.push(new SwPrecacheDevWebpackPlugin({
      // sw-precache options
      cacheId: `appcache-id:${allConfig.serviceWorkerVersion}`,
      filename: 'service-worker.js',
      runtimeCaching: [{
        handler: 'cacheFirst',
        urlPattern: /(https?:\/\/fonts.+)|(https?:\/\/maxcdn.+)/
      }],
      filename: '/sw.js'
    }))
    /*just to mock fetch request using fetch-mock*/
    plugins.push(new webpack.NormalModuleReplacementPlugin(/^fetch-mock$/,
      path.resolve(basePath, 'node_modules', 'fetch-mock/es5/client.js'))
    )
  }
  else {
    /*for production*/
    plugins.push(new WebpackChunkHash())
    plugins.push(new webpack.HashedModuleIdsPlugin())
    plugins.push(new UglifyJSPlugin())
    plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor','manifest'],
      minChunks: Infinity,
    }))
    plugins.push(new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }))
    plugins.push(new ChunkManifestPlugin({
      filename: "manifest.json",
      manifestVariable: "webpackManifest"
    }))
    plugins.push(new SWPrecacheWebpackPlugin({
      // sw-precache options
      cacheId: `appcache-id:${allConfig.serviceWorkerVersion}`,
      filename: 'service-worker.js',
      runtimeCaching: [{
        handler: 'cacheFirst',
        urlPattern: /(https?:\/\/fonts.+)|(https?:\/\/maxcdn.+)/
      }],
      filename: '/sw.js'
    }))
  }
  return plugins
}


/*loaders for webpack */
function getLoaders() {
  let loaders=[];
  /*loaders config for css webpack*/
  const cssloaders = {
    css: conf => ({
      loader: 'css-loader',
      options: Object.assign({}, {
        modules: true,
        minimize: false,
        sourceMap: false,
        localIdentName: '[name]--[local]--[hash:base64:8]',
      }, conf),
    }),
    postcss: conf => ({
      loader: 'postcss-loader',
      options: Object.assign({}, {
        sourceMap: false,
      }, conf),
    }),
    sass: conf => ({
      loader: 'sass-loader',
      options: Object.assign({}, {
        sourceMap: false,
      }, conf),
    }),
    sassResources: conf => ({
      loader: 'sass-resources-loader',
      options: Object.assign({},{
        sassResources: './config/sass-resources.scss',
      },conf),
    })

  }

  loaders.push({
    test: /\.js$|\.jsx$/,
    use: [{ loader: 'babel-loader' }],
    exclude: /node_modules/
  })
  loaders.push({
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      loader: [cssloaders.css({ importLoaders: 1 }), cssloaders.postcss()],
    }),
  })
  loaders.push({
    test: /\.scss$/,
    exclude: /(node_modules)/,
    loader: ExtractTextPlugin.extract({
      loader: [cssloaders.css({ importLoaders: 2 }), cssloaders.postcss(), cssloaders.sass(),cssloaders.sassResources()],
    }),
  })
  return loaders;
}

/*Common webpack config between prod & Development*/

const commonConfig = {
  context: srcPath,
  devServer: {
    hot: true,
    contentBase: distPath,
    publicPath: '/',
    port: `${allConfig.port}`,
  },
  resolve: {
    modules: [path.join(basePath, 'node_modules')],
    alias: {
      actions: path.resolve(srcPath,'./app/actions'),
      assets : path.resolve(srcPath,'./app/app_assets'),
      components : path.resolve(srcPath,'./app/components'),
      constants: path.resolve(srcPath,'./app/constants'),
      reducers: path.resolve(srcPath,'./app/reducers')
    },
    enforceExtension: false,
    extensions: [".js", ".jsx"],
  },
  plugins: getPlugins(),
}

/* Production config */
const prodConfig = {
  entry : {
    index:['./index.js',`bootstrap-loader/lib/bootstrap.loader?configFilePath=${path.join(basePath,'/.bootstraprc')}!bootstrap-loader/no-op.js`],
    vendor: ['react','react-dom'],
  },
  output : {
    path : distPath,
    publicPath: "/",
    filename:'[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  module: {
    rules : getLoaders(),
  }
}

/* Development config */
const devConfig = {
  entry : [
    `bootstrap-loader/lib/bootstrap.loader?configFilePath=${path.join(basePath,'/.bootstraprc')}!bootstrap-loader/no-op.js`,
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${allConfig.host}:${allConfig.port}`,
    'webpack/hot/only-dev-server',
    './index.js',
  ],
  output : {
    path : distPath,
    publicPath: "/",
    filename:'[name].js',
  },
  devtool: 'eval',
  module: {
    rules : getLoaders(),
  }
}

if(!isProd) {
  config = Object.assign(commonConfig, devConfig)
}
else {
  config = Object.assign(commonConfig, prodConfig)
}

module.exports = config;
