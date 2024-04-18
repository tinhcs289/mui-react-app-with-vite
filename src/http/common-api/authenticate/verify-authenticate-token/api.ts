import tryDo from "@/helpers/async-helpers/tryDo";
import { http, httpMock } from "@/http/axios-instances";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { IS_MOCK, LINK } from "./constants";
import { migrateResponseData } from "./migrate";
import mock from "./mock";
import { ApiPayload, ApiReturns } from "./types";

if (IS_MOCK) mock();

async function apiMock(
  payload?: ApiPayload
): Promise<AxiosResponse<ApiReturns>> {
  return !payload?.accessToken
    ? httpMock.get(LINK)
    : httpMock.get(LINK, {
        headers: { Authorization: `Bearer ${payload.accessToken}` },
      });
}

export default async function api(
  payload?: ApiPayload,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<ApiReturns>> {
  if (IS_MOCK) {
    const res = await apiMock(payload);
    return res;
  }

  const requestConfig: AxiosRequestConfig = { ...config };
  if (!!payload?.accessToken) {
    requestConfig.headers = {
      ...requestConfig.headers,
      Authorization: `Bearer ${payload.accessToken}`,
    };
  }

  const [error, response] = await tryDo<AxiosResponse<any>>(
    http.get(LINK, config)
  );

  if (error) return error as unknown as AxiosResponse<ApiReturns>;
  if (!response) return response as unknown as AxiosResponse<ApiReturns>;

  // @ts-ignore
  response["originalData"] = response.data;
  const migratedData = migrateResponseData(response?.data) as ApiReturns;
  response.data = migratedData;
  return response;
}
