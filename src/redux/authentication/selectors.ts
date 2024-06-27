import type { ReduxStore } from "@/helpers/redux-helpers";
import { createRootSelector } from "@/helpers/redux-helpers";
import { rootName } from "./states";
import type { States } from "./types";
import { HttpRequestStatus } from "@/constants/http-request-status";
export const rootSelector = createRootSelector<States>(rootName);
export function tokenSelector(state: ReduxStore) {
  return rootSelector(state)?.token;
}
export function userSelector(state: ReduxStore) {
  return rootSelector(state)?.user;
}
export function loginRequestStatusSelector(state: ReduxStore) {
  return rootSelector(state)?.loginRequestStatus || HttpRequestStatus.NONE;
}
export function logoutRequestStatusSelector(state: ReduxStore) {
  return rootSelector(state)?.logoutRequestStatus || HttpRequestStatus.NONE;
}
export function verifyTokenRequestStatusSelector(state: ReduxStore) {
  return (
    rootSelector(state)?.verifyTokenRequestStatus || HttpRequestStatus.NONE
  );
}
export function refreshTokenRequestStatusSelector(state: ReduxStore) {
  return (
    rootSelector(state)?.refreshTokenRequestStatus || HttpRequestStatus.NONE
  );
}
export function userPermissionsSelector(state: ReduxStore) {
  return rootSelector(state)?.policies || [];
}
export function userRolesSelector(state: ReduxStore) {
  return rootSelector(state)?.roles || [];
}
