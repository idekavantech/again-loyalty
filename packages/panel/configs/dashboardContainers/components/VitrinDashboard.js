/**
 *
 * Settings
 *
 */

import React, { memo, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import {
  makeSelectAdminOrdersWidget,
  makeSelectAdminUrlPrefix,
  makeSelectPlugin,
} from "@saas/stores/plugins/selector";
import {
  makeSelectCMSLessons,
  makeSelectJourneyState,
  makeSelectReportCallRequest,
} from "store/selectors";
import {
  automaticConsultationRequest,
  getCMSLessons,
  getJourneyState,
  updateJourneyState,
  getReportsCallRequests,
} from "store/actions";
import { dashboardActivationSteps } from "store/constants";
import { BASE_PLUGIN, SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";
import {
  makeSelectBusiness,
  makeSelectBusinessSiteDomain,
} from "@saas/stores/business/selector";
import { makeSelectUser } from "@saas/stores/user/selector";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import VideoSlider from "components/VideoSlider";
import SuccessMessageModal from "components/Modals/SuccessMessageModal";
import dynamic from "next/dynamic";
import Head from "next/head";
import SuccessAutomation from "components/SuccessAutomation";
import SetupSteps from "components/SetupSteps";
import { useRouter } from "next/router";
import NotificationCard from "components/NotificationCard";
import TargetingCard from "components/TargetingCard";
import {
  ADMIN_ORDER_NOTIFICATIONS_MODAL,
  ADMIN_CONTACTS_MODAL,
  ADMIN_DOMAIN_SELECTION_MODAL,
  ADMIN_UPDATES_MODAL,
} from "@saas/stores/ui/constants";
import useTheme from "@material-ui/core/styles/useTheme";
import SetupSettingCard from "components/SetupSettingCard";
import BusinessInfoModal from "components/Modals/BusinessInfoModal";
import { showPopUp } from "../../../containers/Layout/porsline";
import NoteOutlinedIcon from "@material-ui/icons/NoteOutlined";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

const Tour = dynamic(() => import("reactour"), { ssr: false });

const IS_NEW_UPDATE_CARD_HAS_BEEN_CLICKED =
  "IS_CARD_TO_CARD_UPDATE_CARD_HAS_BEEN_CLICKED";

function VitrinDashboard({
  urlPrefix,
  _getCMSLessons,
  lessons,
  _getJourneyState,
  _updateJourneyState,
  journeyData,
  business,
  siteDomain,
  user,
  adminOrdersWidget,
  _getReportCallRequests,
  reportCallRequests,
  _createAutomaticConsultationRequest,
}) {
  const desktopMatches = useMediaQuery("(min-width:1200px)");
  const [isOpenWelcomeTips, setIsOpenWelcomeTips] = useState({});
  const [successMessage, setSuccessMessage] = useState({
    isOpen: false,
    image: "",
    title: "",
    content: "",
  });
  const [isOpenBussinesInfoModal, setIsOpenBussinesInfoModal] = useState(false);
  const theme = useTheme();
  const router = useRouter();

  const { minWidth768 } = useResponsive();
  const isDesktop = minWidth768;

  const buttons = {
    [SHOPPING_PLUGIN]: [
      {
        name: "template_step",
      },
      {
        name: "free_domain_state",
        action: () => pushParamsToUrl(ADMIN_DOMAIN_SELECTION_MODAL),
      },
      {
        name: "address_and_phone_step",
        link: "setting",
      },
      {
        name: "deal_step",
        link: "s/settings/products/new?source=walkThrough",
      },
      {
        name: "order_step",
        action: () => {
          if (localStorage.getItem("NEW_ORDER_ONBOARDING")) {
            router.push(`${urlPrefix}/s/orders`);
          } else {
            setIsOpenWelcomeTips({ newOrder: true });
          }
        },
      },
      {
        name: "payment_step",
        link: `https://vitrin.me/upgrade?business_slug=${business.slug}${
          user?.token && `&token=${user.token}`
        }&business_type=shopping`,
      },
      {
        name: "domain_settings_state",
        link: "/documents",
      },
      {
        name: "sales_channel_gift",
        action: () => {
          if (!dashboardState?.sales_channel_gift) {
            _updateJourneyState(
              {
                dashboard_state: { ...dashboardState, sales_channel_gift: 1 },
              },
              () => router.push(`${urlPrefix}/sales_channels`)
            );
          } else {
            router.push(`${urlPrefix}/sales_channels`);
          }
        },
        extraBtn: {
          text: "View page",
          link: "/sales_channels",
        },
      },
    ],
  };

  useEffect(() => {
    setTimeout(() => {
      _getCMSLessons();
      _getJourneyState();
      _getReportCallRequests();
      if (router.query.consultation) {
        _createAutomaticConsultationRequest("consultationRequest", () =>
          setSuccessMessage({
            isOpen: true,
            title: "The consultation request was successfully completed",
            content:
              "Showcase consultants will contact you after the application approval",
          })
        );
      }
      if (router.query.upgrade) {
        setSuccessMessage({
          isOpen: true,
          title: "Welcome to the summers!",
          image: `/images/success-info-main.svg`,
          content:
            "Will you make the next successful showcase?!If you need tips for domain settings, payment and receipt of this, contact Showcase Support.",
        });
      }
    }, 0);
    if (
      business.revised_title == "." ||
      business.title == "." ||
      !business.revised_title ||
      !business.title
    ) {
      setIsOpenBussinesInfoModal(true);
    }
  }, []);

  const sortedLessons = useMemo(() => {
    return lessons?.sort((a, b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
  }, [lessons]);

  const target = journeyData?.vitrin_journey_state?.target || {};
  const targetStartDate = target?.from_date_time
    ? new Date(target.from_date_time).toLocaleDateString("fa-IR", {
        month: "long",
        day: "2-digit",
      })
    : "";
  const targetEndDate = target?.to_date_time
    ? new Date(target.to_date_time).toLocaleDateString("fa-IR", {
        month: "long",
        day: "2-digit",
      })
    : "";

  const dashboardState =
    journeyData?.vitrin_journey_state?.dashboard_state || {};
  const success_state = journeyData?.vitrin_journey_state?.success_state || {};

  const numberOfCalls = useMemo(() => {
    return reportCallRequests?.reduce(
      (sum, request) => sum + request?.count,
      0
    );
  }, [reportCallRequests]);

  const pluginsProgress = useMemo(() => {
    return Object.keys(dashboardActivationSteps).reduce((state, plugin) => {
      if (Object.keys(dashboardState).length) {
        const stepNumber = Math.max(
          ...dashboardActivationSteps[plugin].map((step, index) => {
            return dashboardState[step.name] ? index + 2 : 2;
          })
        );
        return {
          ...state,
          [plugin]: {
            number: stepNumber,
            name:
              dashboardActivationSteps[SHOPPING_PLUGIN][stepNumber - 1]?.name ||
              dashboardActivationSteps[SHOPPING_PLUGIN][
                dashboardActivationSteps[SHOPPING_PLUGIN].length - 1
              ],
          },
        };
      }
      return {
        shopping: {
          number: 2,
          name: "free_domain_state",
        },
      };
    }, {});
  }, [dashboardState]);

  const activeStep = pluginsProgress[SHOPPING_PLUGIN];

  const ActiveStepBtn = buttons[SHOPPING_PLUGIN];

  const newOrderOnboarding = [
    {
      selector: '[data-tour="new-order"]',
      content: () => (
        <div className="d-flex flex-column align-items-center">
          <h1 className="w-100 text-right title">You received an order!</h1>
          <p className="mt-2">
            You can see your own orders in this section and simply
            Edit, verify or cancel.
          </p>
          <button
            className="p-1 mt-2 mt-md-3 ml-auto mr-auto"
            onClick={() => {
              setIsOpenWelcomeTips({});
              localStorage.setItem("NEW_ORDER_ONBOARDING", true);
            }}
            style={{
              color: theme.palette.primary.main,
              fontWeight: 500,
              fontSize: 14,
            }}
          >
            Is it good
          </button>
        </div>
      ),
      position: "bottom",
    },
  ];

  // const newCallOnboarding = [
  //   {
  //     selector: '[data-tour="new-call"]',
  //     content: () => (
  //       <div className="d-flex flex-column align-items-center">
  //         <h1 className="title">
  //           You received a click on the floating call button!
  //         </h1>
  //         <p className="mt-2">
  //           If users at the site click on your contact button and
  //           Want to connect to you with ways of communication
  //           You can see in this section.
  //         </p>
  //         <button
  //           className="d-flex align-items-center mt-4"
  //           style={{
  //             color: theme.palette.primary.main,
  //             fontWeight: 500,
  //             fontSize: 14,
  //           }}
  //           onClick={() => setIsOpenWelcomeTips({})}
  //         >
  //           <span>Is it good</span>
  //         </button>
  //       </div>
  //     ),
  //     position: "bottom",
  //   },
  // ];

  const skipStepTwo = () => {
    if (!dashboardState?.free_domain_state) {
      _updateJourneyState(
        {
          dashboard_state: {
            ...dashboardState,
            free_domain_state: 1,
          },
        },
        () => _getJourneyState()
      );
    }
  };

  const requestForVitrinPro = (data, callback) => {
    _createAutomaticConsultationRequest(data, callback);
  };

  const hasUserNewUpdate = false; // should be fetched from backend
  const isUserSeenUpdateCard =
    localStorage.getItem(IS_NEW_UPDATE_CARD_HAS_BEEN_CLICKED) &&
    !hasUserNewUpdate;

  const porslineOnClick = function (ifid) {
    document.getElementById(ifid).src =
      "https://survey.porsline.ir/s/82tVHhe7/#/?ac=0&ns=0";
  };

  return (
    <div className="dashboard-page">
      <div className="container mb-5">
        <Head>
          <title>Dashboard</title>
        </Head>
        <div>
          <a
            style={{
              left: -15,
              top: isDesktop ? "30%" : "5%",
              ...(!isDesktop && { transform: "rotate(90deg) scale(0.9)" }),
            }}
            className="d-flex align-items-start position-fixed porsline-button c-btn-blue"
            href="#porsline-popup"
            onClick={() => {
              porslineOnClick("porsline-popup-iframe");
              showPopUp();
            }}
          >
            <NoteOutlinedIcon
              fontSize={"small"}
              style={{ transform: "rotate(90deg)" }}
              className={"ml-2"}
            />
            Survey
          </a>
          <p className="my-5 title">{user?.name || "User"} Dear, Hi</p>
          <div className="d-xl-flex align-items-start">
            <div className="col-xl-8 px-0 ">
              <div className="pl-xl-3">
                <p className="mb-3 title">Notifications</p>
                <div className="d-flex flex-wrap">
                  <div
                    className="notification-container px-0"
                    data-tour="new-call"
                  >
                    <NotificationCard
                      click={() => pushParamsToUrl(ADMIN_CONTACTS_MODAL)}
                      img={`/images/call-24px (4) 1.svg`}
                      title={
                        numberOfCalls
                          ? `${englishNumberToPersianNumber(
                              numberOfCalls
                            )} New click on the floating button you received.`
                          : "No new click on the floating button."
                      }
                      desktopMatches={desktopMatches}
                      badgeContent={numberOfCalls}
                    />
                  </div>
                  <div className="notification-container pr-5 pr-xl-3 pl-0">
                    <div data-tour="new-order">
                      <NotificationCard
                        click={() => {
                          if (
                            Object.keys(dashboardState).includes("order_step")
                          ) {
                            localStorage.setItem("order", "1");
                          }
                          pushParamsToUrl(ADMIN_ORDER_NOTIFICATIONS_MODAL);
                        }}
                        img={`/images/storefront-white.svg`}
                        title={
                          adminOrdersWidget?.ordersAmount &&
                          Object.keys(dashboardState).includes("order_step")
                            ? `You${englishNumberToPersianNumber(
                                adminOrdersWidget?.ordersAmount
                              )} You have a new order`
                            : "ﺳﻔﺎYou don't have a new rash."
                        }
                        desktopMatches={desktopMatches}
                        badgeContent={
                          (activeStep.name === "order_step" &&
                            isOpenWelcomeTips.newOrder) ||
                          localStorage.getItem("NEW_ORDER_ONBOARDING") ||
                          Object.keys(dashboardState).includes("order_step")
                            ? adminOrdersWidget?.ordersAmount
                            : 0
                        }
                      />
                    </div>
                  </div>
                  <div
                    className={`notification-container  ${
                      desktopMatches ? "px-0" : "pr-5"
                    }  my-0 my-xl-3`}
                    data-tour="new-updates"
                  >
                    <NotificationCard
                      click={() => {
                        localStorage.setItem(
                          IS_NEW_UPDATE_CARD_HAS_BEEN_CLICKED,
                          "true"
                        );
                        pushParamsToUrl(ADMIN_UPDATES_MODAL);
                      }}
                      img={`/images/update.svg`}
                      title={
                        isUserSeenUpdateCard
                          ? `You don't have a new update.`
                          : `You have a new update`
                      }
                      desktopMatches={desktopMatches}
                      badgeContent={!isUserSeenUpdateCard}
                    />
                  </div>
                </div>
                <p className="mt-5 mb-3 title">Checklists</p>
                <SetupSteps
                  desktopMatches={desktopMatches}
                  activeStep={activeStep}
                  urlPrefix={urlPrefix}
                  ActiveStepBtn={ActiveStepBtn}
                  skipStepTwo={skipStepTwo}
                  dashboardState={dashboardState}
                />
              </div>
              {dashboardState?.payment_step ? (
                <SuccessAutomation
                  _updateJourneyState={_updateJourneyState}
                  journeyData={journeyData}
                  _getJourneyState={_getJourneyState}
                  requestForVitrinPro={requestForVitrinPro}
                  siteDomain={siteDomain}
                  businessUrl={business.get_vitrin_absolute_url}
                />
              ) : null}
            </div>

            <div className="col-xl-4 px-0 pr-xl-3 pl-0">
              {dashboardState?.payment_step ? (
                <>
                  <p className="mb-3 title">Site settings settings</p>
                  <SetupSettingCard successState={success_state} />
                </>
              ) : null}

              <>
                {dashboardState?.payment_step ? (
                  <div className="mb-5">
                    <TargetingCard
                      target={target}
                      targetEndDate={targetEndDate}
                      targetStartDate={targetStartDate}
                      desktopMatches={desktopMatches}
                    />
                  </div>
                ) : null}
                <div
                  className="mb-5 mt-md-0 mt-5"
                  style={{ order: dashboardState?.payment_step ? 2 : 0 }}
                >
                  <p className="mb-3 title">
                    See this video before you start!
                  </p>

                  <video className="w-100 d-flex u-border-radius-8" controls>
                    <source src="https://hs3-cdn-saas.behtarino.com/static/panel/onboarding/final.mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </>
              <div className="mb-5">
                <p className="mb-3 title">Site Launch Training on Showcase</p>
                <div
                  className="p-4"
                  style={{
                    boxShadow: desktopMatches
                      ? "0px 4px 4px rgba(0, 0, 0, 0.1)"
                      : "none",
                    borderRadius: 8,
                    backgroundColor: "#fff",
                  }}
                >
                  <div>
                    <VideoSlider
                      videos={sortedLessons?.filter(
                        (lesson) => lesson.plugin === BASE_PLUGIN
                      )}
                      title="Complete the original information"
                    />
                  </div>
                  <>
                    <hr className="hr-normal mt-2 mb-4" />
                    <div>
                      <VideoSlider
                        videos={sortedLessons?.filter(
                          (lesson) => lesson.plugin === SHOPPING_PLUGIN
                        )}
                        title="Store settings"
                      />
                    </div>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SuccessMessageModal
          isOpen={successMessage.isOpen}
          onClose={() =>
            setSuccessMessage({ isOpen: false, title: "", content: "" })
          }
          next={() => {
            _getJourneyState();
            setSuccessMessage({ isOpen: false, title: "", content: "" });
            const query = { ...router.query };
            delete query.consultation;
            delete query.upgrade;
            router.push({ pathname: router.pathname, query });
          }}
          title={successMessage.title}
          content={successMessage.content}
          image={successMessage.image}
        />
        <BusinessInfoModal
          isOpen={isOpenBussinesInfoModal}
          onClose={() => setIsOpenBussinesInfoModal(false)}
        />
        <Tour
          steps={newOrderOnboarding}
          isOpen={isOpenWelcomeTips.newOrder}
          className={"tour"}
          showCloseButton={false}
          showNumber={false}
          onRequestClose={() => setIsOpenWelcomeTips({})}
          rounded={5}
          showButtons={false}
          showNavigationNumber={false}
          showNavigation={false}
          disableInteraction
          disableDotsNavigation
          onAfterOpen={(target) => disableBodyScroll(target)}
          onBeforeClose={(target) => enableBodyScroll(target)}
        />
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  urlPrefix: makeSelectAdminUrlPrefix(),
  lessons: makeSelectCMSLessons(),
  journeyData: makeSelectJourneyState(),
  business: makeSelectBusiness(),
  siteDomain: makeSelectBusinessSiteDomain(),
  user: makeSelectUser(),
  shoppingPluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  adminOrdersWidget: makeSelectAdminOrdersWidget(),
  reportCallRequests: makeSelectReportCallRequest(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getCMSLessons: () => dispatch(getCMSLessons()),
    _getJourneyState: () => dispatch(getJourneyState()),
    _updateJourneyState: (data, callback) =>
      dispatch(updateJourneyState(data, callback)),
    _getReportCallRequests: () => dispatch(getReportsCallRequests()),
    _createAutomaticConsultationRequest: (data, callback) =>
      dispatch(automaticConsultationRequest(data, callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(VitrinDashboard);
