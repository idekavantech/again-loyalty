/* eslint-disable react/no-array-index-key */

import React, { memo, useEffect, useRef } from "react";
import AdminSection from "@saas/components/AdminSection";
import ProductCard from "@saas/components/ProductCard";
import SectionLink from "../../../components/SectionLink";
import useTheme from "@material-ui/core/styles/useTheme";
import Flickity from "@saas/components/Flickity";
import LazyImage from "@saas/components/LazyImage";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { HAS_EXTERNAL_LINK } from "@saas/utils/constants/builderConstants";

function SpecialProductsListType1({
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

  const flkty = useRef(null);
  const flickityOptions = {
    initialIndex: 1,
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
    if (infinite && !autoplay) {
      setTimeout(() => {
        flkty.current.next();
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
      <div className="d-flex py-5 container">
        <div className="position-relative w-100 text-right">
          <div className="d-flex px-3 mb-5 align-items-end">
            <div className="u-fontLarge u-fontWeightBold u-text-black d-inline-block">
              <div
                className="pl-4 pb-1 text-right"
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
            className="section37-type-1-flickity-arrows"
            elementType="div"
            options={flickityOptions}
            disableImagesLoaded={false}
            dragging={dragging}
            flickityRef={flkty}
          >
            {items &&
              items.map((item, i) => {
                return (
                  <div
                    className={
                      isDesktop
                        ? "col-6 col-md-4 col-lg-3 col-xl-2 px-1"
                        : "col-6 px-1"
                    }
                    key={item.id}
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
                        className="mx-2 text-center digikala-product-card"
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
                      />
                    </SectionLink>
                  </div>
                );
              })}
          </Flickity>
        </div>
      </div>
    </AdminSection>
  );
}

export default memo(SpecialProductsListType1);
