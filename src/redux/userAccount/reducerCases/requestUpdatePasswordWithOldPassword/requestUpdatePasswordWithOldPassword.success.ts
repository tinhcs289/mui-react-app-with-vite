import { HttpRequestStatus } from "@/constants/http-request-status";
import type { ReduxAction } from "@/helpers/redux-helpers";
import { createCase } from "@/helpers/redux-helpers";
import { put, takeLatest } from "redux-saga/effects";
import { rootName } from "../../states";
import type { States } from "../../types";
import { clearStatusOfRequestUpdatePasswordWithOldPassword } from "./requestUpdatePasswordWithOldPassword.clear";

const TYPE = `${rootName}/requestUpdatePasswordWithOldPassword_success`;

export const requestUpdatePasswordWithOldPasswordSuccess = createCase<
  any,
  States
>(
  TYPE,
  (_, states) => {
    return {
      ...states,
      updatePasswordWithOldPasswordRequestStatus:
        HttpRequestStatus.REQUESTSUCCESS,
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  takeLatest(TYPE, function* (_: ReduxAction<any>) {
    yield put(clearStatusOfRequestUpdatePasswordWithOldPassword.action({}));
  })
);
