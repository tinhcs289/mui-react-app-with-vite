export default function isEmptyArray(value: any) {
  return value instanceof Array && value.length === 0;
}
