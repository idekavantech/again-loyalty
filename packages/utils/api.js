import { getBaseUrl } from "./helpers/getBaseUrl";

export const CDN_BASE_URL =
  "https://hs3-cdn-saas.behtarino.com/static/images/behtarino-web/";
export const BASE_URL = getBaseUrl();
export const REVAL_BASE_URL = "https://account-costs.reval.me/";
export const BASE_URL_BEHTARINO = "https://bck.behtarino.com/api/v1/";
export const BASE_URL_V2 = getBaseUrl(2);
export const BASE_URL_DEVELOP = `https://vitrin-develop.behtarino.com/api/v2/`;
export const CMS_BASE_URL = "https://cms.vitrin.me/";
export const EMAIL_API = `${BASE_URL}send_custom_email/`;
export const LOCAL_EMAIL_API = `/api/email/`;
export const FILE_SERVER_URL_API = `${BASE_URL}get_minio_url/`;
export const DELIVERY_PRICE_API = (slug, lat, lng) =>
  `${BASE_URL}businesses/delivery/rules/by_business?business_slug=${slug}&lat=${lat}&lng=${lng}`;

export const RECOMMENDED_DEALS_API = (id) =>
  `${BASE_URL}crm_membership/${id}/recommended_deals/`;

export const GET_USER_BUSINESS_API = `${BASE_URL}businesses/by_owner/`;

//import deals

// Analytics API

export const BUSINESS_LAST_DAYS_SHOPPING_DATA_API = () =>
  `${BASE_URL_V2}shopping-orders/reports/last-days-summary/`;
export const VITRIN_CALL_BUTTON_CLICKS_API = (slug) =>
  `${BASE_URL}businesses/${slug}/vitrin_call_button_clicks/`;
export const VITRIN_PAGE_VIEWS_API = (slug) =>
  `${BASE_URL}businesses/${slug}/vitrin_page_views/`;

export const DEALS_BY_BUSINESS_REPORT_API = (
  from = "",
  to = "",
  businessSlug
) =>
  `${BASE_URL}deals/by_business_report/?from_date=${from}&to_date=${to}&business_slug=${businessSlug}`;
// `http://192.168.100.63:8001/api/v1/deals/by_business_report/?from_date=${from}&to_date=${to}&business_slug=${businessSlug}`;

export const DEALS_BY_BUSINESS_BRANCHES_REPORT_API = (
  from = "",
  to = "",
  businessSlug
) =>
  `${BASE_URL}deals/by_business_branches_report/?from_date=${from}&to_date=${to}&business_slug=${businessSlug}`;

export const DEALS_BUSINESS_TOP_SELLING_REPORT_API = (
  from = "",
  to = "",
  businessSlug,
  count = 5
) => {
  return `${BASE_URL_V2}resources/top-selling/?from_date=${from}&to_date=${to}&business_slug=${businessSlug}&count=${count}`;
};
export const BUSINESS_TOP_SELLING_DEALS_API = (
  from = "",
  to = "",
  businessSlug,
  count = 10
) => {
  return `${BASE_URL_V2}resources/top-selling/?&business_slug=${businessSlug}&count=${count}&from=${from}&to=${to}`;
};
export const TRANSACTIONS_BY_BUSINESS_REPORT_API = (
  from = "",
  to = "",
  businessSlug
) =>
  `${BASE_URL}transactions/by_business_report/?from_date=${from}&to_date=${to}&business_slug=${businessSlug}`;
// `http://192.168.100.63:8001/api/v1/transactions/by_business_report/?from_date=${from}&to_date=${to}&business_slug=${businessSlug}`;

export const TRANSACTIONS_BY_BUSINESS_BRANCHES_REPORT_API = (
  from = "",
  to = "",
  businessSlug
) =>
  `${BASE_URL}transactions/by_business_branches_report/?from_date=${from}&to_date=${to}&business_slug=${businessSlug}`;

export const REVIEWS_BY_BUSINESS_REPORT_API = (
  from = "",
  to = "",
  businessSlug
) =>
  `${BASE_URL}reviews/by_business_report/?from_date=${from}&to_date=${to}&business_slug=${businessSlug}`;

export const REVIEWS_BY_BUSINESS_BRANCHES_REPORT_API = (
  from = "",
  to = "",
  businessSlug
) =>
  `${BASE_URL}reviews/by_business_branches_report/?from_date=${from}&to_date=${to}&business_slug=${businessSlug}`;

export const SHOPPING_ORDERS_BY_BUSINESS_BRANCHES_REPORT_API = (
  from = "",
  to = "",
  businessSlug
) =>
  `${BASE_URL}shopping_orders/by_business_branches_report/?from_date=${from}&to_date=${to}&business_slug=${businessSlug}`;

export const SHOPPING_ORDERS_BY_BUSINESS_REPORT_API = (
  from = "",
  to = "",
  businessSlug
) =>
  `${BASE_URL}shopping_orders/by_business_report/?from_date=${from}&to_date=${to}&business_slug=${businessSlug}`;

export const SHOPPING_ORDERS_FINANCE_SUMMARY_REPORTS_API = `${BASE_URL_V2}shopping-orders/reports/finance-summary/`;
export const SHOPPING_ORDERS_PAYMENT_SUMMARY_REPORTS_API = `${BASE_URL_V2}shopping-orders/reports/payments-summary/`;

export const SUBMITTED_PURCHASE_ORDERS_REPORTS_API = `${BASE_URL_V2}purchase-orders/submitted/by-branches-by-business/`;
export const SUBMITTED_PURCHASE_ORDERS_REPORTS_PER_BRANCH_API = `${BASE_URL_V2}purchase-orders/submitted/by-business/`;
export const SHOPPING_ORDER_AGGREGATE_API = `${BASE_URL}shopping_orders/report/aggregate_price/`;

// export const DEALS_BY_BUSINESS_BRANCHES_REPORT_API = (from, to, businessSlug) =>
//   `${BASE_URL}deals/by_business_branches_report/?from_date=${from}&to_date=${to}&business_slug=${businessSlug}`;

export const BUSINESS_RANGE_REPORT_API = (from, to, businessSlug) =>
  `${BASE_URL}business_range_report/?from_date=${from}&to_date=${to}&business_slug=${businessSlug}`;

export const BRANCHES_DAILY_REPORT_API = (date, businessSlug) =>
  `${BASE_URL}branches_daily_report/?date=${date}&business_slug=${businessSlug}`;

