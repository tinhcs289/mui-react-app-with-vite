import { SNACKBAR_VARIANT } from "@/constants/snackbar";
import { createCase } from "@/helpers/redux-helpers";
import newGuid from "@/helpers/string-helpers/newGuid";
import { rootName } from "../states";
import type { States } from "../types";

export type PushMessageErrorPayload = { content: string };
const TYPE = `${rootName}/pushMessageError`;
export const pushMessageError = createCase<PushMessageErrorPayload, States>(
  TYPE,
  (action, state) => {
    const { content } = action.payload;
    return {
      ...state,
      id: newGuid(),
      message: content,
      variant: SNACKBAR_VARIANT.ERROR,
    };
  }
);
