import { HttpRequestStatus } from "@/constants/http-request-status";
import { createCase } from "@/helpers/redux-helpers";
import type { States } from "../../types";
import { rootName } from "../../states";

const TYPE = `${rootName}/requestRegisterUserAccount_clearStatus`;

export const clearStatusOfRequestRegisterUserAccount = createCase<any, States>(
  TYPE,
  (_, states) => {
    return {
      ...states,
      registerUserAccountRequestStatus: HttpRequestStatus.NONE,
    };
  }
);
