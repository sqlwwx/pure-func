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
      await sleepRandom(300, 700)
      execLimit.exec(`${Date.now()}`.slice(0, -3), async () => {
        results.push(`${Date.now()}`.slice(0, -3))
        await sleepRandom(0, 50)
      })
    }
    expect(new Set(results).size).toEqual(results.length)
    expect(results.length).toBeLessThanOrEqual(35)
    expect(results.length).toBeGreaterThanOrEqual(15)

    execLimit.exec('test', () => {}, 'test')
    expect(execLimit.namespaces.default.size).toEqual(1)
    expect(execLimit.namespaces.test.size).toEqual(1)
    expect(Object.keys(execLimit.namespaces).length).toEqual(2)
    execLimit.clear('default')
    expect(execLimit.namespaces.test.size).toEqual(1)
    expect(Object.keys(execLimit.namespaces).length).toEqual(1)
    execLimit.clear()
    expect(Object.keys(execLimit.namespaces).length).toEqual(0)
  })
})
