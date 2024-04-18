import cloneDeep from "lodash/cloneDeep";

export default function swapItemByIndexes<T>(
  arr: T[],
  startIndex: number,
  endIndex: number
): T[] {
  const cloneArray = cloneDeep(arr);
  const [removed] = cloneArray.splice(startIndex, 1);
  cloneArray.splice(endIndex, 0, removed);
  return cloneArray;
}
