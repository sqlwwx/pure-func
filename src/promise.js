const { random } = require('./number')

function noop () {}

export const sleep = (timeout = 1000) => new Promise(resolve => {
  setTimeout(resolve, timeout)
})

export const doWhile = async (action, condition, cb = noop) => action().then(data => {
  cb(data)
  return condition(data) ? doWhile(action, condition, cb) : Promise.resolve(data)
})

export const sleepRandom = (from, to) => sleep(random(from, to))
