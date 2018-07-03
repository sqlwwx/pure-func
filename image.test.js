const {
  getImageBase64,
  getOssLiteImgUrl,
  getOssLiteImgBase64,
  getOssLiteImgBuffer
} = require('./image')

const url = 'http://an-task-images.oss-cn-shenzhen.aliyuncs.com/4d2EZh_1529740019778.jpg'

/* eslint-env jest */
describe('image', () => {
  it('getOssLiteImgUrl', async () => {
    await getOssLiteImgUrl(url)
  })
  it('getImageBase64', async () => {
    const liteImgUrl = await getOssLiteImgUrl(url, 2000)
    const base64 = await getImageBase64(liteImgUrl)
  })
  it('getOssLiteImgBase64', async () => {
    const base64 = await getOssLiteImgBase64(url, 2000)
    const buf = Buffer.from(base64, 'base64')
    expect(buf.length).toBeLessThan(2000)
  })
  it('getOssLiteImgBuffer', async () => {
    const buf = await getOssLiteImgBuffer(url, 2000)
    expect(buf.length).toBeLessThan(2000)
  })
})
