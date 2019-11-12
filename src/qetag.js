const fs = require('fs')
const Stream = require('stream')
const { hash } = require('./crypto')

// 以4M为单位分割
const blockSize = 4 * 1024 * 1024

const calcEtag = (sha1String, blockCount) => {
  let prefix = 0x16
  if (!sha1String.length) {
    return 'Fto5o-5ea0sNMlW_75VgGJCv2AcJ'
  }
  let sha1Buffer = Buffer.concat(sha1String, blockCount * 20)

  // 如果大于4M，则对各个块的sha1结果再次sha1
  if (blockCount > 1) {
    prefix = 0x96
    sha1Buffer = hash(sha1Buffer, 'sha1', null)
  }

  sha1Buffer = Buffer.concat(
    [Buffer.from([prefix]), sha1Buffer],
    sha1Buffer.length + 1
  )

  return sha1Buffer.toString('base64')
    .replace(/\//g, '_').replace(/\+/g, '-')
}

export const getEtag = buffer => {
  // 判断传入的参数是buffer还是stream还是filepath
  let mode = 'buffer'
  let checkedBuffer = buffer
  if (typeof buffer === 'string') {
    checkedBuffer = fs.createReadStream(buffer)
    mode = 'stream'
  } else if (buffer instanceof Stream) {
    mode = 'stream'
  }
  const sha1String = []
  let blockCount = 0
  return new Promise((resolve, reject) => {
    switch (mode) {
      case 'buffer':
        blockCount = Math.ceil(checkedBuffer.length / blockSize)
        for (let i = 0; i < blockCount; i += 1) {
          sha1String.push(hash(
            checkedBuffer.slice(i * blockSize, (i + 1) * blockSize),
            'sha1', null
          ))
        }
        process.nextTick(() => {
          resolve(calcEtag(sha1String, blockCount))
        })
        break
      case 'stream':
        checkedBuffer.on('readable', () => {
          let chunk
          do {
            chunk = checkedBuffer.read(blockSize)
            if (chunk) {
              sha1String.push(hash(chunk, 'sha1', null))
              blockCount += 1
            }
          } while (chunk)
        })
        checkedBuffer.on('end', () => {
          resolve(calcEtag(sha1String, blockCount))
        })
        break
      default:
        reject(new Error(`not support ${mode}`))
    }
  })
}

export const getEtagFromString = str => {
  return getEtag(Buffer.from(str))
}
