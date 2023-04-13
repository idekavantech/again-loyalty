import React, { memo, useEffect, useState } from "react";
import AdminSection from "@saas/components/AdminSection";
import Paper from "@material-ui/core/Paper";
import Typist from "react-typist";
import Button from "@material-ui/core/Button";
import SectionLink from "../../../components/SectionLink";
import CountUpAnimation from "@saas/components/CountUpAnimation";
import { callPhoneNumber } from "@saas/utils/helpers/callPhoneNumber";
import useTheme from "@material-ui/core/styles/useTheme";
import PhoneEnabledRoundedIcon from "@material-ui/icons/PhoneEnabledRounded";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { isUrlExternal } from "@saas/utils/helpers/isUrlExternal";

function Type3({
  isEditMode,
  onClick,
  isActive,
  _updateSection,
  isDragging,
  callToActions,
  dragHandleProps,
  business,
  id,
  content,
  isMobile,
  customization,
}) {
  const {
    image: { value: image_url, alternative: image_alt },
    title: {
      value: title_value,
      color: title_color,
      font_size: title_font_size = "medium",
    },
    subtitle: {
      value: subtitle_value,
      color: subtitle_color,
      font_size: subtitle_font_size = "medium",
    },
    price: {
      value: price_value,
      color: price_color,
      font_size: price_font_size = "medium",
    },
    unit_count: {
      value: unit_count_value,
      color: unit_count_color,
      font_size: unit_count_font_size = "medium",
    } = {},
    description: {
      value: description_value,
      color: description_color,
      font_size: description_font_size = "medium",
    },
    animation: {
      value: animation_value,
      color: animation_color,
      font_size: animation_font_size = "medium",
    },
    background_animation: {
      color: animation_background_color,
      square_color: animation_square_background_color,
    },
    buttons: { use_default_buttons, items = [], button_size = "small" },
  } = content;
  const {
    showcases: {
      title: is_title_visible = true,
      subtitle: is_subtitle_visible = true,
      description: is_description_visible = true,
      animation: is_animation_visible = true,
      buttons: is_buttons_visible = true,
      background_image: is_image_visible = true,
      price: is_price_visible = true,
      unit_count: is_unit_count_visible = false,
    },
  } = customization;
  const theme = useTheme();
  const { minWidth992, maxWidth768 } = useResponsive();
  const isDesktop = typeof isMobile === "boolean" ? !isMobile : minWidth992;

  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  const [repeat, setRepeat] = useState(false);
  const numbersOfPrice =
    typeof price_value === "string"
      ? price_value.replace(/\D/g, "")
      : price_value;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const buttonWidth =
    button_size === "small" ? 130 : button_size === "medium" ? 150 : 180;

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

  const priceFontSize =
    price_font_size === "small"
      ? ["1vw", "3vw", "1vw"]
      : price_font_size === "medium"
      ? ["1.1vw", "3.5vw", "1.1vw"]
      : ["1.3vw", "4vw", "1.2vw"];
  const unitCountFontSize =
    unit_count_font_size === "small"
      ? ["1vw", "3vw", "1vw"]
      : unit_count_font_size === "medium"
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
  const priceFS = maxWidth768
    ? priceFontSize[1]
    : isMobile
    ? priceFontSize[2]
    : priceFontSize[0];
  const unitFS = maxWidth768
    ? unitCountFontSize[1]
    : isMobile
    ? unitCountFontSize[2]
    : unitCountFontSize[0];
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
              if (btn.link_type === "phone_num") {
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
                    // borderColor: btn.border_color || "",
                  }
            }
            size={button_size}
            endIcon={
              btn.link_type === "phone_num" && <PhoneEnabledRoundedIcon />
            }
          >
            {btn.link_type === "phone_num" && showPhoneNumber
              ? btn.phone_num
              : btn.link_type === "phone_num"
              ? btn.num || btn.text
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
      <Paper elevation={1}>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            #${id}{
                background: ${animation_background_color};  
                background: -webkit-linear-gradient(to left, #8e9eab, #eef2f3);  
                width: 100%;
                height:  fit-content;
                display: ${isDesktop ? "flex" : "block"};
                justify-content: start;
                align-items: center;
            }
          `,
          }}
        ></style>
        <div id={id}>
          <ul className="circles">
            <li
              style={{ backgroundColor: animation_square_background_color }}
            ></li>
            <li
              style={{ backgroundColor: animation_square_background_color }}
            ></li>
            <li
              style={{ backgroundColor: animation_square_background_color }}
            ></li>
            <li
              style={{ backgroundColor: animation_square_background_color }}
            ></li>
            <li
              style={{ backgroundColor: animation_square_background_color }}
            ></li>
            <li
              style={{ backgroundColor: animation_square_background_color }}
            ></li>
            <li
              style={{ backgroundColor: animation_square_background_color }}
            ></li>
            <li
              style={{ backgroundColor: animation_square_background_color }}
            ></li>
            <li
              style={{ backgroundColor: animation_square_background_color }}
            ></li>
            <li
              style={{ backgroundColor: animation_square_background_color }}
            ></li>
          </ul>
          <div
            className={`${
              isDesktop ? "flex-lg-row" : "flex-column"
            } p-5 d-flex w-100 position-relative`}
            style={{ zIndex: 100 }}
          >
            <div></div>
            <div
              className="d-flex flex-column w-50 justify-content-center"
              style={{ width: isDesktop ? "50%" : "100%" }}
            >
              <div>
                {is_animation_visible && animation_value && (
                  <div
                    style={{ minHeight: 65 }}
                    className={isDesktop ? "mb-lg-3" : ""}
                  >
                    <Typist
                      className="d-flex align-items-center"
                      cursor={{ show: false }}
                      key={repeat}
                      onTypingDone={() => setRepeat(!repeat)}
                    >
                      <div>
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
                            delay={1500}
                          />,
                        ])}
                      </div>
                    </Typist>
                  </div>
                )}
                {is_title_visible && (
                  <h1
                    className={`${
                      isDesktop ? "mb-lg-0" : ""
                    } u-fontWeightBold mb-3 u-pre-wrap u-overflow-wrap d-flex align-items-center justify-content-center justify-content-lg-start`}
                    style={{ color: title_color, fontSize: titleFS }}
                  >
                    {title_value}
                  </h1>
                )}
              </div>
              <div className="d-flex flex-column" style={{ paddingTop: 80 }}>
                {is_subtitle_visible && (
                  <div
                    className="u-fontWeightBold u-pre-wrap u-overflow-wrap d-flex align-items-center justify-content-center justify-content-lg-start"
                    style={{ color: subtitle_color, fontSize: subtitleFS }}
                  >
                    {subtitle_value}
                  </div>
                )}
                <div
                  className={`${
                    isDesktop ? "flex-lg-row" : "flex-column"
                  } d-flex align-items-center mt-4`}
                >
                  <div className="d-flex align-items-center">
                    {is_price_visible && price_value !== "" ? (
                      <div
                        className="u-fontWeightBold u-pre-wrap u-overflow-wrap"
                        style={{ color: price_color, fontSize: priceFS }}
                      >
                        {isClient && (
                          <CountUpAnimation duration={2000}>
                            {numbersOfPrice}
                          </CountUpAnimation>
                        )}
                      </div>
                    ) : null}
                    {is_unit_count_visible && (
                      <div
                        className="u-fontWeightBold u-pre-wrap u-overflow-wrap mr-1"
                        style={{
                          color: unit_count_color,
                          fontSize: unitFS,
                        }}
                        dangerouslySetInnerHTML={{ __html: unit_count_value }}
                      ></div>
                    )}
                  </div>
                  {is_description_visible && (
                    <div
                      className="u-fontWeightBold u-pre-wrap u-overflow-wrap mr-2"
                      style={{
                        color: description_color,
                        fontSize: descriptionFS,
                      }}
                      dangerouslySetInnerHTML={{ __html: description_value }}
                    ></div>
                  )}
                </div>

                {is_buttons_visible && (
                  <div
                    className={`${
                      isDesktop
                        ? "justify-content-lg-start"
                        : "justify-content-center"
                    } d-flex mt-5 align-items-center`}
                    style={{
                      marginTop: `${isDesktop ? " 50px " : "  "}`,
                    }}
                  >
                    {renderButtons}
                  </div>
                )}
              </div>
            </div>
            {is_image_visible && (
              <div
                className={`${
                  isDesktop ? "mt-lg-0" : ""
                } d-flex justify-content-end mt-5`}
                style={{ width: isDesktop ? "50%" : "100%" }}
              >
                <img
                  src={image_url}
                  alt={image_alt || business.revised_title}
                  style={{
                    objectFit: "contain",
                    maxHeight: "100%",
                    maxWidth: "100%",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </Paper>
    </AdminSection>
  );
}

export default memo(Type3);
