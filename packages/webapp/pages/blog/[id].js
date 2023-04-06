import request from "@saas/utils/request";
import { PAGES_ITEM_API } from "@saas/utils/api";
import SectionRenderer from "@saas/builder/SectionRenderer";
import { handleRedirects } from "@saas/utils/helpers/handleRedirects";
import { slugify } from "@saas/utils/helpers/slugify";

import NewNotFoundPage from "containers/Pages/NewNotFoundPage";
import { useRouter } from "next/router";
import { ArticleJsonLd, NextSeo } from "next-seo";
import Head from "next/head";

export default function Page({ page, business }) {
  const router = new useRouter();
  if (!page) {
    return (
      <div>
        <NewNotFoundPage />
      </div>
    );
  }
  return (
    <div className="w-100">
      <NextSeo
        title={page?.seo_title}
        description={page?.meta_description}
        openGraph={{
          url: business.get_vitrin_absolute_url + router.asPath,
          description: page?.meta_description,
          title: page?.seo_title,
        }}
        noindex={!!page?.noIndex}
      />
      <ArticleJsonLd
        type="Blog"
        url={business.get_vitrin_absolute_url + router.asPath}
        title={page.name}
        authorName={business.revised_title}
        description={page.meta_description}
      />
      <Head>
        <meta name="keywords" content={page.keyphrase || page.name} />
      </Head>
      <SectionRenderer sections_skeleton={page && page.sections_skeleton} />
    </div>
  );
}
Page.INDEPENDENT_SERVER_SIDE_REQUEST = true;

Page.getInitialProps = async ({ res, query, urlPrefix, isServer, asPath }) => {
  try {
    const id = query.id.split("-")[0];
    const {
      response: { data },
    } = await request(PAGES_ITEM_API(id));
    if (!data) {
      if (res) res.statusCode = 404;
      return { statusCode: 404, urlPrefix };
    }
    const { data: page } = data;
    if (page && (typeof page.is_active === "undefined" || page.is_active)) {
      const slug = page.slug || slugify(page.seo_title) || slugify(page.name);

      const redirectUrl = page.is_blog
        ? `/blog/${id}-${slug}`
        : `/${id}-${slug}`;
      handleRedirects({
        redirectUrl,
        isServer,
        asPath: asPath.split("?")[0],
        queryString: asPath.split("?")[1] || "",
        res,
      });
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
