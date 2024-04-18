import { HttpRequestStatus } from "@/constants/http-request-status";
import { createCase } from "@/helpers/redux-helpers";
import type { AnyObject } from "@/types";
import { rootName } from "../../states";
import type { States } from "../../types";

const TYPE = `${rootName}/requestGetUserProfile_clearStatus`;

export const clearStatusOfRequestGetUserProfile = createCase<AnyObject, States>(
  TYPE,
  (_, states) => {
    return {
      ...states,
      getUserProfileRequestStatus: HttpRequestStatus.NONE,
    } as any;
  }
);
