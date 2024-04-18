import { HttpRequestStatus } from "@/constants/http-request-status";
import Immutable from "seamless-immutable";
import type { States } from "./types";

export const rootName = "userAccount";

const states = Immutable<States>({
  hasNotBeenActivated: null,
  accoutNeedToBeActivated: null,
  registerUserAccountRequestStatus: HttpRequestStatus.NONE,
  activateAccountWithOtpRequestStatus: HttpRequestStatus.NONE,
  createOtpForResetPasswordRequestStatus: HttpRequestStatus.NONE,
  updatePasswordWithOptRequestStatus: HttpRequestStatus.NONE,
  updatePasswordWithOldPasswordRequestStatus: HttpRequestStatus.NONE,
});
export default states;
