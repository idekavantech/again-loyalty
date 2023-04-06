/* eslint-disable func-names */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/**
 * Gets the repositories of the user from Github
 */

import Axios from "axios";

import { call, put, takeLatest, take } from "redux-saga/effects";

import request from "@saas/utils/request";

import {
  INIT,
  UPLOAD_FILE,
  MANY_ACTIONS,
  SEND_EMAIL,
  SEND_LOCAL_EMAIL,
  GET_USER_BUSINESSES,
} from "./constants";
import {
  USER_API,
  IS_ADMIN_API,
  FILE_SERVER_URL_API,
  GET_TRANSACTION_API,
  EMAIL_API,
  LOCAL_EMAIL_API,
  BUSINESS_LIGHT_BY_SITE_DOMAIN_API_V2,
  GET_USER_BUSINESS_API,
} from "@saas/utils/api";
import { getFileExtention } from "@saas/utils/helpers/getFileExtention";
import { getFileExtensionType } from "@saas/utils/helpers/getFileExtensionType";
import { getQueryParams } from "@saas/utils/helpers/getQueryParams";
import { setUser } from "../user/actions";
import {
  fileUploaded,
  startLoading,
  stopLoading,
  uploadFailure,
  uploadSuccess,
  uploadProgress,
  uploadRequest,
  uploadRequestFinished,
  startInitLoading,
  stopInitLoading,
  setUserBusinesses,
} from "./actions";

import { setPlugins } from "../plugins/actions";
import { setBusiness } from "../business/actions";
import { setTransaction } from "../transaction/actions";
import { createUploadFileChannel } from "./createFileUploadChannel";
import { setSnackBarMessage } from "../ui/actions";
import Router from "next/router";
import Compressor from "compressorjs";
import { VITRIN_TOKEN } from "@saas/utils/constants";

export function* init(action) {
  try {
    yield put(startInitLoading());
    const {
      data: { subdomain },
    } = action;
    const {
      response: { data: business },
    } = yield call(
      request,
      BUSINESS_LIGHT_BY_SITE_DOMAIN_API_V2(subdomain),
      {},
      "GET"
    );
    yield put(setBusiness({ business, subdomain }));
    yield put(setPlugins(business));
    let token = getQueryParams("token", location.search);
    if (token) {
      localStorage.setItem(VITRIN_TOKEN, token);
      Axios.defaults.headers.common.Authorization = token.startsWith("eyJ")
        ? `Bearer ${token}`
        : `Token ${token}`;
    } else if (localStorage.getItem(VITRIN_TOKEN)) {
      token = localStorage.getItem(VITRIN_TOKEN);
      Axios.defaults.headers.common.Authorization = token.startsWith("eyJ")
        ? `Bearer ${token}`
        : `Token ${token}`;
    }
    const transactionID = Router.query.transaction;
    if (transactionID) {
      const {
        response: { data: transaction },
      } = yield call(request, GET_TRANSACTION_API(transactionID), {}, "GET");
      yield put(setTransaction(transaction));
    }
    if (Axios.defaults.headers.common.Authorization) {
      const {
        response: { data: user },
      } = yield call(request, USER_API, {}, "GET");
      const {
        response: { data },
      } = yield call(request, IS_ADMIN_API(business.slug), {}, "GET");
      yield put(
        setUser({
          user: { ...user, isAdmin: data?.is_admin },
          token,
        })
      );
    } else yield put(setUser({}));
    yield put(stopInitLoading());
  } catch (err) {
    // console.log(err);
    yield put(stopInitLoading());
  }
}

export function* callManyActions(action) {
  for (let i = 0; i < action.data.length; i += 1) {
    yield put(action.data[0]);
  }
}

function compressImage(file) {
  return new Promise(async (resolve, reject) => {
    if (file && /\.png|\.jpg|\.jpeg/.test(file.name.toLowerCase())) {
      new Compressor(file, {
        quality: 1,
        maxWidth: 1920,
        success(result) {
          resolve(result);
        },
        error(err) {
          console.log(err.message);
        },
      });
    } else {
      reject();
    }
  });
}

