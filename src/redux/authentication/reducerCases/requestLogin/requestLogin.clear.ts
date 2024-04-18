import { HttpRequestStatus } from "@/constants/http-request-status";
import { createCase } from "@/helpers/redux-helpers";
import type { States } from "../../types";
import { rootName } from "../../states";

const TYPE = `${rootName}/requestLogin_clearStatus`;
export const clearStatusOfRequestLogin = createCase<any, States>(
  TYPE,
  (_, states) => {
    return {
      ...(states as any),
      loginRequestStatus: HttpRequestStatus.NONE,
    };
  }
);
