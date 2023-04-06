/* eslint-disable no-unused-expressions */
/* eslint-disable indent */

/**
 * The global state selectors
 */

import { createSelector } from "reselect";
import { initialState } from "./reducer";
import { isCurrentTimeAvailable } from "@saas/utils/helpers/isCurrentTimeAvailable";
import {
  VITRIN_TYPE_ECOMMERCE,
  VITRIN_TYPE_FOOD,
  VITRIN_TYPE_OTHER,
} from "./constants";

export const selectBusiness = (state) => state.business || initialState;
const makeSelectSurveyTemplate = () =>
  createSelector(selectBusiness, (state) => state.surveyTemplate);
const makeSelectCreditTransaction = () =>
  createSelector(selectBusiness, (state) => state.creditTransaction);
const makeSelectGiftTransaction = () =>
  createSelector(selectBusiness, (state) => state.giftTransaction);
const makeSelectCrmPoint = () =>
  createSelector(selectBusiness, (state) => state.crmPoint);
const makeSelectBusiness = () =>
  createSelector(selectBusiness, (state) => state.business);

const makeSelectBusinessRedirectsMap = () =>
  createSelector(selectBusiness, (state) => state.redirectsMap);

const makeSelectDeal = () =>
  createSelector(selectBusiness, (state) => state.deal);

const makeSelectResourceLabels = (isEditMode) =>
  createSelector(selectBusiness, (state) =>
    state.resource_labels.filter(
      (dc) =>
        isEditMode ||
        !dc?.extra_data ||
        !dc?.extra_data.shifts ||
        isCurrentTimeAvailable(dc?.extra_data.shifts)
    )
  );
const makeSelectHierarchy = () =>
  createSelector(selectBusiness, (state) =>
    state.business.menu && Object.keys(state.business.menu).length
      ? state.business.menu
      : {
          currentId: 1,
          id: 0,
          categories: [],
          children: [],
        }
  );
const makeSelectSiteDomain = () =>
  createSelector(selectBusiness, (state) => state.siteDomain);

const makeSelectBusinessCRMLabels = () =>
  createSelector(selectBusiness, (state) => state.CRMLabels);

const makeSelectBusinessCRMLabelsMemberships = () =>
  createSelector(selectBusiness, (state) => state.CRMLabelsMemberships);

const makeSelectBusinessCRMMemberships = () =>
  createSelector(selectBusiness, (state) => state.CRMMemberships);
const makeSelectBusinessCRMMembershipById = () =>
  createSelector(selectBusiness, (state) => state.CRMMembershipById);
const makeSelectBusinessMembershipsPagination = () =>
  createSelector(selectBusiness, (state) => state.membershipsPagination);

const makeSelectBusinessDiscountCodes = () =>
  createSelector(selectBusiness, (state) => state.discountCodes);

const makeSelectBusinessThemeColor = () =>
  createSelector(selectBusiness, (state) =>
    state.business
      ? state.business.theme_config && state.business.theme_config.theme_color
      : null
  );

const makeSelectBusinessSlug = () =>
  createSelector(selectBusiness, (state) => state.business.slug);

const makeSelectRevalId = () =>
  createSelector(selectBusiness, (state) => state.business.reval_id);

const makeSelectBusinessSiteDomain = () =>
  createSelector(selectBusiness, (state) => state.business.site_domain);

const makeSelectBusinessTitle = () =>
  createSelector(selectBusiness, (state) => state.business.revised_title);

const makeSelectBusinessPhone = () =>
  createSelector(selectBusiness, (state) => state.business.phone_zero_starts);

const makeSelectBusinessLocation = () =>
  createSelector(selectBusiness, (state) => ({
    latitude: state.business.latitude,
    longitude: state.business.longitude,
  }));

const makeSelectBusinessId = () =>
  createSelector(selectBusiness, (state) => state.business.id);
const makeSelectBusinessVitrinType = () =>
  createSelector(selectBusiness, (state) => {
    if (state.business.vitrin_type === null) return null;
    if (state.business.vitrin_type === VITRIN_TYPE_FOOD)
      return VITRIN_TYPE_FOOD;
    if (state.business.vitrin_type === VITRIN_TYPE_ECOMMERCE)
      return VITRIN_TYPE_ECOMMERCE;
    return VITRIN_TYPE_OTHER;
  });

const makeSelectBusinessCallToActionKeyword = () =>
  createSelector(
    selectBusiness,
    (state) =>
      (state.business && state.business.theme_config.menu_keyword_for_vitrin) ||
      state.business.menu_keyword_for_vitrin
  );

const makeSelectBusinessThemeConfig = () =>
  createSelector(
    selectBusiness,
    (state) => state.business && state.business.theme_config
  );

const makeSelectBusinessCoverImage = () =>
  createSelector(selectBusiness, (state) => state.business.cover_image_url);

const makeSelectBusinessWorkingHours = () =>
  createSelector(selectBusiness, (state) => state.business.work_hours);

const makeSelectDealsSearched = () =>
  createSelector(selectBusiness, (state) => state.dealsSearched);
const makeSelectDealsSearchedPagination = () =>
  createSelector(selectBusiness, (state) => state.dealsSearchedPagination);
const makeSelectFilteredDeals = () =>
  createSelector(selectBusiness, (state) => state.filteredDeals);
const makeSelectFilteredDealsPagination = () =>
  createSelector(selectBusiness, (state) => state.filteredDealsPagination);
const makeSelectIsBranch = () =>
  createSelector(selectBusiness, (state) => state.is_branch);

