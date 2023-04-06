import React, { memo } from "react";
import AdminSection from "@saas/components/AdminSection";
import LazyImage from "@saas/components/LazyImage";
import SectionLink from "../../../components/SectionLink";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import {
  HAS_EXTERNAL_LINK,
  HAS_INTERNAL_LINK,
} from "@saas/utils/constants/builderConstants";

const UNDEFINED = "undefined";

function Banner2({
  isEditMode,
  isActive,
  _updateSection,
  isDragging,
  dragHandleProps,
  onClick,
  mock,
  themeColor,
  business,
  content,
  isMobile,
  customization,
}) {
  const {
    banner_1: {
      image: banner_1_image,
      title: banner_1_title,
      subtitle: banner_1_subtitle,
      subtitle_font_size: subtitle_1_font_size,
      font_size: title_1_font_size,
      alternative: banner_1_alternative,
      title_color: banner_1_title_color,
      subtitle_color: banner_1_subtitle_color,
      banner_use_theme_color: banner_1_use_theme,
      background_color: banner_1_background_color,
      link_type: banner_1_link_type,
      internal_link: banner_1_internal_link = content?.banner_1?.link,
      external_link: banner_1_external_link,
      having_banner_image_for_mobile: having_banner_1_image_for_mobile = false,
      banner_image_in_mobile: banner_1_image_in_mobile,
    },
    banner_2: {
      image: banner_2_image,
      alternative: banner_2_alternative,
      title: banner_2_title,
      subtitle: banner_2_subtitle,
      subtitle_font_size: subtitle_2_font_size,
      font_size: title_2_font_size,
      title_color: banner_2_title_color,
      subtitle_color: banner_2_subtitle_color,
      banner_use_theme_color: banner_2_use_theme,
      background_color: banner_2_background_color,
      link_type: banner_2_link_type,
      internal_link: banner_2_internal_link = content?.banner_2?.link,
      external_link: banner_2_external_link,
      having_banner_image_for_mobile: having_banner_2_image_for_mobile = false,
      banner_image_in_mobile: banner_2_image_in_mobile,
    },
  } = content;

  const {
    shows: {
      banner_1_show_title,
      banner_1_show_subtitle,
      banner_1_show_all,
      banner_2_show_title,
      banner_2_show_subtitle,
      banner_2_show_all,
    },
    heights: {
      mobile_height = "30vh",
      desktop_height = "40vh",
      mobile_ratio = "16:9",
      desktop_ratio = "16:9",
      use_ratio_height_in_mobile = false,
      use_ratio_height_in_desktop = false,
    } = {},
    background: {
      background_type = "color",
      background_color_,
      opacity = 100,
      background_image,
    } = {},
  } = customization;

  const { minWidth768, maxWidth768 } = useResponsive();
  const desktopClass = `aspect-ratio-box ${
    use_ratio_height_in_desktop
      ? `aspect-ratio-box-${desktop_ratio.split(":").join("-")}`
      : ""
  }`;
  const mobileClass = `aspect-ratio-box ${
    use_ratio_height_in_mobile
      ? `aspect-ratio-box-${mobile_ratio.split(":").join("-")}`
      : ""
  }`;

  const isDesktop = typeof isMobile === "boolean" ? !isMobile : minWidth768;

  const titleFontSize1 =
    title_1_font_size === "extraSmall"
      ? ["0.8vw", "3.5vw", "0.5vw"]
      : title_1_font_size === "small"
      ? ["1.1vw", "4vw", "0.6vw"]
      : title_1_font_size === "medium"
      ? ["1.5vw", "4.5vw", "0.7vw"]
      : title_1_font_size === "large"
      ? ["1.8vw", "5.5vw", "0.8vw"]
      : ["2.1vw", "6.7vw", "1.1vw"];

  const titleFS1 = maxWidth768
    ? titleFontSize1[1]
    : isMobile
    ? titleFontSize1[2]
    : titleFontSize1[0];

  const subTitleFontSize1 =
    subtitle_1_font_size === "extraSmall"
      ? ["0.7vw", "1.6vw", "0.5vw"]
      : subtitle_1_font_size === "small"
      ? ["0.9vw", "1.9vw", "0.6vw"]
      : subtitle_1_font_size === "medium"
      ? ["1.1vw", "2.2vw", "0.7vw"]
      : subtitle_1_font_size === "large"
      ? ["1.3vw", "2.5vw", "0.8"]
      : ["1.5vw", "2.9vw", "0.9vw"];

  const subTitleFS1 = maxWidth768
    ? subTitleFontSize1[1]
    : isMobile
    ? subTitleFontSize1[2]
    : subTitleFontSize1[0];
  // //////////////////////////////////////////////////////////
  const titleFontSize2 =
    title_2_font_size === "extraSmall"
      ? ["0.8vw", "3.5vw", "0.5vw"]
      : title_2_font_size === "small"
      ? ["1.1vw", "4vw", "0.6vw"]
      : title_2_font_size === "medium"
      ? ["1.5vw", "4.5vw", "0.7vw"]
      : title_2_font_size === "large"
      ? ["1.8vw", "5.5vw", "0.8vw"]
      : ["2.1vw", "6.7vw", "1.1vw"];

  const titleFS2 = maxWidth768
    ? titleFontSize2[1]
    : isMobile
    ? titleFontSize2[2]
    : titleFontSize2[0];

  const subTitleFontSize2 =
    subtitle_2_font_size === "extraSmall"
      ? ["0.7vw", "1.6vw", "0.5vw"]
      : subtitle_2_font_size === "small"
      ? ["0.9vw", "1.9vw", "0.6vw"]
      : subtitle_2_font_size === "medium"
      ? ["1.1vw", "2.2vw", "0.7vw"]
      : subtitle_2_font_size === "large"
      ? ["1.3vw", "2.5vw", "0.8"]
      : ["1.5vw", "2.9vw", "0.9vw"];

  const subTitleFS2 = maxWidth768
    ? subTitleFontSize2[1]
    : isMobile
    ? subTitleFontSize2[2]
    : subTitleFontSize2[0];

  const bannerLink = {
    banner_1: {
      [UNDEFINED]: banner_1_internal_link,
      [HAS_INTERNAL_LINK]: banner_1_internal_link,
      [HAS_EXTERNAL_LINK]: banner_1_external_link,
    },
    banner_2: {
      [UNDEFINED]: banner_2_internal_link,
      [HAS_INTERNAL_LINK]: banner_2_internal_link,
      [HAS_EXTERNAL_LINK]: banner_2_external_link,
    },
  };

  const bannerOneBackgroundColor = banner_1_use_theme
    ? themeColor
    : banner_1_background_color;
  const bannerTwoBackgroundColor = banner_2_use_theme
    ? themeColor
    : banner_2_background_color;

  const isLink = (link) => link === "/" || link === "";

  const hrefCreator = (link) => (link === "/" || link === "" ? "" : link);

  const businessAddress = business.get_vitrin_absolute_url;
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
      <div className="d-flex container px-0 flex-wrap text-center">
        <SectionLink
          href={hrefCreator(bannerLink.banner_1[banner_1_link_type])}
          isExternal={banner_1_link_type === HAS_EXTERNAL_LINK}
          businessAddress={businessAddress}
          className={`${isDesktop ? "col-md-6" : "col-12"} p-2`}
          style={{
            cursor: `${
              isLink(bannerLink.banner_1[banner_1_link_type])
                ? "pointer"
                : "initial"
            }`,
          }}
        >
          <div
            className={`d-flex u-border-radius-12 overflow-hidden position-relative h-100 ${
              isDesktop ? desktopClass : mobileClass
            }`}
          >
            {banner_1_show_all && (
              <div
                style={{
                  width: "60%",
                  maxWidth: 250,
                  height: "33%",
                  right: 0,
                  backgroundColor: bannerOneBackgroundColor,
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                }}
                className="u-text-white d-flex u-pointer-events-none align-items-center justify-content-center flex-column my-auto u-top-0 bottom-0 position-absolute z-index-2"
              >
                {banner_1_show_title && (
                  <div
                    className="u-fontWeightBold"
                    style={{
                      fontSize:
                        title_1_font_size === undefined
                          ? mock
                            ? 8
                            : 18
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
                          ? mock
                            ? 6
                            : 12
                          : subTitleFS1,
                      color: banner_1_subtitle_color || "",
                    }}
                  >
                    {banner_1_subtitle}
                  </div>
                )}
              </div>
            )}
            <img
              src={
                isDesktop
                  ? banner_1_image
                  : having_banner_1_image_for_mobile
                  ? banner_1_image_in_mobile
                  : banner_1_image
              }
              alt={banner_1_alternative || business.revised_title}
              style={{
                height: isDesktop
                  ? !use_ratio_height_in_desktop
                    ? desktop_height || "60vh"
                    : "100%"
                  : !use_ratio_height_in_mobile
                  ? mobile_height || "60vh"
                  : "100%",
                width: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        </SectionLink>
        <SectionLink
          href={hrefCreator(bannerLink.banner_2[banner_2_link_type])}
          businessAddress={businessAddress}
          isExternal={banner_2_link_type === HAS_EXTERNAL_LINK}
          className={`${isDesktop ? "col-md-6" : "col-12"} p-2`}
          style={{
            cursor: `${
              isLink(bannerLink.banner_2[banner_2_link_type])
                ? "pointer"
                : "initial"
            }`,
          }}
        >
          <div
            className={`d-flex u-border-radius-12 overflow-hidden position-relative h-100 ${
              isDesktop ? desktopClass : mobileClass
            }`}
          >
            {banner_2_show_all && (
              <div
                style={{
                  width: "60%",
                  maxWidth: 250,
                  height: "33%",
                  right: 0,
                  backgroundColor: bannerTwoBackgroundColor,
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                }}
                className="u-text-white u-pointer-events-none d-flex align-items-center justify-content-center flex-column my-auto u-top-0 bottom-0 position-absolute z-index-2"
              >
                {banner_2_show_title && (
                  <div
                    className="u-fontWeightBold"
                    style={{
                      fontSize:
                        title_2_font_size === undefined
                          ? mock
                            ? 8
                            : 18
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
                        subtitle_2_font_size === undefined
                          ? mock
                            ? 6
                            : 12
                          : subTitleFS2,
                      color: banner_2_subtitle_color || "",
                    }}
                  >
                    {banner_2_subtitle}
                  </div>
                )}
              </div>
            )}
            <img
              alt={banner_2_alternative || business.revised_title}
              style={{
                height: isDesktop
                  ? !use_ratio_height_in_desktop
                    ? desktop_height || "60vh"
                    : "100%"
                  : !use_ratio_height_in_mobile
                  ? mobile_height || "60vh"
                  : "100%",
                width: "100%",
                objectFit: "contain",
              }}
              src={
                isDesktop
                  ? banner_2_image
                  : having_banner_2_image_for_mobile
                  ? banner_2_image_in_mobile
                  : banner_2_image
              }
            />
          </div>
        </SectionLink>
      </div>
    </AdminSection>
  );
}

export default memo(Banner2);
