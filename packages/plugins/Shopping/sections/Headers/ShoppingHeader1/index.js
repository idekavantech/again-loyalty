import React, { memo, useMemo } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";

import Paper from "@material-ui/core/Paper";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";

import { noOp } from "@saas/utils/helpers/noOp";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";

import { isBusinessOpenNow } from "@saas/utils/helpers/isBusinessOpenNow";

import { getBusinessAvailableTime } from "@saas/utils/helpers/getBusinessAvailableTime";

import { removeParamsFromUrl } from "@saas/utils/helpers/removeParamsFromUrl";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import Icon from "@saas/components/Icon";
import { PEN } from "@saas/icons";
import {
  makeSelectBusinessWorkingHours,
  makeSelectIsBranch,
  makeSelectBusiness,
} from "@saas/stores/business/selector";
import { BRANCH_SELECTION_MODAL } from "@saas/stores/ui/constants";
import { coal } from "@saas/utils/colors";
import LazyImage from "@saas/components/LazyImage";
import { APP_SHOPPINGPAGE_SEARCH_MODAL } from "@saas/stores/plugins/constants";
import { makeSelectPlugin } from "@saas/stores/plugins/selector";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import useTheme from "@material-ui/core/styles/useTheme";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
function ShoppingHeader1({
  themeColor,
  pluginData,
  workingHours,
  isBranch,
  business,
  content,
  customization,
}) {
  const theme = useTheme();

  const _toggleSearchModal = (isOpen) =>
    isOpen
      ? pushParamsToUrl(APP_SHOPPINGPAGE_SEARCH_MODAL)
      : removeParamsFromUrl(APP_SHOPPINGPAGE_SEARCH_MODAL);

  const workingDayStart = getBusinessAvailableTime(workingHours);
  const { minWidth768 } = useResponsive();
  const isOpenPermanently = pluginData.data.is_open !== false;

  const isOpenOutOfWorkingHours =
    isBusinessOpenNow(workingHours) ||
    business?.is_open_out_of_working_hours === true;
  const {
    logo: { value: logo, has_logo: hasLogo },
    search_bar: { has_search_bar: hasSearchBar = true } = {},
  } = content;
  const {
    background: {
      background_type: backgroundType,
      background_image: backgroundImage,
      background_color: backgroundColor,
      opacity = 100,
    } = {},
    showcases: { is_branch_word_visible: isBranchVisible = true } = {},
  } = customization;

  const outOfWorkingHoursPreorderText = useMemo(() => {
    if (!workingDayStart?.dayName) {
      return null;
    }
    return (
      <div className="text-center u-font-medium mt-1 d-flex align-items-center justify-content-center py-2">
        {`خارج از ساعت کاری: شروع سفارش‌گیری از ${
          workingDayStart.dayName
        } ساعت ${englishNumberToPersianNumber(workingDayStart.openingTime)}`}
      </div>
    );
  }, [workingDayStart]);
  if (!workingDayStart) {
    return null;
  }
  if (minWidth768)
    return (
      <div
        className=" mb-0 pt-3 position-relative"
        style={{
          zIndex: 100,
          backgroundColor: backgroundType === "color" && backgroundColor,
        }}
      >
        {backgroundImage && backgroundType === "image" && (
          <div
            className="position-absolute left-0 u-top-0 h-100 w-100 d-block"
            style={{ opacity: opacity / 100, zIndex: -1 }}
          >
            <LazyImage src={backgroundImage} />
          </div>
        )}
        <div
          className="mx-auto left-0 right-0 pb-2"
          style={{ top: 50, maxWidth: 700 }}
        >
          {hasLogo ? (
            <div
              className="c-profile-sec-modal mx-auto position-relative overflow-hidden"
              style={{ height: 150, width: 150 }}
            >
              <div
                className="w-100 h-100 position-absolute"
                style={{
                  boxShadow: "inset 0px 0px 16px rgba(0, 0, 0, 0.05)",
                  borderRadius: "50%",
                }}
              />

              {logo || business?.icon_image_url ? (
                <LazyImage
                  src={logo || business?.icon_image_url}
                  alt={business?.revised_title}
                  style={{ objectFit: "contain" }}
                />
              ) : null}
            </div>
          ) : null}
          {isBranch ? (
            <div className="d-flex mt-3 justify-content-center u-font-semi-small-r">
              <div>
                {isBranchVisible ? "شعبه:" : null}‌ {business?.revised_title}
              </div>
              <div
                className="u-cursor-pointer u-fontWeightBold"
                style={{ color: themeColor, paddingRight: 3 }}
                role="button"
                onKeyDown={noOp}
                tabIndex="0"
                onClick={() => pushParamsToUrl(BRANCH_SELECTION_MODAL)}
              >
                <Icon icon={PEN} color={themeColor} width={12} height={12} />
                تغییر
              </div>
            </div>
          ) : null}
          <div>
            {isOpenPermanently ? (
              isOpenOutOfWorkingHours ? (
                <div className="justify-content-center u-fontVeryLarge mt-2 d-flex align-items-center">
                  <div className="pulse-container ml-2">
                    <div className="position-absolute">
                      <div
                        className="pulse-outer-circle"
                        style={{ background: coal }}
                      />
                    </div>
                    <div className="position-absolute">
                      <div
                        className="pulse-inner-circle"
                        style={{ background: coal }}
                      />
                    </div>
                  </div>
                  {isBusinessOpenNow(workingHours)
                    ? "سفارش می‌پذیریم"
                    : "پیش‌سفارش می‌پذیریم"}
                </div>
              ) : (
                outOfWorkingHoursPreorderText
              )
            ) : (
              <div>
                <div className="text-center u-font-medium mt-1 d-flex align-items-center justify-content-center py-2">
                  موقتا قادر به دریافت سفارش نیستیم.
                </div>
              </div>
            )}
          </div>
          {hasSearchBar ? (
            <section>
              <Paper
                elevation={2}
                style={{
                  borderRadius: "106px",
                  overflow: "hidden",
                  height: 56,
                  zIndex: 2,
                }}
                onClick={_toggleSearchModal}
                className="mx-3 mt-5 u-text-dark-grey d-flex align-items-center pr-4 justify-content-between u-cursor-pointer"
              >
                جستجوی محصولات ...
                <div
                  className="u-border-top-left-radius-4 u-border-bottom-left-radius-4 d-flex justify-content-center align-items-center"
                  style={{
                    width: 56,
                    height: 56,
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.contrastText,
                  }}
                >
                  <SearchRoundedIcon />
                </div>
              </Paper>
            </section>
          ) : null}
        </div>
      </div>
    );
  return (
    <div
      className="shopping-header mb-0 pt-3 position-relative"
      style={{
        backgroundColor: backgroundType === "color" && backgroundColor,
      }}
    >
      {backgroundImage && backgroundType === "image" && (
        <div className="position-absolute left-0 u-top-0 h-100 w-100 d-block">
          <LazyImage src={backgroundImage} style={{ opacity: opacity / 100 }} />
        </div>
      )}
      <div className="mx-auto left-0 right-0 pb-2" style={{ top: 40 }}>
        {hasLogo ? (
          <div
            className="mt-1 c-profile-sec-modal mx-auto position-relative overflow-hidden"
            style={{
              height: 77,
              width: 77,
            }}
          >
            <div
              className="w-100 h-100 position-absolute"
              style={{
                boxShadow: "inset 0px 0px 16px rgba(0, 0, 0, 0.05)",
                borderRadius: "50%",
              }}
            />
            {logo || business?.icon_image_url ? (
              <LazyImage
                src={logo || business?.icon_image_url}
                alt={business?.revised_title}
              />
            ) : null}
          </div>
        ) : null}
        {isBranch ? (
          <div className="d-flex justify-content-center u-font-semi-small-r mt-3">
            <div>
              {isBranchVisible ? "شعبه:" : null}‌ {business?.revised_title}
            </div>
            <div
              className="u-cursor-pointer u-fontWeightBold"
              style={{ color: themeColor, paddingRight: 3 }}
              role="button"
              onKeyDown={noOp}
              tabIndex="0"
              onClick={() => pushParamsToUrl(BRANCH_SELECTION_MODAL)}
            >
              <Icon icon={PEN} color={themeColor} width={12} height={12} />
              تغییر
            </div>
          </div>
        ) : null}
        <div>
          {isOpenPermanently ? (
            isOpenOutOfWorkingHours ? (
              <div
                className="justify-content-center u-fontVeryLarge mt-2 d-flex align-items-center"
                style={{ zIndex: 2 }}
              >
                <div className="pulse-container ml-2">
                  <div className="position-absolute">
                    <div
                      className="pulse-outer-circle"
                      style={{ background: coal }}
                    />
                  </div>
                  <div className="position-absolute">
                    <div
                      className="pulse-inner-circle"
                      style={{ background: coal }}
                    />
                  </div>
                </div>
                {isBusinessOpenNow(workingHours)
                  ? "سفارش می‌پذیریم"
                  : "پیش‌سفارش می‌پذیریم"}
              </div>
            ) : (
              outOfWorkingHoursPreorderText
            )
          ) : (
            <div>
              <div className="text-center u-font-medium mt-1 d-flex align-items-center justify-content-center py-2">
                موقتا قادر به دریافت سفارش نیستیم.
              </div>
            </div>
          )}
        </div>
        <div></div>
        {hasSearchBar ? (
          <Paper
            elevation={2}
            style={{
              borderRadius: "106px",
              overflow: "hidden",
              height: 40,
              zIndex: 2,
            }}
            onClick={_toggleSearchModal}
            className="mx-3 mt-5 mb-2 u-text-dark-grey d-flex align-items-center pr-4 justify-content-between u-cursor-pointer"
          >
            جستجوی محصولات ...
            <div
              className="u-border-top-left-radius-4 u-border-bottom-left-radius-4 d-flex justify-content-center align-items-center"
              style={{
                width: 40,
                height: 40,
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
              }}
            >
              <SearchRoundedIcon fontSize="small" />
            </div>
          </Paper>
        ) : null}
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  workingHours: makeSelectBusinessWorkingHours(),
  isBranch: makeSelectIsBranch(),
  business: makeSelectBusiness(),
  pluginData: makeSelectPlugin(SHOPPING_PLUGIN),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ShoppingHeader1);
