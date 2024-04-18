import userDataStorage from "@/browser/local-storage/userDataStorage";
import { HttpRequestStatus } from "@/constants/http-request-status";
import type { ReduxAction } from "@/helpers/redux-helpers";
import { createCase } from "@/helpers/redux-helpers";
import { delay, put, takeLatest } from "redux-saga/effects";
import { rootName } from "../../states";
import type { States } from "../../types";
import { clearStatusOfRequestLogout } from "./requestLogout.clear";

const TYPE = `${rootName}/requestLogout_success`;

export const requestLogoutSuccess = createCase<any, States>(
  TYPE,
  (_, states) => {
    userDataStorage.clear();
    return {
      ...(states as any),
      user: null,
      token: null,
      logoutRequestStatus: HttpRequestStatus.REQUESTSUCCESS,
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  takeLatest(TYPE, function* (_: ReduxAction<any>) {
    yield delay(0);
    yield put(clearStatusOfRequestLogout.action({}));
  })
);
