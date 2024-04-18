import { HttpRequestStatus } from "@/constants/http-request-status";
export type States = {
  hasNotBeenActivated: boolean | null;
  accoutNeedToBeActivated: string | null;
  registerUserAccountRequestStatus: HttpRequestStatus;
  activateAccountWithOtpRequestStatus: HttpRequestStatus;
  createOtpForResetPasswordRequestStatus: HttpRequestStatus;
  updatePasswordWithOptRequestStatus: HttpRequestStatus;
  updatePasswordWithOldPasswordRequestStatus: HttpRequestStatus;
};
