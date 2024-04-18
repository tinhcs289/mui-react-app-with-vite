import Immutable from "seamless-immutable";
import type { States } from "./types";

export const rootName = "session";

const states = Immutable<States>({
  isSessionTimeout: false,
  isSessionChange: false,
  isSessionChangeToLoggedIn: false,
  isSessionChangeToLoggedOut: false,
});
export default states;
