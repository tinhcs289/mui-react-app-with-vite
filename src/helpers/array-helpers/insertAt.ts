import cloneDeep from "lodash/cloneDeep";

/**
 * @example const newUsers = insertAt(users, userA, 4)
 */
export default function insertAt<T>(arr: T[] = [], item: T, index: number = 0) {
  // eslint-disable-next-line prefer-const
  let cloneArray = cloneDeep(arr);
  let updateArray = cloneArray.slice(0, index + 1);
  updateArray.push(item);
  updateArray = updateArray.concat(
    cloneArray.slice(index + 1, cloneArray.length)
  );
  return updateArray;
}
