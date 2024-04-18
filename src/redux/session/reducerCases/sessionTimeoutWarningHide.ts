import { createCase } from "@/helpers/redux-helpers";
import { rootName } from "../states";
import type { States } from "../types";

const TYPE = `${rootName}/sessionTimeoutWarningHide`;

export const sessionTimeoutWarningHide = createCase<any, States>(
  TYPE,
  (_, states) => {
    return {
      ...states,
      isSessionTimeout: false,
    };
  }
);
