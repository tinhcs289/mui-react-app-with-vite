import { HttpRequestStatus } from "@/constants/http-request-status";
import callHttp from "@/helpers/async-helpers/callHttp";
import tryDo from "@/helpers/async-helpers/tryDo";
import isOkWithData from "@/helpers/http-request-helpers/isOkWithData";
import uploadFileApi from "@/http/common-api/upload-file/uploadFileApi";
import type { ApiRequestStatus } from "@/types";
import type { ApiPayload, ApiReturns } from "./types";

export type UploadFileResponse = {
  bin?: File;
  source?: string;
  requestStatus?: ApiRequestStatus;
};

export default async function api(payload: ApiPayload): Promise<ApiReturns> {
  const [errors, filesData] = await tryDo(async () => {
    const results = await Promise.all(
      Array.from(payload.files).map((file) =>
        (async () => {
          const fileRes: UploadFileResponse = {
            bin: file,
            requestStatus: HttpRequestStatus.REQUESTING,
          };
          const [err, res] = await callHttp(
            uploadFileApi({ folder: payload.folder, file })
          ).waitFor(isOkWithData);
          if (!!err || !res?.message) {
            fileRes.requestStatus = HttpRequestStatus.REQUESTFAIL;
            fileRes.source = undefined;
            return fileRes;
          }
          fileRes.source = res.message;
          fileRes.requestStatus = HttpRequestStatus.REQUESTSUCCESS;
          return fileRes;
        })()
      )
    );
    return results.filter(
      (rs) =>
        rs?.requestStatus === HttpRequestStatus.REQUESTSUCCESS && !!rs?.source
    );
  });
  if (!!errors || !filesData) return [];
  return filesData;
}
