import dynamic from "next/dynamic";
import ShoppingHeader from "@saas/plugins/Shopping/sections/Headers";
import ShoppingProductList from "@saas/plugins/Shopping/sections/ProductLists";
import ProductDetail from "@saas/plugins/Shopping/sections/ProductPageSections/ProductDetailSection";
import RelatedProductsSection from "@saas/plugins/Shopping/sections/ProductPageSections/RelatedProductsSection";
import ProductInfo from "@saas/plugins/Shopping/sections/ProductPageSections/ProductInfoSection";
import {
  ONLINE_MENU_PLUGIN_MENU_PAGE,
  SHOPPING_PLUGIN_MAIN_PAGE,
  SHOPPING_PLUGIN_PDP_PAGE,
} from "@saas/stores/plugins/constants";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";

import { SECTIONS_ICONS } from "@saas/icons/SectionsIcons";
import {
  ALL_RESOURCES_API,
  LABELS_ITEM_API,
  RESOURCES_ITEM_API,
} from "@saas/utils/api";
import { setCategory, setProducts } from "@saas/stores/business/actions";
import request from "@saas/utils/request";
import qs from "qs";

import {
  SECTION_ABOUT_US,
  SECTION_ADDRESS_WITH_MAP,
  SECTION_BANNER_WITH_ANIMATED_TEXT,
  SECTION_BANNER_WITH_SLIDER,
  SECTION_CATEGORIES,
  SECTION_CONTACT_US,
  SECTION_COUNTER_CARD,
  SECTION_ENAMAD,
  SECTION_FAQ,
  SECTION_FEATURES_CARD,
  SECTION_FORMS,
  SECTION_GENERAL_BANNER,
  SECTION_IMAGE_GALLERY,
  SECTION_MENU,
  SECTION_MULTI_BRANCH,
  SECTION_ONLINE_PRODUCTS_LIST,
  SECTION_ORDER_ONLINE_HEADER,
  SECTION_PICTURE_WITH_TEXT,
  SECTION_PRODUCT_ADDITIONAL_INFORMATION,
  SECTION_PRODUCT_INFORMATION,
  SECTION_PRODUCTS,
  SECTION_QUICK_ACCESS,
  SECTION_RECOMMENDED_LABEL,
  SECTION_RELATED_PRODUCTS,
  SECTION_SLIDER,
  SECTION_SOUND,
  SECTION_SPECIAL_BANNER,
  SECTION_TESTIMONIALS,
  SECTION_TEXT,
  SECTION_TITLE,
  SECTION_VIDEO,
  SECTION_WORKING_HOUR,
} from "@saas/utils/constants/sections";

const AboutUsSection = dynamic(() =>
  import("./Sections/BusinessSections/AboutUsSection")
);
const LocationSection = dynamic(() =>
  import("./Sections/BusinessSections/LocationSection")
);
const WorkingHoursSection = dynamic(() =>
  import("./Sections/BusinessSections/WorkingHoursSection")
);
const ContactUsSection = dynamic(() =>
  import("./Sections/BusinessSections/ContactUsSection")
);

const EnamadSection = dynamic(() =>
  import("./Sections/BusinessSections/EnamadSection")
);

const Section5 = dynamic(() => import("./Sections/Section5"));
const Section10 = dynamic(() => import("./Sections/Section10"));
const Section11 = dynamic(() => import("./Sections/Section11"));
const Section25 = dynamic(() => import("./Sections/Section25"));
const Section26 = dynamic(() => import("./Sections/Section26"));
const Section27 = dynamic(() => import("./Sections/Section27"));
const Section28 = dynamic(() => import("./Sections/Section28"));
const Section30 = dynamic(() => import("./Sections/Section30"));
const Section31 = dynamic(() => import("./Sections/Section31"));
const Section34 = dynamic(() => import("./Sections/Section34"));
const Section32 = dynamic(() => import("./Sections/Section32"));
const Section36 = dynamic(() => import("./Sections/Section36"));
const Section37 = dynamic(() => import("./Sections/Section37"));
const Section38 = dynamic(() => import("./Sections/Section38"));
const Section39 = dynamic(() => import("./Sections/Section39"));
const Section40 = dynamic(() => import("./Sections/Section40"));
const Section41 = dynamic(() => import("./Sections/Section41"));
const Section42 = dynamic(() => import("./Sections/Section42"));
const Section43 = dynamic(() => import("./Sections/Section43"));
const Section44 = dynamic(() => import("./Sections/Section44"));
const Section45 = dynamic(() => import("./Sections/Section45"));
const Section46 = dynamic(() => import("./Sections/Section46"));

