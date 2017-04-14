/*Make sure .env file exists in the path from where you're calling npm run build*/
require('dotenv').config()
const path = require('path');
const basePath = path.resolve(__dirname,'../')
const shouldEnableAnalyzer = process.env.WEBPACK_ANALYZER_ENABLE == 'true' ? true : false
const enableHotLoadingInDev = process.env.WEBPACK_ENABLE_HOT_LOADING_IN_DEV == 'true' ? true : false
const isProd = process.env.production == 'true' ? true : false
const enableEslint = process.env.ENABLE_ESLINT_IN_DEV == 'true' ? true : false
const allConfig = {
  host: process.env.WEBPACK_HOST,
  port: process.env.WEBPACK_PORT,
  serviceWorkerVersion: process.env.SERVICEWORKER_VERSION,
  analyzerHost: process.env.WEBPACK_ANALYZER_HOST,
  analyzerPort: process.env.WEBPACK_ANALYZER_PORT,
  shouldEnableAnalyzer: shouldEnableAnalyzer,
  reactDomNode: process.env.REACT_DOM,
  appTitle: process.env.APP_TITLE,
  bootstrapLoaderConf: process.env.BOOTSTRAP_LOADER_FILE,
  enableHotLoadingInDev: enableHotLoadingInDev,
  isProd: isProd,
  basePath: basePath,
  srcPath: path.resolve(basePath,'./src/client'),
  distPath: path.resolve(basePath,'./dist/client'),
  enableEslint: enableEslint
}

module.exports = allConfig
