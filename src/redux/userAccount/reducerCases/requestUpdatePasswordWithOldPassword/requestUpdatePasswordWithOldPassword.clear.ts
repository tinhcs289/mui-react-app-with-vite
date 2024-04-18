import { HttpRequestStatus } from "@/constants/http-request-status";
import { createCase } from "@/helpers/redux-helpers";
import { rootName } from "../../states";
import type { States } from "../../types";

const TYPE = `${rootName}/requestUpdatePasswordWithOldPassword_clearStatus`;

export const clearStatusOfRequestUpdatePasswordWithOldPassword = createCase<
  any,
  States
>(TYPE, (_, states) => {
  return {
    ...states,
    updatePasswordWithOldPasswordRequestStatus: HttpRequestStatus.NONE,
  };
});
