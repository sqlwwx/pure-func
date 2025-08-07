const { resolve } = require('path')
const { loadConfig, requireFile } = require('./config')

/* eslint-env jest */
describe('config', () => {
  describe('requireFile', () => {
    it('require file without ext', async () => {
      expect(
        requireFile(resolve(__dirname, 'config', 'test')).toString()
      ).toEqual('none\n')
    })
    it('require file error json', async () => {
      function requireErrorJson () {
        requireFile(resolve(__dirname, 'config', 'errJson.json'))
      }
      expect(
        requireErrorJson
      ).toThrow('Unexpected token')
    })
  })
  describe('loadConfig', () => {
    it('one config', () => {
      expect(
        loadConfig(resolve(__dirname, 'config'), 'oneJsConfig')
      ).toEqual({
        debug: true
      })
      expect(
        loadConfig(resolve(__dirname, 'config'), 'oneJsonConfig')
      ).toEqual({
        debug: true
      })
    })
    it('config js & json', () => {
      expect(
        loadConfig(resolve(__dirname, 'config'), 'config')
      ).toEqual({
        debug: true,
        db: {
          host: 'localhost',
          username: 'root'
        }
      })
    })
    it('config with env', () => {
      expect(
        loadConfig(resolve(__dirname, 'config'), 'configWithEnv')
      ).toEqual({
        debug: true,
        db: {
          host: 'localhost',
          username: 'root'
        }
      })
      // process.env.NODE_ENV = null => process.env.NODE_ENV === 'null'
      // process.env.NODE_ENV = null
      delete process.env.NODE_ENV
      expect(
        loadConfig(resolve(__dirname, 'config'), 'configWithEnv')
      ).toEqual({
        debug: true,
        db: {
          host: 'localhost',
          username: 'dev'
        }
      })
    })
  })
})
