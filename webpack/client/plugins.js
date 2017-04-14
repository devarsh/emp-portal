/*Webpack require*/
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

/*const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');*/
/*const CompressionPlugin = require("compression-webpack-plugin");*/
/*const PreloadWebpackPlugin = require('preload-webpack-plugin');*/


/*plugins for webpack*/
function getPlugins(allConfig) {
  let plugins = [];

  /*common plugins*/

  /*Generate HTML file*/
  const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    inline: fs.readFileSync(path.join(allConfig.srcPath,'./swReg.js'), 'utf8'),
    ga: fs.readFileSync(path.join(allConfig.srcPath,'./ga.js'), 'utf8')
  }))

  /*Extract Css to a new bundler*/
  const ExtractTextPlugin = require("extract-text-webpack-plugin");
  plugins.push(new ExtractTextPlugin({
    filename: 'bundle.css',
    disable: false,
    allChunks: true
  }))

  /* Plugin to define Nodejs ENV variables*/
  plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': !allConfig.isProd ? '"development"' : '"production"',
    'process.env.BROWSER': false,
    __DEV__: !allConfig.isProd,
  }))

  /* Webpack bundler analyzer*/
  if(allConfig.shouldEnableAnalyzer) {

    /* Dev mode bundle analyzer to understand and optimize bundles*/
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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


  if(!allConfig.isProd) {
    /*for development*/

    if(allConfig.enableHotLoadingInDev) {
      plugins.push(new webpack.HotModuleReplacementPlugin())
    }

    plugins.push(new webpack.NamedModulesPlugin())

    /*Create service worker for webpack in development mode*/
    const SwPrecacheDevWebpackPlugin = require('sw-precache-webpack-dev-plugin');
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
      path.resolve(allConfig.basePath, 'node_modules', 'fetch-mock/es5/client.js'))
    )
  }
  else {
    /*for production*/

    /*Create chunk for webpack based on file content*/
    const WebpackChunkHash = require("webpack-chunk-hash");
    plugins.push(new WebpackChunkHash())

    plugins.push(new webpack.HashedModuleIdsPlugin())

    /*Uglify js file*/
    const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
    plugins.push(new UglifyJSPlugin())

    plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor','manifest'],
      minChunks: Infinity,
    }))

    plugins.push(new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }))

    /*Create a chunk manifest for webpack*/
    const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
    plugins.push(new ChunkManifestPlugin({
      filename: "manifest.json",
      manifestVariable: "webpackManifest"
    }))

    /*Create service worker for webpack*/
    const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
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


module.exports = getPlugins
