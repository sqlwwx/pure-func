const { random } = require('./number')

export const sleep = (timeout = 1000) => new Promise(resolve => {
  setTimeout(resolve, timeout)
})

export const doWhile = async (action, condition, doItem) => action().then(async data => {
  if (doItem) {
    await doItem(data)
  }
  return condition(data) ? doWhile(action, condition, doItem) : Promise.resolve(data)
})

export const sleepRandom = (from, to) => sleep(random(from, to))
