/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable camelcase */
/* eslint-disable no-console */
import {
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "@redux-saga/core/effects";
import {
  clearUploadedFiles,
  init,
  removeFile,
  setHasError,
  startLoading,
  startReportLoading,
  stopLoading,
  stopReportLoading,
} from "@saas/stores/global/actions";
import {
  DEALS_BY_ID,
  IMPORT_CSV_ERROR,
  TOP_SELLING_REPORT_TYPE,
} from "@saas/stores/global/constants";
import request from "@saas/utils/request";
import {
  ACCEPT_SUBMITTED_PURCHASE_ORDER_API,
  ADD_MEMBERSHIPS_FROM_SHEET_API,
  ALL_DEALS_BY_BUSINESS_BY_IDS_API,
  ALL_INGREDIENTS_BY_BUSINESS,
  ALL_LIGHT_RESOURCES_API,
  ALL_MODIFIER_SETS_BY_BUSINESS,
  ALL_RESOURCES_API,
  APPLY_RECEIVED_PURCHASE_ORDER_API,
  APPLY_SUBMITTED_PURCHASE_ORDER_API,
  ASSIGN_DELIVERY_MAN_API,
  BULK_ADD_LABELS_TO_MODIFIER_SETS_API,
  BULK_ADD_MODIFIERSET_TO_CATEGORIES_API,
  BULK_ADD_MODIFIERSET_TO_DEALS_API,
  BULK_ADD_PRODUCTS_VARIATIONS_TO_MODIFIER_SETS_API,
  BULK_DEALS_INVENTORY_CHANGE_API,
  BULK_DELETE_RESOURCES_API,
  BULK_INGREDIENTS_INVENTORY_CHANGE_API,
  BULK_UPDATE_PRODUCTS_INVENTORY_API,
  BUSINESS_BY_SLUG_API,
  BUSINESS_CATEGORIES_API,
  BUSINESS_LAST_DAYS_SHOPPING_DATA_API,
  BUSINESS_ORDER_ITEMS_INVOICE_EDIT_API,
  BUSINESS_ORDERS_API,
  BUSINESS_ORDERS_SUMMARY_API,
  BUY_PLUGIN_API,
  C_LABELS_API,
  CASH_DRAWER_ITEM_TRANSACTIONS_API,
  CASH_DRAWERS_ITEMS_API,
  CHANGE_ORDER_STATUS_API,
  CHECK_DOMAIN_API,
  CLOSE_CASH_DRAWER_API,
  CMS_LESSONS_API,
  CREATE_CAMPAIGN_API,
  CREATE_DISCOUNT_CODE_API,
  CREATE_PAID_IN_CASH_TRANSACTION_API,
  CREATE_PAID_OUT_CASH_TRANSACTION_API,
  CREATE_SURVEY_TEMPLATE_API,
  CREATING_INGREDIENTS_RECOUNTING_REPORTS_API,
  CRM_ADD_COMMENT_API,
  CRM_ALL_LABELS_API,
  CRM_EVENT_API,
  CRM_GIFT_TRANSACTIONS,
  CRM_JOURNEY_DATA_API,
  CRM_LABEL_API,
  CRM_LABEL_API_DELETE,
  CRM_LABEL_ITEM_API,
  CRM_LABEL_ITEM_MEMBERSHIPS_API,
  CRM_MEMBERSHIPS_API,
  CUSTOMER_LEVELS_LIST_API,
  CUSTOMERS_DISSATISFACTION_REVIEWS_REPORTS_API,
  CUSTOMERS_SATISFACTION_REVIEWS_REPORTS_API,
  CUSTOMERS_TAXING_REPORTS,
  DISCOUNT_CODE_API,
  DISCOUNT_CODE_ITEM_API,
  DISCOUNT_CODE_REPORTS_API,
  FACTOR_INVOICE_API,
  FINISH_CASH_DRAWER_API,
  FIRST_AND_LAST_REPORT_API,
  FORM_RESPONSE_API,
  FORMS_API,
  FORMS_ITEM_API,
  GET_AGGREGATE_RATING_API,
  GET_BUSINESS_DEVICES_API,
  GET_BUSINESS_REVIEW_API,
  GET_BUSINESS_REVIEWS_API,
  GET_CALL_REQUESTS_API,
  GET_CAMPAIGN_API,
  GET_CAMPAIGN_BY_ID_API,
  GET_FORMS_API,
  GET_PRODUCTS_REPORTS_SOLD_BY_COUNT_API,
  GET_REPORTS_CALL_REQUESTS_API,
  GROSS_SALES_REPORT_API,
  IMPORT_CSV_API,
  INGREDIENTS_RECOUNTING_REPORT_API,
  INGREDIENTS_RECOUNTING_REPORTS_API,
  INVENTORY_HISTORY_REPORTS,
  LABELS_BULK_DELETE_API,
  LEGAL_DOCUMENT_ITEM_API,
  LEGAL_DOCUMENT_ITEMS_API,
  MEMBERSHIPS_API,
  MEMBERSHIPS_ITEM_API,
  MEMBERSHIPS_ITEM_REPORT_API,
  MEMBERSHIPS_SEARCH_API,
  MOST_SOLD_PRODUCT_API,
  OPEN_CASH_DRAWER_API,
  ORDER_ADD_NOTE_API,
  ORDER_ANALYTICS_DATA_API,
  ORDER_DELIVERY_TIME_API,
  ORDER_EDIT_API,
  ORDER_TRANSACTION_PER_PAYMENT_TYPE_PER_SALES_CHANNEL,
  ORDER_TRANSACTIONS_API,
  ORDER_TRANSACTIONS_FINANCE_PAYMENT_TYPES_API,
  ORDER_TRANSACTIONS_FINANCE_SUMMARY_REPORTS_API,
  ORDER_TRANSACTIONS_ITEMS_API,
  PAGES_API,
  PAGES_ITEM_API,
  PARTIAL_PAID_API,
  PLUGIN_TRIAL_API,
  POS_DEVICE_ITEM_API,
  POS_DEVICE_ITEMS_API,
  POS_USER_ITEM_API,
  POS_USER_ITEMS_API,
  PRODUCTS_DEACTIVATION_REPORT_API,
  PURCHASE_ORDER_ITEM_API,
  PURCHASE_REPORTS_BY_INGREDIENTS_API,
  PURCHASE_REPORTS_BY_INGREDIENTS_PER_BRANCH_API,
  PURCHASE_REPORTS_FROM_VENDORS_API,
  PURCHASE_REPORTS_FROM_VENDORS_PER_BRANCH_API,
  RECEIVE_SUBMITTED_PURCHASE_ORDER_API,
  RECEIVED_PURCHASE_ORDERS_BY_BUSINESS_API,
  REJECT_RECEIVED_PURCHASE_ORDER_API,
  REQUEST_ALOPEYK_API,
  REQUEST_MIARE_API,
  RESOURCE_API,
  RESOURCES_API,
  RESOURCES_BULK_UPDATE_API,
  RESOURCES_IMAGES_API,
  RESOURCES_IMAGES_ITEM_API,
  RESOURCES_ITEM_API,
  RETURN_EXTRA_PAID_API,
  REVIEWS_RESPONSE_API,
  SEND_CUSTOM_VISIT_CARD_API,
  SEND_RECEIPT_API,
  SEND_VISIT_CARD_API,
  SHOPPING_ORDER_AGGREGATE_API,
  SHOPPING_ORDERS_FINANCE_SUMMARY_REPORTS_API,
  SHOPPING_ORDERS_PAYMENT_SUMMARY_REPORTS_API,
  SUBMIT_FACTOR_API,
  SUBMITTED_PURCHASE_ORDERS_API,
  SUBMITTED_PURCHASE_ORDERS_BY_BUSINESS_API,
  SUBMITTED_PURCHASE_ORDERS_REPORTS_API,
  SUBMITTED_PURCHASE_ORDERS_REPORTS_PER_BRANCH_API,
  SUPER_INGREDIENTS_APPROVED_PRICE_API,
  TOTAL_PURCHASE_ITEMS_API,
  TRANSACTION_API,
  UPDATE_CAMPAIGN_API,
  UPDATE_DISCOUNT_CODE_API,
  USER_ORDERS_ITEMS_DETAIL_API,
  VARIATION_API,
  VARIATION_CHANGE_INVENTORY_API,
  VARIATION_INGREDIENTS_API,
  VARIATION_MODIFIER_SETS_API,
  VARIATION_REPORT_API,
  VARIATION_VENDOR_ITEMS_API,
  VARIATIONS_BULK_CHANGE_INVENTORY_API,
  VARIATIONS_BULK_CREATE_OR_UPDATE_OR_DELETE_API,
  VARIATIONS_BULK_UPDATE_API,
  VARIATIONS_IMAGES_API,
  VARIATIONS_IMAGES_ITEM_API,
  VENDOR_API,
  VENDOR_ITEM_API,
  VENDOR_ITEMS_BY_BUSINESS_API,
  VENDOR_ITEMS_BY_VENDOR_API,
  VENDOR_ITEMS_ITEM_API,
  VENDORS_BY_BUSINESS_API,
  VITRIN_CALL_BUTTON_CLICKS_API,
  VITRIN_PAGE_VIEWS_API,
  WAREHOUSE_REPORTING_CATEGORIES_API,
  UPDATE_LABEL_API,
  CREATE_LEVELS_API,
  SEGMENTS_LIST_API,
  SEGMENT_BY_ID_API,
  CREATE_SEGMENT_API,
  AUTOMATED_PROCESSES_LIST_API,
  CREATE_AUTOMATED_PROCESS_API,
  AUTOMATED_PROCESSES_BY_ID_API,
  REVIEWS_TEMPLATE_API,
  UPDATE_SURVEY_TEMPLATE_API,
  CUSTOMER_LEVELS_API,
  AUTOMATED_PROCESSES_CREDIT_REPORTS_API,
  CAMPAIGN_CREDIT_REPORTS_API,
  FEEDBACK_DELAY_API,
  ADD_LABEL_TO_MEMBERSHIP_GROUP_API,
  GET_MEMBERSHIP_EVENT_LOGS,
  INITIALZE_GATE_AWAY_API,
  CREATE_GATE_AWAY_API,
  CHECK_SITE_DOMAIN_AVAILABILITY_API,
  REVAL_COST_API,
  REVAL_COSTS_CATEGORY_API,
  REVAL_PAYMENT_METHOD_API,
  IMPORT_MEMBERSHIPS_API,
  CAMPAIGNS_BY_SEGMENT_API,
  CAMPAIGNS_BY_SEGMENT_BY_ID_API,
  CREATE_CAMPAIGNS_BY_SEGMENT_API,
  BISHTAR_CRM_JOURNEY_DATA_API,
} from "@saas/utils/api";
import {
  getAdminProduct,
  getAdminVendorItemsByDeal,
  getAdminVendorItemsByIngredient,
  getAutomatedProcesses,
  getCostsCategoriesList,
  getCRMLabels,
  getCrmLevels,
  getCrmSegments,
  getLabels,
  getLegalDocuments,
  getPosDevice,
  getPosDevices,
  setAdminAllProducts,
  setAdminCallRequests,
  setAdminPageViews,
  setAdminProduct,
  setAdminProductImages,
  setAdminProducts,
  setAdminProductsByIds,
  setAdminReview,
  setAdminReviews,
  setAdminTransactions,
  setAdminVendor,
  setAdminVendorItems,
  setAdminVendors,
  setAggregateRating,
  setAutomatedProcess,
  setAutomatedProcessCreditReport,
  setAutomatedProcesses,
  setAvaliabilityDomain,
  setBusinessCategories,
  setBusinessShoppingReportData,
  setCallRequests,
  setCampaignCreditReport,
  setCampaignData,
  setCampaignItem,
  setCashDrawers,
  setCashDrawerTransactions,
  setCampaignBySegment,
  setCampaignsBySegment,
  setCMSLessons,
  setCostsCategoriesList,
  setCostsList,
  setCrmLevelItem,
  setCrmLevels,
  setCRMMembershipByQuery,
  setCrmSegment,
  setCrmSegmentList,
  setCustomersDisSatisfactionReviewsReports,
  setCustomersSatisfactionReviewsReports,
  setCustomersTaxingReports,
  setDiscountCodeById,
  setDiscountCodeData,
  setDiscountCodeReports,
  setDomainFree,
  setFirstAndLastReport,
  setFormResponses,
  setForms,
  setGrossSalesReport,
  setIngredient,
  setIngredientReport,
  setIngredients,
  setIngredientsRecountingReport,
  setIngredientsRecountingReports,
  setInventoryHistoryReports,
  setInvoiceFactorAction,
  setJourneyState,
  setLabels,
  setLegalDocuments,
  setMembershipEventLogs,
  setModifierSet,
  setModifierSets,
  setNicTimeoutError,
  setOrderTransactions,
  setOrderTransactionsFinancePaymentTypes,
  setOrderTransactionsFinanceSummaryReports,
  setOrderTransactionsPerPaymentTypePerSalesChannel,
  setPaymentMethods,
  setPosDevice,
  setPosDevices,
  setProductReport,
  setProductsDeactivationReport,
  setProductsReportsSoldByCount,
  setProductsTopSellingReport,
  setPurchase,
  setPurchaseReportsByProduct,
  setPurchaseReportsByProductPerBranch,
  setPurchaseReportsFromVendors,
  setPurchaseReportsFromVendorsPerBranch,
  setReceivedPurchases,
  setReportData,
  setReportsCallRequests,
  setReviewsResponse,
  setReviewsTemplate,
  setSearchedCRMMembership,
  setShopingOrderAggregate,
  setShoppingAdminOrder,
  setShoppingAdminOrderCRM,
  setShoppingAdminOrderInvoice,
  setShoppingAdminOrders,
  setShoppingAdminOrdersSummary,
  setShoppingAnalyticsData,
  setShoppingOrdersFinanceSummaryReports,
  setShoppingOrdersPaymentSummaryReports,
  setSubmittedPurchases,
  setSubmittedPurchasesReports,
  setSubmittedPurchasesReportsPerBranch,
  setTotalRequestedPurchaseItems,
  setWarehouseReportingCategories,
} from "./actions";
import {
  ACCEPT_SUBMITTED_PURCHASE,
  ACTIVATE_TRIAL,
  ADD_GIFT_CREDIT_TRANSACTION,
  ADD_SHOPPING_NOTE,
  APPLY_RECEIVED_PURCHASE,
  APPLY_SUBMITTED_PURCHASE,
  ASSIGN_DELIVERY_MAN,
  AUTOMATIC_CONSULTATION_REQUEST,
  BULK_ADD_LABELS_TO_MODIFIER_SETS,
  BULK_ADD_PRODUCTS_VARIATIONS_TO_MODIFIER_SETS,
  BULK_ASSIGN_MODIFIERSET_TO_CATEGORIES,
  BULK_ASSIGN_MODIFIERSET_TO_DEALS,
  BULK_CHANGE_DEALS_INVENTORY,
  BULK_CHANGE_INGREDIENT_INVENTORY,
  BULK_DELETE_CATEGORY,
  BULK_DELETE_INGREDIENTS,
  BULK_DELETE_MODIFIER_SETS,
  BULK_DELETE_PRODUCTS,
  BULK_UPDATE_INGREDIENTS,
  BULK_UPDATE_MODIFIER_SETS,
  BULK_UPDATE_PRODUCTS,
  BULK_UPDATE_PRODUCTS_INVENTORY,
  BUY_PLUGIN,
  CHANGE_CRM_LABEL,
  CHANGE_CRM_LABLES,
  CHANGE_ORDER_STATUS,
  CHECK_DOMAIN_FREE,
  CLOSE_CASH_DRAWER,
  CREATE__DISCOUNT_CODE,
  CREATE_ADMIN_VENDOR,
  CREATE_CAMPAIGN,
  CREATE_CASH_TRANSACTION,
  CREATE_CRM_LABEL,
  CREATE_CRM_MEMBERSHIP,
  CREATE_CRM_MEMBERSHIP_FROM_SHEET,
  CREATE_DEAL_VENDOR_ITEM,
  CREATE_DISCOUNT_CODE,
  CREATE_FORM,
  CREATE_INGREDIENT,
  CREATE_INGREDIENT_VENDOR_ITEM,
  CREATE_INGREDIENTS_RECOUNTING_REPORT,
  CREATE_LEGAL_DOCUMENT,
  CREATE_MODIFIER_SET,
  CREATE_PAGE,
  CREATE_POS_DEVICE,
  CREATE_POS_USER,
  CREATE_SURVEY_TEMPLATE,
  DELETE_ADMIN_VENDOR_ITEM,
  DELETE_CRM_LABEL,
  DELETE_CRM_LABELS,
  DELETE_CRM_MEMBERSHIP,
  DELETE_FORM,
  DELETE_INGREDIENT,
  DELETE_MODIFIER_SET,
  DELETE_PAGE,
  DELETE_POS_DEVICE,
  DELETE_POS_USER,
  DELETE_PURCHASE,
  EDIT_SHOPPING_ADMIN_ORDER,
  FINISH_CASH_DRAWER,
  GET_ADMIN_ALL_PRODUCTS,
  GET_ADMIN_DEAL,
  GET_ADMIN_PRODUCTS,
  GET_ADMIN_PRODUCTS_BY_IDS,
  GET_ADMIN_REVIEW,
  GET_ADMIN_REVIEWS,
  GET_ADMIN_TRANSACTIONS,
  GET_ADMIN_VENDOR,
  GET_ADMIN_VENDOR_ITEMS_BY_DEAL,
  GET_ADMIN_VENDOR_ITEMS_BY_INGREDIENT,
  GET_ADMIN_VENDORS,
  GET_AGGREGATE_RATING,
  GET_BUSINESS_CATEGORIES,
  GET_BUSINESS_SHOPPING_DATA,
  GET_CALL_REQUESTS,
  GET_CAMPAIGN_BY_ID,
  GET_CAMPAIGN_LIST,
  GET_CASH_DRAWER_TRANSACTIONS,
  GET_CASH_DRAWERS,
  GET_CMS_LESSONS,
  GET_CRM_LABEL_DETAIL,
  GET_CRM_LABELS,
  GET_CRM_MEMBERSHIP_BY_QUERY,
  GET_CRM_MEMBERSHIPS,
  GET_CUSTOMERS_DISSATISFACTION_REVIEWS_REPORTS,
  GET_CUSTOMERS_SATISFACTION_REVIEWS_REPORTS,
  GET_CUSTOMERS_TAXING_REPORTS,
  GET_DISCOUNT_CODE_BY_ID,
  GET_DISCOUNT_CODE_DATA,
  GET_DISCOUNT_CODE_REPORTS,
  GET_FIRST_AND_LAST_REPORTS,
  GET_FORM_RESPONSES,
  GET_FORMS,
  GET_GROSS_SALES_REPORT,
  GET_INGREDIENT,
  GET_INGREDIENT_REPORT,
  GET_INGREDIENTS,
  GET_INGREDIENTS_RECOUNTING_REPORT,
  GET_INGREDIENTS_RECOUNTING_REPORTS,
  GET_INVENTORY_HEISTORY_REPORTS,
  GET_JOURNEY_STATE,
  GET_LABELS,
  GET_LEGAL_DOCUMENTS,
  GET_MODIFIER_SET,
  GET_MODIFIER_SETS,
  GET_ORDER_TRANSACTION_PER_PAYMENT_TYPE_PER_SALES_CHANNEL,
  GET_ORDER_TRANSACTIONS,
  GET_ORDER_TRANSACTIONS_FINANCE_PAYMENT_TYPES,
  GET_ORDER_TRANSACTIONS_FINANCE_SUMMARY_REPORTS,
  GET_POS_DEVICE,
  GET_POS_DEVICES,
  GET_PRODUCT_REPORT,
  GET_PRODUCTS_DEACTIVATION_REPORT,
  GET_PRODUCTS_REPORTS_SOLD_BY_COUNT,
  GET_PRODUCTS_TOP_SELLING_REPORT,
  GET_PURCHASE,
  GET_PURCHASE_REPORTS_BY_INGREDIENTS,
  GET_PURCHASE_REPORTS_BY_INGREDIENTS_PER_BRANCH,
  GET_PURCHASE_REPORTS_FROM_VENDORS,
  GET_PURCHASE_REPORTS_FROM_VENDORS_PER_BRANCH,
  GET_RECEIVED_PURCHASES,
  GET_REPORT_CALL_REQUESTS,
  GET_REPORTS_DATA,
  GET_REVIEWS_RESPONSE,
  GET_SHOPPING_ADMIN_ORDER,
  GET_SHOPPING_ADMIN_ORDER_CRM,
  GET_SHOPPING_ADMIN_ORDER_INVOICE,
  GET_SHOPPING_ADMIN_ORDERS,
  GET_SHOPPING_ADMIN_ORDERS_SUMMARY,
  GET_SHOPPING_ANALYTICS_DATA,
  GET_SHOPPING_ORDER_AGGREGATE,
  GET_SHOPPING_ORDERS_FINANCE_SUMMARY_REPORTS,
  GET_SHOPPING_ORDERS_PAYMENT_SUMMARY_REPORTS,
  GET_SUBMITTED_PURCHASES,
  GET_SUBMITTED_PURCHASES_REPORTS,
  GET_SUBMITTED_PURCHASES_REPORTS_PER_BRANCH,
  GET_TOTAL_REQUESTED_PURCHASE_ITEMS,
  GET_VENDOR_ITEMS_BY_BUSINESS,
  GET_VENDOR_ITEMS_BY_VENDOR,
  GET_VITRIN_CALL_BUTTON_CLICKS,
  GET_VITRIN_PAGE_VIEWS,
  GET_WAREHOUSE_REPORTING_CATEGORIES,
  IMPORT_CSV,
  INVOICE_FACTOR,
  NEW_SECTION_ORDERING,
  OPEN_CASH_DRAWER,
  PARTIAL_PAID,
  POST_CRM_LOGS,
  RECEIVE_SUBMITTED_PURCHASE,
  REJECT_RECEIVED_PURCHASE,
  RENEW_POS_LICENCE,
  REQUEST_ALOPEYK,
  REQUEST_MIARE,
  RETURN_EXTRA_PAID,
  SEARCH_CRM_MEMBERSHIP,
  SEND_CUSTOM_VISIT_CARD,
  SEND_RECEIPT,
  SEND_VISIT_CARD,
  SET_APPROVED_PRICE_SUPER_INGREDIENT,
  SUBMIT_FACTOR,
  SUBMIT_PURCHASE,
  UPDATE_ADMIN_VENDOR,
  UPDATE_ADMIN_VENDOR_ITEM,
  UPDATE_CAMPAIGN_BY_ID,
  UPDATE_CRM_LABLES,
  UPDATE_CRM_MEMBERSHIP,
  UPDATE_DISCOUNT_CODE_BY_ID,
  UPDATE_FORM,
  UPDATE_INGREDIENT,
  UPDATE_JOURNEY_STATE,
  UPDATE_LEGAL_DOCUMENT,
  UPDATE_MODIFIER_SET,
  UPDATE_PAGE,
  UPDATE_POS_DEVICE,
  UPDATE_POS_USER,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_VARIATION,
  UPDATE_SUBMITTED_PURCHASE,
  UPDATE_SURVEY_TEMPLATE,
  UPDATE_SYSTEMBY_NEW_INVENTORY_COUNTS,
  UPLOAD_IMAGE_AND_UPDATE_PRODUCT,
  UPLOAD_IMAGE_AND_UPDATE_VARIATION,
  GET_REVIEWS_TEMPLATE,
  SHOPPING_DATA,
  UPDATE_CRM_LABEL,
  GET_CRM_LEVEL_BY_ID,
  GET_CRM_LEVELS_LIST,
  DELETE_CRM_LEVEL_BY_ID,
  UPDATE_CRM_LEVEL,
  CREATE_CRM_LEVEL,
  GET_CRM_SEGMENT_LIST,
  CREATE_CRM_SEGMENT,
  UPDATE_CRM_SEGMENT,
  GET_CRM_SEGMENT_BY_ID,
  GET_AUTOMATED_PROCESSES,
  GET_AUTOMATED_PROCESS_BY_ID,
  UPDATE_AUTOMATED_PROCESS,
  DELETE_AUTOMATED_PROCESS,
  CREATE_AUTOMATED_PROCESS,
  DELETE_CRM_SEGMENT,
  GET_AUTOMATED_PROCESS_CREDIT_REPORTS,
  GET_CAMPAIGN_CREDIT_REPORTS,
  UPDATE_CRM_SURVEY_DELAY,
  ADD_LABEL_TO_MEMBERSHIP_GROUP,
  GET_CRM_MEMBERSHIP_EVENT_LOGS,
  INITIALIZE_GATE_AWAY_ZIBAL,
  CREATE_GATE_AWAY_ZIBAL,
  CHECK_SITE_DOMAIN_AVAILABILITY,
  GET_COST_CATEGORIES_LIST,
  CREATE_COST_CATEGORY,
  GET_PAYMENT_METHODS,
  CREATE_COST,
  GET_COSTS_LIST,
  IMPORT_MEMBERSHIPS,
  GET_CAMPAIGN_BY_SEGMENT,
  GET_CAMPAIGNS_BY_SEGMENT,
  CREATE_CAMPAIGN_BY_SEGMENT,
  UPDATE_CAMPAIGN_BY_SEGMENT,
} from "./constants";
import { setPluginData, setPlugins } from "@saas/stores/plugins/actions";
import { pluginsSerializer } from "@saas/stores/plugins/serializer";
import {
  SHOPPING_PLUGIN,
  SHOPPING_PLUGIN_URL,
} from "@saas/utils/constants/plugins";
import {
  makeSelectBusiness,
  makeSelectBusinessId,
  makeSelectBusinessSiteDomain,
  makeSelectBusinessSlug,
  makeSelectBusinessThemeConfig,
  makeSelectRevalId,
  makeSelectSiteDomain,
} from "@saas/stores/business/selector";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import {
  getBusiness,
  getBusinessBlogPages,
  getBusinessPages,
  getDiscountCodes,
  setBusiness,
  setBusinessPage,
  setCreditTransaction,
  setCRMLabelDetail,
  setCRMLabels,
  setCRMMemberships,
  setFormsDictionary,
  setMembership,
} from "@saas/stores/business/actions";
import {
  getBusinessData,
  getBusinessPagesSaga,
} from "@saas/stores/business/saga";

import { removeParamsFromUrl } from "@saas/utils/helpers/removeParamsFromUrl";
import {
  makeSelectAdminUrlPrefix,
  makeSelectPlugin,
} from "@saas/stores/plugins/selector";
import Router from "next/router";
import { makeSelectFormResponsesNextPage } from "./selectors";
import { previousDatesGenerator, reportSerializer } from "containers/helper";

import { makeSelectUploadedFile } from "@saas/stores/global/selectors";
import {
  CREATE_PRODUCT,
  DELETE_IMAGE_FROM_PRODUCT,
  DELETE_IMAGE_FROM_VARIATION,
  DELETE_PRODUCT,
  UPDATE_IMAGE_FROM_PRODUCT,
} from "@saas/stores/business/constants";
import { setDiscountError } from "@saas/plugins/Shopping/actions";

const ADMIN_ORDERS_PAGE_SIZE = 20;

export function* getVitrinPageViews() {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(request, VITRIN_PAGE_VIEWS_API(slug));
    if (data) {
      yield put(setAdminPageViews(data.vitrin_page_views));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getVitrinCallRequests() {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(request, VITRIN_CALL_BUTTON_CLICKS_API(slug));
    if (data) {
      yield put(setAdminCallRequests(data.vitrin_call_button_clicks));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

// CRM
export function* createCRMMembershipSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(request, MEMBERSHIPS_API, action.data, "POST");
    if (data) {
      if (action.callback) yield call(action.callback, data);
      yield put(setSnackBarMessage("Your customer was successfully added.", "success"));
      yield put(setSearchedCRMMembership(data));
    } else {
      yield put(
        setSnackBarMessage("Adding your customer was not successful.", "fail")
      );
    }

    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("Adding your customer was not successful.", "fail"));
    yield put(stopLoading());
  }
}

export function* createCRMMembershipsFromSheetSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const urlPrefix = yield select(makeSelectAdminUrlPrefix());

    const {
      response: { data },
    } = yield call(
      request,
      ADD_MEMBERSHIPS_FROM_SHEET_API(slug),
      action.data,
      "POST"
    );
    if (data) {
      yield put(setSnackBarMessage("Customers were successfully added.", "success"));
      yield put(removeFile());
      yield put(Router.push(`${urlPrefix}crm/customers`));
    } else {
      yield put(setSnackBarMessage("Adding customers was not successful.", "fail"));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("Adding customers was not successful.", "fail"));
    yield put(stopLoading());
  }
}