export function* uploadFileSaga(url, file, noSnackBarMessage) {
  yield put(uploadRequest());
  const channel = yield call(createUploadFileChannel, url, file);
  while (true) {
    const { progress = 0, err, success } = yield take(channel);
    if (err) {
      yield put(uploadFailure(file, err));
      if (!noSnackBarMessage)
        yield put(setSnackBarMessage("فایل شما اپلود نشد.", "fail"));

      return;
    }
    if (success) {
      yield put(uploadSuccess(file));
      if (!noSnackBarMessage)
        yield put(
          setSnackBarMessage("فایل شما با موفقیت اپلود شد.", "success")
        );
      return;
    }
    yield put(uploadProgress(file, progress));
  }
}

export function* getUserBusinessesSaga() {
  try {
    const {
      response: { data: businesses },
    } = yield call(request, GET_USER_BUSINESS_API, {}, "GET");

    yield put(setUserBusinesses(businesses));
  } catch (error) {
    console.log(error);
  }
}

export function* uploadFile(file, folderName, callback, noSnackBarMessage) {
  try {
    const {
      response: {
        data: { url },
      },
    } = yield call(
      request,
      FILE_SERVER_URL_API,
      { file_name: file.name, folder_name: folderName },
      "GET"
    );
    yield call(uploadFileSaga, url, file, noSnackBarMessage);
    const type = getFileExtensionType(
      getFileExtention(file.name).toLowerCase()
    );
    if (type) {
      const uploadedFile = {
        url: url.substr(0, url.indexOf("?")),
        file_name: url.substring(url.lastIndexOf("/") + 1, url.indexOf("?")),
        folder_name: folderName,
        type,
      };
      yield put(fileUploaded(uploadedFile));
      if (callback)
        yield call(
          callback,
          url.substr(0, url.indexOf("?")),
          `${uploadedFile.folder_name}/${uploadedFile.file_name}`
        );
    }
  } catch (err) {
    console.log(err);
  }
  yield put(uploadRequestFinished());
}
export function* uploadFiles(action) {
  try {
    const { files, folderName } = action.data;
    const { noSnackBarMessage, showLoading = true } = action;
    if (showLoading) yield put(startLoading("upload"));
    yield put(startLoading(UPLOAD_FILE));
    for (let i = 0; i < files.length; i += 1) {
      const type = getFileExtensionType(
        getFileExtention(files[i].name).toLowerCase()
      );
      const _file =
        type === "image"
          ? /\.gif/.test(files[i].name.toLowerCase())
            ? files[i]
            : yield compressImage(files[i])
          : files[i];
      yield call(
        uploadFile,
        _file,
        folderName,
        action.callback,
        noSnackBarMessage
      );
    }
    if (showLoading) yield put(stopLoading("upload"));
    yield put(stopLoading(UPLOAD_FILE));
  } catch (err) {
    console.log(err);
  }
}
function* sendEmail(action) {
  try {
    yield call(request, EMAIL_API, action.data, "POST");
  } catch (err) {
    console.log(err);
  }
}
function* sendLocalEmail(action) {
  try {
    const { response } = yield call(
      request,
      LOCAL_EMAIL_API,
      action.data,
      "POST"
    );
    if (response?.status === "success")
      yield put(setSnackBarMessage("ایمیل با موفقیت ارسال شد.", "success"));
    else yield put(setSnackBarMessage("ارسال ایمیل موفقیت‌آمیز نبود!", "fail"));
  } catch (err) {
    console.log(err);
  }
}
const sagaFunctions = [
  takeLatest(INIT, init),
  takeLatest(UPLOAD_FILE, uploadFiles),
  takeLatest(SEND_EMAIL, sendEmail),
  takeLatest(SEND_LOCAL_EMAIL, sendLocalEmail),
  takeLatest(MANY_ACTIONS, callManyActions),
  takeLatest(GET_USER_BUSINESSES, getUserBusinessesSaga),
];
export default sagaFunctions;
