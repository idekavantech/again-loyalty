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
  HEADER_MENU_VISIBILITY,
  HEADER_OVER_POSITION,
  HEADER_TITLE_VISIBILITY,
} from "@saas/utils/constants/headerConstants";
import SectionLink from "../../SectionRenderer/components/SectionLink";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

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
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
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
import moment from "moment-jalaali";
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

function Header11({
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
  const theme = useTheme();
  const {
    display: {
      [HEADER_LOGO_VISIBILITY]: _HEADER_LOGO_VISIBILITY = true,
      [HEADER_TITLE_VISIBILITY]: _HEADER_TITLE_VISIBILITY = true,
      [HEADER_CATEGORIES_VISIBILITY]: _HEADER_CATEGORIES_VISIBILITY = true,
      [HEADER_MENU_VISIBILITY]: _HEADER_MENU_VISIBILITY = false,
    } = {},
    search_bar: { has_search_bar = true, search_bar_title = "Search..." } = {},
    button: {
      has_button = true,
      button_text = "Button text",
      link_type = "has_internal_link",
      internal_link = "",
      external_link = "",
      title_color = "#fff",
      button_color = "#000",
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
  const logo = business.icon_image_url;
  const title = isBranch
    ? business.super_business?.title
    : business.revised_title;
  const { minWidth768 } = useResponsive();
  const isDesktop = typeof isMobile === "boolean" ? !isMobile : minWidth768;
  const iconsWidget = widgets[HEADER_ICONS_WIDGET] || [];
  const menuWidget = widgets[MENU_LINKS_WIDGET];
  const isMenuVisible = themeConfig.header_config
    ? themeConfig.header_config.customization &&
      themeConfig.header_config.customization.layout &&
      themeConfig.header_config.customization.layout[
        HEADER_CATEGORIES_VISIBILITY
      ]
    : false;
  const [menus, setMenus] = useState([hierarchy]);
  const [isCollapseOpen, setCollapseOpen] = useState({});
  const handleCollapse = (e) => {
    setCollapseOpen({ ...isCollapseOpen, [e]: !isCollapseOpen[e] });
  };
  const onMenuItemHover = (index, item) => {
    const _menus = [...menus];
    _menus.splice(index);
    _menus[index] = item;
    setMenus(_menus);
  };
  const router = useRouter();
  const businessAddress = business?.get_vitrin_absolute_url;
  const [is_search_bar, set_is_search_bar] = useState("");
  const [isInputLengthZero, setInputLengthZero] = useState(true);
  const [results, setResults] = useState([]);
  const uniqueById = uniqByProp("id");
  const unifiedArray = uniqueById(results);
  const [showCategorySubMenu, setShowCategorySubMenu] = useState(false);
  const [headerMenu, setHeaderMenu] = useState(null);
  const [categorySubMenu, toggleCategorySubMenu] = useState("");
  const [subMenu, setSubMenu] = useState([]);
  const onSubMenuItemHover = (index, item) => {
    const _menus = [...subMenu];
    _menus.splice(index);
    _menus[index] = item;
    setSubMenu(_menus);
  };
  useEffect(() => {
    if (showCategorySubMenu) {
      document.addEventListener("mousedown", handleClick);
      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    }
  }, [showCategorySubMenu]);

  useEffect(() => {
    if (deals) {
      setResults(
        deals?.filter((product) => {
          if (
            (product.extra_data.only_on_day &&
              product.extra_data.only_on_day.length &&
              !product.extra_data.only_on_day.find(
                (sc) => sc.id === moment().day()
              )) ||
            (product.extra_data.shifts &&
              !isCurrentTimeAvailable(product.extra_data.shifts))
          )
            return false;
          return true;
        })
      );
    }
  }, [deals]);

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

  const node = useRef();
  const handleClick = (e) => {
    if (!node?.current?.contains(e.target)) {
      setShowCategorySubMenu(false);
    }
  };

  const renderMenuItem = (link) => {
    if (!link.links) {
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
      elevation={3}
      style={{
        borderRadius: 0,
        backgroundColor: "#ffffff",
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
      {isDesktop ? (
        <div
          id="header_10"
          className={`w-100 ${
            _HEADER_OVER_POSITION ? "position-absolute" : "position-relative"
          }`}
          style={{ zIndex: 1000 }}
        >
          <div
            className={`w-100 px-2 py-2 position-relative d-flex justify-content-between flex-1 align-items-center`}
            style={{
              minHeight: 56,
              height: "max-content",
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
                  alt={business.revised_title}
                  style={{ opacity: opacity / 100 }}
                />
              )}
            </div>
            <div className="flex-1 d-flex justify-content-start align-items-center">
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
                  width={28}
                  height={28}
                  color={
                    use_theme_color
                      ? theme.palette.secondary.main
                      : icon_and_text_color
                  }
                />
              </Button>
              {iconsWidget?.map((pluginIcon) => {
                return (
                  <Button
                    className="position-relative mr-2"
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
                    {typeof pluginIcon.itemsAmount === "number" ? (
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
                        {englishNumberToPersianNumber(pluginIcon.itemsAmount)}
                      </div>
                    ) : null}
                    <MallIcon
                      width={28}
                      height={28}
                      color={
                        use_theme_color
                          ? theme.palette.secondary.main
                          : icon_and_text_color
                      }
                    />
                  </Button>
                );
              })}
            </div>

            <div className="flex-1 d-flex  justify-content-center align-items-center">
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
                    alt={business.revised_title}
                    className="u-border-radius-4"
                  />
                ) : null}
                {_HEADER_TITLE_VISIBILITY ? (
                  <span
                    className="pr-2"
                    style={{
                      fontSize: business_title_size,
                      fontWeight: 400,
                      color: use_theme_color
                        ? theme.palette.secondary.main
                        : icon_and_text_color,
                      zIndex: 1,
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
              {has_button && (
                <SectionLink
                  style={{ padding: 0, margin: 0 }}
                  href={
                    link_type == "has_internal_link"
                      ? internal_link
                      : external_link
                  }
                  businessAddress={businessAddress}
                >
                  <MuiThemeProvider theme={themeColor}>
                    <Button
                      style={{
                        height: 40,
                        borderRadius: 4,
                        marginLeft: 8,
                        padding: "8px 4px",
                        fontWeight: 600,
                        boxShadow: "none",
                        color: use_theme_color ? "#fff" : title_color,
                        backgroundColor: use_theme_color
                          ? theme.palette.secondary.main
                          : button_color,
                        fontFamily: "IranSans",
                        textTransform: "initial",
                        fontSize: 14,
                        width: "max-content",
                      }}
                    >
                      {button_text}
                    </Button>
                  </MuiThemeProvider>
                </SectionLink>
              )}
            </div>
          </div>
          <div
            className={`w-100 px-4 py-2 d-flex justify-content-between align-items-center`}
            style={{
              minHeight: 56,
              backgroundColor: "#FAFBFB",
            }}
          >
            <div
              className="w-100 d-flex align-items-center"
              style={{ overflowX: "hidden", marginLeft: 30 }}
            >
              {_HEADER_CATEGORIES_VISIBILITY &&
              Object.keys(menus[0].children).length > 0 ? (
                <div style={{ zIndex: 1020 }}>
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
                        width: 24,
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
                      top: logo_size + 56 + 16,
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
                </div>
              ) : null}
              {_HEADER_MENU_VISIBILITY && (
                <div
                  className="d-flex w-100 justify-content-center align-items-center"
                  onMouseOver={() => setShowCategorySubMenu(false)}
                >
                  {headerMenu?.links?.map((item) => (
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
                        href={item.link}
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
                      >
                        <div style={{ whiteSpace: "nowrap" }}>{item.title}</div>
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
                          top: 56 + logo_size + 15,
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
                                href={item.link}
                                key={item.id}
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
              )}
            </div>

            <div className=" d-flex justify-content-end align-items-center">
              {has_search_bar ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    zIndex: 1021,
                    position: "relative",
                  }}
                >
                  <div
                    className={"searchBox"}
                    style={{
                      backgroundColor: is_search_bar
                        ? "#F6F6F7"
                        : "transparent",
                      border: is_search_bar
                        ? "1px solid #E4E6E7"
                        : "1px solid transparent",
                      width: is_search_bar ? 280 : "0",
                      transition: "all 0.5s ease-in-out",
                    }}
                  >
                    <button
                      className={"searchButton d-flex align-items-center"}
                      href="#"
                      onClick={() => {
                        set_is_search_bar(!is_search_bar);
                        setShowCategorySubMenu(false);
                      }}
                    >
                      <SearchOutlinedIcon
                        style={{
                          color: use_theme_color
                            ? theme.palette.secondary.main
                            : icon_and_text_color,
                        }}
                      />
                    </button>
                    <input
                      className={
                        is_search_bar ? "searchInputActive" : "searchInput"
                      }
                      style={{
                        width: is_search_bar ? "100%" : 0,
                        transition: "all 0.5s ease-in-out",
                        padding: "0 16px",
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
                            There was no results.
                          </div>
                        ) : (
                          unifiedArray.map((product) => (
                            <div
                              key={product.id}
                              onClick={() => {
                                set_is_search_bar(false);
                              }}
                            >
                              <ProductRow product={product} key={product.id} />
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div
          id="header_10"
          className={`w-100 ${
            _HEADER_OVER_POSITION ? "position-absolute" : "position-relative"
          }`}
          style={{ zIndex: 100 }}
        >
          <div
            className="d-flex position-relative py-2 align-items-center justify-content-center"
            style={{
              minHeight: 40,
              height: "max-content",
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
                  alt={business.revised_title}
                  style={{ opacity: opacity / 100 }}
                />
              )}
            </div>

            <div className="flex-1 d-flex justify-content-center align-items-center">
              <Link
                className="flex-1 justify-content-center d-flex align-items-center"
                href={`${urlPrefix}/`}
              >
                {_HEADER_LOGO_VISIBILITY ? (
                  <LazyImage
                    src={logo}
                    height={logo_size}
                    width={"auto"}
                    alt={business.revised_title}
                    className="u-border-radius-4"
                  />
                ) : null}
                {_HEADER_TITLE_VISIBILITY ? (
                  <div
                    className="px-2"
                    style={{
                      fontSize: business_title_size - 5,
                      fontWeight: 600,
                      color: use_theme_color
                        ? theme.palette.secondary.main
                        : icon_and_text_color,
                      zIndex: 1000,
                    }}
                  >
                    {title}
                  </div>
                ) : null}
              </Link>
            </div>
          </div>
          <div
            className="d-flex justify-content-between align-items-center px-4 py-2 position-relative"
            style={{
              minHeight: 56,
              backgroundColor: "#FAFBFB",
            }}
          >
            {_HEADER_CATEGORIES_VISIBILITY && (
              <div style={{ zIndex: 1020 }}>
                <div
                  className="d-flex ml-4 align-items-center u-cursor-pointer"
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
                  anchor="right"
                  customClassName="pl-3"
                  style={{ width: "80vw", position: "relative" }}
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

                    {has_button && (
                      <SectionLink
                        style={{ padding: 0, margin: 0 }}
                        href={
                          link_type == "has_internal_link"
                            ? internal_link
                            : external_link
                        }
                        businessAddress={businessAddress}
                      >
                        <MuiThemeProvider theme={themeColor}>
                          <Button
                            style={{
                              height: 40,
                              borderRadius: 4,
                              margin: "8px 16px",
                              padding: "8px 4px 4px",
                              fontWeight: 600,
                              boxShadow: "none",
                              color: use_theme_color ? "#fff" : title_color,
                              backgroundColor: use_theme_color
                                ? theme.palette.secondary.main
                                : button_color,
                              fontFamily: "IranSans",
                              textTransform: "initial",
                              fontSize: 14,
                              width: "-webkit-fill-available",
                            }}
                          >
                            {button_text}
                          </Button>
                        </MuiThemeProvider>
                      </SectionLink>
                    )}

                    {headerMenu?.links?.map((link) => renderMenuItem(link))}
                    <p
                      className="m-3 mb-0"
                      style={{ height: 1, backgroundColor: "#ccc" }}
                    ></p>
                    <p className="p-3">Classification of goods</p>
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
                    )}
                    <p
                      className="m-3 mb-0"
                      style={{ height: 1, backgroundColor: "#ccc" }}
                    ></p>
                    <p className="p-3">Account</p>

                    {menuWidget?.map((link) => {
                      if (
                        (link.noRenderAuth && isAuthenticated) ||
                        (link.needsAuth && !isAuthenticated)
                      )
                        return null;
                      const Icon = IconsDictionary[link.icon];
                      if (link.isShoppingMenu) {
                        if (
                          isMenuVisible &&
                          isMobile &&
                          Object.keys(business.menu).length
                        ) {
                          return (
                            <div
                              id={link.id}
                              key={`menu-link-${link.id}`}
                              style={{
                                borderTopRadius: 1,
                                color: link.colored
                                  ? themeColor
                                  : theme.palette.text.disabled,
                                borderColor:
                                  theme.palette.action.disabledBackground,
                              }}
                              className="p-2 pr-3 cursorPointer min-width-100 d-flex flex-column justify-content-center align-items-center "
                            >
                              <>
                                <div className="d-flex align-items-center w-100">
                                  <div className="mr-1 w-100">{link.text}</div>
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
                      if (link.action) {
                        return (
                          <div
                            id={link.id}
                            key={`menu-link-${link.id}`}
                            onClick={() =>
                              PLUGIN_ACTIONS[link.action]({
                                business,
                                urlPrefix,
                              })
                            }
                            style={{
                              borderTopWidth: link.hasBorder ? 1 : 0,
                              color: link.colored
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
                              <div className="mr-2">{link.text}</div>
                            </div>
                            {link.hasChevron && (
                              <KeyboardArrowLeftRoundedIcon fontSize="small" />
                            )}
                          </div>
                        );
                      }
                      if (link.url) {
                        return (
                          <Link
                            passHref
                            id={link.id}
                            key={`menu-link-${link.id}`}
                            href={`${urlPrefix}${link.url}`}
                          >
                            <div
                              style={{
                                borderTopWidth: link.hasBorder ? 1 : 0,
                                color: link.colored
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
                                <div className="mr-2">{link.text}</div>
                                <div
                                  className="mr-2 u-fontWeightBold"
                                  style={{
                                    marginTop: 2,
                                    color: theme.palette.secondary.main,
                                  }}
                                >
                                  {link.itemsAmount}
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
            )}

            {has_search_bar ? (
              <div
                className="flex-1 position-relative"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  zIndex: 1021,
                }}
              >
                <div
                  className={
                    is_search_bar ? "searchBoxActive px-2" : "searchBox"
                  }
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
                    <SearchOutlinedIcon
                      style={{
                        color: use_theme_color
                          ? theme.palette.secondary.main
                          : icon_and_text_color,
                      }}
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
                      top: 48,
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
                        <div className="container p-2">There was no results.</div>
                      ) : (
                        unifiedArray.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => {
                              set_is_search_bar(false);
                            }}
                          >
                            <ProductRow product={product} key={product.id} />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : null}
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

export default compose(withConnect, memo)(Header11);