const makeSelectSuperBusiness = () =>
  createSelector(selectBusiness, (state) => state.business.super_business);

const makeSelectNavigationMenus = () =>
  createSelector(
    selectBusiness,
    (state) =>
      (state.business &&
        state.business.theme_config &&
        state.business.theme_config.navigation_menus) ||
      {}
  );
const makeSelectBranches = () =>
  createSelector(selectBusiness, (state) => state.business.branches);

const makeSelectLightSuperModifiers = () =>
  createSelector(selectBusiness, (state) => state.lightModifiers);

const makeSelectSuperDeal = () =>
  createSelector(selectBusiness, (state) => state.superDeal);

const makeSelectSuperCategories = (isEditMode) =>
  createSelector(
    selectBusiness,
    (state) =>
      state.super_deal_categories?.filter(
        (dc) =>
          isEditMode ||
          !dc.extra_data ||
          !dc.extra_data.shifts ||
          isCurrentTimeAvailable(dc.extra_data.shifts)
      ) || []
  );

const makeSelectSuperDealsSearched = () =>
  createSelector(selectBusiness, (state) => state.superDealsSearched);
const makeSelectSuperDealsSearchedPagination = () =>
  createSelector(selectBusiness, (state) => state.superDealsSearchedPagination);
const makeSelectFilteredSuperDeals = () =>
  createSelector(selectBusiness, (state) => state.filteredSuperDeals);
const makeSelectFilteredSuperDealsPagination = () =>
  createSelector(selectBusiness, (state) => state.filteredSuperDealsPagination);

const makeSelectLightSuperIngredients = () =>
  createSelector(selectBusiness, (state) => state.lightSuperIngredients);

const makeSelectBranchBusiness = () =>
  createSelector(selectBusiness, (state) => state.branchBusiness);

const makeSelectAllPages = () =>
  createSelector(selectBusiness, (state) => state.allPages);

const makeSelectLabels = (isEditMode) =>
  createSelector(selectBusiness, (state) =>
    state.resource_labels?.filter(
      (dc) =>
        isEditMode ||
        !dc?.extra_data ||
        !dc?.extra_data.shifts ||
        isCurrentTimeAvailable(dc?.extra_data.shifts)
    )
  );
const makeSelectBusinessLabels = () =>
  createSelector(selectBusiness, (state) => state.businessLabels);

const makeSelectFormsDictionary = () =>
  createSelector(selectBusiness, (state) => state.formsDictionary);

const makeSelectBusinessPages = () =>
  createSelector(selectBusiness, (state) => state.pages);

export const makeSelectBusinessBlogPages = () =>
  createSelector(selectBusiness, (state) => state.blogPages);

const makeSelectBusinessNextPageNumber = () =>
  createSelector(selectBusiness, (state) => state.nextPageNum);

const makeSelectBusinessNextBlogPageNumber = () =>
  createSelector(selectBusiness, (state) => state.nextBlogPageNum);

const makeSelectBusinessPagesPagination = () =>
  createSelector(selectBusiness, (state) => state.pagesPagination);

const makeSelectBusinessBlogPagesPagination = () =>
  createSelector(selectBusiness, (state) => state.blogPagesPagination);

const makeSelectBusinessPage = () =>
  createSelector(selectBusiness, (state) => state.page);
export {
  makeSelectCreditTransaction,
  makeSelectBusinessPages,
  makeSelectBusinessNextPageNumber,
  makeSelectBusinessBlogPagesPagination,
  makeSelectBusinessNextBlogPageNumber,
  makeSelectBusinessPagesPagination,
  makeSelectBusinessPage,
  makeSelectFormsDictionary,
  makeSelectBusinessRedirectsMap,
  makeSelectDeal,
  makeSelectDealsSearched,
  makeSelectBusiness,
  makeSelectResourceLabels,
  makeSelectBusinessThemeColor,
  makeSelectBusinessLocation,
  makeSelectBusinessCallToActionKeyword,
  makeSelectBusinessId,
  makeSelectBusinessTitle,
  makeSelectBusinessPhone,
  makeSelectBusinessSlug,
  makeSelectRevalId,
  makeSelectBusinessThemeConfig,
  makeSelectBusinessCoverImage,
  makeSelectBusinessSiteDomain,
  makeSelectBusinessWorkingHours,
  makeSelectBusinessCRMLabels,
  makeSelectBusinessCRMLabelsMemberships,
  makeSelectBusinessCRMMemberships,
  makeSelectBusinessMembershipsPagination,
  makeSelectSiteDomain,
  makeSelectBusinessDiscountCodes,
  makeSelectHierarchy,
  makeSelectFilteredDeals,
  makeSelectFilteredDealsPagination,
  makeSelectIsBranch,
  makeSelectNavigationMenus,
  makeSelectBusinessCRMMembershipById,
  makeSelectBranches,
  makeSelectDealsSearchedPagination,
  makeSelectSuperDeal,
  makeSelectSuperDealsSearched,
  makeSelectSuperCategories,
  makeSelectFilteredSuperDeals,
  makeSelectFilteredSuperDealsPagination,
  makeSelectSuperDealsSearchedPagination,
  makeSelectSuperBusiness,
  makeSelectBranchBusiness,
  makeSelectBusinessVitrinType,
  makeSelectLightSuperIngredients,
  makeSelectAllPages,
  makeSelectLabels,
  makeSelectBusinessLabels,
  makeSelectLightSuperModifiers,
  makeSelectSurveyTemplate,
  makeSelectGiftTransaction,
  makeSelectCrmPoint,
};
