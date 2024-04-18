import { sessionTimeoutWarningHide } from "./sessionTimeoutWarningHide";
import { sessionTimeoutWarningShow } from "./sessionTimeoutWarningShow";

export const cases = [sessionTimeoutWarningHide, sessionTimeoutWarningShow];

export const actions = {
  sessionTimeoutWarningHide: sessionTimeoutWarningHide.action,
  sessionTimeoutWarningShow: sessionTimeoutWarningShow.action,
};
