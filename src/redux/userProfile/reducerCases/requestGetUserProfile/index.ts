import { requestGetUserProfile } from "./requestGetUserProfile";
import { clearStatusOfRequestGetUserProfile } from "./requestGetUserProfile.clear";
import { requestGetUserProfileFail } from "./requestGetUserProfile.fail";
import { requestGetUserProfileSuccess } from "./requestGetUserProfile.success";

export type { RequestGetUserProfilePayload } from "./requestGetUserProfile";
export type { RequestGetUserProfileSuccessPayload } from "./requestGetUserProfile.success";

export const cases = [
  clearStatusOfRequestGetUserProfile,
  requestGetUserProfileFail,
  requestGetUserProfileSuccess,
  requestGetUserProfile,
];

export const actions = {
  clearStatusOfRequestGetUserProfile: clearStatusOfRequestGetUserProfile.action,
  requestGetUserProfileFail: requestGetUserProfileFail.action,
  requestGetUserProfileSuccess: requestGetUserProfileSuccess.action,
  requestGetUserProfile: requestGetUserProfile.action,
};
