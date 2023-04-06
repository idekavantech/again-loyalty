import { MainInfoPageSteps } from "../constants";
import LinearProgress from "@material-ui/core/LinearProgress";
import { memo } from "react";

const ProgressBarMainInfoPage = ({ value }) => {
  return (
    <LinearProgress
      variant="determinate"
      value={((value - 1) / Object.keys(MainInfoPageSteps).length) * 100}
      style={{
        marginBottom: 15,
        transform: "rotate(180deg)",
      }}
    />
  );
};

export default memo(ProgressBarMainInfoPage);
