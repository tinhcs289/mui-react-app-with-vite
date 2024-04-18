import isEmptyGuid from "./isEmptyGuid";
import isGuid from "./isGuid";

export default function isNotEmptyGuid(value: any) {
  return isGuid(value) && !isEmptyGuid(value);
}
