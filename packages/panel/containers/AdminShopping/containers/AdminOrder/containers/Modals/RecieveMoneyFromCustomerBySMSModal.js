import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { graphite, night } from "@saas/utils/colors";

function RecieveMoneyFromCustomerBySMSModal({
  isOpen,
  onClose,
  submit,
  isLoading,
}) {
  return (
    <Dialog open={isOpen} onClose={onClose} PaperProps={{ className: "w-100" }}>
      <DialogContent className="mb-2 w-100">
        <div style={{ color: night, fontWeight: 500 }}>Payment link SMS</div>
        <div className="mt-4" style={{ color: graphite }}>
          If agreed with the customer, the online payment link for the customer texts and then
          From making an order payment automatically to pay the status change
          Finds.
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

export default memo(RecieveMoneyFromCustomerBySMSModal);
