import { HttpRequestStatus } from "@/constants/http-request-status";
import { createCase } from "@/helpers/redux-helpers";
import { rootName } from "../../states";
import type { States } from "../../types";

const TYPE = `${rootName}/requestCreateOtpForResetPassword_clearStatus`;

export const clearStatusOfRequestCreateOtpForResetPassword = createCase<
  any,
  States
>(TYPE, (_, states) => {
  return {
    ...states,
    createOtpForResetPasswordRequestStatus: HttpRequestStatus.NONE,
  };
});
