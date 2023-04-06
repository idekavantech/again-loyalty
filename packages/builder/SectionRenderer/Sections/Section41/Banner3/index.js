import React, { memo, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import AdminSection from "@saas/components/AdminSection";
import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";
import SectionLink from "../../../components/SectionLink";
import LazyImage from "@saas/components/LazyImage";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { isUrlExternal } from "@saas/utils/helpers/isUrlExternal";

function Banner3({
  isDragging,
  dragHandleProps,
  isActive,
  _updateSection,
  isEditMode,
  onClick,
  business,
  content,
  isMobile,
}) {
  const {
    banner_1: {
      image: banner_1_image,
      title: banner_1_title,
      font_size: title_1_font_size,
      button_text: banner_1_button_text,
      button_link: banner_1_button_link,
      secondary_color: banner_1_secondary_color,
      primary_color: banner_1_primary_color,
    },
    banner_2: {
      image: banner_2_image,
      title: banner_2_title,
      font_size: title_2_font_size,
      subtitle_font_size: subtitle_2_font_size,
      subtitle: banner_2_subtitle,
      secondary_color: banner_2_secondary_color,
      primary_color: banner_2_primary_color,
      button_text: banner_2_button_text,
      button_link: banner_2_button_link,
    },
    banner_3: {
      image: banner_3_image,
      title: banner_3_title,
      subtitle_font_size: subtitle_3_font_size,
      font_size: title_3_font_size,
      subtitle: banner_3_subtitle,
      secondary_color: banner_3_secondary_color,
      primary_color: banner_3_primary_color,
      button_text: banner_3_button_text,
      button_link: banner_3_button_link,
    },
  } = content;
  const { maxWidth768 } = useResponsive();

  const titleFontSize1 =
    title_1_font_size === "extraSmall"
      ? ["0.8vw", "2.5vw", "0.9vw"]
      : title_1_font_size === "small"
      ? ["1.1vw", "3vw", "1vw"]
      : title_1_font_size === "medium"
      ? ["1.5vw", "3.5vw", "1.4vw"]
      : title_1_font_size === "large"
      ? ["2.2vw", "4vw", "2vw"]
      : ["2.9vw", "4.5vw", "2.5vw"];

  const titleFS1 = maxWidth768
    ? titleFontSize1[1]
    : isMobile
    ? titleFontSize1[2]
    : titleFontSize1[0];
  // //////////////////////////////////////////////////
  const titleFontSize2 =
    title_2_font_size === "extraSmall"
      ? ["0.8vw", "2.5vw", "0.9vw"]
      : title_2_font_size === "small"
      ? ["1.1vw", "3vw", "1.1vw"]
      : title_2_font_size === "medium"
      ? ["1.5vw", "3.5vw", "1.4vw"]
      : title_2_font_size === "large"
      ? ["2vw", "4vw", "2vw"]
      : ["2.5vw", "4.5vw", "2.5vw"];

  const titleFS2 = maxWidth768
    ? titleFontSize2[1]
    : isMobile
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
    : isMobile
    ? subTitleFontSize2[2]
    : subTitleFontSize2[0];
  // //////////////////////////////////////////////////
  const titleFontSize3 =
    title_3_font_size === "extraSmall"
      ? ["0.8vw", "2.5vw", "0.9vw"]
      : title_3_font_size === "small"
      ? ["1.1vw", "3vw", "1.1vw"]
      : title_3_font_size === "medium"
      ? ["1.5vw", "3.5vw", "1.4vw"]
      : title_3_font_size === "large"
      ? ["2vw", "4vw", "2vw"]
      : ["2.5vw", "4.5vw", "2.5vw"];

  const titleFS3 = maxWidth768
    ? titleFontSize3[1]
    : isMobile
    ? titleFontSize3[2]
    : titleFontSize3[0];

  const subTitleFontSize3 =
    subtitle_3_font_size === "extraSmall"
      ? ["0.8vw", "2.5vw", "0.8vw"]
      : subtitle_3_font_size === "small"
      ? ["1.1vw", "3vw", "1vw"]
      : subtitle_3_font_size === "medium"
      ? ["1.5vw", "3.5vw", "1.2vw"]
      : subtitle_3_font_size === "large"
      ? ["2vw", "4vw", "1.4vw"]
      : ["2.5vw", "4.5vw", "1.6vw"];

  const subTitleFS3 = maxWidth768
    ? subTitleFontSize3[1]
    : isMobile
    ? subTitleFontSize3[2]
    : subTitleFontSize3[0];

  const businessAddress = business.get_vitrin_absolute_url;
  const [isClientSide, setClientSide] = useState(false);
  useEffect(() => {
    setClientSide(true);
  }, []);
  return (
    <AdminSection
      isDragging={isDragging}
      dragHandleProps={dragHandleProps}
      isActive={isActive}
      _updateSection={_updateSection}
      isEditMode={!!isEditMode}
      onClick={onClick}
    >
      {isClientSide && (
        <div className="d-flex flex-wrap direction-ltr">
          <div
            className={`${
              isMobile ? "col-12" : "col-lg-6"
            } px-0 position-relative`}
            style={{
              background: banner_1_primary_color,
              color: banner_1_secondary_color,
            }}
          >
            <div
              style={{
                width: "50%",
                position: "absolute",
                top: "14%",
                right: "50%",
                transform: "translateX(50%)",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  fontSize: title_1_font_size === undefined ? 40 : titleFS1,
                  fontWeight: 900,
                  color: banner_1_secondary_color,
                }}
              >
                {banner_1_title}
              </div>
              <div className="my-3">
                {banner_1_button_text && (
                  <SectionLink
                    isExternal={isUrlExternal(banner_1_button_link)}
                    href={banner_1_button_link}
                    businessAddress={businessAddress}
                  >
                    <Button
                      variant="outlined"
                      size="large"
                      style={{
                        width: 200,
                        color: banner_1_secondary_color,
                        borderColor: banner_1_secondary_color,
                      }}
                    >
                      {banner_1_button_text}
                    </Button>
                  </SectionLink>
                )}
              </div>
            </div>
            <div className="w-100 h-100 overflow-hidden">
              <LazyImage src={banner_1_image} alt={business.revised_title} />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gridTemplateRows: `repeat(${2}, minmax(0, 1fr))`,
            }}
            className={`${isMobile ? "col-12" : "col-lg-6"} px-0`}
          >
            <div
              className="d-flex flex-wrap"
              style={{
                background: banner_2_primary_color,
                color: banner_2_secondary_color,
                aspectRatio: "2 / 1",
              }}
            >
              <div
                className="col-lg-6  px-0 d-flex flex-column justify-content-center align-items-center"
                style={{ flex: 1 }}
              >
                <div
                  className="my-1"
                  style={{
                    fontSize:
                      subtitle_2_font_size === undefined ? 13 : subTitleFS2,
                    color: banner_2_secondary_color
                      ? hexToRGBA(banner_2_secondary_color, 0.8)
                      : "#333333",
                  }}
                >
                  {banner_2_subtitle}
                </div>
                <div
                  className="my-1"
                  style={{
                    fontSize: title_2_font_size === undefined ? 24 : titleFS2,
                    fontWeight: 700,
                  }}
                >
                  {banner_2_title}
                </div>
                <div>
                  {banner_2_button_text && (
                    <SectionLink
                      isExternal={isUrlExternal(banner_2_button_link)}
                      href={banner_2_button_link}
                      businessAddress={businessAddress}
                    >
                      <Button
                        variant="outlined"
                        className="my-3"
                        style={{
                          color: banner_2_secondary_color,
                          borderColor: banner_2_secondary_color,
                        }}
                      >
                        {banner_2_button_text}
                      </Button>
                    </SectionLink>
                  )}
                </div>
              </div>
              <div
                className="col-lg-6 px-0 overflow-hidden h-100"
                style={{ flex: 1 }}
              >
                <LazyImage src={banner_2_image} alt={business.revised_title} />
              </div>
            </div>
            <div
              className="d-flex flex-wrap"
              style={{
                background: banner_3_primary_color,
                color: banner_3_secondary_color,
                aspectRatio: "2 / 1",
              }}
            >
              <div
                className="col-lg-6 px-0 overflow-hidden h-100"
                style={{ flex: 1 }}
              >
                <LazyImage src={banner_3_image} alt={business.revised_title} />
              </div>
              <div
                className="col-lg-6 px-0 d-flex flex-column justify-content-center align-items-center"
                style={{ flex: 1 }}
              >
                <div
                  className="my-1"
                  style={{
                    fontSize:
                      subtitle_3_font_size === undefined ? 13 : subTitleFS3,
                    color: banner_3_secondary_color
                      ? hexToRGBA(banner_3_secondary_color, 0.8)
                      : "#333333",
                  }}
                >
                  {banner_3_subtitle}
                </div>
                <div
                  className="my-1"
                  style={{
                    fontSize: title_3_font_size === undefined ? 24 : titleFS3,
                    fontWeight: 700,
                  }}
                >
                  {banner_3_title}
                </div>
                <div>
                  {banner_3_button_text && (
                    <SectionLink
                      href={banner_3_button_link}
                      businessAddress={businessAddress}
                    >
                      <Button
                        variant="outlined"
                        className="my-3"
                        style={{
                          color: banner_3_secondary_color,
                          borderColor: banner_3_secondary_color,
                        }}
                      >
                        {banner_3_button_text}
                      </Button>
                    </SectionLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminSection>
  );
}

export default memo(Banner3);
