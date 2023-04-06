import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_COUNTER_CARD } from "@saas/utils/constants/sections";

const counterCard = [
  // کارت با شمارنده
  {
    ...sectionsConfigTabsRepeatedParts["content"],
    items: [
      {
        id: uniqueid(),
        label: "پس‌زمینه",
        key: "background",
        element_id: null,
        description: "",
        fields: [
          {
            id: uniqueid(),
            label: "رنگ پس‌زمینه",
            default_value: "#F1F5FF",
            key: "color",
            type: "color",
          },
        ],
      },
      {
        id: uniqueid(),
        label: "کارت‌ها",
        key: "cards",
        element_id: "section_30_cards",
        description: "",
        has_multiple_items: true,
        extendable_items: true,
        max_items: 3,
        min_items: 1,
        add_new_item_text: "افزودن کارت جدید",
        default_items: [
          {
            title: "مجموع فروش سایت‌هایی که با ویترین ساخته شده‌اند.",
            title_color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            subtitle: "تومان",
            subtitle_color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            price: "123123123",
            price_color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            button_head_title: "فروش سایت شما چقدر خواهد بود؟",
            button_head_title_color: "#000000",
            button_text: "ساخت سایت",
            button_link: "/",
            button_title_color: "#ffffff",
            button_backgrond_color: "#000000",
          },
          {
            title: "مجموع فروش سایت‌هایی که با ویترین ساخته شده‌اند.",
            title_color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            subtitle: "تومان",
            subtitle_color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            price: "123123123",
            price_color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            button_head_title: "فروش سایت شما چقدر خواهد بود؟",
            button_head_title_color: "#000000",
            button_text: "ساخت سایت",
            button_link: "/",
            button_title_color: "#ffffff",
            button_backgrond_color: "#000000",
          },
        ],
        items_fields: [
          {
            id: uniqueid(),
            label: "عنوان",
            default_value: "مجموع فروش سایت‌هایی که با ویترین ساخته شده‌اند.",
            type: "text",
            key: "title",
          },
          {
            id: uniqueid(),
            label: "رنگ عنوان",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            key: "title_color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "زیر‌عنوان",
            default_value: "تومان",
            key: "subtitle",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "رنگ زیر‌عنوان",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            key: "subtitle_color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "قیمت",
            default_value: "123123123",
            key: "price",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "رنگ قیمت",
            default_value: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            key: "price_color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "متن بالای دکمه",
            default_value: "فروش سایت شما چقدر خواهد بود؟",
            key: "button_head_title",
            type: "text",
          },
          {
            id: uniqueid(),
            label: "رنگ متن بالای دکمه",
            default_value: "#000000",
            key: "button_head_title_color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "متن دکمه",
            default_value: "متن دکمه",
            type: "text",
            key: "button_text",
          },
          {
            id: uniqueid(),
            label: "لینک دکمه",
            default_value: "/",
            type: "text",
            key: "button_link",
            className: "direction-ltr",
          },
          {
            id: uniqueid(),
            label: "رنگ متن دکمه",
            default_value: "#ffffff",
            key: "button_title_color",
            type: "color",
          },
          {
            id: uniqueid(),
            label: "رنگ زمینه دکمه",
            default_value: "black",
            key: "button_backgrond_color",
            type: "color",
          },
        ],
        fields: [],
      },
    ],
  },
  {
    ...sectionsConfigTabsRepeatedParts["customization"],
    items: [
      {
        ...sectionsConfigTabsRepeatedParts["layout"],
        fields: [
          {
            ...sectionsConfigTabsRepeatedParts["layout_select"],
            default_value: sectionsLayout[SECTION_COUNTER_CARD][0].value,
            options: sectionsLayout[SECTION_COUNTER_CARD],
          },
        ],
      },
    ],
  },
];

export default counterCard;
