/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
import React from "react";

export const INIT = "vitrin/App/INIT";

export const START_REPORT_LOADING = "vitrin/App/START_REPORT_LOADING";
export const STOP_REPORT_LOADING = "vitrin/App/STOP_REPORT_LOADING";
export const START_LOADING = "vitrin/App/START_LOADING";
export const STOP_LOADING = "vitrin/App/STOP_LOADING";
export const START_INIT_LOADING = "vitrin/App/START_INIT_LOADING";
export const STOP_INIT_LOADING = "vitrin/App/STOP_INIT_LOADING";
export const CLEAR_UPLOADED_FILES = "vitrin/App/CLEAR_UPLOADED_FILES";
export const UPLOAD_FILE = "vitrin/App/UPLOAD_FILE";
export const FILE_UPLOADED = "vitrin/App/FILE_UPLOADED";
export const REMOVE_FILE = "vitrin/App/REMOVE_FILE";
export const SET_SITE_DOMAIN = "vitrin/App/SET_SITE_DOMAIN";
export const MANY_ACTIONS = "vitrin/App/MANY_ACTIONS";
export const GET_USER_BUSINESSES = "store/general/GET_USER_BUSINESSES";
export const SEND_EMAIL = "vitrin/App/SEND_EMAIL";
export const SEND_LOCAL_EMAIL = "vitrin/App/SEND_LOCAL_EMAIL";
export const UPLOAD_REQUEST = "vitrin/App/UPLOAD_REQUEST";
export const UPLOAD_REQUEST_FINISHED = "vitrin/App/UPLOAD_REQUEST_FINISHED";
export const UPLOAD_PROGRESS = "vitrin/App/UPLOAD_PROGRESS";
export const UPLOAD_SUCCESS = "vitrin/App/UPLOAD_SUCCESS";
export const UPLOAD_FAILURE = "vitrin/App/UPLOAD_FAILURE";
export const SET_USER_BUSINESSES = "store/general/SET_USER_BUSINESSES";

export const ThemeContext = React.createContext({
  isDarkMode: false,
  setDarkMode: () => {},
});

export const GLOBAL_LOADING_TYPE = "global";
export const TRANSACTIONS_REPORT_TYPE = "transactionReport";
export const DEALS_REPORT_TYPE = "dealsReport";
export const DEALS_BY_ID = "dealsById";
export const ORDERS_REPORT_TYPE = "ordersRerport";
export const REVIEWS_REPORT_TYPE = "reviewsReport";
export const TOP_SELLING_REPORT_TYPE = "topSellingReport";
export const BRANCHES_TRANSACTIONS_REPORT_TYPE = "branchesTransactionReport";
export const BRANCHES_DEALS_REPORT_TYPE = "branchesDealsReport";
export const BRANCHES_ORDERS_REPORT_TYPE = "branchesOrdersReport";
export const BRANCHES_REVIEWS_REPORT_TYPE = "branchesReviewsReport";
export const CATEGORY_DEALS = "categoryDeals";
export const RECOMMENDED_DEALS = "recommendedDeals";
export const BUSINESS_TOP_SELLING_DEALS = "businessTopSellingDeals";

export const PRODUCT_VARIACTION_MODAL = "PRODUCT_MODAL";
export const MODIFIERS_MODAL = "modifiers_modal";
export const DELIVERY_INFO_LOADING = "delivery-info-loading";
export const SET_HAS_ERROR = "SET_HAS_ERROR";
export const GLOBAL_HAS_EORROR_TYPE = "GLOBAL_HAS_EORROR_TYPE";
export const IMPORT_CSV_ERROR = "IMPORT_CSV_ERROR";
