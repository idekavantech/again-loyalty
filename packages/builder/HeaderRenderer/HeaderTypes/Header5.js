import React, { memo } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import MenuIcon from "@material-ui/icons/Menu";
import Paper from "@material-ui/core/Paper";
import {
  makeSelectBusiness,
  makeSelectBusinessCoverImage,
  makeSelectBusinessThemeConfig,
  makeSelectBusinessWorkingHours,
  makeSelectIsBranch,
} from "@saas/stores/business/selector";
import Button from "@material-ui/core/Button";
import useTheme from "@material-ui/core/styles/useTheme";
import IconsDictionary from "@saas/utils/IconsDictionary";
import { MENU_DRAWER } from "@saas/stores/ui/constants";
import {
  HEADER_LOGO_VISIBILITY,
  HEADER_OVER_POSITION,
  HEADER_SEARCH_VISIBILITY,
  HEADER_TITLE_VISIBILITY,
} from "@saas/utils/constants/headerConstants";

import {
  makeSelectUrlPrefix,
  makeSelectWidgets,
} from "@saas/stores/plugins/selector";
import { useRouter } from "next/router";
import {
  APP_SHOPPINGPAGE_SEARCH_MODAL,
  HEADER_ICONS_WIDGET,
} from "@saas/stores/plugins/constants";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";

