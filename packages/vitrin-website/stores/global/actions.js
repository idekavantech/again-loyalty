import {
  START_LOADING,
  STOP_LOADING,
  SET_SNACK_BAR_MESSAGE,
  UPDATE_VITRIN_FORM,
  CREATE_VITRIN,
  SHOW_TOTAL_GMV,
  UPDATE_TOTAL_GMV,
  VALIDATE_SITE_DOMAIN,
  IS_SITE_DOMAIN_VALID,
  GET_USER_BUSINESSES,
  SET_USER_BUSINESSES,
  UPLOAD_FILE,
  UPLOAD_REQUEST,
  UPLOAD_FAILURE,
  UPLOAD_SUCCESS,
  UPLOAD_PROGRESS,
  FILE_UPLOADED,
  UPLOAD_REQUEST_FINISHED,
  GET_BUSINESSES_CATEGORIES,
  SET_BUSINESSES_CATEGORIES,
  GET_CATEGORY_TEMPLATES,
  SET_CATEGORY_TEMPLATES,
  GET_TEMPLATE,
  SET_TEMPLATE,
  GET_PACKAGES,
  SET_PACKAGES,
  CREATE_TRANSACTION,
  MAKE_TRANSACTION,
  UPDATE_VITRIN,
  GET_VITRIN_CRM_DATA,
  SET_VITRIN_CRM_DATA,
  GET_TRANSACTION,
  SET_TRANSACTION,
  PAY_TRANSACTION,
  ACCEPT_EVENT,
  GET_FORMS_DICTIONARY,
  SET_FORMS_DICTIONARY,
  CREATE_FORM_RESPONSE,
  SET_BUSINESS,
  CREATE_AND_INITIALIZE_VITRIN,
  INITIALIZE_VITRIN,
  GET_BUSINESS,
  CREATE_BEHTARINO,
  UPDATE_BEHTARINO,
  UPLOAD_FILE_BEHTARINO,
  ADD_OR_REMOVE_IMAGE_TO_BEHTARINO,
} from "./constants";

export function startLoading(name) {
  return {
    type: START_LOADING,
    data: { name },
  };
}

export function stopLoading(name) {
  return {
    type: STOP_LOADING,
    data: { name },
  };
}

export function getTemplate(id) {
  return {
    type: GET_TEMPLATE,
    data: { id },
  };
}

export function setTemplate(data) {
  return {
    type: SET_TEMPLATE,
    data,
  };
}
export function getPackages(id) {
  return {
    type: GET_PACKAGES,
    data: { id },
  };
}

export function setPackages(data) {
  return {
    type: SET_PACKAGES,
    data,
  };
}

export function setSnackBarMessage(message, messageType) {
  return {
    type: SET_SNACK_BAR_MESSAGE,
    message,
    messageType,
  };
}

export function updateNewVitrinForm(data) {
  return {
    type: UPDATE_VITRIN_FORM,
    data,
  };
}

export function createAndInitializeVitrin(data, callback, callbackError) {
  return {
    type: CREATE_AND_INITIALIZE_VITRIN,
    data,
    callback,
    callbackError,
  };
}

export function showTotolGmv() {
  return {
    type: SHOW_TOTAL_GMV,
  };
}

export function updateGmv(data) {
  return {
    type: UPDATE_TOTAL_GMV,
    data,
  };
}

export function siteDomainValidator(data) {
  return {
    type: VALIDATE_SITE_DOMAIN,
    data,
  };
}

export function isSiteDomainValid(data) {
  return {
    type: IS_SITE_DOMAIN_VALID,
    data,
  };
}
export function getUserBusinesses() {
  return {
    type: GET_USER_BUSINESSES,
  };
}

export function setUserBusinesses(data) {
  return {
    type: SET_USER_BUSINESSES,
    data,
  };
}

export function uploadFile(data, callback, noSnackBarMessage) {
  return {
    type: UPLOAD_FILE,
    data,
    callback,
    noSnackBarMessage,
  };
}

export function fileUploaded(data) {
  return {
    type: FILE_UPLOADED,
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

export const getBusinessesCategories = () => ({
  type: GET_BUSINESSES_CATEGORIES,
});
export const setBusinessesCategories = (data) => ({
  type: SET_BUSINESSES_CATEGORIES,
  data,
});

export const getCategoryTemplates = (id) => ({
  type: GET_CATEGORY_TEMPLATES,
  data: { id },
});
export const setCategoryTemplates = (data) => ({
  type: SET_CATEGORY_TEMPLATES,
  data,
});

export const createTransaction = (
  data,
  slug,
  has_first_login_event = false
) => ({
  type: CREATE_TRANSACTION,
  data,
  slug,
  has_first_login_event,
});
export const makeTransaction = (data) => ({
  type: MAKE_TRANSACTION,
  data,
});
export const updateBusiness = (data, callback) => ({
  data,
  type: UPDATE_VITRIN,
  callback,
});

export const getBusinessCRMData = (slug) => ({
  data: { slug },
  type: GET_VITRIN_CRM_DATA,
});
export const setBusinessCRMData = (data) => ({
  data,
  type: SET_VITRIN_CRM_DATA,
});

export const getTransaction = (id) => ({
  data: { id },
  type: GET_TRANSACTION,
});

export const setTransaction = (data) => ({
  data,
  type: SET_TRANSACTION,
});

export const payTransaction = (data) => ({
  data,
  type: PAY_TRANSACTION,
});

export const acceptEvent = (data) => ({
  data,
  type: ACCEPT_EVENT,
});

export function setFormsDictionary(forms) {
  return {
    type: SET_FORMS_DICTIONARY,
    data: forms,
  };
}

export function getFormsDictionary(id) {
  return {
    type: GET_FORMS_DICTIONARY,
    data: id,
  };
}
export function createFormResponse(response, form_id, cb) {
  return {
    type: CREATE_FORM_RESPONSE,
    data: { data: response, form: form_id },
    cb,
  };
}

export function setBusiness(data) {
  return {
    type: SET_BUSINESS,
    data,
  };
}

export function createVitrin(data, callback) {
  return {
    type: CREATE_VITRIN,
    data,
    callback,
  };
}

export function createBehtarino(data, callback) {
  return {
    type: CREATE_BEHTARINO,
    data,
    callback,
  };
}

export function updateBehtarino(data, callback) {
  return {
    type: UPDATE_BEHTARINO,
    data,
    callback,
  };
}

export function addOrRemoveImageToBusinessBehtarino(
  data,
  callback,
  callbackError
) {
  return {
    type: ADD_OR_REMOVE_IMAGE_TO_BEHTARINO,
    data,
    callback,
    callbackError,
  };
}

export function uploadFileBehtarino(data, callback) {
  return {
    type: UPLOAD_FILE_BEHTARINO,
    data,
    callback,
  };
}
export function initializeVitrin(data, callback, callbackError) {
  return {
    type: INITIALIZE_VITRIN,
    data,
    callback,
    callbackError,
  };
}

export function getBusiness(data) {
  return {
    type: GET_BUSINESS,
    data,
  };
}
