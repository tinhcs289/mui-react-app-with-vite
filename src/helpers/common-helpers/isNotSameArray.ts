/* eslint-disable @typescript-eslint/no-unused-vars */
export default function isNotSameArray<T>(
  list1: T[],
  list2: T[],
  comparer: (a: T, b: T) => boolean = (_a, _b) => true
) {
  if (
    !(
      list1 instanceof Array &&
      list1.length > 0 &&
      list2 instanceof Array &&
      list2.length > 0
    ) ||
    list1.length !== list2.length
  )
    return true;

  return list1.findIndex((s, i) => comparer(s, list2[i])) >= 0;
}
