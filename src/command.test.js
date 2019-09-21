const assert = require('power-assert')
const path = require('path')
const { execCommand } = require('./command')

jest.setTimeout(1000 * 30)
/* eslint-env jest */
describe('command', () => {
  describe('execCommand', () => {
    it('ls', async () => {
      const ret = await execCommand('ls')
      assert(ret.includes('command.test.js'))
    })
    it('ls with pwd', async () => {
      const ret = await execCommand('ls', { cwd: path.resolve(__dirname, '..') })
      assert(!ret.includes('command.test.js'))
      assert(ret.includes('package.json'))
    })
    it('onData', async () => {
      let onDataString = ''
      const ret = await execCommand('ls', {
        onData (data) {
          onDataString += data
        }
      })
      assert(onDataString.includes('command.test.js'))
      assert(ret === '')
    })
    it('test error', async () => {
      await assert.rejects(
        async () => {
          return execCommand('ls notExistDir')
        }, {
          message: /notExistDir/,
          exitCode: 2,
          exitSignal: null
        }
      )
    })
  })
})
