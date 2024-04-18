import { createReducer } from "@/helpers/redux-helpers";
import { actions, cases } from "./reducerCases";
import states, { rootName } from "./states";
export type {
  PushMessageErrorPayload,
  PushMessageInfoPayload,
  PushMessagePayload,
} from "./reducerCases";
export * from "./selectors";
export type { States as SnackbarState } from "./types";
export { actions };
export default createReducer(rootName, states, ...cases);
