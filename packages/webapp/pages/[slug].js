import request from "@saas/utils/request";
import { PAGES_ITEM_API } from "@saas/utils/api";
import SectionRenderer from "@saas/builder/SectionRenderer";
import Head from "next/head";
import { handleRedirects } from "@saas/utils/helpers/handleRedirects";
import NewNotFoundPage from "containers/Pages/NewNotFoundPage";
import parse from "html-react-parser";
import { slugify } from "@saas/utils/helpers/slugify";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

export default function Page({ page, business }) {
  const router = useRouter();
  if (!page) {
    return (
      <div>
        <NewNotFoundPage />
      </div>
    );
  }

  return (
    <>
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
      <Head>{page?.head_script ? parse(page?.head_script) : null}</Head>

      <SectionRenderer sections_skeleton={page?.sections_skeleton} />
    </>
  );
}

Page.INDEPENDENT_SERVER_SIDE_REQUEST = true;
Page.getInitialProps = async ({ res, query, urlPrefix, isServer, asPath }) => {
  try {
    const id = query.slug.split("-")[0];
    if (Boolean(Number(id))) {
      const {
        response: { data },
      } = await request(PAGES_ITEM_API(id));
      if (!data) {
        if (res) res.statusCode = 404;
        return { statusCode: 404, urlPrefix };
      }
      if (typeof data.data?.is_active === "undefined" || data.data.is_active) {
        const { data: page } = data;
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
    } else {
      if (res) res.statusCode = 404;
      return { statusCode: 404, urlPrefix };
    }
  } catch (e) {
    console.log(e);
  }
  return {};
};
Page.layoutConfig = {
  header_transparent: true,
};