import LazyImage from "@saas/components/LazyImage";
import Link from "next/link";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function Header5({
  customization,
  urlPrefix,
  isBranch,
  business,
  widgets,
  isMobile,
  header_transparent,
}) {
  const {
    layout: {
      [HEADER_LOGO_VISIBILITY]: _HEADER_LOGO_VISIBILITY,
      [HEADER_TITLE_VISIBILITY]: _HEADER_TITLE_VISIBILITY,
      [HEADER_SEARCH_VISIBILITY]: _HEADER_SEARCH_VISIBILITY,
      [HEADER_OVER_POSITION]: __HEADER_OVER_POSITION,
    },
  } = customization;
  const _HEADER_OVER_POSITION = header_transparent && __HEADER_OVER_POSITION;

  const logo = business.icon_image_url;
  const title = isBranch
    ? business.super_business.title
    : business.revised_title;
  const { minWidth768 } = useResponsive();

  const isDesktop = typeof isMobile === "boolean" ? !isMobile : minWidth768;
  const iconsWidget = widgets[HEADER_ICONS_WIDGET] || [];
  const theme = useTheme();
  const router = useRouter();
  if (!customization) {
    return null;
  }
  return (
    <Paper
      elevation={3}
      className="w-100"
      style={{ overflowX: "hidden", borderRadius: 0 }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `

        .header_5_menu_item_hover{
          font-weight: 400;
          transition: all 0.3s ease-in-out;
        }

        .header_5_menu_item_hover:hover{
          font-weight: 700;
        }

        .sub-menu-item{
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }

        .sub-menu-item:hover{
          background: #eeeeee;
          color: ${theme.palette.secondary.main}
        }

      `,
        }}
      ></style>
      {isDesktop ? (
        <div
          id="header_5"
          className={`w-100 ${
            _HEADER_OVER_POSITION
              ? "position-absolute z-index-1"
              : "position-relative"
          }`}
        >
          <Paper
            className="w-100 d-flex flex-1 px-4 py-3"
            style={{
              backgroundColor: _HEADER_OVER_POSITION
                ? "transparent"
                : "#ffffff",

              borderRadius: 0,
            }}
            elevation={_HEADER_OVER_POSITION ? 0 : 3}
          >
            <div className="d-flex justify-content-start align-items-center flex-1  ml-4">
              {_HEADER_LOGO_VISIBILITY ? (
                <Link
                  className="u-cursor-pointer d-flex align-items-center"
                  href={`${urlPrefix}/`}
                >
                  <LazyImage
                    src={logo}
                    width={40}
                    height={40}
                    alt={business.revised_title}
                  />
                </Link>
              ) : null}
              {_HEADER_TITLE_VISIBILITY ? (
                <Link
                  className="d-block px-2 u-cursor-pointer"
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: _HEADER_OVER_POSITION
                      ? "#ffffff"
                      : theme.palette.secondary.main,
                  }}
                  href={`${urlPrefix}/`}
                >
                  {title}
                </Link>
              ) : null}
            </div>
            <div className="flex-1 d-flex justify-content-end align-items-center">
              {_HEADER_SEARCH_VISIBILITY ? (
                <Button
                  className="position-relative mx-1"
                  color={_HEADER_OVER_POSITION ? "secondary" : ""}
                  style={{
                    minWidth: "unset",
                    boxShadow: "unset",
                    color: _HEADER_OVER_POSITION
                      ? "#ffffff"
                      : theme.palette.secondary.main,
                    width: 40,
                    height: 40,
                  }}
                  onClick={() => pushParamsToUrl(APP_SHOPPINGPAGE_SEARCH_MODAL)}
                >
                  <SearchRoundedIcon />
                </Button>
              ) : null}
              {iconsWidget &&
                iconsWidget.map((pluginIcon) => {
                  const Icon = IconsDictionary[pluginIcon.icon];
                  return (
                    <Button
                      className="position-relative mx-1"
                      key={pluginIcon.id}
                      id="shopping-cart"
                      color={_HEADER_OVER_POSITION ? "" : "secondary"}
                      style={{
                        minWidth: "unset",
                        boxShadow: "unset",
                        color: _HEADER_OVER_POSITION
                          ? "#ffffff"
                          : theme.palette.secondary.main,
                        width: 40,
                        height: 40,
                      }}
                      onClick={() =>
                        pluginIcon.link
                          ? router.push(pluginIcon.link)
                          : pluginIcon.item
                          ? pushParamsToUrl(pluginIcon.item)
                          : null
                      }
                    >
                      {typeof pluginIcon.itemsAmount === "number" ? (
                        <div
                          className="position-absolute p-1 d-flex align-items-center justify-content-center"
                          style={{
                            top: -10,
                            left: -10,
                            height: 23,
                            width: 23,
                            borderRadius: "50%",
                            backgroundColor: theme.palette.secondary.main,
                            border: "1px solid #FFFFFF",
                            color: "#ffffff",
                          }}
                        >
                          {englishNumberToPersianNumber(pluginIcon.itemsAmount)}
                        </div>
                      ) : null}
                      <Icon />
                    </Button>
                  );
                })}
              <Button
                className="position-relative mx-1"
                color={_HEADER_OVER_POSITION ? "secondary" : ""}
                style={{
                  minWidth: "unset",
                  boxShadow: "unset",
                  color: _HEADER_OVER_POSITION
                    ? "#ffffff"
                    : theme.palette.secondary.main,
                  width: 40,
                  height: 40,
                }}
                onClick={() => pushParamsToUrl(MENU_DRAWER)}
              >
                <MenuIcon />
              </Button>
            </div>
          </Paper>
        </div>
      ) : (
        <div
          id="header_5"
          className={`w-100 ${
            _HEADER_OVER_POSITION
              ? "position-absolute z-index-1"
              : "position-relative "
          }`}
        >
          <Paper
            className="w-100 d-flex flex-1 p-2"
            style={{
              backgroundColor: _HEADER_OVER_POSITION
                ? "transparent"
                : "#ffffff",
              borderRadius: 0,
            }}
            elevation={_HEADER_OVER_POSITION ? 0 : 3}
          >
            <div className="d-flex justify-content-start align-items-center flex-1">
              <Link
                className="d-flex align-items-center"
                href={`${urlPrefix}/`}
              >
                {_HEADER_LOGO_VISIBILITY ? (
                  <LazyImage
                    src={logo}
                    width={28}
                    height={28}
                    alt={business.revised_title}
                  />
                ) : null}
                {_HEADER_TITLE_VISIBILITY ? (
                  <div
                    className="px-2"
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: _HEADER_OVER_POSITION
                        ? "#ffffff"
                        : theme.palette.secondary.main,
                    }}
                  >
                    {title}
                  </div>
                ) : null}
              </Link>
            </div>

            <div className="flex-1 d-flex justify-content-end align-items-center">
              {_HEADER_SEARCH_VISIBILITY ? (
                <Button
                  className="position-relative mx-1"
                  color={!_HEADER_OVER_POSITION ? "secondary" : ""}
                  style={{
                    minWidth: "unset",
                    boxShadow: "unset",
                    color: _HEADER_OVER_POSITION
                      ? "#ffffff"
                      : theme.palette.secondary.main,
                    width: 40,
                    height: 40,
                  }}
                  onClick={() => pushParamsToUrl(APP_SHOPPINGPAGE_SEARCH_MODAL)}
                >
                  <SearchRoundedIcon />
                </Button>
              ) : null}
              {iconsWidget &&
                iconsWidget.map((pluginIcon) => {
                  const Icon = IconsDictionary[pluginIcon.icon];
                  return (
                    <Button
                      className="position-relative mx-1"
                      key={pluginIcon.id}
                      id="shopping-cart"
                      color={_HEADER_OVER_POSITION ? "" : "secondary"}
                      style={{
                        color: _HEADER_OVER_POSITION ? "#ffffff" : "",
                        minWidth: "unset",
                        boxShadow: "unset",
                        width: 40,
                        height: 40,
                      }}
                      onClick={() =>
                        pluginIcon.link
                          ? router.push(pluginIcon.link)
                          : pluginIcon.item
                          ? pushParamsToUrl(pluginIcon.item)
                          : null
                      }
                    >
                      {typeof pluginIcon.itemsAmount === "number" ? (
                        <div
                          className="position-absolute p-1 d-flex align-items-center justify-content-center"
                          style={{
                            top: -10,
                            left: -10,
                            height: 23,
                            width: 23,
                            borderRadius: "50%",
                            backgroundColor: theme.palette.secondary.main,
                            border: "1px solid #FFFFFF",
                            color: "#ffffff",
                          }}
                        >
                          {englishNumberToPersianNumber(pluginIcon.itemsAmount)}
                        </div>
                      ) : null}
                      <Icon />
                    </Button>
                  );
                })}
              <Button
                className="position-relative mx-1"
                color={_HEADER_OVER_POSITION ? "secondary" : ""}
                style={{
                  minWidth: "unset",
                  boxShadow: "unset",
                  color: _HEADER_OVER_POSITION
                    ? "#ffffff"
                    : theme.palette.secondary.main,
                  width: 40,
                  height: 40,
                }}
                onClick={() => pushParamsToUrl(MENU_DRAWER)}
              >
                <MenuIcon />
              </Button>
            </div>
          </Paper>
        </div>
      )}
    </Paper>
  );
}

const mapStateToProps = createStructuredSelector({
  workingHours: makeSelectBusinessWorkingHours(),
  business: makeSelectBusiness(),
  coverImage: makeSelectBusinessCoverImage(),
  themeConfig: makeSelectBusinessThemeConfig(),
  urlPrefix: makeSelectUrlPrefix(),
  widgets: makeSelectWidgets(),
  isBranch: makeSelectIsBranch(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Header5);
