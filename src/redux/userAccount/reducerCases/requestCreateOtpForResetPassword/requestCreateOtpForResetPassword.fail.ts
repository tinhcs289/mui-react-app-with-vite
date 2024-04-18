import { HttpRequestStatus } from "@/constants/http-request-status";
import type { ReduxAction } from "@/helpers/redux-helpers";
import { createCase } from "@/helpers/redux-helpers";
import { actions as snackbar } from "@/redux/snackbar";
import { i18n } from "@/translation";
import { put, takeLatest } from "redux-saga/effects";
import { rootName } from "../../states";
import type { States } from "../../types";
import { clearStatusOfRequestCreateOtpForResetPassword } from "./requestCreateOtpForResetPassword.clear";

const TYPE = `${rootName}/requestCreateOtpForResetPassword_fail`;

export const requestCreateOtpForResetPasswordFail = createCase<any, States>(
  TYPE,
  (_, states) => {
    return {
      ...states,
      createOtpForResetPasswordRequestStatus: HttpRequestStatus.REQUESTFAIL,
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  takeLatest(TYPE, function* (_: ReduxAction<any>) {
    yield put(
      snackbar.pushMessageError({
        content: i18n.t("common:somethingWentWrong_pleaseTryAgainLater"),
      })
    );
    yield put(clearStatusOfRequestCreateOtpForResetPassword.action({}));
  })
);
export default requestCreateOtpForResetPasswordFail;
