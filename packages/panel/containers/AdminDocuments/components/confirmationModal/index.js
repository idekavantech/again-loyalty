import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { night } from "@saas/utils/colors";
import IconButton from "@material-ui/core/IconButton";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

const ConfirmationModal = ({ isOpen, onClose, submit, isLoading }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="w-100"
      PaperProps={{ className: "w-100" }}
    >
      <DialogContent className="p-4 w-100">
        <div className="d-flex justify-content-between align-items-center">
          {/* <div style={{ color: night }} className="u-fontLarge">
            آپدیت موجودی انبار
          </div> */}
          <div>
            <IconButton
              className="p-0"
              onClick={onClose}
              style={{ color: night }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </div>
        </div>
        <div className="mt-4" style={{ color: night }}>
          به علت تغییر دامنه تستی به آدرس جدید، اطلاعات سفارش‌های دریافتی پیشین
          شما در صورت وجود پاک می‌شود. در صورت تمایل اطلاعات مورد نیاز خود را
          یادداشت کنید و دوباره از این قسمت اقدام کنید.
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
          size="large"
          disabled={isLoading}
        >
          تایید
        </Button>
        <Button
          onClick={onClose}
          variant="outlined"
          color="primary"
          className="mr-2 ml-0 u-box-shadow-none u-fontMedium"
          size="large"
        >
          بازگشت
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
