/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "redux";
import businessReducer from "./business/reducer";
import userReducer from "./user/reducer";
import uiReducer from "./ui/reducer";
import pluginsReducer from "./plugins/reducer";
import transactionReducer from "./transaction/reducer";
import globalReducer from "./global/reducer";
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}, reducers) {
  const rootReducer = combineReducers({
    global: globalReducer,
    business: businessReducer,
    user: userReducer,
    plugins: pluginsReducer,
    ui: uiReducer,
    transaction: transactionReducer,

    ...reducers,
    // admin,
    ...injectedReducers,
  });

  return rootReducer;
}
