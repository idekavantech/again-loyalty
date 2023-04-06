import React, { memo, useEffect, useMemo, useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";

import { makeSelectUrlPrefix } from "@saas/stores/plugins/selector";
import Paper from "@material-ui/core/Paper";
import {
  coal,
  jungleI,
  jungleIII,
  pollution,
  strawberryI,
  strawberryIII,
} from "@saas/utils/colors";
import LazyImage from "@saas/components/LazyImage";
import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";
import { isBusinessOpenNow } from "@saas/utils/helpers/isBusinessOpenNow";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { getWorkingDayStart } from "@saas/utils/helpers/getWorkingDayStart";

import { getWeekDays } from "@saas/utils/constants/date";

import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { SHOPPING_PLUGIN_URL } from "@saas/utils/constants/plugins";
import { useResponsive } from "@saas/utils/hooks/useResponsive";


const BUSINESS_IS_OPEN = "BUSINESS_IS_OPEN";
const BUSINESS_IS_PREORDER = "BUSINESS_IS_PREORDER";
const BUSINESS_IS_CLOSE = "BUSINESS_IS_CLOSE";

function Cart({
  branch,
  urlPrefix,
  setHoveredMarkerId,
  selectedMarkerId,
  themeColor,
  showImage,
  hasOrdering,
  buttons,
}) {
  const { minWidth768 } = useResponsive();
  const [isTelShown, setTelShown] = useState(false);
  const router = useRouter();
  const nextDay = getWorkingDayStart(branch?.working_hours);
  const nextWorkingHour = useMemo(
    () =>
      `${nextDay?.dayName} ${englishNumberToPersianNumber(
        nextDay?.openingTime
      )} تا ${englishNumberToPersianNumber(nextDay?.closingTime)}`,
    [nextDay]
  );

  const [todayShifts, setTodayShifts] = useState(null);

  useEffect(() => {
    const today = new Date().getDay();
    let changedTodayForOurFormat;
    today == 0
      ? (changedTodayForOurFormat = 7)
      : (changedTodayForOurFormat = today);
    getWeekDays.map((label) => {
      if (changedTodayForOurFormat == label) {
        setTodayShifts(branch?.working_hours[label]);
      }
    });
  }, [branch?.working_hours]);

  const businessIsOpen = branch?.plugins_config?.shopping?.data?.is_open;
  const businessIsOpenNow = isBusinessOpenNow(branch?.working_hours);
  const businessHasPreOrder = branch?.has_pre_order;

  let businessIsOpenStateKey;
  if (businessIsOpen) {
    if (businessIsOpenNow) {
      businessIsOpenStateKey = BUSINESS_IS_OPEN;
    } else if (!businessIsOpenNow) {
      if (businessHasPreOrder) {
        businessIsOpenStateKey = BUSINESS_IS_PREORDER;
      } else {
        businessIsOpenStateKey = BUSINESS_IS_CLOSE;
      }
    }
  } else {
    businessIsOpenStateKey = BUSINESS_IS_CLOSE;
  }

  const businessIsOpenStates = {
    [BUSINESS_IS_OPEN]: {
      text: "سفارش می‌پذیریم",
      icon: `/images/open-sign.svg`,
      color: jungleI,
      backgroundColor: hexToRGBA(jungleIII, 0.2),
      workingHoursTitle: `
      ساعت فعالیت :‌ امروز 
      ${todayShifts?.map(
        (shift) =>
          `${englishNumberToPersianNumber(
            shift.from.substr(0, 5)
          )} تا ${englishNumberToPersianNumber(shift.to.substr(0, 5))} `
      )}
      `,
      buttonText: "خرید از شعبه",
      businessTitleTruncateLength: minWidth768 ? 20 : 13,
    },
    [BUSINESS_IS_PREORDER]: {
      text: "پیش‌سفارش می‌پذیریم",
      icon: `/images/preorder-sign.svg`,
      color: jungleI,
      backgroundColor: hexToRGBA(jungleIII, 0.2),
      workingHoursTitle: `زمان فعالیت بعدی : ${
        nextDay === null ? "تنظیم نشده" : nextWorkingHour.substr(0, 5)
      }`,
      buttonText: "ثبت پیش‌سفارش",
      businessTitleTruncateLength: minWidth768 ? 20 : 9,
    },
    [BUSINESS_IS_CLOSE]: {
      text: "بسته",
      icon: `/images/close-sign.svg`,
      color: strawberryI,
      backgroundColor: hexToRGBA(strawberryIII, 0.2),
      workingHoursTitle: `زمان فعالیت بعدی : ${
        nextDay === null ? "تنظیم نشده" : nextWorkingHour.substr(0, 5)
      }`,
      buttonText: "نمایش شعبه",
      businessTitleTruncateLength: minWidth768 ? 40 : 20,
    },
  };
  const [isHovered, setHover] = useState(false);

  useEffect(() => {
    if (isHovered) {
      setHoveredMarkerId(branch.id);
    }
  }, [isHovered]);

  function getColor(usedThemeColor, color, type, variant) {
    if (variant == "contained") {
      if (type == "text") return usedThemeColor || !color ? "#fff" : color;
      else if (type == "bg") return usedThemeColor ? themeColor : color;
      return "transparent";
    } else if (variant === "outlined") {
      if (type == "border") return usedThemeColor ? themeColor : color;
      else if (type == "text")
        return usedThemeColor ? themeColor : color || "#000";
      return "#fff";
    } else {
      if (type == "text") return usedThemeColor ? themeColor : color || "#000";
      return "transparent";
    }
  }

  return (
    <Paper
      elevation={1}
      style={{
        borderRadius: 8,
        width: minWidth768 ? 300 : 260,
        minHeight: minWidth768
          ? showImage
            ? 360
            : "auto"
          : showImage
          ? 300
          : "auto",
        direction: "rtl",
        border:
          minWidth768 &&
          selectedMarkerId === branch?.id &&
          `2px solid ${themeColor}`,
      }}
      className="mx-4"
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      {showImage && (
        <div
          style={{
            borderRadius:
              minWidth768 && selectedMarkerId === branch?.id
                ? "0px 0px 8px 8px"
                : 8,
            overflow: "hidden",
            height: "160px",
          }}
        >
          <LazyImage src={branch.cover_image_url} />
        </div>
      )}
      <div className="d-flex flex-column justify-content-between p-3">
        <div style={{ height: "100px" }}>
          <div className="d-flex align-items-center justify-content-between">
            <div
              className="d-flex align-items-center u-fontWeightBold"
              style={{ flexGrow: "1" }}
            >
              <div
                style={{
                  color: coal,
                  flexGrow: "1",
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                className="text-right"
              >
                {branch?.title}
              </div>
            </div>
          </div>
          <div
            className="d-flex align-items-center u-font-semi-small u-fontWeightBold mt-1 text-right"
            style={{ color: pollution }}
          >
            {hasOrdering && (
              <LazyImage
                src={businessIsOpenStates[businessIsOpenStateKey]?.icon}
                width={24}
                height={24}
                className="ml-2"
              />
            )}
            <div>
              {businessIsOpenStates[businessIsOpenStateKey]?.workingHoursTitle}
            </div>
          </div>
          <div
            className="d-flex align-items-center u-font-semi-small u-fontWeightBold text-right mt-2"
            style={{ color: pollution }}
          >
            <p
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {branch?.address}
            </p>
          </div>
          {branch.phone_zero_starts && (
            <div
              className="d-flex align-items-center u-font-semi-small u-fontWeightBold mt-1 text-right"
              style={{ color: pollution }}
            >
              <div className="position-relative">
                <a
                  href={`tel:${persianToEnglishNumber(
                    branch.phone_zero_starts
                  )}`}
                  target={"_self"}
                  rel="noopener,noreferrer"
                >
                  تلفن: {englishNumberToPersianNumber(branch.phone_zero_starts)}
                </a>
              </div>
            </div>
          )}
        </div>
        {buttons?.use_default_buttons ? (
          <div className="d-flex align-items-center justify-content-between mt-3">
            <Button
              color="secondary"
              variant={
                selectedMarkerId === branch.id ? "contained" : "outlined"
              }
              style={{
                height: minWidth768 ? 50 : 35,
                width: "48%",
                fontSize: minWidth768 ? 16 : 12,
                whiteSpace: "pre",
              }}
              onClick={() =>
                router.push(
                  `${urlPrefix}/branches/${branch.site_domain}/${SHOPPING_PLUGIN_URL}/`
                )
              }
            >
              {businessIsOpenStates[businessIsOpenStateKey]?.buttonText}
            </Button>
            {minWidth768 ? (
              <Button
                color="secondary"
                variant="outlined"
                className="w-100"
                style={{
                  height: minWidth768 ? 50 : 35,
                  fontSize: minWidth768 ? 16 : 12,
                  width: "48%",
                }}
                onClick={() => setTelShown(true)}
              >
                {isTelShown && branch.phone_zero_starts
                  ? englishNumberToPersianNumber(branch.phone_zero_starts)
                  : "تماس"}
              </Button>
            ) : (
              <a
                href={`tel:${branch.phone_zero_starts}`}
                style={{ height: minWidth768 ? 50 : 35, width: "48%" }}
              >
                <Button
                  color="secondary"
                  variant="outlined"
                  className="w-100"
                  style={{
                    height: minWidth768 ? 50 : 35,
                    fontSize: minWidth768 ? 16 : 12,
                  }}
                >
                  تماس
                </Button>
              </a>
            )}
          </div>
        ) : (
          <div
            className={`d-flex align-items-center justify-content-around flex-wrap mt-3`}
          >
            {buttons?.items?.map((item) => {
              let {
                use_theme_color,
                background_color,
                border_color,
                color,
                variant,
                link_type,
                text,
                num,
                size = "medium",
              } = item;

              if (link_type == "ordering") {
                let disabled =
                  (hasOrdering ? !branch.is_open : false) ||
                  !branch.extra_data.complex_full_site_domain;

                return (
                  <Button
                    color="secondary"
                    variant={variant}
                    disabled={disabled}
                    className={"mt-2"}
                    size={size}
                    style={{
                      width: "48%",
                      whiteSpace: "pre",
                      backgroundColor: getColor(
                        use_theme_color,
                        background_color,
                        "bg",
                        variant
                      ),
                      borderColor: getColor(
                        use_theme_color,
                        border_color,
                        "border",
                        variant
                      ),
                      color: getColor(use_theme_color, color, "text", variant),
                      opacity: disabled ? "0.3" : "1",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      window.open(
                        branch.extra_data.complex_full_site_domain,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                  >
                    {text}
                  </Button>
                );
              } else if (link_type == "phone_num") {
                let phone_num = persianToEnglishNumber(
                  branch.phone_zero_starts
                );
                let disabled = !phone_num;
                return (
                  <Button
                    color="secondary"
                    variant={variant}
                    className="mt-2"
                    disabled={disabled}
                    size={size}
                    style={{
                      width: "48%",
                      backgroundColor: getColor(
                        use_theme_color,
                        background_color,
                        "bg",
                        variant
                      ),
                      borderColor: getColor(
                        use_theme_color,
                        border_color,
                        "border",
                        variant
                      ),
                      color: getColor(use_theme_color, color, "text", variant),
                      opacity: disabled ? "0.3" : "1",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      window.open(
                        `tel:${phone_num}`,
                        "_self",
                        "noopener,noreferrer"
                      );
                    }}
                  >
                    {num}
                  </Button>
                );
              } else if (link_type == "routing") {
                let disabled = !(branch.latitude && branch.longitude);
                // Routing
                return (
                  <Button
                    color="secondary"
                    variant={variant}
                    disabled={disabled}
                    className="mt-2"
                    size={size}
                    style={{
                      width: "48%",
                      backgroundColor: getColor(
                        use_theme_color,
                        background_color,
                        "bg",
                        variant
                      ),
                      borderColor: getColor(
                        use_theme_color,
                        border_color,
                        "border",
                        variant
                      ),
                      color: getColor(use_theme_color, color, "text", variant),
                      opacity: disabled ? "0.3" : "1",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      window.open(
                        `https://www.google.com/maps/dir//${branch.latitude},${branch.longitude}/@,15z`,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                  >
                    مسیریابی
                  </Button>
                );
              }
            })}
          </div>
        )}
      </div>
    </Paper>
  );
}

const mapStateToProps = createStructuredSelector({
    urlPrefix: makeSelectUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Cart);
