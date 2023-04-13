export const SET_BUSINESS = "store/business/SET_BUSINESS";
export const SET_BRANCH_BUSINESS = "store/business/SET_BRANCH_BUSINESS";
export const GET_BRANCH_BUSINESS = "store/business/GET_BRANCH_BUSINESS";
export const GET_BUSINESS = "store/business/GET_BUSINESS";
export const SET_BRANCH = "store/business/SET_BRANCH";

export const GET_REDIRECTS_MAP = "store/business/GET_REDIRECTS_MAP";
export const SET_REDIRECTS_MAP = "store/business/SET_REDIRECTS_MAP";

export const UPDATE_BUSINESS_REQUEST = "store/business/UPDATE_BUSINESS_REQUEST";
export const UPDATE_BUSINESS_WORKING_HOUR_REQUEST =
  "store/business/UPDATE_BUSINESS_WORKING_HOUR_REQUEST";
export const SUGGEST_BUSINESS_EDIT = "store/business/SUGGEST_BUSINESS_EDIT";

export const GET_CATEGORY = "store/business/GET_CATEGORY";
export const SET_CATEGORY = "store/business/SET_CATEGORY";
export const GET_PRODUCTS = "store/business/GET_PRODUCTS";
export const SET_DEALS = "store/business/SET_DEALS";

export const CREATE_CATEGORY = "store/business/CREATE_CATEGORY";
export const DELETE_CATEGORY = "store/business/DELETE_CATEGORY";
export const UPDATE_CATEGORY = "store/business/UPDATE_CATEGORY";

export const CREATE_PRODUCT = "store/business/CREATE_PRODUCT";
export const DELETE_PRODUCT = "store/business/DELETE_PRODUCT";

export const ADD_IMAGE_TO_PRODUCT = "store/business/ADD_IMAGE_TO_PRODUCT";
export const DELETE_IMAGE_FROM_PRODUCT =
  "store/business/DELETE_IMAGE_FROM_PRODUCT";
export const UPDATE_IMAGE_FROM_PRODUCT =
  "store/business/UPDATE_IMAGE_FROM_PRODUCT";
export const DELETE_IMAGE_FROM_VARIATION =
  "store/business/DELETE_IMAGE_FROM_VARIATION";

export const CREATE_POST = "store/business/CREATE_POST";
export const DELETE_POST = "store/business/DELETE_POST";
export const UPDATE_POST = "store/business/UPDATE_POST";

export const UPDATE_SECTION = "store/business/UPDATE_SECTION";
export const DELETE_SECTION = "store/business/DELETE_SECTION";
export const ADD_SECTION = "store/business/ADD_SECTION";
export const SELECT_TEMPLATE = "store/business/SELECT_TEMPLATE";

export const SET_CRM_LABELS = "store/business/SET_CRM_LABELS";
export const SET_CRM_LABEL = "store/business/SET_CRM_LABEL";
export const SET_CRM_MEMBERSHIP = "store/business/SET_CRM_MEMBERSHIP";
export const SET_CRM_MEMBERSHIP_BY_ID =
  "store/business/SET_CRM_MEMBERSHIP_BY_ID";

export const ADD_GIFT_CREDIT_TRANSACTION = "panel/ADD_GIFT_CREDIT_TRANSACTION";

export const GET_INVENTORY_HEISTORY_REPORTS =
  "store/business/GET_CUSTOMERS_TAXING_REPORTS";
export const SET_CUSTOMERS_TAXING_REPORTS =
  "store/business/SET_CUSTOMERS_TAXING_REPORTS";

export const SEARCH_DEALS = "store/business/SEARCH_DEALS";
export const DEALS_SEARCHED = "store/business/DEALS_SEARCHED";

export const GET_PRODUCT = "store/business/GET_PRODUCT";
export const SET_DEAL = "store/business/SET_DEAL";

export const GET_DISCOUNT_CODES = "store/business/GET_DISCOUNT_CODES";
export const SET_DISCOUNT_CODES = "store/business/SET_DISCOUNT_CODES";

export const GET_PRODUCT_CATEGORIES = "store/business/GET_PRODUCT_CATEGORIES";
export const SET_DEAL_CATEGORIES = "store/business/SET_DEAL_CATEGORIES";
export const GET_ALL_PAGE = "store/business/GET_ALL_PAGE";
export const SET_ALL_PAGE = "store/business/SET_ALL_PAGE";
export const GET_FILTERED_DEALS = "store/business/GET_FILTERED_DEALS";

export const GET_FORMS_DICTIONARY = "store/business/GET_FORMS_DICTIONARY";
export const SET_FORMS_DICTIONARY = "store/business/SET_FORMS_DICTIONARY";

export const GET_BUSINESS_LABELS = "store/business/GET_BUSINESS_LABELS";
export const SET_BUSINESS_LABELS = "store/business/SET_BUSINESS_LABELS";

export const SET_PRODUCT_LABELS = "store/business/SET_PRODUCT_LABELS";
export const GET_PRODUCT_LABELS = "store/business/GET_PRODUCT_LABELS";
export const CREATE_FORM_RESPONSE = "store/business/CREATE_FORM_RESPONSE";

