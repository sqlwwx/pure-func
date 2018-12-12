const { merge } = require('lodash')
const path = require('path')
const { existsSync, readFileSync } = require('fs')

export const requireFile = filePath => {
  if (!filePath || !existsSync(filePath)) {
    return null
  }
  try {
    const extName = path.extname(filePath)
    // eslint-disable-next-line
    if (!extName || !require('module')._extensions[extName]) {
      return readFileSync(filePath)
    }
    // eslint-disable-next-line
    const obj = require(filePath)
    // eslint-disable-next-line no-underscore-dangle
    if (obj && obj.__esModule) {
      return obj.default
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
    ...exts.map(ext => `${name}.${ext}`),
    ...exts.map(ext => `${name}.${NODE_ENV}.${ext}`)
  ].map(fullName => requireFile(path.resolve(dir, fullName)))
  return merge({}, ...configs)
}
