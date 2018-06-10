function noop () {}

exports.sleep = (timeout = 1000) => new Promise(resolve => {
  setTimeout(resolve, timeout)
})

const doWhile = async (action, condition, cb = noop) => action().then(data => {
  cb(data)
  return condition(data) ? doWhile(action, condition, cb) : Promise.resolve(data)
})

exports.doWhile = doWhile
