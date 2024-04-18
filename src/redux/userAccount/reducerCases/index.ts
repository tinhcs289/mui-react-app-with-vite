import {
  actions as actionsOfMarkAsNotBeenActivated,
  cases as casesOfMarkAsNotBeenActivated,
} from "./markAsNotBeenActivated";
import {
  actions as actionsOfRequestActivateAccountWithOtp,
  cases as caseOfRequestActivateAccountWithOtp,
} from "./requestActivateAccountWithOtp";
import {
  actions as actionsOfRequestCreateOtpForResetPassword,
  cases as caseOfRequestCreateOtpForResetPassword,
} from "./requestCreateOtpForResetPassword";

import {
  actions as actionsOfRequestRegisterUserAccount,
  cases as caseOfRequestRegisterUserAccount,
} from "./requestRegisterUserAccount";

import {
  actions as actionsOfRequestUpdatePasswordWithOldPassword,
  cases as caseOfRequestUpdatePasswordWithOldPassword,
} from "./requestUpdatePasswordWithOldPassword";

import {
  actions as actionsOfRequestUpdatePasswordWithOtp,
  cases as caseOfRequestUpdatePasswordWithOtp,
} from "./requestUpdatePasswordWithOtp";

export type { MarkAsNotBeenActivatedPayload } from "./markAsNotBeenActivated";
export type { RequestActivateAccountWithOtpPayload } from "./requestActivateAccountWithOtp";
export type { RequestCreateOtpForResetPasswordPayload } from "./requestCreateOtpForResetPassword";
export type { RequestRegisterUserAccountPayload } from "./requestRegisterUserAccount";
export type { RequestUpdatePasswordWithOldPasswordPayload } from "./requestUpdatePasswordWithOldPassword";
export type { RequestUpdatePasswordWithOtpPayload } from "./requestUpdatePasswordWithOtp";

export const cases = [
  ...casesOfMarkAsNotBeenActivated,
  ...caseOfRequestActivateAccountWithOtp,
  ...caseOfRequestCreateOtpForResetPassword,
  ...caseOfRequestRegisterUserAccount,
  ...caseOfRequestUpdatePasswordWithOldPassword,
  ...caseOfRequestUpdatePasswordWithOtp,
];

export const actions = {
  ...actionsOfMarkAsNotBeenActivated,
  ...actionsOfRequestActivateAccountWithOtp,
  ...actionsOfRequestCreateOtpForResetPassword,
  ...actionsOfRequestRegisterUserAccount,
  ...actionsOfRequestUpdatePasswordWithOldPassword,
  ...actionsOfRequestUpdatePasswordWithOtp,
};
