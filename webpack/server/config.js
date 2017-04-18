const path = require('path');
const basePath = path.resolve(__dirname,'../../')
const allConfig = {
  basePath: basePath,
  srcPath: path.resolve(basePath,'./src/server'),
  distPath: path.resolve(basePath,'./dist/server'),
  enableEslint: false
}

module.exports = allConfig
