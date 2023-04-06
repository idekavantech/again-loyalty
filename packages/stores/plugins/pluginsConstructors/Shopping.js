import Plugin from "./Plugin";
import { CDN_BASE_URL } from "@saas/utils/api";
import {
  ADMIN_ORDERS_WIDGET,
  APP_SHOPPINGPAGE_FILTER_MODAL,
  APP_SHOPPINGPAGE_MODIFIERS_MODAL,
  APP_SHOPPINGPAGE_PRODUCT_MODAL,
  APP_SHOPPINGPAGE_SEARCH_MODAL,
  HEADER_ICONS_WIDGET,
  MENU_LINKS_WIDGET,
  SHOPPING_PLUGIN_GET_ORDERS_ACTION,
  SHOPPING_PLUGIN_MAIN_COMPONENT,
  SHOPPING_PLUGIN_MAIN_PAGE,
  SHOPPING_PLUGIN_PDP_PAGE,
} from "../constants";
import {
  BRANCHES_PLUGIN,
  SHOPPING_PLUGIN,
  SHOPPING_PLUGIN_URL,
} from "@saas/utils/constants/plugins";

import {
  SECTION_ONLINE_PRODUCTS_LIST,
  SECTION_PRODUCT_ADDITIONAL_INFORMATION,
  SECTION_PRODUCT_INFORMATION,
  SECTION_RELATED_PRODUCTS,
} from "@saas/utils/constants/sections";
import { shoppingHeaderComponents } from "@saas/utils/constants/headers";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
const shoppingIcn = `${CDN_BASE_URL}FoodPlugins-icn.svg`;
const shoppingImage1 = `${CDN_BASE_URL}/food1.png`;
const shoppingImage2 = `${CDN_BASE_URL}/food2.png`;
const shoppingImage3 = `${CDN_BASE_URL}/food3.png`;
const defaultPages = ({ business }) => {
  const sections_skeleton = [
    {
      id: "NSFQFNQCNPJT2AKI7TWJYTRT93KRXV49",
      name: SECTION_ONLINE_PRODUCTS_LIST,
      content: {},
      is_active: true,
      customization: {
        showcases: {
          filters: true,
          slider: true,
        },
        colors: {
          background_color: "#ffffff",
        },
        layout: {
          type: "type_3",
          categories_type: "nested",
        },
      },
    },
  ];
  const headerType = business.theme_config.header_component;
  if (shoppingHeaderComponents[headerType])
    sections_skeleton.unshift({
      id: "IF2Q3XSRC06DC6Q542MM3TLAI2M44VJ8",
      name: shoppingHeaderComponents[headerType],
      content: {
        logo: {
          value: null,
          has_logo: true,
        },
      },
      is_active: true,
      customization: {
        colors: {
          background_color: "#ffffff",
        },
        layout: {
          type: "type_1",
        },
      },
    });
  return {
    [SHOPPING_PLUGIN_MAIN_PAGE]: {
      id: SHOPPING_PLUGIN_MAIN_PAGE,
      plugin: SHOPPING_PLUGIN,
      isStatic: true,
      data: {
        name: "صفحه سفارش آنلاین",
        slug: "s",
        previewLink: "/s",
        seo_title: `خرید اینترنتی با بیشترین % تخفیف از ${business.revised_title}`,
        meta_description: `خرید اینترنتی از ${business.revised_title} با بیشترین % تخفیف`,
        sections_skeleton,
      },
    },
    [SHOPPING_PLUGIN_PDP_PAGE]: {
      id: SHOPPING_PLUGIN_PDP_PAGE,
      plugin: SHOPPING_PLUGIN,
      isStatic: true,
      data: {
        name: "صفحه محصول",
        previewLink: "",
        seo_title: "",
        meta_description: "",
        sections_skeleton: [
          {
            id: "GE02WJK2Q8KWG7YW8VNKP3R6PYFFD08D",
            name: SECTION_PRODUCT_INFORMATION,
            is_active: true,
            customization: {
              colors: {
                background_color: "#ffffff",
              },
              layout: {
                type: "type_1",
              },
            },
          },
          {
            id: "RFBDTKPIP5B31HTQ59F2PHEVRXI22V7J",
            name: SECTION_RELATED_PRODUCTS,
            is_active: true,
            customization: {
              colors: {
                background_color: "#ffffff",
              },
              layout: {
                type: "type_1",
              },
            },
          },
          {
            id: "KQS771GC72KN9U2V96N1PMAA8SDROEQN",
            name: SECTION_PRODUCT_ADDITIONAL_INFORMATION,
            is_active: true,
            customization: {
              layout: {
                type: "type_1",
              },
            },
          },
        ],
      },
    },
  };
};

