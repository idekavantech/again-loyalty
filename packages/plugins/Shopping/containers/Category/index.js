/* eslint-disable react-hooks/rules-of-hooks */
/**
 *
 * Category
 *
 */

import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Paper from "@material-ui/core/Paper";
import Section from "@saas/components/Section";
import CategoryPresentation from "@saas/components/CategoryPresentation";
import {
  makeSelectBusiness,
  makeSelectBusinessThemeColor,
  makeSelectBusinessWorkingHours,
  makeSelectFilteredDeals,
  makeSelectFilteredDealsPagination,
  makeSelectLabels,
  makeSelectResourceLabels,
} from "@saas/stores/business/selector";
import {
  makeSelectOrdersBySiteDomain,
  makeSelectPlugin,
  makeSelectUrlPrefix,
} from "@saas/stores/plugins/selector";
import {
  SHOPPING_PLUGIN,
  SHOPPING_PLUGIN_URL,
} from "@saas/utils/constants/plugins";
import { addOrderItemToCart, decrementOrderItem } from "../../actions";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";
import { isBusinessOpenNow } from "@saas/utils/helpers/isBusinessOpenNow";

import { slugify } from "@saas/utils/helpers/slugify";
import { makeSelectIsAuthenticated } from "@saas/stores/user/selector";
import { APP_SHOPPINGPAGE_MODIFIERS_MODAL } from "@saas/stores/plugins/constants";
import CategoriesList from "@saas/components/CategoriesList";
import { useRouter } from "next/router";
import { getCategory, getProducts } from "@saas/stores/business/actions";
import { mockCategories, mockProducts } from "../../sections/constants";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import Pagination from "@saas/components/Pagination";
import EmptyResults from "../HierarchyCategory/EmptyResults";

export function Category({
  themeColor,
  shoppingPluginData,
  increaseOrderItem,
  decreaseOrderItem,
  orders,
  workingHours,
  _getCategory,
  urlPrefix,
  isEditMode,
  isMobile,
  business,
  _categories,
  _getProducts,
  products: { general: products },
  pagination: businessPagination,
}) {
  const categories = useMemo(
    () =>
      isEditMode
        ? mockCategories
        : [{ title: "All", products }, ..._categories],
    [isEditMode, _categories, products]
  );
  const router = useRouter();
  const { id } = router.query;
  const _id = id && +id.split("-")[0];
  const { minWidth1024 } = useResponsive();
  const isDesktop = typeof isMobile === "boolean" ? !isMobile : minWidth1024;
  const [isDisabled, setDisabled] = useState(false);
  useEffect(() => {
    const hasDealControllPanel =
      shoppingPluginData.data.is_open === false ||
      (!isBusinessOpenNow(workingHours) &&
        business?.is_open_out_of_working_hours !== true);
    setDisabled(hasDealControllPanel);
  }, [
    shoppingPluginData,
    workingHours,
    business?.is_open_out_of_working_hours,
  ]);
  const page = router.query.page || 1;
  useEffect(() => {
    setTimeout(() => {
      if (_id) {
        if (categories.find((c) => c.id === +_id)) {
          _getCategory(_id);
        }
      } else if (!isEditMode && categories?.[0]?.id) {
        _getCategory(categories?.[0]?.id);
      } else if (!isEditMode && !categories?.[0]?.id) {
        _getProducts({ page });
      }
    }, 0);
  }, [_id, categories?.length, page]);
  const category = isEditMode
    ? { ...mockCategories[0], deals: mockProducts }
    : _id
    ? categories.find((c) => c.id === _id && c.products)
    : categories[0];
  const categoryItemLink = useCallback(
    (_category) => {
      if (!_category.id)
        return `${shoppingPluginData.urlPrefix}/${SHOPPING_PLUGIN_URL}`;
      const slug =
        (_category.slugifyseo && _category.seo.slug) ||
        slugify(_category.title);
      return `${shoppingPluginData.urlPrefix}/${SHOPPING_PLUGIN_URL}/l/${_category.id}-${slug}`;
    },
    [shoppingPluginData?.urlPrefix]
  );
  const pagination =
    isEditMode || _id ? null : businessPagination["general"] || null;
  console.log(category?.products);
  return (
    <Paper
      id="category-container"
      className="w-100"
      style={{ minHeight: "64vh" }}
      elevation={2}
    >
      <Section themeColor={themeColor} className="mb-5 " id="deal">
        <CategoriesList
          categories={categories}
          themeColor={themeColor}
          categoryItemLink={categoryItemLink}
          selectedId={_id}
        />
        {category?.products ? (
          category?.products.length === 0 ? (
            <EmptyResults />
          ) : (
            <>
              <CategoryPresentation
                isMock={isEditMode}
                isDesktop={isDesktop}
                category={category}
                pluginBaseUrl={shoppingPluginData.baseUrl.url}
                themeColor={themeColor}
                orders={orders}
                productCardOptions={{
                  link: (product) => {
                    const slug =
                      (product.seo && slugify(product.seo.slug)) ||
                      (product.title && slugify(product.title));
                    return `${urlPrefix}/${SHOPPING_PLUGIN_URL}/products/${product.id}-${slug}`;
                  },
                  increaseOrderItem: (product) => {
                    const hasVariation = product?.variants_data?.length;
                    if (hasVariation) {
                      const slug =
                        (product.seo && slugify(product.seo.slug)) ||
                        (product.title && slugify(product.title));
                      router.push(
                        `${urlPrefix}/${SHOPPING_PLUGIN_URL}/products/${product.id}-${slug}`
                      );
                    } else if (product?.variations[0]?.modifier_sets?.length) {
                      pushParamsToUrl({
                        [APP_SHOPPINGPAGE_MODIFIERS_MODAL]: true,
                        product: product.id,
                      });
                    } else {
                      increaseOrderItem(product);
                    }
                  },
                  decreaseOrderItem,
                  hasOrderControlPanel: !isDisabled,
                }}
              />
              {pagination ? (
                <Pagination pagination={pagination} themeColor={themeColor} />
              ) : null}
            </>
          )
        ) : (
          <div style={{ height: "200px", alignItems: "center" }}>
            <LoadingIndicator />
          </div>
        )}

        {category?.extra_data?.richtext ? (
          <div
            className="mt-5 px-4 text-right"
            dangerouslySetInnerHTML={{
              __html: category?.extra_data?.richtext,
            }}
          />
        ) : null}
      </Section>
    </Paper>
  );
}

const mapStateToProps = createStructuredSelector({
  themeColor: makeSelectBusinessThemeColor(),
  orders: makeSelectOrdersBySiteDomain(),
  shoppingPluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  isAuthenticated: makeSelectIsAuthenticated(),
  workingHours: makeSelectBusinessWorkingHours(),
  business: makeSelectBusiness(),
  urlPrefix: makeSelectUrlPrefix(),
  labels: makeSelectLabels(),
  _categories: makeSelectResourceLabels(),
  products: makeSelectFilteredDeals(),
  pagination: makeSelectFilteredDealsPagination(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getCategory: (id) => dispatch(getCategory(id)),
    _getProducts: (filters) => dispatch(getProducts({ filters })),
    increaseOrderItem: (product) => dispatch(addOrderItemToCart(product)),
    decreaseOrderItem: (product_id) => dispatch(decrementOrderItem(product_id)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Category);
