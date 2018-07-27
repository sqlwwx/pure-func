export const random = (from, to) => from + Math.floor(Math.random() * (to - from))
export const randomNumberStr = (length = 16) => Math.random().toString().slice(2, length + 2)
