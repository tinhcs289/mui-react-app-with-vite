import isNotNull from "./isNotNull";

export default function isNull(value: any) {
  return !isNotNull(value);
}
