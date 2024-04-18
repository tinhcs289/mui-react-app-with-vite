import { HttpRequestStatus } from "@/constants/http-request-status";
import type { ReduxAction } from "@/helpers/redux-helpers";
import { createCase } from "@/helpers/redux-helpers";
import { LoginApiReturns } from "@/http/common-api/authenticate/login";
import { actions as snackbar } from "@/redux/snackbar";
import { i18n } from "@/translation";
import type { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { rootName } from "../../states";
import type { States } from "../../types";
import { clearStatusOfRequestLogin } from "./requestLogin.clear";

const TYPE = `${rootName}/requestLogin_fail`;
type Payload = { response: AxiosResponse<LoginApiReturns> };
export const requestLoginFail = createCase<Payload, States>(
  TYPE,
  (_, states) => {
    return {
      ...(states as any),
      loginRequestStatus: HttpRequestStatus.REQUESTFAIL,
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  takeLatest(TYPE, function* (_: ReduxAction<Payload>) {
    yield put(
      snackbar.pushMessageError({
        content: i18n.t("common:somethingWentWrong_pleaseTryAgainLater"),
      })
    );
    yield put(clearStatusOfRequestLogin.action({}));
  })
);
