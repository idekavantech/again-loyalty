/**
 * The global state selectors
 */

import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectGlobal = (state) => state.global || initialState;

const makeSelectLoading = (name) =>
  createSelector(selectGlobal, (state) => state.isLoading[name || "general"]);

const makeSelectSnackBarMessage = () =>
  createSelector(selectGlobal, (state) => state.snackBarMessage);

const makeSelectVitrinFormInformation = (prop) =>
  createSelector(selectGlobal, (state) =>
    prop ? state.vitrinFormInformation[prop] : state.vitrinFormInformation
  );

const makeSelectVitrinGmv = () =>
  createSelector(selectGlobal, (state) => state.gmv);

const makeSelectDomainValid = () =>
  createSelector(selectGlobal, (state) => state.isDomainValid);

const makeSelectBusinesses = () =>
  createSelector(selectGlobal, (state) => state.businesses);

const makeSelectUploadedFile = () =>
  createSelector(selectGlobal, (state) => state.uploadedFile);

const makeSelectBusinessesCategories = () =>
  createSelector(selectGlobal, (state) => state.businessesCategories);

const makeSelectCategoryTemplates = () =>
  createSelector(selectGlobal, (state) => state.categoryTemplates);

const makeSelectTemplate = () =>
  createSelector(selectGlobal, (state) => state.template);

const makeSelectPackages = () =>
  createSelector(selectGlobal, (state) => state.packages);
const makeSelectBusinessCRMData = () =>
  createSelector(selectGlobal, (state) => state.businessCRMData);
const makeSelectTransaction = () =>
  createSelector(selectGlobal, (state) => state.transaction);
const makeSelectFormsDictionary = () =>
  createSelector(selectGlobal, (state) => state.formsDictionary);
const makeSelectBusiness = () =>
  createSelector(selectGlobal, (state) => state.business);

export {
  makeSelectFormsDictionary,
  makeSelectTransaction,
  makeSelectBusinessCRMData,
  makeSelectPackages,
  makeSelectTemplate,
  makeSelectCategoryTemplates,
  makeSelectBusinessesCategories,
  makeSelectBusinesses,
  makeSelectLoading,
  makeSelectSnackBarMessage,
  makeSelectVitrinFormInformation,
  makeSelectVitrinGmv,
  makeSelectDomainValid,
  makeSelectUploadedFile,
  makeSelectBusiness,
};
