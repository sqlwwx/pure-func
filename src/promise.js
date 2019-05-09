const { random } = require('./number')

export const sleep = (timeout = 1000) => new Promise(resolve => {
  setTimeout(resolve, timeout)
})

export const doWhile = async (action, condition, doItem) => {
  // eslint-disable-next-line no-console
  console.warn('use do...while statement')
  let data
  do {
    // eslint-disable-next-line no-await-in-loop
    data = await action()
    // eslint-disable-next-line no-await-in-loop
    if (doItem) { await doItem(data) }
  } while (condition(data))
  return data
}

export const sleepRandom = (from, to) => sleep(random(from, to))
