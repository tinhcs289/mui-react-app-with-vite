import { shapeOfAuthenticateJWT } from "@/constants/auth";
import isValidAsYupSchema from "@/helpers/common-helpers/isValidAsYupSchema";
import { newCookieItem } from "@/helpers/cookie-helpers";
import type { AuthenticationJWT } from "@/types";

const authentication = newCookieItem<AuthenticationJWT>({
  key: "cookie:authentication",
  validate: (value: AuthenticationJWT | null) =>
    isValidAsYupSchema(value, shapeOfAuthenticateJWT),
});
export default authentication;
