export default function isNotEmptyString(value: any) {
  return typeof value === "string" && value !== "";
}
