import { HttpRequestStatus } from "@/constants/http-request-status";
import { createCase } from "@/helpers/redux-helpers";
import type { GetUserProfileApiReturns } from "@/http/common-api/user-profile/getUserProfileApi";
import { rootName } from "../../states";
import type { States } from "../../types";

export type RequestGetUserProfileSuccessPayload = {
  data: GetUserProfileApiReturns;
};

const TYPE = `${rootName}/requestGetUserProfile_success`;

export const requestGetUserProfileSuccess = createCase<
  RequestGetUserProfileSuccessPayload,
  States
>(TYPE, (action, state) => {
  return {
    ...state,
    data: action.payload.data,
    getUserProfileRequestStatus: HttpRequestStatus.REQUESTSUCCESS,
  };
});
