/**
 * The global state selectors
 */

import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectUser = (state) => state.user || initialState;

const makeSelectUser = () => createSelector(selectUser, (state) => state.user);

const makeSelectInviter = () =>
  createSelector(selectUser, (state) => state.inviter);
const makeSelectToken = () =>
  createSelector(selectUser, (state) => state.token);

const makeSelectIsAuthenticated = () =>
  createSelector(selectUser, (state) => Boolean(state.user && state.user.id));

const makeSelectLoginCallBack = () =>
  createSelector(selectUser, (state) => state.loginCallBack);

const makeSelectAddresses = () =>
  createSelector(selectUser, (state) => state.addresses);
const makeSelectDefaultAddressID = () =>
  createSelector(selectUser, (state) => state.defaultAddressID);
const makeSelectedAddress = () =>
  createSelector(selectUser, (state) => state.selectedAddress);
const makeSelectedAddressInfo = () =>
  createSelector(selectUser, (state) => state.addressInfo);

const makeSelectWalletTransactions = () =>
  createSelector(selectUser, (state) => state.transactions);

const makeSelectAddressCallbackFunction = () =>
  createSelector(selectUser, (state) => state.addressCreateCallback);
export {
  makeSelectUser,
  makeSelectToken,
  makeSelectIsAuthenticated,
  makeSelectLoginCallBack,
  makeSelectAddresses,
  makeSelectedAddress,
  makeSelectedAddressInfo,
  makeSelectWalletTransactions,
  makeSelectInviter,
  makeSelectDefaultAddressID,
  makeSelectAddressCallbackFunction
};
