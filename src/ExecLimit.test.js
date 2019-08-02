const { sleepRandom } = require('./promise')
const ExecLimit = require('./ExecLimit')

jest.setTimeout(1000 * 100)

/* eslint-env jest */
describe('ExecLimit', () => {
  it('limit 1s', async () => {
    const execLimit = new ExecLimit()
    const results = []
    for (let i = 0, len = 50; i < len; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await sleepRandom(100, 1500)
      execLimit.exec(`${Date.now()}`.slice(0, -3), async () => {
        results.push(`${Date.now()}`.slice(0, -3))
        await sleepRandom(0, 50)
      })
    }
    expect(new Set(results).size).toEqual(results.length)
    expect(results.length).toBeLessThan(48)
  })
})
