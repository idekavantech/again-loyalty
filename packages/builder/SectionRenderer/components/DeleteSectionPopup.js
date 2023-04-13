import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
export default function DeleteSectionPopup({ open, onClose, submit }) {
  if (open)
    return (
      <Dialog
        open
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this section?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={submit} color="primary">
            Remove the section
          </Button>
          <Button onClick={onClose} color="primary" autoFocus>
            Candifying
          </Button>
        </DialogActions>
      </Dialog>
    );
  return null;
}
