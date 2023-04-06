import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { SHOPPING_PLUGIN_MAIN_PAGE } from "@saas/stores/plugins/constants";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import { BreadcrumbJsonLd, NextSeo } from "next-seo";

import SectionRenderer from "@saas/builder/SectionRenderer";
import ShoppingLayout from "@saas/plugins/Shopping/containers/ShoppingLayout";
import { sectionsSSRFunctions } from "@saas/builder/SectionRenderer/constants";
import parse from "html-react-parser";
import { TABLE_NUMBER_SESSION_STORAGE } from "@saas/plugins/Shopping/constants";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";
import { BRANCH_SELECTION_MODAL } from "@saas/stores/ui/constants";

export default function ShoppingPage({ business, page = {}, sectionsSSRData }) {
  const seo_title = page?.data?.seo_title
    ? page.data.seo_title
    : `خرید اینترنتی با بیشترین % تخفیف از ${business.revised_title}`;
  const meta_description = page?.data?.meta_description
    ? page.data.meta_description
    : `خرید اینترنتی از ${business.revised_title} با بیشترین % تخفیف`;
  const router = useRouter();
  const tableNumber = router?.query?.table_number;
  useEffect(() => {
    if (tableNumber) {
      sessionStorage.setItem(TABLE_NUMBER_SESSION_STORAGE, tableNumber);
    }
  }, [tableNumber]);

  useEffect(() => {
    if (business) {
      const isBusinessSuper = business.branches && business.branches?.length;
      if (isBusinessSuper) {
        router.push("/").then(() => pushParamsToUrl(BRANCH_SELECTION_MODAL));
      }
    }
  }, [business]);

  return (
    <div>
      <NextSeo
        title={seo_title}
        description={meta_description}
        openGraph={{
          url: business.get_vitrin_absolute_url + "/s",
          description: meta_description,
          title: seo_title,
        }}
      />
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: "سفارش آنلاین",
            item: business.get_vitrin_absolute_url + "/s",
          },
        ]}
      />

      <Head>
        {page?.data?.head_script ? parse(page?.data?.head_script) : null}
      </Head>
      <SectionRenderer
        sections_skeleton={page?.data?.sections_skeleton}
        sectionsSSRData={sectionsSSRData}
      />
    </div>
  );
}

ShoppingPage.getInitialProps = async ({
  store,
  asPath,
  urlPrefix,
  business,
}) => {
  const shoppingPluginData = store.getState().plugins.plugins[SHOPPING_PLUGIN];
  const SSRFunctions = shoppingPluginData.pages?.[
    SHOPPING_PLUGIN_MAIN_PAGE
  ]?.data?.sections_skeleton
    ?.filter((section) => {
      return sectionsSSRFunctions[section.name];
    })
    .map((section) => ({
      _function: sectionsSSRFunctions[section.name],
      ...section,
    }));
  const [...SSRValues] = await Promise.all([
    ...SSRFunctions.map(async (_section) => {
      return await _section._function({
        ..._section,
        store,
        asPath,
        urlPrefix,
        business,
      });
    }),
  ]);

  return {
    sectionsSSRData:
      SSRValues?.map((value, index) => ({
        id: SSRFunctions[index].id,
        data: value,
      })) || [],
    urlPrefix,
    business,
    page: shoppingPluginData.pages[SHOPPING_PLUGIN_MAIN_PAGE],
  };
};

ShoppingPage.Wrapper = ShoppingLayout;
