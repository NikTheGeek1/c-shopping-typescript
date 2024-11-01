export const rand = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getFilenameExt = (fileStr: string) => {
  const types = fileStr.split('.')
  return types[types.length - 1]
}
export const randString = (size: number) => {
  let result = ''
  let allChar = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

  size = size || 1

  while (size--) {
    result += allChar.charAt(rand(0, allChar.length - 1))
  }

  return result
}
