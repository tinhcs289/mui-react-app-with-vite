import { HttpRequestStatus } from "@/constants/http-request-status";
import type { ReduxAction } from "@/helpers/redux-helpers";
import { createCase } from "@/helpers/redux-helpers";
import {
  getUserProfileApi,
  type GetUserProfileApiParams,
  type GetUserProfileApiReturns,
} from "@/http/common-api/user-profile/getUserProfileApi";
import type { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { rootName } from "../../states";
import type { States } from "../../types";
import { requestGetUserProfileFail } from "./requestGetUserProfile.fail";
import { requestGetUserProfileSuccess } from "./requestGetUserProfile.success";

export type RequestGetUserProfilePayload = GetUserProfileApiParams;

const TYPE = `${rootName}/requestGetUserProfile`;

export const requestGetUserProfile = createCase<
  RequestGetUserProfilePayload,
  States
>(
  TYPE,
  (_, states) => {
    return {
      ...states,
      getUserProfileRequestStatus: HttpRequestStatus.REQUESTING,
    } as any;
  },
  takeLatest(
    TYPE,
    function* (action: ReduxAction<RequestGetUserProfilePayload>) {
      const response: AxiosResponse<GetUserProfileApiReturns> =
        yield getUserProfileApi(action.payload);
      if (response?.status !== 200) {
        yield put(requestGetUserProfileFail.action({}));
        return;
      }
      yield put(requestGetUserProfileSuccess.action({ data: response.data }));
    }
  )
);
