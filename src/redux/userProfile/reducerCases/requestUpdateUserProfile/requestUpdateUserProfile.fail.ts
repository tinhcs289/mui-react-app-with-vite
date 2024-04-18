import { HttpRequestStatus } from "@/constants/http-request-status";
import { createCase } from "@/helpers/redux-helpers";
import type { AnyObject } from "@/types";
import { rootName } from "../../states";
import type { States } from "../../types";

const TYPE = `${rootName}/requestUpdateUserProfile_fail`;

export const requestUpdateUserProfileFail = createCase<AnyObject, States>(
  TYPE,
  (_, states) => {
    return {
      ...states,
      updateUserProfileRequestStatus: HttpRequestStatus.REQUESTFAIL,
    } as any;
  }
);
