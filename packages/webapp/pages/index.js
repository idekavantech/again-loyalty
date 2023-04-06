import { LANDING_PLUGIN } from "@saas/utils/constants/plugins";
import request from "@saas/utils/request";
import { PAGES_ITEM_API } from "@saas/utils/api";
import Head from "next/head";
import SectionRenderer from "@saas/builder/SectionRenderer";
import { handleRedirects } from "@saas/utils/helpers/handleRedirects";
import parse from "html-react-parser";
import { NextSeo } from "next-seo";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export default function Home({ page, business }) {
  const openingHours = Object.keys(business.working_hours).map((key) => {
    return business.working_hours[key].map((workHour) => {
      return {
        "@type": "OpeningHoursSpecification",
        opens: workHour.from,
        closes: workHour.to,
        dayOfWeek: daysOfWeek[key - 1],
      };
    });
  });

  let sameAsUrls = [];
  if (business.facebook_url) sameAsUrls.push(business.facebook_url);
  if (business.twitter_url) sameAsUrls.push(business.twitter_url);
  if (business.instagram_url) sameAsUrls.push(business.instagram_url);
  if (business.linkedin_url) sameAsUrls.push(business.linkedin_url);
  if (business.youtube_url) sameAsUrls.push(business.youtube_url);
  return (
    <div className="w-100">
      <NextSeo
        title={page?.seo_title}
        description={page?.meta_description}
        openGraph={{
          url: business.get_vitrin_absolute_url,
          description: page?.meta_description,
          title: page?.seo_title,
        }}
      />
      <Head>
        {page?.head_script ? parse(page?.head_script) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type":
                business.plugins_config.shopping?.status === "active"
                  ? "Store"
                  : "LocalBusiness",
              name: business.title,
              image:
                business.fav_icon_image_url ===
                "https://hs3-cdn-saas.behtarino.com/media/business_images/corrupted.jpg"
                  ? business.icon_image_url
                  : business.fav_icon_image_url,
              "@id": business.get_vitrin_absolute_url,
              url: business.get_vitrin_absolute_url,
              telephone: business.phone_zero_starts,
              address: {
                "@type": "PostalAddress",
                streetAddress: business.address,
                addressCountry: "IR",
              },
              ...(business.longitude &&
                business.latitude && {
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: business.latitude,
                    longitude: business.longitude,
                  },
                }),
              ...(business.has_working_hours && {
                openingHoursSpecification: openingHours,
              }),
              sameAs: sameAsUrls,
              acceptsReservations: business.has_pre_order,
              ...(business.plugins_config.online_menu?.status === "active" && {
                menu: `${business.get_vitrin_absolute_url}/menu`,
              }),
              ...(business.main_owner && {
                founder: {
                  "@type": "Person",
                  ...(business.main_owner.name && {
                    name: business.main_owner.name,
                  }),
                  ...(business.main_owner.email && {
                    email: business.main_owner.email,
                  }),
                },
              }),
              ...(business.slogan && {
                slogan: {
                  "@type": "Text",
                  text: business.slogan,
                },
              }),
            }),
          }}
        />
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
