import { Button } from "@material-ui/core";
import { steps } from "components/SuccessAutomation/constant";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DoneIcon from "@mui/icons-material/Done";
import { useRouter } from "next/router";
import Link from "next/link";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";
import { ADMIN_VITRIN_PRO_MODAL } from "@saas/stores/ui/constants";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

const StepCard = ({
  activeStep,
  doingSteps,
  success_state,
  completedSteps,
  setIsOpenTargetingModal,
  siteDomain,
  businessUrl,
  urlPrefix,
}) => {
  const step = steps[activeStep];
  const desktopMatches = useMediaQuery("(min-width:768px)");
  const router = useRouter();

  return (
    <>
      <div
        className="p-5 u-border-radius-8"
        style={{
          backgroundColor:
            completedSteps == 19 ? "rgba(46, 125, 50, 0.04)" : "#F5F8FF",
          color: "#202223",
        }}
      >
        <h1 style={{ fontSize: desktopMatches ? 16 : 13, lineHeight: "16px" }}>
          {`${englishNumberToPersianNumber(activeStep + 1)}- ${step?.title}`}
        </h1>
        {step?.type !== "targeting" &&
        step?.type !== "traffic_channels" &&
        step?.type !== "pages" ? (
          <p
            className="mt-4"
            style={{
              fontSize: desktopMatches ? 16 : 12,
              lineHeight: desktopMatches ? "24px" : "20px",
            }}
            dangerouslySetInnerHTML={{
              __html: step?.description(siteDomain, businessUrl),
            }}
          ></p>
        ) : step?.type == "targeting" ? (
          <p
            className="mt-4"
            style={{
              fontSize: desktopMatches ? 16 : 12,
              lineHeight: desktopMatches ? "24px" : "20px",
            }}
          >
            Your success is important in the showcase. For this reason, it is suggested
            <span
              className="cursor-pointer"
              onClick={() => setIsOpenTargetingModal(true)}
              style={{ color: "#0050FF" }}
            >
              {" "}
              From this section{" "}
            </span>
            Use and target for your monthly sale so you can in
            Dashboard Page View your progress every day.{" "}
          </p>
        ) : step?.type == "pages" ? (
          <p
            className="mt-4"
            style={{
              fontSize: desktopMatches ? 16 : 12,
              lineHeight: desktopMatches ? "24px" : "20px",
            }}
          >
            Before starting online ordering, it is better to store important stores like
            Online ordering page, first page and page of each product make and edit each product page
            Have. <br />
            This can be done in the section{" "}
            <Link
              target="_blank"
              style={{ color: "#0050ff" }}
              href={`/admin/${router.query.site_domain}/appearance/pages`}
            >
              Appearance
            </Link>{" "}
            Do it. If you want these pages professionally and dedicated to
            You are designed, of{" "}
            <span
              className="cursor-pointer"
              onClick={() => pushParamsToUrl(ADMIN_VITRIN_PRO_MODAL)}
              style={{ color: "#0050FF" }}
            >
              Peruvian showcase
            </span>{" "}
            Get help.
          </p>
        ) : (
          <p
            className="mt-4"
            style={{
              fontSize: desktopMatches ? 16 : 12,
              lineHeight: desktopMatches ? "24px" : "20px",
            }}
          >
            By connecting online store to sites like«Bestino»،«Radiad» And
            «Imals» You can put your products right in front of the users' eyes
            Who are looking for products similar to your products on the Internet.
            <Link href={`${urlPrefix}/sales_channels`} passHref>
              <span className="cursor-pointer" style={{ color: "#0050FF" }}>
                in this part{" "}
              </span>
            </Link>{" "}
            You can see the list of support channels supported in the showcase
            And find out more about connecting the site to these channels.
          </p>
        )}

        {step?.warning_text ? (
          <div
            className="p-4  u-border-radius-8 mt-4 d-flex align-items-start"
            style={{
              backgroundColor: "#FFF3E0",
              border: "1px dashed rgba(0, 0, 0, 0.38)",
            }}
          >
            <ReportProblemOutlinedIcon
              style={{
                color: "rgba(0, 0, 0, 0.6)",
              }}
            />
            <p
              className="mr-3"
              dangerouslySetInnerHTML={{
                __html: step?.warning_text(siteDomain),
              }}
              style={{ fontSize: desktopMatches ? 16 : 12 }}
            ></p>
          </div>
        ) : null}
        <div className="mt-4 d-flex justify-content-end">
          {step?.type === "encouragement" ? (
            <Link target="_blank" href="https://dobare.me/">
              <Button
                className="dashboard_buttons"
                style={{
                  color: "#9C27B0",
                  border: "1px solid #9C27B0",
                  width: 132,
                }}
              >
                {`"Again" What is?`}
              </Button>
            </Link>
          ) : null}
          {step?.type === "advertise" ? (
            <Link target="_blank" href="https://atro.agency/">
              <Button
                className="dashboard_buttons"
                color="primary"
                variant="outlined"
              >
                Digital marketing advice
              </Button>
            </Link>
          ) : null}
          {success_state?.[step?.type] ? (
            <Button
              className="dashboard_buttons mr-2"
              style={{
                backgroundColor:
                  completedSteps === steps.length ? "#00A47C" : "#0050FF",
                boxShadow:
                  "0px 1px 5px rgba(0, 0, 0, 0.12), inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
              color="primary"
              variant="contained"
            >
              <DoneIcon />
            </Button>
          ) : (
            <Button
              className="dashboard_buttons mr-2"
              color="primary"
              variant="contained"
              onClick={() => doingSteps(step?.type)}
            >
              I did
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
export default StepCard;
