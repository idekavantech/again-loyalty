/*
 *
 * Admin constants
 *
 */

import { jungleI, pollution, strawberryI, surface } from "@saas/utils/colors";
import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";

export const DEFAULT_ACTION = "panel/DEFAULT_ACTION";

// Analytics
export const GET_VITRIN_CALL_BUTTON_CLICKS =
  "panel/GET_VITRIN_CALL_BUTTON_CLICKS";
export const GET_VITRIN_PAGE_VIEWS = "panel/GET_VITRIN_PAGE_VIEWS";
export const SET_VITRIN_CALL_BUTTON_CLICKS =
  "panel/SET_VITRIN_CALL_BUTTON_CLICKS";
export const SET_VITRIN_PAGE_VIEWS = "panel/SET_VITRIN_PAGE_VIEWS";

export const GET_PRODUCTS_TOP_SELLING_REPORT =
  "panel/GET_PRODUCTS_TOP_SELLING_REPORT";
export const SET_DEALS_TOP_SELLING_REPORT =
  "panel/SET_DEALS_TOP_SELLING_REPORT";

export const GET_BUSINESS_SHOPPING_DATA = "panel/GET_BUSINESS_SHOPPING_DATA";
export const SET_BUSINESS_SHOPPING_DATA = "panel/SET_BUSINESS_SHOPPING_DATA";
export const GET_REPORTS_DATA = "panel/GET_REPORTS_DATA";
export const SET_REPORTS_DATA = "panel/SET_REPORTS_DATA";

export const GET_PURCHASE_REPORTS_BY_INGREDIENTS =
  "panel/GET_PURCHASE_REPORTS_BY_INGREDIENTS";
export const SET_PURCHASE_REPORTS_BY_INGREDIENTS =
  "panel/SET_PURCHASE_REPORTS_BY_INGREDIENTS";
export const GET_PURCHASE_REPORTS_BY_INGREDIENTS_PER_BRANCH =
  "panel/GET_PURCHASE_REPORTS_BY_INGREDIENTS_PER_BRANCH";
export const SET_PURCHASE_REPORTS_BY_INGREDIENTS_PER_BRANCH =
  "panel/SET_PURCHASE_REPORTS_BY_INGREDIENTS_PER_BRANCH";

export const GET_PURCHASE_REPORTS_FROM_VENDORS =
  "panel/GET_PURCHASE_REPORTS_FROM_VENDORS";
export const SET_PURCHASE_REPORTS_FROM_VENDORS =
  "panel/SET_PURCHASE_REPORTS_FROM_VENDORS";
export const GET_PURCHASE_REPORTS_FROM_VENDORS_PER_BRANCH =
  "panel/GET_PURCHASE_REPORTS_FROM_VENDORS_PER_BRANCH";
export const SET_PURCHASE_REPORTS_FROM_VENDORS_PER_BRANCH =
  "panel/SET_PURCHASE_REPORTS_FROM_VENDORS_PER_BRANCH";

export const GET_INGREDIENTS_RECOUNTING_REPORTS =
  "panel/GET_INGREDIENTS_RECOUNTING_REPORTS";
export const SET_INGREDIENTS_RECOUNTING_REPORTS =
  "panel/SET_INGREDIENTS_RECOUNTING_REPORTS";
export const GET_INGREDIENTS_RECOUNTING_REPORT =
  "panel/GET_INGREDIENTS_RECOUNTING_REPORT";
export const SET_INGREDIENTS_RECOUNTING_REPORT =
  "panel/SET_INGREDIENTS_RECOUNTING_REPORT";
export const CREATE_INGREDIENTS_RECOUNTING_REPORT =
  "panel/CREATE_INGREDIENTS_RECOUNTING_REPORT";
export const UPDATE_SYSTEMBY_NEW_INVENTORY_COUNTS =
  "panel/UPDATE_SYSTEMBY_NEW_INVENTORY_COUNTS";
export const GET_PRODUCTS_REPORTS_SOLD_BY_COUNT =
  "panel/GET_PRODUCTS_REPORTS_SOLD_BY_COUNT";
export const SET_DEALS_REPORTS_SOLD_BY_COUNT =
  "panel/SET_DEALS_REPORTS_SOLD_BY_COUNT";
export const GET_CUSTOMERS_SATISFACTION_REVIEWS_REPORTS =
  "panel/GET_CUSTOMERS_SATISFACTION_REVIEWS_REPORTS";
export const SET_CUSTOMERS_SATISFACTION_REVIEWS_REPORTS =
  "panel/SET_CUSTOMERS_SATISFACTION_REVIEWS_REPORTS";
export const GET_CUSTOMERS_DISSATISFACTION_REVIEWS_REPORTS =
  "panel/GET_CUSTOMERS_DISSATISFACTION_REVIEWS_REPORTS";
export const SET_CUSTOMERS_DISSATISFACTION_REVIEWS_REPORTS =
  "panel/SET_CUSTOMERS_DISSATISFACTION_REVIEWS_REPORTS";
export const GET_SUBMITTED_PURCHASES_REPORTS =
  "panel/GET_SUBMITTED_PURCHASES_REPORTS";
export const SET_SUBMITTED_PURCHASES_REPORTS =
  "panel/SET_SUBMITTED_PURCHASES_REPORTS";
export const GET_SUBMITTED_PURCHASES_REPORTS_PER_BRANCH =
  "panel/GET_SUBMITTED_PURCHASES_REPORTS_PER_BRANCH";
export const SET_SUBMITTED_PURCHASES_REPORTS_PER_BRANCH =
  "panel/SET_SUBMITTED_PURCHASES_REPORTS_PER_BRANCH";
export const GET_WAREHOUSE_REPORTING_CATEGORIES =
  "panel/GET_WAREHOUSE_REPORTING_CATEGORIES";
export const SET_WAREHOUSE_REPORTING_CATEGORIES =
  "panel/SET_WAREHOUSE_REPORTING_CATEGORIES ";
export const GET_ORDER_TRANSACTIONS_FINANCE_PAYMENT_TYPES =
  "panel/GET_ORDER_TRANSACTIONS_FINANCE_PAYMENT_TYPES";
export const SET_ORDER_TRANSACTIONS_FINANCE_PAYMENT_TYPES =
  "panel/SET_ORDER_TRANSACTIONS_FINANCE_PAYMENT_TYPES";
export const GET_ORDER_TRANSACTION_PER_PAYMENT_TYPE_PER_SALES_CHANNEL =
  "panel/GET_ORDER_TRANSACTION_PER_PAYMENT_TYPE_PER_SALES_CHANNEL";
