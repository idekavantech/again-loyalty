/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { memo, useCallback } from "react";
import Axios from "axios";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Cookies from "js-cookie";

import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";

import { makeSelectAdminMenuLinks, makeSelectAdminUrlPrefix, makeSelectPlugin } from "@saas/stores/plugins/selector";
import adminMenuLinksConfig from "@saas/stores/configs/adminMenuLinks";

import {
  BASE_PLUGIN,
  BRANCHES_PLUGIN,
  CRM_PLUGIN,
  LANDING_PLUGIN,
  POS_PLUGIN,
  SAAS,
  SHOPPING_PLUGIN,
  SHOPPING_PLUGIN_URL,
} from "@saas/utils/constants/plugins";
import {
  DARAMAD_WEBAPP_CONSTANT,
  DOBARE_WEBAPP_CONSTANT,
  INCLUDED_WEBAPPS_ONLY_KEY,
  VITRIN_TOKEN,
  VITRIN_WEBAPP_CONSTANT,
} from "@saas/utils/constants";
import { makeSelectBusiness } from "@saas/stores/business/selector";
import { makeSelectUser } from "@saas/stores/user/selector";
import NewSupportMenuIcon from "../../configs/icons/NewSupportMenuIcon";
import NewLogoutMenuIcon from "../../configs/icons/NewLogoutMenuIcon";
import NewMenuItem from "./NewMenuItem";
import { OTHER, YOUR_WEBSITE, YOUR_BUSINESS, ACCOUNTING, YOUR_CLUB } from "@saas/stores/configs/constants";
import { supportTeamPhone } from "./constants";

