/* eslint-disable camelcase */
/*
 *
 * Admin actions
 *
 */

/* eslint-disable camelcase */
/*
 *
 * Admin actions
 *
 */

import { CREATE_PRODUCT, DELETE_PRODUCT } from "@saas/stores/business/constants";
import {
  ACCEPT_SUBMITTED_PURCHASE,
  ACTIVATE_TRIAL,
  ADD_GIFT_CREDIT_TRANSACTION,
  ADD_SHOPPING_NOTE,
  APPLY_RECEIVED_PURCHASE,
  APPLY_SUBMITTED_PURCHASE,
  ASSIGN_DELIVERY_MAN,
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
  DEFAULT_ACTION,
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
  GET_CALL_REQUESTS,
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
  SET_ADMIN_ALL_PRODUCTS,
  SET_ADMIN_DEAL,
  SET_ADMIN_DEAL_IMAGES,
  SET_ADMIN_PRODUCTS,
  SET_ADMIN_PRODUCTS_BY_IDS,
  SET_ADMIN_REVIEW,
  SET_ADMIN_REVIEWS,
  SET_ADMIN_TRANSACTIONS,
  SET_ADMIN_VENDOR,
  SET_ADMIN_VENDOR_ITEMS,
  SET_ADMIN_VENDORS,
  SET_AGGREGATE_RATING,
  SET_APPROVED_PRICE_SUPER_INGREDIENT,
  SET_BUSINESS_CATEGORIES,
  SET_CALL_REQUESTS,
  SET_CASH_DRAWER_TRANSACTIONS,
  SET_CASH_DRAWERS,
  SET_CMS_LESSONS,
  SET_COLLECTIVE_PURCHASES,
  SET_CRM_MEMBERSHIP_BY_QUERY,
  SET_CRM_SEGMENTS,
  SET_CUSTOMERS_DISSATISFACTION_REVIEWS_REPORTS,
  SET_CUSTOMERS_SATISFACTION_REVIEWS_REPORTS,
  SET_CUSTOMERS_TAXING_REPORTS,
  SET_DEAL_REPORT,
  SET_DEALS_REPORTS_SOLD_BY_COUNT,
  SET_DEALS_TOP_SELLING_REPORT,
  SET_DISCOUNT_CODE_BY_ID,
  SET_DISCOUNT_CODE_DATA,
  SET_DISCOUNT_CODE_REPORTS,
  SET_DOMAIN_FREE,
  SET_FIRST_AND_LAST_REPORTS,
  SET_FORM_RESPONSES,
  SET_FORMS,
  SET_INGREDIENT,
  SET_INGREDIENT_REPORT,
  SET_INGREDIENTS,
  SET_INGREDIENTS_RECOUNTING_REPORT,
  SET_INGREDIENTS_RECOUNTING_REPORTS,
  SET_INVENTORY_HEISTORY_REPORTS,
  SET_INVOICE_FACTOR,
  SET_JOURNEY_STATE,
  SET_LABELS,
  SET_LEGAL_DOCUMENTS,
  SET_MODIFIER_SET,
  SET_MODIFIER_SETS,
  SET_NEXT_FORM_RESPONSE_PAGE_NUMBER,
  SET_NIC_TIMEOUT_ERROR,
  SET_ORDER_TRANSACTION_PER_PAYMENT_TYPE_PER_SALES_CHANNEL,
  SET_ORDER_TRANSACTIONS,
  SET_ORDER_TRANSACTIONS_FINANCE_PAYMENT_TYPES,
  SET_ORDER_TRANSACTIONS_FINANCE_SUMMARY_REPORTS,
  SET_POS_DEVICE,
  SET_POS_DEVICES,
  SET_PURCHASE,
  SET_PURCHASE_REPORTS_BY_INGREDIENTS,
  SET_PURCHASE_REPORTS_BY_INGREDIENTS_PER_BRANCH,
  SET_PURCHASE_REPORTS_FROM_VENDORS,
  SET_PURCHASE_REPORTS_FROM_VENDORS_PER_BRANCH,
  SET_RECEIVED_PURCHASES,
  SET_REPORT_CALL_REQUESTS,
  SET_REPORTS_DATA,
  SET_REVIEWS_RESPONSE,
  SET_SEARCHED_CRM_MEMBERSHIP,
  SET_SELECTED_DELIVERY_DATE,
  SET_SHOPPING_ADMIN_ORDER,
  SET_SHOPPING_ADMIN_ORDER_CRM,
  SET_SHOPPING_ADMIN_ORDER_INVOICE,
  SET_SHOPPING_ADMIN_ORDERS,
  SET_SHOPPING_ADMIN_ORDERS_SUMMARY,
  SET_SHOPPING_ANALYTICS_DATA,
  SET_SHOPPING_ORDER_AGGREGATE,
  SET_SHOPPING_ORDERS_FINANCE_SUMMARY_REPORTS,
  SET_SHOPPING_ORDERS_PAYMENT_SUMMARY_REPORTS,
  SET_SUBMITTED_PURCHASES,
  SET_SUBMITTED_PURCHASES_REPORTS,
  SET_SUBMITTED_PURCHASES_REPORTS_PER_BRANCH,
  SET_TOTAL_REQUESTED_PURCHASE_ITEMS,
  SET_VITRIN_CALL_BUTTON_CLICKS,
  SET_VITRIN_PAGE_VIEWS,
  SET_WAREHOUSE_REPORTING_CATEGORIES,
  SUBMIT_FACTOR,
  SUBMIT_PURCHASE,
  UPDATE_ADMIN_VENDOR,
  UPDATE_ADMIN_VENDOR_ITEM,
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
  GET_CAMPAIGN_LIST,
  UPDATE_CAMPAIGN_BY_ID,
  CREATE_CAMPAIGN,
  SET_CAMPAIGN_LIST,
  GET_CAMPAIGN_BY_ID,
  SET_CAMPAIGN_BY_ID,
  AUTOMATIC_CONSULTATION_REQUEST,
  GET_GROSS_SALES_REPORT,
  SET_GROSS_SALES_REPORT,
  SET_PRODUCTS_DEACTIVATION_REPORT,
  GET_PRODUCTS_DEACTIVATION_REPORT,
  GET_BUSINESS_SHOPPING_DATA,
  SET_BUSINESS_SHOPPING_DATA,
  GET_REVIEWS_TEMPLATE,
  SET_REVIEWS_TEMPLATE,
  UPDATE_CRM_LABEL,
  UPDATE_CRM_LEVEL,
  SET_CRM_LEVELS_LIST,
  GET_CRM_LEVEL_BY_ID,
  SET_CRM_LEVEL_BY_ID,
  DELETE_CRM_LEVEL_BY_ID,
  GET_CRM_LEVELS_LIST,
  CREATE_CRM_LEVEL,
  GET_CRM_SEGMENT_BY_ID,
  SET_CRM_SEGMENT_BY_ID,
  UPDATE_CRM_SEGMENT,
  DELETE_CRM_SEGMENT,
  CREATE_CRM_SEGMENT,
  GET_CRM_SEGMENT_LIST,
  GET_AUTOMATED_PROCESS_BY_ID,
  SET_AUTOMATED_PROCESS_BY_ID,
  SET_AUTOMATED_PROCESSES,
  CREATE_AUTOMATED_PROCESS,
  UPDATE_AUTOMATED_PROCESS,
  DELETE_AUTOMATED_PROCESS,
  GET_AUTOMATED_PROCESSES,
  SET_AUTOMATED_PROCESS_TYPE,
  GET_AUTOMATED_PROCESS_TYPE,
  SET_CRM_SEGMENT_LIST,
  GET_AUTOMATED_PROCESS_CREDIT_REPORTS,
  SET_AUTOMATED_PROCESS_CREDIT_REPORTS,
  GET_CAMPAIGN_CREDIT_REPORTS,
  SET_CAMPAIGN_CREDIT_REPORTS,
  UPDATE_CRM_SURVEY_DELAY,
  ADD_LABEL_TO_MEMBERSHIP_GROUP,
  GET_CRM_MEMBERSHIP_EVENT_LOGS,
  SET_CRM_MEMBERSHIP_EVENT_LOGS,
  CREATE_GATE_AWAY_ZIBAL,
  INITIALIZE_GATE_AWAY_ZIBAL,
  CHECK_SITE_DOMAIN_AVAILABILITY,
  SET_AVAILABILITY_DOMAIN,
  GET_COSTS_LIST,
  SET_COSTS_LIST,
  GET_COST_CATEGORIES_LIST,
  SET_COST_CATEGORIES_LIST,
  CREATE_COST_CATEGORY,
  GET_PAYMENT_METHODS,
  SET_PAYMENT_METHODS,
  CREATE_COST,
  IMPORT_MEMBERSHIPS,
  UPDATE_CAMPAIGN_BY_SEGMENT,
  CREATE_CAMPAIGN_BY_SEGMENT,
  SET_CAMPAIGN_BY_SEGMENT,
  GET_CAMPAIGN_BY_SEGMENT,
  SET_CAMPAIGNS_BY_SEGMENT,
  GET_CAMPAIGNS_BY_SEGMENT,
} from "./constants";

