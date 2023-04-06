import { LANDING_PLUGIN } from "@saas/utils/constants/plugins";
import request from "@saas/utils/request";
import { PAGES_ITEM_API } from "@saas/utils/api";
import Head from "next/head";
import SectionRenderer from "@saas/builder/SectionRenderer";
import { handleRedirects } from "@saas/utils/helpers/handleRedirects";

export default function Home({ page }) {
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

Home.getInitialProps = async ({
  res,
  isServer,
  store,
  business,
  urlPrefix,
  asPath,
}) => {
  const landingPluginData = store.getState().plugins.plugins[LANDING_PLUGIN];
  const plugins = store.getState().plugins.plugins;
  if (!landingPluginData.isActive && landingPluginData.alternative) {
    const redirect = plugins[landingPluginData.alternative].baseUrl.url;
    handleRedirects({
      redirectUrl: redirect,
      isServer,
      asPath: asPath.split("?")[0],
      queryString: asPath.split("?")[1] || "",
      res,
    });
  }
  const pageId = business.theme_config.main_page_id;
  if (pageId) {
    try {
      const {
        response: {
          data: { data: page },
        },
      } = await request(PAGES_ITEM_API(pageId));

      return {
        urlPrefix,
        business,
        page,
        id: pageId,
      };
    } catch (e) {
      console.log(e);
    }
  }
  return {
    urlPrefix,
    business,
    page: {},
    id: pageId,
  };
};
Home.layoutConfig = {
  checkHeader: true,
  noBack: true,
  header_transparent: true,
};
