import { requestLogout } from "./requestLogout";
import { clearStatusOfRequestLogout } from "./requestLogout.clear";
import { requestLogoutFail } from "./requestLogout.fail";
import { requestLogoutSuccess } from "./requestLogout.success";

export const cases = [
  clearStatusOfRequestLogout,
  requestLogoutFail,
  requestLogoutSuccess,
  requestLogout,
];

export const actions = {
  clearStatusOfRequestLogin: clearStatusOfRequestLogout.action,
  requestLogoutFail: requestLogoutFail.action,
  requestLogoutSuccess: requestLogoutSuccess.action,
  requestLogout: requestLogout.action,
};
