/*Webpack require*/
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

/*Env variables*/
const isProd = process.argv.includes('--release');
const allConfig = {
  host: 'localhost',
  port: '8081',
  serviceWorkerVersion: '1'
}
let config = {}


/*Paths*/
const basePath = path.resolve(__dirname,'../');
const srcPath = path.resolve(basePath,'./src');
const distPath = path.resolve(basePath,'./dist');



/*Plugins for webpack*/

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
    title:'Emp Portal',
    appMountId:'container',
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
  } else {
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
      loader: [cssloaders.css({ importLoaders: 2 }), cssloaders.postcss(), cssloaders.sass()],
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
    index:['./index.js'],
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
    /*'react-hot-loader/patch',*/
    `webpack-dev-server/client?http://${allConfig.host}:${allConfig.port}`,
    'webpack/hot/only-dev-server',
    './index.js',
  ],
  output : {
    path : distPath,
    publicPath: "/",
    filename:'[name].js',
  },
  devtool: 'inline-source-map',
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
