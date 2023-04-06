/**
 * The global state selectors
 */

import { createSelector } from "reselect";
import { GLOBAL_LOADING_TYPE } from "./constants";
import { initialState } from "./reducer";

const selectGlobal = (state) => state.global || initialState;

const makeSelectLoading = (name = GLOBAL_LOADING_TYPE) =>
  createSelector(selectGlobal, (globalState) => globalState.loading[name]);

const makeSelectReportsLoading = () =>
  createSelector(selectGlobal, (globalState) => globalState.reportsLoading);

const makeSelectUploadProgress = () =>
  createSelector(selectGlobal, (globalState) => globalState.uploadProgress);

const makeSelectInitLoading = () =>
  createSelector(selectGlobal, (globalState) => globalState.initLoading);

const makeSelectUploadedFile = () =>
  createSelector(selectGlobal, (globalState) => globalState.uploadedFile);

const makeSelectUploadedFiles = () =>
  createSelector(
    selectGlobal,
    (globalState) => globalState.multipleUploadedFiles
  );
const makeSelectBusinesses = () =>
  createSelector(selectGlobal, (state) => state.businesses);

const makeSelectError = () =>
  createSelector(selectGlobal, (globalState) => globalState.error);
const makeSelectMessage = () =>
  createSelector(selectGlobal, (globalState) => globalState.message);
export {
  makeSelectInitLoading,
  makeSelectUploadedFiles,
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectUploadedFile,
  makeSelectUploadProgress,
  makeSelectReportsLoading,
  makeSelectMessage,
  makeSelectBusinesses,
};
