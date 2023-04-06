import React, { memo, useEffect, useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import MenuIcon from "@material-ui/icons/Menu";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import Paper from "@material-ui/core/Paper";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import {
  makeSelectBusiness,
  makeSelectBusinessCoverImage,
  makeSelectBusinessThemeConfig,
  makeSelectBusinessWorkingHours,
  makeSelectHierarchy,
  makeSelectIsBranch,
} from "@saas/stores/business/selector";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import useTheme from "@material-ui/core/styles/useTheme";
import { cement } from "@saas/utils/colors";
import IconsDictionary from "@saas/utils/IconsDictionary";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { slugify } from "@saas/utils/helpers/slugify";

import { MENU_DRAWER } from "@saas/stores/ui/constants";
import {
  HEADER_CATEGORIES_VISIBILITY,
  HEADER_LOGO_VISIBILITY,
  HEADER_OVER_POSITION,
  HEADER_SEARCH_VISIBILITY,
  HEADER_TITLE_VISIBILITY,
} from "@saas/utils/constants/headerConstants";
import {
  defaultNavigationMenus,
  MAIN_HEADER_NAVIGATION_MENU,
} from "@saas/utils/constants/navigationMenus";
import {
  makeSelectUrlPrefix,
  makeSelectWidgets,
} from "@saas/stores/plugins/selector";
import { useRouter } from "next/router";
import {
  APP_SHOPPINGPAGE_SEARCH_MODAL,
  HEADER_ICONS_WIDGET,
} from "@saas/stores/plugins/constants";
import { SHOPPING_PLUGIN_URL } from "@saas/utils/constants/plugins";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import LazyImage from "@saas/components/LazyImage";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function Header6({
  themeConfig,
  urlPrefix,
  hierarchy,
  isBranch,
  business,
  widgets,
  customization,
  isMobile,
  header_transparent,
}) {
  const {
    layout: {
      [HEADER_LOGO_VISIBILITY]: _HEADER_LOGO_VISIBILITY,
      [HEADER_TITLE_VISIBILITY]: _HEADER_TITLE_VISIBILITY,
      [HEADER_SEARCH_VISIBILITY]: _HEADER_SEARCH_VISIBILITY,
      [HEADER_OVER_POSITION]: __HEADER_OVER_POSITION,
      [HEADER_CATEGORIES_VISIBILITY]: _HEADER_CATEGORIES_VISIBILITY,
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
  const [menus, setMenus] = useState([hierarchy]);
  const [subMenu, setSubMenu] = useState([]);
  const onSubMenuItemHover = (index, item) => {
    const _menus = [...subMenu];
    _menus.splice(index);
    _menus[index] = item;
    setSubMenu(_menus);
  };
  const onMenuItemHover = (index, item) => {
    const _menus = [...menus];
    _menus.splice(index);
    _menus[index] = item;
    setMenus(_menus);
  };
  const theme = useTheme();
  const router = useRouter();
  const [headerMenu, setHeaderMenu] = useState(null);
  const [categorySubMenu, toggleCategorySubMenu] = useState("");

  useEffect(() => {
    if (
      themeConfig &&
      themeConfig.navigation_menus &&
      themeConfig.navigation_menus[MAIN_HEADER_NAVIGATION_MENU]
    ) {
      setHeaderMenu(themeConfig.navigation_menus[MAIN_HEADER_NAVIGATION_MENU]);
      setSubMenu([themeConfig.navigation_menus[MAIN_HEADER_NAVIGATION_MENU]]);
    } else {
      setHeaderMenu(
        defaultNavigationMenus(urlPrefix)[MAIN_HEADER_NAVIGATION_MENU]
      );
      setSubMenu([
        defaultNavigationMenus(urlPrefix)[MAIN_HEADER_NAVIGATION_MENU],
      ]);
    }
  }, [themeConfig]);

  return (
    <Paper elevation={3} style={{ borderRadius: 0 }} className="w-100">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .sub-menu-item{
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }

        .sub-menu-item:hover{
          background: #eeeeee;
          color: ${theme.palette.secondary.main}
        }

        .orderButton{
          box-shadow: none;
        }

        .orderButton:hover{
          box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2)
                    , 0px 2px 2px 0px rgba(0,0,0,0.14)
                    , 0px 1px 5px 0px rgba(0,0,0,0.12);
        }

      `,
        }}
      ></style>
      {isDesktop ? (
        <div
          className={`w-100 ${
            _HEADER_OVER_POSITION
              ? "position-absolute z-index-1"
              : "position-relative"
          }`}
        >
          <div
            className={
              "flex-1 d-flex flex-row-reverse justify-content-end align-items-center py-2 px-5"
            }
            style={{
              backgroundColor: "rgba(102, 126, 138, 0.6)",
              borderRadius: "",
            }}
          >
            <div className="d-flex justify-content-between w-100">
              <div className="d-flex">
                <div className="ml-4">
                  <IconButton
                    className="p-1 text-white"
                    edge="start"
                    aria-label="menu"
                    onClick={() => pushParamsToUrl(MENU_DRAWER)}
                  >
                    <PersonRoundedIcon />
                  </IconButton>
                </div>
                {iconsWidget &&
                  iconsWidget.map((pluginIcon) => {
                    const Icon = IconsDictionary[pluginIcon.icon];
                    return (
                      <div
                        key={pluginIcon.id}
                        className="d-flex align-items-center"
                      >
                        <div className="ml-2">
                          <IconButton
                            id="shopping-cart"
                            className="p-1 text-white"
                            edge="start"
                            aria-label="menu"
                            onClick={() =>
                              pluginIcon.link
                                ? router.push(pluginIcon.link)
                                : pluginIcon.item
                                ? pushParamsToUrl(pluginIcon.item)
                                : null
                            }
                          >
                            <Icon />
                          </IconButton>
                        </div>
                        {typeof pluginIcon.itemsAmount === "number" ? (
                          <div
                            className="p-1 d-flex align-items-center justify-content-center ml-4"
                            style={{
                              height: 24,
                              width: 24,
                              backgroundColor: theme.palette.secondary.main,
                              border: "1px solid #FFFFFF",
                              color: "#ffffff",
                            }}
                          >
                            {englishNumberToPersianNumber(
                              pluginIcon.itemsAmount
                            )}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                {_HEADER_SEARCH_VISIBILITY ? (
                  <div
                    className="px-3 py-1 u-cursor-pointer d-flex align-items-center justify-content-between"
                    onClick={() =>
                      pushParamsToUrl(APP_SHOPPINGPAGE_SEARCH_MODAL)
                    }
                    style={{
                      width: 200,
                      backgroundColor: cement,
                      color: "white",
                      borderRadius: 4,
                      fontSize: 12,
                      height: 36,
                    }}
                  >
                    جستجو کنید...
                    <SearchRoundedIcon style={{ width: 18 }} />
                  </div>
                ) : null}
              </div>

              <Link href={`${urlPrefix}/s`} passHref>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: theme.palette.secondary.main,
                    color: "white",
                  }}
                  className="orderButton"
                >
                  سفارش آنلاین
                </Button>
              </Link>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "rgba(102, 126, 138, 0.4)",
              borderRadius: "",
            }}
          >
            <div
              className="w-100 d-flex flex-1 py-1 px-5"
              style={{ minHeight: 54 }}
            >
              <div className="d-flex position-relative justify-content-start align-items-center flex-1">
                <Link
                  className="d-flex align-items-center u-cursor-pointer"
                  href={`${urlPrefix}/`}
                >
                  {_HEADER_LOGO_VISIBILITY ? (
                    <LazyImage
                      src={logo}
                      width={40}
                      height={40}
                      alt={business.revised_title}
                    />
                  ) : null}
                  {_HEADER_TITLE_VISIBILITY ? (
                    <div
                      className="px-2"
                      style={{ fontSize: 16, color: "white" }}
                    >
                      {title}
                    </div>
                  ) : null}
                </Link>
                {headerMenu &&
                  headerMenu.links.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex"
                      onMouseOver={() => {
                        if (item.links && item.links.length) {
                          toggleCategorySubMenu(item.id);
                        }
                      }}
                      onMouseOut={() => {
                        if (item.links && item.links.length) {
                          toggleCategorySubMenu("");
                        }
                      }}
                    >
                      <Link
                        className="d-flex align-items-center px-2 u-cursor-pointer header_6_menu_item_hover"
                        style={{
                          color: "white",
                          fontSize: 13,
                        }}
                        onMouseOver={() => {
                          if (item.links && item.links.length) {
                            toggleCategorySubMenu(item.id);
                            setSubMenu([item]);
                          }
                        }}
                        href={item.link || ""}
                      >
                        <div>{item.title}</div>
                        {item.links?.length ? (
                          <div className="d-flex">
                            <KeyboardArrowDownRoundedIcon
                              style={{ fontSize: 20 }}
                            />
                          </div>
                        ) : null}
                      </Link>
                      <Paper
                        elevation={3}
                        className="position-absolute d-flex"
                        style={{
                          borderRadius: 0,
                          zIndex: 1000,
                          width: "90%",
                          right: 10,
                          top: 40,
                          opacity: categorySubMenu === item.id ? 1 : 0,
                          transition: "all 0.15s ease-in-out",
                          pointerEvents:
                            categorySubMenu === item.id ? "auto" : "none",
                        }}
                      >
                        {subMenu.map((menu, index) => (
                          <div
                            key={menu.id}
                            className="col-3 px-0"
                            style={{
                              borderLeft: "1px solid #eeeeee",
                              maxWidth: "min-content",
                            }}
                          >
                            {menu.links &&
                              menu.links.map((item) => (
                                <Link
                                  style={{
                                    background:
                                      subMenu[index + 1] &&
                                      subMenu[index + 1].id === item.id
                                        ? "#f5f5f5"
                                        : "",
                                    whiteSpace: "nowrap",
                                  }}
                                  className="d-block p-4 u-cursor-pointer sub-menu-item"
                                  onMouseOver={() => {
                                    onSubMenuItemHover(index + 1, item);
                                  }}
                                  key={item.id}
                                  href={item.link}
                                >
                                  {item.title}
                                </Link>
                              ))}
                          </div>
                        ))}
                      </Paper>
                    </div>
                  ))}
              </div>
              <div className="py-1 d-flex">
                {_HEADER_CATEGORIES_VISIBILITY ? (
                  <div>
                    <div
                      className="d-flex align-items-center u-cursor-pointer"
                      style={{ color: "white", fontSize: 16 }}
                      onMouseOver={() => {
                        toggleCategorySubMenu(HEADER_CATEGORIES_VISIBILITY);
                        setMenus([hierarchy]);
                      }}
                      onMouseOut={() => toggleCategorySubMenu("")}
                    >
                      <IconButton
                        className="p-1 text-white"
                        edge="start"
                        aria-label="menu"
                      >
                        <MenuIcon />
                      </IconButton>
                    </div>
                    <Paper
                      onMouseOver={() =>
                        toggleCategorySubMenu(HEADER_CATEGORIES_VISIBILITY)
                      }
                      onMouseOut={() => toggleCategorySubMenu("")}
                      elevation={3}
                      className="position-absolute  d-flex"
                      style={{
                        borderRadius: 0,
                        left: 0,
                        zIndex: 1000,
                        width: "90%",
                        opacity:
                          categorySubMenu === HEADER_CATEGORIES_VISIBILITY
                            ? 1
                            : 0,
                        transition: "all 0.15s ease-in-out",
                        pointerEvents:
                          categorySubMenu === HEADER_CATEGORIES_VISIBILITY
                            ? "auto"
                            : "none",
                      }}
                    >
                      {menus.map((menu, index) => (
                        <div
                          key={menu.id}
                          className="col-3 px-0"
                          style={{
                            borderLeft: "1px solid #eeeeee",
                            maxWidth: "min-content",
                          }}
                        >
                          {menu.children?.map((item) => (
                            <Link
                              key={item.id}
                              href={`${urlPrefix}/${SHOPPING_PLUGIN_URL}/c/${
                                item.id
                              }-${slugify(item.name)}`}
                              style={{
                                background:
                                  menus[index + 1] &&
                                  menus[index + 1].id === item.id
                                    ? "#f5f5f5"
                                    : "",
                                whiteSpace: "nowrap",
                              }}
                              className="d-block p-4 u-cursor-pointer sub-menu-item"
                              onMouseOver={() => {
                                onMenuItemHover(index + 1, item);
                              }}
                              onClick={() => {
                                toggleCategorySubMenu("");
                              }}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </Paper>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`w-100 ${
            _HEADER_OVER_POSITION
              ? "position-absolute z-index-1"
              : "position-relative"
          }`}
          style={{ overflow: "hidden" }}
        >
          <div
            className="flex-1 d-flex flex-row-reverse justify-content-end align-items-center py-2 px-3"
            style={{
              backgroundColor: "rgba(102, 126, 138, 0.6)",
              borderRadius: "",
            }}
          >
            <div className="d-flex justify-content-between w-100">
              <div className="d-flex align-items-center">
                {iconsWidget &&
                  iconsWidget.map((pluginIcon) => {
                    const Icon = IconsDictionary[pluginIcon.icon];
                    return (
                      <div
                        key={pluginIcon.id}
                        className="d-flex align-items-center"
                      >
                        <div className="ml-1">
                          <IconButton
                            className="p-1 text-white"
                            edge="start"
                            aria-label="menu"
                            onClick={() =>
                              pluginIcon.link
                                ? router.push(pluginIcon.link)
                                : pluginIcon.item
                                ? pushParamsToUrl(pluginIcon.item)
                                : null
                            }
                          >
                            <Icon />
                          </IconButton>
                        </div>
                        {typeof pluginIcon.itemsAmount === "number" ? (
                          <div
                            className="p-1 d-flex align-items-center justify-content-center ml-3"
                            style={{
                              height: 24,
                              width: 24,
                              backgroundColor: theme.palette.secondary.main,
                              border: "1px solid #FFFFFF",
                              color: "#ffffff",
                            }}
                          >
                            {englishNumberToPersianNumber(
                              pluginIcon.itemsAmount
                            )}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                {_HEADER_SEARCH_VISIBILITY ? (
                  <SearchRoundedIcon
                    style={{ width: 18, color: "white" }}
                    onClick={() =>
                      pushParamsToUrl(APP_SHOPPINGPAGE_SEARCH_MODAL)
                    }
                  />
                ) : null}
              </div>

              <Link href={`${urlPrefix}/s`} passHref>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: theme.palette.secondary.main,
                    color: "white",
                  }}
                >
                  سفارش آنلاین
                </Button>
              </Link>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "rgba(102, 126, 138, 0.4)",
              borderRadius: "",
            }}
          >
            <div className="w-100 d-flex flex-1 py-3 px-3">
              <div className="d-flex justify-content-start align-items-center flex-1">
                <Link
                  className="d-flex align-items-center"
                  href={`${urlPrefix}/`}
                >
                  {_HEADER_LOGO_VISIBILITY ? (
                    <LazyImage
                      src={logo}
                      width={40}
                      height={40}
                      alt={business.revised_title}
                    />
                  ) : null}
                  {_HEADER_TITLE_VISIBILITY ? (
                    <div
                      className="px-2"
                      style={{ fontSize: 18, color: "white" }}
                    >
                      {title}
                    </div>
                  ) : null}
                </Link>
              </div>
              <div className="py-1 d-flex position-relative">
                <div>
                  <IconButton
                    className="p-1 text-white"
                    edge="start"
                    aria-label="menu"
                    onClick={() => pushParamsToUrl(MENU_DRAWER)}
                  >
                    <MenuIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
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

export default compose(withConnect, memo)(Header6);
