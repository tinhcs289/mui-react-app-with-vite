import { mockAdapter } from "@/http/axios-instances";
import { LINK } from "./constants";
import type { ApiReturns } from "./types";

export default function mock() {
  mockAdapter.onGet(LINK).reply(200, {
    message: "Valid token!",
  } as ApiReturns);
}
