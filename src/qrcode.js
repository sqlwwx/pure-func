const QRCode = require('qrcode')
const { FileBox } = require('file-box')
const jsQR = require('jsqr')
const Jimp = require('jimp')

export const fileBoxToQrcodeValue = async (file) => {
  return new Promise(async (resolve, reject) => {
    Jimp.read(await file.toBuffer(), (err, image) => {
      if (err) {
        err.code = 'InvalidQrcodeBuffer'
        return reject(err)
      }
      const qrCodeImageArray = new Uint8ClampedArray(image.bitmap.data.buffer)
      const qrcode = jsQR(
        qrCodeImageArray,
        image.bitmap.width,
        image.bitmap.height
      )
      if (qrcode) {
        resolve(qrcode.data)
      } else {
        reject(new Error('DecodeQrcodeFail'))
      }
    })
  })
}

export const decodeFromBase64 = (base64, fileName) => {
  const file = FileBox.fromBase64(base64, fileName || Date.now() + '')
  return fileBoxToQrcodeValue(file)
}

export const encode = (qrcodeValue) => {
  return QRCode.toDataURL(qrcodeValue)
}
