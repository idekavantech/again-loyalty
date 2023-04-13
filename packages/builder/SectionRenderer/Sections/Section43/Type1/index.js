import React, { memo, useState } from "react";
import Typist from "react-typist";
import useTheme from "@material-ui/core/styles/useTheme";
import Button from "@material-ui/core/Button";
import PhoneEnabledRoundedIcon from "@material-ui/icons/PhoneEnabledRounded";
import AdminSection from "@saas/components/AdminSection";
import { callPhoneNumber } from "@saas/utils/helpers/callPhoneNumber";
import { hexToRgb } from "@saas/utils/helpers/hexToRgb";

import Confetti from "../../../components/Confetti";
import SectionLink from "../../../components/SectionLink";
import LazyImage from "@saas/components/LazyImage";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { isUrlExternal } from "@saas/utils/helpers/isUrlExternal";

function Type1({
  isEditMode,
  onClick,
  isActive,
  _updateSection,
  isDragging,
  dragHandleProps,
  callToActions = [],
  business,
  content,
  customization,
  isMobile,
}) {
  const {
    title: {
      value: title_value,
      font_size: title_font_size,
      color: title_color,
    },
    subtitle: {
      value: subtitle_value,
      font_size: subtitle_font_size,
      color: subtitle_color,
    },
    description: {
      value: description_value,
      font_size: description_font_size,
      color: description_color,
    },
    animation: {
      value: animation_value,
      font_size: animation_font_size,
      color: animation_color,
    },
    image: { value: image_url, alternative: image_alt },
    buttons: { use_default_buttons, items = [], button_size },
  } = content;

  const {
    showcases: {
      title: is_title_visible,
      subtitle: is_subtitle_visible,
      description: is_description_visible,
      animation: is_animation_visible,
      buttons: is_buttons_visible,
      background_image = true,
    },
    background: { color },
  } = customization;
  const { phone_zero_starts: businessPhoneNumber } = business;
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const theme = useTheme();
  const [repeat, setRepeat] = useState(false);
  const { minWidth768, maxWidth768 } = useResponsive();

  const isDesktop = typeof isMobile === "boolean" ? !isMobile : minWidth768;

  const titleFontSize =
    title_font_size === "small"
      ? ["2.6vw", "5.5vw", "1.6vw"]
      : title_font_size === "medium"
      ? ["3.6vw", "7vw", "2.4vw"]
      : ["4.5vw", "9vw", "4vw"];
  const subtitleFontSize =
    subtitle_font_size === "small"
      ? ["1.3vw", "3.5vw", "1.2vw"]
      : subtitle_font_size === "medium"
      ? ["1.6vw", "5.5vw", "1.4vw"]
      : ["2vw", "7.5vw", "1.9vw"];
  const descriptionFontSize =
    description_font_size === "small"
      ? ["1vw", "3vw", "1vw"]
      : description_font_size === "medium"
      ? ["1.1vw", "3.5vw", "1.1vw"]
      : ["1.3vw", "4vw", "1.2vw"];
  const animationFontSize =
    animation_font_size === "small"
      ? ["1.4vw", "3.6vw", "1.4vw"]
      : animation_font_size === "medium"
      ? ["1.7vw", "5.8vw", "1.6vw"]
      : ["2vw", "8vw", "2vw"];

  const titleFS = maxWidth768
    ? titleFontSize[1]
    : isMobile
    ? titleFontSize[2]
    : titleFontSize[0];
  const subtitleFS = maxWidth768
    ? subtitleFontSize[1]
    : isMobile
    ? subtitleFontSize[2]
    : subtitleFontSize[0];
  const descriptionFS = maxWidth768
    ? descriptionFontSize[1]
    : isMobile
    ? descriptionFontSize[2]
    : descriptionFontSize[0];
  const animationFS = maxWidth768
    ? animationFontSize[1]
    : isMobile
    ? animationFontSize[2]
    : animationFontSize[0];

  const textMinHeight =
    animation_font_size === "small"
      ? 33
      : animation_font_size === "medium"
      ? 50
      : 55;

  const buttonWidth =
    button_size === "small" ? 130 : button_size === "medium" ? 150 : 180;

  const renderButtons = use_default_buttons ? (
    <div
      style={{ zIndex: 99 }}
      className="d-flex flex-wrap align-items-center justify-content-center mt-5"
    >
      {callToActions.map((CTA) => (
        <SectionLink
          key={CTA.id}
          href={CTA.url}
          isExternal={isUrlExternal(CTA.url)}
        >
          <Button
            style={{ width: buttonWidth }}
            key={`button-${CTA.id}`}
            className="c-btn mx-1 my-1"
            color="secondary"
            variant="contained"
            size={button_size}
          >
            {CTA.text}
          </Button>
        </SectionLink>
      ))}
      <Button
        className="c-btn mx-1 my-1"
        color="secondary"
        variant="outlined"
        style={{
          direction: "ltr",
          width: buttonWidth,
          backgroundColor: theme.palette.background.default,
        }}
        onClick={() => {
          callPhoneNumber(businessPhoneNumber);
          setShowPhoneNumber(true);
        }}
        size={button_size}
        endIcon={<PhoneEnabledRoundedIcon />}
      >
        {showPhoneNumber ? businessPhoneNumber : "Contact"}
      </Button>
    </div>
  ) : (
    <div className="d-flex flex-wrap align-items-center justify-content-center mt-5">
      {items.map((btn) => (
        <SectionLink
          key={btn.id}
          href={btn.link}
          isExternal={isUrlExternal(btn.link)}
        >
          <Button
            key={`button-${btn.id}`}
            className={`c-btn mx-1 my-1 c-btn c-btn-secondory-by-size${button_size} ${
              btn.button_shape === "normal" ? "normal-btn" : "rounded-btn"
            }`}
            color={btn.use_theme_color ? "secondary" : ""}
            variant={btn.variant}
            onClick={() => {
              if (btn.slide_link_type === "phone_num") {
                callPhoneNumber(btn.phone_num);
                setShowPhoneNumber(true);
              }
            }}
            style={
              btn.use_theme_color
                ? {
                    direction: "ltr",
                    width: buttonWidth,
                  }
                : {
                    backgroundColor: btn.background_color || "",
                    color: btn.color || "",
                    direction: "ltr",
                    width: buttonWidth,
                  }
            }
            size={button_size}
            endIcon={
              btn.slide_link_type === "phone_num" && <PhoneEnabledRoundedIcon />
            }
          >
            {btn.slide_link_type === "phone_num" && showPhoneNumber
              ? btn.phone_num
              : btn.slide_link_type === "phone_num"
              ? btn.num
              : btn.text}
          </Button>
        </SectionLink>
      ))}
    </div>
  );

  return (
    <AdminSection
      isEditMode={!!isEditMode}
      onClick={onClick}
      isActive={isActive}
      _updateSection={_updateSection}
      isDragging={isDragging}
      dragHandleProps={dragHandleProps}
    >
      <div className="position-relative" style={{ backgroundColor: color }}>
        <div className="elementor-spacer w-100" />
        <Confetti
          items={[
            {
              type: "triangle",
              props: {
                right: "40%",
                top: "10%",
                size: 36,
                className: "rotated-element",
                primaryColor: theme.palette.secondary.main,
                secondaryColor: `rgba(${
                  hexToRgb(theme.palette.secondary.main).r
                },${hexToRgb(theme.palette.secondary.main).g},${
                  hexToRgb(theme.palette.secondary.main).b
                }, 0.3)`,
              },
            },
            {
              type: "triangle",
              props: {
                right: "9%",
                top: "40%",
                size: 36,
                className: "rotated-element",
              },
            },
            {
              type: "star",
              props: {
                right: "9%",
                top: "22%",
                size: 18,
                primaryColor: theme.palette.secondary.main,
                className: "moved-element",
              },
            },
            {
              type: "star",
              props: {
                right: "30%",
                bottom: "7%",
                size: 40,
                className: "rotated-element",
              },
            },
            {
              type: "star",
              props: {
                right: "35%",
                bottom: "19%",
                size: 18,
                primaryColor: theme.palette.secondary.main,
                className: "moved-element",
              },
            },
          ]}
        />
        <div
          style={{ width: isDesktop ? "75%" : "100%" }}
          className="position-absolute left-0 u-top-0 h-100 d-block"
        >
          {background_image && (
            <LazyImage
              src={image_url}
              alt={image_alt || business.revised_title}
            />
          )}
        </div>

        <div
          className={`position-absolute z-index-minus w-100 left-0 u-top-0 h-100 ${
            isDesktop ? "d-none" : "d-block"
          }`}
          style={{ opacity: 0.4 }}
        />
        <div
          style={{ zIndex: 99, color: theme.palette.text.tertiary }}
          className="container"
        >
          <div
            className={`${!isMobile && "elementor-container"} ${
              isDesktop ? "text-right" : "text-center"
            } d-flex flex-column align-items-start justify-content-center`}
          >
            {is_subtitle_visible && (
              <div
                style={{
                  zIndex: 999,
                  fontSize: subtitleFS,
                  color: subtitle_color || "",
                  wordBreak: "break-word",
                }}
              >
                {subtitle_value}
              </div>
            )}
            {is_title_visible && (
              <h1
                className="mt-2 u-fontWeightBold"
                style={{
                  color: title_color || "",
                  zIndex: 999,
                  fontSize: titleFS,
                  wordBreak: "break-word",
                  maxWidth: "100%",
                }}
              >
                {title_value}
              </h1>
            )}
            {is_animation_visible && (
              <div className="py-auto" style={{ zIndex: 999 }}>
                {animation_value && (
                  <Typist
                    className="mt-2"
                    cursor={{ show: false }}
                    key={repeat}
                    onTypingDone={() => setRepeat(!repeat)}
                    style={{ fontSize: animationFS }}
                  >
                    <div style={{ minHeight: textMinHeight }}>
                      {animation_value.split("\n").map((word) => [
                        <span
                          key={word.id}
                          className="u-fontWeightBold"
                          style={{
                            color: animation_color || "",
                            fontSize: animationFS,
                          }}
                        >
                          {word}
                        </span>,
                        <Typist.Backspace
                          key={word.id}
                          count={word.length}
                          delay={500}
                        />,
                      ])}
                    </div>
                  </Typist>
                )}
              </div>
            )}
            {is_description_visible && (
              <div
                className="mt-4"
                style={{
                  color: description_color || "",
                  zIndex: 999,
                  fontSize: descriptionFS,
                  wordBreak: "break-word",
                }}
                dangerouslySetInnerHTML={{ __html: description_value }}
              ></div>
            )}
            {is_buttons_visible && renderButtons}
          </div>
        </div>
        <div className="text-right visibility-hidden w-100">
          <div style={{ width: "8%", height: "auto", opacity: 0 }}>
            <LazyImage
              src={image_url}
              alt={image_alt || business.revised_title}
            />
          </div>
        </div>
      </div>
    </AdminSection>
  );
}

export default memo(Type1);
