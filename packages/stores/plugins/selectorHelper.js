/* eslint-disable no-restricted-syntax */
import NotificationsActiveRoundedIcon from "@material-ui/icons/NotificationsActiveRounded";
import adminMenuLinksConfig from "../configs/adminMenuLinks";
import adminMenuReportsLinksConfig from "../configs/adminMenuReportsLinks";

import {
  MENU_LINKS_WIDGET,
  HEADER_ICONS_WIDGET,
  ADMIN_ORDERS_WIDGET,
  MENU_CALL_ACTION,
  MENU_LOGOUT_ACTION,
  MENU_LOGIN_ACTION,
  ONLINE_SUPPORT_PLUGIN_MAIN_COMPONENT,
} from "./constants";
import {
  MENU_DRAWER,
  BRANCH_SELECTION_MODAL,
  DIRECTION_MODAL,
  CHARGE_WALLET_MODAL,
} from "../ui/constants";
import {
  DARAMAD_WEBAPP_CONSTANT,
  DOBARE_WEBAPP_CONSTANT,
} from "@saas/utils/constants";
import { ONLINE_SUPPORT_PLUGIN } from "@saas/utils/constants/plugins";
export function getNavigationLinksFromPlugins(plugins, isEditMode) {
  const navigationLinks = [];
  if (isEditMode) {
    for (const name in plugins) {
      if (plugins[name].isActive && plugins[name].adminTabActions) {
        navigationLinks.push(...plugins[name].adminTabActions);
      }
    }
  } else {
    for (const name in plugins) {
      if (plugins[name].isActive && plugins[name].tabActions) {
        navigationLinks.push(...plugins[name].tabActions);
      }
    }
  }
  return navigationLinks.map((CTA, index) => ({ ...CTA, id: index }));
}

export function getCallToActionFromPlugins(plugins, isEditMode) {
  const callToActions = [];
  if (isEditMode) {
    for (const name in plugins) {
      if (plugins[name].isActive && plugins[name].adminCallToActions) {
        callToActions.push(...plugins[name].adminCallToActions);
      }
    }
  } else {
    for (const name in plugins) {
      if (plugins[name].isActive && plugins[name].callToActions) {
        callToActions.push(...plugins[name].callToActions);
      }
    }
  }

  return callToActions.map((CTA, index) => ({ ...CTA, id: index }));
}

export function getPluginsCard(plugins) {
  return Object.values(plugins).filter((plugin) => plugin.hasCard);
}

export function checkHasActivePlugin(plugins) {
  for (const name in plugins) {
    if (plugins[name].isActive) return true;
  }
  return false;
}
export function getStaticInternalLinksFromPlugins(plugins) {
  const static_internal_links = [];
  for (const name in plugins) {
    if (
      plugins[name].isActive &&
      plugins[name].static_internal_links &&
      plugins[name].static_internal_links.length
    ) {
      static_internal_links.push(...plugins[name].static_internal_links);
    }
  }
  return static_internal_links;
}
export function getDynamicInternalLinksFromPlugins(plugins) {
  const dynamic_internal_links = [];
  for (const name in plugins) {
    if (
      plugins[name].isActive &&
      plugins[name].dynamic_internal_links &&
      plugins[name].dynamic_internal_links.length
    ) {
      dynamic_internal_links.push(...plugins[name].dynamic_internal_links);
    }
  }
  return dynamic_internal_links;
}

export function getAdminMenuLinkFromPlugins(plugins, adminUrlPrefix) {
  const adminMenuLinks = [];
  const reportsSubLinks = [];
  for (const name in plugins) {
    if (plugins[name].isActive && plugins[name].adminMenuLinks.length) {
      const _adminMenuLinksPerPlugin =
        adminMenuLinksConfig[process.env.NEXT_PUBLIC_APP_NAME]?.[name]?.map(
          (item) => ({ ...item, url: `${adminUrlPrefix}${item.url}` })
        ) || plugins[name].adminMenuLinks;
      const _adminMenuReportsLinks =
        adminMenuReportsLinksConfig[process.env.NEXT_PUBLIC_APP_NAME]?.[
          name
        ]?.map((item) => ({ ...item, url: `${adminUrlPrefix}${item.url}` })) ||
        plugins[name].adminReportLinks;
      adminMenuLinks.push(..._adminMenuLinksPerPlugin);
      reportsSubLinks.push(..._adminMenuReportsLinks);
    }
  }
  const isDobarePanel =
    process.env.NEXT_PUBLIC_APP_NAME === DOBARE_WEBAPP_CONSTANT;
  const isDaramadPanel =
    process.env.NEXT_PUBLIC_APP_NAME === DARAMAD_WEBAPP_CONSTANT;

  if (reportsSubLinks.length && (isDobarePanel || isDaramadPanel)) {
    adminMenuLinks.push({
      text: "تحلیل‌ها و گزارش‌ها",
      icon: "ShoppingCartIcon",
      subLinks: reportsSubLinks,
      onClick: () => {},
      url: "/analytics",
    });
  }
  adminMenuLinks.sort((a, b) => {
    if ((a.priority || 1) < (b.priority || 1)) return 1;
    if ((a.priority || 1) > (b.priority || 1)) return -1;
    return 0;
  });
  return adminMenuLinks;
}

export function getAdminUrlsFromPlugins(plugins) {
  const adminUrls = [];
  for (const name in plugins) {
    if (plugins[name].isActive && plugins[name].adminUrls.length) {
      adminUrls.push(...plugins[name].adminUrls);
    }
  }
  return adminUrls;
}

