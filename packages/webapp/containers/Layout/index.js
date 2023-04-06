/* eslint-disable import/no-unused-modules */
/**
 *
 * Layout
 *
 */

import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import Footer from "@saas/components/Footer";
import Header from "@saas/builder/HeaderRenderer/HeaderTypes/Header";
import {
  makeSelectBusiness,
  makeSelectBusinessThemeColor,
  makeSelectBusinessThemeConfig,
  makeSelectIsBranch,
} from "@saas/stores/business/selector";
import {
  makeSelectPlugin,
  makeSelectPluginSharedComponent,
  makeSelectUrlPrefix,
  makeSelectWidgets,
} from "@saas/stores/plugins/selector";
import { makeSelectUser } from "@saas/stores/user/selector";

import { useRouter } from "next/router";
import { headerComponents } from "@saas/builder/HeaderRenderer/constants";
import { PLUGIN_COMPONENTS } from "@saas/stores/plugins/PLUGIN_COMPONENTS";
import { WHITE_LABEL_PLUGIN } from "@saas/utils/constants/plugins";
import { footerComponents } from "@saas/builder/FooterRenderer/constants";
import footerConstants, {
  FOOTER_VISIBILITY,
} from "@saas/utils/constants/footerConstants";

import LazyHydrate from "react-lazy-hydration";
import headerConstants from "@saas/utils/constants/headerConstants";
import navigationBarConstant from "@saas/utils/constants/navigationBarConstant";
import NavigationBar from "@saas/builder/NavigationBarRenderer";
import { TopPageHeaderComponent } from "@saas/builder/TopPageHeaderRenderer";
import topPageHeaderConstant from "@saas/utils/constants/topPageHeaderConstant";
import IconButton from "@material-ui/core/IconButton";
import HelpIcon from "@material-ui/icons/Help";
import dynamic from "next/dynamic";

const Modals = dynamic(() => import("./containers/Modals"));
const Drawers = dynamic(() => import("./containers/Drawers"));

