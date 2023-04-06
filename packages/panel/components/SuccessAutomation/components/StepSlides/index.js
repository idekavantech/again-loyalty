import React, { useState, useEffect } from "react";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { steps } from "components/SuccessAutomation/constant";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";
const StepSlides = React.forwardRef(
  ({
    activeStep,
    setActiveStep,
    scrollRef,
    goToNextStep,
    goToPrevStep,
    success_state,
    completedSteps,
  }) => {
    const desktopMatches = useMediaQuery("(min-width:992px)");
    const [buttonDisabled, setButtonDisabled] = useState({
      left: false,
      right: true,
    });

    useEffect(() => {
      setButtonDisabled({
        left: activeStep === steps.length - 1,
        right: activeStep === 0,
      });
    }, [activeStep]);

    return (
      <div
        className="d-flex justify-content-center position-relative"
        style={{ direction: "ltr" }}
      >
        <div
          style={{
            width: desktopMatches ? 500 : 234,
            color: "#000",
            marginTop: 10,
          }}
        >
          <div
            className="d-flex direction-rtl mobileSlider"
            style={{ width: "100%", overflowX: "scroll" }}
            ref={scrollRef}
            onScroll={() => {
              setButtonDisabled({
                left: activeStep == 18,
                right: activeStep == 0,
              });
            }}
          >
            <button
              className="position-absolute"
              style={{
                top: 30,
                right: 10,
                display: buttonDisabled.right ? "none" : "block",
              }}
              onClick={goToPrevStep}
            >
              <NavigateNextIcon />
            </button>
            <button
              className="position-absolute"
              style={{
                top: 30,
                left: 10,
                display: buttonDisabled.left ? "none" : "block",
              }}
              onClick={goToNextStep}
            >
              <ChevronLeftIcon />
            </button>
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`d-flex flex-column align-items-center p-2 ${
                  activeStep === index
                    ? completedSteps === steps.length
                      ? "complete-active-step"
                      : "active-step"
                    : ""
                }`}
                style={{
                  width: desktopMatches ? 100 : 78,
                }}
                onClick={() => setActiveStep(index)}
              >
                {success_state?.[step.type] ? (
                  <CheckCircleIcon
                    style={{
                      contSize: 20,
                      color:
                        activeStep === index
                          ? completedSteps == 19
                            ? "#00A47C"
                            : "#0050ff"
                          : "#00000099",
                    }}
                  />
                ) : (
                  <CheckCircleOutlinedIcon
                    style={{
                      contSize: 20,
                      color: activeStep === index ? "#0050ff" : "#00000099",
                    }}
                  />
                )}

                <span
                  className="mt-2 text-center"
                  style={{
                    width: desktopMatches ? 100 : 78,
                    color:
                      activeStep === index
                        ? completedSteps == 19
                          ? "#00A47C"
                          : "#0050ff"
                        : "#00000099",
                  }}
                >
                  گام {englishNumberToPersianNumber(index + 1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

StepSlides.displayName = "StepSlides";
export default StepSlides;
