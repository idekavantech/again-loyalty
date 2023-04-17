import useMediaQuery from "@material-ui/core/useMediaQuery";
import React, { memo, useState, useRef, useMemo, useEffect } from "react";
import StepSlides from "./components/StepSlides";
import StepCard from "./components/StepCard";
import TargetingModal from "./components/TargetingModal";
import { steps } from "./constant";
import { Collapse } from "react-collapse";
import LazyImage from "@saas/components/LazyImage";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { useSelector } from "react-redux";

const SuccessAutomation = ({
  _updateJourneyState,
  journeyData,
  _getJourneyState,
  siteDomain,
  businessUrl,
}) => {
  const adminUrlPrefix = useSelector(makeSelectAdminUrlPrefix());
  const [activeStep, setActiveStep] = useState(0);
  const [isOpenTargetingModal, setIsOpenTargetingModal] = useState(false);
  const [isOpenCollapses, setIsOpenCollapses] = useState({
    showSuccessAutomaitionCard: true,
    showStepSlides: false,
  });
  const desktopMatches = useMediaQuery("(min-width:768px)");
  const tabletMatches = useMediaQuery("(min-width:992px)");

  const success_state = journeyData?.vitrin_journey_state?.success_state || {};
  const target_data = journeyData?.vitrin_journey_state.target || {};
  const scrollRef = useRef(null);

  const doingSteps = (step) => {
    if (!success_state?.[step]) {
      _updateJourneyState(
        {
          success_state: {
            ...success_state,
            [step]: 1,
          },
        },
        () => {
          goToNextStep();
          _getJourneyState();
        }
      );
    }
  };

  const goToNextStep = () => {
    if (completedSteps !== 18) {
      if (scrollRef.current.scrollWidth > scrollRef.current.clientWidth)
        scrollRef.current.scrollTo({
          left: scrollRef.current.scrollLeft - (tabletMatches ? 100 : 78),
          behavior: "smooth",
        });
      setActiveStep(activeStep + 1);
    }
  };

  const goToPrevStep = () => {
    scrollRef.current.scrollTo({
      left: scrollRef.current.scrollLeft + (tabletMatches ? 100 : 78),
      behavior: "smooth",
    });
    setActiveStep(activeStep - 1);
  };

  const completedSteps = useMemo(() => {
    return steps.reduce((state, plugin) => {
      if (success_state) {
        return success_state?.[plugin.type] ? state + 1 : state;
      } else {
        return 0;
      }
    }, 0);
  }, [success_state]);

  const targetSetting = (data, callback) => {
    _updateJourneyState(
      {
        target: data,
      },
      callback
    );
  };

  const currentStep = useMemo(() => {
    return (
      steps.indexOf(
        steps.find(
          (step) =>
            success_state?.[step.type] === 0 || !success_state?.[step.type]
        )
      ) + 1 || 0
    );
  }, [success_state]);

  useEffect(() => {
    setActiveStep(currentStep - 1);
    if (currentStep) {
      scrollRef.current.scrollTo({
        left: tabletMatches
          ? -(currentStep - 1) * 100
          : -(currentStep - 1) * 78,
        behavior: "smooth",
      });
    }
  }, [currentStep, tabletMatches]);

  return (
    <div className="dashborad-staps-container py-4 px-2 mt-3  px-md-4 ml-xl-3 mb-5">
      <div
        className="d-flex justify-content-between align-items-center cursor-pointer"
        onClick={() =>
          setIsOpenCollapses({
            ...isOpenCollapses,
            showSuccessAutomaitionCard:
              !isOpenCollapses.showSuccessAutomaitionCard,
          })
        }
      >
        <div className="d-flex align-items-center">
          <h2
            style={{
              color: "#000000de",
              fontSize: desktopMatches ? 20 : 15,
              fontWeight: 500,
            }}
          >
            How to become a successful site?
          </h2>
        </div>
        <div
          className="d-flex align-items-center justify-content-center mr-2"
          style={{
            transition: "all 0.5s",
            transform: isOpenCollapses.showSuccessAutomaitionCard
              ? "rotate(180deg)"
              : "rotate(0deg)",
            color: "rgba(0, 0, 0, 0.12)",
          }}
        >
          <KeyboardArrowDownRoundedIcon style={{ fontSize: 36 }} />
        </div>
      </div>
      <Collapse isOpened={isOpenCollapses.showSuccessAutomaitionCard}>
        {completedSteps === steps.length ? (
          <div className="px-2 mt-2 pb-5  d-flex align-items-center">
            <p
              style={{
                color: "rgba(0, 0, 0, 0.87)",
                fontSize: desktopMatches ? 16 : 11,
                lineHeight: desktopMatches ? "24px" : "20px",
              }}
            >
              Congratulations now have a professional site! All the steps of conversion
              To a successful site you have done thoroughly.
            </p>
            <LazyImage
              className="mr-2"
              width={desktopMatches ? 246 : 158}
              height={desktopMatches ? 200 : 121}
              src={`/images/onboarding-success.svg`}
            />
          </div>
        ) : (
          <p
            className="px-2 mt-2 pb-5"
            style={{
              color: "rgba(0, 0, 0, 0.87)",
              fontSize: desktopMatches ? 16 : 11,
              lineHeight: desktopMatches ? "24px" : "20px",
            }}
          >
            If you want to succeed in online sales in a shorter time, from checklist
            You can get help below. In this list, the most important steps that sites
            The other best -selling has been brought.
          </p>
        )}

        <div className="w-100 d-flex align-items-baseline">
          <div
            className="flex-1 d-flex justify-content-start mt-3"
            style={{ height: 6, backgroundColor: "#0050ff99" }}
          >
            <div
              style={{
                width: `${((completedSteps * 100) / 19).toFixed(0)}%`,
                backgroundColor: completedSteps !== 19 ? "#0050ff" : "#00A47C",
                height: "100%",
              }}
            ></div>
          </div>
          <span className="mr-2">
            {englishNumberToPersianNumber(
              ((completedSteps * 100) / 19).toFixed(0)
            )}
            ٪
          </span>
        </div>
        {completedSteps === steps.length ? (
          <>
            {" "}
            <div
              className="d-flex justify-content-between align-items-center mr-2 mt-4 cursor-pointer"
              style={{
                fontSize: desktopMatches ? 16 : 10,
                color: "rgba(0, 0, 0, 0.6)",
              }}
              onClick={() =>
                setIsOpenCollapses({
                  ...isOpenCollapses,
                  showStepSlides: !isOpenCollapses.showStepSlides,
                })
              }
            >
              <span>
                {isOpenCollapses.showStepSlides
                  ? "Hide guidance steps"
                  : "Re -display guide steps"}
              </span>
              <div
                className="d-flex align-items-center justify-content-center mr-2"
                style={{
                  transition: "all 0.5s",
                  transform: isOpenCollapses.showStepSlides
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              >
                <KeyboardArrowDownRoundedIcon />
              </div>
            </div>
            <Collapse isOpened={isOpenCollapses.showStepSlides}>
              <StepSlides
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                scrollRef={scrollRef}
                goToNextStep={goToNextStep}
                goToPrevStep={goToPrevStep}
                success_state={success_state}
                completedSteps={completedSteps}
              />
              <StepCard
                activeStep={activeStep}
                doingSteps={doingSteps}
                success_state={success_state}
                completedSteps={completedSteps}
                setIsOpenTargetingModal={setIsOpenTargetingModal}
                siteDomain={siteDomain}
                businessUrl={businessUrl}
                urlPrefix={adminUrlPrefix}
              />
            </Collapse>
          </>
        ) : (
          <>
            <StepSlides
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              scrollRef={scrollRef}
              goToNextStep={goToNextStep}
              goToPrevStep={goToPrevStep}
              success_state={success_state}
              completedSteps={completedSteps}
            />
            <StepCard
              activeStep={activeStep}
              doingSteps={doingSteps}
              success_state={success_state}
              completedSteps={completedSteps}
              setIsOpenTargetingModal={setIsOpenTargetingModal}
              siteDomain={siteDomain}
              businessUrl={businessUrl}
              urlPrefix={adminUrlPrefix}
            />
          </>
        )}
      </Collapse>
      <TargetingModal
        isOpen={isOpenTargetingModal}
        onClose={() => setIsOpenTargetingModal(false)}
        targetSetting={targetSetting}
        target_data={target_data}
      />
    </div>
  );
};
export default memo(SuccessAutomation);
