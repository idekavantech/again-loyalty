import React, {memo} from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import AdminSection from "@saas/components/AdminSection";
import LazyImage from "@saas/components/LazyImage";
import {priceFormatter} from "@saas/utils/helpers/priceFormatter";
import SectionLink from "../../../components/SectionLink";
import {useResponsive} from "@saas/utils/hooks/useResponsive";
import {isUrlExternal} from "@saas/utils/helpers/isUrlExternal";
import {
  HAS_EXTERNAL_LINK,
  HAS_INTERNAL_LINK,
} from "@saas/utils/constants/builderConstants";

function Banner4({
                   isDragging,
                   dragHandleProps,
                   isActive,
                   _updateSection,
                   isEditMode,
                   onClick,
                   business,
                   content,
                   isMobile,
                   customization = {},
                 }) {
  const {
    banner_1: {
      image: banner_1_image,
      title: banner_1_title,
      font_size: title_1_font_size,
      subtitle_font_size: subtitle_1_font_size,
      subtitle: banner_1_subtitle,
      price: banner_1_price,
      button_text: banner_1_button_text,
      button_link: banner_1_button_link,
      texts_color: banner_1_texts_color,
      link_type: banner_1_link_type,
      internal_link: banner_1_internal_link,
      external_link: banner_1_external_link,
      banner_image_in_mobile: banner_1_mobile_image,
    },
    banner_2: {
      image: banner_2_image,
      title: banner_2_title,
      font_size: title_2_font_size,
      subtitle_font_size: subtitle_2_font_size,
      subtitle: banner_2_subtitle,
      price: banner_2_price,
      button_text: banner_2_button_text,
      button_link: banner_2_button_link,
      texts_color: banner_2_texts_color,
      link_type: banner_2_link_type,
      internal_link: banner_2_internal_link,
      external_link: banner_2_external_link,
      banner_image_in_mobile: banner_2_mobile_image,
    },
  } = content;
  const {minWidth768} = useResponsive();

  const isDesktop = typeof isMobile === "boolean" ? !isMobile : minWidth768;
  const {
    background: {
      background_type = "color",
      background_color_,
      opacity = 100,
      background_image,
    } = {},
  } = customization;
  const businessAddress = business.get_vitrin_absolute_url;
  const {maxWidth768} = useResponsive();

  const UNDEFINED = "undefined";

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

  const hrefCreator = (link) => (link === "/" || link === "" ? "" : link);

  const titleFontSize1 =
      title_1_font_size === "extraSmall"
          ? ["1vw", "2.5vw", "0.9vw"]
          : title_1_font_size === "small"
              ? ["1.4vw", "3vw", "1vw"]
              : title_1_font_size === "medium"
                  ? ["1.8vw", "3.5vw", "1.4vw"]
                  : title_1_font_size === "large"
                      ? ["2.2vw", "4vw", "2vw"]
                      : ["2.6vw", "4.5vw", "2.5vw"];

  const titleFS1 = maxWidth768
      ? titleFontSize1[1]
      : !isDesktop
          ? titleFontSize1[2]
          : titleFontSize1[0];

  const subTitleFontSize1 =
      subtitle_1_font_size === "extraSmall"
          ? ["0.8vw", "2.5vw", "0.8vw"]
          : subtitle_1_font_size === "small"
              ? ["1.1vw", "3vw", "1vw"]
              : subtitle_1_font_size === "medium"
                  ? ["1.5vw", "3.5vw", "1.2vw"]
                  : subtitle_1_font_size === "large"
                      ? ["2vw", "4vw", "1.4vw"]
                      : ["2.5vw", "4.5vw", "1.6vw"];

  const subTitleFS1 = maxWidth768
      ? subTitleFontSize1[1]
      : !isDesktop
          ? subTitleFontSize1[2]
          : subTitleFontSize1[0];
  // //////////////////////////////////////////////////
  const titleFontSize2 =
      title_2_font_size === "extraSmall"
          ? ["1vw", "2.5vw", "0.9vw"]
          : title_2_font_size === "small"
              ? ["1.4vw", "3vw", "1vw"]
              : title_2_font_size === "medium"
                  ? ["1.8vw", "3.5vw", "1.4vw"]
                  : title_2_font_size === "large"
                      ? ["2.2vw", "4vw", "2vw"]
                      : ["2.6vw", "4.5vw", "2.5vw"];

  const titleFS2 = maxWidth768
      ? titleFontSize2[1]
      : !isDesktop
          ? titleFontSize2[2]
          : titleFontSize2[0];

  const subTitleFontSize2 =
      subtitle_2_font_size === "extraSmall"
          ? ["0.8vw", "2.5vw", "0.8vw"]
          : subtitle_2_font_size === "small"
              ? ["1.1vw", "3vw", "1vw"]
              : subtitle_2_font_size === "medium"
                  ? ["1.5vw", "3.5vw", "1.2vw"]
                  : subtitle_2_font_size === "large"
                      ? ["2vw", "4vw", "1.4vw"]
                      : ["2.5vw", "4.5vw", "1.6vw"];

  const subTitleFS2 = maxWidth768
      ? subTitleFontSize2[1]
      : !isDesktop
          ? subTitleFontSize2[2]
          : subTitleFontSize2[0];

  return (
      <AdminSection
          isDragging={isDragging}
          dragHandleProps={dragHandleProps}
          isActive={isActive}
          _updateSection={_updateSection}
          isEditMode={!!isEditMode}
          onClick={onClick}
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
                  style={{opacity: opacity / 100}}
              />
          )}
        </div>
        <div className="w-100 container d-flex flex-wrap py-4">
          <div className={`${!isDesktop ? "col-12" : "col-md-6"} p-3`}>
            <SectionLink
                isExternal={banner_1_link_type === HAS_EXTERNAL_LINK}
                href={hrefCreator(bannerLink.banner_1[banner_1_link_type])}
            >
              <Paper
                  elevation={2}
                  className="position-relative"
                  style={{height: 300, border: "none"}}
              >
                <div className="w-100 position-absolute h-100 left-0 top-0 overflow-hidden">
                  <LazyImage
                      wrapperClassName="w-100 h-100"
                      hoverEffect
                      className="w-100 h-100 object-fit-cover"
                      src={!isDesktop ? banner_1_mobile_image : banner_1_image}
                      alt={business.revised_title}
                  />
                </div>

                <div className="w-100 d-flex" style={{pointerEvents: "none"}}>
                  <div className="col-6"/>

                  <div className="col-6 text-right direction-rtl inner-item position-relative pr-5">
                    <h3
                        className="my-4 mr-5"
                        style={{
                          fontSize: title_1_font_size === undefined ? 16 : titleFS1,
                          fontWeight: 700,
                          color: banner_1_texts_color || "",
                        }}
                    >
                      {banner_1_title}
                    </h3>
                    <div
                        className="my-4 mr-5"
                        style={{
                          fontSize:
                              subtitle_1_font_size === undefined ? "" : subTitleFS1,
                          color: banner_1_texts_color || "",
                        }}
                    >
                      {banner_1_subtitle}
                    </div>
                    {banner_1_price && (
                        <div
                            className="my-4 mr-5"
                            style={{color: banner_1_texts_color || ""}}
                        >
                          {priceFormatter(banner_1_price)} تومان
                        </div>
                    )}
                    <SectionLink
                        isExternal={isUrlExternal(banner_1_button_link)}
                        href={banner_1_button_link}
                        businessAddress={businessAddress}
                    >
                      {banner_1_button_text ? (
                          <Button
                              style={{pointerEvents: "fill"}}
                              className="my-4 mr-5 cursor-pointer"
                              size="small"
                              variant="contained"
                              color="secondary"
                          >
                            {banner_1_button_text}
                          </Button>
                      ) : null}
                    </SectionLink>
                  </div>
                </div>
              </Paper>
            </SectionLink>
          </div>
          <div className="p-3 col-12 col-md-6">
            <SectionLink
                isExternal={banner_2_link_type === HAS_EXTERNAL_LINK}
                href={hrefCreator(bannerLink.banner_2[banner_2_link_type])}
            >
              <Paper
                  elevation={2}
                  className="position-relative"
                  style={{height: 300, border: "none"}}
              >
                <div className="w-100 position-absolute h-100 left-0 top-0 overflow-hidden">
                  <LazyImage
                      wrapperClassName="w-100 h-100"
                      hoverEffect
                      className="w-100 h-100 object-fit-cover"
                      src={!isDesktop ? banner_2_mobile_image : banner_2_image}
                      alt={business.revised_title}
                  />
                </div>

                <div className="w-100 d-flex" style={{pointerEvents: "none"}}>
                  <div className="col-6"/>

                  <div className="col-6 text-right direction-rtl inner-item position-relative pr-5">
                    <h3
                        className="my-4 mr-5"
                        style={{
                          fontSize: title_2_font_size === undefined ? 16 : titleFS2,
                          fontWeight: 700,
                          color: banner_2_texts_color || "",
                        }}
                    >
                      {banner_2_title}
                    </h3>
                    <div
                        className="my-4 mr-5"
                        style={{
                          fontSize:
                              subtitle_2_font_size === undefined ? "" : subTitleFS2,
                          color: banner_2_texts_color || "",
                        }}
                    >
                      {banner_2_subtitle}
                    </div>
                    {banner_2_price && (
                        <div
                            className="my-4 mr-5"
                            style={{color: banner_2_texts_color || ""}}
                        >
                          {priceFormatter(banner_2_price)} تومان
                        </div>
                    )}
                    <SectionLink
                        href={banner_2_button_link}
                        businessAddress={businessAddress}
                        isExternal={isUrlExternal(banner_2_button_link)}
                    >
                      {banner_2_button_text ? (
                          <Button
                              style={{pointerEvents: "fill"}}
                              className="my-4 mr-5 cursor-pointer"
                              size="small"
                              variant="contained"
                              color="secondary"
                          >
                            {banner_2_button_text}
                          </Button>
                      ) : null}
                    </SectionLink>
                  </div>
                </div>
              </Paper>
            </SectionLink>
          </div>
        </div>
      </AdminSection>
  );
}

export default memo(Banner4);
