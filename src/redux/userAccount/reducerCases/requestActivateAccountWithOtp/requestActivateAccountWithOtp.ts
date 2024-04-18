import { HttpRequestStatus } from "@/constants/http-request-status";
import type { ReduxAction } from "@/helpers/redux-helpers";
import { createCase } from "@/helpers/redux-helpers";
import {
  activateAccountWithOtpApi,
  type ActivateAccountWithOtpApiParams,
  type ActivateAccountWithOtpApiReturns,
} from "@/http/common-api/account-register/activateAccountWithOtp";
import type { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { rootName } from "../../states";
import type { States } from "../../types";
import { requestActivateAccountWithOtpFail } from "./requestActivateAccountWithOtp.fail";
import { requestActivateAccountWithOtpSuccess } from "./requestActivateAccountWithOtp.success";

export type RequestActivateAccountWithOtpPayload =
  ActivateAccountWithOtpApiParams;

const TYPE = `${rootName}/requestActivateAccountWithOtp`;

export const requestActivateAccountWithOtp = createCase<
  RequestActivateAccountWithOtpPayload,
  States
>(
  TYPE,
  (_, states) => {
    return {
      ...states,
      activateAccountWithOtpRequestStatus: HttpRequestStatus.REQUESTING,
    };
  },
  takeLatest(
    TYPE,
    function* (action: ReduxAction<RequestActivateAccountWithOtpPayload>) {
      const { payload } = action;
      const response = (yield activateAccountWithOtpApi(
        payload
      )) as AxiosResponse<ActivateAccountWithOtpApiReturns>;
      if (response?.status !== 200) {
        yield put(requestActivateAccountWithOtpFail.action({}));
        return;
      }
      yield put(requestActivateAccountWithOtpSuccess.action({}));
    }
  )
);
