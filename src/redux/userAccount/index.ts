import { createReducer } from "@/helpers/redux-helpers";
import { actions, cases } from "./reducerCases";
import states, { rootName } from "./states";
export type {
  MarkAsNotBeenActivatedPayload,
  RequestActivateAccountWithOtpPayload,
  RequestCreateOtpForResetPasswordPayload,
  RequestRegisterUserAccountPayload,
  RequestUpdatePasswordWithOldPasswordPayload,
  RequestUpdatePasswordWithOtpPayload,
} from "./reducerCases";
export * from "./selectors";
export type { States as UserAccountState } from "./types";
export { actions };
export default createReducer(rootName, states, ...cases);
