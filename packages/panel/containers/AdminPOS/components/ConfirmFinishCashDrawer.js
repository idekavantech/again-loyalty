import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { actions, text } from "@saas/utils/colors";
import IconButton from "@material-ui/core/IconButton";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

export default function ConfirmFinishCashDrawer({ isOpen, onClose, submit }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <div className="d-flex align-items-center mb-4">
          <IconButton
            onClick={onClose}
            style={{ height: 35, width: 35 }}
            className="ml-2"
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
          <div className="u-fontWeightHeavy u-fontLarge">صندوق بررسی نشده</div>
        </div>
        <DialogContentText>
          {`شما مبلغ واقعی موجود در صندوق را وارد نکردید در این صورت صندوق به حالت
          "`}
          <span className="u-fontWeightHeavy" style={{ color: text.critical }}>
            بررسی نشده
          </span>
          {`" قرار میگیرد و میتوانید در قسمت تاریخچه صندوق‌ها اقدام به بستن صندوق
          کنید.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions className="p-4">
        <Button
          variant="contained"
          style={{
            backgroundColor: actions.primary.disabled,
            color: text.disabled,
          }}
          onClick={onClose}
          className="ml-2 u-box-shadow-none"
        >
          لغو
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            onClose();
            submit();
          }}
          color="primary"
          autoFocus
        >
          تایید
        </Button>
      </DialogActions>
    </Dialog>
  );
}