export const NORMAL_PAGE_TYPE = "normal";
export const BLOG_PAGE_TYPE = "blog";

export const sectionWithNoHydration = [];
export const sectionsDetails = {
  [SECTION_ABOUT_US]: {
    label: "درباره ما",
    component: AboutUsSection,
    imageIcon: SECTIONS_ICONS.ABOUT_US,
  },
  [SECTION_ADDRESS_WITH_MAP]: {
    label: "آدرس با نقشه",
    component: LocationSection,
    imageIcon: SECTIONS_ICONS.LOCATION,
  },
  [SECTION_WORKING_HOUR]: {
    label: "ساعت کاری",
    component: WorkingHoursSection,
    imageIcon: SECTIONS_ICONS.WORKTIME,
  },
  [SECTION_CONTACT_US]: {
    label: "تماس با ما",
    component: ContactUsSection,
    imageIcon: SECTIONS_ICONS.CONTACT_US,
  },
  [SECTION_ENAMAD]: {
    label: "اینماد",
    component: EnamadSection,
    imageIcon: SECTIONS_ICONS.CERTIFICATE,
  },
  [SECTION_SPECIAL_BANNER]: {
    label: "بنر ویژه",
    component: Section38,
    imageIcon: SECTIONS_ICONS.BANNER,
  },
  [SECTION_FEATURES_CARD]: {
    label: "کارت با مزایا",
    component: Section5,
    imageIcon: SECTIONS_ICONS.FEATURES_CARD,
  },
  [SECTION_TESTIMONIALS]: {
    label: "نقل قول مشتریان",
    component: Section10,
    imageIcon: SECTIONS_ICONS.TESTIMONIALS,
  },
  [SECTION_IMAGE_GALLERY]: {
    label: "گالری تصاویر",
    component: Section11,
    imageIcon: SECTIONS_ICONS.IMAGE_GALLERY,
  },
  [SECTION_MULTI_BRANCH]: {
    label: "نمایش شعبه‌ها روی نقشه",
    component: Section25,
    imageIcon: SECTIONS_ICONS.MULTI_BRANCH,
  },
  [SECTION_FORMS]: {
    label: "فرم‌ها",
    component: Section26,
    imageIcon: SECTIONS_ICONS.FORM,
  },
  [SECTION_TEXT]: {
    label: "متن",
    component: Section27,
    imageIcon: SECTIONS_ICONS.TEXT,
  },
  [SECTION_TITLE]: {
    label: "عنوان",
    component: Section28,
    imageIcon: SECTIONS_ICONS.BANNER,
  },
  [SECTION_COUNTER_CARD]: {
    label: "کارت با شمارنده",
    component: Section30,
    imageIcon: SECTIONS_ICONS.COUNTER_CARD,
  },
  [SECTION_FAQ]: {
    label: "سوالات متداول",
    component: Section31,
    imageIcon: SECTIONS_ICONS.FAQ,
  },
  [SECTION_QUICK_ACCESS]: {
    label: "دسترسی سریع",
    component: Section34,
    imageIcon: SECTIONS_ICONS.QUICK_ACCESS,
  },
  [SECTION_BANNER_WITH_SLIDER]: {
    label: "بنر همراه با اسلایدر",
    component: Section32,
    imageIcon: SECTIONS_ICONS.BANNER,
  },
  [SECTION_ONLINE_PRODUCTS_LIST]: {
    label: "لیست محصولات فروش آنلاین",
    component: ShoppingProductList,
    imageIcon: SECTIONS_ICONS.ITEMS_LIST,
  },
  [SECTION_PRODUCT_INFORMATION]: {
    label: "اطلاعات اصلی محصول",
    component: ProductDetail,
    imageIcon: SECTIONS_ICONS.PRODUCT_INFORMATION,
  },
  [SECTION_RELATED_PRODUCTS]: {
    label: "محصولات مشابه",
    component: RelatedProductsSection,
    imageIcon: SECTIONS_ICONS.RELATED_PRODUCTS,
  },
  [SECTION_PRODUCT_ADDITIONAL_INFORMATION]: {
    label: "مشخصات تکمیلی محصول",
    component: ProductInfo,
    imageIcon: SECTIONS_ICONS.PRODUCT_ADDITIONAL_INFORMATION,
  },
  [SECTION_ORDER_ONLINE_HEADER]: {
    label: "هدر سفارش آنلاین",
    component: ShoppingHeader,
    imageIcon: SECTIONS_ICONS.ONLINE_HEADER,
  },
  [SECTION_RECOMMENDED_LABEL]: {
    label: "برچسب پیشنهادی",
    component: Section36,
    imageIcon: SECTIONS_ICONS.FEATUERED_ITEM_CATEGORY,
  },
  [SECTION_PRODUCTS]: {
    label: "محصولات",
    component: Section37,
    imageIcon: SECTIONS_ICONS.ITEMS,
  },
  [SECTION_VIDEO]: {
    label: "ویدئو",
    component: Section39,
    imageIcon: SECTIONS_ICONS.VIDEO,
  },
  [SECTION_CATEGORIES]: {
    label: "دسته‌بندی‌‌ها",
    component: Section40,
    imageIcon: SECTIONS_ICONS.CATEGORY,
  },
  [SECTION_GENERAL_BANNER]: {
    label: "بنر عمومی",
    component: Section41,
    imageIcon: SECTIONS_ICONS.BANNER,
  },
  [SECTION_MENU]: {
    label: "منو",
    component: Section42,
    imageIcon: SECTIONS_ICONS.MENU,
  },
  [SECTION_BANNER_WITH_ANIMATED_TEXT]: {
    label: "بنر همراه با متن متحرک",
    component: Section43,
    imageIcon: SECTIONS_ICONS.BANNER,
  },
  [SECTION_PICTURE_WITH_TEXT]: {
    label: "عکس به همراه متن",
    component: Section44,
    imageIcon: SECTIONS_ICONS.PICTURE_WITH_TEXT,
  },
  [SECTION_SLIDER]: {
    label: "اسلایدر",
    component: Section45,
    imageIcon: SECTIONS_ICONS.SLIDE_SHOW,
  },
  [SECTION_SOUND]: {
    label: "صوت",
    component: Section46,
    imageIcon: SECTIONS_ICONS.SOUND,
  },
};

