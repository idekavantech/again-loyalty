/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from "immer";
import { HYDRATE } from "next-redux-wrapper";
import {
  SET_FORMS_DICTIONARY,
  SET_BUSINESS,
  SET_CRM_LABELS,
  SET_CRM_LABEL,
  SET_CRM_MEMBERSHIP,
  SET_CATEGORY,
  DEALS_SEARCHED,
  SET_DISCOUNT_CODES,
  SET_DEAL,
  SET_DEALS,
  SET_CRM_MEMBERSHIP_BY_ID,
  SET_REDIRECTS_MAP,
  SET_DEAL_CATEGORIES,
  SET_BRANCH_BUSINESS,
  SET_ALL_PAGE,
  SET_PRODUCT_LABELS,
  SET_BUSINESS_LABELS,
  SET_PAGES,
  SET_PAGE,
  SET_CREDIT_TRANSACTION,
  SET_SURVEY_TEMPLATE,
  SET_NEXT_PAGE_NUMBER,
  SET_CRM_POINT,
  SET_BLOG_PAGES,
  SET_NEXT_BLOG_PAGE_NUMBER,
} from "./constants";

// The initial state of the App
export const initialState = {
  business: null,
  deal: null,
  siteDomain: "",
  images: null,
  deal_categories: null,

  lightModifiers: [],
  CRMLabels: null,
  CRMLabelsMemberships: null,
  CRMMemberships: null,
  CRMMembershipById: null,
  dealsSearched: null,
  dealsSearchedPagination: null,
  redirectsMap: null,
  membershipsPagination: {},
  discountCodes: [],
  filteredDeals: {},
  filteredDealsPagination: {},
  is_branch: null,

  branchBusiness: null,
  allPages: [],
  product_labels: null,
  businessLabels: [],
  formsDictionary: null,
  pages: null,
  page: null,
  nextPageNum: 1,
  nextBlogPageNum: 1,
  pagesPagination: null,
  blogPagesPagination: null,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case HYDRATE:
        // Attention! This will overwrite client state! Real apps should use proper reconciliation.
        return { ...state, ...action.payload.business };
      case SET_SURVEY_TEMPLATE:
        draft.surveyTemplate = action.data;
        break;
      case SET_CREDIT_TRANSACTION:
        draft.creditTransaction = action.data;
        break;
      case SET_CRM_POINT:
        draft.crmPoint = action.data;
        break;
      case SET_PAGES:
        draft.pages = action.data;
        draft.pagesPagination = action.pagination;
        break;
      case SET_BLOG_PAGES:
        draft.blogPages = action.data;
        draft.blogPagesPagination = action.pagination;
        break;
      case SET_NEXT_BLOG_PAGE_NUMBER:
        draft.nextBlogPageNum = action.data;
        break;
      case SET_PAGE:
        draft.page = action.data;
        break;
      case SET_NEXT_PAGE_NUMBER:
        draft.nextPageNum = action.data;
        break;

      case SET_FORMS_DICTIONARY:
        draft.formsDictionary = {
          ...state.formsDictionary,
          [action.data.id]: action.data,
        };
        break;

      case SET_BUSINESS:
        draft.business = { ...draft.business, ...action.data.business };
        if (action.data.subdomain) {
          draft.siteDomain = action.data.subdomain;
        }
        draft.resource_labels = action.data.business.resource_labels;

        draft.is_branch = action.data.business.super_business;
        break;

      case SET_CRM_LABELS:
        draft.CRMLabels = action.data;
        break;

      case SET_REDIRECTS_MAP:
        draft.redirectsMap = action.data;
        break;

      case SET_CRM_LABEL:
        draft.CRMLabelsMemberships = state.CRMLabels.map((label) =>
          label.id === action.data.id
            ? {
                id: label.id,
                memberships: action.data.memberships,
              }
            : {
                id: label.id,
                memberships: [],
              }
        );
        draft.membershipsPagination = action.data.pagination;
        break;
      case SET_CRM_MEMBERSHIP:
        draft.CRMMemberships = action.data;
        draft.membershipsPagination = action.pagination;
        break;
      case SET_CRM_MEMBERSHIP_BY_ID:
        draft.CRMMembershipById = action.data;
        break;
      case SET_DEAL:
        draft.deal = action.data;
        break;
      case SET_CATEGORY: {
        const resourceLabels = [...state.resource_labels];
        const resourceLabelsIndex = resourceLabels.findIndex(
          (c) => +c.id === +action.data.id
        );
        resourceLabels[resourceLabelsIndex] = action.data.category;
        draft.resource_labels = resourceLabels;
        break;
      }
      case SET_DEAL_CATEGORIES:
        draft.resource_labels = action.data;
        break;
      case DEALS_SEARCHED:
        if (action.append)
          draft.dealsSearched = [...draft.dealsSearched, ...action.data];
        else draft.dealsSearched = action.data;
        draft.dealsSearchedPagination = action.pagination;
        break;
      case SET_DISCOUNT_CODES:
        draft.discountCodes = action.data;
        break;
      case SET_DEALS:
        draft.filteredDeals[action.name || "general"] = action.data;
        draft.filteredDealsPagination[action.name || "general"] =
          action.pagination;
        break;

      case SET_BRANCH_BUSINESS:
        draft.branchBusiness = action.data;
        break;
      case SET_ALL_PAGE:
        draft.allPages = action.data;

      case SET_PRODUCT_LABELS:
        draft.product_labels = action.data;
        break;
      case SET_BUSINESS_LABELS:
        draft.businessLabels = action.data;
    }
  });

export default appReducer;
