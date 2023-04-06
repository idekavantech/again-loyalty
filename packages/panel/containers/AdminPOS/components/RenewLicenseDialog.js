import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { icon, text } from "@saas/utils/colors";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";

function RenewLicenseDialog({ isOpen, onClose, submit, isLoading }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        className: "w-100",
        style: { maxWidth: 460, color: text.default },
      }}
    >
      <DialogContent className="mb-2 w-100">
        <div
          style={{ borderBottom: "1px solid #EDEDED" }}
          className="d-flex align-items-center flex-1 pb-4"
        >
          <InfoRoundedIcon style={{ color: icon.warning }} className="ml-2" />
          <div className="u-fontLarge u-fontWeightHeavy">Re -structure the code</div>
        </div>
        <div className="mt-5">
          If you make a new code for your device, all devices from the code
          Previously used the account and each to re -enter to
          Account, must use the new code.
        </div>
      </DialogContent>
      <DialogActions className="d-flex align-items-center justify-content-between p-4">
        <div className="u-fontLarge u-fontWeightHeavy">
          Are you sure of changing the device code?
        </div>
        <div className="d-flex align-items-center ml-0">
          <Button
            onClick={onClose}
            variant="contained"
            color="disabled"
            className="u-box-shadow-none u-fontMedium"
            size="medium"
            style={{ color: text.disabled }}
          >
            Cancellation
          </Button>
          <Button
            onClick={submit}
            variant="contained"
            color="primary"
            className="u-box-shadow-none u-fontMedium mr-3"
            size="medium"
            disabled={isLoading}
          >
            Confirm
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default memo(RenewLicenseDialog);
