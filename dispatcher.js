const toNum = (str) => {
  if (typeof str === 'number') { return str}
  let num = Number(str)
  if (Number.isNaN(num)) {
    num = 0
  } else {
    return num
  }
  for (let i = 0; i < str.length; i++) {
    num += str.charCodeAt(i)
  }
  return num
}

exports.dispatch = (uid, arr) => arr[toNum(uid) % arr.length]
