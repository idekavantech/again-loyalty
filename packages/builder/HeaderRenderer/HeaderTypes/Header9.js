import React, { memo, useEffect, useRef, useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import MenuIcon from "@material-ui/icons/Menu";
import Paper from "@material-ui/core/Paper";
import {
  makeSelectBusiness,
  makeSelectBusinessCoverImage,
  makeSelectBusinessThemeColor,
  makeSelectBusinessThemeConfig,
  makeSelectBusinessWorkingHours,
  makeSelectDealsSearched,
  makeSelectHierarchy,
  makeSelectIsBranch,
  makeSelectResourceLabels,
} from "@saas/stores/business/selector";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import useTheme from "@material-ui/core/styles/useTheme";
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
  makeSelectUrlPrefix,
  makeSelectWidgets,
} from "@saas/stores/plugins/selector";
import { useRouter } from "next/router";
import {
  HEADER_ICONS_WIDGET,
  MENU_LINKS_WIDGET,
} from "@saas/stores/plugins/constants";
import { PLUGIN_ACTIONS } from "@saas/stores/plugins/PLUGIN_ACTIONS";

import { SHOPPING_PLUGIN_URL } from "@saas/utils/constants/plugins";
import LazyImage from "@saas/components/LazyImage";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import ProductRow from "@saas/plugins/Shopping/containers/modals/ProductsSearch/ProductRow2";
import { isCurrentTimeAvailable } from "@saas/utils/helpers/isCurrentTimeAvailable";
import { uniqByProp } from "@saas/utils/helpers/uniqByProp";

