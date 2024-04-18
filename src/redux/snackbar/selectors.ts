import type { ReduxStore } from "@/helpers/redux-helpers";
import { createRootSelector } from "@/helpers/redux-helpers";
import { rootName } from "./states";
import type { States } from "./types";
export const rootSelector = createRootSelector<States>(rootName);
export function idSelector(state: ReduxStore) {
  return rootSelector(state)?.id;
}
export function messageSelector(state: ReduxStore) {
  return rootSelector(state)?.message;
}
export function variantSelector(state: ReduxStore) {
  return rootSelector(state)?.variant;
}
