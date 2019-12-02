const assert = require('power-assert')
const { template } = require('./vmTemplate')

/* eslint-env jest */
describe('vmTemplate', () => {
  it('async', async () => {
    // eslint-disable-next-line no-template-curly-in-string
    const fn = template('module.exports = async (ctx) => `timestamp: ${ctx.timestamp}`')
    let timestamp = Date.now()
    let ret = await fn({ timestamp })
    assert(ret === `timestamp: ${timestamp}`)
    timestamp = Date.now()
    ret = await fn({ timestamp })
    assert(ret === `timestamp: ${timestamp}`)
  })
  it('no async ', async () => {
    // eslint-disable-next-line no-template-curly-in-string
    const fn = template('module.exports = (ctx) => `timestamp: ${ctx.timestamp}`')
    let timestamp = Date.now()
    let ret = await fn({ timestamp })
    assert(ret === `timestamp: ${timestamp}`)
    timestamp = Date.now()
    ret = await fn({ timestamp })
    assert(ret === `timestamp: ${timestamp}`)
  })
  it('template str', async () => {
    // eslint-disable-next-line no-template-curly-in-string
    const fn = template('timestamp: ${data.timestamp}')
    let timestamp = Date.now()
    let ret = await fn({ timestamp })
    assert(ret === `timestamp: ${timestamp}`)
    timestamp = Date.now()
    ret = await fn({ timestamp })
    assert(ret === `timestamp: ${timestamp}`)
  })
})