export const BUSINESS_DAILY_REPORT_API = (from, to, businessSlug) =>
  `${BASE_URL}branches_range_report/?from_date=${from}&to_date=${to}&business_slug=${businessSlug}`;

export const BUSINESS_TOP_SELLING_API = (from, to, businessSlug, topCount) =>
  `${BASE_URL}top_selling/?from_date=${from}&to_date=${to}business_slug=${businessSlug}top_count=${topCount}`;

export const ORDER_TRANSACTIONS_FINANCE_PAYMENT_TYPES_API = `${BASE_URL_V2}order-transactions/reports/per-payment-type-per-business/`;
export const ORDER_TRANSACTION_PER_PAYMENT_TYPE_PER_SALES_CHANNEL = `${BASE_URL}order_transactions/reports/per_payment_type_per_sales_channel/`;
export const DISCOUNT_CODE_REPORTS_API = `${BASE_URL_V2}discount-code/reports/sales-per-discount/`;
export const FIRST_AND_LAST_REPORT_API = `${BASE_URL_V2}businesses/performance/employee-oriented/`;

// Business API
export const BUSINESSES_TAGS = `${BASE_URL}businesses/tags/`;
export const BUSINESSES_BY_OWNER_API = `${BASE_URL}businesses/by_owner/`;
export const BUSINESS_LIGHT_BY_SITE_DOMAIN_API = (subDomain) =>
  `${BASE_URL}businesses/${subDomain}/light_by_site_domain/`;
export const BUSINESS_REDIRECTS_MAP_API = (subDomain) =>
  `${BASE_URL}businesses/${subDomain}/redirects_map/`;
export const BUSINESS_BY_SLUG_API = (slug) => `${BASE_URL}businesses/${slug}/`;
export const BUSINESS_WORKING_HOURS_API = (id) =>
  `${BASE_URL}businesses/working_hours/${id}/`;
export const BUSINESS_CREATION_ROUTE_PASSED_API = (slug) =>
  `${BASE_URL}businesses/${slug}/creation_route_passed/`;
export const BUSINESS_CUSTOMERS_COUNT_API = (slug) =>
  `${BASE_URL}businesses/${slug}/customers_count/`;
export const BUSINESS_DEAL_CATEGORIES_API = (slug) =>
  `${BASE_URL}businesses/${slug}/menu_details/`;
export const BUSINESS_DISCOUNT_CODES_API = (slug) =>
  `${BASE_URL}businesses/${slug}/discount_codes/`;

// Categories API
export const LABELS_BULK_DELETE_API = `${BASE_URL_V2}resource-labels/bulk-delete/`;
export const LABELS_ITEM_API = (id) => `${BASE_URL_V2}resource-labels/${id}/`;
export const SITEMAP_PRODUCTS_API = (businessSlug) =>
  `${BASE_URL_V2}businesses/${businessSlug}/sitemap-products/`;
export const ALL_DEALS_BY_BUSINESS_BY_IDS_API = (
  businessSlug,
  ids,
  paginated = true
) =>
  `${BASE_URL_V2}resources/by-business/?business_slug=${businessSlug}&paginated=${paginated}${ids
    .map((id) => `&id=${id}`)
    .join("")}`;
export const BUSINESS_CATEGORIES_API = (businessSlug) =>
  `${BASE_URL_V2}resource-labels/by-business/?business_slug=${businessSlug}`;
export const VARIATION_REPORT_API = (id) =>
  `${BASE_URL_V2}variations/${id}/history/`;
export const CATEGORIES_ITEMS_API = (id) =>
  `${BASE_URL_V2}resource-labels/${id}/`; // 148

// CRM API
export const CRM_LABEL_API = `${BASE_URL}crm_label/`;
export const CRM_LABEL_API_DELETE = `${BASE_URL}crm_label/bulk_delete/`;
export const CRM_LABEL_ITEM_API = (id) => `${BASE_URL}crm_label/${id}/`;
export const CRM_LABEL_ITEM_MEMBERSHIPS_API = (id, page, pageSize) =>
  `${BASE_URL}crm_label/${id}/get_crm_memberships/?page=${page}&page_size=${pageSize}`;
export const CRM_ALL_LABELS_API = (slug) =>
  `${BASE_URL}businesses/${slug}/get_crm_labels/`;
export const CRM_MEMBERSHIPS_API = (slug, page, pageSize, search) =>
  `${BASE_URL}businesses/${slug}/get_crm_memberships/?page=${page}&page_size=${pageSize}&search=${search}`;
export const CREATE_NEW_CRM_LABEL = (slug) =>
  `${BASE_URL}businesses/${slug}/send_visit_card_to_phone_number/`;
export const ADD_MEMBERSHIPS_FROM_SHEET_API = (slug) =>
  `${BASE_URL}businesses/${slug}/add_memberships_from_sheet/`;
export const MEMBERSHIPS_API = `${BASE_URL}crm_membership/`;

export const GET_MEMBERSHIP_EVENT_LOGS = (id) =>
  `${BASE_URL_V2}crm/memberships/${id}/events/`;

export const MEMBERSHIPS_SEARCH_API = () =>
  `${BASE_URL_V2}crm/memberships/by-business/`;

export const MEMBERSHIPS_ITEM_API = (id, slug) =>
  `${BASE_URL}crm_membership/${id}/${slug ? `?business_slug=${slug}` : ""}`;

export const MEMBERSHIPS_ITEM_REPORT_API = (id) =>
  `${BASE_URL}crm_membership/${id}/report/`;
export const REQUEST_ALOPEYK_API = (id, plugin) =>
  `${BASE_URL_V2}${plugin}-orders/${id}/alopeyk/trips/apply/`;
export const REQUEST_MIARE_API = (id, plugin) =>
  `${BASE_URL_V2}${plugin}-orders/${id}/miare/trips/apply/`;
export const ASSIGN_DELIVERY_MAN_API = (plugin, order_id) =>
  `${BASE_URL_V2}${plugin}-orders/${order_id}/courier/`;
export const CRM_CREDIT_TRANSACTIONS = (id) =>
  `${BASE_URL}crm_membership/${id}/wallet_transaction/`;
export const CRM_POINT_API = (id) =>
  `${BASE_URL_V2}crm/memberships/${id}/point/`;

// automated-processes API
export const AUTO_TREND_ACTIONS_API = (businessSlug, event = "") =>
  `${BASE_URL}businesses/${businessSlug}/automated-process/?${event}`;

export const AUTOMATED_PROCESSES_LIST_API = (slug) =>
  `${BASE_URL_V2}automated-process/by-business/?business_slug=${slug}`;
