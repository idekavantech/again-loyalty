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
          {business.revised_title} نیاز به دسترسی مکان‌یاب شما دارد، اجازه
          دسترسی می‌دهید؟
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="disabled">
          انصراف
        </Button>
        <Button onClick={getAccess} color="secondary">
          دسترسی
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(LocationAccessPopup);
