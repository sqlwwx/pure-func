const { NodeVM } = require('vm2')

export const template = (code, options = {}) => {
  const fn = new NodeVM(options).run(
    code.startsWith('module')
      ? code
      : `module.exports = (data) => \`${code}\``
  )
  return (...args) => {
    const ret = fn(...args)
    return Promise.resolve(ret)
  }
}
