import useMediaQuery from "@material-ui/core/useMediaQuery";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

const StepsCard = ({
  stepData,
  activeStep,
  stepNumber,
  urlPrefix,
  buttons,
  skipStepTwo,
  dashboardState,
}) => {
  const desktopMatches = useMediaQuery("(min-width:768px)");
  const [showDescription, setShowDescription] = useState(false);
  const [showErrorMassage, setShowErrorMassage] = useState(false);
  const [text_error, setTextError] = useState("");
  const [isShowVideo, setIsShowVideo] = useState(false);
  const router = useRouter();

  return (
    <div
      className={` w-100 mt-3 ${
        stepNumber === activeStep.number ? "info-card" : ""
      } `}
      style={{
        borderRadius: 8,
        backgroundColor:
          activeStep.number >= stepNumber
            ? "rgba(0, 80, 255, 0.08)"
            : "#F6F6F7",
        paddingRight: stepNumber === activeStep.number ? 12 : 25,
        padding: desktopMatches ? 19 : 12,
        fontSize: desktopMatches ? 18 : 14,
      }}
    >
      <div
        className={`d-flex align-items-center ${
          stepNumber > 1 ? "u-cursor-pointer" : ""
        }`}
        onClick={() =>
          stepNumber > 1 ? setShowDescription(!showDescription) : null
        }
      >
        <span style={{ lineHeight: "28px" }}>{`${englishNumberToPersianNumber(
          stepNumber
        )}- ${stepData.title}`}</span>
        <CheckCircleRoundedIcon
          style={{
            width: desktopMatches ? 30 : 24,
            height: desktopMatches ? 30 : 24,
            marginRight: "auto",
            color:
              activeStep.number > stepNumber ||
              (dashboardState.payment_step && stepData.name === "payment_step")
                ? "#0050FF"
                : "#CCCCCC",
          }}
        />
      </div>
      {/* {stepData?.step == 4 && (
        <div className="first-order p-1 p-md-2 d-flex mt-3 justify-content-between align-items-center">
          <span className="ml-2">
            Once you have completed this step, you can ticket webinar tickets“Solutions to increase
            Sale of restaurants and cafes” Get the receipt.
          </span>
          <div className="d-flex align-items-cente" style={{ minWidth: 24 }}>
            <Image
              width={desktopMatches ? 24 : 24}
              height={desktopMatches ? 24 : 24}
              src={`/images/card-giftcard.svg`}
              alt="template"
            />
          </div>
        </div>
      )} */}
      {showDescription || stepNumber === activeStep.number ? (
        <div className="mt-3 mt-md-5">
          <div>
            <p
              style={{
                fontSize: desktopMatches ? 16 : 12,
                lineHeight: desktopMatches ? "24px" : "16px",
                paddingRight: desktopMatches ? 22 : 16,
              }}
            >
              {stepData.description}
            </p>
            <div className="d-flex flex-column-reverse justify-content-end mt-3 mt-md-5">
              {showErrorMassage || text_error ? (
                <div
                  className="w-100 d-flex align-items-center mt-4 p-3"
                  style={{
                    backgroundColor: "#FEEBEE",
                    border: "1px dashed #D32F2F",
                    borderRadius: 8,
                  }}
                >
                  <Image
                    alt=""
                    width={24}
                    height={24}
                    src={`/images/report-problem.svg`}
                  />
                  <span
                    className="mr-3"
                    style={{
                      fontSize: desktopMatches ? 12 : 10,
                      color: "#D82C0D",
                    }}
                  >
                    {text_error || "Complete the previous steps first."}
                  </span>
                </div>
              ) : null}
              {(buttons?.link || buttons?.action) &&
              stepData.name !== "payment_step" &&
              stepData.name !== "free_domain_state" ? (
                <div className="d-flex align-items-center justify-content-end">
                  {stepData?.video_link ? (
                    <Button
                      className="ml-2 dashboard_buttons"
                      color="primary"
                      variant="outlined"
                      onClick={() => setIsShowVideo(true)}
                      disabled={activeStep.number < stepNumber}
                    >
                      <PlayCircleFilledIcon />
                      <span className="mr-2">Help video</span>
                    </Button>
                  ) : null}
                  {buttons.extraBtn ? (
                    <Button
                      variant="outlined"
                      className="ml-2 dashboard_buttons"
                      color="primary"
                      onClick={() =>
                        router.push(`${urlPrefix}${buttons.extraBtn.link}`)
                      }
                    >
                      {buttons.extraBtn.text}
                    </Button>
                  ) : null}
                  <Button
                    className="dashboard_buttons"
                    style={{
                      boxShadow: "none",
                      backgroundColor:
                        activeStep.number >= stepNumber ? "#0050FF" : "#CCCCCC",
                      color: "#fff",
                      height: 38,
                      width: 78,
                    }}
                    onClick={() =>
                      activeStep.number >= stepNumber
                        ? buttons?.link
                          ? router.push(`${urlPrefix}${buttons.link}`)
                          : buttons.action()
                        : setShowErrorMassage(true)
                    }
                  >
                    Start
                  </Button>
                </div>
              ) : null}
              {stepData.name === "payment_step" ? (
                <div className="d-flex justify-content-end ">
                  <a
                    className="px-2 ml-2 d-flex justify-content-center align-items-center"
                    style={{
                      borderRadius: 8,
                      height: 38,
                      fontSize: 15,
                      fontWeight: 500,
                      color: "#0050FF",
                      border: "1px solid #0050FF",
                    }}
                    href="tel:02191070751"
                  >
                    {" "}
                    Call with support{" "}
                  </a>
                  <Button
                    className="dashboard_buttons"
                    style={{
                      boxShadow: "none",
                      backgroundColor: "#00A47C",
                      color: "#fff",
                      height: 38,
                      width: 78,
                    }}
                    onClick={() =>
                      !dashboardState?.payment_step
                        ? (window.location = buttons.link)
                        : setTextError("Your panel has already upgraded")
                    }
                  >
                    Upgrade
                  </Button>
                </div>
              ) : null}
              {stepData.name === "free_domain_state" ? (
                <div className="d-flex justify-content-end ">
                  <Button
                    className="px-3 ml-2 d-flex justify-content-center align-items-center dashboard_buttons"
                    style={{
                      height: 38,
                      color: "#0050FF",
                      border: "1px solid #0050FF",
                    }}
                    onClick={skipStepTwo}
                  >
                    Rejecting the stage
                  </Button>
                  <button
                    className="dashboard_buttons"
                    style={{
                      boxShadow: "none",
                      backgroundColor:
                        activeStep.number >= stepNumber ? "#0050FF" : "#CCCCCC",
                      color: "#fff",
                      height: 38,
                      width: 120,
                    }}
                    onClick={() =>
                      activeStep.number >= stepNumber
                        ? buttons.action()
                        : setShowErrorMassage(true)
                    }
                  >
                    Gift selection
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
      <Dialog
        open={isShowVideo}
        onClose={() => setIsShowVideo(false)}
        className="p-0 w-100"
        PaperProps={{ className: "m-2" }}
        maxWidth="md"
      >
        <DialogContent className="w-100 p-0">
          <video autoPlay className="w-100 d-flex" controls>
            <source src={stepData?.video_link} />
            Your browser does not support the video tag.
          </video>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StepsCard;
