/*
 *
 * Admin reducer
 *
 */
import produce from "immer";
import { HYDRATE } from "next-redux-wrapper";
import {
  SET_SHOPPING_ADMIN_ORDERS,
  DEFAULT_ACTION,
  SET_VITRIN_PAGE_VIEWS,
  SET_VITRIN_CALL_BUTTON_CLICKS,
  SET_SHOPPING_ADMIN_ORDER,
  SET_ADMIN_REVIEWS,
  SET_ADMIN_REVIEW,
  SET_SELECTED_DELIVERY_DATE,
  SET_DOMAIN_FREE,
  SET_SHOPPING_ANALYTICS_DATA,
  SET_ADMIN_PRODUCTS,
  SET_ADMIN_DEAL,
  SET_FORMS,
  SET_FORM_RESPONSES,
  SET_NEXT_FORM_RESPONSE_PAGE_NUMBER,
  SET_POS_DEVICES,
  SET_POS_DEVICE,
  SET_ADMIN_TRANSACTIONS,
  SET_ORDER_TRANSACTIONS,
  SET_SUBMITTED_PURCHASES,
  SET_RECEIVED_PURCHASES,
  SET_PURCHASE,
  SET_CMS_LESSONS,
  SET_REPORTS_DATA,
  SET_SHOPPING_ADMIN_ORDER_CRM,
  SET_DEAL_REPORT,
  SET_INGREDIENT_REPORT,
  SET_SHOPPING_ADMIN_ORDERS_SUMMARY,
  SET_DEALS_TOP_SELLING_REPORT,
  SET_ADMIN_PRODUCTS_BY_IDS,
  SET_SHOPPING_ADMIN_ORDER_INVOICE,
  SET_JOURNEY_STATE,
  SET_LEGAL_DOCUMENTS,
  SET_ADMIN_VENDORS,
  SET_ADMIN_VENDOR,
  SET_ADMIN_VENDOR_ITEMS,
  SET_CASH_DRAWER_TRANSACTIONS,
  SET_CASH_DRAWERS,
  SET_ADMIN_DEAL_IMAGES,
  SET_SEARCHED_CRM_MEMBERSHIP,
  SET_PURCHASE_REPORTS_BY_INGREDIENTS,
  SET_PURCHASE_REPORTS_BY_INGREDIENTS_PER_BRANCH,
  SET_PURCHASE_REPORTS_FROM_VENDORS,
  SET_PURCHASE_REPORTS_FROM_VENDORS_PER_BRANCH,
  SET_INGREDIENTS_RECOUNTING_REPORTS,
  SET_INGREDIENTS_RECOUNTING_REPORT,
  SET_DEALS_REPORTS_SOLD_BY_COUNT,
  SET_ORDER_TRANSACTIONS_FINANCE_SUMMARY_REPORTS,
  SET_SHOPPING_ORDERS_FINANCE_SUMMARY_REPORTS,
  SET_SHOPPING_ORDERS_PAYMENT_SUMMARY_REPORTS,
  SET_CUSTOMERS_SATISFACTION_REVIEWS_REPORTS,
  SET_CUSTOMERS_TAXING_REPORTS,
  SET_SUBMITTED_PURCHASES_REPORTS,
  SET_SUBMITTED_PURCHASES_REPORTS_PER_BRANCH,
  SET_CUSTOMERS_DISSATISFACTION_REVIEWS_REPORTS,
  SET_WAREHOUSE_REPORTING_CATEGORIES,
  SET_BUSINESS_CATEGORIES,
  SET_ORDER_TRANSACTIONS_FINANCE_PAYMENT_TYPES,
  SET_ORDER_TRANSACTION_PER_PAYMENT_TYPE_PER_SALES_CHANNEL,
  SET_DISCOUNT_CODE_REPORTS,
  SET_INVENTORY_HEISTORY_REPORTS,
  SET_COLLECTIVE_PURCHASES,
  SET_TOTAL_REQUESTED_PURCHASE_ITEMS,
  SET_SHOPPING_ORDER_AGGREGATE,
  SET_FIRST_AND_LAST_REPORTS,
  SET_CRM_MEMBERSHIP_BY_QUERY,
  SET_AGGREGATE_RATING,
  SET_CRM_SEGMENTS,
  SET_LABELS,
  SET_INGREDIENTS,
  SET_INGREDIENT,
  SET_MODIFIER_SETS,
  SET_MODIFIER_SET,
  SET_ADMIN_ALL_PRODUCTS,
  SET_CALL_REQUESTS,
  SET_REPORT_CALL_REQUESTS,
  SET_DISCOUNT_CODE_DATA,
  SET_DISCOUNT_CODE_BY_ID,
  SET_REVIEWS_RESPONSE,
  SET_INVOICE_FACTOR,
  SET_NIC_TIMEOUT_ERROR,
  SET_CAMPAIGN_LIST,
  SET_CAMPAIGN_BY_ID,
  SET_GROSS_SALES_REPORT,
  SET_PRODUCTS_DEACTIVATION_REPORT,
  SET_BUSINESS_SHOPPING_DATA,
  SET_REVIEWS_TEMPLATE,
  SET_CRM_LEVEL_BY_ID,
  SET_CRM_LEVELS_LIST,
  SET_CRM_SEGMENT_BY_ID,
  SET_CRM_SEGMENT_LIST,
  SET_AUTOMATED_PROCESSES,
  SET_AUTOMATED_PROCESS_BY_ID,
  SET_AUTOMATED_PROCESS_TYPE,
  SET_AUTOMATED_PROCESS_CREDIT_REPORTS,
  SET_CAMPAIGN_CREDIT_REPORTS,
  SET_CRM_MEMBERSHIP_EVENT_LOGS,
  SET_AVAILABILITY_DOMAIN,
  SET_COSTS_LIST,
  SET_COST_CATEGORIES_LIST,
  SET_PAYMENT_METHODS,
  SET_CAMPAIGN_BY_SEGMENT,
  SET_CAMPAIGNS_BY_SEGMENT,
} from "./constants";

