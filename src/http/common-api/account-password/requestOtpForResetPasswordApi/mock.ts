import type { ApiReturns } from "./types";
import { LINK } from "./constants";
import { mockAdapter } from "@/http/axios-instances";
export default function mock() {
  mockAdapter.onPost(LINK).reply(200, {
    message: "OTP sent!",
  } as ApiReturns);
}