export default class ShoppingPlugin extends Plugin {
  constructor(pluginConfig, business, incomingUrl, incomingHost, userInfo) {
    super(pluginConfig, business, incomingUrl, incomingHost, userInfo);
    this.menuType =
      (pluginConfig.data && pluginConfig.data.menu_type) || "flat";
    this.pages = {
      [SHOPPING_PLUGIN_MAIN_PAGE]:
        pluginConfig.data?.pages?.[SHOPPING_PLUGIN_MAIN_PAGE] ||
        defaultPages({ business, pluginConfig })[SHOPPING_PLUGIN_MAIN_PAGE],
      [SHOPPING_PLUGIN_PDP_PAGE]:
        pluginConfig.data?.pages?.[SHOPPING_PLUGIN_PDP_PAGE] ||
        defaultPages({ business, pluginConfig })[SHOPPING_PLUGIN_PDP_PAGE],
    };
    this.pageSetting = {
      [SHOPPING_PLUGIN_MAIN_PAGE]: { hasGeneralTab: false, hasSlug: false },
      [SHOPPING_PLUGIN_PDP_PAGE]: {
        hasGeneralTab: false,
        hasSeoTab: false,
        hasSocialTab: false,
      },
    };
    this.pagesLabel = "ویرایش صفحات سفارش آنلاین";
    this.isMain = true;
    this.SEO = {
      title: `${business.revised_title} | خرید اینترنتی با بیشترین % تخفیف از  ${business.revised_title}`,
      description: "",
    };
    this.name = SHOPPING_PLUGIN;
    this.title = "سفارش آنلاین";
    this.description = "امکان افزودن محصولات، افزودن به سبد خرید و ...";
    this.descriptions = [
      "امکان افزودن یا حذف غذا در منو",
      "امکان افزودن و حذف دسته‌بندی",
      "امکان سفارش آنلاین",
      "امکان خرید و پرداخت آنلاین در سایت شما",
      "اضافه شدن سبد خرید",
      "دریافت پنل مدیریت سفارش‌ها",
      "امکان لغو یا تایید سفارش",
      "دریافت آرشیو سفارش‌ها",
    ];
    this.hasLandingPage = true;

    this.hasInitialClientSideFunction = true;
    this.image = shoppingIcn;
    this.images = [shoppingImage1, shoppingImage2, shoppingImage3];
    this.hasCard = true;
    this.callToActions = [
      {
        url: `${this.urlPrefix}/${SHOPPING_PLUGIN_URL}`,
        text: this.callToActionText || "سفارش آنلاین",
        icon: "ShoppingCartIcon",
      },
    ];
    this.adminTabActions = [
      {
        url: `products`,
        text: this.adminCallToActionText || "ویرایش محصولات",
        icon: "ShoppingCartIcon",
      },
    ];
    this.adminCallToActions = [
      {
        url: `products`,
        text: this.adminCallToActionText || "ویرایش محصولات",
        icon: "ShoppingCartIcon",
      },
    ];

    this.hasOrdering = pluginConfig?.data?.has_ordering;

    this.widgets[HEADER_ICONS_WIDGET] = [];

    this.widgets[ADMIN_ORDERS_WIDGET] = null;

    this.widgets[MENU_LINKS_WIDGET] = [];

    if (this.hasOrdering !== false) {
      this.widgets[HEADER_ICONS_WIDGET].push({
        icon: "ShoppingCartIcon",
        link: `${this.urlPrefix}/checkout/cart`,
        itemsAmount: 0,
      });
      this.widgets[MENU_LINKS_WIDGET].push(
        {
          id: "wallet",
          text: "شارژ کیف پول",
          query: `wallet_charge`,
          icon: "AccountBalanceWalletIcon",
          needsAuth: true,
          itemsAmount: `${priceFormatter(userInfo?.walletCredit)} تومان `,
        },
        {
          id: "wallet",
          text: "اعتبار هدیه",
          url: `/wallet`,
          icon: "CardGiftcardIcon",
          needsAuth: true,
          itemsAmount: `${priceFormatter(userInfo?.giftCredit)} تومان `,
        },
        {
          needsAuth: true,
          text: "پیگیری سفارش‌ها",
          subLinks: [],
          url: `/${SHOPPING_PLUGIN_URL}/orders`,
          icon: "ListAltIcon",
          iconSize: 24,
        }
      );
      this.widgets[ADMIN_ORDERS_WIDGET] = {
        action: SHOPPING_PLUGIN_GET_ORDERS_ACTION,
        ordersAmount: 0,
        orders: [],
        linkPrefix: `${this.adminUrlPrefix}/${SHOPPING_PLUGIN_URL}/orders/`,
      };
    }

    this.hasShoppingSupport =
      business?.super_business?.plugins_config?.[
        BRANCHES_PLUGIN
      ]?.data?.supported_plugins?.includes(SHOPPING_PLUGIN);

    this.adminMenuLinks = [];

    this.adminReportLinks = [
      {
        text: "داشبورد",
        url: `${SHOPPING_PLUGIN_URL}/analytics/dashboard`,
        blank: true,
      },
      {
        text: "گزارش‌ها",
        url: `${SHOPPING_PLUGIN_URL}/analytics/reports`,
        blank: true,
      },
    ];

    if (this.hasShoppingSupport && this.hasOrdering !== false) {
      this.adminReportLinks.push({
        text: "کیف پول مشترک",
        url: `${SHOPPING_PLUGIN_URL}/finance/sow`,
        blank: true,
      });
    }
    this.orders = [];
    this.currentOrder = { items: [] };
    this.modals = [
      APP_SHOPPINGPAGE_PRODUCT_MODAL,
      APP_SHOPPINGPAGE_MODIFIERS_MODAL,
      APP_SHOPPINGPAGE_SEARCH_MODAL,
      APP_SHOPPINGPAGE_FILTER_MODAL,
    ];
    this.sitemaps = [
      "/products-sitemap.xml",
      "/labels-sitemap.xml",
      "/category-sitemap.xml",
    ];
    this.plugin_url = SHOPPING_PLUGIN_URL;
    this.baseUrl = {
      name: this.name,
      should_be_in_sitemap: true,
      url: `${this.urlPrefix}/${SHOPPING_PLUGIN_URL}`,
      component: SHOPPING_PLUGIN_MAIN_COMPONENT,
    };
    this.static_internal_links = [
      {
        label: "صفحه: سفارش آنلاین",
        value: `${this.urlPrefix}/${SHOPPING_PLUGIN_URL}`,
      },
      {
        label: "صفحه: پیگیری سفارش",
        value: `${this.urlPrefix}/${SHOPPING_PLUGIN_URL}/orders`,
      },
      {
        label: "صفحه: سبد خرید",
        value: `${this.urlPrefix}/${SHOPPING_PLUGIN_URL}/checkout/cart`,
      },
    ];
    this.dynamic_internal_links = [
      "deals",
      this.menuType === "nested" ? "menuItems" : "categories",
    ];
    this.ui_access_config = {
      ...business.ui_access_config?.admin_panel?.plugins?.shopping,
    };
    this.has_delivery_on_site_invoice_fields =
      pluginConfig?.data?.has_delivery_on_site_invoice_fields;
  }
}
