import { SNACKBAR_VARIANT } from "@/constants/snackbar";
import Immutable from "seamless-immutable";
import { States } from "./types";

export const rootName = "snackbar";
const states = Immutable<States>({
  id: null,
  message: null,
  variant: SNACKBAR_VARIANT.DEFAULT,
});
export default states;
