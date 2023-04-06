/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "redux";
import userReducer from "../stores/user/reducer";
import globalReducer from "../stores/global/reducer";
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    user: userReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