export const AUTOMATED_PROCESSES_BY_ID_API = (id) =>
  `${BASE_URL_V2}automated-process/${id}/`;
export const CREATE_AUTOMATED_PROCESS_API = () =>
  `${BASE_URL_V2}automated-process/`;

// Deals API
export const DEALS_API = `${BASE_URL}deals/`;
export const DEALS_IMAGES_ITEM_API = (id) => `${BASE_URL}deals/images/${id}/`;
export const DEALS_IMAGES_ITEM_CHANGE_ORDER_API = (id) =>
  `${BASE_URL}deals/images/${id}/change_order_by_business/`;

export const BULK_UPDATE_PRODUCTS_INVENTORY_API = `${BASE_URL}deals/bulk_update_deals_inventory_management/`;

export const BULK_UPDATE_MODIFIER_SETS_INVENTORY_API = `${BASE_URL}modifier_sets/bulk_change_modifiers_inventory/`;

export const GROUP_DISCOUNT_ON_DEALS_API = (slug) =>
  `${BASE_URL_V2}businesses/${slug}/group-discount-on-variations/`;
export const GET_PRODUCTS_REPORTS_SOLD_BY_COUNT_API = `${BASE_URL_V2}resources/reports/sold-by-count/`;
// Discount Code API
export const DISCOUNT_CODE_API = (slug, is_expired, code) =>
  `${BASE_URL}discount_code/by-business/?business_slug=${slug}&is_expired=${is_expired}&code=${code}`;
export const UPDATE_DISCOUNT_CODE_API = (id) =>
  `${BASE_URL}discount_code/${id}/`;
export const CREATE_DISCOUNT_CODE_API = `${BASE_URL}discount_code/`;

export const DISCOUNT_CODE_ITEM_API = (id) => `${BASE_URL}discount_code/${id}/`;

// Orders API
export const ORDERS_END_USER_API = (plugin) =>
  `${BASE_URL_V2}${plugin}-orders/`;
export const ORDERS_ADMIN_API = (plugin) =>
  `${BASE_URL_V2}${plugin}-orders/create/admin/`;
export const USER_ORDERS_API = (plugin, page = 1, pageSize = 10) =>
  `${BASE_URL_V2}${plugin}-orders/by-business-by-user/?page=${page}&page_size=${pageSize}`;

export const USER_ORDERS_ITEMS_API = (id, plugin) =>
  `${BASE_URL_V2}${plugin}-orders/${id}/`;
export const USER_ORDERS_ITEMS_DETAIL_API = (id, plugin) =>
  `${BASE_URL_V2}${plugin}-orders/${id}/details/`;
export const USER_ORDERS_ITEMS_DELIVERY_OPTIONS_API = (id, plugin) =>
  `${BASE_URL_V2}${plugin}-orders/${id}/delivery/options/`;
export const BUSINESS_ORDER_ITEMS_INVOICE_EDIT_API = (id, plugin) =>
  `${BASE_URL_V2}${plugin}-orders/${id}/invoice/admin/`;
export const BUSINESS_ORDER_ITEMS_INVOICE_API = (id, plugin) =>
  `${BASE_URL_V2}${plugin}-orders/${id}/invoice/`;
export const SEND_RECEIPT_API = (id, plugin) =>
  `${BASE_URL_V2}${plugin}-orders/${id}/send-receipt/`;
export const PARTIAL_PAID_API = (id, plugin) =>
  `${BASE_URL_V2}${plugin}-orders/${id}/partial-pay/`;
export const RETURN_EXTRA_PAID_API = (id, plugin) =>
  `${BASE_URL_V2}${plugin}-orders/${id}/return-extra-paid/`;
export const BUSINESS_ORDERS_API = (
  plugin = SHOPPING_PLUGIN,
  page = 1,
  pageSize = 20,
  hasPaginate = true
) =>
  `${BASE_URL_V2}${plugin}-orders/by-business-site-domain/?page=${page}&page_size=${pageSize}&has_paginate=${hasPaginate}`;
export const BUSINESS_ORDERS_SUMMARY_API = (plugin = SHOPPING_PLUGIN) =>
  `${BASE_URL_V2}${plugin}-orders/status-summary-by-domain/`;
export const CHANGE_ORDER_STATUS_API = (id, plugin) =>
  `${BASE_URL_V2}${plugin}-orders/${id}/change-status/`;
export const ORDER_CHANGE_PAYMENT_STATUS_TO_ON_SITE_API = (id, plugin) =>
  `${BASE_URL}${plugin}_orders/${id}/change_payment_status_to_on_site/`;
export const ORDER_ONLINE_PAYMENT_API = (id, plugin) =>
  `${BASE_URL_V2}${plugin}-orders/${id}/transaction/`;
export const ORDER_DISCOUNT_API = (id, plugin) =>
  `${BASE_URL}${plugin}_orders/${id}/apply_discount_code/`;
export const REMOVE_ORDER_DISCOUNT_API = (id, plugin) =>
  `${BASE_URL}${plugin}_orders/${id}/remove_discount_code_effect/`;
export const ORDER_GIFT_API = (id, plugin) =>
  `${BASE_URL_V2}${plugin}-orders/${id}/change-status/`;
export const ORDER_PAYMENT_API = (id, plugin) =>
  `${BASE_URL_V2}${plugin}-orders/${id}/transaction/`;
export const ORDER_DELIVERY_INTERVAL_API = (id, plugin) =>
  `${BASE_URL}${plugin}_orders/${id}/set_delivery_interval/`;

export const ORDER_DELIVERY_TIME_API = (id, plugin) =>
  `${BASE_URL_V2}${plugin}-orders/${id}/delivery/time/`;
export const ORDER_ANALYTICS_DATA_API = (plugin) =>
  `${BASE_URL}${plugin}_orders/analytics_data/`;
export const ORDER_TRANSACTIONS_ITEMS_API = (plugin, id) =>
  `${BASE_URL_V2}${plugin}-orders/${id}/transactions/`;
export const ORDER_EDIT_API = (plugin, id) =>
  `${BASE_URL_V2}${plugin}-orders/${id}/edit/`;
export const ORDER_ADD_NOTE_API = (plugin, id) =>
  `${BASE_URL_V2}${plugin}-orders/${id}/logs/`;

// Plugins API
export const PLUGIN_TRIAL_API = (slug) =>
  `${BASE_URL}businesses/${slug}/enable_plugin_trial/`;
