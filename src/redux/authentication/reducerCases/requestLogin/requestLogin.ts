import { shapeOfAuthenticateJWT } from "@/constants/auth";
import { HttpRequestStatus } from "@/constants/http-request-status";
import isValidAsYupSchema from "@/helpers/common-helpers/isValidAsYupSchema";
import type { ReduxAction } from "@/helpers/redux-helpers";
import { createCase } from "@/helpers/redux-helpers";
import {
  loginApi,
  type LoginApiParams,
  type LoginApiReturns,
} from "@/http/common-api/authenticate/login";
import { actions as userAccount } from "@/redux/userAccount";
import type { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { rootName } from "../../states";
import type { States } from "../../types";
import { clearStatusOfRequestLogin } from "./requestLogin.clear";
import { requestLoginFail } from "./requestLogin.fail";
import { requestLoginSuccess } from "./requestLogin.success";

export type RequestLoginPayload = LoginApiParams;

const TYPE = `${rootName}/requestLogin`;

export const requestLogin = createCase<RequestLoginPayload, States>(
  TYPE,
  (_, states) => {
    return {
      ...(states as any),
      loginRequestStatus: HttpRequestStatus.REQUESTING,
    };
  },
  takeLatest(TYPE, function* (action: ReduxAction<RequestLoginPayload>) {
    const response = (yield loginApi(
      action.payload
    )) as AxiosResponse<LoginApiReturns>;
    if (response?.data?.hasNotBeenActivated) {
      yield put(
        userAccount.markAsNotBeenActivated({
          userAccount: action.payload.username,
        })
      );
      yield put(clearStatusOfRequestLogin.action({}));
      return;
    }
    if (
      !response?.data?.jwt ||
      !isValidAsYupSchema(response.data.jwt, shapeOfAuthenticateJWT)
    ) {
      yield put(requestLoginFail.action({ response }));
      return;
    }
    yield put(requestLoginSuccess.action(response.data));
  })
);
