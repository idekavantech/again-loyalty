import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { graphite, night } from "@saas/utils/colors";

export function ReceiveOrderModal({ isOpen, onClose, submit, isLoading }) {
  return (
    <Dialog open={isOpen} onClose={onClose} PaperProps={{ className: "w-100" }}>
      <DialogContent className="mb-2 w-100">
        <div style={{ color: night, fontWeight: 500 }}>Pending</div>
        <div className="mt-4" style={{ color: graphite }}>
          Sure you want to make the status of this order being shifted
          ??
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
          size="medium"
          disabled={isLoading}
        >
          Confirm
        </Button>
        <Button
          onClick={onClose}
          variant="outlined"
          color="primary"
          className="u-box-shadow-none u-fontMedium"
          size="medium"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(ReceiveOrderModal);
