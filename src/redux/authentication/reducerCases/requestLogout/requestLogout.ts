import { HttpRequestStatus } from "@/constants/http-request-status";
import type { ReduxAction } from "@/helpers/redux-helpers";
import { createCase } from "@/helpers/redux-helpers";
import {
  logoutApi,
  type LogoutApiReturns,
} from "@/http/common-api/authenticate/logout";
import type { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { rootName } from "../../states";
import type { States } from "../../types";
import { requestLogoutFail } from "./requestLogout.fail";
import { requestLogoutSuccess } from "./requestLogout.success";

const TYPE = `${rootName}/requestLogout`;

export const requestLogout = createCase<any, States>(
  TYPE,
  (_, states) => {
    return {
      ...(states as any),
      logoutRequestStatus: HttpRequestStatus.REQUESTING,
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  takeLatest(TYPE, function* (_: ReduxAction<any>) {
    const response = (yield logoutApi()) as AxiosResponse<LogoutApiReturns>;
    if (response?.status !== 200) {
      yield put(requestLogoutFail.action({}));
      return;
    }
    yield put(requestLogoutSuccess.action({}));
  })
);
