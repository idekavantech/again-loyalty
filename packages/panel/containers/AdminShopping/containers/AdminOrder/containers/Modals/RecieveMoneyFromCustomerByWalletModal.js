import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { graphite, night } from "@saas/utils/colors";
import useTheme from "@material-ui/core/styles/useTheme";

function RecieveMoneyFromCustomerByWalletModal({
  order,
  isOpen,
  onClose,
  submit,
  isLoading,
  userGiftCredit,
}) {
  const theme = useTheme();
  return (
    <Dialog open={isOpen} onClose={onClose} PaperProps={{ className: "w-100" }}>
      <DialogContent className="mb-2 w-100">
        <div style={{ color: night, fontWeight: 500 }}>Receive from the wallet</div>
        {userGiftCredit >= order?.should_pay ? (
          <div className="mt-4" style={{ color: graphite }}>
            If agreed with the customer, the desired amount is deducted from the customer's wallet.
            Are you sure of doing this?
          </div>
        ) : (
          <div className="mt-4" style={{ color: graphite }}>
            Credit of the wallet is not sufficient, in case of deduction of credit continues to pay
            Unattended, are you sure of the deduction of this credit?
          </div>
        )}
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
          style={{
            backgroundColor:
              userGiftCredit < order?.should_pay && theme.palette.error.main,
          }}
        >
          Confirm
        </Button>
        <Button
          onClick={onClose}
          color={`${userGiftCredit < order?.should_pay ? "error" : "primary"}`}
          className="u-box-shadow-none u-fontMedium"
          size="medium"
          style={{
            borderColor:
              userGiftCredit < order?.should_pay && theme.palette.error.main,
            color: userGiftCredit < order?.should_pay && theme.palette.error.main,
            marginLeft: userGiftCredit < order?.should_pay && 0,
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(RecieveMoneyFromCustomerByWalletModal);
