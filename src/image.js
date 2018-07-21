const axios = require('./axios')

const ossInfoPath = '?x-oss-process=image/info'

export const getImageBase64 = url => axios.loadBase64(url)

export const getImageBuffer = url => axios.loadBuffer(url)

export const getOssLiteImgUrl = async (url, size = 25000) => {
  if (url.endsWith('.gif')) { return url }
  const { data } = await axios.get(url + ossInfoPath)
  const fileSize = Number(data.FileSize.value)
  if (fileSize > size) {
    return `${url}?x-oss-process=image/resize,w_${Math.floor(Number(data.ImageWidth.value) / (fileSize / size))}/quality,Q_90`
  } else {
    return `${url}?x-oss-process=image/resize,w_${Number(data.ImageWidth.value) > 600 ? 600 : data.ImageWidth.value}/quality,Q_90`
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
