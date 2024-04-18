import { HttpRequestStatus } from "@/constants/http-request-status";
import { createCase } from "@/helpers/redux-helpers";
import { rootName } from "../../states";
import type { States } from "../../types";

const TYPE = `${rootName}/requestLogout_clearStatus`;

export const clearStatusOfRequestLogout = createCase<any, States>(
  TYPE,
  (_, states) => {
    return {
      ...(states as any),
      logoutRequestStatus: HttpRequestStatus.NONE,
    };
  }
);
