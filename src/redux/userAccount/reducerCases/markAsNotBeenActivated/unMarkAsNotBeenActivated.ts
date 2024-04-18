import { createCase } from "@/helpers/redux-helpers";
import { rootName } from "../../states";
import type { States } from "../../types";

const TYPE = `${rootName}/unMarkAsNotBeenActivated`;

export const unMarkAsNotBeenActivated = createCase<any, States>(
  TYPE,
  (_, states) => {
    return {
      ...states,
      hasNotBeenActivated: false,
      accoutNeedToBeActivated: null,
    };
  }
);
