import EMPTY_GUID from "@/helpers/string-helpers/empty-guid";

export default function isEmptyGuid(value: any) {
  return value === EMPTY_GUID;
}