export const initialState = {
  shoppingAdminOrders: [],
  shoppingAdminOrdersPagination: {},
  shoppingAdminOrder: { items: [] },
  shoppingAnalyticsData: {
    approved_orders: [],
    earnings: [],
    average_earnings: [],
    cancelled_orders: [],
    received_orders: [],
    order_items: {},
    order_items_count: {},
  },
  reviews: [],
  reviewsPagination: null,
  review: null,
  vitrinPageViews: null,
  vitrinCallRequests: null,
  selectedDeliveryDate: {},
  adminDealsByIds: null,
  adminDeals: null,
  adminDealsPagination: {},
  adminDeal: null,
  adminProductImages: [],
  forms: null,
  formResponses: null,
  nextFormResponsePageNum: 1,
  formResponsesPagination: {},
  reportsData: {},
  businessDealsReports: {},
  businessTransactionsReports: {},
  businessBranchesDealsReports: {},
  businessBranchesTransactionsReports: {},
  businessReviewsReports: {},
  businessBranchesReviewsReports: {},
  businessBranchesShoppingOrdersReports: {},
  businessShoppingOrdersReports: {},
  businessTopSellingDealsReports: null,
  CMSLessons: null,

  devices: null,
  device: null,
  productReport: null,
  ingredientReport: null,
  transactions: [],
  transactionsPagination: {},
  submittedPurchases: [],
  submittedPurchasesPagination: {},
  receivedPurchases: [],
  receivedPurchasesPagination: {},
  orderTransactions: [],
  purchase: null,
  orderCRM: null,
  shoppingAdminOrdersSummary: null,
  journeyState: null,
  legalDocuments: [],
  cashDrawerTransactions: null,
  cashDrawers: null,
  cashDrawersPagination: {},
  shoppingAdminOrderInvoice: null,
  adminVendors: null,
  adminVendor: null,
  adminVendorItems: null,
  collectivePurchases: [],
  collectivePurchasesPagination: {},
  totalRequestedPurchaseItems: null,
  collectivePurchase: null,
  orderAggregate: {},
  CRMMembershipByQuery: null,
  CRMMembershipPaginationByQuery: null,
  surveyTemplate: {},
  aggregateRating: {},
  ingredients: [],
  ingredientsPagination: {},
  ingredient: {},
  modifierSets: [],
  modifierSetsPagination: {},
  modifierSet: null,
  adminAllProducts: [],
  inventoryHistoryReports: [],
  callRequests: [],
  reportsCallRequests: [],
  reviewsResponsePaginationByQuery: null,
  invoiceFactor: null,
  nikTimeoutError: null,
  campaigns: [],
  campaignsPagination: {},
  crmSegmentsPagination: {},
  campaignDetail: {},
  grossSalesReportData: [],
  productsDeactivation: [],
  businessShoppingData: [],
  reviewsTemplate: [],
  availability_domain: null,
  CRMMemberhsipEventLogsPagination: {},
  revalCostsPagination: {},
};

