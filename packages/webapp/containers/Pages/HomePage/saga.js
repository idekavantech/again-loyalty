/**
 * Gets the repositories of the user from Github
 */

import { takeLatest } from "redux-saga/effects";
import { CHANGE_USERNAME } from "./constants";

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(CHANGE_USERNAME, getRepos);
}
