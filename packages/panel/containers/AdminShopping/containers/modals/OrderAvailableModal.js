/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { memo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

function OrderAvailableModal({ onClose, isOpen, submit }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Your online ordering system becomes unacceptable.Are you sure?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={submit} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
const withConnect = connect(null, null);
export default compose(withConnect, memo)(OrderAvailableModal);
