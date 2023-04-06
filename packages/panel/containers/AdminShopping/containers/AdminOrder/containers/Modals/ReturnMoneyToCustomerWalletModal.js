import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { graphite, night } from "@saas/utils/colors";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import {
  NEW_ORDER_STATUS_COMP,
  NEW_ORDER_STATUS_VOID,
} from "@saas/plugins/Shopping/constants";
function ReturnMoneyToCustomerWalletModal({
  order,
  isOpen,
  onClose,
  submit,
  isLoading,
}) {
  const moneyWhichShouldReturn =
  order?.order_status === NEW_ORDER_STATUS_VOID ||
  order?.order_status === NEW_ORDER_STATUS_COMP
    ? order?.paid_price
    : order?.paid_price - order?.total_price;
  return (
    <Dialog open={isOpen} onClose={onClose} PaperProps={{ className: "w-100" }}>
      <DialogContent className="mb-2 w-100">
        <div style={{ color: night, fontWeight: 500 }}>Transfer to the wallet</div>
        <div className="mt-4" style={{ color: graphite }}>
          <div>
            In case of agreement with the customer, the amount{" "}
            {priceFormatter(moneyWhichShouldReturn)} $ to
            Credit will be added to the customer's wallet.
          </div>
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

export default memo(ReturnMoneyToCustomerWalletModal);
