import userProfile from "@/browser/local-storage/userProfile";
import { HttpRequestStatus } from "@/constants/http-request-status";
import Immutable from "seamless-immutable";
import type { States } from "./types";

const profile = userProfile.get();
export const rootName = "userProfile";
const states = Immutable<States>({
  data: {
    id: "",
    username: "",
    displayname: "",
    firstName: "",
    middleName: "",
    lastName: "",
    avatar: "",
    email: "",
    phone: "",
    ...profile,
  },
  getUserProfileRequestStatus: HttpRequestStatus.NONE,
  updateUserProfileRequestStatus: HttpRequestStatus.NONE,
});
export default states;
