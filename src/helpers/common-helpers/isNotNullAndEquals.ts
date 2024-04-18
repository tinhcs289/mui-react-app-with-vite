import isNotNull from "./isNotNull";

export default function isNotNullAndEquals(value: any, compareValue: any) {
  return isNotNull(value) && value === compareValue;
}
