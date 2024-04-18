import { requestUpdateUserProfile } from "./requestUpdateUserProfile";
import { clearStatusOfRequestUpdateUserProfile } from "./requestUpdateUserProfile.clear";
import { requestUpdateUserProfileFail } from "./requestUpdateUserProfile.fail";
import { requestUpdateUserProfileSuccess } from "./requestUpdateUserProfile.success";

export type { RequestUpdateUserProfilePayload } from "./requestUpdateUserProfile";

export const cases = [
  clearStatusOfRequestUpdateUserProfile,
  requestUpdateUserProfileFail,
  requestUpdateUserProfileSuccess,
  requestUpdateUserProfile,
];

export const actions = {
  clearStatusOfRequestUpdateUserProfile:
    clearStatusOfRequestUpdateUserProfile.action,
  requestUpdateUserProfileFail: requestUpdateUserProfileFail.action,
  requestUpdateUserProfileSuccess: requestUpdateUserProfileSuccess.action,
  requestUpdateUserProfile: requestUpdateUserProfile.action,
};
