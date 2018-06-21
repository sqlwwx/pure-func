const { sleepRandom, doWhile, sleep } = require('./promise')

/* eslint-env jest */
describe('promise', () => {
  it('sleep', async () => {
    let start = Date.now()
    await sleep()
    let time = Date.now() - start
    expect(time).toBeGreaterThanOrEqual(1000)
    expect(time).toBeLessThan(1200)
  })
  it('sleepRandom', async () => {
    const start = Date.now()
    await sleepRandom(200, 1000)
    const time = Date.now() - start
    expect(time).toBeGreaterThanOrEqual(200)
    expect(time).toBeLessThan(1000)
  })
  it('doWhile', async () => {
    let i = 0
    await doWhile(async () => {
      return Promise.resolve(++i)
    }, data => data < 10)
    expect(i).toEqual(10)
  })
})
