import { mockAdapter } from "@/http/axios-instances";
import { LINK } from "./constants";
import type { ApiReturns } from "./types";
export default function mock() {
  mockAdapter.onPost(LINK).reply(200, {
    message:
      "https://media.doanhnghiepvn.vn/Images/Uploaded/Share/2022/08/22/Quynh-Kool-xinh-dep-the-nay-bao-sao-dan-nguoi-tinh-man-anh-deu-la-nam-than_1.jpg",
  } as ApiReturns);
}
