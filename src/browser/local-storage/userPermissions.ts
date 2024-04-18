import { shapeOfUserPermissions } from "@/constants/auth";
import isValidAsYupArraySchema from "@/helpers/common-helpers/isValidAsYupArraySchema";
import { newLocalStorageItem } from "@/helpers/localstorage-helpers";
import type { Permission } from "@/types";

const userPermissions = newLocalStorageItem<Permission[]>({
  key: "userPermissions",
  validate: (value: Permission[] | null) =>
    isValidAsYupArraySchema(value, shapeOfUserPermissions),
});
export default userPermissions;
