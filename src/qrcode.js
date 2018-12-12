const util = require('util')
const QRCode = require('qrcode')
const { FileBox } = require('file-box')
const jsQR = require('jsqr')
const Jimp = require('jimp')

const readAsync = util.promisify(Jimp.read)

export const fileBoxToQrcodeValue = async file => {
  let image
  try {
    image = await readAsync(
      await file.toBuffer()
    )
  } catch (err) {
    err.code = 'InvalidQrcodeBuffer'
    throw err
  }
  const qrCodeImageArray = new Uint8ClampedArray(image.bitmap.data.buffer)
  const qrcode = jsQR(
    qrCodeImageArray,
    image.bitmap.width,
    image.bitmap.height
  )
  if (qrcode) {
    return qrcode.data
  }
  throw new Error('DecodeQrcodeFail')
}

export const decodeFromBase64 = (base64, fileName) => {
  const file = FileBox.fromBase64(base64, fileName || `${Date.now()}`)
  return fileBoxToQrcodeValue(file)
}

export const encode = (qrcodeValue, options) => {
  return QRCode.toDataURL(qrcodeValue, options)
}
