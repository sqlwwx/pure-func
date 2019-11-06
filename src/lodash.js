const {
  memoize,
  debounce
} = require('lodash')

const { camelizeKeys, decamelizeKeys } = require('xcase')

export const memoizeDebounce = (func, delay, resolver, options = {}) => {
  if (!resolver) {
    // eslint-disable-next-line no-console
    console.warn('should have resolver')
  }
  const mem = memoize(() => {
    return debounce(func, delay, options)
  }, resolver)
  return (...args) => {
    return mem(...args)(...args)
  }
}

// export const camelCaseObject = obj => mapKeys(obj, (_, key) => camelCase(key))
export const camelCaseObject = camelizeKeys

// export const snakeCaseObject = obj => mapKeys(obj, (_, key) => snakeCase(key))
export const snakeCaseObject = decamelizeKeys
