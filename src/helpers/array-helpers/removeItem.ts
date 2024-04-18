import cloneDeep from "lodash/cloneDeep";

export default function removeItem<T>(
  arr: T[] = [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  exp: (i: T) => boolean = (_i) => true
) {
  const newArr = cloneDeep(arr);
  const index = newArr.findIndex(exp);
  if (index >= 0) {
    let result = newArr.slice(0, index);
    result = result.concat(arr.slice(index + 1, newArr.length));
    return result;
  }
  return undefined;
}
