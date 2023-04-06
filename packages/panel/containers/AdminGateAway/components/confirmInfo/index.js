import { Button } from "@material-ui/core";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
const ConfirmInfo = ({ submit }) => {
  return (
    <div>
      <p className="pt-3 mt-2">
        Zibal Team Expert, to coordinate to get a bank payment gateway with you
        Will call. The status of the attachment to the Zibal payment gateway through this section
        You can follow.
      </p>
      <div className="success-box d-flex align-items-center">
        <CheckCircleOutlineOutlinedIcon className="icon" />
        <span className="mr-3">
          Your information was successfully sent to the Zibal team.
        </span>
      </div>
      <Button
        variant="contained"
        color="primary"
        className="w-100 mt-4 dashboard_buttons"
        size="large"
        onClick={submit}
      >
        Confirm
      </Button>
    </div>
  );
};

export default ConfirmInfo;
