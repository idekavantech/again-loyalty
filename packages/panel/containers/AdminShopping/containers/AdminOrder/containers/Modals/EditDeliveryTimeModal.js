import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
function EditDeliveryTimeModal({
  isOpen,
  onClose,
  submit,
  isLoading,
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="w-100"
      PaperProps={{ className: "w-100" }}
    >
      <DialogContent className="p-4 w-100">
          <div className="d-flex align-items-center">
            Are you sure of editing the posting time?
          </div>
      </DialogContent>
      <DialogActions
        className="d-flex align-items-center justify-content-between p-4"
        style={{ borderTop: "1px solid #EDEDED" }}
      >
        <Button
          onClick={() => {
            submit();
            onClose();
          }}
          variant="contained"
          color="primary"
          className="u-box-shadow-none u-fontMedium"
          size="large"
          disabled={isLoading}
        >
          Confirm
        </Button>
        <Button
          onClick={onClose}
          variant="outlined"
          color="primary"
          className="mr-2 ml-0 u-box-shadow-none u-fontMedium"
          size="large"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(EditDeliveryTimeModal);
