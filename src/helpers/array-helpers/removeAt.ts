import cloneDeep from "lodash/cloneDeep";

export default function removeAt<T>(arr: T[] = [], index: number = 0) {
  // eslint-disable-next-line prefer-const
  let cloneArray = cloneDeep(arr);
  let updateArray = cloneArray.slice(0, index);
  updateArray = updateArray.concat(
    cloneArray.slice(index + 1, cloneArray.length)
  );
  return updateArray;
}
