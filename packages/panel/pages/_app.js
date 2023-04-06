import { businessSerializer } from "@saas/utils/helpers/businessSerializer";
import { getCookie } from "@saas/utils/helpers/getCookie";
import { getUserInfo } from "utils/getUserInfo";
import { getBusiness } from "@saas/utils/services/getBusiness";
import { getBusinessRedirectsMapFunc } from "@saas/utils/services/getBusinessRedirectsMapFunc";
import { handleNeedAuthentication } from "@saas/utils/helpers/handleNeedAuthentication";
import { handleNoNeedForAuthentication } from "@saas/utils/helpers/handleNoNeedForAuthentication";
import { handleNeedToBeAdmin } from "utils/handleNeedToBeAdmin";
import { handleRedirects } from "@saas/utils/helpers/handleRedirects";
import { handleRedirectsMap } from "@saas/utils/helpers/handleRedirectsMap";
import { handlePluginsAccess } from "utils/handlePluginsAccess";
import { getSiteDomain } from "@saas/utils/helpers/getSiteDomain";
import { handleNeedToCompleteInfo } from "@saas/utils/helpers/handleNeedToCompleteInfo";
import Cookies from "js-cookie";
import NoAccess from "containers/Pages/NoAccess";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { themeCreator } from "@saas/utils/themeHelper";
import { setUser } from "@saas/stores/user/actions";
import jwt from "jsonwebtoken";
import { useEffect, useMemo, useState } from "react";
import { setBusiness, setRedirectsMap } from "@saas/stores/business/actions";
import { setPlugins } from "@saas/stores/plugins/actions";
import "nprogress/nprogress.css";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import Axios from "axios";
import CustomSnackBar from "containers/CustomSnackBar";
import Layout from "containers/Layout";
import { pluginsInitialClientSideFunctions } from "@saas/stores/plugins/pluginsInitialClientSideFunctions";
import { SHOPPING_PLUGIN_URL } from "@saas/utils/constants/plugins";
import MetaData from "@saas/components/MetaData";
import parse from "html-react-parser";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "styles/_main.scss";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import UserSideLayout from "containers/UserSideLayout";
import "react-quill/dist/quill.snow.css";
import {
  APP_URL,
  DARAMAD_WEBAPP_CONSTANT,
  DOBARE_WEBAPP_CONSTANT,
  INCLUDED_WEBAPPS_ONLY_KEY,
  VITRIN_TOKEN,
} from "@saas/utils/constants";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import UploadLoadingIndicator from "@saas/components/UploadLoadingIndicator";
import { night } from "@saas/utils/colors";
import { createWrapper } from "next-redux-wrapper";
import adminReducer from "store/reducer";
import adminSaga from "store/saga";
import ShoppingPluginAppSaga from "@saas/plugins/Shopping/saga";
import ShoppingPluginReducer from "@saas/plugins/Shopping/reducer";
import { configureStore } from "@saas/stores/configureStore";
import Loading from "components/Loading";

let timeOut;

const wrapper = createWrapper(() =>
  configureStore({}, { admin: adminReducer, shopping: ShoppingPluginReducer }, [
    ...adminSaga,
    ...ShoppingPluginAppSaga,
  ])
);

