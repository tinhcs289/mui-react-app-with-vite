import { HttpRequestStatus } from "@/constants/http-request-status";
import { createCase } from "@/helpers/redux-helpers";
import { AnyObject } from "@/types";
import { rootName } from "../../states";
import type { States } from "../../types";

const TYPE = `${rootName}/requestUpdateUserProfile_success`;

export const requestUpdateUserProfileSuccess = createCase<AnyObject, States>(
  TYPE,
  (_, states) => {
    return {
      ...states,
      updateUserProfileRequestStatus: HttpRequestStatus.REQUESTSUCCESS,
    } as any;
  }
);
