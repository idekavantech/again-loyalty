/* eslint-disable react/no-array-index-key */

import React, { memo, useMemo } from "react";
import AdminSection from "@saas/components/AdminSection";
import LazyImage from "@saas/components/LazyImage";
import SectionLink from "../../../components/SectionLink";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import {
  HAS_EXTERNAL_LINK,
  HAS_INTERNAL_LINK,
} from "@saas/utils/constants/builderConstants";

function FeatureCard1({
  isEditMode,
  isActive,
  _updateSection,
  isDragging,
  dragHandleProps,
  onClick,
  themeColor,
  business,
  isMobile,
  content,
  customization = {},
}) {
  const {
    title: {
      value: title_value,
      underline_color_use_theme_color = true,
      color_use_theme_color = true,
      underline_color = "#000000",
      color = "#000000",
    },
    cards: { items = [] },
  } = content;
  const {
    title: { is_title_visible = true } = {},
    show_in_mobile: { direction = "vertical" } = {},
    background: {
      background_type = "color",
      background_color,
      opacity = 100,
      background_image,
    } = {},
  } = customization;
  const { maxWidth768 } = useResponsive();
  const businessAddress = business?.get_vitrin_absolute_url;
  const isPhoneMatches = typeof isMobile === "boolean" ? isMobile : maxWidth768;
  const itemSetting = useMemo(() => {
    const itemsLength = items.length;
    if (itemsLength === 5) {
      return {
        class: "col-2",
        imageWidthAndHeight: 60,
      };
    } else if (itemsLength === 4) {
      return {
        class: "col-3",
        imageWidthAndHeight: 70,
      };
    } else if (itemsLength === 3) {
      return {
        class: "col-4",
        imageWidthAndHeight: 80,
      };
    } else {
      return {
        class: "col-6",
        imageWidthAndHeight: 90,
      };
    }
  }, [items?.length, isPhoneMatches]);
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
      <div className={`d-flex py-5 ${!isPhoneMatches ? "container" : ""}`}>
        <div className="w-100 text-right">
          {is_title_visible && (
            <div className="position-relative d-flex mb-5 align-items-end justify-content-center u-height-36">
              <div className="position-absolute u-fontLarge u-fontWeightBold u-text-black d-inline-block">
                <div
                  className="px-3"
                  style={{ color: color_use_theme_color ? themeColor : color }}
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
              <div
                className="flex-1 mr-4 u-background-dust"
                style={{ height: 1 }}
              />
            </div>
          )}

          <div
            className={`d-flex justify-content-center align-items-start ${
              isPhoneMatches && direction === "vertical" ? "flex-wrap" : ""
            }`}
          >
            {items &&
              items.map((item) => {
                if (
                  item.image_action === HAS_EXTERNAL_LINK ||
                  item.image_action === HAS_INTERNAL_LINK ||
                  typeof item.image_action === "undefined"
                ) {
                  return (
                    <div
                      className={`d-flex flex-column justify-content-center align-items-center ${
                        isPhoneMatches && direction === "vertical"
                          ? "col-12 mb-3"
                          : itemSetting.class
                      }`}
                    >
                      <SectionLink
                        href={
                          item.image_action === HAS_INTERNAL_LINK
                            ? item.internal_link
                            : item.external_link
                        }
                        isExternal={item.image_action === HAS_EXTERNAL_LINK}
                        businessAddress={businessAddress}
                        className="d-flex flex-column justify-content-center align-items-center"
                      >
                        <div
                          className="u-border-radius-50-percent d-flex justify-content-center align-items-center"
                          style={{
                            backgroundColor:
                              (item.image_background ||
                                item.image_background === undefined) &&
                              themeColor,
                          }}
                        >
                          <LazyImage
                            width={
                              isPhoneMatches && direction === "horizontal"
                                ? itemSetting.imageWidthAndHeight
                                : 100
                            }
                            height={
                              isPhoneMatches && direction === "horizontal"
                                ? itemSetting.imageWidthAndHeight
                                : 100
                            }
                            src={item.image}
                            alt={item.alternative || business.revised_title}
                          />
                        </div>
                        <div
                          className="mt-4 u-text-black u-fontWeightBold text-center"
                          style={{
                            color: item.title_color_use_theme_color
                              ? themeColor
                              : item.title_color,
                          }}
                        >
                          {item.title}
                        </div>
                      </SectionLink>
                      {isPhoneMatches && direction !== "vertical" ? null : (
                        <div
                          className="text-justify u-pre-wrap text-center u-text-black mt-3 u-lineHeight-30"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        ></div>
                      )}
                    </div>
                  );
                } else {
                  return (
                    <div
                      className={`d-flex flex-column justify-content-center align-items-center ${
                        isPhoneMatches && direction === "vertical"
                          ? "col-12 mb-3"
                          : itemSetting.class
                      }`}
                    >
                      <div
                        className="u-border-radius-50-percent d-flex justify-content-center align-items-center"
                        style={{
                          backgroundColor:
                            (item.image_background ||
                              item.image_background === undefined) &&
                            themeColor,
                        }}
                      >
                        <LazyImage
                          width={
                            isPhoneMatches && direction === "horizontal"
                              ? itemSetting.imageWidthAndHeight
                              : 100
                          }
                          height={
                            isPhoneMatches && direction === "horizontal"
                              ? itemSetting.imageWidthAndHeight
                              : 100
                          }
                          src={item.image}
                          alt={item.alternative || business.revised_title}
                        />
                      </div>
                      <div
                        className="mt-4 u-text-black u-fontWeightBold text-center"
                        style={{
                          color: item.title_color_use_theme_color
                            ? themeColor
                            : item.title_color,
                        }}
                      >
                        {item.title}
                      </div>
                      {isPhoneMatches && direction !== "vertical" ? null : (
                        <div
                          className="text-justify u-pre-wrap text-center u-text-black mt-3 u-lineHeight-30"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        ></div>
                      )}
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </AdminSection>
  );
}

export default memo(FeatureCard1);
