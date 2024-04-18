import { HttpRequestStatus } from "@/constants/http-request-status";
import type { UserProfile } from "@/types";

export type States = {
  data: UserProfile | null;
  getUserProfileRequestStatus: HttpRequestStatus;
  updateUserProfileRequestStatus: HttpRequestStatus;
};
