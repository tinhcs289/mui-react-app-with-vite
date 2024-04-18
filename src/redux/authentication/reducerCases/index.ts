import {
  actions as actionsOfRequestLogin,
  cases as caseOfRequestLogin,
} from "./requestLogin";
import {
  actions as actionsOfRequestLogout,
  cases as caseOfRequestLogout,
} from "./requestLogout";

export type {
  RequestLoginPayload,
  RequestLoginSuccessPayload,
} from "./requestLogin";

export const cases = [...caseOfRequestLogin, ...caseOfRequestLogout];

export const actions = {
  ...actionsOfRequestLogin,
  ...actionsOfRequestLogout,
};
