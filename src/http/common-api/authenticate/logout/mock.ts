import { mockAdapter } from "@/http/axios-instances";
import type { ApiReturns } from "./types";
import { LINK } from "./constants";

export default function mock() {
  mockAdapter.onPost(LINK).reply(200, {
    message: "signed out!",
  } as ApiReturns);
}
