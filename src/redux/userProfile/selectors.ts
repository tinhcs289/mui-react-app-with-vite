import type { ReduxStore } from "@/helpers/redux-helpers";
import { createRootSelector } from "@/helpers/redux-helpers";
import { rootName } from "./states";
import type { States } from "./types";
export const rootSelector = createRootSelector<States>(rootName);
export function userProfileDataSelector(state: ReduxStore) {
  return rootSelector(state)?.data;
}
export function getUserProfileRequestStatusSelector(state: ReduxStore) {
  return rootSelector(state)?.getUserProfileRequestStatus;
}
export function updateUserProfileRequestStatusSelector(state: ReduxStore) {
  return rootSelector(state)?.updateUserProfileRequestStatus;
}
