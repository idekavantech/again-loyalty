import { SET_SNACK_BAR_MESSAGE } from "./constants";

export function setSnackBarMessage(message, messageType) {
  return {
    type: SET_SNACK_BAR_MESSAGE,
    message,
    messageType,
  };
}
