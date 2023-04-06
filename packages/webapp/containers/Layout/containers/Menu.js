/* eslint-disable indent */
import React, { memo, useEffect, useState } from "react";
import Link from "next/link";
import Paper from "@material-ui/core/Paper";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import useTheme from "@material-ui/core/styles/useTheme";
import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import {
  makeSelectBusiness,
  makeSelectBusinessThemeColor,
  makeSelectBusinessThemeConfig,
  makeSelectHierarchy,
} from "@saas/stores/business/selector";
import {
  makeSelectIsAuthenticated,
  makeSelectUser,
} from "@saas/stores/user/selector";
import {
  makeSelectPlugin,
  makeSelectUrlPrefix,
  makeSelectWidgets,
} from "@saas/stores/plugins/selector";
import { MENU_LINKS_WIDGET } from "@saas/stores/plugins/constants";
import { PLUGIN_ACTIONS } from "@saas/stores/plugins/PLUGIN_ACTIONS";

import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";

import CustomDrawer from "@saas/components/CustomDrawer";
import ReferralCard from "@saas/components/ReferralCard";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import IconsDictionary from "@saas/utils/IconsDictionary";
import List from "@material-ui/core/List";
import CategoryNode from "@saas/builder/HeaderRenderer/CategoryNode";
import { HEADER_CATEGORIES_VISIBILITY } from "@saas/utils/constants/headerConstants";
import {
  defaultNavigationMenus,
  MAIN_HEADER_NAVIGATION_MENU,
} from "@saas/utils/constants/navigationMenus";
import { Collapse } from "react-collapse";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { HEADER_5 } from "@saas/utils/constants/headers";

function HeaderMenu(props) {
  const {
    isAuthenticated,
    isOpen,
    onClose,
    widgets,
    pluginData,
    themeColor,
    business,
    urlPrefix,
    hierarchy,
    themeConfig,
  } = props;
  const theme = useTheme();
  const { maxWidth768 } = useResponsive();
  const isMenuVisible = themeConfig.header_config
    ? themeConfig.header_config.customization &&
      themeConfig.header_config.customization.layout &&
      themeConfig.header_config.customization.layout[
        HEADER_CATEGORIES_VISIBILITY
      ]
    : false;
  const inviterGift = priceFormatter(
    pluginData.data.gift_amount_for_inviter * 5
  );
  const menuWidget = widgets[MENU_LINKS_WIDGET];
  const isInvitationActive =
    pluginData.data.gift_amount_for_invited &&
    pluginData.data.gift_amount_for_inviter &&
    isAuthenticated;
  const hasAccount = pluginData?.data?.has_account !== false;
  const [headerMenu, setHeaderMenu] = useState(null);

  useEffect(() => {
    if (
      themeConfig &&
      themeConfig.navigation_menus &&
      themeConfig.navigation_menus[MAIN_HEADER_NAVIGATION_MENU]
    ) {
      setHeaderMenu(themeConfig.navigation_menus[MAIN_HEADER_NAVIGATION_MENU]);
    } else {
      setHeaderMenu(
        defaultNavigationMenus(urlPrefix)[MAIN_HEADER_NAVIGATION_MENU]
      );
    }
  }, [themeConfig]);
  const [isCollapseOpen, setCollapseOpen] = useState({});
  const handleCollapse = (e) => {
    setCollapseOpen({ ...isCollapseOpen, [e]: !isCollapseOpen[e] });
  };
  const renderMenuItem = (link) => {
    if (!link.links || !link?.links?.length) {
      return (
        <Link
          id={link.id}
          key={`menu-link-${link.id}`}
          href={link.link}
          passHref
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
    <CustomDrawer
      id="simple-menu"
      isOpen={isOpen}
      onClose={onClose}
      customClassName=""
    >
      <div>
        <ModalHeader onRightClick={onClose} />
        <div style={{ color: theme.palette.text.disabled }} className="px-2">
          {isInvitationActive && hasAccount && (
            <ReferralCard
              themeColor={themeColor}
              inviterGift={inviterGift}
              urlPrefix={urlPrefix}
            />
          )}
          <Paper elevation={0} className="mt-1">
            {(maxWidth768 ||
              themeConfig?.header_config?.customization?.layout?.type ===
                HEADER_5) &&
              headerMenu &&
              headerMenu.links &&
              headerMenu.links.map((link) => renderMenuItem(link))}
            {menuWidget &&
              menuWidget.map((link) => {
                if (
                  (link.noRenderAuth && isAuthenticated) ||
                  (link.needsAuth && !isAuthenticated)
                )
                  return null;
                const Icon = IconsDictionary[link.icon];
                if (link.isShoppingMenu) {
                  if (
                    isMenuVisible &&
                    maxWidth768 &&
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
                          borderColor: theme.palette.action.disabledBackground,
                        }}
                        className="p-2 px-3 cursorPointer min-width-100 d-flex flex-column justify-content-center align-items-center "
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
                                handleDrawerClose={onClose}
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
                        PLUGIN_ACTIONS[link.action]({ business, urlPrefix })
                      }
                      style={{
                        borderTopWidth: link.hasBorder ? 1 : 0,
                        color: link.colored
                          ? themeColor
                          : theme.palette.text.disabled,
                        borderColor: theme.palette.action.disabledBackground,
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
                if (link.query) {
                  return (
                    <div
                      id={link.id}
                      key={`menu-link-${link.id}`}
                      onClick={() => pushParamsToUrl(link.query)}
                    >
                      <div
                        style={{
                          borderTopWidth: link.hasBorder ? 1 : 0,
                          color: link.colored
                            ? themeColor
                            : theme.palette.text.disabled,
                          borderColor: theme.palette.action.disabledBackground,
                        }}
                        className="p-2 px-3 cursorPointer min-width-100 d-flex justify-content-between align-items-center "
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
                          borderColor: theme.palette.action.disabledBackground,
                        }}
                        className="p-2 px-3 cursorPointer min-width-100 d-flex justify-content-between align-items-center "
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
                      borderColor: theme.palette.action.disabledBackground,
                    }}
                    key={`menu-link-${link.id}`}
                    className="p-2 px-3 cursorPointer min-width-100 d-flex justify-content-between align-items-center "
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
        </div>
      </div>
    </CustomDrawer>
  );
}

const mapStateToProps = createStructuredSelector({
  business: makeSelectBusiness(),
  user: makeSelectUser(),
  isAuthenticated: makeSelectIsAuthenticated(),
  widgets: makeSelectWidgets(),
  themeColor: makeSelectBusinessThemeColor(),
  pluginData: makeSelectPlugin(CRM_PLUGIN),
  urlPrefix: makeSelectUrlPrefix(),
  hierarchy: makeSelectHierarchy(),
  themeConfig: makeSelectBusinessThemeConfig(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(HeaderMenu);
