import { shapeOfAuthenticateJWT } from "@/constants/auth";
import isValidAsYupSchema from "@/helpers/common-helpers/isValidAsYupSchema";
import { newLocalStorageListenableItem } from "@/helpers/localstorage-helpers";
import type { AuthenticationJWT } from "@/types";
/**
 * @deprecated authentication was stored in browser cookie, for common action, use `@/browser/cookies/authentication`.
 * @description this key was only used for sync between tabs
 */
const authentication = newLocalStorageListenableItem<AuthenticationJWT>({
  key: "authentication",
  validate: (value: AuthenticationJWT | null) =>
    isValidAsYupSchema(value, shapeOfAuthenticateJWT),
});
export default authentication;