/* eslint-disable default-case, no-param-reassign */
const adminReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case HYDRATE:
        // Attention! This will overwrite client state! Real apps should use proper reconciliation.
        return { ...state, ...action.payload.admin };
      case SET_DOMAIN_FREE:
        draft.isDomainFree = action.data;
        break;
      case SET_BUSINESS_SHOPPING_DATA:
        draft.businessShoppingData = action.data;
        break;
      case SET_REPORTS_DATA:
        draft.reportsData[action.data.reportName] = {
          currentRange: action.data.currentRangeSerializedData,
          previousRange: action.data.previousRangeSerializedData,
        };
        break;
      case SET_DEALS_TOP_SELLING_REPORT:
        draft.businessTopSellingDealsReports = action.data;
        break;
      case SET_SHOPPING_ADMIN_ORDERS:
        draft.shoppingAdminOrders = action.data;
        draft.shoppingAdminOrder = { items: [] };
        if (action.pagination) draft.shoppingAdminOrdersPagination = action.pagination;
        break;
      case SET_SHOPPING_ADMIN_ORDER:
        draft.shoppingAdminOrder = action.data;
        break;
      case SET_SHOPPING_ADMIN_ORDERS_SUMMARY:
        draft.shoppingAdminOrdersSummary = action.data;
        break;

      case SET_VITRIN_PAGE_VIEWS:
        draft.vitrinPageViews = action.data;
        break;
      case SET_VITRIN_CALL_BUTTON_CLICKS:
        draft.vitrinCallRequests = action.data;
        break;
      case SET_ADMIN_REVIEWS:
        draft.reviews = action.data;
        draft.reviewsPagination = action.pagination;
        break;
      case SET_ADMIN_REVIEW:
        draft.review = action.data;
        break;
      case SET_SELECTED_DELIVERY_DATE:
        draft.selectedDeliveryDate = action.data;
        break;
      case SET_SHOPPING_ANALYTICS_DATA:
        draft.shoppingAnalyticsData = action.data;
        break;
      case SET_ADMIN_PRODUCTS:
        draft.adminDeals = action.data;
        draft.adminDeal = null;
        draft.adminDealsPagination = action.pagination;
        break;
      case SET_ADMIN_PRODUCTS_BY_IDS:
        draft.adminDealsByIds = action.data;
        break;
      case SET_ADMIN_DEAL:
        draft.adminDeal = action.data;
        draft.adminProductImages = action.data?.images || [];
        break;
      case SET_ADMIN_ALL_PRODUCTS:
        draft.adminAllProducts = action.data;
        break;

      case SET_FORMS:
        draft.forms = action.data;
        break;

      case SET_NEXT_FORM_RESPONSE_PAGE_NUMBER:
        draft.nextFormResponsePageNum = action.data;
        break;
      case SET_FORM_RESPONSES:
        draft.formResponses = action.data;
        draft.formResponsesPagination = action.pagination;
        break;
      case SET_CMS_LESSONS:
        draft.CMSLessons = action.data;
        break;
      case SET_POS_DEVICES:
        draft.devices = action.data;
        break;
      case SET_POS_DEVICE:
        draft.device = action.data;
        break;
      case SET_ADMIN_TRANSACTIONS:
        draft.transactions = action.data;
        draft.transactionsPagination = action.pagination;
        break;
      case SET_SUBMITTED_PURCHASES:
        draft.submittedPurchases = action.data;
        if (action.pagination) draft.submittedPurchasesPagination = action.pagination;
        break;
      case SET_RECEIVED_PURCHASES:
        draft.receivedPurchases = action.data;
        if (action.pagination) draft.receivedPurchasesPagination = action.pagination;
        break;
      case SET_ORDER_TRANSACTIONS:
        draft.orderTransactions = action.data;
        break;

      case SET_PURCHASE:
        draft.purchase = action.data;
        break;
      case SET_DEAL_REPORT:
        draft.productReport = action.data;
        break;

      case SET_INGREDIENT_REPORT:
        draft.ingredientReport = action.data;
        break;

      case SET_SHOPPING_ADMIN_ORDER_CRM:
        draft.orderCRM = action.data;
        break;
      case SET_JOURNEY_STATE:
        draft.journeyState = action.data;
        break;
      case SET_LEGAL_DOCUMENTS:
        draft.legalDocuments = action.data;
        break;

      case SET_CASH_DRAWER_TRANSACTIONS:
        draft.cashDrawerTransactions = action.data;
        break;
      case SET_CASH_DRAWERS:
        draft.cashDrawers = action.data;
        draft.cashDrawersPagination = action.pagination;
        break;
      case SET_SHOPPING_ADMIN_ORDER_INVOICE:
        draft.shoppingAdminOrderInvoice = action.data;
        break;

      case SET_ADMIN_DEAL_IMAGES:
        draft.adminProductImages = action.data;
        break;
      case SET_SEARCHED_CRM_MEMBERSHIP:
        draft.searchedCRMMembership = action.data;
        break;
      case SET_CRM_MEMBERSHIP_EVENT_LOGS:
        draft.CRMMemberhsipEventLogsPagination = action.pagination;
        draft.membershipEventLogs = action.data;
        break;
      case SET_PURCHASE_REPORTS_BY_INGREDIENTS:
        draft.purchaseReportsByProducts = action.data;
        break;
      case SET_PURCHASE_REPORTS_BY_INGREDIENTS_PER_BRANCH:
        draft.purchaseReportsByProductsPerBranch = action.data;
        break;
      case SET_PURCHASE_REPORTS_FROM_VENDORS:
        draft.purchaseReportsFromVendors = action.data;
        break;
      case SET_PURCHASE_REPORTS_FROM_VENDORS_PER_BRANCH:
        draft.purchaseReportsFromVendorsPerBranch = action.data;
        break;
      case SET_INGREDIENTS_RECOUNTING_REPORTS:
        draft.ingredientsRecountingReports = action.data;
        break;
      case SET_INGREDIENTS_RECOUNTING_REPORT:
        draft.ingredientsRecountingReport = action.data;
        break;
      case SET_DEALS_REPORTS_SOLD_BY_COUNT:
        draft.dealsReportsSoldByCount = action.data;
        break;
      case SET_ORDER_TRANSACTIONS_FINANCE_SUMMARY_REPORTS:
        draft.orderTransActionsFinanceSummaryReports = action.data;
        break;
      case SET_SHOPPING_ORDERS_FINANCE_SUMMARY_REPORTS:
        draft.shoppingOrdersFinanceSummaryReports = action.data;
        break;
      case SET_SHOPPING_ORDERS_PAYMENT_SUMMARY_REPORTS:
        draft.shoppingOrdersPaymentSummaryReports = action.data;
        break;
      case SET_CUSTOMERS_SATISFACTION_REVIEWS_REPORTS:
        draft.customersSatisfactionReviewsReports = action.data;
        break;

      case SET_INVENTORY_HEISTORY_REPORTS:
        draft.inventoryHistoryReports = action.data;
        break;

      case SET_CUSTOMERS_TAXING_REPORTS:
        draft.customersTaxingReports = action.data;
        break;
      case SET_CUSTOMERS_DISSATISFACTION_REVIEWS_REPORTS:
        draft.customersDisSatisfactionReviewsReports = action.data;
        break;
      case SET_ORDER_TRANSACTIONS_FINANCE_PAYMENT_TYPES:
        draft.orderTransactionFinancePaymentTypes = action.data;
        break;
      case SET_ORDER_TRANSACTION_PER_PAYMENT_TYPE_PER_SALES_CHANNEL:
        draft.orderTransactionPerPaymentTypesPerSalesChannel = action.data;
        break;
      case SET_DISCOUNT_CODE_REPORTS:
        draft.discountCodeReports = action.data;
        break;
      case SET_SUBMITTED_PURCHASES_REPORTS:
        draft.submittedPurchasesReports = action.data;
        draft.submittedPurchasesReportsPagination = action.pagination;
        break;
      case SET_SUBMITTED_PURCHASES_REPORTS_PER_BRANCH:
        draft.submittedPurchasesReportsPerBranch = action.data;
        draft.submittedPurchasesReportsPerBranchPagination = action.pagination;
        break;
      case SET_ADMIN_VENDORS:
        draft.adminVendors = action.data;
        break;
      case SET_BUSINESS_CATEGORIES:
        draft.businessCategories = action.data;
        break;
      case SET_WAREHOUSE_REPORTING_CATEGORIES:
        draft.warehouseReportingCategories = action.data;
        break;
      case SET_ADMIN_VENDOR:
        draft.adminVendor = action.data;
        break;
      case SET_ADMIN_VENDOR_ITEMS:
        draft.adminVendorItems = action.data;
        break;
      case SET_COLLECTIVE_PURCHASES:
        draft.collectivePurchases = action.data;
        draft.collectivePurchasesPagination = action.pagination;
        break;
      case SET_TOTAL_REQUESTED_PURCHASE_ITEMS:
        draft.totalRequestedPurchaseItems = action.data;
        break;
      case SET_SHOPPING_ORDER_AGGREGATE:
        draft.orderAggregate = action.data;
        break;
      case SET_FIRST_AND_LAST_REPORTS:
        draft.FirstAndLastReport = action.data;
        break;

      case SET_CRM_MEMBERSHIP_BY_QUERY:
        draft.CRMMembershipByQuery = action.data;
        draft.CRMMembershipPaginationByQuery = action.pagination;
        break;

      case SET_CRM_LEVEL_BY_ID:
        draft.crmLevelItem = action.data;
        break;

      case SET_CRM_LEVELS_LIST:
        draft.crmLevels = action.data;
        break;

      case SET_CRM_SEGMENTS:
        draft.crmSegments = action.data;
        break;
      case SET_CRM_SEGMENT_LIST:
        draft.crmSegments = action.data;
        draft.crmSegmentsPagination = action.pagination;
        break;
      case SET_CRM_SEGMENT_BY_ID:
        draft.crmSegmentItem = action.data;
        break;
      case SET_LABELS:
        draft.crmLabels = action.data;
        break;
      case SET_AGGREGATE_RATING:
        draft.aggregateRating = action.data;
        break;
      case SET_AUTOMATED_PROCESSES:
        draft.automatedProcessesPagination = action.pagination;
        draft.automatedProcesses = action.data;
        break;
      case SET_AUTOMATED_PROCESS_BY_ID:
        draft.automatedProcessItem = action.data;
        break;
      case SET_INGREDIENTS:
        draft.ingredients = action.data;
        draft.ingredient = {};
        draft.ingredientsPagination = action.pagination;
        break;
      case SET_INGREDIENT:
        draft.ingredient = action.data;
        break;
      case SET_MODIFIER_SETS:
        draft.modifierSets = action.data;
        draft.modifierSet = null;
        draft.modifierSetsPagination = action.pagination;
        break;

      case SET_MODIFIER_SET:
        draft.modifierSet = action.data;
        break;
      case SET_CALL_REQUESTS:
        draft.callRequests = action.data;
        break;
      case SET_REPORT_CALL_REQUESTS:
        draft.reportsCallRequests = action.data;
        break;
      case SET_DISCOUNT_CODE_DATA:
        draft.discountCodeData = action.data;
        break;
      case SET_DISCOUNT_CODE_BY_ID:
        draft.discountCodeDataById = action.data;
        break;
      case SET_REVIEWS_RESPONSE:
        draft.reviewsResponse = action.data;
        draft.reviewsResponsePaginationByQuery = action.pagination;
        break;
      case SET_INVOICE_FACTOR:
        draft.invoiceFactor = action.data;
        break;
      case SET_NIC_TIMEOUT_ERROR:
        draft.nikTimeoutError = action.data;
        break;
      case SET_CAMPAIGN_LIST:
        draft.campaigns = action.data;
        draft.campaignsPagination = action.pagination;
        break;
      case SET_CAMPAIGN_BY_ID:
        draft.campaignDetail = action.data;
        break;
      case SET_AUTOMATED_PROCESS_CREDIT_REPORTS:
        draft.automatedProcessCreditReport = action.data;
        break;
      case SET_CAMPAIGN_CREDIT_REPORTS:
        draft.campaignCreditReport = action.data;
        break;
      case SET_GROSS_SALES_REPORT:
        draft.grossSalesReportData = action.data;
      case SET_PRODUCTS_DEACTIVATION_REPORT:
        draft.productsDeactivation = action.data;
      case DEFAULT_ACTION:
        break;
      case SET_REVIEWS_TEMPLATE:
        draft.reviewsTemplate = action.data;
        break;
      case SET_AUTOMATED_PROCESS_TYPE:
        draft.automatedProcessType = action.data;
        break;
      case SET_AVAILABILITY_DOMAIN:
        draft.availability_domain = action.data;
        break;
      case SET_COSTS_LIST:
        draft.costsList = action.data.data;
        draft.revalCostsPagination = action.data.meta;
        break;
      case SET_COST_CATEGORIES_LIST:
        draft.costsCategory = action.data;
        break;
      case SET_PAYMENT_METHODS:
        draft.paymentMethods = action.data;
        break;
      case SET_CAMPAIGN_BY_SEGMENT:
        draft.campaignBySegment = action.data;
        break;
      case SET_CAMPAIGNS_BY_SEGMENT:
        draft.campaignBySegments = action.data;
        break;
    }
  });

export default adminReducer;
