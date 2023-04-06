/**
 *
 * AdminLayout
 *
 */

import React, {
  memo,
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef,
} from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { makeSelectBusiness } from "@saas/stores/business/selector";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { useMediaQuery } from "@material-ui/core";
import {
  makeSelectAdminOrdersWidget,
  makeSelectPlugin,
} from "@saas/stores/plugins/selector";
import Modals from "../Modals";
import {
  PLUGIN_INACTIVE_STATUS,
  PLUGIN_TRIAL_STATUS,
} from "@saas/stores/plugins/constants";
import { PLUGIN_ACTIONS } from "@saas/stores/plugins/PLUGIN_ACTIONS";

import { BASE_PLUGIN, SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import AdminMenu from "../AdminMenu";
import initSocket from "public/init-socket";
import Head from "next/head";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import Link from "next/link";
import { makeSelectUser } from "@saas/stores/user/selector";
import { graphite, night } from "@saas/utils/colors";
import useTheme from "@material-ui/core/styles/useTheme";
import {
  getJourneyState,
  getShoppingAdminOrders,
  getShoppingAdminOrdersSummary,
} from "store/actions";
import {
  makeSelectJourneyState,
  makeSelectShoppingAdminOrdersSummary,
} from "store/selectors";
import dynamic from "next/dynamic";
import Radio from "@material-ui/core/Radio";
import {
  GUESS_OF_FIRST_MONTH_ORDERS_COUNT_OPTIONS,
  ONBOARDED,
} from "store/constants";
import AdminHeader from "components/AdminHeader";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { useRouter } from "next/router";
import LazyImage from "@saas/components/LazyImage";
import { DARAMAD_WEBAPP_CONSTANT } from "@saas/utils/constants";
import { NEW_ORDER_STATUS_NEW } from "@saas/plugins/Shopping/constants";
import { getUserBusinesses } from "@saas/stores/global/actions";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import { makeSelectBusinesses } from "@saas/stores/global/selectors";

let drawerWidth = 260;
const drawerClosedWidth = 0;
const Tour = dynamic(() => import("reactour"), { ssr: false });
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export function AdminLayout({
  business,
  children,
  dispatch,
  adminOrdersWidget,
  noItemLeft,
  _setSnackBarMessage,
  _getAdminOrders,
  noMenu,
  noHeader,
  noWrapper,
  basePlugin,
  user,
  journeyData,
  _getJourneyState,
  shoppingPluginData,
  _getShoppingAdminOrdersSummary,
  shoppingAdminOrdersSummary,
  businesses,
  _getUserBusinesses,
}) {
  const theme = useTheme();
  const desktopMatches = useMediaQuery("(min-width:768px)");
  const { has_admin_panel_access = true } = business?.ui_access_config || {};
  const [ordersCountSelected, setOrdersCountSelected] = useState("");
  const isSocketInitialized = useRef(false);
  const isTrial = basePlugin.status === PLUGIN_TRIAL_STATUS;
  const nextJourney =
    journeyData?.vitrin_journey_state?.automation_data?.next_journey;
  const trialDays = 14;
  const trialDaysLeft = isTrial
    ? Math.floor(
        (new Date(basePlugin.expirationDate).getTime() - new Date().getTime()) /
          (1000 * 24 * 60 * 60)
      )
    : null;
  const isInactive =
    basePlugin.status === PLUGIN_INACTIVE_STATUS || trialDaysLeft < 0;
  const isShopping = shoppingPluginData?.isActive;
  const { minWidth768 } = useResponsive();
  const headerHeight = minWidth768 ? 64 : 0;
  const [open, setOpen] = useState(false);
  const [isOpenOnboarding, setIsOpenOnboarding] = useState(false);
  const router = useRouter();
  const splittedPathname = router.pathname.split("/");
  const isOrdersPage =
    splittedPathname[splittedPathname.length - 1] === "orders" &&
    splittedPathname[splittedPathname.length - 2] === "s";
  const noLayout =
    router.query.no_layout === "true" || typeof sessionStorage !== "undefined"
      ? sessionStorage.getItem("noLayout")
      : false;

  const DOBARE = "DOBARE";
  const DARAMAD = "DARAMAD";

  const supportTeamPhone = {
    [DOBARE]: "tel:02191070754",
    [DARAMAD]: "tel:09912982735",
  };

  useEffect(() => {
    if (router.query.no_layout === "true") {
      sessionStorage.setItem("noLayout", router.query.no_layout === "true");
    }
    if (router.query.iframe_from_pos === "true") {
      sessionStorage.setItem(
        "iframe_from_pos",
        router.query.iframe_from_pos === "true"
      );
    }
    if (router.query.no_new_tab_on_order_click === "true") {
      sessionStorage.setItem(
        "no_new_tab_on_order_click",
        router.query.no_new_tab_on_order_click === "true"
      );
    }
    if (router.query.hami_integrated === "true") {
      sessionStorage.setItem(
        "hami_integrated",
        router.query.hami_integrated === "true"
      );
    }

    _getShoppingAdminOrdersSummary();
  }, [router.query.no_layout]);

  const businessSlugs = useMemo(
    () => businesses?.map((business) => business.slug) || [],
    [businesses]
  );

  const [hasOnboarding, setHasOnboarding] = useState(false);
  const getOnboardingConfigs = async () => {
    const {
      default: { hasOnboarding },
    } = await import(
      `configs/onboardingSteps/${process.env.NEXT_PUBLIC_APP_NAME}.js`
    );
    setHasOnboarding(hasOnboarding);
  };

  const shoppingBusinessSteps = [
    {
      selector: '[data-tour="menu"]',
      content: ({ goTo }) => (
        <div className="d-flex flex-column align-items-center">
          <h1 className="title">Welcome to the showcase!</h1>
          <div
            className="my-2"
            style={{ width: desktopMatches ? 400 : 200, height: "auto" }}
          >
            <LazyImage className="w-100" src={`/images/welcome-vitrin.svg`} />
          </div>
          <p>
            Through the menu you can access all the features during free testing
            Be.
          </p>
          <button
            className="d-flex align-items-center mt-4"
            style={{
              color: theme.palette.primary.main,
              fontWeight: 500,
              fontSize: 14,
            }}
            onClick={() => {
              goTo(1);
            }}
          >
            <span>next one</span>
            <ArrowBackIcon className="mr-3" />
          </button>
        </div>
      ),
      position: "center",
    },
    {
      selector: '[data-tour="widget"]',
      content: ({ goTo }) => (
        <div className="d-flex flex-column align-items-center">
          <p>
            We will inform you in this section of the orders you receive
            Be able to manage them quickly.
          </p>
          <button
            className="d-flex align-items-center mt-4"
            style={{
              color: theme.palette.primary.main,
              fontWeight: 500,
              fontSize: 14,
            }}
            onClick={() => {
              goTo(2);
            }}
          >
            <span>next one</span>

            <ArrowBackIcon className="mr-3" />
          </button>
        </div>
      ),
      position: "center",
    },
    {
      selector: '[data-tour="setup"]',
      content: ({ goTo }) => (
        <div className="d-flex flex-column align-items-center">
          <h1 className="title">The footsteps of the elders!</h1>
          <div
            className="my-2"
            style={{ width: desktopMatches ? 400 : 200, height: "auto" }}
          >
            <LazyImage className="w-100" src={`/images/exploring.svg`} />
          </div>
          <p>
            ۷۶% Of the users who make a successful site.
            Have been introduced to you.
          </p>
          <button
            className="d-flex align-items-center mt-4"
            style={{
              color: theme.palette.primary.main,
              fontWeight: 500,
              fontSize: 14,
            }}
            onClick={() => goTo(3)}
          >
            <span>next one</span>

            <ArrowBackIcon className="mr-3" />
          </button>
        </div>
      ),
    },
    {
      content: () => (
        <div className="d-flex flex-column align-items-center">
          <div
            className="mb-2"
            style={{ width: desktopMatches ? 200 : 150, height: "100%" }}
          >
            <LazyImage className="w-100" src={`/images/welcome-tip2.svg`} />
          </div>
          <p className="mt-2">
            Do you expect to get a showcase with a showcase in the first month?
          </p>
          <div
            className="w-100 d-flex flex-column mt-3"
            style={{ fontSize: 12 }}
          >
            {GUESS_OF_FIRST_MONTH_ORDERS_COUNT_OPTIONS.map((number) => (
              <div key={number.id} className="d-flex align-items-center">
                <Radio
                  className="p-1"
                  size="small"
                  color="primary"
                  checked={ordersCountSelected === number}
                  onClick={() => setOrdersCountSelected(number)}
                />
                <span>{number}</span>
              </div>
            ))}
          </div>
          <button
            className="d-flex align-items-center mt-4"
            style={{
              color: theme.palette.primary.main,
              fontWeight: 500,
              fontSize: 14,
            }}
            onClick={() => setIsOpenOnboarding(false)}
          >
            <span>Ready to start, start</span>
            <ArrowBackIcon className="mr-3" />
          </button>
        </div>
      ),
      position: "center",
    },
  ];

  const introductionBusinessSteps = [
    {
      selector: '[data-tour="menu"]',
      content: ({ goTo }) => (
        <div className="d-flex flex-column align-items-center">
          <h1 className="title">Welcome to the showcase!</h1>
          <div
            className="my-2"
            style={{ width: desktopMatches ? 400 : 200, height: "auto" }}
          >
            <LazyImage className="w-100" src={`/images/welcome-vitrin.svg`} />
          </div>
          <p>
            Through the menu you can access all the features during free testing
            Be.
          </p>
          <button
            className="d-flex align-items-center mt-4"
            style={{
              color: theme.palette.primary.main,
              fontWeight: 500,
              fontSize: 14,
            }}
            onClick={() => {
              goTo(1);
            }}
          >
            <span>next one</span>
            <ArrowBackIcon className="mr-3" />
          </button>
        </div>
      ),
      position: "center",
    },
    {
      selector: '[data-tour="setup"]',
      content: ({ goTo }) => (
        <div className="d-flex flex-column align-items-center">
          <h1 className="title">The footsteps of the elders!</h1>
          <div
            className="my-2"
            style={{ width: desktopMatches ? 400 : 200, height: "auto" }}
          >
            <LazyImage className="w-100" src={`/images/exploring.svg`} />
          </div>
          <p>
            ۷۰% One of the users who make the site successful in the suggested steps
            Have introduced to you..
          </p>
          <button
            className="d-flex align-items-center mt-4"
            style={{
              color: theme.palette.primary.main,
              fontWeight: 500,
              fontSize: 14,
            }}
            onClick={() => goTo(2)}
          >
            <span>next one</span>

            <ArrowBackIcon className="mr-3" />
          </button>
        </div>
      ),
    },
    {
      content: () => (
        <div className="d-flex flex-column align-items-center">
          <div
            className="mb-1"
            style={{ width: desktopMatches ? 250 : 200, height: "100%" }}
          >
            <LazyImage className="w-100" src={`/images/welcometip-end.svg`} />
          </div>
          <p className="mt-2">
            Finally we are on your side to make your visit up!
            <br />
            You can use tutorials and support help.
          </p>
          <button
            className="d-flex align-items-center mt-4"
            style={{
              color: theme.palette.primary.main,
              fontWeight: 500,
              fontSize: 14,
            }}
            onClick={() => setIsOpenOnboarding(false)}
          >
            <span>Ready to start, start</span>
            <ArrowBackIcon className="mr-3" />
          </button>
        </div>
      ),
      position: "center",
    },
  ];
  useEffect(() => {
    setTimeout(() => {
      _getJourneyState();
      _getUserBusinesses();
    }, 0);
    getOnboardingConfigs();
  }, []);
  useEffect(() => {
    if (minWidth768) setOpen(true);
    else setOpen(false);
  }, [minWidth768]);
  const callbackAfterNotificationReceived = useCallback(
    (message, messageType) => {
      _setSnackBarMessage(message, messageType);
      if (isOrdersPage) _getAdminOrders();
    },
    []
  );
  useEffect(() => {
    if (adminOrdersWidget) {
      setTimeout(() => {
        adminOrdersWidget.actions.forEach((action) => {
          dispatch(PLUGIN_ACTIONS[action]({ slug: business.slug }));
        });
      }, 0);
    }
    if (businessSlugs.length && !isSocketInitialized.current) {
      initSocket(
        callbackAfterNotificationReceived,
        business.site_domain,
        businessSlugs
      );
      isSocketInitialized.current = true;
    }
  }, [businessSlugs]);

  useEffect(() => {
    if (isTrial && localStorage.getItem(ONBOARDED) !== "true") {
      setIsOpenOnboarding(true);
      window.scrollTo(0, 400);

      localStorage.setItem(ONBOARDED, true);
    }
  }, []);

  const handleCloseAfterClickInMobile = () => {
    if (!minWidth768) setOpen(false);
  };

  if (noWrapper) {
    return (
      <div>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>

        <div>{children}</div>
      </div>
    );
  }

  return (
    <div>
      {(noHeader ? null : has_admin_panel_access) && !noLayout && (
        <AdminHeader
          url={business.get_vitrin_absolute_url}
          businessTitle={business.revised_title}
          openMenu={() => setOpen(!open)}
          noItemLeft={
            process.env.NEXT_PUBLIC_APP_NAME === DARAMAD_WEBAPP_CONSTANT
              ? true
              : noItemLeft
          }
          adminOrdersWidget={
            !isInactive &&
            shoppingAdminOrdersSummary &&
            adminOrdersWidget && {
              ...adminOrdersWidget,
              ordersAmount: shoppingAdminOrdersSummary[NEW_ORDER_STATUS_NEW],
            }
          }
        />
      )}
      {!isInactive && <Modals />}
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      {!has_admin_panel_access &&
        process.env.NEXT_PUBLIC_APP_NAME === "VITRIN" && (
          <Dialog open PaperProps={{ className: "w-100" }}>
            <DialogContent className="mb-2 w-100">
              <div style={{ color: night, fontWeight: 500 }}>
                {nextJourney === "j06_renewal"
                  ? "Your package credit is over."
                  : "You have reached the ceiling of free package."}
              </div>
              <div className="mt-4" style={{ color: graphite }}>
                {(nextJourney === "j05_receivable" ||
                  nextJourney === "j06_renewal" ||
                  nextJourney === "j07_freemium") &&
                journeyData?.receivable_sms_text.length ? (
                  <div
                    className="d-flex justify-content-between align-items-center"
                    dangerouslySetInnerHTML={{
                      __html:
                        journeyData.receivable_sms_text?.[0].split(
                          "Payment link"
                        )[0],
                    }}
                  ></div>
                ) : (
                  <div>
                    Your management panel is no longer available and to continue
                    Use of a showcase you need to upgrade or extend. At
                    As you think there is a mistake with contact support
                    get.
                    <a
                      href="tel:02191070751"
                      style={{ color: theme.palette.primary.main }}
                    >
                      ۹۱۰۷۰۷۵۱-۰۲۱
                    </a>
                  </div>
                )}
              </div>
            </DialogContent>
            <DialogActions
              className="d-flex align-items-center justify-content-between p-4"
              style={{ borderTop: "1px solid #EDEDED" }}
            >
              <Button
                variant="contained"
                color="primary"
                className="u-box-shadow-none u-fontMedium"
                size="medium"
                onClick={() =>
                  (window.location =
                    journeyData?.receivable_transaction_url ||
                    `https://vitrin.me/upgrade/?business_slug=${business?.slug}`)
                }
              >
                {journeyData?.receivable_transaction_url
                  ? "Subscriber extension"
                  : "Upgrade"}
              </Button>
            </DialogActions>
          </Dialog>
        )}
      {(has_admin_panel_access ||
        process.env.NEXT_PUBLIC_APP_NAME !== "VITRIN") && (
        <section className="d-flex w-100">
          {!noLayout && (
            <AdminMenu
              disabled={isInactive}
              drawerWidth={drawerWidth}
              drawerClosedWidth={drawerClosedWidth}
              headerHeight={headerHeight}
              open={typeof noMenu !== "undefined" ? noMenu : open}
              onClose={() => setOpen(false)}
              variant={minWidth768 ? "permanent" : "temporary"}
              onClickItem={handleCloseAfterClickInMobile}
            />
          )}
          <section
            style={{
              width: noLayout
                ? "100%"
                : `calc(100% - ${
                    open && minWidth768
                      ? drawerWidth + "px"
                      : drawerClosedWidth + "px"
                  })`,
              paddingTop: noLayout ? 0 : minWidth768 ? 64 : 48,
              background: "#F6F6F7",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              direction: "rtl",
            }}
            className="w-100"
          >
            {journeyData?.vitrin_journey_state?.automation_data
              ?.next_journey === "j05_receivable" &&
              journeyData?.vitrin_journey_state?.automation_data?.is_active &&
              journeyData?.receivable_transaction_url &&
              journeyData?.receivable_sms_text?.[0] && (
                <div className="container">
                  <Paper className="p-4 mt-5">
                    <div
                      className="d-flex justify-content-between align-items-center"
                      dangerouslySetInnerHTML={{
                        __html:
                          journeyData.receivable_sms_text?.[0].split(
                            "Payment link"
                          )[0],
                      }}
                    ></div>
                    <div className="d-flex justify-content-end">
                      <div>
                        <Link
                          passHref
                          href={journeyData?.receivable_transaction_url}
                          target="_blank"
                          className="mt-3"
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                          >
                            the payment
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Paper>
                </div>
              )}

            {(isTrial || isInactive) && (
              <>
                {process.env.NEXT_PUBLIC_APP_NAME === "VITRIN" ? (
                  <div className="container">
                    <Link
                      passHref
                      href={`https://vitrin.me/upgrade?business_slug=${
                        business.slug
                      }${user?.token && `&token=${user.token}`}&business_type=${
                        isShopping ? "shopping" : "intro"
                      }`}
                      target="_blank"
                    >
                      <Paper
                        className="px-3 py-5 mt-md-4 mt-3"
                        style={{
                          color: "rgba(0, 0, 0, 0.87)",
                          fontSize: desktopMatches ? 14 : 12,
                          fontWeight: desktopMatches ? 500 : 400,
                          lineHeight: "22px",
                          border: "1px solid #0050FF",
                          background:"blue"
                        }}
                      >
                        <div
                          className={`d-flex ${
                            !isTrial ? "flex-col flex-md-row" : "flex-row"
                          } justify-content-between align-items-center`}
                        >
                          <div className="d-flex" >
                            <LazyImage
                              width={20}
                              height={20}
                              src={`/images/info.svg`}
                              className="ml-2"
                            />
                            {isInactive ? (
                              isTrial ? (
                                <span>
                                  test{englishNumberToPersianNumber(trialDays)}{" "}
                                  Your fast was over.. Please upgrade your panel.
                                </span>
                              ) : (
                                <span>
                                  The duration of your use of the package{" "}
                                  {process.env.NEXT_PUBLIC_APP_NAME_PERSIAN} To
                                  Ended. To continue using the site and
                                  Make a new package of management panel
                                </span>
                              )
                            ) : (
                              <span>
                                {englishNumberToPersianNumber(trialDaysLeft)}{" "}
                                Day until the end of the test period{" "}
                                {englishNumberToPersianNumber(trialDays)} Fast
                                You are left.
                              </span>
                            )}
                          </div>

                          <div
                            className={`d-flex justify-content-center align-items-center ${
                              !isTrial ? "mt-2" : ""
                            } mt-md-0 align-self-end`}
                            style={{
                              fontSize: desktopMatches ? 14 : 13,
                              fontWeight: 500,
                              color: "#0050FF",
                            }}
                          >
                            {isTrial ? "Upgrade" : "Buy package"}
                            {isTrial && (
                              <LazyImage
                                className="mr-2"
                                width={20}
                                height={20}
                                src={`/images/ArrowUpwardFilled.svg`}
                              />
                            )}
                          </div>
                        </div>
                      </Paper>
                    </Link>
                  </div>
                ) : (
                  <a
                    href={supportTeamPhone[process.env.NEXT_PUBLIC_APP_NAME]}
                    className="m-4"
                  >
                    <Paper
                      className="px-3 py-5 mt-md-4 mt-3"
                      style={{
                        background: "#C5D7FF",
                        direction:"ltr",
                        color: "rgba(0, 0, 0, 0.87)",
                        fontSize: desktopMatches ? 14 : 12,
                        fontWeight: desktopMatches ? 500 : 400,
                        lineHeight: "22px",
                        border: "1px solid #0050FF",
                      }}
                    >
                      <div
                        className={`d-flex ${
                          !isTrial ? "flex-col flex-md-row" : "flex-row"
                        } justify-content-between align-items-center`}
                      >
                        <div className="d-flex">
                          <LazyImage
                            width={20}
                            height={20}
                            src={`/images/info.svg`}
                            className="ml-2"
                          />
                          {isInactive ? (
                            isTrial ? (
                              <span>
                                test{englishNumberToPersianNumber(trialDays)}{" "}
                                Your fast was over.. Please upgrade your panel.
                              </span>
                            ) : (
                              <span>
                                The duration of your use of the package{" "}
                                {process.env.NEXT_PUBLIC_APP_NAME_PERSIAN} To
                                Ended. To continue using the site and
                                Make a new package of management panel
                              </span>
                            )
                          ) : (
                            <span>
                              {englishNumberToPersianNumber(trialDaysLeft)} Day left out of your {englishNumberToPersianNumber(trialDays)} day trial
                            </span>
                          )}
                        </div>

                        <div
                          className={`d-flex justify-content-center align-items-center ${
                            !isTrial ? "mt-2" : ""
                          } mt-md-0 align-self-end`}
                          style={{
                            fontSize: desktopMatches ? 14 : 13,
                            fontWeight: 500,
                            color: "#0050FF",
                          }}
                        >
                          {isTrial ? "Upgrade" : "Buy package"}
                          {isTrial && (
                            <LazyImage
                              className="mr-2"
                              width={20}
                              height={20}
                              src={`/images/ArrowUpwardFilled.svg`}
                            />
                          )}
                        </div>
                      </div>
                    </Paper>
                  </a>
                )}
              </>
            )}

            {!isInactive && children}
          </section>
        </section>
      )}
      {hasOnboarding && (
        <Tour
          steps={isShopping ? shoppingBusinessSteps : introductionBusinessSteps}
          isOpen={isOpenOnboarding}
          className="w-100 d-flex flex-col align-items-center justify-content-center tour"
          showCloseButton={false}
          showNumber={false}
          onRequestClose={() => setIsOpenOnboarding(false)}
          rounded={5}
          showButtons={false}
          showNavigationNumber={false}
          //  onAfterOpen={(target) => disableBodyScroll(target)}
          //  onBeforeClose={(target) => enableBodyScroll(target)}
        />
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  business: makeSelectBusiness(),
  user: makeSelectUser(),
  adminOrdersWidget: makeSelectAdminOrdersWidget(),
  basePlugin: makeSelectPlugin(BASE_PLUGIN),
  journeyData: makeSelectJourneyState(),
  shoppingPluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  shoppingAdminOrdersSummary: makeSelectShoppingAdminOrdersSummary(),
  businesses: makeSelectBusinesses(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    _getAdminOrders: (page) => dispatch(getShoppingAdminOrders(page)),
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
    _getJourneyState: () => dispatch(getJourneyState()),
    _getShoppingAdminOrdersSummary: () =>
      dispatch(getShoppingAdminOrdersSummary()),
    _getUserBusinesses: () => dispatch(getUserBusinesses()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminLayout);
