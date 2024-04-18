import { requestLogin } from "./requestLogin";
import { clearStatusOfRequestLogin } from "./requestLogin.clear";
import { requestLoginFail } from "./requestLogin.fail";
import { requestLoginSuccess } from "./requestLogin.success";

export type { RequestLoginPayload } from "./requestLogin";
export type { RequestLoginSuccessPayload } from "./requestLogin.success";

export const cases = [
  clearStatusOfRequestLogin,
  requestLoginFail,
  requestLoginSuccess,
  requestLogin,
];

export const actions = {
  clearStatusOfRequestLogin: clearStatusOfRequestLogin.action,
  requestLoginFail: requestLoginFail.action,
  requestLoginSuccess: requestLoginSuccess.action,
  requestLogin: requestLogin.action,
};
