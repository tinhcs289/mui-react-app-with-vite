import { HttpRequestStatus } from "@/constants/http-request-status";
import type { ReduxAction } from "@/helpers/redux-helpers";
import { createCase } from "@/helpers/redux-helpers";
import { put, takeLatest } from "redux-saga/effects";
import { rootName } from "../../states";
import type { States } from "../../types";
import { clearStatusOfRequestActivateAccountWithOtp } from "./requestActivateAccountWithOtp.clear";

const TYPE = `${rootName}/requestActivateAccountWithOtp_success`;

export const requestActivateAccountWithOtpSuccess = createCase<any, States>(
  TYPE,
  (_, states) => {
    return {
      ...states,
      activateAccountWithOtpRequestStatus: HttpRequestStatus.REQUESTSUCCESS,
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  takeLatest(TYPE, function* (_action: ReduxAction<any>) {
    yield put(clearStatusOfRequestActivateAccountWithOtp.action({}));
  })
);