export function* getCRMLabelMemberships(action) {
  try {
    yield put(startLoading());
    const page = action.label.page || 1;
    const pageSize = action.label.page_size || 10;
    const {
      response: { data, pagination },
    } = yield call(
      request,
      CRM_LABEL_ITEM_MEMBERSHIPS_API(action.label.id, page, pageSize)
    );
    if (data) {
      const pagesCount = Math.ceil(pagination.count / pageSize);
      yield put(
        setCRMLabelDetail({
          memberships: data,
          pagination: { ...pagination, pagesCount },
          id: action.label.id,
        })
      );
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getCRMMemberships(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const page = action.page || 1;
    const pageSize = action.pageSize || 10;
    const {
      response: { data, pagination },
    } = yield call(
      request,
      CRM_MEMBERSHIPS_API(slug, page, pageSize, action.search)
    );
    if (data) {
      const pagesCount = Math.ceil(pagination.count / pageSize);
      yield put(setCRMMemberships(data, { ...pagination, pagesCount }));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* updateCRMMembershipSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      MEMBERSHIPS_ITEM_API(action.id),
      action.data,
      "PATCH"
    );
    if (data) {
      yield put(setSnackBarMessage("User successfully updated.", "success"));
      yield put(setSearchedCRMMembership(data));
    } else {
      yield put(setSnackBarMessage("User failed to update successfully.", "fail"));
    }

    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("User failed to update successfully.", "fail"));
    yield put(stopLoading());
  }
}

export function* deleteCRMLabel(action) {
  try {
    yield put(startLoading());
    const urlPrefix = yield select(makeSelectAdminUrlPrefix());

    const { status } = yield call(
      request,
      UPDATE_LABEL_API(action.data.id),
      action.data,
      "DELETE"
    );
    if (status === 204) {
      yield put(getCRMLabels());
      yield put(setSnackBarMessage("The tag was successfully removed", "success"));
      if (action.callback) yield call(action.callback);
      yield call(Router.push, `${urlPrefix}crm/labels`);
    } else yield put(setSnackBarMessage("Removed tag was not successful.", "fail"));
    yield put(stopLoading());
    yield put(getLabels());
  } catch (err) {
    yield put(setSnackBarMessage("Removed tag was not successful.", "fail"));
    yield put(stopLoading());
  }
}

export function* deleteCRMLabels(action) {
  try {
    yield put(startLoading());
    const {
      response: { meta },
    } = yield call(request, CRM_LABEL_API_DELETE, action.data.id, "DELETE");
    if (meta.status_code === 204) {
      yield put(getCRMLabels());
      yield put(setSnackBarMessage("The categories were successfully eliminated", "success"));
    } else
      yield put(
        setSnackBarMessage("Categories were not successful.", "fail")
      );
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("Categories were not successful.", "fail"));
    yield put(stopLoading());
  }
}

export function* deleteCRMLabelMemberships(action) {
  const urlPrefix = yield select(makeSelectAdminUrlPrefix());

  try {
    yield put(startLoading());
    const {
      response: { meta },
    } = yield call(request, MEMBERSHIPS_ITEM_API(action.data.id), {}, "DELETE");
    if (meta.status_code === 204) {
      yield call(Router.push, `${urlPrefix}crm/customers`);
      yield put(setSnackBarMessage("The customer successfully removed", "success"));
      if (action.callback) yield call(action.callback);
    } else yield put(setSnackBarMessage("Customer deletion was not successful.", "fail"));
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("Customer deletion was not successful.", "fail"));
    yield put(stopLoading());
  }
}

export function* createNewCRMLabelSaga(action) {
  try {
    yield put(startLoading());

    const { id: business } = yield select(makeSelectBusiness());
    const {
      response: { data },
    } = yield call(
      request,
      CRM_LABEL_API,
      { ...action.data, business },
      "POST"
    );
    if (data) {
      yield put(getLabels());
      yield put(setSnackBarMessage("The new customer label added.", "success"));
      const subdomain = yield select(makeSelectBusinessSiteDomain());

      yield put(init(subdomain));
      removeParamsFromUrl();
    } else
      yield put(setSnackBarMessage("Failed to be added new customer label.", "fail"));
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("Failed to be added new customer label.", "fail"));
    yield put(stopLoading());
  }
}

