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
import { tiramisoo } from "@saas/utils/colors";
import IconsDictionary from "@saas/utils/IconsDictionary";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { slugify } from "@saas/utils/helpers/slugify";

import { MENU_DRAWER } from "@saas/stores/ui/constants";
import {
  HEADER_CATEGORIES_VISIBILITY,
  HEADER_LOGO_VISIBILITY,
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

function Header7({
  customization,
  themeConfig,
  urlPrefix,
  hierarchy,
  isBranch,
  business,
  widgets,
  isMobile,
}) {
  const {
    layout: {
      [HEADER_LOGO_VISIBILITY]: _HEADER_LOGO_VISIBILITY,
      [HEADER_TITLE_VISIBILITY]: _HEADER_TITLE_VISIBILITY,
      [HEADER_SEARCH_VISIBILITY]: _HEADER_SEARCH_VISIBILITY,
      [HEADER_CATEGORIES_VISIBILITY]: _HEADER_CATEGORIES_VISIBILITY,
    },
  } = customization;
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

        .header_3_menu_item_hover{
          font-weight: 400;
          transition: all 0.3s ease-in-out;
        }

        .header_3_menu_item_hover:hover{
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
        <div>
          <div className="w-100 d-flex flex-1 p-3">
            <div className="d-flex justify-content-start align-items-center flex-1 ">
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
                    className="u-border-radius-4"
                  />
                ) : null}
                {_HEADER_TITLE_VISIBILITY ? (
                  <div
                    className="px-2"
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: theme.palette.secondary.main,
                    }}
                  >
                    {title}
                  </div>
                ) : null}
              </Link>
            </div>
            {_HEADER_SEARCH_VISIBILITY ? (
              <div className="d-flex justify-content-center align-items-center flex-1">
                <div
                  className="px-3 py-1 u-cursor-pointer d-flex align-items-center position-relative"
                  style={{
                    width: 354,
                    backgroundColor: tiramisoo,
                    color: theme.palette.text.disabled,
                    borderRadius: 35,
                    fontSize: 12,
                    height: 40,
                  }}
                  onClick={() => pushParamsToUrl(APP_SHOPPINGPAGE_SEARCH_MODAL)}
                >
                  جستجو کنید...
                  <Button
                    className="position-absolute"
                    style={{
                      color: "#ffffff",
                      height: 40,
                      width: 40,
                      minWidth: "unset",
                      boxShadow: "unset",
                      borderRadius: "50%",
                      marginRight: -46,
                      left: 0,
                    }}
                    color="secondary"
                    variant="contained"
                  >
                    <SearchRoundedIcon style={{ width: 20 }} />
                  </Button>
                </div>
              </div>
            ) : null}
            <div className="flex-1 d-flex justify-content-end align-items-center">
              {iconsWidget &&
                iconsWidget.map((pluginIcon) => {
                  const Icon = IconsDictionary[pluginIcon.icon];
                  return (
                    <Button
                      variant="contained"
                      className="position-relative mx-1"
                      id="shopping-cart"
                      key={pluginIcon.id}
                      style={{
                        backgroundColor: tiramisoo,
                        color: theme.palette.text.disabled,
                        minWidth: "unset",
                        boxShadow: "unset",
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
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
                variant="contained"
                className="position-relative mx-1"
                style={{
                  backgroundColor: tiramisoo,
                  color: theme.palette.text.disabled,
                  minWidth: "unset",
                  boxShadow: "unset",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                }}
                onClick={() => pushParamsToUrl(MENU_DRAWER)}
              >
                <PersonRoundedIcon />
              </Button>
            </div>
          </div>
          <div
            className="px-5 pt-1 pb-2 d-flex position-relative"
            style={{ minHeight: 49 }}
          >
            {_HEADER_CATEGORIES_VISIBILITY ? (
              <div>
                <div
                  className="d-flex align-items-center u-cursor-pointer"
                  style={{ color: theme.palette.text.disabled, fontSize: 13 }}
                  onMouseOver={() => {
                    toggleCategorySubMenu(HEADER_CATEGORIES_VISIBILITY);
                    setMenus([hierarchy]);
                  }}
                  onMouseOut={() => toggleCategorySubMenu("")}
                >
                  <IconButton className="p-1" edge="start" aria-label="menu">
                    <MenuIcon />
                  </IconButton>
                  دسته‌بندی کالاها
                  <span
                    style={{
                      color: theme.palette.text.disabled,
                      fontSize: 13,
                      borderLeft: "2px solid rgba(0,0,0,0.1)",
                      marginRight: 30,
                      height: 20,
                    }}
                  ></span>
                </div>
                <Paper
                  onMouseOver={() =>
                    toggleCategorySubMenu(HEADER_CATEGORIES_VISIBILITY)
                  }
                  onMouseOut={() => toggleCategorySubMenu("")}
                  elevation={3}
                  className="position-absolute d-flex"
                  style={{
                    borderRadius: 0,
                    zIndex: 1000,
                    width: "90%",
                    opacity:
                      categorySubMenu === HEADER_CATEGORIES_VISIBILITY ? 1 : 0,
                    transition: "all 0.15s ease-in-out",
                    pointerEvents:
                      categorySubMenu === HEADER_CATEGORIES_VISIBILITY
                        ? "auto"
                        : "none",
                  }}
                >
                  {menus.map((menu, index) => (
                    <div
                      className="col-3 px-0"
                      key={menu.id}
                      style={{ borderLeft: "1px solid #eeeeee" }}
                    >
                      {menu.children.map((item) => (
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
            {headerMenu?.links.map((item) => (
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
                  href={item.link}
                  className="d-flex align-items-center px-2 u-cursor-pointer header_3_menu_item_hover"
                  style={{
                    color: theme.palette.text.disabled,
                    fontSize: 13,
                  }}
                  onMouseOver={() => {
                    if (item.links && item.links.length) {
                      toggleCategorySubMenu(item.id);
                      setSubMenu([item]);
                    }
                  }}
                >
                  <div>{item.title}</div>
                  {item?.links?.length ? (
                    <div className="d-flex">
                      <KeyboardArrowDownRoundedIcon style={{ fontSize: 20 }} />
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
                    right: 30,
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
                      style={{ borderLeft: "1px solid #eeeeee" }}
                    >
                      {menu.links &&
                        menu.links.map((item) => (
                          <Link
                            key={menu.id}
                            href={item.link}
                            style={{
                              background:
                                subMenu[index + 1] &&
                                subMenu[index + 1].id === item.id
                                  ? "#f5f5f5"
                                  : "",
                            }}
                            className="d-block p-4 u-cursor-pointer sub-menu-item"
                            onMouseOver={() => {
                              onSubMenuItemHover(index + 1, item);
                            }}
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
        </div>
      ) : (
        <div>
          <div className="w-100 d-flex flex-1 p-2">
            <div className="d-flex justify-content-start align-items-center flex-1">
              <Link
                href={`${urlPrefix}/`}
                className="d-flex align-items-center"
              >
                {_HEADER_LOGO_VISIBILITY ? (
                  <LazyImage
                    src={logo}
                    width={28}
                    height={28}
                    alt={business.revised_title}
                    className="u-border-radius-4"
                  />
                ) : null}
                {_HEADER_TITLE_VISIBILITY ? (
                  <div
                    className="px-2"
                    style={{
                      fontSize: 13,
                      fontWeight: 900,
                      color: theme.palette.secondary.main,
                    }}
                  >
                    {title}
                  </div>
                ) : null}
              </Link>
            </div>

            <div className="flex-1 d-flex justify-content-end align-items-center">
              {iconsWidget &&
                iconsWidget.map((pluginIcon) => {
                  const Icon = IconsDictionary[pluginIcon.icon];
                  return (
                    <Button
                      variant="contained"
                      className="position-relative mx-1"
                      id="shopping-cart"
                      key={pluginIcon.id}
                      style={{
                        backgroundColor: tiramisoo,
                        color: theme.palette.text.disabled,
                        minWidth: "unset",
                        boxShadow: "unset",
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
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
              {!_HEADER_SEARCH_VISIBILITY && (
                <Button
                  variant="contained"
                  className="position-relative mx-1"
                  style={{
                    backgroundColor: tiramisoo,
                    color: theme.palette.text.disabled,
                    minWidth: "unset",
                    boxShadow: "unset",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                  }}
                  onClick={() => pushParamsToUrl(MENU_DRAWER)}
                >
                  <MenuIcon />
                </Button>
              )}
            </div>
          </div>
          {_HEADER_SEARCH_VISIBILITY ? (
            <div className="p-2 d-flex">
              <div className="d-flex justify-content-center align-items-center flex-1">
                <div className="ml-1">
                  <Button
                    style={{
                      height: 40,
                      width: 40,
                      minWidth: "unset",
                      boxShadow: "unset",
                    }}
                    onClick={() => pushParamsToUrl(MENU_DRAWER)}
                    color="secondary"
                  >
                    <MenuIcon />
                  </Button>
                </div>
                <div
                  onClick={() => pushParamsToUrl(APP_SHOPPINGPAGE_SEARCH_MODAL)}
                  className="px-3 py-1 u-cursor-pointer d-flex align-items-center position-relative"
                  style={{
                    flex: 1,
                    backgroundColor: tiramisoo,
                    color: theme.palette.text.disabled,
                    borderRadius: 58,
                    fontSize: 12,
                    height: 40,
                  }}
                >
                  جستجو کنید...
                  <Button
                    className="position-absolute"
                    style={{
                      color: "#ffffff",
                      height: 40,
                      width: 40,
                      minWidth: "unset",
                      boxShadow: "unset",
                      borderRadius: "50%",
                      marginRight: -28,
                      left: 0,
                      top: 0,
                    }}
                    color="secondary"
                    variant="contained"
                  >
                    <SearchRoundedIcon style={{ width: 14 }} />
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
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

export default compose(withConnect, memo)(Header7);
