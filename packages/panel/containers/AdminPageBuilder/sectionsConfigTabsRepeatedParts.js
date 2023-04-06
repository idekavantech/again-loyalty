import { uniqueid } from "@saas/utils/helpers/uniqueid";
import uniqueId from "lodash/uniqueId";

export const sectionsConfigTabsRepeatedParts = {
  layout: {
    id: uniqueid(),
    label: "قالب",
    key: "layout",
    element_id: null,
    description: "",
  },
  layout_select: {
    id: uniqueid(),
    label: "نوع قالب",
    type: "layout_select",
    key: "type",
  },
  customization: {
    label: "شخصی‌سازی",
    key: "customization",
    id: uniqueid(),
  },
  background: {
    id: uniqueid(),
    label: "پس زمینه",
    key: "background",
    element_id: null,
    description: "",
  },
  background_select: {
    id: uniqueid(),
    label: " نوع پس زمینه",
    default_value: "image",
    key: "background_type",
    type: "select",
    options: [
      {
        id: uniqueId(),
        label: "عکس",
        value: "image",
      },
      {
        id: uniqueId(),
        label: "رنگ",
        value: "color",
      },
    ],
  },
  image_uploader: {
    id: uniqueid(),
    label: "عکس",
    default_value: "",
    type: "image_uploader",
  },
  slider_opacity: {
    id: uniqueId(),
    label: "وضوح عکس",
    default_value: "20",
    key: "opacity",
    type: "slider",
  },
  background_color: {
    id: uniqueId(),
    label: "رنگ پس‌زمینه",
    default_value: "#8C9196",
    key: "background_color",
    type: "color",
  },
  alt_text: {
    id: uniqueid(),
    label: "متن جایگزین عکس",
    default_value: "",
    type: "text",
    key: "alternative",
  },
  content: {
    id: uniqueid(),
    label: "محتوا",
    key: "content",
  },
  font_size: {
    id: uniqueid(),
    label: "اندازه فونت",
    key: "font_size",
    default_value: "medium",
    type: "select",
  },
  size_options: [
    {
      id: uniqueid(),
      label: "کوچک",
      value: "small",
    },
    {
      id: uniqueid(),
      label: "متوسط",
      value: "medium",
    },
    {
      id: uniqueid(),
      label: "بزرگ",
      value: "large",
    },
  ],
};
