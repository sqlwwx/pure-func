const isExpireValue = obj => Boolean(
  obj
  && Object.prototype.hasOwnProperty.call(obj, 'value')
  && Number.isInteger(obj.expiredAt)
)

const isNoneValue = value => Boolean(value === undefined || value === null)

const simpleExpireStore = (obj = {}, timeout = 1000, checkInterval = 60000) => {
  const interval = setInterval(() => {
    const now = Date.now()
    Object.entries(obj).filter(([, { expiredAt }]) => expiredAt < now).forEach(([key]) => {
      return Reflect.deleteProperty(obj, key)
    })
  }, checkInterval)
  Object.assign(obj, {
    clearInterval: () => {
      clearInterval(interval)
    }
  })
  const proxy = new Proxy(obj, {
    get (target, name) {
      const value = target[name]
      // no cache for function
      if (value instanceof Function) {
        return value
      }
      if (!isExpireValue(value)) {
        return undefined
      }
      if (value.expiredAt < Date.now()) {
        Reflect.deleteProperty(target, name)
        return undefined
      }
      return value.value
    },
    set (target, prop, value) {
      if (isNoneValue(value)) {
        return Reflect.deleteProperty(target, prop)
      }
      if (isExpireValue(value)) {
        return Reflect.set(target, prop, value)
      }
      return Reflect.set(target, prop, {
        expiredAt: Date.now() + timeout,
        value
      })
    }
  })
  Object.defineProperty(proxy, 'getAsync', {
    async value (name, fn) {
      let value = this[name]
      if (value === undefined) {
        value = await fn()
      }
      this[name] = value
      return value
    }
  })
  return proxy
}

module.exports = simpleExpireStore
