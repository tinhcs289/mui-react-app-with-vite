import { mockAdapter } from "@/http/axios-instances";
import { LINK } from "./constants";
import type { ApiReturns } from "./types";

export default function mock() {
  mockAdapter.onGet(LINK).reply(200, {
    id: "3195af4f-88b5-44f2-8010-166490d22b9e",
    avatar:
      "https://media.doanhnghiepvn.vn/Images/Uploaded/Share/2022/08/22/Quynh-Kool-xinh-dep-the-nay-bao-sao-dan-nguoi-tinh-man-anh-deu-la-nam-than_1.jpg",
    username: "annv@gmail.com",
    displayname: "Nguyễn Văn An",
    firstName: "Nguyễn",
    middleName: "Văn",
    lastName: "An",
    language: "vi-VN",
  } as ApiReturns);
}
