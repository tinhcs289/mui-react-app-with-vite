export default function isNotEmptyObject(value: any) {
  return typeof value === "object" && Object.keys(value).length > 0;
}