export function getDrawersFromPlugins(plugins) {
  const drawers = [MENU_DRAWER];
  for (const name in plugins) {
    if (plugins[name].isActive && plugins[name].drawers.length) {
      for (const drawer of plugins[name].drawers) {
        if (drawers.findIndex((_drawer) => _drawer === drawer) === -1) {
          drawers.push(drawer);
        }
      }
    }
  }
  return drawers;
}

export function getModalsFromPlugins(plugins) {
  const modals = [BRANCH_SELECTION_MODAL, DIRECTION_MODAL, CHARGE_WALLET_MODAL];
  for (const name in plugins) {
    if (plugins[name].isActive && plugins[name].modals.length) {
      for (const modal of plugins[name].modals) {
        modals.push(modal);
      }
    }
  }
  return modals;
}
export function getLandingPagesNamesFromPlugins(plugins) {
  const titles = [];
  for (const name in plugins) {
    if (plugins[name].isActive && plugins[name].hasLandingPage) {
      titles.push({ title: plugins[name].title, name: plugins[name].name });
    }
  }
  return titles;
}
export function getMainPluginSEO(plugins) {
  for (const name in plugins) {
    if (plugins[name].isActive && plugins[name].isMain) {
      return plugins[name].SEO;
    }
  }
  return null;
}
export function getPluginSharedComponents(plugins) {
  const components = [
    {
      comp: ONLINE_SUPPORT_PLUGIN_MAIN_COMPONENT,
      name: ONLINE_SUPPORT_PLUGIN,
      excludes: ["/admin", "/checkout"],
    },
  ];
  for (const name in plugins) {
    if (plugins[name].isActive && plugins[name].sharedComponent) {
      components.push(plugins[name].sharedComponent);
    }
  }
  return components;
}
export function getAdminOrdersWidgetDataFromPlugins(plugins) {
  const adminOrdersWidget = {
    icon: NotificationsActiveRoundedIcon,
    text: "سفارش‌ها",
    actions: [],
    ordersAmount: 0,
    orders: [],
    activePlugins: 0,
  };
  for (const name in plugins) {
    if (plugins[name].isActive && plugins[name].widgets[ADMIN_ORDERS_WIDGET]) {
      adminOrdersWidget.activePlugins += 1;
      adminOrdersWidget.actions.push(
        plugins[name].widgets[ADMIN_ORDERS_WIDGET].action
      );
      adminOrdersWidget.ordersAmount +=
        plugins[name].widgets[ADMIN_ORDERS_WIDGET].ordersAmount;
      adminOrdersWidget.orders.push(
        ...plugins[name].widgets[ADMIN_ORDERS_WIDGET].orders.map((order) => ({
          ...order,
          link: `${plugins[name].widgets[ADMIN_ORDERS_WIDGET].linkPrefix}${order.id}`,
        }))
      );
    }
  }
  return adminOrdersWidget.activePlugins ? adminOrdersWidget : null;
}

export function getWidgetsFromPlugins(plugins, business) {
  const hasOrdering = plugins?.shopping?.data?.has_ordering;
  const hasAccount = plugins?.crm?.data?.has_account;

  const widgets = {
    [MENU_LINKS_WIDGET]: [],
    [HEADER_ICONS_WIDGET]: [],
    [ADMIN_ORDERS_WIDGET]: [],
  };
  widgets[MENU_LINKS_WIDGET].push({
    id: "about",
    text: "اطلاعات اصلی",
    hasChevron: true,
    icon: "InfoIcon",
    url: "/about",
    colored: true,
  });

  if (plugins?.shopping?.isActive && hasOrdering !== false) {
    widgets[MENU_LINKS_WIDGET].push({
      id: "addresses",
      hasBorder: true,
      needsAuth: true,
      text: "آدرس‌های من",
      url: "/profile/addresses",
      icon: "ListAltIcon",
    });
  }
  for (const name in plugins) {
    if (plugins[name].isActive) {
      widgets[MENU_LINKS_WIDGET] = [
        ...plugins[name].tabActions.map((ta) => ({
          iconSize: 20,
          colored: true,
          id: `${name}-${ta.url}`,
          ...ta,
        })),
        ...widgets[MENU_LINKS_WIDGET],
      ];

      for (const widget in plugins[name].widgets) {
        if (plugins[name].widgets[widget]) {
          if (Array.isArray(plugins[name].widgets[widget])) {
            widgets[widget].push(
              ...plugins[name].widgets[widget].map((_widget, i) => ({
                ..._widget,
                id: `${name}-${widget}-${i}`,
              }))
            );
          } else {
            widgets[widget].push({
              ...plugins[name].widgets[widget],
              id: `${name}-${widget}-${0}`,
            });
          }
        }
      }
    }
  }

  widgets[MENU_LINKS_WIDGET].push(
    {
      text: "دسته‌بندی‌ها",
      subLinks: [],
      icon: "ListAltIcon",
      iconSize: 24,
      isShoppingMenu: true,
    },
    {
      text: business.phone_zero_starts,
      hasBorder: true,
      action: MENU_CALL_ACTION,
      icon: "PhoneIcon",
      hasChevron: true,
      iconSize: 20,
      id: "contact-us",
    }
  );

  if (hasAccount !== false) {
    widgets[MENU_LINKS_WIDGET].push(
      {
        id: "login",
        text: "ورود به حساب",
        action: MENU_LOGIN_ACTION,
        url: null,
        hasBorder: true,
        icon: "AccountCircleIcon",
        noRenderAuth: true,
      },
      {
        id: "profile",
        hasBorder: true,
        needsAuth: true,
        text: "پروفایل",
        url: "/profile",
        icon: "AccountCircleIcon",
      },
      {
        text: "خروج از حساب",
        action: MENU_LOGOUT_ACTION,
        icon: "ExitToAppIcon",
        iconSize: 24,
        needsAuth: true,
        id: "logout",
      }
    );
  }

  return widgets;
}
