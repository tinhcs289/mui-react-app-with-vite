import { HttpRequestStatus } from "@/constants/http-request-status";
import type { ReduxAction } from "@/helpers/redux-helpers";
import { createCase } from "@/helpers/redux-helpers";
import { put, takeLatest } from "redux-saga/effects";
import { rootName } from "../../states";
import type { States } from "../../types";
import { clearStatusOfRequestCreateOtpForResetPassword } from "./requestCreateOtpForResetPassword.clear";

const TYPE = `${rootName}/requestCreateOtpForResetPassword_success`;

export const requestCreateOtpForResetPasswordSuccess = createCase<any, States>(
  TYPE,
  (_, states) => {
    return {
      ...states,
      createOtpForResetPasswordRequestStatus: HttpRequestStatus.REQUESTSUCCESS,
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  takeLatest(TYPE, function* (_: ReduxAction<any>) {
    yield put(clearStatusOfRequestCreateOtpForResetPassword.action({}));
  })
);
