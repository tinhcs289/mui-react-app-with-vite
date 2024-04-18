import { HttpRequestStatus } from "@/constants/http-request-status";
import { createCase } from "@/helpers/redux-helpers";
import { rootName } from "../../states";
import type { States } from "../../types";

const TYPE = `${rootName}/requestActivateAccountWithOtp_clearStatus`;

export const clearStatusOfRequestActivateAccountWithOtp = createCase<
  any,
  States
>(TYPE, (_, states) => {
  return {
    ...states,
    activateAccountWithOtpRequestStatus: HttpRequestStatus.NONE,
  };
});
