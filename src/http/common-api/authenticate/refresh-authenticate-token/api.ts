import tryDo from "@/helpers/async-helpers/tryDo";
import { httpMock } from "@/http/axios-instances";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { stringify } from "qs";
import { IS_MOCK, LINK } from "./constants";
import { migrateResponseData } from "./migrate";
import mock from "./mock";
import type { ApiPayload, ApiReturns } from "./types";

if (IS_MOCK) mock();

async function apiMock(
  payload?: ApiPayload
): Promise<AxiosResponse<ApiReturns>> {
  return httpMock.get(
    `${LINK}?${stringify({
      refreshToken: payload?.refreshToken,
    })}`
  );
}

export default async function api(
  payload: ApiPayload,
  http: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<ApiReturns>> {
  if (IS_MOCK) {
    const res = await apiMock(payload);
    return res;
  }

  // const migratedPayload = migratePayload(payload as any);

  const [error, response] = await tryDo<AxiosResponse<any>>(
    http.get(
      `${LINK}?${stringify({
        refreshToken: payload?.refreshToken,
      })}`,
      config
    )
  );

  if (error) return error as unknown as AxiosResponse<ApiReturns>;
  if (!response) return response as unknown as AxiosResponse<ApiReturns>;

  // @ts-ignore
  response["originalData"] = response.data;
  const migratedData = migrateResponseData(response?.data) as ApiReturns;
  response.data = migratedData;
  return response;
}
