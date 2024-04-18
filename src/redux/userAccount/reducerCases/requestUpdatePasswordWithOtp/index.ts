import { requestUpdatePasswordWithOtp } from "./requestUpdatePasswordWithOtp";
import { clearStatusOfRequestUpdatePasswordWithOtp } from "./requestUpdatePasswordWithOtp.clear";
import { requestUpdatePasswordWithOtpFail } from "./requestUpdatePasswordWithOtp.fail";
import { requestUpdatePasswordWithOtpSuccess } from "./requestUpdatePasswordWithOtp.success";

export type { RequestUpdatePasswordWithOtpPayload } from "./requestUpdatePasswordWithOtp";

export const cases = [
  requestUpdatePasswordWithOtp,
  requestUpdatePasswordWithOtpSuccess,
  requestUpdatePasswordWithOtpFail,
  clearStatusOfRequestUpdatePasswordWithOtp,
];
export const actions = {
  requestUpdatePasswordWithOtp: requestUpdatePasswordWithOtp.action,
  requestUpdatePasswordWithOtpSuccess:
    requestUpdatePasswordWithOtpSuccess.action,
  requestUpdatePasswordWithOtpFail: requestUpdatePasswordWithOtpFail.action,
  clearStatusOfRequestUpdatePasswordWithOtp:
    clearStatusOfRequestUpdatePasswordWithOtp.action,
};
