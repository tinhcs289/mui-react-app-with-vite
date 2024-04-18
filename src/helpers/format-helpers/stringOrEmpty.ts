export default function stringOrEmpty(value: any, defaultValue: string = "") {
  return typeof value === "string" ? value.trim() : defaultValue;
}
