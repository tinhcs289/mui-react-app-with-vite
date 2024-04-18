import { clearMessageState } from "./clearMessageState";
import { pushMessage } from "./pushMessage";
import { pushMessageError } from "./pushMessageError";
import { pushMessageInfo } from "./pushMessageInfo";

export type { PushMessagePayload } from "./pushMessage";
export type { PushMessageErrorPayload } from "./pushMessageError";
export type { PushMessageInfoPayload } from "./pushMessageInfo";

export const cases = [
  pushMessage,
  pushMessageError,
  pushMessageInfo,
  clearMessageState,
];

export const actions = {
  pushMessage: pushMessage.action,
  pushMessageInfo: pushMessageInfo.action,
  pushMessageError: pushMessageError.action,
  clearMessageState: clearMessageState.action,
};