export const SET_ORDER_TRANSACTION_PER_PAYMENT_TYPE_PER_SALES_CHANNEL =
  "panel/SET_ORDER_TRANSACTION_PER_PAYMENT_TYPE_PER_SALES_CHANNEL";
export const GET_DISCOUNT_CODE_REPORTS = "panel/GET_DISCOUNT_CODE_REPORTS";
export const SET_DISCOUNT_CODE_REPORTS = "panel/SET_DISCOUNT_CODE_REPORTS";

export const GET_INVENTORY_HEISTORY_REPORTS =
  "panel/GET_INVENTORY_HEISTORY_REPORTS";
export const SET_INVENTORY_HEISTORY_REPORTS =
  "panel/SET_INVENTORY_HEISTORY_REPORTS";
export const GET_CUSTOMERS_TAXING_REPORTS =
  "panel/GET_CUSTOMERS_TAXING_REPORTS";
export const SET_CUSTOMERS_TAXING_REPORTS =
  "panel/SET_CUSTOMERS_TAXING_REPORTS";

export const GET_FIRST_AND_LAST_REPORTS = "panel/GET_FIRST_AND_LAST_REPORTS";
export const SET_FIRST_AND_LAST_REPORTS = "panel/SET_FIRST_AND_LAST_REPORTS";

// Categories and Deals
export const GET_ADMIN_PRODUCTS = "panel/GET_ADMIN_PRODUCTS";
export const SET_ADMIN_PRODUCTS = "panel/SET_ADMIN_PRODUCTS";
export const GET_BUSINESS_CATEGORIES = "panel/GET_BUSINESS_CATEGORIES";
export const SET_BUSINESS_CATEGORIES = "panel/SET_BUSINESS_CATEGORIES";
export const GET_ADMIN_PRODUCTS_BY_IDS = "panel/GET_ADMIN_PRODUCTS_BY_IDS";
export const SET_ADMIN_PRODUCTS_BY_IDS = "panel/SET_ADMIN_PRODUCTS_BY_IDS";
export const GET_ADMIN_DEAL = "panel/GET_ADMIN_DEAL";
export const SET_ADMIN_DEAL = "panel/SET_ADMIN_DEAL";
export const SET_ADMIN_DEAL_IMAGES = "panel/SET_ADMIN_DEAL_IMAGES";
export const BULK_DELETE_CATEGORY = "panel/BULK_DELETE_CATEGORY";
export const BULK_DELETE_PRODUCTS = "panel/BULK_DELETE_PRODUCTS";
export const GET_PRODUCT_REPORT = "panel/GET_PRODUCT_REPORT";
export const SET_DEAL_REPORT = "panel/SET_DEAL_REPORT";
export const GET_ADMIN_ALL_PRODUCTS = "panel/GET_ADMIN_ALL_PRODUCTS";
export const SET_ADMIN_ALL_PRODUCTS = "panel/SET_ADMIN_ALL_PRODUCTS";

// CRM
export const POST_CRM_LOGS = "panel/POST_CRM_LOGS";
export const CREATE_CRM_LABEL = "panel/CREATE_CRM_LABEL";
export const GET_CRM_MEMBERSHIPS = "panel/GET_CRM_MEMBERSHIPS";
export const CREATE_CRM_MEMBERSHIP_FROM_SHEET =
  "panel/CREATE_CRM_MEMBERSHIP_FROM_SHEET";
export const CREATE_CRM_MEMBERSHIP = "panel/CREATE_CRM_MEMBERSHIP";
export const UPDATE_CRM_MEMBERSHIP = "panel/UPDATE_CRM_MEMBERSHIP";
export const EDIT_MEMBERSHIP_BY_ID = "panel/EDIT_MEMBERSHIP_BY_ID";
export const DELETE_CRM_MEMBERSHIP = "panel/DELETE_CRM_MEMBERSHIP";
export const GET_CRM_LABELS = "panel/GET_CRM_LABELS";
export const GET_CRM_LABEL_DETAIL = "panel/GET_CRM_LABEL_DETAIL";
export const CREATE_DISCOUNT_CODE = "panel/CREATE_DISCOUNT_CODE";
export const CHANGE_CRM_LABEL = "panel/CHANGE_CRM_LABEL";
export const DELETE_CRM_LABEL = "panel/DELETE_CRM_LABEL";
export const DELETE_CRM_LABELS = "panel/DELETE_CRM_LABELS";
export const SEARCH_CRM_MEMBERSHIP = "panel/SEARCH_CRM_MEMBERSHIP";
export const GET_CRM_MEMBERSHIP_BY_QUERY = "panel/GET_CRM_MEMBERSHIP_BY_QUERY";
export const SET_CRM_MEMBERSHIP_BY_QUERY = "panel/SET_CRM_MEMBERSHIP_BY_QUERY";
export const SET_SEARCHED_CRM_MEMBERSHIP = "panel/SET_SEARCHED_CRM_MEMBERSHIP";
export const SET_CRM_SEGMENTS = "panel/SET_CRM_SEGMENTS";

export const GET_CRM_MEMBERSHIP_EVENT_LOGS =
  "panel/GET_CRM_MEMBERSHIP_EVENT_LOGS";
export const SET_CRM_MEMBERSHIP_EVENT_LOGS =
  "panel/SET_CRM_MEMBERSHIP_EVENT_LOGS";

export const ADD_GIFT_CREDIT_TRANSACTION = "panel/ADD_GIFT_CREDIT_TRANSACTION";

// Domain
export const CHECK_DOMAIN_FREE = "app/SiteDomainSelection/CHECK_DOMAIN_FREE";
export const SET_DOMAIN_FREE = "app/SiteDomainSelection/SET_DOMAIN_FREE";
export const SET_NIC_TIMEOUT_ERROR =
  "app/SiteDomainSelection/SET_NIC_TIMEOUT_ERROR";

// SHOPPING
export const PARTIAL_PAID = "panel/PARTIAL_PAID";
export const SEND_RECEIPT = "panel/SEND_RECEIPT";
export const RETURN_EXTRA_PAID = "panel/RETURN_EXTRA_PAID";
export const GET_SHOPPING_ADMIN_ORDER_INVOICE =
  "panel/GET_SHOPPING_ADMIN_ORDER_INVOICE";
export const SET_SHOPPING_ADMIN_ORDER_INVOICE =
  "panel/SET_SHOPPING_ADMIN_ORDER_INVOICE";
