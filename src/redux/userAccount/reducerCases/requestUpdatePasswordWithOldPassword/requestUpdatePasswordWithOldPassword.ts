import { HttpRequestStatus } from "@/constants/http-request-status";
import type { ReduxAction } from "@/helpers/redux-helpers";
import { createCase } from "@/helpers/redux-helpers";
import {
  updatePasswordWithOldPasswordApi,
  type UpdatePasswordWithOldPasswordApiParams,
  type UpdatePasswordWithOldPasswordApiReturns,
} from "@/http/common-api/account-password/updatePasswordWithOldPasswordApi";
import type { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { rootName } from "../../states";
import type { States } from "../../types";
import { requestUpdatePasswordWithOldPasswordFail } from "./requestUpdatePasswordWithOldPassword.fail";
import { requestUpdatePasswordWithOldPasswordSuccess } from "./requestUpdatePasswordWithOldPassword.success";

export type RequestUpdatePasswordWithOldPasswordPayload =
  UpdatePasswordWithOldPasswordApiParams;

const TYPE = `${rootName}/requestUpdatePasswordWithOldPassword`;

export const requestUpdatePasswordWithOldPassword = createCase<
  RequestUpdatePasswordWithOldPasswordPayload,
  States
>(
  TYPE,
  (_, states) => {
    return {
      ...states,
      updatePasswordWithOldPasswordRequestStatus: HttpRequestStatus.REQUESTING,
    };
  },
  takeLatest(
    TYPE,
    function* (
      action: ReduxAction<RequestUpdatePasswordWithOldPasswordPayload>
    ) {
      const { payload } = action;
      const response = (yield updatePasswordWithOldPasswordApi(
        payload
      )) as AxiosResponse<UpdatePasswordWithOldPasswordApiReturns>;
      if (response?.status !== 200) {
        yield put(requestUpdatePasswordWithOldPasswordFail.action({}));
        return;
      }
      yield put(requestUpdatePasswordWithOldPasswordSuccess.action({}));
    }
  )
);
