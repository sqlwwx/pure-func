export const toNum = str => {
  if (typeof str === 'number') { return str }
  let num = Number(str)
  if (Number.isNaN(num)) {
    num = 0
  } else {
    return num
  }
  for (let i = 0; i < str.length; i += 1) {
    num += str.charCodeAt(i)
  }
  return num
}

export const dispatch = (uid, arr) => {
  if (typeof arr === 'number') {
    return toNum(uid) % arr
  }
  return arr[toNum(uid) % arr.length]
}