export function uploadImageAndUpdateProduct(variationId, resourceId, product) {
  return {
    type: UPLOAD_IMAGE_AND_UPDATE_PRODUCT,
    data: { variation_id: variationId, resource_id: resourceId, product },
  };
}

export function uploadImageAndUpdateVariation(variationId, resourceId, product) {
  return {
    type: UPLOAD_IMAGE_AND_UPDATE_VARIATION,
    data: { variation_id: variationId, resource_id: resourceId, product },
  };
}

export function createProduct({ product, images, productInventoryAdjustment, hasVariations }, callback) {
  return {
    type: CREATE_PRODUCT,
    data: { product, images, productInventoryAdjustment, hasVariations },
    callback,
  };
}

export function deleteProduct(productId, callback) {
  return {
    type: DELETE_PRODUCT,
    data: { id: productId },
    callback,
  };
}

export function updateProduct({ product, uploadedFiles, hasVariations, callback, productInventoryAdjustment }) {
  return {
    type: UPDATE_PRODUCT,
    data: {
      product,
      images: uploadedFiles,
      hasVariations,
      productInventoryAdjustment,
    },
    callback,
  };
}
export function updateProductVariation({ variation, uploadedFiles, callback, variationInventoryAdjustment }) {
  return {
    type: UPDATE_PRODUCT_VARIATION,
    data: {
      variation,
      images: uploadedFiles,
      variationInventoryAdjustment,
    },
    callback,
  };
}

export function updateModifierSet(id, data, modifiersInventoryAdjustment, callback) {
  return {
    type: UPDATE_MODIFIER_SET,
    data: { id, modifierSet: data, modifiersInventoryAdjustment },
    callback,
  };
}

export function createModifierSet(data, callback) {
  return {
    type: CREATE_MODIFIER_SET,
    data,
    callback,
  };
}

export function deleteModifierSet(id, callback) {
  return {
    type: DELETE_MODIFIER_SET,
    data: { id },
    callback,
  };
}

export function createIngredient(data, callback) {
  return {
    type: CREATE_INGREDIENT,
    data,
    callback,
  };
}

export function updateIngredient(data, callback) {
  return {
    type: UPDATE_INGREDIENT,
    data,
    callback,
  };
}

