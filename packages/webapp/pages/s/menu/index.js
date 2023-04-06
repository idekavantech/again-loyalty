import { setCategory, setProducts } from "@saas/stores/business/actions";

import { SHOPPING_PLUGIN_MAIN_PAGE } from "@saas/stores/plugins/constants";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import {
  ALL_RESOURCES_API,
  CATEGORIES_ITEMS_API,
  RESOURCES_ITEM_API,
} from "@saas/utils/api";
import request from "@saas/utils/request";
import qs from "qs";
import SectionRenderer from "@saas/builder/SectionRenderer";
import ShoppingLayout from "@saas/plugins/Shopping/containers/ShoppingLayout";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

export default function ShoppingPage({ business, page = {} }) {
  const seo_title = `خرید اینترنتی با بیشترین % تخفیف از ${business.revised_title}`;
  const meta_description = `خرید اینترنتی از ${business.revised_title} با بیشترین % تخفیف`;
  const router = useRouter();
  return (
    <div>
      <NextSeo
        title={seo_title}
        description={meta_description}
        openGraph={{
          url: business.get_vitrin_absolute_url + router.asPath,
          description: meta_description,
          title: seo_title,
        }}
      />
      <SectionRenderer
        sections_skeleton={page && page.data && page.data.sections_skeleton}
      />
    </div>
  );
}

ShoppingPage.getInitialProps = async ({
  business,
  store,
  asPath,
  urlPrefix,
}) => {
  let isNested = false;
  if (business.plugins_config[SHOPPING_PLUGIN]?.data?.menu_type === "nested") {
    isNested = true;
  }
  const categories = store.getState().business.resource_labels;
  const shoppingPluginData = store.getState().plugins.plugins[SHOPPING_PLUGIN];
  try {
    if (!isNested && !categories[0].deals) {
      const {
        response: { data: category },
      } = await request(CATEGORIES_ITEMS_API(categories[0].id));
      store.dispatch(setCategory(categories[0].id, category));
      return {
        isNested,
        category,
        business,
        urlPrefix,
        page: shoppingPluginData.pages[SHOPPING_PLUGIN_MAIN_PAGE],
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
        return {
          page: shoppingPluginData.pages[SHOPPING_PLUGIN_MAIN_PAGE],
          isNested,
          business,
          urlPrefix,
        };
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
        return {
          page: shoppingPluginData.pages[SHOPPING_PLUGIN_MAIN_PAGE],
          isNested,
          business,
          urlPrefix,
        };
      }
    }
  } catch (e) {
    console.log(e);
  }
  return {
    page: shoppingPluginData.pages[SHOPPING_PLUGIN_MAIN_PAGE],
    isNested,
    business,
    urlPrefix,
  };
};

ShoppingPage.Wrapper = ShoppingLayout;
