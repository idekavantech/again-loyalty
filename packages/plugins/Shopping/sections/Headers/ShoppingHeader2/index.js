import React, { memo } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";

import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import Paper from "@material-ui/core/Paper";
import useTheme from "@material-ui/core/styles/useTheme";
import LazyImage from "@saas/components/LazyImage";

import { noOp } from "@saas/utils/helpers/noOp";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";

import { removeParamsFromUrl } from "@saas/utils/helpers/removeParamsFromUrl";
import {
  makeSelectBusinessWorkingHours,
  makeSelectBusiness,
  makeSelectBusinessCoverImage,
} from "@saas/stores/business/selector";
import HeaderCover from "@saas/components/HeaderCover";
import { CDN_BASE_URL } from "@saas/utils/api";
import { APP_SHOPPINGPAGE_SEARCH_MODAL } from "@saas/stores/plugins/constants";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
function ShoppingHeader2({
  business,
  coverImage,
  isMobile,
  content,
  customization,
}) {
  const theme = useTheme();
  const {minWidth768} = useResponsive()
  const _toggleSearchModal = (isOpen) =>
    isOpen
      ? pushParamsToUrl(APP_SHOPPINGPAGE_SEARCH_MODAL)
      : removeParamsFromUrl(APP_SHOPPINGPAGE_SEARCH_MODAL);
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
  } = customization;

  const matches =
    typeof isMobile === "boolean"
      ? !isMobile
      : minWidth768;
  return (
    <div
      className="mb-0 position-relative"
      style={{
        height: "33vh",
        zIndex: 100,
      }}
    >
      {backgroundType === "image" ? (
        <HeaderCover
          style={{
            position: "absolute",
            maxHeight: "33vh",
            width: "100%",
            zIndex: -1,
          }}
          opacity={opacity / 100}
          className="position-absolute header-top-gradient"
          coverImage={
            backgroundImage ||
            coverImage ||
            `${CDN_BASE_URL}cover-bg-default.jpg`
          }
        />
      ) : (
        <HeaderCover
          style={{
            position: "absolute",
            maxHeight: "33vh",
            width: "100%",
            zIndex: -1,
          }}
          className="position-absolute header-top-gradient"
          overleyBgColor={backgroundColor}
        />
      )}

      <div
        style={{
          height: 160,
          borderTopRightRadius: "16px",
          borderTopLeftRadius: "16px",
        }}
        className="position-absolute left-0 right-0 w-100 bottom-0"
      >
        <div
          className="container d-flex position-relative"
          style={{ height: 95 }}
        >
          <div
            className="u-border-radius-50-percent overflow-hidden position-absolute"
            style={{
              left: 20,
              height: matches ? 150 : 80,
              width: matches ? 150 : 80,
              top: matches ? -75 : -40,
            }}
          >
            {/* {hasLogo ? (
              logo || business?.icon_image_url ? (
                <LazyImage
                  src={logo || business?.icon_image_url}
                  alt={business?.revised_title}
                />
              ) : null
            ) : null} */}

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
                  />
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        {hasSearchBar ? (
          <div
            style={{ maxWidth: 700 }}
            role="button"
            onKeyDown={noOp}
            tabIndex="0"
            onClick={_toggleSearchModal}
            className="u-border-radius-4 position-relative z-index-2 container px-0 mt-2 u-text-dark-grey u-cursor-pointer"
          >
            <Paper
              style={{
                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
                borderRadius: "106px",
                overflow: "hidden",
              }}
              className="mx-4 pr-2 d-flex align-items-center  justify-content-between"
            >
              Searching for products...
              <div
                className="u-border-top-left-radius-4 u-border-bottom-left-radius-4 d-flex justify-content-center align-items-center"
                style={{
                  color: theme.palette.secondary.contrastText,
                  backgroundColor: theme.palette.secondary.main,
                  width: 40,
                  height: 40,
                }}
              >
                <SearchRoundedIcon fontSize="small" />
              </div>
            </Paper>
          </div>
        ) : null}
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  workingHours: makeSelectBusinessWorkingHours(),
  business: makeSelectBusiness(),
  coverImage: makeSelectBusinessCoverImage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ShoppingHeader2);