export const PLUGIN_PERSONAL_SITEDOMAIN_API = (slug) =>
  `${BASE_URL}businesses/${slug}/enable_personal_sitedomain/`;
export const BUY_PLUGIN_API = (slug) =>
  `${BASE_URL}businesses/${slug}/enable_plugins_transaction/`;
export const SET_PLUGIN_DATA_API = (slug) =>
  `${BASE_URL}businesses/${slug}/set_plugin_data/`;
export const SET_PLUGIN_SHOPPING_PAYMENT_DATA_API = (slug) =>
  `${BASE_URL_V2}businesses/${slug}/plugin/shopping/payment/`;
// Posts API
export const POST_IMAGES_API = `${BASE_URL}businesses/images/`;
export const POST_IMAGES_ITEM_API = (id) =>
  `${BASE_URL}businesses/images/${id}/`;
export const POST_VIDEOS_API = `${BASE_URL}businesses/images/`;
export const POST_VIDEOS_ITEM_API = (id) =>
  `${BASE_URL}businesses/images/${id}/`;

// Reviews API
export const SUBMIT_REVIEW_API = `${BASE_URL}reviews/`;
export const GET_BUSINESS_REVIEWS_API = `${BASE_URL}reviews/response/by-business`;
export const GET_BUSINESS_REVIEW_API = (id) =>
  `${BASE_URL}reviews/response/${id}/`;
export const SUGGEST_EDIT_API = `${BASE_URL}business_edits/`;
export const SUGGEST_EDIT_ITEM_API = (id) => `${BASE_URL}business_edits/${id}/`;
export const UNAPPROVED_BUSINESS_EDITS_API = `${BASE_URL}business_edits/unapproved_by_business/`;

// Transactions API
export const GET_TRANSACTION_API = (id) => `${BASE_URL}transactions/${id}/`;
export const GET_ORDER_TRANSACTION_API = (id) =>
  `${BASE_URL_V2}order-transactions/${id}/`;
export const TRANSACTION_ZIBAL_API = (id) =>
  `${BASE_URL}order_transactions/${id}/pay_transaction/`;
export const TRANSACTION_API = (id, gateway) =>
  `${BASE_URL}transactions/${id}/${gateway}_gateway/`;
export const ORDER_TRANSACTIONS_API = `${BASE_URL_V2}order-transactions/by-business/`;
export const ORDER_TRANSACTIONS_FINANCE_SUMMARY_REPORTS_API = `${BASE_URL_V2}order-transactions/reports/finance-summary/`;

export const PAYMENT_API = `${BASE_URL}custom_payment/`;

// Wallet Transactions API

export const GET_WALLET_BALANCE_API = `${BASE_URL}branch_wallet_transactions/balance_by_business_id/`;
export const GET_WALLET_TRANSACTIONS_API = `${BASE_URL}branch_wallet_transactions/by_business_id/`;
export const GET_USERS_WALLET_TRANSACTIONS_API = `${BASE_URL}gift_credit_transactions/by_business_id/`;
export const WALLET_TRANSACTIONS_API = `${BASE_URL}branch_wallet_transactions/`;

// User API
export const LOGIN_API = (slug) =>
  `${BASE_URL_V2}businesses/${slug}/vitrin-verification/`;
export const LOGIN_BY_PHONE_API = `${BASE_URL_V2}users/phone-verification/call/`;
export const VERIFY_API = `${BASE_URL_V2}jwt/`;
export const IS_ADMIN_BY_SITE_DOMAIN_API = (site_domain) =>
  `${BASE_URL_V2}businesses/${site_domain}/is-admin-by-site-domain/`;
export const IS_ADMIN_API = (slug) => `${BASE_URL}businesses/${slug}/is_admin/`;
export const USER_API = `${BASE_URL}users/self/`;
export const USER_ADDRESS_API = `${BASE_URL}user_address/by_user/`;
export const USER_ADDRESS_API_AND_DEFAULT = `${BASE_URL}users/self/address_info/`;
export const CUSTOMER_USER_ADDRESS_API = (customer_id) =>
  `${BASE_URL}users/${customer_id}/address_info/`;
export const ADDRESS_API = `${BASE_URL}user_address/`;
export const ADDRESS_ID_API = (id) => `${BASE_URL}user_address/${id}/`;
export const PUSH_NOTIFICATION_API = `${BASE_URL}push_notification_client/`;
export const USER_ADDRESS_WITH_AVAILABILITY_INFO_API = (order_id) =>
  `${BASE_URL_V2}shopping-orders/${order_id}/delivery/user-addresses/`;

// Visit Card API
export const SEND_VISIT_CARD_API = (slug) =>
  `${BASE_URL}businesses/${slug}/send_visit_card_to_phone_number/`;
export const SEND_CUSTOM_VISIT_CARD_API = (slug) =>
  `${BASE_URL}businesses/${slug}/send_custom_visit_card_to_customers/`;
export const BUSINESS_VISIT_CARD_STATS_API = (domain) =>
  `${BASE_URL}business_visit_card_stats/${domain}/`;
export const BUSINESS_BUY_VISIT_CARD_SMS_API = (slug) =>
  `${BASE_URL}businesses/${slug}/charge_visit_card_sms_transaction/`;

export const CRM_ADD_COMMENT_API = (id) =>
  `${BASE_URL}crm_membership/${id}/change_logs/`;
export const SELF_MEMBERSHIP_API = `${BASE_URL}crm_membership/`;
export const GET_MEMBERSHIP_BY_SLUG_API = (userSlug) =>
  `${BASE_URL}crm_membership/${userSlug}/get_by_invite_link_id/`;

export const GET_MEMBERSHIP_BY_INVITE_ID_API = (inviteSlug) =>
  `${BASE_URL_V2}crm/memberships/${inviteSlug}/by-invite-link-id/`;

export const MEMBERSHIP_TRANSACTIONS_API = (userSlug) =>
  `${BASE_URL}crm_membership/${userSlug}/get_gift_credit_transactions/`;

export const PAGES_API = `${BASE_URL}businesses/pages/`;
export const GET_PAGES_API = (slug, page = 1, is_blog = false) =>
  `${BASE_URL}businesses/pages/by_business/?business_slug=${slug}&page=${page}&is_blog=${is_blog}`;
export const PAGES_ITEM_API = (id) => `${BASE_URL}businesses/pages/${id}/`;

export const FORMS_API = `${BASE_URL}businesses/forms/`;
export const GET_FORMS_API = (slug) =>
  `${BASE_URL}businesses/forms/by_business/?business_slug=${slug}`;
