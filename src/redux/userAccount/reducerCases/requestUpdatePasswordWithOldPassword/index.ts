import { clearStatusOfRequestUpdatePasswordWithOldPassword } from "./requestUpdatePasswordWithOldPassword.clear";
import { requestUpdatePasswordWithOldPassword } from "./requestUpdatePasswordWithOldPassword";
import { requestUpdatePasswordWithOldPasswordFail } from "./requestUpdatePasswordWithOldPassword.fail";
import { requestUpdatePasswordWithOldPasswordSuccess } from "./requestUpdatePasswordWithOldPassword.success";

export type { RequestUpdatePasswordWithOldPasswordPayload } from "./requestUpdatePasswordWithOldPassword";

export const cases = [
  clearStatusOfRequestUpdatePasswordWithOldPassword,
  requestUpdatePasswordWithOldPassword,
  requestUpdatePasswordWithOldPasswordFail,
  requestUpdatePasswordWithOldPasswordSuccess,
];
export const actions = {
  requestUpdatePasswordWithOldPassword:
    requestUpdatePasswordWithOldPassword.action,
  requestUpdatePasswordWithOldPasswordFail:
    requestUpdatePasswordWithOldPasswordFail.action,
  requestUpdatePasswordWithOldPasswordSuccess:
    requestUpdatePasswordWithOldPasswordSuccess.action,
  clearStatusOfRequestUpdatePasswordWithOldPassword:
    clearStatusOfRequestUpdatePasswordWithOldPassword.action,
};
