import { businessSerializer } from "@saas/utils/helpers/businessSerializer";

import { getCookie } from "@saas/utils/helpers/getCookie";
import { getUserInfo } from "@saas/utils/services/getUserInfo";
import { getBusiness } from "@saas/utils/services/getBusiness";
import { getBusinessRedirectsMapFunc } from "@saas/utils/services/getBusinessRedirectsMapFunc";
import { handleNeedAuthentication } from "@saas/utils/helpers/handleNeedAuthentication";
import { handleNoNeedForAuthentication } from "@saas/utils/helpers/handleNoNeedForAuthentication";
import { handleNeedToBeAdmin } from "@saas/utils/helpers/handleNeedToBeAdmin";
import { handleRedirects } from "@saas/utils/helpers/handleRedirects";
import { handleRedirectsMap } from "@saas/utils/helpers/handleRedirectsMap";
import { handlePluginsAccess } from "@saas/utils/helpers/handlePluginsAccess";
import { getSiteDomain } from "@saas/utils/helpers/getSiteDomain";

import NoAccess from "containers/Pages/NoAccess";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { themeCreator } from "@saas/utils/themeHelper";
import { setUser } from "@saas/stores/user/actions";
import jwt from "jsonwebtoken";

import { useEffect, useMemo } from "react";

import { setBusiness, setRedirectsMap } from "@saas/stores/business/actions";
import { setPlugins } from "@saas/stores/plugins/actions";
import "nprogress/nprogress.css";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import Axios from "axios";
import CustomSnackBar from "containers/CustomSnackBar";
import Layout from "containers/Layout";
import { pluginsInitialClientSideFunctions } from "@saas/stores/plugins/pluginsInitialClientSideFunctions";
import { SHOPPING_PLUGIN_URL } from "@saas/utils/constants/plugins";
import MetaData from "@saas/components/MetaData";
import parse from "html-react-parser";
import parser from "ua-parser-js";
import mediaQuery from "css-mediaquery";
import NewNotFoundPage from "containers/Pages/NewNotFoundPage";
import "styles/_main.scss";

import UserSideLayout from "containers/UserSideLayout";
import {
  INCLUDED_WEBAPPS_ONLY_KEY,
  UTM_DATA_SESSION_STORAGE,
  VITRIN_TOKEN,
} from "@saas/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import UploadLoadingIndicator from "@saas/components/UploadLoadingIndicator";
import { night } from "@saas/utils/colors";
import PinCodeModal from "containers/PinCodeModal";
import { createWrapper } from "next-redux-wrapper";
import { configureStore } from "@saas/stores/configureStore";
import ShoppingPluginAppSaga from "@saas/plugins/Shopping/saga";
import ShoppingPluginReducer from "@saas/plugins/Shopping/reducer";
import { DefaultSeo } from "next-seo";
import AdminTopBar from "../containers/Layout/containers/AdminTopBar";

const wrapper = createWrapper(() =>
  configureStore({}, { shopping: ShoppingPluginReducer }, [
    ...ShoppingPluginAppSaga,
  ])
);

Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
Router.events.on("routeChangeStart", () => NProgress.start());

