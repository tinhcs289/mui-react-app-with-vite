import isOneOf from "@/helpers/common-helpers/isOneOf";

export default function oneOfOrDefault<T>(
  value: T,
  collection: T[],
  defaultValue?: T
) {
  const _is = isOneOf(value, collection);

  return _is ? value : !!defaultValue ? defaultValue : collection[0];
}
