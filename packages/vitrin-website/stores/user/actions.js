import {
  SET_USER,
  LOGIN,
  VERIFICATION,
  SET_TOKEN,
  UPDATE_PROFILE,
  SET_LOGIN_CALLBACK,
  GET_USER,
  SET_TEMP_PHONE,
  SEND_NEW_VERIFICATION_CODE,
  SEND_NEW_VERIFICATION_CODE_BY_CALL,
  SET_VERIFY_CODE_ERROR,
} from "./constants";

export function setUser(user) {
  return {
    type: SET_USER,
    data: { user },
  };
}

export function setToken(data) {
  return {
    type: SET_TOKEN,
    data,
  };
}

export function login(phone, url, pathname) {
  return {
    type: LOGIN,
    data: { phone, url, pathname },
  };
}

export function verify(phone, code, callback) {
  return {
    type: VERIFICATION,
    data: { username: phone, password: code, callback },
  };
}

export function setVerifyCodeError(error) {
  return {
    type: SET_VERIFY_CODE_ERROR,
    payload: { ...error },
  };
}

export function getUser(token) {
  return {
    type: GET_USER,
    data: { token },
  };
}
export function updateProfile(data) {
  return {
    type: UPDATE_PROFILE,
    data,
  };
}

export function setLoginCallBack(data) {
  return {
    type: SET_LOGIN_CALLBACK,
    data,
  };
}
export function setTempPhone(phone) {
  return {
    type: SET_TEMP_PHONE,
    data: phone,
  };
}

export function sendNewVerificationCode(phone) {
  return {
    type: SEND_NEW_VERIFICATION_CODE,
    data: phone,
  };
}

export function sendNewVerificationCodeByCall(phone) {
  return {
    type: SEND_NEW_VERIFICATION_CODE_BY_CALL,
    data: phone,
  };
}
