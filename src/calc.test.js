const {
  mul,
  add,
  sub,
  div,
  strip,
  digitLength,
  float2Fixed,
  round
} = require('./calc')

/* eslint-env jest */
describe('calc', () => {
  it('digitLength', () => {
    expect(digitLength(123.4567890123)).toBe(10)
    expect(digitLength(1.23e-5)).toBe(7)
    expect(digitLength(1.23E-5)).toBe(7)
    expect(digitLength(1.233467e-5)).toBe(11)
    expect(digitLength(123.45e-5)).toBe(7)
    expect(digitLength(1.23e-10)).toBe(12)
    expect(digitLength(1.23e1)).toBe(1)
    expect(digitLength(1e20)).toBe(0)
    expect(digitLength(1.12345e20)).toBe(0)
    expect(digitLength(1.123e30)).toBe(0)
    expect(digitLength(1.123e-100)).toBe(103)
  })
  it('float2Fixed', () => {
    expect(float2Fixed(1e-1)).toBe(1)
    expect(float2Fixed(1e-6)).toBe(1)
    expect(float2Fixed(1e-7)).toBe(1)
    expect(float2Fixed(1e-13)).toBe(1)
    expect(float2Fixed(1.123e30)).toBe(1.123e30)
    expect(float2Fixed(1.6e-30)).toBe(16)
    expect(float2Fixed(1.234567e-13)).toBe(1234567)
    expect(float2Fixed(1.2345678912345e10)).toBe(12345678912345)
    expect(float2Fixed(0.000000123456)).toBe(123456)
    expect(float2Fixed(1.23456e-7)).toBe(123456)
  })
  it('strip', () => {
    expect(strip(0.09999999999999998)).toBe(0.1)
    expect(strip(1.000000000000001)).toBe(1)
  })
  it('add', () => {
    expect(add(2.1, 2.2)).toBe(4.3)
    expect(add(1, 1)).toBe(2)
    expect(add(0.99999999999999, 0.00000000000001)).toBe(1)
    expect(add(0.1, 0.2)).toBe(0.3)
    expect(add(2.3, 2.4)).toBe(4.7)
    expect(add(-1.6, -1)).toBe(-2.6)
    expect(add(-2.0, 63)).toBe(61)
    expect(add(-3, 7)).toBe(4)
    expect(add(-221, 38)).toBe(-183)
    expect(add(-1, 0)).toBe(-1)
    expect(add(2.018, 0.001)).toBe(2.019)
    expect(add(1.3224e10, 1.3224e3)).toBe(13224001322.4)
    expect(add(1.6e-30, 1.6e-30)).toBe(3.2e-30)
    expect(add(0.1, 0.2, 0.3)).toBe(0.6)
    expect(add(0.1, 0.2, 0.3, undefined)).toBe(0.6) // undefined
    expect(add(0.1, 0.2, 0.3, null)).toBe(0.6) // null
  })
  it('sub', () => {
    expect(sub(1.1, 0.11)).toBe(0.99)
    expect(sub(0.07, 0.01)).toBe(0.06)
    expect(sub(0.7, 0.1)).toBe(0.6)
    expect(sub(1.0, 0.9)).toBe(0.1)
    expect(sub(1, 0)).toBe(1)
    expect(sub(1, -0)).toBe(1)
    expect(sub(-1, 0)).toBe(-1)
    expect(sub(-1, -0)).toBe(-1)
    expect(sub(1, 22)).toBe(-21)
    expect(sub(8893568.397103, -7.296740)).toBe(8893575.693843)
    expect(sub(105468873, 0)).toBe(105468873)
    expect(sub(1.23e5, 10)).toBe(122990)
    expect(sub(1.23e-5, 1.0023)).toBe(-1.0022877)
    expect(sub(1.3224e10, 21)).toBe(13223999979)
    expect(sub(1.3224e10, 1.3224e3)).toBe(13223998677.6)
    expect(sub(1.7e-30, 0.1e-30)).toBe(1.6e-30)
    expect(sub(6, 3, 2)).toBe(1)
    expect(sub(6, 3, 2, 1, 2, 3)).toBe(-5)
    expect(sub(6, 3, 2, undefined)).toBe(1) // undefined
    expect(sub(6, 3, 2, null)).toBe(1) // null
  })
  it('mul', () => {
    expect(mul(0.57, 100)).toBe(57)
    expect(mul(0.1, 0.2)).toBe(0.02)
    // expect(mul(-3, 2.3333333333333335)).toBe(7)
    // expect(mul(-0.076, -92.10526315789471)).toBe(7);
    expect(mul(0.07, 100)).toBe(7)
    expect(mul(0.7, 0.1)).toBe(0.07)
    expect(mul(3, 0.3)).toBe(0.9)
    expect(mul(118762317358.75, 1e-8)).toBe(1187.6231735875)
    expect(mul(0.362, 100)).toBe(36.2)
    expect(mul(1.1, 1.1)).toBe(1.21)
    expect(mul(2.018, 1000)).toBe(2018)
    expect(mul(5.2, -3.846153846153846)).toBe(-20)
    expect(mul(1.22, -1.639344262295082)).toBe(-2)
    expect(mul(2.5, -0.92)).toBe(-2.3)
    expect(mul(-2.2, 0.6363636363636364)).toBe(-1.4)
    expect(mul(8.0, -0.3625)).toBe(-2.9)
    expect(mul(6.6, 0.30303030303030304)).toBe(2)
    expect(mul(10.0, -0.8)).toBe(-8)
    expect(mul(-1.1, -7.272727272727273)).toBe(8)
    expect(mul(-1.23e4, 20)).toBe(-246000)
    expect(mul(1.7e-30, 1.5e20)).toBe(2.55e-10)
    expect(mul(2, 2, 3)).toBe(12)
    expect(mul(2, 2, 3, 0.1)).toBe(1.2)
    expect(mul(0.000000123456, 0.000000123456)).toBe(1.5241383936e-14)
    expect(mul(1.23456e-7, 1.23456e-7)).toBe(1.5241383936e-14)
    expect(mul(2, 2, 3, undefined)).toBe(12) // undefined
    expect(mul(2, 2, 3, null)).toBe(12) // null
  })
  it('div', () => {
    expect(div(10.1, 0.1)).toBe(101)
    expect(div(1.21, 1.1)).toBe(1.1)
    expect(div(4750.49269435, 4)).toBe(1187.6231735875)
    expect(div(0.9, 3)).toBe(0.3)
    expect(div(36.2, 0.362)).toBe(100)
    expect(div(-20, 5.2)).toBe(-3.8461538461538463)
    expect(div(-2, 1.22)).toBe(-1.639344262295082)
    expect(div(-2.3, 2.5)).toBe(-0.92)
    expect(div(-1.4, -2.2)).toBe(0.6363636363636364)
    expect(div(7, -3)).toBe(-2.3333333333333335)
    expect(div(7, -0.076)).toBe(-92.10526315789471)
    expect(div(-2.9, 8.0)).toBe(-0.3625)
    expect(div(2, 6.6)).toBe(0.30303030303030304)
    expect(div(-8, 10.0)).toBe(-0.8)
    expect(div(8, -1.1)).toBe(-7.272727272727273)
    expect(div(-1.23e4, 20)).toBe(-615)
    expect(div(2.55e-10, 1.7e-30)).toBe(1.5e20)
    expect(div(12, 3, 2)).toBe(2)
    expect(div(33.3333, 100)).toBe(0.333333)
    expect(div(83.42894732749, 100)).toBe(0.8342894732749)
    expect(div(1, 3)).toBe(0.3333333333333333)
    expect(div(12, 3, 2, undefined)).toBe(2) // undefined
    expect(div(12, 3, 2, null)).toBe(2) // null
  })
  it('round', () => {
    expect(round(0.5)).toBe(1)
    expect(round(1.999, 1)).toBe(2)
    expect(round(1.199, 1)).toBe(1.2)
    expect(round(1.111, 2)).toBe(1.11)
    expect(round(0.7875, 3)).toBe(0.788)
    expect(round(0, 1)).toBe(0)
    expect(round(0, 0)).toBe(0)
    expect(round(0.105, 2)).toBe(0.11)
    expect(round(1, 1)).toBe(1)
    expect(round(0.1049999999, 2)).toBe(0.1)
    expect(round(0.105, 1)).toBe(0.1)
    expect(round(1.335, 2)).toBe(1.34)
    expect(round(1.35, 1)).toBe(1.4)
    expect(round(12345.105, 2)).toBe(12345.11)
    expect(round(0.0005, 2)).toBe(0)
    expect(round(0.0005, 3)).toBe(0.001)
    expect(round(1.2345e3, 3)).toBe(1234.5)
    expect(round(1.2344e3, 3)).toBe(1234.4)
    expect(round(1e3, 1)).toBe(1000)
  })
  it('complex', () => {
    expect(mul(
      0.1,
      div(
        0.2,
        add(2.1, 2.2, -1.1)
      )
    )).toBe(0.00625)
    expect(
      mul(0.1, mul(0.1, add(0.1 + 1)))
    ).toBe(0.011)
  })
})
