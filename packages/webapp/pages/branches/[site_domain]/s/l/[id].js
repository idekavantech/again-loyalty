import Head from "next/head";
import { setCategory } from "@saas/stores/business/actions";
import { SHOPPING_PLUGIN_MAIN_PAGE } from "@saas/stores/plugins/constants";
import {
  SHOPPING_PLUGIN,
  SHOPPING_PLUGIN_URL,
} from "@saas/utils/constants/plugins";
import { handleRedirects } from "@saas/utils/helpers/handleRedirects";
import { slugify } from "@saas/utils/helpers/slugify";
import { LABELS_SALEABLE_ITEMS_API } from "@saas/utils/api";
import request from "@saas/utils/request";
import SectionRenderer from "@saas/builder/SectionRenderer";
import NewNotFoundPage from "containers/Pages/NewNotFoundPage";
import ShoppingLayout from "@saas/plugins/Shopping/containers/ShoppingLayout";
import { BreadcrumbJsonLd, NextSeo } from "next-seo";
import { useRouter } from "next/router";

export default function CategoryPage({
  category,
  business,
  page = {},
  urlPrefix,
}) {
  const router = useRouter();

  if (!category) {
    return (
      <div>
        <NewNotFoundPage
          item="دسته‌بندی"
          buttonLink={`${urlPrefix}/s`}
          buttonText="بازگشت به صفحه سفارش آنلاین"
        />
      </div>
    );
  }
  const seo_title = category
    ? category.seo && category.seo.seo_title
      ? category.seo.seo_title
      : `${category.title} | خرید اینترنتی با بیشترین % تخفیف از ${business.revised_title}`
    : null;
  const meta_description = category
    ? category.seo && category.seo.meta_description
      ? category.seo.meta_description
      : `خرید آنلاین انواع ${category.title} با بیشترین % تخفیف از ${business.revised_title}`
    : null;

  return (
    <div>
      {category ? (
        <>
          <NextSeo
            title={seo_title}
            description={meta_description}
            openGraph={{
              url: business.get_vitrin_absolute_url,
              description: meta_description,
              title: seo_title,
            }}
            noindex={!!category?.seo?.noIndex}
          />
          <BreadcrumbJsonLd
            itemListElements={[
              {
                position: 1,
                name: "برچسب",
                item: business.get_vitrin_absolute_url + "/s",
              },
              {
                position: 2,
                name: category.title,
                item: business.get_vitrin_absolute_url + router.asPath,
              },
            ]}
          />
          <Head>
            {category?.seo?.head_script
              ? parse(category?.seo?.head_script)
              : null}
          </Head>
        </>
      ) : null}
      <SectionRenderer
        sections_skeleton={page && page.data && page.data.sections_skeleton}
      />
    </div>
  );
}

CategoryPage.getInitialProps = async ({
  store,
  res,
  asPath,
  query,
  isServer,
  urlPrefix,
  business,
}) => {
  const categories = store.getState().business.resource_labels;
  const id = +query.id.split("-")[0];

  let _category = categories.find((c) => c.id === id);
  if (!_category || business.id !== _category.business) {
    if (res) res.statusCode = 404;
    return { statusCode: 404, urlPrefix };
  }
  const shoppingPluginData = store.getState().plugins.plugins[SHOPPING_PLUGIN];

  const slug =
    (_category.seo && slugify(_category.seo.slug)) ||
    (_category.title && slugify(_category.title));
  const redirectUrl = `${urlPrefix}/${SHOPPING_PLUGIN_URL}/l/${_category.id}-${slug}`;
  handleRedirects({
    redirectUrl,
    isServer,
    asPath: asPath.split("?")[0],
    queryString: asPath.split("?")[1] || "",
    res,
  });
  if (isServer) {
    try {
      if (id && categories.find((c) => c.id === +id && !c.deals)) {
        const {
          response: { data: category },
        } = await request(LABELS_SALEABLE_ITEMS_API(id));
        store.dispatch(setCategory(id, category));
        return {
          category,
          business,
          urlPrefix,
          isServer,
          page: shoppingPluginData.pages[SHOPPING_PLUGIN_MAIN_PAGE],
        };
      } else {
        const {
          response: { data: category },
        } = await request(LABELS_SALEABLE_ITEMS_API(categories[0].id));
        store.dispatch(setCategory(categories[0].id, category));
        return {
          category,
          business,
          urlPrefix,
          isServer,
          page: shoppingPluginData.pages[SHOPPING_PLUGIN_MAIN_PAGE],
        };
      }
    } catch (e) {
      console.log(e);
    }
  }
  return {
    category: _category,
    business,
    urlPrefix,
    isServer,
    page: shoppingPluginData.pages[SHOPPING_PLUGIN_MAIN_PAGE],
  };
};

CategoryPage.Wrapper = ShoppingLayout;
