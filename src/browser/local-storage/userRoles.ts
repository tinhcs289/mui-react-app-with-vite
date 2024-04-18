import { shapeOfUserRoles } from "@/constants/auth";
import isValidAsYupArraySchema from "@/helpers/common-helpers/isValidAsYupArraySchema";
import { newLocalStorageItem } from "@/helpers/localstorage-helpers";
import type { Roles } from "@/types";

const userRoles = newLocalStorageItem<Roles[]>({
  key: "userRoles",
  validate: (value: Roles[] | null) =>
    isValidAsYupArraySchema(value, shapeOfUserRoles),
});
export default userRoles;
