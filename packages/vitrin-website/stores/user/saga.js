/**
 * Gets the repositories of the user from Github
 */
import Axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import request from "utils/request";
import {
  LOGIN_API,
  VERIFY_API,
  USER_API,
  LOGIN_BY_PHONE_API,
} from "utils/apis";
import {
  GET_USER,
  LOGIN,
  UPDATE_PROFILE,
  VERIFICATION,
  SEND_NEW_VERIFICATION_CODE,
  SEND_NEW_VERIFICATION_CODE_BY_CALL,
} from "./constants";
import { setSnackBarMessage } from "../global/actions";
import { setTempPhone, setToken, setUser, setVerifyCodeError } from "./actions";
import Cookies from "js-cookie";

import { startLoading, stopLoading } from "../global/actions";
import Router from "next/router";
import { VITRIN_TOKEN } from "utils/constants";
import { VITRIN_REFRESH_TOKEN } from "@saas/utils/constants";

export function* login(action) {
  try {
    yield put(startLoading());
    const {
      data: { phone, url, pathname },
    } = action;
    const dto = { phone };
    const {
      response: {
        meta,
        data: { key },
      },
    } = yield call(request, LOGIN_API("kvioavomcf"), dto, "POST");
    yield put(stopLoading());
    if (meta.status_code >= 200 && meta.status_code <= 300 && key) {
      yield put(setTempPhone(phone));
      sessionStorage.setItem("JWT_KEY", key);
      let query = { ...Router.query, phone: phone };
      if (url) {
        query = { ...query, url: url };
      }
      yield call(
        Router.push({
          pathname: pathname || Router.pathname,
          query: query,
        })
      );
    }
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* verify(action) {
  try {
    yield put(startLoading());
    const { username, password, callback } = action.data;
    const vitrinBusinessId = 953261;
    const dto = {
      username,
      password,
      business_id: vitrinBusinessId,
      key: sessionStorage.getItem("JWT_KEY"),
    };
    const {
      response: { meta, data: verifyData },
    } = yield call(request, VERIFY_API, dto, "POST");
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      const { access, refresh } = verifyData;
      localStorage.setItem(VITRIN_TOKEN, access);
      Cookies.set(VITRIN_TOKEN, access, { expires: 365 });
      localStorage.setItem(VITRIN_REFRESH_TOKEN, refresh);
      Cookies.set(VITRIN_REFRESH_TOKEN, refresh, { expires: 365 });
      Axios.defaults.headers.common.Authorization = `Bearer ${access}`;
      const {
        response: { data: _user },
      } = yield call(request, USER_API, {}, "GET");
      yield put(setUser({ ..._user, token: access }));
      yield put(stopLoading());
      window.dataLayer.push({
        event: "login",
        userID: _user.id,
        from: Router.pathname,
      });
      if (callback) {
        yield call(callback);
      } else {
        yield call(Router.push, "/profile");
      }
    } else {
      yield put(setVerifyCodeError({ message: "کد تایید نادرست است" }));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* updateProfile(action) {
  try {
    yield put(startLoading());
    const {
      response: { meta },
    } = yield call(request, USER_API, action.data, "PATCH");
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      window.location.href = "/profile";
      yield put(
        setSnackBarMessage("ویرایش اطلاعات با موفقیت انجام شد", "success")
      );
    } else yield put(setSnackBarMessage("ویرایش اطلاعات ناموفق بود", "fail"));
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("ویرایش اطلاعات ناموفق بود", "fail"));
    yield put(stopLoading());
  }
}

export function* getUserProfile(action) {
  const { token } = action.data;
  try {
    if (token) {
      yield put(startLoading("getUserInfo"));
      Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      const {
        response: {
          data,
          meta: { status_code },
        },
      } = yield call(request, USER_API);
      if (status_code === 200) {
        yield put(setUser({ ...data, token }));
        Cookies.set(VITRIN_TOKEN, token, { expires: 365 });
      } else {
        delete Axios.defaults.headers.common.Authorization;
      }
      yield put(stopLoading("getUserInfo"));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* newVerificationCode(payload) {
  try {
    const { data } = payload;
    const dto = {
      phone: data,
    };
    const {
      response: { meta: newCodeMeta },
    } = yield call(request, LOGIN_API("kvioavomcf"), dto, "POST");
    if (newCodeMeta.status_code >= 200 && newCodeMeta.status_code < 300) {
      yield put(setSnackBarMessage("کد مجددا ارسال شد", "success"));
    } else {
      yield put(setSnackBarMessage("لطفا دوباره سعی کنید", "fail"));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* newVerificationCodeByCall(payload) {
  try {
    const { data } = payload;
    const dto = {
      phone: data,
    };
    const {
      response: { meta: newCodeViaCAllMeta },
    } = yield call(request, LOGIN_BY_PHONE_API, dto, "POST");
    if (
      newCodeViaCAllMeta.status_code >= 200 &&
      newCodeViaCAllMeta.status_code < 300
    ) {
      yield put(
        setSnackBarMessage("کد از طریق تماس به اطلاع شما خواهد رسید", "success")
      );
    } else {
      yield put(setSnackBarMessage("لطفا دوباره سعی کنید", "fail"));
    }
  } catch (err) {
    console.log(err);
  }
}

const sagaFunctions = [
  takeLatest(GET_USER, getUserProfile),
  takeLatest(LOGIN, login),
  takeLatest(VERIFICATION, verify),
  takeLatest(UPDATE_PROFILE, updateProfile),
  takeLatest(SEND_NEW_VERIFICATION_CODE, newVerificationCode),
  takeLatest(SEND_NEW_VERIFICATION_CODE_BY_CALL, newVerificationCodeByCall),
];

export default sagaFunctions;
