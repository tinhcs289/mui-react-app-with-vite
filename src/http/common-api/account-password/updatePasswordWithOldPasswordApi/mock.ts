import type { ApiReturns } from "./types";
import { LINK } from "./constants";
import { mockAdapter } from "@/http/axios-instances";
export default function mock() {
  mockAdapter.onPut(LINK).reply(200, {
    message: "Password updated!",
  } as ApiReturns);
}
