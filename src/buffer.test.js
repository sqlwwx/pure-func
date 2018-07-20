const { randomByte, bufferToInt } = require('./buffer')

/* eslint-env jest */
describe('buffer', () => {
  it('randomByte', () => {
    const tbs = randomByte()
    expect(tbs[0] !== 0).toEqual(true)
    expect(tbs[1] !== 0).toEqual(true)
    expect(tbs[2] !== 0).toEqual(true)
    expect(tbs[3] !== 0).toEqual(true)
  })
  it('byteArrayToInt', () => {
    expect(
      bufferToInt(Buffer.from([0x00, 0x00, 0x01, 0x00]))
    ).toEqual(256)
    expect(
      bufferToInt(Buffer.from([0x00, 0x00, 0x00, 0xff]))
    ).toEqual(255)
    expect(
      bufferToInt(Buffer.from([0x00, 0x00, 0x00, 0x00, 0xff]), 1)
    ).toEqual(255)
    expect(
      bufferToInt(Buffer.from([0x7f, 0xff, 0xff, 0xff]))
    ).toEqual(2147483647)
    expect(
      bufferToInt(Buffer.from([0xff, 0xff, 0xff, 0xff]))
    ).toEqual(4294967295)
  })
})
