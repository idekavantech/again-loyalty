import React, { memo, useEffect, useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import MenuIcon from "@material-ui/icons/Menu";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import Paper from "@material-ui/core/Paper";
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
  HEADER_OVER_POSITION,
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
import { HEADER_ICONS_WIDGET } from "@saas/stores/plugins/constants";
import { SHOPPING_PLUGIN_URL } from "@saas/utils/constants/plugins";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function Header4({
  themeConfig,
  urlPrefix,
  hierarchy,
  isBranch,
  business,
  widgets,
  customization,
  isMobile,
  header_transparent,
  isEditMode,
}) {
  const {
    layout: {
      [HEADER_LOGO_VISIBILITY]: _HEADER_LOGO_VISIBILITY,
      [HEADER_TITLE_VISIBILITY]: _HEADER_TITLE_VISIBILITY,
      [HEADER_CATEGORIES_VISIBILITY]: _HEADER_CATEGORIES_VISIBILITY,
      [HEADER_OVER_POSITION]: __HEADER_OVER_POSITION,
    },
  } = customization;
  const _HEADER_OVER_POSITION =
    (header_transparent || isEditMode) && __HEADER_OVER_POSITION;

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
    <div className="w-100">
      <style
        dangerouslySetInnerHTML={{
          __html: `

        .header_4_menu_item_hover{
          font-weight: 400;
          transition: all 0.3s ease-in-out;
        }

        .header_4_menu_item_hover:hover{
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
          id="header_4"
          className={`w-100 ${
            _HEADER_OVER_POSITION
              ? "position-absolute z-index-1 p-3"
              : "position-relative p-3"
          }`}
        >
          <Paper
            className="w-100 d-flex flex-1 px-5 py-3 position-relative"
            style={{
              backgroundColor: "white",
              borderRadius: 8,
            }}
            elevation={1}
          >
            <div className="d-flex">
              <Link
                className="d-flex justify-content-start align-items-center flex-1 u-cursor-pointer ml-4"
                href={`${urlPrefix}/`}
              >
                {_HEADER_LOGO_VISIBILITY ? (
                  <img
                    src={logo}
                    width={40}
                    height={40}
                    style={{ objectFit: "cover", borderRadius: 4 }}
                    alt={business.revised_title}
                  />
                ) : null}
                {_HEADER_TITLE_VISIBILITY ? (
                  <div
                    className="px-2"
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: theme.palette.secondary.main,
                    }}
                  >
                    {title}
                  </div>
                ) : null}
              </Link>
              <div className="d-flex  align-items-center">
                {_HEADER_CATEGORIES_VISIBILITY ? (
                  <div>
                    <div
                      className="d-flex align-items-center u-cursor-pointer"
                      style={{
                        color: theme.palette.text.disabled,
                        fontSize: 13,
                      }}
                      onMouseOver={() => {
                        toggleCategorySubMenu(HEADER_CATEGORIES_VISIBILITY);
                        setMenus([hierarchy]);
                      }}
                      onMouseOut={() => toggleCategorySubMenu("")}
                    >
                      <Button
                        variant="contained"
                        className="position-relative ml-2"
                        style={{
                          backgroundColor: tiramisoo,
                          color: theme.palette.text.disabled,
                          minWidth: "unset",
                          boxShadow: "unset",
                          width: 40,
                          height: 40,
                        }}
                      >
                        <MenuIcon />
                      </Button>
                      Classification of goods
                      <span
                        style={{
                          color: theme.palette.text.disabled,
                          fontSize: 13,
                          borderLeft: "2px solid rgba(0,0,0,0.1)",
                          height: 20,
                        }}
                        className="mr-4"
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
                        zIndex: 1000,
                        width: "fit-content",
                        opacity:
                          categorySubMenu === HEADER_CATEGORIES_VISIBILITY
                            ? 1
                            : 0,
                        transition: "all 0.15s ease-in-out",
                        pointerEvents:
                          categorySubMenu === HEADER_CATEGORIES_VISIBILITY
                            ? "auto"
                            : "none",
                        borderRadius: 0,
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
                              className={`d-block p-4 u-cursor-pointer sub-menu-item`}
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
                <div className="mr-2 d-flex">
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
                          className="d-flex align-items-center px-2 u-cursor-pointer header_4_menu_item_hover"
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
                          href={item.link}
                        >
                          <div>{item.title}</div>
                          {item?.links?.length ? (
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
                            zIndex: 1000,
                            width: "90%",
                            right: 30,
                            top: 40,
                            borderRadius: 0,
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
              </div>
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
                }}
                onClick={() => pushParamsToUrl(MENU_DRAWER)}
              >
                <PersonRoundedIcon />
              </Button>
            </div>
          </Paper>
        </div>
      ) : (
        <div
          id="header_4"
          className={`w-100 ${
            _HEADER_OVER_POSITION
              ? "position-absolute z-index-1 p-3"
              : "position-relative p-3"
          }`}
        >
          <Paper
            className="w-100 d-flex flex-1 p-2"
            style={{
              backgroundColor: "white",
              borderRadius: 8,
            }}
            elevation={1}
          >
            <div className="d-flex justify-content-start align-items-center flex-1">
              <Link
                className="d-flex align-items-center"
                href={`${urlPrefix}/`}
              >
                {_HEADER_LOGO_VISIBILITY ? (
                  <img
                    src={logo}
                    width={40}
                    height={40}
                    style={{ objectFit: "cover", borderRadius: 4 }}
                    alt={business.revised_title}
                  />
                ) : null}
                {_HEADER_TITLE_VISIBILITY ? (
                  <div
                    className="px-2"
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
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
                }}
                onClick={() => pushParamsToUrl(MENU_DRAWER)}
              >
                <MenuIcon />
              </Button>
            </div>
          </Paper>
        </div>
      )}
    </div>
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

export default compose(withConnect, memo)(Header4);
