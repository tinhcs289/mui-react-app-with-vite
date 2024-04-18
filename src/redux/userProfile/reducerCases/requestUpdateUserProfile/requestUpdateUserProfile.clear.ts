import { HttpRequestStatus } from "@/constants/http-request-status";
import { createCase } from "@/helpers/redux-helpers";
import type { AnyObject } from "@/types";
import { rootName } from "../../states";
import type { States } from "../../types";

const TYPE = `${rootName}/requestUpdateUserProfile_clearStatus`;

export const clearStatusOfRequestUpdateUserProfile = createCase<
  AnyObject,
  States
>(TYPE, (_, states) => {
  return {
    ...states,
    updateUserProfileRequestStatus: HttpRequestStatus.NONE,
  } as any;
});
