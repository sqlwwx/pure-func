const { encode, decodeFromBase64 } = require('./qrcode')
const axios = require('./axios')
const adapterHttp = require('axios/lib/adapters/http')

axios.defaults.adapter = adapterHttp

const missingFinderPatternsUrl = 'http://github.wuweixing.com/missing-finder-patterns.png'

jest.setTimeout(1000 * 60 * 5)

const QRCODE_IMAGE_BASE64 = [
  'iVBORw0KGgoAAAANSUhEUgAAAMgAAADIAQMAAACXljzdAAAABlBMVEX///8AAABVwtN+AAAA',
  'CXBIWXMAAA7EAAAOxAGVKw4bAAAA7klEQVRYw+2WsQ3EIAxFjShSMgKjZLRktIzCCJQpIv7Z',
  'hCiXO/qzT/wCWXo0X3wbEw0NWVaEKM187KHW2QLZ+AhpXovfQ+J6skEWHELqBa5NEeCwR7iS',
  'V7BDzuzAiZ9eqn5IWjfWXHf7VCO5tPAM6U9AjSRideyHFn4FiuvDqV5CM9rZXuF2pZmIAjZy',
  'x4S0MDdBxEmu3TrliPf7iglPvuLlRydfU3P70UweCSK+ZYK0mUg1O4AVcv0/8itGkC7SdiTH',
  '0+Mz19oJZ4NkhhSPbIhQkQGI8u1HJzmzs7p7pzNAru2pJb6z8ykkQ0P/pheK6vjurjf7+wAA',
  'AABJRU5ErkJggg=='
].join('')

/* eslint-env jest */
describe('qrcode', () => {
  let qrcodeBase64
  it('encode', async () => {
    qrcodeBase64 = await encode('wwx')
    expect(qrcodeBase64.startsWith('data:image/png;base64,'))
    expect(qrcodeBase64.length).toBeGreaterThan(50)
  })
  it('decodeBase64', async () => {
    let qrcodeValue = await decodeFromBase64(QRCODE_IMAGE_BASE64)
    expect(qrcodeValue).toEqual('hello, world!')
    qrcodeValue = await decodeFromBase64(qrcodeBase64.split(',')[1])
    expect(qrcodeValue).toEqual('wwx')
    expect(
      decodeFromBase64('iVBORw0KGgoAAAANSUhEUgAAAMgAAADIAQMAAACXljzdAAAABlBMVEX')
    ).rejects.toHaveProperty('code', 'InvalidQrcodeBuffer')
    const base64 = await axios.loadBase64(missingFinderPatternsUrl)
    expect(
      decodeFromBase64(base64)
    ).rejects.toHaveProperty('message', 'DecodeQrcodeFail')
  })
  it('decodeBase64 missing-finder-patterns.png', async () => {
    expect(
      decodeFromBase64(
        await axios.loadBase64(missingFinderPatternsUrl)
      )
    ).rejects.toHaveProperty('message', 'DecodeQrcodeFail')
  })
})
