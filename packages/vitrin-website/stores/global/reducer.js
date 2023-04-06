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
import nProgress from "nprogress";
import {
  SET_SNACK_BAR_MESSAGE,
  START_LOADING,
  STOP_LOADING,
  UPDATE_VITRIN_FORM,
  UPDATE_TOTAL_GMV,
  IS_SITE_DOMAIN_VALID,
  SET_USER_BUSINESSES,
  UPLOAD_REQUEST,
  UPLOAD_PROGRESS,
  FILE_UPLOADED,
  UPLOAD_REQUEST_FINISHED,
  SET_BUSINESSES_CATEGORIES,
  SET_CATEGORY_TEMPLATES,
  SET_TEMPLATE,
  SET_PACKAGES,
  SET_VITRIN_CRM_DATA,
  SET_TRANSACTION,
  SET_FORMS_DICTIONARY,
  SET_BUSINESS,
} from "./constants";

export const initialState = {
  isLoading: {
    general: false,
  },
  transaction: null,
  snackBarMessage: {},
  vitrinFormInformation: {},
  gmv: "101327196240",
  isDomainValid: true,
  businesses: null,
  uploadStarted: false,
  uploadProgress: null,
  uploadedFile: null,
  multipleUploadedFiles: [],
  businessesCategories: null,
  categoryTemplates: null,
  template: null,
  packages: null,
  businessCRMData: null,
  formsDictionary: null,
  business:null
};
const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case HYDRATE:
        // Attention! This will overwrite client state! Real apps should use proper reconciliation.
        return { ...state, ...action.payload.global };

      case SET_FORMS_DICTIONARY:
        draft.formsDictionary = {
          ...state.formsDictionary,
          [action.data.id]: action.data,
        };
        break;
      case START_LOADING:
        nProgress.start();
        draft.isLoading[action.data.name || "general"] = true;
        break;
      case STOP_LOADING:
        nProgress.done();
        draft.isLoading[action.data.name || "general"] = false;
        break;
      case SET_SNACK_BAR_MESSAGE:
        draft.snackBarMessage = {
          message: action.message,
          type: action.messageType,
        };
        break;
      case SET_USER_BUSINESSES:
        draft.businesses = action.data;
        break;
      case UPDATE_VITRIN_FORM:
        draft.vitrinFormInformation = {
          ...state.vitrinFormInformation,
          ...action.data,
        };

        break;
      case UPDATE_TOTAL_GMV:
        draft.gmv = action.data;
        break;
      case IS_SITE_DOMAIN_VALID:
        draft.isDomainValid = action.data;
        break;
      case UPLOAD_REQUEST:
        draft.uploadStarted = true;
        break;
      case UPLOAD_PROGRESS:
        draft.uploadProgress = action.payload;
        break;
      case FILE_UPLOADED:
        draft.uploadedFile = action.data;
        draft.multipleUploadedFiles.unshift(action.data);
        break;
      case UPLOAD_REQUEST_FINISHED:
        draft.uploadStarted = false;
        break;
      case SET_BUSINESSES_CATEGORIES:
        draft.businessesCategories = action.data;
        break;
      case SET_CATEGORY_TEMPLATES:
        draft.categoryTemplates = action.data;
        break;
      case SET_TEMPLATE:
        draft.template = action.data;
      case SET_PACKAGES:
        draft.packages = action.data;
      case SET_VITRIN_CRM_DATA:
        draft.businessCRMData = action.data;
        break;
      case SET_TRANSACTION:
        draft.transaction = action.data;
        break;
       case SET_BUSINESS :
         draft.business = action.data;
         break; 
    }
  });

export default appReducer;
