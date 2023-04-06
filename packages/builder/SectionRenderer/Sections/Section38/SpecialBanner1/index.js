import React, { memo, useState } from "react";

import Button from "@material-ui/core/Button";
import PhoneEnabledRoundedIcon from "@material-ui/icons/PhoneEnabledRounded";

import { callPhoneNumber } from "@saas/utils/helpers/callPhoneNumber";
import HeaderCover from "@saas/components/HeaderCover";
import AdminSection from "@saas/components/AdminSection";
import SectionLink from "../../../components/SectionLink";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { isUrlExternal } from "@saas/utils/helpers/isUrlExternal";

function SpecialBanner1({
  isDragging,
  dragHandleProps,
  isActive,
  _updateSection,
  isEditMode,
  callToActions = [],
  themeColor,
  business,
  onClick,
  content = {},
  customization = {},
  isMobile,
}) {
  const { minWidth400, maxWidth768, minWidth992 } = useResponsive();
  const {
    slogan,
    revised_title: title,
    phone_zero_starts: businessPhoneNumber,
  } = business;
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const {
    background_image: {
      parallax: is_parallax,
      value: background_image,
      alternative: background_image_alt,
      has_banner_image_for_mobile = false,
      banner_image_in_mobile,
      has_overlay = true,
    },
    buttons: { use_default_buttons, items = [], button_size = "__large" },
    slogan: {
      value: slogan_value,
      font_size: slogan_font_size,
      use_theme_color: slogan_use_theme_color,
      color: slogan_color,
    },
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
  } = content;
  const {
    showcases: {
      title: is_title_visible,
      slogan: is_slogan_visible,
      description: is_description_visible,
      buttons: is_buttons_visible,
    },
    heights: {
      mobile_height = "80vh",
      desktop_height = "80vh",
      mobile_ratio = "16:9",
      desktop_ratio = "16:9",
      use_ratio_height_in_mobile = false,
      use_ratio_height_in_desktop = false,
    } = {},
    section_size: { main_width = "w-100" } = {},
    content_location: { value: location } = { value: "center" },
    background: {
      background_type = "image",
      color: background_color,
      opacity = 100,
    } = {},
  } = customization;
  // Styles with conditions
  // Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Mobile Safari/537.36
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
  const contentTransform =
    location === "center"
      ? "translate(-50%,-50%)"
      : location === "center_right"
      ? "translate(-100%, -50%)"
      : location === "bottom_right"
      ? "translate(-100%, -110%)"
      : location === "bottom_center"
      ? "translate(-50%, -110%)"
      : "translate(-50%, 10%)";

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
  const sloganFontSize =
    slogan_font_size === "small"
      ? ["1vw", "4vw", ".9vw"]
      : slogan_font_size === "medium"
      ? ["2vw", "5vw", "1.6vw"]
      : ["3vw", "6vw", "2.4vw"];
  const descriptionFontSize =
    description_font_size === "small"
      ? ["1.4vw", "3.3vw", ".7vw"]
      : description_font_size === "medium"
      ? ["1.6vw", "3.6vw", "1vw"]
      : ["2vw", "4vw", "1.2vw"];
  const buttonMarginLeft = minWidth400 && !isMobile ? "ml-md-4" : "";

  const flexDirection = "row";

  const buttonsJustify =
    location === "center_right" || location === "bottom_right"
      ? "start"
      : "center";

  const containerMargin =
    main_width === "container" && (maxWidth768 || isMobile)
      ? "0 5%"
      : main_width === "container" && !(maxWidth768 || isMobile)
      ? "0 10%"
      : "0";

  const backgroundColor = background_type === "color" ? background_color : "";

  const titleMarginBottom =
    is_slogan_visible || is_description_visible || is_buttons_visible
      ? "20px"
      : 0;
  const descriptionMarginBottom = is_buttons_visible ? "20px" : 0;
  const sloganMarginBottom =
    is_buttons_visible || is_description_visible ? "20px" : 0;

  // Font Size
  const titleFS = maxWidth768
    ? titleFontSize[1]
    : isMobile
    ? titleFontSize[2]
    : titleFontSize[0];
  const sloganFS = maxWidth768
    ? sloganFontSize[1]
    : isMobile
    ? sloganFontSize[2]
    : sloganFontSize[0];
  const descriptionFS = maxWidth768
    ? descriptionFontSize[1]
    : isMobile
    ? descriptionFontSize[2]
    : descriptionFontSize[0];

  const titleWidth = maxWidth768 || isMobile ? "80%" : "50%";
  const descriptionWidth = maxWidth768 || isMobile ? "100%" : "80%";
  const isDesktop = typeof isMobile === "boolean" ? !isMobile : minWidth992;

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
  const hasStaticHeight = isDesktop
    ? !use_ratio_height_in_desktop
      ? Boolean(desktop_height || "80vh")
      : false
    : !use_ratio_height_in_mobile
    ? Boolean(mobile_height || "80vh")
    : false;
  const renderButtons = use_default_buttons ? (
    <>
      {callToActions.map((CTA) => (
        <div key={CTA.id}>
          <SectionLink href={CTA.url} isExternal={isUrlExternal(CTA.url)}>
            <Button
              key={`button-${CTA.id}`}
              className={`c-btn c-btn-secondory-by-size${button_size} ${buttonMarginLeft} my-1`}
              color="secondary"
              variant="contained"
            >
              {CTA.text}
            </Button>
          </SectionLink>
        </div>
      ))}

      <Button
        key="lastone"
        className={`c-btn c-btn-secondory-by-size${button_size} my-1`}
        color="text.primary"
        variant="contained"
        style={{
          direction: "ltr",
        }}
        onClick={() => {
          callPhoneNumber(businessPhoneNumber);
          setShowPhoneNumber(true);
        }}
        endIcon={<PhoneEnabledRoundedIcon />}
      >
        {showPhoneNumber ? businessPhoneNumber : "تماس"}
      </Button>
    </>
  ) : (
    items.map((btn) => (
      <div
        key={`button-${btn.id}`}
        className={maxWidth768 || isMobile ? "w-50 px-1" : "px-2"}
      >
        <SectionLink href={btn.link} isExternal={isUrlExternal(btn.link)}>
          <div className="w-100">
            <Button
              className={`c-btn w-100 ${
                isMobile || maxWidth768
                  ? "c-btn-secondory-by-size-mobile"
                  : "c-btn-secondory-by-size"
              }${button_size} ${
                btn.button_shape === "normal" ? "normal-btn" : "rounded-btn"
              } my-1`}
              variant={btn.variant}
              color={btn.use_theme_color ? "secondary" : ""}
              onClick={() => {
                if (btn.link_type === "phone_num") {
                  callPhoneNumber(btn.phone_num);
                  setShowPhoneNumber(true);
                }
              }}
              style={
                btn.use_theme_color
                  ? {
                      direction: "ltr",
                    }
                  : {
                      backgroundColor: btn.background_color || "",
                      color: btn.color || "",
                      borderColor: btn.border_color || "",
                      direction: "ltr",
                    }
              }
              endIcon={
                btn.link_type === "phone_num" && <PhoneEnabledRoundedIcon />
              }
            >
              {btn.link_type === "phone_num" && showPhoneNumber
                ? btn.phone_num
                : btn.link_type === "phone_num"
                ? btn.num
                : btn.text}
            </Button>
          </div>
        </SectionLink>
      </div>
    ))
  );
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
          margin: containerMargin,
          display:
            use_ratio_height_in_desktop || use_ratio_height_in_mobile
              ? "flex"
              : "",
          justifyContent: "center",
        }}
        className={isDesktop ? desktopClass : mobileClass}
      >
        <div
          style={{
            backgroundColor: backgroundColor,
            height: isDesktop
              ? !use_ratio_height_in_desktop
                ? desktop_height || "60vh"
                : "100%"
              : !use_ratio_height_in_mobile
              ? mobile_height || "60vh"
              : "100%",
            overflow: "hidden",
            objectFit: "cover",
            width: main_width === "container" ? "" : "100%",
            position: hasStaticHeight ? "relative" : "absolute",
          }}
        >
          {background_type === "image" ? (
            <HeaderCover
              isOnEditMode={isEditMode}
              hasOverlay={has_overlay}
              parallax={is_parallax}
              className={`h-100 ${has_overlay ? "bg--overly--default" : ""} ${
                isDesktop ? desktopClass : mobileClass
              }`}
              coverImage={
                isDesktop
                  ? background_image
                  : has_banner_image_for_mobile
                  ? banner_image_in_mobile
                  : background_image
              }
              altImage={background_image_alt || title}
              opacity={opacity / 100}
            />
          ) : (
            <div
              className="w-100 h-100 position-absolute"
              style={{ top: 0, left: 0, backgroundColor: background_color }}
            ></div>
          )}
          <div
            className="container header--info"
            style={{
              textAlign: contentTextAlign,
              top: contentTop,
              left: contentLeft,
              transform: contentTransform,
            }}
          >
            <div className="px-2 d-flex flex-column align">
              {is_title_visible ? (
                <div
                  id="theme_1_title "
                  style={{
                    marginRight: textMarginRight,
                    marginLeft: textMarginLeft,
                    marginBottom: titleMarginBottom,
                    maxWidth: titleWidth,
                    wordBreak: "break-word",
                    fontSize: titleFS,
                    color: title_use_theme_color ? themeColor : title_color,
                  }}
                  className="u-fontWeightBold "
                  dangerouslySetInnerHTML={{ __html: title_value || title }}
                ></div>
              ) : null}
              {is_slogan_visible ? (
                <div
                  id="theme_1_slogan"
                  className="header--info--description "
                  style={{
                    marginRight: textMarginRight,
                    marginLeft: textMarginLeft,
                    marginTop: "0",
                    marginBottom: sloganMarginBottom,
                    maxWidth: "70%",
                    wordBreak: "break-word",
                    fontSize: sloganFS,
                    color: slogan_use_theme_color ? "" : slogan_color,
                  }}
                >
                  {slogan_value || slogan}
                </div>
              ) : null}
              {is_description_visible ? (
                <div
                  id="theme_1_description"
                  className="header--info--text"
                  style={{
                    marginRight: textMarginRight,
                    marginLeft: textMarginLeft,
                    maxWidth: descriptionWidth,
                    marginBottom: descriptionMarginBottom,
                    wordBreak: "break-word",
                    fontSize: descriptionFS,
                    color: description_use_theme_color
                      ? themeColor
                      : description_color,
                  }}
                  dangerouslySetInnerHTML={{ __html: description_value }}
                ></div>
              ) : null}
              {is_buttons_visible ? (
                <section id="theme_1_buttons">
                  <div
                    className={`d-flex flex-wrap${
                      isMobile || maxWidth768
                        ? ""
                        : "d-flex flex-wrap align-items-center "
                    } ${
                      location === "center_right" || location === "bottom_right"
                        ? ""
                        : "mx-auto"
                    }`}
                    style={{
                      width: maxWidth768 || isMobile ? "100%" : "70%",
                      justifyContent: buttonsJustify,
                      flexDirection: flexDirection,
                    }}
                  >
                    {renderButtons}
                  </div>
                </section>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </AdminSection>
  );
}

export default memo(SpecialBanner1);
