const { sleepRandom, doWhile, sleep } = require('./promise')

jest.setTimeout(1000 * 30)

class Test {
  constructor () {
    this.sendCount = 0
  }

  async send (data) {
    this.sendCount += 1
    await sleep((this.sendCount - 1) * 1000)
    // eslint-disable-next-line
    console.log(`send:${data}`, Date.now())
    await sleep()
    this.sendCount -= 1
  }
}

/* eslint-env jest */
describe('promise', () => {
  it('sleep', async () => {
    const start = Date.now()
    await sleep()
    const time = Date.now() - start
    expect(time).toBeGreaterThanOrEqual(999)
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
    const limit = 10
    await doWhile(async () => {
      i += 1
      return Promise.resolve(i)
    }, data => data < limit)
    expect(i).toEqual(limit)
    let j = 0
    let count = 0
    let now
    await doWhile(async () => {
      now = new Date()
      await sleep(100)
      j += 1
      return Promise.resolve(j)
    }, val => val < 10, async val => {
      count += 1
      await sleep(100)
      expect(val).toBeLessThanOrEqual(10)
      const diff = Date.now() - now
      expect(diff).toBeGreaterThanOrEqual(200)
      expect(diff).toBeLessThan(300)
    })
    expect(j).toEqual(10)
    expect(count).toEqual(10)
  })
  it('test', async () => {
    const test = new Test()
    await Promise.all([1, 2, 3].map(i => {
      return test.send(i)
    }))
  })
})