function MyApp({ Component }) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const business = store?.business?.business;
  const user = store?.user?.user;
  const router = useRouter();
  const [pageProps, setPageProps] = useState({});
  const [hasAccess, setHasAccess] = useState({});

  const [loading, setLoading] = useState(true);
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
    if (router?.query?.utm_source) {
      sessionStorage.setItem("utm_source", router?.query?.utm_source);
      sessionStorage.setItem("referer", document?.referrer);
    }
  }, []);
  const pluginsHasInitialClientSideFunctions = useMemo(() => {
    if (!store.plugins.plugins) return [];
    return Object.entries(store.plugins.plugins).filter(
      ([, plugin]) => plugin.isActive && plugin.hasInitialClientSideFunction
    );
  }, [business?.site_domain]);

  const initializePanel = async () => {
    setLoading(true);
    let __pageProps = {};
    let user = null;
    let business = null;
    if (router.asPath.includes("[site_domain]")) return;
    if (router.asPath.includes("/food/") || router.asPath === "/food") {
      router.push(router.asPath.replace("/food", `/${SHOPPING_PLUGIN_URL}`));
    }
    let subdomain = new RegExp(/\/admin\//m).test(router.asPath.split("?")[0])
      ? router.query.branch_domain || router.query.site_domain
      : router.query.site_domain || getSiteDomain(window.location.host);
    if (
      router.asPath.includes("/s/categories") ||
      router.asPath === "/s/categories"
    ) {
      router.push(router.asPath.replace("/categories", "/l"));
    }
    if (
      (router.asPath.includes("/s/menu") &&
        !router.asPath.includes("appearance/menu")) ||
      router.asPath === "/s/menu" ||
      router.asPath.includes("/navigation") ||
      router.asPath === "/navigation"
    ) {
      router.push(router.asPath.replace("/menu", "/c"));
    }
    const promises = [
      getBusinessRedirectsMapFunc(subdomain),
      getBusiness(subdomain, router.asPath),
      getUserInfo(subdomain, router.query.token || Cookies.get(VITRIN_TOKEN)),
    ];
    if (
      Component.INDEPENDENT_SERVER_SIDE_REQUEST &&
      Component.getInitialProps
    ) {
      promises.push(Component.getInitialProps({}));
    }
    const [redirectsMap, _business, _user, _pageProps] = await Promise.all(
      promises
    );
    user = _user;
    business = businessSerializer(_business);

    dispatch(setRedirectsMap(redirectsMap));
    if (business) {
      dispatch(setBusiness({ business, subdomain }));
      dispatch(setPlugins(business, router.asPath, window.location.host, user));
    }
    if (user) {
      dispatch(setUser(user));
      if (user.token) {
        Axios.defaults.headers.common.Authorization = user.token.startsWith(
          "eyJ"
        )
          ? `Bearer ${user.token}`
          : `Token ${user.token}`;
      }
    }
    const urlPrefix = store.plugins.urlPrefix;
    const adminUrlPrefix = store.plugins.adminUrlPrefix;
    if (_pageProps?.redirectUrl) {
      handleRedirects({
        redirectUrl: `${urlPrefix}${_pageProps.redirectUrl}`,
        asPath: router.asPath,
      });
    }
    handleRedirectsMap({
      redirectsMap,
      asPath: router.asPath.split("?")[0],
    });

    handleNeedToCompleteInfo({
      isStaff: user?.isStaff,
      business,
      pathname: router.asPath,
    });
    const props = {
      urlPrefix,
      adminUrlPrefix,
      business,
      store,
    };
    if (Component.getInitialProps) {
      if (!Component.INDEPENDENT_SERVER_SIDE_REQUEST) {
        __pageProps = await Component.getInitialProps(props);
      } else if (Component.INDEPENDENT_SERVER_SIDE_REQUEST && _pageProps) {
        __pageProps = _pageProps;
      }
    }
    let _hasAccess = true;
    setPageProps(__pageProps);
    _hasAccess = handlePluginsAccess(
      { plugins: store.plugins.plugins },
      Component
    );
    if (Component.NeedNoAuth) {
      handleNoNeedForAuthentication({
        isAuthenticated: Boolean(user),
        urlPrefix: `https://${APP_URL}`,
      });
    }

    if (Component.NeedAuth || Component.ShouldBeAdmin) {
      handleNeedAuthentication({
        isAuthenticated: Boolean(user),
        pathname: router.asPath.split("?")[0],
        urlPrefix,
      });
      if (Component.ShouldBeAdmin) {
        _hasAccess = handleNeedToBeAdmin({
          user,
          urlPrefix,
        });
      }
    }

    setHasAccess(_hasAccess);
    setLoading(false);
  };
  useEffect(() => {
    initializePanel();
  }, [router.query.branch_domain, router.query.site_domain]);
  useEffect(() => {
    if (pluginsHasInitialClientSideFunctions) {
      setTimeout(() => {
        pluginsHasInitialClientSideFunctions.forEach(([key]) =>
          pluginsInitialClientSideFunctions[key](dispatch, store)
        );
      }, 0);
    }
  }, [pluginsHasInitialClientSideFunctions]);

  const bodyScripts =
    business?.theme_config?.body_scripts &&
    jwt.decode(business?.theme_config.body_scripts, process.env.jwt_key);
  const theme = themeCreator(business, true);

  const layoutConfig = {
    isAdmin: Component.ShouldBeAdmin,
    transparent: Component?.layoutConfig?.checkHeader,
    shouldNotHaveOgImage: Boolean(Component.shouldNotHaveOgImage),
    noHeader: Component.ShouldBeAdmin,
    noFooter: Component.ShouldBeAdmin,
    noCopyRightFooter: Component.ShouldBeAdmin,
    ...Component.layoutConfig,
  };
  const wrapperProps = Component.wrapperProps || {};

  const _clearTimeout = () => {
    if (!timeOut) return;
    clearTimeout(timeOut);
    timeOut = null;
  };
  const isDobarePanel = useMemo(
    () => process.env.NEXT_PUBLIC_APP_NAME === DOBARE_WEBAPP_CONSTANT,
    []
  );
  const isDaramadPanel = useMemo(
    () => process.env.NEXT_PUBLIC_APP_NAME === DARAMAD_WEBAPP_CONSTANT,
    []
  );

  const getFavicon = () => {
    if (isDobarePanel) return `/images/dobare_logo.svg`;

    if (isDaramadPanel) return `/images/daramad_logo.svg`;

    return `/images/vitrin_logo.svg`;
  };

  const routeStartHandler = (url) => {
    NProgress.start();

    _clearTimeout();
    timeOut = setTimeout(() => {
      window.location.href = url;
    }, 4000);
  };
  const routeCompleteHandler = () => {
    NProgress.done();

    _clearTimeout();
  };

  useEffect(() => {
    router.events.on("routeChangeStart", routeStartHandler);
    router.events.on("routeChangeComplete", routeCompleteHandler);
    router.events.on("routeChangeError", routeCompleteHandler);
    return () => {
      router.events.off("routeChangeStart", routeStartHandler);
      router.events.off("routeChangeComplete", routeCompleteHandler);
      router.events.off("routeChangeError", routeCompleteHandler);
    };
  }, []);

  const ComponentsWrapper = Component.Wrapper || UserSideLayout;

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Loading isLoading={loading} />
      {!loading && (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <CustomSnackBar />
          <UploadLoadingIndicator isLoading={store.global.loading?.upload} />
          {!layoutConfig.isAdmin &&
            business?.ui_access_config?.is_site_open === false && (
              <Dialog open PaperProps={{ className: "w-100" }}>
                <DialogContent className="mb-2 w-100">
                  <div
                    style={{
                      color: night,
                      fontWeight: 500,
                    }}
                  >
                    website{business.revised_title} Temporarily out of access
                    It's been.
                  </div>
                </DialogContent>
              </Dialog>
            )}

          {business && hasAccess ? (
            <ComponentsWrapper {...wrapperProps}>
              <Head>
                <title>{business.revised_title}</title>
              </Head>
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
          ) : business ? (
            <NoAccess />
          ) : (
            <Component {...pageProps} />
          )}
          {business ? (
            <MetaData
              business={business}
              fontUrl={business.theme_config?.font?.url}
              iconImage={business.icon_image_url}
              pageProps={pageProps}
              favIcon={getFavicon()}
              themeColor={business.theme_config.theme_color}
              description={business.description}
              mainImage={business.main_image_url}
              websiteUrl={business.get_vitrin_absolute_url}
              shouldNotHaveOgImage={layoutConfig.shouldNotHaveOgImage}
              isAdminPage={layoutConfig?.isAdmin}
            />
          ) : null}

          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-PSRKXSG"
              height={0}
              width={0}
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>

          {bodyScripts && parse(bodyScripts)}
        </ThemeProvider>
      )}
    </>
  );
}

export default wrapper.withRedux(MyApp);
