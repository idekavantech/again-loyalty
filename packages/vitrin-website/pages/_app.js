import "styles/_main.scss";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/core/styles";

import "nprogress/nprogress.css";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Head from "next/head";
import CssBaseline from "@material-ui/core/CssBaseline";
import { getUser } from "stores/user/actions";
import { useRouter } from "next/router";
import wrapper from "utils/configureStore";
import theme from "utils/themeProvider";
import axios from "axios";
import Cookies from "js-cookie";
import { VITRIN_TOKEN } from "utils/constants";
import Script from "next/script";
import dynamic from "next/dynamic";

const CustomSnackBar = dynamic(() => import("containers/CustomSnackBar"), {
  ssr: false,
});

function MyApp({ pageProps, Component }) {
  const [isProfileInitiated, setIsProfileInitiated] = useState(false);
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const isLoadingUserInfo = useSelector(
    (state) => state.global.isLoading["getUserInfo"]
  );
  const router = useRouter();
  const canonicalURL = "https://vitrin.me" + router.asPath.split("?")[0];
  const initializeProfile = async () => {
    try {
      const token = Cookies.get(VITRIN_TOKEN) || router.query.token;
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        dispatch(getUser(token));
      }
    } catch (e) {
      console.log(e);
    }
    setIsProfileInitiated(true);
  };

  useEffect(() => {
    if (
      !store.user.user &&
      Component.NeedAuth &&
      !isLoadingUserInfo &&
      isProfileInitiated
    )
      router.push(
        `/login?url=${window.location.href.split(window.location.origin)[1]}`
      );
  }, [store.user.user, isLoadingUserInfo, isProfileInitiated]);

  useEffect(() => {
    initializeProfile();
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  useEffect(() => {
    localStorage.setItem("referrer", document?.referrer);
    if (!localStorage.getItem("entry-url")) {
      localStorage.setItem("entry-url", window.location.pathname);
    }
  }, []);

  return (
    <StylesProvider>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1 , maximum-scale=1.0, user-scalable=no "
          />
          {/* <link
            rel="preload"
            href="https://hs3-cf.behtarino.com/static/fonts/Dana/dana-extralight.woff2"
            type="font/woff2"
            as="font"
          /> */}
          <link rel="icon" href="/images/favicon.png" />
          <link rel="canonical" href={canonicalURL} />
        </Head>
        <CustomSnackBar snackBarMessage={store.global.snackBarMessage} />

        <Component {...pageProps}></Component>

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KXC383V"
            height={0}
            width={0}
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Script
          async
          id="filerobot-image-editor"
          src="https://cdn.scaleflex.it/plugins/filerobot-image-editor/3.12.16/filerobot-image-editor.min.js"
        ></Script>
        <Script
          id="googletagmanager"
          async
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KXC383V');
            `,
          }}
        ></Script>
      </MuiThemeProvider>
    </StylesProvider>
  );
}

export default wrapper.withRedux(MyApp);
