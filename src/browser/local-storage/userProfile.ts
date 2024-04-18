import { shapeOfUserProfile } from "@/constants/auth";
import isValidAsYupSchema from "@/helpers/common-helpers/isValidAsYupSchema";
import { newLocalStorageItem } from "@/helpers/localstorage-helpers";
import type { UserProfile } from "@/types";

const userProfile = newLocalStorageItem<UserProfile>({
  key: "userProfile",
  validate: (value: UserProfile | null) =>
    isValidAsYupSchema(value, shapeOfUserProfile),
});
export default userProfile;
