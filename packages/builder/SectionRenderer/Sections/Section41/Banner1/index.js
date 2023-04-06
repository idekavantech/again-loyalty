import React, { memo } from "react";
import AdminSection from "@saas/components/AdminSection";
import SectionLink from "../../../components/SectionLink";
import LazyImage from "@saas/components/LazyImage";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { isUrlExternal } from "@saas/utils/helpers/isUrlExternal";

function Banner1({
  isEditMode,
  isActive,
  _updateSection,
  isDragging,
  dragHandleProps,
  onClick,
  business,
  content,
  customization = {},
  isMobile,
}) {
  const {
    banner_1: {
      image: banner_1_image,
      alternative: banner_1_image_alt,
      title: banner_1_title,
      font_size: title_1_font_size,
      subtitle_font_size: subtitle_1_font_size,
      title_color: banner_1_title_color,
      subtitle: banner_1_subtitle,
      subtitle_color: banner_1_subtitle_color,
      link: banner_1_link,
      button_text: banner_1_button_text,
      button_text_color: banner_1_button_text_color,
      button_background: banner_1_button_background,
      text_background,
      background_color,
    },
    banner_2: {
      image: banner_2_image,
      alternative: banner_2_image_alt,
      title: banner_2_title,
      subtitle_font_size: subtitle_2_font_size,
      font_size: title_2_font_size,
      title_color: banner_2_title_color,
      subtitle: banner_2_subtitle,
      subtitle_color: banner_2_subtitle_color,
      link: banner_2_link,
      text_background: banner_2_text_background,
      button_text: banner_2_button_text,
      button_text_color: banner_2_button_text_color,
      button_background: banner_2_button_background,
    },
    banner_3: {
      image: banner_3_image,
      title: banner_3_title,
      subtitle_font_size: subtitle_3_font_size,
      font_size: title_3_font_size,
      title_color: banner_3_title_color,
      subtitle: banner_3_subtitle,
      subtitle_color: banner_3_subtitle_color,
      link: banner_3_link,
      text_background: banner_3_text_background,
      button_text: banner_3_button_text,
      button_text_color: banner_3_button_text_color,
      button_background: banner_3_button_background,
    },
  } = content;

  const {
    shows: {
      banner_1_show_title,
      banner_1_show_subtitle,
      banner_1_show_button,
      banner_1_show_all,
      banner_2_show_button,
      banner_2_show_subtitle,
      banner_2_show_title,
      banner_3_show_button,
      banner_3_show_subtitle,
      banner_3_show_title,
    },

    background: {
      background_type = "color",
      background_color_,
      opacity = 100,
      background_image,
    } = {},
  } = customization;
  const { minWidth768, maxWidth768 } = useResponsive();

  const titleFontSize1 =
    title_1_font_size === "extraSmall"
      ? ["0.8vw", "2.5vw", "0.5vw"]
      : title_1_font_size === "small"
      ? ["1.2vw", "3vw", "0.6vw"]
      : title_1_font_size === "medium"
      ? ["1.6vw", "3.5vw", "0.7vw"]
      : title_1_font_size === "large"
      ? ["2vw", "4vw", "0.8vw"]
      : ["2.4vw", "4.5vw", "1.1vw"];

  const titleFS1 = maxWidth768
    ? titleFontSize1[1]
    : isMobile
    ? titleFontSize1[2]
    : titleFontSize1[0];

  const subTitleFontSize1 =
    subtitle_1_font_size === "extraSmall"
      ? ["0.7vw", "2.5vw", "0.5vw"]
      : subtitle_1_font_size === "small"
      ? ["1vw", "3vw", "0.6vw"]
      : subtitle_1_font_size === "medium"
      ? ["1.3vw", "3.5vw", "0.7vw"]
      : subtitle_1_font_size === "large"
      ? ["1.7vw", "4vw", "0.8"]
      : ["2.1vw", "4.5vw", "1.1vw"];

  const subTitleFS1 = maxWidth768
    ? subTitleFontSize1[1]
    : isMobile
    ? subTitleFontSize1[2]
    : subTitleFontSize1[0];
  // //////////////////////////////////////////////////
  const titleFontSize2 =
    title_2_font_size === "extraSmall"
      ? ["0.7vw", "2.5vw", "0.5vw"]
      : title_2_font_size === "small"
      ? ["1.1vw", "3vw", "0.6vw"]
      : title_2_font_size === "medium"
      ? ["1.5vw", "3.5vw", "0.7vw"]
      : title_2_font_size === "large"
      ? ["1.9vw", "4vw", "0.8vw"]
      : ["2.3vw", "4.5vw", "1.1vw"];

  const titleFS2 = maxWidth768
    ? titleFontSize2[1]
    : isMobile
    ? titleFontSize2[2]
    : titleFontSize2[0];

  const subTitleFontSize2 =
    subtitle_2_font_size === "extraSmall"
      ? ["0.7vw", "2.5vw", "0.5vw"]
      : subtitle_2_font_size === "small"
      ? ["1vw", "3vw", "0.6vw"]
      : subtitle_2_font_size === "medium"
      ? ["1.3vw", "3.5vw", "0.7vw"]
      : subtitle_2_font_size === "large"
      ? ["1.7vw", "4vw", "0.8vw"]
      : ["2.1vw", "4.5vw", "1.1vw"];

  const subTitleFS2 = maxWidth768
    ? subTitleFontSize2[1]
    : isMobile
    ? subTitleFontSize2[2]
    : subTitleFontSize2[0];

  // //////////////////////////////////////////////////
  const titleFontSize3 =
    title_3_font_size === "extraSmall"
      ? ["0.7vw", "2.5vw", "0.5vw"]
      : title_3_font_size === "small"
      ? ["1.1vw", "3vw", "0.6vw"]
      : title_3_font_size === "medium"
      ? ["1.5vw", "3.5vw", "0.7vw"]
      : title_3_font_size === "large"
      ? ["1.9vw", "4vw", "0.8vw"]
      : ["2.3vw", "4.5vw", "1.1vw"];

  const titleFS3 = maxWidth768
    ? titleFontSize3[1]
    : isMobile
    ? titleFontSize3[2]
    : titleFontSize3[0];

  const subTitleFontSize3 =
    subtitle_3_font_size === "extraSmall"
      ? ["0.7vw", "4.5vw", "0.5vw"]
      : subtitle_3_font_size === "small"
      ? ["1vw", "4.5vw", "0.6vw"]
      : subtitle_3_font_size === "medium"
      ? ["1.3vw", "4.5vw", "0.7vw"]
      : subtitle_3_font_size === "large"
      ? ["1.8vw", "6vw", "0.8vw"]
      : ["2.2vw", "7vw", "1.1vw"];

  const subTitleFS3 = maxWidth768
    ? subTitleFontSize3[1]
    : isMobile
    ? subTitleFontSize3[2]
    : subTitleFontSize3[0];
  // //////////////////////////////////////////////////

  const businessAddress = business && business.get_vitrin_absolute_url;

  const isDesktop = typeof isMobile === "boolean" ? !isMobile : minWidth768;
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
            background_type === "color" ? background_color_ : "transparent",
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
      <div className="container px-0">
        <div className="d-flex flex-wrap text-center py-2">
          <SectionLink
            href={banner_1_link}
            isExternal={isUrlExternal(banner_1_link)}
            businessAddress={businessAddress}
            className={`${isDesktop ? "col-md-7 mb-md-0" : "col-12"} px-2 mb-1`}
          >
            <div className="d-flex u-border-radius-12 overflow-hidden h-100 w-100">
              <div
                className="position-relative col-4 px-0"
                style={{ backgroundColor: background_color }}
              >
                <div
                  style={{
                    width: `${banner_1_show_all ? "140%" : "100%"}`,
                    maxHeight: "55%",
                    minHeight: "35%",
                    left: `${banner_1_show_all ? "-60%" : "0"}`,
                    backgroundColor: `${
                      banner_1_show_all ? text_background : background_color
                    }`,
                  }}
                  className="px-2 u-border-radius-8 u-text-white d-flex align-items-center justify-content-center flex-column my-auto u-top-0 bottom-0 position-absolute z-index-2"
                >
                  <div className="m-auto">
                    {banner_1_show_title && (
                      <div
                        className="u-fontWeightBold"
                        style={{
                          fontSize:
                            title_1_font_size === undefined
                              ? isDesktop
                                ? 18
                                : 16
                              : titleFS1,
                          color: banner_1_title_color || "",
                        }}
                      >
                        {banner_1_title}
                      </div>
                    )}
                    {banner_1_show_subtitle && (
                      <div
                        className="mt-1"
                        style={{
                          fontSize:
                            subtitle_1_font_size === undefined
                              ? isDesktop
                                ? 16
                                : 14
                              : subTitleFS1,
                          color: banner_1_subtitle_color || "",
                        }}
                      >
                        {banner_1_subtitle}
                      </div>
                    )}

                    {banner_1_show_button && (
                      <div
                        className="u-border-radius-8 mt-2 u-text-white text-center py-1 px-2"
                        style={{
                          fontSize: isDesktop ? 14 : 12,
                          backgroundColor: banner_1_button_background,
                          fontWeight: 700,
                          color: banner_1_button_text_color || "",
                        }}
                      >
                        {banner_1_button_text}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <LazyImage
                  // width={
                  //   isDesktop
                  //     ? firstImageSize.desktop.width
                  //     : firstImageSize.mobile.width
                  // }
                  // height={
                  //   isDesktop
                  //     ? firstImageSize.desktop.height
                  //     : firstImageSize.mobile.height
                  // }
                  src={banner_1_image}
                  alt={banner_1_image_alt || business.revised_title}
                />
              </div>
            </div>
          </SectionLink>
          <div
            className={`${
              isDesktop
                ? "col-md-5 pr-md-0 flex-md-column"
                : "col-12 flex-column-reverse"
            } d-flex justify-content-between px-2`}
          >
            <SectionLink
              isExternal={isUrlExternal(banner_2_link)}
              href={banner_2_link}
              businessAddress={businessAddress}
              className="u-border-radius-12 overflow-hidden h-50 mb-1"
            >
              <div className="d-flex h-100 w-100">
                <div
                  className={`${
                    isDesktop ? "col-md-6" : "col-4"
                  } position-relative px-0`}
                  style={{ backgroundColor: banner_2_text_background }}
                >
                  <div
                    style={{
                      width: "80%",
                      height: "35%",
                    }}
                    className="u-text-white d-flex align-items-center justify-content-center flex-column m-auto left-0 right-0 u-top-0 bottom-0 position-absolute z-index-2"
                  >
                    {banner_2_show_title && (
                      <div
                        className="u-fontWeightBold"
                        style={{
                          fontSize:
                            title_2_font_size === undefined
                              ? isDesktop
                                ? 18
                                : 16
                              : titleFS2,
                          color: banner_2_title_color || "",
                        }}
                      >
                        {banner_2_title}
                      </div>
                    )}
                    {banner_2_show_subtitle && (
                      <div
                        className="mt-1"
                        style={{
                          fontSize:
                            subtitle_1_font_size === undefined
                              ? isDesktop
                                ? 16
                                : 14
                              : subTitleFS2,
                          color: banner_2_subtitle_color || "",
                        }}
                      >
                        {banner_2_subtitle}
                      </div>
                    )}
                    {banner_2_show_button && (
                      <div
                        className="u-border-radius-8 mt-2 u-text-white text-center py-1 px-2"
                        style={{
                          fontSize: isDesktop ? 14 : 12,
                          backgroundColor: banner_2_button_background,
                          color: banner_2_button_text_color || "",
                          fontWeight: 700,
                        }}
                      >
                        {banner_2_button_text}
                      </div>
                    )}
                  </div>
                </div>
                <LazyImage
                  // width={
                  //   isDesktop
                  //     ? otherImageSize.desktop.width
                  //     : otherImageSize.mobile.width
                  // }
                  // height={
                  //   isDesktop
                  //     ? otherImageSize.desktop.height
                  //     : otherImageSize.mobile.height
                  // }
                  src={banner_2_image}
                  alt={banner_2_image_alt || business.revised_title}
                />
              </div>
            </SectionLink>
            <SectionLink
              isExternal={isUrlExternal(banner_3_link)}
              href={banner_3_link}
              businessAddress={businessAddress}
              className={`u-border-radius-12 overflow-hidden h-50 ${
                isDesktop ? "" : "mb-1"
              }`}
            >
              <div className="d-flex h-100 w-100">
                <LazyImage
                  // width={
                  //   isDesktop
                  //     ? otherImageSize.desktop.width
                  //     : otherImageSize.mobile.width
                  // }
                  // height={
                  //   isDesktop
                  //     ? otherImageSize.desktop.height
                  //     : otherImageSize.mobile.height
                  // }
                  src={banner_3_image}
                  alt={banner_2_image_alt || business.revised_title}
                />
                <div
                  className={`${isDesktop ? "col-md-6" : "col-4"}`}
                  style={{ backgroundColor: banner_3_text_background }}
                >
                  <div
                    style={{
                      width: "80%",
                      height: "35%",
                    }}
                    className="u-text-white d-flex align-items-center justify-content-center flex-column m-auto left-0 right-0 u-top-0 bottom-0 position-absolute z-index-2"
                  >
                    {banner_3_show_button && (
                      <div
                        className="u-border-radius-8 u-text-white text-center py-1 px-2"
                        style={{
                          fontSize: isDesktop ? 14 : 12,
                          backgroundColor: banner_3_button_background,
                          color: banner_3_button_text_color || "",
                          fontWeight: 700,
                        }}
                      >
                        {banner_3_button_text}
                      </div>
                    )}
                    {banner_3_show_title && (
                      <div
                        className="mt-2 u-fontWeightBold"
                        style={{
                          fontSize:
                            title_3_font_size === undefined
                              ? isDesktop
                                ? 18
                                : 16
                              : titleFS3,
                          color: banner_3_title_color || "",
                        }}
                      >
                        {banner_3_title}
                      </div>
                    )}
                    {banner_3_show_subtitle && (
                      <div
                        className="mt-1"
                        style={{
                          fontSize:
                            subtitle_3_font_size === undefined
                              ? isDesktop
                                ? 16
                                : 14
                              : subTitleFS3,

                          color: banner_3_subtitle_color || "",
                        }}
                      >
                        {banner_3_subtitle}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SectionLink>
          </div>
        </div>
      </div>
    </AdminSection>
  );
}

export default memo(Banner1);
