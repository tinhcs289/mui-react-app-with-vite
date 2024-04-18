import { createCase } from "@/helpers/redux-helpers";
import { rootName } from "../../states";
import type { States } from "../../types";

export type MarkAsNotBeenActivatedPayload = { userAccount: string };

const TYPE = `${rootName}/markAsNotBeenActivated`;

export const markAsNotBeenActivated = createCase<
  MarkAsNotBeenActivatedPayload,
  States
>(TYPE, (action, states) => {
  const { userAccount } = action.payload;
  return {
    ...states,
    hasNotBeenActivated: true,
    accoutNeedToBeActivated: userAccount,
  };
});
