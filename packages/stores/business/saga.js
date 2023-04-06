/* eslint-disable camelcase */
/* eslint-disable indent */

import {
  call,
  fork,
  put,
  select,
  takeEvery,
  takeLatest,
} from "@redux-saga/core/effects";
import { removeFile, startLoading, stopLoading } from "../global/actions";
import request from "@saas/utils/request";
import {
  ALL_LABELS_API,
  ALL_RESOURCES_API,
  BUSINESS_BY_SLUG_API,
  BUSINESS_DEAL_CATEGORIES_API,
  BUSINESS_DISCOUNT_CODES_API,
  BUSINESS_LIGHT_BY_SITE_DOMAIN_API_V2,
  BUSINESS_REDIRECTS_MAP_API,
  CRM_CREDIT_TRANSACTIONS,
  DEALS_IMAGES_ITEM_API,
  FORM_RESPONSE_API,
  FORMS_ITEM_API,
  GET_PAGES_API,
  GET_SURVEY_TEMPLATE_API,
  LABELS_API,
  LABELS_ITEM_API,
  LABELS_ITEM_APPLY_DISCOUNT_API,
  LABELS_SALEABLE_ITEMS_API,
  MEMBERSHIPS_ITEM_API,
  PAGES_ITEM_API,
  RESOURCE_API,
  RESOURCES_ITEM_API,
  SUGGEST_EDIT_API,
  SUGGEST_EDIT_ITEM_API,
  UNAPPROVED_BUSINESS_EDITS_API,
  CRM_POINT_API,
} from "@saas/utils/api";
import {
  ADD_CREDIT_TRANSACTION,
  ADD_SECTION,
  CREATE_CATEGORY,
  CREATE_FORM_RESPONSE,
  DELETE_CATEGORY,
  DELETE_SECTION,
  GET_ALL_PAGE,
  GET_BRANCH_BUSINESS,
  GET_BUSINESS,
  GET_BUSINESS_LABELS,
  GET_CATEGORY,
  GET_CRM_MEMBERSHIP,
  GET_DISCOUNT_CODES,
  GET_FILTERED_DEALS,
  GET_FORMS_DICTIONARY,
  GET_PAGE,
  GET_PAGES,
  GET_PRODUCT,
  GET_PRODUCT_CATEGORIES,
  GET_PRODUCTS,
  GET_REDIRECTS_MAP,
  GET_SURVEY_TEMPLATE,
  SEARCH_DEALS,
  SELECT_TEMPLATE,
  SUGGEST_BUSINESS_EDIT,
  UPDATE_BUSINESS_REQUEST,
  UPDATE_BUSINESS_WORKING_HOUR_REQUEST,
  UPDATE_CATEGORY,
  UPDATE_SECTION,
  ADD_CRM_POINT,
  GET_BLOG_PAGES,
} from "./constants";
import {
  dealsSearched,
  setAllPages,
  setBranchBusiness,
  setBusiness,
  setBusinessBlogPages,
  setBusinessLabels,
  setBusinessPage,
  setBusinessPages,
  setCategory,
  setCreditTransaction,
  setDiscountCodes,
  setFormsDictionary,
  setMembership,
  setProduct,
  setProductCategories,
  setProductLabels,
  setProducts,
  setRedirectsMap,
  setSurveyTemplate,
} from "./actions";
import { setPlugins } from "../plugins/actions";
import { setSnackBarMessage } from "../ui/actions";
import {
  makeSelectBusiness,
  makeSelectBusinessNextBlogPageNumber,
  makeSelectBusinessNextPageNumber,
  makeSelectBusinessSlug,
  makeSelectBusinessThemeConfig,
  makeSelectSiteDomain,
} from "./selector";
import { removeParamsFromUrl } from "@saas/utils/helpers/removeParamsFromUrl";
import Router from "next/router";

import { getPages } from "@saas/utils/services/getPages";
import { makeSelectPlugin } from "../plugins/selector";

