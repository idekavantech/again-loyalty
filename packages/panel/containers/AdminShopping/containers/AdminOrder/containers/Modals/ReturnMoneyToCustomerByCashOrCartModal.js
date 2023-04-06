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

function ReturnMoneyToCustomerByCashOrCartModal({
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
        <div style={{ color: night, fontWeight: 500 }}>Pay to the customer</div>
        <div className="mt-4" style={{ color: graphite }}>
          <div>
            If agreed with the customer, the amount must{" "}
            {priceFormatter(moneyWhichShouldReturn)} $ to
            Return the customer.
          </div>
          <div>
            In this case, the customer's wallet's credit will not change, if confirmation
            Pay the status of this order will change to settlement.
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

export default memo(ReturnMoneyToCustomerByCashOrCartModal);
