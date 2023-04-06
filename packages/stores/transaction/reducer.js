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
import { SET_TRANSACTION } from "./constants";

// The initial state of the App
export const initialState = {
  transaction: null,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case HYDRATE:
        // Attention! This will overwrite client state! Real apps should use proper reconciliation.
        return { ...state, ...action.payload.transaction };
      case SET_TRANSACTION:
        draft.transaction = action.data;
        break;
    }
  });

export default appReducer;
