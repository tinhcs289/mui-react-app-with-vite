import { HttpRequestStatus } from "@/constants/http-request-status";
import type {
  AuthenticationJWT,
  AuthenticationUserInfo,
  UserProfile,
} from "@/types";

export type States = {
  token: AuthenticationJWT | null;
  user: UserProfile | null;
  roles: Required<AuthenticationUserInfo["roles"]> | null;
  policies: Required<AuthenticationUserInfo["policies"]> | null;
  loginRequestStatus: HttpRequestStatus;
  logoutRequestStatus: HttpRequestStatus;
  verifyTokenRequestStatus: HttpRequestStatus;
  refreshTokenRequestStatus: HttpRequestStatus;
};
