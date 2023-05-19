export const BASE_URL = "https://api-againloyalty.hectora.app/api/v1/";
export const BASE_URL_V2 = "https://api-againloyalty.hectora.app/api/v2/";
export const CMS_BASE_URL = "https://cms.vitrin.me";
export const CDN_BASE_URL =
  "https://hs3-cf.behtarino.com/static/images/behtarino-web/";
export const LOGIN_API = (slug) =>
  `${BASE_URL_V2}businesses/${slug}/vitrin-verification/`;
export const SET_PLUGIN_DATA_API = (slug) =>
  `${BASE_URL}businesses/${slug}/set_plugin_data/`;
export const VERIFY_API = `${BASE_URL_V2}jwt/`;
export const USER_API = `${BASE_URL}users/self/`;
export const LOGIN_BY_PHONE_API = `${BASE_URL_V2}users/phone-verification/call/`;
export const BUSINESS_CREATION_ROUTE_PASSED_API = (slug) =>
  `${BASE_URL}businesses/${slug}/creation_route_passed/`;
export const CREATE_AND_INITIALIZE_VITRIN_API = `https://api-againloyalty.hectora.app/api/v2/businesses/create-and-initialize/`;
export const CREATE_VITRIN_API = `https://api-againloyalty.hectora.app/api/v2/businesses/`;
export const CREATE_BEHTARINO_BUSINESS_API = `https://bck.behtarino.com/api/v1/businesses/by_reval_id/`;
export const FLAG_BEHTARINO_BUSINESS_API = (revalId) =>
  `https://bck.behtarino.com/api/v1/businesses/by_reval_id/${revalId}/flag_vitrin/`;

export const UPDATE_BEHTARINO_BUSINESS_API = `https://bck.behtarino.com/api/v1/business_edits/`;
export const UPDATE_BEHTARINO_BUSINESS_IMAGES_API = `https://bck.behtarino.com/api/v1/businesses/images/`;
export const DELETE_BEHTARINO_BUSINESS_IMAGES_API = (id) =>
  `https://bck.behtarino.com/api/v1/businesses/images/${id}/`;
export const UPLOAD_FILE_BEHTARINO_API = `https://bck.behtarino.com/api/v1/get_minio_url/`;

export const INITIALIZE_VITRIN_API = (slug) =>
  `https://api-againloyalty.hectora.app/api/v2/businesses/${slug}/initialize/`;
export const UPDATE_VITRIN_API = (slug) => `${BASE_URL}businesses/${slug}/`;
export const GET_VITRIN_CRM_JOURNEY_DATA_API = (slug) =>
  `${BASE_URL}businesses/${slug}/vitrin_crm_journey_data/`;
export const VITRIN_CRM_EVENT_API = (slug) =>
  `https://api-againloyalty.hectora.app/api/v2/businesses/${slug}/crm-event/`;

export const CHECK_SITE_DOMAIN = (domain) =>
  `${BASE_URL}businesses/${domain}/light_seo_by_site_domain/`;
export const TOTAL_GMV = `${BASE_URL}food_orders/total_gmv/`;
export const GET_USER_BUSINESS_API = `${BASE_URL}businesses/by_owner/`;
export const SEND_CUSTOM_EMAIL_API = `${BASE_URL}send_custom_email/`;
export const FILE_SERVER_URL_API = `${BASE_URL}get_minio_url/`;
export const GET_BUSINESSES_CATEGORIES_API = `${CMS_BASE_URL}/categories/`;
export const GET_VITRIN_UPDATES_API = `${CMS_BASE_URL}/vitrin-updates/`;
export const GET_CATEGORY_TEMPLATES_API = (id) =>
  `${CMS_BASE_URL}/templates/?categories=${id}`;
export const GET_TEMPLATE_API = (id) => `${CMS_BASE_URL}/templates/${id}`;
export const GET_PACKAGES_API = (id) =>
  `${CMS_BASE_URL}/packages?categories=${id}`;
export const CREATE_TRANSACTION_FOR_VITRIN_INSTALLATION = (slug) =>
  `${BASE_URL}businesses/${slug}/vitrin_activation_transaction/`;
export const TRANSACTION_API = (id, gateway) =>
  `${BASE_URL}transactions/${id}/${gateway}_gateway/`;
export const ACCEPT_EVENT_API = (slug) =>
  `${BASE_URL}businesses/${slug}/accept_vitrin_meeting_crm_event/`;
export const GET_TRANSACTION_API = (id) => `${BASE_URL}transactions/${id}/`;
export const GET_BUSINESS_ORDER_TRANSACTION_API = (id) =>
  `${BASE_URL_V2}business-order-transactions/${id}/`;
export const PAY_TRANSACTION_API = (id) =>
  `${BASE_URL_V2}business-order-transactions/${id}/pay-transaction/`;
export const FORMS_ITEM_API = (id) => `${BASE_URL}businesses/forms/${id}/`;
export const FORM_RESPONSE_API = (id, page) =>
  `${BASE_URL}businesses/forms/${id}/responses/?page=${page}`;
export const BUSINESS_LIGHT_BY_SITE_DOMAIN_API = (subDomain) =>
  `${BASE_URL}businesses/${subDomain}/light_by_site_domain/`;
