const { random } = require('./number')

/* eslint-env jest */
describe('number', () => {
  it('random', () => {
    for (var i = 0, len = 1000; i < len; i++) {
      let num = random(10, 20)
      expect(num).toBeGreaterThanOrEqual(10)
      expect(num).toBeLessThan(20)
    }
  })
})
