import { uniqueid } from "@saas/utils/helpers/uniqueid";
import uniqueId from "lodash/uniqueId";

export const sectionsConfigTabsRepeatedParts = {
  layout: {
    id: uniqueid(),
    label: "Format",
    key: "layout",
    element_id: null,
    description: "",
  },
  layout_select: {
    id: uniqueid(),
    label: "Mold type",
    type: "layout_select",
    key: "type",
  },
  customization: {
    label: "Personalization",
    key: "customization",
    id: uniqueid(),
  },
  background: {
    id: uniqueid(),
    label: "background",
    key: "background",
    element_id: null,
    description: "",
  },
  background_select: {
    id: uniqueid(),
    label: " The background type",
    default_value: "image",
    key: "background_type",
    type: "select",
    options: [
      {
        id: uniqueId(),
        label: "Picture",
        value: "image",
      },
      {
        id: uniqueId(),
        label: "Color",
        value: "color",
      },
    ],
  },
  image_uploader: {
    id: uniqueid(),
    label: "Picture",
    default_value: "",
    type: "image_uploader",
  },
  slider_opacity: {
    id: uniqueId(),
    label: "Photo resolution",
    default_value: "20",
    key: "opacity",
    type: "slider",
  },
  background_color: {
    id: uniqueId(),
    label: "The background color",
    default_value: "#8C9196",
    key: "background_color",
    type: "color",
  },
  alt_text: {
    id: uniqueid(),
    label: "Replace the photo",
    default_value: "",
    type: "text",
    key: "alternative",
  },
  content: {
    id: uniqueid(),
    label: "Content",
    key: "content",
  },
  font_size: {
    id: uniqueid(),
    label: "Font size",
    key: "font_size",
    default_value: "medium",
    type: "select",
  },
  size_options: [
    {
      id: uniqueid(),
      label: "Little",
      value: "small",
    },
    {
      id: uniqueid(),
      label: "medium",
      value: "medium",
    },
    {
      id: uniqueid(),
      label: "big",
      value: "large",
    },
  ],
};
