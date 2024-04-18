import { requestActivateAccountWithOtp } from "./requestActivateAccountWithOtp";
import { clearStatusOfRequestActivateAccountWithOtp } from "./requestActivateAccountWithOtp.clear";
import { requestActivateAccountWithOtpFail } from "./requestActivateAccountWithOtp.fail";
import { requestActivateAccountWithOtpSuccess } from "./requestActivateAccountWithOtp.success";

export type { RequestActivateAccountWithOtpPayload } from "./requestActivateAccountWithOtp";

export const cases = [
  clearStatusOfRequestActivateAccountWithOtp,
  requestActivateAccountWithOtpFail,
  requestActivateAccountWithOtpSuccess,
  requestActivateAccountWithOtp,
];

export const actions = {
  clearStatusOfRequestActivateAccountWithOtp:
    clearStatusOfRequestActivateAccountWithOtp.action,
  requestActivateAccountWithOtpFail: requestActivateAccountWithOtpFail.action,
  requestActivateAccountWithOtpSuccess:
    requestActivateAccountWithOtpSuccess.action,
  requestActivateAccountWithOtp: requestActivateAccountWithOtp.action,
};
