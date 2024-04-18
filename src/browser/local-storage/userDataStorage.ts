import authentication from "@/browser/cookies/authentication";
import type { Authentication } from "@/types";
import omit from "lodash/omit";
import { default as authenticationInLocalStorage } from "./authentication";
import userPermissions from "./userPermissions";
import userProfile from "./userProfile";
import userRoles from "./userRoles";

const userDataStorage = {
  set: (data: Authentication) => {
    const { jwt, user } = data;
    // storage user's profile
    userProfile.set(omit(user, ["roles", "policies"]));
    // storage permissions/policies
    userPermissions.set(user?.policies instanceof Array ? user.policies : []);
    // storage roles
    userRoles.set(user?.roles instanceof Array ? user.roles : []);
    // storage JWT data
    authentication.set(jwt);
    authenticationInLocalStorage.set(jwt, true);
  },
  clear: () => {
    // storage user's profile
    userProfile.clear();
    // clear permissions/policies
    userPermissions.clear();
    // clear roles
    userRoles.clear();
    // clear JWT data
    authentication.clear();
    authenticationInLocalStorage.set(null, true);
  },
};
export default userDataStorage;
