/*loaders for webpack */
function getLoaders(allConfig) {
  let loaders=[];
  /*loaders config for css webpack*/
  const cssloaders = {
    style: conf => ({
      loader: 'style-loader',
      options: Object.assign({}, {

      }, conf)
    }),
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

  //General Loaders
  const babelOptions = {
    babelrc: false,
    presets: ["react","stage-2"],
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
  loaders.push(jsLoader)
  loaders.push({
    test: /\.(woff|woff2|svg)$/,
    use: [{ loader: 'url-loader', options: { limit: 10000 } }],
  }),
  loaders.push({
    test: /\.(ttf|eot)$/,
    use: [{ loader: 'file-loader' }]
  })
  if(allConfig.isProd) {
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
  } else {

    if (allConfig.enableEslint) {
      jsLoader.use.push({
        loader: 'eslint-loader',
        options: {
          /*formatter: require("eslint-friendly-formatter"),*/
        }
      })
    }

    if(allConfig.enableHotLoadingInDev) {
      babelOptions.plugins.push('react-hot-loader/babel')
    }

    loaders.push({
      test: /\.css$/,
      use: [ cssloaders.style(), cssloaders.css({ importLoaders: 1 }), cssloaders.postcss() ],
    })
    loaders.push({
      test: /\.scss$/,
      use: [ cssloaders.style(), cssloaders.css({ importLoaders: 2 }), cssloaders.postcss(), cssloaders.sass()],
    })
  }
  return loaders;
}

module.exports = getLoaders
