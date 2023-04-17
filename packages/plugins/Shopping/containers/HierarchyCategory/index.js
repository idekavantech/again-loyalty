/* eslint-disable react-hooks/rules-of-hooks */
/**
 *
 * Category
 *
 */
/* eslint-disable no-nested-ternary */

import React, { memo, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Link from "next/link";
import Paper from "@material-ui/core/Paper";
import useTheme from "@material-ui/core/styles/useTheme";

import qs from "qs";
import Flickity from "@saas/components/Flickity";
import Section from "@saas/components/Section";
import CategoryPresentation from "@saas/components/CategoryPresentation";
import {
  makeSelectBusiness,
  makeSelectBusinessThemeColor,
  makeSelectBusinessWorkingHours,
  makeSelectFilteredDeals,
  makeSelectFilteredDealsPagination,
  makeSelectHierarchy,
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
import { getProducts } from "@saas/stores/business/actions";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";
import { isBusinessOpenNow } from "@saas/utils/helpers/isBusinessOpenNow";

import { findKey } from "@saas/utils/helpers/findKey";

import { slugify } from "@saas/utils/helpers/slugify";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import TreeCategoriesList from "../../components/TreeCategoriesList";
import Pagination from "@saas/components/Pagination";
import { APP_SHOPPINGPAGE_MODIFIERS_MODAL } from "@saas/stores/plugins/constants";
import Filters from "@saas/components/Filters";
import BreadCrumb from "@saas/components/BreadCrumb";
import LazyImage from "@saas/components/LazyImage";
import { CDN_BASE_URL } from "@saas/utils/api";
import Icon from "@saas/components/Icon";
import { CHEVRON } from "@saas/icons";

import EmptyResults from "./EmptyResults";
import { useRouter } from "next/router";
import { mockMenu, mockProducts } from "../../sections/constants";
import { GET_FILTERED_DEALS } from "@saas/stores/business/constants";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

const flickityOptions = {
  rightToLeft: true,
  groupCells: true,
  contain: true,
  cellAlign: "right",
  reloadOnUpdate: true,
  pageDots: false,
};
const categoryImageSizes = {
  mobile: 143,
  desktop: 205,
};
export function HierarchyCategory({
  _getProducts,
  themeColor,
  shoppingPluginData,
  increaseOrderItem,
  decreaseOrderItem,
  orders,
  hierarchy: businessHierarchy,
  products: businessDeals,
  pagination: businessPagination,
  workingHours,
  urlPrefix,
  isEditMode,
  isMobile,
  business,
  customization,
  isLoading,
}) {
  const hierarchy = isEditMode ? mockMenu : businessHierarchy;
  const { layout: { has_side_bar = true } = {} } = customization;
  const products = isEditMode
    ? mockProducts
    : businessDeals
    ? businessDeals["general"]
    : [];
  const pagination = isEditMode
    ? { pagesCount: 1, next: null, prev: null }
    : businessPagination["general"] || {};
  const theme = useTheme();
  const router = useRouter();
  const flkty = useRef(null);
  const dragging = useRef(false);
  const { id } = router.query;
  const _id = id && id.split("-")[0];
  const isDisabled =
    shoppingPluginData.data.is_open === false ||
    (!isBusinessOpenNow(workingHours) &&
      business?.is_open_out_of_working_hours !== true);

  const item = parseInt(_id) ? findKey(hierarchy, _id) : hierarchy;
  const { minWidth1024 } = useResponsive();

  const isDesktop = typeof isMobile === "boolean" ? !isMobile : minWidth1024;
  const filters = qs.parse(router.asPath.split(/\?/)[1], {
    ignoreQueryPrefix: true,
  });
  const isMainPage =
    !router.asPath.includes("/c/") || !router.asPath.split("/c/")[1];
  useEffect(() => {
    setTimeout(() => {
      const obj = {
        categories: item.categories,
        filters: {
          ...filters,
          conjoined: item.conjoined === undefined ? true : item.conjoined,
        },
      };
      _getProducts(obj);
    }, 0);
  }, [
    _id,
    filters.ordering,
    filters.available,
    filters.max_price,
    filters.min_price,
    filters.is_discounted,
    filters.page,
  ]);
  const hasHierarchy = hierarchy.children && hierarchy.children?.length;
  const categoryItemLink = (category) => {
    if (hasHierarchy) {
      if (category) {
        const slug =
          (category.seo && slugify(category.seo.slug)) ||
          slugify(category.name);
        return `${urlPrefix}/${SHOPPING_PLUGIN_URL}/c/${category.id}-${slug}`;
      } else return `${urlPrefix}/s`;
    }
  };
  let categoryId = router.asPath.includes("/c/")
    ? router.asPath.split("/c/")[1]
    : "";

  categoryId = categoryId.split("-")[0] || categoryId;
  const category = findKey(hierarchy, categoryId) || hierarchy;

  let items = [category];
  while (items[0].parent) {
    items.unshift(findKey(hierarchy, items[0].parent));
  }
  items = items.filter((_item) => _item.name);
  if (items.length) {
    items.unshift({ name: "All" });
  }

  return (
    <Paper
      id="category-container"
      className={`w-100 d-flex flex-1 ${id ? "has-breadcrumb" : ""}`}
      style={{ minHeight: "64vh" }}
      elevation={2}
    >
      {has_side_bar && (
        <div>
          {isDesktop ? (
            <Filters submitOnChange themeColor={themeColor} />
          ) : null}
        </div>
      )}
      <Section
        themeColor={themeColor}
        className="mb-5  w-100 flex-1 d-flex flex-column"
        id="deal"
      >
        <div className="py-1 ">
          <div className="mx-3">
            <BreadCrumb
              themeColor={themeColor}
              items={items}
              categoryItemLink={categoryItemLink}
            />
            <TreeCategoriesList
              isMobile={isMobile}
              hierarchy={hierarchy}
              themeColor={themeColor}
              pluginBaseUrl={shoppingPluginData.baseUrl.url}
              categoryItemLink={categoryItemLink}
            />
          </div>
        </div>
        {item?.children?.length ? (
          <div className="mb-5 container-shadow u-fontWeightBold u-fontLarge-r u-border-radius-8 mt-1 mx-3">
            {item.name && (
              <div className="px-4 py-3 u-text-black text-right">
                Subsidiaries{item.name}
              </div>
            )}
            <div className="d-flex flex-wrap justify-content-start">
              <Flickity
                dragging={dragging}
                flickityRef={flkty}
                options={flickityOptions} // takes flickity options {}
                className="w-100 px_50"
              >
                {item.children?.map((menuItem) => (
                  <Paper className="m-1 pb-2" key={menuItem.id}>
                    <Link
                      href={`${shoppingPluginData.baseUrl.url}/c/${
                        menuItem.id
                      }-${slugify(menuItem.name)}`}
                      className="u-relative u-background-tiramisoo"
                      style={{ borderRadius: 8 }}
                      onClick={(e) => {
                        if (dragging.current) e.preventDefault();
                      }}
                    >
                      <div className="position-relative align-self-center overflow-hidden u-border-top-left-radius-4 u-border-top-right-radius-4">
                        <LazyImage
                          src={
                            menuItem.image ||
                            `${CDN_BASE_URL}default_product.jpg`
                          }
                          width={
                            isDesktop
                              ? categoryImageSizes.desktop
                              : categoryImageSizes.mobile
                          }
                          height={
                            isDesktop
                              ? categoryImageSizes.desktop
                              : categoryImageSizes.mobile
                          }
                          alt={menuItem && menuItem.name}
                        />
                      </div>
                      <div className="mt-2" style={{ color: themeColor }}>
                        {menuItem && menuItem.name}
                      </div>
                      <div className="d-flex u-text-black align-items-center justify-content-center mt-2">
                        Products
                        <Icon
                          icon={CHEVRON}
                          color={theme.palette.text.primary}
                          angle={-90}
                          className="mr-1"
                        />
                      </div>
                    </Link>
                  </Paper>
                ))}
              </Flickity>
            </div>
          </div>
        ) : null}
        {!isLoading && products ? (
          products.length ? (
            <div className="mx-3 container-shadow mx-0 u-fontWeightBold u-fontLarge-r u-border-radius-8 mt-1 py-4">
              <CategoryPresentation
                isMock={isEditMode}
                isDesktop={isDesktop}
                hasFilterInLayout={isDesktop}
                category={{ ...category, products }}
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
              <Pagination pagination={pagination} themeColor={themeColor} />
            </div>
          ) : (
            <EmptyResults />
          )
        ) : (
          <div style={{ height: "100vh" }}>
            <LoadingIndicator />
          </div>
        )}
        {item?.extra_data?.richtext ? (
          <div
            className="mt-5 px-4 text-right"
            dangerouslySetInnerHTML={{
              __html: item?.extra_data?.richtext,
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
  hierarchy: makeSelectHierarchy(),
  products: makeSelectFilteredDeals(),
  isLoading: makeSelectLoading(GET_FILTERED_DEALS),
  pagination: makeSelectFilteredDealsPagination(),
  workingHours: makeSelectBusinessWorkingHours(),
  business: makeSelectBusiness(),
  urlPrefix: makeSelectUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
  return {
    increaseOrderItem: (product) => dispatch(addOrderItemToCart(product)),
    decreaseOrderItem: (product_id) => dispatch(decrementOrderItem(product_id)),
    _getProducts: (data, name) => dispatch(getProducts(data, name)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(HierarchyCategory);
