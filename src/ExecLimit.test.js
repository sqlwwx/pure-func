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
      await sleepRandom(30, 70)
      execLimit.exec(`${Date.now()}`.slice(0, -3), async () => {
        results.push(`${Date.now()}`.slice(0, -3))
        await sleepRandom(0, 50)
      })
    }
    expect(new Set(results).size).toEqual(results.length)
    expect(results.length).toBeLessThanOrEqual(4)
    expect(results.length).toBeGreaterThanOrEqual(1)

    execLimit.exec('test', () => {}, 'test')
    expect(execLimit.getHistory('default').size).toEqual(1)
    expect(execLimit.getHistory('test').size).toEqual(1)
    expect(execLimit.namespacesCount).toEqual(2)
    execLimit.clear('default')
    expect(execLimit.getHistory('test').size).toEqual(1)
    expect(execLimit.namespacesCount).toEqual(1)
    execLimit.clear()
    expect(execLimit.namespacesCount).toEqual(0)
  })
})
