/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  START_LOADING,
  STOP_LOADING,
  INIT,
  FILE_UPLOADED,
  UPLOAD_FILE,
  REMOVE_FILE,
  CLEAR_UPLOADED_FILES,
  START_INIT_LOADING,
  STOP_INIT_LOADING,
  MANY_ACTIONS,
  SEND_EMAIL,
  UPLOAD_REQUEST,
  UPLOAD_PROGRESS,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
  UPLOAD_REQUEST_FINISHED,
  GLOBAL_LOADING_TYPE,
  START_REPORT_LOADING,
  STOP_REPORT_LOADING,
  SEND_LOCAL_EMAIL,
  SET_HAS_ERROR,
  GLOBAL_HAS_EORROR_TYPE,
  SET_USER_BUSINESSES,
  GET_USER_BUSINESSES,
} from "./constants";

export function init(subdomain) {
  return {
    type: INIT,
    data: { subdomain },
  };
}

export function callManyActions(actions) {
  return {
    type: MANY_ACTIONS,
    data: actions,
  };
}

export function setUserBusinesses(data) {
  return {
    type: SET_USER_BUSINESSES,
    data,
  };
}

export function getUserBusinesses() {
  return {
    type: GET_USER_BUSINESSES,
  };
}

export function startReportLoading(name) {
  return {
    type: START_REPORT_LOADING,
    data: { name },
  };
}

export function stopReportLoading(name) {
  return {
    type: STOP_REPORT_LOADING,
    data: { name },
  };
}

export function startLoading(name = GLOBAL_LOADING_TYPE) {
  return {
    type: START_LOADING,
    data: { name },
  };
}

export function stopLoading(name = GLOBAL_LOADING_TYPE) {
  return {
    type: STOP_LOADING,
    data: { name },
  };
}

export function startInitLoading() {
  return {
    type: START_INIT_LOADING,
  };
}

export function stopInitLoading() {
  return {
    type: STOP_INIT_LOADING,
  };
}

export function uploadFile(data, callback, noSnackBarMessage , showLoading) {
  return {
    type: UPLOAD_FILE,
    data,
    showLoading,
    callback,
    noSnackBarMessage
  };
}

export function fileUploaded(data) {
  return {
    type: FILE_UPLOADED,
    data,
  };
}

export function removeFile(data) {
  return {
    type: REMOVE_FILE,
    index: data,
  };
}

export function clearUploadedFiles() {
  return {
    type: CLEAR_UPLOADED_FILES,
  };
}

export function sendEmail(data) {
  return {
    type: SEND_EMAIL,
    data,
  };
}

export function sendLocalEmail(data) {
  return {
    type: SEND_LOCAL_EMAIL,
    data,
  };
}

export const uploadRequest = () => ({
  type: UPLOAD_REQUEST,
});
export const uploadRequestFinished = () => ({
  type: UPLOAD_REQUEST_FINISHED,
});
export const uploadProgress = (file, progress) => ({
  type: UPLOAD_PROGRESS,
  payload: progress,
  meta: { file },
});
export const uploadSuccess = (file) => ({
  type: UPLOAD_SUCCESS,
  meta: { file },
});
export const uploadFailure = (file, err) => ({
  type: UPLOAD_FAILURE,
  payload: err,
  error: true,
  meta: { file },
});

export function setHasError(hasError, name = GLOBAL_HAS_EORROR_TYPE) {
  return {
    type: SET_HAS_ERROR,
    data: { hasError, name },
  };
}
