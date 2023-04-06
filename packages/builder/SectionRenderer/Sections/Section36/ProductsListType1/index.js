/* eslint-disable react/no-array-index-key */

import React, { memo, useEffect, useRef } from "react";
import AdminSection from "@saas/components/AdminSection";

import { slugify } from "@saas/utils/helpers/slugify";

import ProductCard from "@saas/components/ProductCard";
import useTheme from "@material-ui/core/styles/useTheme";
import { getProducts } from "@saas/stores/business/actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { makeSelectFilteredDeals } from "@saas/stores/business/selector";
import { SHOPPING_PLUGIN_URL } from "@saas/utils/constants/plugins";
import SectionLink from "../../../components/SectionLink";
import { mockProducts } from "../constant";
import Paper from "@material-ui/core/Paper";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import Flickity from "@saas/components/Flickity";
import LazyImage from "@saas/components/LazyImage";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function ProductsListType1({
  isEditMode,
  isActive,
  _updateSection,
  isDragging,
  dragHandleProps,
  onClick,
  business,
  _getProducts,
  deals,
  content,
  isMobile,
  loading,
  customization = {},
}) {
  const {
    title: {
      value: title_value,
      font_size: title_font_size,
      underline_color_use_theme_color,
      color_use_theme_color,
      underline_color,
      color,
    },
    category_id: { value: categoryId },
  } = content;
  const {
    slider_setting: { autoplay = false, timer = 3000, infinite = false } = {},
    background: {
      background_type = "color",
      background_color,
      opacity = 100,
      background_image,
    } = {},
  } = customization;
  const businessAddress = business.get_vitrin_absolute_url;
  const { maxWidth768, minWidth1024 } = useResponsive();
  const isDesktop = typeof isMobile === "boolean" ? !isMobile : minWidth1024;
  const theme = useTheme();
  useEffect(() => {
    if (categoryId) {
      setTimeout(() => {
        _getProducts({ categories: [categoryId] }, categoryId);
      }, 0);
    }
  }, [categoryId]);
  const flkty = useRef(null);
  const flickityOptions = {
    rightToLeft: true,
    pageDots: false,
    cellAlign: "right",
    freeScroll: true,
    contain: true,
    autoPlay: autoplay ? timer : false,
    wrapAround: infinite,
  };
  const dragging = useRef();
  useEffect(() => {
    if (infinite && !autoplay && deals) {
      flkty.current.next();
    }
  }, [infinite, autoplay, deals]);
  const titleFontSize1 =
    title_font_size === "extraSmall"
      ? ["0.8vw", "2.5vw", "0.5vw"]
      : title_font_size === "small"
      ? ["1.1vw", "3vw", "0.8vw"]
      : title_font_size === "medium"
      ? ["1.4vw", "3.5vw", "1.1vw"]
      : title_font_size === "large"
      ? ["1.7vw", "4vw", "1.4vw"]
      : ["2vw", "4.5vw", "1.7vw"];
  const titleFS1 = maxWidth768
    ? titleFontSize1[1]
    : isMobile
    ? titleFontSize1[2]
    : titleFontSize1[0];

  return (
    <AdminSection
      isEditMode={!!isEditMode}
      isDragging={isDragging}
      dragHandleProps={dragHandleProps}
      onClick={onClick}
      isActive={isActive}
      _updateSection={_updateSection}
    >
      <div
        style={{
          height: "100%",
          backgroundColor:
            background_type === "color" ? background_color : "transparent",
        }}
        className="position-absolute left-0 u-top-0 w-100 d-block"
      >
        {background_image && background_type === "image" && (
          <LazyImage
            src={background_image}
            style={{ opacity: opacity / 100 }}
          />
        )}
      </div>
      <div className="py-3">
        <Paper elevation={isDesktop ? 3 : 0} className="d-flex py-5 container">
          <div className="position-relative w-100 text-right">
            <div className="d-flex mb-5 align-items-end">
              <div className="u-fontLarge u-fontWeightBold u-text-black d-inline-block">
                <div
                  className="pl-4 pb-1 text-right"
                  style={{
                    color: color_use_theme_color
                      ? theme.palette.secondary.main
                      : color,
                    fontSize: title_font_size === undefined ? "" : titleFS1,
                  }}
                >
                  {title_value}
                </div>
                <div
                  className="mt-1"
                  style={{
                    backgroundColor: underline_color_use_theme_color
                      ? theme.palette.secondary.main
                      : underline_color,
                    height: 1,
                  }}
                />
              </div>
              <div
                className="flex-1 mr-4"
                style={{ height: 1, background: "#dfdfdf" }}
              />
            </div>
            <style
              dangerouslySetInnerHTML={{
                __html: `
              .flickity-button {
                display: ${!isDesktop && "none"};
              }
            `,
              }}
            />
            <Flickity
              className="section36-type-1-flickity-arrows"
              elementType="div"
              options={flickityOptions}
              disableImagesLoaded={false}
              dragging={dragging}
              flickityRef={flkty}
            >
              {categoryId && !loading
                ? deals?.[categoryId]?.map((item) => {
                    const slug =
                      (item.seo && item.seo.slug) ||
                      (item.title && slugify(item.title));
                    return (
                      <div
                        className={
                          isDesktop
                            ? "col-6 col-md-4 col-lg-3 col-xl-2 p-1"
                            : "col-6 p-1"
                        }
                        key={item.id}
                      >
                        <SectionLink
                          href={`/${SHOPPING_PLUGIN_URL}/products/${item.id}-${slug}`}
                          businessAddress={businessAddress}
                          style={{
                            width: "100%",
                          }}
                        >
                          <ProductCard
                            fixedWidth
                            className={
                              isDesktop
                                ? "mx-2 text-center digikala-product-card"
                                : "mx-2 text-center"
                            }
                            themeColor={theme.palette.secondary.main}
                            product={item}
                          />
                        </SectionLink>
                      </div>
                    );
                  })
                : mockProducts.map((product) => (
                    <div
                      style={{ backgroundColor: "white", borderRadius: 4 }}
                      className={`ml-2 d-block ${
                        isDesktop
                          ? "col-6 col-md-4 col-lg-3 col-xl-2 p-1"
                          : "col-6 p-1"
                      }`}
                      key={product.id}
                    >
                      <div className="mx-2 m-1 text-center">
                        <div className="digikala-product-card c-business-card-custom pt-0 pb-2">
                          <Skeleton
                            variant="heightAuto"
                            animation="wave"
                            className="aspect-ratio-box-1-1 aspect-ratio-box"
                          ></Skeleton>
                          <div className="direction-ltr">
                            <Skeleton
                              className="mt-2"
                              animation="wave"
                              width="30%"
                            ></Skeleton>
                          </div>

                          <Skeleton
                            className="mt-2"
                            animation="wave"
                            width="60%"
                          ></Skeleton>
                          <Skeleton
                            className="mt-2"
                            animation="wave"
                            width="80%"
                          ></Skeleton>
                        </div>
                      </div>
                    </div>
                  ))}
            </Flickity>
          </div>
        </Paper>
      </div>
    </AdminSection>
  );
}

const mapStateToProps = createStructuredSelector({
  deals: makeSelectFilteredDeals(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getProducts: (data, name) => dispatch(getProducts(data, name)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ProductsListType1);
