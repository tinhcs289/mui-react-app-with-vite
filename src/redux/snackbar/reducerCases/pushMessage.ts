import { SNACKBAR_VARIANT } from "@/constants/snackbar";
import { createCase } from "@/helpers/redux-helpers";
import newGuid from "@/helpers/string-helpers/newGuid";
import { rootName } from "../states";
import type { States } from "../types";

export type PushMessagePayload = {
  content: string;
  variant: `${SNACKBAR_VARIANT}`;
};
const TYPE = `${rootName}/pushMessage`;
export const pushMessage = createCase<PushMessagePayload, States>(
  TYPE,
  (action, state) => {
    const { content, variant } = action.payload;
    return {
      ...state,
      id: newGuid(),
      message: content,
      variant: variant,
    };
  }
);
