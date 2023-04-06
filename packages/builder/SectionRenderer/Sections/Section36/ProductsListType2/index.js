/* eslint-disable react/no-array-index-key */

import React, { memo, useEffect, useRef } from "react";

import AdminSection from "@saas/components/AdminSection";
import ProductCard from "@saas/components/ProductCard";
import SectionLink from "../../../components/SectionLink";
import useTheme from "@material-ui/core/styles/useTheme";
import { getProducts } from "@saas/stores/business/actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { makeSelectFilteredDeals } from "@saas/stores/business/selector";
import { mockProducts } from "../constant";
import Skeleton from "@material-ui/lab/Skeleton";
import Flickity from "@saas/components/Flickity";
import { useWindowSize } from "@saas/utils/hooks/useWindowSize";

import LazyImage from "@saas/components/LazyImage";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { SHOPPING_PLUGIN_URL } from "@saas/utils/constants/plugins";
import { slugify } from "@saas/utils/helpers/slugify";
import { makeSelectUrlPrefix } from "@saas/stores/plugins/selector";

function ProductsListType2({
  isEditMode,
  isActive,
  _updateSection,
  isDragging,
  dragHandleProps,
  onClick,
  business,
  _getProducts,
  deals,
  urlPrefix,
  content,
  isMobile,
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
  const theme = useTheme();
  const { maxWidth768, minWidth1024 } = useResponsive();
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
  const isDesktop = typeof isMobile === "boolean" ? !isMobile : minWidth1024;
  useEffect(() => {
    if (categoryId) {
      setTimeout(() => {
        _getProducts({ categories: [categoryId] }, categoryId);
      }, 0);
    }
  }, [categoryId]);

  const windowSize = useWindowSize();

  const flickity = useRef(null);
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
  const titleRef = useRef();
  useEffect(() => {
    if (infinite && !autoplay && deals) {
      flickity.current.next();
    }
  }, [infinite, autoplay, deals]);
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
      <div className="d-flex pb-4">
        <div className="w-100 position-absolute u-background-melo-grey-remove mt-1 c-business-card-background right-0" />
        <div
          className="d-flex w-100 product-carousel--outer text-right position-relative"
          style={{ paddingTop: 100 }}
        >
          <div
            ref={titleRef}
            style={{ color: theme.palette.text.disabled, maxWidth: "50%" }}
            className="d-flex flex-shrink-0 flex-column mb-5 align-items-center justify-content-center h-100 p-5"
          >
            <div className="u-fontExteraLarge mt-2 u-fontWeightBold d-inline-block">
              <div
                className="px-3"
                style={{
                  color: color_use_theme_color
                    ? theme.palette.text.disabled
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
                  height: 4,
                }}
              />
            </div>
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
          <div
            style={{
              minWidth: windowSize.width - titleRef?.current?.offsetWidth - 17,
            }}
          >
            <Flickity
              className="section36-type-2-flickity-arrows"
              elementType="div"
              options={flickityOptions}
              disableImagesLoaded={false}
              dragging={dragging}
              flickityRef={flickity}
            >
              {categoryId
                ? deals?.[categoryId]?.map((item) => {
                    const slug =
                      (item.seo && slugify(item.seo.slug)) ||
                      (item.title && slugify(item.title));
                    return (
                      <div
                        className="col-8 col-md-4 col-lg-3 col-xl-2 p-1"
                        key={item.link}
                      >
                        <SectionLink
                          href={`${urlPrefix}/${SHOPPING_PLUGIN_URL}/products/${item.id}-${slug}`}
                          businessAddress={businessAddress}
                          className="w-100"
                        >
                          <ProductCard
                            fixedWidth
                            className="text-center container-shadow u-border-radius-8 overflow-hidden"
                            themeColor={theme.palette.secondary.main}
                            product={item}
                            withPadding
                          />
                        </SectionLink>
                      </div>
                    );
                  })
                : mockProducts.map((product) => (
                    <div
                      className={`d-block ${
                        isDesktop
                          ? "col-6 col-md-4 col-lg-3 col-xl-2 p-1"
                          : "col-6 p-1"
                      }`}
                      key={product.id}
                    >
                      <div className="m-1 text-center">
                        <div className="text-center container-shadow u-border-radius-8 overflow-hidden">
                          <Skeleton
                            variant="heightAuto"
                            animation="wave"
                            className="aspect-ratio-box-1-1 aspect-ratio-box"
                          ></Skeleton>
                          <div className="p-1">
                            <div className="direction-ltr">
                              <Skeleton
                                className="mt-1"
                                animation="wave"
                                width="30%"
                              ></Skeleton>
                            </div>

                            <Skeleton
                              className="mt-1"
                              animation="wave"
                              width="60%"
                            ></Skeleton>
                            <Skeleton
                              className="mt-1"
                              animation="wave"
                              width="80%"
                            ></Skeleton>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </Flickity>
          </div>
        </div>
      </div>
    </AdminSection>
  );
}

const mapStateToProps = createStructuredSelector({
  deals: makeSelectFilteredDeals(),
  urlPrefix: makeSelectUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getProducts: (data, name) => dispatch(getProducts(data, name)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ProductsListType2);