export const FORMS_ITEM_API = (id) => `${BASE_URL}businesses/forms/${id}/`;
export const FORM_RESPONSE_API = (id, page) =>
  `${BASE_URL}businesses/forms/${id}/responses/?page=${page}`;
//modifiers
export const MODIFIERS_API = (slug) =>
  `${BASE_URL}modifier_sets/by_business/?business_slug=${slug}`;
export const MODIFIER_ITEMS_API = `${BASE_URL}modifier_sets/`;
export const MODIFIER_ITEM_API = (id) => `${BASE_URL}modifier_sets/${id}/`;

export const MODIFIERS_BULK_DELETE_API = `${BASE_URL}modifier_sets/bulk_delete/`;

// ingredients

export const INGREDIENTS_API = `${BASE_URL}ingredients/by_business/`;
export const INGREDIENTS_ITEMS_API = `${BASE_URL}ingredients/`;
export const INGREDIENT_ITEM_API = (id) => `${BASE_URL}ingredients/${id}/`;

export const INGREDIENTS_INVENTORY_CHANGE_API = (id) =>
  `${BASE_URL}ingredients/${id}/change_inventory/`;

export const INGREDIENT_REPORT_API = (id) =>
  `${BASE_URL}ingredients/${id}/inventory_changes_report/`;

export const BULK_ADD_MODIFIERSET_TO_DEALS_API = (id) =>
  `${BASE_URL}modifier_sets/${id}/bulk_add_modifier_set_to_deals/`;

export const BULK_ADD_MODIFIERSET_TO_CATEGORIES_API = (id) =>
  `${BASE_URL}modifier_sets/${id}/bulk_add_modifier_set_to_deal_categories/`;

export const INGREDIENTS_BULK_DELETE_API = `${BASE_URL}ingredients/bulk_delete/`;
export const INGREDIENTS_RECOUNTING_REPORTS_API = `${BASE_URL_V2}variations/recounting-report/by-business/`;
export const INGREDIENTS_RECOUNTING_REPORT_API = (id) =>
  `${BASE_URL_V2}variations/recounting-report/${id}/`;
export const CREATING_INGREDIENTS_RECOUNTING_REPORTS_API = `${BASE_URL_V2}variations/recounting-report/`;
export const UPDATE_SYSTEM_BY_NEW_INVENTORY_COUNTS_API = (id) =>
  `${BASE_URL_V2}variations/recounting-report/${id}/apply-on-inventory/`;
export const AUTOMATED_PROCESSES_CREDIT_REPORTS_API = (slug) =>
  `${BASE_URL_V2}credits/report/automated-process-usage?business_slug=${slug}`;
export const CAMPAIGN_CREDIT_REPORTS_API = (slug) =>
  `${BASE_URL_V2}credits/report/campaign-usage?business_slug=${slug}`;

//bulk edits

export const BULK_UPDATE_PRODUCTS_API = `${BASE_URL}deals/bulk_update/`;
export const BULK_DEALS_INVENTORY_CHANGE_API = `${BASE_URL}deals/bulk_change_deals_inventory/`;
export const BULK_INGREDIENTS_INVENTORY_CHANGE_API = `${BASE_URL}ingredients/bulk_change_ingredients_inventory/`;
export const BULK_UPDATE_INGREDIENTS_API = `${BASE_URL}ingredients/bulk_update/`;
export const BULK_UPDATE_MODIFIER_SETS_API = `${BASE_URL}modifiers/bulk_update/`;
export const BULK_MODIFIERS_INVENTORY_CHANGE_API = `${BASE_URL}modifiers/bulk_change_modifiers_inventory/`;
export const BULK_ADD_PRODUCTS_VARIATIONS_TO_MODIFIER_SETS_API = (id) =>
  `${RESOURCES_API}${id}/bulk-add-products-variations-to-modifier-set/`;
export const BULK_ADD_LABELS_TO_MODIFIER_SETS_API = (id) =>
  `${RESOURCES_API}${id}/bulk-add-product-labels-variations-to-modifier-set/`;
// devices
export const GET_BUSINESS_DEVICES_API = `${BASE_URL}pos_devices/by_business/`;
export const POS_DEVICE_ITEMS_API = `${BASE_URL}pos_devices/`;
export const POS_DEVICE_ITEM_API = (licence) =>
  `${BASE_URL}pos_devices/${licence}/`;
export const POS_USER_ITEMS_API = (licence) =>
  `${BASE_URL}pos_devices/${licence}/users/`;
export const POS_USER_ITEM_API = (licence, id) =>
  `${BASE_URL}pos_devices/${licence}/users/${id}/`;
//delivery API
export const GET_BUSINESS_DELIVERY_TYPES_API = (slug, page = 1) =>
  `${BASE_URL}businesses/delivery/types/by_business/?business_slug=${slug}&page=${page}`;
export const GET_BUSINESS_DELIVERY_TYPES_WITHOUT_PAGINATION_API = (slug) =>
  `${BASE_URL}businesses/delivery/types/light_by_business/?business_slug=${slug}`;
export const DELIVERY_TYPES_API = `${BASE_URL}businesses/delivery/types/`;
export const DELIVERY_TYPES_ITEM_API = (id) =>
  `${BASE_URL}businesses/delivery/types/${id}/`;
export const GET_BUSINESS_DELIVERY_RULES_API = (slug) =>
  `${BASE_URL}businesses/delivery/rules/by_business/?business_slug=${slug}`;
export const DELIVERY_RULES_API = `${BASE_URL}businesses/delivery/rules/`;
export const DELIVERY_RULES_ITEM_API = (id) =>
  `${BASE_URL}businesses/delivery/rules/${id}/`;
export const CITY_SEARCH_API = (search) =>
  `${BASE_URL_BEHTARINO}city_documents/?search=${search}`;
export const NEIGHBORHOOD_SEARCH_API = (search) =>
  `${BASE_URL_BEHTARINO}neighborhood_documents/?search=${search}`;
export const CITY_SEARCH_BY_IDS_API = (ids) =>
  `${BASE_URL_BEHTARINO}cities/?${ids.map(
    (id, index) => `id=${id}${index === ids.length - 1 ? "" : "&"}`
  )}`;
export const NEIGHBORHOOD_SEARCH_BY_IDS_API = (ids) =>
  `${BASE_URL_BEHTARINO}neighborhoods/?${ids.map(
    (id, index) => `id=${id}${index === ids.length - 1 ? "" : "&"}`
  )}`;

