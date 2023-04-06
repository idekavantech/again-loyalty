import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import AdminSection from "@saas/components/AdminSection";
import SectionLink from "../../components/SectionLink";
import LazyImage from "@saas/components/LazyImage";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { useHtmlTag } from "@saas/utils/hooks/useHtmlTag";
import { isUrlExternal } from "@saas/utils/helpers/isUrlExternal";

function Section44({
  isDragging,
  dragHandleProps,
  isActive,
  _updateSection,
  isEditMode,
  onClick,
  business,
  content,
  isMobile,
  customization,
}) {
  const {
    title: {
      value: title_value,
      html_tag: title_html_tag,
      color: title_color,
      font_size: title_font_size,
    },
    description: { value: description_text },
    image: { value: image_url, alternative: image_alt },
    button: { value: button_text, link: button_link },
  } = content;
  const {
    layout: { type },
    background: {
      background_type: backgroundType,
      background_image: backgroundImage,
      background_color: backgroundColor,
      opacity = 100,
    } = {},
  } = customization;
  const businessAddress = business.get_vitrin_absolute_url;
  const { minWidth992 } = useResponsive();
  const isDesktop = typeof isMobile === "boolean" ? !isMobile : minWidth992;
  const htmlTag = useHtmlTag(title_html_tag, {
    title_value,
    title_color,
    title_font_size,
  });

  return (
    <AdminSection
      isDragging={isDragging}
      dragHandleProps={dragHandleProps}
      isActive={isActive}
      _updateSection={_updateSection}
      isEditMode={!!isEditMode}
      onClick={onClick}
    >
      {backgroundImage && backgroundType === "image" && (
        <div
          className="position-absolute left-0 u-top-0 h-100 w-100 d-block"
          style={{ opacity: opacity / 100 }}
        >
          <LazyImage src={backgroundImage} />
        </div>
      )}
      <div
        className="container position-relative p-5 d-flex flex-wrap align-items-center direction-ltr"
        style={{
          paddingTop: 40,
          paddingBottom: 40,
          flexDirection: type === "type_1" ? "row" : "row-reverse",
          backgroundColor: backgroundType === "color" && backgroundColor,
        }}
      >
        <div
          className={`${
            isDesktop ? "col-lg-6" : "col-12"
          } text-right direction-rtl`}
        >
          {title_value && htmlTag}
          <div
            className="my-4"
            style={{
              fontSize: isDesktop ? 16 : 12,
              textAlign: isDesktop ? "right" : "center",
            }}
            dangerouslySetInnerHTML={{ __html: description_text }}
          ></div>
          {button_text && (
            <div
              className={`${
                isDesktop ? "flex-lg-row mb-lg-0" : "flex-column"
              } mt-4 mb-4 d-flex align-items-center`}
            >
              <SectionLink
                href={button_link}
                isExternal={isUrlExternal(button_link)}
                businessAddress={businessAddress}
              >
                <Button
                  href={button_link}
                  variant="outlined"
                  color="secondary"
                  style={{ minWidth: isDesktop ? 120 : 75 }}
                >
                  {button_text}
                </Button>
              </SectionLink>
            </div>
          )}
        </div>
        <div className={isDesktop ? "col-lg-6" : "col-12"}>
          <LazyImage
            src={image_url}
            alt={image_alt || business.revised_title}
          />
        </div>
      </div>
    </AdminSection>
  );
}

export default memo(Section44);
