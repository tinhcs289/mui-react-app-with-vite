import type { ReduxStore } from "@/helpers/redux-helpers";
import { createRootSelector } from "@/helpers/redux-helpers";
import { rootName } from "./states";
import type { States } from "./types";

export const rootSelector = createRootSelector<States>(rootName);
export function hasNotBeenActivatedSelector(state: ReduxStore) {
  return rootSelector(state)?.hasNotBeenActivated;
}
export function accoutNeedToBeActivatedSelector(state: ReduxStore) {
  return rootSelector(state)?.accoutNeedToBeActivated;
}
export function registerUserAccountRequestStatusSelector(state: ReduxStore) {
  return rootSelector(state)?.registerUserAccountRequestStatus;
}
export function activateAccountWithOtpRequestStatusSelector(state: ReduxStore) {
  return rootSelector(state)?.activateAccountWithOtpRequestStatus;
}
export function createOtpForResetPasswordRequestStatusSelector(
  state: ReduxStore
) {
  return rootSelector(state)?.createOtpForResetPasswordRequestStatus;
}
export function updatePasswordWithOptRequestStatusSelector(state: ReduxStore) {
  return rootSelector(state)?.updatePasswordWithOptRequestStatus;
}
export function updatePasswordWithOldPasswordRequestStatusSelector(
  state: ReduxStore
) {
  return rootSelector(state)?.updatePasswordWithOldPasswordRequestStatus;
}
