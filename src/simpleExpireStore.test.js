const assert = require('assert')
const { sleep } = require('./promise')
const simpleExpireStore = require('./simpleExpireStore')

jest.setTimeout(1000 * 10)

/* eslint-env jest */
describe('simpleExpireStore', () => {
  it('should success', async () => {
    const source = {}
    const store = simpleExpireStore(source, 200, 2000)
    assert(store.origin() === source)
    store.a = 1
    store.b = false
    store.c = true
    store.d = { value: false, expiredAt: Date.now() + 200 }
    store.e = false
    store.f = 0
    store.g = { value: false, expiredAt: '111' }
    expect(store.g.value).toEqual(false)
    expect(store.g.expiredAt).toEqual('111')
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
    expect(await store.getAsync('test')).toEqual('test')
    await sleep(210)
    expect(await store.getAsync('test')).toEqual(undefined)
    expect(await store.getAsync('test2')).toEqual(undefined)
    store.test2 = Promise.resolve('test2')
    expect(await store.getAsync('test2')).toEqual('test2')
    expect(
      await store.getAsync('test2', async () => {
        return 'test22'
      })
    ).toEqual('test2')
    expect(await store.getAsync('test2')).toEqual('test2')
    await sleep(200)
    expect(await store.getAsync('test2')).toEqual(undefined)
    assert(
      (
        await store.getAsync('testError', async () => {
          throw new Error('testError')
        }).catch(err => err)
      ).message === 'testError'
    )
    expect(await store.getAsync('testError')).toEqual(undefined)
    expect(await store.getAsync('testError', async () => {
      return 1
    })).toEqual(1)
    expect(await store.getAsync('testError', async () => {
      throw new Error('error')
    })).toEqual(1)
    store.clearInterval()
  })
  it('getAsync keepExpire', async () => {
    const store = simpleExpireStore({}, 200)
    expect(
      await store.getAsync('testKeepExpire', async () => {
        return 'testKeepExpire'
      })
    ).toEqual('testKeepExpire')
    expect(await store.getAsync('testKeepExpire', null, { keepExpire: 1000 })).toEqual('testKeepExpire')
    await sleep(200)
    expect(await store.getAsync('testKeepExpire')).toEqual('testKeepExpire')
    await sleep(200)
    expect(await store.getAsync('testKeepExpire')).toEqual('testKeepExpire')
    await sleep(600)
    expect(await store.getAsync('testKeepExpire')).toEqual(undefined)
    store.clearInterval()
  })
  it('other', async () => {
    const store = simpleExpireStore()
    store.a = 1
    await sleep(600)
    assert(store.a === 1)
    await sleep(600)
    assert(store.a === undefined)
    store.clearInterval()
  })
  it('register', async () => {
    const store = simpleExpireStore({}, 500)
    const value1 = await store.register('random', async () => {
      const v = Math.floor(Math.random() * 10000)
      assert(v > 5000)
      return v
    })
    const value2 = await store.register('random2', async () => {
      const v = Math.floor(Math.random() * 10000)
      assert(v > 5000)
      return v
    }, { retry: 10 })
    const value3 = await store.register('random3', async () => {
      const v = Math.floor(Math.random() * 10000)
      assert(v > 5000)
      return v
    }, {})
    assert(value1 === store.random)
    assert(value2 === store.random2)
    assert(value3 === store.random3)
    await sleep(600)
    await store.reload('random3', 10)
    assert(value1 === store.random)
    assert(value2 === store.random2)
    assert(value3 !== store.random3)
    await sleep(100)
    assert(value1 !== store.random)
    assert(value2 !== store.random2)
    assert(value3 !== store.random3)
  })
})
