export default function isNotNull(value: any) {
  if (typeof value === "number") return !Number.isNaN(value);
  return typeof value !== "undefined" && value !== null && value !== "";
}