export const GET_SHOPPING_ADMIN_ORDERS = "panel/GET_SHOPPING_ADMIN_ORDERS";
export const SET_SHOPPING_ADMIN_ORDERS = "panel/SET_SHOPPING_ADMIN_ORDERS";
export const GET_SHOPPING_ADMIN_ORDERS_SUMMARY =
  "panel/GET_SHOPPING_ADMIN_ORDERS_SUMMARY";
export const SET_SHOPPING_ADMIN_ORDERS_SUMMARY =
  "panel/SET_SHOPPING_ADMIN_ORDERS_SUMMARY";
export const GET_SHOPPING_ADMIN_ORDER = "panel/GET_SHOPPING_ADMIN_ORDER";
export const SET_SHOPPING_ADMIN_ORDER = "panel/SET_SHOPPING_ADMIN_ORDER";
export const GET_SHOPPING_ADMIN_ORDER_CRM =
  "panel/GET_SHOPPING_ADMIN_ORDER_CRM";
export const SET_SHOPPING_ADMIN_ORDER_CRM =
  "panel/SET_SHOPPING_ADMIN_ORDER_CRM";
export const ACCEPT_SHOPPING_ORDER = "panel/ACCEPT_SHOPPING_ORDER";
export const CANCEL_SHOPPING_ORDER = "panel/CANCEL_SHOPPING_ORDER";
export const RECEIVE_SHOPPING_ORDER = "panel/RECEIVE_SHOPPING_ORDER";
export const GET_SHOPPING_ANALYTICS_DATA = "panel/GET_SHOPPING_ANALYTICS_DATA";
export const SET_SHOPPING_ANALYTICS_DATA = "panel/SET_SHOPPING_ANALYTICS_DATA";
export const EDIT_SHOPPING_ADMIN_ORDER = "panel/EDIT_SHOPPING_ADMIN_ORDER";
export const ADD_SHOPPING_NOTE = "panel/ADD_SHOPPING_NOTE";
export const REQUEST_ALOPEYK = "panel/REQUEST_ALOPEYK";
export const REQUEST_MIARE = "panel/REQUEST_MIARE";
export const ASSIGN_DELIVERY_MAN = "panel/ASSIGN_DELIVERY_MAN";
export const GET_SHOPPING_ORDER_AGGREGATE =
  "panel/GET_SHOPPING_ORDER_AGGREGATE";
export const SET_SHOPPING_ORDER_AGGREGATE =
  "panel/SET_SHOPPING_ORDER_AGGREGATE";
export const CHANGE_ORDER_STATUS = "app/AdminPanelApp/CHANGE_ORDER_STATUS";
export const SHOPPING_DATA = "app/SHOPPING_DATA";

// Plugins
export const BUY_PLUGIN = "panel/BUY_PLUGIN";
export const ACTIVATE_TRIAL = "panel/ACTIVATE_TRIAL";

// Reviews
export const GET_ADMIN_REVIEWS = "panel/GET_ADMIN_REVIEWS";
export const SET_ADMIN_REVIEWS = "panel/SET_ADMIN_REVIEWS";
export const GET_ADMIN_REVIEW = "panel/GET_ADMIN_REVIEW";
export const SET_ADMIN_REVIEW = "panel/SET_ADMIN_REVIEW";

export const CREATE_PAGE = "panel/CREATE_PAGE";
export const UPDATE_PAGE = "panel/UPDATE_PAGE";
export const DELETE_PAGE = "panel/DELETE_PAGE";

// Forms
export const GET_FORMS = "panel/GET_FORMS";
export const SET_FORMS = "panel/SET_FORMS";
export const UPDATE_FORM = "panel/UPDATE_FORM";
export const DELETE_FORM = "panel/DELETE_FORM";

export const CREATE_FORM = "panel/CREATE_FORM";
export const GET_FORM_RESPONSES = "panel/GET_FORM_RESPONSES";
export const SET_FORM_RESPONSES = "panel/SET_FORM_RESPONSES";
export const SET_NEXT_FORM_RESPONSE_PAGE_NUMBER =
  "panel/SET_NEXT_FORM_RESPONSE_PAGE_NUMBER";

// Settings
export const NEW_SECTION_ORDERING = "panel/NEW_SECTION_ORDERING";
export const SET_SELECTED_DELIVERY_DATE = "panel/SET_SELECTED_DELIVERY_DATE";

// Visit Card
export const SEND_VISIT_CARD = "app/VisitCardPluginApp/SEND_VISIT_CARD";
export const SEND_CUSTOM_VISIT_CARD =
  "app/VisitCardPluginApp/SEND_CUSTOM_VISIT_CARD";

// modifiers
export const BULK_DELETE_MODIFIER_SETS = "panel/BULK_DELETE_MODIFIER_SETS";
export const BULK_DELETE_INGREDIENTS = "panel/BULK_DELETE_INGREDIENTS";

export const BULK_ASSIGN_MODIFIERSET_TO_DEALS =
  "panel/BULK_ASSIGN_MODIFIERSET_TO_DEALS";
export const BULK_ASSIGN_MODIFIERSET_TO_CATEGORIES =
  "panel/BULK_ASSIGN_MODIFIERSET_TO_CATEGORIES";
export const GET_INGREDIENT_REPORT = "panel/GET_INGREDIENT_REPORT";
export const SET_INGREDIENT_REPORT = "panel/SET_INGREDIENT_REPORT";
export const BULK_ADD_PRODUCTS_VARIATIONS_TO_MODIFIER_SETS =
  "panel/BULK_ADD_PRODUCTS_VARIATIONS_TO_MODIFIER_SETS";
export const BULK_ADD_LABELS_TO_MODIFIER_SETS =
  "panel/BULK_ADD_LABELS_TO_MODIFIER_SETS";

export const GET_CMS_LESSONS = "panel/GET_CMS_LESSONS";
export const SET_CMS_LESSONS = "panel/SET_CMS_LESSONS";
/*
  Default Options
 */

export const BULK_UPDATE_PRODUCTS = "panel/BULK_UPDATE_PRODUCTS";
export const BULK_UPDATE_MODIFIER_SETS = "panel/BULK_UPDATE_MODIFIER_SETS";
export const BULK_UPDATE_PRODUCTS_INVENTORY =
  "panel/BULK_UPDATE_PRODUCTS_INVENTORY";
export const BULK_CHANGE_DEALS_INVENTORY = "panel/BULK_CHANGE_DEALS_INVENTORY";
export const BULK_CHANGE_INGREDIENT_INVENTORY =
  "panel/BULK_CHANGE_INGREDIENT_INVENTORY";
