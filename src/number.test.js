const { random, randomNumberStr } = require('./number')

/* eslint-env jest */
describe('number', () => {
  it('random', () => {
    for (var i = 0, len = 1000; i < len; i++) {
      let num = random(10, 20)
      expect(num).toBeGreaterThanOrEqual(10)
      expect(num).toBeLessThan(20)
    }
  })
  it('randomNumberStr', () => {
    let numStr = randomNumberStr()
    let num = parseInt(numStr)
    expect(typeof numStr).toEqual('string')
    expect(num).toBeGreaterThan(0)
    let randomNumberStrVal = randomNumberStr()
    expect(randomNumberStrVal !== randomNumberStr()).toEqual(true)
    expect(randomNumberStrVal !== randomNumberStr()).toEqual(true)
    expect(randomNumberStr(2).length).toEqual(2)
    expect(randomNumberStr(3).length).toEqual(3)
    expect(randomNumberStr(12).length).toEqual(12)
  })
})
