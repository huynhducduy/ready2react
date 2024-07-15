export default function trimTrailingSpaces(str: string) {
  // Remove trailing spaces from the start and end of the string
  return str.replace(/^\s+|\s+$/g, '')
}
