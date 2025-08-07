/**
 * 把错误的数据转正
 * strip(0.09999999999999998)=0.1
 */
export const strip = (num, precision = 12) => {
  return +parseFloat(num.toPrecision(precision))
}
/**
 * Return digits length of a number
 * @param {*number} num Input number
 */
export const digitLength = num => {
  // Get digit length of e
  const eSplit = num.toString().split(/[eE]/)
  const len = (eSplit[0].split('.')[1] || '').length - (+(eSplit[1] || 0))
  return len > 0 ? len : 0
}
/**
 * 把小数转成整数，支持科学计数法。如果是小数则放大成整数
 * @param {*number} num 输入数
 */
export const float2Fixed = num => {
  if (!num.toString().includes('e')) {
    return Number(num.toString().replace('.', ''))
  }
  const dLen = digitLength(num)
  return dLen > 0 ? strip(num * 10 ** dLen) : num
}
/**
 * 检测数字是否越界，如果越界给出提示
 * @param {*number} num 输入数
 */
function checkBoundary (num) {
  if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
    // eslint-disable-next-line no-console
    console.warn(`${num} is beyond boundary when transfer to integer, the results may not be accurate`)
  }
  return num
}
/**
 * 精确乘法
 */
export const mul = (...nums) => {
  return nums.reduce((ret, cur) => {
    const baseNum = digitLength(ret) + digitLength(cur || 1)
    const leftValue = float2Fixed(ret) * float2Fixed(cur || 1)
    checkBoundary(leftValue)
    return leftValue / (10 ** baseNum)
  })
}

const reduceNums = (operate, ...nums) => {
  return nums.reduce((ret, cur) => {
    if (!cur) { return ret }
    const baseNum = (10 ** Math.max(digitLength(ret), digitLength(cur)))
    if (operate === '-') {
      return (mul(ret, baseNum) - mul(cur, baseNum)) / baseNum
    }
    return (mul(ret, baseNum) + mul(cur, baseNum)) / baseNum
  })
}

/**
 * 精确加法
 */
export const add = (...nums) => {
  return reduceNums('+', ...nums)
}

/**
 * 精确减法
 */
export const sub = (...nums) => {
  return reduceNums('-', ...nums)
}

/**
 * 精确除法
 */
export const div = (...nums) => {
  return nums.reduce((ret, cur) => {
    // fix: 类似 10 ** -4 为 0.00009999999999999999，strip 修正
    return mul(
      (checkBoundary(float2Fixed(ret)) / checkBoundary(float2Fixed(cur || 1))),
      strip(10 ** (digitLength(cur || 1) - digitLength(ret)))
    )
  })
}
/**
 * 四舍五入
 */

export const round = (num, fraction = 0) => {
  const base = 10 ** fraction
  return div(Math.round(
    mul(num, base)
  ), base)
}
