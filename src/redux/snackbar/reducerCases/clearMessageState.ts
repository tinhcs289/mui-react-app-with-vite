import { SNACKBAR_VARIANT } from "@/constants/snackbar";
import { createCase } from "@/helpers/redux-helpers";
import { rootName } from "../states";
import type { States } from "../types";

const TYPE = `${rootName}/clearMessageState`;
export const clearMessageState = createCase<any, States>(TYPE, (_, states) => {
  return {
    ...states,
    id: null,
    message: null,
    variant: SNACKBAR_VARIANT.DEFAULT,
  };
});
