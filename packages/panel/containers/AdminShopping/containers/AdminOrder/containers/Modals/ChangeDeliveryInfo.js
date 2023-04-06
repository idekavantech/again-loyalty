import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
export function ChangeDeliveryInfo({
  isOpen,
  onClose,
  submit,
  isLoading,
}) {
  return (
    <Dialog open={isOpen} onClose={onClose} PaperProps={{ className: "w-100" }}>
      <DialogContent>
        <DialogContentText>Hello</DialogContentText>
      </DialogContent>
      <DialogActions className="d-flex flex-column align-items-center justify-content-center px-4">
        <Button
          onClick={submit}
          variant="contained"
          color="primary"
          className="w-100 mb-2 u-box-shadow-none u-fontMedium"
          size="large"
          disabled={isLoading}
        >
          Confirm the order
        </Button>
        <Button
          onClick={onClose}
          variant="outlined"
          color="primary"
          className="w-100 ml-0 u-box-shadow-none u-fontMedium"
          size="large"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(ChangeDeliveryInfo);
