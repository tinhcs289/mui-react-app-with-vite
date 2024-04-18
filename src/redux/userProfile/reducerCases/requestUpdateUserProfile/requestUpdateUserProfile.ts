import { HttpRequestStatus } from "@/constants/http-request-status";
import isOkWithData from "@/helpers/http-request-helpers/isOkWithData";
import type { ReduxAction } from "@/helpers/redux-helpers";
import { createCase } from "@/helpers/redux-helpers";
import {
  updateUserProfileApi,
  type UpdateUserProfileApiParams,
  type UpdateUserProfileApiReturns,
} from "@/http/common-api/user-profile/updateUserProfileApi";
import type { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { rootName } from "../../states";
import type { States } from "../../types";
import { requestUpdateUserProfileFail } from "./requestUpdateUserProfile.fail";
import { requestUpdateUserProfileSuccess } from "./requestUpdateUserProfile.success";

export type RequestUpdateUserProfilePayload = UpdateUserProfileApiParams;

const TYPE = `${rootName}/requestUpdateUserProfile`;

export const requestUpdateUserProfile = createCase<
  RequestUpdateUserProfilePayload,
  States
>(
  TYPE,
  (_, states) => {
    return {
      ...states,
      updateUserProfileRequestStatus: HttpRequestStatus.REQUESTING,
    } as any;
  },
  takeLatest(
    TYPE,
    function* (action: ReduxAction<RequestUpdateUserProfilePayload>) {
      const response: AxiosResponse<UpdateUserProfileApiReturns> =
        yield updateUserProfileApi(action.payload);
      if (!isOkWithData(response)) {
        yield put(requestUpdateUserProfileFail.action({}));
        return;
      }
      yield put(requestUpdateUserProfileSuccess.action({}));
    }
  )
);
