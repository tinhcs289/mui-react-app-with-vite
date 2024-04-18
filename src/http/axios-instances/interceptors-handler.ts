import authentication from "@/browser/cookies/authentication";
import { i18nLanguage } from "@/browser/local-storage/acceptLanguage";
import isRefreshingAccessToken from "@/browser/local-storage/isRefreshingAccessToken";
import { refreshAuthenticateTokenApi } from "@/http/common-api/authenticate/refresh-authenticate-token";
import { reduxStore } from "@/redux";
import { actions as sessionAction } from "@/redux/session";
import type { AxiosError } from "axios";
import type { AxiosInterceptorsHandler } from "./types";

function logError(errorType: string, error?: AxiosError) {
  console.log(errorType, error);
  const errorWhenCallUrl = error?.request?.responseURL;
  if (!errorWhenCallUrl) {
    console.log(errorType, error);
  } else {
    console.log(`${errorType} when request to: ${errorWhenCallUrl}`, error);
  }
}

export const handler: AxiosInterceptorsHandler = {
  onRefreshToken: refreshAuthenticateTokenApi,
  isRefreshing: isRefreshingAccessToken.get() || false,
  setIsRefresingInOtherTabs: (Is) => {
    isRefreshingAccessToken.set(Is, true);
  },
  getAccessToken: () => {
    return authentication.get()?.accessToken;
  },
  getRefreshToken: () => {
    return authentication.get()?.refreshToken;
  },
  onUpdateAuthentication: (auth: any) => {
    return authentication.set(auth);
  },
  getLanguage: () => {
    return i18nLanguage.get();
  },
  onForceLogout: () => {
    //TODO [logout] logout immediately or show waring then logout by user click
    reduxStore.dispatch(sessionAction.sessionTimeoutWarningShow({}));
  },
  onRefreshTokenFail: () => {
    reduxStore.dispatch(sessionAction.sessionTimeoutWarningShow({}));
  },
  onNetworkError: (error) => {
    logError("network error", error);
  },
  onTimeOut: (error) => {
    logError("request timeout", error);
  },
  onCORS: (error) => {
    logError("CORS", error);
  },
  onInternalServerError: (error) => {
    logError("internal server error", error);
  },
  onBadRequest: (error) => {
    logError("bad request", error);
  },
  onNotFound: (error) => {
    logError("resources not found", error);
  },
};

isRefreshingAccessToken.onChange((_event, detail) => {
  if (typeof detail?.value !== "boolean") return;
  handler.isRefreshing = detail.value;
});