import { searchDeals } from "@saas/stores/business/actions";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import List from "@material-ui/core/List";
import CategoryNode from "../CategoryNode";
import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import { makeSelectIsAuthenticated } from "@saas/stores/user/selector";
import CustomDrawer from "@saas/components/CustomDrawer";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import SearchIcon from "@saas/icons/searchIcon";
import MallIcon from "@saas/icons/MallIcon";
import AccountIcon from "@saas/icons/accountIcon";
import {
  defaultNavigationMenus,
  MAIN_HEADER_NAVIGATION_MENU,
} from "@saas/utils/constants/navigationMenus";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Collapse } from "react-collapse";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function Header9({
  content = {},
  customization,
  themeConfig,
  urlPrefix,
  hierarchy,
  isBranch,
  business,
  widgets,
  isMobile,
  themeColor,
  loading,
  _searchDeals,
  deals,
  categories,
  isAuthenticated,
}) {
  const {
    display: {
      [HEADER_LOGO_VISIBILITY]: _HEADER_LOGO_VISIBILITY = true,
      [HEADER_TITLE_VISIBILITY]: _HEADER_TITLE_VISIBILITY = true,
      [HEADER_CATEGORIES_VISIBILITY]: _HEADER_CATEGORIES_VISIBILITY = true,
    } = {},
    search_bar: {
      has_search_bar = true,
      search_bar_title = "جستجو...",
      search_bar_type = "fullscreen",
    } = {},
  } = content;
  const {
    background: {
      [HEADER_OVER_POSITION]: _HEADER_OVER_POSITION = true,
      background_type = "color",
      background_image,
      opacity,
      background_color,
    } = {},
    header_setting: {
      use_theme_color = true,
      icon_and_text_color = "#325767",
      logo_size = 40,
      business_title_size = 20,
    } = {},
  } = customization;
  const heightCalc = logo_size + 16;
  const logo = business.icon_image_url;
  const title = isBranch
    ? business.super_business?.title
    : business.revised_title;
  const { minWidth768 } = useResponsive();
  const isDesktop = typeof isMobile === "boolean" ? !isMobile : minWidth768;
  const iconsWidget = widgets[HEADER_ICONS_WIDGET] || [];
  const menuWidget = widgets[MENU_LINKS_WIDGET];
  const isMenuVisible = themeConfig?.header_config
    ? themeConfig?.header_config?.customization?.layout?.[
        HEADER_CATEGORIES_VISIBILITY
      ]
    : false;
  const [menus, setMenus] = useState([hierarchy]);
  const onMenuItemHover = (index, item) => {
    const _menus = [...menus];
    _menus.splice(index);
    _menus[index] = item;
    setMenus(_menus);
  };
  const theme = useTheme();
  const router = useRouter();
  const [showCategorySubMenu, setShowCategorySubMenu] = useState(false);
  const [is_search_bar, set_is_search_bar] = useState("");
  const [isInputLengthZero, setInputLengthZero] = useState(true);
  const [results, setResults] = useState([]);
  const uniqueById = uniqByProp("id");
  const unifiedArray = uniqueById(results);
  const [headerMenu, setHeaderMenu] = useState(null);
  const [subMenu, setSubMenu] = useState([]);
  const [categorySubMenu, toggleCategorySubMenu] = useState("");

  useEffect(() => {
    if (themeConfig?.navigation_menus?.[MAIN_HEADER_NAVIGATION_MENU]) {
      setHeaderMenu(
        themeConfig?.navigation_menus?.[MAIN_HEADER_NAVIGATION_MENU]
      );
      setSubMenu([
        themeConfig?.navigation_menus?.[MAIN_HEADER_NAVIGATION_MENU],
      ]);
    } else {
      setHeaderMenu(
        defaultNavigationMenus(urlPrefix)[MAIN_HEADER_NAVIGATION_MENU]
      );
      setSubMenu([
        defaultNavigationMenus(urlPrefix)[MAIN_HEADER_NAVIGATION_MENU],
      ]);
    }
  }, [themeConfig]);
  useEffect(() => {
    if (deals) {
      setResults(
        deals?.filter((product) => {
          if (
            (product?.extra_data?.only_on_day?.length &&
              !product?.extra_data?.only_on_day?.find(
                (sc) => sc.id === moment().day()
              )) ||
            (product?.extra_data?.shifts &&
              !isCurrentTimeAvailable(product?.extra_data?.shifts)) ||
            product?.categories?.every(
              (cat) => !categories.find((c) => c.id === cat)
            )
          )
            return false;
          return true;
        })
      );
    }
  }, [deals]);

  const node = useRef();
  const handleClick = (e) => {
    if (!node?.current?.contains(e.target) && isDesktop) {
      setShowCategorySubMenu(false);
    }
  };
  useEffect(() => {
    if (showCategorySubMenu) {
      document.addEventListener("mousedown", handleClick);
      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    }
  }, [showCategorySubMenu]);

  const [isCollapseOpen, setCollapseOpen] = useState({});
  const handleCollapse = (e) => {
    setCollapseOpen({ ...isCollapseOpen, [e]: !isCollapseOpen[e] });
  };
  const onSubMenuItemHover = (index, item) => {
    const _menus = [...subMenu];
    _menus.splice(index);
    _menus[index] = item;
    setSubMenu(_menus);
  };

  const renderMenuItem = (link) => {
    if (!link?.links) {
      return (
        <Link
          passHref
          id={link.id}
          key={`menu-link-${link.id}`}
          href={link.link}
        >
          <div>
            <div
              style={{
                borderTopWidth: link.hasBorder ? 1 : 0,
                color: link.colored ? themeColor : theme.palette.text.disabled,
                borderColor: theme.palette.action.disabledBackground,
              }}
              className="p-2 px-3 cursorPointer min-width-100 d-flex justify-content-between align-items-center "
            >
              <div className="d-flex align-items-center">
                <div className="mr-2">{link.title}</div>
              </div>
            </div>
          </div>
        </Link>
      );
    }
    return (
      <div>
        <div
          style={{
            borderTopWidth: link.hasBorder ? 1 : 0,
            color: link.colored ? themeColor : theme.palette.text.disabled,
            borderColor: theme.palette.action.disabledBackground,
          }}
          onClick={() => handleCollapse(link.id)}
          className="p-2 px-3 cursorPointer min-width-100 d-flex justify-content-between align-items-center "
        >
          <div className="d-flex align-items-center">
            <div className="mr-2">{link.title}</div>
          </div>
          <div>
            {isCollapseOpen[link.id] ? (
              <ExpandLess color="secondary" fontSize="small" />
            ) : (
              <ExpandMore fontSize="small" />
            )}
          </div>
        </div>
        <Collapse
          isOpened={link.id ? isCollapseOpen[link.id] : true}
          timeout="auto"
          unmountOnExit
        >
          {link.links.map((_link) => renderMenuItem(_link))}
        </Collapse>
      </div>
    );
  };

  return (
    <Paper
      style={{
        backgroundColor: "#ffffff",
        border: 0,
      }}
    >
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
      {is_search_bar ? (
        <div
          style={{
            backgroundColor:
              search_bar_type == "fullscreen" ? "#000000b3" : "#00000000",
            zIndex: 1021,
            position: "absolute",
            top: 0,
            backdropFilter:
              search_bar_type == "fullscreen" ? "blur(6px)" : "none",
            bottom: 0,
            left: 0,
            right: 0,
          }}
          onClick={() => set_is_search_bar(false)}
        ></div>
      ) : null}
      {isDesktop ? (
        <div
          className={`w-100 d-flex align-items-center justify-content-between ${
            _HEADER_OVER_POSITION
              ? "position-absolute z-index-20"
              : "position-relative"
          }`}
          style={{
            minHeight: heightCalc,
            padding: "8px 16px",
          }}
        >
          <div
            style={{
              height: "100%",
              backgroundColor:
                background_type === "color" ? background_color : "transparent",
            }}
            className="position-absolute left-0 u-top-0 w-100 d-block"
          >
            {background_image && background_type === "image" && (
              <LazyImage
                src={background_image}
                alt={title}
                style={{ opacity: opacity / 100 }}
              />
            )}
          </div>
          <div className="d-flex align-items-center">
            {_HEADER_CATEGORIES_VISIBILITY &&
            Object.keys(menus[0]?.children).length > 0 ? (
              <div
                className="d-flex align-items-center"
                style={{ zIndex: 1020 }}
              >
                <div
                  className="d-flex align-items-center u-cursor-pointer"
                  style={{
                    color: theme.palette.text.disabled,
                    fontSize: 13,
                  }}
                  onMouseOver={() => {
                    setShowCategorySubMenu(true);
                    toggleCategorySubMenu("");
                    setMenus([hierarchy]);
                  }}
                >
                  <MenuIcon
                    style={{
                      fontSize: 24,
                      color: use_theme_color
                        ? theme.palette.secondary.main
                        : icon_and_text_color,
                    }}
                  />
                </div>
                <Paper
                  elevation={3}
                  className="position-absolute d-flex"
                  style={{
                    borderRadius: 0,
                    zIndex: 1020,
                    width: showCategorySubMenu ? "90%" : "auto",
                    opacity: showCategorySubMenu ? 1 : 0,
                    transition: "all 0.3s ease-in-out",
                    pointerEvents: showCategorySubMenu ? "auto" : "none",
                    right: -1,
                    top: 56,
                  }}
                  onMouseLeave={() => setShowCategorySubMenu(false)}
                >
                  {showCategorySubMenu &&
                    menus?.map((menu, index) => (
                      <div
                        className="col-3 px-0"
                        key={menu.id}
                        style={{ borderLeft: "1px solid #eeeeee" }}
                        ref={node}
                      >
                        {menu?.children?.map((item) => (
                          <Link
                            key={item.id}
                            href={`${urlPrefix}/${SHOPPING_PLUGIN_URL}/menu/${
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
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                </Paper>
                <span
                  style={{
                    color: theme.palette.text.disabled,
                    fontSize: 13,
                    borderLeft: "2px solid rgba(0,0,0,0.1)",
                    marginRight: "19px",
                    marginLeft: "24px",
                    height: 20,
                    zIndex: 1020,
                  }}
                ></span>
              </div>
            ) : null}

            <div
              className="d-flex"
              onMouseOver={() => setShowCategorySubMenu(false)}
            >
              {headerMenu?.links?.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="d-flex"
                  onMouseOver={() => {
                    if (item.links && item.links.length) {
                      toggleCategorySubMenu(item.id);
                    }
                  }}
                >
                  <Link
                    className="d-flex align-items-center u-cursor-pointer header_4_menu_item_hover"
                    style={{
                      color: use_theme_color
                        ? theme.palette.secondary.main
                        : icon_and_text_color,
                      fontSize: 12,
                      fontWeight: 600,
                      zIndex: 100,
                      paddingLeft: 32,
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
                      borderRadius: 0,
                      zIndex: 10000,
                      width: "90%",
                      right: 30,
                      top: 55,
                      opacity: categorySubMenu === item.id ? 1 : 0,
                      transition: "all 0.15s ease-in-out",
                      pointerEvents:
                        categorySubMenu === item.id ? "auto" : "none",
                    }}
                    onMouseOut={() => {
                      if (item.links && item.links.length) {
                        toggleCategorySubMenu("");
                      }
                    }}
                  >
                    {subMenu?.map((menu, index) => (
                      <div
                        key={menu.id}
                        className="col-3 px-0"
                        style={{
                          borderLeft: "1px solid #eeeeee",
                          maxWidth: "min-content",
                        }}
                      >
                        {menu?.links?.map((item) => (
                          <Link
                            key={item.id}
                            href={item.link}
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

          <div
            className="d-flex justify-content-start align-items-center position-absolute"
            style={{
              left: "50%",
              top: "50%",
              margin: "auto",
              transform: "translate(-50% , -50%)",
              whiteSpace: "nowrap",
              zIndex: 1000,
            }}
          >
            <Link
              className="d-flex align-items-center u-cursor-pointer"
              style={{ zIndex: 1020 }}
              href={`${urlPrefix}/`}
            >
              {_HEADER_LOGO_VISIBILITY ? (
                <LazyImage
                  src={logo}
                  height={logo_size}
                  width={"auto"}
                  alt={`لوگو ${title}`}
                  className="u-border-radius-4"
                />
              ) : null}
              {_HEADER_TITLE_VISIBILITY ? (
                <span
                  className="px-2"
                  style={{
                    fontSize: business_title_size,
                    fontWeight: 600,
                    color: use_theme_color
                      ? theme.palette.secondary.main
                      : icon_and_text_color,
                    zIndex: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {title}
                </span>
              ) : null}
            </Link>
          </div>
          <div
            className="flex-1 d-flex justify-content-end align-items-center"
            style={{ direction: "rtl" }}
          >
            {has_search_bar ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  flex: search_bar_type == "fullscreen" ? 1 : "",
                  zIndex: 1021,
                }}
              >
                <div
                  className={is_search_bar ? "searchBoxActive" : "searchBox"}
                >
                  <button
                    className={` ${
                      is_search_bar ? "searchButtonActive" : "searchButton"
                    } mx-2`}
                    href="#"
                    onClick={() => {
                      set_is_search_bar(!is_search_bar);
                      setShowCategorySubMenu(false);
                    }}
                  >
                    <SearchIcon
                      color={
                        use_theme_color
                          ? theme.palette.secondary.main
                          : icon_and_text_color
                      }
                    />
                  </button>
                  <input
                    className={
                      is_search_bar ? "searchInputActive" : "searchInput"
                    }
                    style={{
                      paddingRight: 12,
                      width: is_search_bar
                        ? search_bar_type == "fullscreen"
                          ? "100%"
                          : 260
                        : 0,
                    }}
                    type="text"
                    name=""
                    placeholder={search_bar_title}
                    onChange={(e) => {
                      const search = e.target.value;
                      if (search.length > 0) {
                        _searchDeals(search);
                        setInputLengthZero(false);
                      } else {
                        setResults([]);
                        setInputLengthZero(true);
                      }
                    }}
                  />
                </div>
                {is_search_bar && (
                  <div
                    style={{
                      position: "absolute",
                      top: 45,
                      backgroundColor: "#fff",
                      textAlign: "center",
                      border:
                        unifiedArray.length !== 0 || !isInputLengthZero
                          ? "1px solid #E4E6E7"
                          : "none",
                      width: "100%",
                      zIndex: 1000,
                      borderRadius: 4,
                    }}
                  >
                    <div>
                      {loading ? (
                        <LoadingIndicator />
                      ) : unifiedArray?.length === 0 && !isInputLengthZero ? (
                        <div className="container p-2">نتیجه‌‌ای یافت نشد.</div>
                      ) : (
                        unifiedArray?.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => {
                              set_is_search_bar(false);
                            }}
                          >
                            <ProductRow product={product} />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : null}
            {iconsWidget?.map((pluginIcon) => {
              return (
                <Button
                  className="position-relative mx-1"
                  id="shopping-cart"
                  key={pluginIcon.id}
                  style={{
                    border: "none",
                    color: "#5C5F62",
                    backgroundColor: "transparent",
                    width: "max-content",
                    height: "max-content",
                    zIndex: 1020,
                    padding: 5,
                    minWidth: 40,
                  }}
                  onClick={() =>
                    pluginIcon.link
                      ? router.push(pluginIcon.link)
                      : pluginIcon.item
                      ? pushParamsToUrl(pluginIcon.item)
                      : null
                  }
                >
                  {typeof pluginIcon?.itemsAmount === "number" ? (
                    <div
                      className="position-absolute p-1 d-flex align-items-center justify-content-center"
                      style={{
                        top: 5,
                        right: 0,
                        height: 20,
                        width: 20,
                        borderRadius: "50%",
                        backgroundColor: theme.palette.secondary.main,
                        color: "#ffffff",
                        fontSize: 12,
                        fontWeight: 400,
                      }}
                    >
                      {englishNumberToPersianNumber(pluginIcon?.itemsAmount)}
                    </div>
                  ) : null}
                  <MallIcon
                    color={
                      use_theme_color
                        ? theme.palette.secondary.main
                        : icon_and_text_color
                    }
                  />
                </Button>
              );
            })}
            <Button
              className="position-relative mx-1"
              style={{
                border: "none",
                color: "#5C5F62",
                minWidth: 30,
                backgroundColor: "transparent",
                boxShadow: "unset",
                padding: "0 3px 0 1px",
                zIndex: 1020,
              }}
              onClick={() => pushParamsToUrl(MENU_DRAWER)}
            >
              <AccountIcon
                color={
                  use_theme_color
                    ? theme.palette.secondary.main
                    : icon_and_text_color
                }
              />
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div
            id="header_8"
            className={`w-100 d-flex flex-1 py-2 px-4 align-items-center ${
              _HEADER_OVER_POSITION
                ? "position-absolute z-index-20"
                : "position-relative"
            }`}
            style={{
              minHeight: 56,
            }}
          >
            <div
              style={{
                height: "100%",
                backgroundColor:
                  background_type === "color"
                    ? background_color
                    : "transparent",
              }}
              className="position-absolute left-0 u-top-0 w-100 d-block"
            >
              {background_image && background_type === "image" && (
                <LazyImage
                  src={background_image}
                  alt={title}
                  style={{ opacity: opacity / 100 }}
                />
              )}
            </div>

            <div className="d-flex justify-content-start align-items-center">
              <Link
                className="d-flex align-items-center"
                href={`${urlPrefix}/`}
              >
                {_HEADER_LOGO_VISIBILITY ? (
                  <LazyImage
                    src={logo}
                    height={70 / 1.3}
                    width={"auto"}
                    //style={{ maxWidth: 50 }}
                    alt={title}
                    className="u-border-radius-4"
                  />
                ) : null}
                {_HEADER_TITLE_VISIBILITY ? (
                  <div
                    className={`px-2 ${
                      is_search_bar ? "bussinessNameInHeader" : ""
                    }`}
                    style={{
                      fontSize: business_title_size - 5,
                      fontWeight: 600,
                      color: use_theme_color
                        ? theme.palette.secondary.main
                        : icon_and_text_color,
                      zIndex: 1000,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {title}
                  </div>
                ) : null}
              </Link>
            </div>

            <div className="flex-1 d-flex justify-content-end align-items-center">
              {iconsWidget?.map((pluginIcon) => {
                return (
                  <Button
                    className="position-relative"
                    id="shopping-cart"
                    key={pluginIcon.id}
                    style={{
                      border: "none",
                      color: "#5C5F62",
                      minWidth: 35,
                      backgroundColor: "transparent",
                      boxShadow: "unset",
                      width: "max-content",
                      height: "max-content",
                      zIndex: 1020,
                      padding: "6px 8px 6px 0",
                      background: "transparent",
                    }}
                    onClick={() =>
                      pluginIcon.link
                        ? router.push(pluginIcon.link)
                        : pluginIcon.item
                        ? pushParamsToUrl(pluginIcon.item)
                        : null
                    }
                  ></Button>
                );
              })}

              {has_search_bar ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    zIndex: 1021,
                    position:
                      is_search_bar && search_bar_type == "fullscreen"
                        ? "absolute"
                        : "relative",
                    left:
                      is_search_bar && search_bar_type == "fullscreen" ? 10 : 0,
                    right:
                      is_search_bar && search_bar_type == "fullscreen" ? 10 : 0,
                  }}
                >
                  <div
                    className={
                      is_search_bar ? "searchBoxActive px-2" : "searchBox"
                    }
                    style={{ marginLeft: 15 }}
                  >
                    <button
                      className={
                        is_search_bar ? "searchButtonActive" : "searchButton"
                      }
                      style={{ paddingTop: 5 }}
                      href="#"
                      onClick={() => {
                        set_is_search_bar(!is_search_bar);
                        setShowCategorySubMenu(false);
                      }}
                    >
                      <SearchIcon
                        width={24}
                        height={24}
                        color={
                          use_theme_color
                            ? theme.palette.secondary.main
                            : icon_and_text_color
                        }
                      />
                    </button>
                    <input
                      className={
                        is_search_bar ? "searchInputActive" : "searchInput"
                      }
                      style={{
                        width: is_search_bar ? "100%" : 0,
                      }}
                      type="text"
                      name=""
                      placeholder={search_bar_title}
                      onChange={(e) => {
                        const search = e.target.value;
                        if (search.length > 0) {
                          _searchDeals(search);
                          setInputLengthZero(false);
                        } else {
                          setResults([]);
                          setInputLengthZero(true);
                        }
                      }}
                    />
                  </div>
                  {is_search_bar && (
                    <div
                      style={{
                        position: "absolute",
                        top: 45,
                        backgroundColor: "#fff",
                        textAlign: "center",
                        border:
                          unifiedArray.length !== 0 || !isInputLengthZero
                            ? "1px solid #E4E6E7"
                            : "none",
                        width: "100%",
                        zIndex: 1000,
                        borderRadius: 4,
                      }}
                    >
                      <div>
                        {loading ? (
                          <LoadingIndicator />
                        ) : unifiedArray.length === 0 && !isInputLengthZero ? (
                          <div className="container p-2">
                            نتیجه‌‌ای یافت نشد.
                          </div>
                        ) : (
                          unifiedArray.map((product) => (
                            <div
                              key={product.id}
                              onClick={() => {
                                set_is_search_bar(false);
                              }}
                            >
                              <ProductRow product={product} />
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}

              {_HEADER_CATEGORIES_VISIBILITY ? (
                <div style={{ zIndex: 1020 }}>
                  <div
                    className="d-flex align-items-center u-cursor-pointer"
                    style={{
                      color: theme.palette.text.disabled,
                      fontSize: 13,
                    }}
                    onClick={() => {
                      setShowCategorySubMenu(!showCategorySubMenu);
                      setMenus([hierarchy]);
                    }}
                  >
                    <MenuIcon
                      style={{
                        width: 24,
                        color: use_theme_color
                          ? theme.palette.secondary.main
                          : icon_and_text_color,
                      }}
                    />
                  </div>

                  <CustomDrawer
                    isOpen={showCategorySubMenu}
                    onClose={() => setShowCategorySubMenu(false)}
                    id="simple-menu"
                    customClassName="pl-3"
                    style={{ width: "80vw" }}
                  >
                    <Paper
                      className="position-absolute d-flex "
                      style={{
                        borderRadius: 0,
                        zIndex: 1000,
                        width: showCategorySubMenu ? "100%" : "auto",
                        opacity: showCategorySubMenu ? 1 : 0,
                        transition: "all 0.3s ease-in-out",
                        pointerEvents: showCategorySubMenu ? "auto" : "none",
                        flexDirection: "column",
                        border: "none",
                      }}
                    >
                      <div
                        className="px-3 pt-3"
                        onClick={() => setShowCategorySubMenu(false)}
                      >
                        <CloseIcon style={{ fontSize: 16 }} />
                      </div>

                      {headerMenu?.links?.map((link) => renderMenuItem(link))}
                      {!!Object.keys(menus[0]?.children).length > 0 && (
                        <>
                          <p
                            className="m-3 mb-0"
                            style={{ height: 1, backgroundColor: "#ccc" }}
                          ></p>
                          <p className="p-3">دسته‌بندی کالاها</p>
                          {showCategorySubMenu && (
                            <List className="w-100 pl-2 ">
                              {menus.map((menu) => (
                                <CategoryNode
                                  key={menu.id}
                                  node={menu}
                                  handleDrawerClose={() =>
                                    setShowCategorySubMenu(false)
                                  }
                                  urlPrefix={urlPrefix}
                                />
                              ))}
                            </List>
                          )}{" "}
                        </>
                      )}
                      <p
                        className="m-3 mb-0"
                        style={{ height: 1, backgroundColor: "#ccc" }}
                      ></p>
                      <p className="p-3">حساب کاربری</p>

                      {menuWidget?.map((link) => {
                        if (
                          (link?.noRenderAuth && isAuthenticated) ||
                          (link?.needsAuth && !isAuthenticated)
                        )
                          return null;
                        const Icon = IconsDictionary[link?.icon];
                        if (link?.isShoppingMenu) {
                          if (
                            isMenuVisible &&
                            isMobile &&
                            Object.keys(business.menu).length
                          ) {
                            return (
                              <div
                                id={link?.id}
                                key={`menu-link-${link?.id}`}
                                style={{
                                  borderTopRadius: 1,
                                  color: link?.colored
                                    ? themeColor
                                    : theme.palette.text.disabled,
                                  borderColor:
                                    theme.palette.action.disabledBackground,
                                }}
                                className="p-2 pr-3 cursorPointer min-width-100 d-flex flex-column justify-content-center align-items-center "
                              >
                                <>
                                  <div className="d-flex align-items-center w-100">
                                    <div className="mr-1 w-100">
                                      {link?.text}
                                    </div>
                                  </div>
                                  <List className="w-100 pb-0">
                                    {[hierarchy].map((menu) => (
                                      <CategoryNode
                                        key={menu.id}
                                        node={menu}
                                        handleDrawerClose={() =>
                                          setShowCategorySubMenu(false)
                                        }
                                        urlPrefix={urlPrefix}
                                      />
                                    ))}
                                  </List>
                                </>
                              </div>
                            );
                          }
                          return;
                        }
                        if (link?.action) {
                          return (
                            <div
                              id={link?.id}
                              key={`menu-link-${link?.id}`}
                              onClick={() =>
                                PLUGIN_ACTIONS[link?.action]({
                                  business,
                                  urlPrefix,
                                })
                              }
                              style={{
                                borderTopWidth: link?.hasBorder ? 1 : 0,
                                color: link?.colored
                                  ? themeColor
                                  : theme.palette.text.disabled,
                                borderColor:
                                  theme.palette.action.disabledBackground,
                              }}
                              className="p-2 px-3 cursorPointer min-width-100 d-flex justify-content-between align-items-center "
                            >
                              <div className="d-flex align-items-center">
                                <div className="d-flex">
                                  <Icon />
                                </div>
                                <div className="mr-2">{link?.text}</div>
                              </div>
                              {link?.hasChevron && (
                                <KeyboardArrowLeftRoundedIcon fontSize="small" />
                              )}
                            </div>
                          );
                        }
                        if (link?.url) {
                          return (
                            <Link
                              passHref
                              id={link?.id}
                              key={`menu-link-${link?.id}`}
                              href={`${urlPrefix}${link?.url}`}
                            >
                              <div
                                style={{
                                  borderTopWidth: link?.hasBorder ? 1 : 0,
                                  color: link?.colored
                                    ? themeColor
                                    : theme.palette.text.disabled,
                                  borderColor:
                                    theme.palette.action.disabledBackground,
                                }}
                                className="p-2 pr-3  cursorPointer min-width-100 d-flex justify-content-between align-items-center "
                              >
                                <div className="d-flex align-items-center">
                                  <div className="d-flex">
                                    <Icon />
                                  </div>
                                  <div className="mr-2">{link?.text}</div>
                                  <div
                                    className="mr-2 u-fontWeightBold"
                                    style={{
                                      marginTop: 2,
                                      color: theme.palette.secondary.main,
                                    }}
                                  >
                                    {link?.itemsAmount}
                                  </div>
                                </div>
                                <div>
                                  <KeyboardArrowLeftRoundedIcon fontSize="small" />
                                </div>
                              </div>
                            </Link>
                          );
                        }
                        return (
                          <div
                            style={{
                              borderTopWidth: link.hasBorder ? 1 : 0,
                              color: link.colored
                                ? themeColor
                                : theme.palette.text.disabled,
                              borderColor:
                                theme.palette.action.disabledBackground,
                            }}
                            key={`menu-link-${link.id}`}
                            {...(link.query
                              ? { onClick: () => pushParamsToUrl(link.query) }
                              : {})}
                            className="p-2 pr-3  cursorPointer min-width-100 d-flex justify-content-between align-items-center "
                          >
                            <div className="d-flex align-items-center">
                              <div className="d-flex">
                                <Icon />
                              </div>
                              <div className="mr-2">{link.text}</div>
                            </div>
                            <div>
                              <KeyboardArrowLeftRoundedIcon fontSize="small" />
                            </div>
                          </div>
                        );
                      })}
                    </Paper>
                  </CustomDrawer>
                </div>
              ) : null}
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
  deals: makeSelectDealsSearched(),
  loading: makeSelectLoading(),
  isAuthenticated: makeSelectIsAuthenticated(),
  themeColor: makeSelectBusinessThemeColor(),

  categories: makeSelectResourceLabels(),
});

function mapDispatchToProps(dispatch) {
  return {
    _searchDeals: (title) => dispatch(searchDeals(title)),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Header9);
