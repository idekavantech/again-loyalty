import request from "@saas/utils/request";
import { PAGES_ITEM_API } from "@saas/utils/api";
import SectionRenderer from "@saas/builder/SectionRenderer";
import Head from "next/head";
import { handleRedirects } from "@saas/utils/helpers/handleRedirects";
import { slugify } from "@saas/utils/helpers/slugify";
import NewNotFoundPage from "containers/Pages/NewNotFoundPage";

export default function Page({ page }) {
  if (!page) {
    return (
      <div>
        <NewNotFoundPage />
      </div>
    );
  }
  return (
    <div className="w-100">
      <Head>
        <title>{page.seo_title}</title>
        <meta name="description" content={page.meta_description} />

        <meta property="og:title" content={page.seo_title} />
        <meta property="og:description" content={page.meta_description} />
      </Head>
      <SectionRenderer sections_skeleton={page && page.sections_skeleton} />
    </div>
  );
}

Page.getInitialProps = async ({
  res,
  query,
  isServer,
  business,
  urlPrefix,
  asPath,
}) => {
  try {
    const id = query.id.split("-")[0];
    const {
      response: { data },
    } = await request(PAGES_ITEM_API(id));
    if (!data || data.business !== business.id) {
      if (res) res.statusCode = 404;
      return { statusCode: 404, urlPrefix };
    }
    const { data: page } = data;

    if (page && (typeof page.is_active === "undefined" || page.is_active)) {
      const slug = page.slug || slugify(page.seo_title) || slugify(page.name);
      const { main_page_id } = business.theme_config;
      const isMainPage = main_page_id === +id;
      const redirectUrl = isMainPage
        ? `${urlPrefix}/`
        : page.is_blog
        ? `${urlPrefix}/blog/${id}-${slug}`
        : `${urlPrefix}/${id}-${slug}`;
      handleRedirects({
        redirectUrl,
        isServer,
        asPath: asPath.split("?")[0],
        queryString: asPath.split("?")[1] || "",
        res,
      });
      return {
        urlPrefix,
        business,
        page,
        id,
      };
    }
  } catch (e) {
    console.log(e);
  }
  return {};
};
Page.layoutConfig = {
  header_transparent: true,
};