export function* getCRMLabelsSaga() {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(request, CRM_ALL_LABELS_API(slug));
    if (data) {
      yield put(setCRMLabels(data.crm_labels));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* postCrmLogsSaga(action) {
  const { data: actionData } = action;
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      CRM_ADD_COMMENT_API(actionData.id),
      { comment: action.data.comment },
      "POST"
    );
    if (data) {
      yield put(setSnackBarMessage("The notes were successfully added", "success"));
      yield put(setMembership(data));
    } else
      yield put(
        setSnackBarMessage("An error has occurred in adding an error", "fail")
      );
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* createDiscountCode(action) {
  try {
    const business = yield select(makeSelectBusinessId());
    yield put(startLoading());
    const { discountData } = action.data;
    const {
      response: {
        data: { id: discount },
      },
    } = yield call(
      request,
      DISCOUNT_CODE_API,
      { business, ...discountData },
      "POST"
    );
    if (discount) {
      yield put(setSnackBarMessage("The discount code was added.", "success"));
      yield put(getDiscountCodes());
    } else {
      yield put(setSnackBarMessage("Discount code was not added..", "fail"));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("Please try again..", "fail"));
    yield put(stopLoading());
  }
}

export function* changeCRMLabel(action) {
  try {
    yield put(startLoading());
    const {
      response: { data: crm_label },
    } = yield call(
      request,
      CRM_LABEL_ITEM_API(action.id),
      action.data,
      "PATCH"
    );
    if (crm_label) {
      yield put(getCRMLabels());
      yield put(setSnackBarMessage("The categorization was successfully edited", "success"));
      if (action.callback) yield call(action.callback);
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("Please try again..", "fail"));
    yield put(stopLoading());
  }
}

// Domain
function* checkDomainFree(action) {
  try {
    yield put(startLoading());
    const { status } = yield call(
      request,
      CHECK_DOMAIN_API,
      { name: action.data },
      "POST"
    );
    if (status >= 200 && status < 300) {
      yield put(setDomainFree(true));
      yield put(setNicTimeoutError(""));
    } else {
      yield put(setDomainFree(false));
      yield put(setNicTimeoutError(""));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
    yield put(
      setNicTimeoutError(
        "Domain Connection Service is not available. Please work with your other user panel features and try again a few minutes later."
      )
    );
  }
}

// Shopping
export function* sendReceiptShoppingAdminOrderFunc(action) {
  try {
    yield put(startLoading());
    const {
      response: { meta },
      status,
    } = yield call(
      request,
      SEND_RECEIPT_API(action.id, SHOPPING_PLUGIN),
      {},
      "PATCH"
    );
    if (status >= 200 && status <= 300) {
      yield call(getShoppingAdminOrder, { data: { id: action.id } });
      yield put(setSnackBarMessage("Successfully submitted.", "success"));
    } else {
      yield put(
        setSnackBarMessage(
          (meta?.detail && meta?.detail?.global_error_messages[0]) ||
            "An error has occurred!",
          "fail"
        )
      );
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* markAsPaidShoppingAdminOrderFunc(action) {
  try {
    yield put(startLoading());
    const { status } = yield call(
      request,
      PARTIAL_PAID_API(action.id, SHOPPING_PLUGIN),
      action.data,
      "PATCH"
    );
    if (status >= 200 && status <= 300) {
      yield call(getShoppingAdminOrder, { data: { id: action.id } });
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* returnExtraPaidShoppingAdminOrderFunc(action) {
  try {
    yield put(startLoading());
    const {
      response: { meta },
    } = yield call(
      request,
      RETURN_EXTRA_PAID_API(action.id, SHOPPING_PLUGIN),
      action.data,
      "PATCH"
    );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield call(getShoppingAdminOrder, { data: { id: action.id } });
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getShoppingAdminOrderInvoiceFunc(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      BUSINESS_ORDER_ITEMS_INVOICE_EDIT_API(action.data.id, SHOPPING_PLUGIN),
      action.data,
      "POST"
    );
    if (data) {
      yield put(setShoppingAdminOrderInvoice(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getShoppingAdminOrdersFunc(action) {
  try {
    yield put(startLoading());
    yield put(setShoppingAdminOrders(null));
    const domain = yield select(makeSelectBusinessSiteDomain());
    const {
      response: { data, pagination },
    } = yield call(
      request,
      BUSINESS_ORDERS_API(
        SHOPPING_PLUGIN,
        action?.data?.page || 1,
        action?.data?.page_size || 20
      ),
      { domain: action.domain || domain, ...action.data },
      "GET"
    );
    if (data) {
      const pagesCount = Math.ceil(pagination.count / ADMIN_ORDERS_PAGE_SIZE);
      yield put(setShoppingAdminOrders(data, { ...pagination, pagesCount }));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getShoppingAdminOrdersSummaryFunc(action) {
  try {
    // yield put(startLoading());
    const domain = yield select(makeSelectBusinessSiteDomain());
    const {
      response: { data },
    } = yield call(
      request,
      BUSINESS_ORDERS_SUMMARY_API(SHOPPING_PLUGIN),
      { domain: action.domain || domain },
      "GET"
    );
    if (data) {
      yield put(setShoppingAdminOrdersSummary(data));
    }
    // yield put(stopLoading());
  } catch (err) {
    console.log(err);
    // yield put(stopLoading());
  }
}

export function* getShoppingAdminOrder(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      USER_ORDERS_ITEMS_DETAIL_API(action.data.id, SHOPPING_PLUGIN),
      {},
      "GET"
    );
    if (data) yield put(setShoppingAdminOrder(data));
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* editShoppingAdminOrder(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      ORDER_EDIT_API(SHOPPING_PLUGIN, action.data.id),
      action.data,
      "PATCH"
    );
    if (data) {
      yield put(setShoppingAdminOrder(data));
      if (action.callback) {
        action.callback();
      }
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getShoppingAdminOrderCRMSaga(action) {
  try {
    yield put(startLoading(GET_SHOPPING_ADMIN_ORDER));
    const {
      response: { data },
    } = yield call(
      request,
      MEMBERSHIPS_ITEM_REPORT_API(action.data.id),
      {},
      "GET"
    );
    if (data) yield put(setShoppingAdminOrderCRM(data));
    yield put(stopLoading(GET_SHOPPING_ADMIN_ORDER));
  } catch (err) {
    yield put(stopLoading(GET_SHOPPING_ADMIN_ORDER));
  }
}

export function* changeStatusShoppingOrder(action) {
  try {
    yield put(startLoading());
    let deliveryTimeAPIMeta = null;
    if (Boolean(action.deliveryTime)) {
      const {
        response: { meta },
      } = yield call(
        request,
        ORDER_DELIVERY_TIME_API(action.id, SHOPPING_PLUGIN),
        { delivery_time: action.deliveryTime },
        "PATCH"
      );
      deliveryTimeAPIMeta = meta;
    }
    if (
      !deliveryTimeAPIMeta ||
      (deliveryTimeAPIMeta.status_code >= 200 &&
        deliveryTimeAPIMeta.status_code <= 300)
    ) {
      const {
        response: { data },
      } = yield call(
        request,
        CHANGE_ORDER_STATUS_API(action.id, SHOPPING_PLUGIN),
        action.data,
        "PATCH"
      );
      if (data) {
        yield put(
          setSnackBarMessage("Changed the order status successfully.", "success")
        );
        yield call(getShoppingAdminOrder, { data: { id: action.id } });
        if (typeof action.callback === "function") {
          yield call(action.callback);
        }
      } else
        yield put(
          setSnackBarMessage("An error has occurred in the change of order status!", "fail")
        );
    } else {
      yield put(
        setSnackBarMessage("An error has occurred in the change of order status!", "fail")
      );
    }

    yield put(stopLoading());
  } catch (err) {
    yield put(
      setSnackBarMessage("An error has occurred in the change of order status!", "fail")
    );
    yield put(stopLoading());
  }
}

export function* getShoppingAnalyticsData() {
  try {
    yield put(startLoading());
    const id = yield select(makeSelectBusinessId());
    const {
      response: { data },
    } = yield call(
      request,
      ORDER_ANALYTICS_DATA_API(SHOPPING_PLUGIN),
      { id },
      "PATCH"
    );
    if (data) yield put(setShoppingAnalyticsData(data));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

// Plugins
export function* buyPlugin(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      BUY_PLUGIN_API(action.businessSlug),
      action.data,
      "PATCH"
    );
    localStorage.setItem("lastPaymentObj", JSON.stringify(action.data));
    if (data) {
      const { transaction_id: transactionID } = data;
      const {
        response: { data: paymentData },
      } = yield call(
        request,
        TRANSACTION_API(transactionID, "zarinpal"),
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

export function* activateTrial(action) {
  try {
    const business = yield select(makeSelectBusiness());
    const urlPrefix = yield select(makeSelectAdminUrlPrefix());

    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      PLUGIN_TRIAL_API(action.businessSlug),
      action.data,
      "PATCH"
    );
    if (data) {
      yield put(setPlugins(pluginsSerializer(data), business));
      yield call(Router.push, urlPrefix);
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

// Reviews
export function* getAdminReviews(action) {
  try {
    yield put(startLoading());
    const {
      response: { meta, data, pagination },
    } = yield call(request, GET_BUSINESS_REVIEWS_API, {
      page: action.data.page || 1,
      business_slug: action.data.business_slug,
    });
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setAdminReviews(data, pagination));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
    console.log(err);
  }
}

export function* getAdminReview(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(request, GET_BUSINESS_REVIEW_API(action.data.id));
    if (data) {
      yield put(setAdminReview(data));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

// Visit Card
export function* sendVisitCard(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const urlPrefix = yield select(makeSelectAdminUrlPrefix());

    const {
      response: { data },
    } = yield call(request, SEND_VISIT_CARD_API(slug), action.data, "POST");
    if (data) {
      yield put(
        setSnackBarMessage("Digital Business Card was successfully sent.", "success")
      );
      yield put(Router.push(`${urlPrefix}crm/customers`));
    } else
      yield put(
        setSnackBarMessage("Sending a digital business card failed!", "fail")
      );
    yield put(stopLoading());
  } catch (err) {
    yield put(
      setSnackBarMessage("Sending a digital business card failed!", "fail")
    );
    yield put(stopLoading());
  }
}

export function* sendCustomVisitCard(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const urlPrefix = yield select(makeSelectAdminUrlPrefix());

    const {
      response: { data },
    } = yield call(
      request,
      SEND_CUSTOM_VISIT_CARD_API(slug),
      action.data,
      "PATCH"
    );
    if (data) {
      yield put(
        setSnackBarMessage("Digital Business Card was successfully sent.", "success")
      );
      yield put(Router.push(`${urlPrefix}crm/customers`));
    } else
      yield put(
        setSnackBarMessage("Sending a digital business card failed!", "fail")
      );
    yield put(stopLoading());
  } catch (err) {
    yield put(
      setSnackBarMessage("Sending a digital business card failed!", "fail")
    );
    yield put(stopLoading());
  }
}

export function* bulkDeleteProducts(action) {
  try {
    yield put(startLoading());
    const { status } = yield call(
      request,
      BULK_DELETE_RESOURCES_API,
      [...action.data],
      "DELETE"
    );
    if (status === 204) {
      yield put(setSnackBarMessage("The additives were successfully eliminated", "success"));
      if (action.callback) yield call(action.callback);
    } else
      yield put(setSnackBarMessage("Removed additives were not successful.", "fail"));
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("Removed products were not successful.", "fail"));
    yield put(stopLoading());
  }
}

export function* bulkDeleteCategories(action) {
  try {
    yield put(startLoading());
    const { status } = yield call(
      request,
      LABELS_BULK_DELETE_API,
      [...action.data],
      "DELETE"
    );
    if (status === 204) {
      yield put(setSnackBarMessage("Tags were successfully removed", "success"));
      if (action.callback) yield call(action.callback);
    } else
      yield put(setSnackBarMessage("Removing labels was not successful.", "fail"));
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("Removing labels was not successful.", "fail"));
    yield put(stopLoading());
  }
}

export function* getFilteredDealsByIds(action) {
  yield put(setAdminProducts(null, {}));
  const slug = yield select(makeSelectBusinessSlug());
  try {
    yield put(startLoading(DEALS_BY_ID));
    const {
      response: { meta, data },
    } = yield call(
      request,
      ALL_DEALS_BY_BUSINESS_BY_IDS_API(
        action.data.business_slug || slug,
        action.data.ids,
        action.data.paginated
      )
    );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setAdminProductsByIds(data));
    }
    yield put(stopLoading(DEALS_BY_ID));
  } catch (err) {
    console.log(err);
    yield put(stopLoading(DEALS_BY_ID));
  }
}

export function* getAdminProductSaga(action) {
  yield put(setAdminProduct(null));
  try {
    const { id } = action.data;
    yield put(startLoading());
    if (id) {
      const {
        response: { meta, data },
      } = yield call(request, RESOURCE_API(id, "?is_product=true"), {}, "GET");

      if (meta.status_code >= 200 && meta.status_code <= 300) {
        yield put(setAdminProduct(data));
      }

      yield put(stopLoading());
    }
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* updateBusinessPageSaga(action) {
  try {
    yield put(startLoading());
    const { id, plugin, isStatic } = action.data;
    const { callback } = action;
    const DTO = { ...action.data };
    delete DTO.business;
    delete DTO.id;
    delete DTO.isStatic;
    delete DTO.plugin;
    if (isStatic) {
      const pluginData = yield select(makeSelectPlugin(plugin));
      yield put(
        setPluginData(
          plugin,
          {
            ...pluginData.data,
            pages: {
              ...pluginData.data.pages,
              [id]: Object.keys(DTO).length
                ? { ...DTO, id, isStatic, plugin }
                : null,
            },
          },
          yield put(
            setSnackBarMessage(
              "The desired page was successfully updated.",
              "success"
            )
          )
        )
      );
      if (callback) {
        yield call(callback);
      }
    } else {
      const {
        response: { meta, data },
      } = yield call(request, PAGES_ITEM_API(id), DTO, "patch");

      if (meta.status_code >= 200 && meta.status_code <= 300) {
        yield put(setBusinessPage(data));
        yield call(getBusinessPagesSaga, {
          filters: {
            is_blog: DTO.data.is_blog,
          },
        });
        yield put(
          setSnackBarMessage("The desired page was successfully updated.", "success")
        );
        if (callback) {
          yield call(callback);
        }
      }
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* deleteBusinessPageSaga(action) {
  const { is_blog } = action.filters;
  try {
    yield put(startLoading(is_blog ? "blogPages" : undefined));
    const { status } = yield call(
      request,
      PAGES_ITEM_API(action.data),
      {},
      "delete"
    );
    if (status >= 200 && status <= 300) {
      yield call(getBusinessPagesSaga, {
        filters: { is_blog },
      });
      const entityName = is_blog ? "Post" : "Page";
      yield put(
        setSnackBarMessage(
          `${entityName} The desired was successfully removed.`,
          "success"
        )
      );
      if (is_blog) yield put(getBusinessBlogPages());
      else yield put(getBusinessPages());
    }
    yield put(stopLoading(is_blog ? "blogPages" : undefined));
  } catch (err) {
    console.log(err);
    yield put(stopLoading(is_blog ? "blogPages" : undefined));
  }
}

export function* createBusinessPageSaga(action) {
  try {
    yield put(startLoading());

    const {
      response: { data },
    } = yield call(request, PAGES_API, action.data, "post");

    if (data) {
      yield put(
        setSnackBarMessage("The desired page was successfully built.", "success")
      );
      if (typeof action.cb === "function") {
        action.cb(data.id);
      }
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getFormsSaga() {
  try {
    yield put(startLoading());
    const business = yield select(makeSelectBusiness());

    const {
      response: { meta, data },
    } = yield call(request, GET_FORMS_API(business.slug), {}, "GET");

    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setForms(data));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getFormResponsesSaga(action) {
  try {
    yield put(startLoading());
    const NextPageNumber = yield select(makeSelectFormResponsesNextPage());

    const { from, to, id } = action.data;
    const {
      response: { meta, data, pagination },
    } = yield call(
      request,
      FORM_RESPONSE_API(id, NextPageNumber, from, to),
      {},
      "GET"
    );

    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setFormResponses(data, pagination));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

const getLessons = async () => {
  return new Promise((res) =>
    fetch(CMS_LESSONS_API)
      .then((response) => response.json())
      .then((data) => res(data))
      .catch((error) => console.log(error))
  );
};

export function* getCMSLessonsSaga() {
  try {
    yield put(startLoading());

    const response = yield call(getLessons);
    if (response) {
      yield put(setCMSLessons(response));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* updateFormSaga(action) {
  try {
    yield put(startLoading());
    const { id } = action.data;
    delete action.data.business;
    delete action.data.id;
    const {
      response: { meta, data },
    } = yield call(request, FORMS_ITEM_API(id), action.data, "patch");

    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setSnackBarMessage("Your changes were successfully registered.", "success"));
      yield put(setFormsDictionary(data));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* deleteFormSaga(action) {
  try {
    yield put(startLoading());
    const { status } = yield call(
      request,
      FORMS_ITEM_API(action.data),
      {},
      "delete"
    );
    if (status >= 200 && status <= 300) {
      yield put(setSnackBarMessage("Your form successfully removed.", "success"));
      yield call(getFormsSaga);
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* createFormSaga(action) {
  try {
    yield put(startLoading());
    const urlPrefix = yield select(makeSelectAdminUrlPrefix());
    const business = yield select(makeSelectBusiness());

    const {
      response: { data },
    } = yield call(
      request,
      FORMS_API,
      { ...action.data, business: business.id },
      "post"
    );

    if (data) {
      yield call(Router.push, `${urlPrefix}forms/`);
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* bulkAssignModifierSetsToCategoriesSaga(action) {
  const { id, categories } = action.data;
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      BULK_ADD_MODIFIERSET_TO_CATEGORIES_API(id),
      { categories },
      "PATCH"
    );

    if (data) {
      yield put(
        setSnackBarMessage("Applications of the additive set were successfully registered.", "success")
      );
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* bulkUpdateProductsSaga(action) {
  try {
    const { data: dto, adjustments } = action.data;
    if (dto?.length) {
      const variations = dto.flatMap((product) => product.variations);
      const resources = dto.flatMap((product) => {
        const resource = { ...product };
        delete resource.variations;
        delete resource.business_id;
        return resource;
      });
      yield call(request, RESOURCES_BULK_UPDATE_API, resources, "PATCH");
      yield call(request, VARIATIONS_BULK_UPDATE_API, variations, "PATCH");
    }
    if (adjustments && Object.keys(adjustments).length) {
      const _adjustments = Object.values(adjustments)
        .flatMap((adjustment) => adjustment)
        .map((adjustment) => ({
          ...adjustment,
          id: adjustment.variation_id,
        }));

      const {
        response: { meta },
      } = yield call(
        request,
        VARIATIONS_BULK_CHANGE_INVENTORY_API,
        _adjustments,
        "PATCH"
      );
      if (meta.status_code >= 200 && meta.status_code <= 300) {
        yield put(setSnackBarMessage("The changes were successfully applied.", "success"));
        if (action.callback) yield call(action.callback);
      } else yield put(setSnackBarMessage("The imposition of changes was unsuccessful.", "fail"));
    } else {
      yield put(setSnackBarMessage("The changes were successfully applied.", "success"));
      if (action.callback) yield call(action.callback);
    }
  } catch (err) {
    yield put(setSnackBarMessage("The imposition of changes was unsuccessful.", "fail"));
    console.log(err);
  }
  if (action.callback) yield call(action.callback);
}

export function* bulkUpdateProductsInventorySaga(action) {
  try {
    const { data: dto } = action;
    if (Object.keys(dto)?.length) {
      const { response } = yield call(
        request,
        BULK_UPDATE_PRODUCTS_INVENTORY_API,
        dto,
        "PATCH"
      );
      if (response?.meta?.status_code === 200) {
        yield put(setSnackBarMessage("The changes were successfully applied.", "success"));
        if (action.callback) yield call(action.callback, response.data);
      } else {
        yield put(setSnackBarMessage("The imposition of changes was unsuccessful.", "fail"));
      }
    } else {
      yield put(setSnackBarMessage("The imposition of changes was unsuccessful.", "fail"));
    }
  } catch (err) {
    yield put(setSnackBarMessage("The imposition of changes was unsuccessful.", "fail"));
    console.log(err);
  }
  if (action.callback) yield call(action.callback);
}

export function* bulkUpdateIngredientsSaga(action) {
  try {
    const { ingredients, adjustments } = action.data;
    if (
      !ingredients?.length &&
      !(adjustments && Object.keys(adjustments).length)
    ) {
      yield put(setSnackBarMessage("The material has not been changed!", "fail"));
      if (action.failureCallback) yield call(action.failureCallback);
    }
    if (ingredients?.length) {
      const {
        response: { meta },
      } = yield call(request, VARIATIONS_BULK_UPDATE_API, ingredients, "PATCH");
      if (meta.status_code >= 200 && meta.status_code <= 300) {
        yield put(
          setSnackBarMessage("Edit raw materials successfully performed.", "success")
        );
        if (action.successCallback) yield call(action.successCallback);
      } else {
        yield put(
          setSnackBarMessage("Edit raw materials failed successfully.", "fail")
        );
        if (action.failureCallback) yield call(action.failureCallback);
      }
    }
    if (adjustments && Object.keys(adjustments).length) {
      const {
        response: { meta },
      } = yield call(
        request,
        VARIATIONS_BULK_CHANGE_INVENTORY_API,
        Object.entries(adjustments).map(([key, value]) => ({
          ...value,
          id: +key,
        })),
        "PATCH"
      );
      if (meta.status_code >= 200 && meta.status_code <= 300) {
        yield put(
          setSnackBarMessage(
            "Change of inventory raw materials successfully performed.",
            "success"
          )
        );
        if (action.successCallback) yield call(action.successCallback);
      } else {
        yield put(
          setSnackBarMessage(
            "Failed to change the inventory of raw materials successfully.",
            "fail"
          )
        );
        if (action.failureCallback) yield call(action.failureCallback);
      }
    }
  } catch (err) {
    yield put(setSnackBarMessage("The imposition of changes was unsuccessful.", "fail"));
    if (action.failureCallback) yield call(action.failureCallback);

    console.log(err);
  }
}

export function* bulkUpdateModifierSetsSaga(action) {
  try {
    const adjustments = action.data.flatMap((modifierSet) => {
      return modifierSet.variations
        .map((variation) => ({
          id: variation.id,
          reason: variation.reason,
          amount: variation.amount,
        }))
        .filter((item) => item.reason);
    });
    const modifiers = action.data.flatMap((modifierSet) => {
      return modifierSet.variations;
    });
    if (adjustments.length) {
      yield call(
        request,
        VARIATIONS_BULK_CHANGE_INVENTORY_API,
        adjustments,
        "PATCH"
      );
    }
    const _modifiers = modifiers.map((modifier) => {
      const _modifier = { ...modifier };
      delete _modifier.inventory_count;
      return _modifier;
    });
    if (modifiers.length) {
      yield call(request, VARIATIONS_BULK_UPDATE_API, _modifiers, "PATCH");
    }

    setSnackBarMessage("The changes were successfully applied.", "success");
    if (action.callback) yield call(action.callback);
  } catch (err) {
    yield put(setSnackBarMessage("The imposition of changes was unsuccessful.", "fail"));
    console.log(err);
  }
}

export function* getBusinessDevicesSaga() {
  const business_slug = yield select(makeSelectBusinessSlug());
  try {
    yield put(startLoading());

    const {
      response: { data },
    } = yield call(request, GET_BUSINESS_DEVICES_API, { business_slug });
    if (data) yield put(setPosDevices(data));
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getDeviceSaga(action) {
  try {
    yield put(startLoading());
    if (action.data) {
      const {
        response: { data },
      } = yield call(request, POS_DEVICE_ITEM_API(action.data));
      if (data) {
        yield put(setPosDevice(data));
      }
    } else {
      yield put(setPosDevice(null));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* deletePosDeviceSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { meta },
    } = yield call(request, POS_DEVICE_ITEM_API(action.data), {}, "delete");

    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setSnackBarMessage("The device was successfully removed.", "success"));
      if (action.callback) yield call(action.callback);
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* updatePosUserSaga(action) {
  try {
    yield put(startLoading());
    const { licence, id, data: dto } = action.data;
    const {
      response: { meta },
    } = yield call(request, POS_USER_ITEM_API(licence, id), dto, "PATCH");

    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setSnackBarMessage("User changes successfully recorded.", "success")
      );
      yield put(getPosDevice(licence));
    }
    if (action.callback) yield call(action.callback);
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* updatePosDeviceSaga(action) {
  try {
    yield put(startLoading());
    const { id, data: dto } = action.data;
    const {
      response: { meta },
    } = yield call(request, POS_DEVICE_ITEM_API(id), dto, "PATCH");

    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setSnackBarMessage("Device changes were successfully registered.", "success")
      );
      if (action.callback) yield call(action.callback);
      yield put(getPosDevices());
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* deletePosUserSaga(action) {
  try {
    yield put(startLoading());
    const { licence, id } = action.data;
    const { status } = yield call(
      request,
      POS_USER_ITEM_API(licence, id),
      {},
      "delete"
    );
    if (status >= 200 && status <= 300) {
      yield put(
        setSnackBarMessage("The device has been successfully removed.", "success")
      );
      yield put(getPosDevice(licence));
    }
    if (action.callback) yield call(action.callback);
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* bulkAssignModifierSetsToDealsSaga(action) {
  const { id, deals } = action.data;
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      BULK_ADD_MODIFIERSET_TO_DEALS_API(id),
      { deals },
      "PATCH"
    );

    if (data) {
      yield put(
        setSnackBarMessage("Applications of the additive set were successfully registered.", "success")
      );
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* createPosUserSaga(action) {
  try {
    yield put(startLoading());
    const { data, licence } = action.data;
    const {
      response: { meta },
    } = yield call(request, POS_USER_ITEMS_API(licence), data, "post");
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(getPosDevice(licence));
    }
    if (action.callback) yield call(action.callback);
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* submitPurchaseSaga(action) {
  try {
    yield put(startLoading());

    const {
      response: { data, meta },
    } = yield call(request, SUBMITTED_PURCHASE_ORDERS_API, action.data, "POST");
    if (data) {
      yield put(setSnackBarMessage("The purchase document was successfully registered.", "success"));
      Router.back();
    } else if (meta.status_code === 403) {
      yield put(
        setSnackBarMessage(meta.detail.global_error_messages[0], "fail")
      );
    } else {
      yield put(setSnackBarMessage("Registration of the purchase document was unsuccessful.", "fail"));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("Registration of the purchase document was unsuccessful.", "fail"));
    yield put(stopLoading());
  }
}

export function* applySubmittedPurchaseSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      APPLY_SUBMITTED_PURCHASE_ORDER_API(action.data.id),
      action.data.data,
      "PATCH"
    );
    if (data) {
      yield put(setSnackBarMessage("The purchase document was successfully confirmed.", "success"));
      Router.back();
    } else {
      yield put(setSnackBarMessage("Confirmation of the purchase document failed.", "fail"));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("Confirmation of the purchase document failed.", "fail"));
    yield put(stopLoading());
  }
}

export function* applyReceivedPurchaseSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      APPLY_RECEIVED_PURCHASE_ORDER_API(action.data.id),
      action.data.data,
      "PATCH"
    );
    if (data) {
      yield put(setSnackBarMessage("The purchase document was successfully confirmed.", "success"));
      Router.back();
    } else {
      yield put(setSnackBarMessage("Confirmation of the purchase document failed.", "fail"));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("Confirmation of the purchase document failed.", "fail"));
    yield put(stopLoading());
  }
}

export function* acceptSubmittedPurchaseSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      ACCEPT_SUBMITTED_PURCHASE_ORDER_API(action.data),
      {},
      "PATCH"
    );
    if (data) {
      yield put(setSnackBarMessage("The purchase document was successfully registered.", "success"));
      Router.back();
    } else {
      yield put(setSnackBarMessage("Registration of the purchase document was unsuccessful.", "fail"));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("Registration of the purchase document was unsuccessful.", "fail"));
    yield put(stopLoading());
  }
}

export function* rejectReceivedPurchaseSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      REJECT_RECEIVED_PURCHASE_ORDER_API(action.data),
      {},
      "PATCH"
    );
    if (data) {
      yield put(setSnackBarMessage("The purchase document was rejected.", "success"));
      Router.back();
    } else {
      yield put(setSnackBarMessage("The extradition of the purchase document was unsuccessful.", "fail"));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("The extradition of the purchase document was unsuccessful.", "fail"));
    yield put(stopLoading());
  }
}

export function* receiveSubmittedPurchaseSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      RECEIVE_SUBMITTED_PURCHASE_ORDER_API(action.data.id),
      action.data.data,
      "PATCH"
    );
    if (data) {
      yield put(setSnackBarMessage("The purchase document was successfully received.", "success"));
      Router.back();
    } else {
      yield put(setSnackBarMessage("Received the purchase document was unsuccessful.", "fail"));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("Received the purchase document was unsuccessful.", "fail"));
    yield put(stopLoading());
  }
}

export function* getPurchaseSaga(action) {
  try {
    yield put(startLoading());
    yield put(setPurchase(null));
    const {
      response: { data },
    } = yield call(request, PURCHASE_ORDER_ITEM_API(action.data));
    if (data) {
      yield put(setPurchase(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* deletePurchaseSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(request, PURCHASE_ORDER_ITEM_API(action.data), {}, "DELETE");
    if (data) {
      yield put(setSnackBarMessage("The purchase document was successfully eliminated.", "success"));
      Router.back();
    } else {
      yield put(setSnackBarMessage("Removed the purchase document was unsuccessful.", "fail"));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("Removed the purchase document was unsuccessful.", "fail"));
    yield put(stopLoading());
  }
}

export function* updateSubmittedPurchaseSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data, meta },
    } = yield call(
      request,
      PURCHASE_ORDER_ITEM_API(action.data.id),
      action.data.data,
      "PATCH"
    );
    if (data) {
      yield put(setSnackBarMessage("The purchase document was successfully edited.", "success"));
      Router.back();
    } else if (meta.status_code === 403) {
      setSnackBarMessage(meta.detail.global_error_messages[0], "fail");
    } else {
      yield put(setSnackBarMessage("Edit the purchase document failed.", "fail"));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("Edit the purchase document failed.", "fail"));
    yield put(stopLoading());
  }
}

export function* bulkDeleteIngredientsSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { meta },
    } = yield call(request, BULK_DELETE_RESOURCES_API, action.data, "DELETE");
    if (meta.status_code === 204) {
      yield put(setSnackBarMessage("Raw materials were successfully eliminated", "success"));
      if (action.callback) yield call(action.callback);
    } else
      yield put(setSnackBarMessage("Removal of raw materials was not successful.", "fail"));
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("Removal of raw materials was not successful.", "fail"));
    yield put(stopLoading());
  }
}

export function* bulkDeleteModifiersSaga(action) {
  try {
    yield put(startLoading());
    const { status } = yield call(
      request,
      BULK_DELETE_RESOURCES_API,
      action.data,
      "DELETE"
    );
    if (status === 204) {
      yield put(setSnackBarMessage("The additives were successfully eliminated", "success"));
      if (action.callback) yield call(action.callback);
    } else
      yield put(setSnackBarMessage("Removed additives were not successful.", "fail"));
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("Removed additives were not successful.", "fail"));
    yield put(stopLoading());
  }
}

export function* bulkAddProductsVariationsToModifierSetsSaga(action) {
  try {
    yield put(startLoading());
    const { status } = yield call(
      request,
      BULK_ADD_PRODUCTS_VARIATIONS_TO_MODIFIER_SETS_API(action.modifierId),
      action.data,
      "PATCH"
    );
    if (status === 204) {
      yield put(
        setSnackBarMessage(
          "Added successfully added to the selected products.",
          "success"
        )
      );
      if (action.callback) yield call(action.callback);
    } else
      yield put(
        setSnackBarMessage("Added additives were not successful.", "fail")
      );
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("Added additives were not successful.", "fail"));
    yield put(stopLoading());
  }
}

export function* bulkAddLabelsToModifierSetsSaga(action) {
  try {
    yield put(startLoading());
    const { status } = yield call(
      request,
      BULK_ADD_LABELS_TO_MODIFIER_SETS_API(action.modifierId),
      action.data,
      "PATCH"
    );

    if (status === 204) {
      yield put(
        setSnackBarMessage(
          "Added successfully added to the selected labels.",
          "success"
        )
      );

      if (action.callback) yield call(action.callback);
    } else
      yield put(
        setSnackBarMessage("Added additives were not successful.", "fail")
      );

    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("Added additives were not successful.", "fail"));
    yield put(stopLoading());
  }
}

export function* createPosDeviceSaga(action) {
  try {
    yield put(startLoading());

    const {
      response: { meta, data },
    } = yield call(request, POS_DEVICE_ITEMS_API, action.data, "post");
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      localStorage.setItem("selected-pos-device", data.name);
      if (action.callback) yield call(action.callback);
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* renewPosLicenceSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { meta },
    } = yield call(
      request,
      POS_DEVICE_ITEM_API(action.data.licence),
      { regenerate_licence: true },
      "PATCH"
    );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(getPosDevice(action.data.licence));
      if (action.callback) yield call(action.callback);
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getProductReportSaga(action) {
  try {
    yield put(startLoading());
    if (action.data.id) {
      const {
        response: { data },
      } = yield call(
        request,
        VARIATION_REPORT_API(action.data.id),
        action.data.filters
      );
      if (data) yield put(setProductReport(data));
    } else {
      yield put(setProductReport(null));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getIngredientReportSaga(action) {
  try {
    yield put(startLoading());
    if (action.data.id) {
      const {
        response: { data },
      } = yield call(
        request,
        VARIATION_REPORT_API(action.data.id),
        action.data.filters
      );
      if (data) yield put(setIngredientReport(data));
    } else {
      yield put(setIngredientReport(null));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* bulkChangeDealsInventorySaga(action) {
  try {
    const {
      response: { data },
    } = yield call(
      request,
      BULK_DEALS_INVENTORY_CHANGE_API,
      action.data,
      "PATCH"
    );

    if (data) {
      yield put(setAdminProduct(data));
    }
    if (action.callback) yield call(action.callback, data);
  } catch (err) {
    console.log(err);
  }
}

export function* bulkChangeIngredientsInventorySaga(action) {
  try {
    const {
      response: { data },
    } = yield call(
      request,
      BULK_INGREDIENTS_INVENTORY_CHANGE_API,
      action.data,
      "PATCH"
    );

    if (data) {
      yield put(setAdminProduct(data));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* getAdminTransactionsSaga(action) {
  try {
    yield put(startLoading());
    yield put(setAdminTransactions([], {}));
    const business_slug = yield select(makeSelectBusinessSlug());

    const {
      response: { data, pagination },
    } = yield call(
      request,
      ORDER_TRANSACTIONS_API,
      { business_slug, ...action.data },
      "GET"
    );
    if (data) {
      yield put(setAdminTransactions(data, pagination));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getReceivedPurchasesSaga(action) {
  try {
    yield put(startLoading());
    yield put(setReceivedPurchases([], {}));
    const business_slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data, pagination },
    } = yield call(
      request,
      RECEIVED_PURCHASE_ORDERS_BY_BUSINESS_API,
      { business_slug, ...action.data },
      "GET"
    );
    if (data) {
      yield put(setReceivedPurchases(data, pagination));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getSubmittedPurchasesSaga(action) {
  try {
    yield put(startLoading());
    yield put(setSubmittedPurchases([], {}));
    const business_slug = yield select(makeSelectBusinessSlug());

    const {
      response: { data, pagination },
    } = yield call(
      request,
      SUBMITTED_PURCHASE_ORDERS_BY_BUSINESS_API,
      { business_slug, ...action.data },
      "GET"
    );
    if (data) {
      yield put(setSubmittedPurchases(data, pagination));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getOrderTransactionsSaga(action) {
  try {
    yield put(startLoading());
    yield put(setOrderTransactions([]));
    const {
      response: { data },
    } = yield call(
      request,
      ORDER_TRANSACTIONS_ITEMS_API(SHOPPING_PLUGIN, action.data)
    );
    if (data) {
      yield put(setOrderTransactions(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

// ANALYTICS SAGAS

export function* getProductsTopSellingReportSaga(action) {
  const { from, to, count } = action.data;
  const businessSlug = yield select(makeSelectBusinessSlug());
  try {
    yield put(startLoading(TOP_SELLING_REPORT_TYPE));
    const {
      response: { data },
    } = yield call(
      request,
      MOST_SOLD_PRODUCT_API(from, to, businessSlug, count),
      {},
      "GET"
    );
    if (data) {
      yield put(setProductsTopSellingReport(data));
    }
    yield put(stopLoading(TOP_SELLING_REPORT_TYPE));
  } catch (err) {
    yield put(stopLoading(TOP_SELLING_REPORT_TYPE));
  }
}

export function* requestAlopeykFunc(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      REQUEST_ALOPEYK_API(action.data.order_id, SHOPPING_PLUGIN),
      {},
      "POST"
    );
    if (data) {
      yield put(setSnackBarMessage("Your Alopic request was registered.", "success"));
      yield call(getShoppingAdminOrder, { data: { id: action.data.order_id } });
    } else {
      yield put(
        setSnackBarMessage("An error occurred in the Alopic request!", "fail")
      );
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* requestMiareFunc(action) {
  try {
    yield put(startLoading());
    const {
      response: { data, meta },
    } = yield call(
      request,
      REQUEST_MIARE_API(action.data.order_id, SHOPPING_PLUGIN),
      {},
      "POST"
    );
    if (data) {
      yield put(setSnackBarMessage("Your request was registered..", "success"));
      yield call(getShoppingAdminOrder, { data: { id: action.data.order_id } });
    } else {
      yield put(
        setSnackBarMessage(meta.detail.global_error_messages[0], "fail")
      );
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* assignDeliveryManSaga(action) {
  try {
    yield put(startLoading());
    if (action.data.deliverer || action.data.deliverer === null) {
      const {
        response: { data },
      } = yield call(
        request,
        ASSIGN_DELIVERY_MAN_API(SHOPPING_PLUGIN, action.data.order_id),
        {
          courier_id: action.data.deliverer,
          send_sms: true,
        },
        "PATCH"
      );
      if (data) {
        if (action.shouldUpdateList) {
          yield call(getShoppingAdminOrdersFunc, {
            data: action.actionForShouldUpdateListInAssignDelivery.data,
            domain: action.actionForShouldUpdateListInAssignDelivery.domain,
          });
        } else {
          yield call(getShoppingAdminOrder, {
            data: { id: action.data.order_id },
          });
        }

        yield put(
          setSnackBarMessage("The peak allocation was successfully completed.", "success")
        );
      } else {
        yield put(
          setSnackBarMessage("Error has occurred in the peak allocation!", "fail")
        );
      }
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("An error has occurred in order verification!", "fail"));
    yield put(stopLoading());
  }
}

export function* getBusinessShoppingDataSaga() {
  const slug = yield select(makeSelectBusinessSlug());
  try {
    yield put(startLoading(SHOPPING_DATA));
    const {
      response: { data },
    } = yield call(
      request,
      BUSINESS_LAST_DAYS_SHOPPING_DATA_API(),
      {
        business_slug: slug,
      },
      "GET"
    );
    if (data) {
      yield put(setBusinessShoppingReportData(data));
    }
    yield put(stopLoading(SHOPPING_DATA));
  } catch (err) {
    console.log(err);
    yield put(stopLoading(SHOPPING_DATA));
  }
}

export function* getReportDataSaga(action) {
  const { from, to, reportName, url, isMultiBranch, compareToPrevious } =
    action.data;
  let previousFromDate;
  let previousToDate;
  if (compareToPrevious) {
    [previousFromDate, previousToDate] = previousDatesGenerator(from, to);
  }
  const businessSlug = yield select(makeSelectBusinessSlug());
  try {
    yield put(startReportLoading(reportName));
    const {
      response: { data },
    } = yield call(request, url(from, to, businessSlug), {}, "GET");

    const {
      response: { data: comparedData },
    } = yield call(
      request,
      url(previousFromDate || from, previousToDate || to, businessSlug),
      {},
      "GET"
    );
    if (data && comparedData) {
      const currentRangeSerializedData = reportSerializer(
        from,
        to,
        data,
        isMultiBranch
      );
      const previousRangeSerializedData = reportSerializer(
        previousFromDate,
        previousToDate,
        comparedData,
        isMultiBranch
      );
      yield put(
        setReportData({
          reportName,
          currentRangeSerializedData,
          previousRangeSerializedData,
        })
      );
      yield put(stopReportLoading(reportName));
    }
  } catch (err) {
    console.log(err);
    yield put(stopReportLoading(reportName));
  }
}

export function* getJourneyStateSaga() {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const { id, has_operation, site_domain } = yield select(
      makeSelectBusiness()
    );
    const url = has_operation
      ? BISHTAR_CRM_JOURNEY_DATA_API(site_domain, id)
      : CRM_JOURNEY_DATA_API(slug);
    const {
      response: { data },
    } = yield call(request, url);
    if (data) {
      yield put(setJourneyState(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* updateJourneyStateSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const { id, has_operation, site_domain } = yield select(
      makeSelectBusiness()
    );
    const url = has_operation
      ? BISHTAR_CRM_JOURNEY_DATA_API(site_domain, id)
      : CRM_JOURNEY_DATA_API(slug);
    const {
      response: { data },
    } = yield call(
      request,
      url,
      { vitrin_journey_state: action.data },
      "PATCH"
    );
    if (data) {
      yield put(setJourneyState(data));
      if (action.callback) {
        yield call(action.callback);
      }
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getLegalDocumentsSaga(action) {
  try {
    yield put(startLoading());
    const id = yield select(makeSelectBusinessId());
    const {
      response: { data },
    } = yield call(request, LEGAL_DOCUMENT_ITEMS_API(id), action.data);
    if (data) {
      yield put(setLegalDocuments(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* createLegalDocumentsSaga(action) {
  try {
    yield put(startLoading());
    const id = yield select(makeSelectBusinessId());
    const {
      response: { data },
    } = yield call(
      request,
      LEGAL_DOCUMENT_ITEMS_API(id),
      action.data.data,
      "POST"
    );
    if (data) {
      yield put(getLegalDocuments(action.data.filters));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* updateLegalDocumentsSaga(action) {
  try {
    yield put(startLoading());
    const id = yield select(makeSelectBusinessId());
    const {
      response: { data },
    } = yield call(
      request,
      LEGAL_DOCUMENT_ITEM_API(id, action.data.id),
      action.data.data,
      "PATCH"
    );
    if (data) {
      yield put(getLegalDocuments(action.data.filters));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getCashDrawerTransactionsSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      CASH_DRAWER_ITEM_TRANSACTIONS_API(
        action.data.pos_id,
        action.data.drawer_id
      )
    );
    if (data) {
      yield put(setCashDrawerTransactions(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* openCashDrawerSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      OPEN_CASH_DRAWER_API(action.data.pos_id),
      action.data.data,
      "POST"
    );
    if (data) {
      if (action.callback) yield call(action.callback);
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* closeCashDrawerSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      CLOSE_CASH_DRAWER_API(action.data.pos_id),
      action.data.data,
      "POST"
    );
    if (data) {
      yield put(getPosDevice(action.data.pos_id));
      yield put(
        setSnackBarMessage("Changed the status of the fund successfully.", "success")
      );
      if (action.callback) yield call(action.callback);
    } else
      yield put(setSnackBarMessage("Change the status of the fund was unsuccessful!", "fail"));
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("Change the status of the fund was unsuccessful!", "fail"));
    console.log(err);
    yield put(stopLoading());
  }
}

export function* finishCashDrawerSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      FINISH_CASH_DRAWER_API(action.data.pos_id, action.data.drawer_id),
      action.data.data,
      "PATCH"
    );
    if (data) {
      yield put(getPosDevice(action.data.pos_id));
      yield put(
        setSnackBarMessage("Changed the status of the fund successfully.", "success")
      );
      if (action.callback) yield call(action.callback);
    } else
      yield put(setSnackBarMessage("Change the status of the fund was unsuccessful!", "fail"));
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("Change the status of the fund was unsuccessful!", "fail"));
    console.log(err);
    yield put(stopLoading());
  }
}

export function* createCashTransactionSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { meta },
    } = yield call(
      request,
      action.data.data?.amount > 0
        ? CREATE_PAID_IN_CASH_TRANSACTION_API(action.data.pos_id)
        : CREATE_PAID_OUT_CASH_TRANSACTION_API(action.data.pos_id),
      { ...action.data.data, amount: Math.abs(action.data.data.amount) },
      "POST"
    );
    if (meta?.status_code >= 200 && meta?.status_code <= 300) {
      yield put(getPosDevice(action.data.pos_id));
    }
    if (action.callback) yield call(action.callback);

    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getCashDrawersSaga(action) {
  const slug = yield select(makeSelectBusinessSlug());
  try {
    yield put(startLoading());
    yield put(setCashDrawers([], {}));
    const {
      response: { data, pagination },
    } = yield call(request, CASH_DRAWERS_ITEMS_API(slug), action.data);
    if (data) {
      yield put(setCashDrawers(data, pagination));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getCRMMembershipsPerUtmSource(action) {
  const slug = yield select(makeSelectBusinessSlug());
  const query = action.data;
  try {
    yield put(startLoading());
    const {
      response: { data, pagination },
    } = yield call(
      request,
      MEMBERSHIPS_SEARCH_API(query, slug),
      {
        business_slug: slug,
        ...query,
      },
      "GET"
    );
    if (data) {
      yield put(setCRMMembershipByQuery(data, pagination));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* searchCRMMembership(action) {
  const slug = yield select(makeSelectBusinessSlug());
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      MEMBERSHIPS_SEARCH_API,
      {
        business_slug: slug,
        search: action.data.phone,
      },
      "GET"
    );
    if (data) {
      yield put(setSearchedCRMMembership(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getMembershipEventLogs(action) {
  const { id, query } = action;

  try {
    yield put(startLoading(GET_CRM_MEMBERSHIP_EVENT_LOGS));
    const {
      response: { data, pagination },
    } = yield call(request, GET_MEMBERSHIP_EVENT_LOGS(id), query, "GET");
    if (data) {
      yield put(setMembershipEventLogs(data, pagination));
    }
    yield put(stopLoading(GET_CRM_MEMBERSHIP_EVENT_LOGS));
  } catch (err) {
    console.log(err);
    yield put(stopLoading(GET_CRM_MEMBERSHIP_EVENT_LOGS));
  }
}

export function* createDealVendorItemSaga(action) {
  try {
    yield put(startLoading());
    const { id, data } = action.data;
    const { response } = yield call(
      request,
      VARIATION_VENDOR_ITEMS_API(id),
      data,
      "POST"
    );
    if (
      response?.meta?.status_code >= 200 &&
      response?.meta.status_code <= 300
    ) {
      yield put(
        setSnackBarMessage(
          "The supplier was successfully added to the item.",
          "success"
        )
      );
      yield put(getAdminVendorItemsByDeal(id));
    } else
      yield put(
        setSnackBarMessage("Added supplier to the item failed.", "fail")
      );

    if (action.callback) yield call(action.callback);
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(
      setSnackBarMessage("Added supplier to the item failed.", "fail")
    );
    yield put(stopLoading());
  }
}

export function* createIngredientVendorItemSaga(action) {
  try {
    yield put(startLoading());
    const { id, data } = action.data;
    const { response } = yield call(
      request,
      VARIATION_VENDOR_ITEMS_API(id),
      data,
      "POST"
    );
    if (
      response?.meta?.status_code >= 200 &&
      response?.meta.status_code <= 300
    ) {
      yield put(
        setSnackBarMessage(
          "The supplier was successfully added to the item.",
          "success"
        )
      );
      yield put(getAdminVendorItemsByIngredient(id));
    } else
      yield put(
        setSnackBarMessage("Added supplier to the item failed.", "fail")
      );

    if (action.callback) yield call(action.callback);
    yield put(stopLoading());
  } catch (err) {
    yield put(
      setSnackBarMessage("Added supplier to the item failed.", "fail")
    );
    yield put(stopLoading());
  }
}

export function* changeSectionOrderingFunc(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const themeConfig = yield select(makeSelectBusinessThemeConfig());
    const business = yield select(makeSelectBusiness());
    const { data: sections } = action;
    const {
      response: { meta, data },
    } = yield call(
      request,
      BUSINESS_BY_SLUG_API(slug),
      { theme_config: { ...themeConfig, sections_skeleton: sections } },
      "PATCH"
    );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setBusiness({ business: { ...business, ...data } }));
    } else yield put(setSnackBarMessage("Edit was unsuccessful!", "fail"));
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("Edit was unsuccessful!", "fail"));
    yield put(stopLoading());
  }
}

export function* getAdminVendorsSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const { response } = yield call(
      request,
      VENDORS_BY_BUSINESS_API(),
      { business_slug: slug, ...action.data },
      "GET"
    );
    if (response?.data) {
      yield put(setAdminVendors(response.data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getAdminVendorSaga(action) {
  try {
    yield put(startLoading());
    if (action.data) {
      const {
        response: { data },
      } = yield call(request, VENDOR_ITEM_API(action.data));
      if (data) {
        yield put(setAdminVendor(data));
      }
    } else yield put(setAdminVendor(null));
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* updateVendorSaga(action) {
  try {
    yield put(startLoading());
    delete action.data.data.business;
    const {
      response: { meta, data },
    } = yield call(
      request,
      VENDOR_ITEM_API(action.data.id),
      action.data.data,
      "PATCH"
    );

    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setSnackBarMessage("Your changes were successfully registered.", "success"));
      yield put(setAdminVendor(data));
      if (action.callback) yield call(action.callback);
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* updateVendorItemSaga(action) {
  try {
    yield put(startLoading());
    const { id, data } = action.data;
    const { response } = yield call(
      request,
      VENDOR_ITEMS_ITEM_API(id),
      data,
      "PATCH"
    );

    if (
      response?.meta?.status_code >= 200 &&
      response?.meta?.status_code <= 300
    ) {
      yield put(setSnackBarMessage("Your changes were successfully registered.", "success"));
    } else yield put(setSnackBarMessage("Save the changes were unsuccessful.", "fail"));
    if (action.callback) yield call(action.callback);
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("Save the changes were unsuccessful.", "fail"));
    yield put(stopLoading());
  }
}

export function* getPurchaseReportsByIngredientsSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(
      request,
      PURCHASE_REPORTS_BY_INGREDIENTS_API,
      {
        business_slug: slug,
        from_date: action.data.from_date,
        to_date: action.data.to_date,
        variation_id: action.data.variation_id,
        business_id: action.data.business_id,
      },
      "GET"
    );
    if (data) {
      yield put(setPurchaseReportsByProduct(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getPurchaseReportsByIngredientsPerBranchSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(
      request,
      PURCHASE_REPORTS_BY_INGREDIENTS_PER_BRANCH_API,
      {
        business_slug: slug,
        from_date: action.data.from_date,
        to_date: action.data.to_date,
        variation_id: action.data.variation_id,
      },
      "GET"
    );
    if (data) {
      yield put(setPurchaseReportsByProductPerBranch(data));
    }
    if (action.callback) yield call(action.callback);
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("Save the changes were unsuccessful.", "fail"));
    yield put(stopLoading());
  }
}

export function* getAdminVendorItemsByDealSaga(action) {
  try {
    yield put(startLoading());
    if (action.data) {
      const {
        response: { data },
      } = yield call(request, VARIATION_VENDOR_ITEMS_API(action.data));
      if (data) {
        yield put(setAdminVendorItems(data));
      }
    } else yield put(setAdminVendorItems(null));
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getPurchaseReportsFromVendorsSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(
      request,
      PURCHASE_REPORTS_FROM_VENDORS_API,
      {
        business_slug: slug,
        from_date: action.data.from_date,
        to_date: action.data.to_date,
        object_id: action.data.object_id,
        business_id: action.data.business_id,
      },
      "GET"
    );
    if (data) {
      yield put(setPurchaseReportsFromVendors(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getPurchaseReportsFromVendorsPerBranchSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(
      request,
      PURCHASE_REPORTS_FROM_VENDORS_PER_BRANCH_API,
      {
        business_slug: slug,
        from_date: action.data.from_date,
        to_date: action.data.to_date,
        object_id: action.data.object_id,
      },
      "GET"
    );
    if (data) {
      yield put(setPurchaseReportsFromVendorsPerBranch(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getAdminVendorItemsByIngredientSaga(action) {
  try {
    yield put(startLoading());
    if (action.data) {
      const {
        response: { data },
      } = yield call(request, VARIATION_VENDOR_ITEMS_API(action.data));
      if (data) {
        yield put(setAdminVendorItems(data));
      }
    } else yield put(setAdminVendorItems(null));
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getIngredientsRecountingReportsSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(
      request,
      INGREDIENTS_RECOUNTING_REPORTS_API,
      { ...action.data, business_slug: slug },
      "GET"
    );
    if (data) {
      yield put(setIngredientsRecountingReports(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getIngredientsRecountingReportSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      INGREDIENTS_RECOUNTING_REPORT_API(action.data.id),
      {},
      "GET"
    );
    if (data) {
      yield put(setIngredientsRecountingReport(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* createIngredientsRecountingReportSaga(action) {
  try {
    yield put(startLoading());
    const urlPrefix = yield select(makeSelectAdminUrlPrefix());
    const {
      response: { data },
    } = yield call(
      request,
      CREATING_INGREDIENTS_RECOUNTING_REPORTS_API,
      {
        description: action.data.description,
        recounted_items: action.data.recounted_items,
        business_id: action.data.business_id,
      },
      "POST"
    );
    if (data) {
      yield put(
        Router.push(
          `${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/ingredients_storage/${data.id}`
        )
      );
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getVendorItemsByVendorSaga(action) {
  try {
    yield put(startLoading());
    if (action.data) {
      const {
        response: { data },
      } = yield call(
        request,
        VENDOR_ITEMS_BY_VENDOR_API(
          action.data.vendor,
          action.page,
          action.pageSize
        ),
        action.data
      );
      if (data) {
        yield put(setAdminVendorItems(data));
      }
    } else yield put(setAdminVendorItems(null));
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* updateSystemByNewInventoryCountsSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { meta },
    } = yield call(
      request,
      UPDATE_SYSTEM_BY_NEW_INVENTORY_COUNTS_API(action.data.id),
      {},
      "PATCH"
    );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setSnackBarMessage(
          "System update was successfully completed with new inventory.",
          "success"
        )
      );
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(
      setSnackBarMessage("The system update was not carried out with a new inventory", "fail")
    );
    yield put(stopLoading());
  }
}

export function* getProductsReportsSoldByCountSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(
      request,
      GET_PRODUCTS_REPORTS_SOLD_BY_COUNT_API,
      {
        business_id: action.data.business_id,
        from_date: action.data.from_date,
        to_date: action.data.to_date,
        from_delivery_date: action.data.from_delivery_date,
        to_delivery_date: action.data.to_delivery_date,
        sales_channel: action.data.sales_channel,
        business_slug: slug,
      },
      "GET"
    );
    if (data) {
      yield put(setProductsReportsSoldByCount(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getOrderTransactionsFinanceSummaryReportsSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(
      request,
      ORDER_TRANSACTIONS_FINANCE_SUMMARY_REPORTS_API,
      {
        business_id: action.data.business_id,
        from_date: action.data.from_date,
        to_date: action.data.to_date,
        sales_channel: action.data.sales_channel,
        business_slug: slug,
      },
      "GET"
    );
    if (data) {
      yield put(setOrderTransactionsFinanceSummaryReports(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getShoppingOrdersFinanceSummaryReportsSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(
      request,
      SHOPPING_ORDERS_FINANCE_SUMMARY_REPORTS_API,
      {
        business_id: action.data.business_id,
        from_date: action.data.from_date,
        to_date: action.data.to_date,
        sales_channel: action.data.sales_channel,
        business_slug: slug,
      },
      "GET"
    );
    if (data) {
      yield put(setShoppingOrdersFinanceSummaryReports(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getShoppingOrdersPaymentSummaryReportsSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(
      request,
      SHOPPING_ORDERS_PAYMENT_SUMMARY_REPORTS_API,
      {
        business_id: action.data.business_id,
        from_date: action.data.from_date,
        to_date: action.data.to_date,
        sales_channel: action.data.sales_channel,
        business_slug: slug,
      },
      "GET"
    );
    if (data) {
      yield put(setShoppingOrdersPaymentSummaryReports(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getCustomersTaxingReportsSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(
      request,
      CUSTOMERS_TAXING_REPORTS,
      {
        business_id: action.data.business_id,
        from_date: action.data.from_date,
        to_date: action.data.to_date,
        business_slug: slug,
      },
      "GET"
    );
    if (data) {
      yield put(setCustomersTaxingReports(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getCustomersSatisfactionReviewsReportsSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(
      request,
      CUSTOMERS_SATISFACTION_REVIEWS_REPORTS_API,
      {
        business_id: action.data.business_id,
        from_date: action.data.from_date,
        to_date: action.data.to_date,
        business_slug: slug,
      },
      "GET"
    );
    if (data) {
      yield put(setCustomersSatisfactionReviewsReports(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getCustomersDisSatisfactionReviewsReportsSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(
      request,
      CUSTOMERS_DISSATISFACTION_REVIEWS_REPORTS_API,
      {
        business_id: action.data.business_id,
        from_date: action.data.from_date,
        to_date: action.data.to_date,
        business_slug: slug,
      },
      "GET"
    );
    if (data) {
      yield put(setCustomersDisSatisfactionReviewsReports(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getSubmittedPurchasesReportsSaga(action) {
  try {
    yield put(startLoading());
    yield put(setSubmittedPurchases([], {}));
    const business_slug = yield select(makeSelectBusinessSlug());

    const {
      response: { data, pagination },
    } = yield call(
      request,
      SUBMITTED_PURCHASE_ORDERS_REPORTS_API,
      { business_slug, ...action.data },
      "GET"
    );
    if (data) {
      yield put(setSubmittedPurchasesReports(data, pagination));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getSubmittedPurchasesReportsPerBranchSaga(action) {
  try {
    yield put(startLoading());
    yield put(setSubmittedPurchases([], {}));
    const business_slug = yield select(makeSelectBusinessSlug());

    const {
      response: { data, pagination },
    } = yield call(
      request,
      SUBMITTED_PURCHASE_ORDERS_REPORTS_PER_BRANCH_API,
      { business_slug, ...action.data },
      "GET"
    );
    if (data) {
      yield put(setSubmittedPurchasesReportsPerBranch(data, pagination));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getWarehouseReportingCategories(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      WAREHOUSE_REPORTING_CATEGORIES_API,
      {
        label_id: action.data.label_id,
        business_slug: action.data.business_slug,
      },
      "GET"
    );
    if (data) {
      yield put(setWarehouseReportingCategories(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getBusinessCategoriesSaga(action) {
  try {
    const slug = yield select(makeSelectBusinessSlug());
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      BUSINESS_CATEGORIES_API(slug),
      action.data.filters,
      "GET"
    );
    if (data) {
      yield put(setBusinessCategories(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getOrderTransactionsFinancePaymentTypesSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(
      request,
      ORDER_TRANSACTIONS_FINANCE_PAYMENT_TYPES_API,
      {
        business_slug: slug,
        business_id: action.data.business_id,
        from_date: action.data.from_date,
        to_date: action.data.to_date,
        payment_type: action.data.payment_type,
      },
      "GET"
    );
    if (data) {
      yield put(setOrderTransactionsFinancePaymentTypes(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getInventoryHistoryReports(action) {
  try {
    yield put(startLoading());
    const business_slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(
      request,
      INVENTORY_HISTORY_REPORTS,
      {
        business_id: action.data.business_id,
        from_date: action.data.from_date,
        to_date: action.data.to_date,
        reason: action.data.reason,
        search: action.data.search,
        business_slug,
      },
      "GET"
    );
    if (data) {
      yield put(
        setInventoryHistoryReports({
          inventoryHistoryReports: data,
        })
      );
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getOrderTransactionsPerPaymentTypesPerChannelsSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(
      request,
      ORDER_TRANSACTION_PER_PAYMENT_TYPE_PER_SALES_CHANNEL,
      {
        business_id: action.data.business_id,
        from_date: action.data.from_date,
        to_date: action.data.to_date,
        business_slug: slug,
        sales_channel: action.data.sales_channel,
      },
      "GET"
    );
    if (data) {
      yield put(setOrderTransactionsPerPaymentTypePerSalesChannel(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getDiscountCodeReportsSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(
      request,
      DISCOUNT_CODE_REPORTS_API,
      {
        business_id: action.data.business_id,
        from_date: action.data.from_date,
        to_date: action.data.to_date,
        business_slug: slug,
        discount_code: action.data.discount_code,
        sales_channel: action.data.sales_channel,
      },
      "GET"
    );
    if (data) {
      yield put(setDiscountCodeReports(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getShoppingOrderAggregate(action) {
  try {
    yield put(startLoading());
    const {
      response: { data, pagination },
    } = yield call(
      request,
      SHOPPING_ORDER_AGGREGATE_API,
      { ...action.data },
      "GET"
    );
    if (data) {
      yield put(setShopingOrderAggregate(data, pagination));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* deleteAdminVendorItemSaga(action) {
  try {
    yield put(startLoading());
    const { id } = action.data;
    const { response } = yield call(
      request,
      VENDOR_ITEMS_ITEM_API(id),
      {},
      "DELETE"
    );
    if (
      response?.meta?.status_code >= 200 &&
      response?.meta?.status_code <= 300
    ) {
      yield put(
        setSnackBarMessage("The supplier successfully removed from the item.", "success")
      );
    } else
      setSnackBarMessage("The supplier's deletion was not successful.", "fail");

    if (action.callback) yield call(action.callback);
    yield put(stopLoading());
  } catch (err) {
    yield put(
      setSnackBarMessage("The supplier's deletion was not successful.", "fail")
    );
    yield put(stopLoading());
  }
}

export function* createAdminVendorSaga(action) {
  try {
    yield put(startLoading());
    const business = yield select(makeSelectBusinessId());
    const { response } = yield call(
      request,
      VENDOR_API,
      { ...action.data, business },
      "POST"
    );
    if (
      response?.meta?.status_code >= 200 &&
      response?.meta.status_code <= 300
    ) {
      yield put(
        setSnackBarMessage("The supplier was successfully added.", "success")
      );
      yield call(Router.back);
    } else
      yield put(setSnackBarMessage("Added the supplier was unsuccessful.", "fail"));

    if (action.callback) yield call(action.callback);
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("Added the supplier was unsuccessful.", "fail"));
    yield put(stopLoading());
  }
}

export function* getTotalRequestedPurchaseItemsSaga(action) {
  try {
    yield put(startLoading());
    yield put(setTotalRequestedPurchaseItems(null));
    const business_id = yield select(makeSelectBusinessId());

    const {
      response: { data },
    } = yield call(
      request,
      TOTAL_PURCHASE_ITEMS_API,
      { business_id, ...action.data },
      "GET"
    );
    if (data) {
      yield put(setTotalRequestedPurchaseItems(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* addShopingNote(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      ORDER_ADD_NOTE_API(SHOPPING_PLUGIN, action.data.id),
      action.data,
      "POST"
    );
    if (data) {
      yield call(getShoppingAdminOrder, {
        data: { id: action.data.id },
      });
      yield put(setSnackBarMessage("The notes were successfully added", "success"));
    } else
      yield put(
        setSnackBarMessage("An error has occurred in adding an error", "fail")
      );
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getVendorItemsByBusinessSaga(action) {
  try {
    yield put(startLoading());
    const business_slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(request, VENDOR_ITEMS_BY_BUSINESS_API, {
      ...action.data,
      business_slug,
    });
    if (data) {
      yield put(setAdminVendorItems(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getFirstAndLastReportSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(
      request,
      FIRST_AND_LAST_REPORT_API,
      {
        business_id: action.data.business_id,
        from_date: action.data.from_date,
        to_date: action.data.to_date,
        business_slug: slug,
        sales_channel: action.data.sales_channel,
      },
      "GET"
    );
    if (data) {
      yield put(setFirstAndLastReport(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* importCsv(action) {
  try {
    yield put(startLoading());
    const { status } = yield call(
      request,
      IMPORT_CSV_API,
      { ...action.data },
      "POST"
    );
    if (status >= 200 && status <= 300) {
      yield put(setHasError(false, IMPORT_CSV_ERROR));
      if (action.onSuccess) yield call(action.onSuccess);
    } else {
      if (action.onError) yield call(action.onError);
      yield put(setHasError(true, IMPORT_CSV_ERROR));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
    console.log(err);
    yield call(action.onError);
    yield put(setHasError(true, IMPORT_CSV_ERROR));
  }
}

export function* getLabelsSaga() {
  try {
    yield put(startLoading("crm_labels"));
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(request, C_LABELS_API(slug));
    yield put(setLabels(data));
    yield put(stopLoading("crm_labels"));
  } catch (err) {
    yield put(stopLoading("crm_labels"));
  }
}

export function* updateCustomerLabelsSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(request, C_LABELS_API(slug), action.data, "POST");
    if (data) {
      yield put(
        setSnackBarMessage("Your changes were successfully stored.", "success")
      );
      yield put(getLabels());
    } else {
      yield put();
      yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
    yield put(stopLoading());
  }
}

export function* updateCrmLabelSaga(action) {
  const { labelId, type, ...rest } = action.data;

  console.log(labelId, type, rest);
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(request, UPDATE_LABEL_API(labelId), rest, "PATCH");
    if (data) {
      yield put(
        setSnackBarMessage("Your changes were successfully stored.", "success")
      );
      yield put(getLabels());
    } else {
      yield put();
      yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
    yield put(stopLoading());
  }
}

export function* changeCustomerLabelsSaga(action) {
  try {
    yield put(startLoading());
    //const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data: crm_label },
    } = yield call(request, UPDATE_LABEL_API(action.id), action.data, "PATCH");
    if (crm_label) {
      yield put(getLabels());
      yield put(setSnackBarMessage("The tag was successfully edited", "success"));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("Please try again..", "fail"));
    yield put(stopLoading());
  }
}

export function* addLabelToMembershipGroupSga(action) {
  const { labelId, data: actionData, callBack } = action;
  try {
    yield put(startLoading());
    const { status } = yield call(
      request,
      ADD_LABEL_TO_MEMBERSHIP_GROUP_API(labelId),
      { memberships: actionData },
      "PATCH"
    );
    if (status >= 200 && status < 300) {
      yield put(
        setSnackBarMessage("Your changes were successfully stored.", "success")
      );
    } else {
      yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
    }
    yield put(stopLoading());
    if (callBack) callBack();
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
    yield put(stopLoading());
  }
}

export function* createSurveyTemplateSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(request, CREATE_SURVEY_TEMPLATE_API, action.data, "POST");
    if (data) {
      yield put(
        setSnackBarMessage("Your changes were successfully stored.", "success")
      );
      yield put(stopLoading());
    } else {
      yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
      yield put(stopLoading());
    }
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
    yield put(stopLoading());
  }
}

export function* updateCrmSurveyDelaySaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(
      request,
      FEEDBACK_DELAY_API(slug),
      { ...action.data, update: true },
      "PATCH"
    );
    if (data) {
      yield put(
        setSnackBarMessage("Your changes were successfully stored.", "success")
      );
      yield put(getBusiness());
      yield put(stopLoading());
    } else {
      yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
      yield put(stopLoading());
    }
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
    yield put(stopLoading());
  }
}

export function* getCrmLevelsSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(request, CUSTOMER_LEVELS_LIST_API(slug), action.data, "GET");
    yield put(setCrmLevels(data));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getCrmLevelSaga(action) {
  const { id } = action.data;
  try {
    yield put(startLoading(GET_CRM_LEVEL_BY_ID));
    const {
      response: { data },
    } = yield call(request, CUSTOMER_LEVELS_API(id), {}, "GET");
    yield put(setCrmLevelItem(data));
    yield put(stopLoading(GET_CRM_LEVEL_BY_ID));
  } catch (err) {
    yield put(stopLoading(GET_CRM_LEVEL_BY_ID));
  }
}

export function* updateCrmLevelSaga(action) {
  const { id } = action.data;
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(request, CUSTOMER_LEVELS_API(id), action.data, "PATCH");
    if (data) {
      yield put(
        setSnackBarMessage("Your changes were successfully stored.", "success")
      );
    } else {
      yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
    yield put(stopLoading());
  }
}

export function* importMembershipsSaga(action) {
  const { data, callback } = action;
  try {
    yield put(startLoading(IMPORT_MEMBERSHIPS));
    const business_id = yield select(makeSelectBusinessId());
    const { status, response } = yield call(
      request,
      IMPORT_MEMBERSHIPS_API(),
      { ...data, business_id },
      "POST"
    );
    if (status >= 200 && status < 300) {
      yield put(
        setSnackBarMessage("Your changes were successfully stored.", "success")
      );
      callback && callback(response.data);
    } else {
      yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
    }
    yield put(getCrmLevels());
    yield put(stopLoading(IMPORT_MEMBERSHIPS));
  } catch (err) {
    yield put(stopLoading(IMPORT_MEMBERSHIPS));
  }
}

// CRM SEGMENTS

export function* deleteCrmLevelSaga(action) {
  const id = action.data;
  try {
    yield put(startLoading());
    const { status } = yield call(
      request,
      CUSTOMER_LEVELS_API(id),
      action.data,
      "DELETE"
    );
    if (status >= 200 && status < 300) {
      yield put(
        setSnackBarMessage("Your changes were successfully stored.", "success")
      );
    } else {
      yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
    }
    yield put(getCrmLevels());
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* createCrmLevelSaga(action) {
  try {
    yield put(startLoading());
    const business = yield select(makeSelectBusinessId());
    const {
      response: { data },
    } = yield call(
      request,
      CREATE_LEVELS_API,
      { ...action.data, business },
      "POST"
    );
    yield put(stopLoading());
    if (data)
      yield put(
        setSnackBarMessage("Your changes were successfully stored.", "success")
      );
    yield put(getCrmLevels());
  } catch (err) {
    yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
    yield put(stopLoading());
  }
}

export function* getCrmSegmentsListSaga(action) {
  const { query } = action;
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data, pagination },
    } = yield call(request, SEGMENTS_LIST_API(slug), query, "GET");
    yield put(setCrmSegmentList(data, pagination));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getCrmSegmentItemSaga(action) {
  const { id } = action;
  try {
    yield put(startLoading(GET_CRM_SEGMENT_BY_ID));
    const {
      response: { data },
    } = yield call(request, SEGMENT_BY_ID_API(id));
    yield put(setCrmSegment(data));
    yield put(stopLoading(GET_CRM_SEGMENT_BY_ID));
  } catch (err) {
    console.log(err);
    yield put(stopLoading(GET_CRM_SEGMENT_BY_ID));
  }
}

export function* updateCrmSegmentSaga(action) {
  const { id, data: actionData, callback } = action;
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(request, SEGMENT_BY_ID_API(id), actionData, "PATCH");
    if (data) {
      yield put(
        setSnackBarMessage("Your changes were successfully stored.", "success")
      );
      if (callback) callback();
    } else {
      yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
    console.log(err);
    yield put(stopLoading());
  }
}

export function* createSegmentSaga(action) {
  const { data: actionData, callback } = action;
  const business = yield select(makeSelectBusinessId());
  try {
    yield put(startLoading(CREATE_CRM_SEGMENT));
    const {
      response: { data },
    } = yield call(
      request,
      CREATE_SEGMENT_API(),
      { ...actionData, business },
      "POST"
    );
    if (data) {
      yield put(setCrmSegment(data));
      if (callback) callback(data);
      yield put(
        setSnackBarMessage("Your changes were successfully stored.", "success")
      );
    } else {
      yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
    }

    yield put(stopLoading(CREATE_CRM_SEGMENT));
  } catch (err) {
    yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
    console.log(err);
    yield put(stopLoading(CREATE_CRM_SEGMENT));
  }
}

export function* deleteCrmSegmentSaga(action) {
  const { id } = action;
  try {
    yield put(startLoading());
    const { status } = yield call(request, SEGMENT_BY_ID_API(id), {}, "DELETE");
    if (status >= 200 && status < 300) {
      yield put(
        setSnackBarMessage("Your changes were successfully stored.", "success")
      );
    } else {
      yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
    }
    yield put(stopLoading());
    yield put(getCrmSegments());
  } catch (err) {
    yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getAggregateRatingSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(request, GET_AGGREGATE_RATING_API(action.data), "GET");
    if (data) {
      yield put(setAggregateRating(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* updateSurveyTemplateSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      UPDATE_SURVEY_TEMPLATE_API(action.data.template_id),
      action.data.template_info,
      "PATCH"
    );
    if (data) {
      yield put(
        setSnackBarMessage(
          "Edit Survey Settings successfully performed",
          "success"
        )
      );
      yield put(stopLoading());
    } else {
      yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
      yield put(stopLoading());
    }
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
    yield put(stopLoading());
  }
}

export function* getAutomatedProcessListSaga(action) {
  const isActionTriggeredWithReduxToolkit = action["@@redux-saga/SAGA_ACTION"];
  if (isActionTriggeredWithReduxToolkit) {
    yield put(stopLoading());
    return;
  }

  const { query } = action;

  try {
    const slug = yield select(makeSelectBusinessSlug());
    yield put(startLoading());
    const {
      response: { data, pagination },
    } = yield call(request, AUTOMATED_PROCESSES_LIST_API(slug), query, "GET");
    if (data) {
      yield put(setAutomatedProcesses(data, pagination));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getAutomatedProcessItemSaga(action) {
  const { id } = action;
  try {
    yield put(startLoading(GET_AUTOMATED_PROCESS_BY_ID));
    const {
      response: { data },
    } = yield call(request, AUTOMATED_PROCESSES_BY_ID_API(id), {}, "GET");
    if (data) {
      yield put(setAutomatedProcess(data));
    }
    yield put(stopLoading(GET_AUTOMATED_PROCESS_BY_ID));
  } catch (err) {
    console.log(err);
    yield put(stopLoading(GET_AUTOMATED_PROCESS_BY_ID));
  }
}

export function* updateAutomatedProcessSaga(action) {
  const { data: actionData, id, callback } = action;
  try {
    const {
      response: { data },
    } = yield call(
      request,
      AUTOMATED_PROCESSES_BY_ID_API(id),
      actionData,
      "PATCH"
    );
    if (data) {
      yield put(
        setSnackBarMessage("Your changes were successfully stored.", "success")
      );
      callback && callback();
    } else {
      yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
    }
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
  }
}

export function* createAutomatedProcessSaga(action) {
  const { data: actionData } = action;
  const business = yield select(makeSelectBusinessId());
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      CREATE_AUTOMATED_PROCESS_API(),
      { ...actionData, business },
      "POST"
    );
    if (data) {
      yield put(
        setSnackBarMessage("Automatic process was successfully saved", "success")
      );
      yield put(stopLoading());
    } else {
      yield put(
        setSnackBarMessage("The automatic process registration was not successful.", "fail")
      );
      yield put(stopLoading());
    }
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("The automatic process registration was not successful.", "fail"));
    yield put(stopLoading());
  }
}

export function* deleteAutomatedProcessSaga(action) {
  const { id, event_type } = action;
  try {
    yield put(startLoading());
    const { status } = yield call(
      request,
      AUTOMATED_PROCESSES_BY_ID_API(id),
      {},
      "DELETE"
    );
    if (status >= 200 && status < 300) {
      yield put(
        setSnackBarMessage("Your changes were successfully stored.", "success")
      );
      yield put(stopLoading());
      yield put(getAutomatedProcesses(event_type));
    } else {
      yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
      yield put(stopLoading());
    }
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("Registering changes was unsuccessful!", "fail"));
    yield put(stopLoading());
  }
}

export function* giftCreditTransactions(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      CRM_GIFT_TRANSACTIONS(action.id),
      action.data,
      "POST"
    );
    if (data) {
      yield put(setCreditTransaction(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* createProductSaga(action) {
  try {
    yield put(startLoading());
    const business = yield select(makeSelectBusinessId());
    const { product, images } = action.data;
    const convertedImages = images.map((item) => ({
      image: `${item.folder_name}/${item.file_name}`,
    }));
    const { callback } = action;

    const {
      response: { meta, data: resource },
    } = yield call(
      request,
      RESOURCES_API,
      { ...product, business, images: convertedImages },
      "POST"
    );

    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setAdminProduct(resource));
      yield put(setSnackBarMessage("The product was successfully added.", "success"));
      if (callback) {
        callback(resource.id);
      } else Router.back();
    } else yield put(setSnackBarMessage("Product registration failed!", "fail"));
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("Product registration failed!", "fail"));
    yield put(stopLoading());
  }
}

export function* deleteProductSaga(action) {
  try {
    yield put(startLoading());
    const { id } = action.data;
    const { status } = yield call(request, RESOURCE_API(id), {}, "DELETE");

    if (status >= 200 && status <= 300) {
      yield put(setSnackBarMessage("The desired product was removed.", "success"));
      if (action?.callback) yield call(action?.callback);
    } else yield put(setSnackBarMessage("Removing the product was unsuccessful!", "fail"));
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("Removing the product was unsuccessful!", "fail"));
    yield put(stopLoading());
  }
}

export function* updateProductVariationSaga(action) {
  try {
    yield put(startLoading());
    const { variation, variationInventoryAdjustment } = action.data;
    const {
      response: { meta },
    } = yield call(request, VARIATION_API(variation.id), variation, "PATCH");
    if (
      variationInventoryAdjustment &&
      Object.keys(variationInventoryAdjustment).length
    ) {
      yield call(
        request,
        VARIATION_CHANGE_INVENTORY_API(variation.id),
        variationInventoryAdjustment,
        "PATCH"
      );
    }
    const modifierSets = variation?.modifier_sets?.map((modifierSet) => ({
      modifier_set: modifierSet.id,
      minimum_choice: modifierSet.minimum_choice,
      maximum_choice: modifierSet.maximum_choice,
    }));
    yield call(
      request,
      VARIATION_MODIFIER_SETS_API(variation.id),
      modifierSets,
      "POST"
    );

    const ingredients = variation?.ingredients?.map((ingredient) => ({
      item: ingredient.id,
      fraction: ingredient.fraction,
    }));
    if (ingredients?.length) {
      yield call(
        request,
        VARIATION_INGREDIENTS_API(variation.id),
        [...ingredients],
        "POST"
      );
    }

    yield put(getAdminProduct(variation.resource));
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setSnackBarMessage("Product editing successfully performed", "success")
      );
      if (action.callback) yield call(action.callback);
    } else yield put(setSnackBarMessage("Product editing failed", "fail"));
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("Product editing failed", "fail"));
    yield put(stopLoading());
  }
}

export function* updateProductSaga(action) {
  try {
    yield put(startLoading());
    const { product, productInventoryAdjustment, hasVariations } = action.data;
    delete product.deals;
    const {
      response: { meta },
    } = yield call(request, RESOURCE_API(product.id), product, "PATCH");
    yield call(
      request,
      VARIATIONS_BULK_CREATE_OR_UPDATE_OR_DELETE_API(product.id),
      product.variations,
      "POST"
    );
    if (!hasVariations) {
      if (productInventoryAdjustment) {
        if (Object.keys(productInventoryAdjustment).length)
          yield call(
            request,
            VARIATION_CHANGE_INVENTORY_API(product.variations?.[0]?.id),
            productInventoryAdjustment,
            "PATCH"
          );
      }
      const modifierSets = product.variations?.[0]?.modifier_sets?.map(
        (modifierSet) => ({
          modifier_set: modifierSet.modifier_set,
          minimum_choice: modifierSet.minimum_choice,
          maximum_choice: modifierSet.maximum_choice,
        })
      );

      yield call(
        request,
        VARIATION_MODIFIER_SETS_API(product.variations?.[0]?.id),
        modifierSets,
        "POST"
      );

      let ingredients = product.variations?.[0]?.ingredients?.map(
        (ingredient) => ({
          item: ingredient.id,
          fraction: ingredient.fraction,
        })
      );

      if (ingredients?.length) {
        ingredients = ingredients.filter((item) => {
          return item.item;
        });
        yield call(
          request,
          VARIATION_INGREDIENTS_API(product.variations?.[0]?.id),
          [...ingredients],
          "POST"
        );
      }
    }

    // const {
    //   response: { data: fetchedProduct },
    // } = yield call(request, RESOURCE_API(product.id), {}, "GET");

    // if (variation.main_image_url) {
    //   const dto = {
    //     image: `${variation.main_image_url.folder_name}/${variation.main_image_url.file_name}`,
    //     variation: fetchedProduct.variations[0].id,
    //   };
    //   yield callisVariationIdChangeConfirmationModalOpen
    yield put(getAdminProduct(product.id));
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setSnackBarMessage("Product editing successfully performed", "success")
      );
      if (action.callback) yield call(action.callback);
    } else yield put(setSnackBarMessage("Product editing failed", "fail"));
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("Product editing failed", "fail"));
    yield put(stopLoading());
  }
}

export function* uploadImageAndUpdateProductSaga(action) {
  const { resource_id } = action.data;
  if (resource_id) {
    try {
      yield put(startLoading());
      const uploadedFile = yield select(makeSelectUploadedFile());
      const dto = {
        image: `${uploadedFile.folder_name}/${uploadedFile.file_name}`,
        resource: resource_id,
      };
      const {
        response: { meta },
      } = yield call(request, RESOURCES_IMAGES_API, dto, "POST");

      if (meta.status_code >= 200 && meta.status_code <= 300) {
        const {
          response: { data: _resource },
        } = yield call(request, RESOURCE_API(resource_id));

        yield put(setAdminProductImages(_resource?.images));
        yield put(getAdminProduct(resource_id));
        yield put(
          setSnackBarMessage("The desired photo was successfully stored.", "success")
        );
        yield put(clearUploadedFiles());
        if (action.callback) yield call(action.callback);
      } else yield put(setSnackBarMessage("Save the photo failed.", "fail"));
      yield put(stopLoading());
    } catch (err) {
      console.log(err);
      yield put(setSnackBarMessage("Save the photo failed.", "fail"));
      yield put(stopLoading());
    }
  }
}

export function* uploadImageAndUpdateVariationSaga(action) {
  const { variation_id, resource_id } = action.data;
  if (variation_id) {
    try {
      yield put(startLoading());
      const uploadedFile = yield select(makeSelectUploadedFile());
      const dto = {
        image: `${uploadedFile.folder_name}/${uploadedFile.file_name}`,
        variation: variation_id,
      };
      const {
        response: { meta },
      } = yield call(request, VARIATIONS_IMAGES_API, dto, "POST");

      if (meta.status_code >= 200 && meta.status_code <= 300) {
        yield call(request, VARIATION_API(variation_id));
        yield put(getAdminProduct(resource_id));
        yield put(
          setSnackBarMessage("The desired photo was successfully stored.", "success")
        );
        yield put(clearUploadedFiles());
        if (action.callback) yield call(action.callback);
      } else yield put(setSnackBarMessage("Save the photo failed.", "fail"));
      yield put(stopLoading());
    } catch (err) {
      console.log(err);
      yield put(setSnackBarMessage("Save the photo failed.", "fail"));
      yield put(stopLoading());
    }
  }
}

export function* deleteImageFromVariation(action) {
  try {
    yield put(startLoading());
    const { imageId, variationId, resourceId } = action.data;
    const { status: status_code } = yield call(
      request,
      VARIATIONS_IMAGES_ITEM_API(imageId),
      {},
      "DELETE"
    );
    if (status_code >= 200 && status_code <= 300) {
      yield call(request, VARIATION_API(variationId));
      yield put(getAdminProduct(resourceId));
      if (action.callback) action.callback();
    }

    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* deleteImageFromProduct(action) {
  try {
    yield put(startLoading());
    const { imageId, resourceId } = action.data;
    const { status: status_code } = yield call(
      request,
      RESOURCES_IMAGES_ITEM_API(imageId),
      {},
      "DELETE"
    );

    if (status_code >= 200 && status_code <= 300) {
      const {
        response: { data: resource },
      } = yield call(request, RESOURCE_API(resourceId));
      yield put(setAdminProductImages(resource?.images));
      yield put(getAdminProduct(resourceId));
      if (action.callback) action.callback();
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* updateImageFromProduct(action) {
  try {
    yield put(startLoading());
    const { imageId, order } = action.data;
    const { status: status_code } = yield call(
      request,
      RESOURCES_IMAGES_ITEM_API(imageId),
      order,
      "PATCH"
    );

    if (status_code >= 200 && status_code <= 300) {
      if (action.callback) action.callback();
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* createModifierSetSaga(action) {
  const business = yield select(makeSelectBusinessId());
  try {
    yield put(startLoading());
    const dto = action.data;
    const {
      response: { meta },
    } = yield call(request, RESOURCES_API, { ...dto, business }, "POST");
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setSnackBarMessage("The additive set was successfully added.", "success")
      );
      if (action.callback) yield call(action.callback);
    } else
      yield put(setSnackBarMessage("The registration of the additive set was unsuccessful", "fail"));
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("The registration of the additive set was unsuccessful", "fail"));
    yield put(stopLoading());
  }
}

export function* deleteModifierSetSaga(action) {
  try {
    yield put(startLoading());
    const { id } = action.data;

    const {
      response: { meta },
    } = yield call(request, RESOURCE_API(id), {}, "DELETE");
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setSnackBarMessage("Removed A additive collection successfully performed", "success")
      );
      if (action.callback) yield call(action.callback);
    } else
      yield put(setSnackBarMessage("Deleted the additive set failed", "fail"));
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("Deleted the additive set failed", "fail"));
    yield put(stopLoading());
  }
}

export function* updateModifierSetSaga(action) {
  try {
    yield put(startLoading());
    const { id, modifierSet, modifiersInventoryAdjustment } = action.data;
    const dto = { ...modifierSet };
    delete dto.modifiers;
    const {
      response: { meta },
    } = yield call(request, RESOURCE_API(id), dto, "PATCH");
    yield call(
      request,
      VARIATIONS_BULK_CREATE_OR_UPDATE_OR_DELETE_API(id),
      dto.variations,
      "POST"
    );
    if (Object.keys(modifiersInventoryAdjustment).length) {
      const finalList = Object.keys(modifiersInventoryAdjustment).flatMap(
        (item) => {
          const list = modifiersInventoryAdjustment[item]
            .filter((_item) => typeof _item.reason === "number")
            .map((_item) => {
              const __item = { ..._item, id: _item.modifier_id };
              delete __item.modifier_id;
              return __item;
            });
          return list;
        }
      );
      if (finalList.length) {
        yield call(
          request,
          VARIATIONS_BULK_CHANGE_INVENTORY_API,
          finalList,
          "PATCH"
        );
      }
    }
    for (const variation of modifierSet.variations) {
      if (variation.id) {
        yield call(
          request,
          VARIATION_INGREDIENTS_API(variation.id),
          [...variation?.ingredients],
          "POST"
        );
      }
    }
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setSnackBarMessage(
          "Edit the additive collection successfully performed",
          "success"
        )
      );
      if (action.callback) yield call(action.callback);
    } else
      yield put(setSnackBarMessage("Edit the additive collection failed", "fail"));
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("Edit the additive collection failed", "fail"));
    yield put(stopLoading());
  }
}

export function* createIngredientSaga(action) {
  const business = yield select(makeSelectBusinessId());
  try {
    yield put(startLoading());

    const {
      response: { meta },
    } = yield call(
      request,
      RESOURCES_API,
      { ...action.data, business },
      "POST"
    );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setSnackBarMessage("The raw material was successfully added.", "success")
      );
      if (action.callback) yield call(action.callback);
    } else yield put(setSnackBarMessage("The registration of the raw material was unsuccessful", "fail"));
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("The registration of the raw material was unsuccessful", "fail"));
    yield put(stopLoading());
  }
}

export function* updateIngredientSaga(action) {
  try {
    yield put(startLoading());

    let updatedIngredient = null;
    if (action.data.resource) {
      const {
        response: { data: _data },
      } = yield call(
        request,
        RESOURCE_API(action.data.resource_id),
        action.data.resource,
        "PATCH"
      );
      if (_data) updatedIngredient = _data;
    }
    if (action.data.variation) {
      const {
        response: { data: _data },
      } = yield call(
        request,
        VARIATION_API(action.data.variation_id),
        action.data.variation,
        "PATCH"
      );
      if (_data) updatedIngredient = _data;
    }

    if (action.data?.adjustment?.reason) {
      const {
        response: { data: _data },
      } = yield call(
        request,
        VARIATION_CHANGE_INVENTORY_API(action.data.variation_id),
        action.data.adjustment,
        "PATCH"
      );
      if (_data) updatedIngredient = _data;
    }
    if (updatedIngredient) {
      yield put(
        setSnackBarMessage("Editing the raw material successfully performed", "success")
      );
      if (action.callback) yield call(action.callback);
    } else
      yield put(setSnackBarMessage("Editing the raw material was unsuccessful", "fail"));
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("Editing the raw material was unsuccessful", "fail"));
    yield put(stopLoading());
  }
}

export function* getCallRequestsSaga() {
  try {
    yield put(startLoading());
    const business = yield select(makeSelectBusinessId());
    const {
      response: { data },
    } = yield call(
      request,
      GET_CALL_REQUESTS_API,
      { business, source: "vitrin" },
      "GET"
    );
    if (data) {
      yield put(setCallRequests(data));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getReportCallRequestsSaga() {
  try {
    const business = yield select(makeSelectBusinessId());
    const {
      response: { data },
    } = yield call(
      request,
      GET_REPORTS_CALL_REQUESTS_API,
      { business, source: "vitrin" },
      "GET"
    );

    if (data) {
      yield put(setReportsCallRequests(data));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* deleteIngredientSaga(action) {
  try {
    yield put(startLoading());
    const { id } = action.data;

    const { status } = yield call(request, RESOURCE_API(id), {}, "DELETE");
    if (status >= 200 && status <= 300) {
      yield put(
        setSnackBarMessage("Removal of the raw material was successfully performed", "success")
      );
      if (action.callback) yield call(action.callback);
    } else yield put(setSnackBarMessage("Deleted the raw material failed", "fail"));
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("Deleted the raw material failed", "fail"));
    yield put(stopLoading());
  }
}

export function* getReviewsResponseSaga(action) {
  const subdomain = yield select(makeSelectSiteDomain());
  try {
    yield put(startLoading());
    const {
      response: { data, pagination },
    } = yield call(
      request,
      REVIEWS_RESPONSE_API(subdomain),
      {
        ...action.data,
      },
      "GET"
    );
    yield put(setReviewsResponse(data, pagination));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getDiscountCodeDataSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(
      request,
      DISCOUNT_CODE_API(slug, action.data.is_expired, action.data.code),
      {},
      "GET"
    );
    if (data) yield put(setDiscountCodeData(data));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getFilteredDeals(action) {
  yield put(setAdminProducts(null, {}));
  const slug = yield select(makeSelectBusinessSlug());
  try {
    yield put(startLoading());
    const {
      response: { meta, data, pagination },
    } = action?.data?.filters?.category
      ? yield call(
          request,
          RESOURCES_ITEM_API(`label_id=${action.data.filters.category}`),
          action.data.filters
        )
      : yield call(
          request,
          ALL_RESOURCES_API(action.data.business_slug || slug),
          action.data.filters
        );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setAdminProducts(data, pagination));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getFilteredCampaignList(action) {
  const filters = action?.data?.filters;
  const query = action?.data?.query;
  const slug = yield select(makeSelectBusinessSlug());
  try {
    yield put(startLoading(GET_CAMPAIGN_LIST));
    const {
      response: { data, pagination },
    } = yield call(
      request,
      GET_CAMPAIGN_API(slug, query?.page),
      filters,
      "GET"
    );
    if (data) yield put(setCampaignData(data, pagination));
    yield put(stopLoading(GET_CAMPAIGN_LIST));
  } catch (err) {
    yield put(stopLoading(GET_CAMPAIGN_LIST));
  }
}

export function* getCampaignItemById(action) {
  const { data: actionData, callback } = action;
  yield put(startLoading(GET_CAMPAIGN_BY_ID));
  yield put(setCampaignItem({}));
  const slug = yield select(makeSelectBusinessSlug());
  try {
    const {
      response: { data, meta },
    } = yield call(
      request,
      GET_CAMPAIGN_BY_ID_API(slug, actionData.id),
      {},
      "GET"
    );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setCampaignItem(data));
      if (callback) callback(data);
    }
    yield put(stopLoading(GET_CAMPAIGN_BY_ID));
  } catch (err) {
    yield put(stopLoading(GET_CAMPAIGN_BY_ID));
  }
}

export function* updateCampaignById(action) {
  const { id, data: actionData, callback } = action;
  const slug = yield select(makeSelectBusinessSlug());
  try {
    yield put(startLoading());
    const {
      response: { meta, data },
    } = yield call(request, UPDATE_CAMPAIGN_API(slug, id), actionData, "PATCH");
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setSnackBarMessage("Your changes were successfully stored.", "success")
      );
      if (callback) callback(data);
      yield put(setCampaignItem(data));
    } else {
      yield put(setSnackBarMessage("Save the changes were unsuccessful!", "fail"));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
    yield put(setSnackBarMessage("Save the changes were unsuccessful!", "fail"));
  }
}

export function* createCampaignSaga(action) {
  const { data, callback } = action;
  yield put(startLoading(CREATE_CAMPAIGN));
  const slug = yield select(makeSelectBusinessSlug());
  const business = yield select(makeSelectBusinessId());
  try {
    const {
      response: { meta },
    } = yield call(
      request,
      CREATE_CAMPAIGN_API(slug),
      { ...data, business },
      "POST"
    );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setSnackBarMessage("Your changes were successfully stored.", "success")
      );
      if (callback) callback();
    } else {
      yield put(setSnackBarMessage("Save the changes were unsuccessful!", "fail"));
    }
    yield put(stopLoading(CREATE_CAMPAIGN));
  } catch (err) {
    yield put(stopLoading(CREATE_CAMPAIGN));
  }
}

export function* getDicsountCodeByIdSaga(action) {
  try {
    yield put(startLoading(GET_DISCOUNT_CODE_BY_ID));
    const {
      response: { data },
    } = yield call(request, DISCOUNT_CODE_ITEM_API(action.id), {}, "GET");
    if (data) {
      yield put(setDiscountCodeById(data));
    }

    yield put(stopLoading(GET_DISCOUNT_CODE_BY_ID));
  } catch (err) {
    yield put(stopLoading(GET_DISCOUNT_CODE_BY_ID));
  }
}

export function* getAutomatedProcessesCreditsReportSaga(action) {
  const query = action.data;
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());

    const {
      response: { data },
    } = yield call(
      request,
      AUTOMATED_PROCESSES_CREDIT_REPORTS_API(slug),
      { ...query },
      "GET"
    );
    if (data) {
      yield put(setAutomatedProcessCreditReport(data));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getCampaignCreditsReportSaga(action) {
  const query = action.data;
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());

    const {
      response: { data },
    } = yield call(
      request,
      CAMPAIGN_CREDIT_REPORTS_API(slug),
      { ...query },
      "GET"
    );
    if (data) {
      yield put(setCampaignCreditReport(data));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* updateDiscountCode(action) {
  try {
    yield put(startLoading());
    const {
      response: { data, meta },
    } = yield call(
      request,
      UPDATE_DISCOUNT_CODE_API(action.id),
      action.data,
      "PATCH"
    );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setSnackBarMessage("Edited the information successfully done", "success")
      );
      yield put(setDiscountCodeById({ data }));
    } else yield put(setSnackBarMessage("Edit information was unsuccessful", "fail"));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* createNewDiscountCode(action) {
  try {
    yield put(startLoading());
    const {
      response: { meta },
    } = yield call(request, CREATE_DISCOUNT_CODE_API, action.data, "POST");
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield call(getBusinessData);
      yield put(setSnackBarMessage("The discount code was successfully built.", "success"));
    } else
      yield put(setSnackBarMessage("The desired discount code was not made..", "fail"));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* createAutomaticConsultationRequestSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { meta },
    } = yield call(
      request,
      CRM_EVENT_API(slug),
      {
        result_type: 29,
        data: { form: { type: action.data } },
      },
      "POST"
    );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      if (action.callback) yield call(action.callback);
      yield put(setSnackBarMessage("Your request was successfully registered.", "success"));
    }
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* invoiceFactorSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data, meta },
    } = yield call(request, FACTOR_INVOICE_API, { ...action.data }, "POST");
    if (action?.data?.discount_code) {
      if (meta && meta.status_code >= 200 && meta.status_code <= 300) {
        yield put(setDiscountError("The discount code was successfully applied."));
      } else if (meta && meta.status_code === 404) {
        yield put(setDiscountError("The code entered is incorrect.."));
      } else if (meta && meta.status_code === 400) {
        yield put(setDiscountError(meta.detail.global_error_messages[0]));
      }
    } else if (meta?.detail?.global_error_messages?.[0]) {
      yield put();
      // setSnackBarMessage(meta.detail.global_error_messages[0], "fail")
    }
    if (data) {
      yield put(setInvoiceFactorAction(data));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* submitFactorSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { meta },
    } = yield call(request, SUBMIT_FACTOR_API, { ...action.data }, "POST");
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setSnackBarMessage("The order was successfully registered", "success"));
    } else {
      yield put(setSnackBarMessage("The order was not registered", "fail"));
    }

    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(setSnackBarMessage("Please try again..", "fail"));
    yield put(stopLoading());
  }
}

export function* getAdminAllProductsSaga(action) {
  yield put(setAdminAllProducts([]));
  try {
    yield put(startLoading());
    const {
      response: { meta, data },
    } = yield call(
      request,
      ALL_LIGHT_RESOURCES_API(action.data.businessSlug),
      {}
    );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setAdminAllProducts(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getIngredientsSaga(action) {
  const slug = yield select(makeSelectBusinessSlug());
  try {
    yield put(startLoading());
    const { response } = yield call(
      request,
      ALL_INGREDIENTS_BY_BUSINESS(action.data?.business_slug || slug),
      {
        ...action.data,
        business_slug: action.data?.business_slug || slug,
      }
    );
    if (response && response.data) {
      yield put(setIngredients(response.data, response.pagination));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getIngredientSaga(action) {
  try {
    yield put(startLoading());
    if (action.data.id) {
      const { response } = yield call(request, RESOURCE_API(action.data.id));

      if (response && response.data) {
        yield put(setIngredient(response.data));
      }
    } else {
      yield put(setIngredient({}));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getModifierSetsSaga(action) {
  const slug = yield select(makeSelectBusinessSlug());
  try {
    yield put(startLoading());
    const { response } = yield call(
      request,
      ALL_MODIFIER_SETS_BY_BUSINESS(action.slug || slug),
      action.data
    );

    if (response && response.data) {
      yield put(setModifierSets(response.data, response.pagination));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getModifierSetSaga(action) {
  try {
    yield put(startLoading());
    if (action.data.id) {
      const { response } = yield call(request, RESOURCE_API(action.data.id));
      if (response?.data) {
        yield put(setModifierSet(response.data));
      }
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* setApprovedPriceSuperIngredientSaga(action) {
  try {
    yield put(startLoading());
    yield call(
      request,
      SUPER_INGREDIENTS_APPROVED_PRICE_API(action.id),
      action.data,
      "POST"
    );
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getGrossSalesReportSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    if (action.data) {
      const {
        response: { data },
      } = yield call(
        request,
        GROSS_SALES_REPORT_API,
        {
          business_slug: slug,
          business_id: action.data.business_id,
          from_date: action.data.from_date,
          to_date: action.data.to_date,
        },
        "GET"
      );
      if (data) yield put(setGrossSalesReport(data));
    } else {
      yield put(setGrossSalesReport([]));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getProductsDeactivationReportSaga(action) {
  try {
    yield put(startLoading());
    const business_slug = yield select(makeSelectBusinessSlug());
    if (action.data) {
      const {
        response: { data },
      } = yield call(
        request,
        PRODUCTS_DEACTIVATION_REPORT_API,
        {
          business_slug,
          business_id: action.data.business_id,
          from_date: action.data.from,
          to_date: action.data.to,
        },
        "GET"
      );
      if (data) yield put(setProductsDeactivationReport(data));
    } else {
      yield put(setProductsDeactivationReport([]));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getReviewsTemplateSage() {
  try {
    yield put(startLoading());
    const business_slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data },
    } = yield call(request, REVIEWS_TEMPLATE_API(business_slug), {}, "GET");
    if (data) yield put(setReviewsTemplate(data));
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* createGateAwayZibalSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { meta },
    } = yield call(
      request,
      CREATE_GATE_AWAY_API(slug),
      {
        ...action.data,
      },
      "PATCH"
    );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      if (action.callback) yield call(action.callback);
    }
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* initializeGateAwayZibalSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { meta },
    } = yield call(request, INITIALZE_GATE_AWAY_API(slug), {}, "POST");
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      if (action.callback) yield call(action.callback);
    } else {
      yield put(setSnackBarMessage("Error in connection to Zebal", "fail"));
    }
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* checkSiteDomainAvailabilitySaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { meta, data },
    } = yield call(
      request,
      CHECK_SITE_DOMAIN_AVAILABILITY_API(action.data),
      "GET"
    );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setAvaliabilityDomain(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getCostsListSaga(action) {
  const { query } = action;
  try {
    yield put(startLoading(GET_COSTS_LIST));
    const businessRevalId = yield select(makeSelectRevalId());
    const businessSlug = yield select(makeSelectBusinessSlug());
    const _data = { ...query, businessRevalId, businessSlug };
    const { response, status } = yield call(
      request,
      REVAL_COST_API(),
      _data,
      "GET"
    );
    if (status >= 200 && status <= 300) {
      yield put(setCostsList(response));
    }
    yield put(stopLoading(GET_COSTS_LIST));
  } catch (err) {
    console.log(err);
    yield put(stopLoading(GET_COSTS_LIST));
  }
}

export function* createCostSaga(action) {
  const { data, callback } = action;
  try {
    yield put(startLoading());
    const businessRevalId = yield select(makeSelectRevalId());
    const title = "something mock";
    const businessSlug = yield select(makeSelectBusinessSlug());
    const _data = { ...data, businessRevalId, businessSlug, title };
    const { response, status } = yield call(
      request,
      REVAL_COST_API(),
      _data,
      "POST"
    );
    if (status >= 200 && status <= 300) {
      yield put(setAvaliabilityDomain(response.data));
      if (callback) callback();
      yield put(
        setSnackBarMessage("The new fee was successfully registered.", "success")
      );
    } else {
      yield put(setSnackBarMessage("Error in making costs", "fail"));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("Error in making costs", "fail"));
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getCostsCategorySaga(action) {
  const { data } = action;
  try {
    yield put(startLoading(GET_COST_CATEGORIES_LIST));
    const businessRevalId = yield select(makeSelectRevalId());
    const businessSlug = yield select(makeSelectBusinessSlug());
    const _data = { ...data, businessRevalId, businessSlug };
    const { response, status } = yield call(
      request,
      REVAL_COSTS_CATEGORY_API(),
      _data,
      "GET"
    );
    if (status >= 200 && status <= 300) {
      yield put(setCostsCategoriesList(response.data));
    }
    yield put(stopLoading(GET_COST_CATEGORIES_LIST));
  } catch (err) {
    console.log(err);
    yield put(stopLoading(GET_COST_CATEGORIES_LIST));
  }
}

export function* getPaymentMethods(action) {
  const { data } = action;
  try {
    yield put(startLoading(GET_COST_CATEGORIES_LIST));
    const businessRevalId = yield select(makeSelectRevalId());
    const businessSlug = yield select(makeSelectBusinessSlug());
    const _data = { ...data, businessRevalId, businessSlug };
    const { response, status } = yield call(
      request,
      REVAL_PAYMENT_METHOD_API(),
      _data,
      "GET"
    );
    if (status >= 200 && status <= 300) {
      yield put(setPaymentMethods(response.data));
    }
    yield put(stopLoading(GET_COST_CATEGORIES_LIST));
  } catch (err) {
    console.log(err);
    yield put(stopLoading(GET_COST_CATEGORIES_LIST));
  }
}

export function* createCostCategory(action) {
  const { data, callback } = action;
  try {
    yield put(startLoading(CREATE_COST_CATEGORY));
    const businessRevalId = yield select(makeSelectRevalId());
    const businessSlug = yield select(makeSelectBusinessSlug());
    const _data = { ...data, businessRevalId, businessSlug };
    const { response, status } = yield call(
      request,
      REVAL_COSTS_CATEGORY_API(),
      _data,
      "POST"
    );
    if (status >= 200 && status <= 300) {
      yield put(getCostsCategoriesList());
      if (callback) callback(response.data);
      yield put(
        setSnackBarMessage("The category was successfully built.", "success")
      );
    }
    yield put(stopLoading(CREATE_COST_CATEGORY));
  } catch (err) {
    console.log(err);
    yield put(stopLoading(CREATE_COST_CATEGORY));
    yield put(setSnackBarMessage("Error in the construction of categorization.", "fail"));
  }
}

// CAMPAIGIN BY SEGMENT 

export function* getCampaignsBySegmentaga(action) {
  const { id, callback } = action;
  try {
    yield put(startLoading(GET_CAMPAIGN_BY_SEGMENT));

    const businessRevalId = yield select(makeSelectRevalId()); // maybe needed
    const businessSlug = yield select(makeSelectBusinessSlug()); //maybe needed

    const _data = { businessRevalId, businessSlug };

    const { response, status } = yield call(request, CAMPAIGNS_BY_SEGMENT_BY_ID_API(id), _data, "GET");

    if (status >= 200 && status <= 300) {
      yield put(setCampaignBySegment(response.data));
      if (callback) callback(response.data);
    }

    yield put(stopLoading(GET_CAMPAIGN_BY_SEGMENT));
  } catch (err) {
    console.log(err);
    yield put(stopLoading(GET_CAMPAIGN_BY_SEGMENT));
  }
}

export function* getCampaignsBySegmentSaga(action) {
  const { query, callback } = action;
  try {
    yield put(startLoading(GET_CAMPAIGNS_BY_SEGMENT));

    const businessRevalId = yield select(makeSelectRevalId()); // maybe needed
    const business_slug = yield select(makeSelectBusinessSlug()); //maybe needed

    const _data = { ...query, businessRevalId, business_slug };

    const { response, status } = yield call(request, CAMPAIGNS_BY_SEGMENT_API(), _data, "GET");

    if (status >= 200 && status <= 300) {
      yield put(setCampaignsBySegment(response.data));
      if (callback) callback(response.data);
    }

    yield put(stopLoading(GET_CAMPAIGNS_BY_SEGMENT));
  } catch (err) {
    console.log(err);
    yield put(stopLoading(GET_CAMPAIGNS_BY_SEGMENT));
  }
}

export function* createCampaignBySegment(action) {
  const { data, callback } = action;
  try {
    yield put(startLoading(CREATE_CAMPAIGN_BY_SEGMENT));

    const business = yield select(makeSelectBusinessId())

    const _data = { ...data, business };

    const { response, status } = yield call(request, CREATE_CAMPAIGNS_BY_SEGMENT_API(), _data, "POST");

    if (status >= 200 && status <= 300) {
      yield put(setCampaignsBySegment(response.data));
      if (callback) callback(response.data);
      yield put(setSnackBarMessage("Settings were successfully saved", "success"));
      
    }

    yield put(stopLoading(CREATE_CAMPAIGN_BY_SEGMENT));
  } catch (err) {
    console.log(err);
    yield put(stopLoading(CREATE_CAMPAIGN_BY_SEGMENT));
    yield put(setSnackBarMessage("Error creating settings", "fail"));
  }
}

export function* updateCamapignBySegment(action) {
  const { id, data, callback } = action;
  try {
    yield put(startLoading(UPDATE_CAMPAIGN_BY_SEGMENT));
    const _data = { ...data };

    _data?.segment?.id && delete _data.segment.id;
    _data?.id && delete _data.id;
    _data?.business && delete _data.business;
    _data?.segment?.busines && delete _data.segment.busines;

    const { response, status } = yield call(request, CAMPAIGNS_BY_SEGMENT_BY_ID_API(id), _data, "PATCH");

    if (status >= 200 && status <= 300) {
      yield put(setCampaignsBySegment(response.data));
      if (callback) callback(response.data);
      yield put(setSnackBarMessage("Settings were successfully updated", "success"));

    }

    yield put(stopLoading(UPDATE_CAMPAIGN_BY_SEGMENT));
  } catch (err) {
    console.log(err);
    yield put(stopLoading(UPDATE_CAMPAIGN_BY_SEGMENT));
    yield put(setSnackBarMessage("Error in Updating Settings", "fail"));

  }
}


export default [
  takeLatest(GET_CAMPAIGN_BY_SEGMENT, getCampaignsBySegmentaga),
  takeLatest(GET_CAMPAIGNS_BY_SEGMENT, getCampaignsBySegmentSaga),
  takeLatest(CREATE_CAMPAIGN_BY_SEGMENT, createCampaignBySegment),
  takeLatest(UPDATE_CAMPAIGN_BY_SEGMENT, updateCamapignBySegment),
  takeLatest(IMPORT_MEMBERSHIPS, importMembershipsSaga),
  takeLatest(DELETE_IMAGE_FROM_PRODUCT, deleteImageFromProduct),
  takeLatest(UPDATE_IMAGE_FROM_PRODUCT, updateImageFromProduct),
  takeLatest(DELETE_IMAGE_FROM_VARIATION, deleteImageFromVariation),

  takeLatest(GET_COST_CATEGORIES_LIST, getCostsCategorySaga),
  takeLatest(CREATE_COST_CATEGORY, createCostCategory),
  takeLatest(GET_PAYMENT_METHODS, getPaymentMethods),
  takeLatest(CREATE_COST, createCostSaga),
  takeLatest(GET_COSTS_LIST, getCostsListSaga),

  takeLatest(UPLOAD_IMAGE_AND_UPDATE_PRODUCT, uploadImageAndUpdateProductSaga),
  takeLatest(
    UPLOAD_IMAGE_AND_UPDATE_VARIATION,
    uploadImageAndUpdateVariationSaga
  ),
  takeLatest(SEND_RECEIPT, sendReceiptShoppingAdminOrderFunc),
  takeLatest(PARTIAL_PAID, markAsPaidShoppingAdminOrderFunc),
  takeLatest(RETURN_EXTRA_PAID, returnExtraPaidShoppingAdminOrderFunc),
  takeLatest(
    GET_SHOPPING_ADMIN_ORDER_INVOICE,
    getShoppingAdminOrderInvoiceFunc
  ),
  takeLatest(GET_SHOPPING_ADMIN_ORDERS, getShoppingAdminOrdersFunc),
  takeLatest(
    GET_SHOPPING_ADMIN_ORDERS_SUMMARY,
    getShoppingAdminOrdersSummaryFunc
  ),
  takeLatest(GET_SHOPPING_ADMIN_ORDER, getShoppingAdminOrder),
  takeLatest(EDIT_SHOPPING_ADMIN_ORDER, editShoppingAdminOrder),
  takeLatest(GET_SHOPPING_ADMIN_ORDER_CRM, getShoppingAdminOrderCRMSaga),
  takeLatest(CHANGE_ORDER_STATUS, changeStatusShoppingOrder),
  takeLatest(BUY_PLUGIN, buyPlugin),
  takeLatest(GET_REVIEWS_TEMPLATE, getReviewsTemplateSage),
  takeLatest(ACTIVATE_TRIAL, activateTrial),
  takeLatest(GET_VITRIN_PAGE_VIEWS, getVitrinPageViews),
  takeLatest(GET_VITRIN_CALL_BUTTON_CLICKS, getVitrinCallRequests),
  takeLatest(SEND_VISIT_CARD, sendVisitCard),
  takeLatest(SEND_CUSTOM_VISIT_CARD, sendCustomVisitCard),
  takeLatest(GET_ADMIN_REVIEWS, getAdminReviews),
  takeLatest(GET_ADMIN_REVIEW, getAdminReview),
  takeLatest(CREATE_CRM_LABEL, createNewCRMLabelSaga),
  takeLatest(GET_CRM_LABELS, getCRMLabelsSaga),
  takeLatest(POST_CRM_LOGS, postCrmLogsSaga),
  takeLatest(
    CREATE_CRM_MEMBERSHIP_FROM_SHEET,
    createCRMMembershipsFromSheetSaga
  ),
  takeLatest(CREATE_CRM_MEMBERSHIP, createCRMMembershipSaga),
  takeLatest(GET_CRM_LABEL_DETAIL, getCRMLabelMemberships),
  takeLatest(UPDATE_CRM_MEMBERSHIP, updateCRMMembershipSaga),
  takeLatest(DELETE_CRM_MEMBERSHIP, deleteCRMLabelMemberships),
  takeLatest(GET_CRM_MEMBERSHIPS, getCRMMemberships),
  takeLatest(GET_CRM_MEMBERSHIP_EVENT_LOGS, getMembershipEventLogs),
  takeLatest(CREATE_DISCOUNT_CODE, createDiscountCode),
  takeLatest(CHECK_DOMAIN_FREE, checkDomainFree),
  takeLatest(GET_SHOPPING_ANALYTICS_DATA, getShoppingAnalyticsData),
  takeLatest(CHANGE_CRM_LABEL, changeCRMLabel),
  takeLatest(DELETE_CRM_LABEL, deleteCRMLabel),
  takeLatest(DELETE_CRM_LABELS, deleteCRMLabels),
  takeLatest(GET_ADMIN_PRODUCTS_BY_IDS, getFilteredDealsByIds),
  takeLatest(GET_ADMIN_DEAL, getAdminProductSaga),
  takeLatest(BULK_DELETE_PRODUCTS, bulkDeleteProducts),
  takeLatest(BULK_DELETE_CATEGORY, bulkDeleteCategories),

  takeLatest(UPDATE_PAGE, updateBusinessPageSaga),
  takeLatest(DELETE_PAGE, deleteBusinessPageSaga),
  takeLatest(CREATE_PAGE, createBusinessPageSaga),
  takeLatest(GET_FORMS, getFormsSaga),
  takeLatest(UPDATE_FORM, updateFormSaga),
  takeLatest(DELETE_FORM, deleteFormSaga),
  takeLatest(CREATE_FORM, createFormSaga),
  takeLatest(GET_FORM_RESPONSES, getFormResponsesSaga),
  takeLatest(GET_CMS_LESSONS, getCMSLessonsSaga),

  takeLatest(
    BULK_ASSIGN_MODIFIERSET_TO_DEALS,
    bulkAssignModifierSetsToDealsSaga
  ),
  takeLatest(
    BULK_ASSIGN_MODIFIERSET_TO_CATEGORIES,
    bulkAssignModifierSetsToCategoriesSaga
  ),

  takeLatest(BULK_UPDATE_PRODUCTS, bulkUpdateProductsSaga),
  takeLatest(BULK_UPDATE_INGREDIENTS, bulkUpdateIngredientsSaga),
  takeLatest(BULK_UPDATE_MODIFIER_SETS, bulkUpdateModifierSetsSaga),
  takeLatest(GET_POS_DEVICES, getBusinessDevicesSaga),
  takeLatest(GET_POS_DEVICE, getDeviceSaga),
  takeLatest(UPDATE_POS_DEVICE, updatePosDeviceSaga),
  takeLatest(CREATE_POS_DEVICE, createPosDeviceSaga),
  takeLatest(DELETE_POS_DEVICE, deletePosDeviceSaga),
  takeLatest(RENEW_POS_LICENCE, renewPosLicenceSaga),
  takeLatest(UPDATE_POS_USER, updatePosUserSaga),
  takeLatest(CREATE_POS_USER, createPosUserSaga),
  takeLatest(DELETE_POS_USER, deletePosUserSaga),
  takeLatest(GET_PRODUCT_REPORT, getProductReportSaga),
  takeLatest(GET_INGREDIENT_REPORT, getIngredientReportSaga),
  takeLatest(BULK_CHANGE_DEALS_INVENTORY, bulkChangeDealsInventorySaga),
  takeLatest(
    BULK_CHANGE_INGREDIENT_INVENTORY,
    bulkChangeIngredientsInventorySaga
  ),
  takeLatest(GET_ADMIN_TRANSACTIONS, getAdminTransactionsSaga),
  takeLatest(GET_CMS_LESSONS, getCMSLessonsSaga),
  takeLatest(GET_RECEIVED_PURCHASES, getReceivedPurchasesSaga),
  takeLatest(GET_SUBMITTED_PURCHASES, getSubmittedPurchasesSaga),
  // ANALYTICS

  takeLatest(GET_PRODUCTS_TOP_SELLING_REPORT, getProductsTopSellingReportSaga),
  takeLatest(SUBMIT_PURCHASE, submitPurchaseSaga),
  takeLatest(APPLY_SUBMITTED_PURCHASE, applySubmittedPurchaseSaga),
  takeLatest(APPLY_RECEIVED_PURCHASE, applyReceivedPurchaseSaga),
  takeLatest(UPDATE_SUBMITTED_PURCHASE, updateSubmittedPurchaseSaga),
  takeLatest(ACCEPT_SUBMITTED_PURCHASE, acceptSubmittedPurchaseSaga),
  takeLatest(REJECT_RECEIVED_PURCHASE, rejectReceivedPurchaseSaga),
  takeLatest(RECEIVE_SUBMITTED_PURCHASE, receiveSubmittedPurchaseSaga),
  takeLatest(GET_PURCHASE, getPurchaseSaga),
  takeLatest(DELETE_PURCHASE, deletePurchaseSaga),
  takeLatest(BULK_DELETE_MODIFIER_SETS, bulkDeleteModifiersSaga),
  takeLatest(
    BULK_ADD_PRODUCTS_VARIATIONS_TO_MODIFIER_SETS,
    bulkAddProductsVariationsToModifierSetsSaga
  ),
  takeLatest(
    GET_AUTOMATED_PROCESS_CREDIT_REPORTS,
    getAutomatedProcessesCreditsReportSaga
  ),
  takeLatest(GET_CAMPAIGN_CREDIT_REPORTS, getCampaignCreditsReportSaga),
  takeLatest(BULK_ADD_LABELS_TO_MODIFIER_SETS, bulkAddLabelsToModifierSetsSaga),
  takeLatest(BULK_DELETE_INGREDIENTS, bulkDeleteIngredientsSaga),
  takeLatest(GET_ORDER_TRANSACTIONS, getOrderTransactionsSaga),
  takeLatest(REQUEST_ALOPEYK, requestAlopeykFunc),
  takeLatest(REQUEST_MIARE, requestMiareFunc),
  takeLatest(ASSIGN_DELIVERY_MAN, assignDeliveryManSaga),
  takeLatest(GET_JOURNEY_STATE, getJourneyStateSaga),
  takeLatest(UPDATE_JOURNEY_STATE, updateJourneyStateSaga),
  takeEvery(GET_REPORTS_DATA, getReportDataSaga),
  takeEvery(GET_CAMPAIGN_LIST, getFilteredCampaignList),
  takeEvery(GET_CAMPAIGN_BY_ID, getCampaignItemById),
  takeEvery(CREATE_CAMPAIGN, createCampaignSaga),
  takeEvery(UPDATE_CAMPAIGN_BY_ID, updateCampaignById),

  takeEvery(GET_LEGAL_DOCUMENTS, getLegalDocumentsSaga),
  takeEvery(UPDATE_LEGAL_DOCUMENT, updateLegalDocumentsSaga),
  takeEvery(CREATE_LEGAL_DOCUMENT, createLegalDocumentsSaga),
  takeEvery(BULK_UPDATE_PRODUCTS_INVENTORY, bulkUpdateProductsInventorySaga),
  takeLatest(NEW_SECTION_ORDERING, changeSectionOrderingFunc),
  takeEvery(GET_CASH_DRAWER_TRANSACTIONS, getCashDrawerTransactionsSaga),
  takeEvery(OPEN_CASH_DRAWER, openCashDrawerSaga),
  takeEvery(CLOSE_CASH_DRAWER, closeCashDrawerSaga),
  takeEvery(FINISH_CASH_DRAWER, finishCashDrawerSaga),
  takeEvery(CREATE_CASH_TRANSACTION, createCashTransactionSaga),
  takeEvery(GET_CASH_DRAWERS, getCashDrawersSaga),
  takeEvery(SEARCH_CRM_MEMBERSHIP, searchCRMMembership),
  takeEvery(GET_CRM_MEMBERSHIP_BY_QUERY, getCRMMembershipsPerUtmSource),
  takeLatest(
    GET_PURCHASE_REPORTS_BY_INGREDIENTS,
    getPurchaseReportsByIngredientsSaga
  ),
  takeLatest(
    GET_PURCHASE_REPORTS_BY_INGREDIENTS_PER_BRANCH,
    getPurchaseReportsByIngredientsPerBranchSaga
  ),
  takeLatest(
    GET_PURCHASE_REPORTS_FROM_VENDORS,
    getPurchaseReportsFromVendorsSaga
  ),
  takeLatest(
    GET_PURCHASE_REPORTS_FROM_VENDORS_PER_BRANCH,
    getPurchaseReportsFromVendorsPerBranchSaga
  ),
  takeLatest(
    GET_INGREDIENTS_RECOUNTING_REPORTS,
    getIngredientsRecountingReportsSaga
  ),
  takeLatest(
    GET_INGREDIENTS_RECOUNTING_REPORT,
    getIngredientsRecountingReportSaga
  ),
  takeLatest(
    CREATE_INGREDIENTS_RECOUNTING_REPORT,
    createIngredientsRecountingReportSaga
  ),
  takeLatest(
    UPDATE_SYSTEMBY_NEW_INVENTORY_COUNTS,
    updateSystemByNewInventoryCountsSaga
  ),
  takeLatest(
    GET_PRODUCTS_REPORTS_SOLD_BY_COUNT,
    getProductsReportsSoldByCountSaga
  ),
  takeLatest(
    GET_ORDER_TRANSACTIONS_FINANCE_SUMMARY_REPORTS,
    getOrderTransactionsFinanceSummaryReportsSaga
  ),
  takeLatest(
    GET_SHOPPING_ORDERS_FINANCE_SUMMARY_REPORTS,
    getShoppingOrdersFinanceSummaryReportsSaga
  ),
  takeLatest(
    GET_SHOPPING_ORDERS_PAYMENT_SUMMARY_REPORTS,
    getShoppingOrdersPaymentSummaryReportsSaga
  ),
  takeLatest(GET_ADMIN_VENDORS, getAdminVendorsSaga),
  takeLatest(
    GET_CUSTOMERS_SATISFACTION_REVIEWS_REPORTS,
    getCustomersSatisfactionReviewsReportsSaga
  ),
  takeLatest(
    GET_WAREHOUSE_REPORTING_CATEGORIES,
    getWarehouseReportingCategories
  ),
  takeLatest(GET_CUSTOMERS_TAXING_REPORTS, getCustomersTaxingReportsSaga),
  takeLatest(
    GET_CUSTOMERS_DISSATISFACTION_REVIEWS_REPORTS,
    getCustomersDisSatisfactionReviewsReportsSaga
  ),
  takeLatest(GET_SUBMITTED_PURCHASES_REPORTS, getSubmittedPurchasesReportsSaga),
  takeLatest(
    GET_SUBMITTED_PURCHASES_REPORTS_PER_BRANCH,
    getSubmittedPurchasesReportsPerBranchSaga
  ),

  takeLatest(GET_BUSINESS_CATEGORIES, getBusinessCategoriesSaga),
  takeLatest(
    GET_ORDER_TRANSACTIONS_FINANCE_PAYMENT_TYPES,
    getOrderTransactionsFinancePaymentTypesSaga
  ),
  takeLatest(
    GET_ORDER_TRANSACTION_PER_PAYMENT_TYPE_PER_SALES_CHANNEL,
    getOrderTransactionsPerPaymentTypesPerChannelsSaga
  ),
  takeLatest(GET_DISCOUNT_CODE_REPORTS, getDiscountCodeReportsSaga),
  takeLatest(GET_INVENTORY_HEISTORY_REPORTS, getInventoryHistoryReports),
  takeLatest(GET_ADMIN_VENDOR, getAdminVendorSaga),
  takeLatest(UPDATE_ADMIN_VENDOR, updateVendorSaga),
  takeLatest(UPDATE_ADMIN_VENDOR_ITEM, updateVendorItemSaga),
  takeLatest(CREATE_DEAL_VENDOR_ITEM, createDealVendorItemSaga),
  takeLatest(CREATE_INGREDIENT_VENDOR_ITEM, createIngredientVendorItemSaga),
  takeLatest(DELETE_ADMIN_VENDOR_ITEM, deleteAdminVendorItemSaga),
  takeLatest(CREATE_ADMIN_VENDOR, createAdminVendorSaga),
  takeLatest(GET_VENDOR_ITEMS_BY_VENDOR, getVendorItemsByVendorSaga),
  takeLatest(GET_ADMIN_VENDOR_ITEMS_BY_DEAL, getAdminVendorItemsByDealSaga),
  takeLatest(
    GET_ADMIN_VENDOR_ITEMS_BY_INGREDIENT,
    getAdminVendorItemsByIngredientSaga
  ),
  takeLatest(
    GET_TOTAL_REQUESTED_PURCHASE_ITEMS,
    getTotalRequestedPurchaseItemsSaga
  ),
  takeLatest(GET_VENDOR_ITEMS_BY_BUSINESS, getVendorItemsByBusinessSaga),
  takeLatest(ADD_SHOPPING_NOTE, addShopingNote),
  takeLatest(GET_SHOPPING_ORDER_AGGREGATE, getShoppingOrderAggregate),
  takeLatest(GET_FIRST_AND_LAST_REPORTS, getFirstAndLastReportSaga),
  takeLatest(IMPORT_CSV, importCsv),
  takeLatest(CREATE_SURVEY_TEMPLATE, createSurveyTemplateSaga),
  takeLatest(GET_AGGREGATE_RATING, getAggregateRatingSaga),
  takeLatest(UPDATE_SURVEY_TEMPLATE, updateSurveyTemplateSaga),
  takeLatest(GET_CRM_LEVELS_LIST, getCrmLevelsSaga),
  takeLatest(GET_CRM_LEVEL_BY_ID, getCrmLevelSaga),
  takeLatest(UPDATE_CRM_LEVEL, updateCrmLevelSaga),
  takeLatest(DELETE_CRM_LEVEL_BY_ID, deleteCrmLevelSaga),
  takeLatest(CREATE_CRM_LEVEL, createCrmLevelSaga),
  takeLatest(GET_CRM_SEGMENT_LIST, getCrmSegmentsListSaga),
  takeLatest(GET_CRM_SEGMENT_BY_ID, getCrmSegmentItemSaga),
  takeLatest(CREATE_CRM_SEGMENT, createSegmentSaga),
  takeLatest(UPDATE_CRM_SEGMENT, updateCrmSegmentSaga),
  takeLatest(DELETE_CRM_SEGMENT, deleteCrmSegmentSaga),
  takeLatest(GET_LABELS, getLabelsSaga),
  takeLatest(UPDATE_CRM_LABLES, updateCustomerLabelsSaga),
  takeLatest(UPDATE_CRM_LABEL, updateCrmLabelSaga),
  takeLatest(CHANGE_CRM_LABLES, changeCustomerLabelsSaga),
  takeLatest(ADD_LABEL_TO_MEMBERSHIP_GROUP, addLabelToMembershipGroupSga),
  takeLatest(CREATE_AUTOMATED_PROCESS, createAutomatedProcessSaga),
  takeLatest(GET_AUTOMATED_PROCESSES, getAutomatedProcessListSaga),
  takeLatest(GET_AUTOMATED_PROCESS_BY_ID, getAutomatedProcessItemSaga),
  takeLatest(UPDATE_AUTOMATED_PROCESS, updateAutomatedProcessSaga),
  takeLatest(DELETE_AUTOMATED_PROCESS, deleteAutomatedProcessSaga),
  takeLatest(ADD_GIFT_CREDIT_TRANSACTION, giftCreditTransactions),
  takeLatest(CREATE_PRODUCT, createProductSaga),
  takeLatest(DELETE_PRODUCT, deleteProductSaga),
  takeLatest(UPDATE_PRODUCT, updateProductSaga),
  takeLatest(UPDATE_PRODUCT_VARIATION, updateProductVariationSaga),

  takeLatest(UPDATE_MODIFIER_SET, updateModifierSetSaga),
  takeLatest(CREATE_MODIFIER_SET, createModifierSetSaga),
  takeLatest(DELETE_MODIFIER_SET, deleteModifierSetSaga),
  takeLatest(CREATE_INGREDIENT, createIngredientSaga),
  takeLatest(UPDATE_INGREDIENT, updateIngredientSaga),
  takeLatest(DELETE_INGREDIENT, deleteIngredientSaga),
  takeLatest(GET_ADMIN_PRODUCTS, getFilteredDeals),
  takeLatest(GET_INGREDIENTS, getIngredientsSaga),
  takeLatest(GET_INGREDIENT, getIngredientSaga),
  takeLatest(GET_MODIFIER_SETS, getModifierSetsSaga),
  takeLatest(GET_MODIFIER_SET, getModifierSetSaga),
  takeLatest(UPDATE_CRM_SURVEY_DELAY, updateCrmSurveyDelaySaga),
  takeLatest(
    SET_APPROVED_PRICE_SUPER_INGREDIENT,
    setApprovedPriceSuperIngredientSaga
  ),
  takeLatest(GET_ADMIN_ALL_PRODUCTS, getAdminAllProductsSaga),
  takeLatest(GET_CALL_REQUESTS, getCallRequestsSaga),
  takeLatest(GET_REPORT_CALL_REQUESTS, getReportCallRequestsSaga),
  takeLatest(GET_DISCOUNT_CODE_DATA, getDiscountCodeDataSaga),
  takeLatest(GET_DISCOUNT_CODE_BY_ID, getDicsountCodeByIdSaga),
  takeLatest(GET_REVIEWS_RESPONSE, getReviewsResponseSaga),
  takeLatest(INVOICE_FACTOR, invoiceFactorSaga),
  takeLatest(SUBMIT_FACTOR, submitFactorSaga),
  takeLatest(UPDATE_DISCOUNT_CODE_BY_ID, updateDiscountCode),
  takeLatest(CREATE__DISCOUNT_CODE, createNewDiscountCode),
  takeLatest(
    AUTOMATIC_CONSULTATION_REQUEST,
    createAutomaticConsultationRequestSaga
  ),
  takeLatest(GET_GROSS_SALES_REPORT, getGrossSalesReportSaga),
  takeLatest(
    GET_PRODUCTS_DEACTIVATION_REPORT,
    getProductsDeactivationReportSaga
  ),
  takeLatest(GET_BUSINESS_SHOPPING_DATA, getBusinessShoppingDataSaga),
  takeLatest(CREATE_GATE_AWAY_ZIBAL, createGateAwayZibalSaga),
  takeLatest(INITIALIZE_GATE_AWAY_ZIBAL, initializeGateAwayZibalSaga),
  takeLatest(CHECK_SITE_DOMAIN_AVAILABILITY, checkSiteDomainAvailabilitySaga),
];
