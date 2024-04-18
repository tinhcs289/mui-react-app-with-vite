import { clearStatusOfRequestRegisterUserAccount } from "./requestRegisterUserAccount.clear";
import { requestRegisterUserAccount } from "./requestRegisterUserAccount";
import { requestRegisterUserAccountFail } from "./requestRegisterUserAccount.fail";
import { requestRegisterUserAccountSuccess } from "./requestRegisterUserAccount.success";

export type { RequestRegisterUserAccountPayload } from "./requestRegisterUserAccount";

export const cases = [
  clearStatusOfRequestRegisterUserAccount,
  requestRegisterUserAccount,
  requestRegisterUserAccountFail,
  requestRegisterUserAccountSuccess,
];

export const actions = {
  requestRegisterUserAccount: requestRegisterUserAccount.action,
  requestRegisterUserAccountSuccess: requestRegisterUserAccountSuccess.action,
  requestRegisterUserAccountFail: requestRegisterUserAccountFail.action,
  clearStatusOfRequestRegisterUserAccount:
    clearStatusOfRequestRegisterUserAccount.action,
};
