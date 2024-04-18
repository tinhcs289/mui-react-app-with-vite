import { HttpRequestStatus } from "@/constants/http-request-status";
import type { ReduxAction } from "@/helpers/redux-helpers";
import { createCase } from "@/helpers/redux-helpers";
import {
  requestOtpForResetPasswordApi,
  type RequestOtpForResetPasswordApiParams,
  type RequestOtpForResetPasswordApiReturns,
} from "@/http/common-api/account-password/requestOtpForResetPasswordApi";
import type { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { rootName } from "../../states";
import type { States } from "../../types";
import { requestCreateOtpForResetPasswordFail } from "./requestCreateOtpForResetPassword.fail";
import { requestCreateOtpForResetPasswordSuccess } from "./requestCreateOtpForResetPassword.success";

export type RequestCreateOtpForResetPasswordPayload =
  RequestOtpForResetPasswordApiParams;

const TYPE = `${rootName}/requestCreateOtpForResetPassword`;

export const requestCreateOtpForResetPassword = createCase<
  RequestCreateOtpForResetPasswordPayload,
  States
>(
  TYPE,
  (_, states) => {
    return {
      ...states,
      createOtpForResetPasswordRequestStatus: HttpRequestStatus.REQUESTING,
    };
  },
  takeLatest(
    TYPE,
    function* (action: ReduxAction<RequestCreateOtpForResetPasswordPayload>) {
      const { payload } = action;
      const response = (yield requestOtpForResetPasswordApi(
        payload
      )) as AxiosResponse<RequestOtpForResetPasswordApiReturns>;
      if (response?.status !== 200) {
        yield put(requestCreateOtpForResetPasswordFail.action({}));
        return;
      }
      yield put(requestCreateOtpForResetPasswordSuccess.action({}));
    }
  )
);
