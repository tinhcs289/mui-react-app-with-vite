export default function isNumber(
  value: any,
  comparer?: (value: number) => boolean
) {
  const _is = typeof value === "number" && !Number.isNaN(value);
  if (typeof comparer !== "function") return _is;
  return comparer(value) === true;
}
