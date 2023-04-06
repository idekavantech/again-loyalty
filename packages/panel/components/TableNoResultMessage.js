import { dust } from "@saas/utils/colors";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

const TableNoResultMessage = ({
  title,
  description = "با تغییر فیلترها دوباره امتحان کنید",
  submitAction,
  buttonText,
}) => {
  return (
    <div className="d-flex mt-5 mb-2 justify-content-center align-items-center flex-1 flex-column mb-2">
      <div
        style={{ width: 66 }}
        className="d-flex align-items-center justify-content-center"
      >
        <SearchRoundedIcon style={{ fontSize: 48, color: dust }} />
      </div>
      <div className="d-flex flex-column flex-1 mt-3">
        <div className="u-text-graphite text-center">{title}</div>

        <div className="u-fontNormal text-center mt-2 px-5 u-text-darkest-grey">
          {description}
        </div>
      </div>
      {buttonText && submitAction && (
        <Button
          color="primary"
          onClick={submitAction}
          variant="contained"
          className="flex-1 mt-1"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

TableNoResultMessage.PropTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  submitAction: PropTypes.func,
};

export default TableNoResultMessage;