export const PURCHASE_ORDER_ITEM_API = (id) =>
  `${BASE_URL_V2}purchase-orders/${id}/`;
export const RECEIVED_PURCHASE_ORDERS_BY_BUSINESS_API = `${BASE_URL_V2}purchase-orders/supplied/by-business/`;
export const APPLY_RECEIVED_PURCHASE_ORDER_API = (id) =>
  `${BASE_URL_V2}purchase-orders/${id}/change-status-to-supplying-accepted/`;
export const REJECT_RECEIVED_PURCHASE_ORDER_API = (id) =>
  `${BASE_URL_V2}purchase-orders/${id}/change-status-to-supplying-rejected/`;

export const SUBMITTED_PURCHASE_ORDERS_API = `${BASE_URL_V2}purchase-orders/`;
export const SUBMITTED_PURCHASE_ORDERS_BY_BUSINESS_API = `${BASE_URL_V2}purchase-orders/submitted/by-business/`;
export const APPLY_SUBMITTED_PURCHASE_ORDER_API = (id) =>
  `${BASE_URL}purchase_orders/${id}/change_order_items/`;
export const RECEIVE_SUBMITTED_PURCHASE_ORDER_API = (id) =>
  `${BASE_URL_V2}purchase-orders/${id}/items/receive/`;
export const ACCEPT_SUBMITTED_PURCHASE_ORDER_API = (id) =>
  `${BASE_URL_V2}purchase-orders/${id}/change-status-to-receiving-accepted/`;
export const TOTAL_PURCHASE_ITEMS_API = `${BASE_URL_V2}purchase-orders/items/total-ordered/`;

export const PURCHASE_REPORTS_BY_INGREDIENTS_API = `${BASE_URL_V2}purchase-orders/reports/per-items/`;
export const PURCHASE_REPORTS_BY_INGREDIENTS_PER_BRANCH_API = `${BASE_URL_V2}purchase-orders/reports/per-branch-items/`;
export const PURCHASE_REPORTS_FROM_VENDORS_API = `${BASE_URL_V2}purchase-orders/reports/pivot-table/`;
export const PURCHASE_REPORTS_FROM_VENDORS_PER_BRANCH_API = `${BASE_URL_V2}purchase-orders/reports/branch-pivot-table/`;

export const WAREHOUSE_REPORTING_CATEGORIES_API = `${BASE_URL_V2}resource-labels/reports/inventory/`;
export const CUSTOMERS_SATISFACTION_REVIEWS_REPORTS_API = `${BASE_URL}analytics/business/performance/user_oriented/`;
export const CUSTOMERS_DISSATISFACTION_REVIEWS_REPORTS_API = `${BASE_URL}reviews/reports/business/group_by_questions/`;
export const INVENTORY_HISTORY_REPORTS = `${BASE_URL_V2}variations/reports/inventory-changes/?is_ingredient=true`;
export const CUSTOMERS_TAXING_REPORTS = `${BASE_URL_V2}shopping-orders/reports/taxing/`;
export const GROSS_SALES_REPORT_API = `${BASE_URL_V2}shopping-orders/reports/gross-profit/`;
export const PRODUCTS_DEACTIVATION_REPORT_API = `${BASE_URL_V2}variations/reports/availability/`;

export const CMS_LESSONS_API = `${CMS_BASE_URL}lessons`;
export const CRM_JOURNEY_DATA_API = (slug) =>
  `${BASE_URL_V2}businesses/${slug}/vitrin-crm-journey-data/`;

export const BISHTAR_CRM_JOURNEY_DATA_API = (siteDomain, id) =>
  `${BASE_URL_V2}businesses/bishtar/${siteDomain}/merchant/${id}/`;
export const LEGAL_DOCUMENT_ITEMS_API = (businessId) =>
  `${BASE_URL}businesses/${businessId}/legal_documents/`;
export const LEGAL_DOCUMENT_ITEM_API = (businessId, documentId) =>
  `${BASE_URL}businesses/${businessId}/legal_documents/${documentId}/`;

//cash drawers
export const CASH_DRAWER_ITEM_API = (id) => `${BASE_URL}cash_drawers/${id}/`;
// export const CASH_DRAWERS_ITEMS_API = () => `${BASE_URL}cash_drawers/`;

export const NEW_TRANSACTION_API = (from = "", to = "", businessSlug) =>
  `${BASE_URL_V2}order-transactions/reports/?from_date=${from}&to_date=${to}&business_slug=${businessSlug}`;

export const MOST_SOLD_PRODUCT_API = (
  from = "",
  to = "",
  businessSlug,
  count = 5
) =>
  `${BASE_URL_V2}resources/reports/sold-variations/?from_date=${from}&to_date=${to}&business_slug=${businessSlug}&count=${count}`;
export const SOLD_PRODUCT_API = (from = "", to = "", businessSlug) =>
  `${BASE_URL_V2}resources/reports/sold-variations/?from_date=${from}&to_date=${to}&business_slug=${businessSlug}`;

export const NEW_SHOPPING_ORDERS = (from = "", to = "", businessSlug) =>
  `${BASE_URL_V2}shopping-orders/reports/?from_date=${from}&to_date=${to}&business_slug=${businessSlug}`;

export const NEW_REVIEWS = (from = "", to = "", businessSlug) =>
  `${BASE_URL}reviews/reports/?from_date=${from}&to_date=${to}&business_slug=${businessSlug}`;
export const CASH_DRAWER_ITEM_TRANSACTIONS_API = (device_id, drawer_id) =>
  `${BASE_URL}pos_devices/${device_id}/drawers/${drawer_id}/transactions/`;
export const CASH_DRAWERS_ITEMS_API = (slug) =>
  `${BASE_URL}businesses/${slug}/pos_drawers/`;
export const OPEN_CASH_DRAWER_API = (pos_id) =>
  `${BASE_URL}pos_devices/${pos_id}/drawers/open/`;
export const CLOSE_CASH_DRAWER_API = (pos_id) =>
  `${BASE_URL}pos_devices/${pos_id}/drawers/finish/`;
export const FINISH_CASH_DRAWER_API = (pos_id, drawer_id) =>
  `${BASE_URL}pos_devices/${pos_id}/drawers/${drawer_id}/close/`;
export const CREATE_PAID_IN_CASH_TRANSACTION_API = (pos_id) =>
  `${BASE_URL}pos_devices/${pos_id}/drawers/pay_in/`;
export const CREATE_PAID_OUT_CASH_TRANSACTION_API = (pos_id) =>
  `${BASE_URL}pos_devices/${pos_id}/drawers/pay_out/`;

