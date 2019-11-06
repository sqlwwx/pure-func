const { memoizeDebounce, camelCaseObject, snakeCaseObject } = require('./lodash')
const { sleep } = require('./promise')

jest.setTimeout(1000 * 30)

/* eslint-env jest */
describe('lodash', () => {
  it('camelCaseObject', () => {
    expect(camelCaseObject({
      app_id: 1,
      a_b: 2,
      c_d_3: 4
    })).toEqual({
      appId: 1,
      aB: 2,
      cD3: 4
    })
  })
  it('snakeCaseObject', () => {
    expect(snakeCaseObject({
      appId: 1,
      aB: 2,
      cD3: 4
    })).toEqual({
      app_id: 1,
      a_b: 2,
      c_d3: 4
    })
  })
  describe('memoizeDebounce', () => {
    it('should success', async () => {
      const logs = []
      const logs2 = []
      const logs3 = []
      const test = memoizeDebounce(i => {
        logs.push(i)
      }, 1000)
      test(1)
      expect(logs.length).toEqual(0)
      test(1)
      test(1)
      expect(logs.length).toEqual(0)
      await sleep(500)
      expect(logs.length).toEqual(0)
      await sleep(510)
      expect(logs.length).toEqual(1)
      test(1)
      test('2')
      await sleep(1000)
      expect(logs.length).toEqual(3)
      expect(logs[0]).toEqual(1)
      expect(logs[1]).toEqual(1)
      expect(logs[2]).toEqual('2')
      test(3)
      test(3)
      expect(logs.length).toEqual(3)
      await sleep(1010)
      expect(logs.length).toEqual(4)
      const test2 = memoizeDebounce(i => {
        logs2.push(i)
      }, 1000, arg => `${arg}`)
      test2(1)
      test2('1')
      test2('1')
      test2('1')
      expect(logs2.length).toEqual(0)
      await sleep(1000)
      expect(logs2.length).toEqual(1)
      expect(logs[0]).toEqual(1)
      const test3 = memoizeDebounce(i => {
        logs3.push(i)
      }, 1000, arg => `${arg}`, { leading: true })
      test3(1)
      test3('1')
      test3('1')
      test3('1')
      expect(logs3.length).toEqual(1)
      await sleep(1010)
      expect(logs3[0]).toEqual(1)
      const obj = {
        name: 'test',
        logs: []
      }
      const testFn = function (i) {
        this.logs.push(i)
      }
      obj.test = memoizeDebounce(testFn.bind(obj), 1000, i => `${i}`)
      obj.test(1)
      obj.test('1')
      await sleep(1010)
      expect(obj.logs.length).toEqual(1)
    })
  })
})