export const sectionsSSRFunctions = {
  [SECTION_ONLINE_PRODUCTS_LIST]: async ({
    store,
    asPath,
    business,
    urlPrefix,
  }) => {
    const shoppingPluginData =
      store.getState().plugins.plugins[SHOPPING_PLUGIN];

    const sections =
      shoppingPluginData.pages[SHOPPING_PLUGIN_MAIN_PAGE].data
        .sections_skeleton;
    const productListsSection = sections.find(
      (section) => section.name === SECTION_ONLINE_PRODUCTS_LIST
    );
    let isNested =
      productListsSection?.customization?.layout?.categories_type === "nested";
    const sectionType =
      productListsSection?.customization?.layout?.type || "type_1";
    const noNeedSSRDatas = sectionType === "type_2" && !isNested;
    if (!noNeedSSRDatas) {
      const categories = store.getState().business.resource_labels;
      try {
        if (!isNested && categories[0].id) {
          const {
            response: { data: category },
          } = await request(LABELS_ITEM_API(categories[0].id));
          store.dispatch(setCategory(categories[0].id, category));
          return {
            category,
          };
        } else if (isNested) {
          let hierarchy = business.menu;
          hierarchy =
            hierarchy && Object.keys(hierarchy).length
              ? hierarchy
              : {
                  currentId: 1,
                  id: 0,
                  categories: [],
                  children: [],
                };

          const filters = qs.parse(asPath.split(/\?/)[1], {
            ignoreQueryPrefix: true,
          });
          const url = hierarchy.categories.reduce(
            (str, category) =>
              `${str}&label_id${
                item.conjoined === undefined
                  ? true
                  : item.conjoined
                  ? `_conjoined`
                  : ""
              }=${category}`,
            ""
          );
          if (hierarchy.categories.length) {
            const {
              response: { meta, data, pagination },
            } = await request(RESOURCES_ITEM_API(url), {
              ...filters,
            });
            if (meta.status_code >= 200 && meta.status_code <= 300) {
              const pagesCount = Math.ceil(pagination.count / 24);
              store.dispatch(setProducts(data, { ...pagination, pagesCount }));
            }
            return {};
          } else {
            const {
              response: { meta, data, pagination },
            } = await request(ALL_RESOURCES_API(business.slug), {
              ...filters,
            });
            if (meta.status_code >= 200 && meta.status_code <= 300) {
              const pagesCount = Math.ceil(pagination.count / 24);
              store.dispatch(setProducts(data, { ...pagination, pagesCount }));
            }
            return {};
          }
        }
      } catch (e) {
        console.log(e);
      }
    }

    return {
      page: shoppingPluginData.pages[SHOPPING_PLUGIN_MAIN_PAGE],
      business,
      urlPrefix,
    };
  },
};
export const PAGES_TYPES_SECTIONS = {
  [ONLINE_MENU_PLUGIN_MENU_PAGE]: [
    {
      name: "منو",
      sections: [SECTION_MENU],
    },
  ],
  [SHOPPING_PLUGIN_PDP_PAGE]: [
    {
      name: "سفارش آنلاین",
      sections: [
        SECTION_PRODUCT_INFORMATION,
        SECTION_RELATED_PRODUCTS,
        SECTION_PRODUCT_ADDITIONAL_INFORMATION,
      ],
    },
    {
      name: "سایت خود را زیبا کنید",
      sections: [
        SECTION_GENERAL_BANNER,
        SECTION_BANNER_WITH_SLIDER,
        SECTION_SPECIAL_BANNER,
        SECTION_BANNER_WITH_ANIMATED_TEXT,
        SECTION_SLIDER,
        SECTION_FEATURES_CARD,
        SECTION_COUNTER_CARD,
      ],
    },
    {
      name: "بیشتر بفروشید",
      sections: [
        SECTION_RECOMMENDED_LABEL,
        SECTION_PRODUCTS,
        SECTION_CATEGORIES,
      ],
    },
    {
      name: "چندرسانه‌ای",
      sections: [
        SECTION_TEXT,
        SECTION_VIDEO,
        SECTION_SOUND,
        SECTION_IMAGE_GALLERY,
        SECTION_QUICK_ACCESS,
        SECTION_PICTURE_WITH_TEXT,
        SECTION_TITLE,
      ],
    },
    {
      name: "اطلاع‌رسانی",
      sections: [
        SECTION_ABOUT_US,
        SECTION_FAQ,
        SECTION_TESTIMONIALS,
        SECTION_ENAMAD,
      ],
    },
    {
      name: "برقراری ارتباط",
      sections: [
        SECTION_FORMS,
        SECTION_ADDRESS_WITH_MAP,
        SECTION_WORKING_HOUR,
        SECTION_CONTACT_US,
      ],
    },
    {
      name: "چندشعبه‌ای",
      sections: [SECTION_MULTI_BRANCH],
    },
  ],
  [SHOPPING_PLUGIN_MAIN_PAGE]: [
    {
      name: "سفارش آنلاین",
      sections: [SECTION_ONLINE_PRODUCTS_LIST, SECTION_ORDER_ONLINE_HEADER],
    },
    {
      name: "سایت خود را زیبا کنید",
      sections: [
        SECTION_GENERAL_BANNER,
        SECTION_BANNER_WITH_SLIDER,
        SECTION_SPECIAL_BANNER,
        SECTION_BANNER_WITH_ANIMATED_TEXT,
        SECTION_SLIDER,
        SECTION_FEATURES_CARD,
        SECTION_COUNTER_CARD,
      ],
    },
    {
      name: "بیشتر بفروشید",
      sections: [
        SECTION_RECOMMENDED_LABEL,
        SECTION_PRODUCTS,
        SECTION_CATEGORIES,
      ],
    },
    {
      name: "چندرسانه‌ای",
      sections: [
        SECTION_TEXT,
        SECTION_VIDEO,
        SECTION_SOUND,
        SECTION_IMAGE_GALLERY,
        SECTION_QUICK_ACCESS,
        SECTION_PICTURE_WITH_TEXT,
        SECTION_TITLE,
      ],
    },
    {
      name: "اطلاع‌رسانی",
      sections: [
        SECTION_ABOUT_US,
        SECTION_FAQ,
        SECTION_TESTIMONIALS,
        SECTION_ENAMAD,
      ],
    },
    {
      name: "برقراری ارتباط",
      sections: [
        SECTION_FORMS,
        SECTION_ADDRESS_WITH_MAP,
        SECTION_WORKING_HOUR,
        SECTION_CONTACT_US,
      ],
    },
    {
      name: "چندشعبه‌ای",
      sections: [SECTION_MULTI_BRANCH],
    },
  ],
  [NORMAL_PAGE_TYPE]: [
    {
      name: "سایت خود را زیبا کنید",
      sections: [
        SECTION_GENERAL_BANNER,
        SECTION_BANNER_WITH_SLIDER,
        SECTION_SPECIAL_BANNER,
        SECTION_BANNER_WITH_ANIMATED_TEXT,
        SECTION_SLIDER,
        SECTION_FEATURES_CARD,
        SECTION_COUNTER_CARD,
      ],
    },
    {
      name: "بیشتر بفروشید",
      sections: [
        SECTION_RECOMMENDED_LABEL,
        SECTION_PRODUCTS,
        SECTION_CATEGORIES,
      ],
    },
    {
      name: "چندرسانه‌ای",
      sections: [
        SECTION_TEXT,
        SECTION_VIDEO,
        SECTION_SOUND,
        SECTION_IMAGE_GALLERY,
        SECTION_QUICK_ACCESS,
        SECTION_PICTURE_WITH_TEXT,
        SECTION_TITLE,
      ],
    },
    {
      name: "اطلاع‌رسانی",
      sections: [
        SECTION_ABOUT_US,
        SECTION_FAQ,
        SECTION_TESTIMONIALS,
        SECTION_ENAMAD,
      ],
    },
    {
      name: "برقراری ارتباط",
      sections: [
        SECTION_FORMS,
        SECTION_ADDRESS_WITH_MAP,
        SECTION_WORKING_HOUR,
        SECTION_CONTACT_US,
      ],
    },
    {
      name: "چندشعبه‌ای",
      sections: [SECTION_MULTI_BRANCH],
    },
  ],
  [BLOG_PAGE_TYPE]: [
    {
      name: "سایت خود را زیبا کنید",
      sections: [
        SECTION_GENERAL_BANNER,
        SECTION_BANNER_WITH_SLIDER,
        SECTION_SPECIAL_BANNER,
        SECTION_BANNER_WITH_ANIMATED_TEXT,
        SECTION_SLIDER,
        SECTION_FEATURES_CARD,
        SECTION_COUNTER_CARD,
      ],
    },
    {
      name: "بیشتر بفروشید",
      sections: [
        SECTION_RECOMMENDED_LABEL,
        SECTION_PRODUCTS,
        SECTION_CATEGORIES,
      ],
    },
    {
      name: "چندرسانه‌ای",
      sections: [
        SECTION_TEXT,
        SECTION_VIDEO,
        SECTION_SOUND,
        SECTION_IMAGE_GALLERY,
        SECTION_QUICK_ACCESS,
        SECTION_PICTURE_WITH_TEXT,
        SECTION_TITLE,
      ],
    },
    {
      name: "اطلاع‌رسانی",
      sections: [
        SECTION_ABOUT_US,
        SECTION_FAQ,
        SECTION_TESTIMONIALS,
        SECTION_ENAMAD,
      ],
    },
    {
      name: "برقراری ارتباط",
      sections: [
        SECTION_FORMS,
        SECTION_ADDRESS_WITH_MAP,
        SECTION_WORKING_HOUR,
        SECTION_CONTACT_US,
      ],
    },
    {
      name: "چندشعبه‌ای",
      sections: [SECTION_MULTI_BRANCH],
    },
  ],
};
