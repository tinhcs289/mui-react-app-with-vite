import userDataStorage from "@/browser/local-storage/userDataStorage";
import { HttpRequestStatus } from "@/constants/http-request-status";
import type { ReduxAction } from "@/helpers/redux-helpers";
import { createCase } from "@/helpers/redux-helpers";
import type { Authentication } from "@/types";
import omit from "lodash/omit";
import { delay, put, takeLatest } from "redux-saga/effects";
import { rootName } from "../../states";
import type { States } from "../../types";
import { clearStatusOfRequestLogin } from "./requestLogin.clear";

export type RequestLoginSuccessPayload = Authentication;

const TYPE = `${rootName}/requestLogin_success`;

export const requestLoginSuccess = createCase<
  RequestLoginSuccessPayload,
  States
>(
  TYPE,
  (action, states) => {
    const { jwt, user } = action.payload;
    userDataStorage.set(action.payload);
    return {
      ...(states as any),
      user: omit(user, ["roles", "policies"]),
      policies: user?.policies || [],
      roles: user?.roles || [],
      token: jwt,
      loginRequestStatus: HttpRequestStatus.REQUESTSUCCESS,
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  takeLatest(TYPE, function* (_: ReduxAction<any>) {
    yield delay(0);
    yield put(clearStatusOfRequestLogin.action({}));
  })
);
