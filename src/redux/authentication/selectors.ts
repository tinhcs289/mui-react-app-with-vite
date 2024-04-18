import type { ReduxStore } from "@/helpers/redux-helpers";
import { createRootSelector } from "@/helpers/redux-helpers";
import { rootName } from "./states";
import type { States } from "./types";
export const rootSelector = createRootSelector<States>(rootName);
export function tokenSelector(state: ReduxStore) {
  return rootSelector(state)?.token;
}
export function userSelector(state: ReduxStore) {
  return rootSelector(state)?.user;
}
export function loginRequestStatusSelector(state: ReduxStore) {
  return rootSelector(state)?.loginRequestStatus;
}
export function logoutRequestStatusSelector(state: ReduxStore) {
  return rootSelector(state)?.logoutRequestStatus;
}
export function verifyTokenRequestStatusSelector(state: ReduxStore) {
  return rootSelector(state)?.verifyTokenRequestStatus;
}
export function refreshTokenRequestStatusSelector(state: ReduxStore) {
  return rootSelector(state)?.refreshTokenRequestStatus;
}
export function userPermissionsSelector(state: ReduxStore) {
  return rootSelector(state)?.policies || [];
}
export function userRolesSelector(state: ReduxStore) {
  return rootSelector(state)?.roles || [];
}
