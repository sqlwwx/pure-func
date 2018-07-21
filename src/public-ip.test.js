const { v4 } = require('./public-ip')

/* eslint-env jest */
describe('public-ip', () => {
  it('v4', async () => {
    expect(/\d+\.\d+\.\d+\.\d+/.test(await v4())).toEqual(true)
  })
})