export const BULK_UPDATE_INGREDIENTS = "panel/BULK_UPDATE_INGREDIENTS";

export const GET_POS_DEVICES = "panel/GET_POS_DEVICES";
export const GET_POS_DEVICE = "panel/GET_POS_DEVICE";
export const SET_POS_DEVICES = "panel/SET_POS_DEVICES";
export const SET_POS_DEVICE = "panel/SET_POS_DEVICE";
export const UPDATE_POS_DEVICE = "panel/UPDATE_POS_DEVICE";
export const CREATE_POS_DEVICE = "panel/CREATE_POS_DEVICE";
export const DELETE_POS_DEVICE = "panel/DELETE_POS_DEVICE";
export const UPDATE_POS_USER = "panel/UPDATE_POS_USER";
export const CREATE_POS_USER = "panel/CREATE_POS_USER";
export const DELETE_POS_USER = "panel/DELETE_POS_USER";
export const RENEW_POS_LICENCE = "panel/RENEW_POS_LICENCE";

export const SET_ADMIN_TRANSACTIONS = "panel/SET_ADMIN_TRANSACTIONS";
export const GET_ADMIN_TRANSACTIONS = "panel/GET_ADMIN_TRANSACTIONS";
export const GET_ORDER_TRANSACTIONS = "panel/GET_ORDER_TRANSACTIONS";
export const SET_ORDER_TRANSACTIONS = "panel/SET_ORDER_TRANSACTIONS";
export const GET_ORDER_TRANSACTIONS_FINANCE_SUMMARY_REPORTS =
  "panel/GET_ORDER_TRANSACTIONS_FINANCE_SUMMARY_REPORTS";
export const SET_ORDER_TRANSACTIONS_FINANCE_SUMMARY_REPORTS =
  "panel/SET_ORDER_TRANSACTIONS_FINANCE_SUMMARY_REPORTS";
export const GET_SHOPPING_ORDERS_FINANCE_SUMMARY_REPORTS =
  "panel/GET_SHOPPING_ORDERS_FINANCE_SUMMARY_REPORTS";
export const SET_SHOPPING_ORDERS_FINANCE_SUMMARY_REPORTS =
  "panel/SET_SHOPPING_ORDERS_FINANCE_SUMMARY_REPORTS";
export const GET_SHOPPING_ORDERS_PAYMENT_SUMMARY_REPORTS =
  "panel/GET_SHOPPING_ORDERS_PAYMENT_SUMMARY_REPORTS";
export const SET_SHOPPING_ORDERS_PAYMENT_SUMMARY_REPORTS =
  "panel/SET_SHOPPING_ORDERS_PAYMENT_SUMMARY_REPORTS";

//purchases
export const GET_RECEIVED_PURCHASES = "panel/GET_RECEIVED_PURCHASES";
export const SET_RECEIVED_PURCHASES = "panel/SET_RECEIVED_PURCHASES";
export const GET_SUBMITTED_PURCHASES = "panel/GET_SUBMITTED_PURCHASES";
export const SET_SUBMITTED_PURCHASES = "panel/SET_SUBMITTED_PURCHASES";
export const SUBMIT_PURCHASE = "panel/SUBMIT_PURCHASE";
export const FINALIZE_PURCHASE = "panel/FINALIZE_PURCHASE";
export const APPLY_RECEIVED_PURCHASE = "panel/APPLY_RECEIVED_PURCHASE";
export const APPLY_SUBMITTED_PURCHASE = "panel/APPLY_SUBMITTED_PURCHASE";
export const REJECT_RECEIVED_PURCHASE = "panel/REJECT_RECEIVED_PURCHASE";
export const RECEIVE_SUBMITTED_PURCHASE = "panel/RECEIVE_SUBMITTED_PURCHASE";
export const ACCEPT_SUBMITTED_PURCHASE = "panel/ACCEPT_SUBMITTED_PURCHASE";
export const GET_PURCHASE = "panel/GET_PURCHASE";
export const SET_PURCHASE = "panel/SET_PURCHASE";
export const DELETE_PURCHASE = "panel/DELETE_PURCHASE";
export const UPDATE_SUBMITTED_PURCHASE = "panel/UPDATE_SUBMITTED_PURCHASE";
export const SET_COLLECTIVE_PURCHASES = "panel/SET_COLLECTIVE_PURCHASES";
export const GET_TOTAL_REQUESTED_PURCHASE_ITEMS =
  "panel/GET_TOTAL_REQUESTED_PURCHASE_ITEMS";
export const SET_TOTAL_REQUESTED_PURCHASE_ITEMS =
  "panel/SET_TOTAL_REQUESTED_PURCHASE_ITEMS";

export const GET_ADMIN_VENDORS = "panel/GET_ADMIN_VENDORS";
export const SET_ADMIN_VENDORS = "panel/SET_ADMIN_VENDORS";
export const GET_ADMIN_VENDOR = "panel/GET_ADMIN_VENDOR";
export const SET_ADMIN_VENDOR = "panel/SET_ADMIN_VENDOR";
export const CREATE_ADMIN_VENDOR = "panel/CREATE_ADMIN_VENDOR";
export const UPDATE_ADMIN_VENDOR = "panel/UPDATE_ADMIN_VENDOR";
export const GET_ADMIN_VENDOR_ITEMS_BY_DEAL =
  "panel/GET_ADMIN_VENDOR_ITEMS_BY_DEAL";
export const GET_ADMIN_VENDOR_ITEMS_BY_INGREDIENT =
  "panel/GET_ADMIN_VENDOR_ITEMS_BY_INGREDIENT";
export const GET_VENDOR_ITEMS_BY_VENDOR = "panel/GET_VENDOR_ITEMS_BY_VENDOR";
export const GET_VENDOR_ITEMS_BY_BUSINESS =
  "panel/GET_VENDOR_ITEMS_BY_BUSINESS";
export const SET_ADMIN_VENDOR_ITEMS = "panel/SET_ADMIN_VENDOR_ITEMS";
export const UPDATE_ADMIN_VENDOR_ITEM = "panel/UPDATE_ADMIN_VENDOR_ITEM";
export const DELETE_ADMIN_VENDOR_ITEM = "panel/DELETE_ADMIN_VENDOR_ITEM";
export const CREATE_DEAL_VENDOR_ITEM = "panel/CREATE_DEAL_VENDOR_ITEM";

export const CREATE_INGREDIENT_VENDOR_ITEM =
  "panel/CREATE_INGREDIENT_VENDOR_ITEM";

