const isExpireValue = obj => Boolean(
  obj
  && Object.prototype.hasOwnProperty.call(obj, 'value')
  && Number.isInteger(obj.expiredAt)
)

const isNoneValue = value => Boolean(value === undefined || value === null)

const simpleExpireStore = (obj = {}, timeout = 1000, checkInterval = 60000) => {
  let interval
  if (checkInterval) {
    interval = setInterval(() => {
      const now = Date.now()
      Object.entries(obj).filter(([, { expiredAt }]) => expiredAt < now).forEach(([key]) => {
        return Reflect.deleteProperty(obj, key)
      })
    }, checkInterval)
  }
  const proxy = new Proxy(obj, {
    get (target, name) {
      const info = target[name]
      // no cache for function
      if (info instanceof Function) {
        return info
      }
      if (!isExpireValue(info)) {
        return undefined
      }
      const now = Date.now()
      if (info.reloadAt && info.reloadAt < now) {
        info.asyncValue = proxy.reload(name, 5, { now, info })
      }
      if (info.expiredAt < now) {
        Reflect.deleteProperty(target, name)
        return undefined
      }
      return info.value
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
  Object.defineProperties(proxy, {
    origin: {
      value () {
        return obj
      }
    },
    clearInterval: {
      value () {
        clearInterval(interval)
      }
    },
    register: {
      async value (name, loadFn, options = {}) {
        const { retry = 5 } = options
        try {
          const value = await loadFn()
          // eslint-disable-next-line no-param-reassign
          obj[name] = {
            expiredAt: Number.MAX_SAFE_INTEGER,
            reloadAt: Date.now() + (options.timeout || timeout),
            asyncValue: Promise.resolve(value),
            timeout: options.timeout || timeout,
            loadFn,
            value
          }
          return value
        } catch (e) {
          if (retry > 0) {
            return proxy.register(name, loadFn, { retry: retry - 1 })
          }
          throw e
        }
      }
    },
    reload: {
      async value (name, count = 1, options = {}) {
        const { now = Date.now(), info = obj[name] } = options
        try {
          info.reloadAt = now + info.timeout
          info.value = await info.loadFn()
        } catch (err) {
          if (count <= 0) {
            err.message += JSON.stringify({ name, count, options })
            throw err
          }
          await proxy.reload(name, count - 1)
        }
        return info.value
      }
    },
    getAsync: {
      // eslint-disable-next-line consistent-return
      async value (name, fn, options = {}) {
        const info = obj[name]
        const value = info ? info.value : undefined
        if (info) {
          const now = Date.now()
          if (info.expiredAt > now) {
            if (info.reloadAt) {
              if (info.reloadAt < now) {
                info.asyncValue = proxy.reload(name, options.retry || 5, options)
              }
              return info.asyncValue
            }
            if (options.keepExpire) {
              info.expiredAt = now + options.keepExpire
            }
            return info.value
          }
        }
        if (fn) {
          this[name] = Promise.resolve(fn()).catch(err => {
            if (value !== undefined && checkInterval === 0) {
              return value
            }
            this[name] = undefined
            throw err
          })
          return this[name]
        }
        if (checkInterval === 0) {
          return value
        }
      }
    }
  })
  return proxy
}

module.exports = simpleExpireStore
