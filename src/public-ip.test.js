const { v4 } = require('./public-ip')

const isIp = /\d+\.\d+\.\d+\.\d+/

/* eslint-env jest */
describe('public-ip', () => {
  it('v4', async () => {
    let now = Date.now()
    expect(isIp.test(await v4())).toEqual(true)
    expect(Date.now() - now).toBeGreaterThanOrEqual(3)
    now = Date.now()
    expect(isIp.test(await v4())).toEqual(true)
    expect(Date.now() - now).toBeLessThan(2)
  })
  it('v4 reload', async () => {
    let now = Date.now()
    expect(isIp.test(await v4({ reload: true }))).toEqual(true)
    expect(Date.now() - now).toBeGreaterThanOrEqual(2)
  })
  it('v4 customer url', async () => {
    let now = Date.now()
    expect(isIp.test(await v4({
      reload: true,
      url: 'http://icanhazip.com/'
    }))).toEqual(true)
    expect(Date.now() - now).toBeGreaterThanOrEqual(2)
  })
})
