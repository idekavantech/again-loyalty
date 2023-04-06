/* eslint-disable camelcase */
import { businessSerializer } from "@saas/utils/helpers/businessSerializer";

import {
  SET_BUSINESS,
  GET_BUSINESS,
  UPDATE_BUSINESS_REQUEST,
  UPDATE_BUSINESS_WORKING_HOUR_REQUEST,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  DELETE_IMAGE_FROM_PRODUCT,
  UPDATE_IMAGE_FROM_PRODUCT,
  DELETE_IMAGE_FROM_VARIATION,
  UPDATE_SECTION,
  SUGGEST_BUSINESS_EDIT,
  SET_CRM_LABELS,
  SET_CRM_LABEL,
  SET_CRM_MEMBERSHIP,
  GET_CATEGORY,
  SET_CATEGORY,
  SEARCH_DEALS,
  DEALS_SEARCHED,
  GET_DISCOUNT_CODES,
  SET_DISCOUNT_CODES,
  DELETE_SECTION,
  ADD_SECTION,
  SELECT_TEMPLATE,
  GET_PRODUCTS,
  SET_DEALS,
  GET_PRODUCT,
  SET_DEAL,
  SET_BRANCH,
  SET_CRM_MEMBERSHIP_BY_ID,
  GET_REDIRECTS_MAP,
  SET_REDIRECTS_MAP,
  SET_DEAL_CATEGORIES,
  GET_PRODUCT_CATEGORIES,
  GET_BRANCH_BUSINESS,
  SET_BRANCH_BUSINESS,
  GET_ALL_PAGE,
  SET_ALL_PAGE,
  GET_BUSINESS_LABELS,
  SET_BUSINESS_LABELS,
  SET_PRODUCT_LABELS,
  GET_PRODUCT_LABELS,
  GET_FORMS_DICTIONARY,
  SET_FORMS_DICTIONARY,
  CREATE_FORM_RESPONSE,
  SET_NEXT_PAGE_NUMBER,
  SET_PAGE,
  GET_PAGE,
  SET_PAGES,
  GET_PAGES,
  GET_SURVEY_TEMPLATE,
  SET_SURVEY_TEMPLATE,
  GET_CRM_MEMBERSHIP,
  ADD_CREDIT_TRANSACTION,
  SET_CREDIT_TRANSACTION,
  ADD_CRM_POINT,
  SET_CRM_POINT,
  ADD_GIFT_CREDIT_TRANSACTION,
  SET_BLOG_PAGES,
  GET_BLOG_PAGES,
  SET_NEXT_BLOG_PAGE_NUMBER,
} from "./constants";

export function getBusinessPages() {
  return {
    type: GET_PAGES,
  };
}

export function getBusinessBlogPages() {
  return {
    type: GET_BLOG_PAGES,
  };
}

export function setBusinessPages(data, pagination) {
  return {
    type: SET_PAGES,
    data,
    pagination,
  };
}

export function setBusinessBlogPages(data, pagination) {
  return {
    type: SET_BLOG_PAGES,
    data,
    pagination,
  };
}

export function getBusinessPage(id, plugin) {
  return {
    type: GET_PAGE,
    id,
    plugin,
  };
}

export function setBusinessPage(data) {
  return {
    type: SET_PAGE,
    data,
  };
}

export function setNextPageNumber(data) {
  return {
    type: SET_NEXT_PAGE_NUMBER,
    data,
  };
}

export function setNextBlogPageNumber(data) {
  return {
    type: SET_NEXT_BLOG_PAGE_NUMBER,
    data,
  };
}

export function createFormResponse(response, form_id, cb) {
  return {
    type: CREATE_FORM_RESPONSE,
    data: { data: response, form: form_id },
    cb,
  };
}
export function getFormsDictionary(id) {
  return {
    type: GET_FORMS_DICTIONARY,
    data: id,
  };
}

export function setFormsDictionary(forms) {
  return {
    type: SET_FORMS_DICTIONARY,
    data: forms,
  };
}

export function setBusiness({ business, subdomain }) {
  return {
    type: SET_BUSINESS,
    data: { business: businessSerializer(business), subdomain },
  };
}

export function getBusiness() {
  return {
    type: GET_BUSINESS,
  };
}
export function setProductCategories(data) {
  return {
    type: SET_DEAL_CATEGORIES,
    data,
  };
}

export function getProductCategories(slug) {
  return {
    type: GET_PRODUCT_CATEGORIES,
    data: { slug },
  };
}

export function updateBusiness(
  data,
  successMessage,
  failMessage,
  callback,
  slug
) {
  return {
    type: UPDATE_BUSINESS_REQUEST,
    data: { ...data, slug },
    successMessage,
    failMessage,
    callback,
  };
}

export function suggestBusinessEdit(data) {
  return {
    type: SUGGEST_BUSINESS_EDIT,
    data,
  };
}
export function updateBusinessWorkingHour(data, label) {
  return {
    type: UPDATE_BUSINESS_WORKING_HOUR_REQUEST,
    data,
    label,
  };
}

export function getCategory(id) {
  return {
    type: GET_CATEGORY,
    data: { id },
  };
}

export function getProducts(data, name) {
  return {
    type: GET_PRODUCTS,
    data,
    name,
  };
}
export function setProducts(data, pagination, name) {
  return {
    type: SET_DEALS,
    data,
    pagination,
    name,
  };
}

