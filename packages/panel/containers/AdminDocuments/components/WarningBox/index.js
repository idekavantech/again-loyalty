import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";

const WarningBox = ({ text }) => {
  return (
    <div className="warning-box p-3 d-flex align-items-center">
      <ReportProblemOutlinedIcon className="icon" />
      <span className="mr-2">{text}</span>
    </div>
  );
};

export default WarningBox;
