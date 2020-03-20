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
    store.e = false
    store.f = 0
    expect(store.e).toEqual(false)
    expect(store.f).toEqual(0)
    store.e = undefined
    store.f = null
    expect(source).not.toHaveProperty('e')
    expect(source).not.toHaveProperty('f')
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
  it('getAsync', async () => {
    const source = {}
    const store = simpleExpireStore(source, 200, 2000)
    expect(
      await store.getAsync('test', async () => {
        return 'test'
      })
    ).toEqual('test')
    expect(store.test).toEqual('test')
    await sleep(200)
    expect(store.test).toEqual(undefined)
    expect(store.test2).toEqual(undefined)
    store.test2 = 'test2'
    expect(store.test2).toEqual('test2')
    expect(
      await store.getAsync('test2', async () => {
        return 'test22'
      })
    ).toEqual('test2')
    expect(store.test2).toEqual('test2')
    await sleep(200)
    expect(store.test2).toEqual(undefined)
  })
})
