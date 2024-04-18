import { createReducer } from "@/helpers/redux-helpers";
import { actions, cases } from "./reducerCases";
import states, { rootName } from "./states";
export type {
  RequestGetUserProfilePayload,
  RequestGetUserProfileSuccessPayload,
  RequestUpdateUserProfilePayload
} from "./reducerCases";
export * from "./selectors";
export type { States as UserProfileState } from "./types";
export { actions };
export default createReducer(rootName, states, ...cases);