export function Layout({
  children,
  business,
  noHeader,
  isSmall,
  themeConfig,
  sharedComponents,
  whiteLabelPlugin,
  noFooter,
  user,
  urlPrefix,
  noCopyRightFooter,
  header_transparent,
  noSharedComponents = false,
}) {
  const router = useRouter();
  const [headerConfig, setHeaderConfig] = useState(themeConfig.header_config);
  const [footerConfig, setFooterConfig] = useState(themeConfig.footer_config);
  const [navigationBarconfig, setNavigationBarConfig] = useState(
    themeConfig.navigationBar_config
  );
  const [topPageHeaderConfig, setTopPageHeaderConfig] = useState(
    themeConfig.top_page_header_config
  );

  const [isTopPageHeader, setIsTopPageHeader] = useState(false);
  const [isNavigationBar, setIsNavigationBar] = useState(false);

  const HeaderComp =
    headerConfig && headerConfig.customization?.layout?.type
      ? headerComponents[headerConfig.customization.layout.type]
      : Header;
  const FooterComp = footerConfig
    ? footerComponents[footerConfig.customization.layout.type]
    : null;
  const NavigationComp = navigationBarconfig ? NavigationBar : null;
  const TopPageHeaderComp = topPageHeaderConfig ? TopPageHeaderComponent : null;

  useEffect(() => {
    if (themeConfig) {
      if (themeConfig.header_config) {
        setHeaderConfig(themeConfig.header_config);
      } else {
        const obj = {};
        headerConstants.forEach((tab) => {
          obj[tab.key] = {};
          if (tab.items) {
            tab.items.forEach((item) => {
              if (item.has_multiple_items) {
                obj[tab.key][item.key] = {
                  items: item.default_items || [],
                };
                item.fields.forEach((field) => {
                  obj[tab.key][item.key][field.key] =
                    field.default_value || null;
                });
              } else if (item.fields) {
                obj[tab.key][item.key] = {};
                item.fields.forEach((field) => {
                  obj[tab.key][item.key][field.key] =
                    field.default_value || null;
                });
              }
            });
          }
        });
        setHeaderConfig(obj);
      }
      if (themeConfig.footer_config) {
        setFooterConfig(themeConfig.footer_config);
      } else {
        const obj = {};
        footerConstants.forEach((tab) => {
          obj[tab.key] = {};
          if (tab.items) {
            tab.items.forEach((item) => {
              if (item.has_multiple_items) {
                obj[tab.key][item.key] = {
                  items: item.default_items || [],
                };
                item.fields.forEach((field) => {
                  obj[tab.key][item.key][field.key] =
                    field.default_value || null;
                });
              } else if (item.fields) {
                obj[tab.key][item.key] = {};
                item.fields.forEach((field) => {
                  obj[tab.key][item.key][field.key] =
                    field.default_value || null;
                });
              }
            });
          }
        });
        setFooterConfig(obj);
      }
      if (themeConfig.navigationBar_config) {
        setNavigationBarConfig(themeConfig.navigationBar_config);
        setIsNavigationBar(themeConfig?.is_active_navigation);
      } else {
        const obj = {};
        navigationBarConstant.forEach((tab) => {
          obj[tab.key] = {};
          if (tab.items) {
            tab.items.forEach((item) => {
              if (item.has_multiple_items) {
                obj[tab.key][item.key] = {
                  items: item.default_items || [],
                };
                item.fields.forEach((field) => {
                  obj[tab.key][item.key][field.key] =
                    field.default_value || null;
                });
              } else if (item.fields) {
                obj[tab.key][item.key] = {};
                item.fields.forEach((field) => {
                  obj[tab.key][item.key][field.key] =
                    field.default_value || null;
                });
              }
            });
          }
        });
        setNavigationBarConfig(obj);
        setIsNavigationBar(themeConfig?.is_active_navigation);
      }

      if (themeConfig.top_page_header_config) {
        setTopPageHeaderConfig(themeConfig.top_page_header_config);
        setIsTopPageHeader(themeConfig.is_top_page_header);
      } else {
        const obj = {};
        topPageHeaderConstant.forEach((tab) => {
          obj[tab.key] = {};
          if (tab.items) {
            tab.items.forEach((item) => {
              if (item.has_multiple_items) {
                obj[tab.key][item.key] = {
                  items: item.default_items || [],
                };
                item.fields.forEach((field) => {
                  obj[tab.key][item.key][field.key] =
                    field.default_value || null;
                });
              } else if (item.fields) {
                obj[tab.key][item.key] = {};
                item.fields.forEach((field) => {
                  obj[tab.key][item.key][field.key] =
                    field.default_value || null;
                });
              }
            });
          }
        });
        setTopPageHeaderConfig(obj);
        setIsTopPageHeader(themeConfig.is_top_page_header);
      }
    }
  }, [themeConfig]);
  const _FOOTER_VISIBILITY =
    !noFooter &&
    footerConfig &&
    footerConfig.customization &&
    footerConfig.customization.presentation[FOOTER_VISIBILITY];
  return (
    <div
      className="position-relative d-flex flex-column w-100 "
      style={{ minHeight: "100vh", marginBottom: 40 }}
    >
      <Drawers />
      <LazyHydrate whenVisible style={{ display: "block" }}>
        <Modals />
      </LazyHydrate>
      <LazyHydrate whenVisible style={{ display: "block" }}>
        {isNavigationBar && !noHeader && NavigationComp && (
          <NavigationComp
            {...navigationBarconfig}
            business={business}
            urlPrefix={urlPrefix}
          />
        )}
      </LazyHydrate>
      <LazyHydrate whenVisible style={{ display: "block" }}>
        {isTopPageHeader && !noHeader && (
          <TopPageHeaderComp
            {...topPageHeaderConfig}
            urlPrefix={urlPrefix}
            business={business}
          />
        )}
      </LazyHydrate>
      <LazyHydrate whenVisible style={{ display: "block" }}>
        {!noHeader && (
          <HeaderComp
            header_transparent={header_transparent}
            {...headerConfig}
          />
        )}
      </LazyHydrate>

      <section
        className={`d-flex position-relative pt-0 flex-column mx-auto px-0 ${
          isSmall ? "col-12 col-xl-4 col-md-6" : "w-100"
        }`}
      >
        {children}
      </section>
      <section>
        {!noSharedComponents &&
          sharedComponents.map((item) => {
            if (
              !item.excludes ||
              item.excludes.every(
                (url) => !router || !router.asPath.includes(url)
              )
            ) {
              const Comp = PLUGIN_COMPONENTS[item.comp];
              return <Comp />;
            }
            return null;
          })}
      </section>
      <LazyHydrate whenVisible style={{ display: "block" }}>
        {!noFooter && FooterComp && footerConfig && _FOOTER_VISIBILITY && (
          <FooterComp {...footerConfig} />
        )}
      </LazyHydrate>
      {!router.asPath.includes("/pagebuilder") &&
      router.asPath.includes("/admin") ? (
        <div className="help-btn">
          <a
            className="help-btn__link"
            href="https://help.vitrin.me"
            target="_blank"
            rel="noreferrer"
          >
            <IconButton className="help-btn__btn">
              <HelpIcon className="help-btn__icon" />
            </IconButton>
          </a>
        </div>
      ) : null}
      <LazyHydrate whenVisible style={{ display: "block" }}>
        {!noCopyRightFooter && (
          <Footer
            businessName={business.revised_title}
            isWhiteLabel={whiteLabelPlugin.isActive}
            whiteLabelPluginData={whiteLabelPlugin.data}
          />
        )}
      </LazyHydrate>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  business: makeSelectBusiness(),
  isBranch: makeSelectIsBranch(),
  user: makeSelectUser(),
  widgets: makeSelectWidgets(),
  urlPrefix: makeSelectUrlPrefix(),
  themeColor: makeSelectBusinessThemeColor(),
  themeConfig: makeSelectBusinessThemeConfig(),
  sharedComponents: makeSelectPluginSharedComponent(),
  whiteLabelPlugin: makeSelectPlugin(WHITE_LABEL_PLUGIN),
});

function mapDispatchToProps() {
  return {};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Layout);
