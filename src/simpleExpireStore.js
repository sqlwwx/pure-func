const simpleExpireStore = (obj = {}, timeout = 1000, checkInterval = 60000) => {
  setInterval(() => {
    Object.entries(obj).filter(([, { expiredAt }]) => expiredAt < Date.now()).forEach(([key]) => {
      return Reflect.deleteProperty(obj, key)
    })
  }, checkInterval)
  return new Proxy(obj, {
    get (target, name) {
      if (!target[name]) {
        return undefined
      }
      if (target[name].expiredAt < Date.now()) {
        Reflect.deleteProperty(target, name)
        return undefined
      }
      return target[name].value
    },
    set (target, prop, value) {
      if (value && value.expiredAt && Number.isInteger(value.expiredAt)) {
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