export function* getBusinessData() {
  try {
    yield put(startLoading());
    const subdomain = yield select(makeSelectSiteDomain());
    const {
      response: { data: business },
    } = yield call(
      request,
      BUSINESS_LIGHT_BY_SITE_DOMAIN_API_V2(subdomain),
      {},
      "GET"
    );
    yield put(setBusiness({ business }));
    yield put(setPlugins(business));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}
export function* getBusinessRedirectsMap(action) {
  try {
    yield put(startLoading());
    const site_domain = action.data;
    const {
      response: { data },
    } = yield call(request, BUSINESS_REDIRECTS_MAP_API(site_domain));
    yield put(setRedirectsMap(data));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* updateBusiness(action) {
  const { successMessage, failMessage, callback } = action;
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { meta },
    } = yield call(
      request,
      BUSINESS_BY_SLUG_API(action.data.slug || slug),
      action.data,
      "PATCH"
    );

    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setSnackBarMessage(
          successMessage || "تغییرات شما با موفقیت ذخیره شد.",
          "success"
        )
      );
      if (callback) {
        yield call(callback);
      }
      yield call(getBusinessData);
      yield put(removeFile());
    } else if (
      meta.detail &&
      meta.detail?.global_error_messages[0] ===
        "origins and destinations have intersections"
    )
      yield put(
        setSnackBarMessage("این ریدایرکت امکان پذیر نمی باشد.", "fail")
      );
    else
      yield put(
        setSnackBarMessage(failMessage || "ثبت تغییرات ناموفق بود!", "fail")
      );

    yield put(stopLoading());
  } catch (err) {
    yield put(
      setSnackBarMessage(failMessage || "ثبت تغییرات ناموفق بود!", "fail")
    );
    yield put(stopLoading());
  }
}

export function* updateBusinessWorkingHour(action) {
  const { data, label, isAllData } = action;
  const business = yield select(makeSelectBusiness());

  const workingHours = isAllData ? data : { ...business.working_hours };
  if (!isAllData) {
    workingHours[label] = data.map((shift) => ({
      to: `${shift.to}:00`,
      from: `${shift.from}:00`,
    }));
  }
  try {
    yield put(startLoading());
    const {
      response: { meta },
    } = yield call(
      request,
      BUSINESS_BY_SLUG_API(business.slug),
      { working_hours: workingHours },
      "PATCH"
    );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield call(getBusinessData);
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* createCategory(action) {
  const { title } = action.data;
  const { callback } = action;
  try {
    yield put(startLoading());
    const {
      response: { meta, data },
    } = yield call(request, LABELS_API, action.data, "POST");
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield call(getBusinessLabelsSaga);
      if (callback) {
        yield call(callback, data);
      }
      yield put(
        setSnackBarMessage(`برچسب ${title} با موفقیت اضافه شد.`, "success")
      );
    } else {
      if (action.callback)
        yield call(action.callback, "برچسب با این نام موجود است.");
      else
        yield put(setSnackBarMessage(`ثبت برچسب ${title} ناموفق بود!`, "fail"));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log("err", err);
    yield put(setSnackBarMessage(`ثبت برچسب ${title} ناموفق بود!`, "fail"));
    yield put(stopLoading());
  }
}

export function* getCategorySaga(action) {
  const { id } = action.data;
  try {
    yield put(startLoading());
    const {
      response: { meta, data },
    } = yield call(request, LABELS_SALEABLE_ITEMS_API(id));

    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setCategory(id, data));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getFilteredDeals(action) {
  yield put(setProducts(null, {}, action.name));
  try {
    const categories = action.data.categories?.reduce(
      (str, category) =>
        `${str}&label_id${
          action.data.filters && action.data.filters.conjoined
            ? `_conjoined`
            : ""
        }=${category}`,
      ""
    );
    const slug = yield select(makeSelectBusinessSlug());
    yield put(startLoading(GET_FILTERED_DEALS));
    const {
      response: { meta, data, pagination },
    } = action.data.categories?.length
      ? yield call(request, RESOURCES_ITEM_API(categories), {
          ...action.data.filters,
          ordering: `-available,${
            action.data.filters?.ordering
              ? `${action.data.filters?.ordering},`
              : ""
          }-priority,-id`,
        })
      : yield call(request, ALL_RESOURCES_API(slug), {
          ...action.data.filters,
          ordering: `-available,${
            action.data.filters?.ordering
              ? `${action.data.filters?.ordering},`
              : ""
          }-priority,-id`,
        });
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      const pagesCount = Math.ceil(pagination.count / 24);
      yield put(setProducts(data, { ...pagination, pagesCount }, action.name));
    }
    yield put(stopLoading(GET_FILTERED_DEALS));
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* updateCategory(action) {
  const { category, packagingPrice, discount } = action.data;
  const { id, title, seo, extra_data } = category;
  try {
    yield put(startLoading());

    if (discount || discount === 0)
      yield fork(
        request,
        LABELS_ITEM_APPLY_DISCOUNT_API(id),
        { percent: parseInt(discount) || 0 },
        "PATCH"
      );
    const _category = { title, seo, extra_data };
    if (packagingPrice || packagingPrice === 0)
      _category.packaging_price = parseInt(packagingPrice) || 0;
    const {
      response: { meta },
    } = yield call(request, LABELS_ITEM_API(id), _category, "PATCH");

    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setSnackBarMessage(
          `ویرایش برچسب ${title} با موفقیت انجام شد.`,
          "success"
        )
      );
      yield call(getBusinessData);
      Router.back();
    } else
      yield put(
        setSnackBarMessage(`ویرایش برچسب ${title} ناموفق بود!`, "fail")
      );

    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage(`ویرایش برچسب ${title} ناموفق بود!`, "fail"));
    yield put(stopLoading());
  }
}

export function* deleteCategory(action) {
  const { title, id } = action.data;
  try {
    yield put(startLoading());
    const {
      response: { meta },
    } = yield call(request, LABELS_ITEM_API(id), {}, "DELETE");
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(
        setSnackBarMessage(`برچسب ${title} با موفقیت حذف شد.`, "success")
      );
      yield call(getBusinessData);
      Router.back();
    } else
      yield put(setSnackBarMessage(`حذف برچسب ${title} ناموفق بود!`, "fail"));

    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage(`حذف برچسب ${title} ناموفق بود!`, "fail"));
    yield put(stopLoading());
  }
}

