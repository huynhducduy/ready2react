export default function clearQuotes(text: string) {
  if (text.startsWith('"')) text = text.slice(1)
  if (text.endsWith('"')) text = text.slice(0, -1)
  return text
}