// Pages
export const GET_PAGES = "store/business/GET_PAGES";
export const GET_BLOG_PAGES = "store/business/GET_BLOG_PAGES";
export const SET_PAGES = "store/business/SET_PAGES";
export const SET_BLOG_PAGES = "store/business/SET_BLOG_PAGES";
export const GET_PAGE = "store/business/GET_PAGE";
export const SET_PAGE = "store/business/SET_PAGE";
export const SET_NEXT_PAGE_NUMBER = "store/business/SET_NEXT_PAGE_NUMBER";
export const SET_NEXT_BLOG_PAGE_NUMBER =
  "store/business/SET_NEXT_BLOG_PAGE_NUMBER";

export const GET_SURVEY_TEMPLATE = "store/business/GET_SURVEY_TEMPLATE";
export const SET_SURVEY_TEMPLATE = "store/business/SET_SURVEY_TEMPLATE";
export const GET_CRM_MEMBERSHIP = "panel/GET_CRM_MEMBERSHIP";

export const VITRIN_TYPE_ECOMMERCE = 0;
export const VITRIN_TYPE_FOOD = 1;
export const VITRIN_TYPE_OTHER = 2;

export const firstSection = {
  [VITRIN_TYPE_FOOD]: {
    title: "Get fast and professional ready to sell online!",
    subtitle:
      "Businesses that have set up a store site to showcase up to 5 times less time preparing the site.",
  },
  [VITRIN_TYPE_ECOMMERCE]: {
    title: "Get fast and professional ready to sell online!",
    subtitle:
      "Businesses that have entrusted the online store to showcase up to 5 times less time to prepare the store.",
  },
  [VITRIN_TYPE_OTHER]: {
    title: "Start fast and professional!",
    subtitle:
      "Businesses that have entrusted the site to showcase up to 5 times less time preparing the site.",
  },
};

export const thirdSection = {
  [VITRIN_TYPE_FOOD]: [
    {
      title: "Branding",
      subtitle:
        "With the help of the showcase you can run your digital branding on your online store.",
      bullets: [
        "Buy and connect your favorite domain to the site",
        "Graphic Design",
        "Electronic Trust icon registration",
        "Card design",
        "Logo design",
      ],
    },
    {
      title: "Marketing infrastructure",
      subtitle:
        "The showcase team can provide digital sales and marketing preparations for your online store so that your sales will not be delayed.",
      bullets: [
        "Set up and connect the site to Google Analytics",
        "Site connection to Google console search",
        "The article(SEO) With your store name",
        "Site connection to Google Map",
      ],
    },
    {
      title: "Ordering",
      subtitle:
        "You can get help from the showcase team to speed up your store online ordering.",
      bullets: [
        "Set up your dedicated online payment gateway",
        "Enter your store products",
        "Set the submission ranges",
      ],
    },
    {
      title: "More sales preparations",
      subtitle:
        "To increase your online sales of your site, you will be given a variety of solutions by the showcase team.",
      bullets: [
        "Setting and setting up marketing automation",
        "Designing a physical versionQR Digital code",
        "Implementation of digital menu",
      ],
    },
  ],
  [VITRIN_TYPE_ECOMMERCE]: [
    {
      title: "Branding",
      subtitle:
        "With the help of the showcase you can run your digital branding on your online store.",
      bullets: [
        "Buy and connect your favorite domain to the site",
        "Graphic Design",
        "Electronic Trust icon registration",
        "Card design",
        "Logo design",
      ],
    },
    {
      title: "Marketing infrastructure",
      subtitle:
        "The showcase team can provide digital sales and marketing preparations for your online store so that your sales will not be delayed.",
      bullets: [
        "Set up and connect the site to Google Analytics",
        "Site connection to Google console search",
        "The article(SEO) With your store name",
        "Site connection to Google Map",
      ],
    },
    {
      title: "Ordering",
      subtitle:
        "You can get help from the showcase team to speed up your store online ordering.",
      bullets: [
        "Set up your dedicated online payment gateway",
        "Enter your store products",
        "Set the submission ranges",
      ],
    },
    {
      title: "More sales preparations",
      subtitle:
        "To increase your visit to your online store, you will be given a variety of solutions by the showcase team.",
      bullets: [
        "Register Radiad and Imalzo Connect to Store",
        "Setting and setting up marketing automation",
      ],
    },
  ],
  [VITRIN_TYPE_OTHER]: [
    {
      title: "Branding",
      subtitle:
        "With the help of the showcase you can run your digital branding on your online store.",
      bullets: [
        "Buy and connect your favorite domain to the site",
        "Graphic Design",
        "Electronic Trust icon registration",
        "Card design",
        "Logo design",
      ],
    },
    {
      title: "Marketing infrastructure",
      subtitle:
        "The showcase team can provide digital sales and marketing preparations for your online store so that your sales will not be delayed.",
      bullets: [
        "Set up and connect the site to Google Analytics",
        "Site connection to Google console search",
        "The article(SEO) With your store name",
        "Site connection to Google Map",
      ],
    },
  ],
};

export const ADD_CREDIT_TRANSACTION = "panel/ADD_CREDIT_TRANSACTION";
export const SET_CREDIT_TRANSACTION = "panel/SET_CREDIT_TRANSACTION";

export const ADD_CRM_POINT = "panel/ADD_CRM_POINT";
export const SET_CRM_POINT = "panel/SET_CRM_POINT";