export const GET_JOURNEY_STATE = "panel/GET_JOURNEY_STATE";
export const SET_JOURNEY_STATE = "panel/SET_JOURNEY_STATE";
export const UPDATE_JOURNEY_STATE = "panel/UPDATE_JOURNEY_STATE";
export const GET_LEGAL_DOCUMENTS = "panel/GET_LEGAL_DOCUMENTS";
export const SET_LEGAL_DOCUMENTS = "panel/SET_LEGAL_DOCUMENTS";
export const CREATE_LEGAL_DOCUMENT = "panel/CREATE_LEGAL_DOCUMENT";
export const UPDATE_LEGAL_DOCUMENT = "panel/UPDATE_LEGAL_DOCUMENT";

export const GET_CASH_DRAWER_TRANSACTIONS =
  "panel/GET_CASH_DRAWER_TRANSACTIONS";
export const SET_CASH_DRAWER_TRANSACTIONS =
  "panel/SET_CASH_DRAWER_TRANSACTIONS";
export const OPEN_CASH_DRAWER = "panel/OPEN_CASH_DRAWER";
export const CLOSE_CASH_DRAWER = "panel/CLOSE_CASH_DRAWER";
export const FINISH_CASH_DRAWER = "panel/FINISH_CASH_DRAWER";
export const CREATE_CASH_TRANSACTION = "panel/CREATE_CASH_TRANSACTION";
export const GET_CASH_DRAWERS = "panel/GET_CASH_DRAWERS";
export const SET_CASH_DRAWERS = "panel/SET_CASH_DRAWERS";
export const CREATE_SURVEY_TEMPLATE = "app/AdminPanle/CREATE_SURVEY_TEMPLATE";
export const UPDATE_CRM_SURVEY_DELAY = "app/AdminPanle/UPDATE_CRM_SURVEY_DELAY";

export const GET_AGGREGATE_RATING = "app/AdminPanle/GET_AGGREGATE_RATING";
export const SET_AGGREGATE_RATING = "app/AdminPanle/SET_AGGREGATE_RATING";
export const UPDATE_SURVEY_TEMPLATE = "app/AdminPanle/UPDATE_SURVEY_TEMPLATE";

// crm levels
export const GET_CRM_LEVELS_LIST = "panel/GET_CRM_LEVELS_LIST";
export const SET_CRM_LEVELS_LIST = "panel/SET_CRM_LEVELS_LIST";
export const GET_CRM_LEVEL_BY_ID = "panel/GET_CRM_LEVEL_BY_ID";
export const SET_CRM_LEVEL_BY_ID = "panel/SET_CRM_LEVEL_BY_ID";
export const UPDATE_CRM_LEVEL = "panel/UPDATE_CRM_LEVEL";
export const DELETE_CRM_LEVEL_BY_ID = "panel/DELETE_CRM_LEVEL_BY_ID";
export const CREATE_CRM_LEVEL = "panel/CREATE_CRM_LEVEL";

export const UPDATE_CRM_LABLES = "panel/UPDATE_CRM_LABLES";
export const UPDATE_CRM_LABEL = "panel/UPDATE_CRM_LABEL";
export const SET_LABELS = "panel/SET_LABELS";
export const GET_LABELS = "panel/GET_LABELS";
export const CHANGE_CRM_LABLES = "panel/CHANGE_CRM_LABLES";

export const ADD_LABEL_TO_MEMBERSHIP_GROUP =
  "panel/ADD_LABEL_TO_MEMBERSHIP_GROUP";

export const GET_REVIEWS_RESPONSE = "panel/GET_REVIEWS_RESPONSE";
export const SET_REVIEWS_RESPONSE = "panel/SET_REVIEWS_RESPONSE";

export const GET_CRM_SEGMENT_BY_ID = "panel/GET_CRM_SEGMENT_BY_ID";
export const SET_CRM_SEGMENT_BY_ID = "panel/SET_CRM_SEGMENT_BY_ID";
export const UPDATE_CRM_SEGMENT = "panel/UPDATE_CRM_SEGMENT";
export const DELETE_CRM_SEGMENT = "panel/DELETE_CRM_SEGMENT";
export const CREATE_CRM_SEGMENT = "panel/CREATE_CRM_SEGMENT";
export const GET_CRM_SEGMENT_LIST = "panel/GET_CRM_SEGMENT_LIST";
export const SET_CRM_SEGMENT_LIST = "panel/SET_CRM_SEGMENT_LIST";

export const GET_AUTOMATED_PROCESS_BY_ID = "panel/GET_AUTOMATED_PROCESS_BY_ID";
export const SET_AUTOMATED_PROCESS_BY_ID = "panel/SET_AUTOMATED_PROCESS_BY_ID";
export const GET_AUTOMATED_PROCESSES = "panel/GET_AUTOMATED_PROCESSES";
export const SET_AUTOMATED_PROCESSES = "panel/SET_AUTOMATED_PROCESSES";
export const UPDATE_AUTOMATED_PROCESS = "panel/UPDATE_AUTOMATED_PROCESS";
export const DELETE_AUTOMATED_PROCESS = "panel/DELETE_AUTOMATED_PROCESS";
export const CREATE_AUTOMATED_PROCESS = "panel/CREATE_AUTOMATED_PROCESS";

export const GET_INGREDIENTS = "panel/GET_INGREDIENTS";
export const SET_INGREDIENTS = "panel/SET_INGREDIENTS";

export const DELETE_INGREDIENT = "panel/DELETE_INGREDIENT";
export const CREATE_INGREDIENT = "panel/CREATE_INGREDIENT";
export const UPDATE_INGREDIENT = "panel/UPDATE_INGREDIENT";
export const GET_INGREDIENT = "panel/GET_INGREDIENT";
export const SET_INGREDIENT = "panel/SET_INGREDIENT";

export const UPLOAD_IMAGE_AND_UPDATE_PRODUCT =
  "store/business/UPLOAD_IMAGE_AND_UPDATE_PRODUCT";
export const UPLOAD_IMAGE_AND_UPDATE_VARIATION =
  "store/business/UPLOAD_IMAGE_AND_UPDATE_VARIATION";

//call_requests
export const GET_CALL_REQUESTS = "panel/GET_CALL_REQUESTS";
export const SET_CALL_REQUESTS = "panel/SET_CALL_REQUESTS";
export const GET_REPORT_CALL_REQUESTS = "panel/GET_REAPORT_CALL_REQUESTS";
export const SET_REPORT_CALL_REQUESTS = "panel/SET_REPORT_CALL_REQUESTS";

