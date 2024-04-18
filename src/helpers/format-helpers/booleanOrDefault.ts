export default function booleanOrDefault(
  value: any,
  defaultValue: boolean = false
) {
  if (typeof value !== "boolean") return defaultValue;
  return !!value;
}