export function* getProductSaga(action) {
  try {
    yield put(startLoading());
    const { id } = action.data;

    const {
      response: { meta, data },
    } = yield call(request, RESOURCE_API(id, "?is_product=true"), {}, "GET");

    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setProduct(data));
    }

    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getProductCategoriesSaga(action) {
  try {
    yield put(startLoading());
    const { slug } = action.data;

    const {
      response: { meta, data },
    } = yield call(request, BUSINESS_DEAL_CATEGORIES_API(slug), {}, "GET");

    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setProductCategories(data));
    }

    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* deleteImageFromProduct(action) {
  try {
    yield put(startLoading());
    const { id, dealId } = action.data;
    const {
      response: { meta },
    } = yield call(request, DEALS_IMAGES_ITEM_API(id), {}, "DELETE");
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      const {
        response: { data: product },
      } = yield call(request, RESOURCE_API(dealId));
      yield put(setAdminProductImages(product?.images));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* updateSection(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const themeConfig = yield select(makeSelectBusinessThemeConfig());
    const business = yield select(makeSelectBusiness());
    const { sections_skeleton: sections } = themeConfig;
    const { data: updatedSection, index } = action;
    sections.splice(index, 1, updatedSection);
    const {
      response: { meta, data },
    } = yield call(
      request,
      BUSINESS_BY_SLUG_API(slug),
      { theme_config: { ...themeConfig, sections_skeleton: sections } },
      "PATCH"
    );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setSnackBarMessage("ویرایش بخش با موفقیت انجام شد", "success"));
      yield put(setBusiness({ business: { ...business, ...data } }));

      removeParamsFromUrl();
    } else yield put(setSnackBarMessage("ویرایش ناموفق بود!", "fail"));
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("ویرایش ناموفق بود!", "fail"));
    yield put(stopLoading());
  }
}