//submit factor
export const INVOICE_FACTOR = "panel/INVOICE_FACTOR";
export const SET_INVOICE_FACTOR = "panel/SET_INVOICE_FACTOR";
export const SUBMIT_FACTOR = "panel/SUBMIT_FACTOR";
export const SET_DISCOUNT_CODE_DATA = "panel/SET_DISCOUNT_CODE_DATA";
export const GET_DISCOUNT_CODE_DATA = "panel/GET_DISCOUNT_CODE_DATA";

export const GET_DISCOUNT_CODE_BY_ID = "store/business/GET_DISCOUNT_CODE_BY_ID";
export const SET_DISCOUNT_CODE_BY_ID = "store/business/SET_DISCOUNT_CODE_BY_ID";
export const UPDATE_DISCOUNT_CODE_BY_ID =
  "store/business/UPDATE_DISCOUNT_CODE_BY_ID";
export const CREATE__DISCOUNT_CODE = "store/business/CREATE__DISCOUNT_CODE";
export const AUTOMATIC_CONSULTATION_REQUEST =
  "store/business/AUTOMATIC_CONSULTATION_REQUEST";
export const GET_GROSS_SALES_REPORT = "store/business/GET_GROSS_SALES_REPORT";
export const SET_GROSS_SALES_REPORT = "store/business/SET_GROSS_SALES_REPORT";

export const GET_PRODUCTS_DEACTIVATION_REPORT =
  "store/business/GET_PRODUCTS_DEACTIVATION_REPORT";
export const SET_PRODUCTS_DEACTIVATION_REPORT =
  "store/business/SET_PRODUCTS_DEACTIVATION_REPORT";

//campaign
export const GET_CAMPAIGN_LIST = "panel/GET_CAMPAIGN_LIST";
export const SET_CAMPAIGN_LIST = "panel/SET_CAMPAIGN_LIST";
export const GET_CAMPAIGN_BY_ID = "panel/GET_CAMPAIGN_BY_ID";
export const SET_CAMPAIGN_BY_ID = "panel/SET_CAMPAIGN_BY_ID";
export const UPDATE_CAMPAIGN_BY_ID = "panel/UPDATE_CAMPAIGN_BY_ID";
export const CREATE_CAMPAIGN = "panel/CREATE_CAMPAIGN";

export const GET_REVIEWS_TEMPLATE = "panel/GET_REVIEWS_TEMPLATE";
export const SET_REVIEWS_TEMPLATE = "panel/SET_REVIEWS_TEMPLATE";

export const GET_AUTOMATED_PROCESS_TYPE = "panel/GET_AUTOMATED_PROCESS_TYPE";
export const SET_AUTOMATED_PROCESS_TYPE = "panel/SET_AUTOMATED_PROCESS_TYPE";

export const GET_AUTOMATED_PROCESS_CREDIT_REPORTS =
  "panel/GET_AUTOMATED_PROCESS_CREDIT_REPORTS";
export const SET_AUTOMATED_PROCESS_CREDIT_REPORTS =
  "panel/SET_AUTOMATED_PROCESS_CREDIT_REPORTS";

export const GET_CAMPAIGN_CREDIT_REPORTS = "panel/GET_CAMPAIGN_CREDIT_REPORTS";
export const SET_CAMPAIGN_CREDIT_REPORTS = "panel/SET_CAMPAIGN_CREDIT_REPORTS";

// Revel

export const GET_COSTS_LIST = "GET_COSTS_LIST";
export const SET_COSTS_LIST = "SET_COSTS_LIST";
export const CREATE_COST = "CREATE_COST";
// export const UPDATE_COST = "UPDATE_COST"

export const GET_COST_CATEGORIES_LIST = "GET_COST_CATEGORIES_LIST";
export const SET_COST_CATEGORIES_LIST = "SET_COST_CATEGORIES_LIST";
export const CREATE_COST_CATEGORY = "CREATE_COST_CATEGORY";
// export const UPDATE_COST_CATEGORY = "UPDATE_COST_CATEGORY";

export const GET_PAYMENT_METHODS = "GET_PAYMENT_METHODS";
export const SET_PAYMENT_METHODS = "SET_PAYMENT_METHODS";

// celebration reminder 

export const GET_CAMPAIGNS_BY_SEGMENT = "panel/GET_CAMPAIGNS_BY_SEGMENT";
export const SET_CAMPAIGNS_BY_SEGMENT = "panel/SET_CAMPAIGNS_BY_SEGMENT";

export const GET_CAMPAIGN_BY_SEGMENT = "panel/GET_CAMPAIGN_BY_SEGMENT";
export const SET_CAMPAIGN_BY_SEGMENT = "panel/SET_CAMPAIGN_BY_SEGMENT";

export const CREATE_CAMPAIGN_BY_SEGMENT = "panel/CREATE_CAMPAIGN_BY_SEGMENT";
export const UPDATE_CAMPAIGN_BY_SEGMENT = "panel/UPDATE_CAMPAIGN_BY_SEGMENT";

// gate_away zibal

export const CREATE_GATE_AWAY_ZIBAL = "panel/create_gate_away_zibal";
export const INITIALIZE_GATE_AWAY_ZIBAL = "panel/initiallize_gate_away_zibal";

export const availableOnDayOptions = [
  { id: 6, text: "Saturday" },
  { id: 0, text: "Sunday" },
  { id: 1, text: "Monday" },
  { id: 2, text: "Tuesday" },
  { id: 3, text: "Wednesday" },
  { id: 4, text: "Thursday" },
  { id: 5, text: "Friday" },
];

export const months = [
  { id: 1, description: "farvardin" },
  { id: 2, description: "Ordibehesht" },
  { id: 3, description: "Khordad" },
  { id: 4, description: "Tir" },
  { id: 5, description: "Mordad" },
  { id: 6, description: "Shahrivar" },
  { id: 7, description: "stamp" },
  { id: 8, description: "Aban" },
  { id: 9, description: "Fire" },
  { id: 10, description: "Held" },
  { id: 11, description: "Avalanche" },
  { id: 12, description: "Esfand" },
];

export const SMSPricingOptions = [
  {
    credit: 2000,
    price: 120000,
    creditText: "1,000",
    priceText: "1,000",
    tax: 10800,
    finalPrice: 130800,
  },
  {
    credit: 5000,
    price: 280000,
    creditText: "1,000",
    priceText: "1,000",
    tax: 25200,
    finalPrice: 305200,
  },
  {
    credit: 10000,
    price: 540000,
    creditText: "1,000",
    priceText: "1,000",
    tax: 48600,
    finalPrice: 588600,
  },
  {
    credit: 20000,
    price: 1000000,
    creditText: "1,000",
    priceText: "1 million",
    tax: 90000,
    finalPrice: 1090000,
  },
  {
    credit: 50000,
    price: 2500000,
    creditText: "1,000",
    priceText: "۲.1 million",
    tax: 225000,
    finalPrice: 2725000,
  },
];

