// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, select, takeLatest } from "@redux-saga/core/effects";
import { CREATE_RESPONSE, GET_RESPONSE, UPDATE_RESPONSE } from "./constants";
import { startLoading, stopLoading } from "@saas/stores/global/actions";
import request from "@saas/utils/request";
import {
  CREATE_SURVEY_RESPONSE_API,
  GET_RESPONSE_API,
  UPDATE_RESPONSE_API,
} from "@saas/utils/api";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import Router from "next/router";
import { makeSelectUrlPrefix } from "@saas/stores/plugins/selector";
import { setResponse } from "./actions";

export function* createResponseSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(request, CREATE_SURVEY_RESPONSE_API, action.data, "POST");
    if (data) {
      const urlPrefix = yield select(makeSelectUrlPrefix());
      if (
        data?.data?.find(
          (item) => item.title.includes("کیفیت غذا") && item.rating < 3
        )
      ) {
        const query = { ...Router.query };
        yield call(Router.push, {
          pathname: `${urlPrefix}/feedback/${data.id}`,
          query,
        });
      } else {
        yield put(
          setSnackBarMessage(
            "نظر شما با موفقیت ثبت شد، از همراهی شما سپاسگزاریم!",
            "default"
          )
        );
        yield call(Router.push, `${urlPrefix}/`);
      }
    } else yield put(setSnackBarMessage("ثبت نظر ناموفق بود!", "fail"));
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("ثبت نظر ناموفق بود!", "fail"));
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getResponseSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(request, GET_RESPONSE_API(action.data), {}, "GET");
    if (data) {
      yield put(setResponse(data));
    }

    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* updateResponseSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      UPDATE_RESPONSE_API(action.data.id),
      action.data.response,
      "PATCH"
    );
    if (data) {
      const urlPrefix = yield select(makeSelectUrlPrefix());
      yield put(
        setSnackBarMessage(
          "نظر شما با موفقیت ثبت شد، از همراهی شما سپاسگزاریم!",
          "default"
        )
      );
      yield call(Router.push, `${urlPrefix}/`);
      yield put(stopLoading());
    } else yield put(setSnackBarMessage("ثبت نظر ناموفق بود!", "fail"));
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("ثبت نظر ناموفق بود!", "fail"));
    yield put(stopLoading());
  }
}

export default function* feedbackSaga() {
  yield takeLatest(CREATE_RESPONSE, createResponseSaga),
    yield takeLatest(GET_RESPONSE, getResponseSaga),
    yield takeLatest(UPDATE_RESPONSE, updateResponseSaga);
}