export function* deleteSection(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const themeConfig = yield select(makeSelectBusinessThemeConfig());
    const business = yield select(makeSelectBusiness());
    const { sections_skeleton: sections } = themeConfig;
    const editedSections = [...sections];
    const { index } = action;
    editedSections.splice(index, 1);
    const {
      response: { meta, data },
    } = yield call(
      request,
      BUSINESS_BY_SLUG_API(slug),
      { theme_config: { ...themeConfig, sections_skeleton: editedSections } },
      "PATCH"
    );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setSnackBarMessage("ویرایش با موفقیت انجام شد.", "success"));
      yield put(setBusiness({ business: { ...business, ...data } }));
    } else yield put(setSnackBarMessage("ویرایش ناموفق بود!", "fail"));
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("ویرایش ناموفق بود!", "fail"));
    yield put(stopLoading());
  }
}
export function* addSection(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const themeConfig = yield select(makeSelectBusinessThemeConfig());
    const business = yield select(makeSelectBusiness());
    const { sections_skeleton: sections } = themeConfig;
    const editedSections = [...sections];
    const { index, section } = action;
    if (index === "last") editedSections.push(section);
    else editedSections.splice(index, 0, section);
    const {
      response: { meta, data },
    } = yield call(
      request,
      BUSINESS_BY_SLUG_API(slug),
      { theme_config: { ...themeConfig, sections_skeleton: editedSections } },
      "PATCH"
    );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setSnackBarMessage("بخش جدید با موفقیت اضافه شد.", "success"));
      yield put(setBusiness({ business: { ...business, ...data } }));
    } else yield put(setSnackBarMessage("اضافه کردن بخش ناموفق بود!", "fail"));
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("اضافه کردن بخش ناموفق بود!", "fail"));
    yield put(stopLoading());
  }
}
export function* selectTemplate(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const themeConfig = yield select(makeSelectBusinessThemeConfig());
    const business = yield select(makeSelectBusiness());
    const { sections_skeleton: sections } = themeConfig;
    const { data: newSections } = action;
    const editedSections = [
      ...newSections,
      ...sections.map((s) => ({ ...s, is_active: false })),
    ];
    const {
      response: { meta, data },
    } = yield call(
      request,
      BUSINESS_BY_SLUG_API(slug),
      { theme_config: { ...themeConfig, sections_skeleton: editedSections } },
      "PATCH"
    );
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setSnackBarMessage("قالب با موفقیت انتخاب شد.", "success"));
      yield put(setBusiness({ business: { ...business, ...data } }));
      removeParamsFromUrl();
    } else yield put(setSnackBarMessage("انتخاب قالب ناموفق بود!", "fail"));
    yield put(stopLoading());
  } catch (err) {
    yield put(setSnackBarMessage("انتخاب قالب ناموفق بود!", "fail"));
    yield put(stopLoading());
  }
}
export function* suggestEdit(action) {
  try {
    const business = yield select(makeSelectBusiness());
    const { response } = yield call(request, UNAPPROVED_BUSINESS_EDITS_API, {
      business_slug: business.slug,
    });
    if (response?.data?.length)
      yield call(
        request,
        SUGGEST_EDIT_ITEM_API(response.data[0].id),
        { business: business.id, ...action.data },
        "PATCH"
      );
    else
      yield call(
        request,
        SUGGEST_EDIT_API,
        { business: business.id, ...action.data },
        "POST"
      );
  } catch (err) {
    console.log(err);
  }
}
export function* searchDealsSaga(action) {
  try {
    yield put(startLoading());
    const slug = yield select(makeSelectBusinessSlug());
    const {
      response: { data, pagination },
    } = yield call(request, ALL_RESOURCES_API(slug), action.data);
    if (data) {
      yield put(dealsSearched(data, pagination, action.append));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}
export function* getDiscountCodes() {
  const slug = yield select(makeSelectBusinessSlug());
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(request, BUSINESS_DISCOUNT_CODES_API(slug));

    if (data) {
      yield put(setDiscountCodes(data));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getBranchBusinessSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { meta, data },
    } = yield call(request, BUSINESS_BY_SLUG_API(action.data.slug));
    if (meta.status_code >= 200 && meta.status_code <= 300)
      yield put(setBranchBusiness(data));
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getPagesSaga(action) {
  try {
    yield put(startLoading());
    const data = yield call(
      getPages,
      GET_PAGES_API(action.data.slug, 1, action.data.isblog)
    );
    yield put(setAllPages(data));
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* getFormsDictionarySaga(action) {
  try {
    yield put(startLoading());
    const id = action.data;
    const {
      response: { meta, data },
    } = yield call(request, FORMS_ITEM_API(id), {}, "GET");

    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setFormsDictionary(data));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* createFormResponseSaga(action) {
  try {
    yield put(startLoading());

    const {
      response: { data },
    } = yield call(
      request,
      FORM_RESPONSE_API(action.data.form),
      { data: action.data.data, form: action.data.form },
      "post"
    );

    if (data) {
      yield put(setSnackBarMessage("فرم شما با موفقیت ثبت شد.", "success"));
      if (action.cb) {
        Router.push(action.cb);
      }
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getBusinessPagesSaga() {
  try {
    yield put(startLoading());
    const business = yield select(makeSelectBusiness());
    const nextPageNumber = yield select(makeSelectBusinessNextPageNumber());
    const {
      response: { meta, data, pagination },
    } = yield call(
      request,
      GET_PAGES_API(business.slug, nextPageNumber, false)
    );

    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setBusinessPages(data, pagination));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getBusinessBlogPagesSaga() {
  try {
    yield put(startLoading("blogPages"));
    const business = yield select(makeSelectBusiness());
    const nextPageNumber = yield select(makeSelectBusinessNextBlogPageNumber());
    const {
      response: { meta, data, pagination },
    } = yield call(request, GET_PAGES_API(business.slug, nextPageNumber, true));

    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setBusinessBlogPages(data, pagination));
    }
    yield put(stopLoading("blogPages"));
  } catch (err) {
    yield put(stopLoading("blogPages"));
  }
}
export function* getBusinessPageSaga(action) {
  try {
    yield put(startLoading());
    if (action.plugin) {
      const pluginData = yield select(makeSelectPlugin(action.plugin));
      yield put(setBusinessPage(pluginData.pages[action.id]));
    } else {
      const id = action.id;
      const {
        response: { meta, data },
      } = yield call(request, PAGES_ITEM_API(id), {}, "GET");

      if (meta.status_code >= 200 && meta.status_code <= 300) {
        yield put(setBusinessPage(data));
      }
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getSurveyTemplateSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(request, GET_SURVEY_TEMPLATE_API(action.data));
    if (data) {
      yield put(setSurveyTemplate(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}
export function* getMembershipSaga(action) {
  try {
    yield put(startLoading(GET_CRM_MEMBERSHIP));

    const {
      response: { data },
    } = yield call(request, MEMBERSHIPS_ITEM_API(action.id), {}, "GET");
    if (data) {
      yield put(setMembership(data));
    }

    yield put(stopLoading(GET_CRM_MEMBERSHIP));
  } catch (err) {
    yield put(stopLoading(GET_CRM_MEMBERSHIP));
  }
}

export function* getBusinessLabelsSaga() {
  try {
    const slug = yield select(makeSelectBusinessSlug());
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(request, ALL_LABELS_API(slug), {}, "GET");
    yield put(setBusinessLabels(data));
    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setProductLabels(data));
      yield put(setBusinessLabels(data));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* creditTransactions(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(
      request,
      CRM_CREDIT_TRANSACTIONS(action.id),
      { ...action.data, amount: parseInt(action.data?.amount) },
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

export function* addCrmPointSaga(action) {
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(request, CRM_POINT_API(action.id), action.data, "PATCH");
    if (data) {
      yield put(setCreditTransaction(data));
    }
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

const sagaFunctions = [
  takeLatest(GET_BUSINESS, getBusinessData),
  takeLatest(GET_REDIRECTS_MAP, getBusinessData),
  takeLatest(UPDATE_BUSINESS_REQUEST, updateBusiness),
  takeLatest(UPDATE_BUSINESS_WORKING_HOUR_REQUEST, updateBusinessWorkingHour),
  takeEvery(GET_CATEGORY, getCategorySaga),
  takeEvery(GET_PRODUCTS, getFilteredDeals),
  takeLatest(CREATE_CATEGORY, createCategory),
  takeLatest(UPDATE_CATEGORY, updateCategory),
  takeLatest(DELETE_CATEGORY, deleteCategory),
  takeLatest(UPDATE_SECTION, updateSection),
  takeLatest(DELETE_SECTION, deleteSection),
  takeLatest(ADD_SECTION, addSection),
  takeLatest(SUGGEST_BUSINESS_EDIT, suggestEdit),
  takeLatest(SEARCH_DEALS, searchDealsSaga),
  takeLatest(GET_DISCOUNT_CODES, getDiscountCodes),
  takeLatest(SELECT_TEMPLATE, selectTemplate),
  takeLatest(GET_PRODUCT, getProductSaga),
  takeLatest(GET_PRODUCT_CATEGORIES, getProductCategoriesSaga),
  takeLatest(GET_BRANCH_BUSINESS, getBranchBusinessSaga),
  takeLatest(GET_ALL_PAGE, getPagesSaga),

  takeLatest(GET_BUSINESS_LABELS, getBusinessLabelsSaga),
  takeEvery(GET_FORMS_DICTIONARY, getFormsDictionarySaga),
  takeLatest(CREATE_FORM_RESPONSE, createFormResponseSaga),
  takeLatest(GET_PAGES, getBusinessPagesSaga),
  takeLatest(GET_BLOG_PAGES, getBusinessBlogPagesSaga),
  takeLatest(GET_PAGE, getBusinessPageSaga),
  takeLatest(GET_SURVEY_TEMPLATE, getSurveyTemplateSaga),
  takeLatest(GET_CRM_MEMBERSHIP, getMembershipSaga),
  takeLatest(ADD_CREDIT_TRANSACTION, creditTransactions),
  takeLatest(ADD_CRM_POINT, addCrmPointSaga),
];
export default sagaFunctions;
