const QRCode = require('qrcode')
const { FileBox } = require('file-box')
const jsQR = require('jsqr')
const Jimp = require('jimp')

export const fileBoxToQrcodeValue = async (file) => {
  return new Promise(async (resolve, reject) => {
    await Jimp.read(await file.toBuffer(), (err, image) => {
      if (err) { return reject(err) }
      const qrCodeImageArray = new Uint8ClampedArray(image.bitmap.data.buffer)
      const qrCodeResult = jsQR(
        qrCodeImageArray,
        image.bitmap.width,
        image.bitmap.height
      )
      if (qrCodeResult) {
        return resolve(qrCodeResult.data)
      } else {
        return reject(new Error('qrCode decode fail'))
      }
    })
  })
}

export const decodeFromBase64 = (base64, fileName) => {
  const file = FileBox.fromBase64(base64, fileName || Date.now() + '')
  return exports.fileBoxToQrcodeValue(file)
}

export const encode = (qrcodeValue) => {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(qrcodeValue, (err, data) => {
      if (err) { return reject(err) }
      resolve(data)
    })
  })
}
