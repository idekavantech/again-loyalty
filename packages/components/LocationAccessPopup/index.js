import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

function LocationAccessPopup({ business, getAccess, onClose }) {
  return (
    <Dialog
      open
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {business.revised_title} Requires your location access, permission
          Do you access?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="disabled">
          Candifying
        </Button>
        <Button onClick={getAccess} color="secondary">
          access
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(LocationAccessPopup);