export const quillModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [
      {
        color: [
          "#000000",
          "#CE9C7B",
          "#F5AB35",
          "#FF926B",
          "#FF6C5C",
          "#FA5C98",
          "#9B59B6",
          "#1297E0",
          "#27CBC0",
          "#2ECC71",
          "#8C9AA9",
          "#909090",
        ],
      },
      {
        background: [
          "#CE9C7B",
          "#F5AB35",
          "#FF926B",
          "#FF6C5C",
          "#FA5C98",
          "#9B59B6",
          "#1297E0",
          "#27CBC0",
          "#2ECC71",
          "#8C9AA9",
          "#909090",
          "#FFFFFF",
        ],
      },
    ], // dropdown with defaults from theme

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ align: [] }],
    ["link", "image"],

    ["clean"], // remove formatting button
  ],
};

export const units = [
  { persian: "number", english: "number" },
  { persian: "Kg", english: "kilograms" },
  { persian: "Liter", english: "litres" },
  { persian: "Milters", english: "mililitres" },
  { persian: "Warm", english: "grams" },
  { persian: "milligram", english: "miligrams" },
  { persian: "Meter", english: "meters" },
  { persian: "centimeter", english: "centimeters" },
  { persian: "Mm", english: "milimeters" },
  { persian: "Kilometers", english: "kilometers" },
  { persian: "Square meters", english: "squared_meters" },
  { persian: "square kilometer", english: "squared_kilomters" },
  { persian: "Day", english: "days" },
  { persian: "the watch", english: "hours" },
  { persian: "minute", english: "minutes" },
  { persian: "Second", english: "seconds" },
  { persian: "Milles", english: "miliseconds" },
];

export const paymentTypeOptions = [
  { id: 0, text: "All", keyword: null, color: surface.neutral.default },
  { id: 1, text: "Online", keyword: "0", color: surface.success.default },
  { id: 2, text: "Cash", keyword: "1", color: surface.neutral.default },
  {
    id: 3,
    text: "Card to card",
    keyword: "2",
    color: surface.neutral.default,
  },
  { id: 4, text: "Gift credit", keyword: "3", color: surface.neutral.default },
  { id: 5, text: "POS machine", keyword: "4", color: surface.neutral.default },
  {
    id: 6,
    text: "wallet",
    keyword: "5",
    color: hexToRGBA(process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR, 0.1),
  },
  {
    id: 7,
    text: "Rating",
    keyword: "6",
    color: hexToRGBA(process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR, 0.1),
  },
  { id: 8, text: "Other", keyword: "7", color: surface.neutral.default },
];

export const paymentTypeOptionsDictionary = {
  online: 0,
  cash: 1,
  cartToCart: 2,
  wallet: 5,
};
export const terminalOptions = [
  { id: 0, text: "All", keyword: null },
  { id: 1, text: "Zebra", keyword: "zibal" },
  { id: 2, text: "Zarinpal", keyword: "zarinpal" },
  { id: 3, text: "IDP", keyword: "idpay" },
  { id: 4, text: "The nation", keyword: "mellat" },
  { id: 5, text: "Padium", keyword: "podium" },
  { id: 6, text: "Twenty -one", keyword: "bistpay" },
  { id: 7, text: "Equipment", keyword: "saman" },
  { id: 8, text: "New Organization", keyword: "new-saman" },
];

export const paymentStatusOptions = [
  { id: 3, text: "All", value: null },
  { id: 0, text: "unpaid", value: "0" },
  { id: 1, text: "incompleted", value: "1" },
  { id: 2, text: "Paid", value: "2" },
  { id: 4, text: "Cancellation", value: "4" },
];
export const PURCHASE_ORDER_STATUS_DRAFT = "-1";
export const PURCHASE_ORDER_STATUS_PENDING_VENDOR = "1";
export const PURCHASE_ORDER_STATUS_CANCELLED_BY_VENDOR = "2";
export const PURCHASE_ORDER_STATUS_RECEIVING = "3";
export const PURCHASE_ORDER_STATUS_PARTIALLY_RECEIVED = "4";
export const PURCHASE_ORDER_STATUS_PARTIALLY_ARCHIVE = "5";

export const purchaseStatusOptions = {
  [PURCHASE_ORDER_STATUS_DRAFT]: {
    id: 0,
    text: "draft",
    keyword: -1,
    color: pollution,
    filled: true,
  },
  [PURCHASE_ORDER_STATUS_PENDING_VENDOR]: {
    id: 1,
    text: "New",
    color: "#F2C94C",
    filled: true,
  },
  [PURCHASE_ORDER_STATUS_CANCELLED_BY_VENDOR]: {
    id: 2,
    text: "Canceled",
    color: strawberryI,
    filled: true,
  },
  [PURCHASE_ORDER_STATUS_RECEIVING]: {
    id: 3,
    text: "Accepted",
    color: pollution,
    filled: true,
  },
  [PURCHASE_ORDER_STATUS_PARTIALLY_RECEIVED]: {
    id: 4,
    text: "Accepted",
    color: pollution,
    filled: true,
  },
  [PURCHASE_ORDER_STATUS_PARTIALLY_ARCHIVE]: {
    id: 5,
    text: "Accepted",
    color: pollution,
    filled: true,
  },
};
export const ITEM_RECEIVE_REASON_RECEIVED = 0;

export const purchaseLogStatusOptions = [
  {
    text: "received",
    status: 0,
    color: jungleI,
    modalText: "The amount received",
  },
  {
    text: "destroyed",
    status: 1,
    color: strawberryI,
    modalText: "The amount of receipt of broken",
  },
  {
    text: "It is not supplied",
    status: 2,
    color: strawberryI,
    modalText: "The amount not received",
  },
];
export const satisfactionChoices = [
  { id: 1, title: "Satisfied", keyword: 0 },
  { id: 2, title: "Neutral", keyword: 1 },
  { id: 3, title: "Unhappy", keyword: 2 },
];

