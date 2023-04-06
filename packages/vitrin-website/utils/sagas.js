import { all } from "redux-saga/effects";
import userSaga from "../stores/user/saga";
import globalSaga from "../stores/global/saga";
export default function* generalSaga() {
  yield all([...userSaga, ...globalSaga]);
}
