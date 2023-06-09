import { sectionsConfigTabsRepeatedParts } from "../../../sectionsConfigTabsRepeatedParts";
import uniqueId from "lodash/uniqueId";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import {
  HAS_EXTERNAL_LINK,
  HAS_INTERNAL_LINK,
} from "@saas/utils/constants/builderConstants";
import { CDN_BASE_URL } from "@saas/utils/api";
import { sectionsLayout } from "../../sectionsLayout";
import { SECTION_BANNER_WITH_SLIDER } from "@saas/utils/constants/sections";

const bannerWithSlider = [
  // Bang
  {
    ...sectionsConfigTabsRepeatedParts["content"],
    items: [
      {
        id: uniqueId(),
        label: "The first photo on the left",
        key: "first_part_image",
        element_id: null,
        description: "In mobile mode the photo enters the slider",
        fields: [
          {
            id: uniqueid(),
            label: "Upload the first photo",
            default_value: `https://dkstatics-public.digikala.com/digikala-adservice-banners/f55b5212d7f9f2a61f6206b214c136760387e93b_1613547036.jpg?x-oss-process=image/quality,q_80`,
            key: "slide_image",
            tooltip: "500 * 245",
            type: "image_uploader",
          },
          {
            ...sectionsConfigTabsRepeatedParts["alt_text"],
          },

          {
            id: uniqueid(),
            label: "Select the internal or external link",
            default_value: HAS_INTERNAL_LINK,
            key: "link_type",
            type: "select",
            options: [
              {
                id: uniqueId(),
                label: "With external link",
                value: HAS_EXTERNAL_LINK,
              },
              {
                id: uniqueId(),
                label: "With internal link",
                value: HAS_INTERNAL_LINK,
              },
            ],
          },
          {
            dependencies: [
              {
                fields: {
                  link_type: HAS_INTERNAL_LINK,
                },
              },
            ],
            id: uniqueid(),
            label: "Internal link",
            default_value: "/",
            key: "internal_link",
            type: "link",
          },
          {
            dependencies: [
              {
                fields: {
                  link_type: HAS_EXTERNAL_LINK,
                },
              },
            ],
            id: uniqueid(),
            label: "External link",
            default_value: "/",
            key: "external_link",
            type: "text",
            className: "direction-ltr",
          },
          {
            id: uniqueid(),
            label: "Upload Separate Photo for Mobile",
            type: "switch",
            key: "having_banner_image_for_mobile",
            default_value: true,
          },
          {
            dependencies: [
              {
                fields: {
                  having_banner_image_for_mobile: true,
                },
              },
            ],
            id: uniqueid(),
            label: "Upload a Photo",
            type: "image_uploader",
            key: "banner_image_in_mobile",
            tooltip: "400 * 205",
            default_value: `${CDN_BASE_URL}mock48.jpg`,
          },
        ],
      },
      {
        id: uniqueId(),
        label: "The second photo on the left",
        key: "second_part_image",
        element_id: null,
        description: "In mobile mode the photo enters the slider",
        fields: [
          {
            id: uniqueid(),
            label: "Upload second photo",
            default_value: `https://dkstatics-public.digikala.com/digikala-adservice-banners/7506f91d9c46c1ba4833c761f0255ba8cd24b1f5_1614884929.jpg?x-oss-process=image/quality,q_80`,
            key: "slide_image",
            tooltip: "500 * 245",
            type: "image_uploader",
          },
          {
            ...sectionsConfigTabsRepeatedParts["alt_text"],
          },

          {
            id: uniqueid(),
            label: "Select the internal or external link",
            default_value: HAS_INTERNAL_LINK,
            key: "link_type",
            type: "select",
            options: [
              {
                id: uniqueId(),
                label: "With external link",
                value: HAS_EXTERNAL_LINK,
              },
              {
                id: uniqueId(),
                label: "With internal link",
                value: HAS_INTERNAL_LINK,
              },
            ],
          },
          {
            dependencies: [
              {
                fields: {
                  link_type: HAS_INTERNAL_LINK,
                },
              },
            ],
            id: uniqueid(),
            label: "Internal link",
            default_value: "/",
            key: "internal_link",
            type: "link",
          },
          {
            dependencies: [
              {
                fields: {
                  link_type: HAS_EXTERNAL_LINK,
                },
              },
            ],
            id: uniqueid(),
            label: "External link",
            default_value: "/",
            key: "external_link",
            type: "text",
            className: "direction-ltr",
          },
          {
            id: uniqueid(),
            label: "Upload Separate Photo for Mobile",
            type: "switch",
            key: "having_banner_image_for_mobile",
            default_value: true,
          },

          {
            dependencies: [
              {
                fields: {
                  having_banner_image_for_mobile: true,
                },
              },
            ],
            id: uniqueid(),
            label: "Upload a Photo",
            type: "image_uploader",
            tooltip: "400 * 205",
            key: "banner_image_in_mobile",
            default_value: `${CDN_BASE_URL}mock48.jpg`,
          },
        ],
      },
      {
        id: uniqueid(),
        label: "Slides",
        key: "slides",
        element_id: null,
        description: "",
        has_multiple_items: true,
        extendable_items: true,
        max_items: 8,
        min_items: 1,
        add_new_item_text: "Add new slides",
        default_items: [
          {
            slide_image: `https://dkstatics-public.digikala.com/digikala-adservice-banners/e089235e20d798fba0544e91345d5c94a35936f9_1614243666.jpg?x-oss-process=image/quality,q_80`,
            alternative: "",
            link_type: HAS_INTERNAL_LINK,
            internal_link: "/",
            external_link: "/",
          },
          {
            slide_image: `https://dkstatics-public.digikala.com/digikala-adservice-banners/dd0d7cbb36e6a254f6a731b56856d9130664ba19_1614509443.jpg?x-oss-process=image/quality,q_80`,
            alternative: "",
            link_type: HAS_INTERNAL_LINK,
            internal_link: "/",
            external_link: "/",
          },
          {
            slide_image: `https://dkstatics-public.digikala.com/digikala-adservice-banners/3288a90d81389270095e95c992fc13ed08fc61e2_1614148977.jpg?x-oss-process=image/quality,q_80`,
            alternative: "",
            link_type: HAS_INTERNAL_LINK,
            internal_link: "/",
            external_link: "/",
          },
        ],
        fields: [],
        items_fields: [
          {
            id: uniqueid(),
            label: "Upload a Photo",
            type: "image_uploader",
            key: "slide_image",
            tooltip: "800 * 405",
            default_value: `https://dkstatics-public.digikala.com/digikala-adservice-banners/e089235e20d798fba0544e91345d5c94a35936f9_1614243666.jpg?x-oss-process=image/quality,q_80`,
          },
          {
            ...sectionsConfigTabsRepeatedParts["alt_text"],
          },

          {
            id: uniqueid(),
            label: "Select the internal or external link",
            key: "link_type",
            type: "select",
            options: [
              {
                id: uniqueId(),
                label: "With external link",
                value: HAS_EXTERNAL_LINK,
              },
              {
                id: uniqueId(),
                label: "With internal link",
                value: HAS_INTERNAL_LINK,
              },
            ],
          },
          {
            dependencies: [
              {
                fields: {
                  link_type: HAS_INTERNAL_LINK,
                },
              },
            ],
            id: uniqueid(),
            label: "Internal link",
            key: "internal_link",
            type: "link",
          },
          {
            dependencies: [
              {
                fields: {
                  link_type: HAS_EXTERNAL_LINK,
                },
              },
            ],
            id: uniqueid(),
            label: "External link",
            key: "external_link",
            type: "text",
            className: "direction-ltr",
          },
          {
            id: uniqueid(),
            label: "Upload Separate Photo for Mobile",
            type: "switch",
            key: "having_banner_image_for_mobile",
            default_value: true,
          },

          {
            dependencies: [
              {
                fields: {
                  having_banner_image_for_mobile: true,
                },
              },
            ],
            id: uniqueid(),
            label: "Upload a Photo",
            type: "image_uploader",
            key: "banner_image_in_mobile",
            tooltip: "400 * 205",
            default_value: `${CDN_BASE_URL}mock48.jpg`,
          },
        ],
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
            default_value: sectionsLayout[SECTION_BANNER_WITH_SLIDER][0].value,
            options: sectionsLayout[SECTION_BANNER_WITH_SLIDER],
          },
        ],
      },
      {
        ...sectionsConfigTabsRepeatedParts["background"],
        fields: [
          {
            ...sectionsConfigTabsRepeatedParts["background_select"],
          },
          {
            dependencies: [
              {
                fields: {
                  background_type: "image",
                },
              },
            ],
            ...sectionsConfigTabsRepeatedParts["image_uploader"],
            key: "background_image",
          },
          {
            dependencies: [
              {
                fields: {
                  background_type: "image",
                },
              },
            ],

            ...sectionsConfigTabsRepeatedParts["slider_opacity"],
          },
          {
            dependencies: [
              {
                fields: {
                  background_type: "color",
                },
              },
            ],

            ...sectionsConfigTabsRepeatedParts["background_color"],
          },
        ],
      },
    ],
  },
];

export default bannerWithSlider;