export const satisfactionTitle = (satisfaction) => {
  if (satisfaction >= 1 && satisfaction < 3) {
    return "Unhappy";
  } else if (satisfaction >= 3 && satisfaction < 4) {
    return "Neutral";
  } else if (satisfaction >= 4 && satisfaction <= 5) {
    return "Satisfied";
  }
};
export const dashboardActivationSteps = {
  [SHOPPING_PLUGIN]: [
    {
      name: "template",
      title: "Create your user panel.",
      image: `/images/filter-frames.svg`,
    },
    {
      name: "free_domain_state",
      title: "Select your gift domain address.",
      image: `/images/gift.svg`,
      description:
        "How do you like others to find you on the Internet?ir.ink. Get a gift. Your domain can be changed after upgrading and before the final registration.",
    },
    {
      name: "deal_step",
      title: "Add your first product.",
      image: `/images/add-shopping-cart.svg`,
      description:
        "You can enter your first product in the showcase and then categorize the products and make it available to your users.",
      preStep: "address_and_phone_step",
      link: "setting",
      video_link:
        "https://hs3-cdn-saas.behtarino.com/static/panel/onboarding/addProduct.mp4",
    },
    {
      name: "order_step",
      title: "Manage your first order.",
      image: `/images/receipt.svg`,
      description:
        "Get the first order automatically from the showcase.Then you can confirm or cancel it to manage the order.",
      preStep: "deal_step",
      video_link:
        "https://hs3-cdn-saas.behtarino.com/static/panel/onboarding/order-managment.mp4",
    },

    {
      name: "payment_step",
      title: "Ready to set up a store.",
      image: `/images/storefront.svg`,
      description: `At this point we will be ready to order your site together. You will need to get domain, this and the bank port settings that you can do with showcase support guidance. Start the process of growing up.`,
      preStep: "order_step",
    },
    // {
    //   name: "domain_settings_state",
    //   title: "Get your gift domain.",
    //   image: `/images/card-giftcard-1.svg`,
    //   description:
    //     "Dear Willer, now you can do the required connections by entering the administrative process of receiving your domain by entering the administrative process of your domain by entering the administrative process of your domain..",
    //   preStep: "payment_step",
    // },
    {
      name: "sales_channel_gift",
      title: "Get up to $ 5,000 for your site's advertising.",
      description:
        "Now it's time to bring a customer on your site! You can visit the showcase and customer of the showcase with the help of advertising tools and platforms... Advertise your site and business and get a gift credit to start advertising from the showcase. Once you have completed the previous steps you can also get your advertising gift charging.",
      preStep: "payment_step",
    },
  ],
};

export const ACTIVATION_ITEM_ACTIVE = "ACTIVATION_ITEM_ACTIVE";
export const ACTIVATION_ITEM_DONE = "ACTIVATION_ITEM_DONE";
export const ACTIVATION_ITEM_LOCKED = "ACTIVATION_ITEM_LOCKED";

const NUMBER = "number";
const MILIGRAMS = "miligrams";
const GRAMS = "grams";
const KILOGRAMS = "kilograms";
const MILILITRES = "mililitres";
const LITRES = "litres";
const MILIMETERS = "milimeters";
const CENTIMETERS = "centimeters";
const METERS = "meters";
const SQUAREDMETERS = "squared_meters";
const SQUAREDKILOMETERS = "squared_kilomters";
const KILOMETERS = "kilometers";
const MILISECONDS = "miliseconds";
const SECONDS = "seconds";
const MINUTES = "minutes";
const HOURS = "hours";
const DAYS = "days";

export const unitsDictionary = {
  [MILIGRAMS]: "milligram",
  [GRAMS]: "Warm",
  [KILOGRAMS]: "Kg",
  [NUMBER]: "number",
  [MILILITRES]: "milliliter",
  [LITRES]: "Latter",
  [MILIMETERS]: "Mm",
  [CENTIMETERS]: "centimeter",
  [METERS]: "Meter",
  [SQUAREDMETERS]: " Square meters",
  [SQUAREDKILOMETERS]: "square kilometer",
  [KILOMETERS]: "Km",
  [MILISECONDS]: "Millisecond",
  [SECONDS]: "Second",
  [MINUTES]: "Minutes",
  [HOURS]: "Hour",
  [DAYS]: "Day",
};

export const VENDOR_ITEM_TYPE_DEAL = "deal";
export const VENDOR_ITEM_TYPE_INGREDIENT = "ingredient";

export const IMPORT_CSV = "IMPORT_CSV";
export const GUESS_OF_FIRST_MONTH_ORDERS_COUNT_OPTIONS = [
  "۱۰۰Order",
  "1 to 2 order",
  "1 to 2 order",
  "1 to 2 order",
];

export const ONBOARDED = "ONBOARDED";

export const UPDATE_PRODUCT = "panel/UPDATE_PRODUCT";
export const UPDATE_PRODUCT_VARIATION = "panel/UPDATE_PRODUCT_VARIATION";

export const GET_MODIFIER_SETS = "panel/GET_MODIFIER_SETS";
export const SET_MODIFIER_SETS = "panel/SET_MODIFIER_SETS";

export const GET_MODIFIER_SET = "panel/GET_MODIFIER_SET";
export const SET_MODIFIER_SET = "panel/SET_MODIFIER_SET";

export const CREATE_MODIFIER_SET = "panel/CREATE_MODIFIER_SET";
export const DELETE_MODIFIER_SET = "panel/DELETE_MODIFIER_SET";
export const UPDATE_MODIFIER_SET = "panel/UPDATE_MODIFIER_SET";

export const SET_APPROVED_PRICE_SUPER_INGREDIENT =
  "panel/SET_APPROVED_PRICE_SUPER_INGREDIENT";
export const ONBOARDED_MAIN_INFO = "ONBOARDED_MAIN_INFO";
export const ONBOARDED_PAGE_BUILDER = "ONBOARDED_PAGE_BUILDER";
export const CHECK_SITE_DOMAIN_AVAILABILITY =
  "panel/CHECK_SITE_DOMAIN_AVAILABILITY";

export const SET_AVAILABILITY_DOMAIN = "panel/SET_AVAILABILITY_DOMAIN";
export const IMPORT_MEMBERSHIPS = "panel/IMPORT_MEMBERSHIPS";

export const stepsProgress = [
  { step: 1, bottom: 112, left: 100, percent: 10 },
  { step: 2, bottom: 80, left: 123, percent: 20 },
  { step: 3, bottom: 3, left: 82, percent: 45 },
  { step: 4, bottom: 44, left: 3, percent: 70 },
  { step: 5, bottom: 101, left: 13, percent: 85 },
  { step: 6, bottom: 122, left: 42, percent: 95 },
  { step: 7, bottom: 125, left: 64, percent: 100 },
];
