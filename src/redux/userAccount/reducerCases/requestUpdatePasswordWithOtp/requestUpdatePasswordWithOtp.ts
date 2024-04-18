import { HttpRequestStatus } from "@/constants/http-request-status";
import type { ReduxAction } from "@/helpers/redux-helpers";
import { createCase } from "@/helpers/redux-helpers";
import {
  updatePasswordWithOtpApi,
  type UpdatePasswordWithOtpApiParams,
  type UpdatePasswordWithOtpApiReturns,
} from "@/http/common-api/account-password/updatePasswordWithOtpApi";
import type { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { rootName } from "../../states";
import type { States } from "../../types";
import { requestUpdatePasswordWithOtpFail } from "./requestUpdatePasswordWithOtp.fail";
import { requestUpdatePasswordWithOtpSuccess } from "./requestUpdatePasswordWithOtp.success";

export type RequestUpdatePasswordWithOtpPayload =
  UpdatePasswordWithOtpApiParams;

const TYPE = `${rootName}/requestUpdatePasswordWithOtp`;

export const requestUpdatePasswordWithOtp = createCase<
  RequestUpdatePasswordWithOtpPayload,
  States
>(
  TYPE,
  (_, states) => {
    return {
      ...states,
      updatePasswordWithOptRequestStatus: HttpRequestStatus.REQUESTING,
    };
  },
  takeLatest(
    TYPE,
    function* (action: ReduxAction<RequestUpdatePasswordWithOtpPayload>) {
      const { payload } = action;
      const response = (yield updatePasswordWithOtpApi(
        payload
      )) as AxiosResponse<UpdatePasswordWithOtpApiReturns>;
      if (response?.status !== 200) {
        yield put(requestUpdatePasswordWithOtpFail.action({}));
        return;
      }
      yield put(requestUpdatePasswordWithOtpSuccess.action({}));
    }
  )
);
