import Head from "next/head";
import { ONLINE_MENU_PLUGIN_MENU_PAGE } from "@saas/stores/plugins/constants";
import { ONLINE_MENU_PLUGIN } from "@saas/utils/constants/plugins";
import { NextSeo } from "next-seo";
import { getMonthName } from "@saas/utils/helpers/getMonthName";
import SectionRenderer from "@saas/builder/SectionRenderer";
import NewNotFoundPage from "containers/Pages/NewNotFoundPage";
import parse from "html-react-parser";
import moment from "moment-jalaali";
import request from "@saas/utils/request";
import { CATEGORY_RESOURCE_API } from "@saas/utils/api";

moment.loadPersian({ dialect: "persian-modern" });
export default function MenuPage({ page = {}, business, categoriesDeals }) {
  if (!page) {
    return (
      <div>
        <NewNotFoundPage />
      </div>
    );
  }
  const date = moment();
  const description =
    page?.data?.meta_description ||
    `مشاهده منو آنلاین ${business.revised_title} به همراه قیمت‌ها و جزئیات | منوی دیجیتال ${business.revised_title} `;

  const title =
    page?.data?.seo_title ||
    `منو دیجیتال ${business.revised_title} با قیمت | ${getMonthName(
      date.jMonth() + 1
    )} ${date.jYear()}`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          url: `${business.get_vitrin_absolute_url}/menu`,
          description: description,
          title: title,
          image: business?.fav_icon_image_url || business?.icon_image_url,
        }}
      />
      <Head>
        {page?.data?.head_script ? parse(page?.data?.head_script) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: business.revised_title,
              image:
                business.fav_icon_image_url ===
                "https://hs3-cdn-saas.behtarino.com/media/business_images/corrupted.jpg"
                  ? business.icon_image_url
                  : business.fav_icon_image_url,
              url: business.get_vitrin_absolute_url,
              telephone: business.phone_zero_starts,
              description: business.slogan,
              mainEntityOfPage: business.get_vitrin_absolute_url + "/menu",
              hasMenu: {
                "@type": "Menu",
                name: `منو ${business.revised_title}`,
                hasMenuSection: [
                  categoriesDeals.map((category) => ({
                    "@type": "MenuSection",
                    name: category.title,
                    ...(category.extra_data?.icon_image_url && {
                      image: category.extra_data?.icon_image_url,
                    }),
                    hasMenuItem: [
                      category.products.map((product) => ({
                        "@type": "MenuItem",
                        name: product.title,
                        ...(product.description && {
                          description: product.description,
                        }),
                        ...(product.main_image_url && {
                          image: product.main_image_url,
                        }),
                        offers: {
                          "@type": "Offer",
                          areaServed: "Iran",
                          availability: product.available,
                          price:
                            product.default_variation.discounted_price * 10, // Convert to RIAL
                          priceCurrency: "IRR",
                          ...(product.default_variation.sku && {
                            sku: product.default_variation.sku,
                          }),
                        },
                      })),
                    ],
                  })),
                ],
              },
            }),
          }}
        />
      </Head>
      <SectionRenderer sections_skeleton={page.data.sections_skeleton} />
    </>
  );
}

MenuPage.getInitialProps = async ({ store, isServer, urlPrefix, business }) => {
  const onlineMenuPluginData =
    store.getState().plugins.plugins[ONLINE_MENU_PLUGIN];

  const slug = store.getState().business.business.slug;
  const categoriesDeals = await getCategoryDealsAsync(slug);

  return {
    categoriesDeals,
    business,
    urlPrefix,
    isServer,
    page: onlineMenuPluginData.pages[ONLINE_MENU_PLUGIN_MENU_PAGE],
  };
};

MenuPage[ONLINE_MENU_PLUGIN] = true;
MenuPage.layoutConfig = {
  noHeader: true,
  noFooter: true,
};

export const getCategoryDealsAsync = async (slug) => {
  try {
    const { response } = await request(CATEGORY_RESOURCE_API(slug));
    return response.data;
  } catch (e) {
    console.log(e);
  }
  return null;
};
