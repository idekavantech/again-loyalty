import LazyImage from "@saas/components/LazyImage";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import Progress from "components/Progress";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";
import { ADMIN_TARGETING_MODAL } from "@saas/stores/ui/constants";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";


const TargetingCard = ({
  target,
  targetStartDate,
  targetEndDate,
  desktopMatches,
}) => {
  return (
    <div
      className="p-2"
      style={{
        boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.12)",
        borderRadius: 8,
        backgroundColor: "#fff",
      }}
    >
      <div className="d-flex align-items-center">
        <LazyImage
          width={32}
          height={32}
          src={`/images/target.svg`}
        />
        <p
          className="mr-2"
          style={{
            color: "rgba(0, 0, 0, 0.87)",
            fontWeight: 500,
            fontSize: desktopMatches ? 20 : 16,
            lineHeight: "32px",
          }}
        >
          Progress in the target
        </p>
      </div>
      <div className="d-flex justify-content-between align-items-end">
        <div className="mb-md-3">
          <p
            className="mt-3"
            style={{ fontSize: desktopMatches ? 16 : 14, fontWeight: 500 }}
          >
            Target:{" "}
            <span
              style={{ fontWeight: 400, fontSize: desktopMatches ? 14 : 12 }}
            >
              {" "}
              {target.type == "order_count"
                ? `${englishNumberToPersianNumber(target?.value)} Order`
                : `${priceFormatter(target?.value)} Toman`}
            </span>
          </p>
          <p
            className="mt-3"
            style={{ fontSize: desktopMatches ? 16 : 14, fontWeight: 500 }}
          >
            Condition:{" "}
            <span
              style={{ fontWeight: 400, fontSize: desktopMatches ? 14 : 12 }}
            >
              {" "}
              {target.type == "order_count"
                ? `${englishNumberToPersianNumber(target?.current_value)} Order`
                : `${priceFormatter(target?.current_value)} Toman`}
            </span>
          </p>
        </div>
        <div className="d-flex  justify-content-center position-relative align-items-center ml-4 ml-md-2">
          <Progress
            percent={
              (target?.current_value > target?.value
                ? 100
                : ((target?.current_value || 0) * 100) / target?.value || 0
              ).toFixed(0) || 0
            }
          />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          style={{
            fontSize: desktopMatches ? 16 : 13,
            color: "#0050FF",
            lineHeight: "26px",
            fontWeight: 500,
          }}
          onClick={() => pushParamsToUrl(ADMIN_TARGETING_MODAL)}
        >
          {Object.keys(target).length == 0
            ? "Define a new goal"
            : "Observation or change of target"}{" "}
        </button>
        <p
          className="d-flex align-items-center"
          style={{ fontSize: desktopMatches ? 16 : 12, lineHeight: "24px" }}
        >
          <ChevronRightRoundedIcon style={{ fontSize: 20 }} />
          {targetStartDate && targetStartDate != "Invalid Date" ? (
            <span>
              {targetStartDate} until the{targetEndDate}
            </span>
          ) : (
            <span>
              <strong>period:</strong> Not specified
            </span>
          )}{" "}
          <KeyboardArrowLeftRoundedIcon style={{ fontSize: 20 }} />
        </p>
      </div>
    </div>
  );
};

export default TargetingCard;
