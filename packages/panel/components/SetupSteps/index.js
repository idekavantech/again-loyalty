import React, { useState } from "react";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import Progress from "components/Progress";
import { dashboardActivationSteps } from "store/constants";
import { Collapse } from "react-collapse";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import StepsCard from "components/StepsCard";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";

const SetupSteps = ({
  desktopMatches,
  activeStep,
  urlPrefix,
  ActiveStepBtn,
  skipStepTwo,
  dashboardState,
}) => {
  const [isOpenCollapses, setIsOpenCollapses] = useState({
    showStepsCard: true,
    showDoneSteps: false,
  });

  const steps = dashboardActivationSteps[SHOPPING_PLUGIN];
  return (
    <div className="p-4  dashborad-staps-container mb-5">
      <div
        data-tour="setup"
        className="w-100 d-flex justify-content-between cursor-pointer align-items-center"
        onClick={() =>
          setIsOpenCollapses({
            ...isOpenCollapses,
            showStepsCard: !isOpenCollapses.showStepsCard,
          })
        }
      >
        <p className="title">Steps to set up your online store</p>
        <div
          className="d-flex align-items-center justify-content-center mr-2"
          style={{
            transition: "all 0.5s",
            transform: isOpenCollapses.showStepsCard
              ? "rotate(180deg)"
              : "rotate(0deg)",
            color: "rgba(0, 0, 0, 0.12)",
          }}
        >
          <KeyboardArrowDownRoundedIcon style={{ fontSize: 36 }} />
        </div>
      </div>
      <Collapse isOpened={isOpenCollapses.showStepsCard}>
        <div className="d-flex justify-content-between align-items-center my-4 pb-4 px-4">
          <p
            style={{
              color: "rgba(0, 0, 0, 0.87)",
              fontSize: desktopMatches ? 16 : 11,
            }}
          >
            {steps.length + 1 - activeStep.number === 0 ? (
              "Congratulations, you have successfully taken all steps!"
            ) : (
              <div className="text-right">
                single
                <span
                  className="mx-1"
                  style={{ fontSize: 15, fontWeight: 600 }}
                >
                  {englishNumberToPersianNumber(
                    steps.length + 1 - activeStep.number
                  )}
                </span>
                Another simple step
                <br />
                Left for your successful start
              </div>
            )}
          </p>

          <Progress
            percent={
              Math.ceil((activeStep.number / (steps.length + 1)) * 100)
              // stepsProgress?.find((active) => active.step == activeStep - 1)
              //   ?.percent || 0
            }
          />
        </div>

        {activeStep.number > 1 ? (
          <>
            <div
              className="d-flex align-items-center mr-2 mt-4 cursor-pointer"
              style={{
                fontSize: desktopMatches ? 16 : 10,
                color: "#CCCCCC",
              }}
              onClick={() =>
                setIsOpenCollapses({
                  ...isOpenCollapses,
                  showDoneSteps: !isOpenCollapses.showDoneSteps,
                })
              }
            >
              <span>
                {isOpenCollapses.showDoneSteps
                  ? "Non -display of steps taken"
                  : "Show steps taken"}
              </span>
              <div
                className="d-flex align-items-center justify-content-center mr-2"
                style={{
                  transition: "all 0.5s",
                  transform: isOpenCollapses.showDoneSteps
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              >
                <KeyboardArrowDownRoundedIcon />
              </div>
            </div>
            <Collapse isOpened={isOpenCollapses.showDoneSteps}>
              {steps?.map((step, index) => {
                if (index + 1 < activeStep.number) {
                  return (
                    <StepsCard
                      key={step.name}
                      stepData={step}
                      activeStep={activeStep}
                      urlPrefix={urlPrefix}
                      stepNumber={index + 1}
                      buttons={ActiveStepBtn.find(
                        (item) => item.name === step.name
                      )}
                      skipStepTwo={skipStepTwo}
                      dashboardState={dashboardState}
                    />
                  );
                }
              })}
            </Collapse>

            {steps?.map((step, index) => {
              if (index + 1 >= activeStep.number) {
                return (
                  <StepsCard
                    key={step.name}
                    stepData={step}
                    activeStep={activeStep}
                    urlPrefix={urlPrefix}
                    stepNumber={index + 1}
                    buttons={ActiveStepBtn.find(
                      (item) => item.name === step.name
                    )}
                    skipStepTwo={skipStepTwo}
                    dashboardState={dashboardState}
                  />
                );
              }
            })}
          </>
        ) : (
          steps?.map((step, index) => {
            return (
              <StepsCard
                key={step.name}
                stepData={step}
                activeStep={activeStep}
                urlPrefix={urlPrefix}
                stepNumber={index + 1}
                buttons={ActiveStepBtn.find((item) => item.name === step.name)}
                skipStepTwo={skipStepTwo}
                dashboardState={dashboardState}
              />
            );
          })
        )}
      </Collapse>
    </div>
  );
};

export default SetupSteps;
