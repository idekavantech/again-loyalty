import React, { memo } from "react";
import Paper from "@material-ui/core/Paper";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { business, id, content, customization } from "./constant";
import Link from "next/link";
import CountUp from "react-countup";
import { priceFormatter } from "utils/helpers/priceFormatter";

function Type3({ gmv, title, titleButton, clickHandle }) {
  const {
    image: { alternative: image_alt },
    title: { font_size: title_font_size = "medium" },
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
  } = content;
  const {
    showcases: {
      subtitle: is_subtitle_visible = true,
      description: is_description_visible = true,
      animation: is_animation_visible = true,
      background_image: is_image_visible = true,
      price: is_price_visible = true,
      unit_count: is_unit_count_visible = false,
    },
  } = customization;
  const { maxWidth768, minWidth992 } = useResponsive();

  const isMobile = typeof window !== "undefined" ? maxWidth768 : true;
  const isDesktop = minWidth992;
  const hasMobileSize = typeof window !== "undefined" ? maxWidth768 : true;

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

  const titleFS = hasMobileSize
    ? titleFontSize[1]
    : isMobile
    ? titleFontSize[2]
    : titleFontSize[0];
  const subtitleFS = hasMobileSize
    ? subtitleFontSize[1]
    : isMobile
    ? subtitleFontSize[2]
    : subtitleFontSize[0];
  const priceFS = hasMobileSize
    ? priceFontSize[1]
    : isMobile
    ? priceFontSize[2]
    : priceFontSize[0];
  const unitFS = hasMobileSize
    ? unitCountFontSize[1]
    : isMobile
    ? unitCountFontSize[2]
    : unitCountFontSize[0];
  const descriptionFS = hasMobileSize
    ? descriptionFontSize[1]
    : isMobile
    ? descriptionFontSize[2]
    : descriptionFontSize[0];
  const animationFS = hasMobileSize
    ? animationFontSize[1]
    : isMobile
    ? animationFontSize[2]
    : animationFontSize[0];

  return (
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
          style={{ zIndex: 0 }}
        >
          <div></div>
          <div
            className="d-flex flex-column w-50 justify-content-center"
            style={{ width: isDesktop ? "50%" : "100%" }}
          >
            <div>
              {is_animation_visible && animation_value && (
                <div
                  // style={{ minHeight: 65 }}
                  className={isDesktop ? "mb-lg-3" : ""}
                >
                  <div
                    className={`d-flex w-100 mt-4 ${
                      isDesktop
                        ? "justify-content-start"
                        : "justify-content-center"
                    }`}
                    style={{ fontSize: animationFS }}
                  >
                    <div
                      className="scroller"
                      style={{ width: "9rem", color: animation_color }}
                    >
                      <span>
                        کار
                        <br />
                        سایت
                        <br />
                        فروش
                        <br />
                        هزینه
                        <br />
                        مدیریت
                        <br />
                        خیال
                        <br />
                      </span>
                    </div>
                    <span>شما با</span>
                  </div>
                  <h1
                    style={{
                      fontSize: titleFS,
                      margin: "15px 0",
                      textAlign: isDesktop ? "right" : "center",
                    }}
                  >
                    {title}
                  </h1>

                  <div
                    className={`d-flex w-100 mt-4 ${
                      isDesktop
                        ? "justify-content-start"
                        : "justify-content-center"
                    }`}
                    style={{ fontSize: animationFS }}
                  >
                    <div
                      className="scroller_2"
                      style={{ width: "9rem", color: animation_color }}
                    >
                      <span>
                        آسان
                        <br />
                        سریع
                        <br />
                        بیشتر
                        <br />
                        به‌صرفه
                        <br />
                        بهینه
                        <br />
                        راحت
                        <br />
                      </span>
                    </div>
                    <span>می‌شود</span>
                  </div>
                </div>
              )}
            </div>

            <div
              className="d-flex flex-column"
              style={{ padding: isMobile ? "20px 0" : "80px 0 0" }}
            >
              {is_subtitle_visible && isDesktop && (
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
                  {is_price_visible && price_value !== "" && isDesktop ? (
                    <div
                      className="u-fontWeightBold u-pre-wrap u-overflow-wrap"
                      style={{ color: price_color, fontSize: priceFS }}
                    >
                      <CountUp
                        start={0}
                        end={gmv}
                        delay={0}
                        formattingFn={(value) => priceFormatter(value)}
                      >
                        {({ countUpRef }) => (
                          <p>
                            <span
                              className="my-1 my-md-2 mx-3"
                              ref={countUpRef}
                            ></span>
                          </p>
                        )}
                      </CountUp>
                    </div>
                  ) : null}
                  {is_unit_count_visible && isDesktop && (
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
                {is_description_visible && isDesktop && (
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

              <div
                className={`d-flex ${
                  isMobile ? "justify-content-between" : "justify-content-start"
                }`}
                style={{
                  marginTop: `${isDesktop ? " 50px " : "20px"}`,
                }}
              >
                <Link
                  className="header-buttons d-flex justify-content-center align-items-center p-4"
                  href="/cr~templates"
                >
                  <button style={{ fontSize: isMobile ? 17 : 20 }}>
                    رایگان شروع کنید
                  </button>
                </Link>
                <button
                  className="mr-4"
                  style={{
                    width: "45%",
                    color: "#0050ff",
                    fontSize: isMobile ? 17 : 20,
                    border: "1px solid #0050FF",
                    borderRadius: 5,
                    maxWidth: 180,
                  }}
                  onClick={clickHandle}
                >
                  {titleButton}
                </button>
              </div>
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
                src="images/p1.webp"
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
  );
}

export default memo(Type3);
