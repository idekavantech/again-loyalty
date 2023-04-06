/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/**
 *
 * Header
 *
 */
import React, { memo } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import Link from "next/link";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";
import HeaderIconsWidget from "@saas/components/HeaderIconsWidget";
import { MENU_DRAWER } from "@saas/stores/ui/constants";
import { white } from "@saas/utils/colors";
import { useRouter } from "next/router";
import {
  makeSelectBusiness,
  makeSelectBusinessCoverImage,
  makeSelectBusinessThemeConfig,
  makeSelectBusinessWorkingHours,
  makeSelectHierarchy,
  makeSelectIsBranch,
} from "@saas/stores/business/selector";
import {
  makeSelectUrlPrefix,
  makeSelectWidgets,
} from "@saas/stores/plugins/selector";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { HEADER_ICONS_WIDGET } from "@saas/stores/plugins/constants";
import useTheme from "@material-ui/core/styles/useTheme";

function Header({
  themeColor,
  widgets,
  dispatch,
  transparent,
  noBack,
  isBranch,
  business,
}) {
  const router = useRouter();
  const theme = useTheme();
  const iconsWidget = widgets[HEADER_ICONS_WIDGET] || [];
  const title = isBranch
    ? business.super_business.title
    : business.revised_title;
  return (
    <AppBar
      position="sticky"
      style={{
        boxShadow: transparent
          ? "none"
          : "0px 1px 4px rgba(0, 0, 0, 0.08), 0px 4px 12px rgba(0, 0, 0, 0.04)",
        backgroundColor: transparent ? "transparent" : "#ffffff",
        color: transparent ? "#ffffff" : themeColor,
        position: transparent ? "absolute" : "sticky",
      }}
      elevation={2}
    >
      <Toolbar variant="dense" className="px-2 d-flex justify-content-between">
        <div className="d-flex align-items-center min-width-0">
          {!noBack && (
            <IconButton className="p-1" onClick={() => router.back()}>
              <ChevronRightRoundedIcon color="secondary" />
            </IconButton>
          )}
          <Link href="/" passHref>
            <h1
              style={{ color: theme.palette.secondary.main }}
              className={`u-cursor-pointer u-text-ellipse u-fontWeightBold text-center u-fontLarge ${
                noBack && "mr-1"
              }`}
            >
              {title}
            </h1>
          </Link>
        </div>
        <div className="flex-shrink-0 d-flex">
          <HeaderIconsWidget
            widgets={iconsWidget}
            dispatch={dispatch}
            themeColor={transparent ? white : themeColor}
            badgeColor={themeColor}
          />
          <IconButton
            className="p-1"
            edge="start"
            color="secondary"
            aria-label="menu"
            onClick={() => pushParamsToUrl(MENU_DRAWER)}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = createStructuredSelector({
  workingHours: makeSelectBusinessWorkingHours(),
  business: makeSelectBusiness(),
  coverImage: makeSelectBusinessCoverImage(),
  themeConfig: makeSelectBusinessThemeConfig(),
  urlPrefix: makeSelectUrlPrefix(),
  hierarchy: makeSelectHierarchy(),
  widgets: makeSelectWidgets(),
  isBranch: makeSelectIsBranch(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Header);
