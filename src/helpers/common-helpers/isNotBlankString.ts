export default function isNotBlankString(value: any) {
  return typeof value === "string" && value.trim() !== "";
}