export const VENDOR_API = `${BASE_URL_V2}vendors/`;
export const VENDORS_BY_BUSINESS_API = (page = 1, pageSize = 200) =>
  `${BASE_URL_V2}vendors/by-business/?page=${page}&page_size=${pageSize}`;
export const VENDOR_ITEM_API = (id) => `${BASE_URL_V2}vendors/${id}/`;
export const VENDOR_ITEMS_BY_VENDOR_API = (id, page = 1, pageSize = 20) =>
  `${BASE_URL_V2}vendors/${id}/items/?page=${page}&page_size=${pageSize}`;
export const VENDOR_ITEMS_ITEM_API = (id) =>
  `${BASE_URL_V2}vendor-items/${id}/`;
export const VENDOR_ITEMS_BY_BUSINESS_API = `${BASE_URL_V2}vendor-items/by-business/`;
export const VARIATION_VENDOR_ITEMS_API = (id) =>
  `${BASE_URL_V2}variations/${id}/vendor-items/`;

// export const VENDORS_BY_BUSINESS_API = (page = 1, pageSize = 200) =>
//   `${BASE_URL}vendors/by_business/?page=${page}&page_size=${pageSize}`;
// export const VENDOR_API = `${BASE_URL}vendors/`;
// export const VENDOR_ITEM_API = (id) => `${BASE_URL}vendors/${id}/`;
// export const VENDOR_ITEMS_BY_VENDOR_API = (id, page = 1, pageSize = 20) =>
//   `${BASE_URL}vendors/${id}/vendor_items/?page=${page}&page_size=${pageSize}`;
// export const VENDOR_ITEMS_ITEM_API = (id) => `${BASE_URL}vendor_items/${id}/`;
// export const VENDOR_ITEMS_BY_BUSINESS_API = `${BASE_URL}vendor_items/by_business/`;
// export const INGREDIENT_VENDOR_ITEMS_API = (id) =>
//   `${BASE_URL}ingredients/${id}/vendor_items/`;

//cashback
export const CREATE_CASHBACK_TRANSACTION_API = (slug) =>
  `${BASE_URL}businesses/${slug}/make_cashback_transaction/`;
export const CASHBACK_TRANSACTION_ZIBAL_API = (id) =>
  `${BASE_URL}cashback_transactions/${id}/pay_transaction/`;
export const VALIDATE_CASHBACK_CODE_API = (slug) =>
  `${BASE_URL}businesses/${slug}/cashback_code_verification/`;

/***
BASE URL VERSION 2
***/

export const RESOURCES_API = `${BASE_URL_V2}resources/`;
export const RESOURCE_API = (id, query) => {
  return `${BASE_URL_V2}resources/${id}/${query ? query : ""}`;
};
export const RESOURCES_IMAGES_API = `${BASE_URL_V2}resources/images/`;
export const VARIATIONS_API = `${BASE_URL_V2}variations/`;
export const VARIATIONS_IMAGES_API = `${BASE_URL_V2}variations/images/`;
export const VARIATIONS_IMAGES_ITEM_API = (id) =>
  `${BASE_URL_V2}variations/images/${id}/`;
export const RESOURCES_IMAGES_ITEM_API = (id) =>
  `${BASE_URL_V2}resources/images/${id}/`;
export const VARIATION_API = (id) => `${BASE_URL_V2}variations/${id}/`;
export const VARIATIONS_BULK_UPDATE_API = `${BASE_URL_V2}variations/bulk-update/`;
export const RESOURCES_BULK_UPDATE_API = `${BASE_URL_V2}resources/bulk-update/`;
export const VARIATIONS_BULK_CREATE_OR_UPDATE_OR_DELETE_API = (id) =>
  `${BASE_URL_V2}resources/${id}/variations/`;

export const VARIATION_INGREDIENTS_API = (id) =>
  `${BASE_URL_V2}variations/${id}/ingredients/`;
export const VARIATION_MODIFIER_SETS_API = (id) =>
  `${BASE_URL_V2}variations/${id}/modifier-sets/`;
export const VARIATION_CHANGE_INVENTORY_API = (id) =>
  `${BASE_URL_V2}variations/${id}/change-inventory/`;
export const VARIATIONS_BULK_CHANGE_INVENTORY_API = `${BASE_URL_V2}variations/bulk-change-inventory/`;

export const ALL_RESOURCES_API = (businessSlug) =>
  `${BASE_URL_V2}resources/by-business/?business_slug=${businessSlug}&is_product=true`;

export const RESOURCES_ITEM_API = (categories) =>
  `${BASE_URL_V2}resources/?${categories}&is_product=true`;

export const ALL_LABELS_API = (businessSlug) =>
  `${BASE_URL_V2}labels/by-business/?business_slug=${businessSlug}`;

export const ALL_LIGHT_RESOURCES_API = (businessSlug) =>
  `${BASE_URL_V2}resources/light-by-business/?business_slug=${businessSlug}&is_product=true`;

/*
 * Resources
 * V2
 */
export const CATEGORY_RESOURCE_API = (slug) =>
  `${BASE_URL_V2}businesses/${slug}/product-labels/`;

export const ALL_INGREDIENTS_BY_BUSINESS = (business_slug) =>
  `${BASE_URL_V2}variations/by-business/?business_slug=${business_slug}&is_ingredient=true`;

export const ALL_MODIFIER_SETS_BY_BUSINESS = (business_slug) =>
  `${BASE_URL_V2}resources/by-business/?business_slug=${business_slug}&is_modifier_set=true`;
export const ALL_PRODUCTS_BY_BUSINESS = (businessSlug) =>
  `${BASE_URL_V2}resources/by-business/?business_slug=${businessSlug}&is_product=true`;
export const BULK_DELETE_RESOURCES_API = `${BASE_URL_V2}resources/bulk-delete/`;
//import deals

export const LABELS_ITEMS_API = (id) => `${BASE_URL_V2}labels/${id}/`;
export const PRODUCTS_ITEM_API = (id, isProduct = true) =>
  `${BASE_URL_V2}resources/${id}/?is_product=${isProduct}`;
export const LABELS_API = `${BASE_URL_V2}labels/`;
export const LABELS_ITEM_APPLY_DISCOUNT_API = (id) =>
  `${BASE_URL_V2}labels/${id}/apply-discount/`;

export const BUSINESS_LABELS_API = `${BASE_URL_V2}product_labels/by-business/`;

