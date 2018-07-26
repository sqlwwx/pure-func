const axios = require('./axios')

const ossInfoPath = '?x-oss-process=image/info'

export const getImageBase64 = url => axios.loadBase64(url)

export const getImageBuffer = url => axios.loadBuffer(url)

export const getOssImageInfo = url => axios.get(url + ossInfoPath).then(ret => ret.data)

export const getOssLiteImgUrl = async (url, size = 25000, maxWidth = 600) => {
  const data = await getOssImageInfo(url)
  const fileSize = Number(data.FileSize.value)
  if (fileSize > size) {
    const width = Math.floor(Number(data.ImageWidth.value) / Math.sqrt((fileSize / size)))
    return `${url}?x-oss-process=image/resize,w_${width}/quality,Q_90`
  } else {
    return `${url}?x-oss-process=image/resize,w_${Number(data.ImageWidth.value) > maxWidth ? maxWidth : data.ImageWidth.value}/quality,Q_90`
  }
}

export const getOssLiteImgBuffer = async (url, size) => {
  return getImageBuffer(
    await getOssLiteImgUrl(url, size)
  )
}

export const getOssLiteImgBase64 = async (url, size) => {
  return getImageBase64(
    await getOssLiteImgUrl(url, size)
  )
}
