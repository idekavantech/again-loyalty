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
import {
  SET_USER,
  SET_LOGIN_CALLBACK,
  SET_TEMP_PHONE,
  SET_VERIFY_CODE_ERROR,
} from "./constants";

// The initial state of the App
export const initialState = {
  user: null,
  token: null,
  loginCallBack: () => {},
  tempPhone: null,
  verifyCodeError: null,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case HYDRATE:
        // Attention! This will overwrite client state! Real apps should use proper reconciliation.
        return { ...state, ...action.payload.user };
      case SET_USER:
        draft.user = action.data.user;
        draft.verifyCodeError = null;
        break;
      case SET_VERIFY_CODE_ERROR:
        draft.verifyCodeError = action.payload;
        break;
      case SET_TEMP_PHONE:
        draft.tempPhone = action.data;
        draft.verifyCodeError = null;
        break;
      case SET_LOGIN_CALLBACK:
        draft.loginCallBack = action.data;
        break;
    }
  });

export default appReducer;