export const LABELS_SALEABLE_ITEMS_API = (id) =>
  `${BASE_URL_V2}labels/${id}/saleable/`;

// BUSINESS

export const BUSINESS_LIGHT_BY_SITE_DOMAIN_API_V2 = (subDomain) =>
  `${BASE_URL_V2}businesses/${subDomain}/light-by-site-domain/`;

export const IMPORT_CSV_API = `${BASE_URL_V2}resource/import-csv/`;

/////////////////////////////

//survey
export const CREATE_SURVEY_TEMPLATE_API = `${BASE_URL}reviews/template/`;
export const GET_SURVEY_TEMPLATE_API = (id) =>
  `${BASE_URL}reviews/template/${id}/`;
export const GET_AGGREGATE_RATING_API = (id) =>
  `${BASE_URL}reviews/template/${id}/report/`;
export const UPDATE_SURVEY_TEMPLATE_API = (id) =>
  `${BASE_URL}reviews/template/${id}/`;
export const CREATE_SURVEY_RESPONSE_API = `${BASE_URL}reviews/response/`;
export const UPDATE_SURVEY_RESPONSE_API = `${BASE_URL}reviews/response/`;
export const GET_RESPONSE_API = (id) => `${BASE_URL}reviews/response/${id}/`;
export const UPDATE_RESPONSE_API = (id) => `${BASE_URL}reviews/response/${id}/`;
export const FEEDBACK_DELAY_API = (slug) =>
  `${BASE_URL_V2}businesses/${slug}/set-plugin-data/`;

//dobare

//cusomer levels
export const CUSTOMER_LEVELS_LIST_API = (slug) =>
  `${BASE_URL_V2}crm-levels/by-business/?business_slug=${slug}`;

export const CUSTOMER_LEVELS_API = (id) => `${BASE_URL_V2}crm-levels/${id}/`;

export const CREATE_LEVELS_API = `${BASE_URL_V2}crm-levels/`;

//customer segments
export const CUSTOMER_SEGMENTS_API = (slug) =>
  `${BASE_URL}businesses/${slug}/segments/`;

export const SEGMENTS_LIST_API = (slug) =>
  `${BASE_URL_V2}segments/by-business/?business_slug=${slug}`;
export const CREATE_SEGMENT_API = () => `${BASE_URL_V2}segments/`;
export const SEGMENT_BY_ID_API = (id) => `${BASE_URL_V2}segments/${id}/`;

//labels
export const C_LABELS_API = (slug) =>
  `${BASE_URL_V2}crm-labels/by-business/?business_slug=${slug}`;

export const CREATE_LABEL_API = () => `${BASE_URL}crm_label/`;

export const LABEL_API_BY_ID = (id) => `${BASE_URL_V2}crm-labels/${id}`;

export const UPDATE_LABEL_API = (id) => `${BASE_URL_V2}crm-labels/${id}/`;
export const CHANGE_LABELS_API = (slug, id) =>
  `${BASE_URL_V2}businesses/${slug}/labels/${id}/`;

export const ADD_LABEL_TO_MEMBERSHIP_GROUP_API = (id) =>
  `${BASE_URL_V2}crm-labels/${id}/add-crm-memberships/`;

export const CRM_GIFT_TRANSACTIONS = (id) =>
  `${BASE_URL_V2}crm/memberships/${id}/gift-transaction/`;

export const SUPER_INGREDIENTS_APPROVED_PRICE_API = (id) =>
  `${BASE_URL_V2}variations/${id}/approved-price/`;
export const GET_CALL_REQUESTS_API = `${BASE_URL}booking/request_calls/by_business/`;
export const GET_REPORTS_CALL_REQUESTS_API = `${BASE_URL}booking/request_calls/reports/`;
export const REQUEST_CALLS_API = `${BASE_URL}booking/request_calls/`;
export const CHECK_DOMAIN_API = "/api/domain/";
export const REVIEWS_RESPONSE_API = (site_domain) =>
  `${BASE_URL}reviews/response/by-business/?business_slug=${site_domain}`;

export const FACTOR_INVOICE_API = `${BASE_URL_V2}shopping-orders/factor/invoice/`;
export const SUBMIT_FACTOR_API = `${BASE_URL_V2}shopping-orders/factor/submit/`;

// campaign

export const GET_CAMPAIGN_API = (slug, page = 1) =>
  `${BASE_URL_V2}crm/campaigns/by-business/?business_slug=${slug}&page=${page}`;

export const GET_CAMPAIGN_BY_ID_API = (_, id) =>
  `${BASE_URL_V2}crm/campaigns/${id}/`;

export const CREATE_CAMPAIGN_API = () => `${BASE_URL_V2}crm/campaigns/`;

export const UPDATE_CAMPAIGN_API = (_, id) =>
  `${BASE_URL_V2}crm/campaigns/${id}/`;

export const CAMPAIGNS_BY_SEGMENT_API = () => `${BASE_URL_V2}crm/campaigns/by-business/by-segment/`;
export const CREATE_CAMPAIGNS_BY_SEGMENT_API = () => `${BASE_URL_V2}crm/campaigns/by-segment/`;
export const CAMPAIGNS_BY_SEGMENT_BY_ID_API = (id) => `${BASE_URL_V2}crm/campaigns/${id}/by-segment/`;

export const CRM_EVENT_API = (slug) =>
  `https://api-againloyalty.hectora.app/api/v2/businesses/${slug}/crm-event/`;

export const REVIEWS_TEMPLATE_API = (slug) =>
  `${BASE_URL}reviews/template/by-business/?business_slug=${slug}`;
//gate_away
export const CREATE_GATE_AWAY_API = (slug) =>
  `${BASE_URL_V2}businesses/${slug}/gateways/data/`;
export const INITIALZE_GATE_AWAY_API = (slug) =>
  `${BASE_URL_V2}businesses/${slug}/gateways/initialize/`;

export const CHECK_SITE_DOMAIN_AVAILABILITY_API = (site_domain) =>
  `${BASE_URL_V2}businesses/check-site-domain-availability/?site_domain=${site_domain}`;

// import memberships

export const IMPORT_MEMBERSHIPS_API = () =>
  `${BASE_URL_V2}crm/memberships/by-business-id/import/`;

// revel

export const REVAL_COST_API = () => `${REVAL_BASE_URL}cost`;

export const REVAL_COSTS_CATEGORY_API = () => `${REVAL_BASE_URL}costs-category`;

export const REVAL_PAYMENT_METHOD_API = () => `${REVAL_BASE_URL}payment-method`;
