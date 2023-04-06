import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import AdminSection from "@saas/components/AdminSection";
import SectionLink from "../../../components/SectionLink";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { formatUrl } from "@saas/utils/helpers/formatUrl";
import useTheme from "@material-ui/core/styles/useTheme";
import Link from "next/link";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

const contentTitleFontSizes = {
  type_1: {
    mobile: {
      small: 32,
      medium: 36,
      large: 40,
    },
    desktop: {
      small: 48,
      medium: 54,
      large: 60,
    },
  },
  type_2: {
    mobile: {
      small: 12,
      medium: 14,
      large: 16,
    },
    desktop: {
      small: 24,
      medium: 30,
      large: 36,
    },
  },
};
const contentDescriptionFontSizes = {
  type_1: {
    mobile: {
      small: 16,
      medium: 20,
      large: 24,
    },
    desktop: {
      small: 24,
      medium: 28,
      large: 42,
    },
  },
  type_2: {
    mobile: {
      small: 10,
      medium: 12,
      large: 14,
    },
    desktop: {
      small: 14,
      medium: 16,
      large: 18,
    },
  },
};
const SlideWrapper = ({
  slide_has_link,
  slide_link_type,
  slide_internal_link,
  slide_external_link,
  slide_link,
  children,
  className,
}) => {
  if (!slide_has_link) {
    return children;
  }
  if (slide_link_type === "external") {
    return (
      <a
        href={formatUrl(slide_external_link) || slide_link}
        className={className}
        style={{ display: "block" }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      className={className}
      style={{ display: "block" }}
      target="_blank"
      passHref
      href={slide_internal_link || slide_link}
    >
      {children}
    </Link>
  );
};
function Slider1({
  isEditMode,
  onClick,
  isActive,
  _updateSection,
  isDragging,
  dragHandleProps,
  business,
  content,
  customization,
  isMobile,
  selectedItemIndex,
}) {
  const { minWidth992 } = useResponsive();
  const isDesktop = typeof isMobile === "boolean" ? !isMobile : minWidth992;
  const [isClient, setClient] = useState(false);
  const theme = useTheme();
  useEffect(() => {
    setClient(true);
  }, []);
  const sliderRef = useRef(null);
  useEffect(() => {
    if (typeof selectedItemIndex === "number") {
      sliderRef.current.slickGoTo(selectedItemIndex);
    }
  }, [selectedItemIndex]);
  const businessAddress = business.get_vitrin_absolute_url;
  const {
    slides: { items: slides },
    configs: {
      arrows = true,
      dots = false,
      autoplay = true,
      timer = 4000,
      slides_to_show = 1,
      slides_to_scroll = 1,
      rtl = true,
      speed = 600,
      vertical = false,
      center_mode = false,
      center_padding = 0,
      space_between_slides = 0,
      animation = "slide",
    },
  } = content;
  const {
    heights: {
      mobile_height = "60vh",
      desktop_height = "60vh",
      mobile_ratio = "16:9",
      desktop_ratio = "16:9",
      use_ratio_height_in_mobile = false,
      use_ratio_height_in_desktop = false,
    },
    colors: {
      dots_color = "#ffffff",
      arrows_color = "#000000",
      background_color = "#ffffff",
    } = {},
    framing: {
      use_framing_in_desktop = false,
      border_width_in_desktop = 30,
      use_theme_color_for_border_color_in_desktop = true,
      border_color_in_desktop = process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
      border_radius_in_desktop = 8,
      use_framing_in_mobile = false,
      border_width_in_mobile = 20,
      use_theme_color_for_border_color_in_mobile = true,
      border_color_in_mobile = process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
      border_radius_in_mobile = 8,
    } = {},
  } = customization;
  const ـid = useMemo(() => uniqueid(), []);

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          zIndex: 1010,
          right: isDesktop
            ? use_framing_in_desktop
              ? 20 + border_width_in_desktop
              : 20
            : use_framing_in_mobile
            ? 5 + border_width_in_mobile
            : 5,
          color: arrows_color,
        }}
        onClick={onClick}
      >
        <KeyboardArrowRightRoundedIcon
          fontSize="large"
          style={{ color: arrows_color }}
        />
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          zIndex: 1010,
          left: isDesktop
            ? use_framing_in_desktop
              ? 20 + border_width_in_desktop
              : 20
            : use_framing_in_mobile
            ? 5 + border_width_in_mobile
            : 5,
          color: arrows_color,
        }}
        onClick={onClick}
      >
        <KeyboardArrowLeftRoundedIcon
          fontSize="large"
          style={{ color: arrows_color }}
        />
      </div>
    );
  };
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
  const settings = useMemo(() => {
    return {
      infinite: true,
      speed,
      dots,
      autoplaySpeed: timer,
      slidesToShow: slides_to_show,
      slidesToScroll: slides_to_scroll,
      adaptiveHeight: true,
      autoplay: typeof selectedItemIndex !== "number" && autoplay,
      rtl,
      vertical,
      centerMode: center_mode,
      centerPadding: `${center_padding}px`,
      fade: animation === "fade",
      cssEase: animation === "fade" ? "linear" : "ease-in-out",
    };
  }, [
    speed,
    dots,
    timer,
    slides_to_show,
    slides_to_scroll,
    autoplay,
    rtl,
    vertical,
    center_mode,
    center_padding,
    animation,
    selectedItemIndex,
  ]);
  slides;
  const hasStaticHeight = isDesktop
    ? !use_ratio_height_in_desktop
      ? Boolean(desktop_height || "60vh")
      : false
    : !use_ratio_height_in_mobile
    ? Boolean(mobile_height || "60vh")
    : false;

  const framingWidth = useMemo(() => {
    if (isDesktop) {
      if (use_framing_in_desktop) {
        return border_width_in_desktop;
      }
    } else {
      if (use_framing_in_mobile) {
        return border_width_in_mobile;
      }
    }
  }, [
    isDesktop,
    use_framing_in_desktop,
    border_width_in_desktop,
    use_framing_in_mobile,
    border_width_in_mobile,
  ]);

  const framingBorderRadius = useMemo(() => {
    if (isDesktop) {
      if (use_framing_in_desktop) {
        return border_radius_in_desktop;
      }
    } else {
      if (use_framing_in_mobile) {
        return border_radius_in_mobile;
      }
    }
  }, [
    isDesktop,
    use_framing_in_desktop,
    border_radius_in_desktop,
    use_framing_in_mobile,
    border_radius_in_mobile,
  ]);

  const framingBackgroundColor = useMemo(() => {
    if (isDesktop) {
      if (use_framing_in_desktop) {
        if (use_theme_color_for_border_color_in_desktop) {
          return theme.palette.secondary.main;
        } else {
          return border_color_in_desktop;
        }
      }
    } else {
      if (use_framing_in_mobile) {
        if (use_theme_color_for_border_color_in_mobile) {
          return theme.palette.secondary.main;
        } else {
          return border_color_in_mobile;
        }
      }
    }
  }, [
    isDesktop,
    use_framing_in_desktop,
    use_theme_color_for_border_color_in_desktop,
    border_color_in_desktop,
    use_framing_in_mobile,
    use_theme_color_for_border_color_in_mobile,
    border_color_in_mobile,
  ]);

  const contentLocationStyles = useMemo(() => {
    const borderWidth = isDesktop
      ? use_framing_in_desktop && border_width_in_desktop
      : use_framing_in_mobile && border_width_in_mobile;
    const hasBorderWidth = Boolean(
      isDesktop
        ? use_framing_in_desktop && border_width_in_desktop
        : use_framing_in_mobile && border_width_in_mobile
    );
    return {
      center: {
        top: "50%",
        right: "50%",
        transform: "translateX(50%) translateY(-50%)",
        textAlign: "center",
        width: "80%",
      },
      top_center: {
        top: hasBorderWidth ? `calc(6% + ${borderWidth}px)` : "6%",
        right: "50%",
        transform: "translateX(50%)",
        textAlign: "center",
        width: "80%",
      },
      bottom_center: {
        bottom: hasBorderWidth ? `calc(6% + ${borderWidth}px)` : "6%",
        right: "50%",
        transform: "translateX(50%)",
        textAlign: "center",
        width: "80%",
      },
      center_right: {
        top: "50%",
        right: hasBorderWidth
          ? `calc(6% + ${borderWidth}px)`
          : isDesktop
          ? "6%"
          : "9%",
        transform: "translateY(-50%)",
        textAlign: "right",
        width: "80%",
      },
      bottom_right: {
        bottom: hasBorderWidth ? `calc(6% + ${borderWidth}px)` : "6%",
        right: hasBorderWidth
          ? `calc(6% + ${borderWidth}px)`
          : isDesktop
          ? "6%"
          : "9%",
        textAlign: "right",
        width: "80%",
      },
    };
  }, [
    isDesktop,
    use_framing_in_desktop,
    border_width_in_desktop,
    use_framing_in_mobile,
    border_width_in_mobile,
  ]);

  return (
    <AdminSection
      isEditMode={!!isEditMode}
      onClick={onClick}
      isActive={isActive}
      _updateSection={_updateSection}
      isDragging={isDragging}
      dragHandleProps={dragHandleProps}
    >
      {(isEditMode || isClient) && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .slick-dots li.slick-active button:before {
                color: ${dots_color};
              }
              .slick-dots li button:before {
                color: ${dots_color};
              }
              .slick-prev {
                left : 5px ;
              }
              #${ـid} .slick-prev:before, #${ـid} .slick-next:before{
                content: '';
              }
              #${ـid} .slick-arrow {
                width: 40px;
                height: 40px;
              }
              #${ـid} .slick-dots{
                bottom: 10px !important;
              }
              .slick-slide > div{
                display: flex;
              }
              .slick-slide { pointer-events: none; }
              .slick-active { pointer-events: auto; }
          `,
          }}
        />
      )}
      {(isEditMode || isClient) && (
        <div id={ـid} style={{ backgroundColor: background_color }}>
          <Slider
            ref={sliderRef}
            {...settings}
            className="w-100"
            nextArrow={arrows ? <NextArrow /> : null}
            prevArrow={arrows ? <PrevArrow /> : null}
          >
            {slides.map(
              ({
                slide_image,
                slide_image_in_mobile,
                alternative,
                id,
                slider_has_button = true,
                button_text,
                button_variant = "outlined",
                button_use_theme_color = true,
                button_background_color = "",
                button_border_color = "",
                button_color = "",
                button_size = "medium",
                button_shape = "normal",
                slide_internal_link = "/",
                slide_external_link = "/",
                button_link_type = "button_has_internal_link",
                button_external_link = "",
                button_internal_link = "/",
                slide_title,
                slide_title_color = "#000000",
                slide_title_use_theme_color = false,
                slide_title_font_size = "large",
                is_title_visible = true,
                slide_description,
                slide_description_color = "#000000",
                is_description_visible = true,
                slide_description_use_theme_color = false,
                slide_description_font_size = "small",
                slide_has_link,
                slide_link_type = "internal",
                slide_link = "/",
                type,
                location = "center_right",
                having_slide_image_for_mobile,
              }) => {
                if (type === "type_1") {
                  return (
                    <div
                      className={`px-${space_between_slides || 0} h-100 ${
                        isDesktop ? desktopClass : mobileClass
                      }`}
                    >
                      <SlideWrapper
                        slide_link={slide_link}
                        slide_external_link={slide_external_link}
                        slide_has_link={slide_has_link}
                        slide_internal_link={slide_internal_link}
                        slide_link_type={slide_link_type}
                        className={isDesktop ? desktopClass : mobileClass}
                      >
                        <div
                          className={`w-100 position-relative ${
                            slide_has_link ? " u-cursor-pointer " : ""
                          } ${isDesktop ? desktopClass : mobileClass}`}
                          key={id}
                          style={{
                            backgroundColor: framingBackgroundColor,
                          }}
                        >
                          <img
                            src={
                              isDesktop
                                ? slide_image
                                : having_slide_image_for_mobile
                                ? slide_image_in_mobile
                                : slide_image
                            }
                            style={{
                              height: isDesktop
                                ? !use_ratio_height_in_desktop
                                  ? desktop_height || "60vh"
                                  : "100%"
                                : !use_ratio_height_in_mobile
                                ? mobile_height || "60vh"
                                : "100%",
                              width: "100%",
                              objectFit: "cover",
                              position: hasStaticHeight
                                ? "relative"
                                : "absolute",
                              borderRadius: framingBorderRadius,
                              padding: framingWidth,
                            }}
                            alt={alternative || slide_title}
                          />
                          <div
                            className="position-absolute rtl w-100 d-flex flex-column"
                            style={{
                              zIndex: 10000,
                              ...contentLocationStyles[location],
                            }}
                          >
                            {is_title_visible && (
                              <div
                                style={{
                                  color: slide_title_use_theme_color
                                    ? theme.palette.secondary.main
                                    : slide_title_color,
                                  fontSize:
                                    contentTitleFontSizes["type_1"][
                                      isDesktop ? "desktop" : "mobile"
                                    ][slide_title_font_size],
                                  fontWeight: 700,
                                }}
                                className="mb-2"
                                dangerouslySetInnerHTML={{
                                  __html: slide_title,
                                }}
                              ></div>
                            )}
                            {is_description_visible && (
                              <div
                                style={{
                                  color: slide_description_use_theme_color
                                    ? theme.palette.secondary.main
                                    : slide_description_color,
                                  fontSize:
                                    contentDescriptionFontSizes["type_1"][
                                      isDesktop ? "desktop" : "mobile"
                                    ][slide_description_font_size],
                                }}
                                className="mb-2"
                                dangerouslySetInnerHTML={{
                                  __html: slide_description,
                                }}
                              ></div>
                            )}
                            <div className="py-2">
                              {slider_has_button && button_text && (
                                <SectionLink
                                  href={
                                    button_link_type ===
                                    "button_has_internal_link"
                                      ? button_internal_link
                                      : button_external_link
                                  }
                                  isExternal={
                                    button_link_type ===
                                    "button_has_external_link"
                                  }
                                  businessAddress={businessAddress}
                                >
                                  <Button
                                    className={`c-btn c-btn-secondory-by-size${button_size} ${
                                      button_shape === "normal"
                                        ? "normal-btn"
                                        : "rounded-btn"
                                    }`}
                                    color={
                                      button_use_theme_color ? "secondary" : ""
                                    }
                                    variant={button_variant}
                                    style={
                                      button_use_theme_color
                                        ? {}
                                        : {
                                            color: button_color || "",
                                            borderColor:
                                              button_variant === "outlined"
                                                ? button_border_color
                                                : "",
                                            backgroundColor:
                                              button_variant === "contained"
                                                ? button_background_color
                                                : "",
                                          }
                                    }
                                    size={button_size}
                                  >
                                    {button_text}
                                  </Button>
                                </SectionLink>
                              )}
                            </div>
                          </div>
                        </div>
                      </SlideWrapper>
                    </div>
                  );
                }
                if (type === "type_2") {
                  return (
                    <div className={`px-${space_between_slides || 0}`}>
                      <SlideWrapper
                        slide_link={slide_link}
                        slide_external_link={slide_external_link}
                        slide_has_link={slide_has_link}
                        slide_internal_link={slide_internal_link}
                        slide_link_type={slide_link_type}
                      >
                        <div
                          key={id}
                          className="d-flex flex-wrap align-items-center "
                          style={{
                            padding: isDesktop ? 54 : 30,
                            height: isDesktop
                              ? desktop_height || "60vh"
                              : isMobile
                              ? mobile_height || "60vh"
                              : "unset",
                          }}
                        >
                          <div
                            className={isDesktop ? "col-lg-6 h-100" : "col-12"}
                          >
                            <img
                              className="w-100"
                              style={{
                                objectFit: "cover",
                              }}
                              src={
                                isDesktop
                                  ? slide_image
                                  : having_slide_image_for_mobile
                                  ? slide_image_in_mobile
                                  : slide_image
                              }
                              alt={alternative || business.revised_title}
                            />
                          </div>
                          <div
                            className={`${
                              isDesktop ? "col-lg-6" : "col-12"
                            } text-right direction-rtl inner-item`}
                          >
                            {is_title_visible && (
                              <p
                                className="my-4"
                                style={{
                                  color: slide_title_use_theme_color
                                    ? theme.palette.secondary.main
                                    : slide_title_color,
                                  fontSize:
                                    contentTitleFontSizes["type_2"][
                                      isDesktop ? "desktop" : "mobile"
                                    ][slide_title_font_size],
                                  fontWeight: 700,
                                }}
                              >
                                {slide_title}
                              </p>
                            )}
                            {is_description_visible && (
                              <div
                                className="my-4"
                                style={{
                                  fontSize:
                                    contentDescriptionFontSizes["type_2"][
                                      isDesktop ? "desktop" : "mobile"
                                    ][slide_description_font_size],
                                  color: slide_description_use_theme_color
                                    ? theme.palette.secondary.main
                                    : slide_description_color,
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: slide_description,
                                }}
                              ></div>
                            )}
                            {slider_has_button && button_text && (
                              <div className="mt-4">
                                <SectionLink
                                  href={
                                    button_link_type ===
                                    "button_has_internal_link"
                                      ? button_internal_link
                                      : button_external_link
                                  }
                                  isExternal={
                                    button_link_type ===
                                    "button_has_external_link"
                                  }
                                  businessAddress={businessAddress}
                                >
                                  <Button
                                    color={
                                      button_use_theme_color ? "secondary" : ""
                                    }
                                    variant={button_variant}
                                    style={
                                      button_use_theme_color
                                        ? {}
                                        : {
                                            color: button_color || "",
                                            borderColor:
                                              button_variant === "outlined"
                                                ? button_border_color
                                                : "",
                                            backgroundColor:
                                              button_variant === "contained"
                                                ? button_background_color
                                                : "",
                                          }
                                    }
                                    size={button_size}
                                  >
                                    {button_text}
                                  </Button>
                                </SectionLink>
                              </div>
                            )}
                          </div>
                        </div>
                      </SlideWrapper>
                    </div>
                  );
                }
                if (type === "type_3") {
                  return (
                    <div className={`px-${space_between_slides || 0}`}>
                      <SlideWrapper
                        slide_link={slide_link}
                        slide_external_link={slide_external_link}
                        slide_has_link={slide_has_link}
                        slide_internal_link={slide_internal_link}
                        slide_link_type={slide_link_type}
                      >
                        <div
                          key={id}
                          className="d-flex flex-wrap align-items-center"
                          style={{
                            padding: isDesktop ? 54 : 30,
                            height: isDesktop
                              ? desktop_height || "60vh"
                              : isMobile
                              ? mobile_height || "60vh"
                              : "unset",
                          }}
                        >
                          <div
                            className={`${
                              isDesktop ? "col-lg-6" : "col-12"
                            } text-right direction-rtl inner-item`}
                          >
                            {is_title_visible && (
                              <p
                                className={`${isDesktop ? "my-lg-4" : ""} mb-4`}
                                style={{
                                  color: slide_title_use_theme_color
                                    ? theme.palette.secondary.main
                                    : slide_title_color,
                                  fontSize:
                                    contentTitleFontSizes["type_2"][
                                      isDesktop ? "desktop" : "mobile"
                                    ][slide_title_font_size],
                                  fontWeight: 700,
                                }}
                              >
                                {slide_title}
                              </p>
                            )}
                            {is_description_visible && (
                              <div
                                className="my-4"
                                style={{
                                  fontSize:
                                    contentDescriptionFontSizes["type_2"][
                                      isDesktop ? "desktop" : "mobile"
                                    ][slide_description_font_size],
                                  color: slide_description_use_theme_color
                                    ? theme.palette.secondary.main
                                    : slide_description_color,
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: slide_description,
                                }}
                              ></div>
                            )}
                            <div
                              className={`${
                                isDesktop ? "mb-lg-0" : ""
                              } mt-4 mb-4 `}
                            >
                              {slider_has_button && button_text && (
                                <SectionLink
                                  href={
                                    button_link_type ===
                                    "button_has_internal_link"
                                      ? button_internal_link
                                      : button_external_link
                                  }
                                  isExternal={
                                    button_link_type ===
                                    "button_has_external_link"
                                  }
                                  businessAddress={businessAddress}
                                >
                                  <Button
                                    color={
                                      button_use_theme_color ? "secondary" : ""
                                    }
                                    variant={button_variant}
                                    style={
                                      button_use_theme_color
                                        ? {}
                                        : {
                                            color: button_color || "",
                                            borderColor:
                                              button_variant === "outlined"
                                                ? button_border_color
                                                : "",
                                            backgroundColor:
                                              button_variant === "contained"
                                                ? button_background_color
                                                : "",
                                          }
                                    }
                                    size={button_size}
                                  >
                                    {button_text}
                                  </Button>
                                </SectionLink>
                              )}
                            </div>
                          </div>
                          <div
                            className={`${
                              isDesktop ? "col-lg-6 h-100" : "col-12"
                            }`}
                          >
                            <img
                              className="w-100"
                              src={
                                isDesktop
                                  ? slide_image
                                  : having_slide_image_for_mobile
                                  ? slide_image_in_mobile
                                  : slide_image
                              }
                              alt={alternative || business.revised_title}
                              style={{
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        </div>
                      </SlideWrapper>
                    </div>
                  );
                }
                return null;
              }
            )}
          </Slider>
        </div>
      )}{" "}
    </AdminSection>
  );
}
export const noLazyHydration = true;
export default memo(Slider1);
