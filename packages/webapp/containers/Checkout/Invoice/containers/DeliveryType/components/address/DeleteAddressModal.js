import React, { memo } from "react";

import {
  SELECT_ADDRESS_DRAWER,
  SELECT_ADDRESS_DROPDOWN,
} from "@saas/plugins/Shopping/constants";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

function DeleteAddressModal({
  isOpen,
  onClose,
  deleteAddress,
  orderInfo,
  addressId,
  toggleDropDown,
  UIDropDowns,
  toggleDrawer,
}) {
  const { minWidth768 } = useResponsive();
  return (
    <Dialog
      open={isOpen}
      isSelectingPreOrderingTimeDialogBoxOpenescribedby="alert-dialog-description"
      onClose={onClose}
      style={{ zIndex: 10000 }}
    >
      <DialogContent style={{ width: minWidth768 && 560 }}>
        <DialogContentText id="alert-dialog-description">
          آیا مطمئن هستید که می‌خواهید آدرس ذخیره‌شده‌ی خود را حذف کنید؟
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="disabled">
          انصراف
        </Button>
        <Button
          onClick={() => {
            deleteAddress(addressId, orderInfo.id);
            minWidth768
              ? toggleDropDown(
                  SELECT_ADDRESS_DROPDOWN,
                  !UIDropDowns[SELECT_ADDRESS_DROPDOWN]
                )
              : toggleDrawer(SELECT_ADDRESS_DRAWER, false);
            onClose();
          }}
          color="secondary"
        >
          حذف
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(DeleteAddressModal);
