import { createCase } from "@/helpers/redux-helpers";
import { rootName } from "../states";
import type { States } from "../types";

const TYPE = `${rootName}/sessionTimeoutWarningShow`;
export const sessionTimeoutWarningShow = createCase<any, States>(
  TYPE,
  (_, states) => {
    return {
      ...states,
      isSessionTimeout: true,
    };
  }
);
