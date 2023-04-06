import React, { memo } from "react";
import AdminSection from "@saas/components/AdminSection";
import LazyImage from "@saas/components/LazyImage";
import InnerHTML from "dangerously-set-html-content";

const videoPlaceholder = `/images/Play.png`;
import { useResponsive } from "@saas/utils/hooks/useResponsive";


function Video1({
  isDragging,
  dragHandleProps,
  isActive,
  _updateSection,
  isEditMode,
  onClick,
  content,
  customization,
  themeColor,
  isMobile,
}) {
  const { maxWidth768 } = useResponsive();

  const {
    description_text: {
      value: description_value,
      font_size: description_font_size,
      use_theme_color: description_use_theme_color,
      color: description_color,
    } = {},

    title: {
      value: title_value,
      font_size: title_font_size,
      use_theme_color: title_use_theme_color,
      color: title_color,
    } = {},

    video: { value },
  } = content;

  const {
    showcases: {
      title: is_title_visible,
      description: is_description_visible,
    } = {},
    section_size: { main_width = "w-100" } = {},
    content_location: { value: location } = { value: "center" },
    background: {
      background_type = "image",
      background_image,
      color: background_color,
      opacity = 100,
      should_upload_seperate_image_for_mobile = false,
      mobile_background_image,
    } = {},
  } = customization;

  const contentTextAlign =
    location === "center_right" || location === "bottom_right"
      ? "right"
      : "center";
  const contentTop =
    location === "top_center"
      ? "0"
      : location === "bottom_right" || location === "bottom_center"
      ? "100%"
      : "50%";
  const contentLeft =
    location === "bottom_right" || location === "center_right" ? "100%" : "50%";

  const textMarginRight =
    location === "center" ||
    location === "top_center" ||
    location === "bottom_center"
      ? "auto"
      : "0";

  const textMarginLeft =
    location === "center" ||
    location === "top_center" ||
    location === "bottom_center"
      ? "auto"
      : "0";

  const titleFontSize =
    title_font_size === "small"
      ? ["2.4vw", "5.5vw", "1.6vw"]
      : title_font_size === "medium"
      ? ["3.3vw", "7vw", "2.4vw"]
      : ["4.5vw", "9vw", "4vw"];

  const descriptionFontSize =
    description_font_size === "small"
      ? ["1.4vw", "3.3vw", ".7vw"]
      : description_font_size === "medium"
      ? ["1.6vw", "3.6vw", "1vw"]
      : ["2vw", "4vw", "1.2vw"];

  const containerMargin =
    main_width === "container" && (maxWidth768 || isMobile)
      ? "0 5%"
      : main_width === "container" && !(maxWidth768 || isMobile)
      ? "0 10%"
      : "0";

  const backgroundColor = background_type === "color" ? background_color : "";

  // Font Size
  const titleFS = maxWidth768
    ? titleFontSize[1]
    : isMobile
    ? titleFontSize[2]
    : titleFontSize[0];

  const descriptionFS = maxWidth768
    ? descriptionFontSize[1]
    : isMobile
    ? descriptionFontSize[2]
    : descriptionFontSize[0];

  const titleWidth = maxWidth768 || isMobile ? "80%" : "50%";
  const descriptionWidth = maxWidth768 || isMobile ? "90%" : "80%";

  const width = value?.match(/(width\s*=\s*["'](.*?)["'])/)?.[2] || 2;
  const height = value?.match(/(height\s*=\s*["'](.*?)["'])/)?.[2] || 1;
  const ratio = (height / width) * 100;
  const _isMobile = typeof isMobile === "boolean" ? isMobile : maxWidth768;
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
          backgroundColor: backgroundColor,
        }}
      >
        {(background_image || mobile_background_image) &&
          background_type === "image" && (
            <div className="position-absolute left-0 u-top-0 h-100 w-100 d-block">
              <LazyImage
                src={
                  should_upload_seperate_image_for_mobile && _isMobile
                    ? mobile_background_image
                    : background_image
                }
                style={{ opacity: opacity / 100 }}
              />
            </div>
          )}

        <div
          style={{
            margin: containerMargin,
            padding: _isMobile ? "32px 5%" : "48px 0.1%",
          }}
        >
          <div
            className="position-relative"
            style={{
              overflow: "hidden",
            }}
          >
            <div
              className="container"
              style={{
                textAlign: contentTextAlign,
                top: contentTop,
                left: contentLeft,
              }}
            >
              <div className="px-2 d-flex flex-column align">
                {is_title_visible ? (
                  <div
                    id="theme_1_title"
                    style={{
                      marginRight: textMarginRight,
                      marginLeft: textMarginLeft,
                      marginBottom: "15px",
                      maxWidth: titleWidth,
                      wordBreak: "break-word",
                      fontSize: titleFS,
                      fontWeight: "400",
                      color: title_use_theme_color ? themeColor : title_color,
                    }}
                    className=""
                    dangerouslySetInnerHTML={{ __html: title_value || "" }}
                  ></div>
                ) : null}

                {is_description_visible ? (
                  <div
                    id="theme_1_description"
                    className="header--info--text "
                    style={{
                      marginRight: textMarginRight,
                      marginLeft: textMarginLeft,
                      maxWidth: descriptionWidth,
                      marginBottom: "20px",
                      wordBreak: "break-word",
                      fontSize: descriptionFS,
                      fontWeight: "400",
                      color: description_use_theme_color
                        ? themeColor
                        : description_color,
                    }}
                    dangerouslySetInnerHTML={{ __html: description_value }}
                  ></div>
                ) : null}
              </div>
            </div>
          </div>
          <style
            dangerouslySetInnerHTML={{
              __html: `
        iframe{
          width:100%;
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
        }
        .aspect-ratio-box-${height}-${width}::before {
            content: "";
            width: 1px;
            margin-left: -1px;
            float: left;
            height: 0;
            padding-top: ${ratio}%;
          }`,
            }}
          ></style>

          {value ? (
            <InnerHTML html={value} />
          ) : (
            <div
              style={{ height: isMobile ? "162px" : "510px" }}
              className={"video-placeholder-bg "}
            >
              <img alt="" src={videoPlaceholder} />
            </div>
          )}
        </div>
      </div>
    </AdminSection>
  );
}

export default memo(Video1);
