const { merge } = require('lodash')
const path = require('path')
const { existsSync, readFileSync } = require('fs')

export const requireFile = filePath => {
  if (!filePath || !existsSync(filePath)) {
    return null
  }
  try {
    const extName = path.extname(filePath)
    if (!extName || !require('module')._extensions[extName]) {
      return readFileSync(filePath)
    }
    const obj = require(filePath)
    if (obj && obj.__esModule) {
      return 'default' in obj ? obj.default : obj
    }
    return obj
  } catch (err) {
    err.message = `requireFile ${filePath} error: ${err.message}`
    throw err
  }
}

export const loadConfig = (dir, name, exts = ['json', 'js']) => {
  const { NODE_ENV = 'development' } = process.env
  const configs = [
    ...exts.map(ext => [name, ext].join('.')),
    ...exts.map(ext => [name, NODE_ENV, ext].join('.'))
  ].map(name => requireFile(path.resolve(dir, name)))
  return merge({}, ...configs)
}
