import type { ReduxStore } from "@/helpers/redux-helpers";
import { createRootSelector } from "@/helpers/redux-helpers";
import type { States } from "./types";
import { rootName } from "./states";
export const rootSelector = createRootSelector<States>(rootName);
export function isSessionTimeoutSelector(state: ReduxStore) {
  return rootSelector(state)?.isSessionTimeout;
}
export function isSessionChangeSelector(state: ReduxStore) {
  return rootSelector(state)?.isSessionChange;
}
export function isSessionChangeToLoggedInSelector(state: ReduxStore) {
  return rootSelector(state)?.isSessionChangeToLoggedIn;
}
export function isSessionChangeToLoggedOutSelector(state: ReduxStore) {
  return rootSelector(state)?.isSessionChangeToLoggedOut;
}
