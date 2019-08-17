const { sleep } = require('./promise')
const simpleExpireStore = require('./simpleExpireStore')

jest.setTimeout(1000 * 10)

/* eslint-env jest */
describe('simpleExpireStore', () => {
  it('should success', async () => {
    const source = {}
    const store = simpleExpireStore(source, 200, 2000)
    store.a = 1
    store.b = false
    store.c = true
    store.d = { value: false, expiredAt: Date.now() + 200 }
    expect(store.a).toEqual(1)
    expect(store.b).toEqual(false)
    await sleep(100)
    expect(store.a).toEqual(1)
    expect(store.b).toEqual(false)
    expect(store.d).toEqual(false)
    await sleep(200)
    expect(store.a).toEqual(undefined)
    expect(store.b).toEqual(undefined)
    expect(store.d).toEqual(undefined)
    expect(store.x).toEqual(undefined)
    expect(source).toHaveProperty('c')
    await sleep(2000)
    store.clearInterval()
    expect(source).not.toHaveProperty('c')
  })
})