export function deleteIngredient(id, callback) {
  return {
    type: DELETE_INGREDIENT,
    data: { id },
    callback,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getForms() {
  return {
    type: GET_FORMS,
  };
}
export function setForms(forms) {
  return {
    type: SET_FORMS,
    data: forms,
  };
}
export function getFormResponses(from, to, id) {
  return {
    type: GET_FORM_RESPONSES,
    data: {
      from,
      to,
      id,
    },
  };
}
export function setFormResponses(responses, pagination) {
  return {
    type: SET_FORM_RESPONSES,
    data: responses,
    pagination,
  };
}

export function updateForm(form) {
  return {
    type: UPDATE_FORM,
    data: form,
  };
}
export function deleteForm(id) {
  return {
    type: DELETE_FORM,
    data: id,
  };
}
export function createForm(form) {
  return {
    type: CREATE_FORM,
    data: form,
  };
}

export function setNextFormResponsesPage(data) {
  return {
    type: SET_NEXT_FORM_RESPONSE_PAGE_NUMBER,
    data,
  };
}
export function updateBusinessPage(data, callback) {
  return {
    type: UPDATE_PAGE,
    data,
    callback,
  };
}

export function deleteBusinessPage(id, filters) {
  return {
    type: DELETE_PAGE,
    data: id,
    filters,
  };
}

export function createBusinessPage(data, cb) {
  return {
    type: CREATE_PAGE,
    data,
    cb,
  };
}
// Analytics
export function getAdminPageViews() {
  return {
    type: GET_VITRIN_PAGE_VIEWS,
  };
}
export function setAdminPageViews(data) {
  return {
    type: SET_VITRIN_PAGE_VIEWS,
    data,
  };
}
export function getAdminCallRequests() {
  return {
    type: GET_VITRIN_CALL_BUTTON_CLICKS,
  };
}
export function setAdminCallRequests(data) {
  return {
    type: SET_VITRIN_CALL_BUTTON_CLICKS,
    data,
  };
}
export function requestAlopeyk(order_id) {
  return {
    type: REQUEST_ALOPEYK,
    data: { order_id },
  };
}
export function requestMiare(order_id) {
  return {
    type: REQUEST_MIARE,
    data: { order_id },
  };
}
export function assignDeliveryMan(
  order_id,
  deliverer,
  shouldUpdateList,
  domain,
  actionForShouldUpdateListInAssignDelivery
) {
  return {
    type: ASSIGN_DELIVERY_MAN,
    data: { order_id, deliverer },
    shouldUpdateList,
    domain,
    actionForShouldUpdateListInAssignDelivery,
  };
}

export function getSubmittedPurchasesReports(data, pagination) {
  return {
    type: GET_SUBMITTED_PURCHASES_REPORTS,
    data,
    pagination,
  };
}
export function setSubmittedPurchasesReports(data) {
  return {
    type: SET_SUBMITTED_PURCHASES_REPORTS,
    data,
  };
}
export function getSubmittedPurchasesReportsPerBranch(data, pagination) {
  return {
    type: GET_SUBMITTED_PURCHASES_REPORTS_PER_BRANCH,
    data,
    pagination,
  };
}
export function setSubmittedPurchasesReportsPerBranch(data) {
  return {
    type: SET_SUBMITTED_PURCHASES_REPORTS_PER_BRANCH,
    data,
  };
}

// CRM
export function createDiscountCode(
  code,
  discount_price,
  discount_floor_amount,
  max_using_number_per_user,
  max_using_total = 10000,
  is_active,
  id,
  discount_id
) {
  return {
    type: CREATE_DISCOUNT_CODE,
    data: {
      discountData: {
        code,
        discount_price,
        discount_floor_amount,
        max_using_number_per_user,
        max_using_total,
        is_active,
        id,
        discount_id,
      },
    },
  };
}
export function changeCRMLabel(id, data, callback) {
  return {
    type: CHANGE_CRM_LABEL,
    id,
    data,
    callback,
  };
}
export function deleteCRMLabel(id, callback) {
  return {
    type: DELETE_CRM_LABEL,
    data: {
      id,
    },
    callback,
  };
}
export function deleteCRMLabels(id) {
  return {
    type: DELETE_CRM_LABELS,
    data: {
      id,
    },
  };
}
export function createCRMLabel(title, description) {
  return {
    type: CREATE_CRM_LABEL,
    data: {
      title,
      description,
    },
  };
}
export function editMembership(id, data, callback) {
  return {
    type: UPDATE_CRM_MEMBERSHIP,
    id,
    data,
    callback,
  };
}

export function getMembershipEventLogs(id, query) {
  return {
    type: GET_CRM_MEMBERSHIP_EVENT_LOGS,
    id,
    query,
  };
}

export function setMembershipEventLogs(data, pagination) {
  return {
    type: SET_CRM_MEMBERSHIP_EVENT_LOGS,
    data,
    pagination,
  };
}

// export function editMembershipByID(id, name, phone, new_labels, extra_data) {
//   return {
//     type: EDIT_MEMBERSHIP_BY_ID,
//     data: {
//       id,
//       new_labels,
//       name,
//       user: { phone },
//       extra_data,
//     },
//   };
// }
export function deleteMembership(id, callback) {
  return {
    type: DELETE_CRM_MEMBERSHIP,
    data: {
      id,
    },
    callback,
  };
}
export function getCRMLabels() {
  return {
    type: GET_CRM_LABELS,
  };
}
export function getCRMLabelMemberships(label, page, pageSize) {
  return {
    type: GET_CRM_LABEL_DETAIL,
    label,
    page,
    pageSize,
  };
}
export function getCRMMemberships(page, pageSize, search) {
  return {
    type: GET_CRM_MEMBERSHIPS,
    page,
    pageSize,
    search,
  };
}

export function createCRMMembershipsFromSheet(data) {
  return {
    type: CREATE_CRM_MEMBERSHIP_FROM_SHEET,
    data,
  };
}
export function createCRMMembership(data, callback) {
  return {
    type: CREATE_CRM_MEMBERSHIP,
    data,
    callback,
  };
}

// Domain
export function checkDomainFree(data) {
  return {
    type: CHECK_DOMAIN_FREE,
    data,
  };
}
export function setDomainFree(data) {
  return {
    type: SET_DOMAIN_FREE,
    data,
  };
}

export function setNicTimeoutError(data) {
  return {
    type: SET_NIC_TIMEOUT_ERROR,
    data,
  };
}

export function postCrmLogs(data) {
  return {
    type: POST_CRM_LOGS,
    data,
  };
}

// SHOPPING
export function markAsPaidShoppingAdminOrder(id, data) {
  return {
    type: PARTIAL_PAID,
    data,
    id,
  };
}
export function sendReceiptShoppingAdminOrder(id) {
  return {
    type: SEND_RECEIPT,
    id,
  };
}

export function returnExtraPaidShoppingAdminOrder(id, data) {
  return {
    type: RETURN_EXTRA_PAID,
    data,
    id,
  };
}
export function getShoppingAdminOrderInvoice(id, data) {
  return {
    type: GET_SHOPPING_ADMIN_ORDER_INVOICE,
    data: { id, ...data },
  };
}
export function setShoppingAdminOrderInvoice(data) {
  return {
    type: SET_SHOPPING_ADMIN_ORDER_INVOICE,
    data,
  };
}
export function getShoppingAdminOrders(data, domain) {
  return {
    type: GET_SHOPPING_ADMIN_ORDERS,
    data,
    domain,
  };
}
export function setShoppingAdminOrders(data, pagination) {
  return {
    type: SET_SHOPPING_ADMIN_ORDERS,
    data,
    pagination,
  };
}

export function getShoppingAdminOrdersSummary(domain) {
  return {
    type: GET_SHOPPING_ADMIN_ORDERS_SUMMARY,
    domain,
  };
}
export function setShoppingAdminOrdersSummary(data) {
  return {
    type: SET_SHOPPING_ADMIN_ORDERS_SUMMARY,
    data,
  };
}
export function getShoppingAdminOrder(id) {
  return {
    type: GET_SHOPPING_ADMIN_ORDER,
    data: { id },
  };
}
export function editShoppingAdminOrder(data, callback) {
  return {
    type: EDIT_SHOPPING_ADMIN_ORDER,
    data,
    callback,
  };
}

export function setShoppingAdminOrder(data) {
  return {
    type: SET_SHOPPING_ADMIN_ORDER,
    data,
  };
}
export function getShoppingAdminOrderCRM(id) {
  return {
    type: GET_SHOPPING_ADMIN_ORDER_CRM,
    data: { id },
  };
}
export function setShoppingAdminOrderCRM(data) {
  return {
    type: SET_SHOPPING_ADMIN_ORDER_CRM,
    data,
  };
}
export function changeOrderStatus(id, data, callback, deliveryTime) {
  return {
    type: CHANGE_ORDER_STATUS,
    id,
    data,
    callback,
    deliveryTime,
  };
}

export function cancelShoppingOrder(data, callback) {
  return {
    type: CANCEL_SHOPPING_ORDER,
    data,
    callback,
    deliveryTime,
  };
}

export function getShoppingAnalyticsData() {
  return {
    type: GET_SHOPPING_ANALYTICS_DATA,
  };
}
export function setShoppingAnalyticsData(data) {
  return {
    type: SET_SHOPPING_ANALYTICS_DATA,
    data,
  };
}

// Plugins
export function buyPlugin(data, businessSlug) {
  return {
    type: BUY_PLUGIN,
    data,
    businessSlug,
  };
}
export function activateTrial(data, businessSlug) {
  return {
    type: ACTIVATE_TRIAL,
    data,
    businessSlug,
  };
}

// Reviews
export function setAdminReviews(data, pagination) {
  return {
    type: SET_ADMIN_REVIEWS,
    data,
    pagination,
  };
}
export function getAdminReview(data) {
  return {
    type: GET_ADMIN_REVIEW,
    data,
  };
}
export function getAdminReviews(data) {
  return {
    type: GET_ADMIN_REVIEWS,
    data,
  };
}
export function setAdminReview(data) {
  return {
    type: SET_ADMIN_REVIEW,
    data,
  };
}

// Settings
export function setSelectedDeliveryDate(data) {
  return {
    type: SET_SELECTED_DELIVERY_DATE,
    data,
  };
}
export function newSectionOrdering(sections) {
  return {
    type: NEW_SECTION_ORDERING,
    data: sections,
  };
}

// Visit Cards
export function sendVisitCard(data) {
  return {
    type: SEND_VISIT_CARD,
    data,
  };
}
export function sendCustomVisitCard(data) {
  return {
    type: SEND_CUSTOM_VISIT_CARD,
    data,
  };
}

export function getAdminProducts(data) {
  return {
    type: GET_ADMIN_PRODUCTS,
    data,
  };
}
export function getAdminAllProducts(businessSlug) {
  return {
    type: GET_ADMIN_ALL_PRODUCTS,
    data: { businessSlug },
  };
}
export function setAdminAllProducts(data) {
  return {
    type: SET_ADMIN_ALL_PRODUCTS,
    data,
  };
}
export function setAdminProducts(data, pagination) {
  return {
    type: SET_ADMIN_PRODUCTS,
    data,
    pagination,
  };
}

export function getBusinessCategories(data) {
  return {
    type: GET_BUSINESS_CATEGORIES,
    data,
  };
}
export function setBusinessCategories(data) {
  return {
    type: SET_BUSINESS_CATEGORIES,
    data,
  };
}

export function getAdminProductsByIds(business_slug, ids, paginated = true) {
  return {
    type: GET_ADMIN_PRODUCTS_BY_IDS,
    data: { business_slug, ids, paginated },
  };
}

export function setAdminProductsByIds(data) {
  return {
    type: SET_ADMIN_PRODUCTS_BY_IDS,
    data,
  };
}

export function getAdminProduct(id) {
  return {
    type: GET_ADMIN_DEAL,
    data: { id },
  };
}

export function setAdminProduct(deal) {
  return {
    type: SET_ADMIN_DEAL,
    data: deal,
  };
}
export function bulkDeleteModifierSets(data, callback) {
  return {
    type: BULK_DELETE_MODIFIER_SETS,
    data,
    callback,
  };
}

export function bulkAddProductsVariationsToModifierSets(data, callback) {
  return {
    type: BULK_ADD_PRODUCTS_VARIATIONS_TO_MODIFIER_SETS,
    data: data.products,
    modifierId: data.id,
    callback,
  };
}

export function bulkAddLabelsToModifierSets(data, callback) {
  return {
    type: BULK_ADD_LABELS_TO_MODIFIER_SETS,
    data: data.labels,
    modifierId: data.id,
    callback,
  };
}

export function bulkDeleteIngredients(data, callback) {
  return {
    type: BULK_DELETE_INGREDIENTS,
    data,
    callback,
  };
}
export function bulkDeleteCategories(data, callback) {
  return {
    type: BULK_DELETE_CATEGORY,
    data,
    callback,
  };
}
export function bulkDeleteProducts(data, callback) {
  return {
    type: BULK_DELETE_PRODUCTS,
    data,
    callback,
  };
}

// Admin Reports actions

export function getBusinessShoppingReportData() {
  return {
    type: GET_BUSINESS_SHOPPING_DATA,
  };
}
export function setBusinessShoppingReportData(data) {
  return {
    type: SET_BUSINESS_SHOPPING_DATA,
    data,
  };
}

export function getReportData(from, to, reportName, url, isMultiBranch, compareToPrevious) {
  return {
    type: GET_REPORTS_DATA,
    data: { from, to, reportName, url, isMultiBranch, compareToPrevious },
  };
}

export function setReportData(data) {
  return {
    type: SET_REPORTS_DATA,
    data,
  };
}

export function getProductsTopSellingReport(from, to, count) {
  return {
    type: GET_PRODUCTS_TOP_SELLING_REPORT,
    data: { from, to, count },
  };
}

export function setProductsTopSellingReport(data) {
  return {
    type: SET_DEALS_TOP_SELLING_REPORT,
    data: { data },
  };
}

export function bulkChangeDealsInventory(data, callback) {
  return {
    type: BULK_CHANGE_DEALS_INVENTORY,
    data,
    callback,
  };
}
export function bulkChangeIngredientsInventory(data, callback) {
  return {
    type: BULK_CHANGE_INGREDIENT_INVENTORY,
    data,
    callback,
  };
}

export function bulkAssignModifierSetsToDeals(id, deals, callback) {
  return {
    type: BULK_ASSIGN_MODIFIERSET_TO_DEALS,
    data: { id, deals },
    callback,
  };
}
export function bulkAssignModifierSetsToCategories(id, categories, callback) {
  return {
    type: BULK_ASSIGN_MODIFIERSET_TO_CATEGORIES,
    data: { id, categories },
    callback,
  };
}
export function bulkUpdateProducts(data, adjustments, callback) {
  return {
    type: BULK_UPDATE_PRODUCTS,
    data: { data, adjustments },
    callback,
  };
}
export function bulkUpdateModifierSets(data, callback) {
  return {
    type: BULK_UPDATE_MODIFIER_SETS,
    data,
    callback,
  };
}
export function bulkUpdateProductsInventory(data, callback) {
  return {
    type: BULK_UPDATE_PRODUCTS_INVENTORY,
    data,
    callback,
  };
}

export function bulkUpdateIngredients(ingredients, adjustments, successCallback, failureCallback) {
  return {
    type: BULK_UPDATE_INGREDIENTS,
    data: { ingredients, adjustments },
    successCallback,
    failureCallback,
  };
}

export function updatePosDevice(id, data, callback) {
  return {
    type: UPDATE_POS_DEVICE,
    data: { id, data },
    callback,
  };
}
export function createPosDevice(data, callback) {
  return {
    type: CREATE_POS_DEVICE,
    data,
    callback,
  };
}
export function deletePosDevice(id, callback) {
  return {
    type: DELETE_POS_DEVICE,
    data: id,
    callback,
  };
}
export function getPosDevice(data) {
  return {
    type: GET_POS_DEVICE,
    data,
  };
}
export function getPosDevices() {
  return {
    type: GET_POS_DEVICES,
  };
}
export function setPosDevices(data) {
  return {
    type: SET_POS_DEVICES,
    data,
  };
}
export function setPosDevice(data) {
  return {
    type: SET_POS_DEVICE,
    data,
  };
}
export function updatePosUser(licence, id, data, callback) {
  return {
    type: UPDATE_POS_USER,
    data: { licence, id, data },
    callback,
  };
}
export function createPosUser(licence, data, callback) {
  return {
    type: CREATE_POS_USER,
    data: { licence, data },
    callback,
  };
}
export function deletePosUser(licence, id, callback) {
  return {
    type: DELETE_POS_USER,
    data: { licence, id },
    callback,
  };
}
export function renewPosLicence(licence, callback) {
  return {
    type: RENEW_POS_LICENCE,
    data: { licence },
    callback,
  };
}

export function getProductReport(id, filters) {
  return {
    type: GET_PRODUCT_REPORT,
    data: { id, filters },
  };
}

export function setProductReport(data) {
  return {
    type: SET_DEAL_REPORT,
    data,
  };
}
export function getIngredientReport(id, filters) {
  return {
    type: GET_INGREDIENT_REPORT,
    data: { id, filters },
  };
}
export function setIngredientReport(data) {
  return {
    type: SET_INGREDIENT_REPORT,
    data,
  };
}

export function getAdminTransactions(data) {
  return {
    type: GET_ADMIN_TRANSACTIONS,
    data,
  };
}

export function setAdminTransactions(data, pagination) {
  return {
    type: SET_ADMIN_TRANSACTIONS,
    data,
    pagination,
  };
}

export function setReceivedPurchases(data, pagination) {
  return {
    type: SET_RECEIVED_PURCHASES,
    data,
    pagination,
  };
}
export function getReceivedPurchases(data) {
  return {
    type: GET_RECEIVED_PURCHASES,
    data,
  };
}

export function setSubmittedPurchases(data, pagination) {
  return {
    type: SET_SUBMITTED_PURCHASES,
    data,
    pagination,
  };
}
export function getSubmittedPurchases(data) {
  return {
    type: GET_SUBMITTED_PURCHASES,
    data,
  };
}
export function setOrderTransactions(data) {
  return {
    type: SET_ORDER_TRANSACTIONS,
    data,
  };
}

export function submitPurchase(data) {
  return {
    type: SUBMIT_PURCHASE,
    data,
  };
}
export function applySubmittedPurchase(id, data) {
  return {
    type: APPLY_SUBMITTED_PURCHASE,
    data: { id, data },
  };
}
export function applyReceivedPurchase(id, data) {
  return {
    type: APPLY_RECEIVED_PURCHASE,
    data: { id, data },
  };
}
export function acceptSubmittedPurchase(data) {
  return {
    type: ACCEPT_SUBMITTED_PURCHASE,
    data,
  };
}
export function rejectReceivedPurchase(data) {
  return {
    type: REJECT_RECEIVED_PURCHASE,
    data,
  };
}

export function receiveSubmittedPurchase(id, data) {
  return {
    type: RECEIVE_SUBMITTED_PURCHASE,
    data: { data, id },
  };
}
export function getPurchase(data) {
  return {
    type: GET_PURCHASE,
    data,
  };
}
export function setPurchase(data) {
  return {
    type: SET_PURCHASE,
    data,
  };
}
export function deletePurchase(data) {
  return {
    type: DELETE_PURCHASE,
    data,
  };
}
export function updateSubmittedPurchase(id, data) {
  return {
    type: UPDATE_SUBMITTED_PURCHASE,
    data: { id, data },
  };
}

export function getCMSLessons() {
  return {
    type: GET_CMS_LESSONS,
  };
}

export function setCMSLessons(data) {
  return {
    type: SET_CMS_LESSONS,
    data,
  };
}
export function getOrderTransactions(data) {
  return {
    type: GET_ORDER_TRANSACTIONS,
    data,
  };
}
export function getJourneyState() {
  return {
    type: GET_JOURNEY_STATE,
  };
}
export function setJourneyState(data) {
  return {
    type: SET_JOURNEY_STATE,
    data,
  };
}

export function updateJourneyState(data, callback) {
  return {
    type: UPDATE_JOURNEY_STATE,
    data,
    callback,
  };
}
export function getLegalDocuments(data) {
  return {
    type: GET_LEGAL_DOCUMENTS,
    data,
  };
}
export function setLegalDocuments(data) {
  return {
    type: SET_LEGAL_DOCUMENTS,
    data,
  };
}
export function createLegalDocument(data, filters) {
  return {
    type: CREATE_LEGAL_DOCUMENT,
    data: { data, filters },
  };
}
export function updateLegalDocument(id, data, filters) {
  return {
    type: UPDATE_LEGAL_DOCUMENT,
    data: { id, data, filters },
  };
}

export function getCashDrawerTransactions(pos_id, drawer_id) {
  return {
    type: GET_CASH_DRAWER_TRANSACTIONS,
    data: { pos_id, drawer_id },
  };
}
export function setCashDrawerTransactions(data) {
  return {
    type: SET_CASH_DRAWER_TRANSACTIONS,
    data,
  };
}
export function openCashDrawer(pos_id, data, callback) {
  return {
    type: OPEN_CASH_DRAWER,
    data: { pos_id, data },
    callback,
  };
}
export function finishCashDrawer(pos_id, drawer_id, data, callback) {
  return {
    type: FINISH_CASH_DRAWER,
    data: { pos_id, drawer_id, data },
    callback,
  };
}
export function closeCashDrawer(pos_id, data, callback) {
  return {
    type: CLOSE_CASH_DRAWER,
    data: { pos_id, data },
    callback,
  };
}
export function createCashTransaction(pos_id, data, callback) {
  return {
    type: CREATE_CASH_TRANSACTION,
    data: { pos_id, data },
    callback,
  };
}
export function getCashDrawers(data) {
  return {
    type: GET_CASH_DRAWERS,
    data,
  };
}
export function setCashDrawers(data, pagination) {
  return {
    type: SET_CASH_DRAWERS,
    data,
    pagination,
  };
}
export function setAdminProductImages(data) {
  return {
    type: SET_ADMIN_DEAL_IMAGES,
    data,
  };
}
export function searchCRMMembership(data) {
  return {
    type: SEARCH_CRM_MEMBERSHIP,
    data,
  };
}

export function getCRMMembershipByQuery(data) {
  return {
    type: GET_CRM_MEMBERSHIP_BY_QUERY,
    data,
  };
}

export function setCRMMembershipByQuery(data, pagination) {
  return {
    type: SET_CRM_MEMBERSHIP_BY_QUERY,
    data,
    pagination,
  };
}

export function setSearchedCRMMembership(data) {
  return {
    type: SET_SEARCHED_CRM_MEMBERSHIP,
    data,
  };
}

export function getPurchaseReportsByIngredients(data) {
  return {
    type: GET_PURCHASE_REPORTS_BY_INGREDIENTS,
    data,
  };
}
export function setPurchaseReportsByProduct(data) {
  return {
    type: SET_PURCHASE_REPORTS_BY_INGREDIENTS,
    data,
  };
}
export function getPurchaseReportsByIngredientsPerBranch(data) {
  return {
    type: GET_PURCHASE_REPORTS_BY_INGREDIENTS_PER_BRANCH,
    data,
  };
}
export function setPurchaseReportsByProductPerBranch(data) {
  return {
    type: SET_PURCHASE_REPORTS_BY_INGREDIENTS_PER_BRANCH,
    data,
  };
}

export function getPurchaseReportsFromVendors(data) {
  return {
    type: GET_PURCHASE_REPORTS_FROM_VENDORS,
    data,
  };
}
export function setPurchaseReportsFromVendors(data) {
  return {
    type: SET_PURCHASE_REPORTS_FROM_VENDORS,
    data,
  };
}
export function getPurchaseReportsFromVendorsPerBranch(data) {
  return {
    type: GET_PURCHASE_REPORTS_FROM_VENDORS_PER_BRANCH,
    data,
  };
}
export function setPurchaseReportsFromVendorsPerBranch(data) {
  return {
    type: SET_PURCHASE_REPORTS_FROM_VENDORS_PER_BRANCH,
    data,
  };
}

export function getIngredientsRecountingReports(data) {
  return {
    type: GET_INGREDIENTS_RECOUNTING_REPORTS,
    data,
  };
}
export function setIngredientsRecountingReports(data) {
  return {
    type: SET_INGREDIENTS_RECOUNTING_REPORTS,
    data,
  };
}

export function getIngredientsRecountingReport(data) {
  return {
    type: GET_INGREDIENTS_RECOUNTING_REPORT,
    data,
  };
}
export function setIngredientsRecountingReport(data) {
  return {
    type: SET_INGREDIENTS_RECOUNTING_REPORT,
    data,
  };
}

export function createIngredientsRecountingReport(data) {
  return {
    type: CREATE_INGREDIENTS_RECOUNTING_REPORT,
    data,
  };
}

export function updateSystemByNewInventoryCounts(data) {
  return {
    type: UPDATE_SYSTEMBY_NEW_INVENTORY_COUNTS,
    data,
  };
}

export function getProductsReportsSoldByCount(data) {
  return {
    type: GET_PRODUCTS_REPORTS_SOLD_BY_COUNT,
    data,
  };
}
export function setProductsReportsSoldByCount(data) {
  return {
    type: SET_DEALS_REPORTS_SOLD_BY_COUNT,
    data,
  };
}

export function getOrderTransactionsFinanceSummaryReports(data) {
  return {
    type: GET_ORDER_TRANSACTIONS_FINANCE_SUMMARY_REPORTS,
    data,
  };
}
export function setOrderTransactionsFinanceSummaryReports(data) {
  return {
    type: SET_ORDER_TRANSACTIONS_FINANCE_SUMMARY_REPORTS,
    data,
  };
}
export function getAdminVendor(data) {
  return {
    type: GET_ADMIN_VENDOR,
    data,
  };
}
export function setAdminVendor(data) {
  return {
    type: SET_ADMIN_VENDOR,
    data,
  };
}
export function updateAdminVendor(id, data, callback) {
  return {
    type: UPDATE_ADMIN_VENDOR,
    data: { id, data },
    callback,
  };
}
export function setAdminVendorItems(data) {
  return {
    type: SET_ADMIN_VENDOR_ITEMS,
    data,
  };
}
export function updateAdminVendorItem(id, data, callback) {
  return {
    type: UPDATE_ADMIN_VENDOR_ITEM,
    data: { id, data },
    callback,
  };
}
export function deleteAdminVendorItem(id, callback) {
  return {
    type: DELETE_ADMIN_VENDOR_ITEM,
    data: { id },
    callback,
  };
}

export function createAdminVendor(data, callback) {
  return {
    type: CREATE_ADMIN_VENDOR,
    data,
    callback,
  };
}

export function getVendorItemsByVendor(data, page, pageSize) {
  return {
    type: GET_VENDOR_ITEMS_BY_VENDOR,
    data,
    page,
    pageSize,
  };
}

export function getShoppingOrdersFinanceSummaryReports(data) {
  return {
    type: GET_SHOPPING_ORDERS_FINANCE_SUMMARY_REPORTS,
    data,
  };
}
export function setShoppingOrdersFinanceSummaryReports(data) {
  return {
    type: SET_SHOPPING_ORDERS_FINANCE_SUMMARY_REPORTS,
    data,
  };
}

export function getShoppingOrdersPaymentSummaryReports(data) {
  return {
    type: GET_SHOPPING_ORDERS_PAYMENT_SUMMARY_REPORTS,
    data,
  };
}
export function setShoppingOrdersPaymentSummaryReports(data) {
  return {
    type: SET_SHOPPING_ORDERS_PAYMENT_SUMMARY_REPORTS,
    data,
  };
}

export function getAdminVendors(data) {
  return {
    type: GET_ADMIN_VENDORS,
    data,
  };
}

export function setAdminVendors(data) {
  return {
    type: SET_ADMIN_VENDORS,
    data,
  };
}

export function getCustomersSatisfactionReviewsReports(data) {
  return {
    type: GET_CUSTOMERS_SATISFACTION_REVIEWS_REPORTS,
    data,
  };
}

export function setCustomersSatisfactionReviewsReports(data) {
  return {
    type: SET_CUSTOMERS_SATISFACTION_REVIEWS_REPORTS,
    data,
  };
}
export function getCustomersTaxingReports(data) {
  return {
    type: GET_CUSTOMERS_TAXING_REPORTS,
    data,
  };
}
export function setCustomersTaxingReports(data) {
  return {
    type: SET_CUSTOMERS_TAXING_REPORTS,
    data,
  };
}

export function getCustomersDisSatisfactionReviewsReports(data) {
  return {
    type: GET_CUSTOMERS_DISSATISFACTION_REVIEWS_REPORTS,
    data,
  };
}

export function setCustomersDisSatisfactionReviewsReports(data) {
  return {
    type: SET_CUSTOMERS_DISSATISFACTION_REVIEWS_REPORTS,
    data,
  };
}
export function createDealVendorItem(id, data, callback) {
  return {
    type: CREATE_DEAL_VENDOR_ITEM,
    data: { id, data },
    callback,
  };
}

export function createIngredientVendorItem(id, data, callback) {
  return {
    type: CREATE_INGREDIENT_VENDOR_ITEM,
    data: { id, data },
    callback,
  };
}

export function getAdminVendorItemsByDeal(data) {
  return {
    type: GET_ADMIN_VENDOR_ITEMS_BY_DEAL,
    data,
  };
}
export function getAdminVendorItemsByIngredient(data) {
  return {
    type: GET_ADMIN_VENDOR_ITEMS_BY_INGREDIENT,
    data,
  };
}
export function setCollectivePurchases(data, pagination) {
  return {
    type: SET_COLLECTIVE_PURCHASES,
    data,
    pagination,
  };
}

export function setTotalRequestedPurchaseItems(data) {
  return {
    type: SET_TOTAL_REQUESTED_PURCHASE_ITEMS,
    data,
  };
}
export function getTotalRequestedPurchaseItems(data) {
  return {
    type: GET_TOTAL_REQUESTED_PURCHASE_ITEMS,
    data,
  };
}
export function getVendorItemsByVendorByBusiness(data) {
  return {
    type: GET_VENDOR_ITEMS_BY_BUSINESS,
    data,
  };
}
export function getWarehouseReportingCategories(data) {
  return {
    type: GET_WAREHOUSE_REPORTING_CATEGORIES,
    data,
  };
}
export function addShopingNote(data) {
  return {
    type: ADD_SHOPPING_NOTE,
    data,
  };
}

export function setWarehouseReportingCategories(data) {
  return {
    type: SET_WAREHOUSE_REPORTING_CATEGORIES,
    data,
  };
}

export function getOrderTransactionsFinancePaymentTypes(data) {
  return {
    type: GET_ORDER_TRANSACTIONS_FINANCE_PAYMENT_TYPES,
    data: data,
  };
}

export function setOrderTransactionsFinancePaymentTypes(data) {
  return {
    type: SET_ORDER_TRANSACTIONS_FINANCE_PAYMENT_TYPES,
    data: data,
  };
}

export function getOrderTransactionsPerPaymentTypePerSalesChannel(data) {
  return {
    type: GET_ORDER_TRANSACTION_PER_PAYMENT_TYPE_PER_SALES_CHANNEL,
    data: data,
  };
}

export function setOrderTransactionsPerPaymentTypePerSalesChannel(data) {
  return {
    type: SET_ORDER_TRANSACTION_PER_PAYMENT_TYPE_PER_SALES_CHANNEL,
    data: data,
  };
}

export function getDiscountCodeReports(data) {
  return {
    type: GET_DISCOUNT_CODE_REPORTS,
    data: data,
  };
}

export function setDiscountCodeReports(data) {
  return {
    type: SET_DISCOUNT_CODE_REPORTS,
    data: data,
  };
}
export function getInventoryHistoryReports(data) {
  return {
    type: GET_INVENTORY_HEISTORY_REPORTS,
    data,
  };
}
export function setInventoryHistoryReports(data) {
  return {
    type: SET_INVENTORY_HEISTORY_REPORTS,
    data,
  };
}
export function getShopingOrderAggregate(data) {
  return {
    type: GET_SHOPPING_ORDER_AGGREGATE,
    data,
  };
}
export function setShopingOrderAggregate(data) {
  return {
    type: SET_SHOPPING_ORDER_AGGREGATE,
    data: data,
  };
}

export function getFirstAndLastReport(data) {
  return {
    type: GET_FIRST_AND_LAST_REPORTS,
    data,
  };
}
export function setFirstAndLastReport(data) {
  return {
    type: SET_FIRST_AND_LAST_REPORTS,
    data: data,
  };
}
export function importCsv(data, onSuccess, onError) {
  return {
    type: IMPORT_CSV,
    data: data,
    onSuccess,
    onError,
  };
}

//dobare

export function importMemberships(data, callback) {
  return {
    type: IMPORT_MEMBERSHIPS,
    data,
    callback,
  };
}

export function updateCrmLevel(data) {
  return {
    type: UPDATE_CRM_LEVEL,
    data,
  };
}

export function deleteCrmLevel(data) {
  return {
    type: DELETE_CRM_LEVEL_BY_ID,
    data,
  };
}

export function getCrmLevels() {
  return {
    type: GET_CRM_LEVELS_LIST,
  };
}

export function setCrmLevels(data) {
  return {
    type: SET_CRM_LEVELS_LIST,
    data,
  };
}

export function getCrmLevelItem(data) {
  return {
    type: GET_CRM_LEVEL_BY_ID,
    data,
  };
}

export function setCrmLevelItem(data) {
  return {
    type: SET_CRM_LEVEL_BY_ID,
    data,
  };
}

export function createCrmLevel(data) {
  return {
    type: CREATE_CRM_LEVEL,
    data,
  };
}

//cusomer segments

export function setCrmSegments(data) {
  return {
    type: SET_CRM_SEGMENTS,
    data,
  };
}

export function getCrmSegment(id) {
  return {
    type: GET_CRM_SEGMENT_BY_ID,
    id,
  };
}

export function setCrmSegment(data) {
  return {
    type: SET_CRM_SEGMENT_BY_ID,
    data,
  };
}

export function updateCrmSegment(id, data, callback) {
  return {
    type: UPDATE_CRM_SEGMENT,
    id,
    data,
    callback,
  };
}

export function deleteCrmSegment(id) {
  return {
    type: DELETE_CRM_SEGMENT,
    id,
  };
}

export function createCrmSegment(data, callback) {
  return {
    type: CREATE_CRM_SEGMENT,
    data,
    callback,
  };
}

export function getCrmSegments(query) {
  return {
    type: GET_CRM_SEGMENT_LIST,
    query,
  };
}

export function setCrmSegmentList(data, pagination) {
  return {
    type: SET_CRM_SEGMENT_LIST,
    data,
    pagination,
  };
}

export function getAutomatedProcess(id) {
  return {
    type: GET_AUTOMATED_PROCESS_BY_ID,
    id,
  };
}

export function setAutomatedProcess(data) {
  return {
    type: SET_AUTOMATED_PROCESS_BY_ID,
    data,
  };
}

export function getAutomatedProcesses(query) {
  return {
    type: GET_AUTOMATED_PROCESSES,
    query,
  };
}

export function setAutomatedProcesses(data, pagination) {
  return {
    type: SET_AUTOMATED_PROCESSES,
    data,
    pagination,
  };
}

export function createAutomatedProcess(data) {
  return {
    type: CREATE_AUTOMATED_PROCESS,
    data,
  };
}

export function updateAutomatedProcess(id, data, callback) {
  return {
    type: UPDATE_AUTOMATED_PROCESS,
    id,
    data,
    callback,
  };
}

export function deleteAutomatedProcess(id, event_type) {
  return {
    type: DELETE_AUTOMATED_PROCESS,
    id,
    event_type,
  };
}

//labels
export function updateCrmLables(data) {
  return {
    type: UPDATE_CRM_LABLES,
    data: data,
  };
}
export function updateCrmLabel(data) {
  return {
    type: UPDATE_CRM_LABEL,
    data,
  };
}

export function changeCRMLabels(id, data) {
  return {
    type: CHANGE_CRM_LABLES,
    id,
    data,
  };
}
export function getLabels() {
  return {
    type: GET_LABELS,
  };
}
export function setLabels(data) {
  return {
    type: SET_LABELS,
    data,
  };
}

export function addLabelToMembershipsGroup(labelId, data, callBack) {
  return {
    type: ADD_LABEL_TO_MEMBERSHIP_GROUP,
    labelId,
    data,
    callBack,
  };
}

export function createSurveyTemplate(data) {
  return {
    type: CREATE_SURVEY_TEMPLATE,
    data: data,
  };
}

export function updateCrmSurveyDelay(data) {
  return {
    type: UPDATE_CRM_SURVEY_DELAY,
    data,
  };
}

export function getAggregateRating(data) {
  return {
    type: GET_AGGREGATE_RATING,
    data,
  };
}

export function setAggregateRating(data) {
  return {
    type: SET_AGGREGATE_RATING,
    data,
  };
}

export function updateSurveyTemplate(data) {
  return {
    type: UPDATE_SURVEY_TEMPLATE,
    data,
  };
}
export function addGiftCreditTransaction(id, data) {
  return {
    type: ADD_GIFT_CREDIT_TRANSACTION,
    id,
    data,
  };
}

export function getIngredients(data) {
  return {
    type: GET_INGREDIENTS,
    data,
  };
}

export function setIngredients(data, pagination) {
  return {
    type: SET_INGREDIENTS,
    data,
    pagination,
  };
}

export function getIngredient(id) {
  return {
    type: GET_INGREDIENT,
    data: { id },
  };
}

export function setIngredient(data) {
  return {
    type: SET_INGREDIENT,
    data,
  };
}

export function getModifierSets(data, slug) {
  return {
    type: GET_MODIFIER_SETS,
    data,
    slug,
  };
}

export function setModifierSets(data, pagination) {
  return {
    type: SET_MODIFIER_SETS,
    data,
    pagination,
  };
}

export function getModifierSet(id) {
  return {
    type: GET_MODIFIER_SET,
    data: { id },
  };
}

export function setModifierSet(data) {
  return {
    type: SET_MODIFIER_SET,
    data,
  };
}

export function setApprovedPriceSuperIngredient(id, data) {
  return {
    type: SET_APPROVED_PRICE_SUPER_INGREDIENT,
    id,
    data,
  };
}

export function getCallRequests() {
  return {
    type: GET_CALL_REQUESTS,
  };
}

export function setCallRequests(data) {
  return {
    type: SET_CALL_REQUESTS,
    data,
  };
}

export function getReportsCallRequests() {
  return {
    type: GET_REPORT_CALL_REQUESTS,
  };
}

export function setReportsCallRequests(data) {
  return {
    type: SET_REPORT_CALL_REQUESTS,
    data,
  };
}
export function getReviewsResponse(data) {
  return {
    type: GET_REVIEWS_RESPONSE,
    data,
  };
}
export function setReviewsResponse(data, pagination) {
  return {
    type: SET_REVIEWS_RESPONSE,
    data,
    pagination,
  };
}
export function invoiceFactor(data) {
  return {
    type: INVOICE_FACTOR,
    data,
  };
}
export function setInvoiceFactorAction(data) {
  return {
    type: SET_INVOICE_FACTOR,
    data,
  };
}
export function submitFactor(data) {
  return {
    type: SUBMIT_FACTOR,
    data,
  };
}
export function getDiscountCodeData(data) {
  return {
    type: GET_DISCOUNT_CODE_DATA,
    data,
  };
}
export function setDiscountCodeData(data) {
  return {
    type: SET_DISCOUNT_CODE_DATA,
    data,
  };
}

export function getDiscountCodeById(id) {
  return {
    type: GET_DISCOUNT_CODE_BY_ID,
    id,
  };
}
export function setDiscountCodeById(data) {
  return {
    type: SET_DISCOUNT_CODE_BY_ID,
    data,
  };
}
export function updateDiscountCode(data, id) {
  return {
    type: UPDATE_DISCOUNT_CODE_BY_ID,
    data,
    id,
  };
}
export function createNewDiscountCode(data) {
  return {
    type: CREATE__DISCOUNT_CODE,
    data: data,
  };
}
export function getCampaignList(data) {
  return {
    type: GET_CAMPAIGN_LIST,
    data,
  };
}

export function automaticConsultationRequest(data, callback) {
  return {
    type: AUTOMATIC_CONSULTATION_REQUEST,
    data,
    callback,
  };
}

export function getGrossSalesReport(data) {
  return {
    type: GET_GROSS_SALES_REPORT,
    data,
  };
}

export function updateCampaignById(data, id, callback) {
  return {
    type: UPDATE_CAMPAIGN_BY_ID,
    data,
    id,
    callback,
  };
}

export function createCampaign(data, callback) {
  return {
    type: CREATE_CAMPAIGN,
    data,
    callback,
  };
}
export function setCampaignData(data, pagination) {
  return {
    type: SET_CAMPAIGN_LIST,
    data,
    pagination,
  };
}
export function getCampaignById(data, callback) {
  return {
    type: GET_CAMPAIGN_BY_ID,
    data,
    callback,
  };
}
export function setCampaignItem(data) {
  return {
    type: SET_CAMPAIGN_BY_ID,
    data,
  };
}
export function setGrossSalesReport(data) {
  return {
    type: SET_GROSS_SALES_REPORT,
    data,
  };
}

export function getProductsDeactivationReport(data) {
  return {
    type: GET_PRODUCTS_DEACTIVATION_REPORT,
    data,
  };
}

export function setProductsDeactivationReport(data) {
  return {
    type: SET_PRODUCTS_DEACTIVATION_REPORT,
    data,
  };
}

export function getReviewsTemplate(data) {
  return {
    type: GET_REVIEWS_TEMPLATE,
    data,
  };
}

export function setReviewsTemplate(data) {
  return {
    type: SET_REVIEWS_TEMPLATE,
    data,
  };
}

export function getAutomatedProcessType(data) {
  return {
    type: GET_AUTOMATED_PROCESS_TYPE,
    data,
  };
}
export function setAutomatedProcessType(data) {
  return {
    type: SET_AUTOMATED_PROCESS_TYPE,
    data,
  };
}

export function getAutomatedProcessCreditReport(data) {
  return {
    type: GET_AUTOMATED_PROCESS_CREDIT_REPORTS,
    data,
  };
}

export function setAutomatedProcessCreditReport(data) {
  return {
    type: SET_AUTOMATED_PROCESS_CREDIT_REPORTS,
    data,
  };
}

export function getCampaignCreditReport(data) {
  return {
    type: GET_CAMPAIGN_CREDIT_REPORTS,
    data,
  };
}

export function setCampaignCreditReport(data) {
  return {
    type: SET_CAMPAIGN_CREDIT_REPORTS,
    data,
  };
}

export function createGateAwayZibal(data, callback) {
  return {
    type: CREATE_GATE_AWAY_ZIBAL,
    data,
    callback,
  };
}

export function initializeGateAwayZibal(callback) {
  return {
    type: INITIALIZE_GATE_AWAY_ZIBAL,
    callback,
  };
}

export function checkSiteDomainAvailability(data) {
  return {
    type: CHECK_SITE_DOMAIN_AVAILABILITY,
    data,
  };
}

export function setAvaliabilityDomain(data) {
  return {
    type: SET_AVAILABILITY_DOMAIN,
    data,
  };
}

// Reval

export function getCostsList(query) {
  return {
    type: GET_COSTS_LIST,
    query,
  };
}

export function setCostsList(data) {
  return {
    type: SET_COSTS_LIST,
    data,
  };
}

export function createCost(data, callback) {
  return {
    type: CREATE_COST,
    data,
    callback,
  };
}

export function getCostsCategoriesList(query) {
  return {
    type: GET_COST_CATEGORIES_LIST,
    query,
  };
}

export function setCostsCategoriesList(data) {
  return {
    type: SET_COST_CATEGORIES_LIST,
    data,
  };
}

export function createCostCategory(data, callback) {
  return {
    type: CREATE_COST_CATEGORY,
    data,
    callback,
  };
}

export function getPaymentMethods(data) {
  return {
    type: GET_PAYMENT_METHODS,
    data,
  };
}

export function setPaymentMethods(data) {
  return {
    type: SET_PAYMENT_METHODS,
    data,
  };
}

export function getCampaignBySegment(id, callback) {
  return {
    type: GET_CAMPAIGN_BY_SEGMENT,
    id,
    callback,
  };
}

export function getCampaignsBySegment(query, callback) {
  return {
    type: GET_CAMPAIGNS_BY_SEGMENT,
    query,
    callback,
  };
}

export function setCampaignBySegment(date) {
  return {
    type: SET_CAMPAIGN_BY_SEGMENT,
    date,
  };
}

export function setCampaignsBySegment(date) {
  return {
    type: SET_CAMPAIGNS_BY_SEGMENT,
    date,
  };
}

export function createCampaignBySegment(data, callback) {
  return {
    type: CREATE_CAMPAIGN_BY_SEGMENT,
    data,
    callback,
  };
}

export function updateCampaignBySegment(id, data, callback) {
  return {
    type: UPDATE_CAMPAIGN_BY_SEGMENT,
    id,
    data,
    callback,
  };
}
