export const random = (from, to) => from + Math.floor(Math.random() * (to + 1 - from) - 0.0000001)
export const randomNumberStr = (length = 16) => Math.random().toString().slice(2, length + 2)
