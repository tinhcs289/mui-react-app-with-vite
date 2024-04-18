import { mockAdapter } from "@/http/axios-instances";
import { LINK } from "./constants";
import type { ApiReturns } from "./types";

export default function mock() {
  mockAdapter.onPut(LINK).reply(200, {
    message: "Profile updated!",
  } as ApiReturns);
}
