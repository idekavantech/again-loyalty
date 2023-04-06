import request from "@saas/utils/request";
import { PAGES_ITEM_API } from "@saas/utils/api";
import SectionRenderer from "@saas/builder/SectionRenderer";
import Head from "next/head";
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
Page.INDEPENDENT_SERVER_SIDE_REQUEST = true;

Page.getInitialProps = async ({ res, query, urlPrefix }) => {
  try {
    const id = query.slug.split("-")[0];
    const {
      response: { data },
    } = await request(PAGES_ITEM_API(id));
    if (!data) {
      if (res) res.statusCode = 404;
      return { statusCode: 404, urlPrefix };
    }
    if (typeof data?.data?.is_active === "undefined" || data.data.is_active) {
      const { data: page } = data;
      const slug = page.slug || slugify(page.seo_title) || slugify(page.name);
      const redirectUrl = page.is_blog
        ? `/blog/${id}-${slug}`
        : `/${id}-${slug}`;

      return {
        redirectUrl,
        urlPrefix,
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
