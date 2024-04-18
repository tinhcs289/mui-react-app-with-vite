import authentication from "@/browser/cookies/authentication";
import userPermissions from "@/browser/local-storage/userPermissions";
import userProfile from "@/browser/local-storage/userProfile";
import userRoles from "@/browser/local-storage/userRoles";
import { HttpRequestStatus } from "@/constants/http-request-status";
import Immutable from "seamless-immutable";
import type { States } from "./types";

export const rootName = "authentication";

const tokenInfo = authentication.get();
const policies = userPermissions.get();
const roles = userRoles.get();
const user = userProfile.get();

const states = Immutable<States>({
  token: tokenInfo || null,
  user: {
    id: "",
    username: "",
    displayname: "",
    firstName: "",
    middleName: "",
    lastName: "",
    avatar: "",
    email: "",
    phone: "",
    ...user,
  },
  roles: roles || [],
  policies: policies || [],
  loginRequestStatus: HttpRequestStatus.NONE,
  logoutRequestStatus: HttpRequestStatus.NONE,
  verifyTokenRequestStatus: HttpRequestStatus.NONE,
  refreshTokenRequestStatus: HttpRequestStatus.NONE,
});
export default states;
