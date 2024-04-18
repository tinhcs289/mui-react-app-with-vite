import tryDo from "@/helpers/async-helpers/tryDo";
import { http, httpMock } from "@/http/axios-instances";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { IS_MOCK, LINK } from "./constants";
import { migratePayload, migrateResponseData } from "./migrate";
import mock from "./mock";
import { ApiPayload, ApiReturns } from "./types";

if (IS_MOCK) mock();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function apiMock(_?: ApiPayload): Promise<AxiosResponse<ApiReturns>> {
  return httpMock.post(LINK);
}

export default async function api(
  payload?: ApiPayload,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<ApiReturns>> {
  if (IS_MOCK) {
    const res = await apiMock(payload);
    return res;
  }

  const migratedPayload = migratePayload(payload as any);

  const [error, response] = await tryDo<AxiosResponse<any>>(
    http.post(LINK, migratedPayload, config)
  );

  if (error) return error as unknown as AxiosResponse<ApiReturns>;
  if (!response) return response as unknown as AxiosResponse<ApiReturns>;

  // @ts-ignore
  response["originalData"] = response.data;
  const migratedData = migrateResponseData(response?.data) as ApiReturns;
  response.data = migratedData;
  return response;
}
