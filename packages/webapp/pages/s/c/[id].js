import { setProducts } from "@saas/stores/business/actions";
import { SHOPPING_PLUGIN_MAIN_PAGE } from "@saas/stores/plugins/constants";
import {
  SHOPPING_PLUGIN,
  SHOPPING_PLUGIN_URL,
} from "@saas/utils/constants/plugins";
import { ALL_RESOURCES_API, RESOURCES_ITEM_API } from "@saas/utils/api";
import request from "@saas/utils/request";
import qs from "qs";
import { findKey } from "@saas/utils/helpers/findKey";
import { handleRedirects } from "@saas/utils/helpers/handleRedirects";
import { slugify } from "@saas/utils/helpers/slugify";
import Head from "next/head";
import SectionRenderer from "@saas/builder/SectionRenderer";
import NewNotFoundPage from "containers/Pages/NewNotFoundPage";
import ShoppingLayout from "@saas/plugins/Shopping/containers/ShoppingLayout";
import parse from "html-react-parser";
import { BreadcrumbJsonLd, NextSeo } from "next-seo";
import { useRouter } from "next/router";

export default function HierarchyCategoryPage({
  isServer,
  business,
  hierarchy,
  urlPrefix,
  page = {},
}) {
  const router = useRouter();

  if (!hierarchy) {
    return (
      <div>
        <NewNotFoundPage
          item="منو"
          buttonLink={`${urlPrefix}/s`}
          buttonText="بازگشت به صفحه سفارش آنلاین"
        />
      </div>
    );
  }
  const seo_title =
    hierarchy && hierarchy.seo && hierarchy.seo.seo_title
      ? hierarchy.seo.seo_title
      : `${hierarchy.name} | خرید اینترنتی با بیشترین % تخفیف از ${business.revised_title}`;
  const meta_description =
    hierarchy && hierarchy.seo && hierarchy.seo.meta_description
      ? hierarchy.seo.meta_description
      : `خرید آنلاین انواع ${hierarchy.name} با بیشترین % تخفیف از ${business.revised_title}`;

  return (
    <>
      <NextSeo
        title={seo_title}
        description={meta_description}
        openGraph={{
          url: business.get_vitrin_absolute_url + router.asPath,
          description: meta_description,
          title: seo_title,
        }}
        noindex={!!hierarchy?.seo?.noIndex}
      />
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: "برچسب",
            item: business.get_vitrin_absolute_url + "/s/c",
          },
          {
            position: 2,
            name: hierarchy.name,
            item: business.get_vitrin_absolute_url + router.asPath,
          },
        ]}
      />
      <Head>
        {hierarchy?.seo?.head_script
          ? parse(hierarchy?.seo?.head_script)
          : null}
      </Head>
      <SectionRenderer
        sections_skeleton={page && page.data && page.data.sections_skeleton}
        isServer={isServer}
      />
    </>
  );
}

HierarchyCategoryPage.getInitialProps = async ({
  business,
  asPath,
  query,
  store,
  urlPrefix,
  isServer,
  res,
}) => {
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

  hierarchy = query.id
    ? findKey(hierarchy, query.id.split("-")[0] || query.id)
    : hierarchy;
  if (!hierarchy) {
    if (res) res.statusCode = 404;
    return { statusCode: 404, urlPrefix };
  }
  const shoppingPluginData = store.getState().plugins.plugins[SHOPPING_PLUGIN];

  const slug =
    (hierarchy.seo && slugify(hierarchy.seo.slug)) ||
    (hierarchy.name && slugify(hierarchy.name));
  const redirectUrl = `${urlPrefix}/${SHOPPING_PLUGIN_URL}/c/${hierarchy.id}-${slug}`;
  handleRedirects({
    redirectUrl,
    isServer,
    asPath: asPath.split("?")[0],
    queryString: asPath.split("?")[1] || "",
    res,
  });

  if (isServer) {
    try {
      const filters = qs.parse(asPath.split(/\?/)[1], {
        ignoreQueryPrefix: true,
      });
      const url = hierarchy.categories.reduce(
        (str, category) =>
          `${str}&label_id${
            hierarchy.conjoined === undefined
              ? "_conjoined"
              : hierarchy.conjoined
              ? "_conjoined"
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
      }
      return {
        hierarchy,
        business,
        isServer,
        urlPrefix,
        page: shoppingPluginData.pages[SHOPPING_PLUGIN_MAIN_PAGE],
      };
    } catch (e) {
      console.log(e);
    }
  }
  return {
    hierarchy,
    business,
    urlPrefix,
    page: shoppingPluginData.pages[SHOPPING_PLUGIN_MAIN_PAGE],
  };
};
HierarchyCategoryPage.Wrapper = ShoppingLayout;
