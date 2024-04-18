import { HttpRequestStatus } from "@/constants/http-request-status";
import { createCase } from "@/helpers/redux-helpers";
import type { AnyObject } from "@/types";
import { rootName } from "../../states";
import type { States } from "../../types";

const TYPE = `${rootName}/requestGetUserProfile_fail`;

export const requestGetUserProfileFail = createCase<AnyObject, States>(
  TYPE,
  (_, states) => {
    return {
      ...states,
      getUserProfileRequestStatus: HttpRequestStatus.REQUESTFAIL,
    } as any;
  }
);
