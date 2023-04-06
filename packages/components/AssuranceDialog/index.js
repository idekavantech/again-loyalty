import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

export default function AssuranceDialog({
  isOpen,
  closeDialogHandler,
  contentText,
  dialogMainActions,
  dialogMainActionText,
  dialogSecondActions,
  dialogSecondActionText,
  dialogSecondActionTextColor = "secondary",
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={closeDialogHandler}
      style={{ zIndex: 10000 }}
    >
      <DialogContent style={{ maxWidth: 560, width: "100%", zIndex: 500 }}>
        <DialogContentText id="alert-dialog-description">
          {contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={dialogSecondActions} color="disabled">
          {dialogSecondActionText}
        </Button>
        <Button
          variant="outlined"
          onClick={dialogMainActions}
          color={dialogSecondActionTextColor}
        >
          {dialogMainActionText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
