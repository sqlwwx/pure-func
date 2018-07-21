const axios = require('axios')
const adapterHttp = require('axios/lib/adapters/http')
const {
  getImageBase64,
  getOssLiteImgUrl,
  getOssLiteImgBase64,
  getOssLiteImgBuffer,
  getOssImageInfo
} = require('./image')

axios.defaults.adapter = adapterHttp

const imgUrl = 'https://ghost-wwx.oss-cn-hangzhou.aliyuncs.com/ghost/wechatimg256.jpeg'
const gifUrl = 'https://ghost-wwx.oss-cn-hangzhou.aliyuncs.com/ghost/x.gif'

/* eslint-env jest */
describe('image', () => {
  it('getOssImageInfo', async () => {
    const imageInfo = await getOssImageInfo(gifUrl + '')
    expect(imageInfo).toHaveProperty('FileSize', { value: '222541' })
    expect(imageInfo).toHaveProperty('Format', { value: 'gif' })
    expect(imageInfo).toHaveProperty('ImageHeight', { value: '1624' })
    expect(imageInfo).toHaveProperty('ImageWidth', { value: '2969' })
  })
  it('getOssLiteImgUrl', async () => {
    expect(await getOssLiteImgUrl(imgUrl)).toEqual('https://ghost-wwx.oss-cn-hangzhou.aliyuncs.com/ghost/wechatimg256.jpeg?x-oss-process=image/resize,w_200/quality,Q_90')
    expect(await getOssLiteImgUrl(gifUrl)).toEqual('https://ghost-wwx.oss-cn-hangzhou.aliyuncs.com/ghost/x.gif?x-oss-process=image/resize,w_995/quality,Q_90')
    expect(await getOssLiteImgUrl(gifUrl, 60000)).toEqual('https://ghost-wwx.oss-cn-hangzhou.aliyuncs.com/ghost/x.gif?x-oss-process=image/resize,w_1541/quality,Q_90')
  })
  it('getImageBase64', async () => {
    const liteImgUrl = await getOssLiteImgUrl(imgUrl, 2000)
    const base64 = await getImageBase64(liteImgUrl)
    expect(Buffer.from(base64, 'base64').length).toBeLessThan(2000)
  })
  it('getOssLiteImgBase64', async () => {
    const base64 = await getOssLiteImgBase64(imgUrl, 2000)
    const buf = Buffer.from(base64, 'base64')
    expect(buf.length).toBeLessThan(2000)
  })
  it('getOssLiteImgBuffer', async () => {
    let buf = await getOssLiteImgBuffer(imgUrl, 2000)
    expect(buf.length).toBeLessThan(2000)
    buf = await getOssLiteImgBuffer(imgUrl, 310000)
    expect(buf.length).toBeLessThan(250000)
  })
})
