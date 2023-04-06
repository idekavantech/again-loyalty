/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from "immer";
import { HYDRATE } from "next-redux-wrapper";
import { DEFAULT_ACTION, SET_SNACK_BAR_MESSAGE } from "./constants";

// The initial state of the App
export const initialState = {
  snackBarMessage: {},
};
/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case HYDRATE:
        // Attention! This will overwrite client state! Real apps should use proper reconciliation.
        return { ...state, ...action.payload.ui };
      case DEFAULT_ACTION:
        break;
      case SET_SNACK_BAR_MESSAGE:
        draft.snackBarMessage = {
          message: action.message,
          type: action.messageType,
        };
    }
  });

export default appReducer;
