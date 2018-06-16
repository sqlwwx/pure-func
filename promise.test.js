const { sleepRandom } = require('./promise')

/* eslint-env jest */
describe('promise', () => {
  it('sleepRandom', async () => {
    const start = Date.now()
    await sleepRandom(200, 1000)
    const time = Date.now() - start
    expect(time).toBeGreaterThanOrEqual(200)
    expect(time).toBeLessThan(1000)
  })
})
