export default function isBlankString(value: any) {
  return typeof value === "string" && value.trim() === "";
}
