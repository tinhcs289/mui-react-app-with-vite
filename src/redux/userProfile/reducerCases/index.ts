import {
  actions as actionsOfRequestGetUserProfile,
  cases as casesOfRequestGetUserProfile,
} from "./requestGetUserProfile";
import {
  actions as actionsOfRequestUpdateUserProfile,
  cases as casesOfRequestUpdateUserProfile,
} from "./requestUpdateUserProfile";

export type {
  RequestGetUserProfilePayload,
  RequestGetUserProfileSuccessPayload,
} from "./requestGetUserProfile";

export type { RequestUpdateUserProfilePayload } from "./requestUpdateUserProfile";

export const cases = [
  ...casesOfRequestGetUserProfile,
  ...casesOfRequestUpdateUserProfile,
];

export const actions = {
  ...actionsOfRequestGetUserProfile,
  ...actionsOfRequestUpdateUserProfile,
};
