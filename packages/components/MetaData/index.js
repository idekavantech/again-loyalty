/* eslint-disable react/no-danger */
/**
 *
 * MetaData
 *
 */

import React, { memo } from "react";
import Head from "next/head";
import jwt from "jsonwebtoken";
import parse from "html-react-parser";
import { SHOPPING_PLUGIN, BASE_PLUGIN } from "@saas/utils/constants/plugins";
import { useRouter } from "next/router";
import { isBusinessOpenNow } from "@saas/utils/helpers/isBusinessOpenNow";
import { LogoJsonLd } from "next-seo";
import { DARAMAD_WEBAPP_CONSTANT } from "@saas/utils/constants";

function MetaData({
  iconImage,
  favIcon,
  themeColor,
  isAdminPage,
  business,
  shouldNotHaveOgImage,
  pageProps,
}) {
  const router = useRouter();
  const headTags =
    business &&
    business.theme_config.head_tags &&
    jwt.decode(business.theme_config.head_tags, process.env.jwt_key);
  const hasShoppingPlugin = business?.plugins_config[SHOPPING_PLUGIN];
  const isShoppingPluginActive =
    business?.plugins_config[SHOPPING_PLUGIN]?.status;
  const isBasePluginActive = business?.plugins_config[BASE_PLUGIN]?.status;
  const isShoppingPluginOpen =
    business?.plugins_config[SHOPPING_PLUGIN]?.data?.is_open !== false &&
    (isBusinessOpenNow(business.working_hours) ||
      business?.is_open_out_of_working_hours === true);

  return (
    <>
      <LogoJsonLd
        logo={iconImage || favIcon}
        url={business.get_vitrin_absolute_url}
      />
      <Head>
        <link
          rel="canonical"
          href={`${business.get_vitrin_absolute_url}${
            pageProps?.id == business.theme_config.main_page_id
              ? "/"
              : router.asPath.split("?")[0]
          }`}
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://hs3-cdn-saas.behtarino.com" />
        <meta charset="utf-8" />
        <meta name="theme-color" content={themeColor} />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content={themeColor}
        />
        {!shouldNotHaveOgImage && (
          <meta
            property="og:image"
            itemProp="image"
            content={favIcon || iconImage}
          />
        )}
        <meta name="msapplication-TileImage" content={favIcon || iconImage} />
        <meta name="robots" content="follow, index" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0,  maximum-scale=1.0"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={favIcon || iconImage}
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href={favIcon || iconImage}
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href={favIcon || iconImage}
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href={favIcon || iconImage}
        />
        <link
          rel="shortcut icon"
          type="image/png"
          href={favIcon || iconImage}
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />

        {headTags && parse(headTags)}
        {process.env.NEXT_PUBLIC_APP_NAME === DARAMAD_WEBAPP_CONSTANT ? (
          <script
            defer
            async
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push(
              {'gtm.start': new Date().getTime(),event:'gtm.js'}
              );var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MCGVBX3')`,
            }}
          ></script>
        ) : (
          <script
            defer
            async
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){
             w[l]=w[l]||[];
             let pwa = false;
             if (navigator.standalone) {
                 pwa = true; 
             } else if (matchMedia('(display-mode: standalone)').matches) {
                 pwa = true; 
             }
             const dataObject = {
               'gtm.start': new Date().getTime(),
               event: 'gtm.js',
               'PWA': pwa ? 'true' : 'false',
               'hasShoppingPlugin' : '${
                 hasShoppingPlugin === undefined ? "false" : "true"
               }',
               'isShoppingPluginActive' : '${isShoppingPluginActive}',
               'isShoppingPluginOpen' : '${isShoppingPluginOpen}',
               'isBasePluginActive' :'${isBasePluginActive}'
             }
             
             w[l].push(dataObject);
             w[l].push({'gtm.start': 
             new Date().getTime(),event:'gtm.js'});
             var f=d.getElementsByTagName(s)[0], 
             j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
             j.async=true;j.src= 
             'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); 
             })(window,document,'script','dataLayer',${
               isAdminPage ? "'GTM-KXC383V'" : "'GTM-PSRKXSG'"
             })`,
            }}
          ></script>
        )}

        <script
          defer
          async
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(function(registration) {
                  }, function(err) {});
                  });
              }
            `,
          }}
        ></script>
      </Head>
    </>
  );
}

export default memo(MetaData);
