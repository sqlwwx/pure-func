const axios = require('axios')

const ossInfoPath = '?x-oss-process=image/info'

exports.getImageBase64 = async (url) => {
  return (await exports.getImageBuffer(url)).toString('base64')
}

exports.getImageBuffer = async (url) => {
  const { data } = await axios(url, { responseType: 'arraybuffer' })
  return Buffer.from(data, 'binary')
}

exports.getOssLiteImgUrl = async (url, size = 25000) => {
  if (url.endsWith('.git')) { return url }
  const { data } = await axios.get(url + ossInfoPath)
  const fileSize = Number(data.FileSize.value)
  if (fileSize > size) {
    return `${url}?x-oss-process=image/resize,w_${Math.floor(Number(data.ImageWidth.value) / (fileSize / size))}/quality,Q_90`
  } else {
    return `${url}?x-oss-process=image/resize,w_${Number(data.ImageWidth.value) > 600 ? 600 : data.ImageWidth.value}/quality,Q_90`
  }
}

exports.getOssLiteImgBuffer = async (url, size) => {
  return exports.getImageBuffer(
    await exports.getOssLiteImgUrl(url, size)
  )
  return Buffer.from(data, 'binary')
}

exports.getOssLiteImgBase64 = async (url, size) => {
  return exports.getImageBase64(
    await exports.getOssLiteImgUrl(url, size)
  )
}
