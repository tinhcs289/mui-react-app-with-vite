import { HttpRequestStatus } from "@/constants/http-request-status";
import type { ReduxAction } from "@/helpers/redux-helpers";
import { createCase } from "@/helpers/redux-helpers";
import { put, takeLatest } from "redux-saga/effects";
import type { States } from "../../types";
import { rootName } from "../../states";
import { clearStatusOfRequestRegisterUserAccount } from "./requestRegisterUserAccount.clear";

const TYPE = `${rootName}/requestRegisterUserAccount_success`;

export const requestRegisterUserAccountSuccess = createCase<any, States>(
  TYPE,
  (_, states) => {
    return {
      ...states,
      registerUserAccountRequestStatus: HttpRequestStatus.REQUESTSUCCESS,
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  takeLatest(TYPE, function* (_: ReduxAction<any>) {
    yield put(clearStatusOfRequestRegisterUserAccount.action({}));
  })
);
