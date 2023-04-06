import React, { memo } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Snackbar from "@material-ui/core/Snackbar";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import { makeSelectSnackBarMessage } from "@saas/stores/ui/selector";
import useTheme from "@material-ui/core/styles/useTheme";

function CustomSnackBar({ snackBarMessage, _setSnackBarMessage }) {
  const theme = useTheme();
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      classes={{
        anchorOriginBottomLeft: `snackbar ${
          snackBarMessage.type === "success" && "snackbar-success"
        } ${snackBarMessage.type === "fail" && "snackbar-fail"}`,
      }}
      ContentProps={{
        style: {
          backgroundColor: theme.palette.secondary.main,
          color: "white",
        },
      }}
      disableWindowBlurListener
      autoHideDuration={4000}
      open={Boolean(snackBarMessage.message)}
      onClose={(evt, reason) => {
        if (reason !== "clickaway")
          _setSnackBarMessage("", snackBarMessage.type);
      }}
      message={snackBarMessage.message}
    />
  );
}

const mapStateToProps = createStructuredSelector({
  snackBarMessage: makeSelectSnackBarMessage(),
});
function mapDispatchToProps(dispatch) {
  return {
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CustomSnackBar);
