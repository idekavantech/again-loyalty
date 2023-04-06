/* eslint-disable react/no-array-index-key */

import React, { memo, useEffect, useRef } from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import AdminSection from "@saas/components/AdminSection";
import ProductCard from "@saas/components/ProductCard";
import SectionLink from "../../../components/SectionLink";
import Flickity from "@saas/components/Flickity";
import { useWindowSize } from "@saas/utils/hooks/useWindowSize";

import LazyImage from "@saas/components/LazyImage";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { HAS_EXTERNAL_LINK } from "@saas/utils/constants/builderConstants";

function SpecialProductsListType2({
  isEditMode,
  isActive,
  _updateSection,
  isDragging,
  dragHandleProps,
  onClick,
  themeColor,
  business,
  content,
  customization = {},
  isMobile,
}) {
  const {
    title: {
      value: title_value,
      underline_color_use_theme_color,
      color_use_theme_color,
      underline_color,
      color,
    },
    subtitle: {
      value: subtitle_value,
      color_use_theme_color: subtitle_color_use_theme_color,
      color: subtitle_color,
    },
    sections: { items = [] },
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
  const { minWidth1024 } = useResponsive();

  const isDesktop = typeof isMobile === "boolean" ? !isMobile : minWidth1024;

  const windowSize = useWindowSize();

  const flickity = useRef(null);
  const flickityOptions = {
    rightToLeft: true,
    initialIndex: 1,
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
    if (infinite && !autoplay) {
      setTimeout(() => {
        flickity.current.next();
      }, 1000);
    }
  }, [infinite, autoplay]);
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
            style={{
              color: theme.palette.text.disabled,
              maxWidth: !isDesktop && 130,
            }}
            className="d-flex flex-shrink-0 flex-column mb-5 align-items-center justify-content-center h-100 p-5"
          >
            <div
              className="u-fontLarge"
              style={{
                color: subtitle_color_use_theme_color
                  ? theme.palette.secondary.main
                  : subtitle_color,
              }}
            >
              {subtitle_value}
            </div>
            <div className="u-fontExteraLarge mt-2 u-fontWeightBold d-inline-block text-center">
              <div
                className="px-3"
                style={{
                  color: color_use_theme_color
                    ? theme.palette.secondary.main
                    : color,
                }}
              >
                {title_value}
              </div>
              <div
                className="mt-1"
                style={{
                  backgroundColor: underline_color_use_theme_color
                    ? themeColor
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
              className="section37-type-2-flickity-arrows "
              elementType="div"
              options={flickityOptions}
              disableImagesLoaded={false}
              dragging={dragging}
              flickityRef={flickity}
            >
              {items &&
                items.map((item, i) => (
                  <div
                    className={
                      isDesktop
                        ? "col-6 col-md-4 col-lg-3 col-xl-2 px-1"
                        : typeof isMobile === "boolean"
                        ? "col-2 px-1"
                        : "col-6 px-1"
                    }
                    key={item.link}
                  >
                    <SectionLink
                      isExternal={item.link_type === HAS_EXTERNAL_LINK}
                      href={
                        item.link_type === HAS_EXTERNAL_LINK
                          ? item.external_link
                          : item.internal_link
                      }
                      businessAddress={businessAddress}
                    >
                      <ProductCard
                        fixedWidth
                        className="mx-2 text-center container-shadow u-border-radius-8 overflow-hidden"
                        key={`item-${i}`}
                        themeColor={themeColor}
                        altImage={item.alternative || business.revised_title}
                        product={{
                          default_variation: {
                            initial_price: item.price,
                            discounted_price: item.discountedPrice,
                            main_image_thumbnail_url: item.image,
                          },
                          title: item.title,
                          description: item.subtitle,
                        }}
                        withPadding
                      />
                    </SectionLink>
                  </div>
                ))}
            </Flickity>
          </div>
        </div>
      </div>
    </AdminSection>
  );
}

export default memo(SpecialProductsListType2);
