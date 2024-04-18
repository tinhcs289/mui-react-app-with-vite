import cloneDeep from "lodash/cloneDeep";

export default function arrayOrEmpty<T>(arr?: Array<T> | null) {
  return arr instanceof Array && arr.length > 0 ? cloneDeep(arr) : [];
}
