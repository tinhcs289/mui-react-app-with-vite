import type { GetUserProfileApiReturns } from "@/api/userProfile/getUserProfileApi";
import { HttpRequestStatus } from "@/constants/http-request-status";
import { createCase } from "@/helpers/redux-helpers";
import type { States } from "../../types";
import { rootName } from "../../states";

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
