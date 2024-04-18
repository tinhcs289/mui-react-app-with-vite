import { requestCreateOtpForResetPassword } from "./requestCreateOtpForResetPassword";
import { clearStatusOfRequestCreateOtpForResetPassword } from "./requestCreateOtpForResetPassword.clear";
import { requestCreateOtpForResetPasswordFail } from "./requestCreateOtpForResetPassword.fail";
import { requestCreateOtpForResetPasswordSuccess } from "./requestCreateOtpForResetPassword.success";

export type { RequestCreateOtpForResetPasswordPayload } from "./requestCreateOtpForResetPassword";

export const cases = [
  clearStatusOfRequestCreateOtpForResetPassword,
  requestCreateOtpForResetPasswordFail,
  requestCreateOtpForResetPasswordSuccess,
  requestCreateOtpForResetPassword,
];

export const actions = {
  clearStatusOfRequestCreateOtpForResetPassword:
    clearStatusOfRequestCreateOtpForResetPassword.action,
  requestCreateOtpForResetPasswordFail:
    requestCreateOtpForResetPasswordFail.action,
  requestCreateOtpForResetPasswordSuccess:
    requestCreateOtpForResetPasswordSuccess.action,
  requestCreateOtpForResetPassword: requestCreateOtpForResetPassword.action,
};
