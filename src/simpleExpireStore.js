const simpleExpireStore = (obj = {}, timeout = 1000, checkInterval = 60000) => {
  const interval = setInterval(() => {
    Object.entries(obj).filter(([, { expiredAt }]) => expiredAt < Date.now()).forEach(([key]) => {
      return Reflect.deleteProperty(obj, key)
    })
  }, checkInterval)
  Object.assign(obj, {
    clearInterval: () => {
      clearInterval(interval)
    }
  })
  return new Proxy(obj, {
    get (target, name) {
      const value = target[name]
      // no cache for function
      if (value instanceof Function) {
        return value
      }
      if (!value) {
        return undefined
      }
      if (value.expiredAt < Date.now()) {
        Reflect.deleteProperty(target, name)
        return undefined
      }
      return value.value
    },
    set (target, prop, value) {
      if (value && value.hasOwnProperty('value') && Number.isInteger(value.expiredAt)) {
        return Reflect.set(target, prop, value)
      }
      return Reflect.set(target, prop, {
        expiredAt: Date.now() + timeout,
        value
      })
    }
  })
}

module.exports = simpleExpireStore