export function getRedirectsMap(site_domain) {
  return {
    type: GET_REDIRECTS_MAP,
    data: site_domain,
  };
}
export function setRedirectsMap(data) {
  return {
    type: SET_REDIRECTS_MAP,
    data,
  };
}

export function setCategory(id, category) {
  return {
    type: SET_CATEGORY,
    data: { id, category },
  };
}
export function createCategory(category, businessId, callback) {
  return {
    type: CREATE_CATEGORY,
    data: { business: businessId, ...category },
    callback,
  };
}

export function updateCategory(category, packagingPrice, discount) {
  return {
    type: UPDATE_CATEGORY,
    data: { category, packagingPrice, discount },
  };
}

export function deleteCategory(data) {
  return {
    type: DELETE_CATEGORY,
    data,
  };
}

export function createProduct(product, images, callback) {
  return {
    type: CREATE_PRODUCT,
    data: { product, images },
    callback,
  };
}

export function getProduct(id) {
  return {
    type: GET_PRODUCT,
    data: { id },
  };
}

export function setProduct(deal) {
  return {
    type: SET_DEAL,
    data: deal,
  };
}

export function deleteImageFromVariation(
  imageId,
  variationId,
  resourceId,
  callback
) {
  return {
    type: DELETE_IMAGE_FROM_VARIATION,
    data: { imageId, variationId, resourceId },
    callback,
  };
}

export function deleteImageFromProduct(
  imageId,
  variationId,
  resourceId,
  callback
) {
  return {
    type: DELETE_IMAGE_FROM_PRODUCT,
    data: { imageId, variationId, resourceId },
    callback,
  };
}

export function updateImageFromProduct(imageId, order, resourceId, callback) {
  return {
    type: UPDATE_IMAGE_FROM_PRODUCT,
    data: { imageId, order, resourceId },
    callback,
  };
}

export function updateSection(data, index) {
  return {
    type: UPDATE_SECTION,
    data,
    index,
  };
}

export function deleteSection(index) {
  return {
    type: DELETE_SECTION,
    index,
  };
}

export function addSection(section, index) {
  return {
    type: ADD_SECTION,
    section,
    index,
  };
}

export function selectTemplate(data) {
  return {
    type: SELECT_TEMPLATE,
    data,
  };
}

export function setMembership(data) {
  return {
    type: SET_CRM_MEMBERSHIP_BY_ID,
    data,
  };
}

export function setCRMLabels(data) {
  return {
    type: SET_CRM_LABELS,
    data,
  };
}

export function setCRMLabelDetail(data) {
  return {
    type: SET_CRM_LABEL,
    data,
  };
}

export function setCRMMemberships(data, pagination) {
  return {
    type: SET_CRM_MEMBERSHIP,
    data,
    pagination,
  };
}

export function searchDeals(search, page = 1, append = false) {
  return {
    type: SEARCH_DEALS,
    data: { search, page },
    append,
  };
}

export function dealsSearched(data, pagination, append = false) {
  return {
    type: DEALS_SEARCHED,
    data,
    pagination,
    append,
  };
}
export function getDiscountCodes() {
  return {
    type: GET_DISCOUNT_CODES,
  };
}

export function setDiscountCodes(data) {
  return {
    type: SET_DISCOUNT_CODES,
    data,
  };
}

export function setBranch(data) {
  return {
    type: SET_BRANCH,
    data,
  };
}

export function getBranchBusiness(slug) {
  return {
    type: GET_BRANCH_BUSINESS,
    data: { slug },
  };
}
export function setBranchBusiness(data) {
  return {
    type: SET_BRANCH_BUSINESS,
    data,
  };
}

export function getAllPages(slug, isblog) {
  return {
    type: GET_ALL_PAGE,
    data: { slug, isblog },
  };
}

export function setAllPages(data) {
  return {
    type: SET_ALL_PAGE,
    data,
  };
}

export function getBusinessLabels(data) {
  return {
    type: GET_BUSINESS_LABELS,
    data,
  };
}

export function setProductLabels(data) {
  return {
    type: SET_PRODUCT_LABELS,
    data: data,
  };
}
export function getSurveyTemplate(data) {
  return {
    type: GET_SURVEY_TEMPLATE,
    data: data,
  };
}

export function setSurveyTemplate(data) {
  return {
    type: SET_SURVEY_TEMPLATE,
    data,
  };
}

export function getProductLabels(slug) {
  return {
    type: GET_PRODUCT_LABELS,
    data: { slug },
  };
}
export function setBusinessLabels(data) {
  return {
    type: SET_BUSINESS_LABELS,
    data,
  };
}
export function getCRMMembership(id) {
  return {
    type: GET_CRM_MEMBERSHIP,
    id,
  };
}

export function addCreditTransaction(id, data) {
  return {
    type: ADD_CREDIT_TRANSACTION,
    id,
    data,
  };
}
export function setCreditTransaction(data) {
  return {
    type: SET_CREDIT_TRANSACTION,
    data,
  };
}

export function addGiftTransaction(id, data) {
  return {
    type: ADD_GIFT_CREDIT_TRANSACTION,
    id,
    data,
  };
}

export function setGiftTransaction(data) {
  return {
    type: SET_GIFT_TRANSACTION,
    data,
  };
}

export function addCrmPoint(id, data) {
  return {
    type: ADD_CRM_POINT,
    id,
    data,
  };
}

export function setCrmPoint(data) {
  return {
    type: SET_CRM_POINT,
    data,
  };
}
