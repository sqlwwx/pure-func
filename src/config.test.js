const { loadConfig } = require('./config')
const { resolve } = require('path')

/* eslint-env jest */
describe('config', () => {
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
    it('config js & json', function() {
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
    it('config with env', function() {
      expect(
        loadConfig(resolve(__dirname, 'config'), 'configWithEnv')
      ).toEqual({
        debug: true,
        db: {
          host: 'localhost',
          username: 'root'
        }
      })
    })
  })
})
