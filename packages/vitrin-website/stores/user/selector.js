/**
 * The global state selectors
 */

import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectUser = (state) => state.user || initialState;

const makeSelectUser = () => createSelector(selectUser, (state) => state.user);

const makeSelectToken = () =>
  createSelector(selectUser, (state) => state.token);

const makeSelectIsAuthenticated = () =>
  createSelector(selectUser, (state) => Boolean(state.user && state.user.id));

const makeSelectLoginCallBack = () =>
  createSelector(selectUser, (state) => state.loginCallBack);

const makeSelectTempPhone = () =>
  createSelector(selectUser, (state) => state.tempPhone);

const makeSelectVerifyCodeError = () =>
  createSelector(selectUser, (state) => state.verifyCodeError);

export {
  makeSelectTempPhone,
  makeSelectUser,
  makeSelectToken,
  makeSelectIsAuthenticated,
  makeSelectLoginCallBack,
  makeSelectVerifyCodeError
};
