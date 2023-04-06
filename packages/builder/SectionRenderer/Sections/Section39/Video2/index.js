import React, { memo } from "react";
import AdminSection from "@saas/components/AdminSection";
import LazyImage from "@saas/components/LazyImage";
import { useResponsive } from "@saas/utils/hooks/useResponsive";


const videoPlaceholder = `/images/Play.png`;

function Video2({
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
  business,
}) {
  const { maxWidth768, maxWidth992 } = useResponsive();
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
    },

    video: { value },
  } = content;

  const {
    showcases: { title: is_title_visible, description: is_description_visible },
    background: {
      background_type = "image",
      background_image,
      color: background_color,
      opacity = 100,
      should_upload_seperate_image_for_mobile = false,
      mobile_background_image,
    } = {},
  } = customization;

  const titleFontSize =
    title_font_size === "small"
      ? ["1.4vw", "4.5vw", "0.6vw"]
      : title_font_size === "medium"
      ? ["2.3vw", "6vw", "1.4vw"]
      : ["3.5vw", "8vw", "3vw"];

  const descriptionFontSize =
    description_font_size === "small"
      ? ["1.4vw", "3.3vw", ".7vw"]
      : description_font_size === "medium"
      ? ["1.6vw", "3.6vw", "1vw"]
      : ["2vw", "4vw", "1.2vw"];

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

  const width = value?.match(/(width\s*=\s*["'](.*?)["'])/)?.[2] || 1;
  const height = value?.match(/(height\s*=\s*["'](.*?)["'])/)?.[2] || 1;
  const ratio = (height / width) * 100;

  const _isMobile = typeof isMobile === "boolean" ? isMobile : maxWidth992;

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
          padding: _isMobile ? "0 5%" : " 0 10%",
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
          className="video2-container"
          style={{
            overflow: "hidden",
            direction: "rtl",
          }}
        >
          <div
            className="container d-flex flex-wrap justify-content-between align-items-center video2-container"
            style={{
              padding: _isMobile ? "32px 0" : "48px 0",
              overflow: "hidden",
            }}
          >
            <div
              className={`${isMobile ? "col-12" : "col-lg-5"}`}
              style={{ padding: 0 }}
            >
              {is_title_visible ? (
                <div
                  id="theme_1_title "
                  style={{
                    marginBottom: "15px",
                    wordBreak: "break-word",
                    fontSize: titleFS,
                    fontWeight: "400",
                    color: title_use_theme_color ? themeColor : title_color,
                    textAlign: isMobile ? "center" : "right",
                  }}
                  className="video2-title"
                  dangerouslySetInnerHTML={{ __html: title_value }}
                ></div>
              ) : null}

              {is_description_visible ? (
                <div
                  id="theme_1_description"
                  style={{
                    marginBottom: "20px",
                    wordBreak: "break-word",
                    fontSize: descriptionFS,
                    fontWeight: "400",
                    textAlign: isMobile ? "center" : "right",
                    direction: "rtl",
                    color: description_use_theme_color
                      ? themeColor
                      : description_color,
                  }}
                  className="video2-description"
                  dangerouslySetInnerHTML={{ __html: description_value }}
                ></div>
              ) : null}
            </div>

            {value ? (
              <div
                className={`${isMobile ? "col-12" : "col-lg-6"} w-100 
        `}
                style={{ padding: 0 }}
                dangerouslySetInnerHTML={{ __html: value }}
              ></div>
            ) : (
              <div
                style={{ height: isMobile ? "162px" : "294px" }}
                className={`${
                  isMobile ? "col-12" : "col-lg-6"
                }   w-100 video-placeholder-bg `}
              >
                <img alt="" src={videoPlaceholder} />
              </div>
            )}

            <style
              dangerouslySetInnerHTML={{
                __html: `
        iframe{
          width:100%;
          left: 0;
          top: 0;
          
        }
        @media screen and (max-width: 768px) {
          height:100%
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
          </div>
        </div>
      </div>
    </AdminSection>
  );
}

export default memo(Video2);
