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
  ADDRESS_CREATED,
  SELECT_ADDRESS,
  SET_ADDRESS_INFO,
  SET_ADDRESSES,
  SET_INVITER,
  SET_INVITATION_DATA,
  SET_MEMBERSHIP_TRANSACTIONS,
  SET_AUTHORIZATION,
} from "./constants";

// The initial state of the App
export const initialState = {
  user: null,
  token: null,
  loginCallBack: "",
  addresses: null,
  selectedAddress: {},
  addressInfo: {
    latitude: null,
    longitude: null,
    name: "",
    phone: "",
    address: "",
  },
  transactions: [],
  inviter: {},
  addressCreateCallback: null,
  authorization: "",
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case HYDRATE:
        // Attention! This will overwrite client state! Real apps should use proper reconciliation.
        return { ...state, ...action.payload.user };
      case SET_AUTHORIZATION:
        draft.authorization = action.data;
        break;
      case SET_USER:
        draft.user = { ...state.user, ...action.data.user };
        if (action.data.user.token) {
          draft.token = action.data.user.token;
        }
        break;
      case SET_INVITER:
        draft.inviter = action.data;
        break;
      case SET_MEMBERSHIP_TRANSACTIONS:
        draft.transactions = action.data;
        break;
      case SET_INVITATION_DATA:
        draft.user = {
          ...draft.user,
          ...action.data.user,
          giftCredit: action.data.gift_credit,
          walletCredit: action.data.wallet_credit,
          inviteCode: action.data.invite_link_id,
        };
        break;
      case SET_LOGIN_CALLBACK:
        draft.loginCallBack = action.data;
        break;
      case SET_ADDRESSES:
        draft.addresses = action.data.addresses;
        draft.defaultAddressID = action.data.defaultAddressId;
        draft.user = {
          ...draft.user,
          has_address: Boolean(action.data.addresses?.length),
        };
        break;
      case SELECT_ADDRESS:
        draft.selectedAddress = action.data;
        break;
      case SET_ADDRESS_INFO:
        draft.addressInfo = { ...draft.addressInfo, ...action.data };
        break;
      case ADDRESS_CREATED:
        draft.selectedAddress = action.data;
        if (draft.addresses) draft.addresses.unshift(action.data);
        else draft.addresses = [action.data];
        draft.addressInfo = {
          latitude: null,
          longitude: null,
          name: "",
          phone: "",
          address: "",
        };
        break;
    }
  });

export default appReducer;
