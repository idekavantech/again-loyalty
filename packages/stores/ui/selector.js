/**
 * The global state selectors
 */

import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectUi = (state) => state.ui || initialState;

const makeSelectSnackBarMessage = () =>
  createSelector(selectUi, (state) => state.snackBarMessage);

export { makeSelectSnackBarMessage };
