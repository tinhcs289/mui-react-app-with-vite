import { HttpRequestStatus } from "@/constants/http-request-status";
import { createCase } from "@/helpers/redux-helpers";
import { rootName } from "../../states";
import type { States } from "../../types";

const TYPE = `${rootName}/requestUpdatePasswordWithOtp_clearStatus`;

export const clearStatusOfRequestUpdatePasswordWithOtp = createCase<
  any,
  States
>(TYPE, (_, states) => {
  return {
    ...states,
    updatePasswordWithOptRequestStatus: HttpRequestStatus.NONE,
  };
});
