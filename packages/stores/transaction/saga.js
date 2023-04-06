import { call, put, select, takeLatest } from "@redux-saga/core/effects";
import { startLoading, stopLoading } from "../global/actions";
import request from "@saas/utils/request";
import {
  BUSINESS_BUY_VISIT_CARD_SMS_API,
  GET_ORDER_TRANSACTION_API,
  GET_TRANSACTION_API,
  ORDER_PAYMENT_API,
  TRANSACTION_API,
  TRANSACTION_ZIBAL_API,
} from "@saas/utils/api";
import {
  BUY_VISIT_CARD_SMS,
  GET_ORDER_TRANSACTION,
  GET_TRANSACTION,
  ORDER_PAYMENT,
  PAY_TRANSACTION,
} from "./constants";
import { setTransaction } from "./actions";
import { makeSelectBusinessSlug } from "../business/selector";
import { setSnackBarMessage } from "../ui/actions";
import { makeSelectUrlPrefix } from "../plugins/selector";
import { SHOPPING_PLUGIN_URL } from "@saas/utils/constants/plugins";
import { orderSubmitted } from "../../plugins/Shopping/actions";
function postData(url = "", data = {}) {
  const form = document.createElement("form");
  form.setAttribute("method", "POST");
  form.setAttribute("action", url);
  Object.entries(data).forEach(([key, value]) => {
    const hiddenField = document.createElement("input");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", value);
    form.appendChild(hiddenField);
  });
  form.setAttribute("target", "_self");
  document.body.appendChild(form);
  form.submit();
}
export function* getTransactionData(action) {
  try {
    yield put(startLoading());
    const {
      response: { data: transaction },
    } = yield call(request, GET_TRANSACTION_API(action.id), {}, "GET");
    yield put(setTransaction(transaction));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}
export function* getOrderTransactionData(action) {
  try {
    yield put(startLoading());
    const {
      response: { data: transaction },
    } = yield call(request, GET_ORDER_TRANSACTION_API(action.id), {}, "GET");
    yield put(setTransaction(transaction));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}
export function* orderPayment(action) {
  try {
    yield put(startLoading());
    const urlPrefix = yield select(makeSelectUrlPrefix());
    const {
      response: { data, meta },
    } = yield call(
      request,
      ORDER_PAYMENT_API(action.id, action.plugin),
      action.data,
      "POST"
    );
    if (data) {
      if (data?.transaction_id === null) {
        yield put(orderSubmitted());
        window.location = `${urlPrefix}/${SHOPPING_PLUGIN_URL}/orders/${action.id}/status`;
      } else {
        const { transaction_id: transactionID } = data;
        const {
          response: { data: paymentData },
        } = yield call(
          request,
          TRANSACTION_ZIBAL_API(transactionID),
          {},
          "GET"
        );
        if (paymentData) {
          const { url, data } = paymentData;
          if (data) {
            postData(url, data);
          } else {
            window.location.href = url;
          }
        }
      }
    }
    if (meta?.detail?.global_error_messages?.[0])
      yield put(
        setSnackBarMessage(meta.detail.global_error_messages[0], "fail")
      );
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* buyVisitCardSMS(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(
      request,
      BUSINESS_BUY_VISIT_CARD_SMS_API(slug),
      action.data,
      "PATCH"
    );
    if (data) {
      const { transaction_id: transactionID } = data;
      const {
        response: { data: paymentData },
      } = yield call(
        request,
        TRANSACTION_API(transactionID, action.gateway),
        {},
        "GET"
      );
      if (paymentData) {
        const { url } = paymentData;
        window.location.href = url;
      }
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* payTransactionUrl(action) {
  try {
    yield put(startLoading());
    const {
      response: { data, meta },
    } = yield call(
      request,
      TRANSACTION_ZIBAL_API(action.data.transaction_id),
      {},
      "GET"
    );
    if (data) {
      const {
        response: { data: paymentData },
      } = yield call(
        request,
        TRANSACTION_ZIBAL_API(action.data.transaction_id),
        {},
        "GET"
      );
      if (paymentData) {
        const { url, data } = paymentData;
        if (data) {
          postData(url, data);
        } else {
          window.location.href = url;
        }
      }
    }
    if (meta?.detail?.global_error_messages?.[0])
      yield put(
        setSnackBarMessage(meta.detail.global_error_messages[0], "fail")
      );
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}
const sagaFunctions = [
  takeLatest(GET_TRANSACTION, getTransactionData),
  takeLatest(GET_ORDER_TRANSACTION, getOrderTransactionData),
  takeLatest(ORDER_PAYMENT, orderPayment),
  takeLatest(BUY_VISIT_CARD_SMS, buyVisitCardSMS),
  takeLatest(PAY_TRANSACTION, payTransactionUrl),
];
export default sagaFunctions;
