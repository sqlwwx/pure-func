const { NodeVM } = require('vm2')

export const template = (code, options, filename) => {
  const fn = new NodeVM(options || {}).run(
    code.includes('module.exports')
      ? code
      : `module.exports = (data) => \`${code}\``,
    filename
  )
  return (...args) => {
    const ret = fn(...args)
    return Promise.resolve(ret)
  }
}
