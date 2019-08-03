const { sleep } = require('./promise')
const simpleExpireStore = require('./simpleExpireStore')

jest.setTimeout(1000 * 10)

/* eslint-env jest */
describe('simpleExpireStore', () => {
  it('should success', async () => {
    const source = {}
    const store = simpleExpireStore(source, 500, 4000)
    store.a = 1
    store.b = false
    store.c = true
    expect(store.a).toEqual(1)
    expect(store.b).toEqual(false)
    await sleep(200)
    expect(store.a).toEqual(1)
    expect(store.b).toEqual(false)
    await sleep(400)
    expect(store.a).toEqual(undefined)
    expect(store.b).toEqual(undefined)
    expect(source).toHaveProperty('c')
    await sleep(4000)
    expect(source).not.toHaveProperty('c')
  })
})