function AdminHeaderMenu({
  adminMenuLinks = [],
  open,
  variant,
  onClose,
  onClickItem,
  drawerWidth,
  drawerClosedWidth,
  headerHeight,
  business,
  disabled,
  urlPrefix,
}) {
  const hasShoppingSupport =
    business?.super_business?.plugins_config?.[BRANCHES_PLUGIN]?.data?.supported_plugins?.includes(SHOPPING_PLUGIN);
  const hasOrdering = business.plugins_config?.[SHOPPING_PLUGIN]?.data?.has_ordering;
  const hasMultiBranchPlugin = business.plugins_config?.[BRANCHES_PLUGIN];

  const isDobarePanel = process.env.NEXT_PUBLIC_APP_NAME === DOBARE_WEBAPP_CONSTANT;
  const reportSublinks = [
    {
      text: "Dashboard",
      url: `${SHOPPING_PLUGIN_URL}/analytics/dashboard`,
      blank: true,
    },
    {
      text: "reports",
      url: `${SHOPPING_PLUGIN_URL}/analytics/reports`,
      blank: true,
    },
  ];
  if (hasShoppingSupport && hasOrdering !== false)
    reportSublinks.push({
      text: "Joint wallet",
      url: `${SHOPPING_PLUGIN_URL}/finance/sow`,
      blank: true,
    });

  const logout = useCallback(() => {
    delete Axios.defaults.headers.common.Authorization;
    window.location = "/login";
    localStorage.removeItem(VITRIN_TOKEN);
    Cookies.remove(VITRIN_TOKEN);
  }, []);
  const defaultAdminMenuLinksBeforePluginsLinks = [
    {
      text: "Dashboard",
      subLinks: [],
      url: `${urlPrefix}`,
      icon: "NewDashboardMenuIcon",
      exact: true,
      section: YOUR_BUSINESS.value,
    },
    ...(!hasMultiBranchPlugin
      ? [
          {
            text: "products",
            isSubLinksOpen: false,
            [INCLUDED_WEBAPPS_ONLY_KEY]: [DARAMAD_WEBAPP_CONSTANT, VITRIN_WEBAPP_CONSTANT],
            subLinks: [
              {
                text: "products",
                url: `${SHOPPING_PLUGIN_URL}/settings/products`,
                needsShoppingSupport: true,
              },
              {
                text: "Labels",
                url: `${SHOPPING_PLUGIN_URL}/settings/l`,
                needsShoppingSupport: true,
              },
              {
                text: "categories",
                url: `${SHOPPING_PLUGIN_URL}/settings/c`,
                needsShoppingSupport: false,
              },
              {
                text: "Products",
                url: `${SHOPPING_PLUGIN_URL}/settings/bulk/products_inventory`,
                needsShoppingSupport: false,
                [INCLUDED_WEBAPPS_ONLY_KEY]: [VITRIN_WEBAPP_CONSTANT],
              },
              {
                text: "Raw material",
                url: `${SHOPPING_PLUGIN_URL}/settings/ingredients`,
                needsShoppingSupport: true,
                [INCLUDED_WEBAPPS_ONLY_KEY]: [DARAMAD_WEBAPP_CONSTANT],
              },
              {
                text: "Additives",
                url: `${SHOPPING_PLUGIN_URL}/settings/modifier_sets`,
                needsShoppingSupport: true,
              },
              {
                text: "Inventory additives",
                url: `${SHOPPING_PLUGIN_URL}/settings/bulk/modifier_sets_inventory`,
                needsShoppingSupport: false,
                [INCLUDED_WEBAPPS_ONLY_KEY]: [VITRIN_WEBAPP_CONSTANT],
              },
            ].filter((link) => !link.needsShoppingSupport || !hasShoppingSupport),
            url: "",
            onClick: () => {},
            icon: "NewProductsMenuIcon",
            section: YOUR_BUSINESS.value,
          },
        ]
      : []),
    ...(!hasMultiBranchPlugin || isDobarePanel
      ? [
          {
            text: "Orders",
            url: `${urlPrefix}${SHOPPING_PLUGIN_URL}/orders`,
            icon: "NewOrdersMenuIcon",
            section: YOUR_BUSINESS.value,
          },
        ]
      : []),
    ...(!hasMultiBranchPlugin || isDobarePanel
      ? [
          {
            text: "customers",
            url: `${urlPrefix}crm/customers`,
            icon: "NewCustomersMenuIcon",
            section: YOUR_BUSINESS.value,
          },
        ]
      : []),
    // {
    //   text: "reports",
    //   icon: "NewReportsMenuIcon",
    //   subLinks: [
    //     {
    //       text: "Report Gift Credit",
    //       url: `/crm/credit_reports`,
    //     }
    //   ],
    //   onClick: () => {},
    //   [INCLUDED_WEBAPPS_ONLY_KEY]: [DOBARE_WEBAPP_CONSTANT],
    //   url: ``,
    //   section: YOUR_BUSINESS.value,
    // },
    {
      text: "Discounts",
      url: `${urlPrefix}/crm/customer_discount`,
      icon: "NewDiscountMenuIcon",
      [INCLUDED_WEBAPPS_ONLY_KEY]: [DOBARE_WEBAPP_CONSTANT],
      section: YOUR_BUSINESS.value,
    },
    ...(!hasMultiBranchPlugin
      ? [
          {
            text: "Discounts",
            url: `${urlPrefix}${SHOPPING_PLUGIN_URL}/settings/discounts`,
            icon: "NewDiscountMenuIcon",
            section: YOUR_BUSINESS.value,
            [INCLUDED_WEBAPPS_ONLY_KEY]: [DARAMAD_WEBAPP_CONSTANT, VITRIN_WEBAPP_CONSTANT],
          },
        ]
      : []),
    {
      text: "Customer Grouping",
      icon: "NewClubCustomersMenuIcon",
      subLinks: [
        {
          text: "Customer levels",
          url: `/crm/customer_levels`,
        },
        {
          text: "customer labels",
          url: `/crm/labels`,
        },
        {
          text: "Customer segmentation",
          url: `/crm/segments`,
        },
      ],
      onClick: () => {},
      [INCLUDED_WEBAPPS_ONLY_KEY]: [DOBARE_WEBAPP_CONSTANT],
      url: ``,
      section: YOUR_CLUB.value,
    },
    // {
    //   text: "opinions",
    //   url: `${urlPrefix}reviews`,
    //   icon: "NewCommentsMenuIcon",
    //   [INCLUDED_WEBAPPS_ONLY_KEY]: [DOBARE_WEBAPP_CONSTANT],
    //   section: YOUR_CLUB.value,
    // },
    {
      text: "Automatic trends",
      url: `${urlPrefix}crm/automated_processes`,
      icon: "NewAutomatedMenuIcon",
      [INCLUDED_WEBAPPS_ONLY_KEY]: [DOBARE_WEBAPP_CONSTANT],
      section: YOUR_CLUB.value,
    },
    // {
    //   text: "Campaigns",
    //   url: ``,
    //   icon: "NewChannelsMenuIcon",
    //   [INCLUDED_WEBAPPS_ONLY_KEY]: [DOBARE_WEBAPP_CONSTANT],
    //   section: YOUR_CLUB.value,
    //   subLinks: [
    //     {
    //       text: "Birthday greetings and marriage anniversary",
    //       url: `${CRM_PLUGIN}/celebration_reminder/`,
    //       needsShoppingSupport: false,
    //     },
    //     {
    //       text: "Other campaigns",
    //       url: `${CRM_PLUGIN}/campaign`,
    //       needsShoppingSupport: false,
    //     },
    //   ],
    // },
    {
      text: "Expiry reminder",
      url: ``,
      icon: "ExpiryReminderMenuIcon",
      [INCLUDED_WEBAPPS_ONLY_KEY]: [DOBARE_WEBAPP_CONSTANT],
      section: YOUR_CLUB.value,
      subLinks: [
        {
          text: "Expiry reminder(with-duration)",
          url: `${CRM_PLUGIN}/expiry_reminder/with_duration`,
          needsShoppingSupport: false,
        },
      ],
    },
    // {
    //   text: "Sale and income",
    //   url: `${urlPrefix}appearance/pages`,
    //   icon: "NewSaleAndIncomeMenuIcon",
    //   [INCLUDED_WEBAPPS_ONLY_KEY]: [DARAMAD_WEBAPP_CONSTANT],
    //   section: ACCOUNTING.value,
    // },
    {
      text: "Buy and cost",
      icon: "NewBuyAndCostMenuIcon",
      url: "",
      [INCLUDED_WEBAPPS_ONLY_KEY]: [DARAMAD_WEBAPP_CONSTANT],
      section: ACCOUNTING.value,
      subLinks: [
        {
          text: "Cost List",
          url: `${SHOPPING_PLUGIN_URL}/settings/accounting/expenses_list`,
        },
        {
          text: "Register a new fee",
          url: `${SHOPPING_PLUGIN_URL}/settings/accounting/add_expense`,
        },
      ],
    },
    {
      text: "inventory",
      url: "",
      icon: "NewInventoryMenuIcon",
      [INCLUDED_WEBAPPS_ONLY_KEY]: [DARAMAD_WEBAPP_CONSTANT],
      section: ACCOUNTING.value,
      subLinks: [
        {
          text: "Products",
          url: `${SHOPPING_PLUGIN_URL}/settings/bulk/products_inventory`,
          needsShoppingSupport: false,
        },
        {
          text: "Regulating the inventory of raw materials",
          url: `${SHOPPING_PLUGIN_URL}/settings/bulk/ingredients_inventory`,
          needsShoppingSupport: false,
        },
        {
          text: "Raw material warehousing",
          url: `${SHOPPING_PLUGIN_URL}/analytics/reports/ingredients_storage`,
          needsShoppingSupport: false,
        },
        {
          text: "Inventory additives",
          url: `${SHOPPING_PLUGIN_URL}/settings/bulk/modifier_sets_inventory`,
          needsShoppingSupport: false,
        },
      ],
    },
    {
      text: "Fund software",
      icon: "NewChestSoftwareMenuIcon",
      url: "",
      [INCLUDED_WEBAPPS_ONLY_KEY]: [DARAMAD_WEBAPP_CONSTANT],
      section: ACCOUNTING.value,
      subLinks: [
        {
          text: "Sales Channels",
          url: `/saleschannel`,
        },
        {
          text: "Devices",
          url: `/devices`,
        },
        {
          text: "My shorts",
          url: `/supermenu`,
        },
        {
          text: "Peak management",
          url: `${SHOPPING_PLUGIN_URL}/settings/couriers`,
        },
        {
          text: "Courier records",
          url: `${SHOPPING_PLUGIN_URL}/settings/courier-records`,
        },
      ],
    },
    ...(!hasMultiBranchPlugin
      ? [
          {
            text: "reports",
            icon: "NewDaramadReportsMenuIcon",
            subLinks: [
              {
                text: "reports",
                url: `${SHOPPING_PLUGIN_URL}/analytics/reports`,
              },
              {
                text: "Report of funds",
                url: `/devices/analytics/cash_drawers`,
              },
              {
                text: "Transactions",
                url: `${SHOPPING_PLUGIN_URL}/settings/transactions`,
              },
            ],
            onClick: () => {},
            [INCLUDED_WEBAPPS_ONLY_KEY]: [DARAMAD_WEBAPP_CONSTANT],
            url: ``,
            section: ACCOUNTING.value,
          },
        ]
      : []),
    {
      text: "Marketing and increasing visits",
      url: `${urlPrefix}sales_channels`,
      icon: "NewChannelsMenuIcon",
      [INCLUDED_WEBAPPS_ONLY_KEY]: [VITRIN_WEBAPP_CONSTANT],
      section: YOUR_WEBSITE.value,
    },
    {
      text: "pages",
      url: `${urlPrefix}appearance/pages`,
      icon: "NewPagesMenuIcon",
      [INCLUDED_WEBAPPS_ONLY_KEY]: [VITRIN_WEBAPP_CONSTANT],
      section: YOUR_WEBSITE.value,
    },
    {
      text: "Intended",
      url: `${urlPrefix}appearance/menu`,
      icon: "NewMenusMenuIcon",
      [INCLUDED_WEBAPPS_ONLY_KEY]: [VITRIN_WEBAPP_CONSTANT],
      section: YOUR_WEBSITE.value,
    },
    {
      subLinks: [],
      text: "forms",
      url: `${urlPrefix}forms`,
      icon: "NewFormsMenuIcon",
      needsShoppingSupport: true,
      [INCLUDED_WEBAPPS_ONLY_KEY]: [VITRIN_WEBAPP_CONSTANT],
      section: YOUR_WEBSITE.value,
    },
    {
      text: "opinions",
      url: `${urlPrefix}reviews`,
      icon: "NewCommentsMenuIcon",
      [INCLUDED_WEBAPPS_ONLY_KEY]: [VITRIN_WEBAPP_CONSTANT],
      section: YOUR_WEBSITE.value,
    },

    ...(!hasMultiBranchPlugin
      ? [
          {
            text: "reports",
            icon: "NewReportsMenuIcon",
            subLinks: reportSublinks,
            onClick: () => {},
            [INCLUDED_WEBAPPS_ONLY_KEY]: [VITRIN_WEBAPP_CONSTANT],
            url: `${urlPrefix}analytics`,
            section: YOUR_WEBSITE.value,
          },
        ]
      : []),
    {
      text: "Settings",
      isSubLinksOpen: false,
      subLinks: [
        {
          text: "General",
          url: `setting`,
        },
        // {
        //   text: "Survey settings",
        //   [INCLUDED_WEBAPPS_ONLY_KEY]: [DOBARE_WEBAPP_CONSTANT],
        //   url: `/crm/survey`,
        // },
        {
          text: "Fonts and colors",
          url: `appearance/theme`,
          needsShoppingSupport: false,
          [INCLUDED_WEBAPPS_ONLY_KEY]: [VITRIN_WEBAPP_CONSTANT],
        },
        ...(!hasMultiBranchPlugin
          ? [
              {
                text: "Ordering settings",
                url: `${SHOPPING_PLUGIN_URL}/settings/general`,
                needsShoppingSupport: false,
                [INCLUDED_WEBAPPS_ONLY_KEY]: [VITRIN_WEBAPP_CONSTANT, DARAMAD_WEBAPP_CONSTANT],
              },
              {
                text: "Peaks",
                url: `${SHOPPING_PLUGIN_URL}/settings/couriers`,
                needsShoppingSupport: false,
                [INCLUDED_WEBAPPS_ONLY_KEY]: [VITRIN_WEBAPP_CONSTANT],
              },
            ]
          : []),
        {
          text: "The floating button",
          url: "fab/settings",
          needsShoppingSupport: false,
          priority: -1,
          [INCLUDED_WEBAPPS_ONLY_KEY]: [VITRIN_WEBAPP_CONSTANT],
        },
        {
          text: "Tags",
          url: `tags`,
          needsShoppingSupport: true,
          [INCLUDED_WEBAPPS_ONLY_KEY]: [VITRIN_WEBAPP_CONSTANT],
        },
      ],
      url: "",
      onClick: () => {},
      icon: "NewSettingsMenuIcon",
      section: OTHER.value,
    },

    // {
    //   text: "Marketing channels",
    //   icon: "NewChannelsMenuIcon",
    //   onClick: () => {},
    //   [INCLUDED_WEBAPPS_ONLY_KEY]: [VITRIN_WEBAPP_CONSTANT],
    //   url: ``,
    //   needsShoppingSupport: false,
    //   section: OTHER.value,
    // },
  ];
  const links = [
    ...(adminMenuLinksConfig[process.env.NEXT_PUBLIC_APP_NAME]?.[SAAS]?.map((item) => ({
      ...item,
      url: `${urlPrefix}${item.url}`,
    })) || defaultAdminMenuLinksBeforePluginsLinks),
    ...adminMenuLinks,
  ];

  const getLinksBySection = (section) => {
    const isTheOtherSection = section === OTHER.value;
    if (!isTheOtherSection) return links.filter((link) => link.section === section);
    return links.filter((link) => !link.section || link?.section === OTHER.value);
  };

  const isNotAEmptySection = (section) => {
    if (section.value === OTHER.value) return true;
    return links
      .filter(
        (link) =>
          !link[INCLUDED_WEBAPPS_ONLY_KEY] || link[INCLUDED_WEBAPPS_ONLY_KEY].includes(process.env.NEXT_PUBLIC_APP_NAME)
      )
      .some((link) => link.section === section.value);
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
    
    .drawer {
     width: ${drawerWidth}px;
     flex-shrink: 0;
     white-space: nowrap;
     position: relative
    }

    .drawer-open {
      top: ${headerHeight}px;
      height: calc(100vh - ${headerHeight}px);
      width: ${drawerWidth}px;
      overflow-x: hidden;
      overflow-y: auto;
      border: none;
      box-shadow: 0px 0px 20px rgba(204, 212, 215, 0.2);
    }
    .drawer-open::-webkit-scrollbar {
      display: none;
    }

    .drawer-close {
      top: ${headerHeight}px;
      height: calc(100vh - ${headerHeight}px);
      overflow-x: hidden;
      width: ${drawerClosedWidth}px;
    }

    `,
        }}
      />

      <Drawer
        open={open}
        onClose={onClose}
        anchor="left"
        variant={variant}
        PaperProps={{ style: { backgroundColor: "white" } }}
        className={clsx("drawer", {
          "drawer-open drawer-open::-webkit-scrollbar": open,
          "drawer-close": !open,
        })}
        classes={{
          paper: clsx({
            "drawer-open drawer-open::-webkit-scrollbar": open,
            "drawer-close": !open,
          }),
        }}
        data-tour="menu"
      >
        {[YOUR_BUSINESS, ACCOUNTING, YOUR_WEBSITE, YOUR_CLUB, OTHER]
          .filter((section) => isNotAEmptySection(section))
          .map((section) => {
            return (
              <>
                <SectionTitle sectionName={section.text} />
                {getLinksBySection(section.value)
                  .filter(
                    (link) =>
                      !link[INCLUDED_WEBAPPS_ONLY_KEY] ||
                      (link[INCLUDED_WEBAPPS_ONLY_KEY].includes(process.env.NEXT_PUBLIC_APP_NAME) &&
                        (!link.needsShoppingSupport || !hasShoppingSupport))
                  )
                  .map((link, index) => {
                    return (
                      <NewMenuItem
                        key={`admin-menu-${index}`}
                        disabled={disabled}
                        route={link}
                        subRoutes={link.subLinks}
                        onClickItem={onClickItem}
                        text={link.text}
                        isSubLinksOpen={link?.isSubLinksOpen ? link?.isSubLinksOpen : false}
                      />
                    );
                  })}
              </>
            );
          })}

        <>
          {/* <a href={`tel:${supportTeamPhone[process.env.NEXT_PUBLIC_APP_NAME]}`}>
            <ListItem button style={{ height: 44 }}>
              <ListItemIcon style={{ minWidth: 30 }}>
                <NewSupportMenuIcon style={{ color: "#202223" }} />
              </ListItemIcon>
              <ListItemText
                className="text-right"
                primary={`Support${process.env.NEXT_PUBLIC_APP_NAME_PERSIAN}`}
                style={{
                  color: "#202223",
                }}
              />
            </ListItem>
          </a> */}
          <div>
            <ListItem button disabled={disabled} style={{ height: 44 }} onClick={logout}>
              <ListItemIcon style={{ minWidth: 30 }}>
                <NewLogoutMenuIcon style={{ "-webkit-transform": " scaleX(-1)", color: "#202223" }} />
              </ListItemIcon>
              <ListItemText
                className="text-left"
                primary="Logout"
                style={{
                  color: "#202223",
                }}
              />
            </ListItem>
          </div>{" "}
        </>
      </Drawer>
    </>
  );
}

const SectionTitle = ({ sectionName }) => (
  <div
    style={{
      padding: "4px 18px",
      paddingTop: "5px",
      borderTop: "solid 1px #0000001c",
      fontSize: "13px",
      color: "rgba(0, 0, 0, 0.6)",
    }}
  >
    {sectionName}
  </div>
);

const mapStateToProps = createStructuredSelector({
  adminMenuLinks: makeSelectAdminMenuLinks(),
  pluginData: makeSelectPlugin(LANDING_PLUGIN),
  CRMPluginData: makeSelectPlugin(CRM_PLUGIN),
  BasePluginData: makeSelectPlugin(BASE_PLUGIN),
  POSPluginData: makeSelectPlugin(POS_PLUGIN),
  business: makeSelectBusiness(),
  urlPrefix: makeSelectAdminUrlPrefix(),
  user: makeSelectUser(),
});

function mapDispatchToProps() {
  return {};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminHeaderMenu);
