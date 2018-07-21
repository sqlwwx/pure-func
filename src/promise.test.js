const { sleepRandom, doWhile, sleep } = require('./promise')

class Test {
  constructor () {
    this.sendCount = 0
  }
  async send (data) {
    this.sendCount++
    await sleep((this.sendCount - 1) * 1000)
    console.log('send:' + data, Date.now())
    await sleep()
    this.sendCount--
  }
}

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
    expect(time).toBeLessThan(1020)
  })
  it('doWhile', async () => {
    let i = 0
    let limit = 10
    await doWhile(async () => {
      return Promise.resolve(++i)
    }, data => data < limit)
    expect(i).toEqual(limit)
  })
  it('test', async () => {
    const test = new Test()
    await Promise.all([1, 2, 3].map((i) => {
      return test.send(i)
    }))
  })
})
