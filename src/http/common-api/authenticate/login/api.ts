import tryDo from "@/helpers/async-helpers/tryDo";
import { http, httpMock } from "@/http/axios-instances";
import {
  getUserProfileApi,
  type GetUserProfileApiParams,
  type GetUserProfileApiReturns,
} from "@/http/common-api/user-profile/getUserProfileApi";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { IS_MOCK, LINK } from "./constants";
import { migratePayload, migrateResponseData } from "./migrate";
import mock from "./mock";
import { ApiPayload, ApiReturns } from "./types";

if (IS_MOCK) mock();

async function apiMock(
  payload: ApiPayload,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<ApiReturns>> {
  const response = await httpMock.post(LINK, payload, config);
  // @ts-ignore
  response["originalData"] = response.data;
  const getProfilePayload: GetUserProfileApiParams = {
    id: `${response.data.user.id}`,
    accessToken: response.data.jwt.accessToken,
  };
  const response2 = await getUserProfileApi(getProfilePayload, config);
  response.data = {
    ...response.data,
    user: { ...response.data.user, ...response2.data },
  };
  return response;
}

export default async function api(
  payload: ApiPayload,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<ApiReturns>> {
  if (IS_MOCK) {
    const res = await apiMock(payload, config);
    return res;
  }

  // request Login
  const migratedPayload = migratePayload(payload);

  const [error, response] = await tryDo<AxiosResponse>(
    http.post(LINK, migratedPayload, config)
  );

  if (error) return error as AxiosResponse<ApiReturns>;
  if (!response) return response as unknown as AxiosResponse<ApiReturns>;
  if (!response?.data) return response as AxiosResponse<ApiReturns>;

  // @ts-ignore
  response["originalData"] = response.data;
  const migratedData = migrateResponseData(response?.data);
  response.data = migratedData;
  if (!migratedData?.user?.id || !migratedData?.jwt?.accessToken)
    return response;

  // get User Profile
  const getProfilePayload: GetUserProfileApiParams = {
    id: `${migratedData.user.id}`,
    accessToken: migratedData.jwt.accessToken,
  };

  const [error2, profileData] = await tryDo<
    AxiosResponse<GetUserProfileApiReturns>
  >(getUserProfileApi(getProfilePayload, config));

  if (error2) return response;
  if (!profileData) return response;
  if (!profileData?.data) return response;

  response.data = {
    ...migratedData,
    user: { ...migratedData.user, ...profileData.data },
  };

  return response as AxiosResponse<ApiReturns>;
}
