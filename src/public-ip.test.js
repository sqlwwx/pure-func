const { v4 } = require('./public-ip')

const isIp = /\d+\.\d+\.\d+\.\d+/

jest.setTimeout(1000 * 60 * 5)

/* eslint-env jest */
describe('public-ip', () => {
  it('v4', async () => {
    let now = Date.now()
    expect(isIp.test(await v4())).toEqual(true)
    expect(Date.now() - now).toBeGreaterThanOrEqual(3)
    now = Date.now()
    expect(isIp.test(await v4())).toEqual(true)
    expect(Date.now() - now).toBeLessThan(2)
    expect(v4({
      reload: true,
      urls: [
        'http://notExist.com/'
      ]
    })).rejects.toHaveProperty('message', 'LOAD_PUBLIC_IP_FAILED')
  })
  it('v4 reload', async () => {
    const now = Date.now()
    expect(isIp.test(await v4({ reload: true }))).toEqual(true)
    expect(Date.now() - now).toBeGreaterThanOrEqual(2)
  })
  it('v4 customer urls', async () => {
    const now = Date.now()
    expect(isIp.test(await v4({
      reload: true,
      urls: ['http://icanhazip.com/']
    }))).toEqual(true)
    expect(Date.now() - now).toBeGreaterThanOrEqual(2)
  })
  it('v4 retry', async () => {
    const now = Date.now()
    const ipv4 = await v4({
      reload: true,
      urls: [
        'http://notExist.com/',
        'http://ipecho.net/plain',
        'http://whatismyip.akamai.com/'
      ]
    })
    expect(isIp.test(ipv4)).toEqual(true)
    expect(Date.now() - now).toBeGreaterThanOrEqual(2)
  })
  it('v4 error', async () => {
    expect(v4({
      reload: true,
      urls: [
        'http://notExist.com/'
      ]
    })).rejects.toHaveProperty('message', 'LOAD_PUBLIC_IP_FAILED')
  })
})
