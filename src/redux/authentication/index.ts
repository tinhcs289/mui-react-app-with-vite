import { createReducer } from "@/helpers/redux-helpers";
import { actions, cases } from "./reducerCases";
import states, { rootName } from "./states";
export type {
  RequestLoginPayload,
  RequestLoginSuccessPayload,
} from "./reducerCases";
export * from "./selectors";
export type { States as AuthenticationState } from "./types";
export { actions };
export default createReducer(rootName, states, ...cases);
