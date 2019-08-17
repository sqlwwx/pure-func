const _ = require('lodash')

_.mixin({
  memoizeDebounce (func, delay, resolver, options = {}) {
    if (!resolver) {
      // eslint-disable-next-line no-console
      console.warn('should have resolver')
    }
    const mem = _.memoize(() => {
      return _.debounce(func, delay, options)
    }, resolver)
    return (...args) => {
      return mem(...args)(...args)
    }
  }
})
module.exports = _
