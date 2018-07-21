export const randomByte = () => {
  const randomBuffer = Buffer.alloc(4)
  randomBuffer.writeUInt32BE(
    Math.floor(Math.random() * 4294967295)
  )
  return randomBuffer
}

export const bufferToInt = (buffer, offset = 0) => {
  return buffer.readUIntBE(offset, 4)
}