function MyApp({
  Component,
  pageProps,
  business,
  layoutConfig = {},
  user,
  ssrMatchMedia,
  isServer,
  wrapperProps,
}) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const decodeUrl = (url = "") => {
    const keyValus = url
      .split(/[&?]/)
      .filter((keyValue) => keyValue.includes("="));
    let res = {};
    keyValus.forEach((keyVal) => {
      const [key, value] = keyVal.split("=");
      res[key] = value;
    });
    return res;
  };

  const router = useRouter();

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    const token = getCookie(VITRIN_TOKEN, document.cookie);
    if (token || (user && user.token)) {
      const _token = token || user.token;
      Axios.defaults.headers.common.Authorization = _token.startsWith("eyJ")
        ? `Bearer ${_token}`
        : `Token ${_token}`;
    }

    const { utm_source, utm_medium, url, callback } = router.query;

    const utmSource =
      utm_source ?? decodeUrl(url ?? callback ?? "")?.utm_source ?? null;
    const urmMedium =
      utm_medium ?? decodeUrl(url ?? callback ?? "")?.utm_medium ?? null;

    let utmData = {};
    if (!!utmSource || !!urmMedium) {
      utmData = {
        ...(utmSource && { source: utmSource }),
        ...(urmMedium && { medium: urmMedium }),
        referrer: document.referrer,
      };
      localStorage.setItem(UTM_DATA_SESSION_STORAGE, JSON.stringify(utmData));
    }
  }, []);
  const pluginsHasInitialClientSideFunctions = useMemo(() => {
    if (!store.plugins.plugins) return [];
    return Object.entries(store.plugins.plugins).filter(
      ([, plugin]) => plugin.isActive && plugin.hasInitialClientSideFunction
    );
  }, [business?.site_domain]);
  useEffect(() => {
    if (pluginsHasInitialClientSideFunctions) {
      pluginsHasInitialClientSideFunctions.forEach(([key]) =>
        pluginsInitialClientSideFunctions[key](dispatch, store)
      );
    }
  }, [pluginsHasInitialClientSideFunctions]);

  const bodyScripts =
    business?.theme_config?.body_scripts &&
    jwt.decode(business.theme_config.body_scripts, process.env.jwt_key);
  const theme = business
    ? themeCreator(
        business,
        router.pathname.includes("/admin"),
        ssrMatchMedia,
        isServer
      )
    : {};
  if (Component.onlyClient) return <Component {...pageProps} />;

  if (!business) {
    return (
      <div>
        <NewNotFoundPage item="کسب و کار" noButton />
      </div>
    );
  }
  if (Component.onlyClientWithBusiness)
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DefaultSeo
          title={business.revised_title}
          openGraph={{
            type: "website",
            locale: "fa_IR",
            url: business.get_vitrin_absolute_url,
            site_name: business.revised_title,
          }}
          twitter={{
            ...(business.twitter_url && { site: business.twitter_url }),
            cardType: "summary_large_image",
            creator: business.revised_title,
            image:
              business.fav_icon_image_url ===
              "https://hs3-cdn-saas.behtarino.com/media/business_images/corrupted.jpg"
                ? business.icon_image_url
                : business.fav_icon_image_url,
          }}
        />
        <Component {...pageProps} />
        <MetaData
          business={business}
          fontUrl={business.theme_config?.font?.url}
          iconImage={business.icon_image_url}
          pageProps={pageProps}
          favIcon={
            business.fav_icon_image_url ===
            "https://hs3-cdn-saas.behtarino.com/media/business_images/corrupted.jpg"
              ? business.icon_image_url
              : business.fav_icon_image_url
          }
          themeColor={business.theme_config?.theme_color}
          description={business.description}
          mainImage={business.main_image_url}
          shouldNotHaveOgImage={layoutConfig?.shouldNotHaveOgImage}
          isAdminPage={layoutConfig?.isAdmin}
        />
      </ThemeProvider>
    );
  const ComponentsWrapper = Component.Wrapper || UserSideLayout;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomSnackBar />
      <UploadLoadingIndicator isLoading={store.global.loading?.upload} />
      {!layoutConfig.isAdmin &&
        business?.ui_access_config?.is_site_open === false && (
          <Dialog open PaperProps={{ className: "w-100" }}>
            <DialogContent className="mb-2 w-100">
              <div style={{ color: night, fontWeight: 500 }}>
                وبسایت {business.revised_title} به صورت موقت از دسترسی خارج شده‌
                است.
              </div>
            </DialogContent>
          </Dialog>
        )}

      {!layoutConfig.isAdmin ? (
        <PinCodeModal themeColor={theme.palette.primary.main} />
      ) : null}
      <DefaultSeo
        title={business.revised_title}
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: business.get_vitrin_absolute_url,
          site_name: business.revised_title,
        }}
        twitter={{
          ...(business.twitter_url && { site: business.twitter_url }),
          cardType: "summary_large_image",
          handle: business.revised_title,
          image:
            business.fav_icon_image_url ===
            "https://hs3-cdn-saas.behtarino.com/media/business_images/corrupted.jpg"
              ? business.icon_image_url
              : business.fav_icon_image_url,
        }}
      />
      {user?.isAdmin ? <AdminTopBar business={business} /> : null}
      <ComponentsWrapper {...wrapperProps}>
        <Layout {...layoutConfig}>
          {!Component[INCLUDED_WEBAPPS_ONLY_KEY] ||
          Component[INCLUDED_WEBAPPS_ONLY_KEY].includes(
            process.env.NEXT_PUBLIC_APP_NAME
          ) ? (
            <Component business={business} {...pageProps}></Component>
          ) : (
            <NoAccess />
          )}
        </Layout>
      </ComponentsWrapper>

      <MetaData
        business={business}
        fontUrl={business.theme_config?.font?.url}
        iconImage={business.icon_image_url}
        pageProps={pageProps}
        favIcon={
          business.fav_icon_image_url ===
          "https://hs3-cdn-saas.behtarino.com/media/business_images/corrupted.jpg"
            ? business.icon_image_url
            : business.fav_icon_image_url
        }
        themeColor={business.theme_config?.theme_color}
        description={business.description}
        mainImage={business.main_image_url}
        shouldNotHaveOgImage={layoutConfig.shouldNotHaveOgImage}
        isAdminPage={layoutConfig?.isAdmin}
      />
      {layoutConfig.isAdmin ? (
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KXC383V"
            height={0}
            width={0}
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      ) : (
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PSRKXSG"
            height={0}
            width={0}
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      )}

      {bodyScripts && parse(bodyScripts)}
      {layoutConfig.isAdmin && (
        <script
          src="https://cdn.scaleflex.it/plugins/filerobot-image-editor/3.12.16/filerobot-image-editor.min.js"
          async
        ></script>
      )}
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { res, store } = ctx;
  const isServer = Boolean(ctx.req || ctx.res);
  if (ctx.asPath.includes("/api/")) {
    return {};
  }
  if (Component.onlyClient) return { onlyClient: true };
  try {
    let pageProps = {};
    let user = null;
    let business = null;
    const deviceType =
      (isServer && parser(ctx.req.headers["user-agent"]).device.type) ||
      "desktop";

    const ssrMatchMedia = (query) => ({
      matches: mediaQuery.match(query, {
        // The estimated CSS width of the browser.
        width: deviceType === "mobile" ? "0px" : "1200px",
      }),
    });
    if (isServer) {
      if (ctx.asPath.includes("/food/") || ctx.asPath === "/food") {
        return ctx.res
          .writeHead(302, {
            Location: ctx.asPath.replace("/food", `/${SHOPPING_PLUGIN_URL}`),
          })
          .end();
      }
      let subdomain = new RegExp(/\/admin\//m).test(ctx.asPath.split("?")[0])
        ? ctx.query.branch_domain || ctx.query.site_domain
        : ctx.query.site_domain || getSiteDomain(ctx.req.headers.host);
      if (
        ctx.asPath.includes("/s/categories") ||
        ctx.asPath === "/s/categories"
      ) {
        return ctx.res
          .writeHead(301, {
            Location: ctx.asPath.replace("/categories", "/l"),
          })
          .end();
      }
      if (
        (ctx.asPath.includes("/s/menu") &&
          !ctx.asPath.includes("appearance/menu")) ||
        ctx.asPath === "/s/menu" ||
        ctx.asPath.includes("/navigation") ||
        ctx.asPath === "/navigation"
      ) {
        return ctx.res
          .writeHead(301, {
            Location: ctx.asPath.replace("/menu", "/c"),
          })
          .end();
      }
      const promises = [
        getBusinessRedirectsMapFunc(subdomain),
        getBusiness(subdomain),
        getUserInfo(ctx, subdomain, isServer),
      ];
      if (
        Component.INDEPENDENT_SERVER_SIDE_REQUEST &&
        Component.getInitialProps
      ) {
        promises.push(Component.getInitialProps({ ...ctx, isServer }));
      }
      const [redirectsMap, _business, _user, _pageProps] = await Promise.all(
        promises
      );
      user = _user;
      if (!_business) {
        if (res) res.statusCode = 404;
        return { statusCode: 404 };
      }
      business = businessSerializer(_business);
      store.dispatch(setRedirectsMap(redirectsMap));
      if (business) {
        store.dispatch(setBusiness({ business, subdomain }));
        store.dispatch(
          setPlugins(business, ctx.asPath, ctx.req.headers.host, user)
        );
      }
      if (user) {
        store.dispatch(setUser(user));
        if (user.token) {
          Axios.defaults.headers.common.Authorization = user.token.startsWith(
            "eyJ"
          )
            ? `Bearer ${user.token}`
            : `Token ${user.token}`;
        }
      }
      const host = ctx.req.headers.host;
      const isLocal =
        host.search("192.168") > -1 || host.search("localhost") > -1;
      const isStaging = /(staging|test|develop)\./gi.test(host);
      if (
        !business?.get_vitrin_absolute_url?.includes(host) &&
        !isLocal &&
        !isStaging &&
        !host?.includes(
          process.env.NEXT_PUBLIC_SITE_DOMAIN
        )
      )
        return res
          .writeHead(302, { Location: business?.get_vitrin_absolute_url })
          .end();
      const urlPrefix = store.getState().plugins.urlPrefix;
      const adminUrlPrefix = store.getState().plugins.adminUrlPrefix;
      if (_pageProps?.redirectUrl) {
        handleRedirects({
          redirectUrl: `${urlPrefix}${_pageProps.redirectUrl}`,
          isServer,
          ...ctx,
        });
      }
      handleRedirectsMap({
        redirectsMap,
        asPath: ctx.asPath.split("?")[0],
        res: ctx.res,
        isServer,
      });
      const newCtx = {
        ...ctx,
        urlPrefix,
        adminUrlPrefix,
        business,
        isServer,
        store,
      };
      if (Component.getInitialProps) {
        if (!Component.INDEPENDENT_SERVER_SIDE_REQUEST) {
          pageProps = await Component.getInitialProps(newCtx);
        } else if (Component.INDEPENDENT_SERVER_SIDE_REQUEST && _pageProps) {
          pageProps = _pageProps;
        }
      }
    } else {
      if (ctx.asPath.includes("/food/") || ctx.asPath === "/food") {
        Router.push(ctx.asPath.replace("/food/", `/${SHOPPING_PLUGIN_URL}/`));
      }
      let subdomain = null;
      if (ctx.asPath.match(/\/branches\/([a-zA-Z0-9\-]*)/m)?.[1]) {
        subdomain = ctx.asPath.match(/\/branches\/([a-zA-Z0-9\-]*)/m)?.[1];
      } else {
        subdomain = new RegExp(/\/admin\//m).test(ctx.asPath.split("?")[0])
          ? ctx.asPath.match(/\/admin\/([a-zA-Z0-9\-]*)/m)?.[1]
          : getSiteDomain(window.location.host);
      }
      if (store.getState().business.business.site_domain !== subdomain) {
        const [redirectsMap, _business, _user] = await Promise.all([
          getBusinessRedirectsMapFunc(subdomain),
          getBusiness(subdomain),
          getUserInfo(ctx, subdomain, isServer),
        ]);
        user = _user;
        if (!_business) {
          if (res) res.statusCode = 404;
          return { statusCode: 404 };
        }
        business = businessSerializer(_business);
        handleRedirectsMap({
          redirectsMap,
          asPath: ctx.asPath.split("?")[0],
          res: ctx.res,
          isServer,
        });
        store.dispatch(setRedirectsMap(redirectsMap));
        if (user) {
          store.dispatch(setUser(user));
          if (user.token) {
            Axios.defaults.headers.common.Authorization = user.token.startsWith(
              "eyJ"
            )
              ? `Bearer ${user.token}`
              : `Token ${user.token}`;
          }
        }
        if (business) {
          store.dispatch(setBusiness({ business, subdomain }));
          store.dispatch(
            setPlugins(business, ctx.asPath, window.location.host, user)
          );
        }
        const urlPrefix = store.getState().plugins.urlPrefix;
        const adminUrlPrefix = store.getState().plugins.adminUrlPrefix;

        const newCtx = {
          ...ctx,
          urlPrefix,
          adminUrlPrefix,
          business,
          isServer,
          store,
        };

        if (Component.getInitialProps) {
          pageProps = await Component.getInitialProps(newCtx);
        }
      } else {
        user = store.getState().user.user;
        business = store.getState().business.business;
        business = businessSerializer(business);

        const _redirectsMap = store.getState().business.redirectsMap;
        handleRedirectsMap({
          redirectsMap: _redirectsMap,
          asPath: ctx.asPath.split("?")[0],
          res: ctx.res,
        });

        const urlPrefix = store.getState().plugins.urlPrefix;
        const adminUrlPrefix = store.getState().plugins.adminUrlPrefix;
        const newCtx = {
          ...ctx,
          urlPrefix,
          adminUrlPrefix,
          business,
          isServer,
          store,
        };
        if (Component.getInitialProps) {
          pageProps = await Component.getInitialProps(newCtx);
        }
      }
    }

    const urlPrefix = store.getState().plugins.urlPrefix;
    const adminUrlPrefix = store.getState().plugins.adminUrlPrefix;
    const newCtx = {
      ...ctx,
      user,
      urlPrefix,
      adminUrlPrefix,
      business,
      isAuthenticated: Boolean(user),
      isServer,
      store,
    };
    handlePluginsAccess(newCtx, Component);
    if (Component.NeedNoAuth) {
      const response = handleNoNeedForAuthentication(newCtx);
      if (response) {
        return {
          notFound: true,
        };
      }
    }

    if (Component.NeedAuth || Component.ShouldBeAdmin) {
      const response = handleNeedAuthentication(newCtx);
      if (response) {
        return {
          notFound: true,
        };
      }
      if (Component.ShouldBeAdmin) {
        const _response = handleNeedToBeAdmin(newCtx);
        if (_response) {
          return {
            notFound: true,
          };
        }
        if (Component.AdminRedirect) {
          if (isServer) {
            return ctx.res
              .writeHead(302, {
                Location: `${urlPrefix}${Component.AdminRedirect}`,
              })
              .end();
          } else {
            Router.push(`${urlPrefix}${Component.AdminRedirect}`);
          }
        }
      }
    }

    return {
      pageProps,
      isServer,
      user,
      business,
      layoutConfig: {
        isAdmin: Component.ShouldBeAdmin,
        transparent: Component?.layoutConfig?.checkHeader,
        shouldNotHaveOgImage: Boolean(Component.shouldNotHaveOgImage),
        noHeader: Component.ShouldBeAdmin,
        noFooter: Component.ShouldBeAdmin,
        noCopyRightFooter: Component.ShouldBeAdmin,
        ...Component.layoutConfig,
      },
      wrapperProps: Component.wrapperProps || {},
      ssrMatchMedia,
      redux: { store },
    };
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }
};

export default wrapper.withRedux(MyApp);
