import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { actions, text } from "@saas/utils/colors";
import IconButton from "@material-ui/core/IconButton";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

export default function ConfirmFinishCashDrawer({ isOpen, onClose, submit }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <div className="d-flex align-items-center mb-4">
          <IconButton
            onClick={onClose}
            style={{ height: 35, width: 35 }}
            className="ml-2"
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
          <div className="u-fontWeightHeavy u-fontLarge">Funds not checked</div>
        </div>
        <DialogContentText>
          {`You did not enter the actual amount in the fund. In this case, the fund to mode
          "`}
          <span className="u-fontWeightHeavy" style={{ color: text.critical }}>
            Not checked
          </span>
          {`" Is placed and you can close the fund history section
          do.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions className="p-4">
        <Button
          variant="contained"
          style={{
            backgroundColor: actions.primary.disabled,
            color: text.disabled,
          }}
          onClick={onClose}
          className="ml-2 u-box-shadow-none"
        >
          Cancellation
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            onClose();
            submit();
          }}
          color="primary"
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
