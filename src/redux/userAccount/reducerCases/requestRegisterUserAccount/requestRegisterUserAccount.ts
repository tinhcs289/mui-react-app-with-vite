import { HttpRequestStatus } from "@/constants/http-request-status";
import type { ReduxAction } from "@/helpers/redux-helpers";
import { createCase } from "@/helpers/redux-helpers";
import {
  registerApi,
  type RegisterApiParams,
  type RegisterApiReturns,
} from "@/http/common-api/account-register/register";
import type { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { rootName } from "../../states";
import type { States } from "../../types";
import { requestRegisterUserAccountFail } from "./requestRegisterUserAccount.fail";
import { requestRegisterUserAccountSuccess } from "./requestRegisterUserAccount.success";

export type RequestRegisterUserAccountPayload = RegisterApiParams;

const TYPE = `${rootName}/requestRegisterUserAccount`;

export const requestRegisterUserAccount = createCase<
  RequestRegisterUserAccountPayload,
  States
>(
  TYPE,
  (_, states) => {
    return {
      ...states,
      registerUserAccountRequestStatus: HttpRequestStatus.REQUESTING,
    };
  },
  takeLatest(
    TYPE,
    function* (action: ReduxAction<RequestRegisterUserAccountPayload>) {
      const { payload } = action;
      const response = (yield registerApi(
        payload
      )) as AxiosResponse<RegisterApiReturns>;
      if (response?.status !== 200) {
        yield put(requestRegisterUserAccountFail.action({}));
        return;
      }
      yield put(requestRegisterUserAccountSuccess.action({}));
    }
  )
);
