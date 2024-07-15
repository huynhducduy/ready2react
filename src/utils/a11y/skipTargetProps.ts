export default function skipTargetProps(id: string) {
  return {
    id: id,
    tabIndex: -1,
  }
}
