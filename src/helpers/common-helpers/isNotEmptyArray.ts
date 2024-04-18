export default function isNotEmptyArray(value: any) {
  return value instanceof Array && value.length > 0;
}
