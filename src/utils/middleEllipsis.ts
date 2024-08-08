const DEFAULT_MAX_LENGTH = 20

export default function middleEllipsis(str: string, maxLength = DEFAULT_MAX_LENGTH) {
  if (str.length <= DEFAULT_MAX_LENGTH) return str
  const half = Math.floor(maxLength / 2)
  return str.slice(0, half) + '…' + str.slice(-half)
}
